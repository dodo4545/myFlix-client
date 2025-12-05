import { useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

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
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          return response.json().then((error) => {
            console.log("Signup error:", error);
            alert("Signup failed: " + (error.message || JSON.stringify(error)));
          });
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        alert("Signup failed: " + error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username (at least 5 characters, alphanumeric only):
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
          pattern="[a-zA-Z0-9]+"
          title="Username must be at least 5 characters and contain only letters and numbers"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};
