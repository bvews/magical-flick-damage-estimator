<template>
  <b-message :closable="false" title="計算結果" type="is-primary">
    <p
      class="is-size-5-mobile is-size-4 has-text-weight-bold"
    >☆生成数：{{ star }}, 総ダメージ：{{ damage.toLocaleString() }}</p>
  </b-message>
</template>

<script lang="ts">
import {
  createComponent,
  SetupContext,
  reactive,
  computed,
  ref
} from '@vue/composition-api';

export default createComponent({
  props: {
    star: {
      type: [String, Number],
      default: 0
    },
    damage: {
      type: [String, Number],
      default: 0
    }
  },
  setup(props, context) {}
});
</script>

<style scoped>
</style>
