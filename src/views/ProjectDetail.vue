<template>
  <div>
    <div class="container workarea">
      <div class="row">
        <div class="col-lg-2 align-self-start mb-3" v-for="(prop, index) in props" :key="index">
          <strong>{{ prop.name }}</strong>
          <div v-if="prop.code == 'UF_USER' || prop.code == 'UF_MANAGER' || prop.code == 'UF_REGION' || prop.code == 'UF_COMPANY'">{{ $store.getters.getPropsName(prop.code, project[prop.code]) }}</div>
          <div v-else>{{ project[prop.code] }}</div>
        </div>
        <div class="col-lg-2 align-self-start mb-3">
          <strong>Топ 3</strong>
          <div>{{ top3 }}%</div>
        </div>
        <div class="col-lg-2 align-self-start mb-3">
          <strong>Топ 10</strong>
          <div>{{ top10 }}%</div>
        </div>
        <div class="col-lg-6 align-self-end text-right mb-3">
          <a href="#" @click.prevent="downloadFile" title="Скачать" class="btn btn-primary line-height-1"><i class="material-icons">insert_drive_file</i></a>
        </div>
        <!-- <div class="col-lg-2 align-self-start mb-3">
          <strong>Средняя позиция</strong>
          <div>{{ middleTop }}</div>
        </div> -->
      </div>
      <KeywordsList :items="keywords" @update="getProjectKeywords()" @updatePosition="updatePositionKeyword($event)"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import KeywordsList from '@/components/KeywordsList/KeywordsList.vue'

export default Vue.extend({
  name: 'project_view',
  components: {
    KeywordsList
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
          click: () => this.$router.go(-1),
          icon: 'close'
        }
      ],
      id: parseInt(this.$route.params.id),
      props: [
        {
          code: 'UF_NAME',
          name: 'Название'
        },
        {
          code: 'UF_ACTIVE',
          name: 'Активность'
        },
        {
          code: 'UF_COMPANY',
          name: 'Компания'
        },
        {
          code: 'UF_DOMAIN',
          name: 'Домен'
        },
        {
          code: 'UF_REGION',
          name: 'Регион'
        },
        {
          code: 'UF_USER',
          name: 'SEO-специалист'
        },
        {
          code: 'UF_MANAGER',
          name: 'Менеджер'
        }
      ],
      project: {},
      keywords: []
    }
  },
  computed: {
    top3: function() {
      return this.$store.getters.getTop(this.keywords, 3)
    },
    top10: function() {
      return this.$store.getters.getTop(this.keywords, 10)
    },
    // middleTop: function() {
    //   return this.$store.getters.getMiddlePosition(this.keywords)
    // }
  },
  methods: {
    getProject() {
      this.$store.dispatch('getProjectDetail', this.id).then((projectDetail) => {
        let project = projectDetail

        project.UF_ACTIVE = (project.UF_ACTIVE) ? 'Да' : 'Нет'

        this.project = project
      })
    },
    getProjectKeywords() {
      this.$store.dispatch('getKeywords', this.id).then((keywords) => {
        this.keywords = keywords
      })
    },
    updatePositionKeyword(data) {
      let index = this.keywords.findIndex((item) => item.ID === data.keywordsId)
      this.keywords[index].UF_POSITION = data.keywords.position
      this.keywords[index].UF_YANDEX_PAGE = data.keywords.yandexPage
    },
    downloadFile() {
      this.$store.dispatch('getFileProjectKeywords', this.id)
    }
  },
  mounted() {
    this.$store.commit('setTopMenuPageLinks', this.links)
    this.getProject()
    this.getProjectKeywords()
  }
})
</script>