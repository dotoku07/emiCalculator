import { useEffect, useState } from "react";
import { Info } from "../components/InfoCard";

type EMICalculatorHook = {
  principal: number;
  setPrincipal: (principal: number) => void;
  interestRate: number;
  setInterestRate: (interestRate: number) => void;
  isMonthly: boolean;
  setMonthly: (monthly: boolean) => void;
  tenure: number;
  setTenure: (tenure: number) => void;
  emi: number;
  calculateEMI: () => void;
  results: Info[];
};

const useEMICalculator = (): EMICalculatorHook => {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [isMonthly, setMonthly] = useState(false);
  const [emi, setEMI] = useState(0);
  const [results, setResults] = useState<Info[]>([]);

  const setCalculationData = () => {
    const fullTenure = tenure * (isMonthly ? 1 : 12);
    const totalInterest = emi * fullTenure - principal;
    const data: Info[] = [
      {
        title: "Monthly EMI",
        value: emi,
      },
      {
        title: "Total Interest",
        value: totalInterest,
      },
      {
        title: "Total Payable",
        value: totalInterest + principal,
      },
    ];
    setResults(totalInterest > 0 ? data : []);
  };

  const calculateEMI = (): void => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfInstallments = tenure * (isMonthly ? 1 : 12);
    const emi: number =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfInstallments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfInstallments) - 1);

    setEMI(emi);
  };

  useEffect(() => {
    setCalculationData();
    //eslint-disable-next-line
  }, [emi]);

  return {
    principal,
    setPrincipal,
    interestRate,
    setInterestRate,
    isMonthly,
    setMonthly,
    tenure,
    setTenure,
    emi,
    calculateEMI,
    results,
  };
};

export default useEMICalculator;
