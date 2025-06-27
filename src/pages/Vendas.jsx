import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  TrendingUp,
  User,
  Building,
  Target,
  Award,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Vendas = () => {
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroVendedor, setFiltroVendedor] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const vendedores = ['Kenneth', 'Douglas', 'Admin'];
  const origens = ['Indicação', 'Google Ads', 'Facebook', 'Instagram', 'Site', 'Telefone', 'WhatsApp', 'Parceria'];
  
  const statusConfig = {
    'novo_lead': { 
      label: 'Novo Lead', 
      color: 'bg-blue-100 text-blue-800', 
      icon: <User className="h-4 w-4" />,
      order: 1
    },
    'proposta': { 
      label: 'Proposta', 
      color: 'bg-yellow-100 text-yellow-800', 
      icon: <Target className="h-4 w-4" />,
      order: 2
    },
    'negociacao': { 
      label: 'Negociação', 
      color: 'bg-orange-100 text-orange-800', 
      icon: <TrendingUp className="h-4 w-4" />,
      order: 3
    },
    'fechado': { 
      label: 'Fechado', 
      color: 'bg-green-100 text-green-800', 
      icon: <CheckCircle className="h-4 w-4" />,
      order: 4
    },
    'perdido': { 
      label: 'Perdido', 
      color: 'bg-red-100 text-red-800', 
      icon: <XCircle className="h-4 w-4" />,
      order: 5
    }
  };

  useEffect(() => {
    // Dados mockados de leads
    const leadsMock = [
      {
        id: 1,
        nome: 'Maria Silva',
        telefone: '(11) 99999-1234',
        email: 'maria@email.com',
        empresa: 'Silva & Associados',
        origem: 'Google Ads',
        vendedor: 'Kenneth',
        status: 'novo_lead',
        valorEstimado: 2500.00,
        dataEntrada: '2024-06-20',
        ultimoContato: '2024-06-20',
        proximoContato: '2024-06-22',
        observacoes: 'Interessada em mudança residencial para apartamento maior',
        tipoMudanca: 'Residencial',
        enderecoOrigem: 'Vila Madalena, São Paulo',
        enderecoDestino: 'Jardins, São Paulo',
        probabilidade: 70,
        historico: [
          { data: '2024-06-20', acao: 'Lead criado', responsavel: 'Kenneth' },
          { data: '2024-06-20', acao: 'Primeiro contato realizado', responsavel: 'Kenneth' }
        ]
      },
      {
        id: 2,
        nome: 'João Santos',
        telefone: '(11) 88888-5678',
        email: 'joao@empresa.com',
        empresa: 'Tech Solutions',
        origem: 'Indicação',
        vendedor: 'Kenneth',
        status: 'proposta',
        valorEstimado: 8500.00,
        dataEntrada: '2024-06-18',
        ultimoContato: '2024-06-21',
        proximoContato: '2024-06-23',
        observacoes: 'Mudança de escritório, precisa de orçamento detalhado',
        tipoMudanca: 'Comercial',
        enderecoOrigem: 'Faria Lima, São Paulo',
        enderecoDestino: 'Vila Olímpia, São Paulo',
        probabilidade: 85,
        historico: [
          { data: '2024-06-18', acao: 'Lead criado', responsavel: 'Kenneth' },
          { data: '2024-06-19', acao: 'Visita técnica agendada', responsavel: 'Kenneth' },
          { data: '2024-06-21', acao: 'Proposta enviada', responsavel: 'Kenneth' }
        ]
      },
      {
        id: 3,
        nome: 'Ana Costa',
        telefone: '(11) 77777-9012',
        email: 'ana@email.com',
        empresa: '',
        origem: 'Facebook',
        vendedor: 'Douglas',
        status: 'negociacao',
        valorEstimado: 3200.00,
        dataEntrada: '2024-06-15',
        ultimoContato: '2024-06-21',
        proximoContato: '2024-06-24',
        observacoes: 'Negociando desconto, cliente sensível ao preço',
        tipoMudanca: 'Residencial',
        enderecoOrigem: 'Moema, São Paulo',
        enderecoDestino: 'Pinheiros, São Paulo',
        probabilidade: 60,
        historico: [
          { data: '2024-06-15', acao: 'Lead criado', responsavel: 'Douglas' },
          { data: '2024-06-16', acao: 'Proposta enviada', responsavel: 'Douglas' },
          { data: '2024-06-19', acao: 'Negociação iniciada', responsavel: 'Douglas' },
          { data: '2024-06-21', acao: 'Contraproposta recebida', responsavel: 'Douglas' }
        ]
      },
      {
        id: 4,
        nome: 'Carlos Oliveira',
        telefone: '(11) 66666-3456',
        email: 'carlos@loja.com',
        empresa: 'Loja do Carlos',
        origem: 'Site',
        vendedor: 'Kenneth',
        status: 'fechado',
        valorEstimado: 4500.00,
        dataEntrada: '2024-06-10',
        ultimoContato: '2024-06-19',
        proximoContato: '',
        observacoes: 'Venda fechada! Mudança agendada para 30/06',
        tipoMudanca: 'Comercial',
        enderecoOrigem: 'Centro, São Paulo',
        enderecoDestino: 'Liberdade, São Paulo',
        probabilidade: 100,
        historico: [
          { data: '2024-06-10', acao: 'Lead criado', responsavel: 'Kenneth' },
          { data: '2024-06-11', acao: 'Visita técnica realizada', responsavel: 'Kenneth' },
          { data: '2024-06-12', acao: 'Proposta enviada', responsavel: 'Kenneth' },
          { data: '2024-06-15', acao: 'Negociação', responsavel: 'Kenneth' },
          { data: '2024-06-19', acao: 'Venda fechada!', responsavel: 'Kenneth' }
        ]
      },
      {
        id: 5,
        nome: 'Fernanda Lima',
        telefone: '(11) 55555-7890',
        email: 'fernanda@email.com',
        empresa: '',
        origem: 'WhatsApp',
        vendedor: 'Douglas',
        status: 'perdido',
        valorEstimado: 1800.00,
        dataEntrada: '2024-06-12',
        ultimoContato: '2024-06-18',
        proximoContato: '',
        observacoes: 'Cliente desistiu, achou o preço alto',
        tipoMudanca: 'Residencial',
        enderecoOrigem: 'Santana, São Paulo',
        enderecoDestino: 'Tucuruvi, São Paulo',
        probabilidade: 0,
        historico: [
          { data: '2024-06-12', acao: 'Lead criado', responsavel: 'Douglas' },
          { data: '2024-06-13', acao: 'Proposta enviada', responsavel: 'Douglas' },
          { data: '2024-06-18', acao: 'Cliente desistiu', responsavel: 'Douglas' }
        ]
      }
    ];
    setLeads(leadsMock);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularMetricas = () => {
    const total = leads.length;
    const fechados = leads.filter(l => l.status === 'fechado').length;
    const perdidos = leads.filter(l => l.status === 'perdido').length;
    const ativos = leads.filter(l => !['fechado', 'perdido'].includes(l.status)).length;
    const valorTotal = leads.filter(l => l.status === 'fechado').reduce((sum, l) => sum + l.valorEstimado, 0);
    const valorPotencial = leads.filter(l => !['fechado', 'perdido'].includes(l.status)).reduce((sum, l) => sum + l.valorEstimado, 0);
    const taxaConversao = total > 0 ? (fechados / total * 100).toFixed(1) : 0;

    return {
      total,
      fechados,
      perdidos,
      ativos,
      valorTotal,
      valorPotencial,
      taxaConversao
    };
  };

  const handleSaveLead = (leadData) => {
    if (editingLead) {
      setLeads(leads.map(l => l.id === editingLead.id ? { ...leadData, id: editingLead.id } : l));
    } else {
      const newLead = {
        ...leadData,
        id: Math.max(...leads.map(l => l.id)) + 1,
        dataEntrada: new Date().toISOString().split('T')[0],
        ultimoContato: new Date().toISOString().split('T')[0],
        historico: [
          { data: new Date().toISOString().split('T')[0], acao: 'Lead criado', responsavel: leadData.vendedor }
        ]
      };
      setLeads([newLead, ...leads]);
    }
    setShowModal(false);
    setEditingLead(null);
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este lead?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleStatusChange = (leadId, newStatus) => {
    setLeads(leads.map(lead => {
      if (lead.id === leadId) {
        const updatedLead = { ...lead, status: newStatus };
        updatedLead.historico = [
          ...lead.historico,
          { 
            data: new Date().toISOString().split('T')[0], 
            acao: `Status alterado para ${statusConfig[newStatus].label}`, 
            responsavel: lead.vendedor 
          }
        ];
        return updatedLead;
      }
      return lead;
    }));
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filtroStatus === 'todos' || lead.status === filtroStatus;
    const matchesVendedor = filtroVendedor === 'todos' || lead.vendedor === filtroVendedor;
    const matchesSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.telefone.includes(searchTerm);
    return matchesStatus && matchesVendedor && matchesSearch;
  });

  const getLeadsByStatus = (status) => {
    return filteredLeads.filter(lead => lead.status === status);
  };

  const metricas = calcularMetricas();

  const LeadModal = () => {
    const [formData, setFormData] = useState({
      nome: '',
      telefone: '',
      email: '',
      empresa: '',
      origem: 'Site',
      vendedor: 'Kenneth',
      status: 'novo_lead',
      valorEstimado: 0,
      proximoContato: '',
      observacoes: '',
      tipoMudanca: 'Residencial',
      enderecoOrigem: '',
      enderecoDestino: '',
      probabilidade: 50
    });

    useEffect(() => {
      if (editingLead) {
        setFormData(editingLead);
      }
    }, [editingLead]);

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSaveLead(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {editingLead ? 'Editar Lead' : 'Novo Lead'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Dados Básicos */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dados do Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Dados da Venda */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dados da Venda</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Origem *
                  </label>
                  <select
                    value={formData.origem}
                    onChange={(e) => setFormData({...formData, origem: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {origens.map(origem => (
                      <option key={origem} value={origem}>{origem}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vendedor *
                  </label>
                  <select
                    value={formData.vendedor}
                    onChange={(e) => setFormData({...formData, vendedor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {vendedores.map(vendedor => (
                      <option key={vendedor} value={vendedor}>{vendedor}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Mudança
                  </label>
                  <select
                    value={formData.tipoMudanca}
                    onChange={(e) => setFormData({...formData, tipoMudanca: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Residencial">Residencial</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Self Storage">Self Storage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Estimado (R$)
                  </label>
                  <input
                    type="number"
                    value={formData.valorEstimado}
                    onChange={(e) => setFormData({...formData, valorEstimado: parseFloat(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Probabilidade (%)
                  </label>
                  <input
                    type="number"
                    value={formData.probabilidade}
                    onChange={(e) => setFormData({...formData, probabilidade: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {/* Endereços */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Endereços</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço de Origem
                  </label>
                  <input
                    type="text"
                    value={formData.enderecoOrigem}
                    onChange={(e) => setFormData({...formData, enderecoOrigem: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço de Destino
                  </label>
                  <input
                    type="text"
                    value={formData.enderecoDestino}
                    onChange={(e) => setFormData({...formData, enderecoDestino: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Agendamento e Observações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Próximo Contato
                </label>
                <input
                  type="date"
                  value={formData.proximoContato}
                  onChange={(e) => setFormData({...formData, proximoContato: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Informações adicionais sobre o lead..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingLead(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingLead ? 'Atualizar' : 'Criar'} Lead
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const LeadDetailsModal = () => {
    if (!selectedLead) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Detalhes do Lead - {selectedLead.nome}
            </h2>
            <button
              onClick={() => setShowDetails(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-3">DADOS DO CLIENTE</h3>
                <div className="space-y-2">
                  <p><strong>Nome:</strong> {selectedLead.nome}</p>
                  <p><strong>Telefone:</strong> {selectedLead.telefone}</p>
                  {selectedLead.email && <p><strong>E-mail:</strong> {selectedLead.email}</p>}
                  {selectedLead.empresa && <p><strong>Empresa:</strong> {selectedLead.empresa}</p>}
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-3">DADOS DA VENDA</h3>
                <div className="space-y-2">
                  <p><strong>Vendedor:</strong> {selectedLead.vendedor}</p>
                  <p><strong>Origem:</strong> {selectedLead.origem}</p>
                  <p><strong>Tipo:</strong> {selectedLead.tipoMudanca}</p>
                  <p><strong>Valor:</strong> {formatCurrency(selectedLead.valorEstimado)}</p>
                  <p><strong>Probabilidade:</strong> {selectedLead.probabilidade}%</p>
                </div>
              </div>
            </div>

            {/* Status e Datas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Status Atual</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[selectedLead.status].color}`}>
                  {statusConfig[selectedLead.status].icon}
                  <span className="ml-1">{statusConfig[selectedLead.status].label}</span>
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Data de Entrada</p>
                <p className="font-medium">{new Date(selectedLead.dataEntrada).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-sm text-gray-600">Último Contato</p>
                <p className="font-medium">{new Date(selectedLead.ultimoContato).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>

            {/* Endereços */}
            {(selectedLead.enderecoOrigem || selectedLead.enderecoDestino) && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">ENDEREÇOS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedLead.enderecoOrigem && (
                    <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                      <p className="font-medium text-red-800">ORIGEM:</p>
                      <p className="text-sm">{selectedLead.enderecoOrigem}</p>
                    </div>
                  )}
                  {selectedLead.enderecoDestino && (
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                      <p className="font-medium text-green-800">DESTINO:</p>
                      <p className="text-sm">{selectedLead.enderecoDestino}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Observações */}
            {selectedLead.observacoes && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-2">OBSERVAÇÕES</h3>
                <p className="text-gray-700 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  {selectedLead.observacoes}
                </p>
              </div>
            )}

            {/* Histórico */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">HISTÓRICO DE ATIVIDADES</h3>
              <div className="space-y-3">
                {selectedLead.historico.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-gray-50 p-3 rounded">
                    <div className="flex-shrink-0">
                      <Clock className="h-4 w-4 text-gray-400 mt-1" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.acao}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.data).toLocaleDateString('pt-BR')} - {item.responsavel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingLead(selectedLead);
                    setShowDetails(false);
                    setShowModal(true);
                  }}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => window.open(`tel:${selectedLead.telefone}`)}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <Phone className="h-4 w-4" />
                  <span>Ligar</span>
                </button>
                {selectedLead.email && (
                  <button
                    onClick={() => window.open(`mailto:${selectedLead.email}`)}
                    className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    <Mail className="h-4 w-4" />
                    <span>E-mail</span>
                  </button>
                )}
              </div>
              
              <div className="flex space-x-2">
                {Object.entries(statusConfig).map(([status, config]) => (
                  <button
                    key={status}
                    onClick={() => {
                      handleStatusChange(selectedLead.id, status);
                      setSelectedLead({...selectedLead, status});
                    }}
                    className={`px-2 py-1 text-xs rounded ${
                      selectedLead.status === status 
                        ? config.color 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pipeline de Vendas</h1>
              <p className="text-gray-600 mt-1">CRM e gestão de leads</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Lead</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total de Leads</p>
                <p className="text-2xl font-bold text-gray-900">{metricas.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vendas Fechadas</p>
                <p className="text-2xl font-bold text-gray-900">{metricas.fechados}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Faturado</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(metricas.valorTotal)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-gray-900">{metricas.taxaConversao}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos os status</option>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>

              <select
                value={filtroVendedor}
                onChange={(e) => setFiltroVendedor(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos os vendedores</option>
                {vendedores.map(vendedor => (
                  <option key={vendedor} value={vendedor}>{vendedor}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredLeads.length} lead(s) encontrado(s)
            </div>
          </div>
        </div>

        {/* Pipeline Kanban */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {Object.entries(statusConfig).map(([status, config]) => {
            const leadsDoStatus = getLeadsByStatus(status);
            const valorTotal = leadsDoStatus.reduce((sum, lead) => sum + lead.valorEstimado, 0);
            
            return (
              <div key={status} className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {config.icon}
                      <h3 className="font-medium text-gray-900">{config.label}</h3>
                    </div>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {leadsDoStatus.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(valorTotal)}
                  </p>
                </div>
                
                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                  {leadsDoStatus.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowDetails(true);
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{lead.nome}</h4>
                        <span className="text-xs text-gray-500">{lead.probabilidade}%</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{formatCurrency(lead.valorEstimado)}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{lead.vendedor}</span>
                        <span>{lead.origem}</span>
                      </div>
                      
                      {lead.proximoContato && (
                        <div className="flex items-center space-x-1 mt-2 text-xs text-orange-600">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(lead.proximoContato).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {leadsDoStatus.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                      <p className="text-sm">Nenhum lead neste estágio</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lista Detalhada */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">Lista Detalhada de Leads</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lead.nome}</div>
                        <div className="text-sm text-gray-500">{lead.empresa || 'Pessoa Física'}</div>
                        <div className="text-sm text-gray-500">{lead.tipoMudanca}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.telefone}</div>
                      {lead.email && <div className="text-sm text-gray-500">{lead.email}</div>}
                      <div className="text-sm text-gray-500">{lead.origem}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{lead.vendedor}</div>
                      <div className="text-sm text-gray-500">
                        Entrada: {new Date(lead.dataEntrada).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(lead.valorEstimado)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {lead.probabilidade}% probabilidade
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[lead.status].color}`}>
                        {statusConfig[lead.status].icon}
                        <span className="ml-1">{statusConfig[lead.status].label}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowDetails(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingLead(lead);
                            setShowModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum lead encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filtroStatus !== 'todos' || filtroVendedor !== 'todos'
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece criando um novo lead.'}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && <LeadModal />}
      {showDetails && <LeadDetailsModal />}
    </div>
  );
};

export default Vendas;

