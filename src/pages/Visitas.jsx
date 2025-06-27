import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Download,
  ExternalLink
} from 'lucide-react';
import mockData from '../data/mockData';

const Visitas = () => {
  const [visitas, setVisitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVisita, setEditingVisita] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Dados mockados de visitas
    const visitasMock = [
      {
        id: 1,
        cliente: 'Maria Silva',
        telefone: '(11) 99999-1234',
        email: 'maria@email.com',
        endereco: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
        data: '2024-06-25',
        hora: '14:00',
        responsavel: 'Kenneth',
        status: 'agendada',
        observacoes: 'Cliente prefere horário da tarde. Apartamento no 5º andar.',
        tipoMudanca: 'Residencial',
        googleEventId: 'event_123'
      },
      {
        id: 2,
        cliente: 'João Santos',
        telefone: '(11) 88888-5678',
        email: 'joao@empresa.com',
        endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo',
        data: '2024-06-24',
        hora: '10:00',
        responsavel: 'Kenneth',
        status: 'realizada',
        observacoes: 'Mudança comercial. Muitos equipamentos eletrônicos.',
        tipoMudanca: 'Comercial',
        googleEventId: 'event_124'
      },
      {
        id: 3,
        cliente: 'Ana Costa',
        telefone: '(11) 77777-9012',
        email: 'ana@email.com',
        endereco: 'Rua Augusta, 500 - Consolação, São Paulo',
        data: '2024-06-23',
        hora: '16:00',
        responsavel: 'Douglas',
        status: 'cancelada',
        observacoes: 'Cliente cancelou por motivos pessoais.',
        tipoMudanca: 'Residencial',
        googleEventId: 'event_125'
      },
      {
        id: 4,
        cliente: 'Carlos Lima',
        telefone: '(11) 66666-3456',
        email: 'carlos@email.com',
        endereco: 'Rua Oscar Freire, 200 - Jardins, São Paulo',
        data: '2024-06-26',
        hora: '09:00',
        responsavel: 'Kenneth',
        status: 'agendada',
        observacoes: 'Casa grande, mudança completa.',
        tipoMudanca: 'Residencial',
        googleEventId: 'event_126'
      }
    ];
    setVisitas(visitasMock);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'agendada': return 'bg-blue-100 text-blue-800';
      case 'realizada': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'agendada': return <Clock className="h-4 w-4" />;
      case 'realizada': return <CheckCircle className="h-4 w-4" />;
      case 'cancelada': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleSaveVisita = (visitaData) => {
    if (editingVisita) {
      setVisitas(visitas.map(v => v.id === editingVisita.id ? { ...visitaData, id: editingVisita.id } : v));
    } else {
      const newVisita = {
        ...visitaData,
        id: Math.max(...visitas.map(v => v.id)) + 1,
        googleEventId: `event_${Date.now()}`
      };
      setVisitas([newVisita, ...visitas]);
    }
    setShowModal(false);
    setEditingVisita(null);
  };

  const handleDeleteVisita = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta visita?')) {
      setVisitas(visitas.filter(v => v.id !== id));
    }
  };

  const syncWithGoogleCalendar = (visita) => {
    // Mock da sincronização com Google Calendar
    alert(`Visita sincronizada com Google Agenda!\nEvento ID: ${visita.googleEventId}\nCliente: ${visita.cliente}\nData: ${new Date(visita.data).toLocaleDateString('pt-BR')} às ${visita.hora}`);
  };

  const filteredVisitas = visitas.filter(visita => {
    const matchesStatus = filtroStatus === 'todas' || visita.status === filtroStatus;
    const matchesSearch = visita.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visita.endereco.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const VisitaModal = () => {
    const [formData, setFormData] = useState({
      cliente: '',
      telefone: '',
      email: '',
      endereco: '',
      data: '',
      hora: '',
      responsavel: 'Kenneth',
      status: 'agendada',
      observacoes: '',
      tipoMudanca: 'Residencial'
    });

    useEffect(() => {
      if (editingVisita) {
        setFormData(editingVisita);
      }
    }, [editingVisita]);

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSaveVisita(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {editingVisita ? 'Editar Visita' : 'Nova Visita Técnica'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Cliente *
                </label>
                <input
                  type="text"
                  value={formData.cliente}
                  onChange={(e) => setFormData({...formData, cliente: e.target.value})}
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
                  placeholder="(11) 99999-9999"
                />
              </div>
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
                placeholder="cliente@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereço da Visita *
              </label>
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Rua, número, bairro, cidade"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data *
                </label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora *
                </label>
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({...formData, hora: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsável Técnico
                </label>
                <select
                  value={formData.responsavel}
                  onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Kenneth">Kenneth</option>
                  <option value="Douglas">Douglas</option>
                  <option value="Maciel">Maciel</option>
                  <option value="Diego">Diego</option>
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
                <option value="agendada">Agendada</option>
                <option value="realizada">Realizada</option>
                <option value="cancelada">Cancelada</option>
              </select>
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
                placeholder="Informações adicionais sobre a visita..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingVisita(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingVisita ? 'Atualizar' : 'Agendar'} Visita
              </button>
            </div>
          </form>
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
              <h1 className="text-3xl font-bold text-gray-900">Visitas Técnicas</h1>
              <p className="text-gray-600 mt-1">Agendamento e controle de visitas</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Nova Visita</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por cliente ou endereço..."
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
                <option value="todas">Todas as visitas</option>
                <option value="agendada">Agendadas</option>
                <option value="realizada">Realizadas</option>
                <option value="cancelada">Canceladas</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredVisitas.length} visita(s) encontrada(s)
            </div>
          </div>
        </div>

        {/* Lista de Visitas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Endereço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Responsável
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
                {filteredVisitas.map((visita) => (
                  <tr key={visita.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{visita.cliente}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {visita.telefone}
                        </div>
                        {visita.email && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {visita.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        {new Date(visita.data).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        {visita.hora}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-start">
                        <MapPin className="h-4 w-4 mr-2 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="max-w-xs">{visita.endereco}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <User className="h-4 w-4 mr-2 text-green-500" />
                        {visita.responsavel}
                      </div>
                      <div className="text-sm text-gray-500">{visita.tipoMudanca}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visita.status)}`}>
                        {getStatusIcon(visita.status)}
                        <span className="ml-1 capitalize">{visita.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => syncWithGoogleCalendar(visita)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Sincronizar com Google Agenda"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingVisita(visita);
                            setShowModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVisita(visita.id)}
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

        {filteredVisitas.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma visita encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filtroStatus !== 'todas' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece agendando uma nova visita técnica.'}
            </p>
          </div>
        )}

        {/* Integração Google Calendar Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <ExternalLink className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Integração com Google Agenda
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                Todas as visitas são automaticamente sincronizadas com a conta: 
                <strong> vip@vipmudancas.com.br</strong>
              </p>
              <p className="mt-1 text-xs text-blue-600">
                Clique no ícone de sincronização para confirmar o evento no Google Calendar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <VisitaModal />}
    </div>
  );
};

export default Visitas;

