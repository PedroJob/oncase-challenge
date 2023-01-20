import React, { useState } from "react";
import Table from "./Table";
import data from "../data.json";
import Plot from "./Plot";
import { createRoot } from "react-dom/client";

function App() {
  var [id, setId] = useState(1);
  const [contacts, setContacts] = useState(data);
  const names = contacts.map((contact) => contact.fname + " " + contact.lname);
  var percs = contacts.map((contact) => contact.perc);
  const sum = percs.reduce(
    (partialSum, a) => Number(partialSum) + Number(a),
    0
  );

  var [colors, setColors] = useState("");

  function generateRandomColor() {
    let maxVal = 0xffffff; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`;
  }

  console.log(percs);
  console.log(sum);

  const validate = (string) => {
    return string.length;
  };

  return (
    <div>
      <div>
        <div className="Header">
          <div className="header-form">
            <form>
              <input
                type="text"
                placeholder="First name"
                name="fname"
                id="fname"
              />
              <input
                type="text"
                placeholder="Last name"
                name="lname"
                id="lname"
              />
              <input
                type="number"
                className="perc"
                placeholder="Participation"
                name="perc"
                id="perc"
                min="0"
                max="100"
              />
              <button
                type="submit"
                id="send-button"
                onClick={(e) => {
                  e.preventDefault();

                  let fname = document.getElementById("fname").value;
                  let lname = document.getElementById("lname").value;
                  let perc = document.getElementById("perc").value;

                  if (!validate(fname) || !validate(lname)) {
                    window.alert("Type a valid name");
                    return;
                  }

                  if (sum + Number(perc) > 100) {
                    window.alert(
                      "Participation is over 100%, remains " +
                        Number(100 - sum) +
                        "%"
                    );
                    return;
                  }

                  const tHead = document.getElementById("table-head");
                  const tableHead = createRoot(tHead);

                  tableHead.render(
                    <tr>
                      <th></th>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Participation</th>
                    </tr>
                  );

                  const newContact = {
                    id: id,
                    fname: fname,
                    lname: lname,
                    perc: perc,
                  };
                  setId(id + 1);
                  const newContacts = [...contacts, newContact];
                  setContacts(newContacts);
                  const newColor = generateRandomColor();
                  setColors([...colors, newColor]);
                }}
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className="title">
          <h1>DATA</h1>
          <br />
          <p>Type some data and click SEND button</p>
        </div>
      </div>

      <div className="container">
        <div className="table">
          <table align="center" cellSpacing={0}>
            <thead id="table-head"></thead>
            <tbody>
              {contacts.map((contact) => (
                <Table contact={contact} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="graph">
          <Plot names={names} percs={percs} sum={sum} color={colors} />
        </div>
      </div>
    </div>
  );
}

export default App;
