# InterviewSimulator

# Overview

IntuitiHire is a comprehensive mock interview platform that simulates the interview experience for both candidates and interviewers. The application is built using a microservices architecture, ensuring scalability and ease of maintenance.

# Machine Learning Integration

IntuitiHire leverages cutting-edge machine learning models from Hugging Face to analyze text, audio, and video inputs. These models are integral to the report generation feature, providing in-depth insights into candidate performance:

Text Analysis: Utilizes transformer models for sentiment analysis and keyword extraction.
Audio Analysis: Employs speech-to-text conversion models followed by language processing to evaluate communication skills.
Video Analysis: Leverages facial recognition and emotion detection models to assess candidate engagement and reaction.

# Technologies Used

Frontend: React.js, HTML5, CSS3, JavaScript
Backend: Flask
Database: Firebase
Video/Audio Processing: open-cv, pyaudio

# System Requirements

OS: Cross-platform compatibility (Windows, MacOS, Linux)
Browser: Latest versions of Chrome, Firefox, Safari, or Edge
Node.js: Version 14 or newer
Python: Version 3 or newer

# Frontend Repository Link

https://github.com/raghavmanchanda2/InterviewSimulator

# Backend Repository Link

https://github.com/Nisarg-18/interview-simulator-backend

# Frontend Installation Guide
Environment Setup:

Ensure Node.js is installed on your system.
Clone the repository from the source control to your local machine.
Database Setup:

Open a Firebase project and add the credentials in the .env file as follows:
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
Application Setup:

Navigate to the cloned directory and install dependencies using npm install.
Starting the Application:

Launch the frontend application using npm start.

# Backend Installation Guide
Environment Setup:

Ensure Python is installed on your system.
Clone the repository from the source control to your local machine.
Application Setup:

Navigate to the cloned directory and install dependencies present in requirements.txt.
Download the models required for this project from here.
Database Setup:

Open a Firebase project and add the key.json file in the project directory.
Starting the Application:

Run the backend server using python main.py.
