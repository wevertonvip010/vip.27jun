from src.database import db
from datetime import datetime

class Estoque(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(100), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    unidade = db.Column(db.String(50), nullable=True)
    localizacao = db.Column(db.String(100), nullable=True)
    ultima_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f"<Estoque {self.item}>"

    @staticmethod
    def create(data):
        estoque = Estoque(
            item=data.get("item"),
            quantidade=data.get("quantidade"),
            unidade=data.get("unidade"),
            localizacao=data.get("localizacao")
        )
        db.session.add(estoque)
        db.session.commit()
        return estoque.id

    @staticmethod
    def get_all():
        return [e.to_dict() for e in Estoque.query.all()]

    @staticmethod
    def get_by_id(estoque_id):
        return Estoque.query.get(estoque_id).to_dict() if Estoque.query.get(estoque_id) else None

    @staticmethod
    def update(estoque_id, data):
        estoque = Estoque.query.get(estoque_id)
        if not estoque:
            return False
        for key, value in data.items():
            setattr(estoque, key, value)
        db.session.commit()
        return True

    def to_dict(self):
        return {
            "id": self.id,
            "item": self.item,
            "quantidade": self.quantidade,
            "unidade": self.unidade,
            "localizacao": self.localizacao,
            "ultima_atualizacao": self.ultima_atualizacao.isoformat() if self.ultima_atualizacao else None
        }


