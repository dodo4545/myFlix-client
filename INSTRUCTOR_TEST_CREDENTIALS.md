# Test Credentials for myFlix App

## Account Information
**Username:** myuser123  
**Password:** password123

## Backend API URL
https://myflix-app-711-52fc8f24a6d2.herokuapp.com

## Test Instructions

### Expected Behavior
1. Navigate to login page
2. Enter credentials above
3. Click "Login"
4. **Expected:** Should see grid of movies
5. **Actual:** Gets 401 Unauthorized error immediately after login

### API Endpoints to Test
- **POST /login** - ✅ Works (returns token)
- **GET /movies** - ❌ Returns 401 with valid token
- **PUT /users/myuser123/movies/:movieId** - ❌ Untested (add favorite)
- **DELETE /users/myuser123/movies/:movieId** - ❌ Untested (remove favorite)
- **GET /users** - ❌ Untested (get user data)
- **PUT /users/myuser123** - ❌ Untested (update user)
- **DELETE /users/myuser123** - ❌ Untested (deregister)

### Console Error Output
```
Login response: {user: {...}, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'}
onLoggedIn called with token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Fetching movies with token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GET https://myflix-app-711-52fc8f24a6d2.herokuapp.com/movies 401 (Unauthorized)
Movies fetch response status: 401
```

### Network Tab Details
**Request Headers (GET /movies):**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Response:**
```
Status: 401 Unauthorized
```

### Key Observation
The token returned from `/login` is immediately rejected by `/movies` endpoint with the same token. Tokens match exactly between login response and subsequent request.

### Local Testing
To run the app locally:
```bash
cd "/Users/jamesj./Documents/myflix-client 2"
npm install
npm start
```
App will run on http://localhost:1234

### Branch Information
- **Repository:** dodo4545/myFlix-client
- **Branch:** bootstrap-styling-integration
- **Last Commit:** "Add Profile view with favorites management and update user info features"

### Additional Notes
All frontend code is complete and follows the Exercise 3.7 requirements. The issue appears to be with JWT validation on the backend, not with the frontend implementation.
