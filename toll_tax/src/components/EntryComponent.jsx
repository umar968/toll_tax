import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { MySelect, MyTextInput } from './utils'
import axios from 'axios'


export default function EntryComponent() {
    const [msg, setMsg] = useState("")
    return (
        <div className='container'>
            <h3>Enter a new vehicle here</h3>
            <Formik
                initialValues={{
                    numberPlate: '',
                    entryPoint: ''
                }}
                // /^[A-Z]{3}-[0-9]{3}$/
                validationSchema={Yup.object({
                    numberPlate: Yup.string()
                        .test('validNumberPlate', "Number Plate is not valid", (val, context) => RegExp(/^[A-Z]{3}-[0-9]{3}$/).test(val))
                        .required('Number Plate is required')
                    ,
                    entryPoint: Yup.string()
                        .oneOf(['a', 'b', 'c', 'd'])
                        .required('Entry Point is required')

                })}
                onSubmit={(values, actions) => {
                    axios.post(`http://localhost:3000/api/enter-vehicle`, values)
                        .then((res) => {
                            if (res.data.status == "success") {
                                setMsg("Data is saved successfully " + res.data.message)
                            } else {
                                setMsg("Data cannot be saved. " + res.data.message)

                            }
                        });


                    actions.setSubmitting(false)

                }}
            >
                <Form className='form-group'>
                    <MyTextInput
                        className="form-control"
                        label="Number Plate"
                        name='numberPlate'
                        type="text"
                        placeholder='LLL-NNN'
                    />
                    <MySelect label='Entry Point'
                        className="form-control"
                        name="entryPoint">
                        <option values="">Select an entry point</option>
                        <option values="a">a</option>
                        <option values="b">b</option>
                        <option values="c">c</option>
                        <option values="d">d</option>


                    </MySelect>
                    <button className='btn btn-success' type="submit">Enter a new vehicle</button>

                </Form>
            </Formik>
            <h5>{msg}</h5>
        </div >
    )
}
