interface IHallsData {
    id: number;

    hallName: {
        en: string;
        fa: string;
    };

    seats: {
        id: number;
        seatNum: number;
        row: number;
    }[];
}

export const halls: IHallsData[] = [
    {
        id: 1,

        hallName: {
            en: "Farokhi Yazdi",
            fa: "فرخی یزدی",
        },

        seats: [
            // Row 1 - 7 seats
            { id: 1, seatNum: 1, row: 1 },
            { id: 2, seatNum: 2, row: 1 },
            { id: 3, seatNum: 3, row: 1 },
            { id: 4, seatNum: 4, row: 1 },
            { id: 5, seatNum: 5, row: 1 },
            { id: 6, seatNum: 6, row: 1 },
            { id: 7, seatNum: 7, row: 1 },

            // Row 2 - 10 seats
            { id: 8, seatNum: 1, row: 2 },
            { id: 9, seatNum: 2, row: 2 },
            { id: 10, seatNum: 3, row: 2 },
            { id: 11, seatNum: 4, row: 2 },
            { id: 12, seatNum: 5, row: 2 },
            { id: 13, seatNum: 6, row: 2 },
            { id: 14, seatNum: 7, row: 2 },
            { id: 15, seatNum: 8, row: 2 },
            { id: 16, seatNum: 9, row: 2 },
            { id: 17, seatNum: 10, row: 2 },

            // Row 3 - 11 seats
            { id: 18, seatNum: 1, row: 3 },
            { id: 19, seatNum: 2, row: 3 },
            { id: 20, seatNum: 3, row: 3 },
            { id: 21, seatNum: 4, row: 3 },
            { id: 22, seatNum: 5, row: 3 },
            { id: 23, seatNum: 6, row: 3 },
            { id: 24, seatNum: 7, row: 3 },
            { id: 25, seatNum: 8, row: 3 },
            { id: 26, seatNum: 9, row: 3 },
            { id: 27, seatNum: 10, row: 3 },
            { id: 28, seatNum: 11, row: 3 },

            // Row 4 - 10 seats
            { id: 29, seatNum: 1, row: 4 },
            { id: 30, seatNum: 2, row: 4 },
            { id: 31, seatNum: 3, row: 4 },
            { id: 32, seatNum: 4, row: 4 },
            { id: 33, seatNum: 5, row: 4 },
            { id: 34, seatNum: 6, row: 4 },
            { id: 35, seatNum: 7, row: 4 },
            { id: 36, seatNum: 8, row: 4 },
            { id: 37, seatNum: 9, row: 4 },
            { id: 38, seatNum: 10, row: 4 },

            // Row 5 - 11 seats
            { id: 39, seatNum: 1, row: 5 },
            { id: 40, seatNum: 2, row: 5 },
            { id: 41, seatNum: 3, row: 5 },
            { id: 42, seatNum: 4, row: 5 },
            { id: 43, seatNum: 5, row: 5 },
            { id: 44, seatNum: 6, row: 5 },
            { id: 45, seatNum: 7, row: 5 },
            { id: 46, seatNum: 8, row: 5 },
            { id: 47, seatNum: 9, row: 5 },
            { id: 48, seatNum: 10, row: 5 },
            { id: 49, seatNum: 11, row: 5 },

            // Row 6 - 10 seats
            { id: 50, seatNum: 1, row: 6 },
            { id: 51, seatNum: 2, row: 6 },
            { id: 52, seatNum: 3, row: 6 },
            { id: 53, seatNum: 4, row: 6 },
            { id: 54, seatNum: 5, row: 6 },
            { id: 55, seatNum: 6, row: 6 },
            { id: 56, seatNum: 7, row: 6 },
            { id: 57, seatNum: 8, row: 6 },
            { id: 58, seatNum: 9, row: 6 },
            { id: 59, seatNum: 10, row: 6 },

            // Row 7 - 11 seats
            { id: 60, seatNum: 1, row: 7 },
            { id: 61, seatNum: 2, row: 7 },
            { id: 62, seatNum: 3, row: 7 },
            { id: 63, seatNum: 4, row: 7 },
            { id: 64, seatNum: 5, row: 7 },
            { id: 65, seatNum: 6, row: 7 },
            { id: 66, seatNum: 7, row: 7 },
            { id: 67, seatNum: 8, row: 7 },
            { id: 68, seatNum: 9, row: 7 },
            { id: 69, seatNum: 10, row: 7 },
            { id: 70, seatNum: 11, row: 7 },

            // Row 8 - 10 seats
            { id: 71, seatNum: 1, row: 8 },
            { id: 72, seatNum: 2, row: 8 },
            { id: 73, seatNum: 3, row: 8 },
            { id: 74, seatNum: 4, row: 8 },
            { id: 75, seatNum: 5, row: 8 },
            { id: 76, seatNum: 6, row: 8 },
            { id: 77, seatNum: 7, row: 8 },
            { id: 78, seatNum: 8, row: 8 },
            { id: 79, seatNum: 9, row: 8 },
            { id: 80, seatNum: 10, row: 8 },

            // Row 9 - 11 seats
            { id: 81, seatNum: 1, row: 9 },
            { id: 82, seatNum: 2, row: 9 },
            { id: 83, seatNum: 3, row: 9 },
            { id: 84, seatNum: 4, row: 9 },
            { id: 85, seatNum: 5, row: 9 },
            { id: 86, seatNum: 6, row: 9 },
            { id: 87, seatNum: 7, row: 9 },
            { id: 88, seatNum: 8, row: 9 },
            { id: 89, seatNum: 9, row: 9 },
            { id: 90, seatNum: 10, row: 9 },
            { id: 91, seatNum: 11, row: 9 },

            // Row 10 - 10 seats
            { id: 92, seatNum: 1, row: 10 },
            { id: 93, seatNum: 2, row: 10 },
            { id: 94, seatNum: 3, row: 10 },
            { id: 95, seatNum: 4, row: 10 },
            { id: 96, seatNum: 5, row: 10 },
            { id: 97, seatNum: 6, row: 10 },
            { id: 98, seatNum: 7, row: 10 },
            { id: 99, seatNum: 8, row: 10 },
            { id: 100, seatNum: 9, row: 10 },
            { id: 101, seatNum: 10, row: 10 },

            // Row 11 - 11 seats
            { id: 102, seatNum: 1, row: 11 },
            { id: 103, seatNum: 2, row: 11 },
            { id: 104, seatNum: 3, row: 11 },
            { id: 105, seatNum: 4, row: 11 },
            { id: 106, seatNum: 5, row: 11 },
            { id: 107, seatNum: 6, row: 11 },
            { id: 108, seatNum: 7, row: 11 },
            { id: 109, seatNum: 8, row: 11 },
            { id: 110, seatNum: 9, row: 11 },
            { id: 111, seatNum: 10, row: 11 },
            { id: 112, seatNum: 11, row: 11 },

            // Row 12 - 10 seats
            { id: 113, seatNum: 1, row: 12 },
            { id: 114, seatNum: 2, row: 12 },
            { id: 115, seatNum: 3, row: 12 },
            { id: 116, seatNum: 4, row: 12 },
            { id: 117, seatNum: 5, row: 12 },
            { id: 118, seatNum: 6, row: 12 },
            { id: 119, seatNum: 7, row: 12 },
            { id: 120, seatNum: 8, row: 12 },
            { id: 121, seatNum: 9, row: 12 },
            { id: 122, seatNum: 10, row: 12 },

            // Row 13 - 7 seats
            { id: 123, seatNum: 1, row: 13 },
            { id: 124, seatNum: 2, row: 13 },
            { id: 125, seatNum: 3, row: 13 },
            { id: 126, seatNum: 4, row: 13 },
            { id: 127, seatNum: 5, row: 13 },
            { id: 128, seatNum: 6, row: 13 },
            { id: 129, seatNum: 7, row: 13 },
        ],
    },
];