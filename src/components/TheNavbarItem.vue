<template>
  <a v-bind:class="classObject" class="navbar-item" :href="url" v-text="text"></a>
</template>

<script>
export default {
  props: ['title', 'text', 'url'],
  computed: {
    isActive: function() {
      return this.title.indexOf(this.text) === 0;
    },
    classObject: function() {
      return {
        'is-active': this.isActive
      };
    }
  }
};
</script>