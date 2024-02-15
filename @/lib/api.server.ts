import { z } from "zod";

const Record = z.object({
  id: z.string(),
  fields: z.object({
    "Plan type": z.union([z.literal("Self-only"), z.literal("Family")]),
    Name: z.string(),
    Deductible: z.number(),
    "Date of birth": z.coerce.date(),
  }),
});
type Record = z.infer<typeof Record>;

type Employee = {
  recordId: string;
  planType: Record["fields"]["Plan type"];
  name: string;
  deductible: number;
  dateOfBirth: Date;
};

export async function loadEmployees() {
  const records = await fetchData();

  const employees: Employee[] = [];

  records.forEach((record: unknown) => {
    try {
      // can't trust the data, better to check it here and alert early
      const { fields: employee, id: recordId } = Record.parse(record);
      employees.push({
        recordId,
        planType: employee["Plan type"],
        name: employee.Name,
        deductible: employee.Deductible,
        dateOfBirth: employee["Date of birth"],
      });
    } catch (error) {
      // alert but still return what we can
      console.error("Invalid record", record, error);
    }
  });

  return employees;
}

async function fetchData() {
  const { API_KEY, API_URL } = process.env;

  if (!API_KEY || !API_URL) {
    throw new Error("API_KEY or API_URL is not defined");
  }

  const response = await (
    await fetch(API_URL, { headers: { Authorization: `Bearer ${API_KEY}` } })
  ).json();

  return response.records;
}
