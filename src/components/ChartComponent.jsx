import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        title: {
          text: 'Fees',
        },
      },
    },
    series: [
      {
        name: 'Daily Fees',
        data: [],
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.llama.fi/summary/fees/lyra?dataType=dailyFees');
      const data = await response.json();

      // Assuming data structure: { totalDataChart: [[timestamp1, value1], [timestamp2, value2], ...] }
      const totalData = data.totalDataChart || [];

      // Convert timestamp to human-readable format
      const formattedData = totalData.map(([timestamp, value]) => ({
        x: timestamp * 1000, // ApexCharts expects timestamps in milliseconds
        y: value,
      }));

      setChartData({
        ...chartData,
        series: [
          {
            name: 'Daily Fees',
            data: formattedData,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={350}
    />
  );
};

export default ChartComponent;
