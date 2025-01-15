import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import RouteComponent from "./allRoutes/RouteComponent";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <RouteComponent />
      </Provider>
    </>
  );
}

export default App;
