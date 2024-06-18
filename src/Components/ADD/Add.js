import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link,useLocation ,useNavigate} from 'react-router-dom'
import Header from '../Header/Header';
import axios from 'axios';

 
function Add(){       //props
    const location = useLocation();
    const usernames=location.state.names;
    const navigate = useNavigate();
    const [topologyName,setToplogy]=useState('');
    const [appname,setAppName]=useState('');
    const [diagram,setDiagram]=useState('');
    const [username,setUserName]=useState(usernames)
    const [check,setCheck]=useState(false)
    const [usersdata,setUsersData]=useState([]);
    const [image,setImage]=useState('');
    
    const handleSubmit=()=>{
        axios.post('http://localhost:3001/createdata',{topologyName,appname,image,username})
        .then((response)=>{
            setUsersData([...usersdata, response.data]);
            navigate('/Topology',{state:{name:usernames}});
            console.log('Successfully navigate');
        })
        .catch((err)=>{console.log(err);})
    }


    function converToBase64(e){
        console.log('Log :',e);
        var reader=new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
          console.log(reader.result);
          setImage(reader.result)
        }
        reader.onerror=error =>{
          console.log("Error :",error);
        }
      }


const containerStyle = {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    padding: '10px', 
    //backgroundColor: 'white', 
  };

  const inputStyle = {
    padding: '10px', 
    margin: '10px 0', 
    width: '70%', 
    boxSizing: 'border-box', 
  };

  const headerStyle = {
    // backgroundColor:'lightgray',
    marginBottom: '1px', // To add margin below the header
    color: 'black', // To set text color
  };
    return(
        <div>
            <Header data={usernames} />
            <div style={{textAlign:'center',margin:'10px'}}>
                <h2>ADD DATA</h2>
                <div style={{margin:'10px 400px 10px 400px',textAlign:'center',padding:10,backgroundColor:'rgba(0, 0, 0, 0.05)',padding:'20px',opacity: 0.8}}>
                    <div style={containerStyle}>
                        <h4 style={headerStyle}>Enter topology name</h4>
                        <input
                            style={inputStyle}
                            placeholder="Enter Topology name"
                            type="text"
                            onChange={(e) => setToplogy(e.target.value)}
                        />
                    </div>
                    <div style={containerStyle}>
                        <h4 style={headerStyle}>Enter app name</h4>         
                        <input style={inputStyle} placeholder="Enter Appname" type='text' onChange={(e)=>{setAppName(e.target.value)}}/>
                    </div>
                    {/* <input style={{padding:10,margin:10}} placeholder="Enter Diagram name" type='text' onChange={(e)=>{setDiagram(e.target.value)}}/>
                    <br /> */}
                    <div style={containerStyle}>
                        <h4 style={headerStyle}>Upload your image</h4>   
                            <input style={{ ...inputStyle, backgroundColor:'white',border: '1px solid black', }} accept='image/*' type='file' onChange={converToBase64}/>
                            {image =="" || image ==null? 
                            "":
                            <img width={100} height={100} src={image}/>}
                    </div>
                    <Button variant="success" onClick={handleSubmit}>Add</Button>
                </div>
            </div>
        </div>
    )
}


export default Add;
