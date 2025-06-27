import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Eye, 
  Users, 
  Calendar,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Square,
  BarChart3,
  PieChart,
  Upload,
  Download,
  Filter,
  Search,
  Star,
  Share2,
  Globe,
  Smartphone,
  Tv,
  Radio,
  FileText,
  Image,
  Video,
  MousePointer
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell
} from 'recharts';

const Marketing = () => {
  const [abaAtiva, setAbaAtiva] = useState('campanhas');
  const [modalCampanha, setModalCampanha] = useState(false);
  const [campanhaEditando, setCampanhaEditando] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [filtroMidia, setFiltroMidia] = useState('todas');

  // Dados mockados de campanhas
  const [campanhas, setCampanhas] = useState([
    {
      id: 1,
      nome: 'Mudanças Residenciais - Verão 2024',
      tipo: 'Meta Ads',
      status: 'ativa',
      dataInicio: '01/06/2024',
      dataFim: '31/08/2024',
      orcamento: 5000,
      gastoAtual: 3200,
      impressoes: 125000,
      cliques: 2800,
      leads: 156,
      conversoes: 23,
      roi: 340,
      ctr: 2.24,
      cpc: 1.14,
      observacoes: 'Campanha performando acima da média'
    },
    {
      id: 2,
      nome: 'Self Storage - Promoção Junho',
      tipo: 'Google Ads',
      status: 'ativa',
      dataInicio: '15/06/2024',
      dataFim: '15/07/2024',
      orcamento: 3000,
      gastoAtual: 1800,
      impressoes: 89000,
      cliques: 1950,
      leads: 89,
      conversoes: 34,
      roi: 520,
      ctr: 2.19,
      cpc: 0.92,
      observacoes: 'Excelente ROI, considerar aumentar orçamento'
    },
    {
      id: 3,
      nome: 'Influencer - @casaorganizada',
      tipo: 'Influencer',
      status: 'finalizada',
      dataInicio: '01/05/2024',
      dataFim: '31/05/2024',
      orcamento: 2500,
      gastoAtual: 2500,
      impressoes: 45000,
      cliques: 890,
      leads: 67,
      conversoes: 12,
      roi: 180,
      ctr: 1.98,
      cpc: 2.81,
      observacoes: 'Boa visibilidade, ROI abaixo do esperado'
    },
    {
      id: 4,
      nome: 'Panfletos - Bairros Nobres',
      tipo: 'Offline',
      status: 'pausada',
      dataInicio: '10/06/2024',
      dataFim: '10/07/2024',
      orcamento: 1200,
      gastoAtual: 800,
      impressoes: 15000,
      cliques: 0,
      leads: 23,
      conversoes: 8,
      roi: 250,
      ctr: 0,
      cpc: 0,
      observacoes: 'Distribuição pausada por chuvas'
    },
    {
      id: 5,
      nome: 'YouTube - Dicas de Mudança',
      tipo: 'YouTube',
      status: 'ativa',
      dataInicio: '01/06/2024',
      dataFim: '30/09/2024',
      orcamento: 4000,
      gastoAtual: 2100,
      impressoes: 78000,
      cliques: 1560,
      leads: 94,
      conversoes: 18,
      roi: 290,
      ctr: 2.00,
      cpc: 1.35,
      observacoes: 'Conteúdo educativo gerando engajamento'
    }
  ]);

  // Dados para gráficos
  const dadosPerformance = [
    { mes: 'Jan', leads: 45, conversoes: 12, gasto: 3200 },
    { mes: 'Fev', leads: 52, conversoes: 15, gasto: 3800 },
    { mes: 'Mar', leads: 38, conversoes: 9, gasto: 2900 },
    { mes: 'Abr', leads: 67, conversoes: 18, gasto: 4200 },
    { mes: 'Mai', leads: 89, conversoes: 23, gasto: 5100 },
    { mes: 'Jun', leads: 156, conversoes: 34, gasto: 6800 }
  ];

  const dadosROI = [
    { campanha: 'Meta Ads', roi: 340, gasto: 3200 },
    { campanha: 'Google Ads', roi: 520, gasto: 1800 },
    { campanha: 'YouTube', roi: 290, gasto: 2100 },
    { campanha: 'Influencer', roi: 180, gasto: 2500 },
    { campanha: 'Offline', roi: 250, gasto: 800 }
  ];

  const dadosMidia = [
    { nome: 'Meta Ads', valor: 35, cor: '#1877F2' },
    { nome: 'Google Ads', valor: 28, cor: '#4285F4' },
    { nome: 'YouTube', valor: 20, cor: '#FF0000' },
    { nome: 'Influencer', valor: 12, cor: '#E4405F' },
    { nome: 'Offline', valor: 5, cor: '#6B7280' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const calcularTotais = () => {
    const totalOrcamento = campanhas.reduce((sum, c) => sum + c.orcamento, 0);
    const totalGasto = campanhas.reduce((sum, c) => sum + c.gastoAtual, 0);
    const totalLeads = campanhas.reduce((sum, c) => sum + c.leads, 0);
    const totalConversoes = campanhas.reduce((sum, c) => sum + c.conversoes, 0);
    const roiMedio = campanhas.reduce((sum, c) => sum + c.roi, 0) / campanhas.length;
    
    return { totalOrcamento, totalGasto, totalLeads, totalConversoes, roiMedio };
  };

  const totais = calcularTotais();

  const adicionarCampanha = () => {
    setCampanhaEditando(null);
    setModalCampanha(true);
  };

  const editarCampanha = (campanha) => {
    setCampanhaEditando(campanha);
    setModalCampanha(true);
  };

  const salvarCampanha = () => {
    alert('Campanha salva com sucesso! (Mock)');
    setModalCampanha(false);
    setCampanhaEditando(null);
  };

  const alterarStatusCampanha = (id, novoStatus) => {
    setCampanhas(campanhas.map(c => 
      c.id === id ? { ...c, status: novoStatus } : c
    ));
    alert(`Campanha ${novoStatus} com sucesso!`);
  };

  const excluirCampanha = (id) => {
    if (confirm('Tem certeza que deseja excluir esta campanha?')) {
      setCampanhas(campanhas.filter(c => c.id !== id));
      alert('Campanha excluída com sucesso!');
    }
  };

  const uploadCreativo = () => {
    alert('Upload de criativo realizado com sucesso! (Mock)');
  };

  const exportarRelatorio = () => {
    alert('Relatório de marketing exportado com sucesso! (Mock)');
  };

  const campanhasFiltradas = campanhas.filter(campanha => {
    const statusMatch = filtroStatus === 'todas' || campanha.status === filtroStatus;
    const midiaMatch = filtroMidia === 'todas' || campanha.tipo === filtroMidia;
    return statusMatch && midiaMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativa': return 'bg-green-100 text-green-800';
      case 'pausada': return 'bg-yellow-100 text-yellow-800';
      case 'finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'Meta Ads': return <Smartphone className="h-4 w-4" />;
      case 'Google Ads': return <Globe className="h-4 w-4" />;
      case 'YouTube': return <Video className="h-4 w-4" />;
      case 'Influencer': return <Star className="h-4 w-4" />;
      case 'Offline': return <FileText className="h-4 w-4" />;
      default: return <Megaphone className="h-4 w-4" />;
    }
  };

  const renderAbaCampanhas = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Campanhas de Marketing</h3>
          <p className="text-sm text-gray-600">Gerencie suas campanhas e acompanhe resultados</p>
        </div>
        <button
          onClick={adicionarCampanha}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Nova Campanha</span>
        </button>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Orçamento Total</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(totais.totalOrcamento)}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-600">Gasto Atual</p>
              <p className="text-2xl font-bold text-red-900">{formatCurrency(totais.totalGasto)}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Total Leads</p>
              <p className="text-2xl font-bold text-green-900">{totais.totalLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Conversões</p>
              <p className="text-2xl font-bold text-purple-900">{totais.totalConversoes}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-600">ROI Médio</p>
              <p className="text-2xl font-bold text-orange-900">{totais.roiMedio.toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>
            
            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todas">Todos os status</option>
              <option value="ativa">Ativas</option>
              <option value="pausada">Pausadas</option>
              <option value="finalizada">Finalizadas</option>
            </select>

            <select
              value={filtroMidia}
              onChange={(e) => setFiltroMidia(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todas">Todas as mídias</option>
              <option value="Meta Ads">Meta Ads</option>
              <option value="Google Ads">Google Ads</option>
              <option value="YouTube">YouTube</option>
              <option value="Influencer">Influencer</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={uploadCreativo}
              className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </button>
            <button
              onClick={exportarRelatorio}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Campanhas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Período</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orçamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campanhasFiltradas.map((campanha) => (
                <tr key={campanha.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          {getTipoIcon(campanha.tipo)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{campanha.nome}</div>
                        <div className="text-sm text-gray-500">{campanha.tipo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campanha.status)}`}>
                      {campanha.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{campanha.dataInicio}</div>
                    <div className="text-gray-500">{campanha.dataFim}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium">{formatCurrency(campanha.orcamento)}</div>
                    <div className="text-gray-500">Gasto: {formatCurrency(campanha.gastoAtual)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{campanha.leads} leads</div>
                    <div className="text-gray-500">{campanha.conversoes} conversões</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${campanha.roi >= 300 ? 'text-green-600' : campanha.roi >= 200 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {campanha.roi}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => editarCampanha(campanha)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      {campanha.status === 'ativa' ? (
                        <button
                          onClick={() => alterarStatusCampanha(campanha.id, 'pausada')}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Pausar"
                        >
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campanha.status === 'pausada' ? (
                        <button
                          onClick={() => alterarStatusCampanha(campanha.id, 'ativa')}
                          className="text-green-600 hover:text-green-900"
                          title="Ativar"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
                      <button
                        onClick={() => alterarStatusCampanha(campanha.id, 'finalizada')}
                        className="text-gray-600 hover:text-gray-900"
                        title="Finalizar"
                      >
                        <Square className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => excluirCampanha(campanha.id)}
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
    </div>
  );

  const renderAbaAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Analytics de Marketing</h3>
        <p className="text-sm text-gray-600">Análise detalhada de performance e ROI</p>
      </div>

      {/* Performance ao Longo do Tempo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-6">Performance Mensal</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dadosPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={2} name="Leads" />
            <Line type="monotone" dataKey="conversoes" stroke="#10B981" strokeWidth={2} name="Conversões" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ROI por Campanha */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-6">ROI por Tipo de Mídia</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosROI}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="campanha" />
            <YAxis />
            <Tooltip formatter={(value, name) => [name === 'roi' ? `${value}%` : formatCurrency(value), name === 'roi' ? 'ROI' : 'Gasto']} />
            <Legend />
            <Bar dataKey="roi" fill="#8B5CF6" name="ROI %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distribuição por Mídia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-6">Distribuição de Investimento</h4>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={dadosMidia}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="valor"
                label={({ nome, valor }) => `${nome}: ${valor}%`}
              >
                {dadosMidia.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-6">Métricas Consolidadas</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">CTR Médio</span>
              <span className="text-lg font-bold text-gray-900">2.08%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">CPC Médio</span>
              <span className="text-lg font-bold text-gray-900">R$ 1,44</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Taxa de Conversão</span>
              <span className="text-lg font-bold text-gray-900">18.7%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Custo por Lead</span>
              <span className="text-lg font-bold text-gray-900">R$ 43,59</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-700">ROAS Geral</span>
              <span className="text-lg font-bold text-green-900">3.16x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketing</h1>
              <p className="text-gray-600 mt-1">Gerencie campanhas e acompanhe ROI</p>
            </div>
            <div className="flex items-center space-x-2">
              <Megaphone className="h-6 w-6 text-blue-600" />
              <span className="text-sm text-gray-600">{campanhas.filter(c => c.status === 'ativa').length} campanhas ativas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Abas */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setAbaAtiva('campanhas')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === 'campanhas'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Megaphone className="h-4 w-4" />
                  <span>Campanhas</span>
                </div>
              </button>
              <button
                onClick={() => setAbaAtiva('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  abaAtiva === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {abaAtiva === 'campanhas' && renderAbaCampanhas()}
            {abaAtiva === 'analytics' && renderAbaAnalytics()}
          </div>
        </div>
      </div>

      {/* Modal Nova Campanha */}
      {modalCampanha && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {campanhaEditando ? 'Editar Campanha' : 'Nova Campanha'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Campanha</label>
                  <input
                    type="text"
                    defaultValue={campanhaEditando?.nome || ''}
                    placeholder="Ex: Mudanças Residenciais - Verão 2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Mídia</label>
                  <select
                    defaultValue={campanhaEditando?.tipo || 'Meta Ads'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Influencer">Influencer</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                  <input
                    type="date"
                    defaultValue={campanhaEditando?.dataInicio ? campanhaEditando.dataInicio.split('/').reverse().join('-') : ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Fim</label>
                  <input
                    type="date"
                    defaultValue={campanhaEditando?.dataFim ? campanhaEditando.dataFim.split('/').reverse().join('-') : ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento (R$)</label>
                  <input
                    type="number"
                    defaultValue={campanhaEditando?.orcamento || ''}
                    placeholder="5000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    defaultValue={campanhaEditando?.status || 'ativa'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ativa">Ativa</option>
                    <option value="pausada">Pausada</option>
                    <option value="finalizada">Finalizada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                <textarea
                  defaultValue={campanhaEditando?.observacoes || ''}
                  placeholder="Observações sobre a campanha..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload de Criativos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={uploadCreativo}
                      className="text-blue-600 hover:text-blue-500"
                    >
                      Clique para fazer upload
                    </button>
                    <p className="text-gray-500">ou arraste arquivos aqui</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, MP4 até 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setModalCampanha(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={salvarCampanha}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {campanhaEditando ? 'Atualizar' : 'Criar'} Campanha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;

