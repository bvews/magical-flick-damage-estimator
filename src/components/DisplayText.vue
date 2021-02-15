<template>
  <div v-text="value"></div>
</template>

<script lang="ts">
// TypescriptでaddEventListener時のEventTarget型ではまった
// https://qiita.com/wamei/items/43753e03821964719f31
interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

import Vue from 'vue';

export default Vue.extend({
  name: 'DisplayText',
  props: {
    value: [Number, String, Boolean]
  }
});
</script>

<style scoped>
</style>
