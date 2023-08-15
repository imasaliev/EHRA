import { useState, useEffect } from "react";
import { userContext } from "../App";
import { api } from "../utilities";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function LogInPage() {
  const { appUser, setAppUser } = useOutletContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(email);
    console.log(password);
  }, [email, password]);

  const logIn = async (e) => {
    e.preventDefault();
    let response = await api
      .post("api/users/login/", {
        email: email,
        password: password,
      })
      .catch((err) => {
        alert("incorrect login");
      });

    let user = response.data.user;
    let token = response.data.token;
    setAppUser(user);
    localStorage.setItem("token", token);
    navigate("/home");
  };

  return (
    <form onSubmit={(e) => logIn(e)}>
      <h5>Log In</h5>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
