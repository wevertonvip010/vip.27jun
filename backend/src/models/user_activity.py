from datetime import datetime
from bson import ObjectId
from src.database import get_db

class UserActivity:
    def __init__(self, data=None):
        if data:
            self._id = data.get('_id')
            self.user_id = data.get('user_id')
            self.action = data.get('action')
            self.description = data.get('description')
            self.timestamp = data.get('timestamp')
            self.ip_address = data.get('ip_address')
            self.user_agent = data.get('user_agent')
            self.additional_data = data.get('additional_data', {})
        else:
            self._id = None
            self.user_id = None
            self.action = None
            self.description = None
            self.timestamp = None
            self.ip_address = None
            self.user_agent = None
            self.additional_data = {}

    def __repr__(self):
        return f'<UserActivity {self.action} by {self.user_id}>'

    @staticmethod
    def create_activity(user_id, action, description, ip_address=None, user_agent=None, additional_data=None):
        """Criar nova atividade do usuário"""
        db = get_db()
        activities_collection = db.user_activities
        
        activity_data = {
            "user_id": user_id,
            "action": action,
            "description": description,
            "timestamp": datetime.utcnow(),
            "ip_address": ip_address,
            "user_agent": user_agent,
            "additional_data": additional_data or {}
        }
        
        result = activities_collection.insert_one(activity_data)
        activity_data['_id'] = result.inserted_id
        return UserActivity(activity_data)

    @staticmethod
    def get_user_activities(user_id, limit=50, skip=0):
        """Obter atividades de um usuário"""
        db = get_db()
        activities_collection = db.user_activities
        
        activities_data = list(activities_collection.find(
            {"user_id": user_id}
        ).sort("timestamp", -1).limit(limit).skip(skip))
        
        return [UserActivity(activity_data) for activity_data in activities_data]

    @staticmethod
    def get_all_activities(limit=100, skip=0, action_filter=None):
        """Obter todas as atividades do sistema"""
        db = get_db()
        activities_collection = db.user_activities
        
        query = {}
        if action_filter:
            query["action"] = action_filter
        
        activities_data = list(activities_collection.find(query).sort("timestamp", -1).limit(limit).skip(skip))
        return [UserActivity(activity_data) for activity_data in activities_data]

    @staticmethod
    def get_login_statistics(days=30):
        """Obter estatísticas de login dos últimos dias"""
        db = get_db()
        activities_collection = db.user_activities
        
        from datetime import timedelta
        start_date = datetime.utcnow() - timedelta(days=days)
        
        pipeline = [
            {
                "$match": {
                    "action": "login",
                    "timestamp": {"$gte": start_date}
                }
            },
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$timestamp"},
                        "month": {"$month": "$timestamp"},
                        "day": {"$dayOfMonth": "$timestamp"}
                    },
                    "count": {"$sum": 1},
                    "unique_users": {"$addToSet": "$user_id"}
                }
            },
            {
                "$project": {
                    "date": {
                        "$dateFromParts": {
                            "year": "$_id.year",
                            "month": "$_id.month",
                            "day": "$_id.day"
                        }
                    },
                    "login_count": "$count",
                    "unique_users_count": {"$size": "$unique_users"}
                }
            },
            {"$sort": {"date": 1}}
        ]
        
        return list(activities_collection.aggregate(pipeline))

    @staticmethod
    def get_user_session_time(user_id, date=None):
        """Calcular tempo de sessão de um usuário em uma data específica"""
        db = get_db()
        activities_collection = db.user_activities
        
        if not date:
            date = datetime.utcnow().date()
        
        # Buscar login e logout do dia
        start_of_day = datetime.combine(date, datetime.min.time())
        end_of_day = datetime.combine(date, datetime.max.time())
        
        activities = list(activities_collection.find({
            "user_id": user_id,
            "action": {"$in": ["login", "logout"]},
            "timestamp": {"$gte": start_of_day, "$lte": end_of_day}
        }).sort("timestamp", 1))
        
        if not activities:
            return 0
        
        total_time = 0
        login_time = None
        
        for activity in activities:
            if activity["action"] == "login":
                login_time = activity["timestamp"]
            elif activity["action"] == "logout" and login_time:
                session_time = activity["timestamp"] - login_time
                total_time += session_time.total_seconds()
                login_time = None
        
        # Se ainda há um login ativo, calcular até agora
        if login_time:
            current_time = min(datetime.utcnow(), end_of_day)
            session_time = current_time - login_time
            total_time += session_time.total_seconds()
        
        return total_time  # retorna em segundos

    def to_dict(self):
        """Converter para dicionário"""
        return {
            'id': str(self._id) if self._id else None,
            'user_id': self.user_id,
            'action': self.action,
            'description': self.description,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None,
            'ip_address': self.ip_address,
            'user_agent': self.user_agent,
            'additional_data': self.additional_data
        }

