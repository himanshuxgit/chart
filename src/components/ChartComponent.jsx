import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import 'tailwindcss/tailwind.css'; 

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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Daily Fees Chart',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      fill: {
        type: 'solid',
        colors: ['rgb(4,140,251)'],
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

      const totalData = data.totalDataChart || [];
      const formattedData = totalData.map(([timestamp, value]) => ({
        x: timestamp * 1000,
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
    <div >
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ChartComponent;
