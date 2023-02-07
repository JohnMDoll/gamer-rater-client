import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom"
import { GamerRater } from './GamerRater';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GamerRater />
  </BrowserRouter>
);
