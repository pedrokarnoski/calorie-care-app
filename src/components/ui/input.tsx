import { cn } from '@/lib/utils'
import * as React from 'react'
import { TextInput, type TextInputProps } from 'react-native'
import { Label } from './label'
import { Text } from './text'

interface CustomTextInputProps extends TextInputProps {
  label: string
  errorMessage?: string
}

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  CustomTextInputProps
>(({ className, placeholderClassName, label, errorMessage, ...props }, ref) => {
  return (
    <>
      <Label className="font-normal py-1" nativeID="name">
        {label}
      </Label>
      <TextInput
        ref={ref}
        className={cn(
          'mb-2 web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
      {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}
    </>
  )
})

Input.displayName = 'Input'

export { Input }
