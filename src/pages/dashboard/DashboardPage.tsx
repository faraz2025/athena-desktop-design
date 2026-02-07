const DashboardPage = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Cards */}
                {['Total Projects', 'Active Sites', 'Materials Low', 'Validation Pending'].map((title, i) => (
                    <div key={i} className="bg-card p-6 rounded-xl shadow-sm border border-border">
                        <p className="text-muted-foreground text-sm font-medium">{title}</p>
                        <h3 className="text-3xl font-bold text-foreground mt-2">{Math.floor(Math.random() * 20)}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm border border-border h-64 flex items-center justify-center text-muted-foreground">
                Chart Placeholder
            </div>
        </div>
    );
};

export default DashboardPage;
