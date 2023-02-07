import React from "react";
import Chart from "chart.js/auto";
import { Doughnut} from "react-chartjs-2";

const PieChart = (props) => {
  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }
  //     ]
  //   }
  // }
  // console.log("pops",props.data1)
  // console.log("labels",props.labels)

  // console.log("background",props.colors)

  return (
    <div class="card border-0 mt-4 mb-4 justify" >
    <div class="card-body border-0 mt-4 mb-4" style={{ height: "500px"}}>
    <Doughnut data={props.data} />

    </div>
  </div>
    
    
  );
};
export default PieChart;