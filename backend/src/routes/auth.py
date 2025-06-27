from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from src.models.user import User
from src.models.user_activity import UserActivity
import re

auth_bp = Blueprint('auth', __name__)

def validate_cpf(cpf):
    """Validar formato do CPF"""
    # Remove caracteres não numéricos
    cpf = re.sub(r'[^0-9]', '', cpf)
    
    # Verifica se tem 11 dígitos
    if len(cpf) != 11:
        return False
    
    # Verifica se todos os dígitos são iguais
    if cpf == cpf[0] * 11:
        return False
    
    return True

@auth_bp.route('/login', methods=['POST'])
def login():
    """Endpoint de login com CPF"""
    try:
        data = request.get_json()
        cpf = data.get('cpf')
        password = data.get('password')
        
        if not cpf or not password:
            return jsonify({"error": "CPF e senha são obrigatórios"}), 400
        
        # Validar formato do CPF
        if not validate_cpf(cpf):
            return jsonify({"error": "CPF inválido"}), 400
        
        # Limpar CPF (apenas números)
        cpf = re.sub(r'[^0-9]', '', cpf)
        
        # Autenticar usuário
        user = User.find_by_cpf(cpf)
        if not user or not user.check_password(password):
            return jsonify({"error": "CPF ou senha inválidos"}), 401
        
        if not user.active:
            return jsonify({"error": "Usuário inativo"}), 401
        
        # Atualizar último login
        user.update_last_login()
        
        # Registrar atividade
        UserActivity.create_activity(
            user_id=str(user._id),
            action="login",
            description="Login realizado com sucesso"
        )
        
        # Criar token JWT
        access_token = create_access_token(identity=str(user._id))
        
        return jsonify({
            "message": "Login realizado com sucesso",
            "access_token": access_token,
            "user": {
                "id": str(user._id),
                "cpf": user.cpf,
                "email": user.email,
                "name": user.name,
                "role": user.role
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    """Endpoint de registro de usuário"""
    try:
        data = request.get_json()
        cpf = data.get('cpf')
        password = data.get('password')
        name = data.get('name')
        email = data.get('email')
        role = data.get('role', 'user')
        
        if not cpf or not password or not name:
            return jsonify({"error": "CPF, senha e nome são obrigatórios"}), 400
        
        # Validar formato do CPF
        if not validate_cpf(cpf):
            return jsonify({"error": "CPF inválido"}), 400
        
        # Limpar CPF (apenas números)
        cpf = re.sub(r'[^0-9]', '', cpf)
        
        # Verificar se usuário já existe
        existing_user = User.find_by_cpf(cpf)
        if existing_user:
            return jsonify({"error": "CPF já cadastrado"}), 409
        
        # Criar usuário
        new_user = User.create_user(cpf, password, name, email, role)
        
        # Registrar atividade
        UserActivity.create_activity(
            user_id=str(new_user._id),
            action="register",
            description="Usuário cadastrado no sistema"
        )
        
        return jsonify({
            "message": "Usuário criado com sucesso",
            "user_id": str(new_user._id)
        }), 201
        
    except ValueError as e:
        return jsonify({"error": str(e)}), 409
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Obter dados do usuário atual"""
    try:
        user_id = get_jwt_identity()
        user = User.find_by_id(user_id)
        
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        return jsonify({
            "user": {
                "id": str(user._id),
                "cpf": user.cpf,
                "email": user.email,
                "name": user.name,
                "role": user.role,
                "active": user.active,
                "last_login": user.last_login.isoformat() if user.last_login else None
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Endpoint de logout"""
    try:
        user_id = get_jwt_identity()
        
        # Registrar atividade
        UserActivity.create_activity(
            user_id=user_id,
            action="logout",
            description="Logout realizado"
        )
        
        return jsonify({"message": "Logout realizado com sucesso"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Alterar senha do usuário"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        
        if not current_password or not new_password:
            return jsonify({"error": "Senha atual e nova senha são obrigatórias"}), 400
        
        user = User.find_by_id(user_id)
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        # Verificar senha atual
        if not user.check_password(current_password):
            return jsonify({"error": "Senha atual incorreta"}), 401
        
        # Atualizar senha
        user.update({'password': new_password})
        
        # Registrar atividade
        UserActivity.create_activity(
            user_id=user_id,
            action="change_password",
            description="Senha alterada"
        )
        
        return jsonify({"message": "Senha alterada com sucesso"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

