import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import CSS file if needed
import App from './App'; // Import the main App component
import { AuthProvider } from './components/Context/auth';
import "antd/dist/reset.css";
import { SearchProvider } from './components/Context/search';
import { CartProvider } from './components/Context/Cart';
ReactDOM.render(

  <AuthProvider>
    <SearchProvider>
      <CartProvider>
     
          <App />
      
      </CartProvider>
    </SearchProvider>
  </AuthProvider>,
 
 
  document.getElementById('root')
);





// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import { Provider } from "react-redux";
// import { store } from "./redux/Store";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <App />
//     </Provider>
//   </React.StrictMode>
// );