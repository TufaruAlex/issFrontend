import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, IconButton, Paper, Tooltip} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";

import Cookies from "js-cookie";
import AddIcon from "@mui/icons-material/Add";

const token = Cookies.get("zurli")
export default function Logout() {
    const navigate = useNavigate();
    const {destinationId} = useParams()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}

    const logout = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/api/auth/signout", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            mode: "cors"
        })
            .then((response) => console.log(response.json()));
        navigate("/login");
        localStorage.setItem("role",null);
        localStorage.setItem("id",null);
        window.location.reload(false);
    }

    const goBack=()=>{
        navigate("/destinations")
    }


    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 2, width: '550px'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Button variant="contained" color="secondary" onClick={goBack}>
                        Go back
                    </Button>
                    <Button variant="contained" color="secondary" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}