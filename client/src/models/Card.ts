export interface Card {
    name: string;
    id: number;
    topValue: number;
    bottomValue: number;
    leftValue: number;
    rightValue: number;
}

export const tmpDeck1: Card[] = [
    {
        name: 'tmp_name_1',
        id: 0,
        topValue: 1,
        bottomValue: 2,
        leftValue: 3,
        rightValue: 4
    },
    {
        name: 'tmp_name_2',
        id: 1,
        topValue: 4,
        bottomValue: 5,
        leftValue: 6,
        rightValue: 7
    },
    {
        name: 'tmp_name_3',
        id: 2,
        topValue: 7,
        bottomValue: 8,
        leftValue: 9,
        rightValue: 10
    },
    {
        name: 'tmp_name_4',
        id: 3,
        topValue: 10,
        bottomValue: 11,
        leftValue: 12,
        rightValue: 13
    },
    {
        name: 'tmp_name_5',
        id: 4,
        topValue: 13,
        bottomValue: 14,
        leftValue: 15,
        rightValue: 16
    }
];
