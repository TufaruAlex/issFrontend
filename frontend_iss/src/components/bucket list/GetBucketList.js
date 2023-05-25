import {
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip,
    CircularProgress,
    TableHead,
    Button,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

let i = 0;
const token = Cookies.get("zurli");
export default function GetBucketList() {
    const [loading, setLoading] = useState(false);
    const [bucketList, setBucketList] = useState([]);
    const {userId} = useParams();

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8080/api/${userId}/bucket-list/` + String(i), {
            headers: {'Authorization': "Bearer " + token},
        }).then((response) =>
            response.json().then((data) => {
                setBucketList(data);
                setLoading(false);
            })
        );
    }, [i]);

    const reloadData = () => {
        setLoading(true);
        fetch(`http://localhost:8080/api/${userId}/bucket-list/` + String(i), {
            headers: {Authorization: "Bearer " + token},
        }).then((response) =>
            response.json().then((data) => {
                setBucketList(data);
                setLoading(false);
            })
        );
    };

    const incPage = (e) => {
        i = i + 1;
        reloadData();
    };

    const decPage = (e) => {
        if (i >= 1) i = i - 1;
        reloadData();
    };

    return (
        <Container>
            {loading && <CircularProgress/>}
            {!loading && bucketList.length === 0 && <p>The bucket list is empty</p>}
            {!loading && (
                <div>
                    <Link className="btn btn-outline-dark" to="/destinations">
                        Add public destination
                    </Link>
                    <Link className="btn btn-outline-dark" to={"/" + String(userId) + "/bucket-list/add-private"}>
                        Create a private destination
                    </Link>
                </div>
            )}
            {!loading && bucketList.length > 0 && (
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

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bucketList.map((item, index) => (
                                <TableRow key={index + i * 100 + 1}>
                                    <TableCell component="th" scope="row">
                                        {i * 100 + index + 1}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <Link
                                            to={`/destinations/${item.destination.id}/details`}
                                            title="View destination details"
                                        >
                                            {item.destination.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {item.destination.geolocation}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {item.destination.description}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {item.destination.arrival_date}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {item.destination.departure_date}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton component={Link} sx={{mr: 3}}
                                                    to={`/${userId}/bucket-list/delete/${item.destination.id}`}>
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
}
