import gql from 'graphql-tag'
import { useApolloClient,useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import DisplayPrices from './displayPrice';

const TRANSACTION_MUTATION = gql`
mutation($amount: Float!, $price: Float!,$transactionType:String!,$asset: String!,$user:String!) {
  createTransaction( amount: $amount, price: $price, transactionType: $transactionType, 
    asset : $asset, user:$user) {
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

function YourComponent() {
    const [user1,setUser1] =useState("")
    const [user2,setUser2] =useState("")


    useEffect(() => {
    
        setUser1(localStorage.getItem("user"));
    
        console.log(user1)
      

    }, [])
    console.log("this is the user1",user1)
    


    
    const [transaction, { data,loading,error }] = useMutation(TRANSACTION_MUTATION)
    if (loading) return 'Submitting...';

    if (error) return `Submission error! ${error.message}`;

   
    
    const user=user1


    console.log("fetched",user)


  
  const HandleSubmit = (event) => {
    event.preventDefault();

    // const item = localStorage.getItem('user');
    // console.log(localStorage.user)

    // const user =localStorage.getItem("user");

        // if(user){
        //     console.log("fetched",user)

        // }
        


    const form = event.target;
    const amount = form.elements.amount.value;
    const price = form.elements.price.value;
    const transactionType = form.elements.transactionType.value;
    const asset = form.elements.asset.value;
    setUser1(localStorage.getItem("user"));

    // setUser2(localStorage.getItem("user"))

    
    transaction({ variables: { amount, price,asset,transactionType,user} });
  }

//   console.log(data)

  return (
    <div>
        <form onSubmit={HandleSubmit}>
      <input name="amount" type="number" placeholder="amount" />
      <input name="price" type="number" placeholder="Price" />
      <input name="asset" type="input" placeholder="asset" />   
      <input name="transactionType" type="input" placeholder="transaction_type" />
      <button type='Submit'>Sumbit</button>

    </form>
    {console.log("hjsgjkshkjfskjh",user1)}
    <div>
        <DisplayPrices user1={user1}  />
    </div>
 

  
    
    </div>

 

    


  );
}

export default YourComponent;