import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, DollarSign, Percent, Plus, Trash2 } from "lucide-react";

type Props = {
    totalWorkAmount: string;
    tentativeAmount: string;
    emdAmount: string;
    taxes: { name: string; percentage: string; disabled?: boolean }[];
    updateFormData: (field: "totalWorkAmount" | "tentativeAmount" | "emdAmount", value: string) => void;
    updateTax: (index: number, field: "name" | "percentage", value: string) => void;
    addTax: () => void;
    removeTax: (index: number) => void;
    nextStep: () => void;
    prevStep: () => void;
};


function FinancalInfo({ totalWorkAmount, tentativeAmount, emdAmount, taxes, updateFormData, updateTax, addTax, removeTax, nextStep, prevStep }: Props) {
    return (
        <div className="space-y-6">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Financial Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Total Work Amount (₹)</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    className="pl-9"
                                    value={totalWorkAmount}
                                    onChange={(e) => updateFormData("totalWorkAmount", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Tentative Amount (₹)</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    className="pl-9"
                                    value={tentativeAmount}
                                    onChange={(e) => updateFormData("tentativeAmount", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>EMD Amount (₹)</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    className="pl-9"
                                    value={emdAmount}
                                    onChange={(e) => updateFormData("emdAmount", e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg">Applicable Taxes</CardTitle>
                        <Button variant="outline" size="sm" onClick={addTax} className="h-8">
                            <Plus className="h-3.5 w-3.5 mr-1" /> Add Tax
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {taxes.map((tax, idx) => (
                            <div key={idx} className="flex gap-4 items-end">
                                <div className="flex-1 space-y-2">
                                    <Label className="text-xs">Tax Name</Label>
                                    <Input
                                        value={tax.name}
                                        disabled={tax.disabled}
                                        onChange={(e) => updateTax(idx, "name", e.target.value)}
                                    />
                                </div>
                                <div className="w-32 space-y-2">
                                    <Label className="text-xs">Percentage (%)</Label>
                                    <div className="relative">
                                        <Percent className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            value={tax.percentage}
                                            disabled={tax.disabled}
                                            onChange={(e) => updateTax(idx, "percentage", e.target.value)}
                                            className="pr-9"
                                        />
                                    </div>
                                </div>
                                {!tax.disabled && (
                                    <Button variant="ghost" size="icon" className="mb-0.5 text-destructive" onClick={() => removeTax(idx)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button size="lg" onClick={nextStep} className="px-10">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}

export default FinancalInfo