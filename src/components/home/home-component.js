import { useHistory } from "react-router-dom";
import styles from "./home-component.module.css";

const HomeComponent = () => {
  const history = useHistory();

  return (
    <div className={styles.homeComponent}>
      <h1> 홈페이지 </h1>
      <button className="default__button" onClick={() => history.push("/todo")}>
        TodoList 로 이동
      </button>
    </div>
  );
};

export default HomeComponent;
