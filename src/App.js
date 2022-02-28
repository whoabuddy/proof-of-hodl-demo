import "./App.css";
import { QrReader } from "react-qr-reader";
import { useState } from "react";

function App() {
  const [data, setData] = useState("No result");

  return (
    <div className="App">
      <p>Proof of Hodl Demo App</p>
      <QrReader
        constraints={{ facingMode: "environment" }}
        onResult={(result, error) => {
          if (!!result) {
            setData("loading...");
            checkProofOfHodl(result?.text).then((answer) => setData(answer));
          }
          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{data}</p>
    </div>
  );
}

export default App;

async function checkProofOfHodl(address) {
  const response = await fetch(
    `https://citycoins-api.citycoins.workers.dev/tools/proof-of-hodl/mia/${address}`
  );
  const data = await response.json();
  console.log(`data: ${JSON.stringify(data)}`);
  return data.value.toString();
}
