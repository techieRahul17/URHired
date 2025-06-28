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
        <br />
        <sub><b>Rahul</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Ramcharan-Swaminathan">
        <img src="https://github.com/Ramcharan-Swaminathan.png" width="100px;" alt="Ramcharan Swaminathan"/>
        <br />
        <sub><b>Ramcharan Swaminathan</b></sub>
      </a>
    </td>
  </tr>
</table>

### How to contribute:

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
