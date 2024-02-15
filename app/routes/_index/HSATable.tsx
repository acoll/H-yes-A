/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OkY4vowoZFN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useSearchParams } from "@remix-run/react";

export interface HSATableProps {
  employees: {
    recordId: string;
    name: string;
    maxHSAContribution: number | null; // null if not eligible
    eligible: boolean;
  }[];
}

export default function HSATable(props: HSATableProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const setQuery = (s: string) =>
    setSearchParams(
      (prev) => {
        if (s === "") {
          prev.delete("query");
        } else {
          prev.set("query", s);
        }
        return prev;
      },
      { unstable_flushSync: true }
    );

  const filteredEmployees = props.employees.filter((employee) =>
    query.trim().length === 0
      ? true
      : employee.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Filter employees..."
        className="max-w-96"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">Employee Name</TableHead>
            <TableHead className="w-[180px]">Max HSA Contribution</TableHead>
            <TableHead>Eligible</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee.recordId}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>
                {employee.maxHSAContribution
                  ? formatMoney(employee.maxHSAContribution)
                  : null}
              </TableCell>
              <TableCell>
                <span className="flex items-center">
                  {employee.eligible ? (
                    <>
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      Yes
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="w-4 h-4 mr-1" />
                      No
                    </>
                  )}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function XCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

const USDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function formatMoney(amount: number) {
  return USDollarFormatter.format(amount);
}
