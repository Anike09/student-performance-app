import React from 'react';
import { Line } from 'react-chartjs-2';

interface GradeChartProps {
    grades: number[];
    labels: string[];
}

const GradeChart: React.FC<GradeChartProps> = ({ grades, labels }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Grade Trends',
                data: grades,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <div>
            <h2>Grade Trends Over Time</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default GradeChart;