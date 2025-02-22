import Calendar from './components/Calendar';
import { AgCharts } from 'ag-charts-react';

function App() {
  // Common data used for multiple charts
  const chartData = [
    { title: "cc", month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
    { title: "cc", month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
    { title: "cc", month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
    { title: "cc", month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
    { title: "cc", month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
    { title: "cc", month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
  ];

  // Bar Chart
  const barChartOptions = {
    title: { text: "Ice Cream Sales (Bar Chart)" },
    data: chartData,
    series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales', fill: '#4caf50' }],
    legend: { enabled: false }
  };

  // Line Chart
  const lineChartOptions = {
    title: { text: "Ice Cream Sales (Line Chart)" },
    data: chartData,
    series: [{ type: 'line', xKey: 'month', yKey: 'iceCreamSales', stroke: '#ff9800' }]
  };

  // Area Chart
  const areaChartOptions = {
    title: { text: "Ice Cream Sales (Area Chart)" },
    data: chartData,
    series: [{ type: 'area', xKey: 'month', yKey: 'iceCreamSales', fillOpacity: 0.3, fill: '#3f51b5' }]
  };

  // Scatter Chart
  const scatterChartOptions = {
    title: { text: "Ice Cream Sales (Scatter Chart)" },
    data: chartData,
    series: [{ type: 'scatter', xKey: 'month', yKey: 'iceCreamSales', marker: { size: 8, fill: '#e91e63' } }]
  };

  // Bubble Chart
  const bubbleChartOptions = {
    title: { text: "Temperature vs. Ice Cream Sales (Bubble Chart)" },
    data: chartData,
    series: [
      {
        type: 'bubble',
        xKey: 'avgTemp',
        yKey: 'iceCreamSales',
        sizeKey: 'iceCreamSales',
        shape: 'circle',
        fill: '#673ab7',
        stroke: '#512da8',
      }
    ]
  };

  // Pie Chart
  const pieChartOptions = {
    title: { text: "Ice Cream Sales Distribution (Pie Chart)" },
    data: chartData,
    series: [{ type: 'pie', angleKey: 'iceCreamSales', labelKey: 'month', fills: ['#ff5722', '#2196f3', '#4caf50', '#ffeb3b', '#9c27b0', '#00bcd4'] }]
  };

  // Stacked Bar Chart
  const stackedBarChartOptions = {
    title: { text: "Stacked Bar Chart Example" },
    data: chartData,
    series: [
      { type: 'bar', xKey: 'month', yKey: 'iceCreamSales', stacked: true, fill: '#f44336' },
      { type: 'bar', xKey: 'month', yKey: 'avgTemp', stacked: true, fill: '#03a9f4' }
    ]
  };

  // Radial Bar Chart
  const radialBarChartOptions = {
    title: { text: "Ice Cream Sales (Radial Bar Chart)" },
    data: chartData,
    series: [{ type: 'radial-bar', xKey: 'month', yKey: 'iceCreamSales', fill: '#8bc34a' }]
  };

  return (
    <>
      <Calendar />

      <AgCharts options={barChartOptions} />
      <AgCharts options={lineChartOptions} />
      <AgCharts options={areaChartOptions} />
      <AgCharts options={scatterChartOptions} />
      <AgCharts options={bubbleChartOptions} />
      <AgCharts options={pieChartOptions} />
      <AgCharts options={stackedBarChartOptions} />
      <AgCharts options={radialBarChartOptions} />
    </>
  );
}

export default App;
