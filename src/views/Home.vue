<template>
  <div>
    <div class="container workarea">
      <h3>Список проектов</h3>
      <ProjectsList :headers="headers" :items="items"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ProjectsList from '@/components/ProjectsList/ProjectsList.vue'
import axios from 'axios'

export default Vue.extend({
  name: 'home',
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
      links: [],
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
      this.$store.dispatch('getProjects').then((projects) => {

        for(let i = 0; i < projects.length; i++) {
          this.$store.dispatch('getKeywords', projects[i].ID).then((keywords) => {
            projects[i].UF_TOP_3 = this.$store.getters.getTop(keywords, 3)
            projects[i].UF_TOP_10 = this.$store.getters.getTop(keywords, 10)
            projects[i].UF_MIDDLE_POSITION = this.$store.getters.getMiddlePosition(keywords)

            if(projects[i].UF_TOP_10 <= 49) {
              projects[i].color = 'red'
            } else if(projects[i].UF_TOP_10 <= 69) {
              projects[i].color = 'orange'
            } else {
              projects[i].color = 'green'
            }
          })
        }

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
