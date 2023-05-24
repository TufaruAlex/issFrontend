import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper} from "@mui/material";
import {useParams} from "react-router-dom";
import {apiaddress} from "../Home";
import Cookies from "js-cookie";

const token = Cookies.get("timo")
export default function ProducerDetails() {
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const {producerId} = useParams()
    const [id, setId] = useState(producerId)
    const [producer, setProducer] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch(String(apiaddress) + "/producers/" + String(producerId))
            .then(res => res.json())
            .then((result) => {
                setProducer(result);
                setProducts(result.cubesProducers)
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
                    <h2>Producer Details</h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined" required
                               value={id}
                               disabled
                    /><br/>
                </Box>
                <Paper elevation={6}
                       style={{margin: "10px", padding: "15px", textAlign: "left"}} key={parseInt(producer.id)}>
                    Name:{producer.name}<br/>
                    GDP:{parseInt(producer.gdp)}<br/>
                    Address:{producer.address}<br/>
                    Phone Number:{producer.phoneNumber}<br/>
                    Email:{producer.email}<br/>
                    Produced Cubes:
                    {products.map(CP => (
                        <Paper elevation={6}
                               style={{margin: "10px", padding: "15px", textAlign: "left"}} key={parseInt(producer.id)}>
                            Name: {CP.cube.name}<br/>
                            Type: {CP.cube.type}<br/>

                        </Paper>
                    ))}
                </Paper>
            </Paper>
        </Container>
    );
}