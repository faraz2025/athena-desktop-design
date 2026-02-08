import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

type Props = {
    authorityName: string;
    departmentName: string;
    authorityAddress: string;
    updateFormData: (field: "authorityName" | "departmentName" | "authorityAddress", value: string) => void;
    nextStep: () => void;
    prevStep: () => void;
};


function TenderAuthority({ authorityName, departmentName, authorityAddress, updateFormData, nextStep, prevStep }: Props) {
    return (
        <div className=" space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Tendering Authority</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Authority Name</Label>
                        <Input
                            value={authorityName}
                            onChange={(e) => updateFormData("authorityName", e.target.value)}
                            placeholder="e.g. Public Works Dept"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Department</Label>
                        <Input
                            value={departmentName}
                            onChange={(e) => updateFormData("departmentName", e.target.value)}
                            placeholder="e.g. Roads & Bridges"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <Label>Authority Address</Label>
                        <Textarea
                            value={authorityAddress}
                            onChange={(e) => updateFormData("authorityAddress", e.target.value)}
                            className="min-h-[80px]"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button size="lg" onClick={nextStep} className="px-8">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default TenderAuthority