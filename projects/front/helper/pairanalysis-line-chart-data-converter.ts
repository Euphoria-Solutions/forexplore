interface MonthlyData {
  month: string;
  statistics: Array<{
    pair: string;
    winRate: string;
  }>;
}

interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  borderWidth: number;
}

interface SessionLinearData {
  labels: string[];
  datasets: ChartDataset[];
}

const newColors: Record<string, string> = {
  EURGBP: '#FA4B3C',
  EURUSD: '#5DAAEE',
};
export const transformData = (data: MonthlyData[]): SessionLinearData => {
  const labels = data.map(item => item.month);
  const datasets: ChartDataset[] = [];

  data[0].statistics.forEach(stat => {
    const dataset: ChartDataset = {
      label: stat.pair,
      data: [],
      borderColor: newColors[stat.pair],
      borderWidth: 2,
    };

    data.forEach(monthData => {
      const statData = monthData.statistics.find(s => s.pair === stat.pair);
      dataset.data.push(statData ? parseFloat(statData.winRate) : 0);
    });

    datasets.push(dataset);
  });

  return { labels, datasets };
};
