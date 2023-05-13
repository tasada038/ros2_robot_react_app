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

import { Button, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const CmdData = ({ ros }) => {
    const [cmdVelPublisher, setCmdVelPublisher] = useState(null);

    useEffect(() => {
        if (!ros) {
            return;
        }
        const cmdVel = new ROSLIB.Topic({
            ros: ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist',
        });
        
        setCmdVelPublisher(cmdVel);
        
        return () => {
            cmdVel.unadvertise();
            setCmdVelPublisher(null);
        };
    }, [ros]);
  
    const sendCommand = (linearVelocityX, angularVelocityZ) => {
        const cmdVel = new ROSLIB.Message({
            linear: {
                x: linearVelocityX,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: angularVelocityZ,
            },
        });
            
        cmdVelPublisher.publish(cmdVel);
    };
  

    const [sliderValue, setSliderValue] = useState(0);

  
    const handleSliderChange = (event) => {
      setSliderValue(event.target.value);
    };
  
    const handleButtonClick = (linearVelocity, angularVelocity) => {
      sendCommand(linearVelocity * sliderValue, angularVelocity);
    };


    return (
    <>
    
    <Card className="mb-4" style={{ width: '48rem' }}>
        <Card.Body>
            <Card.Title>Robot Controller</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">publish cmd_vel</Card.Subtitle>
            <Card.Text>
                <Form.Group className="mb-2" controlId="slider">
                    <Form.Label>Speed</Form.Label>
                    <Form.Control type="range" min="0" max="1" step="0.01" value={sliderValue} onChange={handleSliderChange} />
                </Form.Group>

                <Button variant="outline-secondary" onClick={() => handleButtonClick(1, 0)}>
                    Forward
                </Button>
                <Button variant="outline-secondary" onClick={() => handleButtonClick(-1, 0)}>
                    Backward
                </Button>
                <Button variant="outline-secondary" onClick={() => handleButtonClick(0, 1)}>
                    Left
                </Button>
                <Button variant="outline-secondary" onClick={() => handleButtonClick(0, -1)}>
                    Right
                </Button>
                <Button variant="outline-secondary" onClick={() => sendCommand(0, 0)}>
                Stop
                </Button>
            </Card.Text>
        </Card.Body>
        </Card>
    </>
    );
};

export default CmdData