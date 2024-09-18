interface InputProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    field?: any;
    error?: any;
    type?: "password" | "text" | "textarea";
    tranformMessagError?: "right" | "buttom";
    [key: string]: any;
}

const Input = ({
    label,
    placeholder,
    required,
    field,
    error,
    type = "text",
    tranformMessagError = "right",
    ...rest
}: InputProps) => {
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
                    className="w-full rounded-md border border-blue-200 p-2"
                    {...field}
                    placeholder={placeholder}
                    rows={4}
                    {...rest}
                />
            ) : (
                <input
                    className="h-9 w-full rounded-md bg-[#F0F3F6] px-2 py-1 text-[#295779] placeholder-[#BAC9D4] outline-none"
                    placeholder={placeholder}
                    {...field}
                    type={type}
                    {...rest}
                />
            )}
            <div className="w-max">
                {error && tranformMessagError === "buttom" && <span className="text-red-600">{error?.message}</span>}
            </div>
        </div>
    );
};

export default Input;
