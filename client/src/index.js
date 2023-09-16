import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./app/store"; // ,persistor} from "./app/store"
import { Provider } from "react-redux";
// import {PersistGate} from "redux-persist/integration/react"
// import {persistStore} from "redux-persist"
import { toast, ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthProvider";
import { RankProvider } from "./context/RankProvider";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <RankProvider>
        <Provider store={store}>
          <App /> 
          <ToastContainer />
        </Provider>
    </RankProvider>
  </AuthProvider>
);
// normalement strictmode
