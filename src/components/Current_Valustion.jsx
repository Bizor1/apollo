// import React from "react";
// import  Data from './Data'

// export default function CurrentValuation(props){
//     console.log("current Valuation",props.toplist[0].current_price)
//     let all_assets=[]
//     let all_prices=[]
    
//     if (props.toplist) {
//         for (let i = 0; i < props.toplist.length; i++) {
//             all_prices.push(props.toplist[i].current_price)
//             all_assets.push(props.toplist[i].id)

//             // all_prices.push(props.toplist[i].current_price)


//             }

     
    
//     //     }
//         console.log("all_prices",all_assets,all_prices)
      
    

// }

// // let totaliiis=[]

// // let total=0

// let total_array = [];


// for (let i = 0; i < props.labels.length; i++) {
//     let total_amount_for = 0;

//     let asset_needed = props.labels[i];
//     // console.log(props.labels.length);

//     for (let j = 0; j < props.data.specificTransaction.length; j++) {
//       // console.log(props.data.specificTransaction[j].asset);
//       // console.log(asset_needed)
//       if (props.data.specificTransaction[j].asset === asset_needed && props.data.specificTransaction[j].transactionType==="BUY") {
//         // console.log("yes")
//         total_amount_for += (props.data.specificTransaction[j].amount * all_prices[all_assets.indexOf(asset_needed)]);

//         // console.log("total_for",total_amount_for)
//       } else if (props.data.specificTransaction[j].asset === asset_needed && props.data.specificTransaction[j].transactionType==="SELL") {
//         total_amount_for -= (props.data.specificTransaction[j].amount * all_prices[all_assets.indexOf(asset_needed)]);
//       }

//       // console.log("total_for",total_amount_for)
//     }
//     console.log(`total_amount_for ${asset_needed}`,total_amount_for)
//     total_array.push(total_amount_for);
//     console.log("current value array",total_array)



//     // const totalAmount = props.data.specificTransaction.reduce((accumulator, currentTransaction) => {
//     //   if (props.data.specificTransaction.asset === i ) {
//     //     console.log("hmm",props.data.specificTransaction.asset)

//     //     return accumulator + props.data.specificTransaction.amount;
//     //   }
//     //   return accumulator;
//     // }, 0);
//     // console.log(totalAmount)
//     // console.log(total_array)
//   }

//   console.log("this is total",total_array);
//   const grand_totali = total_array.reduce((accumulator,current_value)=>{
//     return accumulator+current_value;
//   },0);
//   console.log("grand from valuation",grand_totali)


// //   return(
// //     <div>
// //         <Data total_array={total_array} labels={props.labels} />

// //     </div>
// //   )
 

// // if (props.data) {
   

// //     for(let i = 0; i < props.labels.length; i++){
// //         // console.log(all_assets.length)
// //         let sum=0
// //         for (let j = 0; j < props.data.specificTransaction.length; j++) {
// //             if(props.data.specificTransaction[j].asset===all_assets[i]){
               
// //                 sum+=props.data.specificTransaction[j].amount * all_prices[i]
// //                 console.log(`sum for ${all_assets[i]}`,sum)
// //             }
           

          
        
           
            


// //             // let index=all_assets.indexOf(props.data.specificTransaction[i].asset) 
// //             // total += props.data.specificTransaction[i].amount * all_prices[index];
        

// //         }
// //         totaliiis.push(sum)
// //         console.log("totaliis",totaliiis)
// //         // console.log(totaliiis)
        

        

    



// //     //   user_asset.add(props.data.specificTransaction[i].asset);

// //       // console.log(total)
// //     }
// //     // totaliiis.push(total)

// //   }
// //   console.log("totals for valuation",totaliiis)
// }