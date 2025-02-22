import Calendar from './components/Calendar'
import ChartComponent from './components/Charts';

function App() {
  const data = {
    labels: ['info1', 'info2', 'info3', 'info4', 'info5', 'info6', 'info7'],
    datasets: [
        {
            label: 'value',
            backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'black'],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [102, 59, 33, 170, 60, 10,100],
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

  return (
    <>
<Calendar/>   
            <ChartComponent type="bar" data={data} options={options} />
            <ChartComponent type="line" data={data} options={options} />
            <ChartComponent type="pie" data={data} options={options} />
            <ChartComponent type="doughnut" data={data} options={options} />
            <ChartComponent type="radar" data={data} options={options} />

 </>
  )
}

export default App
