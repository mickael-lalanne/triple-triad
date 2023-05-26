import { en } from 'vuetify/locale';

export default {
    ...en,
    home: {
        menu: {
            play: 'Play',
            deckManagement: 'My Decks',
            logout: 'Logout',
        },
        modeSelector: {
            title: 'Choose a mode',
            local: 'Local',
            ai: 'Versus AI',
            online: 'Online'
        },
        deckSelector: {
            localTitle: 'Choose a deck for',
            localTitleP1: 'Player 1',
            localTitleP2: 'Player 2'
        },
        deckViewer: {
            addDeck: 'Create a new deck',
            deleteDeck: 'Delete the deck'
        }
    },
    login: {
        title: 'Triple Triad',
        subtitle: 'By Mickaël Lalanne'
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
        updateDeck: 'Update deck',
        noDeckMessageTop: `You haven't made any decks yet.`,
        noDeckMessageBot: 'Click on the button bellow!'
    },
    shared: {
        cancel: 'Cancel',
        later: 'Coming later',
        next: 'Next',
        play: 'Play',
        delete: 'Delete',
        edit: 'Edit',
        create: 'Create'
    }
}
