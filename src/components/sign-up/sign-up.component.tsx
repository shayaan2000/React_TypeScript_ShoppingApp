import React, { useState } from "react";
import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { useDispatch } from "react-redux";
import { signUpStartAsync } from "../../redux/user/user.actions";

interface ISignUpCredentials {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<ISignUpCredentials>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = credentials;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    // passwords should match
    if (password !== confirmPassword) {
      alert("Passwords dont match");
      return;
    }

    dispatch(signUpStartAsync(email, password, displayName));
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;

// Removed from in component
/* 
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    await createUserProfileDocument(user, displayName);

      // emptying form
      setCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err: unknown) {
      console.log("Error in signup", err);
    } */
