import type { HTMLAttributes } from "react";

type BrandNameProps = HTMLAttributes<HTMLSpanElement>;

export default function BrandName({ className = "", ...props }: BrandNameProps) {
    return (
        <span className={`brand-name ${className}`.trim()} {...props}>
            PRIDE KITCHEN CATERERS &amp; EVENTS
        </span>
    );
}
