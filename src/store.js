import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'

Vue.use(Vuex)

let topMenuLeftLinks = [
  {
    name: 'Главная',
    href: '/',
    icon: 'home'
  },
  {
    name: 'Добавить проект',
    href: '/project/add',
    icon: 'add'
  },
  {
    name: 'Архив',
    href: '/project/archive',
    icon: 'archive'
  },
  {
    name: 'Отчеты',
    href: '/reports/',
    icon: 'description'
  },
  {
    name: 'CRM',
    link: 'http://seoprostors.ru',
    icon: 'desktop_windows'
  }
]

export default new Vuex.Store({
  state: {
    apiSrc: 'http://seoprostors.ru/seo/api/',
    topMenuLeftLinks: topMenuLeftLinks,
    topMenuRightLinks: [],
    projectName: '',
    projectProps: {
      UF_COMPANY: [],
      UF_REGION: [],
      UF_USER: [],
      UF_MANAGER: []
    }
  },
  getters: {
    getPropsName: (state) => (code, value) => {
      let prop = state.projectProps[code].find(item => item.value === value)
      return (prop) ? prop.name : ''
    },
    getTop: (state) => (keywords, top) => {
      let arTop = keywords.filter((item) => (!!item.UF_POSITION && item.UF_POSITION <= top))
      let topPercent = Math.ceil((arTop.length * 100) / keywords.length)
      return topPercent
    },
    getMiddlePosition: (state) => (keywords) => {
      let positionSum = 0
      for(let i = 0; i < keywords.length; i++) {
        positionSum += (!!keywords[i].UF_POSITION) ? +keywords[i].UF_POSITION : 0
      }
      let positionMiddle = Math.ceil(positionSum / keywords.length)
      return positionMiddle
    },
    ldgZero: (state) => (n) => {
      return '0'.substring(n >= 10) + n
    },
    getDateStr: (state, getters) => (date) => {
      return date.getFullYear() + '-' + getters.ldgZero(date.getMonth() + 1) + '-' + date.getDate()
    }
  },
  mutations: {
    setTopMenuPageLinks(state, links) {
      state.topMenuRightLinks = links
    },
    setProjectName(state, name) {
      state.projectName = name
    },
    setProjectProps(state, prop) {
      state.projectProps[prop.code] = prop.list
    }
  },
  actions: {
    getProjectProps(store) {
      store.dispatch('getCompany')
      store.dispatch('getRegions')
      store.dispatch('getUsers')
      store.dispatch('getManagers')
    },

    getCompany(store) {
      axios.get(store.state.apiSrc + 'companyList.php').then((response) => {
        let company = response.data.company
        store.commit('setProjectProps', { code: 'UF_COMPANY', list: company })
      })
    },

    getRegions(store) {
      axios.get(store.state.apiSrc + 'regionList.php').then((response) => {
        let regions = response.data.region
        store.commit('setProjectProps', { code: 'UF_REGION', list: regions })
      })
    },

    getUsers(store) {
      axios.get(store.state.apiSrc + 'userList.php').then((response) => {
        let users = response.data.user
        store.commit('setProjectProps', { code: 'UF_USER', list: users })
      })
    },

    getManagers(store) {
      axios.get(store.state.apiSrc + 'managerList.php').then((response) => {
        let managers = response.data.manager
        store.commit('setProjectProps', { code: 'UF_MANAGER', list: managers })
      })
    },

    getProjects(store) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'projectList.php').then((response) => {
          let projects = response.data.projects
          resolve(projects)
        })
      })
    },
    getProjectDetail(store, projectId) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'projectDetail.php', {
          params: {
            ID: projectId
          }
        }).then((response) => {
          let project = response.data.project
          store.commit('setProjectName', project.UF_NAME)
          resolve(project)
        })
      })
    },
    getProjectsArchive(store) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'projectArchive.php').then((response) => {
          let projects = response.data.projects
          resolve(projects)
        })
      })
    },
    getProjectEdit(store, id) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'projectEdit.php', {
          params: {
            ID: id
          }
        }).then((response) => {
          let project = response.data.project
          resolve(project)
        })
      })
    },
    addProject(store, item) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'projectAdd.php', {
          params: {
            PROJECT: item
          }
        }).then((response) => {
          resolve()
        })
      })
    },
    updateProject(store, item) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'projectUpdate.php', {
          params: {
            PROJECT: item
          }
        }).then((response) => {
          resolve()
        })
      })
    },
    deleteProject(store, id) {
      if(confirm('Удалить проект?')) {
        axios.get(store.state.apiSrc + 'projectDelete.php', {
          params: {
            ID: id
          }
        }).then((response) => {
          setTimeout(() => router.push({path: '/'}), 500)
        })
      }
    },

    getKeywords(store, projectId) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'keywordsList.php', {
          params: {
            PROJECT_ID: projectId
          }
        }).then((response) => {
          let keywords = response.data.keywords
          resolve(keywords)
        })
      })
    },
    getKeywordsEdit(store, projectId) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'keywordsEdit.php', {
          params: {
            PROJECT_ID: projectId
          }
        }).then((response) => {
          let keywords = response.data.keywords
          resolve(keywords)
        })
      })
    },
    addKeywords(store, keywords) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'keywordsAdd.php', {
          params: {
            KEYWORDS: keywords
          }
        }).then((response) => {
          resolve()
        })
      })
    },
    updateKeywords(store, keywords) {
      return new Promise((resolve, reject) => {
        axios.post(store.state.apiSrc + 'keywordsUpdate.php', {
          KEYWORDS: keywords
        }).then((response) => {
          resolve()
        });
      })
    },
    deleteKeyword(store, keywordsId) {
      if(confirm('Удалить фразу?')) {
        return new Promise((resolve, reject) => {
          axios.get(store.state.apiSrc + 'keywordsDelete.php', {
            params: {
              ID: keywordsId
            }
          }).then((response) => {
            resolve()
          })
        })
      }
    },

    getPositions(store, { arKeywordsId, dateStart, dateEnd }) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'positionList.php', {
          params: {
            KEYWORDS_ID: arKeywordsId,
            DATE_START: dateStart,
            DATE_END: dateEnd
          }
        }).then((response) => {
          let positions = response.data.positions
          resolve(positions)
        })
      })
    },
    updatePosition(store, keywordsId) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'positionUpdate.php', {
          params: {
            KEYWORDS_ID: keywordsId
          }
        }).then((response) => {
          let keywords = response.data
          resolve(keywords)
        })
      })
    },

    getFileProjectKeywords(store, projectId) {
      return new Promise((resolve, reject) => {
        //window.open(store.state.apiSrc + 'xls/getFileProjectKeywords.php?PROJECT_ID=' + projectId)
        window.location.href = store.state.apiSrc + 'xls/getFileProjectKeywords.php?PROJECT_ID=' + projectId
      })
    },
    getFileProjectPosition(store, props) {
      return new Promise((resolve, reject) => {
        //window.open(store.state.apiSrc + 'xls/getFileProjectPosition.php?PROJECT_ID=' + projectId)
        window.location.href = store.state.apiSrc + 'xls/getFileProjectPosition.php?PROJECT_ID=' + props.projectId + '&DATE_START=' + props.dateStart + '&DATE_END=' + props.dateEnd
      })
    },

    getReportYandexMetrika(store, props) {
      return new Promise((resolve, reject) => {
        window.location.href = store.state.apiSrc + 'reports/createdReport.php?ID=' + props.ID + '&date1=' + props.date1 + '&date2=' + props.date2 + '&save=' + props.save
      });
    },

    getReportZip(store) {
      return new Promise((resolve, reject) => {
        window.location.href = store.state.apiSrc + 'reports/zipReports.php'
      });
    },

    getReportYandexMetrikaSave(store, props) {
      return new Promise((resolve, reject) => {
        axios.get(store.state.apiSrc + 'reports/createdReport.php', {
          params: {
            ID: props.ID,
            date1: props.date1,
            date2: props.date2,
            save: props.save
          }
        }).then((response) => {
          resolve(response.data.save)
        })
      })
    }
  }
})
