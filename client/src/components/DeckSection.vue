<template>
    <div
        class="deck-section-container"
        :class="{
            'deck-section-container-hidden': !show,
            'deck-section-container-visible': show,
        }"
    >
        <DeckViewer
            v-if="!showDeckBuilder"
            class="deck-viewer"
            :class="{ 'deck-viewer-closing': showViewerCloseAnimation }"
            @[ETripleTriadEvent.EditDeck]="editDeck"
            @[ETripleTriadEvent.AddDeck]="closeViewerAndShowBuilder"
            @[ETripleTriadEvent.CloseDeckSection]="$emit(ETripleTriadEvent.CloseDeckSection)"
        />
        <DeckBuilder
            v-else
            class="deck-builder"
            :class="{ 'deck-builder-closing': showBuilderCloseAnimation }"
            :deckToEdit="deckToEdit"
            @[ETripleTriadEvent.DeckCreated]="closeDeckBuilder"
            @[ETripleTriadEvent.CancelDeck]="closeDeckBuilder"
        />
    </div>
</template>

<script lang="ts">
import { ETripleTriadEvent } from '@/models/Event';
import DeckBuilder from '@/components/DeckBuilder.vue';
import DeckViewer from '@/components/deck/DeckViewer.vue';
import type { Deck } from '@/models/Deck';

export default {
    components: { DeckBuilder, DeckViewer },
    props: {
        show: { type: Boolean, default: () => false }
    },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            deckToEdit: undefined as undefined | Deck,
            showDeckBuilder: false as boolean,
            showViewerCloseAnimation: false as boolean,
            showBuilderCloseAnimation: false as boolean
        };
    },
    methods: {
        /**
         * Called when the edit button of a deck has been clicked
         * Open the Deck Builder to edit the deck
         * @param {Deck} deckToEdit deck to edit
         */
        editDeck(deckToEdit: Deck) {
            this.deckToEdit = deckToEdit;
            this.closeViewerAndShowBuilder();
        },
        /**
         * Called when the user want to edit or create a deck
         * Close the Viewer with an animation before showing the Builder
         */
        closeViewerAndShowBuilder() {
            this.showViewerCloseAnimation = true;
            setTimeout(() => {
                this.showDeckBuilder = true;
                this.showViewerCloseAnimation = false;
            }, 700);
        },
        /**
         * Called when:
         * - a deck has been created or edited in Deck Builder
         * - the edition in Deck Builder has been canceled
         * Close the Builder with an animation before showing the Viewer
         */
        closeDeckBuilder() {
            this.showBuilderCloseAnimation = true;
            this.deckToEdit = undefined;
            setTimeout(() => {
                this.showDeckBuilder = false;
                this.showBuilderCloseAnimation = false;
            }, 800);
        }
    }
};
</script>

<style scoped lang="scss">
.deck-section-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    cursor: default;
    border-left: 3px solid rgb(var(--v-theme-secondary));
    overflow: hidden;
}

.deck-section-container-hidden {
    opacity: 0;
}
.deck-section-container-visible {
    opacity: 1;
    transform: translateX(-100%);
}
.deck-viewer,
.deck-builder {
    animation-name: in-animation;
    animation-duration: 1s;
    animation-delay: 0;
}
.deck-viewer-closing,
.deck-builder-closing {
    animation-name: out-animation;
}

@keyframes in-animation {
    from {
        margin-left: 100%;
        opacity: 0;
    }
    to {
        margin-left: 0%;
        opacity: 1;
    }
}
@keyframes out-animation {
    from {
        margin-left: 0%;
        opacity: 1;
    }
    to {
        margin-left: 100%;
        opacity: 0;
    }
}
</style>
