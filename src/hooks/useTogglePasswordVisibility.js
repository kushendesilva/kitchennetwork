import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  // password will not be initially visible
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [right, setRight] = useState("eye");
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState("eye");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);

  // function that toggles password visibility on a TextInput component on a password field
  const handlePasswordVisibility = () => {
    if (right === "eye") {
      setRight("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (right === "eye-off") {
      setRight("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  // function that toggles password visibility on a TextInput component on a confirm password field
  const handleConfirmPasswordVisibility = () => {
    if (confirmPasswordIcon === "eye") {
      setConfirmPasswordIcon("eye-off");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === "eye-off") {
      setConfirmPasswordIcon("eye");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  };

  return {
    passwordVisibility,
    handlePasswordVisibility,
    right,
    confirmPasswordVisibility,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
  };
};
