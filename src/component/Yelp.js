import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

class Yelp extends Component {
    render() {
        return (
            <section>
                { 
                    this.props.show && this.props.yelpData.map(item => {
                        return (<Card className='shadow' style={{ padding: '0px', width: '100%' }}>
                        <Card.Header>
                          {item.price}
                        </Card.Header>
                        <Card.Img src={item.image_url} alt={item.title} style={{ margin: '0px', width: '100%', height: '100%' }}/>
                        <Card.Body style={{ padding: '4px', margin: '4px' }}>
                          <Card.Text style={{ margin: '0px', padding: '4px' }}>
                            <strong style={{ fontSize: '35px', float: 'right' }}>
                              {item.average_votes}
                              <sup>{item.total_votes}</sup>
                            </strong>
                          </Card.Text>
                        </Card.Body>
                      </Card>)
                    })
                }
            </section>
        )
    }
}

export default Yelp
