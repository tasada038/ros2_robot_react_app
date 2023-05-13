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

const CameraData = ({ros}) => {
  const [imgData, setImgData] = useState('');

  useEffect(() => {
    if (!ros) {
        return;
      }

    var image = new ROSLIB.Topic({
      ros : ros,
      name : '/color/image_raw/compressed',
      messageType : 'sensor_msgs/CompressedImage'
    });
  
    image.subscribe(function(message) {
      console.log('Received image');
      const data = "data:image/png;base64," + message.data;
    //   const imgData = setAttribute('src', data);
      setImgData(data);
    });
  
  }, [ros]);
  
  return (
    <>
        <Card className="mb-4" style={{ width: '48rem' }}>
        <Card.Body>
            <Card.Title>Camera Image</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">subscribe image_raw</Card.Subtitle>
            <Card.Text>
              <img src={imgData} alt="Camera Data" />
            </Card.Text>
        </Card.Body>
        </Card>
    </>
  );
}

export default CameraData