from src.database import db
from datetime import datetime

class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    cargo = db.Column(db.String(100), nullable=True)
    empresa = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=True)
    telefone = db.Column(db.String(20), nullable=True)
    localizacao = db.Column(db.String(100), nullable=True)
    linkedin_url = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(50), default="Novo")
    fonte = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Lead {self.nome}>'

    @staticmethod
    def create(data):
        lead = Lead(
            nome=data.get('nome'),
            cargo=data.get('cargo'),
            empresa=data.get('empresa'),
            email=data.get('email'),
            telefone=data.get('telefone'),
            localizacao=data.get('localizacao'),
            linkedin_url=data.get('linkedin_url'),
            status=data.get('status', 'Novo'),
            fonte=data.get('fonte')
        )
        db.session.add(lead)
        db.session.commit()
        return lead.id

    @staticmethod
    def get_all():
        return [l.to_dict() for l in Lead.query.all()]

    @staticmethod
    def get_by_id(lead_id):
        return Lead.query.get(lead_id).to_dict() if Lead.query.get(lead_id) else None

    @staticmethod
    def update(lead_id, data):
        lead = Lead.query.get(lead_id)
        if not lead:
            return False
        for key, value in data.items():
            setattr(lead, key, value)
        db.session.commit()
        return True

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'cargo': self.cargo,
            'empresa': self.empresa,
            'email': self.email,
            'telefone': self.telefone,
            'localizacao': self.localizacao,
            'linkedin_url': self.linkedin_url,
            'status': self.status,
            'fonte': self.fonte,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


