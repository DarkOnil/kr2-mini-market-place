import type { ImgHTMLAttributes } from 'react'

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string
}

export function ImageWithFallback({ fallbackSrc, onError, ...props }: ImageWithFallbackProps) {
  return (
    <img
      {...props}
      onError={(event) => {
        event.currentTarget.src = fallbackSrc
        onError?.(event)
      }}
    />
  )
}
