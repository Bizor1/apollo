import React, { useState, useEffect } from "react";
import gql from "graphql-tag";

import { useApolloClient, useQuery } from "@apollo/client";

const GET_User_TRANSACTIONS = gql`
  query ($username: String!) {
    specificTransaction(username: $username) {
      amount
      id
      transactionType
      dateCreated
      asset
    }
  }
`;

function DisplayPrices(props) {
    const [grand_total,setTotal]=useState("")
    const [user_unique_assets,setUniqueAssets]=useState("")
    


    console.log(props);
    console.log(props.user1);
    let username=props.user1

    // if(props.user2){let username=props.user1;console.log("this is user2",props.user2)}else{ username = props.user1;console.log("shit")};
    const { loading, error, data } = useQuery(GET_User_TRANSACTIONS, {
      variables: { username },
      pollInterval: 500,
    });

    if (loading) return null;

    if (error) return `Error! ${error}`;
    console.log("heh",data.specificTransaction.length)
    // console.log(props);
    // console.log(props.user1);
    let total=0
    console.log("this is it",data.specificTransaction);
    let user_asset= new Set();



      if(data){
  
        for(let i=0;i<data.specificTransaction.length;i++){
          total+= data.specificTransaction[i].amount
          user_asset.add(data.specificTransaction[i].asset)
  
          console.log(total)
        }
  
      }
  

   

    // console.log(total)
    // setTotal(total)
    console.log(user_asset)

    let labels=Array.from(user_asset)
    console.log("these are the labels",labels)

    // setTotal(setUniqueAssets(new Set(user_asset)))


 
    // const transactions=data.specificTransaction
    // const a =[1,2,3,4]

    // for(let i=0;i<data.specificTransaction.length;i++){
      // console.log("djbfkjdjhskjkjhgkjhfkjgkjfgjkkjfgkjkrejkkj")

      // console.log("specific transaction",typeof a)
    //   return(
    //     <div>
    //   {transactions[i].map((transaction)=>{
    //     <div>{transaction.asset}</div>
    //   })}
    // </div>

      // )


    // }
 
  return (
    <ul>
      {data.specificTransaction?.map((item, index) => (
        <>
        <ul key={item.id}>
        <li>{item.amount}</li>
        <li>{item.transactionType}</li>
        <li>{item.dateCreated}</li>

        </ul>
        
      

        </>
   

      ))}
      <div>
      {Array.from(user_asset).map((item, index) => (
        <>
        <ul key={index}>
        <li>{item}</li>
    

        </ul>
        
      

        </>
   

      ))}

      </div>
    </ul>

   
  
    
    
    
  );

  
}
export default DisplayPrices;
