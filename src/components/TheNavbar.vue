<template>
  <nav id="nav" class="navbar has-background-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <span class="navbar-item">
        <h1 :class="headingClass" class="is-size-5 has-text-weight-bold">
          <slot></slot>
        </h1>
      </span>

      <a
        v-bind:class="{ 'is-active': isActive }"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="clickHandler"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" v-bind:class="{ 'is-active': isActive }" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/">トップ</a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">ツール</a>
          <div class="navbar-dropdown">
            <the-navbar-item
              v-for="item in innerTools"
              v-bind="item"
              :key="item.text"
              :title="title"
            ></the-navbar-item>
          </div>
        </div>
        <div v-if="isMemo" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Memo</a>
          <div class="navbar-dropdown">
            <the-navbar-item
              v-for="item in innerMemos"
              v-bind="item"
              :key="item.text"
              :title="title"
            ></the-navbar-item>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { fetchPages } from './fetch-page-list.js';
import TheNavbarItem from './TheNavbarItem.vue';

export default {
  components: {
    TheNavbarItem
  },
  props: {
    headingClass: {
      type: [String, Object, Array]
    },
    tools: {
      type: Array,
      default: null
    },
    memos: {
      type: Array,
      default: null
    }
  },
  data: function() {
    return {
      innerTools: this.tools,
      innerMemos: this.memos,
      title: document.title,
      isActive: false,
      isMemo: location.pathname.indexOf('/memo') === 0
    };
  },
  created: function() {
    if (this.innerTools || this.innerMemos) {
      return;
    }

    fetchPages(
      function(data) {
        this.innerTools = data.tools;
        this.innerMemos = data.memos;
      }.bind(this)
    );
  },
  methods: {
    clickHandler: function() {
      this.isActive = !this.isActive;
    }
  },
  watch: {
    tools: function(value) {
      this.innerTools = value;
    },
    memos: function(value) {
      this.innerMemos = value;
    }
  }
};
</script>