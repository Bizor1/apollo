import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { gql, useMutation } from "@apollo/client";
import { useState,useEffect } from "react";


const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success,
      errors,
     
      token,
      refreshToken,
    
      user {
        id,
        username,
      }
    }
  }
`;




export default function LoginForm() {
  const [login, { data }] = useMutation(LOGIN_MUTATION);
  const [token,setToken]=useState("")
  const [refresh,setRefresh]=useState("")
  const [user,setUser]=useState("")

  useEffect(() => {
     if(data){
    // console.log(data)

    // console.log(data.tokenAuth['user']['username'])
    setUser(data.tokenAuth['user']['username'])
    console.log(data.tokenAuth['user']['username'])
    console.log(data.tokenAuth['user']['id'])
    console.log(data.tokenAuth)


    // setRefresh(data.tokenAuth.refresh);
    // setToken(data.tokenAuth.token);
    // console.log(token,refresh);  
    localStorage.clear();
    localStorage.setItem("user",user);
  }
  }, )
  

  // if(data){
  //   console.log(data)

  //   console.log(data.tokenAuth['user']['username'])
  //   setUser(data.tokenAuth['user']['username'])
  //   // setRefresh(data.tokenAuth.refresh);
  //   // setToken(data.tokenAuth.token);
  //   // console.log(token,refresh);  
  //   // localStorage.setItem(token,"your token");
  // }
// console.log(localStorage.getItem(user))


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    


    login({ variables: { username, password } });

    // if(data){
    //   console.log(data)
  
    //   console.log(data.tokenAuth['user']['username'])
    //   setUser(data.tokenAuth['user']['username'])
    //   // setRefresh(data.tokenAuth.refresh);
    //   // setToken(data.tokenAuth.token);
    //   // console.log(token,refresh);  
    //   // localStorage.setItem(token,"your token");
    // }

  };

  // if(data){
  //   console.log(data)

  //   console.log(data.tokenAuth['user']['username'])
  //   setUser(data.tokenAuth['user']['username'])
  //   // setRefresh(data.tokenAuth.refresh);
  //   // setToken(data.tokenAuth.token);
  //   // console.log(token,refresh);  
  //   // localStorage.setItem(token,"your token");
  // }
  

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      
      <button type="submit">Log in</button>
    </form>
  );
}
