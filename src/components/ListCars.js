import React, {useState, useEffect} from "react";
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Addcar from "./Addcar";
import Editcar from "./Editcar";

export default function ListCars() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function fetchData() {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(responseData => {
                setCars(responseData._embedded.cars)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchData();
    }, [])

    function handleDelete(res) {
        if(res.ok) {
            setMessage('The car was successfully deleted');
            setSeverity('success');
        } else {
            setMessage('Failed to delete the car: '+res.message);
            setSeverity('error');
        }
        setOpen(true);
        return res;
    }

    function handleAdd(res) {
        if(res.ok) {
            setMessage('The car was successfully added');
            setSeverity('success');
        } else {
            setMessage('Failed to add the car: '+res.message);
            setSeverity('error');
        }
        setOpen(true);
        return res;
    }

    function handleEdit(res) {
        if(res.ok) {
            setMessage('The car was successfully modified');
            setSeverity('success');
        } else {
            setMessage('Failed to modify the car: '+res.message);
            setSeverity('error');
        }
        setOpen(true);
        return res;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function deleteCar(url) {
        if(window.confirm('Are you sure?')) {
            fetch(url, {method: 'DELETE'})
                .then(handleDelete)
                .then(fetchData)
                .catch(err => console.error(err));
        }
    }

    function saveCar(car) {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(handleAdd)
            .then(fetchData)
            .catch(err => console.log(err))
    }

    function editCar(car, url) {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(handleEdit)
            .then(fetchData)
            .catch(err => console.error(err))
    }

    const columns= [{
        Header:'Brand',
        accessor: 'brand'
    }, {
        Header:'Model',
        accessor: 'model',
    }, {
        Header: 'Color',
        accessor: 'color'
    }, {
        Header: 'Fuel',
        accessor: 'fuel',
    }, {
        Header: 'Year',
        accessor: 'year',
    }, {
        Header: 'Price',
        accessor: 'price'
    }, {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: row => (
            <Button color={"secondary"} size={"small"} onClick={() => deleteCar(row.value)}>Delete</Button>
        )
    }, {
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: row => (
            <Editcar car={row.original} editCar={editCar} url={row.value}/>
        )
    }
    ];

    return (
        <div>
            <Addcar saveCar={saveCar}/>
            <ReactTable data={cars}
                        columns={columns}
                        sortable='true'
                        filterable={true}
                        defaultPageSize='10'/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
