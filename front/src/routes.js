import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/Main';
import Enfermeiro from './pages/Enfermeiro';
import Hospital from './pages/Hospital';


export default function Routes() {
return(
    <BrowserRouter>
        <Switch>
        <Route path= "/" exact component = {Main}/>
        <Route path= "/enfermeiro/:hospitalId/:id?" component = {Enfermeiro}/>
        <Route path= "/hospital/:id?" component = {Hospital}/>
        </Switch>
    </BrowserRouter>

);

}
