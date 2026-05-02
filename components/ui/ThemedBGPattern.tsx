"use client"

import { useTheme } from "next-themes"
import { BGPattern } from "./bg-pattern"
import { useEffect, useState } from "react"

type BGVariantType = 'dots' | 'diagonal-stripes' | 'grid' | 'horizontal-lines' | 'vertical-lines' | 'checkerboard'
type BGMaskType = 'fade-center' | 'fade-edges' | 'fade-top' | 'fade-bottom' | 'fade-left' | 'fade-right' | 'fade-x' | 'fade-y' | 'none'

type ThemedBGPatternProps = {
    variant?: BGVariantType
    mask?: BGMaskType
    size?: number
    className?: string
    style?: React.CSSProperties
} & React.ComponentProps<'div'>

export function ThemedBGPattern({
    variant = 'grid',
    mask = 'none',
    size = 24,
    className,
    style,
    ...props
}: ThemedBGPatternProps) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const fill = mounted && resolvedTheme === 'dark'
        ? 'rgba(96, 37, 213, 0.15)'
        : 'rgba(96, 37, 213, 0.08)'

    return (
        <BGPattern
            variant={variant}
            mask={mask}
            size={size}
            fill={fill}
            className={className}
            style={style}
            {...props}
        />
    )
}