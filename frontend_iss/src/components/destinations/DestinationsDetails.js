import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper} from "@mui/material";
import {useParams} from "react-router-dom";

import Cookies from "js-cookie";

const token = Cookies.get("zurli")
export default function DestinationDetails() {
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const {destinationId: destinationId} = useParams()
    const [id, setId] = useState(destinationId)
    const [destination, setdestination] = useState('')
    const role = localStorage.getItem("role");


    useEffect(() => {
        if (role !== "ROLE_ADMIN") {
            window.location.href = "http://localhost:3000/destinations";
        }
    }, [role]);

    useEffect(() => {
        fetch('http://localhost:8080/api/destinations/details/' + String(destinationId),{
            headers:{'Authorization': 'Bearer ' + token}
        })
            .then(res => res.json())
            .then((result) => {
                setdestination(result);

            });
    }, []);



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
                    <h2>destination Details</h2>
                    <TextField
                        id="outlined-basic"
                        label="Id"
                        variant="outlined"
                        required
                        value={id}
                        disabled
                    /><br />
                </Box>
                <Paper
                    elevation={6}
                    style={{ margin: "10px", padding: "15px", textAlign: "left" }}
                    key={parseInt(destination.id)}
                >
                    {/* Displaying only the image */}
                    <img src={destination.image} alt="Destination Image" />
                </Paper>
            </Paper>
        </Container>
    );
}