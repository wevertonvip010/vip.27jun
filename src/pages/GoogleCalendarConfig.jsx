  // Função para configurar Google Calendar
  const configurarGoogleCalendar = async () => {
    if (!googleCalendarConfig.apiKey || !googleCalendarConfig.accessToken) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const result = configure(googleCalendarConfig.apiKey, googleCalendarConfig.accessToken);
    
    if (result.success) {
      alert('Google Calendar configurado com sucesso! Sincronização ativada.');
    } else {
      alert(`Erro ao configurar: ${result.error}`);
    }
  };

  const testarSincronizacao = async () => {
    if (!isConfigured) {
      alert('Configure o Google Calendar primeiro.');
      return;
    }
    
    await syncEvents();
    alert('Sincronização testada com sucesso!');
  };

  const renderAbaGoogleCalendar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Integração Google Calendar</h3>
        <p className="text-sm text-gray-600">Configure a sincronização automática com o Google Agenda</p>
      </div>

      {/* Status da Configuração */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h4 className="text-lg font-medium text-gray-900">Status da Integração</h4>
          </div>
          
          {(() => {
            const status = getSyncStatus();
            return (
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                status.color === 'green' ? 'bg-green-100 text-green-800' :
                status.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                status.color === 'red' ? 'bg-red-100 text-red-800' :
                status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {status.color === 'green' ? <CheckCircle className="h-4 w-4" /> :
                 status.color === 'red' ? <AlertCircle className="h-4 w-4" /> :
                 <Calendar className="h-4 w-4" />}
                <span>{status.message}</span>
              </div>
            );
          })()}
        </div>

        {!isConfigured && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-yellow-800">Configuração Necessária</h5>
                <p className="text-sm text-yellow-700 mt-1">
                  Para ativar a sincronização automática com o Google Calendar, você precisa configurar as credenciais da API.
                </p>
              </div>
            </div>
          </div>
        )}

        {isConfigured && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-green-800">Integração Ativa</h5>
                <p className="text-sm text-green-700 mt-1">
                  O Google Calendar está configurado e sincronizando automaticamente com o sistema.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Configuração */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Key className="h-6 w-6 text-gray-600" />
          <h4 className="text-lg font-medium text-gray-900">Credenciais da API</h4>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google API Key *
            </label>
            <input
              type="text"
              value={googleCalendarConfig.apiKey}
              onChange={(e) => setGoogleCalendarConfig({
                ...googleCalendarConfig,
                apiKey: e.target.value
              })}
              placeholder="AIzaSyC..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Obtenha em: Google Cloud Console → APIs & Services → Credentials
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Token *
            </label>
            <input
              type="password"
              value={googleCalendarConfig.accessToken}
              onChange={(e) => setGoogleCalendarConfig({
                ...googleCalendarConfig,
                accessToken: e.target.value
              })}
              placeholder="ya29.a0..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Token de acesso OAuth 2.0 para a conta vip@vipmudancas.com.br
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calendar ID
            </label>
            <input
              type="email"
              value={googleCalendarConfig.calendarId}
              onChange={(e) => setGoogleCalendarConfig({
                ...googleCalendarConfig,
                calendarId: e.target.value
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Email da conta Google Calendar (padrão: vip@vipmudancas.com.br)
            </p>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={configurarGoogleCalendar}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            <span>Salvar Configuração</span>
          </button>

          {isConfigured && (
            <button
              onClick={testarSincronizacao}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Testando...' : 'Testar Sincronização'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Instruções */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertCircle className="h-6 w-6 text-blue-600" />
          <h4 className="text-lg font-medium text-gray-900">Como Configurar</h4>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h5 className="font-medium text-gray-900 mb-2">1. Criar Projeto no Google Cloud</h5>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Acesse <a href="https://console.cloud.google.com" target="_blank" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
              <li>Crie um novo projeto ou selecione um existente</li>
              <li>Ative a API do Google Calendar</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-gray-900 mb-2">2. Configurar Credenciais</h5>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Vá em "APIs & Services" → "Credentials"</li>
              <li>Clique em "Create Credentials" → "API Key"</li>
              <li>Configure OAuth 2.0 para obter o Access Token</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-gray-900 mb-2">3. Permissões Necessárias</h5>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>https://www.googleapis.com/auth/calendar</li>
              <li>https://www.googleapis.com/auth/calendar.events</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

