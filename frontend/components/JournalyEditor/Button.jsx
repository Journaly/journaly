const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span {...props} ref={ref} />
  )
);

export default Button;
