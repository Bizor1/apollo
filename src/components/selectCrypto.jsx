import React, { useState, useEffect } from "react";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";
import { useApolloClient } from '@apollo/client';


const TRANSACTION_MUTATION = gql`
mutation($amount: Number!, $Price: Number!,$transactionType:String!,$asset: String!) {
  createTransaction( amount: $amount, price: $price, transactionType: $transactionType, 
    asset : "Bitcoin") {
    transaction {
      id
      user {
        id
     
      }
      amount
     
    }
  }
}

`;


function CoinSeclect() {
  const [transaction, { data }] = useMutation(TRANSACTION_MUTATION)




  // const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selected,setSelected]=useState("");
  const [selectedindex,setSelectedIndex]=useState("")
  const [amount,setAmount]=useState("")
  const [price,setPrice]=useState("")


  // useEffect(() => {

  //   axios
  //     .get(
  //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
  //     )
  //     .then((response) => {
  //       setData(response.data);
  //       // console.log(data1)





  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // }, []); // Pass an empty array to only run the effect on mount

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }
  // if (!data) {

  //   return <div>Loading...</div>;
  // }
  
  
  // function Try(data,selected){
  //   // console.log(data[0]) 
  //   // console.log(selected)
  //   for (let i = 0; i < data.length; i++) {
  //     // console.log(data[i].id)
  //     if (data[i].id === selected) {
       
  //       // console.log("started")
  //       // console.log(data[i]);
  //       setSelectedIndex(i)
  //       console.log(i)
  //     }
  //   }

  // }
 
  function handleSubmit(event){

    event.preventDefault();

    const form = event.target;
    const amount = form.elements.amount.value;
    const price = form.elements.price.value;
    const transactionType = form.elements.transactionType.value;
    const asset = form.elements.asset.value;


    setAmount(event.target.elements.amount.value) ;
    setPrice(event.target.elements.price.value);

    transaction({ variables: { amount, price,asset,transactionType } });


   
    

  }
  // console.log(data1)
  console.log(amount)
  console.log(price)

  // function handleChange(event){


  //   setSelected(event.target.value);
  //   Try(data,event.target.value)



   
  
  //   // console.log('dskkjd')
   


  // }
 



  // console.log(selected)
  // console.log(selectedindex)

  return (
    <div>
      {/* <select
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example" onChange={handleChange} 
        value={selected} 
      
      >
        <option>Choose the Asset</option>
        {data.map((item, index) => (
          <option key={index}>{item.id}</option>
        ))}
      </select>

      <div>{(data[selectedindex]?.current_price)/10}</div> */}
      <form onSubmit={handleSubmit}>
      <input name="transactionType" placeholder="transaction_type" />
      <input name="amount" type="number" placeholder="amount" />
      <input name="price" type="number" placeholder="Price" />
      <input name="asset"  placeholder="Price" />

      
      <button type="submit">Submit</button>
    </form>
    </div>
    
    


  );
}

export default CoinSeclect;
