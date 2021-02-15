<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <number-input v-model="value"/>
    <display-text :value="value" />
    <color-picker v-model="color" />
    <button-sample class="is-primary">Button</button-sample>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import NumberInput from './components/NumberInput.vue';
import DisplayText from './components/DisplayText.vue';
import ColorPicker from './components/ColorPicker.vue';
import ButtonSample from './components/ButtonSample.vue';

export default Vue.extend({
  name: 'app',
  components: {
    HelloWorld,
    NumberInput,
    DisplayText,
    ColorPicker,
    ButtonSample
  },
  data() {
    return {
      color: '#ffffff',
      value: 0
    };
  }
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
