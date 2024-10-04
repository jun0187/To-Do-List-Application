export const usernameValidation = (s: string) => {
  return /^(?=.{5,20}$)[a-zA-Z0-9_]+$/.test(s);
};

export const passwordValidation = (s: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
    s,
  );
};
