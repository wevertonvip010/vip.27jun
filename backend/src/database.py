from pymongo import MongoClient
from flask import current_app, g
from src.config import Config

# Cliente MongoDB global
mongo_client = None
mongo_db = None

def init_mongodb(app):
    """Inicializar conexão com MongoDB"""
    global mongo_client, mongo_db
    
    try:
        mongo_client = MongoClient(app.config['MONGODB_URI'])
        mongo_db = mongo_client[app.config['MONGODB_DATABASE']]
        
        # Testar conexão
        mongo_client.admin.command('ping')
        print(f"Conectado ao MongoDB: {app.config['MONGODB_DATABASE']}")
        
        # Criar índices necessários
        create_indexes()
        
    except Exception as e:
        print(f"Erro ao conectar com MongoDB: {e}")
        raise

def get_db():
    """Obter instância do banco de dados"""
    return mongo_db

def create_indexes():
    """Criar índices necessários para otimização"""
    try:
        db = get_db()
        
        # Índices para usuários
        db.users.create_index("cpf", unique=True)
        db.users.create_index("email")
        
        # Índices para clientes
        db.clientes.create_index("cpf_cnpj", unique=True)
        db.clientes.create_index("email")
        db.clientes.create_index("telefone")
        
        # Índices para orçamentos
        db.orcamentos.create_index("numero_orcamento", unique=True)
        db.orcamentos.create_index("cliente_id")
        db.orcamentos.create_index("status")
        db.orcamentos.create_index("data_criacao")
        
        # Índices para contratos
        db.contratos.create_index("numero_contrato", unique=True)
        db.contratos.create_index("orcamento_id")
        db.contratos.create_index("cliente_id")
        
        # Índices para ordens de serviço
        db.ordens_servico.create_index("numero_os", unique=True)
        db.ordens_servico.create_index("contrato_id")
        db.ordens_servico.create_index("status")
        
        # Índices para financeiro
        db.financeiro.create_index("tipo")
        db.financeiro.create_index("data_vencimento")
        db.financeiro.create_index("status")
        db.financeiro.create_index("cliente_id")
        
        # Índices para leads
        db.leads.create_index("email")
        db.leads.create_index("telefone")
        db.leads.create_index("status")
        db.leads.create_index("data_criacao")
        
        # Índices para programa de pontos
        db.programa_pontos.create_index("cliente_id")
        db.programa_pontos.create_index("tipo")
        db.programa_pontos.create_index("data_criacao")
        
        # Índices para atividades de usuário
        db.user_activities.create_index("user_id")
        db.user_activities.create_index("timestamp")
        db.user_activities.create_index("action")
        
        print("Índices do MongoDB criados com sucesso")
        
    except Exception as e:
        print(f"Erro ao criar índices: {e}")

def close_db(error):
    """Fechar conexão com o banco"""
    if mongo_client:
        mongo_client.close()

