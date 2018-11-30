<template>
  <nav class="top-nav">
    <ul class="top-nav__list">
      <li class="top-nav__item" v-for="item in links">
        <router-link :to="item.href" class="top-nav__link" :title="item.name" v-if="item.href"><i class="material-icons">{{ item.icon }}</i></router-link>
        <a @click.prevent="item.click" href="#" class="top-nav__link" :title="item.name" v-if="item.click"><i class="material-icons">{{ item.icon }}</i></a>
        <a :href="item.link" class="top-nav__link" :title="item.name" v-if="item.link"><i class="material-icons">{{ item.icon }}</i></a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'TopNav',
  props: {
    links: Array
  }
})
</script>
<style src="./TopNav.scss" scoped lang="scss"></style>