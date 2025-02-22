import Calendar from './components/Calendar';
import ChartComponent from './components/Charts';
import Plot from 'react-plotly.js';
import { AgCharts } from 'ag-charts-react';
import { useState } from 'react';


function App() {
  const data = {
    labels: ['info1', 'info2', 'info3', 'info4', 'info5', 'info6', 'info7'],
    datasets: [
      {
        label: 'value',
        backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'black'],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: [102, 59, 33, 170, 60, 10, 100],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Example',
      },
    },
  };

  const [chartOptions, setChartOptions] = useState({
    // Data: Data to be displayed in the chart
    data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
    ],
    // Series: Defines which chart type and data to use
    series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
});

  // Replace this with the actual value for the gauge
  const totalHolidays = 15; // Example value
  const holidayTitles = ['Holiday 1', 'Holiday 2', 'Holiday 3']; // Example holiday titles

  return (
    <>
      <Calendar />
      <ChartComponent type="bar" data={data} options={options} />
      <ChartComponent type="line" data={data} options={options} />
      <ChartComponent type="pie" data={data} options={options} />
      <ChartComponent type="doughnut" data={data} options={options} />
      <ChartComponent type="radar" data={data} options={options} />

      {/* Gauge Chart */}
      <Plot
        data={[
          {
            type: 'indicator',
            mode: 'gauge+number',
            value: totalHolidays, // Set the actual total holidays value here
            title: { text: "Total Holidays", font: { size: 24 } },
            gauge: {
              axis: { range: [0, 20] },
              bar: { color: 'blue' },
              steps: [
                { range: [0, 10], color: 'lightgray' },
                { range: [10, 20], color: 'gray' }
              ],
              threshold: {
                line: { color: 'red', width: 4 },
                thickness: 0.75,
                value: 15
              }
            }
          }
        ]}
        layout={{
          width: 400,
          height: 300,
          margin: { t: 0, b: 0 },
        }}
      />

      {/* Bar Chart */}
      <Plot
        data={[
          {
            x: holidayTitles, // Set the actual holiday titles for the x-axis
            y: new Array(holidayTitles.length).fill(1), // Replace this with actual counts if available
            type: 'bar',
            marker: { color: 'blue' }
          }
        ]}
        layout={{
          title: 'Holidays Overview',
          xaxis: { title: 'Holidays' },
          yaxis: { title: 'Count' },
          barmode: 'group',
          width: 400,
          height: 300,
        }}
      />

<AgCharts options={chartOptions} />
    </>
  );
}

export default App;
