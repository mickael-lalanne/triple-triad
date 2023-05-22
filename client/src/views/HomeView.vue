<template>
    <main>
        <HomeMenu
            v-if="!playing"
            @[ETripleTriadEvent.PlayLocalMode]="playLocalMode"
        />
        <Board
            v-else
            :player1Cards="player1Cards"
            :player2Cards="player2Cards"
            @[ETripleTriadEvent.BackHome]="playing = false"
        />
    </main>
</template>

<script lang="ts">
import Board from '@/components/Board.vue';
import HomeMenu from '@/components/HomeMenu.vue';
import type { Card } from '@/models/Card';
import type { Deck } from '@/models/Deck';
import { ETripleTriadEvent } from '@/models/Event';
import { DeckService } from '@/services/deckService';

export default {
    name: 'HomeView',
    components: { Board, HomeMenu },
    data() {
        return {
            ETripleTriadEvent: ETripleTriadEvent,
            playing: false as boolean,
            player1Cards: [] as Card[],
            player2Cards: [] as Card[],
            closingSelectorMode: false as boolean
        };
    },
    methods: {
        playLocalMode(playersDecks: Deck[]) {
            this.player1Cards = DeckService.resolveDeckCards(playersDecks[0].cards);
            this.player2Cards = DeckService.resolveDeckCards(playersDecks[1].cards);
            this.playing = true;
        }
    }
}
</script>
