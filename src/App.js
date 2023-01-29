import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import {  useMutation } from '@apollo/client';
import ADD_TODO from './components/form';
import LoginForm from './components/form';
import LogoutButton from './components/logout';
import Register from './components/adduser';
import MyComponent from './components/selectCrypto';
import { DisplayPrices } from './components/displayPrice';
import YourComponent from './components/transaction';
import {BrowserRouter as Router,Route,Routes,Switch} from "react-router-dom"


import Chart from './components/Chart';
import LineChart from './components/Chart';



function App() {

console.log(localStorage.getItem('token'))


  return (
    <Router>
         <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="transaction" element={<YourComponent />}/>
        <Route path="chart" element={<LineChart />}/>


        



      
      

      </Routes>
       
     
      {/* <div><LogoutButton/></div> */}

      {/* <Register/> */}
      {/* <MyComponent/> */}
      {/* <DisplayPrices/> */}
      {/* <YourComponent/> */}
    </div>

    </Router>

  );
}

export default App;
