import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ProjectAdd from './views/ProjectAdd.vue'
import ProjectDetail from './views/ProjectDetail.vue'
import ProjectEdit from './views/ProjectEdit.vue'
import ProjectArchive from './views/ProjectArchive.vue'
import ProjectKeywordsEdit from './views/ProjectKeywordsEdit.vue'
import ProkectKeywordsAdd from './views/ProkectKeywordsAdd.vue'
import ProjectPosition from './views/ProjectPosition.vue'
import Reports from './views/Reports.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/project/add',
      name: 'project_add',
      component: ProjectAdd
    },
    {
      path: '/project/archive',
      name: 'project_archive',
      component: ProjectArchive
    },
    {
      path: '/project/:id',
      name: 'project_view',
      component: ProjectDetail
    },
    {
      path: '/project/:id/edit',
      name: 'project_edit',
      component: ProjectEdit
    },
    {
      path: '/project/:id/edit_keywords',
      name: 'keywords_edit',
      component: ProjectKeywordsEdit
    },
    {
      path: '/project/:id/add_keywords',
      name: 'keywords_add',
      component: ProkectKeywordsAdd
    },
    {
      path: '/project/:id/position',
      name: 'project_position',
      component: ProjectPosition
    },
    {
      path: '/reports',
      name: 'reports',
      component: Reports
    }
  ]
})
