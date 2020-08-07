import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '',
        year: 0, price: 0
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        const emptyCar = {
            brand: '', model: '', color: '', fuel: '',
            year: 0, price: 0
        };
        setCar(emptyCar);
    };

    function handleInputChange(e) {
        setCar({ ...car, [e.target.id]: e.target.value})
        console.log(car)
    }

    function saveCar() {
        props.saveCar(car);
        setOpen(false);
        const emptyCar = {
            brand: '', model: '', color: '', fuel: '',
            year: 0, price: 0
        };
        setCar(emptyCar);
    }

    return (
      <div>
          <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
              Add car
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add car</DialogTitle>
              <DialogContent>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="brand"
                      label="Brand"
                      value={car.brand}
                      onChange={e => handleInputChange(e)}
                      type="text"
                  />
                  <TextField
                      margin="dense"
                      id="model"
                      label="Model"
                      value={car.model}
                      onChange={e => handleInputChange(e)}
                      type="text"
                  />
                  <TextField
                      margin="dense"
                      id="color"
                      label="Color"
                      value={car.color}
                      onChange={e => handleInputChange(e)}
                      type="text"
                  />
                  <TextField
                      margin="dense"
                      id="fuel"
                      label="Fuel"
                      value={car.fuel}
                      onChange={e => handleInputChange(e)}
                      type="text"
                  />
                  <TextField
                      margin="dense"
                      id="year"
                      label="Year"
                      value={car.year}
                      onChange={e => handleInputChange(e)}
                      type="number"
                  />
                  <TextField
                      margin="dense"
                      id="price"
                      label="Price"
                      value={car.price}
                      onChange={e => handleInputChange(e)}
                      type="number"
                  />
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={saveCar} color="primary">
                      Save
                  </Button>
              </DialogActions>
          </Dialog>
      </div>
    );
}