import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Edit, 
  Eye, 
  Download, 
  Printer, 
  Search,
  Filter,
  Grid,
  List,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import mockData from '../data/mockData';

const SelfStorage = () => {
  const [boxes, setBoxes] = useState(mockData.boxes);
  const [filteredBoxes, setFilteredBoxes] = useState(mockData.boxes);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBox, setSelectedBox] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'add'

  useEffect(() => {
    let filtered = boxes;

    // Filtrar por status
    if (filterStatus !== 'todos') {
      filtered = filtered.filter(box => box.status === filterStatus);
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(box => 
        box.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (box.cliente && box.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBoxes(filtered);
  }, [boxes, filterStatus, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'livre': return 'bg-green-100 text-green-800 border-green-200';
      case 'ocupado': return 'bg-red-100 text-red-800 border-red-200';
      case 'manutencao': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'livre': return <CheckCircle className="h-4 w-4" />;
      case 'ocupado': return <XCircle className="h-4 w-4" />;
      case 'manutencao': return <AlertTriangle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const handleBoxClick = (box, mode = 'view') => {
    setSelectedBox(box);
    setModalMode(mode);
    setShowModal(true);
  };

  const handleSaveBox = (boxData) => {
    if (modalMode === 'add') {
      const newBox = {
        ...boxData,
        id: boxes.length + 1
      };
      setBoxes([...boxes, newBox]);
    } else {
      setBoxes(boxes.map(box => 
        box.id === selectedBox.id ? { ...box, ...boxData } : box
      ));
    }
    setShowModal(false);
    setSelectedBox(null);
  };

  const exportToPDF = () => {
    // Simular exportação para PDF
    alert('Funcionalidade de exportação para PDF será implementada com a API real');
  };

  const printReport = () => {
    // Simular impressão
    window.print();
  };

  const BoxCard = ({ box }) => (
    <div 
      className={`bg-white rounded-lg shadow-md border-2 hover:shadow-lg transition-all duration-300 cursor-pointer ${
        box.status === 'ocupado' ? 'border-red-200' : 
        box.status === 'livre' ? 'border-green-200' : 'border-yellow-200'
      }`}
      onClick={() => handleBoxClick(box)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">{box.numero}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(box.status)}`}>
            {getStatusIcon(box.status)}
            <span className="capitalize">{box.status}</span>
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Dimensões:</strong> {box.altura}m × {box.largura}m × {box.profundidade}m</p>
          <p><strong>Volume:</strong> {(box.altura * box.largura * box.profundidade).toFixed(1)}m³</p>
          
          {box.status === 'ocupado' && (
            <>
              <p><strong>Cliente:</strong> {box.cliente}</p>
              <p><strong>CPF/CNPJ:</strong> {box.cpfCnpj}</p>
              <p><strong>Entrada:</strong> {new Date(box.dataEntrada).toLocaleDateString('pt-BR')}</p>
            </>
          )}
          
          {box.observacoes && (
            <p><strong>Obs:</strong> {box.observacoes}</p>
          )}
        </div>
      </div>
    </div>
  );

  const BoxModal = () => {
    const [formData, setFormData] = useState(selectedBox || {
      numero: '',
      altura: 2.5,
      largura: 2.0,
      profundidade: 3.0,
      status: 'livre',
      cliente: '',
      cpfCnpj: '',
      dataEntrada: '',
      observacoes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSaveBox(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {modalMode === 'add' ? 'Adicionar Box' : 
               modalMode === 'edit' ? 'Editar Box' : 'Detalhes do Box'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número do Box
                </label>
                <input
                  type="text"
                  value={formData.numero}
                  onChange={(e) => setFormData({...formData, numero: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={modalMode === 'view'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={modalMode === 'view'}
                >
                  <option value="livre">Livre</option>
                  <option value="ocupado">Ocupado</option>
                  <option value="manutencao">Manutenção</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Altura (m)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.altura}
                  onChange={(e) => setFormData({...formData, altura: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={modalMode === 'view'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Largura (m)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.largura}
                  onChange={(e) => setFormData({...formData, largura: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={modalMode === 'view'}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profundidade (m)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.profundidade}
                  onChange={(e) => setFormData({...formData, profundidade: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={modalMode === 'view'}
                  required
                />
              </div>
            </div>

            {formData.status === 'ocupado' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cliente
                    </label>
                    <input
                      type="text"
                      value={formData.cliente || ''}
                      onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={modalMode === 'view'}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CPF/CNPJ
                    </label>
                    <input
                      type="text"
                      value={formData.cpfCnpj || ''}
                      onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={modalMode === 'view'}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Entrada
                  </label>
                  <input
                    type="date"
                    value={formData.dataEntrada || ''}
                    onChange={(e) => setFormData({...formData, dataEntrada: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={modalMode === 'view'}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={formData.observacoes || ''}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={modalMode === 'view'}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {modalMode === 'view' ? 'Fechar' : 'Cancelar'}
              </button>
              
              {modalMode === 'view' && (
                <button
                  type="button"
                  onClick={() => setModalMode('edit')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Editar
                </button>
              )}
              
              {modalMode !== 'view' && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Salvar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  const statusCounts = {
    total: boxes.length,
    livre: boxes.filter(box => box.status === 'livre').length,
    ocupado: boxes.filter(box => box.status === 'ocupado').length,
    manutencao: boxes.filter(box => box.status === 'manutencao').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Self Storage</h1>
              <p className="text-gray-600 mt-1">Gerenciamento de Guarda-Móveis</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Download className="h-4 w-4" />
                <span>Exportar PDF</span>
              </button>
              <button
                onClick={printReport}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Printer className="h-4 w-4" />
                <span>Imprimir</span>
              </button>
              <button
                onClick={() => handleBoxClick(null, 'add')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Box</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Boxes</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Livres</p>
                <p className="text-2xl font-bold text-green-600">{statusCounts.livre}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ocupados</p>
                <p className="text-2xl font-bold text-red-600">{statusCounts.ocupado}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Manutenção</p>
                <p className="text-2xl font-bold text-yellow-600">{statusCounts.manutencao}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar por box ou cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos os Status</option>
                <option value="livre">Livres</option>
                <option value="ocupado">Ocupados</option>
                <option value="manutencao">Manutenção</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Boxes */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredBoxes.map((box) => (
            <BoxCard key={box.id} box={box} />
          ))}
        </div>

        {filteredBoxes.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum box encontrado com os filtros aplicados.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && <BoxModal />}
    </div>
  );
};

export default SelfStorage;

