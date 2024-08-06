# Interviewlabs
<a name="readme-top"></a>
  <p align="justify">
Interviewers and interviewees have dedicated meeting rooms for conducting interviews. They also have access to a real-time IDE for collaborative C++ coding. The code can be compiled and run in the cloud using an in-house API called CodeCompiler API ( code available in the root directory ).
  </p>

<img alt="Sockets" src="https://img.shields.io/badge/-ReactJs-85051b?logo=react&logoColor=white&style=for-the-badge"/> <img alt="Sockets" src="https://img.shields.io/badge/Redux-purple?style=for-the-badge&logo=redux&logoColor=white"/> <img alt="Nodejs" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img alt="Sockets" src="https://img.shields.io/badge/Sockets-F7DF1E?style=for-the-badge&logo=socket.io&logoColor=black"/> <img alt="Sockets" src="https://img.shields.io/badge/Tailwind-rgb(56,189,248)?style=for-the-badge&logo=tailwindcss&logoColor=white"/> 

<h3>Go to <a href="https://interviewlabs.netlify.app/">Interviewlabs.com</a> or see <a href="https://interviewlabs.netlify.app/">Demo Video</a></h3>

## Screenshots
### Login Screen
### New Meeting Screen
### Meeting Screen

## CodeCompiler API
It is an in-house developed API designed to compile and run C++ code in the cloud.
- **Docker**: The API uses Docker to containerize the execution environment. This guarantees consistency and isolation, preventing conflicts and ensuring that the code runs in a standardized setup across different sessions.
- **Child Processes**: Each code execution request spawns a new child process within the Docker container. This isolates the code execution, providing a secure environment and preventing any interference between concurrent sessions.

## Technical Implementation

### Frontend Development
- **React.js**: Responsive UI with Dark/Light modes.
- **Express.js**: Backend API support.
- **Redux Toolkit & Context API**: Smooth state management.
- **Code Mirror**: Integrated IDE with theme options.
- **Toastify**: Notifications, alerts and erros.

### Video Communication
- **WebRTC (simple-peer)**: High-quality, real-time video calls.

### Real-Time Collaboration
- **Socket.io**: Real-time shared coding environment.

### Code Execution
- **CodeCompiler API**: API to run C++ over the cloud.

## Getting Started
To get a local copy up and running follow these simple example steps.

1. Install NPM packages

```sh
npm install
cd client/ npm install
cd sockets/ npm install
```

2. Create .env file in root directory
  ```sh
DATABASE_URL =
```
4. Create .env file in client directory

```sh
REACT_APP_BACKEND_URL =
REACT_APP_SOCKET_URL =
REACT_APP_CODE_EXECUTE_PROD_URL = https://compilerconnect-api.onrender.com/cpp
```

  <!-- ```sh
  npm install
  cd client/ npm install
  cd sockets/ npm install
  ``` -->

4. Run Commands

```sh
npm start
cd client/ npm start
cd sockets/ npm start
```
