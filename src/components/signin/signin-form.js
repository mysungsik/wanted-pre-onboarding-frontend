import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./signin-form.module.css";

// test12323@test.com ,12345678

const SigninForm = () => {
  const [inputedEmail, setInputedEmail] = useState("");
  const [inputedPassword, setInputedPassword] = useState("");
  const [active, setActive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    signValidation(inputedEmail, inputedPassword);
  }, [inputedEmail, inputedPassword]);

  const signValidation = (email, password) => {
    if (email.includes("@") && password.length >= 8) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  const signinHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://pre-onboarding-selection-task.shop/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputedEmail,
          password: inputedPassword,
        }),
      }
    );

    if (!response.ok) {
      return;
    } else {
      const responseData = await response.json();
      window.localStorage.setItem("access_token", responseData.access_token);
      history.push("/todo");
    }
  };

  return (
    <div className={styles.signin}>
      <h1> 로그인</h1>
      <form onSubmit={signinHandler} className={styles.signin__form}>
        <div className={styles.signin__inputDiv}>
          <label htmlFor="email"> 이메일을 입력하세요</label>
          <input
            type={"email"}
            id="email"
            data-testid="email-input"
            onChange={(e) => setInputedEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.signin__inputDiv}>
          <label htmlFor="password"> 패스워드를 입력하세요</label>
          <input
            type={"password"}
            id="password"
            data-testid="password-input"
            onChange={(e) => setInputedPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.signin__buttonDiv}>
          <button
            className="default__button"
            data-testid="signin-button"
            disabled={active ? "" : "disabled"}
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
