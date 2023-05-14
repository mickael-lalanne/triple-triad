<script setup lang="ts">
import HomeMenu from '@/components/HomeMenu.vue';
</script>

<template>
    <main>
        <h1>{{ $vuetify.locale.t('$vuetify.home.title') }}</h1>
        <HomeMenu />
    </main>
</template>
