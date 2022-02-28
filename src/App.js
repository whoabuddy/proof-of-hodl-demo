import "./App.css";
import { QrReader } from "react-qr-reader";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [address, setAddress] = useState("");

  return (
    <div className="App">
      <h1>Proof of Hodl Demo</h1>
      <p>Scan the Stacks address QR code below!</p>
      <hr />
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (!!result) {
            setLoading(true);
            setAddress(result?.text);
            checkProofOfHodl(result?.text).then((answer) => {
              setData(answer);
              setLoading(false);
            });
          }
        }}
        style={{ width: "100%" }}
      />
      <hr />
      <div className="hodl">
        {address && (
          <p className="hodl-dark">
            {address.substring(0, 5)}...{address.substring(address.length - 5)}
          </p>
        )}
        {!loading && (
          <p className={data ? "hodl-success" : "hodl-error"}>
            {data ? "Access Granted" : "Access Denied"}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

async function checkProofOfHodl(address) {
  const response = await fetch(
    `https://citycoins-api.citycoins.workers.dev/tools/proof-of-hodl/mia/${address}`
  );
  const data = await response.json();
  return data.value;
}
