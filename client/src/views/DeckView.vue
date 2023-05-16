<template>
    <main>
        <div class="deck-view-container">
            <!-- DECK VIEWER -->
            <DeckViewer
                class="deck-viewer"
                :userDecks="userDecks"
                @[ETripleTriadEvent.EditDeck]="editDeck"
                @[ETripleTriadEvent.DeleteDeck]="deleteDeck"
            />
            <!-- ADD DECK BUTTON -->
            <div class="add-deck-container d-flex align-center justify-center" @click="showDeckBuilder = true">
                <v-icon
                    class="remove-icon"
                    :size="50"
                    icon="mdi-plus-circle-outline"
                    color="white"
                ></v-icon>
            </div>
        </div>
        <!-- DECK BUILDER -->
        <v-dialog
            v-model="showDeckBuilder"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
        >
        <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title class="builder-title">
                        {{ $vuetify.locale.t('$vuetify.deck.createTitle') }}
                    </v-toolbar-title>
                </v-toolbar>
                <DeckBuilder
                    :deckLength="userDecks.length"
                    :deckToEdit="deckToEdit"
                    @[ETripleTriadEvent.CreateDeck]="createDeck"
                    @[ETripleTriadEvent.CancelDeck]="showDeckBuilder = false"
                />
            </v-card>
        </v-dialog>
    </main>
</template>

<script lang="ts">
import DeckViewer from '@/components/DeckViewer.vue';
import DeckBuilder from '@/components/DeckBuilder.vue';
import { ETripleTriadEvent } from '@/models/Event';
import type { Deck } from '@/models/Deck';
import { DeckService } from '@/services/deckService';

const tmpDecks: Deck[] = [
    {
        name: 'tmp_deck_1',
        id: 0,
        cards: DeckService.generateRandomDeck()
    },
    {
        name: 'tmp_deck_2',
        id: 1,
        cards: DeckService.generateRandomDeck()
    },
    {
        name: 'tmp_deck_3',
        id: 2,
        cards: DeckService.generateRandomDeck()
    },
    {
        name: 'tmp_deck_4',
        id: 3,
        cards: DeckService.generateRandomDeck()
    },
    {
        name: 'tmp_deck_5',
        id: 4,
        cards: DeckService.generateRandomDeck()
    }
];

export default {
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            showDeckBuilder: false as boolean,
            userDecks: tmpDecks as Deck[],
            deckToEdit: undefined as undefined | Deck
        };
    },
    components: { DeckViewer, DeckBuilder },
    methods: {
        /**
         * Called when a deck has been created or edited from the Deck Builder
         * Close deckbuilder and save deck in database
         * @param {Deck} newDeck deck to create
         * @param {boolean} edited true if the deck has been created, false if created
         */
        createDeck(newDeck: Deck, edited: boolean) {
            if (edited) {
                const indexToEdit: number = this.userDecks.findIndex(deck => deck.id === newDeck.id);
                this.userDecks[indexToEdit] = newDeck;
                // TODO: save in database
            }
            else {
                this.userDecks.push(newDeck);
                // TODO: save in database
            }
            this.showDeckBuilder = false;
        },
        /**
         * Called when the edit icon of a deck has been clicked
         * Open the Deck Builder to edit the deck
         * @param {Deck} deckToEdit deck to edit
         */
        editDeck(deckToEdit: Deck) {
            this.deckToEdit = deckToEdit;
            this.showDeckBuilder = true;
        },
        /**
         * Called when the delete icon of a deck has been clicked
         * Delete deck client side and server side
         * @param {Deck} deckToEdit deck to delete
         */
        deleteDeck(deckToDelete: Deck) {
             this.userDecks = this.userDecks.filter(deck => deck.id !== deckToDelete.id);
            // TODO: delete in database
        }
    }
};
</script>


<style scoped lang="scss">
.deck-view-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.deck-viewer {
    flex-grow: 1;
}
.add-deck-container {
    cursor: pointer;
    background-color: grey;
    color: white;
    width: 50px;
    height: 100vh;
    transition: all .2s ease-in-out;
    &:hover {

       width: 75px;
    }
}
.builder-title {
    text-align: center;
    margin: 0;
    text-decoration: underline;
}
</style>
