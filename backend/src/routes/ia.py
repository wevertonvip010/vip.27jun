from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import openai
import os
from src.config import Config

ia_bp = Blueprint('ia', __name__)

# Configurar OpenAI
openai.api_key = Config.OPENAI_API_KEY

@ia_bp.route('/analisar-cliente', methods=['POST'])
@jwt_required()
def analisar_cliente():
    """IA Mirante - Análise automática de cliente"""
    try:
        data = request.get_json()
        nome = data.get('nome', '')
        email = data.get('email', '')
        telefone = data.get('telefone', '')
        empresa = data.get('empresa', '')
        
        # Prompt para análise do cliente
        prompt = f"""
        Analise o seguinte cliente e classifique seu perfil como A, B ou AA:
        
        Nome: {nome}
        Email: {email}
        Telefone: {telefone}
        Empresa: {empresa}
        
        Critérios:
        - Perfil AA: Cliente premium, empresa grande, alto potencial de faturamento
        - Perfil A: Cliente bom, empresa média, potencial moderado
        - Perfil B: Cliente básico, empresa pequena, potencial baixo
        
        Responda apenas com a classificação (A, B ou AA) e uma breve justificativa de até 100 palavras.
        """
        
        if not Config.OPENAI_API_KEY:
            # Simulação quando não há API key
            perfil = "A"
            justificativa = "Análise simulada: Cliente com potencial moderado baseado nos dados fornecidos."
        else:
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "Você é um assistente especializado em análise de clientes para empresa de mudanças."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=150,
                    temperature=0.7
                )
                
                resultado = response.choices[0].message.content.strip()
                
                # Extrair perfil e justificativa
                if "AA" in resultado:
                    perfil = "AA"
                elif "A" in resultado:
                    perfil = "A"
                else:
                    perfil = "B"
                
                justificativa = resultado
                
            except Exception as e:
                print(f"Erro na API OpenAI: {e}")
                perfil = "A"
                justificativa = "Análise padrão aplicada devido a erro na IA."
        
        return jsonify({
            "perfil": perfil,
            "justificativa": justificativa,
            "analisado_por": "IA Mirante"
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@ia_bp.route('/sugerir-acao', methods=['POST'])
@jwt_required()
def sugerir_acao():
    """IA Mirante - Sugestão de ações para vendedores"""
    try:
        data = request.get_json()
        cliente_status = data.get('status', '')
        perfil = data.get('perfil', '')
        dias_sem_contato = data.get('dias_sem_contato', 0)
        
        # Prompt para sugestão de ação
        prompt = f"""
        Sugira a melhor ação para um vendedor com base nos dados do cliente:
        
        Status atual: {cliente_status}
        Perfil: {perfil}
        Dias sem contato: {dias_sem_contato}
        
        Forneça uma sugestão prática e específica de no máximo 80 palavras.
        """
        
        if not Config.OPENAI_API_KEY:
            # Sugestões simuladas
            sugestoes = {
                "Novo": "Entre em contato em até 24h. Envie WhatsApp personalizado apresentando a empresa e agendando visita técnica.",
                "Em análise": "Acompanhe o processo. Envie materiais informativos e mantenha contato regular a cada 3 dias.",
                "Perdido": "Analise os motivos da perda. Considere nova abordagem em 30 dias com oferta diferenciada."
            }
            sugestao = sugestoes.get(cliente_status, "Mantenha contato regular e acompanhe o cliente.")
        else:
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "Você é um assistente de vendas especializado em mudanças residenciais e comerciais."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=100,
                    temperature=0.7
                )
                
                sugestao = response.choices[0].message.content.strip()
                
            except Exception as e:
                print(f"Erro na API OpenAI: {e}")
                sugestao = "Mantenha contato regular e acompanhe o cliente de acordo com o status atual."
        
        return jsonify({
            "sugestao": sugestao,
            "gerado_por": "IA Mirante"
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@ia_bp.route('/gerar-mensagem', methods=['POST'])
@jwt_required()
def gerar_mensagem():
    """IA Mirante - Geração de mensagens personalizadas"""
    try:
        data = request.get_json()
        tipo_mensagem = data.get('tipo', 'whatsapp')  # whatsapp, email, sms
        nome_cliente = data.get('nome_cliente', '')
        contexto = data.get('contexto', '')
        
        prompts = {
            'whatsapp': f"""
            Crie uma mensagem de WhatsApp profissional e amigável para o cliente {nome_cliente}.
            Contexto: {contexto}
            
            A mensagem deve:
            - Ser cordial e profissional
            - Ter no máximo 150 caracteres
            - Incluir call-to-action
            - Representar a VIP Mudanças
            """,
            'email': f"""
            Crie um email profissional para o cliente {nome_cliente}.
            Contexto: {contexto}
            
            Inclua:
            - Assunto atrativo
            - Saudação personalizada
            - Corpo do email (máximo 200 palavras)
            - Assinatura da VIP Mudanças
            """,
            'sms': f"""
            Crie um SMS conciso para o cliente {nome_cliente}.
            Contexto: {contexto}
            
            Máximo 160 caracteres, direto e objetivo.
            """
        }
        
        prompt = prompts.get(tipo_mensagem, prompts['whatsapp'])
        
        if not Config.OPENAI_API_KEY:
            # Mensagens simuladas
            mensagens_simuladas = {
                'whatsapp': f"Olá {nome_cliente}! 👋 Somos da VIP Mudanças. Podemos ajudar com sua mudança? Entre em contato: (11) 99999-9999",
                'email': f"Assunto: Sua mudança com a VIP Mudanças\n\nOlá {nome_cliente},\n\nEsperamos que esteja bem! Entramos em contato para apresentar nossos serviços de mudança...",
                'sms': f"VIP Mudanças: Olá {nome_cliente}! Podemos ajudar com sua mudança? Ligue (11) 99999-9999"
            }
            mensagem = mensagens_simuladas.get(tipo_mensagem, mensagens_simuladas['whatsapp'])
        else:
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "Você é um especialista em comunicação para empresa de mudanças."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=200,
                    temperature=0.8
                )
                
                mensagem = response.choices[0].message.content.strip()
                
            except Exception as e:
                print(f"Erro na API OpenAI: {e}")
                mensagem = f"Olá {nome_cliente}! Somos da VIP Mudanças e gostaríamos de ajudar com sua mudança. Entre em contato conosco!"
        
        return jsonify({
            "tipo": tipo_mensagem,
            "mensagem": mensagem,
            "gerado_por": "IA Mirante"
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@ia_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat_ia():
    """IA Mirante - Chat interativo para vendedores"""
    try:
        data = request.get_json()
        pergunta = data.get('pergunta', '')
        contexto = data.get('contexto', '')
        
        prompt = f"""
        Você é a IA Mirante, assistente especializada da VIP Mudanças.
        
        Contexto: {contexto}
        Pergunta: {pergunta}
        
        Responda de forma útil, prática e específica para o negócio de mudanças.
        Máximo 200 palavras.
        """
        
        if not Config.OPENAI_API_KEY:
            resposta = "Olá! Sou a IA Mirante. No momento estou em modo simulação. Como posso ajudar com suas vendas e gestão de clientes?"
        else:
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "Você é a IA Mirante, assistente especializada em mudanças residenciais e comerciais da VIP Mudanças."},
                        {"role": "user", "content": prompt}
                    ],
                    max_tokens=250,
                    temperature=0.7
                )
                
                resposta = response.choices[0].message.content.strip()
                
            except Exception as e:
                print(f"Erro na API OpenAI: {e}")
                resposta = "Desculpe, estou com dificuldades técnicas no momento. Tente novamente em alguns instantes."
        
        return jsonify({
            "resposta": resposta,
            "assistente": "IA Mirante"
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

