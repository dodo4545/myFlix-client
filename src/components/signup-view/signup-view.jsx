import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://myflix-app-711-52fc8f24a6d2.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          setSuccess(true);
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          return response.json().then((error) => {
            console.log("Signup error:", error);
            throw new Error(error.message || "Signup failed. Please try again.");
          });
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        setIsLoading(false);
        setError(error.message || "Unable to connect to server. Please try again.");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mb-4">Sign Up</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          Signup successful! Redirecting to login...
        </div>
      )}
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username (at least 5 characters, alphanumeric only):</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading || success}
          required
          minLength="5"
          pattern="[a-zA-Z0-9]+"
          title="Username must be at least 5 characters and contain only letters and numbers"
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading || success}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || success}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday" className="mb-3">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          disabled={isLoading || success}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100" disabled={isLoading || success}>
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Creating account...
          </>
        ) : success ? (
          'Success!'
        ) : (
          'Sign Up'
        )}
      </Button>
    </Form>
  );
};
