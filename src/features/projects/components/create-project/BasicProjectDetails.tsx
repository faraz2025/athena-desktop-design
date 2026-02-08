import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, MapPin } from "lucide-react";


type BasicProjectDetailsStepProps = {
    location: string;
    type: string;
    tenderId: string;
    onChange: (field: "location" | "type" | "tenderId", value: string) => void;
    onNext: () => void;
    onBack: () => void;
};

const BasicProjectDetailsStep = ({ location, type, tenderId, onChange, onNext, onBack }: BasicProjectDetailsStepProps) => {
    return (
        <div className="space-y-6">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Basic project details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Textarea
                                id="location"
                                rows={5}
                                placeholder="Full site address"
                                className="pl-9 min-h-[80px]"
                                value={location}
                                onChange={(e) => onChange("location", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Work Type</Label>
                            <Input
                                id="type"
                                placeholder="e.g. Commercial Construction"
                                value={type}
                                onChange={(e) => onChange("type", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tenderId">Tender ID</Label>
                            <Input
                                id="tenderId"
                                placeholder="Optional"
                                value={tenderId}
                                onChange={(e) => onChange("tenderId", e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button size="lg" onClick={onNext} className="px-8">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};


export default BasicProjectDetailsStep;