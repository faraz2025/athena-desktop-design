import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    FirmType,
    OccupationType,
    type OnboardingData,
    OnboardingStep,
    OwnershipType
} from '../../features/onboarding/types/onboarding.types';
import type { RootState } from '../store';

interface OnboardingState {
    currentStep: OnboardingStep;
    completedSteps: OnboardingStep[];
    onboardingData: OnboardingData;
    progress: number;
}

const initialState: OnboardingState = {
    currentStep: OnboardingStep.NOT_STARTED,
    completedSteps: [],
    onboardingData: {},
    progress: 0,
};

// Helper to calculate total value for progress bar
export const calculateProgress = (
    currentStep: OnboardingStep,
    visibleSteps: OnboardingStep[]
): number => {
    const index = visibleSteps.indexOf(currentStep);

    if (index === -1) return 0;
    if (visibleSteps.length === 1) return 100;

    return Math.round((index / (visibleSteps.length - 1)) * 100);
};


// Helper to determine next step logic (moved from OnboardingPage)
const getNextStep = (
    step: OnboardingStep,
    data: OnboardingData
): OnboardingStep => {
    const { occupation, ownershipType, firmType } = data;

    // Start
    if (step === OnboardingStep.NOT_STARTED) {
        return OnboardingStep.SELECT_OCCUPATION;
    }

    // Occupation selection
    if (step === OnboardingStep.SELECT_OCCUPATION) {
        // Only govt contractors continue onboarding
        if (occupation === OccupationType.GOVERNMENT_CONTRACTOR) {
            return OnboardingStep.OWNERSHIP_TYPE;
        }
        return OnboardingStep.COMPLETED;
    }

    // Ownership (only for govt contractors)
    if (step === OnboardingStep.OWNERSHIP_TYPE) {
        // Single owner ends onboarding
        if (ownershipType === OwnershipType.SINGLE_OWNER) {
            return OnboardingStep.COMPLETED;
        }

        // Partnership continues
        if (ownershipType === OwnershipType.PARTNERSHIP) {
            return OnboardingStep.SHARE_IN_PROJECT;
        }
    }

    // From here on: PARTNERSHIP ONLY
    if (step === OnboardingStep.SHARE_IN_PROJECT) {
        return OnboardingStep.TYPE_OF_FIRM;
    }

    if (step === OnboardingStep.TYPE_OF_FIRM) {
        return firmType === FirmType.OTHER
            ? OnboardingStep.FIRM_TYPE_INPUT
            : OnboardingStep.FIRM_DETAILS;
    }

    if (step === OnboardingStep.FIRM_TYPE_INPUT) {
        return OnboardingStep.FIRM_DETAILS;
    }

    if (step === OnboardingStep.FIRM_DETAILS) {
        return OnboardingStep.ENLISTMENT_DEPARTMENTS;
    }

    if (step === OnboardingStep.ENLISTMENT_DEPARTMENTS) {
        return OnboardingStep.COMPLETED;
    }

    return OnboardingStep.COMPLETED;
};

// onboarding.utils.ts
export const getVisibleSteps = (data: OnboardingData): OnboardingStep[] => {
    const steps: OnboardingStep[] = [
        OnboardingStep.SELECT_OCCUPATION,
    ];

    if (data.occupation === OccupationType.GOVERNMENT_CONTRACTOR) {
        steps.push(OnboardingStep.OWNERSHIP_TYPE);

        if (data.ownershipType === OwnershipType.PARTNERSHIP) {

            steps.push(
                OnboardingStep.SHARE_IN_PROJECT,
                OnboardingStep.TYPE_OF_FIRM
            );

            if (data.firmType === FirmType.OTHER) {
                steps.push(OnboardingStep.FIRM_TYPE_INPUT);
            }

            steps.push(
                OnboardingStep.FIRM_DETAILS,
                OnboardingStep.ENLISTMENT_DEPARTMENTS
            );
        }
    }


    steps.push(OnboardingStep.COMPLETED);

    return steps;
};


export const onboardingSlice = createSlice({
    name: 'onboarding',
    initialState,
    reducers: {
        startOnboarding: (state) => {
            state.currentStep = OnboardingStep.SELECT_OCCUPATION;
            state.progress = calculateProgress(OnboardingStep.SELECT_OCCUPATION, getVisibleSteps(state.onboardingData));
        },
        setStep: (state, action: PayloadAction<OnboardingStep>) => {
            state.currentStep = action.payload;
            state.progress = calculateProgress(action.payload, getVisibleSteps(state.onboardingData));
        },
        updateOnboardingData: (state, action: PayloadAction<Partial<OnboardingData>>) => {
            state.onboardingData = { ...state.onboardingData, ...action.payload };
            state.progress = calculateProgress(state.currentStep, getVisibleSteps(state.onboardingData));
        },
        completeStep: (state, action: PayloadAction<Partial<OnboardingData> | undefined>) => {
            if (action.payload) {
                state.onboardingData = { ...state.onboardingData, ...action.payload };
            }

            if (!state.completedSteps.includes(state.currentStep)) {
                state.completedSteps.push(state.currentStep);
            }

            const nextStep = getNextStep(state.currentStep, state.onboardingData);
            state.currentStep = nextStep;

            const visibleSteps = getVisibleSteps(state.onboardingData);

            state.progress = calculateProgress(nextStep, visibleSteps);
        },
        resetOnboarding: () => {
            return initialState;
        }
    },
});

export const { startOnboarding, setStep, updateOnboardingData, completeStep, resetOnboarding } = onboardingSlice.actions;

export const selectCurrentStep = (state: RootState) => state.onboarding.currentStep;
export const selectCompletedSteps = (state: RootState) => state.onboarding.completedSteps;
export const selectOnboardingData = (state: RootState) => state.onboarding.onboardingData;
export const selectOnboardingProgress = (state: RootState) => state.onboarding.progress;
export const selectVisibleSteps = (state: RootState) =>
    getVisibleSteps(state.onboarding.onboardingData);

export const selectProgress = (state: RootState) =>
    state.onboarding.progress;

export default onboardingSlice.reducer;
