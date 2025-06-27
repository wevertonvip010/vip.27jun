from datetime import datetime
from bson import ObjectId
from src.database import get_db
import uuid

class Orcamento:
    def __init__(self, data=None):
        if data:
            self._id = data.get('_id')
            self.numero_orcamento = data.get('numero_orcamento')
            self.cliente_id = data.get('cliente_id')
            self.cliente_nome = data.get('cliente_nome')
            self.cliente_email = data.get('cliente_email')
            self.cliente_telefone = data.get('cliente_telefone')
            self.endereco_origem = data.get('endereco_origem', {})
            self.endereco_destino = data.get('endereco_destino', {})
            self.tipo_mudanca = data.get('tipo_mudanca')  # residencial, comercial, self_storage
            self.data_mudanca = data.get('data_mudanca')
            self.data_visita = data.get('data_visita')
            self.itens = data.get('itens', [])
            self.servicos_adicionais = data.get('servicos_adicionais', [])
            self.valor_total = data.get('valor_total', 0)
            self.desconto = data.get('desconto', 0)
            self.valor_final = data.get('valor_final', 0)
            self.observacoes = data.get('observacoes', '')
            self.status = data.get('status', 'pendente')  # pendente, aprovado, rejeitado, expirado
            self.validade = data.get('validade')
            self.vendedor_id = data.get('vendedor_id')
            self.vendedor_nome = data.get('vendedor_nome')
            self.data_criacao = data.get('data_criacao')
            self.data_atualizacao = data.get('data_atualizacao')
            self.perfil_cliente = data.get('perfil_cliente')  # A, B, AA
        else:
            self._id = None
            self.numero_orcamento = None
            self.cliente_id = None
            self.cliente_nome = None
            self.cliente_email = None
            self.cliente_telefone = None
            self.endereco_origem = {}
            self.endereco_destino = {}
            self.tipo_mudanca = None
            self.data_mudanca = None
            self.data_visita = None
            self.itens = []
            self.servicos_adicionais = []
            self.valor_total = 0
            self.desconto = 0
            self.valor_final = 0
            self.observacoes = ''
            self.status = 'pendente'
            self.validade = None
            self.vendedor_id = None
            self.vendedor_nome = None
            self.data_criacao = None
            self.data_atualizacao = None
            self.perfil_cliente = None

    def __repr__(self):
        return f'<Orcamento {self.numero_orcamento}>'

    @staticmethod
    def generate_numero_orcamento():
        """Gerar número único do orçamento"""
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        return f"ORC-{timestamp}"

    @staticmethod
    def create_orcamento(data):
        """Criar novo orçamento"""
        db = get_db()
        orcamentos_collection = db.orcamentos
        
        # Gerar número do orçamento
        numero_orcamento = Orcamento.generate_numero_orcamento()
        
        # Verificar se número já existe (improvável, mas por segurança)
        while orcamentos_collection.find_one({"numero_orcamento": numero_orcamento}):
            numero_orcamento = Orcamento.generate_numero_orcamento()
        
        orcamento_data = {
            "numero_orcamento": numero_orcamento,
            "cliente_id": data.get('cliente_id'),
            "cliente_nome": data.get('cliente_nome'),
            "cliente_email": data.get('cliente_email'),
            "cliente_telefone": data.get('cliente_telefone'),
            "endereco_origem": data.get('endereco_origem', {}),
            "endereco_destino": data.get('endereco_destino', {}),
            "tipo_mudanca": data.get('tipo_mudanca'),
            "data_mudanca": data.get('data_mudanca'),
            "data_visita": data.get('data_visita'),
            "itens": data.get('itens', []),
            "servicos_adicionais": data.get('servicos_adicionais', []),
            "valor_total": data.get('valor_total', 0),
            "desconto": data.get('desconto', 0),
            "valor_final": data.get('valor_final', 0),
            "observacoes": data.get('observacoes', ''),
            "status": "pendente",
            "validade": data.get('validade'),
            "vendedor_id": data.get('vendedor_id'),
            "vendedor_nome": data.get('vendedor_nome'),
            "perfil_cliente": data.get('perfil_cliente'),
            "data_criacao": datetime.utcnow(),
            "data_atualizacao": datetime.utcnow()
        }
        
        result = orcamentos_collection.insert_one(orcamento_data)
        orcamento_data['_id'] = result.inserted_id
        return Orcamento(orcamento_data)

    @staticmethod
    def find_by_id(orcamento_id):
        """Buscar orçamento por ID"""
        db = get_db()
        orcamentos_collection = db.orcamentos
        try:
            if isinstance(orcamento_id, str):
                orcamento_id = ObjectId(orcamento_id)
            orcamento_data = orcamentos_collection.find_one({"_id": orcamento_id})
            return Orcamento(orcamento_data) if orcamento_data else None
        except:
            return None

    @staticmethod
    def find_by_numero(numero_orcamento):
        """Buscar orçamento por número"""
        db = get_db()
        orcamentos_collection = db.orcamentos
        orcamento_data = orcamentos_collection.find_one({"numero_orcamento": numero_orcamento})
        return Orcamento(orcamento_data) if orcamento_data else None

    @staticmethod
    def get_all_orcamentos(limit=50, skip=0, status_filter=None):
        """Obter todos os orçamentos"""
        db = get_db()
        orcamentos_collection = db.orcamentos
        
        query = {}
        if status_filter:
            query["status"] = status_filter
        
        orcamentos_data = list(orcamentos_collection.find(query).sort("data_criacao", -1).limit(limit).skip(skip))
        return [Orcamento(orcamento_data) for orcamento_data in orcamentos_data]

    @staticmethod
    def get_by_cliente(cliente_id):
        """Obter orçamentos de um cliente"""
        db = get_db()
        orcamentos_collection = db.orcamentos
        orcamentos_data = list(orcamentos_collection.find({"cliente_id": cliente_id}).sort("data_criacao", -1))
        return [Orcamento(orcamento_data) for orcamento_data in orcamentos_data]

    @staticmethod
    def get_by_vendedor(vendedor_id):
        """Obter orçamentos de um vendedor"""
        db = get_db()
        orcamentos_collection = db.orcamentos
        orcamentos_data = list(orcamentos_collection.find({"vendedor_id": vendedor_id}).sort("data_criacao", -1))
        return [Orcamento(orcamento_data) for orcamento_data in orcamentos_data]

    def update(self, data):
        """Atualizar orçamento"""
        db = get_db()
        orcamentos_collection = db.orcamentos
        
        update_data = {}
        allowed_fields = [
            'cliente_nome', 'cliente_email', 'cliente_telefone', 'endereco_origem',
            'endereco_destino', 'tipo_mudanca', 'data_mudanca', 'data_visita',
            'itens', 'servicos_adicionais', 'valor_total', 'desconto', 'valor_final',
            'observacoes', 'status', 'validade', 'perfil_cliente'
        ]
        
        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]
        
        update_data['data_atualizacao'] = datetime.utcnow()
        
        orcamentos_collection.update_one(
            {"_id": self._id},
            {"$set": update_data}
        )
        
        # Atualizar objeto atual
        for key, value in update_data.items():
            setattr(self, key, value)

    def delete(self):
        """Deletar orçamento"""
        db = get_db()
        orcamentos_collection = db.orcamentos
        orcamentos_collection.delete_one({"_id": self._id})

    def calcular_valor_final(self):
        """Calcular valor final com desconto"""
        self.valor_final = self.valor_total - self.desconto
        return self.valor_final

    def to_dict(self):
        """Converter para dicionário"""
        return {
            'id': str(self._id) if self._id else None,
            'numero_orcamento': self.numero_orcamento,
            'cliente_id': self.cliente_id,
            'cliente_nome': self.cliente_nome,
            'cliente_email': self.cliente_email,
            'cliente_telefone': self.cliente_telefone,
            'endereco_origem': self.endereco_origem,
            'endereco_destino': self.endereco_destino,
            'tipo_mudanca': self.tipo_mudanca,
            'data_mudanca': self.data_mudanca.isoformat() if isinstance(self.data_mudanca, datetime) else self.data_mudanca,
            'data_visita': self.data_visita.isoformat() if isinstance(self.data_visita, datetime) else self.data_visita,
            'itens': self.itens,
            'servicos_adicionais': self.servicos_adicionais,
            'valor_total': self.valor_total,
            'desconto': self.desconto,
            'valor_final': self.valor_final,
            'observacoes': self.observacoes,
            'status': self.status,
            'validade': self.validade.isoformat() if isinstance(self.validade, datetime) else self.validade,
            'vendedor_id': self.vendedor_id,
            'vendedor_nome': self.vendedor_nome,
            'perfil_cliente': self.perfil_cliente,
            'data_criacao': self.data_criacao.isoformat() if self.data_criacao else None,
            'data_atualizacao': self.data_atualizacao.isoformat() if self.data_atualizacao else None
        }

