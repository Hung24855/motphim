interface InputProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    field: any;
    error?: any;
    type?: string;
}

const Input = ({ label, placeholder, required, field, error, type = "text" }: InputProps) => {
    return (
        <div className="mb-3 w-full">
            <div className="flex items-center justify-between">
                <label className="block min-w-20 text-[#6888A1]">
                    {label}
                    {required && <span className="text-red-600">*</span>}
                </label>
                {error && <span className="text-red-600">{error?.message}</span>}
            </div>

            <input
                className="h-9 w-full rounded-md bg-[#F0F3F6] px-2 py-1 text-[#6888A1] placeholder-[#BAC9D4] outline-none"
                placeholder={placeholder}
                {...field}
                type={type}
            />
        </div>
    );
};

export default Input;
