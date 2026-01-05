import type { ButtonHTMLAttributes } from 'react'

type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({
  checked = false,
  onCheckedChange,
  className,
  disabled,
  ...props
}: SwitchProps) {
  const classes = [
    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
    checked ? 'bg-lime-500' : 'bg-gray-600',
    disabled ? 'opacity-50' : 'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const thumbClasses = [
    'inline-block h-5 w-5 transform rounded-full bg-white transition-transform',
    checked ? 'translate-x-5' : 'translate-x-1',
  ].join(' ')

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={classes}
      {...props}
    >
      <span className={thumbClasses} />
    </button>
  )
}
