import React from "react";
import { useState, useEffect } from "react";
import PieChart from "./Chart";

export default function Data(props) {
  const [num_ber, setNumber] = useState("");
  //   const [background_colors,Colors]=useState("")

  console.log("this is props", props.total_array);
  useEffect(() => {
    setNumber(props.labels.length);
    console.log("number", num_ber);
    console.log("labels", props.labels);
  }, []);

  function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgba(${r}, ${g}, ${b}, 0.3)`;
  }

  let colors = [];
  // let border_colors=[]
  for (let i = 0; i < num_ber; i++) {
    const colors_ = getRandomColor();
    colors.push(colors_);

    console.log("logging", colors);
    // colors.push()
  }
  let newArr = colors.map(function (str) {
    return str.replace(/0\.3/g, "1.3");
  });

  //   setColors(colors)
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "%portfolio",
        data: props.total_array,
        backgroundColor: colors,
        borderColor: newArr,
        borderWidth: 1,
      },
    ],
  };

  console.log("hehhehhhhhhh,totals", props.total_array);

  //   console.log("backgroundColor", colors);
  //   const labels = props.labels;
  //   const data1 = {
  //     labels: props.labels,
  //     datasets: [
  //       {
  //         label: "My First dataset",
  //         backgroundColor: colors,
  //         borderColor: "rgb(0,0,255)",
  //         data: props.total_array,
  //       },
  //     ],
  //   };
  //   // setData(data1)
  console.log("piechart", data);

  return (
    <>
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <div>
              <PieChart data={data} />
            </div>
          </div>
          <div class="col">
            {props.labels.map((item, index) => (
              <div class="container text-center">
                <div class="row">
                  <div class="col">
                    <div key={index}>
                      {" "}
                      <h5>{item}</h5>{" "}
                    </div>
                  </div>
                  <div class="col">
                    <button class="btn btn-primary">${parseFloat(props.total_array[index]).toFixed(2)}</button>
                  </div>{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>

    //   <div class="d-flex">
    //   <div class="p-2 w-100">

    //   </div>
    //   <div class="p-2">Flex item</div>
    // </div>
  );

  //   console.log(ge)
}
