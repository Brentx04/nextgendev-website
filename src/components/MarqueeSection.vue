<template>
  <div class="marquee-section">
    <div class="marquee-track">
      <div class="marquee-inner">
        <template v-for="_ in 2" :key="_">
          <template v-for="(item, i) in items" :key="i + '-' + _">
            <span>{{ item }}</span>
            <span class="dot">◆</span>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const items = ['C#', 'MYSQL', 'ORACLE', 'PYTHON', 'HTML', 'CSS', 'JAVASCRIPT', 'VUE', 'NODE.JS', 'GITHUB', 'FIGMA']
</script>
