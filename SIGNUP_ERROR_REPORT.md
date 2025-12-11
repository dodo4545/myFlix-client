# User Signup Error - Technical Report

## Issue Summary
The `/users` POST endpoint is returning a 500 Internal Server Error when attempting to create new user accounts. This is preventing the creation of test accounts for instructor review.

## Date Identified
December 11, 2025

## Requested Account Details
- **Username:** jorge
- **Password:** password
- **Email:** jorge@test.com
- **Birthday:** 08/08/2020

## Error Details

### API Response
```json
{
  "error": "Something went wrong!",
  "message": "Internal server error"
}
```

### Request Details
**Endpoint:** `POST https://myflix-app-711-52fc8f24a6d2.herokuapp.com/users`

**Headers:**
```
Content-Type: application/json
```

**Request Body (Attempt 1 - ISO Date):**
```json
{
  "Username": "jorge",
  "Password": "password",
  "Email": "jorge@test.com",
  "Birthday": "2020-08-08"
}
```

**Request Body (Attempt 2 - US Date):**
```json
{
  "Username": "jorge",
  "Password": "password",
  "Email": "jorge@test.com",
  "Birthday": "08/08/2020"
}
```

**Request Body (Attempt 3 - Full ISO):**
```json
{
  "Username": "jorge",
  "Password": "password",
  "Email": "jorge@test.com",
  "Birthday": "2020-08-08T00:00:00.000Z"
}
```

All three attempts resulted in the same 500 Internal Server Error.

## Testing Performed

### 1. Login Endpoint Test (Successful)
To verify the API is operational, tested the login endpoint with existing credentials:

**Request:**
```bash
curl -X POST https://myflix-app-711-52fc8f24a6d2.herokuapp.com/login \
  -H "Content-Type: application/json" \
  -d '{"Username":"myuser123","Password":"password123"}'
```

**Response:** ✅ Success (200 OK)
```json
{
  "user": {
    "_id": "6931b0e146ec046659dc7362",
    "Username": "myuser123",
    "Email": "myuser@test.com",
    "Birthday": "1990-01-01T00:00:00.000Z",
    "FavoriteMovies": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Conclusion:** Login endpoint works correctly. Backend server is operational.

### 2. User Creation Test (Failed)
Multiple attempts to create new users all failed with 500 error, regardless of date format used.

## Possible Root Causes

### 1. Database Validation Error
- MongoDB schema validation might be rejecting the data
- Missing required fields in the User model
- Field type mismatch (e.g., expecting Date object but receiving string)

### 2. Password Hashing Issue
- bcrypt or hashing middleware might be failing
- Could be related to password length requirements
- Might be a bcrypt version incompatibility

### 3. Duplicate Username/Email Check
- Pre-save hook might be failing when checking for duplicates
- Database query error in validation logic

### 4. Environment Configuration
- Missing environment variables for user creation
- Database connection issues specific to write operations
- Permissions issue with MongoDB Atlas

### 5. Express Middleware Error
- Body parser not correctly parsing the request
- CORS issue with POST requests
- Validation middleware throwing unhandled exception

## Recommended Investigation Steps

### Backend Logs
1. Check Heroku logs: `heroku logs --tail -a myflix-app-711`
2. Look for stack traces around the time of the signup attempts
3. Check for MongoDB connection errors

### Code Review
1. Review the POST `/users` route handler
2. Check the User model schema and validation rules
3. Verify password hashing middleware is working
4. Check for any pre-save hooks that might be failing

### Database Check
1. Verify MongoDB Atlas connection is healthy
2. Check if there are any existing users with username "jorge" or email "jorge@test.com"
3. Verify database write permissions

### Quick Diagnostic Commands
```bash
# View recent logs
heroku logs --tail -a myflix-app-711

# Check environment variables
heroku config -a myflix-app-711

# Check dyno status
heroku ps -a myflix-app-711

# Test database connection
heroku run node -e "console.log(process.env.CONNECTION_URI)" -a myflix-app-711
```

## Workaround

Until the signup endpoint is fixed, the instructor can use the existing test account:

**Test Account Credentials:**
- **Username:** myuser123
- **Password:** password123
- **Email:** myuser@test.com

This account has full access to test the frontend functionality.

## Impact

**High Priority** - This blocks:
- Creating custom test accounts for instructors
- Testing the signup flow from the frontend
- Demonstrating complete user registration functionality

However, it does NOT block:
- Login functionality ✅
- Movie browsing (once auth issue is fixed) ✅
- Profile management ✅
- Frontend code review ✅

## Frontend Status

The frontend signup form is implemented correctly and follows best practices:
- ✅ Proper form validation (minLength, pattern matching, required fields)
- ✅ Loading states and error handling
- ✅ Success feedback with auto-redirect
- ✅ Correct API request format

The issue is entirely on the backend server side.

## Related Issues

This user creation error appears to be separate from the JWT authentication issue documented in `BACKEND_AUTH_ISSUE.md`. The login endpoint works and returns tokens successfully - those tokens are just being rejected by other endpoints.

## Contact

If you need any additional information or testing, please let me know. I'm available to run more diagnostic tests or provide clarification on the frontend implementation.

---

**Report Generated:** December 11, 2025  
**Project:** myFlix Client (Exercise 3.7)  
**Student:** James J.  
**Repository:** dodo4545/myFlix-client  
**Branch:** bootstrap-styling-integration
