import React from "react";
import { TypeAhead } from "./components/type-ahead";
import textValueService from "./services/type-ahead-service";

function App() {
  return (
    <div className="App-body">
      <main className="container">
        <div className="row">
          <div className="card-panel">
            <h3>Type ahead example using the react-use-data-hook</h3>
            <p>This example shows how simple it is to create components that use external data.</p>
            <p>
              The same component is used, each with a different service injected, one that resolves fruits and one that resolves vegetable names. Try
              apple as input in the first field.{" "}
            </p>
          </div>
        </div>
        <div className="row">
          <TypeAhead defaultValue="apple" label="Fruit" placeholder="Fruits" serviceFn={textValueService.getFruit} />
        </div>
        <div className="row">
          <TypeAhead placeholder="Veg" label="Vegetable" serviceFn={textValueService.getVeg} />
        </div>
      </main>
    </div>
  );
}

export default App;
