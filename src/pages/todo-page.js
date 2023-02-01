import TodoForm from "../components/todo/todo-form";
import { useHistory } from "react-router-dom";

const TodoPage = () => {
  const history = useHistory();
  const isLogedIn = window.localStorage.getItem("access_token");

  if (!isLogedIn) {
    history.replace("/signin");
  }
  return (
    <div>
      <TodoForm access_token={isLogedIn} />
    </div>
  );
};

export default TodoPage;
