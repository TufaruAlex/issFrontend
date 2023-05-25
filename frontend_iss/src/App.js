
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
import DestinationDetails from "./components/destinations/DestinationsDetails";
import CreatePrivateDestination from "./components/bucket list/CreatePrivateDestination";
import GetBucketList from "./components/bucket list/GetBucketList";
import DeleteBucketList from "./components/bucket list/DeleteBucketList";

import Logout from "./components/security/Logout"
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
            <Route path="/destinations/:destinationId/details"
                   element={<PrivateRoute><DestinationDetails/></PrivateRoute>}/>
            <Route path={"/:userId/bucket-list"} element={<PrivateRoute><GetBucketList/></PrivateRoute>}/>
            <Route path={"/:userId/bucket-list/add-private"} element={<PrivateRoute><CreatePrivateDestination/></PrivateRoute>}/>
            <Route path={"/:userId/bucket-list/delete/:destinationId"} element={<PrivateRoute><DeleteBucketList/></PrivateRoute>}/>

            <Route path={"/:userid/bucket-list/add"} element={<PrivateRoute><DestinationAdd/></PrivateRoute>}/>
            <Route path={"/logout"} element={<PrivateRoute><Logout/> </PrivateRoute>}></Route>
        </Routes>


      </Router>

    </div>
  );
}

export default App;
