from datetime import datetime
from bson import ObjectId
from src.database import get_db

class Cliente:
    def __init__(self, data=None):
        if data:
            self._id = data.get('_id')
            self.nome = data.get('nome')
            self.email = data.get('email')
            self.telefone = data.get('telefone')
            self.cpf_cnpj = data.get('cpf_cnpj')
            self.endereco = data.get('endereco', {})
            self.status = data.get('status', 'novo')
            self.fonte = data.get('fonte')
            self.justificativa = data.get('justificativa')
            self.perfil = data.get('perfil')  # A, B, AA
            self.empresa = data.get('empresa')
            self.observacoes = data.get('observacoes', '')
            self.ativo = data.get('ativo', True)
            self.data_criacao = data.get('data_criacao')
            self.data_atualizacao = data.get('data_atualizacao')
        else:
            self._id = None
            self.nome = None
            self.email = None
            self.telefone = None
            self.cpf_cnpj = None
            self.endereco = {}
            self.status = 'novo'
            self.fonte = None
            self.justificativa = None
            self.perfil = None
            self.empresa = None
            self.observacoes = ''
            self.ativo = True
            self.data_criacao = None
            self.data_atualizacao = None

    def __repr__(self):
        return f'<Cliente {self.nome}>'

    @staticmethod
    def create_cliente(data):
        """Criar novo cliente"""
        db = get_db()
        clientes_collection = db.clientes
        
        # Verificar se CPF/CNPJ já existe
        if data.get('cpf_cnpj'):
            existing_cliente = clientes_collection.find_one({"cpf_cnpj": data['cpf_cnpj']})
            if existing_cliente:
                raise ValueError("CPF/CNPJ já cadastrado")
        
        cliente_data = {
            "nome": data.get('nome'),
            "email": data.get('email'),
            "telefone": data.get('telefone'),
            "cpf_cnpj": data.get('cpf_cnpj'),
            "endereco": data.get('endereco', {}),
            "status": data.get('status', 'novo'),
            "fonte": data.get('fonte'),
            "justificativa": data.get('justificativa', ''),
            "perfil": data.get('perfil'),
            "empresa": data.get('empresa'),
            "observacoes": data.get('observacoes', ''),
            "ativo": True,
            "data_criacao": datetime.utcnow(),
            "data_atualizacao": datetime.utcnow()
        }
        
        result = clientes_collection.insert_one(cliente_data)
        cliente_data['_id'] = result.inserted_id
        return Cliente(cliente_data)

    @staticmethod
    def find_by_id(cliente_id):
        """Buscar cliente por ID"""
        db = get_db()
        clientes_collection = db.clientes
        try:
            if isinstance(cliente_id, str):
                cliente_id = ObjectId(cliente_id)
            cliente_data = clientes_collection.find_one({"_id": cliente_id})
            return Cliente(cliente_data) if cliente_data else None
        except:
            return None

    @staticmethod
    def find_by_email(email):
        """Buscar cliente por email"""
        db = get_db()
        clientes_collection = db.clientes
        cliente_data = clientes_collection.find_one({"email": email})
        return Cliente(cliente_data) if cliente_data else None

    @staticmethod
    def find_by_cpf_cnpj(cpf_cnpj):
        """Buscar cliente por CPF/CNPJ"""
        db = get_db()
        clientes_collection = db.clientes
        cliente_data = clientes_collection.find_one({"cpf_cnpj": cpf_cnpj})
        return Cliente(cliente_data) if cliente_data else None

    @staticmethod
    def get_all_clientes(limit=50, skip=0, status_filter=None):
        """Obter todos os clientes"""
        db = get_db()
        clientes_collection = db.clientes
        
        query = {"ativo": True}
        if status_filter:
            query["status"] = status_filter
        
        clientes_data = list(clientes_collection.find(query).sort("data_criacao", -1).limit(limit).skip(skip))
        return [Cliente(cliente_data) for cliente_data in clientes_data]

    @staticmethod
    def search_clientes(search_term, limit=20):
        """Buscar clientes por termo"""
        db = get_db()
        clientes_collection = db.clientes
        
        query = {
            "ativo": True,
            "$or": [
                {"nome": {"$regex": search_term, "$options": "i"}},
                {"email": {"$regex": search_term, "$options": "i"}},
                {"telefone": {"$regex": search_term, "$options": "i"}},
                {"empresa": {"$regex": search_term, "$options": "i"}}
            ]
        }
        
        clientes_data = list(clientes_collection.find(query).limit(limit))
        return [Cliente(cliente_data) for cliente_data in clientes_data]

    def update(self, data):
        """Atualizar cliente"""
        db = get_db()
        clientes_collection = db.clientes
        
        update_data = {}
        allowed_fields = [
            'nome', 'email', 'telefone', 'cpf_cnpj', 'endereco',
            'status', 'fonte', 'justificativa', 'perfil', 'empresa',
            'observacoes', 'ativo'
        ]
        
        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]
        
        update_data['data_atualizacao'] = datetime.utcnow()
        
        clientes_collection.update_one(
            {"_id": self._id},
            {"$set": update_data}
        )
        
        # Atualizar objeto atual
        for key, value in update_data.items():
            setattr(self, key, value)

    def delete(self):
        """Desativar cliente (soft delete)"""
        self.update({"ativo": False})

    def hard_delete(self):
        """Deletar cliente permanentemente"""
        db = get_db()
        clientes_collection = db.clientes
        clientes_collection.delete_one({"_id": self._id})

    def to_dict(self):
        """Converter para dicionário"""
        return {
            'id': str(self._id) if self._id else None,
            'nome': self.nome,
            'email': self.email,
            'telefone': self.telefone,
            'cpf_cnpj': self.cpf_cnpj,
            'endereco': self.endereco,
            'status': self.status,
            'fonte': self.fonte,
            'justificativa': self.justificativa,
            'perfil': self.perfil,
            'empresa': self.empresa,
            'observacoes': self.observacoes,
            'ativo': self.ativo,
            'data_criacao': self.data_criacao.isoformat() if self.data_criacao else None,
            'data_atualizacao': self.data_atualizacao.isoformat() if self.data_atualizacao else None
        }

