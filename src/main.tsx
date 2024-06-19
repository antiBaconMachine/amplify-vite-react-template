import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { get } from "aws-amplify/api";

Amplify.configure(outputs);

async function getItem() {
  try {
    const restOperation = get({
      apiName: "myRestApi",
      path: "items",
    });
    const response = await restOperation.response;
    console.log("GET call succeeded: ", response);
  } catch (error) {
    console.log("GET call failed: ", error);
  }
}
console.log("GET call: ", getItem());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
