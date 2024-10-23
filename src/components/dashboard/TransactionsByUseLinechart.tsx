"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TransactionsByUseLinechart = ({ TransactionsByUsecase }: { TransactionsByUsecase: any[] }) => {
  const excelDateToJSDate = (serial: number) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);
    const month = date_info.getMonth() + 1; 
    const year = date_info.getFullYear();
    return `${year}-${month < 10 ? '0' : ''}${month}`; 
  };

  const uniqueMonths = Array.from(new Set(TransactionsByUsecase.map(item => excelDateToJSDate(item.Month)))).sort();

  const groupedData = TransactionsByUsecase.reduce((acc, curr) => {
    const date = excelDateToJSDate(curr.Month);
    if (!acc[curr.CasDUsage]) acc[curr.CasDUsage] = {};
    acc[curr.CasDUsage][date] = curr["Nombre de transactions"];
    return acc;
  }, {});

  const datasets = Object.keys(groupedData).map((casDUsage, index) => {
    const data = uniqueMonths.map(month => groupedData[casDUsage][month] || 0);
    const color = `hsl(${(index * 360) / Object.keys(groupedData).length}, 70%, 50%)`; 
    return {
      label: casDUsage,
      data: data,
      fill: false,
      backgroundColor: color,
      borderColor: color,
    };
  });
  const data = {
    labels: uniqueMonths, 
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'category' as const,
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', overflowX: 'auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TransactionsByUseLinechart;
