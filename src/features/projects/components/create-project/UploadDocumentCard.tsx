import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Info, Upload, X } from "lucide-react";

// Mock document categories
const documentCategories = [
    "Tender Document",
    "Technical Specifications",
    "Financial Bid",
    "Site Survey Report",
    "Legal Documents",
    "Drawings & Plans",
    "Other"
];



type UploadDocumentsCardProps = {
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    uploadedFiles: any[];
    onUploadClick: () => void;
    onRemoveFile: (id: string) => void;
};

const UploadDocumentsCard = ({
    selectedCategory,
    setSelectedCategory,
    uploadedFiles,
    onUploadClick,
    onRemoveFile
}: UploadDocumentsCardProps) => {
    return (
        <Card className="shadow-sm border-dashed border-2">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    Upload Documents
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Document Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Select one..." /></SelectTrigger>
                        <SelectContent>
                            {documentCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div
                    className="h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/20 cursor-pointer transition-colors"
                    onClick={onUploadClick}
                >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground font-medium">Click to upload document</p>
                </div>

                {uploadedFiles.length > 0 && (
                    <div className="space-y-2 pt-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Uploaded ({uploadedFiles.length})</Label>
                        <div className="grid gap-2">
                            {uploadedFiles.map((file: any) => (
                                <div key={file.id} className="flex items-center justify-between p-2 rounded-lg border bg-background text-sm">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <FileText className="h-4 w-4 text-primary shrink-0" />
                                        <div className="min-w-0">
                                            <p className="font-medium truncate">{file.name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase">{file.category}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onRemoveFile(file.id)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-300 flex gap-2">
                    <Info className="h-4 w-4 shrink-0" />
                    <p>Uploading documents allows the system to auto-fill financial data and dates using OCR (mocked for now).</p>
                </div>
            </CardContent>
        </Card>
    );
};


export default UploadDocumentsCard