import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface User {
  id: number;
  name: string;
}

const getUsers = async () => {
  const response = await fetch("http://localhost:8000/api/users/1");
  const data = await response.json();
  return data;
};
function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {user && (
          <div>
            <h2>↓backendから取得したデータ</h2>
            <p>Name: {user.name}</p>
            <p>Id: {user.id}</p>
          </div>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
