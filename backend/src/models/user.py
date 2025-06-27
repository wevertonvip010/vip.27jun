from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from src.database import get_db

class User:
    def __init__(self, data=None):
        if data:
            self._id = data.get('_id')
            self.cpf = data.get('cpf')
            self.email = data.get('email')
            self.password_hash = data.get('password')
            self.name = data.get('name')
            self.role = data.get('role', 'user')
            self.created_at = data.get('created_at')
            self.updated_at = data.get('updated_at')
            self.active = data.get('active', True)
            self.last_login = data.get('last_login')
        else:
            self._id = None
            self.cpf = None
            self.email = None
            self.password_hash = None
            self.name = None
            self.role = 'user'
            self.created_at = None
            self.updated_at = None
            self.active = True
            self.last_login = None

    def __repr__(self):
        return f'<User {self.cpf}>'

    def set_password(self, password):
        """Gerar hash da senha"""
        return generate_password_hash(password)

    def check_password(self, password):
        """Verificar senha"""
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def create_user(cpf, password, name, email=None, role='user'):
        """Criar novo usuário"""
        db = get_db()
        users_collection = db.users
        
        # Verificar se CPF já existe
        existing_user = users_collection.find_one({"cpf": cpf})
        if existing_user:
            raise ValueError("CPF já cadastrado")
        
        user_data = {
            "cpf": cpf,
            "email": email,
            "password": generate_password_hash(password),
            "name": name,
            "role": role,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "active": True,
            "last_login": None
        }
        
        result = users_collection.insert_one(user_data)
        user_data['_id'] = result.inserted_id
        return User(user_data)

    @staticmethod
    def find_by_cpf(cpf):
        """Buscar usuário por CPF"""
        db = get_db()
        users_collection = db.users
        user_data = users_collection.find_one({"cpf": cpf})
        return User(user_data) if user_data else None

    @staticmethod
    def find_by_email(email):
        """Buscar usuário por email"""
        db = get_db()
        users_collection = db.users
        user_data = users_collection.find_one({"email": email})
        return User(user_data) if user_data else None

    @staticmethod
    def find_by_id(user_id):
        """Buscar usuário por ID"""
        db = get_db()
        users_collection = db.users
        try:
            if isinstance(user_id, str):
                user_id = ObjectId(user_id)
            user_data = users_collection.find_one({"_id": user_id})
            return User(user_data) if user_data else None
        except:
            return None

    @staticmethod
    def get_all_users():
        """Obter todos os usuários"""
        db = get_db()
        users_collection = db.users
        users_data = list(users_collection.find())
        return [User(user_data) for user_data in users_data]

    def update(self, data):
        """Atualizar dados do usuário"""
        db = get_db()
        users_collection = db.users
        
        update_data = {}
        if 'name' in data:
            update_data['name'] = data['name']
        if 'email' in data:
            update_data['email'] = data['email']
        if 'role' in data:
            update_data['role'] = data['role']
        if 'active' in data:
            update_data['active'] = data['active']
        if 'password' in data:
            update_data['password'] = generate_password_hash(data['password'])
        
        update_data['updated_at'] = datetime.utcnow()
        
        users_collection.update_one(
            {"_id": self._id},
            {"$set": update_data}
        )
        
        # Atualizar objeto atual
        for key, value in update_data.items():
            if key == 'password':
                self.password_hash = value
            else:
                setattr(self, key, value)

    def update_last_login(self):
        """Atualizar último login"""
        db = get_db()
        users_collection = db.users
        
        users_collection.update_one(
            {"_id": self._id},
            {"$set": {"last_login": datetime.utcnow()}}
        )
        self.last_login = datetime.utcnow()

    def delete(self):
        """Deletar usuário"""
        db = get_db()
        users_collection = db.users
        users_collection.delete_one({"_id": self._id})

    def to_dict(self):
        """Converter para dicionário"""
        return {
            'id': str(self._id) if self._id else None,
            'cpf': self.cpf,
            'email': self.email,
            'name': self.name,
            'role': self.role,
            'active': self.active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

