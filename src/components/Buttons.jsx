//Create customisable buttons
const Button = (
    {
        children, //allows nested JSX component to be passed
        onClick, // for event handlers
        type = "button", 
        variant = "primary",
        fullWidth = false,
        disabled = false,
        className = ""
    }
) => {
     const baseStyles = "px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90 disabled:opacity-50",
    secondary: "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50",
    ghost: "bg-transparent text-orange-600 hover:underline disabled:opacity-50"
  };

  const widthStyle = fullWidth ? "w-full" : "";
  
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;