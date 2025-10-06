// utils/validators.ts

export const isPasswordStrong = (password: string): boolean => {
  const lowercase = /[a-z]/;
  const uppercase = /[A-Z]/;
  const number = /[0-9]/;

  return lowercase.test(password) && uppercase.test(password) && number.test(password);
};
