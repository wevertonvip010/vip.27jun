import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://vip-mudancas-api.glitch.me/api';

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de autenticação
export const authService = {
  login: async (cpf, password) => {
    const response = await api.post('/auth/login', { cpf, password });
    return response.data;
  },
  
  register: async (cpf, password, name, email, role = 'user') => {
    const response = await api.post('/auth/register', { cpf, password, name, email, role });
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  },
};

// Serviços de dashboard
export const dashboardService = {
  getMetricas: async () => {
    const response = await api.get('/dashboard/metricas');
    return response.data;
  },
  
  getAtividadesRecentes: async () => {
    const response = await api.get('/dashboard/atividades-recentes');
    return response.data;
  },
  
  getCalendario: async () => {
    const response = await api.get('/dashboard/calendario');
    return response.data;
  },
  
  getNotificacoes: async () => {
    const response = await api.get('/dashboard/notificacoes');
    return response.data;
  },
  
  getResumoModulos: async () => {
    const response = await api.get('/dashboard/resumo-modulos');
    return response.data;
  },
  
  getTempoUsoColaboradores: async (date) => {
    const params = date ? { date } : {};
    const response = await api.get('/dashboard/tempo-uso-colaboradores', { params });
    return response.data;
  },
  
  getEstatisticasLogin: async (days = 30) => {
    const response = await api.get('/dashboard/estatisticas-login', { params: { days } });
    return response.data;
  },
};

// Serviços de clientes
export const clientesService = {
  getAll: async (page = 1, perPage = 20) => {
    const response = await api.get('/clientes', { params: { page, per_page: perPage } });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/clientes', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/clientes/${id}`, data);
    return response.data;
  },
  
  updateStatus: async (id, status, justificativa = '') => {
    const response = await api.put(`/clientes/${id}/status`, { status, justificativa });
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  },
};

// Serviços de orçamentos
export const orcamentosService = {
  getAll: async (page = 1, perPage = 20, status = null) => {
    const params = { page, per_page: perPage };
    if (status) params.status = status;
    const response = await api.get('/orcamentos', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/orcamentos/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/orcamentos', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/orcamentos/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/orcamentos/${id}`);
    return response.data;
  },
  
  aprovar: async (id) => {
    const response = await api.post(`/orcamentos/${id}/aprovar`);
    return response.data;
  },
  
  rejeitar: async (id, motivo) => {
    const response = await api.post(`/orcamentos/${id}/rejeitar`, { motivo });
    return response.data;
  },
  
  getByVendedor: async (vendedorId) => {
    const response = await api.get(`/orcamentos/vendedor/${vendedorId}`);
    return response.data;
  },
  
  getByCliente: async (clienteId) => {
    const response = await api.get(`/orcamentos/cliente/${clienteId}`);
    return response.data;
  },
  
  getEstatisticas: async () => {
    const response = await api.get('/orcamentos/estatisticas');
    return response.data;
  },
};

// Serviços de leads
export const leadsService = {
  getAll: async (page = 1, perPage = 20) => {
    const response = await api.get('/leads', { params: { page, per_page: perPage } });
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/leads', data);
    return response.data;
  },
  
  capturar: async (filtros) => {
    const response = await api.post('/leads/capturar', { filtros });
    return response.data;
  },
  
  exportar: async () => {
    const response = await api.get('/leads/exportar');
    return response.data;
  },
};

// Serviços de licitações
export const licitacoesService = {
  getAll: async () => {
    const response = await api.get('/licitacoes');
    return response.data;
  },
  
  buscar: async (palavrasChave) => {
    const response = await api.post('/licitacoes/buscar', { palavras_chave: palavrasChave });
    return response.data;
  },
  
  configurarMonitoramento: async (config) => {
    const response = await api.post('/licitacoes/monitorar', config);
    return response.data;
  },
  
  getEstatisticas: async () => {
    const response = await api.get('/licitacoes/estatisticas');
    return response.data;
  },
};

// Serviços de IA
export const iaService = {
  analisarCliente: async (clienteData) => {
    const response = await api.post('/ia/analisar-cliente', clienteData);
    return response.data;
  },
  
  sugerirAcao: async (data) => {
    const response = await api.post('/ia/sugerir-acao', data);
    return response.data;
  },
  
  gerarMensagem: async (data) => {
    const response = await api.post('/ia/gerar-mensagem', data);
    return response.data;
  },
  
  chat: async (pergunta, contexto = '') => {
    const response = await api.post('/ia/chat', { pergunta, contexto });
    return response.data;
  },
};

// Serviços de integrações
export const integracoesService = {
  getConfiguracoes: async () => {
    const response = await api.get('/integracoes/configuracoes');
    return response.data;
  },
  
  salvarConfiguracoes: async (data) => {
    const response = await api.post('/integracoes/configuracoes', data);
    return response.data;
  },
  
  testarConexao: async (tipo) => {
    const response = await api.post(`/integracoes/testar/${tipo}`);
    return response.data;
  },
};

export default api;

