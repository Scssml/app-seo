<template>
  <div>
    <div class="container workarea">
      <h3>Список архивных проектов</h3>
      <ProjectsList :headers="headers" :items="items"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ProjectsList from '@/components/ProjectsList/ProjectsList.vue'

export default Vue.extend({
  name: 'project_archive',
  components: {
    ProjectsList
  },
  data() {
    return {
      filters: {
        project: {
          name: 'Название проекта',
          type: 'text',
          value: ''
        },
        user: {
          name: 'SEO-специалист',
          type: 'section',
          value: '',
          list: [
            {
              name: 'SEO-специалист 1',
              value: 1
            },
            {
              name: 'SEO-специалист 2',
              value: 2
            },
            {
              name: 'SEO-специалист 3',
              value: 3
            },
            {
              name: 'SEO-специалист 4',
              value: 4
            },
            {
              name: 'SEO-специалист 5',
              value: 5
            }
          ]
        }
      },
      links: [
        {
          name: 'Закрыть',
          click: () => this.$router.go(-1),
          icon: 'close'
        }
      ],
      headers: [
        'Название',
        // 'Менеджер',
        // 'SEO-специалист',
        'Топ 3',
        'Топ 10',
        // 'Среднее'
      ],
      items: new Array()
    }
  },
  methods: {
    getProjects() {
      this.$store.dispatch('getProjectsArchive').then((projects) => {
        this.items = projects
      })
	  }
  },
  mounted() {
    this.$store.commit('setTopMenuPageLinks', this.links)
    this.getProjects()
  }
})
</script>
