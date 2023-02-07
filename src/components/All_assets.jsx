import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YourComponent from './transaction';
import NavBar from "./NavBar";



function AssetList() {
  const [top_list, setTopList] = useState([]);
  const interval = 500000000;
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1.');
      setTopList(response.data);
    };

    const intervalId = setInterval(fetchData, interval);
    fetchData();

    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1.",
  //   //   {headers: {'X-CMC_PRO_API_KEY': 'f0b42135-5846-413d-8d5e-0ed08b39877e',}}
  //     )
  //     .then(res => setTopList(res.data))
  //     .catch(err => console.error(err));
  // }, interval, []);
  
  console.log("top_list",top_list)
  let shit=localStorage.getItem("user")
  console.log("shit",shit)
//   let a=9

  return (
    <>
      <NavBar/>

<div class="container text-center">
<div class="row">
<div class="col ">
</div>
<div class="col-12 ">
<div class="card-body">
   <YourComponent top_list={top_list}/>
    </div> 
</div>

</div>
</div>
    </>
  


    // <div className='mt-4 mb-4'>
    //     <div class="card bg-light border-0 ">
   
    //   </div>

    // </div>
  
  )

//   return (
//     <ul>
//       {data.map(item => (
//         <li key={item.id}>{item.name}</li>
//       ))}
//     </ul>
//   );
}

export default AssetList;
