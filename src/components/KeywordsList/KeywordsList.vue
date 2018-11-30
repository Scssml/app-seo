<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th :class="{'text-center': index}" v-for="(name, index) in headers" :key="index">{{ name }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <th>{{ ++index }}</th>
          <td class=" text-nowrap">{{ item.UF_NAME }}</td>
          <td class="text-center text-nowrap">
            <a :href="item.UF_SEO_PAGE" target="_blank" v-if="!!item.UF_SEO_PAGE">Посмотреть</a>
            <span v-else>-</span>
          </td>
          <td class="text-center text-nowrap">
            <a :href="item.UF_YANDEX_PAGE" target="_blank" v-if="!!item.UF_YANDEX_PAGE">Посмотреть</a>
            <span v-else>-</span>
          </td>
          <td class="text-center">{{ item.UF_PRICE }}</td>
          <td class="text-center">
            <span class="d-inline-block align-middle" v-if="!!item.UF_POSITION">{{ item.UF_POSITION }}</span>
            <span class="d-inline-block align-middle" v-else>>100</span>
            <a href="#" class="d-inline-block align-middle line-height-1 ml-1" @click.prevent="updatePosition(item.ID)"><i class="material-icons">autorenew</i></a>
          </td>
          <td class="text-center">
            <a href="#" @click.prevent="deleteKeyword(item.ID)"><i class="material-icons">delete</i></a>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="text-center" v-if="!countProject">Фраз не найдено</p>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'KeywordsList',
  props: {
    items: Array
  },
  data() {
    return {
      headers: [
        'Фраза',
        'Страница для продвижения',
        'Страница в Яндексе',
        'Цена',
        'Позиция'
      ],
      id: parseInt(this.$route.params.id)
    }
  },
  computed: {
    countProject() {
      return this.items.length
    }
  },
  methods: {
    deleteKeyword(keywordsId) {
      this.$store.dispatch('deleteKeyword', keywordsId).then(() => {
        this.$emit('update')
      })
    },
    updatePosition(keywordsId) {
      this.$store.dispatch('updatePosition', keywordsId).then((keywords) => {
        this.$emit('updatePosition', { keywordsId, keywords })
      })
    }
  }
})
</script>
<style src="./KeywordsList.scss" scoped lang="scss"></style>