from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.orcamento import Orcamento
from src.models.user import User
from src.models.user_activity import UserActivity
from datetime import datetime, timedelta

orcamentos_bp = Blueprint('orcamentos', __name__)

@orcamentos_bp.route('/', methods=['GET'])
@jwt_required()
def get_orcamentos():
    """Obter lista de orçamentos"""
    try:
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 20))
        status_filter = request.args.get('status')
        
        skip = (page - 1) * per_page
        orcamentos = Orcamento.get_all_orcamentos(limit=per_page, skip=skip, status_filter=status_filter)
        
        orcamentos_data = [orcamento.to_dict() for orcamento in orcamentos]
        
        return jsonify({
            "orcamentos": orcamentos_data,
            "page": page,
            "per_page": per_page
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orcamentos_bp.route('/<orcamento_id>', methods=['GET'])
@jwt_required()
def get_orcamento(orcamento_id):
    """Obter orçamento específico"""
    try:
        orcamento = Orcamento.find_by_id(orcamento_id)
        
        if not orcamento:
            return jsonify({"error": "Orçamento não encontrado"}), 404
        
        return jsonify({"orcamento": orcamento.to_dict()}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orcamentos_bp.route('/', methods=['POST'])
@jwt_required()
def create_orcamento():
    """Criar novo orçamento"""
    try:
        user_id = get_jwt_identity()
        user = User.find_by_id(user_id)
        
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        data = request.get_json()
        
        # Validar dados obrigatórios
        required_fields = ['cliente_nome', 'cliente_email', 'tipo_mudanca']
        for field in required_fields:
            if not data.get(field):
                return jsonify({"error": f"Campo {field} é obrigatório"}), 400
        
        # Adicionar dados do vendedor
        data['vendedor_id'] = str(user._id)
        data['vendedor_nome'] = user.name
        
        # Processar datas
        if data.get('data_mudanca'):
            try:
                data['data_mudanca'] = datetime.fromisoformat(data['data_mudanca'].replace('Z', '+00:00'))
            except:
                pass
        
        if data.get('data_visita'):
            try:
                data['data_visita'] = datetime.fromisoformat(data['data_visita'].replace('Z', '+00:00'))
            except:
                pass
        
        if data.get('validade'):
            try:
                data['validade'] = datetime.fromisoformat(data['validade'].replace('Z', '+00:00'))
            except:
                # Definir validade padrão de 30 dias
                data['validade'] = datetime.utcnow() + timedelta(days=30)
        else:
            data['validade'] = datetime.utcnow() + timedelta(days=30)
        
        # Calcular valor final
        valor_total = float(data.get('valor_total', 0))
        desconto = float(data.get('desconto', 0))
        data['valor_final'] = valor_total - desconto
        
        orcamento = Orcamento.create_orcamento(data)
        
        # Registrar atividade
        UserActivity.create_activity(
            user_id=user_id,
            action="create_orcamento",
            description=f"Orçamento {orcamento.numero_orcamento} criado"
        )
        
        return jsonify({
            "message": "Orçamento criado com sucesso",
            "orcamento": orcamento.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orcamentos_bp.route('/<orcamento_id>', methods=['PUT'])
@jwt_required()
def update_orcamento(orcamento_id):
    """Atualizar orçamento"""
    try:
        user_id = get_jwt_identity()
        orcamento = Orcamento.find_by_id(orcamento_id)
        
        if not orcamento:
            return jsonify({"error": "Orçamento não encontrado"}), 404
        
        data = request.get_json()
        
        # Processar datas
        if data.get('data_mudanca'):
            try:
                data['data_mudanca'] = datetime.fromisoformat(data['data_mudanca'].replace('Z', '+00:00'))
            except:
                pass
        
        if data.get('data_visita'):
            try:
                data['data_visita'] = datetime.fromisoformat(data['data_visita'].replace('Z', '+00:00'))
            except:
                pass
        
        if data.get('validade'):
            try:
                data['validade'] = datetime.fromisoformat(data['validade'].replace('Z', '+00:00'))
            except:
                pass
        
        # Recalcular valor final se necessário
        if 'valor_total' in data or 'desconto' in data:
            valor_total = float(data.get('valor_total', orcamento.valor_total))
            desconto = float(data.get('desconto', orcamento.desconto))
            data['valor_final'] = valor_total - desconto
        
        orcamento.update(data)
        
        # Registrar atividade
        UserActivity.create_activity(
            user_id=user_id,
            action="update_orcamento",
            description=f"Orçamento {orcamento.numero_orcamento} atualizado"
        )
        
        return jsonify({
            "message": "Orçamento atualizado com sucesso",
            "orcamento": orcamento.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orcamentos_bp.route('/<orcamento_id>', methods=['DELETE'])
@jwt_required()
def delete_orcamento(orcamento_id):
    """Deletar orçamento"""
    try:
        user_id = get_jwt_identity()
        user = User.find_by_id(user_id)
        
        # Verificar se é admin ou vendedor responsável
        orcamento = Orcamento.find_by_id(orcamento_id)
        if not orcamento:
            return jsonify({"error": "Orçamento não encontrado"}), 404
        
        if user.role != 'admin' and orcamento.vendedor_id != user_id:
            return jsonify({"error": "Sem permissão para deletar este orçamento"}), 403
        
        numero_orcamento = orcamento.numero_orcamento
        orcamento.delete()
        
        # Registrar atividade
        UserActivity.create_activity(
            user_id=user_id,
            action="delete_orcamento",
            description=f"Orçamento {numero_orcamento} deletado"
        )
        
        return jsonify({"message": "Orçamento deletado com sucesso"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orcamentos_bp.route('/<orcamento_id>/aprovar', methods=['POST'])
@jwt_required()
def aprovar_orcamento(orcamento_id):
    """Aprovar orçamento"""
    try:
        user_id = get_jwt_identity()
        orcamento = Orcamento.find_by_id(orcamento_id)
        
        if not orcamento:
            return jsonify({"error": "Orçamento não encontrado"}), 404
        
        orcamento.update({"status": "aprovado"})
        
        # Registrar atividade
        UserActivity.create_activity(
            user_id=user_id,
            action="approve_orcamento",
            description=f"Orçamento {orcamento.numero_orcamento} aprovado"
        )
        
        return jsonify({
            "message": "Orçamento aprovado com sucesso",
            "orcamento": orcamento.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orcamentos_bp.route('/<orcamento_id>/rejeitar', methods=['POST'])
@jwt_required()
def rejeitar_orcamento(orcamento_id):
    """Rejeitar orçamento"""
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        motivo = data.get('motivo', '')
        
        orcamento = Orcamento.find_by_id(orcamento_id)
        
        if not orcamento:
            return jsonify({"error": "Orçamento não encontrado"}), 404
        
        orcamento.update({
            "status": "rejeitado",
            "observacoes": f"{orcamento.observacoes}\n\nRejeitado: {motivo}".strip()
        })
        
        # Registrar atividade
        UserActivity.create_activity(
            user_id=user_id,
            action="reject_orcamento",
            description=f"Orçamento {orcamento.numero_orcamento} rejeitado: {motivo}"
        )
        
        return jsonify({
            "message": "Orçamento rejeitado",
            "orcamento": orcamento.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orcamentos_bp.route('/vendedor/<vendedor_id>', methods=['GET'])
@jwt_required()
def get_orcamentos_vendedor(vendedor_id):
    """Obter orçamentos de um vendedor específico"""
    try:
        orcamentos = Orcamento.get_by_vendedor(vendedor_id)
        orcamentos_data = [orcamento.to_dict() for orcamento in orcamentos]
        
        return jsonify({"orcamentos": orcamentos_data}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orcamentos_bp.route('/cliente/<cliente_id>', methods=['GET'])
@jwt_required()
def get_orcamentos_cliente(cliente_id):
    """Obter orçamentos de um cliente específico"""
    try:
        orcamentos = Orcamento.get_by_cliente(cliente_id)
        orcamentos_data = [orcamento.to_dict() for orcamento in orcamentos]
        
        return jsonify({"orcamentos": orcamentos_data}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orcamentos_bp.route('/estatisticas', methods=['GET'])
@jwt_required()
def get_estatisticas_orcamentos():
    """Obter estatísticas de orçamentos"""
    try:
        from src.database import get_db
        db = get_db()
        
        # Estatísticas gerais
        total_orcamentos = db.orcamentos.count_documents({})
        orcamentos_pendentes = db.orcamentos.count_documents({"status": "pendente"})
        orcamentos_aprovados = db.orcamentos.count_documents({"status": "aprovado"})
        orcamentos_rejeitados = db.orcamentos.count_documents({"status": "rejeitado"})
        
        # Valor total dos orçamentos aprovados
        pipeline_valor = [
            {"$match": {"status": "aprovado"}},
            {"$group": {"_id": None, "total": {"$sum": "$valor_final"}}}
        ]
        
        valor_result = list(db.orcamentos.aggregate(pipeline_valor))
        valor_total_aprovados = valor_result[0]["total"] if valor_result else 0
        
        # Taxa de conversão
        taxa_conversao = (orcamentos_aprovados / total_orcamentos * 100) if total_orcamentos > 0 else 0
        
        return jsonify({
            "estatisticas": {
                "total_orcamentos": total_orcamentos,
                "orcamentos_pendentes": orcamentos_pendentes,
                "orcamentos_aprovados": orcamentos_aprovados,
                "orcamentos_rejeitados": orcamentos_rejeitados,
                "valor_total_aprovados": valor_total_aprovados,
                "taxa_conversao": round(taxa_conversao, 2)
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

