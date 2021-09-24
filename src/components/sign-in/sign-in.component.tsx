import React, { useState } from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {
  signInStartAsync,
  signInGoogleStartAsync,
} from "../../redux/user/user.actions";
import { useDispatch } from "react-redux";

interface ISignInCredentials {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<ISignInCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const { email, password } = credentials;
    dispatch(signInStartAsync(email, password));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={credentials.email}
          handleChange={handleChange} //handleChange is our own custom made property in component
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={credentials.password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton
            onClick={() => dispatch(signInGoogleStartAsync())}
            isGoogleSignIn
            type="button"
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
