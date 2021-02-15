<template>
  <div>
    <input :value="innerValue" :style="background" @input="handleInput" />
    <input :value="innerValue" type="color" @input="handleInput" />
  </div>
</template>

<script lang="ts">
// TypescriptでaddEventListener時のEventTarget型ではまった
// https://qiita.com/wamei/items/43753e03821964719f31
interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}
// export declare
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
    const handleInput = (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        context.emit('input', event.target.value);
      }
    };
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
