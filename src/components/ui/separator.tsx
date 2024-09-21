import * as SeparatorPrimitive from '@rn-primitives/separator'
import * as React from 'react'

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { orientation = 'horizontal', decorative = true, className, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={`
        ${orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full'}
        bg-border ${className}
      `}
      {...props}
    />
  )
)

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
