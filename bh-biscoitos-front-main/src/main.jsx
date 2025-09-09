import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ⬅ importa o BrowserRouter
import App from './App.jsx';
import GlobalStyle from './styles/GlobalStyle.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>   {/* ⬅ envolve o App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
