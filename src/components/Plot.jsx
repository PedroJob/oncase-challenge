import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Plot(props) {
  const data = {
    labels: props.names,
    datasets: [
      {
        label: [...props.names, ""] + "participation (%)",
        data: [...props.percs, 100 - props.sum],
        backgroundColor: [...props.color, "#FFFFFF"],
        borderColor: [...props.color, "#FFFFFF"],
        borderWidth: 1,
        responsive: true
      }
    ]
  };
  return <Doughnut data={data} />;
}

export default Plot;
