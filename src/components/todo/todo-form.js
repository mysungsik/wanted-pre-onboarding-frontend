import { useEffect, useState } from "react";
import styles from "./todo-form.module.css";

const TodoForm = (props) => {
  const { access_token } = props;
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editMode, setEditMode] = useState();

  useEffect(() => {
    getTodosHandler();
  }, []);

  const getTodosHandler = async () => {
    const response = await fetch(
      "https://pre-onboarding-selection-task.shop/todos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      setTodoList(responseData);
    }
  };

  const createTodosHandler = async (todo) => {
    await fetch("https://pre-onboarding-selection-task.shop/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        todo: todo,
      }),
    });

    setNewTodo("");
    getTodosHandler();
  };

  const updateTodosHandler = async (id, todo, isCompleted) => {
    await fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        todo,
        isCompleted,
      }),
    });

    getTodosHandler();
  };

  const deleteTodosHandler = async (id) => {
    await fetch(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    getTodosHandler();
  };

  const allTodoList = todoList.map((item) => (
    <li key={item.id} className={styles.todo__list}>
      <label>
        <input
          type="checkbox"
          defaultChecked={item.isCompleted ? "checked" : ""}
          onChange={(e) =>
            updateTodosHandler(item.id, item.todo, e.target.checked)
          }
        />
        {editMode === item.id ? (
          <input
            className={styles.todo__editInput}
            data-testid="modify-input"
            onChange={(e) => setEditTodo(e.target.value)}
          />
        ) : (
          <span>{item.todo}</span>
        )}
      </label>

      {editMode === item.id ? (
        <div>
          <button
            className="todo__button__ok"
            data-testid="submit-button"
            onClick={() => {
              updateTodosHandler(item.id, editTodo, item.isCompleted);
              setEditMode(null);
            }}
          >
            제출
          </button>
          <button
            className="todo__button__cancel"
            data-testid="cancel-button"
            onClick={() => {
              setEditMode(null);
              setEditTodo("");
            }}
          >
            취소
          </button>
        </div>
      ) : (
        <div>
          <button
            className="todo__button__ok"
            data-testid="modify-button"
            onClick={() => setEditMode(item.id)}
          >
            수정
          </button>
          <button
            className="todo__button__cancel"
            data-testid="delete-button"
            onClick={() => deleteTodosHandler(item.id)}
          >
            삭제
          </button>
        </div>
      )}
      <hr className="default__line" />
    </li>
  ));

  return (
    <div className={styles.todo}>
      <h1> 할일 </h1>
      <div className={styles.todo__inputDiv}>
        <input
          data-testid="new-todo-input"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <button
          className="todo__button"
          data-testid="new-todo-add-button"
          onClick={() => createTodosHandler(newTodo)}
        >
          추가
        </button>
      </div>
      <ul className={styles.todo__lists}>{allTodoList}</ul>
    </div>
  );
};

export default TodoForm;
