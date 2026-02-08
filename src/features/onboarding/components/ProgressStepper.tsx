import { useAppSelector } from "@/store/hooks";

import { selectCompletedSteps, selectCurrentStep, selectProgress, selectVisibleSteps } from "@/store/slices/onboardingSlice";
import { Check } from "lucide-react";
import { OnboardingStep } from "../types/onboarding.types";


const getStepLabel = (step: OnboardingStep): string => {
    const labels: Record<OnboardingStep, string> = {
        [OnboardingStep.NOT_STARTED]: "Start",
        [OnboardingStep.SELECT_OCCUPATION]: "Occupation",
        [OnboardingStep.OWNERSHIP_TYPE]: "Ownership",
        [OnboardingStep.SHARE_IN_PROJECT]: "Share Type",
        [OnboardingStep.TYPE_OF_FIRM]: "Firm Type",
        [OnboardingStep.FIRM_TYPE_INPUT]: "Custom Firm",
        [OnboardingStep.FIRM_DETAILS]: "Firm Details",
        [OnboardingStep.ENLISTMENT_DEPARTMENTS]: "Departments",
        [OnboardingStep.COMPLETED]: "Complete",
    };
    return labels[step];
};

export const ProgressStepper = () => {
    const currentStep = useAppSelector(selectCurrentStep);
    const completedSteps = useAppSelector(selectCompletedSteps);
    const visibleSteps = useAppSelector(selectVisibleSteps);
    const progress = useAppSelector(selectProgress);

    const currentIndex = visibleSteps.indexOf(currentStep);


    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative">
                {/* Background bar */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full" />

                {/* Active bar – PURELY FROM REDUX */}
                <div
                    className="absolute top-5 left-0 h-1 bg-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />

                {visibleSteps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step);
                    const isCurrent = step === currentStep;
                    const isPast = index < currentIndex;

                    return (
                        <div key={step} className="relative flex flex-col items-center z-10">
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center
                                    transition-all duration-300
                                    ${isCurrent
                                        ? 'bg-primary text-primary-foreground scale-110'
                                        : isCompleted || isPast
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-card border border-border text-muted-foreground'
                                    }
                                `}
                            >
                                {isCompleted || isPast ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <span className="text-sm font-semibold">
                                        {index + 1}
                                    </span>
                                )}
                            </div>

                            <span className="absolute top-12 text-xs whitespace-nowrap">
                                {getStepLabel(step)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
