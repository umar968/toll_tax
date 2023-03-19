import { useField } from "formik";
// import axios from "axios";
// const URL = "http://localhost:3000/api";

export const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

// export const sendEntryData = (values) => {
//   axios.post(`${URL}/enter-vehicle`, values).then((res) => {
//     return res.data;
//   });
// };

// export const sendExitData = (values) => {
//   axios.patch(`${URL}/exit-vehicle`, values).then((res) => {
//     console.log(`in utils ${res.data.vehicle.cost}`);
//     console.log(res);
//     return res.data.vehicle.cost;
//   });
// };

// export const getAllVehicles = () => {
//   axios.get(`${URL}/all-vehicles`).then((response) => {
//     console.log(response);
//     return response.data.vehicles;
//   });
// };
