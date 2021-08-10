import React, { Component } from 'react';
import { Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import Weather from './Weather';

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
            showError: false,
            vaildData: '',
            description: '',
            city: '',
            weatherData: [],
        }
    }
    nameHandler = (e) => {
        this.setState({
            cityName: e.target.value,
            showLocation: false,
            showWearther: false,
            showError: false,
        })
    }

    submitHandler = async (e) => {
        e.preventDefault();

        const locationUrl = `http://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_URL}&q=${this.state.cityName}&format=json`
        await axios.get(locationUrl).then(res => {
            console.log(res.data[0])
            this.setState({
                cityName: res.data[0].display_name,
                lat: res.data[0].lat,
                lon: res.data[0].lon,
                showLocation: true,
                showError: false,
            })
        }).catch(error => {
            this.setState({
                showLocation: false,
                errorMessageL: error.message,
                showError: true,
            })
        })

        const weatherUrl = `http://localhost:8000/weather?lat=31.95&lon=35.91&cityName=amman`
        await axios.get(weatherUrl).then(res => {
            this.setState({
                weatherData: res.data,
                showWearther: true,
            })
        }).catch(error => {
            this.setState({
                showWearther: false,
                errorMessageW: error.message,
                showError: true,
            })
        })
    }

    render() {
        return (
            <main>
                <div className='error'>
                    {this.state.showError &&
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
                    <div className='error'>
                        {this.state.showError &&
                            <Alert variant='danger'>
                                {this.state.errorMessageW}
                            </Alert>
                        }
                    </div>
                    {
                        this.state.showLocation &&
                        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.e63cb8569a409e130ba72ba6f8ab4d74&q&center=${this.state.lat},${this.state.lon}&zoom=10&size=900x450&markers=icon:large-red-cutout|${this.state.lat},${this.state.lon}|${this.state.lat},${this.state.lon}`} alt='' />
                    }
                </div>
                <Weather show={this.state.showWearther} city={this.state.city} weatherData={this.state.weatherData} />

            </main>
        )
    }
}

export default CityExplorer
