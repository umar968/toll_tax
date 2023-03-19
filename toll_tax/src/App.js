import EntryComponent from "./components/EntryComponent";
import ExitComponent from "./components/ExitComponent";
import AllVehicleComponent from "./components/AllVehicleComponent";
import HomeComponent from "./components/HomeComponent";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <HomeComponent />

      <Routes>
        <Route path="/entry" element={<EntryComponent />} />
        <Route path="/exit" element={<ExitComponent />} />
        <Route path="/all-vehicle" element={<AllVehicleComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
