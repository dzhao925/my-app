/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ____Danqi Zhao_________ Student ID: __147403190_____ Date: ___2021/10/10_________
*
*
********************************************************************************/ 

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     < App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

