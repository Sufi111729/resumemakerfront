export function Button({ variant = "primary", size = "md", className = "", ...props }) {
  const variants = {
    primary: "bg-ink text-white hover:bg-ink/90",
    secondary: "bg-white text-ink border border-ink/10 hover:border-ink/30",
    ghost: "bg-transparent text-ink hover:bg-ink/5",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base"
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl font-medium transition ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
