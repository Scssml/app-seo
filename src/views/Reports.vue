<template>
  <div class="container workarea">
    <h3>Отчеты</h3>
    <form @submit.prevent="submitForm()">
      <div class="row">
        <div class="col-lg-3 align-self-end mb-3" v-for="(prop, index) in props">
          <FormSelect
            :code="prop.code"
            :name="prop.name"
            :list="prop.list"
            :value="prop.value"
            :required="prop.required"
            :key="index"
            @changevalue="changeValue(index, $event)"
            v-if="prop.type == 'select'"
          />
          <FormInputText 
            :code="prop.code"
            :name="prop.name"
            :type="prop.type"
            :value="prop.value"
            :required="prop.required"
            :key="index"
            @changevalue="changeValue(index, $event)"
            v-else
          />
        </div>
        <div class="col-lg-3 align-self-end mb-3">
          <input type="submit" class="form__submit btn btn-success w-100" :disabled="checkValid" value="Создать">
        </div>
      </div>
    </form>
    <a href="#" class="btn btn-primary mb-3" v-if="completedProjectsAll" @click.prevent="downloadFile()">Скачать</a>
    <div class="row" v-if="this.props[0].value == 'All'">
      <div class="col-lg-3 mb-3" v-for="(item, index) in projects" :key="index">
        <div :class="(item.completed) ? 'bg-success text-white' : 'bg-light text-dark'" class="h-100 py-2 px-3 border border-secondary">{{ item.UF_NAME }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import FormInputText from '@/components/FormInputText/FormInputText.vue'
import FormSelect from '@/components/FormSelect/FormSelect.vue'

export default Vue.extend({
  name: 'reports',
    components: {
    FormInputText,
    FormSelect
  },
  data() {
    return {
      projects: [],
      props: [
        {
          code: 'ID',
          name: 'Проект',
          type: 'select',
          value: '',
          required: true,
          list: this.projects
        },
        {
          code: 'date1',
          name: 'С',
          type: 'date',
          value: '',
          required: true,
        },
        {
          code: 'date2',
          name: 'По',
          type: 'date',
          value: '',
          required: true
        },
      ]
    }
  },
  computed: {
    checkValid() {
      function checkError(item) {
        return item.error
      }

      return this.props.some(checkError)
    },
    completedProjectsAll() {
      function checkCompleted(item) {
        return !!item.completed
      }

      return this.projects.every(checkCompleted)
    }
  },
  methods: {
    changeValue(index, data) {
      this.props[index].value = data.value
      if(this.props[index].error === undefined) {
        Vue.set(this.props[index], 'error', data.error)
      } else {
        this.props[index].error = data.error
      }
    },
    clearForm() {
      this.success = false

      for(let i = 0; i < this.props.length; i++) {
        this.props[i].value = (this.props[i].type == 'checkbox') ? false : ''
      }
    },
    submitForm() {
      let props = {};
      props.ID = this.props[0].value
      props.date1 = this.props[1].value
      props.date2 = this.props[2].value
      props.save = 'N'

      if(props.ID == 'All'){
        for(let i = 0; i < this.projects.length; i++) {
          let item = this.projects[i]
          let projectId = item.ID

          item.completed = false
          this.$set(this.projects, i, item)

          props.ID = projectId
          props.save = 'Y'
          this.$store.dispatch('getReportYandexMetrikaSave', props).then((save) => {
            item.completed = save
            this.$set(this.projects, i, item)
          });
        }
      }
      else {
        this.$store.dispatch('getReportYandexMetrika', props)
      }
    },
    getProjects() {
      this.$store.dispatch('getProjects').then((projects) => {
        this.projects = projects

        let items = [{
          name: 'Все проекты',
          value: 'All'
        }]
        for(let i = 0; i < projects.length; i++) {
          items.push({
            name: projects[i].UF_NAME,
            value: projects[i].ID
          })
        }
        this.props[0].list = items
      })
    },
    downloadFile() {
      this.$store.dispatch('getReportZip')
    }
  },
  mounted() {
    this.$store.commit('setTopMenuPageLinks', this.links)
    this.getProjects()
  }
});
</script>

<style lang="scss" scoped>
  .text-line-through {
    text-decoration: line-through;
  }
</style>
