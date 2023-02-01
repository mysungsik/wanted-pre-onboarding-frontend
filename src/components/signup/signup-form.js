import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./signup-form.module.css";

const SignupForm = () => {
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

  const signupHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(
      "https://pre-onboarding-selection-task.shop/auth/signup",
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
      history.push("/signin");
    }
  };

  return (
    <div className={styles.signup}>
      <h1> 회원가입</h1>
      <form onSubmit={signupHandler}>
        <div className={styles.signup__inputDiv}>
          <label htmlFor="email"> 이메일을 입력하세요</label>
          <input
            type={"email"}
            id="email"
            data-testid="email-input"
            onChange={(e) => setInputedEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.signup__inputDiv}>
          <label htmlFor="password"> 패스워드를 입력하세요</label>
          <input
            type={"password"}
            id="password"
            data-testid="password-input"
            onChange={(e) => setInputedPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.signup__buttonDiv}>
          <button
            className="default__button"
            data-testid="signup-button"
            disabled={active ? "" : "disabled"}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
