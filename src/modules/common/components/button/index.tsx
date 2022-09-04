import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import React from "react"

type ButtonProps = {
  isLoading?: boolean
  variant?: "primary" | "secondary" | "cart"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  children,
  className,
  isLoading = false,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "w-full uppercase flex items-center justify-center min-h-[42px]  py-[10px] text-small-regular  transition-colors duration-200 disabled:opacity-50",
        {
          "cart-btn tracking-wider px-2 ":
            variant === "primary",
          "text-gray-900 bg-transparent border-gray-920 hover:bg-gray-100 px-2 rounded-1" :
            variant === "secondary",
            "cart-btn  px-2 tracking-wider py-3 text-base":
            variant === "cart",
            
        },
        className
      )}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
