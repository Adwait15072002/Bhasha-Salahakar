//Handles inputs with validation states
const Input = ({ 
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error = "",
  disabled = false,
  className = ""
}) => {
  const baseStyles = "w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200";
  const normalStyles = "border-gray-300 focus:border-orange-500 focus:outline-none";
  const errorStyles = "border-red-500 focus:border-red-600 focus:outline-none";
  const disabledStyles = "bg-gray-100 cursor-not-allowed";

  const inputStyles = error 
    ? errorStyles 
    : disabled 
    ? disabledStyles 
    : normalStyles;

  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`${baseStyles} ${inputStyles} ${className}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
