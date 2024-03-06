> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

This project is a TypeScript/React application designed to demonstrate various functionalities including user input handling, login mechanism, interactive REPL (Read-Eval-Print Loop) components, and data manipulation with CSV files. It utilizes React hooks for state management and showcases controlled components for form handling.

# Design Choices

Components: The application is modularized into components such as ControlledInput for handling form inputs, LoginButton for authentication actions, REPLInput and REPLHistory for creating an interactive command-line interface within the web app, and CSV for handling CSV data parsing and display.

State Management: Uses React's useState and useEffect hooks for managing component states and side effects, ensuring a functional and reactive user interface.

Mock Data: The /data folder contains mockedJson.ts which is used to simulate API calls or external data fetching. This approach facilitates easier testing and development without relying on live backend services.

Error Handling: Components are designed to gracefully handle errors, providing feedback to users and preventing crashes.

# Errors/Bugs

As of the last update, there are no known critical bugs. However, during development, you may encounter minor issues related to:

State management inconsistencies, especially when handling asynchronous operations.
UI rendering issues due to conditional rendering or dynamic content updates.

# Tests

App.spec.ts: These files contain unit and integration tests written with a testing framework (assumed to be Jest) that validate the behavior of the application components and their interactions. They include tests for rendering components, simulating user inputs, and checking for expected outputs.

Testing Strategy: Focuses on ensuring that all user interactions and state management logic are correctly implemented. Mock objects and functions are used to isolate components during testing.

# How to

Getting Started

Clone the Repository: Start by cloning the repository to your local machine.
Install Dependencies: Navigate to the project directory and run npm install and npx playwright install to install the required dependencies.

Explore Mock Data: Check the /mock folder for mocked data structures and adjust them as needed to simulate different scenarios.

Running the Application

Execute npm start to run the application locally. It will be available at http://localhost:8000.

Clicking the login button is required to enter commands into the application

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_

    Mock Gearup Solution Code
