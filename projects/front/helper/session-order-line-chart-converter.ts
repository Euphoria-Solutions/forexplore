type SourceDataType = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
  }>;
};

type TargetDataType = Array<{
  month: string;
  [key: string]: number | string;
}>;

const newColors: Record<string, string> = {
  long: '#FA4B3C',
  short: '#5DAAEE',
};

export const convertData = (targetData: TargetDataType): SourceDataType => {
  const labels: string[] = targetData.map(item => item.month);
  const datasets: SourceDataType['datasets'] = [];

  const datasetKeys = Object.keys(targetData[0]).filter(key => key !== 'month');

  datasetKeys.forEach(key => {
    const data: number[] = [];
    targetData.forEach(item => {
      const value = item[key];
      if (typeof value === 'number') {
        data.push(value);
      }
    });

    datasets.push({
      label: key,
      data,
      borderColor: newColors[key],
      borderWidth: 2,
    });
  });

  return {
    labels,
    datasets,
  };
};
