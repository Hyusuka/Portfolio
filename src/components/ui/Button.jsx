/**
 * Neobrutalism Button component
 * Based on neobrutalism.dev Button style
 *
 * Usage:
 *   <Button>Click me</Button>
 *   <Button variant="purple" size="lg">Big button</Button>
 *   <Button as="a" href="https://example.com">Link</Button>
 */

const variantStyles = {
  default: { background: '#88aaee' },
  yellow: { background: '#FDE68A' },
  green: { background: '#A7F3D0' },
  pink: { background: '#FBCFE8' },
  orange: { background: '#FED7AA' },
  blue: { background: '#BFDBFE' },
  purple: { background: '#DDD6FE' },
  red: { background: '#FECACA' },
  cyan: { background: '#A5F3FC' },
  dark: { background: '#000', color: '#fff' },
  outline: { background: 'transparent' },
};

const sizeStyles = {
  sm: { padding: '8px 16px', fontSize: '12px' },
  md: { padding: '10px 20px', fontSize: '14px' },
  lg: { padding: '14px 28px', fontSize: '16px' },
  icon: { padding: '10px', fontSize: '16px', minWidth: '44px', justifyContent: 'center' },
};

export default function Button({
  children,
  variant = 'default',
  size = 'md',
  as: Component = 'button',
  className = '',
  style = {},
  ...props
}) {
  const vStyle = variantStyles[variant] || variantStyles.default;
  const sStyle = sizeStyles[size] || sizeStyles.md;

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    border: '3px solid #000',
    boxShadow: '4px 4px 0px #000',
    cursor: 'pointer',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
    textDecoration: 'none',
    color: vStyle.color || '#000',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    ...vStyle,
    ...sStyle,
    ...style,
  };

  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = 'translate(2px, 2px)';
    e.currentTarget.style.boxShadow = '2px 2px 0px #000';
  };

  const handleMouseUp = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.boxShadow = '4px 4px 0px #000';
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translate(-2px, -2px)';
    e.currentTarget.style.boxShadow = '6px 6px 0px #000';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.boxShadow = '4px 4px 0px #000';
  };

  return (
    <Component
      className={`neo-button ${className}`}
      style={baseStyle}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Component>
  );
}
