import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const token = Cookies.get("zurli");

export default function DestinationDetails() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
    const { destinationId } = useParams();
    const [id, setId] = useState(destinationId);
    const [destination, setDestination] = useState('');
    const [imageByteArray, setImageByteArray] = useState(null);
    const role = localStorage.getItem("role");


    useEffect(() => {
        fetch('http://localhost:8080/api/destinations/details/' + String(destinationId), {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(res => res.json())
            .then((result) => {
                setDestination(result);
            });
    }, [destinationId]);

    useEffect(() => {
        fetch('http://localhost:8080/api/destinations/image/' + String(destinationId), {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(res => res.arrayBuffer())
            .then((result) => {
                setImageByteArray(result);
            });
    }, [destinationId]);

    // Convert byte array to base64 string
    const byteArrayToBase64 = (byteArray) => {
        const base64String = btoa(
            new Uint8Array(byteArray).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );
        return base64String;
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 2, width: '550px' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h2>Destination Details</h2>
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
                    {/* Displaying the image */}
                    {imageByteArray && (
                        <img
                            src={`data:image/jpeg;base64,${byteArrayToBase64(imageByteArray)}`}
                            alt="Destination Image"
                        />
                    )}
                    {/* Displaying other destination details */}
                    {/* ... */}
                </Paper>
            </Paper>
        </Container>
    );
}