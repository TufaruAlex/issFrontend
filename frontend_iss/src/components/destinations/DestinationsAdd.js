import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import {Button, Container, FormControlLabel, Paper, Radio, RadioGroup, Snackbar} from "@mui/material";
import {FormControl, FormLabel} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Cookies from "js-cookie";

const token = Cookies.get("zurli")

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function DestinationAdd() {
    const navigate = useNavigate();
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [title, setTitle] = useState('')
    const [geolocation, setGeolocation] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [arrival_date, setArrival_date] = useState('')
    const [departure_date, setDeparture_date] = useState('')
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('error')
    const role = localStorage.getItem("role");
    const [dest,setDest] = useState(undefined)
    const formData = new FormData();

    useEffect(() => {
        if (role !== "ROLE_ADMIN") {
            window.location.href = "http://localhost:3000/destinations";
        }
    }, [role]);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(()=>{
        handleImage()
    },[dest])

    const handleImage=()=>{
        console.log(dest);
        if(dest!==undefined) {
            formData.append('file', image)
            console.log(image)
            fetch("http://localhost:8080/api/destinations/add/" + String(dest.id), {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: formData
            }).then(() => navigate("/destinations"))
        }
    }
    const handleAdd = (e) => {
        if (title === '') {
            setMsg('name empty!!!');
            handleClick()
        } else {
            e.preventDefault()
            const destination = {
                title: title,
                description: description,
                arrival_date: arrival_date,
                departure_date: departure_date,
                geolocation: geolocation,
                isPrivate: false
            };
            fetch("http://localhost:8080/api/destinations/add", {
                method: "POST",
                headers: {'Authorization': 'Bearer ' + token, "Content-Type": "application/json"},
                body: JSON.stringify(destination)
            }).then((response) =>
                response.json()
            ).then(data => {
                setDest(data);
            })
        }
    }

    return (
        <Container>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {msg}
                </Alert>
            </Snackbar>
            <Paper elevation={3} style={paperStyle}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 2, width: '550px'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h2>Add Destination</h2>
                    <TextField id="outlined-basic" label="Title" variant="outlined" required
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Geolocation" variant="outlined" required
                               onChange={(e) => setGeolocation(e.target.value)}
                    /><br/>
                    <FormControl>
                        <FormLabel>Add Image</FormLabel>
                    <TextField type="file" id="outlined-basic" variant="outlined" required
                               onChange={(e)=>setImage(e.target.files[0])}
                    />
                    </FormControl><br/>
                    <TextField id="outlined-basic" label="Description" variant="outlined" required
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}
                    /><br/>
                    <FormControl>
                        <FormLabel>arrival date</FormLabel>
                        <TextField id="outlined-basic"  variant="outlined" type="date" required
                                   value={arrival_date}
                                   onChange={(e) => setArrival_date(e.target.value)}
                        />
                    </FormControl>
                    <br/>

                    <FormControl>
                        <FormLabel>departure date</FormLabel>
                        <TextField id="outlined-basic"  variant="outlined" type="date" required
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
        </Container>
    );
}