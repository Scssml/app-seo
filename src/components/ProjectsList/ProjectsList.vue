<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th>#</th>
          <th :class="{'text-center': index}" v-for="(name, index) in headers">{{ name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items">
          <th>{{ ++index }}</th>
          <td class="text-nowrap"><router-link :to="'/project/' + item.ID">{{ item.UF_NAME }}</router-link></td>
          <!-- <td class="text-center text-nowrap">{{ $store.getters.getPropsName('UF_MANAGER', item.UF_MANAGER) }}</td>
          <td class="text-center text-nowrap">{{ $store.getters.getPropsName('UF_USER', item.UF_USER) }}</td> -->
          <td class="text-center">{{ item.UF_TOP_3 }}%</td>
          <td class="text-center">
            <span class="position-block" :class="'position-block-' + item.color">{{ item.UF_TOP_10 }}%</span>
          </td>
          <!-- <td class="text-center">{{ item.UF_MIDDLE_POSITION }}</td> -->
        </tr>
        <tr v-if="countProject">
          <td colspan="2"></td>
          <th class="text-center">{{ middleTop3 }}%</th>
          <th class="text-center">{{ middleTop10 }}%</th>
        </tr>
      </tbody>
    </table>
    <p class="text-center" v-if="!countProject">Проектов не найдено</p>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProjectsList',
  props: {
    headers: Array,
    items: Array
  },
  computed: {
    countProject() {
      return this.items.length
    },
    middleTop3() {
      let sum = 0
      for(let i = 0; i < this.items.length; i++) {
        sum += this.items[i].UF_TOP_3
      }
      return Math.ceil(sum / this.items.length)
    },
    middleTop10() {
      let sum = 0
      for(let i = 0; i < this.items.length; i++) {
        sum += this.items[i].UF_TOP_10
      }
      return Math.ceil(sum / this.items.length)
    }
  }
})
</script>
<style src="./ProjectsList.scss" scoped lang="scss"></style>