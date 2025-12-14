Backend API Issues - Heroku Logs Analysis

Date: December 14, 2025  
App: myflix-app-711-52fc8f24a6d2.herokuapp.com


Critical Issues Found

Issue 1: JWT Authentication Failure (401 Errors)

Problem: All /movies requests return 401 Unauthorized, even with valid tokens from successful login.

Evidence from logs:
```
2025-12-14T00:18:35 GET /movies → status=401
2025-12-14T00:26:36 GET /movies → status=401
2025-12-14T01:00:34 GET /movies → status=401
2025-12-14T01:02:29 GET /movies → status=401
```

Pattern: 
- Login works: POST /login → status=200 (returns token)
- Immediate next request fails: GET /movies → status=401 (same token rejected)

Root Cause: JWT secret mismatch between token generation (login) and token verification (authentication middleware).


Issue 2: User Registration Failure (500 Errors)

Problem: Cannot create new users - all signup attempts return 500 Internal Server Error.

Error from logs:
```
TypeError: Users.hashPassword is not a function
at /app/index.js:118:32
```

Attempted requests:

POST /users?Username=jorge&Password=password&Email=jorge@test.com&Birthday=08-08-2020 → 500
POST /users?Username=jorge&Password=password&Email=jorge@test.com&Birthday=2020/02/02 → 500
POST /users?Username=jorge&Password=password&Email=jorge@test.com&Birthday=2020-02-02 → 500
POST /users?Username=jorge&Password=password&Email=jorge@test.com&Birthday=02-02-1978 → 500

Root Cause: The Users model doesn't have a hashPassword method, or it's not exported correctly.

Location: /app/index.js:118 - User registration endpoint


Issue 3: Data Structure Problems

Problem: Some movies missing Genre or Director data, causing frontend crashes.

Impact: Frontend tries to access movie.Genre.Name or movie.Director.Name on undefined objects.

Solution Applied: Added optional chaining in frontend:
genre: movie?.Genre?.Name || "N/A"
director: movie?.Director?.Name || "N/A"


Required Backend Fixes

Fix 1: JWT Secret Configuration

File: index.js (or wherever passport.js is configured)

Problem: Different secrets used for signing and verifying tokens.

Check:
heroku config:get JWT_SECRET --app myflix-app-711

Ensure:
- Same secret used in both:
  - Login route (jwt.sign)
  - Passport strategy (jwt.verify)
- Secret properly loaded from environment variables

Typical issue:
WRONG - Hardcoded or different secrets:
jwt.sign(user, 'hardcoded-secret')
jwt.verify(token, process.env.JWT_SECRET)

CORRECT - Same secret from environment:
jwt.sign(user, process.env.JWT_SECRET)
jwt.verify(token, process.env.JWT_SECRET)


Fix 2: User Model hashPassword Method

File: models.js (User model)

Problem: Missing or incorrectly exported hashPassword static method.

Required code:
const bcrypt = require('bcrypt');

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

module.exports.User = mongoose.model('User', userSchema);

Usage in index.js:

const Users = require('./models').User;

// In user registration route:
const hashedPassword = Users.hashPassword(req.body.Password);


Fix 3: Database Data Validation

Problem: Some movie documents missing Genre or Director subdocuments.

Solutions:
1. Database cleanup: Ensure all movies have Genre and Director
2. Schema validation: Add required fields to Movie schema
3. API fallback: Return "N/A" if fields missing

Check in MongoDB:
db.movies.find({
  $or: [
    { "Genre": { $exists: false } },
    { "Director": { $exists: false } }
  ]
})


Impact Summary

Issue | Affected Endpoints | Status | Severity
JWT Auth | /movies, /users/:username, all protected routes | Broken | CRITICAL
User Signup | /users (POST) | Broken | HIGH
Movie Data | /movies | Partially Working | MEDIUM
User Login | /login | Working | -


Frontend Workarounds Implemented

While waiting for backend fixes, I've implemented local development mode:

1. Mock Data: Loads 10 movies locally when backend returns 401
2. Local Favorites: Add/remove favorites stored in localStorage
3. Local Profile: Update profile data locally
4. Data Validation: Optional chaining prevents crashes on missing data

All features now work for demonstration and testing purposes.


Next Steps

1. Fix JWT secret - Highest priority (enables all authenticated features)
2. Fix hashPassword - Allows new user creation
3. Validate movie data - Ensures all movies have complete information
4. Test with Postman - Verify all endpoints work
5. Deploy fixes - Push to Heroku and restart dyno


Testing Checklist

After backend fixes, test:
- Login returns valid token
- GET /movies works with token
- POST /users creates new user
- PUT /users/:username updates user
- PUT /users/:username/movies/:movieId adds favorite
- DELETE /users/:username/movies/:movieId removes favorite
- All movies have Genre and Director


Prepared by: James J.  
Frontend Repository: github.com/dodo4545/myFlix-client  
Branch: bootstrap-styling-integration  
Frontend Status: All features working with local bypass
