"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyzeTheIncidentByCaseLinechart = () => {
  console.log('AnalyzeTheIncidentByCaseLinechart');
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales 2021',
        data: [5, 9, 33, 1, 16, 9, 22, 11, 17, 14, 42, 31],
        fill: false,
        backgroundColor: 'rgb(248,195,161)',
        borderColor: 'rgb(248,195,161)',
      },
      {
        label: 'Sales 2022',
        data: [15, 19, 23, 21, 26, 29, 32, 21, 27, 24, 42, 31],
        fill: false,
        backgroundColor: 'rgba(3, 102, 252)',
        borderColor: 'rgba(3, 102, 252)',
      },
      {
        label: 'Sales 2023',
        data: [25, 29, 33, 31, 36, 39, 42, 31, 37, 34, 52, 41],
        fill: false,
        backgroundColor: 'rgb(251,196,5)',
        borderColor: 'rgb(251,196,5)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AnalyzeTheIncidentByCaseLinechart;
