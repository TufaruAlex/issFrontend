
import './App.css';
import React from 'react';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./layout/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/security/LoginPage";
import GetAllDestinations from "./components/destinations/GetAllDestinations";
import PrivateRoute from "./components/security/RedirectLogin";
import DestinationAdd from "./components/destinations/DestinationsAdd";
import DestinationDelete from "./components/destinations/DestinationsDelete";
import DestinationEdit from "./components/destinations/DestinationEdit";

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/destinations" element={<PrivateRoute><GetAllDestinations/></PrivateRoute>}/>
            <Route path="/destinations/add" element={<PrivateRoute><DestinationAdd/></PrivateRoute>}/>
            <Route path="/destinations/:destinationId/edit" element={<PrivateRoute><DestinationEdit/></PrivateRoute>}/>
            <Route path="/destinations/:destinationId/delete"
                   element={<PrivateRoute><DestinationDelete/></PrivateRoute>}/>
        </Routes>


      </Router>

    </div>
  );
}

export default App;
