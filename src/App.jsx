import Calendar from "./components/Calendar"
import { AgCharts } from "ag-charts-react"

function App() {
  // Common dataset
  const chartData = [
    { title: "cc", month: "Jan", avgTemp: 2.3, iceCreamSales: 162000 },
    { title: "cc", month: "Mar", avgTemp: 6.3, iceCreamSales: 302000 },
    { title: "cc", month: "May", avgTemp: 16.2, iceCreamSales: 800000 },
    { title: "cc", month: "Jul", avgTemp: 22.8, iceCreamSales: 1254000 },
    { title: "cc", month: "Sep", avgTemp: 14.5, iceCreamSales: 950000 },
    { title: "cc", month: "Nov", avgTemp: 8.9, iceCreamSales: 200000 },
  ]

  // Bar Chart
  const barChartOptions = {
    title: { text: "Ice Cream Sales (Bar Chart)" },
    data: chartData,
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "iceCreamSales",
        fill: "#4caf50",
        label: {
          enabled: true,
          fontSize: 14,
          color: "#ffffff",
          fontWeight: "bold",
          placement: "insideEnd",
        },
        highlightStyle: {
          item: {
            fill: "#66bb6a",
            stroke: "#2e7d32",
            strokeWidth: 3,
          },
        },
      },
    ],
    legend: { enabled: false },
    axes: [
      { type: "category", position: "bottom" },
      {
        type: "number",
        position: "left",
        title: { text: "Ice Cream Sales ($)" },
        label: {
          formatter: (params) => {
            return params.value / 1000 + "k"
          },
        },
      },
    ],
  }

  // Line Chart
  const lineChartOptions = {
    title: { text: "Ice Cream Sales (Line Chart)" },
    data: chartData,
    series: [
      {
        type: "line",
        xKey: "month",
        yKey: "iceCreamSales",
        stroke: "#ff9800",
        marker: {
          enabled: true,
          size: 6,
          fill: "#ff9800",
          stroke: "#fff",
        },
        label: {
          enabled: true,
          fontSize: 12,
          color: "#000000",
          fontWeight: "bold",
        },
      },
    ],
    axes: [
      { type: "category", position: "bottom" },
      {
        type: "number",
        position: "left",
        title: { text: "Ice Cream Sales ($)" },
        label: {
          formatter: (params) => {
            return params.value / 1000 + "k"
          },
        },
      },
    ],
  }

  // Area Chart
  const areaChartOptions = {
    title: { text: "Ice Cream Sales (Area Chart)" },
    data: chartData,
    series: [
      {
        type: "area",
        xKey: "month",
        yKey: "iceCreamSales",
        fillOpacity: 0.3,
        fill: "#3f51b5",
        stroke: "#283593",
        marker: {
          enabled: true,
          size: 6,
          fill: "#3f51b5",
          stroke: "#fff",
        },
      },
    ],
    axes: [
      { type: "category", position: "bottom" },
      {
        type: "number",
        position: "left",
        title: { text: "Ice Cream Sales ($)" },
        label: {
          formatter: (params) => {
            return params.value / 1000 + "k"
          },
        },
      },
    ],
  }

  // Scatter Chart
  const scatterChartOptions = {
    title: { text: "Ice Cream Sales (Scatter Chart)" },
    data: chartData,
    series: [
      {
        type: "scatter",
        xKey: "avgTemp",
        yKey: "iceCreamSales",
        marker: {
          size: 8,
          fill: "#e91e63",
          stroke: "#c2185b",
          strokeWidth: 2,
        },
        label: {
          enabled: true,
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
        title: { text: "Average Temperature (°C)" },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Ice Cream Sales ($)" },
        label: {
          formatter: (params) => {
            return params.value / 1000 + "k"
          },
        },
      },
    ],
  }

  // Bubble Chart
  const bubbleChartOptions = {
    title: { text: "Temperature vs. Ice Cream Sales (Bubble Chart)" },
    data: chartData,
    series: [
      {
        type: "bubble",
        xKey: "avgTemp",
        yKey: "iceCreamSales",
        sizeKey: "iceCreamSales",
        title: "month",
        shape: "circle",
        fill: "#673ab7",
        stroke: "#512da8",
        label: {
          enabled: true,
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
        title: { text: "Average Temperature (°C)" },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Ice Cream Sales ($)" },
        label: {
          formatter: (params) => {
            return params.value / 1000 + "k"
          },
        },
      },
    ],
  }

  // Pie Chart
  const pieChartOptions = {
    title: { text: "Ice Cream Sales Distribution (Pie Chart)" },
    data: chartData,
    series: [
      {
        type: "pie",
        angleKey: "iceCreamSales",
        labelKey: "month",
        label: {
          enabled: true,
          fontSize: 14,
          fontWeight: "bold",
          formatter: (params) => {
            return (params.datum.iceCreamSales / 1000).toFixed(0) + "k"
          },
        },
        calloutLabel: {
          enabled: true,
          fontSize: 14,
          fontWeight: "bold",
        },
        fills: ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3"],
      },
    ],
    legend: {
      enabled: true,
      position: "bottom",
    },
  }

  // Stacked Bar Chart
  const stackedBarChartOptions = {
    title: { text: "Stacked Bar Chart Example" },
    data: chartData,
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "iceCreamSales",
        yName: "Ice Cream Sales",
        stacked: true,
        fill: "#f44336",
      },
      {
        type: "bar",
        xKey: "month",
        yKey: "avgTemp",
        yName: "Average Temperature",
        stacked: true,
        fill: "#03a9f4",
      },
    ],
    axes: [
      { type: "category", position: "bottom" },
      {
        type: "number",
        position: "left",
        label: {
          formatter: (params) => {
            return params.value / 1000 + "k"
          },
        },
      },
    ],
    legend: { enabled: true },
  }

  // Radial Bar Chart
  const radialBarChartOptions = {
    title: { text: "Ice Cream Sales (Radial Bar Chart)" },
    data: chartData,
    series: [
      {
        type: "radial-bar",
        angleKey: "iceCreamSales",
        radiusKey: "month",
        fill: "#8bc34a",
        strokeWidth: 2,
        stroke: "#689f38",
        label: {
          enabled: true,
          fontSize: 12,
          fontWeight: "bold",
          formatter: (params) => {
            return (params.value / 1000).toFixed(0) + "k"
          },
        },
      },
    ],
  }

  // Histogram Chart
  const histogramChartOptions = {
    title: { text: "Sales Frequency (Histogram)" },
    data: chartData,
    series: [
      {
        type: "histogram",
        xKey: "iceCreamSales",
        bins: 5,
        fill: "#9c27b0",
        stroke: "#7b1fa2",
        label: {
          enabled: true,
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
        title: { text: "Ice Cream Sales ($)" },
        label: {
          formatter: (params) => {
            return params.value / 1000 + "k"
          },
        },
      },
      {
        type: "number",
        position: "left",
        title: { text: "Frequency" },
      },
    ],
  }

  // Treemap Chart
  const treemapChartOptions = {
    title: { text: "Sales Breakdown (Treemap)" },
    data: chartData,
    series: [
      {
        type: "treemap",
        labelKey: "month",
        sizeKey: "iceCreamSales",
        colorKey: "iceCreamSales",
        fills: ["#ff5722", "#2196f3", "#4caf50", "#ffeb3b", "#9c27b0", "#795548"],
        label: {
          enabled: true,
          fontSize: 14,
          fontWeight: "bold",
          formatter: (params) => {
            return (params.datum.iceCreamSales / 1000).toFixed(0) + "k"
          },
        },
      },
    ],
  }

  // Polar Chart
  const polarChartOptions = {
    title: { text: "Ice Cream Sales (Polar Chart)" },
    data: chartData,
    series: [
      {
        type: "polar",
        angleKey: "iceCreamSales",
        radiusKey: "month",
        fillOpacity: 0.6,
        fills: ["#ff9800", "#009688", "#3f51b5", "#e91e63", "#4caf50", "#9c27b0"],
        strokeWidth: 2,
        stroke: "#fff",
        label: {
          enabled: true,
          fontSize: 12,
          fontWeight: "bold",
          formatter: (params) => {
            return (params.value / 1000).toFixed(0) + "k"
          },
        },
      },
    ],
  }

  // Heatmap Chart
  const heatmapChartOptions = {
    title: { text: "Sales Intensity (Heatmap)" },
    data: chartData,
    series: [
      {
        type: "heatmap",
        xKey: "month",
        yKey: "avgTemp",
        colorKey: "iceCreamSales",
        sizeKey: "iceCreamSales",
        fills: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
        label: {
          enabled: true,
          fontSize: 12,
          fontWeight: "bold",
          formatter: (params) => {
            return (params.value / 1000).toFixed(0) + "k"
          },
        },
      },
    ],
    axes: [
      { type: "category", position: "bottom" },
      {
        type: "number",
        position: "left",
        title: { text: "Average Temperature (°C)" },
      },
    ],
  }

  // Gauge Chart
  const gaugeChartOptions = {
    title: { text: "Sales Progress (Gauge Chart)" },
    data: [{ value: chartData.reduce((sum, item) => sum + item.iceCreamSales, 0) }],
    series: [
      {
        type: "gauge",
        angleKey: "value",
        fill: "#f44336",
        minAngle: -90,
        maxAngle: 90,
        innerRadius: 0.5,
        cornerRadius: 6,
        label: {
          enabled: true,
          fontSize: 20,
          fontWeight: "bold",
          formatter: (params) => {
            return (params.value / 1000000).toFixed(2) + "M"
          },
        },
      },
    ],
  }

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
        <AgCharts options={histogramChartOptions} />
        <AgCharts options={treemapChartOptions} />
        <AgCharts options={polarChartOptions} />
        <AgCharts options={heatmapChartOptions} />
        <AgCharts options={gaugeChartOptions} />
   
    </>
  )
}

export default App

