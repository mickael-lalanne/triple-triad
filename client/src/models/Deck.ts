import type { Card } from "./Card";

export interface Deck {
    name: string;
    id?: string;
    cards: number[];
    userId: string;
}
