import {
    Button,
    CircularProgress,
    Container,
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

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/api/destinations/details/' + String(i),{
            headers:{'Authorization': 'Bearer ' + token}
        })
            .then((response) => response.json())
            .then((data) => {
                setDestinations(data);
                setLoading(false);
            });
    }, [i]);

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

    const handleSort = (e) => {
        const sortedData = [...destinations].sort((a, b) => {
            return a.name > b.name ? 1 : -1
        })
        setDestinations(sortedData)
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

    return (
        <Container>
            <h1>All Destinations</h1>

            {loading && <CircularProgress/>}
            {!loading && destinations.length === 0 && <p>No destinations found</p>}
            {!loading && (
                <div>
                    <IconButton component={Link} sx={{mr: 3}} to={`/destination/add`}>
                        <Tooltip title="Add a new destination" arrow>
                            <AddIcon color="primary"/>
                        </Tooltip>
                    </IconButton>
                </div>
            )}
            {!loading && destinations.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Geolocation</TableCell>
                                <TableCell align="center">Stay dates</TableCell>
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
                                        <Link to={`/destinations/${dest.id}/details`} title="View destination details">
                                            {dest.title}
                                            {dest.geolocation}
                                            {dest.description}
                                            {dest.stay_dates}
                                            {dest.image}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <FormControl sx={{m: 1, minWidth: 120, maxWidth: 300}}>
                                            <Select
                                                multiple
                                                native
                                                label="Native"
                                                inputProps={{
                                                    id: 'select-multiple-native',
                                                }}
                                            >
                                                {dest.listOfDestinations.map((title) => (
                                                    <option key={title} value={title}>
                                                        {title}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr: 3}}
                                            to={`/destinations/${dest.id}/details`}>
                                            <Tooltip title="View destinations details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/destinations/${dest.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/destinations/${dest.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                        </IconButton>
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