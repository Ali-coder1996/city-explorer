import React, { Component } from 'react';
import { Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import Weather from './Weather';
import Movies from './Movies';
// import Yelp from './Yelp';
class CityExplorer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cityName: '',
            lat: '',
            lon: '',
            showLocation: false,
            showWearther: false,
            errorMessageL: '',
            errorMessageW: '',
            showErrorL: false,
            showErrorW: false,
            vaildData: '',
            description: '',
            city: '',
            weatherData: [],
            moviesData:[],
            // yelpData:[]
        }
    }
    nameHandler = (e) => {
        this.setState({
            cityName: e.target.value,
            showLocation: false,
            showWearther: false,
            showErrorL: false,
            showErrorW: false,
        })
    }

    submitHandler = async (e) => {
        e.preventDefault();

        const locationUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_URL}&q=${this.state.cityName}&format=json`
        await axios.get(locationUrl).then(res => {
            console.log(res.data[0])
            this.setState({
                lat: res.data[0].lat,
                lon: res.data[0].lon,
                showLocation: true,
                showErrorL: false,
            })
        }).catch(error => {
            this.setState({
                showLocation: false,
                errorMessageL: error.message,
                showErrorL: true,
            })
        })
        const weatherUrl = `https://heroku-api-weather.herokuapp.com/weather?city=${this.state.cityName}`
        await axios.get(weatherUrl).then(res => {
            this.setState({
                showError: false,
                weatherData: res.data,
                showWearther: true,
            })
        }).catch(error => {
            this.setState({
                showWearther: false,
                errorMessageW: error.message,
                showErrorW: true,
            })
        })
        const moviesYrl = `https://heroku-api-weather.herokuapp.com/movies?query=${this.state.cityName}`
        await axios.get(moviesYrl).then(res => {
            this.setState({
                moviesData: res.data,
            })
        })
        // const yelpUrl = `http://localhost:8000/yelp`
        // await axios.get(yelpUrl).then(res => {
        //     this.setState({
        //         yelpData: res.data,
        //     })
        // })
    }

    render() {
        return (
            <main>
                <div className='error'>
                    {this.state.showErrorL &&
                        <Alert variant='danger'>
                            {this.state.errorMessageL}
                        </Alert>
                    }
                </div>
                <Form onSubmit={(e) => this.submitHandler(e)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control onChange={(e) => this.nameHandler(e)} type="text" placeholder="city name" />
                    </Form.Group>
                    <Button className='button' variant="outline-dark" as="input" type="submit" value="Explore" />
                </Form>
                <div>
                    {
                        this.state.showLocation &&
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>city description</th>
                                    <th>lat</th>
                                    <th>lon</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>city</td>
                                    <td>{this.state.cityName}</td>
                                    <td>{this.state.lat}</td>
                                    <td>{this.state.lon}</td>
                                </tr>
                            </tbody>
                        </Table>
                    }
                </div>

                <div>
                    
                    {
                        this.state.showLocation &&
                        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.e63cb8569a409e130ba72ba6f8ab4d74&q&center=${this.state.lat},${this.state.lon}&zoom=10&size=900x450&markers=icon:large-red-cutout|${this.state.lat},${this.state.lon}|${this.state.lat},${this.state.lon}`} alt='' />
                    }
                </div>
                <div className='error'>
                        {this.state.showErrorW &&
                            <Alert variant='danger'>`
                                {this.state.errorMessageW}`
                            </Alert>
                        }
                    </div>
                <Weather show={this.state.showWearther} city={this.state.city} weatherData={this.state.weatherData} />
                <Movies moviesData={this.state.moviesData} showLocation={this.state.showLocation}/>
                {/* <Yelp yelpData={this.state.yelpData} show={this.state.showWearther}/> */}
            </main>
        )
    }
}

export default CityExplorer
