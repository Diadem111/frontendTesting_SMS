import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router"
import SignupForm from "../src/signup"
import  ApplicationForm from "../src/newApplicant"
import  Home from "../src/home"


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/signup" element={<SignupForm/>}/>
      <Route path="/appilication" element={<ApplicationForm/>}/>
      <Route path="/" element={<Home/>}/>

     </Routes>

    </div>
  );
}

export default App;
