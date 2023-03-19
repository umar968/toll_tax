import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { MySelect, MyTextInput } from './utils'
import axios from 'axios'


export default function ExitComponent() {
  let [cost, setCost] = useState(0)
  const [msg, setMsg] = useState("")

  return (
    <div className='container'>
      <h3>Exit a vehicle here</h3>
      <Formik
        initialValues={{
          distance: '',
          exitPoint: '',
          numberPlate: ''
        }}
        validationSchema={Yup.object({
          numberPlate: Yup.string()
            .test('validNumberPlate', "Number Plate is not valid", (val, context) => RegExp(/^[A-Z]{3}-[0-9]{3}$/).test(val))
            .max(7, 'Invalid Number Plate Format')
            .required('Number Plate is required')
          // .matches('/^[A-Z]{3}-[0-9]{3}$/', "Format of Number Plate in incorrect")
          ,
          // distance: Yup.number()
          //   .required('Distance Traveled is requied to calculate tax'),
          exitPoint: Yup.string()
            .oneOf(['a', 'b', 'c', 'd'])
            .required('Exit Point is required')
        })}
        onSubmit={(values, { setSubmitting }) => {

          axios.patch(`http://localhost:3000/api/exit-vehicle`, values).then((res) => {
            console.log(res)
            if (res.data.status == "success") {
              setCost(res.data.vehicle.cost)

              setMsg("Data is saved successfully ")
            } else {
              setMsg("Data cannot be saved successfully " + res.data.message)

            }
          });
          setSubmitting(false)


        }}
      >
        <Form>
          <MyTextInput
            className="form-control"
            label="Number Plate"
            name='numberPlate'
            type="text"
            placeholder='LLL-NNN' />
          {/* <MyTextInput
            className="form-control"
            label="Distance Traveled"
            name='distance'
            type="text"
            placeholder='0 KM'
          /> */}

          <MySelect className='form-control' label='Exit Point' name="exitPoint">
            <option values="">Select an exit point</option>
            <option values="a">a</option>
            <option values="b">b</option>
            <option values="c">c</option>
            <option values="d">d</option>

          </MySelect>
          <button className='btn btn-success' type="submit">Exit a vehicle</button>
        </Form>
      </Formik>
      <h5>{msg}</h5>
      <div></div>
      <h4>Collect the amount: {cost} RS</h4>
    </div>
  )
}
