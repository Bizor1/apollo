import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

import LoginForm from "./components/form";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AssetList from "./components/All_assets";

import ErrorBoundary from "./components/ErrorBoundary";
// import NavBar from "./components/NavBar";

function App() {
  console.log(localStorage.getItem("token"));

  return (
    <div className="bg-light">
      
      <ErrorBoundary>
        <Routes>
        <Route exact path="/" element={<LoginForm />} />


        </Routes>

        {/* <NavBar> */}
        <Routes>
        <Route path="transaction" element={<AssetList />} />
        


        </Routes>
        {/* </NavBar> */}

        {/* <Route path="/contact" component={Contact} /> */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
