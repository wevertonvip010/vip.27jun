import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LeadsLinkedIn from './pages/LeadsLinkedIn';
import LicitacoesPublicas from './pages/LicitacoesPublicas';
import Clientes from './pages/Clientes';
import SelfStorage from './pages/SelfStorage';
import Estoque from './pages/Estoque';
import Financeiro from './pages/Financeiro';
import Visitas from './pages/Visitas';
import Orcamentos from './pages/Orcamentos';
import Contratos from './pages/Contratos';
import OrdensServico from './pages/OrdensServico';
import Vendas from './pages/Vendas';
import Graficos from './pages/Graficos';
import Configuracoes from './pages/Configuracoes';
import Marketing from './pages/Marketing';
import ProgramaPontos from './pages/ProgramaPontos';
import './App.css';

// Páginas placeholder para os módulos
const PlaceholderPage = ({ title }) => (
  <div className="flex-1 bg-gray-50">
    <div className="bg-vip-gradient text-white px-6 py-4 shadow-vip">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-vip p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Módulo {title}</h2>
        <p className="text-gray-600 mb-6">Este módulo está em desenvolvimento e será implementado em breve.</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            🚧 Funcionalidades planejadas para este módulo incluem gestão completa, 
            relatórios detalhados e integrações automáticas.
          </p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota de login */}
          <Route path="/login" element={<Login />} />
          
          {/* Rotas protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Módulos implementados */}
          <Route path="/clientes" element={
            <ProtectedRoute>
              <Layout>
                <Clientes />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/leads-linkedin" element={
            <ProtectedRoute>
              <Layout>
                <LeadsLinkedIn />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/licitacoes" element={
            <ProtectedRoute>
              <Layout>
                <LicitacoesPublicas />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Módulos placeholder */}
          <Route path="/visitas" element={
            <ProtectedRoute>
              <Layout>
                <Visitas />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/orcamentos" element={
            <ProtectedRoute>
              <Layout>
                <Orcamentos />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/contratos" element={
            <ProtectedRoute>
              <Layout>
                <Contratos />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/ordens-servico" element={
            <ProtectedRoute>
              <Layout>
                <OrdensServico />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/self-storage" element={
            <ProtectedRoute>
              <Layout>
                <SelfStorage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/financeiro" element={
            <ProtectedRoute>
              <Layout>
                <Financeiro />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/marketing" element={
            <ProtectedRoute>
              <Layout>
                <Marketing />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/vendas" element={
            <ProtectedRoute>
              <Layout>
                <Vendas />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/estoque" element={
            <ProtectedRoute>
              <Layout>
                <Estoque />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/programa-pontos" element={
            <ProtectedRoute>
              <Layout>
                <ProgramaPontos />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/calendario" element={
            <ProtectedRoute>
              <Layout>
                <PlaceholderPage title="Calendário" />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/graficos" element={
            <ProtectedRoute>
              <Layout>
                <Graficos />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/configuracoes" element={
            <ProtectedRoute>
              <Layout>
                <Configuracoes />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Rota padrão */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

