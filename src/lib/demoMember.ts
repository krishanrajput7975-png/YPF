export type DemoMember = {
  id: string;
  name: string;
  fatherName: string;
  dob: string;
  mobile: string;
  designation: string;
  area: string;
  status: "approved" | "pending" | "rejected";
};

export function getDemoMember(id: string): DemoMember | null {
  // Simple deterministic demo mapping based on last char.
  const last = id.trim().slice(-1).toLowerCase();
  const status: DemoMember["status"] =
    last === "a" || last === "b" ? "approved" : last === "c" || last === "d" ? "rejected" : "pending";

  return {
    id,
    name: "Demo Member",
    fatherName: "Demo Father",
    dob: "1998-01-01",
    mobile: "8005523773",
    designation: "Member",
    area: "Hanumangarh",
    status,
  };
}

