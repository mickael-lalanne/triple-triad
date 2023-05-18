import { en } from 'vuetify/locale';

export default {
    ...en,
    home: {
        title: 'Triple Triad',
        menu: {
            play: 'Play',
            deckManagement: 'Deck Creation',
            logout: 'Logout',
        }
    },
    board: {
        playersTurn: 'Player\'s {0} turn',
        playerWin: 'Player {0} wins !',
        replay: 'Play again ?',
        gameEnded: 'Game ended',
        backToMainMenu: 'Main menu'
    },
    deck: {
        nameField: 'Deck name',
        createTitle: 'Deck Creation',
        defaultDeckName: 'Deck n°{0}',
        createDeck: 'Create deck',
        updateDeck: 'Update deck'
    },
    shared: {
        cancel: 'Cancel'
    }
}
