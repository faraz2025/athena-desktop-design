import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/authSlice';
import apiClient from '../../api/apiClient';
import { useNavigate, Link } from 'react-router-dom';
import { HardHat, ArrowRight, Loader2 } from 'lucide-react';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signupMutation = useMutation({
        mutationFn: async () => {
            // Mock API call for now
            // const response = await apiClient.post('/auth/signup', { name, email, password });
            // return response.data;

            await new Promise(resolve => setTimeout(resolve, 1000));
            return {
                user: { id: '2', name, email, role: 'manager' },
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
        signupMutation.mutate();
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="bg-slate-900 p-8 text-center">
                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <HardHat className="text-amber-500 w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Start Building</h1>
                    <p className="text-slate-400">Create your project manager account</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
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
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={signupMutation.isPending}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                        >
                            {signupMutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create Account <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-slate-900 hover:text-slate-800 font-semibold">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
