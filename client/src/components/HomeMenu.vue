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

        <!-- DECK MANAGEMENT -->
        <v-btn
            class="menu-item"
            size="x-large"
        >
            {{ $vuetify.locale.t('$vuetify.home.menu.deckManagement') }}
        </v-btn>
        
        <!-- LOGOUT -->
        <v-btn
            class="menu-item"
            size="x-large"
            @click="logout()"
        >
            {{ $vuetify.locale.t('$vuetify.home.menu.logout') }}
        </v-btn>
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
