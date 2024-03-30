# ros2_robot_react_app

[![GitHub stars](https://img.shields.io/github/stars/tasada038/ros2_robot_react_app.svg?style=social&label=Star&maxAge=2592000)](https://github.com/tasada038/ros2_robot_react_app/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/tasada038/ros2_robot_react_app.svg?style=social&label=Fork&maxAge=2592000)](https://github.com/tasada038/ros2_robot_react_app/network/)
[![GitHub issues](https://img.shields.io/github/issues/tasada038/ros2_robot_react_app.svg)](https://github.com/tasada038/ros2_robot_react_app/issues/)
[![GitHub license](https://img.shields.io/github/license/tasada038/ros2_robot_react_app.svg)](https://github.com/tasada038/ros2_robot_react_app/blob/master/LICENSE)

## Overview

React Application for ROS 2 Robot

**Keywords:** ROS 2, React, rosbridge

### License

The source code is released under a [MIT license](LICENSE).

## Requirements & Dependencies

```
sudo apt install nodejs
sudo apt install -y ros-$ROS_DISTRO-rosbridge-suite
sudo npm i -g create-react-app
npm install roslib
npm install --save chart.js react-chartjs-2
```

## Installation

```
cd your_ws
git clone https://github.com/tasada038/ros2_robot_react_app.git
cd ~/your_ws/ros2_robot_react_app
npm install
```

## Run

First shell, run ros2_robot_react_app in the browser
```
cd ~/your_ws/ros2_robot_react_app
npm start
```

Second shell, launch the rosbridge_server
```
. install/setup.bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```

access the browser below.

```
  Local:            http://localhost:3000
  On Your Network:  http://192.168.11.3:3000
```

![React_ros2_app](./img/react_ros2_app.png)

## Publish and Subscribe Topics
The topics of the ros2_robot_react_app are as follows.

Publish data
- /cmd_vel

Subscribe data
- /color/image_raw/compressed
- /bno055/imu/data
- /map
- /odom