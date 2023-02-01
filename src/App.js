import { Switch, Route } from "react-router-dom";
import SignupPage from "./pages/signup-page";
import SigninPage from "./pages/signin-page";
import TodoPage from "./pages/todo-page";
import HomePage from "./pages/home-page";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/signup" exact>
          <SignupPage />
        </Route>
        <Route path="/signin" exact>
          <SigninPage />
        </Route>
        <Route path="/todo" exact>
          <TodoPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
