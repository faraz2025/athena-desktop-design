import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ArrowRight, FileText, Upload } from "lucide-react";
import UploadDocumentsCard from "./UploadDocumentCard";

type EntryModeStepProps = {
    mode: "upload" | "manual" | null;
    setMode: (mode: "upload" | "manual") => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    uploadedFiles: any[];
    onUploadClick: () => void;
    onRemoveFile: (id: string) => void;
    onNext: () => void;
    onBack: () => void;
};

const EntryModeStep = ({
    mode,
    setMode,
    selectedCategory,
    setSelectedCategory,
    uploadedFiles,
    onUploadClick,
    onRemoveFile,
    onNext,
    onBack
}: EntryModeStepProps) => {
    const canContinue = !!mode;

    return (
        <div className="space-y-6">
            <div className={cn(mode === "upload" && "grid grid-cols-1 lg:grid-cols-5 gap-8")}>
                <div className="lg:col-span-3 space-y-6">
                    <Card className="shadow-sm h-full">
                        <CardHeader>
                            <CardTitle className="text-xl">How do you want to start?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <Label className="text-sm">Choose how to provide project details</Label>
                                <RadioGroup
                                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                                    value={mode ?? ""}
                                    onValueChange={(val) => setMode(val as "upload" | "manual")}
                                >
                                    <Label
                                        htmlFor="mode-upload"
                                        className={cn(
                                            "flex flex-col items-start gap-4 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors",
                                            mode === "upload" ? "border-primary bg-primary/5" : "border-muted"
                                        )}
                                    >
                                        <RadioGroupItem id="mode-upload" value="upload" className="sr-only" />
                                        <div className="flex items-center gap-2">
                                            <Upload className="h-4 w-4 text-primary" />
                                            <span className="font-semibold text-sm">Upload tender documents</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            We will auto-fill tender authority, financials and dates using mock document data. You can review & edit everything later.
                                        </p>
                                    </Label>

                                    <Label
                                        htmlFor="mode-manual"
                                        className={cn(
                                            "flex flex-col items-start gap-4 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors",
                                            mode === "manual" ? "border-primary bg-primary/5" : "border-muted"
                                        )}
                                    >
                                        <RadioGroupItem id="mode-manual" value="manual" className="sr-only" />
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-primary" />
                                            <span className="font-semibold text-sm">Enter form manually</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Skip document upload and fill all tender & financial information yourself in the next steps.
                                        </p>
                                    </Label>
                                </RadioGroup>
                            </div>
                        </CardContent>
                    </Card>


                </div>

                <div className="lg:col-span-2 space-y-6">
                    {mode === "upload" && (
                        <UploadDocumentsCard
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            uploadedFiles={uploadedFiles}
                            onUploadClick={onUploadClick}
                            onRemoveFile={onRemoveFile}
                        />
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg border">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button size="lg" disabled={!canContinue} onClick={onNext} className="px-8">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};

export default EntryModeStep;