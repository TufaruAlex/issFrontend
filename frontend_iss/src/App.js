
import './App.css';
import React from 'react';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./layout/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/security/LoginPage";

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>


      </Router>

    </div>
  );
}

export default App;
