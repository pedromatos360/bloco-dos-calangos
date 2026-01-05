import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type = 'text', ...props }, ref) => {
  const classes = [
    'flex h-10 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <input ref={ref} type={type} className={classes} {...props} />
})

Input.displayName = 'Input'
