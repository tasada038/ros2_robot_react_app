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

import './App.css';
import React, { useState } from 'react';
import CameraData from './components/CameraData';
import CmdData from './components/CmdData';
import ImuData from './components/ImuData';
import MapandOdom from './components/MapandOdom';
import Rosconnection from './components/RosConnection';
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';



function App() {
  const [ros, setRos] = useState(null);
  return (
    <>
      <Header />
      {/* <Rosconnection rosUrl="ws://localhost:9090" rosDomainId="89"> */}
      <Rosconnection rosUrl="ws://192.168.11.3:9090" rosDomainId="89" setRos={setRos} />
      {ros &&
        <>
        <Row>
          <Col>
            <div className="d-flex justify-content-center align-items-center">
              <CmdData ros={ros} />
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-center align-items-center">
              <ImuData ros={ros} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="d-flex justify-content-center align-items-center">
              <MapandOdom ros={ros} />
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-center align-items-center">
              <CameraData ros={ros} />
            </div>
          </Col>
        </Row>
        </>
      }

      <hr/>
      <h3>Connection: <span id="status">N/A</span></h3>

      <Footer />

    </>
  );
}

export default App;
