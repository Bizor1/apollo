import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag'
import { Line, defaults } from 'react-chartjs-2';
import { ResponsiveContainer } from 'recharts';


const GET_USER_TOTALS = gql`
  query ($username: String!) {
    specificTotals(username: $username) {
      grandTotal
    }
  }
`;

export default function AreaChart(props) {
    console.log("Areachart",props.options)
    console.log("Areachart",props.data)
    
    // defaults.global.maintainAspectRatio = false;

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       fill: true,
//       backgroundColor: 'rgba(75,192,192,0.2)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// };
// const options = {
//     maintainAspectRatio: false
//   };
    

    // return(
    //   //   <div>
    //   //     <ResponsiveContainer width="100%" height={300} aspect={4.0 / 3.0}>
    //   //     <Line data={props.data} options={props.options}  
    //   //   />

    //   //     </ResponsiveContainer>
      
    //   // </div>
    // )





}

