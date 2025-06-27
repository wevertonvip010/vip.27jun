import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # MongoDB Configuration
    MONGODB_URI = os.environ.get("MONGODB_URI") or "mongodb://localhost:27017/vip_mudancas"
    MONGODB_DATABASE = os.environ.get("MONGODB_DATABASE") or "vip_mudancas"
    
    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "vip-mudancas-secret-key-2024"
    JWT_ACCESS_TOKEN_EXPIRES = False  # Token não expira
    
    # OpenAI Configuration
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
    OPENAI_MODEL = os.environ.get("OPENAI_MODEL") or "gpt-4"
    
    # Authentic Configuration
    AUTHENTIC_API_KEY = os.environ.get("AUTHENTIC_API_KEY")
    AUTHENTIC_BASE_URL = os.environ.get("AUTHENTIC_BASE_URL") or "https://api.authentic.com"
    
    # Google Configuration
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
    GOOGLE_REDIRECT_URI = os.environ.get("GOOGLE_REDIRECT_URI")
    GOOGLE_ANALYTICS_ID = os.environ.get("GOOGLE_ANALYTICS_ID")
    GOOGLE_CALENDAR_API_KEY = os.environ.get("GOOGLE_CALENDAR_API_KEY")
    GOOGLE_FORMS_API_KEY = os.environ.get("GOOGLE_FORMS_API_KEY")
    
    # CORS Configuration
    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")
    
    # App Configuration
    SECRET_KEY = os.environ.get("SECRET_KEY") or "vip-mudancas-flask-secret"
    DEBUG = os.environ.get("FLASK_DEBUG", "True").lower() == "true"
    
    # Upload Configuration
    UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER") or "uploads"
    MAX_CONTENT_LENGTH = int(os.environ.get("MAX_CONTENT_LENGTH", "16777216"))  # 16MB
    
    # Email Configuration
    SMTP_SERVER = os.environ.get("SMTP_SERVER")
    SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
    SMTP_USERNAME = os.environ.get("SMTP_USERNAME")
    SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")

