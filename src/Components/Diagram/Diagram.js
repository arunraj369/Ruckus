import React from "react";
import { Col, Row,Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import Header from "../Header/Header";

function Diagram(){
    return(
      <div>
        <Header />
        <Container>       
          <Row className='px-4 my-5'>
            <Col sm={7}>
              <Image style={{marginLeft:"150px"}} src="data:image/png;base64,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" fluid rounded/>
            </Col>
            <Col sm={5}>
              <h1 class='font-weight-light'>Topology</h1>
              <p class="mt-4">
                This is a template that is great for small businesses. It 
                doesn't have too much fancy flare to it, but it makes a great 
                use of the standard Bootstrap core components. Feel free to use this 
                template for any project you want!
              </p>
              <Button variant='success' as={Link} to={"/AppInfo"}>APP INFO</Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default Diagram;