import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, Paper, Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import Cookies from "js-cookie";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const token = Cookies.get("zurli");
export default function ModifyAccount() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [msg,setMsg] = useState('')
    const [email,setEmail] = useState('')


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
        if (name === "") {
            setMsg("empty name!!!");
            handleClick();
        } else if (email === "") {
            setMsg("empty email!!!");
            handleClick();
        } else {
            e.preventDefault()
            const user = {username: name,email:email}
            console.log(user)
            fetch("http://localhost:8080/api" + "/auth/updateAccount/"+String(localStorage.getItem("id")), {
                method: "PUT",
                headers: {"Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token},
                body: JSON.stringify(user),
                credentials: "include",
                mode: "cors"
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                            navigate("/destinations");
                            window.location.reload(false);
                        }
                    )


                } else {
                    setMsg(response);
                    handleClick();
                }
            })

        }}

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
                    <h2>Update account</h2>
                    <TextField id="outlined-basic" label="Name" variant="outlined" required
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="email" variant="outlined" required
                               type="text"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                    /><br/>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleAdd}>
                    Update
                </Button>
            </Paper>
        </Container>
    );
}