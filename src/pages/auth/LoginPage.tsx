import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';
import apiClient from '../../api/apiClient';
import { useNavigate, Link } from 'react-router-dom';
import { HardHat, Loader2 } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: async () => {
            // Mock API call for now since backend might not be ready
            // const response = await apiClient.post('/auth/login', { email, password });
            // return response.data;

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                user: { id: '1', name: 'Demo User', email, role: 'manager' },
                token: 'mock-jwt-token',
            };
        },
        onSuccess: (data) => {
            dispatch(loginSuccess(data));
            navigate('/');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate();
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="bg-orange-500 p-8 text-center">
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <HardHat className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-orange-100">Login to manage your sites</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                        >
                            {loginMutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-semibold">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
