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
            show: false,
            errorMessage: '',
            showError: false,
            vaildData:'',
            description:'',
            weatherData:[],
        }
    }
    nameHandler = (e) => {
        this.setState({
            cityName: e.target.value,
            show:false
        })
    }

    submitHandler = async (e) => {
        e.preventDefault();
        try {
            const locationUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_URL}&q=${this.state.cityName}&format=json`
            const weatherUrl=`http://localhost:3005/weather?lat=31.95&lon=35.91&cityName=amman`
            let wea=await axios.get(weatherUrl)
            let res =await axios.get(locationUrl)
                this.setState({
                    cityName: res.data[0].display_name,
                    lat: res.data[0].lat,
                    lon: res.data[0].lon,
                    show: true,
                    showError: false,
                    weatherData:wea.data
                })
        } catch (error) {
            this.setState({
                show: false,
                errorMessage: error.message,
                showError: true
            })
        }           
    }

    render() {
        return (
            <main>
                <div className='error'>
                    {this.state.showError &&
                        <Alert variant='danger'>
                            {this.state.errorMessage}
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

                        this.state.show &&
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
                        this.state.show &&
                        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.e63cb8569a409e130ba72ba6f8ab4d74&q&center=${this.state.lat},${this.state.lon}&zoom=10&size=900x450&markers=icon:large-red-cutout|${this.state.lat},${this.state.lon}|${this.state.lat},${this.state.lon}`} alt='' />
                    }
                </div>
                <Weather show={this.state.show} weatherData={this.state.weatherData}/>

            </main>
        )
    }
}

export default CityExplorer
