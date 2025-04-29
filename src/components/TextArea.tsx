import React from 'react';
type TextAreaProps = {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
  rows?: number;
};
const TextArea = ({
  label,
  name,
  placeholder = '',
  value,
  onChange,
  required = false,
  error,
  rows = 6
}: TextAreaProps) => {
  return <div className="mb-4">
      <label htmlFor={name} className="block text-[#3D0C02] font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} className={`w-full px-4 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-[#AF6E51]'} focus:outline-none focus:ring-2 focus:ring-[#843722] focus:border-transparent bg-white`} />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>;
};
export default TextArea;