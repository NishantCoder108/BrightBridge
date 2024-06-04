import React, { memo } from "react";

// Define the props for the button
interface ButtonProps {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    variant?: "primary" | "secondary" | "gradient";
    size?: "small" | "medium" | "large";
    className?: string;
    // Add other props as needed
}

const Button: React.FC<ButtonProps> = memo(
    ({
        children,
        onClick,
        variant = "primary",
        size = "medium",
        className,
    }) => {
        // Class names for different variants and sizes
        const variantClasses = {
            primary: "bg-blue-500 hover:bg-blue-700 text-white",
            secondary: "bg-gray-300 hover:bg-gray-400 text-black",
            gradient:
                "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white",
        };

        const sizeClasses = {
            small: "text-sm px-2 py-1",
            medium: "text-md px-3 py-1",
            large: "text-lg px-6 py-3",
        };

        return (
            <button
                onClick={onClick}
                className={`rounded ${variantClasses[variant]} ${sizeClasses[size]} ${className} focus:outline-none`}
            >
                {children}
            </button>
        );
    }
);

export default Button;
