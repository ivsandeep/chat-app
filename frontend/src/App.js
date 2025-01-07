import React from "react";
import './App.css';
import { Route, Switch } from "react-router-dom"
import HomePage from "./components/HomePage"
import ChatPage from "./components/ChatPage"
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' component={HomePage} exact></Route>
        <Route path='/chats' component={ChatPage}></Route>

      </Switch>

    </div>
  );
}

export default App;
