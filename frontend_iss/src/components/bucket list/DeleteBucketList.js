import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {Button, Container, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as React from "react";

const token = Cookies.get("zurli")

export default function DeleteBucketList() {
    const navigate = useNavigate();
    const {userId, destinationId} = useParams()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [id, setId] = useState(destinationId)

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/api/${userId}/bucket-list/delete/` + parseInt(id), {
            method: "DELETE",
            headers:{'Authorization': 'Bearer ' + token}
        })
            .then(() => this.setState({status: "Delete successful"}));
        navigate(`/${userId}/bucket-list`)
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
                    <h2>Delete destination from bucket list</h2>
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