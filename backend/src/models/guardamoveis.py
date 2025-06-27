from src.database import db
from datetime import datetime

class GuardaMoveis(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey("cliente.id"), nullable=False)
    box_numero = db.Column(db.String(50), unique=True, nullable=False)
    tamanho = db.Column(db.String(50), nullable=True)
    data_inicio = db.Column(db.DateTime, default=datetime.utcnow)
    data_fim = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(50), default="Ocupado")
    
    def __repr__(self):
        return f"<GuardaMoveis {self.box_numero}>"

    @staticmethod
    def create(data):
        guarda_moveis = GuardaMoveis(
            cliente_id=data.get("cliente_id"),
            box_numero=data.get("box_numero"),
            tamanho=data.get("tamanho"),
            data_inicio=data.get("data_inicio"),
            data_fim=data.get("data_fim"),
            status=data.get("status", "Ocupado")
        )
        db.session.add(guarda_moveis)
        db.session.commit()
        return guarda_moveis.id

    @staticmethod
    def get_all():
        return [gm.to_dict() for gm in GuardaMoveis.query.all()]

    @staticmethod
    def get_by_id(guarda_moveis_id):
        return GuardaMoveis.query.get(guarda_moveis_id).to_dict() if GuardaMoveis.query.get(guarda_moveis_id) else None

    @staticmethod
    def update(guarda_moveis_id, data):
        guarda_moveis = GuardaMoveis.query.get(guarda_moveis_id)
        if not guarda_moveis:
            return False
        for key, value in data.items():
            setattr(guarda_moveis, key, value)
        db.session.commit()
        return True

    def to_dict(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "box_numero": self.box_numero,
            "tamanho": self.tamanho,
            "data_inicio": self.data_inicio.isoformat() if self.data_inicio else None,
            "data_fim": self.data_fim.isoformat() if self.data_fim else None,
            "status": self.status
        }


