import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
class Weather extends Component {
    render() {
        return (
            <div>
                { 
                    this.props.show && this.props.weatherData.map(item => {
                        return <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>vaild-data</th>
                                    <th>{item.valid_date}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>description</td>
                                    <td>{item.description}</td>
                                </tr>
                                
                                
                            </tbody>
                        </Table>
                    })
                }

            </div>
        )
    }
}

export default Weather
