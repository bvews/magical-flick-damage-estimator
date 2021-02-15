<template>
  <b-collapse class="panel" :open.sync="isOpen">
    <div slot="trigger" class="panel-heading">
      <b-icon v-if="isOpen" icon="menu-up"></b-icon>
      <b-icon v-else icon="menu-down"></b-icon>
      <span>{{ label }}</span>
    </div>
    <div class="panel-block">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </b-collapse>
</template>

<script lang="ts">
// Props:
//   isOpen
//   label

// this.$emit('update:open', !isOpen)
</script>

<style scoped>
</style>