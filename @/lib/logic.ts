/**
1. HSA Eligible (Yes/No): 
  An employee is eligible for an HSA in 2024 if their deductible is higher than the 
  HDHP (High Deductible Health Plan) minimum deductible based on their plan type. 
  (There are other requirements too, but let’s ignore them for now.)

  const isEligible = deductible > hdhpMinimumDeductible

2. HSA max contribution: An employee’s max contribution is the sum of their 
  contribution limit and any catch-up contribution if they are age 55 or older 
  at any time during 2024..

  const hsaMaxContribution = contributionLimit + catchUpContribution
 */

type PlanType = "Self-only" | "Family";

const HDHP_MINIMUM_DEDUCTIBLE = {
  ["Self-only"]: 1600,
  ["Family"]: 3200,
};
const CONTRIBUTION_LIMIT = {
  ["Self-only"]: 4150,
  ["Family"]: 8300,
};

const CATCH_UP_AGE_CUTOFF_DATE = new Date("2024-12-31");
const CATCH_UP_AGE = 55;
const CATCH_UP_CONTRIBUTION = 1000;

export function isEligibleForHSA(deductible: number, planType: PlanType) {
  return deductible > HDHP_MINIMUM_DEDUCTIBLE[planType];
}

export function getHsaMaxContribution(dateOfBirth: Date, planType: PlanType) {
  const contributionLimit = CONTRIBUTION_LIMIT[planType];

  // age at the end of 2024
  const age =
    CATCH_UP_AGE_CUTOFF_DATE.getFullYear() - dateOfBirth.getFullYear();

  const catchUpContribution = age >= CATCH_UP_AGE ? CATCH_UP_CONTRIBUTION : 0;
  return contributionLimit + catchUpContribution;
}
