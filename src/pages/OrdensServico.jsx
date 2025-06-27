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
  PlayCircle,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Truck,
  Package,
  Users,
  AlertTriangle,
  Send
} from 'lucide-react';

const OrdensServico = () => {
  const [ordens, setOrdens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingOrdem, setEditingOrdem] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewOrdem, setPreviewOrdem] = useState(null);
  const [contratosDisponiveis, setContratosDisponiveis] = useState([]);

  useEffect(() => {
    // Dados mockados de contratos ativos para gerar O.S.
    const contratosMock = [
      {
        id: 1,
        numero: 'CONT-001-2025',
        cliente: 'Maria Silva',
        telefone: '(11) 99999-1234',
        email: 'maria@email.com',
        enderecoOrigem: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
        enderecoDestino: 'Av. Paulista, 1000 - Bela Vista, São Paulo',
        tipoMudanca: 'Residencial',
        valor: 2500.00,
        dataExecucao: '2024-06-30',
        status: 'ativo'
      }
    ];
    setContratosDisponiveis(contratosMock);

    // Dados mockados de ordens de serviço
    const ordensMock = [
      {
        id: 1,
        numero: 'OS-001-2025',
        contratoId: 1,
        cliente: 'Maria Silva',
        telefone: '(11) 99999-1234',
        email: 'maria@email.com',
        enderecoOrigem: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
        enderecoDestino: 'Av. Paulista, 1000 - Bela Vista, São Paulo',
        tipoMudanca: 'Residencial',
        dataExecucao: '2024-06-30',
        horaInicio: '08:00',
        horaFim: '17:00',
        responsavel: 'Maciel',
        equipe: ['Diego', 'Sebastião', 'Barreto'],
        veiculo: 'Caminhão - Placa ABC-1234',
        status: 'agendada',
        observacoes: 'Apartamento no 3º andar sem elevador',
        itens: [
          { item: 'Sofá 3 lugares', quantidade: 1, observacao: 'Couro marrom' },
          { item: 'Mesa de jantar', quantidade: 1, observacao: '6 cadeiras' },
          { item: 'Geladeira', quantidade: 1, observacao: 'Frost free' },
          { item: 'Cama casal', quantidade: 1, observacao: 'Com colchão' },
          { item: 'Guarda-roupa', quantidade: 2, observacao: '3 portas cada' }
        ],
        checklist: [
          { item: 'Verificar acesso ao prédio', concluido: false },
          { item: 'Confirmar horário com cliente', concluido: false },
          { item: 'Preparar materiais de embalagem', concluido: false },
          { item: 'Verificar combustível do veículo', concluido: false }
        ]
      },
      {
        id: 2,
        numero: 'OS-002-2025',
        contratoId: 2,
        cliente: 'João Santos',
        telefone: '(11) 88888-5678',
        email: 'joao@empresa.com',
        enderecoOrigem: 'Av. Faria Lima, 500 - Itaim Bibi, São Paulo',
        enderecoDestino: 'Rua Augusta, 200 - Consolação, São Paulo',
        tipoMudanca: 'Comercial',
        dataExecucao: '2024-06-28',
        horaInicio: '09:00',
        horaFim: '18:00',
        responsavel: 'Diego',
        equipe: ['Maciel', 'Carlinhos', 'Alexandre', 'Alceu'],
        veiculo: 'Caminhão - Placa XYZ-5678',
        status: 'em_andamento',
        observacoes: 'Mudança de escritório com equipamentos eletrônicos',
        itens: [
          { item: 'Computadores', quantidade: 15, observacao: 'Desktops e notebooks' },
          { item: 'Mesas de escritório', quantidade: 10, observacao: 'L-shaped' },
          { item: 'Cadeiras', quantidade: 15, observacao: 'Ergonômicas' },
          { item: 'Arquivo de aço', quantidade: 5, observacao: '4 gavetas' },
          { item: 'Impressoras', quantidade: 3, observacao: 'Multifuncionais' }
        ],
        checklist: [
          { item: 'Verificar acesso ao prédio', concluido: true },
          { item: 'Confirmar horário com cliente', concluido: true },
          { item: 'Preparar materiais de embalagem', concluido: true },
          { item: 'Verificar combustível do veículo', concluido: true }
        ]
      },
      {
        id: 3,
        numero: 'OS-003-2025',
        contratoId: 3,
        cliente: 'Ana Costa',
        telefone: '(11) 77777-9012',
        email: 'ana@email.com',
        enderecoOrigem: 'Rua Oscar Freire, 300 - Jardins, São Paulo',
        enderecoDestino: 'Av. Rebouças, 1500 - Pinheiros, São Paulo',
        tipoMudanca: 'Residencial',
        dataExecucao: '2024-06-25',
        horaInicio: '08:00',
        horaFim: '16:00',
        responsavel: 'Maciel',
        equipe: ['Diego', 'Welison', 'Barreto'],
        veiculo: 'Caminhão - Placa DEF-9012',
        status: 'concluida',
        observacoes: 'Mudança executada com sucesso',
        itens: [
          { item: 'Móveis planejados', quantidade: 1, observacao: 'Desmontados' },
          { item: 'Eletrodomésticos', quantidade: 8, observacao: 'Diversos' },
          { item: 'Objetos pessoais', quantidade: 50, observacao: 'Caixas' }
        ],
        checklist: [
          { item: 'Verificar acesso ao prédio', concluido: true },
          { item: 'Confirmar horário com cliente', concluido: true },
          { item: 'Preparar materiais de embalagem', concluido: true },
          { item: 'Verificar combustível do veículo', concluido: true }
        ]
      }
    ];
    setOrdens(ordensMock);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'agendada': return 'bg-blue-100 text-blue-800';
      case 'em_andamento': return 'bg-yellow-100 text-yellow-800';
      case 'concluida': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'agendada': return <Clock className="h-4 w-4" />;
      case 'em_andamento': return <PlayCircle className="h-4 w-4" />;
      case 'concluida': return <CheckCircle className="h-4 w-4" />;
      case 'cancelada': return <XCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const gerarNumeroOS = () => {
    const proximoNumero = Math.max(...ordens.map(o => o.id)) + 1;
    return `OS-${String(proximoNumero).padStart(3, '0')}-2025`;
  };

  const handleSaveOrdem = (ordemData) => {
    if (editingOrdem) {
      setOrdens(ordens.map(o => o.id === editingOrdem.id ? { ...ordemData, id: editingOrdem.id } : o));
    } else {
      const newOrdem = {
        ...ordemData,
        id: Math.max(...ordens.map(o => o.id)) + 1,
        numero: gerarNumeroOS()
      };
      setOrdens([newOrdem, ...ordens]);
    }
    setShowModal(false);
    setEditingOrdem(null);
  };

  const handleDeleteOrdem = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta ordem de serviço?')) {
      setOrdens(ordens.filter(o => o.id !== id));
    }
  };

  const handleDownloadPDF = (ordem) => {
    // Mock do download
    alert(`Gerando PDF da ordem de serviço ${ordem.numero}...`);
  };

  const handleSendToTeam = (ordem) => {
    // Mock do envio para equipe
    alert(`Ordem de serviço ${ordem.numero} enviada para a equipe operacional!`);
  };

  const gerarOSDeContrato = (contrato) => {
    const novaOS = {
      contratoId: contrato.id,
      cliente: contrato.cliente,
      telefone: contrato.telefone,
      email: contrato.email,
      enderecoOrigem: contrato.enderecoOrigem,
      enderecoDestino: contrato.enderecoDestino,
      tipoMudanca: contrato.tipoMudanca,
      dataExecucao: contrato.dataExecucao,
      horaInicio: '08:00',
      horaFim: '17:00',
      responsavel: 'Maciel',
      equipe: ['Diego', 'Sebastião'],
      veiculo: 'Caminhão - Placa ABC-1234',
      status: 'agendada',
      observacoes: `O.S. gerada automaticamente a partir do contrato ${contrato.numero}`,
      itens: [
        { item: 'Itens diversos', quantidade: 1, observacao: 'Conforme inventário' }
      ],
      checklist: [
        { item: 'Verificar acesso ao prédio', concluido: false },
        { item: 'Confirmar horário com cliente', concluido: false },
        { item: 'Preparar materiais de embalagem', concluido: false },
        { item: 'Verificar combustível do veículo', concluido: false }
      ]
    };
    
    handleSaveOrdem(novaOS);
  };

  const filteredOrdens = ordens.filter(ordem => {
    const matchesStatus = filtroStatus === 'todos' || ordem.status === filtroStatus;
    const matchesSearch = ordem.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ordem.numero.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const OrdemModal = () => {
    const [formData, setFormData] = useState({
      cliente: '',
      telefone: '',
      email: '',
      enderecoOrigem: '',
      enderecoDestino: '',
      tipoMudanca: 'Residencial',
      dataExecucao: '',
      horaInicio: '08:00',
      horaFim: '17:00',
      responsavel: 'Maciel',
      equipe: ['Diego'],
      veiculo: 'Caminhão - Placa ABC-1234',
      status: 'agendada',
      observacoes: '',
      itens: [
        { item: '', quantidade: 1, observacao: '' }
      ],
      checklist: [
        { item: 'Verificar acesso ao prédio', concluido: false },
        { item: 'Confirmar horário com cliente', concluido: false },
        { item: 'Preparar materiais de embalagem', concluido: false },
        { item: 'Verificar combustível do veículo', concluido: false }
      ]
    });

    const funcionarios = ['Maciel', 'Diego', 'Sebastião', 'Barreto', 'Carlinhos', 'Alexandre', 'Alceu', 'Welison'];
    const veiculos = [
      'Caminhão - Placa ABC-1234',
      'Caminhão - Placa XYZ-5678',
      'Caminhão - Placa DEF-9012',
      'Van - Placa GHI-3456'
    ];

    useEffect(() => {
      if (editingOrdem) {
        setFormData(editingOrdem);
      }
    }, [editingOrdem]);

    const handleItemChange = (index, field, value) => {
      const newItens = [...formData.itens];
      newItens[index][field] = field === 'quantidade' ? parseInt(value) || 1 : value;
      setFormData({ ...formData, itens: newItens });
    };

    const addItem = () => {
      setFormData({
        ...formData,
        itens: [...formData.itens, { item: '', quantidade: 1, observacao: '' }]
      });
    };

    const removeItem = (index) => {
      setFormData({
        ...formData,
        itens: formData.itens.filter((_, i) => i !== index)
      });
    };

    const handleChecklistChange = (index, field, value) => {
      const newChecklist = [...formData.checklist];
      newChecklist[index][field] = value;
      setFormData({ ...formData, checklist: newChecklist });
    };

    const addChecklistItem = () => {
      setFormData({
        ...formData,
        checklist: [...formData.checklist, { item: '', concluido: false }]
      });
    };

    const removeChecklistItem = (index) => {
      setFormData({
        ...formData,
        checklist: formData.checklist.filter((_, i) => i !== index)
      });
    };

    const handleEquipeChange = (funcionario, checked) => {
      if (checked) {
        setFormData({
          ...formData,
          equipe: [...formData.equipe, funcionario]
        });
      } else {
        setFormData({
          ...formData,
          equipe: formData.equipe.filter(f => f !== funcionario)
        });
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSaveOrdem(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {editingOrdem ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Dados do Cliente */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dados do Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </div>
            </div>

            {/* Endereços e Execução */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dados da Execução</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora Início
                    </label>
                    <input
                      type="time"
                      value={formData.horaInicio}
                      onChange={(e) => setFormData({...formData, horaInicio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora Fim
                    </label>
                    <input
                      type="time"
                      value={formData.horaFim}
                      onChange={(e) => setFormData({...formData, horaFim: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Equipe e Veículo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Responsável e Equipe</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Responsável *
                  </label>
                  <select
                    value={formData.responsavel}
                    onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {funcionarios.map(funcionario => (
                      <option key={funcionario} value={funcionario}>{funcionario}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipe
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {funcionarios.map(funcionario => (
                      <label key={funcionario} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.equipe.includes(funcionario)}
                          onChange={(e) => handleEquipeChange(funcionario, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm">{funcionario}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Veículo e Status</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Veículo *
                    </label>
                    <select
                      value={formData.veiculo}
                      onChange={(e) => setFormData({...formData, veiculo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      {veiculos.map(veiculo => (
                        <option key={veiculo} value={veiculo}>{veiculo}</option>
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
                      <option value="agendada">Agendada</option>
                      <option value="em_andamento">Em Andamento</option>
                      <option value="concluida">Concluída</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Itens */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Lista de Itens</h3>
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
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Item
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
                        min="1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Observação
                      </label>
                      <input
                        type="text"
                        value={item.observacao}
                        onChange={(e) => handleItemChange(index, 'observacao', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Detalhes do item"
                      />
                    </div>
                    
                    <div className="flex justify-end">
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
            </div>

            {/* Checklist */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Checklist de Preparação</h3>
                <button
                  type="button"
                  onClick={addChecklistItem}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Item</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.checklist.map((checkItem, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={checkItem.concluido}
                      onChange={(e) => handleChecklistChange(index, 'concluido', e.target.checked)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <input
                      type="text"
                      value={checkItem.item}
                      onChange={(e) => handleChecklistChange(index, 'item', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Item do checklist"
                    />
                    <button
                      type="button"
                      onClick={() => removeChecklistItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
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
                placeholder="Informações adicionais sobre a ordem de serviço..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingOrdem(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingOrdem ? 'Atualizar' : 'Criar'} O.S.
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const PreviewModal = () => {
    if (!previewOrdem) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              Visualizar O.S. - {previewOrdem.numero}
            </h2>
            <button
              onClick={() => setShowPreview(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6">
            {/* Cabeçalho da O.S. */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-blue-600">VIP MUDANÇAS</h1>
              <p className="text-gray-600">ORDEM DE SERVIÇO</p>
              <p className="text-sm text-gray-500">O.S. Nº: {previewOrdem.numero}</p>
            </div>

            {/* Dados do Cliente e Execução */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">DADOS DO CLIENTE</h3>
                <p><strong>Nome:</strong> {previewOrdem.cliente}</p>
                <p><strong>Telefone:</strong> {previewOrdem.telefone}</p>
                {previewOrdem.email && <p><strong>E-mail:</strong> {previewOrdem.email}</p>}
                <p><strong>Tipo:</strong> {previewOrdem.tipoMudanca}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">DADOS DA EXECUÇÃO</h3>
                <p><strong>Data:</strong> {new Date(previewOrdem.dataExecucao).toLocaleDateString('pt-BR')}</p>
                <p><strong>Horário:</strong> {previewOrdem.horaInicio} às {previewOrdem.horaFim}</p>
                <p><strong>Responsável:</strong> {previewOrdem.responsavel}</p>
                <p><strong>Veículo:</strong> {previewOrdem.veiculo}</p>
              </div>
            </div>

            {/* Endereços */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">ENDEREÇOS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <p className="font-medium text-red-800">ORIGEM:</p>
                  <p className="text-sm">{previewOrdem.enderecoOrigem}</p>
                </div>
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <p className="font-medium text-green-800">DESTINO:</p>
                  <p className="text-sm">{previewOrdem.enderecoDestino}</p>
                </div>
              </div>
            </div>

            {/* Equipe */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">EQUIPE DESIGNADA</h3>
              <div className="bg-gray-50 p-3 rounded">
                <p><strong>Responsável:</strong> {previewOrdem.responsavel}</p>
                <p><strong>Equipe:</strong> {previewOrdem.equipe.join(', ')}</p>
              </div>
            </div>

            {/* Lista de Itens */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">LISTA DE ITENS</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left border-b">Item</th>
                      <th className="px-4 py-2 text-center border-b">Qtd</th>
                      <th className="px-4 py-2 text-left border-b">Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewOrdem.itens.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{item.item}</td>
                        <td className="px-4 py-2 text-center">{item.quantidade}</td>
                        <td className="px-4 py-2">{item.observacao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Checklist */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">CHECKLIST DE PREPARAÇÃO</h3>
              <div className="space-y-2">
                {previewOrdem.checklist.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 border-2 rounded ${item.concluido ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                      {item.concluido && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <span className={item.concluido ? 'line-through text-gray-500' : ''}>{item.item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Observações */}
            {previewOrdem.observacoes && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-2">OBSERVAÇÕES</h3>
                <p className="text-gray-700 bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                  {previewOrdem.observacoes}
                </p>
              </div>
            )}

            {/* Assinaturas */}
            <div className="mt-8 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="border-t border-gray-400 pt-2 mt-16">
                    <p className="font-bold">{previewOrdem.responsavel}</p>
                    <p className="text-sm text-gray-600">Responsável</p>
                  </div>
                </div>
                <div>
                  <div className="border-t border-gray-400 pt-2 mt-16">
                    <p className="font-bold">{previewOrdem.cliente}</p>
                    <p className="text-sm text-gray-600">Cliente</p>
                  </div>
                </div>
                <div>
                  <div className="border-t border-gray-400 pt-2 mt-16">
                    <p className="font-bold">VIP MUDANÇAS</p>
                    <p className="text-sm text-gray-600">Empresa</p>
                  </div>
                </div>
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
              <h1 className="text-3xl font-bold text-gray-900">Ordens de Serviço</h1>
              <p className="text-gray-600 mt-1">Gestão operacional de mudanças</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Nova O.S.</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contratos Ativos para O.S. */}
        {contratosDisponiveis.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-blue-800 mb-3">
              Contratos Ativos Disponíveis para O.S.
            </h3>
            <div className="space-y-2">
              {contratosDisponiveis.map((contrato) => (
                <div key={contrato.id} className="flex items-center justify-between bg-white p-3 rounded border">
                  <div>
                    <p className="font-medium">{contrato.numero} - {contrato.cliente}</p>
                    <p className="text-sm text-gray-600">
                      {contrato.tipoMudanca} - Execução: {new Date(contrato.dataExecucao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <button
                    onClick={() => gerarOSDeContrato(contrato)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Truck className="h-4 w-4" />
                    <span>Gerar O.S.</span>
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
                <option value="agendada">Agendada</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredOrdens.length} ordem(ns) encontrada(s)
            </div>
          </div>
        </div>

        {/* Lista de Ordens */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    O.S.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Execução
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipe
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
                {filteredOrdens.map((ordem) => (
                  <tr key={ordem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{ordem.numero}</div>
                        <div className="text-sm text-gray-500">{ordem.tipoMudanca}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Truck className="h-3 w-3 mr-1" />
                          {ordem.veiculo.split(' - ')[0]}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{ordem.cliente}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {ordem.telefone}
                        </div>
                        <div className="text-sm text-gray-500">
                          {ordem.itens.length} item(s)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                          {new Date(ordem.dataExecucao).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-gray-600">
                          {ordem.horaInicio} às {ordem.horaFim}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1 text-green-500" />
                          {ordem.responsavel}
                        </div>
                        <div className="text-gray-600 flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {ordem.equipe.length} pessoa(s)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ordem.status)}`}>
                        {getStatusIcon(ordem.status)}
                        <span className="ml-1 capitalize">{ordem.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setPreviewOrdem(ordem);
                            setShowPreview(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(ordem)}
                          className="text-green-600 hover:text-green-900"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleSendToTeam(ordem)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Enviar para Equipe"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingOrdem(ordem);
                            setShowModal(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrdem(ordem.id)}
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

        {filteredOrdens.length === 0 && (
          <div className="text-center py-12">
            <Truck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma ordem de serviço encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filtroStatus !== 'todos' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece criando uma nova O.S. ou gerando a partir de um contrato ativo.'}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && <OrdemModal />}
      {showPreview && <PreviewModal />}
    </div>
  );
};

export default OrdensServico;

