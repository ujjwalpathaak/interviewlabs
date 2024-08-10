<a name="readme-top"></a>
<br />

<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="readme/images/logo.png" alt="Logo" width="fit-content" height="fit-content">
  </a>

<!-- <h3 align="center">interviewlabs</h3> -->
<br>
  <p align="justify">
    Interviewers and interviewees have dedicated meeting rooms for conducting interviews. They also have access to a real-time IDE for collaborative C++ coding. The code can be compiled and run in the cloud using an in-house API called CodeCompiler API ( code available in the root directory ).</p>
    <img alt="Sockets" src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white"/> <img alt="Nodejs" src="https://img.shields.io/badge/Firebase-red?style=for-the-badge&logo=firebase&logoColor=white"/> <img alt="Sockets" src="https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=typescript&logoColor=black"/> <img alt="Sockets" src="https://img.shields.io/badge/Tailwind-rgb(56,189,248)?style=for-the-badge&logo=tailwindcss&logoColor=white"/> <img alt="Sockets" src="https://img.shields.io/badge/Zustand-purple?style=for-the-badge&logo=zustand&logoColor=white"/> <img alt="Sockets" src="https://img.shields.io/badge/Chrome Extension-red?style=for-the-badge&logo=googlechrome&logoColor=white"/>
<h3>Go to <a href="https://interviewlabs.netlify.app/">Interviewlabs.com</a> or see <a href="https://interviewlabs.netlify.app/">Demo Video</a></h3>
</div>

## Screenshots

### Login Screen

<img width="1710" alt="Screenshot 2024-08-09 at 4 18 09 PM" src="https://github.com/user-attachments/assets/0edadb97-6b1a-492f-aad1-d0c96dd7e4a2">

### New Meeting Screen

<img width="1710" alt="Screenshot 2024-08-09 at 4 20 07 PM" src="https://github.com/user-attachments/assets/f74e7124-b682-448b-b66e-6afcdfd396bf">

### Meeting Screen

<img width="1710" alt="Screenshot 2024-08-09 at 4 23 33 PM" src="https://github.com/user-attachments/assets/b783ea57-f6d7-462b-a8c1-75c47cf2acd3">

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
REACT_APP_COMPILERCONNECT_URL = https://compilerconnect-api-e842.onrender.com
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
