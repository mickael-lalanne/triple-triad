<template>
    <main class="board-view-container">
        <HomeButton @[ETripleTriadEvent.BackHome]="$emit(ETripleTriadEvent.BackHome)"/>
        <!-- BOARD -->
        <div class="board-container" :style="`margin-top: -${HOME_HEADER_HEIGHT}px`">
            <div v-for="line in 3" :key="line" class="board-line d-flex justify-center">
                <div v-for="cell in 3" :key="cell" class="board-cell">
                    <!-- Card in cell -->
                    <div
                        v-if="hasCard(line, cell)"
                        class="board-cell-card d-flex align-center justify-center"
                        :class="{
                            'board-cell-card-player-1': !getCardOwner(line, cell),
                            'board-cell-card-player-2': getCardOwner(line, cell)
                        }"
                    >
                        <img :src="'/images/cards/' + getCard(line, cell).source"/>
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

        <div class="footer-spacer"></div>

        <div
            class="footer-container"
            :class="{
                'player-1-footer-container': !playerTurn,
                'player-2-footer-container': playerTurn
            }"
        >
            <!-- Player turn indicator -->
            <div
                class="player-turn-container"
            >
                <div class="player-turn-content">
                    {{ $vuetify.locale.t('$vuetify.board.playersTurn', playerTurn ? 2 : 1) }}
                </div>
            </div>

            <!-- DECK -->
            <draggable
                :list="playerTurn ? player2Cards : player1Cards"
                :group="{ name: 'card', pull: 'clone', put: false }"
                @start="drag = true"
                @end="drag = false"
                :sort="false"
                item-key="id"
                class="deck-container"
                :class="{
                    'player-1-deck': !playerTurn,
                    'player-2-deck': playerTurn
                }"
            >
                <template #item="{ element }">
                    <div
                        class="deck-card d-flex align-center justify-center"
                        :class="{ 'deck-card-disabled': cardsPlayed[playerTurn].includes(element.id) }"
                    >
                        <img :src="'/images/cards/' + element.source"/>
                    </div>
                </template>
            </draggable>
        </div>

        <!-- GAME ENDED POPUP -->
        <v-dialog
            transition="dialog-bottom-transition"
            v-model="gameEnded"
            :width="600"
        >
            <template v-slot:default="{}">
                <v-card
                    class="winner-popup-container"
                    :class="{
                        'winner-1-popup-container': winner === 1,
                        'winner-2-popup-container': winner === 2
                    }">
                    <v-toolbar
                        :color="winner === 1 ? 'primary' : 'secondary'"
                        :title="$vuetify.locale.t('$vuetify.board.gameEnded')"
                    ></v-toolbar>
                    <v-card-text>
                        <div class="winner-text">{{ $vuetify.locale.t('$vuetify.board.playerWin', winner) }}</div>
                    </v-card-text>
                    <v-card-actions class="winner-buttons-container">
                        <!-- Back to main menu -->  
                        <v-btn class="winner-button back-button" @click="$emit(ETripleTriadEvent.BackHome)">
                            {{ $vuetify.locale.t('$vuetify.board.backToMainMenu') }}
                        </v-btn>
                        <!-- Replay -->     
                        <div class="winner-button replay-button" @click=replay()>
                            {{ $vuetify.locale.t('$vuetify.board.replay') }}
                        </div>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </main>
</template>

<script lang="ts">
import type { Card } from '@/models/Card';
import draggable from 'vuedraggable';
import HomeButton, { HOME_HEADER_HEIGHT } from '@/components/HomeButton.vue';
import type { PropType } from 'vue';
import { ETripleTriadEvent } from '@/models/Event';

interface BoardCell {
    card: Card;
    player:  0 | 1; // which player owns the card
}

export default {
    props: {
        player1Cards: { type: Array as PropType<Card[]>, required: true },
        player2Cards: { type: Array as PropType<Card[]>, required: true }
    },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            HOME_HEADER_HEIGHT: HOME_HEADER_HEIGHT,
            gameEnded: false as boolean,
            winner: 0 as null | 1 | 2,
            playerTurn: 0 as 0 | 1,
            drag: false as boolean,
            boardCards: [] as BoardCell[][],
            cardsPlayed: [[], []] as number[][] // id of all the played cards for each player
        };
    },
    components: { draggable, HomeButton },
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
            const deckPlayed: Card[] = this.playerTurn ? this.player2Cards : this.player1Cards; 
            const cardDropped: Card = deckPlayed[sortableEvent.oldIndex];
    
            if (!this.boardCards[line]) {
                this.boardCards[line] = []
            };

            this.boardCards[line][cell] = { card: cardDropped, player: this.playerTurn };
            this.cardsPlayed[this.playerTurn].push(cardDropped.id);

            // Now, check the card values
            this.checkCardValues(cardDropped, line, cell);

            // Chekc if game is over
            this.checkWin();

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
                const cardAtBottom: Card = this.boardCards[line + 1][cell].card;
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
         * Called at the end of each turn to check if the game is over
         * Check if game is over and determine who is the winner 
         */
        checkWin() {
            const isGameOver = this.cardsPlayed[0].length + this.cardsPlayed[1].length === 9;

            // Who wins ?
            if (isGameOver) {
                let player1Points: number = 0;
                let player2Points: number = 0;
                this.boardCards.forEach((line => {
                    line.forEach(cell => {
                        if (cell.player === 0) {
                            player1Points++;
                        } else {
                            player2Points++;
                        }
                    });
                }));
                this.winner = player1Points > player2Points ? 1 : 2;
                this.gameEnded = true;
            }
        },
        /**
         * Called when game is over and the user want to replay, or when the replay icon has been clicked
         * Reset all data to restart a game
         */
        replay() {
            this.winner = null;
            this.gameEnded = false;
            this.boardCards = [];
            this.cardsPlayed = [[], []];
            this.playerTurn = 0;
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
        getCardImage(cardSrc: string): string {
            return new URL(`./assets/cards/${cardSrc}`, import.meta.url).href;
        }
    }
};
</script>

<style scoped lang="scss">
$footer-height: 200px;

.board-view-container {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.board-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.board-cell {
    height: 150px;
    width: 150px;
    margin: 7px;
    position: relative;
    transition: all .2s ease-in-out;
    &:hover {
        transform: rotateY(20deg) skewY(-2deg)
    }
}
.board-cell-card {
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: none;
}
.board-cell-card-player-1 {
    box-shadow: 0 0 4pt 3pt rgb(var(--v-theme-primary));
}
.board-cell-card-player-2 {
    box-shadow: 0 0 4pt 3pt rgb(var(--v-theme-secondary));
}
.board-cell-drop-zone {
    position: relative;
    background-image: linear-gradient(to right bottom, #222831, #54575f, #8a8b91, #c3c3c6, #ffffff);
    opacity: 0.3;
    height: 100%;
    width: 100%;
}
.footer-container {
    margin-top: 50px;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: $footer-height;
}
.footer-spacer {
    height: $footer-height;
}

.player-turn-container {
    text-align: center;
    width: 100%;
    position: absolute;
    top: -27px;
}
.player-1-footer-container .player-turn-content{
    color: rgb(var(--v-theme-primary));
    outline: 2px solid rgb(var(--v-theme-primary));
}
.player-2-footer-container .player-turn-content {
    color: rgb(var(--v-theme-secondary));
    outline: 2px solid rgb(var(--v-theme-secondary));
}
.player-turn-content {
    padding: 10px;
    width: fit-content;
    margin: auto;
    background-color: white;
    border-radius: 10px;
    font-size: 20px;
}
.deck-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px;
}

.player-1-deck {
    background-color: rgb(var(--v-theme-primary));
}
.player-2-deck {
    background-color: rgb(var(--v-theme-secondary));
}


.deck-card {
    width: 150px;
    height: 150px;
    cursor: grab;
    img {
        transition: all .2s ease-in-out;
        &:hover {
            transform: scale(1.1);
        }
    }
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
.winner-popup-container {
    height: 400px;
}
.winner-1-popup-container .replay-button {
    background-color: rgb(var(--v-theme-primary));
    &:hover {
        // Glow effect
        -webkit-box-shadow:0px 0px 25px 0px rgb(var(--v-theme-primary));
        -moz-box-shadow: 0px 0px 25px 0px rgb(var(--v-theme-primary));
        box-shadow: 0px 0px 25px 0px rgb(var(--v-theme-primary));
    }
}
.winner-2-popup-container .replay-button {
    background-color: rgb(var(--v-theme-secondary));
    &:hover {
        // Glow effect
        -webkit-box-shadow:0px 0px 25px 0px rgb(var(--v-theme-secondary));
        -moz-box-shadow: 0px 0px 25px 0px rgb(var(--v-theme-secondary));
        box-shadow: 0px 0px 25px 0px rgb(var(--v-theme-secondary));
    }
}
.winner-buttons-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.winner-text {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 38px;
    font-weight: 400;
}
.winner-button {
    border-radius: 10px;
    margin: 0px 25px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.replay-button {
    animation: highlight 1.5s infinite;
    color: white;
    height: 50px;
    cursor: pointer;
    font-size: 20px;
    padding: 20px;
    transition: all .3s ease-in-out;
}
.back-button {
    color: rgb(var(--v-theme-black));
    border: 1px solid rgb(var(--v-theme-black));
    height: 35px;
    font-size: 14px;
}

$highlight-scale-start: scale(1.0);
$highlight-scale-end: scale(1.2);
@keyframes highlight {
    0% {
        -ms-transform: $highlight-scale-start;
        -moz-transform: $highlight-scale-start;
        -webkit-transform: $highlight-scale-start;
        -o-transform: $highlight-scale-start;
        transform: $highlight-scale-start;
    }
    50% {
        -ms-transform: $highlight-scale-end;
        -moz-transform: $highlight-scale-end;
        -webkit-transform: $highlight-scale-end;
        -o-transform: $highlight-scale-end;
        transform: $highlight-scale-end;
    }
    100% {
        -ms-transform: $highlight-scale-start;
        -moz-transform: $highlight-scale-start;
        -webkit-transform: $highlight-scale-start;
        -o-transform: $highlight-scale-start;
        transform: $highlight-scale-start;
    }
}
</style>

<style lang="scss">
.winner-buttons-container .back-button .v-btn__content  {
    font-size: 14px;
    text-transform: none;
    font-family: 'Roboto', sans-serif;
}
.winner-popup-container .v-toolbar-title {
    color: white;
    text-transform: uppercase;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
}
</style>
