import React from 'react'
import Link from 'next/link';

export default function settings() {
    return (
        <div className="container justify-content-around">
            <div className="row">

                <div class="col-md-4">
                <h1 className="title mt-5 mb-5">MY ACCOUNT</h1>
                    <ul style={{fontSize: '18px'}}>
                    
                        <li><a  href="/profile">Edit Details</a></li>
                       

                    
                         <li><a href="">Preferences</a></li>
                  

                    
                         <li><a href="">Retail Portal</a></li>
                  
                    
                    
                       <li><a href="">Order History</a></li>
                  
            
                     
                    </ul></div>
               
                <div class="col-md-4 offset-md-4 mt-5">
                <img style={{width: '240px', height: 'auto'}} src="https://www.freeiconspng.com/thumbs/settings-icon/settings-icon-6.png" />
                </div>
            </div>

        </div>
    )
}
