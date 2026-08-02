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
  const baseStyles = "w-full px-4 py-3 rounded-lg border-2 transition-colors duration-200 bg-background text-foreground";
  const normalStyles = "border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";
  const errorStyles = "border-destructive focus:border-destructive focus:outline-none";
  const disabledStyles = "bg-muted cursor-not-allowed opacity-70";

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
        <p className="text-destructive text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
