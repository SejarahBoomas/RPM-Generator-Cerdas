
import React from 'react';
import { FormData, ProfileDimension, ProfileDimensionKey } from '../types';
import { LEARNING_METHODS } from '../constants';
import Card from './Card';
import Checkbox from './Checkbox';

interface InputFormProps {
  formData: FormData;
  profileDimensions: ProfileDimension[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (dimension: ProfileDimensionKey) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  formData,
  profileDimensions,
  onInputChange,
  onCheckboxChange,
  onSubmit,
  isLoading,
}) => {
  const renderInputField = (id: string, label: string, type: string = 'text', value: string | number, required: boolean = true) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onInputChange}
        required={required}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
    </div>
  );

  return (
    <Card>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Masukkan Detail Pembelajaran</h2>

        {renderInputField('identitas', 'Identitas Mata Pelajaran', 'text', formData.identitas)}
        {renderInputField('jumlah_jam', 'Jumlah Jam Pelajaran (JP)', 'number', formData.jumlah_jam)}
        
        <div>
          <label htmlFor="tujuan" className="block text-sm font-medium text-slate-700 mb-1">Tujuan Pembelajaran</label>
          <textarea
            id="tujuan"
            name="tujuan"
            value={formData.tujuan}
            onChange={onInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        
        {renderInputField('topik', 'Topik Pembelajaran', 'text', formData.topik)}
        
        <div>
          <label htmlFor="metode" className="block text-sm font-medium text-slate-700 mb-1">Metode Pembelajaran</label>
          <select
            id="metode"
            name="metode"
            value={formData.metode}
            onChange={onInputChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            {LEARNING_METHODS.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        
        {renderInputField('digital', 'Pemanfaatan Digital', 'text', formData.digital)}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Dimensi Profil Lulusan</label>
          <div className="grid grid-cols-2 gap-3">
            {profileDimensions.map(dim => (
              <Checkbox
                key={dim.key}
                id={dim.key}
                label={dim.label}
                checked={formData.dimensi.includes(dim.key)}
                onChange={() => onCheckboxChange(dim.key)}
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? 'Sedang Memproses...' : 'Buat Rencana Pembelajaran'}
        </button>
      </div>
    </Card>
  );
};

export default InputForm;
