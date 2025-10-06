import React from "react";

interface IFormProps {
  children: React.ReactNode;
  header: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<IFormProps> = ({ children, header, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h1 className="text-center text-2xl font-semibold mb-4">{header} Form</h1>
      {children}
    </form>
  );
};

export default Form;
