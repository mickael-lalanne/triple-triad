<script setup lang="ts">
</script>

<template>
    <div class="menu-container">
        <!-- PLAY -->
        <RouterLink class="menu-item" to="/board">      
            <v-btn
                
                size="x-large"
            >
                {{ $vuetify.locale.t('$vuetify.home.menu.play') }}
            </v-btn>
        </RouterLink>
        <v-btn
            class="menu-item"
            size="x-large"
        >
            {{ $vuetify.locale.t('$vuetify.home.menu.deckManagement') }}
        </v-btn>
        <v-btn
            class="menu-item"
            size="x-large"
        >
            {{ $vuetify.locale.t('$vuetify.home.menu.logout') }}
        </v-btn>
    </div>
</template>

<style scoped>
.menu-container {
    display: flex;
    flex-direction: column;
}
.menu-item {
    margin-top: 25px;
}
.menu-item .v-btn {
    width: -webkit-fill-available;
}
</style>
