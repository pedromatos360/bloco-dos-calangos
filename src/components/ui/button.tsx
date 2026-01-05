import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'default' | 'outline' | 'ghost'
type ButtonSize = 'default' | 'lg' | 'icon'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50'

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-lime-500 text-black hover:bg-lime-400',
  outline: 'border border-lime-500 text-lime-400 hover:bg-lime-500/10',
  ghost: 'text-white hover:bg-white/10',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2',
  lg: 'h-12 px-6 text-base',
  icon: 'h-10 w-10',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', type, ...props }, ref) => {
    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return <button ref={ref} type={type ?? 'button'} className={classes} {...props} />
  },
)

Button.displayName = 'Button'
