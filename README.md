# Student Performance Dashboard

This project is a web application designed to help university students manage their academic records, analyze performance trends, identify at-risk subjects, and receive personalized improvement recommendations.

## Features

- **Academic Record Management**: Students can input and manage their grades and subjects.
- **Performance Analysis**: The application analyzes student performance trends over time.
- **At-Risk Subject Identification**: The system identifies subjects where students may be at risk of failing based on their performance.
- **Personalized Recommendations**: Students receive tailored recommendations for improvement based on their academic performance.

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend

- **Technologies**: React, TypeScript
- **Main Files**:
  - `src/main.tsx`: Entry point for the React application.
  - `src/App.tsx`: Main application component that sets up routing.
  - `src/components`: Contains reusable components like Dashboard, GradeChart, and AtRiskList.
  - `src/pages`: Contains page components like StudentList and StudentProfile.
  - `src/services/api.ts`: Handles API calls to the backend.

### Backend

- **Technologies**: Node.js, Express, TypeScript
- **Main Files**:
  - `src/server.ts`: Entry point for the backend server.
  - `src/controllers`: Contains controllers for handling requests related to students and authentication.
  - `src/models`: Defines the data models for students and grades.
  - `src/services`: Contains services for performance analysis and generating recommendations.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd student-performance-dashboard
   ```

2. **Install dependencies**:
   - For the frontend:
     ```
     cd frontend
     npm install
     ```
   - For the backend:
     ```
     cd ../backend
     npm install
     ```

3. **Run the application**:
   - Start the backend server:
     ```
     cd backend
     npm start
     ```
   - Start the frontend application:
     ```
     cd frontend
     npm start
     ```

4. **Access the application**: Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.