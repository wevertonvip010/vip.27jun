from src.database import db
from datetime import datetime

class Licitacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    orgao = db.Column(db.String(100), nullable=True)
    numero = db.Column(db.String(50), nullable=True)
    valor_estimado = db.Column(db.Float, nullable=True)
    data_abertura = db.Column(db.DateTime, nullable=True)
    data_limite = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(50), default="Aberta")
    portal = db.Column(db.String(100), nullable=True)
    url = db.Column(db.String(255), nullable=True)
    palavras_encontradas = db.Column(db.String(255), nullable=True) # Armazenar como string separada por vírgulas
    descricao = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Licitacao {self.titulo}>'

    @staticmethod
    def create(data):
        palavras_encontradas_str = ",".join(data.get("palavras_encontradas", [])) if isinstance(data.get("palavras_encontradas"), list) else data.get("palavras_encontradas")
        licitacao = Licitacao(
            titulo=data.get("titulo"),
            orgao=data.get("orgao"),
            numero=data.get("numero"),
            valor_estimado=data.get("valor_estimado"),
            data_abertura=data.get("data_abertura"),
            data_limite=data.get("data_limite"),
            status=data.get("status", "Aberta"),
            portal=data.get("portal"),
            url=data.get("url"),
            palavras_encontradas=palavras_encontradas_str,
            descricao=data.get("descricao")
        )
        db.session.add(licitacao)
        db.session.commit()
        return licitacao.id

    @staticmethod
    def get_all():
        return [l.to_dict() for l in Licitacao.query.all()]

    @staticmethod
    def get_by_id(licitacao_id):
        return Licitacao.query.get(licitacao_id).to_dict() if Licitacao.query.get(licitacao_id) else None

    @staticmethod
    def update(licitacao_id, data):
        licitacao = Licitacao.query.get(licitacao_id)
        if not licitacao:
            return False
        for key, value in data.items():
            if key == "palavras_encontradas" and isinstance(value, list):
                setattr(licitacao, key, ",".join(value))
            else:
                setattr(licitacao, key, value)
        db.session.commit()
        return True

    def to_dict(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "orgao": self.orgao,
            "numero": self.numero,
            "valor_estimado": self.valor_estimado,
            "data_abertura": self.data_abertura.isoformat() if self.data_abertura else None,
            "data_limite": self.data_limite.isoformat() if self.data_limite else None,
            "status": self.status,
            "portal": self.portal,
            "url": self.url,
            "palavras_encontradas": self.palavras_encontradas.split(",") if self.palavras_encontradas else [],
            "descricao": self.descricao,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


