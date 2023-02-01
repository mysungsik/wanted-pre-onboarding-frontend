import styles from "./layout.module.css";
import { useHistory } from "react-router-dom";

const Layout = (props) => {
  const history = useHistory();
  const isLogedIn = window.localStorage.getItem("access_token");

  const logoutHandler = () => {
    window.localStorage.removeItem("access_token");
    window.location.replace("/");
  };

  return (
    <header>
      <ul className={styles.header}>
        <li className="todo__button" onClick={() => history.push("/todo")}>
          TodoList
        </li>
        {isLogedIn ? (
          <>
            <li className="todo__button__cancel" onClick={logoutHandler}>
              로그아웃
            </li>
          </>
        ) : (
          <>
            <li
              className="todo__button__cancel"
              onClick={() => history.push("/signin")}
            >
              로그인
            </li>
            <li
              className="todo__button__cancel"
              onClick={() => history.push("/signup")}
            >
              회원가입
            </li>
          </>
        )}
      </ul>
      {props.children}
    </header>
  );
};

export default Layout;
