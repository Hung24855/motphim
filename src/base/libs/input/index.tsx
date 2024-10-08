import React from "react";

interface InputProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    field?: any;
    error?: any;
    type?: "password" | "text" | "textarea";
    tranformMessagError?: "right" | "buttom";
    disabled?: boolean;
    [key: string]: any;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    (
        { label, placeholder, required, field, error, type = "text", tranformMessagError = "right", disabled, ...rest },
        ref
    ) => {
        return (
            <div className="mb-3 w-full">
                <div className="flex items-center justify-between">
                    <label className="block min-w-20 text-[#295779]">
                        {label}
                        {required && <span className="text-red-600">*</span>}
                    </label>
                    {error && tranformMessagError === "right" && (
                        <span className="text-sm text-red-600">{error?.message}</span>
                    )}
                </div>

                {type === "textarea" ? (
                    <textarea
                        ref={ref}
                        className="w-full rounded-md bg-[#F0F3F6] px-3 py-2 text-[#295779] placeholder-[#BAC9D4] outline-none"
                        {...field}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={4}
                        {...rest}
                    />
                ) : (
                    <input
                        ref={ref}
                        className="h-10 w-full rounded-md bg-[#F0F3F6] px-3 py-2 text-[#295779]  placeholder-[#BAC9D4] outline-none"
                        placeholder={placeholder}
                        {...field}
                        type={type}
                        disabled={disabled}
                        {...rest}
                    />
                )}
                <div className="w-max">
                    {error && tranformMessagError === "buttom" && (
                        <span className="text-red-600">{error?.message}</span>
                    )}
                </div>
            </div>
        );
    }
);

export default Input;
