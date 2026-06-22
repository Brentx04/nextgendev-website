<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import LandingLayout from './layouts/LandingLayout.vue'

const route = useRoute()
const layout = computed(() => (route.meta.layout === 'landing' ? LandingLayout : DefaultLayout))
</script>
