import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <h1>Hello World!!!</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        
      </Routes>
    </>
  );
};

export default App;
