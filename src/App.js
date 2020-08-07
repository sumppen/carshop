import React from 'react';
import './App.css';
import ListCars from './components/ListCars';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  return (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Carshop
                </Typography>
            </Toolbar>
        </AppBar>
      <ListCars/>
    </div>
  );
}

export default App;
