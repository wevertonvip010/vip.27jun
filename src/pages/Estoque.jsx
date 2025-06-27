import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Minus, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import mockData from '../data/mockData';

const Estoque = () => {
  const [itens, setItens] = useState(mockData.estoque);
  const [filteredItens, setFilteredItens] = useState(mockData.estoque);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'movement'
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMovementModal, setShowMovementModal] = useState(false);

  useEffect(() => {
    let filtered = itens;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo de movimentação
    if (filterTipo !== 'todos') {
      filtered = filtered.filter(item => item.tipo === filterTipo);
    }

    setFilteredItens(filtered);
  }, [itens, searchTerm, filterTipo]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (quantidade) => {
    if (quantidade <= 10) return 'text-red-600 bg-red-100';
    if (quantidade <= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusIcon = (quantidade) => {
    if (quantidade <= 10) return <AlertTriangle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    setModalMode('add');
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setModalMode('edit');
    setShowModal(true);
  };

  const handleMovement = (item) => {
    setSelectedItem(item);
    setShowMovementModal(true);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Tem certeza que deseja remover este item?')) {
      setItens(itens.filter(item => item.id !== itemId));
    }
  };

  const handleSaveItem = (itemData) => {
    if (modalMode === 'add') {
      const newItem = {
        ...itemData,
        id: Math.max(...itens.map(i => i.id)) + 1,
        ultimaMovimentacao: new Date().toISOString().split('T')[0],
        tipo: 'entrada'
      };
      setItens([...itens, newItem]);
    } else {
      setItens(itens.map(item => 
        item.id === selectedItem.id ? { ...item, ...itemData } : item
      ));
    }
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleMovementSave = (movementData) => {
    const updatedItem = {
      ...selectedItem,
      quantidade: movementData.tipo === 'entrada' 
        ? selectedItem.quantidade + parseInt(movementData.quantidade)
        : selectedItem.quantidade - parseInt(movementData.quantidade),
      ultimaMovimentacao: new Date().toISOString().split('T')[0],
      tipo: movementData.tipo
    };

    setItens(itens.map(item => 
      item.id === selectedItem.id ? updatedItem : item
    ));
    setShowMovementModal(false);
    setSelectedItem(null);
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Quantidade', 'Valor Unitário', 'Valor Total', 'Última Movimentação', 'Tipo'];
    const csvContent = [
      headers.join(','),
      ...itens.map(item => [
        item.nome,
        item.quantidade,
        item.valorUnitario,
        (item.quantidade * item.valorUnitario).toFixed(2),
        item.ultimaMovimentacao,
        item.tipo
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estoque_vip_mudancas.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const ItemModal = () => {
    const [formData, setFormData] = useState(selectedItem || {
      nome: '',
      quantidade: 0,
      valorUnitario: 0
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSaveItem(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {modalMode === 'add' ? 'Adicionar Item' : 'Editar Item'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Item
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
                Quantidade
              </label>
              <input
                type="number"
                value={formData.quantidade}
                onChange={(e) => setFormData({...formData, quantidade: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor Unitário (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.valorUnitario}
                onChange={(e) => setFormData({...formData, valorUnitario: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const MovementModal = () => {
    const [movementData, setMovementData] = useState({
      tipo: 'entrada',
      quantidade: 0,
      observacao: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleMovementSave(movementData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              Movimentação de Estoque
            </h2>
            <p className="text-gray-600 mt-1">{selectedItem?.nome}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Movimentação
              </label>
              <select
                value={movementData.tipo}
                onChange={(e) => setMovementData({...movementData, tipo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade
              </label>
              <input
                type="number"
                value={movementData.quantidade}
                onChange={(e) => setMovementData({...movementData, quantidade: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="1"
                max={movementData.tipo === 'saida' ? selectedItem?.quantidade : undefined}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observação
              </label>
              <textarea
                value={movementData.observacao}
                onChange={(e) => setMovementData({...movementData, observacao: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Motivo da movimentação..."
              />
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Estoque atual:</strong> {selectedItem?.quantidade} unidades
              </p>
              {movementData.quantidade && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Estoque após movimentação:</strong> {
                    movementData.tipo === 'entrada' 
                      ? selectedItem?.quantidade + parseInt(movementData.quantidade || 0)
                      : selectedItem?.quantidade - parseInt(movementData.quantidade || 0)
                  } unidades
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowMovementModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded-md ${
                  movementData.tipo === 'entrada' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {movementData.tipo === 'entrada' ? 'Adicionar' : 'Remover'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const valorTotalEstoque = itens.reduce((total, item) => total + (item.quantidade * item.valorUnitario), 0);
  const itensComEstoqueBaixo = itens.filter(item => item.quantidade <= 10).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Estoque</h1>
              <p className="text-gray-600 mt-1">Controle de materiais e suprimentos</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={exportToCSV}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </button>
              <button
                onClick={handleAddItem}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Item</span>
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
                <p className="text-sm font-medium text-gray-600">Total de Itens</p>
                <p className="text-2xl font-bold text-gray-900">{itens.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(valorTotalEstoque)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
                <p className="text-2xl font-bold text-red-600">{itensComEstoqueBaixo}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Últimas Saídas</p>
                <p className="text-2xl font-bold text-orange-600">
                  {itens.filter(item => item.tipo === 'saida').length}
                </p>
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
                  placeholder="Buscar itens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={filterTipo}
                onChange={(e) => setFilterTipo(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todas as Movimentações</option>
                <option value="entrada">Entradas</option>
                <option value="saida">Saídas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabela de Estoque */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Unitário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Movimentação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItens.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.nome}</div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.quantidade)}`}>
                            {getStatusIcon(item.quantidade)}
                            <span className="ml-1">
                              {item.quantidade <= 10 ? 'Estoque Baixo' : 'Estoque OK'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{item.quantidade}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatCurrency(item.valorUnitario)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {formatCurrency(item.quantidade * item.valorUnitario)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(item.ultimaMovimentacao).toLocaleDateString('pt-BR')}
                      </div>
                      <div className={`text-xs ${item.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.tipo === 'entrada' ? '↗ Entrada' : '↘ Saída'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleMovement(item)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Movimentar"
                        >
                          <TrendingUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
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

        {filteredItens.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum item encontrado.</p>
          </div>
        )}
      </div>

      {/* Modais */}
      {showModal && <ItemModal />}
      {showMovementModal && <MovementModal />}
    </div>
  );
};

export default Estoque;

