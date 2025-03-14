import * as React from "react";
import "./Badge.css";

const badgeVariants = ({ variant }) => {
  const baseStyles = "badge-base";
  const variantStyles = {
    default: "badge-default",
    secondary: "badge-secondary",
    destructive: "badge-destructive",
    outline: "badge-outline",
  }[variant];

  return `${baseStyles} ${variantStyles}`;
};

function Badge({ className, variant, ...props }) {
  return (
    <div
      className={`${badgeVariants({ variant })} ${className}`}
      {...props}
    />
  );
}

export { Badge, badgeVariants };