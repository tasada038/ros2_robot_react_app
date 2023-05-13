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

import {useEffect, useRef } from "react";
import ROSLIB from 'roslib';
import Card from 'react-bootstrap/Card';

const MapandOdom = ({ros}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!ros) {
        return;
      }

    var mapClient = new ROSLIB.Topic({
        ros: ros,
        name: '/map',
        messageType: 'nav_msgs/OccupancyGrid'
    });

    var odomClient = new ROSLIB.Topic({
        ros: ros,
        name: '/odom',
        messageType: 'nav_msgs/Odometry'
    });

    var mapWidth;
    var mapHeight;
    var mapResolution;
    var mapData;

    mapClient.subscribe(function(map) {
        mapWidth = map.info.width;
        mapHeight = map.info.height;
        mapResolution = map.info.resolution;
        mapData = map.data;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = mapWidth;
        canvas.height = mapHeight;

        for (var i = 0; i < mapWidth * mapHeight; i++) {
            var occupancy = mapData[i];
            var row = Math.floor(i / mapWidth);
            var col = i % mapWidth;

            if (occupancy === 100) {
                context.fillStyle = '#000000';
            } else if (occupancy === 0) {
                context.fillStyle = '#ffffff';
            } else {
                var gray = 255 - Math.round(occupancy * 2.55);
                var color = 'rgb(' + gray + ',' + gray + ',' + gray + ')';
                context.fillStyle = color;
            }

            context.fillRect(col, mapHeight - row - 1, 1, 1);
        }
    });

    var position;
    var orientation;
    
    odomClient.subscribe(function(odom) {
        position = odom.pose.pose.position;
        orientation = odom.pose.pose.orientation;
        console.log('Position: ' + position.x + ',' + position.y + ',' + position.z);
        console.log('Orientation: ' + orientation.x + ',' + orientation.y + ',' + orientation.z + ',' + orientation.w);

        var canvas = document.getElementById('map-canvas');
        var context = canvas.getContext('2d');

        var mapOriginX = canvas.width / 2 + position.x / mapResolution;
        var mapOriginY = canvas.height / 2 - position.y / mapResolution;

        context.beginPath();
        context.fillStyle = '#FF0000';
        context.arc(mapOriginX, mapOriginY, 5, 0, 2 * Math.PI);
        context.fill();
    });;
  
  });
  
  return (
    <>
      <Card className="mb-4" style={{ width: '48rem' }}>
        <Card.Body>
            <Card.Title>Map & Odom</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">subscribe /map /odom</Card.Subtitle>
            <Card.Text>
            <canvas id="map-canvas" ref={canvasRef}></canvas>
            </Card.Text>
        </Card.Body>
      </Card>
      
    </>
  );
}

export default MapandOdom