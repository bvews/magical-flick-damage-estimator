<template>
  <b-button>
    <slot></slot>
  </b-button>
</template>

<script lang="ts">
import {
  createComponent,
  SetupContext,
  reactive,
  computed,
  ref
} from '@vue/composition-api';

// type Props = {
//   value: string;
// };
// interface Props {
//   value: string;
// }

export default createComponent({
  //   name: 'ColorPicker',
  props: {
    value: {
      type: String,
      default: '#000000'
    }
  },
  setup(props, context) {
    // const innerValue = ref(props.value);
    const innerValue = computed(() => props.value);
    const background = computed(() => ({ background: innerValue.value }));
    const handleInput = (event: any) =>
      context.emit('input', event.target.value);

    return {
      innerValue,
      background,
      handleInput
    };
  }
});
</script>

<style scoped>
</style>
