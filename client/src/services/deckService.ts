import { ONE_STAR_CARDS, TWO_STAR_CARDS, THREE_STAR_CARDS, FOUR_STAR_CARDS, FIVE_STAR_CARDS, type Card, ALL_CARDS } from "@/models/Card";
import type { Deck } from "@/models/Deck";
import type { CreateDeckMutation, DeleteDeckMutation, ListDecksQuery, UpdateDeckMutation } from '@/API';
import { API } from 'aws-amplify';
import { type GraphQLQuery } from '@aws-amplify/api';
import * as mutations from '@/graphql/mutations';
import * as queries from '@/graphql/queries';
import { AuthenticatorService } from "./authenticatorService";
import { type DeckStore } from "@/stores/deck.store";

export class DeckService {
    public static deckStore: DeckStore;

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

    /**
     * Resolve the cards corresponding to the ids (because we store only cards ids in database)
     * @param {number[]} cardsIds array that contains ids of the cards 
     * @returns {Card[]} cards object array
     */
    static resolveDeckCards(cardsIds: number[]): Card[] {
        return cardsIds
            .map(id => ALL_CARDS.find(card => card.id === id) as Card)
            // Sort cards by stars
            .sort((a, b) => a.stars - b.stars);
    }

    /**
     * Call API to create deck in base
     * @param {Deck} deck the deck to create 
     * @returns {Deck} the deck which has been created in database
     */
    static async createDeck(deck: Deck): Promise<Deck> {
        const deckToCreate: Deck = {
            ...deck,
            userId: AuthenticatorService.USER_ID
        };

        const deckCreated: Deck = await API.graphql<GraphQLQuery<CreateDeckMutation>>({ 
            query: mutations.createDeck, 
            variables: { input: deckToCreate }
        }) as Deck;

        // Add created deck in store
        this.deckStore.addDeck(deckCreated);

        return deckCreated;
    }

    /**
     * Call API to delete a deck in base
     * @param {string} deckId id of the deck to delete 
     */
    static async deleteDeck(deckId: string): Promise<void> {
        await API.graphql<GraphQLQuery<DeleteDeckMutation>>({ 
            query: mutations.deleteDeck, 
            variables: { input: { id: deckId } }
        });

        // Delete deck in store
        this.deckStore.deleteDeck(deckId);
    }

    /**
     * Call API to edit a deck in base
     * @param {string} deckToEdit the deck to edit
     * @returns {Deck} the deck which has been edited in database
     */
    static async updateDeck(deckToEdit: Deck): Promise<Deck> {
        const apiResponse = await API.graphql<GraphQLQuery<UpdateDeckMutation>>({ 
            query: mutations.updateDeck, 
            variables: { input: deckToEdit }
        });

        const updateDeck: Deck = apiResponse.data?.updateDeck as Deck;

        // Save updated deck in store
        this.deckStore.updateDeck(updateDeck);

        return updateDeck;
    }

    /**
     * Call API to get decks of the authenticated user
     * @returns {Deck[]} decks of the authenticated user
     */
    static async getUserDecks(): Promise<Deck[]> {
        const apiResponse = await API.graphql<GraphQLQuery<ListDecksQuery>>({
            query: queries.listDecks,
            variables: {
                // Get only deck of the user
                filter: {
                    userId: { eq: AuthenticatorService.USER_ID }
                }
            }
        });

        const userDekcs: Deck[] = apiResponse && apiResponse.data && apiResponse.data.listDecks && apiResponse.data.listDecks.items
            ? apiResponse.data.listDecks.items as unknown as Deck[]
            : [];
        
        // Save decks in store
        this.deckStore.initDecks(userDekcs);

        return userDekcs;
    }
}
