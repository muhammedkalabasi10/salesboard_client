import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import AuthContext from "./Context/AuthContext";
import Navbar from "./components/Navbar/Navbar";


function App() {
  const { vendor } = useContext(AuthContext);
  return (
    <Router>
      {vendor && <Navbar/>}
      <Routes>
        {vendor ? <Route path='/' element={<Dashboard/>} /> : <Route path='/' element={<Login/>} />}
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
