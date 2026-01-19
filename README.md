## Employee Management Dashboard

## Project Overview
The Employee Management Dashboard is a modern, responsive web application built using React.js and React Bootstrap.
It allows users to manage employee records with features such as:

1. Secure login using local authentication

2. Dashboard summary (Total, Active, Inactive employees)

3. Add / Edit employee using a modal form

4. Form validation using Formik + Yup

5. Image upload with preview

6. Graceful handling of loading states and empty states

7. Clean, modern UI following best UX practices

## This project is designed to demonstrate frontend architecture, reusable components, validation, and UI/UX skills.

## Tech Stack Used
Frontend

1. React.js (JavaScript)

2. React Router DOM – Routing

3. React Bootstrap – UI components & responsive layout

4. Formik – Form state management

5. Yup – Schema-based form validation

6. SweetAlert2 – Success & confirmation alerts

7. React Toastify – Toast notifications

8. State & Data Handling

9. Local Storage – Authentication & mock persistence

## Mock Data (No backend dependency)

1. Steps to Run the Project Locally
2. Clone the repository
3. git clone <repository-url>
4. cd employee-dashboard

## Install dependencies
1. npm install

2. Start the development server
npm start

3. Open in browser
http://localhost:3000

## Login Details (Mock Auth)

1. Authentication is handled using localStorage

2. On successful login:

a3. uth=true is stored in localStorage

4. User is redirected to Dashboard

5. Logout clears auth data and redirects to Login

## UI / UX Design Decisions

1. Modern gradient background for visual appeal

2. Card-based layout for dashboard metrics

3. Modal-based form to avoid page navigation

4. Consistent color palette across dashboard & form

5. Clear typography and spacing for readability

## Hover effects & shadows for better interactivity

## Validation & User Feedback

1. Formik + Yup used for all form validations

2. Real-time validation for:

3. Name length

4. Date of Birth (Age between 18–70)

5. Required fields

SweetAlert2 used for:

6. Success messages (Add / Update Employee)

7. Toast notifications used where quick feedback is required

8. Browser default validation messages are avoided for better UX

## Loading & Empty States

1. Loading indicators are shown while processing actions

2. Empty state UI displayed when no employees exist

Friendly messages guide users to add their first employee

## Folder Structure (Meaningful & Scalable)
src/
│── components/
│   ├── EmployeeFormModal.jsx
│
│── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│
│── utils/
│   ├── auth.js
│
│── routes/
│   ├── AppRoutes.jsx
│
│── App.js
│── index.js


## Author

Priyanka Ingle
Frontend / Full-Stack Developer
React • JavaScript 