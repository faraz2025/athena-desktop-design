import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Calendar } from "lucide-react";

type Props = {
    bidSubmissionDate: string;
    emdRefundDate: string;
    startDate: string;
    endDate: string;
    workDuration: string;
    updateFormData: (field: "bidSubmissionDate" | "emdRefundDate" | "startDate" | "endDate" | "workDuration", value: string) => void;
    nextStep: () => void;
    prevStep: () => void;
}


function TimelineDates({ bidSubmissionDate, emdRefundDate, startDate, endDate, workDuration, updateFormData, nextStep, prevStep }: Props) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Timeline
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Bid Submission Date</Label>
                        <Input type="date" value={bidSubmissionDate} onChange={(e) => updateFormData("bidSubmissionDate", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>EMD Refund Date</Label>
                        <Input type="date" value={emdRefundDate} onChange={(e) => updateFormData("emdRefundDate", e.target.value)} />
                    </div>
                    <hr className="my-2" />
                    <div className="space-y-2">
                        <Label>Actual Start Date</Label>
                        <Input type="date" value={startDate} onChange={(e) => updateFormData("startDate", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Expected End Date</Label>
                        <Input type="date" value={endDate} onChange={(e) => updateFormData("endDate", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Work Duration (Months)</Label>
                        <Input type="number" placeholder="12" value={workDuration} onChange={(e) => updateFormData("workDuration", e.target.value)} />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button size="lg" onClick={nextStep} className="px-10">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default TimelineDates