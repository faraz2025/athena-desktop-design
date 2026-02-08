import { cn } from "@/lib/utils";
import {
    CheckCircle2
} from "lucide-react";
import { useState } from "react";
import BasicProjectDetailsStep from "../components/create-project/BasicProjectDetails";
import EntryModeStep from "../components/create-project/EntryModeStep";
import FinancalInfo from "../components/create-project/FinancalInfo";
import OwnerShip from "../components/create-project/OwnerShip";
import ProjectCreationSuccess from "../components/create-project/ProjectCreationSuccess";
import ProjectNameStep from "../components/create-project/ProjectNameStep";
import TenderAuthority from "../components/create-project/TenderAuthority";
import TimelineDates from "../components/create-project/TimelineDates";


// Mock partners for selection
const mockPartnersBank = [
    { id: "101", name: "John Doe", email: "john@example.com", avatar: "JD" },
    { id: "102", name: "Jane Smith", email: "jane@example.com", avatar: "JS" },
    { id: "103", name: "Mike Johnson", email: "mike@example.com", avatar: "MJ" },
    { id: "104", name: "Sarah Williams", email: "sarah@example.com", avatar: "SW" }
];



const CreateProjectPage = () => {
    const [step, setStep] = useState(1);
    const [detailsEntryMode, setDetailsEntryMode] = useState<"upload" | "manual" | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        // Step 1: Basic & Upload
        name: "",
        location: "",
        type: "",
        tenderId: "",
        uploadedFiles: [] as any[],

        // Step 2: Authority & Financials
        authorityName: "",
        authorityAddress: "",
        departmentName: "",
        totalWorkAmount: "",
        tentativeAmount: "",
        emdAmount: "",
        workDuration: "",
        bidSubmissionDate: "",
        emdRefundDate: "",
        startDate: "",
        endDate: "",
        taxes: [{ name: "GST", percentage: "18", disabled: true }] as any[],

        // Step 3: Sharing
        shareType: "fixed" as "fixed" | "partnership",
        partners: [
            { id: "user-1", name: "You (Owner)", email: "owner@example.com", share: "100", avatar: "YO" }
        ] as any[]
    });

    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const applyMockDataFromDocuments = () => {
        // Mock autofill data from uploaded documents
        setFormData(prev => ({
            ...prev,
            authorityName: prev.authorityName || "Public Works Department",
            authorityAddress: prev.authorityAddress || "123, Central Secretariat, Capital City, State - 400001",
            departmentName: prev.departmentName || "Infrastructure & Roads Division",
            totalWorkAmount: prev.totalWorkAmount || "25000000",
            tentativeAmount: prev.tentativeAmount || "23000000",
            emdAmount: prev.emdAmount || "500000",
            workDuration: prev.workDuration || "18",
            bidSubmissionDate: prev.bidSubmissionDate || "2025-04-15",
            emdRefundDate: prev.emdRefundDate || "2025-05-30",
            startDate: prev.startDate || "2025-06-10",
            endDate: prev.endDate || "2027-01-10"
        }));
    };

    const handleFileUpload = () => {
        if (!selectedCategory) return;
        const newFile = {
            id: Date.now().toString(),
            name: `Document_${formData.uploadedFiles.length + 1}.pdf`,
            size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
            category: selectedCategory
        };
        updateFormData("uploadedFiles", [...formData.uploadedFiles, newFile]);
        setSelectedCategory("");
        applyMockDataFromDocuments();
    };

    const removeFile = (id: string) => {
        updateFormData("uploadedFiles", formData.uploadedFiles.filter(f => f.id !== id));
    };

    const addTax = () => {
        updateFormData("taxes", [...formData.taxes, { name: "", percentage: "", disabled: false }]);
    };

    const updateTax = (index: number, field: string, value: string) => {
        const newTaxes = [...formData.taxes];
        newTaxes[index] = { ...newTaxes[index], [field]: value };
        updateFormData("taxes", newTaxes);
    };

    const removeTax = (index: number) => {
        updateFormData("taxes", formData.taxes.filter((_, i) => i !== index));
    };

    const handleShareTypeChange = (type: "fixed" | "partnership") => {
        updateFormData("shareType", type);
        if (type === "fixed") {
            updateFormData("partners", [{ id: "user-1", name: "You (Owner)", email: "owner@example.com", share: "100", avatar: "YO" }]);
        } else {
            // Default partnership split
            updateFormData("partners", [
                { id: "user-1", name: "You (Owner)", email: "owner@example.com", share: "60", avatar: "YO" },
                { id: "102", name: "Jane Smith", email: "jane@example.com", share: "40", avatar: "JS" }
            ]);
        }
    };

    const addPartner = () => {
        const nextAvailable = mockPartnersBank.find(p => !formData.partners.some(existing => existing.id === p.id));
        if (nextAvailable) {
            updateFormData("partners", [...formData.partners, { ...nextAvailable, share: "0" }]);
        }
    };

    const removePartner = (id: string) => {
        updateFormData("partners", formData.partners.filter(p => p.id !== id));
    };

    const updatePartnerShare = (id: string, share: string) => {
        updateFormData("partners", formData.partners.map(p => p.id === id ? { ...p, share } : p));
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 8));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const steps = [
        { id: 1, title: "Project Name", description: "Give your project a title" },
        { id: 2, title: "Input Method", description: "Upload documents or fill manually" },
        { id: 3, title: "Basic Details", description: "Location & work type" },
        { id: 4, title: "Tender Authority", description: "Issuing authority details" },
        { id: 5, title: "Financials", description: "Amounts & applicable taxes" },
        { id: 6, title: "Timeline", description: "Key project dates" },
        { id: 7, title: "Ownership", description: "Sharing & partners" },
        { id: 8, title: "Success", description: "Project created" }
    ];

    return (
        <div className="py-8 px-4 animate-in fade-in duration-500">
            <div className="w-full h-1.5 bg-muted/40 rounded-full overflow-hidden mb-6">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(step / steps.length) * 100}%` }}
                />
            </div>

            {/* Horizontal Stepper - Desktop Optimized */}
            <div className="mb-10">
                <div className="flex justify-between relative">
                    {/* Line behind steps */}
                    <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -z-10" />
                    <div
                        className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-300 -z-10"
                        style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((s) => (
                        <div key={s.id} className="flex flex-col items-center group">
                            <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                step >= s.id ? "bg-primary border-primary text-primary-foreground shadow-md" : "bg-background border-muted text-muted-foreground",
                                step === s.id && "ring-4 ring-primary/20"
                            )}>
                                {step > s.id ? <CheckCircle2 className="h-6 w-6" /> : s.id}
                            </div>
                            <div className="mt-2 text-center">
                                <p className={cn("text-sm font-semibold", step >= s.id ? "text-primary" : "text-muted-foreground")}>{s.title}</p>
                                <p className="text-[10px] text-muted-foreground hidden md:block">{s.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <main className="">
                {step === 1 && (
                    <ProjectNameStep
                        name={formData.name}
                        onNameChange={(value) => updateFormData("name", value)}
                        onNext={nextStep}
                    />
                )}
                {step === 2 && (
                    <EntryModeStep
                        mode={detailsEntryMode}
                        setMode={(mode) => setDetailsEntryMode(mode)}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        uploadedFiles={formData.uploadedFiles}
                        onUploadClick={handleFileUpload}
                        onRemoveFile={removeFile}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                )}

                {step === 3 && (
                    <BasicProjectDetailsStep
                        location={formData.location}
                        type={formData.type}
                        tenderId={formData.tenderId}
                        onChange={(field, value) => updateFormData(field, value)}
                        onNext={nextStep}
                        onBack={prevStep}
                    />
                )}

                {step === 4 && (
                    <TenderAuthority
                        authorityName={formData.authorityName}
                        departmentName={formData.departmentName}
                        authorityAddress={formData.authorityAddress}
                        updateFormData={updateFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}

                {step === 5 && (
                    <FinancalInfo
                        totalWorkAmount={formData.totalWorkAmount}
                        tentativeAmount={formData.tentativeAmount}
                        emdAmount={formData.emdAmount}
                        taxes={formData.taxes}
                        updateFormData={updateFormData}
                        updateTax={updateTax}
                        addTax={addTax}
                        removeTax={removeTax}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}

                {step === 6 && (
                    <TimelineDates
                        bidSubmissionDate={formData.bidSubmissionDate}
                        emdRefundDate={formData.emdRefundDate}
                        startDate={formData.startDate}
                        endDate={formData.endDate}
                        workDuration={formData.workDuration}
                        updateFormData={updateFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}

                {/* Ownership & Sharing */}
                {step === 7 && (
                    <OwnerShip
                        shareType={formData.shareType}
                        partners={formData.partners}
                        updateShareType={handleShareTypeChange}
                        updatePartnerShare={updatePartnerShare}
                        addPartner={addPartner}
                        removePartner={removePartner}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}

                {/* Success */}
                {step === 8 && (
                    <ProjectCreationSuccess name={formData.name} />
                )}
            </main>
        </div>
    );
};

export default CreateProjectPage;
