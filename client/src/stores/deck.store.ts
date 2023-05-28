import type { Deck } from '@/models/Deck';
import { defineStore } from 'pinia';

interface DeckStoreState {
    userDecks: Deck[];
}

interface DeckStoreActions {
    initDecks(userDecks: Deck[]): void;
    addDeck(deckToAdd: Deck): void;
    updateDeck(userDecks: Deck): void;
    deleteDeck(deckId: string): void;
    reset(): void;
}

interface DeckStoreGetters {
    getUserDecks(state: DeckStoreState): Deck[];
}

export interface DeckStore extends DeckStoreState, DeckStoreActions, DeckStoreGetters {};

export const useDeckStore = defineStore('decks', {
    state: (): DeckStoreState => ({
        userDecks: []
    }),
    getters: {
        getUserDecks(state): Deck[] {
            // Sort decks by creation date
            return state.userDecks.sort((a, b) => {
                return new Date(a.createdAt!).valueOf() - new Date(b.createdAt!).valueOf()
            });
        },
    },
    actions: {
        /**
         * Called when the user decks have ben retrieve from the api
         * @param {Deck[]} userDecks decks to save in store
         */
        initDecks(userDecks: Deck[]) {
            this.userDecks = userDecks;
        },
        /**
         * Add a deck to the store
         * @param {Deck} deckToAdd 
         */
        addDeck(deckToAdd: Deck) {
            this.userDecks.push(deckToAdd);
        },
        /**
         * Update a deck in the store
         * @param {Deck} deckToUpdate 
         */
        updateDeck(deckToUpdate: Deck) {
            const deckIndex: number = this.userDecks.findIndex(deck => deck.id === deckToUpdate.id);
            if (deckIndex !== -1) {
                this.userDecks[deckIndex] = deckToUpdate;
            }
        },
        /**
         * Delete a deck from the store
         * @param {string} deckId id of the deck to delete
         */
        deleteDeck(deckId: string) {
            this.userDecks = this.userDecks.filter(deck => deck.id !== deckId);
        },
        /**
         * Called when the user logs out
         */
        reset() {
            this.userDecks = [];
        }
    }
});
