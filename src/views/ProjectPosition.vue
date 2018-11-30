<template>
  <div>
    <div class="container workarea">
      <h3>Позиции</h3>
      <div class="row justify-content-between mb-2">
        <div class="col-lg-10">
          <div class="row">
            <template v-for="(item, index) in filterProps">
              <div class="col-lg-auto" :key="index">
                <FormInputText 
                  :code="item.code"
                  :type="item.type"
                  :value="item.value"
                  :required="false"
                  @changevalue="changeValue(index, $event)"
                />
              </div>
            </template>
          </div>
        </div>
        <div class="col-lg-auto">
          <a href="#" @click.prevent="downloadFile" title="Скачать" class="btn btn-primary line-height-1"><i class="material-icons">insert_drive_file</i></a>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 pr-0">
          <table class="table table-hover">
            <thead class="thead-light">
              <tr>
                <th class="py-3">#</th>
                <th class="py-3">Фраза</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in keywords" :key="index">
                <td>{{ index + 1}}</td>
                <td class="py-0 align-middle">{{ item.UF_NAME }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-8 pl-0">
          <div class="table-responsive">
            <table class="table table-hover text-center">
              <thead class="thead-light">
                <tr>
                  <th class="py-3" v-for="(date, index) in arDateSelect" :key="index"><span class="table-data">{{ date }}</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in keywords" :key="index">
                  <td v-for="(position, key) in item.positions" :key="key">
                    <span v-if="!!position">{{ position }}</span>
                    <span v-else>>100</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import FormInputText from '@/components/FormInputText/FormInputText.vue'

export default Vue.extend({
  name: 'project_position',
  components: {
    FormInputText
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
      ],
      filterProps: [
        {
          code: 'dateStart',
          name: 'С',
          type: 'date',
          value: '2018-10-22'
        },
        {
          code: 'dateEnd',
          name: 'По',
          type: 'date',
          value: '2018-10-31'
        }
      ],
      id: parseInt(this.$route.params.id),
      keywords: []
    }
  },
  computed: {
    diffDate: function() {
      let dateStart = new Date(this.dateStart)
      let dateEnd = new Date(this.dateEnd)
      let diffDate = new Date(+dateEnd - +dateStart)
      return Math.ceil(diffDate / (1000 * 3600 * 24)) + 1
    },
    arDateSelect: function() {
      let arDateStr = []

      for(let j = 0; j < this.diffDate; j++) {
        var date = new Date(this.dateStart)
        date.setDate(date.getDate() + j)
        let dateStr = date.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' })
        arDateStr.push(dateStr);
      }

      return arDateStr
    },
    dateStart: function() {
      let prop = this.filterProps.find((item) => item.code == 'dateStart')
      return prop.value
    },
    dateEnd: function() {
      let prop = this.filterProps.find((item) => item.code == 'dateEnd')
      return prop.value
    }
  },
  methods: {
    getProjectKeywords() {
      this.$store.dispatch('getKeywords', this.id).then((keywords) => {

        let arKeywordsId = keywords.map((item) => { return item['ID'] })
        let dateStart = this.dateStart
        let dateEnd = this.dateEnd

        this.$store.dispatch('getPositions', { arKeywordsId, dateStart, dateEnd }).then((positions) => {
          for(let i = 0; i < keywords.length; i++) {
            let keywordPositions = positions.filter((item) => { return item.UF_KEYWORD === keywords[i].ID })

            keywords[i].positions = []

            let arDateSelect = this.arDateSelect

            for(let j = 0; j < arDateSelect.length; j++) {
              let datePosition = keywordPositions.filter((item) => { return item.UF_DATE === arDateSelect[j] })
              let position = (datePosition.length === 1) ? datePosition[0].UF_POSITION : '-'
              keywords[i].positions.push(position)
            }
          }

          this.keywords = keywords
        })
      })
    },
    changeValue(index, data) {
      this.filterProps[index].value = data.value
      this.keywords = []
      this.getProjectKeywords()
    },
    setDateDefault: function() {
      let date = new Date()
      let dateEnd = this.$store.getters.getDateStr(date)
      date.setDate(date.getDate() - 11)
      let dateStart = this.$store.getters.getDateStr(date)

      let indexDateStart = this.filterProps.findIndex((item) => item.code == 'dateStart')
      let indexDateEnd = this.filterProps.findIndex((item) => item.code == 'dateEnd')

      this.filterProps[indexDateStart].value = dateStart
      this.filterProps[indexDateEnd].value = dateEnd
    },
    downloadFile() {
      let props = {};
      props.projectId = this.id
      props.dateStart = this.dateStart
      props.dateEnd = this.dateEnd

      this.$store.dispatch('getFileProjectPosition', props)
    }
  },
  mounted() {
    this.$store.commit('setTopMenuPageLinks', this.links)
    this.setDateDefault()
    this.getProjectKeywords()
  }
})
</script>

<style lang="scss" scoped>
  .table-data {
    display: inline-block;
    transform: rotate(-45deg) translateX(-10px);
    font-size: 12px;
    width: 38px;
  }
</style>
