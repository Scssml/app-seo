<template>
  <div>
    <div class="container workarea">
      <KeywordsEdit/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import KeywordsEdit from '@/components/KeywordsEdit/KeywordsEdit.vue'

export default Vue.extend({
  name: 'keywords_edit',
  components: {
    KeywordsEdit
  },
  data() {
    return {
      links: [
        {
          name: 'Изменить проект',
          href: '/project/' + this.$route.params.id + '/edit',
          icon: 'edit'
        },
        {
          name: 'Изменить фразы',
          href: '/project/' + this.$route.params.id + '/edit_keywords',
          icon: 'reorder'
        },
        {
          name: 'Добавить фразы',
          href: '/project/' + this.$route.params.id + '/add_keywords',
          icon: 'playlist_add'
        },
        {
          name: 'Позиции',
          href: '/project/' + this.$route.params.id + '/position',
          icon: 'trending_up'
        },
        {
          name: 'Удалить',
          click: () => this.$store.dispatch('deleteProject', parseInt(this.$route.params.id)),
          icon: 'delete'
        },
        {
          name: 'Закрыть',
          href: '/project/' + this.$route.params.id,
          icon: 'close'
        }
      ]
    }
  },
  mounted() {
    this.$store.commit('setTopMenuPageLinks', this.links)
  }
})
</script>