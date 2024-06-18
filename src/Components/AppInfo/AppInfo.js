import React from "react";
import './AppInfo.css';
import Header from "../Header/Header";
import {useLocation,useNavigate } from 'react-router-dom'

function AppInfo(){
    const location = useLocation();
    return(
        <div>
        <Header data={location.state?.name || 'Default User'} />
        <div class="body" >
            <div class="card-body">
                <h3 class="card-title">APP INFO</h3>
                <p class="card-text"><span>Time :</span>  12:12 AM</p>
                <p class="card-text"><span>Supported platform:</span> DELL</p>
                <p class="card-text"><span>Testcase count :</span> 4</p>
            </div>
        </div>
        </div>
    )
}
export default AppInfo;