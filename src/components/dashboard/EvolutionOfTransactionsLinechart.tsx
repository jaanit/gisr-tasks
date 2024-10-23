"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EvolutionOfTransactionsLinechart = ({ DailyTransactions }: { DailyTransactions: any }) => {

  const transactions = DailyTransactions || [];

  const convertExcelDate = (serial: any) => {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const daysSinceEpoch = serial - 1;
    const date = new Date(excelEpoch.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000); // Milliseconds per day
    return date.toISOString().split('T')[0];
  };

  const labels = transactions.map((transaction: any) => convertExcelDate(transaction["Date "])); // Convert serial to date string
  const dataPoints = transactions.map((transaction: any) => transaction["Nombre de transactions"]);

  const data = {
    labels: labels, 
    datasets: [
      {
        label: 'Nombre de transactions',
        data: dataPoints, 
        fill: false,
        backgroundColor: 'rgba(69,116,200,255)',
        borderColor: 'rgba(69,116,200,255)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        height: 100,
      },
    },
  };

  return <Line data={data} options={options} height={100}  />;
};
export default EvolutionOfTransactionsLinechart;
