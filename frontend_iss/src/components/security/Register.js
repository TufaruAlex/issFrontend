import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Paper,
    Radio,
    RadioGroup,
    Snackbar
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Register() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email,setEmail] = useState()
    const [msg,setMsg] = useState('')
    const [roles,setRoles] = useState(["user"])


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
        } else if (password === "") {
            setMsg("empty password!!!");
            handleClick();
        } else if (email === "") {
            setMsg("empty password!!!");
            handleClick();
        } else {
            e.preventDefault()
            const user = {username: name, password: password,email:email,role:roles}
            console.log(user)
            fetch("http://localhost:8080/api" + "/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user),
                credentials: "include",
                mode: "cors"
            }).then(response => {
                if (response.ok) {
                    response.json().then(data => {
                            navigate("/login");
                            window.location.reload(false);
                        }
                    )
                } else {
                    setMsg("bad credentials");
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
                    <h2>Login</h2>
                    <TextField id="outlined-basic" label="Name" variant="outlined" required
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Email" variant="outlined" required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" required
                               type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                    /><br/>
                    <FormControl>
                        <FormLabel id="radioId">Admin?</FormLabel>
                        <RadioGroup
                            aria-labelledby="radioId"
                            name="radiobuttongroup"
                            onChange={(e) => setRoles([e.target.value])}
                            required
                        >
                            <FormControlLabel value='"admin","user"' control={<Radio/>} label="Yes"/>
                            <FormControlLabel value='"user"' control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleAdd}>
                    Login
                </Button>
            </Paper>
        </Container>
    );
}