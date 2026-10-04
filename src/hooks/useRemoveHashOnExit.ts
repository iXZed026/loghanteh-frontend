"use client";

import { useEffect } from "react";

function useRemoveHashOnExit(
    elementId: string,
    options?: {
        threshold?: number;
    }
) {
    useEffect(() => {
        const element = document.getElementById(elementId);

        if (!element) return;

        const threshold = options?.threshold ?? 0.1;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    const currentHash = window.location.hash;

                    if (currentHash === `#${elementId}`) {
                        window.history.replaceState(
                            null,
                            "",
                            window.location.pathname +
                            window.location.search
                        );
                    }
                }
            },
            {
                threshold,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [elementId, options?.threshold]);
}

export default useRemoveHashOnExit;