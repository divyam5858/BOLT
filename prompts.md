# LLM Prompts Used During Development

This document records the prompts used with an LLM during the development of the
BOLT OTP Based User Login take-home assignment.

The LLM was used as an engineering assistant for requirement analysis, architecture
planning, implementation guidance, debugging, testing, documentation, and deployment
troubleshooting.

The implementation, technical decisions, code integration, testing, and final
validation were reviewed during development.

---

## 1. Requirement Analysis

### Prompt

> Analyze the BOLT OTP Based User Login take-home assignment and break the
> requirements into:
>
> 1. Registration flow
> 2. User recognition and OTP login flow
> 3. Checkout flow
> 4. Backend/API requirements
> 5. Database requirements
> 6. Deployment requirements
> 7. Expected submission artifacts
>
> Identify the minimum functionality required to satisfy the assignment without
> adding unnecessary features.

### Purpose

Used to convert the assignment specification into an implementation checklist.

---

## 2. Technology and Architecture Planning

### Prompt

> I am comfortable with HTML, CSS, JavaScript, React, Node.js, Express and MongoDB.
>
> The assignment recommends TypeScript, React, Go and PostgreSQL but allows the
> candidate to use technologies they are comfortable with.
>
> Design a simple architecture using React for the frontend, Node.js and Express
> for the API layer, and PostgreSQL for the database.
>
> Keep the frontend, API and database as clearly separated layers and avoid
> unnecessary complexity for a take-home assignment.

### Purpose

Used to establish the three-layer application architecture.

```text
React Frontend
      ↓
Express REST API
      ↓
PostgreSQL Database
```

---

## 3. Project Structure

### Prompt

> Suggest a clean project structure for a small React + Express + PostgreSQL
> application.
>
> The backend should have separate database configuration, models, controllers
> and routes. The frontend should have separate pages, components and API
> service functions.
>
> Keep the structure simple and suitable for a take-home assignment.

### Purpose

Used to organize the project into maintainable frontend and backend layers.

---

## 4. PostgreSQL Database Design

### Prompt

> Design a minimal PostgreSQL schema for an OTP-based user recognition and
> checkout application.
>
> The users table should store:
> - id
> - first name
> - last name
> - email
> - generated 6-digit OTP
> - created timestamp
>
> The checkout table should store:
> - id
> - optional user_id
> - email
> - phone number
> - shipping address
> - created timestamp
>
> A user must be able to complete checkout without logging in, so user_id
> should support NULL values.

### Purpose

Used to design the database structure required by the assignment.

---

## 5. Database Constraints and Relationships

### Prompt

> Review the PostgreSQL schema for the BOLT assignment.
>
> Check whether the schema correctly handles unique user emails, primary keys,
> the relationship between users and checkout records, timestamps and guest
> checkout where user_id can be NULL.
>
> Suggest only necessary constraints for this assignment.

### Purpose

Used to validate the database relationships and constraints.

---

## 6. Supabase PostgreSQL Setup

### Prompt

> Explain how to connect a Node.js Express application to a Supabase PostgreSQL
> database using a PostgreSQL connection string stored in an environment variable.
>
> The database credentials must not be hard-coded into the application.
>
> Also provide a simple database connection test endpoint.

### Purpose

Used to configure and verify the PostgreSQL connection.

---

## 7. Database Verification

### Prompt

> Create a simple Express endpoint that verifies the PostgreSQL database
> connection and another endpoint that lists the public database tables.
>
> The endpoints should return JSON responses suitable for testing during
> development.

### Purpose

Used to verify the database connection and table availability.

---

# Backend Development

## 8. Express Backend Structure

### Prompt

> Help me implement the Express backend using separate:
>
> - database configuration
> - models
> - controllers
> - routers
>
> The application needs authentication-related APIs and a checkout API.
>
> Keep the implementation straightforward and avoid unnecessary abstractions.

### Purpose

Used to establish the backend code organization.

---

## 9. User Registration API

### Prompt

> Implement a Node.js and Express registration endpoint for the BOLT assignment.
>
> The endpoint should accept firstName, lastName and email.
>
> Validate the required fields, check whether the email already exists,
> generate a random 6-digit numeric OTP, store the user in PostgreSQL,
> and return the required registration response.
>
> Handle duplicate email registration with an appropriate error response.

### Purpose

Used to implement the registration API.

---

## 10. Six-Digit OTP Generation

### Prompt

> Implement a simple Node.js function that generates a random six-digit numeric
> OTP.
>
> The result must always contain exactly six digits, including leading zeroes
> when necessary.

### Purpose

Used to satisfy the six-digit OTP requirement.

---

## 11. User Recognition API

### Prompt

> Implement an Express API endpoint that receives an email address and checks
> PostgreSQL to determine whether the email belongs to a registered user.
>
> Return a clear registered true/false response and return only the user
> information required by the frontend.

### Purpose

Used to implement the background user recognition functionality.

---

## 12. OTP Verification API

### Prompt

> Implement an Express endpoint for OTP verification.
>
> The endpoint should receive email and OTP, find the corresponding registered
> user, compare the supplied OTP with the stored OTP, and return the user on
> successful verification.
>
> If the OTP does not match, return an appropriate error response.

### Purpose

Used to implement the OTP login mechanism.

---

## 13. Checkout API

### Prompt

> Implement a checkout API using Express and PostgreSQL.
>
> The request should contain:
> - userId
> - email
> - phone
> - shippingAddress
>
> Store the checkout information in the database.
>
> userId should be optional because users can skip login and continue as guests.
> When a user skips login, userId should be stored as NULL.
>
> No payment processing is required.

### Purpose

Used to implement checkout persistence.

---

# Frontend Development

## 14. React Registration Page

### Prompt

> Build a React registration page for the BOLT assignment.
>
> Collect:
> - first name
> - last name
> - email
>
> Submit the information to the registration API.
>
> After successful registration, display the generated 6-digit OTP clearly to
> the user and provide a way to continue to the checkout page.

### Purpose

Used to implement the registration UI.

---

## 15. Existing User Entry Point

### Prompt

> The application opens on the registration page, but existing users need a
> clear way to access checkout.
>
> Add an "Already have an account?" option that takes the user to the checkout
> page.
>
> Do not create a separate traditional login page because the assignment
> performs login through email recognition and the OTP modal during checkout.

### Purpose

Used to ensure existing users have a clear entry point into the recognition
and OTP login flow.

---

## 16. React Checkout Form

### Prompt

> Implement the React checkout form required by the BOLT assignment.
>
> The form should collect:
> - email
> - phone number
> - shipping address
>
> The user should be able to continue filling out the form while the email
> recognition request is being performed in the background.

### Purpose

Used to implement the checkout interface.

---

## 17. Real-Time Email Validation

### Prompt

> Add real-time email validation to the React checkout form.
>
> As the user types, determine whether the email is a complete and well-formed
> email address.
>
> Only perform the user recognition API request once the email is valid.
>
> Keep the validation feedback visible to the user without preventing them from
> filling out the other checkout fields.

### Purpose

Used to satisfy the real-time email validation requirement.

---

## 18. Background User Recognition

### Prompt

> Implement the checkout email recognition flow.
>
> When the email becomes valid, call the recognition API without blocking the
> user from entering their phone number and shipping address.
>
> If the email belongs to a registered user, display the OTP modal.
>
> If the email is not registered, allow the user to continue as a guest.

### Purpose

Used to implement the core user recognition behavior.

---

## 19. Debounced Email Recognition

### Prompt

> Review the email recognition implementation.
>
> The recognition request should not be triggered unnecessarily for every
> individual keystroke.
>
> Suggest a simple React approach to wait briefly after the user stops typing
> before making the recognition request, while still providing real-time
> validation.

### Purpose

Used to reduce unnecessary recognition API requests.

---

## 20. OTP Modal

### Prompt

> Implement a reusable React OTP modal for the checkout flow.
>
> Requirements:
> - Display the user's email.
> - Accept a 6-digit numeric OTP.
> - Restrict the input to numeric characters.
> - Validate that exactly six digits are entered.
> - Call the OTP verification API.
> - Display invalid OTP errors inside the modal.
> - Close the modal after successful login.
> - Provide a Skip Login option.

### Purpose

Used to implement the OTP login interaction.

---

## 21. OTP Input Validation

### Prompt

> Add frontend validation for the OTP input.
>
> The input should accept only numeric characters and exactly six digits.
> Non-numeric characters should not be accepted.
>
> Display validation errors inside the OTP modal.

### Purpose

Used to provide client-side OTP validation.

---

## 22. Logged-In User State

### Prompt

> After successful OTP verification, update the React checkout state with the
> authenticated user's information.
>
> Close the OTP modal and display the user's first name at the top of the
> checkout form.
>
> The user should remain on the checkout page and continue filling out the form.

### Purpose

Used to implement the post-login checkout state.

---

## 23. Skip Login Flow

### Prompt

> Implement the Skip Login behavior for the OTP modal.
>
> When the user clicks Skip Login:
> - close the OTP modal
> - clear the recognition modal state
> - keep the checkout form available
> - allow the user to submit checkout as a guest
>
> The checkout API should receive userId as null for guest checkout.

### Purpose

Used to implement the required guest checkout behavior.

---

## 24. Frontend API Service

### Prompt

> Create a reusable React API service module for the following backend operations:
>
> - register user
> - recognize user
> - verify OTP
> - submit checkout
>
> Centralize request handling and JSON error handling so individual components
> do not duplicate fetch logic.

### Purpose

Used to centralize frontend-to-backend communication.

---

# Debugging and Problem Solving

## 25. Checkout Rendering Debugging

### Prompt

> Review the React checkout implementation and help identify why the checkout
> component may appear multiple times in the UI.
>
> Check routing, React StrictMode, component mounting and state behavior.
>
> Diagnose the actual cause before making changes rather than applying a
> superficial fix.

### Purpose

Used to investigate an unexpected frontend rendering issue.

---

## 26. OTP Flow Debugging

### Prompt

> Review the current OTP modal and checkout interaction.
>
> Verify that:
> - successful OTP verification closes the modal
> - the user is marked as logged in
> - the user's name is displayed
> - incorrect OTP keeps the modal open and displays an error
> - Skip Login closes the modal
> - checkout remains available after skipping login

### Purpose

Used to validate the complete OTP interaction.

---

## 27. Guest Checkout Debugging

### Prompt

> Verify the checkout behavior when a user skips OTP login.
>
> The user should be able to close the OTP modal, continue completing the
> checkout form, submit the checkout, and have the checkout record stored with
> user_id = NULL.

### Purpose

Used to validate the guest checkout path at both API and database levels.

---

## 28. Frontend/API Integration Debugging

### Prompt

> Review the React API service and Express routes together.
>
> Verify that the frontend endpoints exactly match the backend routes for:
>
> POST /api/auth/register
> GET /api/auth/recognize
> POST /api/auth/verify-otp
> POST /api/checkout
>
> Identify any mismatch between the frontend base URL, /api prefix and backend
> route definitions.

### Purpose

Used to verify frontend and backend route integration.

---

## 29. Production API Debugging

### Prompt

> The deployed React application is showing:
>
> Unexpected token '<', "<!DOCTYPE "... is not valid JSON
>
> Diagnose the issue based on the frontend fetch implementation and API route
> structure.
>
> Determine whether the frontend is requesting the correct production API
> endpoint and whether the backend route prefix is correct.

### Purpose

Used to diagnose a production API routing/configuration issue.

---

# Production Preparation

## 30. Production API URL

### Prompt

> Prepare the Vite React frontend for production deployment.
>
> The backend URL must not be hard-coded.
>
> Use VITE_API_URL so that local development can use the local Express server
> while the deployed frontend can communicate with the deployed backend.

### Purpose

Used to make the frontend deployment-ready.

---

## 31. Production CORS

### Prompt

> Configure Express CORS for separate frontend and backend deployment.
>
> The allowed frontend origin should come from an environment variable rather
> than being hard-coded.
>
> The configuration should support local development and the production
> frontend.

### Purpose

Used to prepare the API for separate frontend and backend deployment.

---

## 32. Environment Variables and Secrets

### Prompt

> Review the project configuration for production security.
>
> Create a .gitignore strategy that prevents environment files, database
> credentials, node_modules and build output from being committed.
>
> Also create a .env.example that documents the required environment variables
> without exposing real credentials.

### Purpose

Used to prepare the repository for safe public GitHub submission.

---

## 33. Backend Production Configuration

### Prompt

> Review the Express application for production deployment.
>
> Ensure the application uses the environment-provided PORT and has a production
> start command using node rather than nodemon.
>
> Identify any local-development-only configuration that needs to be changed
> before deployment.

### Purpose

Used to prepare the backend for hosting.

---

## 34. Deployment Architecture

### Prompt

> Plan the deployment of this application using:
>
> - Vercel for the React/Vite frontend
> - Render for the Node.js/Express backend
> - Supabase PostgreSQL for the database
>
> The frontend and backend must remain separate and communicate through HTTPS.
>
> Explain the required environment variables and deployment order.

### Purpose

Used to plan the production deployment architecture.

---

## 35. Render Backend Deployment

### Prompt

> Explain how to deploy the Express backend from a repository where the backend
> is located in a Backend directory.
>
> The service should use npm install as the build command and npm start as the
> production start command.
>
> Explain which environment variables need to be configured.

### Purpose

Used to prepare the backend for Render deployment.

---

## 36. Vercel Frontend Deployment

### Prompt

> Explain how to deploy the React/Vite frontend from a repository where the
> frontend is located in a Frontend directory.
>
> The deployed frontend should use VITE_API_URL to communicate with the deployed
> Express backend.

### Purpose

Used to prepare the frontend for Vercel deployment.

---

# Documentation and Repository Preparation

## 37. README Documentation

### Prompt

> Create a clear README for the BOLT take-home assignment.
>
> Include:
> - project overview
> - features
> - technology stack
> - application architecture
> - project structure
> - application flow
> - API endpoints
> - database structure
> - local setup
> - environment variables
> - testing
> - deployment
>
> Keep the documentation clear and practical rather than unnecessarily verbose.

### Purpose

Used to prepare the repository documentation for reviewers.

---

## 38. Git Repository Preparation

### Prompt

> Review the project before GitHub submission.
>
> Identify files that should not be committed, verify that environment secrets
> are excluded, ensure SQL schema files and documentation are included, and
> suggest a clean repository structure suitable for a technical take-home
> assignment.

### Purpose

Used for final repository hygiene and submission preparation.

---

# Final Validation

## 39. Requirement Audit

### Prompt

> Perform a final requirement-by-requirement audit of the completed BOLT OTP
> Based User Login application.
>
> Check:
>
> - registration
> - first name
> - last name
> - email
> - random 6-digit OTP
> - OTP display
> - checkout email
> - checkout phone
> - shipping address
> - real-time email validation
> - background recognition
> - OTP modal
> - valid OTP
> - invalid OTP
> - skip login
> - logged-in user display
> - checkout persistence
> - guest checkout
> - PostgreSQL database
> - separate frontend/API/database layers
> - SQL schema files
> - GitHub repository
> - prompts.md
> - public deployment
>
> Identify only genuine missing requirements and avoid recommending unrelated
> features.

### Purpose

Used as the final requirements audit before submission.

---

## 40. End-to-End Testing

### Prompt

> Create an end-to-end testing checklist for the BOLT application.
>
> Test these scenarios:
>
> 1. New user registration
> 2. OTP generation and display
> 3. Continue from registration to checkout
> 4. Existing user recognition
> 5. Correct OTP login
> 6. Incorrect OTP
> 7. Skip login
> 8. Guest checkout
> 9. Logged-in checkout
> 10. Database persistence
>
> Include the expected result for each scenario.

### Purpose

Used to validate the complete application from a user's perspective.

---

# Development Approach

The LLM was used as an engineering copilot throughout development.

The overall workflow was:

```text
Requirements
     ↓
Architecture
     ↓
Database Design
     ↓
Backend Implementation
     ↓
Frontend Implementation
     ↓
API Integration
     ↓
Testing
     ↓
Debugging
     ↓
Production Preparation
     ↓
Deployment
     ↓
Final Validation
```

The focus was on using LLM assistance to accelerate implementation, explore
solutions, identify bugs, validate assumptions, and improve development speed
while keeping the application aligned with the original assignment requirements.

The final code was integrated and tested as part of the development process.