import { fetcher } from "../fetcher";

export interface MuseumTourSessionResponse {
    sessionId: number;
    eventId: number;
    name: string;
    primaryDescription: string;
    secondaryDescription: string;
    startAt: string;
    durationM: number;
    capacity: number;
    price: number | null;
}

export interface MuseumTourResponse {
    data: MuseumTourSessionResponse[];
    message: string;
    success: boolean;
}

export async function getMuseumTour(
    date: string,
    locale: string,
): Promise<MuseumTourResponse> {

    return fetcher<MuseumTourResponse>(
        `/tickets/museum-tour?date=${encodeURIComponent(date)}`,
        {
            method: "GET",
        },
        locale,
    );
}