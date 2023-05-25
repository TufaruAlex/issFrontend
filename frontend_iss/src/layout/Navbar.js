import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#" to="/destinations">
            Bucket List Application
          </Link>

          <Link className="btn btn-outline-light" to="/add-employee">
            button one
          </Link>

          <Link className="btn btn-outline-light" to="/employee-comparison">
            button two
          </Link>

          <Link className="btn btn-outline-light" to="/sort-employee">
            button three
          </Link>

          {Cookies.get("zurli")!==undefined &&(
              <Link className="btn btn-outline-light" to="/logout">
                Logout
              </Link>            )}
        </div>
      </nav>
    </div>
  );
}
