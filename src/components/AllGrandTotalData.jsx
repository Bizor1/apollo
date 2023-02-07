import React from "react";

import { gql, useQuery } from '@apollo/client';
import { useEffect,useRef,useState } from "react";
import AreaChart from "./AreaChart";
import moment from 'moment';
import TryChart from "./Try";

const GET_USER_TOTALS = gql`
query ($username: String!) {
    specificTotals(username: $username) {
    grandTotal
    dateCreated

      
      
      
    }
  }
`;

export default function DataGrandTotal(props){

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
    const username=props.user
    console.log("udernsame",username)
    
    // const chartRef = useRef(null);

    // useEffect(() => {
    //   const chartInstance = chartRef.current.chartInstance;
    //   chartInstance.update();
    // });


    const { loading, error, data } = useQuery(GET_USER_TOTALS,{
        variables: { username}, pollInterval: 500
      });
    if (loading) return 'Loading...';

    if (error) return `Error! ${error.message}`;

    // console.log("DataTotal",props)
    console.log("Data_total",data.specificTotals[0])

    let labels=[]

    let grandTotal=[]
    
    for(let i=0;i<data.specificTotals.length;i++){
        // moment(date).format('MMMM D, YYYY, h:mm A')
        labels.push(moment(data.specificTotals[i].dateCreated).format('MMMM D, YYYY, h:mm A'))
        console.log("totally",data.specificTotals[i])
        grandTotal.push(data.specificTotals[i].grandTotal)

    }
    console.log("labelele",labels,grandTotal)
//     const data1 = {
//   labels: labels,
//   datasets: [
//     {
//       label: 'Amount in portfolio',
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
//       data: grandTotal
//     }
//   ]
// };
// const options = {
//     maintainAspectRatio: false,
//     bezierCurve: true,
//     bezierCurveTension: 0.4,
//     scales: {
//       xAxes: [
//         {
//           gridLines: {
//             display: false
//           }
//         }
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             display: false
//           }
//         }
//       ]
//     }
//   }

// const options = {
//       maintainAspectRatio: false,

//   bezierCurve: true,
//   bezierCurveTension: 0.4,
// };
// const runs=['A','B']
const datas = labels.map((labels, index) => ({ name:labels, Value: grandTotal[index] , value:grandTotal[index],pv: grandTotal[index], amt: grandTotal[index] }));
datas.push( { name: currentTime.toLocaleString(undefined, {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
}),Value:parseFloat(props.grand_total.toFixed(2)), value: parseFloat(props.grand_total.toFixed(2)) , pv: parseFloat(props.grand_total.toFixed(2)) , amt: parseFloat(props.grand_total.toFixed(2)) })
console.log("datas", datas)



  
    

// ref={chartRef} 
    

  return(
    <div>
         {/* <div>
    <AreaChart  data={data1} options={options} />
  </div> */}
  <div>
  <TryChart  datas={datas}/>
</div>
      
    </div>
 
  )



}