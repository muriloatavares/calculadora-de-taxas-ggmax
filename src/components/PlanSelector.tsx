"use client";

import React from "react";
import { Shield, Award, Gem } from "lucide-react";
import { PlanId } from "@/types/calculator";

interface PlanSelectorProps {
  selectedPlan: PlanId;
  onSelectPlan: (planId: PlanId) => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({
  selectedPlan,
  onSelectPlan,
}) => {
  const plans: { id: PlanId; name: string; rate: number; badge?: string }[] = [
    { id: "prata", name: "Prata", rate: 9.99 },
    { id: "ouro", name: "Ouro", rate: 11.99, badge: "Popular" },
    { id: "diamante", name: "Diamante", rate: 12.99 },
  ];

  const getIcon = (id: PlanId) => {
    switch (id) {
      case "prata":
        return <Shield className="plan-icon" />;
      case "ouro":
        return <Award className="plan-icon" />;
      case "diamante":
        return <Gem className="plan-icon" />;
    }
  };

  return (
    <div>
      <label>
        Selecione o Plano GGMAX
      </label>

      <div className="plans-container">
        {plans.map((plan) => {
          const isChecked = selectedPlan === plan.id;
          return (
            <label
              key={plan.id}
              className="plan-option"
              data-plan={plan.id}
              onClick={(e) => {
                e.preventDefault();
                onSelectPlan(plan.id);
              }}
            >
              <input
                type="radio"
                name="plan"
                value={plan.id}
                checked={isChecked}
                onChange={() => onSelectPlan(plan.id)}
              />

              {plan.badge && <span className="badge-popular">{plan.badge}</span>}

              <div className="plan-card">
                {getIcon(plan.id)}
                <span className="plan-name">{plan.name}</span>
                <span className="plan-tax">{plan.rate}%</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};
