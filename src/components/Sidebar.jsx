import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  MapPin, 
  FileText, 
  FileCheck, 
  Truck, 
  Archive, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Award, 
  Calendar, 
  BarChart3, 
  Settings,
  Linkedin,
  FileSearch
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/dashboard',
      badge: null 
    },
    { 
      id: 'clientes', 
      label: 'Clientes', 
      icon: Users, 
      path: '/clientes',
      badge: 2 
    },
    { 
      id: 'visitas', 
      label: 'Visitas', 
      icon: MapPin, 
      path: '/visitas',
      badge: 3 
    },
    { 
      id: 'orcamentos', 
      label: 'Orçamentos', 
      icon: FileText, 
      path: '/orcamentos',
      badge: 4 
    },
    { 
      id: 'contratos', 
      label: 'Contratos', 
      icon: FileCheck, 
      path: '/contratos',
      badge: 5 
    },
    { 
      id: 'ordens-servico', 
      label: 'Ordens de Serviço', 
      icon: Truck, 
      path: '/ordens-servico',
      badge: 6 
    },
    { 
      id: 'self-storage', 
      label: 'Self Storage', 
      icon: Archive, 
      path: '/self-storage',
      badge: 7 
    },
    { 
      id: 'financeiro', 
      label: 'Financeiro', 
      icon: DollarSign, 
      path: '/financeiro',
      badge: 8 
    },
    { 
      id: 'marketing', 
      label: 'Marketing', 
      icon: TrendingUp, 
      path: '/marketing',
      badge: 9 
    },
    { 
      id: 'vendas', 
      label: 'Vendas', 
      icon: Package, 
      path: '/vendas',
      badge: 10 
    },
    { 
      id: 'estoque', 
      label: 'Estoque', 
      icon: Package, 
      path: '/estoque',
      badge: 11 
    },
    { 
      id: 'programa-pontos', 
      label: 'Programa de Pontos', 
      icon: Award, 
      path: '/programa-pontos',
      badge: 12 
    },
    { 
      id: 'calendario', 
      label: 'Calendário', 
      icon: Calendar, 
      path: '/calendario',
      badge: 13 
    },
    { 
      id: 'graficos', 
      label: 'Gráficos', 
      icon: BarChart3, 
      path: '/graficos',
      badge: 14 
    },
    { 
      id: 'configuracoes', 
      label: 'Configurações', 
      icon: Settings, 
      path: '/configuracoes',
      badge: 15 
    },
    { 
      id: 'leads-linkedin', 
      label: 'Leads LinkedIn', 
      icon: Linkedin, 
      path: '/leads-linkedin',
      badge: null,
      isNew: true 
    },
    { 
      id: 'licitacoes', 
      label: 'Licitações Públicas', 
      icon: FileSearch, 
      path: '/licitacoes',
      badge: null 
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-vip-blue-dark text-white w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center justify-center">
          <img 
            src="/logo-vip-mudancas.png" 
            alt="VIP Mudanças" 
            className="h-12 w-auto"
          />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-vip
                    ${active 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.isNew && (
                      <span className="bg-vip-orange text-white text-xs px-2 py-1 rounded-full font-bold">
                        NOVO
                      </span>
                    )}
                    {item.badge && (
                      <span className="bg-vip-orange text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

