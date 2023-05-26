import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const userId = localStorage.getItem("id")
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#" to="/destinations">
            Bucket List Application
          </Link>

          <Link className="btn btn-outline-light" to={"/" + String(userId) + "/bucket-list"}>
            Show Bucket List
          </Link>

          {Cookies.get("zurli")!==undefined &&(
          <Link className="btn btn-outline-light" to={"/modifyAccount"}>
            Change Account Settings
          </Link>)}

          {Cookies.get("zurli")!==undefined &&(
              <Link className="btn btn-outline-light" to="/logout">
                Logout
              </Link>            )}

          {Cookies.get("zurli")===null || Cookies.get("zurli")===undefined &&(
              <Link className="btn btn-outline-light" to={"/register"}>
                Register
              </Link>)}
        </div>
      </nav>
    </div>
  );
}
