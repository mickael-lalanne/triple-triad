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
            noDeckMessage: 'You haven\'t created a deck yet.',
            playWithRandomDeckMessage: 'Play with random cards or start creating your own decks.',
            localTitle: 'Choose a deck for',
            localTitleP1: 'Player 1',
            localTitleP2: 'Player 2'
        },
        deckViewer: {
            headerTitle: 'Add, edit or delete your decks',
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
    error: {
        browser: {
            title: 'You seem to be using an unsupported browser.',
            subtitle: 'At the moment, only Chrome is supported by the game.',
            footer: `To see what's browsers will be supported next, take a look at the roadmap by clicking`
        },
        resolution: {
            title: 'Current resolution is not supported yet.',
            subtitle: 'To play the game, enlarge the size of the window or use a screen with a higher resolution.',
            footer1: 'Responsive and mobile support is planned.',
            footer2: 'Please, take a look at the roadmap by clicking'
        },
        roadmapButton: 'there'
    },
    roadmap: {
        title: 'Triple Triad Roadmap',
        aiMode: 'AI mode',
        onlineMode: 'Online mode',
        googleAuthentication: 'Google authentication',
        responsive: 'Responsive for mobile and tablets',
        android: 'Android application'
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
