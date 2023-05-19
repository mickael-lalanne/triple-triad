<template>
    <div class="home-button-container">
        <div class="home-button" to="/" @mousedown="onHomeButtonMousedown">
            <div class="home-button-icon">
                <v-icon
                    :size="40"
                    icon="mdi-menu-down"
                    color="white"
                ></v-icon>
            </div>
            <div class="home-button-text">
                {{ $vuetify.locale.t('$vuetify.board.backToMainMenu') }}
            </div>
            <div class="home-button-bg">
                <div class="home-button-bg-circle"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import router from '@/router';
export const HOME_HEADER_HEIGHT = 80;

export default {
    name: 'HomeButton',
    data() {
        return {
            isMouseDown: false as boolean,
        };
    },
    beforeMount() {
        document.addEventListener('mouseup', this.onHomeButtonMouseup);
    },
    beforeUnmount() {
        document.removeEventListener('mouseup', this.onHomeButtonMouseup);
    },
    methods: {
        onHomeButtonMousedown(event: MouseEvent): void {
            this.isMouseDown = true;
            event.preventDefault(); // Otherwise mouseup event is not fired
            // After a delay, if the home button is still pressed, redirect to the home page
            setTimeout(() => {
                if (this.isMouseDown) {
                    router.push({ path: '/' });
                }
            }, 1200);
        },
        onHomeButtonMouseup(): void {
            this.isMouseDown = false;
        }
    }
}
</script>

<style scoped lang="scss">
$hover-transition: all .5s ease;
$home-header-height: 80px;

.home-button-container {
    height: $home-header-height;
    min-height: $home-header-height;
}
.home-button {
    width: 100%;
    text-align: center;
    border-bottom: 2px solid white;
    position: relative;
    cursor: pointer;
    user-select: none;
    height: 40px;
    transition: $hover-transition;
    &:hover {
        height: $home-header-height;
        .home-button-text {
            opacity: 1;
        }
        .home-button-icon {
            opacity: 0;
        }
    }
    .home-button-text {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        opacity: 0;
        transition: $hover-transition;
    }
    .home-button-icon {
        transition: $hover-transition;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        height: 100%;
        width: 100%;
        position: absolute;
    }
    &:active {
        height: $home-header-height !important;
        .home-button-bg {
            opacity: 1;
        }
        .home-button-bg-circle {
            transform: scale(160);
        }
        .home-button-text {
            opacity: 1;
            color: rgb(var(--v-theme-black));
        }
    }
    .home-button-bg {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        top: 0;
        overflow: hidden;
        opacity: 0;
        z-index: -1;
        .home-button-bg-circle {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: white;
            transition: all 1.5s ease;
        }
    }
}
</style>
