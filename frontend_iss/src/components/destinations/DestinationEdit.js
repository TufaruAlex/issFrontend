import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import {Button, Container, FormControlLabel, Paper, Radio, RadioGroup} from "@mui/material";
import {FormControl, FormLabel} from "@mui/joy";
import {useNavigate, useParams} from "react-router-dom";

import Cookies from "js-cookie";

const token = Cookies.get("zurli")
export default function ProducerEdit() {
    const {destinationId} = useParams()
    const navigate = useNavigate()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [id, setId] = useState(destinationId)
    const [title, setTitle] = useState('')
    const [geolocation, setGeolocation] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [stay_dates, setStay_dates] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault()
        const producer = {id, title: title, image: image, description: description, stay_dates: stay_dates, geolocation: geolocation}
        console.log(producer)
        fetch("http://localhost:8080/api/destinations"+ String(id), {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(producer)
        }).then(() => {
            console.log("Destination updated")
        })
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
                    <h2>Update Cube</h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined"
                               value={id}
                               disabled
                    /><br/>
                    <TextField id="outlined-basic" label="Title" variant="outlined"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Geolocation" variant="outlined"
                               onChange={(e) => setGeolocation(parseInt(e.target.value))}
                    /><br/>
                    <TextField id="outlined-basic" label="image" variant="outlined"
                               value={image}
                               onChange={(e) => setImage(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Description" variant="outlined"
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Stay dates" variant="outlined"
                               value={stay_dates}
                               onChange={(e) => setStay_dates(e.target.value)}
                    /><br/>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleUpdate}>
                    Update
                </Button>
            </Paper>
        </Container>
    );
}