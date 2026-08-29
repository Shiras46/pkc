
"use client";

import React, { ReactNode } from "react";

interface ButtonProps {
    id?: string;
    title: string;
    leftIcon?: ReactNode;
    containerClass?: string;
}

const Button: React.FC<ButtonProps> = ({ id, title, leftIcon, containerClass }) => {
    return (
        <button
            id={id}
            className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black ${containerClass}`}
            style={{
                backgroundColor: '#fde047', // yellow-300
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem', // gap-1
                // Add default styling since tailwind might be missing
                border: 'none',
                outline: 'none',
            }}
        >
            {leftIcon && (
                <span aria-hidden="true" className="inline-flex">
                    {leftIcon}
                </span>
            )}

            <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                    {title}
                </div>
                <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                    {title}
                </div>
            </span>
        </button>
    );
};

export default Button;
