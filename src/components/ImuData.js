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

import React, { useEffect, useState } from 'react';
import ROSLIB from 'roslib';
import Card from 'react-bootstrap/Card';

const ImuData = ({ros}) => {
  const [imuData, setImuData] = useState({});

  useEffect(() => {
    if (!ros) {
        return;
      }
    // When we receive a message on /my_topic, add its data as a list item to the "messages" ul
    var imuTopic = new ROSLIB.Topic({
        ros: ros,
        name: '/bno055/imu/data',
        messageType: 'sensor_msgs/Imu'
    });

      // Calculate Euler
    function getEulerAngles(q) {
        const qw = q.w;
        const qx = q.x;
        const qy = q.y;
        const qz = q.z;
        const sinr = 2.0 * (qw * qx + qy * qz);
        const cosr = 1.0 - 2.0 * (qx * qx + qy * qy);
        const roll = Math.atan2(sinr, cosr);

        const sinp = 2.0 * (qw * qy - qz * qx);
        let pitch;
        if (Math.abs(sinp) >= 1) {
        pitch = Math.PI / 2.0 * Math.sign(sinp);
        } else {
        pitch = Math.asin(sinp);
        }

        const siny = 2.0 * (qw * qz + qx * qy);
        const cosy = 1.0 - 2.0 * (qy * qy + qz * qz);
        const yaw = Math.atan2(siny, cosy);

        return {
        roll: roll,
        pitch: pitch,
        yaw: yaw
        };
    }

    imuTopic.subscribe((message) => {
        const eulerAngles = getEulerAngles(message.orientation);
        // console.log('Received message on ' + listener_imu.name + ': ', eulerAngles);

        const roll = eulerAngles.roll * 180.0 / Math.PI;
        const pitch = eulerAngles.pitch * 180.0 / Math.PI;
        const yaw = eulerAngles.yaw * 180.0 / Math.PI;
        const sec = message.header.stamp.sec;

        setImuData((prevState) => {
          const newData = {
            roll: roll.toFixed(2),
            pitch: pitch.toFixed(2),
            yaw: yaw.toFixed(2),
            sec: sec,
          };
          return { ...prevState, ...newData };
        });
    });
  
  });
  
  return (
    <>
        <Card className="mb-4" style={{ width: '48rem' }}>
        <Card.Body>
            <Card.Title>Imu Data</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">subscribe imu/data</Card.Subtitle>
            <Card.Text>
                <p>Roll: {imuData.roll}</p>
                <p>Pitch: {imuData.pitch}</p>
                <p>Yaw: {imuData.yaw}</p>
                <p>Sec: {imuData.sec}</p>
            </Card.Text>
        </Card.Body>
        </Card>
    </>
  );
}

export default ImuData