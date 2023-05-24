import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, Paper, Snackbar} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginPage() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')


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
        // if(name===""){
        //     setMsg("empty name!!!");
        //     handleClick();
        // }
        // else
        // if(price<0) {
        //     setMsg("negative price!!!");
        //     handleClick();
        // }
        // else
        // if(name.length>50){
        //     setMsg("very long name!!!");
        //     handleClick();
        // }
        // else {
        e.preventDefault()
        const user = {username: name, password: password}
        console.log(user)
        fetch("http://localhost:8080/api" + "/auth/signin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user),
            credentials: "include",
            mode: "cors"
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("login failed");
            }
        }).then(() => {
            navigate("/");
        })

    }

    return (
        <Container>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {/*{msg}*/}
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
                    <h2>Login</h2>
                    <TextField id="outlined-basic" label="Name" variant="outlined" required
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" required
                               type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                    /><br/>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleAdd}>
                    Login
                </Button>
            </Paper>
        </Container>
    );
}