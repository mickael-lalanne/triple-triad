import type { Card } from "./Card";

export interface Deck {
    name: string;
    id?: string;
    cards: number[];
    userId: string;
    createdAt?: string; // ex: 2023-05-26T12:36:46.454Z
    updatedAt?: string; // ex: 2023-05-26T12:36:46.454Z
}
