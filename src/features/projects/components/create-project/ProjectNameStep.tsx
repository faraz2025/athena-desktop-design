import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

type ProjectNameStepProps = {
    name: string;
    onNameChange: (value: string) => void;
    onNext: () => void;
};

const ProjectNameStep = ({ name, onNameChange, onNext }: ProjectNameStepProps) => {
    const canContinue = !!name.trim();

    return (
        <div className="space-y-6">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Name your project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                            id="projectName"
                            placeholder="e.g. City Center Mall Renovation"
                            value={name}
                            onChange={(e) => onNameChange(e.target.value)}
                            className="h-11"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button size="lg" disabled={!canContinue} onClick={onNext} className="px-8">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};


export default ProjectNameStep;