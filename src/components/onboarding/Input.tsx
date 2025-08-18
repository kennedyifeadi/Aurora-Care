import type { InputProps } from "../../types/inputType";


export const Input = ({ name, value, onChange, placeholder = "", type = "text" }: InputProps) => {
  return (
    <input
      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d4ed6]"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      autoComplete="off"
    />
  );
}
