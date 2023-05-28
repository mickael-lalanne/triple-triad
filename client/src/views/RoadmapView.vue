<template>
    <main class="roadmap-container">
        <div class="roadmap-title">🗺️ {{ $vuetify.locale.t('$vuetify.roadmap.title') }}</div>
        <v-spacer></v-spacer>
        <div class="roadmap-items">
            <v-checkbox disabled :label="'🤖 ' + $vuetify.locale.t('$vuetify.roadmap.aiMode')"></v-checkbox>
            <v-checkbox disabled :label="'📱 ' + $vuetify.locale.t('$vuetify.roadmap.responsive')"></v-checkbox>
            <v-checkbox disabled :label="'👨🏻‍💻 ' + $vuetify.locale.t('$vuetify.roadmap.googleAuthentication')"></v-checkbox>
            <v-checkbox disabled :label="'📡 ' + $vuetify.locale.t('$vuetify.roadmap.onlineMode')"></v-checkbox>
            <v-checkbox disabled :label="'📱 ' + $vuetify.locale.t('$vuetify.roadmap.android')"></v-checkbox>
        </div>
        <v-spacer></v-spacer>
    </main>
</template>

<script lang="ts">
export default {
    name: 'RoadmapView'
}
</script>

<style lang="scss" scoped>
.roadmap-container {
    color: white;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10%;
}
.roadmap-title {
    text-align: center;
    font-size: 45px;
    font-weight: 500;
    color: rgb(var(--v-theme-primary));
}
</style>

<style lang="scss">
.roadmap-container {
    .v-label {
        font-size: 24px;
    }
    .v-label,
    .v-icon,
    .v-selection-control--disabled {
        opacity: 1;
    }
}
</style>
