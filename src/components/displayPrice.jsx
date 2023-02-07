import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import Data from "./Data";
import "bootstrap/dist/css/bootstrap.css";

import { useApolloClient, useQuery } from "@apollo/client";
import AddGrandTotal from "./AddGrandTotal";
import CurrentValuation from "./Current_Valustion";
import DataGrandTotal from "./AllGrandTotalData";
import NewTable from "./NewTable";
import CustomStorageDoc from "./NewTable";
import TheTable from "./TheTable";

const GET_User_TRANSACTIONS = gql`
  query ($username: String!) {
    specificTransaction(username: $username) {
      amount
      id
      transactionType
      dateCreated
      asset
      price
    }
  }
`;

export default function DisplayPrices(props) {
  // const [dataFromChild, setDataFromChild] = useState("");
  const [className, setClassName] = useState("");

  let username = props.user1;
  let top_list = props.top_list;
  console.log("outrageous", top_list);
  // const [username,setUser1]=useState('')

  // useEffect(() => {
  //   console.log("this is my props",props)
  //   setUser1(props.user1)

  // }, [])

  // () => {
  //   props.onDataFromChild(grand_total);
  // };

  function make_call() {
    props.onDataFromChild(grand_total);
    console.log("making call", grand_total);
  }

  const [user_unique_assets, setUniqueAssets] = useState("");

  // console.log(props);
  // console.log(props.user1);
  // let username = props.user1;

  // if(props.user2){let username=props.user1;console.log("this is user2",props.user2)}else{ username = props.user1;console.log("shit")};
  const { loading, error, data } = useQuery(GET_User_TRANSACTIONS, {
    variables: { username },
    pollInterval: 500,
  });

  if (loading) return null;

  if (error) return `display+prices_error Error! ${error}`;

  let total = 0;
  let user_asset = new Set();
  if (data) {
    for (let i = 0; i < data.specificTransaction.length; i++) {
      total +=
        data.specificTransaction[i].amount * data.specificTransaction[i].price;
      user_asset.add(data.specificTransaction[i].asset);
    }
  }

  let all_assets = [];
  let all_prices = [];

  if (top_list) {
    for (let i = 0; i < top_list.length; i++) {
      all_prices.push(top_list[i].current_price);
      all_assets.push(top_list[i].id);

      // all_prices.push(props.toplist[i].current_price)
    }

    //     }
    console.log("all_prices", all_assets, all_prices);
  }

  // setTotal(total)
  // console.log(user_asset)

  let labels = Array.from(user_asset);
  // console.log("these are the labels",labels)

  let total_array1 = [];

  for (let i = 0; i < labels.length; i++) {
    let total_amount_for1 = 0;

    let asset_needed = labels[i];
    // console.log(labels.length);

    for (let j = 0; j < data.specificTransaction.length; j++) {
      // console.log(data.specificTransaction[j].asset);
      // console.log(asset_needed)
      if (
        data.specificTransaction[j].asset === asset_needed &&
        data.specificTransaction[j].transactionType === "BUY"
      ) {
        // console.log("yes")
        total_amount_for1 +=
          data.specificTransaction[j].amount *
          data.specificTransaction[j].price;

        // console.log("total_for",total_amount_for1)
      } else if (
        data.specificTransaction[j].asset === asset_needed &&
        data.specificTransaction[j].transactionType === "SELL"
      ) {
        total_amount_for1 -=
          data.specificTransaction[j].amount *
          data.specificTransaction[j].price;
      }

      // console.log("total_for1",total_amount_for1)
    }
    total_array1.push(total_amount_for1);
  }

  // total_array1

  console.log("this is total", total_array1);
  const grand_total1 = total_array1.reduce((accumulator, current_value) => {
    return accumulator + current_value;
  }, 0);
  console.log("grand1", grand_total1);
  //   // const totalAmount = data.specificTransaction.reduce((accumulator, currentTransaction) => {
  //   //   if (data.specificTransaction.asset === i ) {
  //   //     console.log("hmm",data.specificTransaction.asset)

  //   //     return accumulator + data.specificTransaction.amount;
  //   //   }
  //   //   return accumulator;
  //   // }, 0);
  //   // console.log(totalAmount)
  //   // console.log(total_array)
  // }

  // console.log(labels);
  let total_array = [];

  for (let i = 0; i < labels.length; i++) {
    let total_amount_for = 0;

    let asset_needed = labels[i];
    // console.log(props.labels.length);

    for (let j = 0; j < data.specificTransaction.length; j++) {
      // console.log(props.data.specificTransaction[j].asset);
      // console.log(asset_needed)
      if (
        data.specificTransaction[j].asset === asset_needed &&
        data.specificTransaction[j].transactionType === "BUY"
      ) {
        // console.log("yes")
        total_amount_for +=
          data.specificTransaction[j].amount *
          all_prices[all_assets.indexOf(asset_needed)];

        // console.log("total_for",total_amount_for)
      } else if (
        data.specificTransaction[j].asset === asset_needed &&
        data.specificTransaction[j].transactionType === "SELL"
      ) {
        total_amount_for -=
          data.specificTransaction[j].amount *
          all_prices[all_assets.indexOf(asset_needed)];
      }

      // console.log("total_for",total_amount_for)
    }
    console.log(`total_amount_for ${asset_needed}`, total_amount_for);
    total_array.push(total_amount_for);
    console.log("current value array", total_array);

    // const totalAmount = props.data.specificTransaction.reduce((accumulator, currentTransaction) => {
    //   if (props.data.specificTransaction.asset === i ) {
    //     console.log("hmm",props.data.specificTransaction.asset)

    //     return accumulator + props.data.specificTransaction.amount;
    //   }
    //   return accumulator;
    // }, 0);
    // console.log(totalAmount)
    // console.log(total_array)
  }

  let newArray = [...total_array];

  console.log("this is total", newArray);
  const grand_total = newArray.reduce((accumulator, current_value) => {
    return accumulator + current_value;
  }, 0);
  console.log("grand", grand_total);
  console.log("grand1", grand_total1);

  let profits = grand_total - grand_total1;
  let percentage_profits = ((grand_total - grand_total1) / grand_total1) * 100;
  if (percentage_profits > 0) {
    <div className="text-success">{percentage_profits}%</div>;
  } else if (percentage_profits < 0) {
    <div className="text-success">{percentage_profits}%</div>;
  } else {
    <div className="text-success">{percentage_profits}%</div>;
  }
  console.log("datttt",data)
  console.log("profits are", profits);

  // localStorage.setItem(grand_total)
  return (
    <>
      <div>
        <p class="font-weight-light d-flex justify-content-start">
          Current Asset Valuation
        </p>
        <h3 className="text-success d-flex justify-content-start">
          {grand_total.toFixed(2)}$
        </h3>
        {percentage_profits > 0 ? (
          <p className="d-flex justify-content-start">
            <button className="btn btn-success mb-4 ">
              {percentage_profits.toFixed(2)}%
            </button>
          </p>
        ) : (
          <p className="d-flex justify-content-end">
            <button className="btn btn-danger ">
              {percentage_profits.toFixed(2)}%
            </button>
          </p>
        )}
        <div></div>

        <div class="card border-0 mt-4 mb-4 d-flex ">
          <div
            class="card-body bg-light border-0 mt-4 mb-4"
            style={{ height: "18rem" }}
          >
            <div>
              <DataGrandTotal user={props.user1} grand_total={grand_total} />
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <div>
                <Data total_array={total_array} labels={labels} />
              </div>{" "}
            </div>
           
          </div>
        </div>
  
        <div>
          <TheTable data={data}/>
        </div>

        {/* <AddGrandTotal user={props.user1} grand_total={grand_total}/> */}
      </div>
      {make_call()}

      {/* <button onClick={handleClick}>
      Send Data to Parent
    </button> */}
    </>
  );
}
