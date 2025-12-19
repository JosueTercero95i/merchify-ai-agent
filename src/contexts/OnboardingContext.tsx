import { useState, createContext, useContext, ReactNode } from "react";

interface OnboardingData {
  businessName: string;
  businessType: "products" | "services" | "";
  monthlyAdSpend: string;
  industry: string;
  teamSize: string;
  mainProblem: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (field: keyof OnboardingData, value: string) => void;
  isComplete: boolean;
  setComplete: (complete: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
}

const defaultData: OnboardingData = {
  businessName: "",
  businessType: "",
  monthlyAdSpend: "",
  industry: "",
  teamSize: "",
  mainProblem: "",
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem("merchify_onboarding");
    return saved ? JSON.parse(saved) : defaultData;
  });
  const [isComplete, setIsComplete] = useState(() => {
    return localStorage.getItem("merchify_onboarding_complete") === "true";
  });
  const [currentStep, setCurrentStep] = useState(0);

  const updateData = (field: keyof OnboardingData, value: string) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    localStorage.setItem("merchify_onboarding", JSON.stringify(newData));
  };

  const setComplete = (complete: boolean) => {
    setIsComplete(complete);
    localStorage.setItem("merchify_onboarding_complete", String(complete));
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        isComplete,
        setComplete,
        currentStep,
        setCurrentStep,
        totalSteps: 6,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
