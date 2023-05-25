import {
    Button,
    CircularProgress,
    Container,
    Dialog,
    FormControl,
    IconButton,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import Cookies from "js-cookie";

let i = 0;


const token = Cookies.get("zurli")
export default function GetAllDestinations() {
    const [loading, setLoading] = useState(false);
    const [destinations, setDestinations] = useState([]);
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("id");


    console.log(role);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/api/destinations/' + String(i),{
            headers:{'Authorization': 'Bearer ' + token}
        })
            .then((response) => response.json())
            .then((data) => {
                setDestinations(data);
                setLoading(false);
            });
    }, []);

    const reloadData = () => {
        setLoading(true);
        fetch('http://localhost:8080/destinations/details/' + String(i),{
            headers:{'Authorization': 'Bearer ' + token}
        })
            .then((response) => response.json())
            .then((data) => {
                setDestinations(data);
                setLoading(false);
            });
    }

    const incPage = (e) => {
        i = i + 1;
        reloadData()
    }

    const decPage = (e) => {
        if (i >= 1)
            i = i - 1;
        reloadData()
    }

    const handleAddToBucketList = (destinationId) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,

            },
            body: destinationId,
        };


        fetch('http://localhost:8080/api/' + String(user)+'/bucket-list/add', requestOptions,{
            headers:{'Authorization': 'Bearer ' + token}
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // handle the response from the backend
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <Container>
            <h1>All Destinations</h1>

            {loading && <CircularProgress/>}
                <div>
                    {role === "ROLE_ADMIN" && (
                    <IconButton component={Link} sx={{mr: 3}} to={`/destinations/add`}>
                        <Tooltip title="Add a new destination" arrow>
                            <AddIcon color="primary"/>
                        </Tooltip>
                    </IconButton>
                        )}
                </div>
            {!loading && destinations.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Geolocation</TableCell>
                                <TableCell align="center">Arrival date</TableCell>
                                <TableCell align="center">Departure date</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {destinations.map((dest, index) => (
                                <TableRow key={index + i * 100 + 1}>
                                    <TableCell component="th" scope="row">
                                        {i * 100 + index + 1}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {dest.title}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {dest.geolocation}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {dest.description}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {dest.arrival_date}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {dest.departure_date}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {dest.image}
                                    </TableCell>
                                    {/*<TableCell align="center" component="th" scope="row">*/}
                                    {/*    <FormControl sx={{m: 1, minWidth: 120, maxWidth: 300}}>*/}
                                    {/*        <Select*/}
                                    {/*            multiple*/}
                                    {/*            native*/}
                                    {/*            label="Native"*/}
                                    {/*            inputProps={{*/}
                                    {/*                id: 'select-multiple-native',*/}
                                    {/*            }}*/}
                                    {/*        >*/}
                                    {/*            {dest.listOfDestinations.map((title) => (*/}
                                    {/*                <option key={title} value={title}>*/}
                                    {/*                    {title}*/}
                                    {/*                </option>*/}
                                    {/*            ))}*/}
                                    {/*        </Select>*/}
                                    {/*    </FormControl>*/}
                                    {/*</TableCell>*/}
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr: 3}}
                                        >
                                            <Tooltip title="Add destination to bucket list" arrow>
                                                <ReadMoreIcon color="primary" onClick={() => handleAddToBucketList(dest.id)} />

                                            </Tooltip>
                                        </IconButton>
                                        {role === "ROLE_ADMIN" && (
                                        <div>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/destinations/${dest.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/destinations/${dest.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                        </IconButton>

                                        </div>
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Button variant="contained" color="secondary" onClick={decPage}>
                Prev Page
            </Button>
            <Button variant="contained" color="secondary" onClick={incPage}>
                Next Page
            </Button>
        </Container>
    );
};