import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";
import { classNames } from "../utilities/helpers";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data?: number[];
}

const PieChart: React.FC<Props> = ({ data = [] }) => {
  const generateDataset = () => {
    const dataSet = {
      labels: ["Primary", "Interest"],
      datasets: [
        {
          label: "(%)",
          data: [...data],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };
    return dataSet;
  };
  return (
    <div
      className={classNames(
        "px-4 py-3 rounded-md bg-white shadow-md border border-zinc-100 justify-center items-center",
        data.length < 1 ? "hidden" : "flex"
      )}>
      <Pie data={generateDataset()} />
    </div>
  );
};

export default PieChart;
