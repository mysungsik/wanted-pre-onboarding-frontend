import SigninForm from "../components/signin/signin-form";
import { useHistory } from "react-router-dom";

const SigninPage = () => {
  const history = useHistory();
  const isLogedIn = window.localStorage.getItem("access_token");

  if (isLogedIn) {
    history.replace("/todo");
  }

  return (
    <div>
      <SigninForm />
    </div>
  );
};

export default SigninPage;
