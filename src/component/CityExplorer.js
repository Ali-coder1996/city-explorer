import React, { Component } from 'react';
import { Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
class CityExplorer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cityName: '',
            lat: '',
            lon: '',
            show: false,
            errorMessage: '',
            showError: false

        }
    }
    nameHandler = (e) => {
        this.setState({
            cityName: e.target.value
        })
    }
    submitHandler = async (e) => {
        e.preventDefault();

        const locationUrl = `https://us1.locationiq.com/v1/search.php?key=pk.e63cb8569a409e130ba72ba6f8ab4d74&q=${this.state.cityName}&format=json`

        try {
            let res = await axios.get(locationUrl)
            let data = res.data[0];
            this.setState({
                cityName: data.display_name,
                lat: data.lat,
                lon: data.lon,
                show: true,
                showError: false

            })
        } catch (error) {
            this.setState({
                show: false,
                errorMessage: 'error: Unable to geocode',
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
                    <Button className='button' as="input" type="submit" value="Explore" />
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
                        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.e63cb8569a409e130ba72ba6f8ab4d74&q&center=${this.state.lat},${this.state.lon}&zoom=10&size=900x450&markers=icon:large-red-cutout`} alt='' />
                    }

                </div>


            </main>
        )
    }
}

export default CityExplorer
