<template>
  <b-field horizontal :label="label">
    <b-select :value="value" v-bind="$attrs" expanded @input="handleInput">
      <option v-for="item in options" :value="item.value" :key="item.value">{{ item.text }}</option>
    </b-select>
  </b-field>
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
    label: String,
    value: {
      type: [String, Number],
      default: 0
    },
    options: {
        type: Array,
        default: () => []
    }
  },
  setup(props, context) {
    const handleInput = (event: number | string) => {
      event = Number(event);
      if (!isNaN(event)) {
        context.emit('input', event);
      }
    };
    return {
      handleInput
    };
  }
});
</script>

<style scoped>
</style>
