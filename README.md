# URHired

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Overview

URHired is a comprehensive job application tracking platform designed to streamline the job search process. This application helps job seekers manage their applications, track interview stages, and organize their career opportunities in one centralized location.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Application Dashboard**: Visualize your job application pipeline at a glance
- **Application Tracking**: Log and monitor the status of each job application
- **Interview Management**: Schedule and track interview stages
- **Company Information**: Store details about potential employers
- **Document Storage**: Keep resumes, cover letters, and other documents organized
- **Notification System**: Receive reminders for upcoming interviews and follow-ups
- **Analytics**: Gain insights into your job search performance
- **Mobile Responsive Design**: Access your data from any device

## Tech Stack

- **Frontend**: React, JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, OAuth
- **Deployment**: Docker, AWS/Heroku

## Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/techieRahul17/URHired.git
cd URHired

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit the .env file with your configuration

# Start development server
npm run dev
```

## Usage

After installation, you can:

1. Register for a new account or log in with existing credentials
2. Add job applications with company details, job descriptions, and application dates
3. Track the status of each application (Applied, Interview Scheduled, Offer, Rejected)
4. Upload relevant documents per application
5. Set reminders for follow-ups and interviews
6. View analytics on your job search progress

## Project Structure

```
URHired/
├── client/             # Frontend React application
│   ├── public/         # Static files
│   ├── src/            # React components and logic
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context for state management
│   │   └── utils/      # Helper functions
├── server/             # Backend Node.js application
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── utils/          # Helper functions
├── config/             # Configuration files
└── tests/              # Test suites
```

## API Documentation

The API endpoints are organized around the following resources:

- `/api/auth` - Authentication routes
- `/api/applications` - Job application management
- `/api/companies` - Company information
- `/api/interviews` - Interview scheduling
- `/api/documents` - Document storage and retrieval
- `/api/analytics` - Job search statistics

Detailed API documentation is available in the `/docs` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/techieRahul17">
        <img src="https://github.com/techieRahul17.png" width="100px;" alt="Rahul"/>
        <br /><sub><b>Rahul</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/prawinkumar1506">
        <img src="https://github.com/prawinkumar1506.png" width="100px;" alt="Prawin"/>
        <br /><sub><b>Prawin</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Ramcharan-Swaminathan">
        <img src="https://github.com/Ramcharan-Swaminathan.png" width="100px;" alt="Ramcharan"/>
        <br /><sub><b>Ramcharan</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/MasterAffan">
        <img src="https://github.com/MasterAffan.png" width="100px;" alt="Ramcharan"/>
        <br /><sub><b>MasterAffan</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/PearlGrell">
        <img src="https://github.com/PearlGrell.png" width="100px;" alt="PearlGrell"/>
        <br /><sub><b>PearlGrell</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ShubhamPrasad3012">
        <img src="https://github.com/ShubhamPrasad3012.png" width="100px;" alt="ShubhamPrasad3012"/>
        <br /><sub><b>ShubhamPrasad3012</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/root-sarvesh">
        <img src="https://github.com/root-sarvesh.png" width="100px;" alt="root-sarvesh"/>
        <br /><sub><b>root-sarvesh</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/msuud">
        <img src="https://github.com/msuud.png" width="100px;" alt="msuud"/>
        <br /><sub><b>msuud</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ShaluKasera">
        <img src="https://github.com/ShaluKasera.png" width="100px;" alt="ShaluKasera"/>
        <br /><sub><b>ShaluKasera</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/vishalm342">
        <img src="https://github.com/vishalm342.png" width="100px;" alt="vishalm342"/>
        <br /><sub><b>vishalm342</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/SOMSSI2110">
        <img src="https://github.com/SOMSSI2110.png" width="100px;" alt="SOMSSI2110"/>
        <br /><sub><b>SOMSSI2110</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/RohiniShankari">
        <img src="https://github.com/RohiniShankari.png" width="100px;" alt="RohiniShankari"/>
        <br /><sub><b>RohiniShankari</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/apoorvaww">
        <img src="https://github.com/apoorvaww.png" width="100px;" alt="apoorvaww"/>
        <br /><sub><b>apoorvaww</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Mounika-Chowdary28">
        <img src="https://github.com/Mounika-Chowdary28.png" width="100px;" alt="Mounika-Chowdary28"/>
        <br /><sub><b>Mounika-Chowdary28</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/AnushkaChanda">
        <img src="https://github.com/AnushkaChanda.png" width="100px;" alt="AnushkaChanda"/>
        <br /><sub><b>AnushkaChanda</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Lingaraj-Patil">
        <img src="https://github.com/Lingaraj-Patil.png" width="100px;" alt="Lingaraj-Patil"/>
        <br /><sub><b>Lingaraj-Patil</b></sub>
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/shrutirathod12">
        <img src="https://github.com/shrutirathod12.png" width="100px;" alt="shrutirathod12"/>
        <br /><sub><b>shrutirathod12</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/riyaraj1">
        <img src="https://github.com/riyaraj1.png" width="100px;" alt="riyaraj1"/>
        <br /><sub><b>riyaraj1</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/SrishtiSinha2003">
        <img src="https://github.com/SrishtiSinha2003.png" width="100px;" alt="SrishtiSinha2003"/>
        <br /><sub><b>SrishtiSinha2003</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sanyogeetapradhan">
        <img src="https://github.com/sanyogeetapradhan.png" width="100px;" alt="sanyogeetapradhan"/>
        <br /><sub><b>sanyogeetapradhan</b></sub>
      </a>
    </td>
  </tr>
</table>


 ## Getting Started for Beginners 

To get this project running on your local machine, follow these simple steps:

## Prerequisites
- Node.js and npm installed
- Git installed
- MongoDB installed locally or use MongoDB Atlas


## How to contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2023-2025 URHired. All Rights Reserved.
```
