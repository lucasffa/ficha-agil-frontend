import React from 'react';
import { ChangeStepFunction } from '../../hooks/useFormSteps';

import './tabs.scss';

type TabsProps = {
  tabQuantidade: number;
  tabContent: React.ReactNode[];
  currentTab: number;
  onTabChange: ChangeStepFunction;
};

export default function Tabs({
  tabQuantidade,
  currentTab,
  onTabChange,
}: TabsProps) {
  //Remove o número 0 da primeira tab
  const handleTabTitle = (index: number) => {
    if (index === 0) {
      return index + 1;
    }
    return index;
  };
  return (
    <div>
      <div className="tabs">
        {Array.from({ length: tabQuantidade }, (_, index) => (
          <button
            key={index}
            className={`${currentTab === index ? 'tab-active' : 'tab'}`}
            onClick={event => onTabChange(index, event)}
            type="button"
          >
            {handleTabTitle(index)}
          </button>
        ))}
      </div>
    </div>
  );
}
