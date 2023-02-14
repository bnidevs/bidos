import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        fontColor: "white",
        fontSize: 15,
      },
    },
    title: {
      display: true,
      text: "Commits & Issues",
    },
  },
};

const labels = [
  "Monday",
  "Tuesday",
  "Wendesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const data = {
  labels,
  datasets: [
    {
      label: "Commits",
      data: [3, 2, 0, 6, 2, 1, 2],
      backgroundColor: "#0fdb46",
      borderColor: "#0fdb46",
      // backgroundColor: "#0fdb46",
    },
    {
      label: "Issues",
      data: [2, 1, 0, 5, 7, 1, 4],
      borderColor: "#ed1156",
      backgroundColor: "#ed1156",
    },
  ],
};

const ProgressGraph = () => {
  return <Line options={options} data={data} />;
};

export default ProgressGraph;
