import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Download,
  Send,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Paperclip,
  MessageSquare
} from 'lucide-react';

const Orcamentos = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingOrcamento, setEditingOrcamento] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewOrcamento, setPreviewOrcamento] = useState(null);

  useEffect(() => {
    // Dados mockados de orçamentos
    const orcamentosMock = [
      {
        id: 1,
        numero: 'ORC-001-2024',
        cliente: 'Maria Silva',
        telefone: '(11) 99999-1234',
        email: 'maria@email.com',
        enderecoOrigem: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
        enderecoDestino: 'Av. Paulista, 1000 - Bela Vista, São Paulo',
        tipoMudanca: 'Residencial',
        dataVisita: '2024-06-20',
        dataOrcamento: '2024-06-21',
        validade: '2024-07-21',
        valor: 2500.00,
        status: 'enviado',
        vendedor: 'Kenneth',
        observacoes: 'Apartamento 2 quartos, sem elevador',
        itens: [
          { item: 'Embalagem', quantidade: 50, valor: 5.00 },
          { item: 'Transporte', quantidade: 1, valor: 800.00 },
          { item: 'Mão de obra', quantidade: 4, valor: 200.00 },
          { item: 'Seguro', quantidade: 1, valor: 150.00 }
        ],
        modelo: 'PDF'
      },
      {
        id: 2,
        numero: 'ORC-002-2024',
        cliente: 'João Santos',
        telefone: '(11) 88888-5678',
        email: 'joao@empresa.com',
        enderecoOrigem: 'Av. Faria Lima, 500 - Itaim Bibi, São Paulo',
        enderecoDestino: 'Rua Augusta, 200 - Consolação, São Paulo',
        tipoMudanca: 'Comercial',
        dataVisita: '2024-06-19',
        dataOrcamento: '2024-06-20',
        validade: '2024-07-20',
        valor: 4200.00,
        status: 'aprovado',
        vendedor: 'Kenneth',
        observacoes: 'Escritório com muitos equipamentos eletrônicos',
        itens: [
          { item: 'Embalagem especial', quantidade: 30, valor: 8.00 },
          { item: 'Transporte', quantidade: 1, valor: 1200.00 },
          { item: 'Mão de obra especializada', quantidade: 6, valor: 300.00 },
          { item: 'Seguro premium', quantidade: 1, valor: 250.00 }
        ],
        modelo: 'Word'
      },
      {
        id: 3,
        numero: 'ORC-003-2024',
        cliente: 'Ana Costa',
        telefone: '(11) 77777-9012',
        email: 'ana@email.com',
        enderecoOrigem: 'Rua Oscar Freire, 300 - Jardins, São Paulo',
        enderecoDestino: 'Av. Rebouças, 1500 - Pinheiros, São Paulo',
        tipoMudanca: 'Residencial',
        dataVisita: '2024-06-18',
        dataOrcamento: '2024-06-19',
        validade: '2024-07-19',
        valor: 3200.00,
        status: 'pendente',
        vendedor: 'Douglas',
        observacoes: 'Casa com móveis planejados',
        itens: [
          { item: 'Desmontagem', quantidade: 8, valor: 50.00 },
          { item: 'Embalagem', quantidade: 40, valor: 6.00 },
          { item: 'Transporte', quantidade: 1, valor: 1000.00 },
          { item: 'Montagem', quantidade: 8, valor: 50.00 }
        ],
        modelo: 'PDF'
      }
    ];
    setOrcamentos(orcamentosMock);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'enviado': return 'bg-blue-100 text-blue-800';
      case 'aprovado': return 'bg-green-100 text-green-800';
      case 'rejeitado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pendente': return <Clock className="h-4 w-4" />;
      case 'enviado': return <Send className="h-4 w-4" />;
      case 'aprovado': return <CheckCircle className="h-4 w-4" />;
      case 'rejeitado': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleSaveOrcamento = (orcamentoData) => {
    if (editingOrcamento) {
      setOrcamentos(orcamentos.map(o => o.id === editingOrcamento.id ? { ...orcamentoData, id: editingOrcamento.id } : o));
    } else {
      const newOrcamento = {
        ...orcamentoData,
        id: Math.max(...orcamentos.map(o => o.id)) + 1,
        numero: `ORC-${String(Math.max(...orcamentos.map(o => o.id)) + 1).padStart(3, '0')}-2024`,
        dataOrcamento: new Date().toISOString().split('T')[0]
      };
      setOrcamentos([newOrcamento, ...orcamentos]);
    }
    setShowModal(false);
    setEditingOrcamento(null);
  };

  const handleDeleteOrcamento = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este orçamento?')) {
      setOrcamentos(orcamentos.filter(o => o.id !== id));
    }
  };

  const handleSendOrcamento = (orcamento, method) => {
    // Mock do envio
    alert(`Orçamento ${orcamento.numero} enviado via ${method} para ${orcamento.cliente}!`);
    setOrcamentos(orcamentos.map(o => 
      o.id === orcamento.id ? { ...o, status: 'enviado' } : o
    ));
  };

  const handleDownloadPDF = (orcamento) => {
    // Mock do download
    alert(`Gerando PDF do orçamento ${orcamento.numero}...`);
  };

  const filteredOrcamentos = orcamentos.filter(orcamento => {
    const matchesStatus = filtroStatus === 'todos' || orcamento.status === filtroStatus;
    const matchesSearch = orcamento.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orcamento.numero.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const OrcamentoModal = () => {
    const [formData, setFormData] = useState({
      cliente: '',
      telefone: '',
      email: '',
      enderecoOrigem: '',
      enderecoDestino: '',
      tipoMudanca: 'Residencial',
      dataVisita: '',
      validade: '',
      vendedor: 'Kenneth',
      observacoes: '',
      modelo: 'PDF',
      itens: [
        { item: 'Embalagem', quantidade: 0, valor: 5.00 },
        { item: 'Transporte', quantidade: 1, valor: 0 },
        { item: 'Mão de obra', quantidade: 0, valor: 200.00 },
        { item: 'Seguro', quantidade: 1, valor: 150.00 }
      ],
      status: 'pendente'
    });

    useEffect(() => {
      if (editingOrcamento) {
        setFormData(editingOrcamento);
      }
    }, [editingOrcamento]);

    const calcularTotal = () => {
      return formData.itens.reduce((total, item) => total + (item.quantidade * item.valor), 0);
    };

    const handleItemChange = (index, field, value) => {
      const newItens = [...formData.itens];
      newItens[index][field] = field === 'quantidade' || field === 'valor' ? parseFloat(value) || 0 : value;
      setFormData({ ...formData, itens: newItens });
    };

    const addItem = () => {
      setFormData({
        ...formData,
        itens: [...formData.itens, { item: '', quantidade: 0, valor: 0 }]
      });
    };

    const removeItem = (index) => {
      setFormData({
        ...formData,
        itens: formData.itens.filter((_, i) => i !== index)
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const orcamentoData = {
        ...formData,
        valor: calcularTotal()
      };
      handleSaveOrcamento(orcamentoData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {editingOrcamento ? 'Editar Orçamento' : 'Novo Orçamento'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Dados do Cliente */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dados do Cliente</h3>
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
            </div>

            {/* Endereços */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Endereços</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço de Origem *
                  </label>
                  <input
                    type="text"
                    value={formData.enderecoOrigem}
                    onChange={(e) => setFormData({...formData, enderecoOrigem: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço de Destino *
                  </label>
                  <input
                    type="text"
                    value={formData.enderecoDestino}
                    onChange={(e) => setFormData({...formData, enderecoDestino: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dados do Orçamento */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dados do Orçamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data da Visita
                  </label>
                  <input
                    type="date"
                    value={formData.dataVisita}
                    onChange={(e) => setFormData({...formData, dataVisita: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Validade
                  </label>
                  <input
                    type="date"
                    value={formData.validade}
                    onChange={(e) => setFormData({...formData, validade: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vendedor
                  </label>
                  <select
                    value={formData.vendedor}
                    onChange={(e) => setFormData({...formData, vendedor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Kenneth">Kenneth</option>
                    <option value="Douglas">Douglas</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modelo do Orçamento
                  </label>
                  <select
                    value={formData.modelo}
                    onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Word">Word</option>
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
                    <option value="pendente">Pendente</option>
                    <option value="enviado">Enviado</option>
                    <option value="aprovado">Aprovado</option>
                    <option value="rejeitado">Rejeitado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Itens do Orçamento */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Itens do Orçamento</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Item</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.itens.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Item/Serviço
                      </label>
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) => handleItemChange(index, 'item', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descrição do item"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantidade
                      </label>
                      <input
                        type="number"
                        value={item.quantidade}
                        onChange={(e) => handleItemChange(index, 'quantidade', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor Unit. (R$)
                      </label>
                      <input
                        type="number"
                        value={item.valor}
                        onChange={(e) => handleItemChange(index, 'valor', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(item.quantidade * item.valor)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-end">
                  <div className="text-lg font-bold text-gray-900">
                    Total: {formatCurrency(calcularTotal())}
                  </div>
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={formData.observacoes}
                onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Informações adicionais sobre o orçamento..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingOrcamento(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingOrcamento ? 'Atualizar' : 'Criar'} Orçamento
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const PreviewModal = () => {
    if (!previewOrcamento) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Visualizar Orçamento - {previewOrcamento.numero}
            </h2>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            {/* Cabeçalho do Orçamento */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-blue-600">VIP MUDANÇAS</h1>
              <p className="text-gray-600">Orçamento de Mudança</p>
              <p className="text-sm text-gray-500">Número: {previewOrcamento.numero}</p>
            </div>

            {/* Dados do Cliente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Dados do Cliente</h3>
                <p><strong>Nome:</strong> {previewOrcamento.cliente}</p>
                <p><strong>Telefone:</strong> {previewOrcamento.telefone}</p>
                {previewOrcamento.email && <p><strong>E-mail:</strong> {previewOrcamento.email}</p>}
                <p><strong>Tipo:</strong> {previewOrcamento.tipoMudanca}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Dados do Orçamento</h3>
                <p><strong>Data:</strong> {new Date(previewOrcamento.dataOrcamento).toLocaleDateString('pt-BR')}</p>
                <p><strong>Validade:</strong> {new Date(previewOrcamento.validade).toLocaleDateString('pt-BR')}</p>
                <p><strong>Vendedor:</strong> {previewOrcamento.vendedor}</p>
                <p><strong>Status:</strong> <span className="capitalize">{previewOrcamento.status}</span></p>
              </div>
            </div>

            {/* Endereços */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Endereços</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-medium text-red-800">Origem:</p>
                  <p className="text-sm">{previewOrcamento.enderecoOrigem}</p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-green-800">Destino:</p>
                  <p className="text-sm">{previewOrcamento.enderecoDestino}</p>
                </div>
              </div>
            </div>

            {/* Itens */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Itens do Orçamento</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left border-b">Item/Serviço</th>
                      <th className="px-4 py-2 text-center border-b">Qtd</th>
                      <th className="px-4 py-2 text-right border-b">Valor Unit.</th>
                      <th className="px-4 py-2 text-right border-b">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewOrcamento.itens.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{item.item}</td>
                        <td className="px-4 py-2 text-center">{item.quantidade}</td>
                        <td className="px-4 py-2 text-right">{formatCurrency(item.valor)}</td>
                        <td className="px-4 py-2 text-right">{formatCurrency(item.quantidade * item.valor)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-right font-bold">Total Geral:</td>
                      <td className="px-4 py-2 text-right font-bold">{formatCurrency(previewOrcamento.valor)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Observações */}
            {previewOrcamento.observacoes && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-2">Observações</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{previewOrcamento.observacoes}</p>
              </div>
            )}

            {/* Rodapé */}
            <div className="text-center text-sm text-gray-600 border-t pt-4">
              <p>VIP Mudanças - Sua mudança em boas mãos</p>
              <p>Telefone: (11) 99999-0000 | E-mail: contato@vipmudancas.com.br</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Orçamentos</h1>
              <p className="text-gray-600 mt-1">Gestão completa de orçamentos</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Orçamento</span>
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
                  placeholder="Buscar por cliente ou número..."
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
                <option value="pendente">Pendente</option>
                <option value="enviado">Enviado</option>
                <option value="aprovado">Aprovado</option>
                <option value="rejeitado">Rejeitado</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredOrcamentos.length} orçamento(s) encontrado(s)
            </div>
          </div>
        </div>

        {/* Lista de Orçamentos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orçamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Validade
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
                {filteredOrcamentos.map((orcamento) => (
                  <tr key={orcamento.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{orcamento.numero}</div>
                        <div className="text-sm text-gray-500">{orcamento.tipoMudanca}</div>
                        <div className="text-sm text-gray-500">Vendedor: {orcamento.vendedor}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{orcamento.cliente}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {orcamento.telefone}
                        </div>
                        {orcamento.email && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {orcamento.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(orcamento.valor)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {orcamento.itens.length} item(s)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                          {new Date(orcamento.dataOrcamento).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-gray-500">
                          Válido até: {new Date(orcamento.validade).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(orcamento.status)}`}>
                        {getStatusIcon(orcamento.status)}
                        <span className="ml-1 capitalize">{orcamento.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setPreviewOrcamento(orcamento);
                            setShowPreview(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(orcamento)}
                          className="text-green-600 hover:text-green-900"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleSendOrcamento(orcamento, 'email')}
                          className="text-purple-600 hover:text-purple-900"
                          title="Enviar por E-mail"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleSendOrcamento(orcamento, 'whatsapp')}
                          className="text-green-600 hover:text-green-900"
                          title="Enviar por WhatsApp"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingOrcamento(orcamento);
                            setShowModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrcamento(orcamento.id)}
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

        {filteredOrcamentos.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum orçamento encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filtroStatus !== 'todos' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece criando um novo orçamento.'}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && <OrcamentoModal />}
      {showPreview && <PreviewModal />}
    </div>
  );
};

export default Orcamentos;

