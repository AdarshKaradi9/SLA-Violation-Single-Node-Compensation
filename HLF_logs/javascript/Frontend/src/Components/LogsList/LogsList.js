import React from 'react';
import 'bulma/css/bulma.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
export default function LogsList({transactionData}) {
  const dataLogs = transactionData.data;
  console.log(dataLogs);
  return (
    

<div class="demo">
  <h1 id="responsive">Logs</h1>
  <br />
  <Table striped bordered hover >
    <thead>
      <tr>
        <th>Tid</th>
        <th>Load</th>
        <th>Os</th>
        <th>Ram</th>
        <th>Autoscale</th>
      </tr>
    </thead>
    <tbody>
    {dataLogs.violatedLogs.map(dataLog => (
      <tr>
        <td>{dataLog.tid}</td>
        <td>{dataLog.load}</td>
        <td>{dataLog.os}</td>
        <td>{dataLog.ram}</td>
        <td>{dataLog.autoscale}</td>
      </tr>
      ))}
      </tbody>
      </Table>
      </div>

  );
};

