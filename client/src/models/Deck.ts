import type { Card } from "./Card";

export interface Deck {
    name: string;
    id: number;
    cards: Card[];
}
