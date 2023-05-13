/*-------------------------------
The MIT License (MIT)

Copyright (c) 2023 Takumi Asada.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
-------------------------------*/ 

import React, { useEffect } from 'react';
import ROSLIB from 'roslib';

const Rosconnection = ({ rosUrl, rosDomainId, setRos}) => {

  useEffect(() => {
    // Create ros object to communicate over your Rosbridge connection
    const ros = new ROSLIB.Ros({
      url: rosUrl,
      options: {
        ros_domain_id: rosDomainId // ROS_DOMAIN_IDを設定する
      }
    });

    // When the Rosbridge server connects, fill the span with id "status" with "successful"
    ros.on("connection", () => {
      setRos(ros);
      document.getElementById("status").innerHTML = "successful";
      console.log('Connected to ROSBridge WebSocket server.');
    });
  
    // When the Rosbridge server experiences an error, fill the "status" span with the returned error
    ros.on('error', function(error) {
      console.log('Error connecting to ROSBridge WebSocket server: ', error);
    });
  
    // When the Rosbridge server shuts down, fill the "status" span with "closed"
    ros.on('close', function() {
      console.log('Connection to ROSBridge WebSocket server closed.');
    });

    return () => {
      ros.close();
    };
  }, [rosUrl, rosDomainId, setRos]);

  return (
    <>

    </>
  );
}
export default Rosconnection;
