import { Slot } from '@radix-ui/react-slot'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ShimmerButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>

export function ShimmerButton({
  asChild,
  children,
  className = '',
  ...props
}: ShimmerButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component className={`shimmer-button ${className}`} {...props}>
      <span className="shimmer-button__shine" aria-hidden="true" />
      <span className="shimmer-button__content">{children}</span>
    </Component>
  )
}
