import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Download,
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
  FileCheck,
  AlertTriangle,
  Building
} from 'lucide-react';

const Contratos = () => {
  const [contratos, setContratos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingContrato, setEditingContrato] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewContrato, setPreviewContrato] = useState(null);
  const [orcamentosDisponiveis, setOrcamentosDisponiveis] = useState([]);

  useEffect(() => {
    // Dados mockados de orçamentos aprovados para gerar contratos
    const orcamentosMock = [
      {
        id: 2,
        numero: 'ORC-002-2024',
        cliente: 'João Santos',
        telefone: '(11) 88888-5678',
        email: 'joao@empresa.com',
        cpfCnpj: '12.345.678/0001-90',
        enderecoOrigem: 'Av. Faria Lima, 500 - Itaim Bibi, São Paulo',
        enderecoDestino: 'Rua Augusta, 200 - Consolação, São Paulo',
        tipoMudanca: 'Comercial',
        valor: 4200.00,
        status: 'aprovado'
      }
    ];
    setOrcamentosDisponiveis(orcamentosMock);

    // Dados mockados de contratos
    const contratosMock = [
      {
        id: 1,
        numero: 'CONT-001-2025',
        orcamentoId: 1,
        cliente: 'Maria Silva',
        cpfCnpj: '123.456.789-00',
        telefone: '(11) 99999-1234',
        email: 'maria@email.com',
        enderecoOrigem: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
        enderecoDestino: 'Av. Paulista, 1000 - Bela Vista, São Paulo',
        tipoMudanca: 'Residencial',
        valor: 2500.00,
        dataContrato: '2024-06-21',
        dataExecucao: '2024-06-30',
        status: 'ativo',
        observacoes: 'Contrato gerado automaticamente a partir do orçamento ORC-001-2024',
        clausulas: [
          'O serviço será executado no endereço e data especificados',
          'O pagamento deverá ser efetuado conforme condições acordadas',
          'A empresa não se responsabiliza por objetos de valor não declarados',
          'Cancelamentos devem ser comunicados com 24h de antecedência'
        ]
      },
      {
        id: 2,
        numero: 'CONT-002-2025',
        orcamentoId: 2,
        cliente: 'João Santos',
        cpfCnpj: '12.345.678/0001-90',
        telefone: '(11) 88888-5678',
        email: 'joao@empresa.com',
        enderecoOrigem: 'Av. Faria Lima, 500 - Itaim Bibi, São Paulo',
        enderecoDestino: 'Rua Augusta, 200 - Consolação, São Paulo',
        tipoMudanca: 'Comercial',
        valor: 4200.00,
        dataContrato: '2024-06-20',
        dataExecucao: '2024-06-28',
        status: 'executado',
        observacoes: 'Mudança comercial executada com sucesso',
        clausulas: [
          'Serviço especializado para equipamentos eletrônicos',
          'Seguro premium incluído no valor',
          'Desmontagem e montagem de móveis planejados',
          'Embalagem especial para itens frágeis'
        ]
      },
      {
        id: 3,
        numero: 'CONT-003-2025',
        orcamentoId: 3,
        cliente: 'Ana Costa',
        cpfCnpj: '987.654.321-00',
        telefone: '(11) 77777-9012',
        email: 'ana@email.com',
        enderecoOrigem: 'Rua Oscar Freire, 300 - Jardins, São Paulo',
        enderecoDestino: 'Av. Rebouças, 1500 - Pinheiros, São Paulo',
        tipoMudanca: 'Residencial',
        valor: 3200.00,
        dataContrato: '2024-06-19',
        dataExecucao: '2024-07-05',
        status: 'cancelado',
        observacoes: 'Cancelado a pedido do cliente',
        clausulas: [
          'Desmontagem e montagem de móveis planejados',
          'Transporte de objetos frágeis com cuidado especial',
          'Limpeza básica do local de origem',
          'Seguro básico incluído'
        ]
      }
    ];
    setContratos(contratosMock);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-blue-100 text-blue-800';
      case 'executado': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'vencido': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ativo': return <Clock className="h-4 w-4" />;
      case 'executado': return <CheckCircle className="h-4 w-4" />;
      case 'cancelado': return <XCircle className="h-4 w-4" />;
      case 'vencido': return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const gerarNumeroContrato = () => {
    const proximoNumero = Math.max(...contratos.map(c => c.id)) + 1;
    return `CONT-${String(proximoNumero).padStart(3, '0')}-2025`;
  };

  const handleSaveContrato = (contratoData) => {
    if (editingContrato) {
      setContratos(contratos.map(c => c.id === editingContrato.id ? { ...contratoData, id: editingContrato.id } : c));
    } else {
      const newContrato = {
        ...contratoData,
        id: Math.max(...contratos.map(c => c.id)) + 1,
        numero: gerarNumeroContrato(),
        dataContrato: new Date().toISOString().split('T')[0]
      };
      setContratos([newContrato, ...contratos]);
    }
    setShowModal(false);
    setEditingContrato(null);
  };

  const handleDeleteContrato = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este contrato?')) {
      setContratos(contratos.filter(c => c.id !== id));
    }
  };

  const handleDownloadPDF = (contrato) => {
    // Mock do download
    alert(`Gerando PDF do contrato ${contrato.numero}...`);
  };

  const gerarContratoDeOrcamento = (orcamento) => {
    const novoContrato = {
      orcamentoId: orcamento.id,
      cliente: orcamento.cliente,
      cpfCnpj: orcamento.cpfCnpj || '',
      telefone: orcamento.telefone,
      email: orcamento.email,
      enderecoOrigem: orcamento.enderecoOrigem,
      enderecoDestino: orcamento.enderecoDestino,
      tipoMudanca: orcamento.tipoMudanca,
      valor: orcamento.valor,
      dataExecucao: '',
      status: 'ativo',
      observacoes: `Contrato gerado automaticamente a partir do orçamento ${orcamento.numero}`,
      clausulas: [
        'O serviço será executado no endereço e data especificados',
        'O pagamento deverá ser efetuado conforme condições acordadas',
        'A empresa não se responsabiliza por objetos de valor não declarados',
        'Cancelamentos devem ser comunicados com 24h de antecedência'
      ]
    };
    
    handleSaveContrato(novoContrato);
  };

  const filteredContratos = contratos.filter(contrato => {
    const matchesStatus = filtroStatus === 'todos' || contrato.status === filtroStatus;
    const matchesSearch = contrato.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contrato.numero.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const ContratoModal = () => {
    const [formData, setFormData] = useState({
      cliente: '',
      cpfCnpj: '',
      telefone: '',
      email: '',
      enderecoOrigem: '',
      enderecoDestino: '',
      tipoMudanca: 'Residencial',
      valor: 0,
      dataExecucao: '',
      status: 'ativo',
      observacoes: '',
      clausulas: [
        'O serviço será executado no endereço e data especificados',
        'O pagamento deverá ser efetuado conforme condições acordadas',
        'A empresa não se responsabiliza por objetos de valor não declarados',
        'Cancelamentos devem ser comunicados com 24h de antecedência'
      ]
    });

    useEffect(() => {
      if (editingContrato) {
        setFormData(editingContrato);
      }
    }, [editingContrato]);

    const handleClausulaChange = (index, value) => {
      const newClausulas = [...formData.clausulas];
      newClausulas[index] = value;
      setFormData({ ...formData, clausulas: newClausulas });
    };

    const addClausula = () => {
      setFormData({
        ...formData,
        clausulas: [...formData.clausulas, '']
      });
    };

    const removeClausula = (index) => {
      setFormData({
        ...formData,
        clausulas: formData.clausulas.filter((_, i) => i !== index)
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSaveContrato(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {editingContrato ? 'Editar Contrato' : 'Novo Contrato'}
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
                    CPF/CNPJ *
                  </label>
                  <input
                    type="text"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
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
              </div>
            </div>

            {/* Dados do Serviço */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dados do Serviço</h3>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      Valor do Contrato (R$) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.valor}
                      onChange={(e) => setFormData({...formData, valor: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Execução *
                    </label>
                    <input
                      type="date"
                      value={formData.dataExecucao}
                      onChange={(e) => setFormData({...formData, dataExecucao: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status e Observações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status do Contrato
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ativo">Ativo</option>
                  <option value="executado">Executado</option>
                  <option value="cancelado">Cancelado</option>
                  <option value="vencido">Vencido</option>
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
                  placeholder="Informações adicionais sobre o contrato..."
                />
              </div>
            </div>

            {/* Cláusulas Contratuais */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Cláusulas Contratuais</h3>
                <button
                  type="button"
                  onClick={addClausula}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Cláusula</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.clausulas.map((clausula, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-sm font-medium text-gray-500 mt-2">{index + 1}.</span>
                    <textarea
                      value={clausula}
                      onChange={(e) => handleClausulaChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="2"
                      placeholder="Digite a cláusula contratual..."
                    />
                    <button
                      type="button"
                      onClick={() => removeClausula(index)}
                      className="text-red-600 hover:text-red-800 mt-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingContrato(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingContrato ? 'Atualizar' : 'Criar'} Contrato
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const PreviewModal = () => {
    if (!previewContrato) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Visualizar Contrato - {previewContrato.numero}
            </h2>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            {/* Cabeçalho do Contrato */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-blue-600">VIP MUDANÇAS</h1>
              <p className="text-gray-600">CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE MUDANÇA</p>
              <p className="text-sm text-gray-500">Contrato Nº: {previewContrato.numero}</p>
              <p className="text-sm text-gray-500">Data: {new Date(previewContrato.dataContrato).toLocaleDateString('pt-BR')}</p>
            </div>

            {/* Partes do Contrato */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">PARTES CONTRATANTES</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">CONTRATADA:</h4>
                  <p><strong>VIP MUDANÇAS LTDA</strong></p>
                  <p>CNPJ: 00.000.000/0000-00</p>
                  <p>Endereço: Rua Exemplo, 123 - São Paulo/SP</p>
                  <p>Telefone: (11) 99999-0000</p>
                  <p>E-mail: contato@vipmudancas.com.br</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">CONTRATANTE:</h4>
                  <p><strong>{previewContrato.cliente}</strong></p>
                  <p>CPF/CNPJ: {previewContrato.cpfCnpj}</p>
                  <p>Telefone: {previewContrato.telefone}</p>
                  {previewContrato.email && <p>E-mail: {previewContrato.email}</p>}
                </div>
              </div>
            </div>

            {/* Objeto do Contrato */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">OBJETO DO CONTRATO</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2">
                  <strong>Tipo de Serviço:</strong> Mudança {previewContrato.tipoMudanca}
                </p>
                <p className="mb-2">
                  <strong>Endereço de Origem:</strong> {previewContrato.enderecoOrigem}
                </p>
                <p className="mb-2">
                  <strong>Endereço de Destino:</strong> {previewContrato.enderecoDestino}
                </p>
                <p className="mb-2">
                  <strong>Data de Execução:</strong> {new Date(previewContrato.dataExecucao).toLocaleDateString('pt-BR')}
                </p>
                <p className="mb-2">
                  <strong>Valor Total:</strong> <span className="text-lg font-bold text-green-600">{formatCurrency(previewContrato.valor)}</span>
                </p>
              </div>
            </div>

            {/* Cláusulas */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">CLÁUSULAS E CONDIÇÕES</h3>
              <div className="space-y-3">
                {previewContrato.clausulas.map((clausula, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="font-bold text-gray-700">{index + 1}.</span>
                    <p className="text-gray-700">{clausula}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Observações */}
            {previewContrato.observacoes && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-2">Observações</h3>
                <p className="text-gray-700 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  {previewContrato.observacoes}
                </p>
              </div>
            )}

            {/* Assinaturas */}
            <div className="mt-8 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="border-t border-gray-400 pt-2 mt-16">
                    <p className="font-bold">VIP MUDANÇAS LTDA</p>
                    <p className="text-sm text-gray-600">Contratada</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t border-gray-400 pt-2 mt-16">
                    <p className="font-bold">{previewContrato.cliente}</p>
                    <p className="text-sm text-gray-600">Contratante</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé */}
            <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t">
              <p>Este contrato foi gerado automaticamente pelo sistema VIP Mudanças</p>
              <p>São Paulo, {new Date().toLocaleDateString('pt-BR')}</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Contratos</h1>
              <p className="text-gray-600 mt-1">Gestão de contratos de mudança</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Novo Contrato</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Orçamentos Aprovados para Contrato */}
        {orcamentosDisponiveis.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-green-800 mb-3">
              Orçamentos Aprovados Disponíveis para Contrato
            </h3>
            <div className="space-y-2">
              {orcamentosDisponiveis.map((orcamento) => (
                <div key={orcamento.id} className="flex items-center justify-between bg-white p-3 rounded border">
                  <div>
                    <p className="font-medium">{orcamento.numero} - {orcamento.cliente}</p>
                    <p className="text-sm text-gray-600">
                      {orcamento.tipoMudanca} - {formatCurrency(orcamento.valor)}
                    </p>
                  </div>
                  <button
                    onClick={() => gerarContratoDeOrcamento(orcamento)}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <FileCheck className="h-4 w-4" />
                    <span>Gerar Contrato</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
                <option value="ativo">Ativo</option>
                <option value="executado">Executado</option>
                <option value="cancelado">Cancelado</option>
                <option value="vencido">Vencido</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredContratos.length} contrato(s) encontrado(s)
            </div>
          </div>
        </div>

        {/* Lista de Contratos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contrato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datas
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
                {filteredContratos.map((contrato) => (
                  <tr key={contrato.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contrato.numero}</div>
                        <div className="text-sm text-gray-500">{contrato.tipoMudanca}</div>
                        <div className="text-sm text-gray-500">CPF/CNPJ: {contrato.cpfCnpj}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contrato.cliente}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {contrato.telefone}
                        </div>
                        {contrato.email && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {contrato.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(contrato.valor)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                          Contrato: {new Date(contrato.dataContrato).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1 text-green-500" />
                          Execução: {new Date(contrato.dataExecucao).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contrato.status)}`}>
                        {getStatusIcon(contrato.status)}
                        <span className="ml-1 capitalize">{contrato.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setPreviewContrato(contrato);
                            setShowPreview(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(contrato)}
                          className="text-green-600 hover:text-green-900"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingContrato(contrato);
                            setShowModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteContrato(contrato.id)}
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

        {filteredContratos.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum contrato encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filtroStatus !== 'todos' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece criando um novo contrato ou gerando a partir de um orçamento aprovado.'}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && <ContratoModal />}
      {showPreview && <PreviewModal />}
    </div>
  );
};

export default Contratos;

