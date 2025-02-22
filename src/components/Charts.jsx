/* eslint-disable react/prop-types */
// src/components/ChartComponent.jsx
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import '../assets/css/Charts.css';


ChartJS.register(...registerables);

const ChartComponent = ({ type, data, options }) => {
    const renderChart = () => {
        switch (type) {
            case 'bar':
                return <Bar data={data} options={options} />;
            case 'line':
                return <Line data={data} options={options} />;
            case 'pie':
                return <Pie data={data} options={options} />;
            case 'doughnut':
                return <Doughnut data={data} options={options} />;
            case 'radar':
                return <Radar data={data} options={options} />;
            default:
                return null;
        }
    };

    return <div className="chart-container">
        
        {renderChart()}
        
        </div>;
};

export default ChartComponent;
