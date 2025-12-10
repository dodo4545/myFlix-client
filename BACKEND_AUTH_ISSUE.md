# Backend JWT Authentication Issue

## Problem Summary
The myFlix backend API has a critical JWT authentication bug that prevents all authenticated requests from working, even immediately after successful login.

## Symptoms
1. POST `/login` endpoint works correctly and returns a valid JWT token
2. Any subsequent authenticated request (e.g., GET `/movies`) with that same token returns `401 Unauthorized`
3. This occurs immediately after login with the freshly-generated token

## Evidence
### Console Log Output
```javascript
Login response: {user: {...}, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'}
onLoggedIn called with token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fetching movies with token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GET https://myflix-app-711-52fc8f24a6d2.herokuapp.com/movies 401 (Unauthorized)
Movies fetch response status: 401
```

### Request Headers Confirmed
The frontend correctly sends:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Test Credentials
- Username: myuser123
- Password: password123
- Backend URL: https://myflix-app-711-52fc8f24a6d2.herokuapp.com

## Impact
- **Blocks all authenticated features**: Cannot fetch movies, manage favorites, update profile, or deregister
- **Prevents Exercise 3.7 testing**: Profile view and favorites management cannot be demonstrated
- **Breaks existing functionality**: Movie grid display no longer works

## Possible Causes
1. **JWT Secret Mismatch**: The secret used to sign tokens during login differs from the secret used to verify tokens in authentication middleware
2. **Token Expiration Bug**: Token expiration set to 0 seconds or negative value
3. **Middleware Order Issue**: Authentication middleware may be executing before token is properly parsed
4. **Environment Variable Problem**: JWT_SECRET not properly loaded in Heroku environment
5. **CORS Configuration**: Authorization header may be stripped or rejected

## Recommended Investigation Steps
1. Check Heroku config vars: `heroku config:get JWT_SECRET -a myflix-app-711`
2. Verify token signing and verification use the same secret
3. Check token expiration configuration in JWT generation
4. Review authentication middleware order in Express app
5. Test token validation independently with a known-good token
6. Check server logs for authentication errors

## Workaround Attempted
None available. This is a server-side issue that cannot be fixed from the client.

## Frontend Status
All frontend code for Exercise 3.7 is complete and correct:
- React Router implementation ✅
- Profile view component ✅
- Favorites management UI ✅
- API integration functions ✅
- Error handling ✅

The frontend properly passes tokens in Authorization headers. This is confirmed by console logging showing the exact same token from login being sent to `/movies`.

## Date Identified
December 8-9, 2024

## Priority
**CRITICAL** - Blocks all development and testing of authenticated features.
