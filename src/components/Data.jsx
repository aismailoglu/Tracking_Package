// NPM Packages
import { useState, useEffect } from "react";
// Project files
import TrackingTable from "./TrackingTable";
export default function PackageList() {
  // State
  const [status, setStatus] = useState(0); // 0 = loading data, 1 = data loaded, 2 = error;
  const [data, setData] = useState([]);
  // Constants
  const API_URL = "https://my.api.mockaroo.com/orders.json?key=e49e6840";
  // Methods
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => onFetchSuccess(json))
      .catch((error) => onFetchFail(error));
  }, [setData, setStatus]);
  function onFetchSuccess(json) {
    setData(json);
    setStatus(1);
  }
  function onFetchFail(error) {
    console.log("Error", error);
    setStatus(2);
  }
  return (
    <div className="App">
      {/* We use short circuit to simulate a Switch statement */}
      {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND */}
      {status === 0 && <p>:clock4: Loading...</p>}
      {status === 1 && <TrackingTable data={data} />}
      {status === 2 && <p>:rotating_light: Please check your connection</p>}
    </div>
  );
}
