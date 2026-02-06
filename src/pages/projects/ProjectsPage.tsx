const ProjectsPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Projects</h1>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    + New Project
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 text-center text-slate-500">
                    Projects List will go here.
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;

