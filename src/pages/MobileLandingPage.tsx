import { Construction, Download, Smartphone } from 'lucide-react';

const MobileLandingPage = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 font-sans">
            <div className="flex flex-col items-center text-center max-w-md w-full space-y-8">

                {/* Logo / Brand Area */}
                <div className="bg-primary p-4 rounded-full shadow-lg mb-4">
                    <Construction className="w-12 h-12 text-primary-foreground" />
                </div>

                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                    e-Thekedar
                </h1>

                <p className="text-muted-foreground text-lg">
                    The ultimate tool for Construction Project Managers.
                </p>

                <div className="bg-card p-6 rounded-xl shadow-md border border-border w-full mt-8">
                    <Smartphone className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-foreground mb-2">Desktop Only Experience</h2>
                    <p className="text-muted-foreground mb-6">
                        Our web platform is designed for powerful desktop management. For the best experience on the go, please download our mobile app.
                    </p>

                    <div className="space-y-4">
                        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
                            <Download className="w-5 h-5 mr-3" />
                            Download for Android
                        </button>
                        <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
                            <Download className="w-5 h-5 mr-3" />
                            Download for iOS
                        </button>
                    </div>
                </div>

                <div className="text-sm text-muted-foreground mt-12">
                    &copy; {new Date().getFullYear()} e-Thekedar. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default MobileLandingPage;
