import React from "react";

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    readonly ?: boolean;
}

const InputField = ({label, type, value, onChange, placeholder, required, readonly}: InputFieldProps) => {
    return (
        <label className="input input-bordered flex items-center grow">
            <span className="inline">{label}</span>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className="grow p-2"
                placeholder={placeholder}
                required={required}
                readOnly={readonly}
            />
        </label>
    );
}

export default InputField;