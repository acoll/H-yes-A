import type { MetaFunction } from "@remix-run/node";
import HSATable from "./HSATable";
import { useLoaderData } from "@remix-run/react";
import { loadEmployees } from "@/lib/api.server";
import { getHsaMaxContribution, isEligibleForHSA } from "@/lib/logic";

export const meta: MetaFunction = () => {
  return [
    { title: "H-yes-A" },
    { name: "description", content: "Welcome to H-yes-A" },
  ];
};

export const loader = async () => {
  const employees = await loadEmployees();
  return {
    employees: employees.map((employee) => {
      const eligible = isEligibleForHSA(employee.deductible, employee.planType);
      return {
        recordId: employee.recordId,
        name: employee.name,
        maxHSAContribution: eligible
          ? getHsaMaxContribution(employee.dateOfBirth, employee.planType)
          : null,
        eligible,
      };
    }),
  };
};

export default function Index() {
  const { employees } = useLoaderData<typeof loader>();

  return (
    <div className="px-10 py-8">
      <h1 className="text-2xl pb-5">Welcome to H-yes-A</h1>
      <HSATable employees={employees} />
    </div>
  );
}
