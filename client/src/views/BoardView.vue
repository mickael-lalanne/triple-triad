<template>
    <main>
        <!-- BOARD -->
        <div class="board-container">
            <div v-for="col in 3" :key="col" class="board-column d-flex justify-center">
                <div v-for="cell in 3" :key="cell" class="board-cell">
                    <!-- Card in cell -->
                    <div v-if="hasCard(col, cell)" class="board-cell-card">
                        <div>Name: {{ getCard(col, cell).name }}</div>
                        <div>topValue: {{ getCard(col, cell).topValue }}</div>
                        <div>bottomValue: {{ getCard(col, cell).bottomValue }}</div>
                        <div>leftValue: {{ getCard(col, cell).leftValue }}</div>
                        <div>rightValue: {{ getCard(col, cell).rightValue }}</div>
                    </div>

                    <!-- No card in cell (drop zone) -->
                    <draggable
                        v-else
                        class="board-cell-drop-zone"
                        :group="{ name: 'card', pull: false, put: true }"
                        @add="onCardDropped($event, col, cell)"
                    >
                        <template #item="{ element }">
                            <div class="card">{{ element.name }}</div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>

        <!-- DECK -->
        <draggable
            v-model="tmpDeck"
            :group="{ name: 'card', pull: 'clone', put: false }"
            @start="drag = true"
            @end="drag = false"
            item-key="id"
            class="deck-container"
        >
            <template #item="{ element }">
                <div
                    class="deck-card"
                    :class="{ 'deck-card-disabled': cardsPlayed[playerTurn].includes(element.id) }"
                >
                    {{ element.name }}
                </div>
            </template>
        </draggable>
    </main>
</template>

<script lang="ts">
import type { Card } from '@/models/Card';
import { tmpDeck1 } from '@/models/Card';
import draggable from 'vuedraggable';

export default {
    data() {
        return {
            tmpDeck: tmpDeck1 as Card[],
            playerTurn: 0 as 0 | 1,
            drag: false as boolean,
            boardCards: [] as Card[][],
            cardsPlayed: [[], []] as number[][] // id of all the played cards for each player
        };
    },
    components: {
        draggable
    },
    methods: {
        /**
         * Called when a card has been played
         * Place it into the board, check values and change player turn
         * @param {SortableEvent} sortableEvent 
         * @param {number} col the column where the card has been dropped
         * @param {number} cell the cell where the card has been dropped
         */
        onCardDropped(sortableEvent: any, col: number, cell: number): void {
            // First, place the card in the board
            const cardDropped: Card = this.tmpDeck[sortableEvent.oldIndex];
    
            if (!this.boardCards[col]) {
                this.boardCards[col] = []
            };

            this.boardCards[col][cell] = cardDropped;
            this.cardsPlayed[this.playerTurn].push(cardDropped.id);

            // Now, check the card values

            // Finally, change the player turn
            this.changePlayerTurn();
        },
        /**
         * Get the card for the specified location
         * @param {number} col collumn where the card is placed
         * @param {number} cell where the card is placed
         * @returns {Card} the card object
         */
        getCard(col: number, cell: number): Card {
            console.log('#getCard#');
            console.log(this.boardCards[col] && this.boardCards[col][cell]);
            return this.boardCards[col] && this.boardCards[col][cell];
        },
        /**
         * Check if a card is placed in the given location
         * @param {number} col collumn to search
         * @param {number} cell cell to search
         * @returns {boolean} true if a card is in the cell
         */
        hasCard(col: number, cell: number): boolean {
            return this.boardCards[col] && !!this.boardCards[col][cell];
        },
        changePlayerTurn() {
            this.playerTurn = this.playerTurn ? 0 : 1;
        },
    }
};
</script>

<style scoped>
.board-cell {
    background-color: yellow;
    height: 150px;
    width: 150px;
    margin: 7px;
    position: relative;
}
.board-cell-drop-zone {
    position: absolute;
    background-color: red;
    height: 100%;
    width: 100%;
    top: 0;
}
.deck-container {
    display: flex;
    margin-top: 50px;
}
.deck-card {
    background-color: green;
    width: 150px;
    height: 150px;
    cursor: grab;
}
.deck-card-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
}
</style>
