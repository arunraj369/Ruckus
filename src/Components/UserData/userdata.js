import React, { useEffect, useState } from "react";
import axios from 'axios';

function UserData(){
    //get username and post the usedata collection
    const [topologyName,setToplogy]=useState('');
    const [appname,setAppName]=useState('');
    const [diagram,setDiagram]=useState('');
    const [users,setUsers]=useState([]);
    const [usersdata,setUsersData]=useState([]); 
    const username='Maha';
    const check='false';
    const handleSubmit=()=>{
        axios.post('http://localhost:3001/createUserData',{topologyName,appname,diagram,username,check})
        .then((users)=>{
          console.log(users.data,'user data');
          setUsersData(users.data)
        })
        .catch((err)=>{console.log(err);})
    }


    useEffect(()=>{
      axios.get('http://localhost:3001/usersdata')
      .then((users)=>{
        setUsers(users.data)
      })
      .catch((err)=>{console.log(err);})
    },[])

    return(
        <div style={{textAlign:'center',padding:10}}>
            <h1>User Data :</h1>
            <input style={{padding:10,margin:10}} placeholder="Enter Topology name" type='text' onChange={(e)=>{setToplogy(e.target.value)}}/>
            <br />
            <input style={{padding:10,margin:10}} placeholder="Enter Appname" type='text' onChange={(e)=>{setAppName(e.target.value)}}/>
            <br />
            <input style={{padding:10,margin:10}} placeholder="Enter Diagram name" type='text' onChange={(e)=>{setDiagram(e.target.value)}}/>
            <br />
            <button onClick={handleSubmit}>Create UserData</button>

            <div>
              {users.map((user)=>{
                return(
                  <div>
                    <h4>{user.topologyName}</h4>
                    <h4>{user.appname}</h4>
                    <h4>{user.diagram}</h4>
                  </div>
                )
              })}
            </div>
        </div>
    )
}

export default UserData;
