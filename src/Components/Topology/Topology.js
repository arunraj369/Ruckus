import React from "react";
import { Button } from 'react-bootstrap';
import './Topology.css';
import { Link } from 'react-router-dom'
import Header from '../Header/Header';

function Topology(){
    return(
        
        <div class="container">
        <Header />
        <div class="row">
            <div class="col-md-4">
            <div class="card card-1">
                <h3>Topology 1</h3>
                <p>A curated set of   ES5/ES6/TypeScript wrappers for plugins to easily add any native functionality to your Ionic apps.</p>
                <Button  variant='outline-primary' as={Link} to={"/Diagram"}>View More</Button>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card card-2">
                <h3>Topology 2</h3>
                <p>Tabs, buttons, inputs, lists, cards, and more! A comprehensive library
                of mobile UI components, ready to go.</p>
                <Button  variant='outline-primary' as={Link} to={"/Diagram"}>View More</Button>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card card-3">
                <h3>Topology 3</h3>
                <p>Learn how to easily customize and modify your app’s design to fit your
                brand across all mobile platform styles.</p>
                <Button  variant='outline-primary' as={Link} to={"/Diagram"}>View More</Button>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card card-1">
                <h3>Topology 4</h3>
                <p>Learn how to easily customize and modify your app’s design to fit your
                brand across all mobile platform styles.</p>
                <Button  variant='outline-primary' as={Link} to={"/Diagram"}>View More</Button>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card card-2">
                <h3>Topology 5</h3>
                <p>Learn how to easily customize and modify your app’s design to fit your
                brand across all mobile platform styles.</p>
                <Button  variant='outline-primary' as={Link} to={"/Diagram"}>View More</Button>
            </div>
            </div>
            <div class="col-md-4">
            <div class="card card-3">
                <h3>Topology 6</h3>
                <p>Learn how to easily customize and modify your app’s design to fit your
                brand across all mobile platform styles.</p>
                <Button variant='outline-primary' as={Link} to={"/Diagram"}>View More</Button>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Topology;