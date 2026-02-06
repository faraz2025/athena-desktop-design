import { Construction, Download, Smartphone } from 'lucide-react';

const MobileLandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="flex flex-col items-center text-center max-w-md w-full space-y-8">

                {/* Logo / Brand Area */}
                <div className="bg-orange-500 p-4 rounded-full shadow-lg mb-4">
                    <Construction className="w-12 h-12 text-white" />
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    e-Thekedar
                </h1>

                <p className="text-slate-600 text-lg">
                    The ultimate tool for Construction Project Managers.
                </p>

                <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 w-full mt-8">
                    <Smartphone className="w-10 h-10 text-orange-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Desktop Only Experience</h2>
                    <p className="text-slate-500 mb-6">
                        Our web platform is designed for powerful desktop management. For the best experience on the go, please download our mobile app.
                    </p>

                    <div className="space-y-4">
                        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
                            <Download className="w-5 h-5 mr-3" />
                            Download for Android
                        </button>
                        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
                            <Download className="w-5 h-5 mr-3" />
                            Download for iOS
                        </button>
                    </div>
                </div>

                <div className="text-sm text-slate-400 mt-12">
                    &copy; {new Date().getFullYear()} e-Thekedar. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default MobileLandingPage;
