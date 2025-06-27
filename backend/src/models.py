from datetime import datetime
from bson import ObjectId
from src.database import db
import bcrypt

class User:
    collection = db.users
    
    @staticmethod
    def create_user(email, password, name, role='admin'):
        """Criar novo usuário"""
        # Verificar se usuário já existe
        if User.collection.find_one({"email": email}):
            return None
        
        # Hash da senha
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        user_data = {
            "email": email,
            "password": password_hash,
            "name": name,
            "role": role,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "active": True
        }
        
        result = User.collection.insert_one(user_data)
        return str(result.inserted_id)
    
    @staticmethod
    def authenticate(email, password):
        """Autenticar usuário"""
        user = User.collection.find_one({"email": email, "active": True})
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
            user['_id'] = str(user['_id'])
            return user
        return None
    
    @staticmethod
    def get_by_id(user_id):
        """Buscar usuário por ID"""
        user = User.collection.find_one({"_id": ObjectId(user_id)})
        if user:
            user['_id'] = str(user['_id'])
        return user

class Cliente:
    collection = db.clientes
    
    @staticmethod
    def create(data):
        """Criar novo cliente"""
        cliente_data = {
            **data,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "status": data.get("status", "Novo"),
            "perfil": data.get("perfil", ""),
            "documentos": [],
            "historico": []
        }
        
        result = Cliente.collection.insert_one(cliente_data)
        return str(result.inserted_id)
    
    @staticmethod
    def get_all():
        """Listar todos os clientes"""
        clientes = list(Cliente.collection.find().sort("created_at", -1))
        for cliente in clientes:
            cliente['_id'] = str(cliente['_id'])
        return clientes
    
    @staticmethod
    def get_by_id(cliente_id):
        """Buscar cliente por ID"""
        cliente = Cliente.collection.find_one({"_id": ObjectId(cliente_id)})
        if cliente:
            cliente['_id'] = str(cliente['_id'])
        return cliente
    
    @staticmethod
    def update(cliente_id, data):
        """Atualizar cliente"""
        data["updated_at"] = datetime.utcnow()
        result = Cliente.collection.update_one(
            {"_id": ObjectId(cliente_id)},
            {"$set": data}
        )
        return result.modified_count > 0

class Lead:
    collection = db.leads
    
    @staticmethod
    def create(data):
        """Criar novo lead"""
        lead_data = {
            **data,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "status": data.get("status", "Novo"),
            "fonte": data.get("fonte", "LinkedIn"),
            "convertido": False
        }
        
        result = Lead.collection.insert_one(lead_data)
        return str(result.inserted_id)
    
    @staticmethod
    def get_all():
        """Listar todos os leads"""
        leads = list(Lead.collection.find().sort("created_at", -1))
        for lead in leads:
            lead['_id'] = str(lead['_id'])
        return leads

class Licitacao:
    collection = db.licitacoes
    
    @staticmethod
    def create(data):
        """Criar nova licitação"""
        licitacao_data = {
            **data,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "status": data.get("status", "Aberta"),
            "monitorada": True
        }
        
        result = Licitacao.collection.insert_one(licitacao_data)
        return str(result.inserted_id)
    
    @staticmethod
    def get_all():
        """Listar todas as licitações"""
        licitacoes = list(Licitacao.collection.find().sort("created_at", -1))
        for licitacao in licitacoes:
            licitacao['_id'] = str(licitacao['_id'])
        return licitacoes

class Orcamento:
    collection = db.orcamentos
    
    @staticmethod
    def create(data):
        """Criar novo orçamento"""
        # Gerar número sequencial
        ultimo = Orcamento.collection.find_one(sort=[("numero", -1)])
        numero = (ultimo['numero'] if ultimo else 0) + 1
        
        orcamento_data = {
            **data,
            "numero": numero,
            "numero_formatado": f"{numero:03d}-2025",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "status": data.get("status", "Pendente")
        }
        
        result = Orcamento.collection.insert_one(orcamento_data)
        return str(result.inserted_id)

class Financeiro:
    collection = db.financeiro
    
    @staticmethod
    def create_transacao(data):
        """Criar nova transação financeira"""
        transacao_data = {
            **data,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "tipo": data.get("tipo", "receita"),  # receita ou despesa
            "categoria": data.get("categoria", ""),
            "status": data.get("status", "pendente")
        }
        
        result = Financeiro.collection.insert_one(transacao_data)
        return str(result.inserted_id)

class GuardaMoveis:
    collection = db.guarda_moveis
    
    @staticmethod
    def create_box(data):
        """Criar novo box"""
        box_data = {
            **data,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "status": data.get("status", "disponivel"),  # disponivel, ocupado, reservado
            "itens": []
        }
        
        result = GuardaMoveis.collection.insert_one(box_data)
        return str(result.inserted_id)

class Estoque:
    collection = db.estoque
    
    @staticmethod
    def create_item(data):
        """Criar novo item de estoque"""
        item_data = {
            **data,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "quantidade": data.get("quantidade", 0),
            "quantidade_minima": data.get("quantidade_minima", 10),
            "movimentacoes": []
        }
        
        result = Estoque.collection.insert_one(item_data)
        return str(result.inserted_id)

