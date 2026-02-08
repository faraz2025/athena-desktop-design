import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
    name: string;
};

function ProjectCreationSuccess({ name }: Props) {
    const navigate = useNavigate();


    return (
        <div className="max-w-xl mx-auto py-10">
            <Card className="text-center shadow-lg border-2 border-green-500/20 bg-green-50/10">
                <CardContent className="space-y-8 pt-10">
                    <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600 shadow-inner">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-extrabold tracking-tight">Project Created!</h2>
                        <p className="text-muted-foreground text-lg">
                            "<span className="text-foreground font-bold">{name}</span>" is live.
                        </p>
                    </div>

                    <div className="p-5 bg-card border rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4 text-left">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <UserPlus className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Team Invitation Link</p>
                                <p className="text-[11px] text-muted-foreground">Share this with your partners and vendors</p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" className="font-bold">Copy Link</Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" size="lg" className="h-14 font-bold" onClick={() => navigate('/projects')}>
                            View All Projects
                        </Button>
                        <Button size="lg" className="h-14 font-bold shadow-lg shadow-primary/20" onClick={() => navigate('/tasks/add')}>
                            Start Adding Tasks
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProjectCreationSuccess