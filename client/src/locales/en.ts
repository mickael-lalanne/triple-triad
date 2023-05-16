import { en } from 'vuetify/locale';

export default {
    ...en,
    home: {
        title: 'Triple Triad',
        menu: {
            play: 'Play',
            deckManagement: 'Deck Management',
            logout: 'Logout',
        }
    },
    board: {
        playersTurn: 'Player\'s {0} turn',
        playerWin: 'Player {0} wins !',
        replay: 'Play again ?',
        gameEnded: 'Game ended',
        backToMainMenu: 'Back to main menu'
    },
    deck: {
        oneStarCards: '1 star cards',
        starsCards: '{0} stars cards',
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
