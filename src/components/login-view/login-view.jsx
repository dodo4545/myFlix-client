import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://myflix-app-711-52fc8f24a6d2.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || 'Login failed');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login response: ", data);
        setIsLoading(false);
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((e) => {
        console.error("Login error:", e);
        setIsLoading(false);
        setError(e.message || "Unable to connect to server. Please try again.");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-4">Login</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </Button>
    </Form>
  );
};