import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as React from "react";
import Cookies from "js-cookie";
import {Button, Container, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {FormControl, FormLabel} from "@mui/joy";

const token = Cookies.get("zurli")

export default function CreatePrivateDestination() {
    const navigate = useNavigate();
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [title, setTitle] = useState('');
    const [geolocation, setGeolocation] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [stay_dates, setStay_dates] = useState('')
    const [arrival_date, setArrival_date] = useState('')
    const [departure_date, setDeparture_date] = useState('')
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('error')
    const userId = localStorage.getItem("id");

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleAdd = (e) => {
        if (title === '') {
            setMsg('name empty!!!');
            handleClick()
        } else {
            e.preventDefault()
            const destination = {
                title: title,
                image: image,
                description: description,
                arrival_date: arrival_date,
                departure_date: departure_date,
                geolocation: geolocation,
                isPrivate: true
            }
            console.log(destination)
            fetch("http://localhost:8080/api/destinations/add", {
                method: "POST",
                headers: {'Authorization': 'Bearer ' + token, "Content-Type": "application/json"},
                body: JSON.stringify(destination)
            })
                .then(response => response.json())
                .then(data => {
                    fetch(`http://localhost:8080/api/${userId}/bucket-list/add`, {
                        method: "POST",
                        headers: {'Authorization': 'Bearer ' + token, "Content-Type": "application/json"},
                        body: JSON.stringify(data.id)
                    })
                        .then(response => {
                            console.log(response)
                        })
                })

            navigate(`/${userId}/bucket-list`)
        }
    }

    return (<Container>
        <Paper elevation={3} style={paperStyle}>
            <Box component="form"
                 sx={{
                     '& > :not(style)': {m: 2, width: '550px'},
                 }}
                 noValidate
                 autoComplete="off">
                <TextField id="outlined-basic" label="Title" variant="outlined" required
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                /><br/>
                <TextField id="outlined-basic" label="Geolocation" variant="outlined" required
                           onChange={(e) => setGeolocation(e.target.value)}
                /><br/>
                <TextField id="outlined-basic" label="Image" variant="outlined" required
                           value={image}
                           onChange={(e) => setImage(e.target.value)}
                /><br/>
                <TextField id="outlined-basic" label="Description" variant="outlined" required
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                /><br/>
                <FormControl>
                    <FormLabel>arrival date</FormLabel>
                    <TextField id="outlined-basic" label="arrival dates" variant="outlined" type="date" required
                               value={arrival_date}
                               onChange={(e) => setArrival_date(e.target.value)}
                    />
                </FormControl>
                <br/>

                <FormControl>
                    <FormLabel>departure date</FormLabel>
                    <TextField id="outlined-basic" label="departure dates" variant="outlined" type="date" required
                               value={departure_date}
                               onChange={(e) => setDeparture_date(e.target.value)}
                    />
                </FormControl>
                <br/>
            </Box>
            <Button variant="contained" color="secondary" onClick={handleAdd}>
                Add
            </Button>
        </Paper>
    </Container>)
}