<template>
  <div class="scroll-progress" :style="{ width: progress + '%' }"></div>
</template>

<script setup>
defineProps({ progress: { type: Number, default: 0 } })
</script>
