<template>
    <div class="deck-view-container">
        <HomeButton />
        <!-- DECK VIEWER -->
        <DeckViewer
            :userDecks="userDecks"
            @[ETripleTriadEvent.EditDeck]="onEditButtonClick"
            @[ETripleTriadEvent.DeleteDeck]="deleteDeck"
            @[ETripleTriadEvent.AddDeck]="showDeckBuilder = true"
        />
        <!-- DECK BUILDER -->
        <v-dialog
            v-model="showDeckBuilder"
            fullscreen
            :scrim="false"
            transition="dialog-bottom-transition"
        >
            <v-card class="bg-black">
                <v-toolbar dark color="tertiary">
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
    </div>
</template>

<script lang="ts">
import DeckViewer from '@/components/DeckViewer.vue';
import DeckBuilder from '@/components/DeckBuilder.vue';
import { ETripleTriadEvent } from '@/models/Event';
import type { Deck } from '@/models/Deck';
import { DeckService } from '@/services/deckService';
import HomeButton from '@/components/HomeButton.vue';

export default {
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            showDeckBuilder: false as boolean,
            userDecks: [] as Deck[],
            deckToEdit: undefined as undefined | Deck
        };
    },
    components: { DeckViewer, DeckBuilder, HomeButton },
    methods: {
        /**
         * Called when a deck has been created or edited from the Deck Builder
         * Close deckbuilder and save deck in database
         * @param {Deck} newDeck deck to create
         * @param {boolean} edited true if the deck has been created, false if created
         */
        async createDeck(newDeck: Deck, edited: boolean) {
            // TODO: show loading indicator while the base is updating
            if (edited) {
                await DeckService.updateDeck(newDeck);
                const indexToEdit: number = this.userDecks.findIndex(deck => deck.id === newDeck.id);
                this.userDecks[indexToEdit] = newDeck;
            }
            else {
                await DeckService.createDeck(newDeck);
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
        onEditButtonClick(deckToEdit: Deck) {
            this.deckToEdit = deckToEdit;
            this.showDeckBuilder = true;
        },
        /**
         * Called when the delete icon of a deck has been clicked
         * Delete deck client side and server side
         * @param {Deck} deckId id of the deck to delete
         */
        async deleteDeck(deckId: string) {
            // TODO: show loading indicator while the base is updating
            await DeckService.deleteDeck(deckId);
            this.userDecks = this.userDecks.filter(deck => deck.id !== deckId);
        }
    }
};
</script>


<style scoped lang="scss">
.deck-view-container {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.builder-title {
    text-align: center;
    margin: 0;
    text-transform: uppercase;
    font-size: 28px;
    font-family: 'Roboto', sans-serif;
    color: white;
    font-weight: 500;
}
</style>
<style lang="scss">
.builder-title .v-toolbar-title__placeholder {
    font-weight: 400;
}
</style>