<template>
    <main>
        <!-- HEADER -->
        <div class="header-container d-flex align-center">
            <div class="header-item back-to-main-menu">
                <RouterLink class="menu-item" to="/">      
                    <v-btn>
                        {{ $vuetify.locale.t('$vuetify.board.backToMainMenu') }}
                    </v-btn>
                </RouterLink>
            </div>
            <div class="header-item player-turn">
                <div>{{ $vuetify.locale.t('$vuetify.board.playersTurn', playerTurn ? 2 : 1) }}</div>
                <div
                    class="player-turn-highlight"
                    :style="`background-color: ${playerTurn ? 'rgb(var(--v-theme-player2Color))' : 'rgb(var(--v-theme-player1Color))'}`"
                ></div>
            </div>
            <v-icon class="header-item replay-icon" icon="mdi-replay" @click="replay()"></v-icon>
        </div>

        <!-- BOARD -->
        <div class="board-container">
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

        <!-- DECK -->
        <draggable
            :list="playerTurn ? player2Deck : player1Deck"
            :group="{ name: 'card', pull: 'clone', put: false }"
            @start="drag = true"
            @end="drag = false"
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

        <!-- GAME ENDED POPUP -->
        <v-dialog
            transition="dialog-bottom-transition"
            v-model="gameEnded"
            width="auto"
        >
            <template v-slot:default="{}">
                <v-card>
                    <v-toolbar
                        :color="winner === 1 ? 'player1Color' : 'player2Color'"
                        :title="$vuetify.locale.t('$vuetify.board.gameEnded')"
                    ></v-toolbar>
                    <v-card-text>
                        <div class="text-h2 pa-12">{{ $vuetify.locale.t('$vuetify.board.playerWin', winner) }}</div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <!-- Replay -->     
                        <v-btn @click=replay()>
                            {{ $vuetify.locale.t('$vuetify.board.replay') }}
                        </v-btn>
                        <!-- Back to main menu -->
                        <RouterLink class="menu-item" to="/">      
                            <v-btn>
                                {{ $vuetify.locale.t('$vuetify.board.backToMainMenu') }}
                            </v-btn>
                        </RouterLink>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </main>
</template>

<script lang="ts">
import type { Card } from '@/models/Card';
import { DeckService } from '@/services/deckService';
import draggable from 'vuedraggable';

interface BoardCell {
    card: Card;
    player:  0 | 1; // which player owns the card
}

export default {
    data() {
        return {
            gameEnded: false as boolean,
            winner: null as null | 1 | 2,
            player1Deck: [] as Card[],
            player2Deck: [] as Card[],
            playerTurn: 0 as 0 | 1,
            drag: false as boolean,
            boardCards: [] as BoardCell[][],
            cardsPlayed: [[], []] as number[][] // id of all the played cards for each player
        };
    },
    components: {
        draggable
    },
    beforeMount() {
        // Generate players deck
        this.player1Deck = DeckService.generateRandomDeck();
        this.player2Deck = DeckService.generateRandomDeck();
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
            const deckPlayed: Card[] = this.playerTurn ? this.player2Deck : this.player1Deck; 
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
            // Regenerate players deck
            this.player1Deck = DeckService.generateRandomDeck();
            this.player2Deck = DeckService.generateRandomDeck();
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
.header-container {
    width: 100%;
    margin-bottom: 50px;
    .player-turn {
        text-align: center;
    }
}

.header-item {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}
.player-turn-highlight {
    position: absolute;
    width: 100px;
    height: 2px;
    bottom: -3px;
}

.header-item:first-child > span { margin-right: auto; }

.header-item:last-child  > span { margin-left: auto;  }

.replay-icon {
    justify-content: flex-end;
}
.back-to-main-menu {
    justify-content: flex-start;
}

.board-cell {
    height: 150px;
    width: 150px;
    margin: 7px;
    position: relative;
}
.board-cell-card {
    width: 100%;
    height: 100%;
}
.board-cell-card-player-1 {
    box-shadow: 0 0 4pt 3pt rgb(var(--v-theme-player1Color));
}
.board-cell-card-player-2 {
    box-shadow: 0 0 4pt 3pt rgb(var(--v-theme-player2Color));
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

.player-1-deck {
    background-color: rgb(var(--v-theme-player1Color));
}
.player-2-deck {
    background-color: rgb(var(--v-theme-player2Color));
}


.deck-card {
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
