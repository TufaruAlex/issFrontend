import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Navbar() {
    const userId = localStorage.getItem("id");
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="#" to="/">
                        Bucket List Application
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="btn btn-outline-light" class="bucket-list" to={"/" + String(userId) + "/bucket-list"}>
                        View bucket list
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="btn btn-outline-light" to="/employee-comparison">
                        button two
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="btn btn-outline-light" to="/sort-employee">
                        button three
                    </Link>
                </div>
            </nav>
        </div>);
}
