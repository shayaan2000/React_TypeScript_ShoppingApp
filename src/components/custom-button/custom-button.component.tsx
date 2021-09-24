import React from "react";
import "./custom-button.styles.scss";

interface ICustomButtonProps {
  children?: React.ReactNode;
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
  children,
  isGoogleSignIn,
  inverted,
  onClick,
  type,
}) => (
  <button
    onClick={onClick}
    className={`custom-button ${isGoogleSignIn ? "google-sign-in" : ""} ${
      inverted ? "inverted" : ""
    }`}
    type={type}
  >
    {children}
  </button>
);

export default CustomButton;
