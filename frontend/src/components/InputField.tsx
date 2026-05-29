import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, className = '', ...rest }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id} className="mb-2 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        {...rest}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
      />
    </div>
  );
};

export default InputField;
