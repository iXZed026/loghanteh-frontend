"use client";

import { useLocale } from "next-intl";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface IAppLinkProps extends Omit<LinkProps, "href"> {
    children?: ReactNode;
    href: string;
    className?: string;
}

function AppLink({
    children,
    href,
    className,
    ...props
}: IAppLinkProps) {
    const locale = useLocale();

    return (
        <Link
            href={`/${locale}/${href}`}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
}

export default AppLink;