import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Percent, UserPlus, Users, X } from "lucide-react";

type Props = {
    shareType: "fixed" | "partnership" | null;
    partners: { id: string; name: string; email: string; share: string; avatar: string }[];
    updateShareType: (value: "fixed" | "partnership") => void;
    updatePartnerShare: (id: string, share: string) => void;
    addPartner: () => void;
    removePartner: (id: string) => void;
    nextStep: () => void;
    prevStep: () => void;
};


function OwnerShip({ shareType, partners, updateShareType, updatePartnerShare, addPartner, removePartner, nextStep, prevStep }: Props) {

    const totalShare = partners.reduce((sum, p) => sum + parseFloat(p.share || "0"), 0);
    const isShareValid = shareType === "fixed" || totalShare === 100;

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <div className="text-center space-y-2 mb-8">
                    <h2 className="text-2xl font-bold">Ownership Structure</h2>
                    <p className="text-muted-foreground">Define how the project is controlled and how profits are shared.</p>
                </div>

                <RadioGroup
                    value={shareType}
                    onValueChange={(val) => updateShareType(val as any)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <Label
                        htmlFor="fixed"
                        className={cn(
                            "flex flex-col items-center justify-between rounded-xl border-2 bg-popover p-6 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                            shareType === "fixed" ? "border-primary shadow-md bg-primary/5" : "border-muted"
                        )}
                    >
                        <RadioGroupItem value="fixed" id="fixed" className="sr-only" />
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-lg">Single Owner</p>
                            <p className="text-xs text-muted-foreground mt-1">Full control and 100% profit allocation to you.</p>
                        </div>
                    </Label>

                    <Label
                        htmlFor="partnership"
                        className={cn(
                            "flex flex-col items-center justify-between rounded-xl border-2 bg-popover p-6 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                            shareType === "partnership" ? "border-primary shadow-md bg-primary/5" : "border-muted"
                        )}
                    >
                        <RadioGroupItem value="partnership" id="partnership" className="sr-only" />
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Percent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-lg">Partnership</p>
                            <p className="text-xs text-muted-foreground mt-1">Multi-owner structure with defined shared percentages.</p>
                        </div>
                    </Label>
                </RadioGroup>
            </section>

            {shareType === "partnership" && (
                <Card className="animate-in slide-in-from-bottom-5">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold">Partners & Share Distribution</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1 text-balance">The total share among all partners must equal exactly 100%.</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={addPartner} disabled={partners.length >= 6}>
                            <UserPlus className="h-4 w-4 mr-2" /> Add Partner
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            {partners.map((partner: any) => (
                                <div key={partner.id} className="flex items-center gap-6 p-4 border rounded-xl bg-muted/20">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 border flex items-center justify-center font-bold text-primary shrink-0">
                                        {partner.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm truncate">{partner.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{partner.email}</p>
                                    </div>
                                    <div className="w-28 space-y-1">
                                        <Label className="text-[10px] font-bold uppercase">Share %</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                className="h-9 "
                                                value={partner.share}
                                                onChange={(e) => updatePartnerShare(partner.id, e.target.value)}
                                            />
                                            <Percent className="absolute right-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                        </div>
                                    </div>
                                    {partner.id !== "user-1" && (
                                        <Button variant="ghost" size="icon" className="text-destructive h-8 w-8 mt-4" onClick={() => removePartner(partner.id)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className={cn(
                            "flex items-center justify-between p-4 rounded-xl border-2 transition-colors",
                            totalShare === 100 ? "bg-green-50/50 border-green-200 text-green-700" : "bg-red-50/50 border-red-200 text-red-700"
                        )}>
                            <div className="flex items-center gap-3">
                                {totalShare === 100 ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                <span className="font-bold">Total Share: {totalShare.toFixed(1)}%</span>
                            </div>
                            {totalShare !== 100 && <span className="text-xs font-medium">Must be 100%</span>}
                        </div>

                        {/* Profit Preview Widget */}
                        {totalShare === 100 && (
                            <div className="p-4 bg-muted/50 border rounded-xl space-y-3">
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Users className="h-3 w-3" /> Profit Allocation Preview
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {partners.map((p: any) => (
                                        <div key={p.id} className="bg-background p-2 rounded border flex flex-col items-center">
                                            <span className="text-[10px] font-medium text-muted-foreground truncate w-full text-center">{p.name}</span>
                                            <span className="text-primary font-bold">₹{(150000 * parseFloat(p.share) / 100).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-center text-muted-foreground italic mt-2">Projection based on mock estimated quarterly profit of ₹1.5L</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border">
                <Button variant="outline" size="lg" onClick={prevStep}>Back</Button>
                <Button
                    size="lg"
                    className="px-12"
                    disabled={!isShareValid}
                    onClick={nextStep}
                >
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Confirm & Create Project
                </Button>
            </div>
        </div>
    )
}

export default OwnerShip