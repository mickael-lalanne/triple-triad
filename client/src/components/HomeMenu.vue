<template>
    <div class="home-container">
        <div class="home-header">
            <a class="logout" @click="logout()">
                {{ $vuetify.locale.t('$vuetify.home.menu.logout') }}
            </a>
        </div>
        <div class="d-flex align-center justify-center" style="width: 100%;">
            <!-- PLAY -->
            <RouterLink class="card-container card-board" to="/board">
                <div class="card-bg"></div>
                <div class="card-header"></div>
                <div class="card-icon-container">
                    <div class="card-icon">
                        <v-icon
                            :size="60"
                            icon="mdi-gamepad-square-outline"
                            color="rgb(var(--v-theme-black))"
                        ></v-icon>
                    </div>
                </div>
                <div class="card-content">
                    <div class="card-title">{{ $vuetify.locale.t('$vuetify.home.menu.play') }}</div>
                </div>
            </RouterLink>

            <!-- DECK MANAGEMENT -->
            <RouterLink class="card-container card-deck" to="/decks">
                <div class="card-bg"></div>
                <div class="card-header"></div>
                <div class="card-icon-container">
                    <div class="card-icon">
                        <v-icon
                            :size="60"
                            icon="mdi-cards-outline"
                            color="rgb(var(--v-theme-black))"
                        ></v-icon>
                    </div>
                </div>

                <div class="card-content">
                    <div class="card-title">{{ $vuetify.locale.t('$vuetify.home.menu.deckManagement') }}</div>
                </div>
            </RouterLink>
        </div>
    </div>

</template><script lang="ts">
import { Auth } from '@aws-amplify/auth';

export default {
    methods: {
        async logout(): Promise<void> {
            await Auth.signOut();
            this.$router.push({ path: '/login'});
        }
    }
}
</script>

<style scoped lang="scss">
$card-border-radius: 20px;
.home-container {
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.home-header {
    color: white;
    top: 25px;
    right: 25px;
    position: absolute;
    .logout {
        cursor: pointer;
        font-family: 'Roboto', sans-serif;
        font-size: 14px;
        margin-right: 25px;
        &:hover {
            color: rgb(var(--v-theme-tertiary));
        }
    }
}
.card-container {
    width: 400px;
    height: 650px;
    margin: 5%;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: $card-border-radius;
    transition: all .3s ease-in-out;
    overflow: hidden;
    padding: 0 50px;
    &:hover {
        transform: scale(1.1);

        .card-header img {
            transform: scale(0.8);
            transform-origin: center center;
        }
        .card-bg {
            -webkit-transform: scale(10.5);
            -ms-transform: scale(10.5);
            transform: scale(10.5);
        }
        .card-icon {
            -webkit-animation: rotating 8s linear infinite;
            -moz-animation: rotating 8s linear infinite;
            -ms-animation: rotating 8s linear infinite;
            -o-animation: rotating 8s linear infinite;
            animation: rotating 8s linear infinite;
        }
    }
    .card-header {
        width: 100%;
        height: 150px;
        border-top-right-radius: $card-border-radius;
        border-top-left-radius: $card-border-radius;
        overflow: hidden;
        position: relative;
        img {
            position: absolute;
            transition: all 3s ease-out;
        }
    }
    .deck-header img {
        top: -167px;
        right: -100px;
    }
    .card-icon-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card-icon {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        position: absolute;
        background-color: white;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .card-content {
        flex: 1;
        height: 100%;
        width: 100%;
        border-bottom-right-radius: $card-border-radius;
        border-bottom-left-radius: $card-border-radius;
        display: flex;
        justify-content: center;
        z-index: 1;
        padding-top: 90px;
    }
    .card-button {
        position: absolute;
        bottom: -20px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .card-bg {
        height: 128px;
        width: 128px;
        z-index: 1;
        position: absolute;
        border-radius: 50%;
        -webkit-transition: all .5s ease;
        -o-transition: all .5s ease;
        transition: all .5s ease;
        top: -105px;
        right: -105px;
        border-radius: 75%;
    }
    .card-title {
        font-family: 'ProximaNova', sans-serif;
        color: white;
        font-size: 50px;
        font-weight: 400;
        text-align: center;
        text-transform: uppercase;
        height: 170px;
        display: flex;
        align-items: center;
        backface-visibility: hidden;
        transform: translateZ(0);
        -webkit-font-smoothing: subpixel-antialiased;
    }
}
.card-board .card-bg {
    background-color: rgb(var(--v-theme-primary));
}
.card-deck .card-bg {
    background-color: rgb(var(--v-theme-secondary));
}

.card-board {
    // Gradient generated with https://mycolor.space/
    background-image: linear-gradient(to right top, #222831, #324d60, #377690, #32a3bc, #2cd3e1);
    &:hover {
        // Glow effect
        -webkit-box-shadow:0px 0px 91px 0px rgb(var(--v-theme-primary));
        -moz-box-shadow: 0px 0px 91px 0px rgb(var(--v-theme-primary));
        box-shadow: 0px 0px 91px 0px rgb(var(--v-theme-primary));
    }
}
.card-deck {
    // Gradient generated with https://mycolor.space/
    background-image: linear-gradient(to right top, #222831, #3b3f5f, #6b5287, #ac5ea2, #f266ab);
    &:hover {
        // Glow effect
        -webkit-box-shadow:0px 0px 91px 0px rgb(var(--v-theme-secondary));
        -moz-box-shadow: 0px 0px 91px 0px rgb(var(--v-theme-secondary));
        box-shadow: 0px 0px 91px 0px rgb(var(--v-theme-secondary));
    }
}

// ROTATE ANIMATION
@-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes rotating {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

</style>
