import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";



const GRAND_TOTAL_MUTATION = gql`
mutation myFirstMutation($user: String!, $grandTotal: Float!) {
    createGrandTotal(user:$user,grandTotal: $grandTotal) {
        grandTotal {
          dateCreated,
        }
      
    }
}`;


export default function AddGrandTotal(props){
    
    
    const [grand_total, { data }] = useMutation(GRAND_TOTAL_MUTATION)

    console.log("grand_total_props",props)

    const user = props.user;
    const grandTotal = props.grand_total;
    


    grand_total({ variables: { user, grandTotal } });







}



