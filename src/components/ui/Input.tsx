import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

function Input({
    className,
    ...props
}: IInputProps) {
    return (
        <input
            className={cn(
                "input",
                className
            )}
            {...props}
        />
    );
}

export default Input;