
import { createContext, useState, useContext, ReactNode } from "react";

type AgeGroup = "2-5" | "5-7" | "8-10" | "11-15";

interface AgeContextType {
  ageGroup: AgeGroup;
  setAgeGroup: (ageGroup: AgeGroup) => void;
}

const AgeContext = createContext<AgeContextType | undefined>(undefined);

export const AgeProvider = ({ children }: { children: ReactNode }) => {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("5-7");

  return (
    <AgeContext.Provider value={{ ageGroup, setAgeGroup }}>
      {children}
    </AgeContext.Provider>
  );
};

export const useAge = (): AgeContextType => {
  const context = useContext(AgeContext);
  if (context === undefined) {
    throw new Error("useAge must be used within an AgeProvider");
  }
  return context;
};
