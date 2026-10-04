import React, { useState } from 'react'

type UseActive = [
    active: boolean,
    activeHandler: () => void,
    UnActiveHandler: () => void,
    toggleHandler: () => void,
]

function useActive(initial: boolean) {

    const [active, setActive] =
        useState<boolean>(initial);

    const activeHandler: () => void =
        () => {
            setActive(true);
        }

    const UnActiveHandler: () => void =
        () => {
            setActive(false);
        }

    const toggleHandler = () => {
        setActive(prev => !prev)
    }

    return [
        active,
        activeHandler,
        UnActiveHandler,
        toggleHandler
    ] as UseActive
}

export default useActive