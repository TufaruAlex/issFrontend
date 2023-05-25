import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, Paper} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";

import Cookies from "js-cookie";

const token = Cookies.get("zurli")
export default function DestinationDelete() {
    const navigate = useNavigate();
    const {destinationId} = useParams()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [id, setId] = useState(destinationId)
    const role = localStorage.getItem("role");

    const handleDelete = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/api/destinations/" + parseInt(id), {
            method: "DELETE",
            headers:{'Authorization': 'Bearer ' + token}
        })
            .then(() => this.setState({status: "Delete successful"}));
        navigate("/destinations")
    }

    useEffect(() => {
        if (role !== "ROLE_ADMIN") {
            window.location.href = "http://localhost:3000/destinations";
        }
    }, [role]);

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
                    <h2>Delete destination by Id</h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined" required
                               value={id}
                               disabled
                    /><br/>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleDelete}>
                    Delete
                </Button>
            </Paper>
        </Container>
    );
}