import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"

import 'primereact/resources/primereact.css';                       // core css
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';  



const client = new ApolloClient({

  uri: 'http://127.0.0.1:8000/graphql',

  cache: new InMemoryCache(),

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Router>
    <App />

    </Router>


  
  </ApolloProvider>,



);


