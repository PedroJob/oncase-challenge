import React from "react";

function Table({ contact }) {
  return (
    <tr>
      <td>{contact.id}</td>
      <td>{contact.fname}</td>
      <td>{contact.lname}</td>
      <td>{contact.perc + "%"}</td>
    </tr>
  );
}

export default Table;
