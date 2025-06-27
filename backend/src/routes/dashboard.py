from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from src.models.user_activity import UserActivity
from src.models.user import User
from src.database import get_db
from datetime import datetime, timedelta

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/metricas", methods=["GET"])
@jwt_required()
def get_metricas():
    """Obter métricas principais do dashboard"""
    try:
        db = get_db()
        
        # Data limite para análises (últimos 30 dias)
        data_limite = datetime.utcnow() - timedelta(days=30)
        
        # Contar clientes ativos (simulado por enquanto)
        clientes_ativos = 150
        
        # Contar orçamentos pendentes
        orcamentos_pendentes = db.orcamentos.count_documents({"status": "pendente"}) if "orcamentos" in db.list_collection_names() else 5
        
        # Contar contratos ativos (simulado)
        contratos_ativos = 25
        
        # Faturamento mensal (simulado)
        faturamento_mensal = 125000.00
        
        # Contar leads ativos (simulado)
        leads_ativos = 30
        
        return jsonify({
            "metricas": {
                "clientes_ativos": clientes_ativos,
                "orcamentos_pendentes": orcamentos_pendentes,
                "contratos_ativos": contratos_ativos,
                "faturamento_mensal": faturamento_mensal,
                "leads_ativos": leads_ativos
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/atividades-recentes", methods=["GET"])
@jwt_required()
def get_atividades_recentes():
    """Obter atividades recentes do sistema"""
    try:
        # Obter últimas 10 atividades
        atividades = UserActivity.get_all_activities(limit=10)
        
        atividades_data = []
        for atividade in atividades:
            # Buscar nome do usuário
            user = User.find_by_id(atividade.user_id)
            user_name = user.name if user else "Usuário desconhecido"
            
            atividades_data.append({
                "id": str(atividade._id),
                "action": atividade.action,
                "description": atividade.description,
                "user_name": user_name,
                "timestamp": atividade.timestamp.isoformat() if atividade.timestamp else None
            })
        
        return jsonify({"atividades": atividades_data}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/calendario", methods=["GET"])
@jwt_required()
def get_calendario():
    """Obter eventos do calendário"""
    try:
        db = get_db()
        
        eventos = []
        
        # Buscar orçamentos com data de visita se a coleção existir
        if "orcamentos" in db.list_collection_names():
            orcamentos = list(db.orcamentos.find({
                "data_visita": {"$exists": True, "$ne": None}
            }).limit(20))
            
            for orcamento in orcamentos:
                if orcamento.get("data_visita"):
                    eventos.append({
                        "id": str(orcamento["_id"]),
                        "titulo": f"Visita - {orcamento.get('cliente_nome', 'Cliente')}",
                        "data": orcamento["data_visita"].strftime("%Y-%m-%d") if isinstance(orcamento["data_visita"], datetime) else orcamento["data_visita"],
                        "tipo": "visita",
                        "cor": "blue"
                    })
        
        # Se não há eventos reais, retornar eventos simulados
        if not eventos:
            eventos = [
                {
                    "id": "1",
                    "titulo": "Visita - Cliente Silva",
                    "data": (datetime.utcnow() + timedelta(days=1)).strftime("%Y-%m-%d"),
                    "tipo": "visita",
                    "cor": "blue"
                },
                {
                    "id": "2",
                    "titulo": "Mudança - Empresa ABC",
                    "data": (datetime.utcnow() + timedelta(days=3)).strftime("%Y-%m-%d"),
                    "tipo": "mudanca",
                    "cor": "green"
                }
            ]
        
        return jsonify({"eventos": eventos}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/tempo-uso-colaboradores", methods=["GET"])
@jwt_required()
def get_tempo_uso_colaboradores():
    """Obter tempo de uso do sistema por colaborador"""
    try:
        user_id = get_jwt_identity()
        current_user = User.find_by_id(user_id)
        
        # Verificar se é admin
        if not current_user or current_user.role != 'admin':
            return jsonify({"error": "Acesso negado"}), 403
        
        # Obter data de hoje ou data específica
        date_str = request.args.get('date')
        if date_str:
            try:
                target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            except:
                target_date = datetime.utcnow().date()
        else:
            target_date = datetime.utcnow().date()
        
        # Obter todos os usuários
        users = User.get_all_users()
        
        colaboradores_tempo = []
        for user in users:
            if user.active:
                tempo_segundos = UserActivity.get_user_session_time(str(user._id), target_date)
                tempo_horas = round(tempo_segundos / 3600, 2)  # Converter para horas
                
                colaboradores_tempo.append({
                    "user_id": str(user._id),
                    "nome": user.name,
                    "cpf": user.cpf,
                    "role": user.role,
                    "tempo_uso_horas": tempo_horas,
                    "tempo_uso_formatado": f"{int(tempo_horas)}h {int((tempo_horas % 1) * 60)}min"
                })
        
        # Ordenar por tempo de uso (maior primeiro)
        colaboradores_tempo.sort(key=lambda x: x["tempo_uso_horas"], reverse=True)
        
        return jsonify({
            "data": target_date.isoformat(),
            "colaboradores": colaboradores_tempo
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/estatisticas-login", methods=["GET"])
@jwt_required()
def get_estatisticas_login():
    """Obter estatísticas de login dos últimos dias"""
    try:
        user_id = get_jwt_identity()
        current_user = User.find_by_id(user_id)
        
        # Verificar se é admin
        if not current_user or current_user.role != 'admin':
            return jsonify({"error": "Acesso negado"}), 403
        
        days = int(request.args.get('days', 30))
        estatisticas = UserActivity.get_login_statistics(days)
        
        return jsonify({
            "periodo_dias": days,
            "estatisticas": estatisticas
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/resumo-modulos", methods=["GET"])
@jwt_required()
def get_resumo_modulos():
    """Obter resumo dos módulos com badges de notificação"""
    try:
        db = get_db()
        
        resumo = {
            "clientes": 15,  # Simulado
            "orcamentos": db.orcamentos.count_documents({"status": "pendente"}) if "orcamentos" in db.list_collection_names() else 5,
            "contratos": 8,  # Simulado
            "ordens_servico": 12,  # Simulado
            "financeiro": 6,  # Simulado
            "leads": 25,  # Simulado
            "programa_pontos": 0,  # Simulado
            "licitacoes": 3  # Simulado
        }
        
        return jsonify({"resumo_modulos": resumo}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@dashboard_bp.route("/notificacoes", methods=["GET"])
@jwt_required()
def get_notificacoes():
    """Obter notificações do sistema"""
    try:
        db = get_db()
        
        notificacoes = []
        
        # Verificar orçamentos vencidos se a coleção existir
        if "orcamentos" in db.list_collection_names():
            data_limite = datetime.utcnow() - timedelta(days=7)
            orcamentos_vencidos = db.orcamentos.count_documents({
                "status": "pendente",
                "data_criacao": {"$lt": data_limite}
            })
            
            if orcamentos_vencidos > 0:
                notificacoes.append({
                    "id": "orcamentos_vencidos",
                    "titulo": "Orçamentos pendentes",
                    "mensagem": f"{orcamentos_vencidos} orçamentos pendentes há mais de 7 dias",
                    "tipo": "warning",
                    "lida": False,
                    "data": datetime.utcnow().isoformat()
                })
        
        # Se não há notificações reais, adicionar simuladas
        if not notificacoes:
            notificacoes.append({
                "id": "sistema_funcionando",
                "titulo": "Sistema funcionando",
                "mensagem": "Todas as funcionalidades estão operacionais",
                "tipo": "info",
                "lida": False,
                "data": datetime.utcnow().isoformat()
            })
        
        return jsonify({"notificacoes": notificacoes}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

