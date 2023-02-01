import SignupForm from "../components/signup/signup-form"
import { useHistory } from "react-router-dom";

const SignupPage = () => {
  const history = useHistory();
  const isLogedIn = window.localStorage.getItem("access_token");

  if (isLogedIn) {
    history.replace("/todo");
  }

  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
