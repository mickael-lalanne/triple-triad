<template>
    <main>
        <!-- BOARD -->
        <div class="board-container">
            <div v-for="line in 3" :key="line" class="board-line d-flex justify-center">
                <div v-for="cell in 3" :key="cell" class="board-cell">
                    <!-- Card in cell -->
                    <div
                        v-if="hasCard(line, cell)"
                        class="board-cell-card"
                        :class="{
                            'board-cell-card-player-0': !getCardOwner(line, cell),
                            'board-cell-card-player-1': getCardOwner(line, cell)
                        }"
                    >
                        <div>Name: {{ getCard(line, cell).name }}</div>
                        <div>topValue: {{ getCard(line, cell).topValue }}</div>
                        <div>bottomValue: {{ getCard(line, cell).bottomValue }}</div>
                        <div>leftValue: {{ getCard(line, cell).leftValue }}</div>
                        <div>rightValue: {{ getCard(line, cell).rightValue }}</div>
                    </div>

                    <!-- No card in cell (drop zone) -->
                    <draggable
                        v-else
                        class="board-cell-drop-zone"
                        :group="{ name: 'card', pull: false, put: true }"
                        @add="onCardDropped($event, line, cell)"
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
                    <div>{{ element.name }}</div>
                    <div>topValue: {{ element.topValue }}</div>
                    <div>bottomValue: {{ element.bottomValue }}</div>
                    <div>leftValue: {{ element.leftValue }}</div>
                    <div>rightValue: {{ element.rightValue }}</div>
                </div>
            </template>
        </draggable>
    </main>
</template>

<script lang="ts">
import type { Card } from '@/models/Card';
import { tmpDeck1 } from '@/models/Card';
import draggable from 'vuedraggable';

interface BoardCell {
    card: Card;
    player:  0 | 1; // which player owns the card
}

export default {
    data() {
        return {
            tmpDeck: tmpDeck1 as Card[],
            playerTurn: 0 as 0 | 1,
            drag: false as boolean,
            boardCards: [] as BoardCell[][],
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
         * @param {number} line the line where the card has been dropped
         * @param {number} cell the cell where the card has been dropped
         */
        onCardDropped(sortableEvent: any, line: number, cell: number): void {
            // First, place the card in the board
            const cardDropped: Card = this.tmpDeck[sortableEvent.oldIndex];
    
            if (!this.boardCards[line]) {
                this.boardCards[line] = []
            };

            this.boardCards[line][cell] = { card: cardDropped, player: this.playerTurn };
            this.cardsPlayed[this.playerTurn].push(cardDropped.id);

            // Now, check the card values
            this.checkCardValues(cardDropped, line, cell);

            // Finally, change the player turn
            this.changePlayerTurn();
        },
        /**
         * Called when a card has been played
         * Check the value of the cards arround it
         * @param {Card} card the card that was just played 
         * @param {number} line the line where the card has been dropped
         * @param {number} cell the cell where the card has been dropped
         */
        checkCardValues(card: Card, line: number, cell: number): void {
            // CHECK TOP VALUE
            if (
                line !== 1 && // don't check if no card can be placed on top
                this.boardCards[line - 1] &&
                this.boardCards[line - 1][cell] && // don't check if no card is placed on top yet
                this.boardCards[line - 1][cell].player !== this.playerTurn // don't check if the card on top is already owned by the player
            ) {
                const cardAtTop: Card = this.boardCards[line - 1][cell].card;
                if (cardAtTop.bottomValue < card.topValue) {
                    this.boardCards[line - 1][cell].player = this.playerTurn;
                }
            }
            // CHECK BOTTOM VALUE
            if (
                line !== 3 && // don't check if no card can be placed on bottom
                this.boardCards[line + 1] &&
                this.boardCards[line + 1][cell] && // don't check if no card is placed on bottom yet
                this.boardCards[line + 1][cell].player !== this.playerTurn // don't check if the card on bottom is already owned by the player
            ) {
                const cardAtBottom: Card = this.boardCards[line - 1][cell].card;
                if (cardAtBottom.topValue < card.bottomValue) {
                    this.boardCards[line + 1][cell].player = this.playerTurn;
                }
            }
            // CHECK LEFT VALUE
            if (
                cell !== 1 && // don't check if no card can be placed on left
                this.boardCards[line] &&
                this.boardCards[line][cell - 1] && // don't check if no card is placed on left yet
                this.boardCards[line][cell - 1].player !== this.playerTurn // don't check if the card on left is already owned by the player
            ) {
                const cardAtLeft: Card = this.boardCards[line][cell - 1].card;
                if (cardAtLeft.rightValue < card.leftValue) {
                    this.boardCards[line][cell - 1].player = this.playerTurn;
                }
            }
            // CHECK RIGHT VALUE
            if (
                cell !== 3 && // don't check if no card can be placed on right
                this.boardCards[line] &&
                this.boardCards[line][cell + 1] && // don't check if no card is placed on right yet
                this.boardCards[line][cell + 1].player !== this.playerTurn // don't check if the card on right is already owned by the player
            ) {
                const cardAtRight: Card = this.boardCards[line][cell + 1].card;
                if (cardAtRight.leftValue < card.rightValue) {
                    this.boardCards[line][cell + 1].player = this.playerTurn;
                }
            }
        },
        /**
         * Get the card for a specific location
         * @param {number} line line where the card is placed
         * @param {number} cell cell where the card is placed
         * @returns {Card} the card object
         */
        getCard(line: number, cell: number): Card {
            return this.boardCards[line] && this.boardCards[line][cell].card;
        },
        /**
         * Get the owner of the card for a specific location
         * @param {number} line line where the card is placed
         * @param {number} cell cell where the card is placed
         * @returns {0 | 1} the player owner of the card
         */
        getCardOwner(line: number, cell: number): 0 | 1 {
            return this.boardCards[line] && this.boardCards[line][cell].player;
        },
        /**
         * Check if a card is placed in the given location
         * @param {number} line line to search
         * @param {number} cell cell to search
         * @returns {boolean} true if a card is in the cell
         */
        hasCard(line: number, cell: number): boolean {
            return this.boardCards[line] && !!this.boardCards[line][cell];
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
.board-cell-card {
    width: 100%;
    height: 100%;
}
.board-cell-card-player-0 {
    box-shadow: 0 0 4pt 3pt blue;
}
.board-cell-card-player-1 {
    box-shadow: 0 0 4pt 3pt green;
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
