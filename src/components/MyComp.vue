<template>
  <div class="hello">
    <h1 >{{ outsideMsg }}</h1>
       <button @click="cl">tst</button>
        <span v-for="(e, i) in myarr" :key="i">
          {{e}}
        </span>
     <vue-editor v-model="outsideMsg"></vue-editor>
  </div>
</template>

<script>

import { bus } from '../event'
import Vue from 'vue'
import Tabs from 'vue-tabs-component'
import { VueEditor } from 'vue2-editor'

Vue.use(Tabs)
// Vue.use(VueEditor);

export default {
  props: [
    'outsideMsg',
    'myarr'

  ],
  name: 'MyComp2',
  components: {
    VueEditor
  },
  data () {
    return {
      titles: [{id: '', materials: [{content: ''}, {}], questions: [{content: ''}, {}]}, {id: ''}],
      msg: 'This message from my component'
    }
  },
  methods: {
    cl: function () {
      bus.$emit('test');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<style>
.tabs-component {
 /*  margin: 4em 0; */
}

.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}

.tabs-component-tab:hover {
  color: #666;
}

.tabs-component-tab.is-active {
  color: #000;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: 0.5em;
    transform: translateY(2px);
    transition: transform 0.3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: 0.75em 1em;
  text-decoration: none;
}

.tabs-component-panels {
 /*  padding: 4em 0; */
}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    padding: 4em 2em;
  }
}
</style>
