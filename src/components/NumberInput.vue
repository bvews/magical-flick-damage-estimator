<template>
  <b-field :label="label" horizontal>
    <b-input
      :value="value"
      v-bind="$attrs"
      type="number"
      @input="handleInput"
    ></b-input>
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
