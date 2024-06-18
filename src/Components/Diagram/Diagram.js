import React, { useEffect, useState } from "react";
import { Col, Row,Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import Header from "../Header/Header";
import topologyimage from "../assets/Topology_image.png";
import {useLocation,useNavigate } from 'react-router-dom'

function Diagram(){
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state.digaram_id);
  const [showImage,setShowImage]=useState('')
  const handleInfo=()=>{
    // console.log('Handle info');
    navigate('/AppInfo',{state:{name:location.state?.name}});
  }
 

  function getImage(){
    console.log('get the Image ');
    fetch(`http://localhost:3001/get-image/${location.state.digaram_id}`,{
      method:"GET",
      crossDomain:true,
    }).then((res)=>res.json()).then((data)=>{
      // console.log('Data :',data);
      setShowImage(data.data[0]);
      // console.log('Show image :',showImage);
    })
  }

  useEffect(()=>{
      getImage();
  },[])
    return(
      <div>
        <Header data={location.state?.name || 'Default User'} />
        <Container>       
          <Row className='px-4 my-5'>
            <Col sm={7}>
              <Image style={{marginLeft:"10px"}} src={showImage.diagram} fluid rounded/>
            </Col>
            <Col sm={5}>
              <h1 class='font-weight-light'>Topology</h1>
              <p class="mt-4">
                This is a template that is great for small businesses. It 
                doesn't have too much fancy flare to it, but it makes a great 
                use of the standard Bootstrap core components. Feel free to use this 
                template for any project you want!
              </p>
              {/* <Button variant='success' as={Link} to={"/AppInfo",{name:location.state?.name}}>APP INFO</Button> */}
              <Button variant="success" onClick={handleInfo}>APP INFO</Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default Diagram;