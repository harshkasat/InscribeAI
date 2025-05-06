import { ChartData, SatisfactionData } from "@/types";


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


export const CreateBlog = {
  title: "Create Blog",
  value: "Using Website Link",
  change: {
    value: "170%",
    direction: "up",
  },
};

export const YouTubeBlog = {
  title: "Create Youtube Blog",
  value: "Using Youtube Video",
  change: {
    value: "200%",
    direction: "up",
  },
};

export const Credits = {
  title: "Total Credit Left",
  current: 3,
  target: 5,
};
