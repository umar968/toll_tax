import axios from 'axios';
import React, { useState } from 'react'

export default function AllVehicleComponent() {
  let [vehicles, setVehicles] = useState([])

  React.useEffect(() => {

    axios.get(`http://localhost:3000/api/all-vehicles`)
      .then((response) => {
        setVehicles(response.data.vehicles)
      });

  }, [])
  return (
    <div className='container justify-content-center'>
      <h3>List of All vehicles</h3>
      <table className='table'>
        <tr>
          <th>Number Plate</th>
          <th>Entry Point</th>
          <th>Exit Point</th>
          <th>Cost</th>
        </tr>
        <tbody>
          {
            vehicles.map((val) => {
              return (
                <tr id={val._id}>
                  <td>{val.numberPlate}</td>
                  <td>{val.entryPoint}</td>
                  <td>{val.exitPoint}</td>
                  <td>{val.cost}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
  )
}
