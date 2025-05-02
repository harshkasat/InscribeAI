export interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    direction: string;
  };
  chart?: React.ReactNode;
  onClick?: () => void;
}

export interface ChartData {
  month: string;
  value: number;
}

export interface SatisfactionData {
  score: number;
  maxScore: number;
  change: {
    value: string;
    direction: string;
  };
  rating: string;
  feedback: string;
}
