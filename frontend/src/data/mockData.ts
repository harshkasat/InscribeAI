import { ChartData, SatisfactionData, NavItem } from "@/types";

export const navItems: NavItem[] = [
  { title: "Dashboard", icon: "dashboard", active: true },
  { title: "Analytics", icon: "analytics" },
  { title: "Products", icon: "products" },
  { title: "Invoices", icon: "invoices" },
  { title: "Calendar", icon: "calendar" },
];

export const monthlyData: ChartData[] = [
  { month: "Jan", value: 380 },
  { month: "Feb", value: 280 },
  { month: "Mar", value: 530 },
  { month: "Apr", value: 290 },
  { month: "May", value: 450 },
  { month: "Jun", value: 720 },
  { month: "Jul", value: 620 },
  { month: "Aug", value: 710 },
  { month: "Sep", value: 560 },
  { month: "Oct", value: 480 },
  { month: "Nov", value: 380 },
  { month: "Dec", value: 620 },
];

export const satisfactionData: SatisfactionData = {
  score: 250,
  maxScore: 300,
  change: {
    value: "12%",
    direction: "up",
  },
  rating: "4.7/5",
  feedback: "Exceptional support and quick responses",
};

export const timeOptions = [
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Yearly",
];

export const revenueData = {
  title: "Revenue",
  value: "$120,873",
  change: {
    value: "17%",
    direction: "up",
  },
};

export const purchaseData = {
  title: "Total Purchase",
  value: "$89,203",
  change: {
    value: "12%",
    direction: "up",
  },
};

export const salesTargetData = {
  title: "Sales Target",
  value: "$50,901",
  current: 38000,
  target: 50901,
  change: {
    value: "8%",
    direction: "up",
  },
};
