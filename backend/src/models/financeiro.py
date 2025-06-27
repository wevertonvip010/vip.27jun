from src.database import db
from datetime import datetime

class Financeiro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(50), nullable=False) # 'receita' ou 'despesa'
    descricao = db.Column(db.String(255), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    data = db.Column(db.DateTime, default=datetime.utcnow)
    categoria = db.Column(db.String(100), nullable=True)
    
    def __repr__(self):
        return f"<Financeiro {self.descricao}>"

    @staticmethod
    def create(data):
        financeiro = Financeiro(
            tipo=data.get("tipo"),
            descricao=data.get("descricao"),
            valor=data.get("valor"),
            data=data.get("data"),
            categoria=data.get("categoria")
        )
        db.session.add(financeiro)
        db.session.commit()
        return financeiro.id

    @staticmethod
    def get_all():
        return [f.to_dict() for f in Financeiro.query.all()]

    @staticmethod
    def get_by_id(financeiro_id):
        return Financeiro.query.get(financeiro_id).to_dict() if Financeiro.query.get(financeiro_id) else None

    @staticmethod
    def update(financeiro_id, data):
        financeiro = Financeiro.query.get(financeiro_id)
        if not financeiro:
            return False
        for key, value in data.items():
            setattr(financeiro, key, value)
        db.session.commit()
        return True

    def to_dict(self):
        return {
            "id": self.id,
            "tipo": self.tipo,
            "descricao": self.descricao,
            "valor": self.valor,
            "data": self.data.isoformat() if self.data else None,
            "categoria": self.categoria
        }


