import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import {
    LayoutDashboard,
    HardHat,
    Pickaxe,
    Users,
    LogOut,
    Menu
} from 'lucide-react';
import { useState } from 'react';

const MainLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/projects', label: 'Projects', icon: HardHat },
        { path: '/materials', label: 'Materials', icon: Pickaxe },
        { path: '/labor', label: 'Labor', icon: Users },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'
                    } bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl z-20`}
            >
                <div className="p-4 flex items-center justify-between border-b border-slate-800">
                    <div className={`flex items-center space-x-3 ${!isSidebarOpen && 'justify-center w-full'}`}>
                        <div className="bg-orange-500 p-2 rounded-lg">
                            <HardHat className="w-6 h-6 text-white" />
                        </div>
                        {isSidebarOpen && <span className="font-bold text-xl tracking-wide">e-Thekedar</span>}
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-2 px-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${isActive
                                                ? 'bg-orange-500 text-white shadow-md'
                                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                            } ${!isSidebarOpen && 'justify-center'}`}
                                    >
                                        <Icon className={`w-5 h-5 ${isSidebarOpen && 'mr-3'}`} />
                                        {isSidebarOpen && <span className="font-medium">{item.label}</span>}

                                        {!isSidebarOpen && (
                                            <div className="absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                                                {item.label}
                                            </div>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center w-full p-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors ${!isSidebarOpen && 'justify-center'
                            }`}
                    >
                        <LogOut className={`w-5 h-5 ${isSidebarOpen && 'mr-3'}`} />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm z-10">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border border-slate-300">
                                JD
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold text-slate-700">John Doe</p>
                                <p className="text-slate-500 text-xs">Project Manager</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-auto p-6 scroll-smooth">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
