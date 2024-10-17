import React from 'react';
import { useController, Control } from 'react-hook-form';

interface ImageInputProps {
    name: string;
    control: Control<any>;
}

const ImageInputCustom: React.FC<ImageInputProps> = ({ name, control }) => {
    const {
        field: { onChange, onBlur, value },
        fieldState: { error },
    } = useController({ name, control });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            onChange(files[0]); // Store the image URL
        } else {
            onChange(null); // Reset if no file selected
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                Upload Image
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                onBlur={onBlur}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {value && (
                <img src={URL.createObjectURL(value)} alt="Selected" className="mt-2 w-full h-auto border rounded-md" />
            )}
            {error && <span className="text-red-600 text-sm">{error.message}</span>}
        </div>
    );
};

export default ImageInputCustom;