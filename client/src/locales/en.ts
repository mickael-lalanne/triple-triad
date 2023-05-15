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
    }
}
