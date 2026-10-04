"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getLocalStorageItem,
    removeFromLocalStorage,
    saveToLocalStorage,
} from "@/lib/utils/localStorage";

const PAYMENT_DATA_STORAGE_KEY =
    "loghanteh-payment-data";

export type TicketPaymentType =
    | "museum-tour"
    | "events-and-courses"
    | "cinema-and-theater";

export interface SelectedPaymentSeat {
    seatId: number;
    seatNum: number;
    row: number;
}

export interface TicketPaymentData {
    type: TicketPaymentType;

    ticket: {
        sessionId: number;
        eventId: number;
        name: string;
        startAt: string;
        durationM: number;
        capacity?: number;
        price: number | null;
    };

    hall?: {
        hallName: string;
        seatsNumbs: SelectedPaymentSeat[];
    };

    quantity: number;
}

interface TicketPaymentContextType {
    paymentData: TicketPaymentData | null;

    setPaymentData: (
        data: TicketPaymentData,
    ) => void;

    clearPaymentData: () => void;

    isReady: boolean;
}

const TicketPaymentContext =
    createContext<
        TicketPaymentContextType | undefined
    >(undefined);

interface TicketPaymentProviderProps {
    children: ReactNode;
}

export function TicketPaymentProvider({
    children,
}: TicketPaymentProviderProps) {

    const [
        paymentData,
        setPaymentDataState,
    ] = useState<TicketPaymentData | null>(
        null,
    );

    const [
        isReady,
        setIsReady,
    ] = useState(false);

    useEffect(() => {

        const storedPaymentData =
            getLocalStorageItem<TicketPaymentData>(
                PAYMENT_DATA_STORAGE_KEY,
            );

        if (storedPaymentData) {
            setPaymentDataState(
                storedPaymentData,
            );
        }

        setIsReady(true);

    }, []);

    const setPaymentData = (
        data: TicketPaymentData,
    ) => {

        setPaymentDataState(data);

        saveToLocalStorage(
            PAYMENT_DATA_STORAGE_KEY,
            data,
        );
    };

    const clearPaymentData = () => {

        setPaymentDataState(null);

        removeFromLocalStorage(
            PAYMENT_DATA_STORAGE_KEY,
        );
    };

    return (
        <TicketPaymentContext.Provider
            value={{
                paymentData,
                setPaymentData,
                clearPaymentData,
                isReady,
            }}
        >
            {children}
        </TicketPaymentContext.Provider>
    );
}

export function useTicketPayment() {

    const context =
        useContext(
            TicketPaymentContext,
        );

    if (!context) {
        throw new Error(
            "useTicketPayment must be used within TicketPaymentProvider",
        );
    }

    return context;
}