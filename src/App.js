import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router"
import SignupForm from "../src/signup"
import  ApplicationForm from "../src/newApplicant"


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/signup" element={<SignupForm/>}/>
      <Route path="/appilication" element={<ApplicationForm/>}/>
     </Routes>

    </div>
  );
}

export default App;
