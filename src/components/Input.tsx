import React from 'react';
type InputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
};
const Input = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  error
}: InputProps) => {
  return <div className="mb-4">
      <label htmlFor={name} className="block text-[#3D0C02] font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} className={`w-full px-4 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-[#AF6E51]'} focus:outline-none focus:ring-2 focus:ring-[#843722] focus:border-transparent bg-white`} />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>;
};
export default Input;