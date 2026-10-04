import React, { useEffect, useState } from 'react'

function useScroll(initialState: number = 50) {

    const [isScrolled, setIsScrolled] =
        useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > initialState);
        }

        window.addEventListener("scroll", handleScroll)

        handleScroll()

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    }, [initialState])


    return isScrolled as boolean

}

export default useScroll