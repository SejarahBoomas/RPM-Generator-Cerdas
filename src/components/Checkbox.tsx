import React from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer group">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 ${checked ? 'bg-indigo-600 border-indigo-600' : 'bg-slate-100 border-slate-300 group-hover:border-indigo-400'}`}></div>
        {checked && (
          <svg className="absolute top-1/2 left-1/2 w-4 h-4 text-white -translate-y-1/2 -translate-x-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm font-medium text-slate-700 select-none">{label}</span>
    </label>
  );
};

export default Checkbox;
