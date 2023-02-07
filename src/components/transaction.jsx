import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import DisplayPrices from "./displayPrice";
import AssetList from "./All_assets";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddGrandTotal from "./AddGrandTotal";
import AreaChart from "./AreaChart";
import DataGrandTotal from "./AllGrandTotalData";
import TryChart from "./Try";


const TRANSACTION_MUTATION = gql`
  mutation (
    $amount: Float!
    $price: Float!
    $transactionType: String!
    $asset: String!
    $user: String!
  ) {
    createTransaction(
      amount: $amount
      price: $price
      transactionType: $transactionType
      asset: $asset
      user: $user
    ) {
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
const GRAND_TOTAL_MUTATION = gql`
  mutation myFirstMutation($user: String!, $grandTotal: Float!) {
    createGrandTotal(user: $user, grandTotal: $grandTotal) {
      grandTotal {
        dateCreated
      }
    }
  }
`;
// const GRAND_TOTAL_MUTATION = gql`
// mutation myFirstMutation($user: String!, $grandTotal: Float!) {
//     createGrandTotal(user:$user,grandTotal: $grandTotal) {
//         grandTotal {
//           dateCreated,

//         }

//     }
// }`;

export default function YourComponent(props) {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [selected_asset, setAsset] = useState("");
  const [transaction_type, seTransactionType] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dataFromChild, setDataFromChild] = useState("");
  const [grand_total, { data1 }] = useMutation(GRAND_TOTAL_MUTATION);

  useEffect(() => {
    setUser1(localStorage.getItem("user"));

    // console.log(user1)
  }, []);
  console.log("from transactions", user1);

  // // let a =props.a
  // console.log("this is the user1",user1)
  // console.log("obtained",props.top_list)
  let top_list = props.top_list;

  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };

  // const [grand_total, { data1 }] = useMutation(GRAND_TOTAL_MUTATION);

  const [transaction, { data, loading, error }] =
    useMutation(TRANSACTION_MUTATION);
  if (loading) return "Submitting...";

  if (error) return `Submission error! ${error.message}`;

  // const user=user1

  // console.log("fetched",user)

  const handleChange = (event) => {
    setAsset(event.target.value);
    // console.log("selected asset",selected_asset)
  };
  const handleChange2 = (event) => {
    seTransactionType(event.target.value);
  };
  // console.log("selected asset",selected_asset)

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
    const transactionType = transaction_type;
    // const asset = form.elements.asset.value;
    const asset = selected_asset;

    const user = user1;
    const grandTotal = dataFromChild;
    setUser1(localStorage.getItem("user"));

    setShow(false);

    // setUser2(localStorage.getItem("user"))

    transaction({ variables: { amount, price, asset, transactionType, user } });
    grand_total({ variables: { user, grandTotal } });

    // grand_total=({ variables: { user, grandTotal } });
    // const [grand_total, { data }] = useMutation(GRAND_TOTAL_MUTATION);

    // const user = user;
    // const grandTotal = ;
  };
  console.log("transaction props", props);

  console.log("from transactions", user1);
  //   console.log(data)

  return (
    <>
   {/* <div class="d-flex">
  <div class="p-2 w-100 border border-primary"> */}


  {/* </div> */}
  <div class="p-2 flex-shrink-1 d-flex justify-content-end mb-0">
  <button type="button" className="btn btn-primary btn-sm d-flex justify-content-center" onClick={handleShow}>Create A Transaction</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={HandleSubmit}>
            <div className="form-group">
              <select class="form-select" onChange={handleChange}>
                <option>Select Crypto</option>
                {top_list.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Amount of Crypto</label>
              <input
                name="amount"
                className="form-control"
                type="number"
                placeholder="amount"
              />
            </div>
            <div className="form-group ">
              <label htmlFor="price">Price</label>
              <input
                name="price"
                className="form-control"
                type="number"
                placeholder="Price"
              />
            </div>

            <div className="form-group mt-1">
              <select onChange={handleChange2} className="form-select">
                <option>Select Transaction Type</option>
                <option value={"BUY"}>BUY</option>
                <option value={"SELL"}>SELL</option>
              </select>
            </div>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>

  </div>
  <div class="container text-center">
  
  <DisplayPrices
            user1={user1}
            onDataFromChild={handleDataFromChild}
            top_list={top_list}
          />
  
  </div>
 
   
    
    
        
         
       
     
    </>
  );
}
