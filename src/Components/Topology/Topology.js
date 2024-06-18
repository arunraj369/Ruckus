import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Topology.css';
import {useLocation,useNavigate } from 'react-router-dom'
import Header from '../Header/Header';
import axios from 'axios';
import diagram_icon from "../assets/diagram_icon.png";
import appinfo from "../assets/appInfo.png";
import deletes from "../assets/delete.png";
import pen from "../assets/pen.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Topology(){
    const location = useLocation();
    // const username=location.state.name;
    const username = location.state ? location.state.name : ''; 
    const [topologyName,setToplogy]=useState('');
    const [appname,setAppName]=useState('');
    const [diagram,setDiagram]=useState('');
    const [usersdata,setUsersData]=useState([]); 
    const [enableDelete,setEnableDelete]=useState(false)
    const [deleteAll,setDeleteAll]=useState(false);
    const [show, setShow] = useState(false);
    const [showUpdate,setShowUpdate]=useState(false);
    const [updateId,setUpdateId]=useState('');

    const [updateTopology,setUpdateTopology]=useState('');
    const [updateAppName,setUpdateAppName]=useState('');
    const [updateDiagram,setUpdateDiagram]=useState('');

    const [image,setImage]=useState('');
    useEffect(() => {
        if (username) { 
        axios.get(`http://localhost:3001/usersdata/${username}`)
            .then((response) => {
                console.log(response.data,'response');
                setUsersData(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [username]);

    const handleSubmit=()=>{
        axios.post('http://localhost:3001/createUserData',{topologyName,appname,diagram,username})
        .then((response)=>{
            setUsersData([...usersdata, response.data]);
        })
        .catch((err)=>{console.log(err);})
    }

    // const handleUpdate=()=>{
    //    console.log('update',updateId);
    //    axios.post(`http://localhost:3001/createUserData/${updateId}`,{topologyName,appname,diagram,username})
    //     .then((response)=>{
    //         setUsersData([...usersdata, response.data]);
    //     })
    //     .catch((err)=>{console.log(err);})
    // }
    const handleUpdate = () => {
        console.log('update', updateId);
        axios.put(`http://localhost:3001/updateUser/${updateId}`, { topologyName, appname, diagram:image, username })
            .then((response) => {
                toast.success("Updated successfully");
                // Assuming you want to update the existing user data in the state
                setUsersData(usersdata.map(user => user._id === updateId ? response.data : user));            
                setShowUpdate(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    const navigate = useNavigate();
    const routeChange = () =>{ 
        navigate('/Add',{state:{names:username}});
        console.log('route change');
    }
    const handleDelete=()=>{
        console.log('delete');
        setEnableDelete(true)
        setDeleteAll(true)
    }

    const handleDeleteAll=()=>{
        console.log('deletall');
        setEnableDelete(false)
        setShow(true);
        setDeleteAll(false)
      
    }
    const handleCheckboxChange=(event,index)=>{
        console.log('index :',index);
        const updatedUsersData = [...usersdata];
        console.log(updatedUsersData,'updated Userdata');
        updatedUsersData[index].check = event.target.checked;
        console.log('updated : ',updatedUsersData);
        setUsersData(updatedUsersData);
    }

    const handleedit=(value)=>{
        console.log('edit',value);
        setUpdateId(value)
        setShowUpdate(true)
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/updateUser/${updateId}`)
        .then((response) => {
            console.log(response.data[0].topologyName,'update user');
            setUpdateTopology(response.data[0].topologyName)
            setUpdateAppName(response.data[0].appname)
            setUpdateDiagram(response.data[0].diagram)
        })
        .catch((err) => {
            console.log(err);
        });
    },[updateId])

    const handleClose = () => setShow(false);
    const handleClose1=()=>setShowUpdate(false);

    function converToBase64(e){
        console.log('Log in topology:',e);
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

    const handleDeleted=()=>{
        console.log('handle Deleted ..');
          console.log('delete all ',usersdata);
        const checkedItems = usersdata.filter(user => user.check);
        checkedItems.forEach(user => {
            axios.delete(`http://localhost:3001/deleteUser/${user._id}`)
                .then(() => {
                    setUsersData(usersdata.filter(u => u._id !== user._id));
                    toast.success("Data Deleted successfully");
                    console.log('Data deleted successfully ');
                    setShow(false);

                })
                .catch((err) => {
                    console.log('Error :',err);
                });
        });
    }
    const modalContentStyle = {
        width: '400px',
        margin: 'auto', // To center the modal horizontally
        textAlign: 'center', // To center the text inside the modal
      };

      const containerStyle = {
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        padding: '5px', 
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
            <Header data={location.state?.name || 'Default User'} />
            <ToastContainer />
            <Modal show={show} onHide={handleClose} centered >
                <div style={modalContentStyle}>
                <Modal.Header closeButton style={{borderBottom:'none'}}>
                    <Modal.Title style={{ color: 'red' }}>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center' }}>
                    <h6>You will not be able to recover this data</h6>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>
                    Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleted}>
                    Delete
                    </Button>
                </Modal.Footer>
                </div>
            </Modal>
            <Modal show={showUpdate} onHide={handleClose1} style={{marginTop:100,textAlign:'center',paddingBottom:'100px'}}>
                <Modal.Header  style={{color:'black',textAlign:'center'}} closeButton>
                <Modal.Title>UPDATE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div style={{textAlign:'center',}}>
                    <div style={containerStyle}>
                        <h4 style={headerStyle}>Enter topology name</h4>
                        <input style={inputStyle}  defaultValue={updateTopology} type='text'  onChange={(e)=>{setToplogy(e.target.value)}}/>
                    </div>
                    <div style={containerStyle}>
                        <h4 style={headerStyle}>Enter app name</h4>
                         <input style={inputStyle}  defaultValue={updateAppName} type='text' onChange={(e)=>{setAppName(e.target.value)}}/>
                    </div>

                    {/* <input style={{padding:10,margin:10}} placeholder='Enter topology diagram' type='text' onChange={(e)=>{setDiagram(e.target.value)}}/> */}
                    <div style={containerStyle}>
                        <h4 style={headerStyle}>Upload your image</h4> 
                        <input  style={{ ...inputStyle, backgroundColor:'white',border: '1px solid black', }} accept='image/*' type='file' onChange={converToBase64}/>
                        {image =="" || image ==null? 
                        "":
                        <img width={100} height={100} src={image}/>}
                    </div>
                    <Button variant="success" onClick={handleUpdate}>Update</Button>
                </div>
                </Modal.Body>
            </Modal>
            <div className="d-flex justify-content-end mt-3 mr-3">
                <Button variant='success' onClick={routeChange} style={{marginRight:20}}>ADD</Button>
                {usersdata?.length >0 &&             
                    ( deleteAll === true ?
                        <Button variant="danger" onClick={handleDeleteAll} style={{marginRight:20}}>DELETE ALL</Button>:
                        <Button variant='danger' onClick={handleDelete} style={{marginRight:20}}>DELETE</Button>
                    )
                }
            </div>
            <div class="container">   
                <div class="row">
                {usersdata?.length >0 ?(
                    usersdata?.map((user,index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card card-1">
                                {/* Checkbox */}    
                                {enableDelete === true ?             
                                <input                      
                                    type="checkbox"
                                    checked={user.check}
                                    // onChange={() => setIsChecked(!isChecked)}
                                    onChange={(event) => handleCheckboxChange(event, index)}
                                    style={{ position: 'absolute', top: '15px', right: '10px' }}
                                />:
                                <img
                                src={pen}
                                alt="Edit"
                                style={{ position: 'absolute', top: '15px', right: '10px',width: "35px", height: "35px" ,backgroundColor:'#eff5fb',borderRadius:20,padding:2}}
                                onClick={()=>(handleedit(user._id))} />}
                                {/* Card Content */}
                                <h3>{user.topologyName}</h3>
                                <p>A curated set of ES5/ES6/TypeScript wrappers for plugins to easily add any native functionality to your Ionic apps.</p>
                                <div style={{ display: 'flex', justifyContent:'space-around', alignItems: 'center',marginBottom:'20px',width:'90px' }}>
                                    <img
                                        src={diagram_icon}
                                        alt="User Icon 1"
                                        style={{ width: "35px", height: "35px", backgroundColor:'#eff5fb',borderRadius:20,padding:5}}
                                        onClick={()=>{ 
                                        navigate('/Diagram',{state:{name:username,digaram_id:user._id}});
                                        }}
                                    />
                                    <img
                                        src={appinfo}
                                        alt="User Icon 2"
                                        style={{ width: "35px", height: "35px" ,backgroundColor:'#eff5fb',borderRadius:20,padding:2}}
                                        onClick={()=>{ 
                                            navigate('/AppInfo',{state:{name:username}});
                                            // navigate('/Topology',{state:{name:usernames}});
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                    ):
                    <div style={{display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        height: '50vh'}}>
                        <h1>No Topology found</h1>
                    </div>
                }  
                </div>
            </div>
            {/* <div>
                <div style={{textAlign:'center',padding:10}}>
                    <h1>User Data :</h1>
                    <input style={{padding:10,margin:10}} placeholder="Enter Topology name" type='text' onChange={(e)=>{setToplogy(e.target.value)}}/>
                    <br />
                    <input style={{padding:10,margin:10}} placeholder="Enter Appname" type='text' onChange={(e)=>{setAppName(e.target.value)}}/>
                    <br />
                    <input style={{padding:10,margin:10}} placeholder="Enter Diagram name" type='text' onChange={(e)=>{setDiagram(e.target.value)}}/>
                    <br />
                    <button onClick={handleSubmit}>Create UserData</button>
                </div>
            </div> */}
        </div>
    )
}

export default Topology;