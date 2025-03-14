import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import "./Button.css";

const buttonVariants = ({ variant, size }) => {
  const baseStyles = "button-base";
  const variantStyles = {
    default: "button-default",
    destructive: "button-destructive",
    outline: "button-outline",
    secondary: "button-secondary",
    ghost: "button-ghost",
    link: "button-link",
  }[variant];

  const sizeStyles = {
    default: "button-size-default",
    sm: "button-size-sm",
    lg: "button-size-lg",
    icon: "button-size-icon",
  }[size];

  return `${baseStyles} ${variantStyles} ${sizeStyles}`;
};

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={`${buttonVariants({ variant, size })} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };