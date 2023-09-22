import { useState } from 'react';

type ChangeStepFunction = (
  index: number,
  event: React.MouseEvent<HTMLButtonElement>
) => void;

export default function useFormSteps(steps: React.ReactNode[]) {
  const [currentStep, setCurrentStep] = useState(0);

  function changeStep(
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();

    if (index < 0 || index >= steps.length) return;
    setCurrentStep(index);
  }

  return {
    currentStep,
    currentComponent: steps[currentStep],
    changeStep: changeStep as ChangeStepFunction,
    isLastStep: currentStep + 1 === steps.length ? true : false,
    isFirstStep: currentStep === 0 ? false : true,
  };
}
