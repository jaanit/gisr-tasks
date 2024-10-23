"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ErrorMonthlyProps {
    ErrorMonthly: {
        Month: number;
        Year: number;
        Code: number;
        "Nombre de transactions": number;
    }[];
}

const DistributionOfchecksLinechart: React.FC<ErrorMonthlyProps> = ({ ErrorMonthly }) => {
    console.log('ErrorMonthly', ErrorMonthly);

    // Utility function to convert Excel date serial to a readable format
    const excelDateToJSDate = (serial: number): string => {
        const utc_days = Math.floor(serial - 25569);
        const utc_value = utc_days * 86400;
        const date_info = new Date(utc_value * 1000);
        const month = date_info.getMonth() + 1; // Month is 0-indexed
        const year = date_info.getFullYear();
        return `${year}-${month < 10 ? '0' : ''}${month}`; // Format: YYYY-MM
    };

    // Extract unique months and sort them
    const uniqueMonths = Array.from(new Set(ErrorMonthly.map(item => excelDateToJSDate(item.Month)))).sort();

    // Group data by error categories (200s, 400s, 500s)
    const groupedData = ErrorMonthly.reduce((acc: any, curr) => {
        const date = excelDateToJSDate(curr.Month);
        let category: string;

        if (curr.Code >= 200 && curr.Code < 300) {
            category = '200';
        } else if (curr.Code >= 400 && curr.Code < 500) {
            category = '400-499';
        } else if (curr.Code === 500) {
            category = '500';
        } else if (curr.Code > 500) {
            category = '500+';
        } else {
            category = 'Other'; // Just in case there's something unexpected
        }

        if (!acc[category]) acc[category] = {};
        acc[category][date] = (acc[category][date] || 0) + curr["Nombre de transactions"];
        return acc;
    }, {});

    // Prepare datasets for each category with specific colors
    const datasets = [
        {
            label: 'Code 200',
            data: uniqueMonths.map(month => groupedData['200']?.[month] || 0),
            fill: false,
            backgroundColor: 'rgb(76,220,36)',
            borderColor: 'rgb(76,220,36)',
        },
        {
            label: 'Code 400',
            data: uniqueMonths.map(month => groupedData['400-499']?.[month] || 0),
            fill: false,
            backgroundColor: '#ff2c2c',
            borderColor: '#ff2c2c',
        },
        {
            label: 'Code 500',
            data: uniqueMonths.map(month => groupedData['500']?.[month] || 0),
            fill: false,
            backgroundColor: 'blue',
            borderColor: 'blue',
        },
        {
            label: 'Code 501+',
            data: uniqueMonths.map(month => groupedData['500+']?.[month] || 0),
            fill: false,
            backgroundColor: 'orange',
            borderColor: 'orange',
        },
    ];
    const data = {
        labels: uniqueMonths,
        datasets: datasets,
    };

    // Define options for the chart
    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                type: 'category',
            },
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', overflowX: 'auto' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default DistributionOfchecksLinechart;
