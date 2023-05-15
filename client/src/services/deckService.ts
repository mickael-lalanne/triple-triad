import { ONE_STAR_CARDS, TWO_STAR_CARDS, THREE_STAR_CARDS, FOUR_STAR_CARDS, FIVE_STAR_CARDS, type Card } from "@/models/Card";

export class DeckService {
    /**
     * A deck consists of one 1 star, one 2 stars, one 3 stars, one 4 stars and one 5 stars card
     * @returns {Card[]} a random deck}
     */
    static generateRandomDeck(): Card[] {
        const oneStarCard: Card = ONE_STAR_CARDS[Math.floor(Math.random() * ONE_STAR_CARDS.length)];
        const twoStarCard: Card = TWO_STAR_CARDS[Math.floor(Math.random() * TWO_STAR_CARDS.length)];
        const threeStarCard: Card = THREE_STAR_CARDS[Math.floor(Math.random() * THREE_STAR_CARDS.length)];
        const fourStarCard: Card = FOUR_STAR_CARDS[Math.floor(Math.random() * FOUR_STAR_CARDS.length)];
        const fiveStarCard: Card = FIVE_STAR_CARDS[Math.floor(Math.random() * FIVE_STAR_CARDS.length)];
        
        return [oneStarCard, twoStarCard, threeStarCard, fourStarCard, fiveStarCard];
    }
}
