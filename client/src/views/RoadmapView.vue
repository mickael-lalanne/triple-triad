<template>
    <main class="roadmap-container">
        <div class="roadmap-title">🗺️ {{ $vuetify.locale.t('$vuetify.roadmap.title') }}</div>
        <div class="roadmap-items mt-12">
            <v-checkbox
                disabled
                hide-details
                density="compact"
                :label="'❔ ' + $vuetify.locale.t('$vuetify.roadmap.rules')"
            ></v-checkbox>
            <v-checkbox
                disabled
                hide-details
                density="compact"
                :label="'🥐 ' + $vuetify.locale.t('$vuetify.roadmap.language')"
            ></v-checkbox>
            <v-checkbox
                disabled
                hide-details
                density="compact"
                :label="'🤖 ' + $vuetify.locale.t('$vuetify.roadmap.aiMode')"
            ></v-checkbox>
            <v-checkbox
                disabled
                hide-details
                density="compact"
                :label="'🌞 ' + $vuetify.locale.t('$vuetify.roadmap.themes')"
            ></v-checkbox>
            <v-checkbox
                disabled
                hide-details
                density="compact"
                :label="'📱 ' + $vuetify.locale.t('$vuetify.roadmap.responsive')"
            ></v-checkbox>
            <v-checkbox
                disabled
                hide-details
                density="compact"
                :label="'👨🏻‍💻 ' + $vuetify.locale.t('$vuetify.roadmap.googleAuthentication')"
            ></v-checkbox>
            <v-checkbox
                disabled
                hide-details
                density="compact"
                :label="'📡 ' + $vuetify.locale.t('$vuetify.roadmap.onlineMode')"
            ></v-checkbox>
            <v-checkbox
                disabled
                hide-details
                density="compact"
                :label="'📱 ' + $vuetify.locale.t('$vuetify.roadmap.android')"
            ></v-checkbox>
            <v-checkbox
                disabled
                hide-details
                density="compact"
                :label="'🎲 ' + $vuetify.locale.t('$vuetify.roadmap.newRules')"
            ></v-checkbox>
        </div>
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
    padding: 10%;
}
.roadmap-title {
    text-align: center;
    font-size: 34px;
    font-weight: 500;
    color: rgb(var(--v-theme-primary));
}
.roadmap-items {
    border-left: 2px solid rgb(var(--v-theme-secondary));
    padding-left: 16px;
}
</style>

<style lang="scss">
.roadmap-container {
    .v-label {
        font-size: 16px;
        padding-left: 10px;
    }
    .v-label,
    .v-icon,
    .v-selection-control--disabled {
        opacity: 1;
    }
    .v-checkbox {
        margin: 10px 0;
    }
}
</style>
