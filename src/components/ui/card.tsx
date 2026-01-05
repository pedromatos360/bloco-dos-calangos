import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

type DivProps = HTMLAttributes<HTMLDivElement>
type HeadingProps = HTMLAttributes<HTMLHeadingElement>

export const Card = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    const classes = ['rounded-xl border border-gray-800', className]
      .filter(Boolean)
      .join(' ')
    return <div ref={ref} className={classes} {...props} />
  },
)

export const CardHeader = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    const classes = ['flex flex-col gap-1.5 p-6', className]
      .filter(Boolean)
      .join(' ')
    return <div ref={ref} className={classes} {...props} />
  },
)

export const CardContent = forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    const classes = ['p-6', className].filter(Boolean).join(' ')
    return <div ref={ref} className={classes} {...props} />
  },
)

export const CardTitle = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, ...props }, ref) => {
    const classes = ['text-lg font-semibold leading-none tracking-tight', className]
      .filter(Boolean)
      .join(' ')
    return <h3 ref={ref} className={classes} {...props} />
  },
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardContent.displayName = 'CardContent'
CardTitle.displayName = 'CardTitle'
