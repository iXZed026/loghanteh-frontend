import React, { useState } from 'react'

function useInput(
    initialValue: string,
) {

    const [input, setInput] =
        useState<string>(initialValue);

    function changeInputValue(e: any): void {
        setInput(e.target.value)
    }

    function clearInputValue(): void {
        setInput("")
    }

    return [input, setInput, changeInputValue, clearInputValue] as any

}

export default useInput