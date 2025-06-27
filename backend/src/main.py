import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from src.config import Config
from src.database import init_mongodb, get_db
from src.models.user import User

# Importar blueprints (apenas os que foram atualizados para MongoDB)
from src.routes.auth import auth_bp
from src.routes.dashboard import dashboard_bp
from src.routes.ia import ia_bp
from src.routes.integracoes import integracoes_bp
from src.routes.orcamentos import orcamentos_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))

# Configurações
app.config.from_object(Config)

# CORS
CORS(app, origins=Config.CORS_ORIGINS)

# JWT
jwt = JWTManager(app)

# Inicializar MongoDB
init_mongodb(app)

# Função para criar usuário admin padrão
def init_admin_user():
    try:
        db = get_db()
        users_collection = db.users
        
        # Verificar se já existe usuário admin
        admin_user = users_collection.find_one({"cpf": "00000000191"})
        if not admin_user:
            user_model = User()
            admin_data = {
                "cpf": "00000000191",
                "name": "Administrador VIP",
                "role": "admin",
                "email": "admin@vipmudancas.com.br",
                "active": True
            }
            admin_data["password"] = user_model.set_password("123456")
            
            users_collection.insert_one(admin_data)
            print("Usuário admin padrão criado: CPF 00000000191 / Senha: 123456")
    except Exception as e:
        print(f"Erro ao criar usuário admin: {e}")

# Registrar blueprints (apenas os atualizados)
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
app.register_blueprint(ia_bp, url_prefix='/api/ia')
app.register_blueprint(integracoes_bp, url_prefix='/api/integracoes')
app.register_blueprint(orcamentos_bp, url_prefix='/api/orcamentos')

@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint de verificação de saúde"""
    return {"status": "ok", "message": "VIP Mudanças API está funcionando"}, 200

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Servir arquivos estáticos do frontend"""
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404

if __name__ == '__main__':
    init_admin_user()  # Criar usuário admin padrão
    app.run(host='0.0.0.0', port=5000, debug=True)

