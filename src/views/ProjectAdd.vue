<template>
  <div>
    <div class="container workarea">
      <h3>Добавление проекта</h3>
      <div class="alert alert-success" v-if="success">Проект добавлен</div>
      <div class="alert alert-danger" v-if="error">Ошибка</div>
      <form @submit.prevent="submitForm()" v-if="!success">
        <div class="row">
          <div class="col-lg-4 align-self-end mb-3" v-for="(prop, index) in props">
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
            <FormInputCheckbox
              :code="prop.code"
              :name="prop.name"
              :value="prop.value"
              :required="prop.required"
              :key="index"
              @changevalue="changeValue(index, $event)"
              v-else-if="prop.type == 'checkbox'"
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
        </div>
        <input type="submit" class="form__submit btn btn-success" :disabled="checkValid" value="Сохранить">
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import FormInputText from '@/components/FormInputText/FormInputText.vue'
import FormSelect from '@/components/FormSelect/FormSelect.vue'
import FormInputCheckbox from '@/components/FormInputCheckbox/FormInputCheckbox.vue'

export default Vue.extend({
  name: 'project_add',
  components: {
    FormInputText,
    FormSelect,
    FormInputCheckbox
  },
  data() {
    return {
      links: [
        {
          name: 'Закрыть',
          click: () => this.$router.go(-1),
          icon: 'close'
        }
      ],
      success: false,
      error: false,
      props: [
        {
          code: 'UF_NAME',
          name: 'Название',
          type: 'text',
          value: '',
          required: true
        },
        {
          code: 'UF_COMPANY',
          name: 'Компания',
          type: 'select',
          value: '',
          required: false,
          list: this.$store.state.projectProps.UF_COMPANY
        },
        {
          code: 'UF_DOMAIN',
          name: 'Домен',
          type: 'text',
          value: '',
          required: true
        },
        {
          code: 'UF_REGION',
          name: 'Регион',
          type: 'select',
          value: '',
          required: true,
          list: this.$store.state.projectProps.UF_REGION
        },
        {
          code: 'UF_COUNTER_ID',
          name: 'ID счетчика',
          type: 'number',
          value: '',
          required: true
        },
        {
          code: 'UF_USER',
          name: 'SEO-специалист',
          type: 'select',
          value: '',
          required: true,
          list: this.$store.state.projectProps.UF_USER
        },
        {
          code: 'UF_MANAGER',
          name: 'Менеджер',
          type: 'select',
          value: '',
          required: true,
          list: this.$store.state.projectProps.UF_MANAGER
        },
        {
          code: 'UF_ACTIVE',
          name: 'Активность',
          type: 'checkbox',
          value: true,
          required: false
        },
        {
          code: 'UF_NON_CASH',
          name: 'Безнал',
          type: 'checkbox',
          value: false,
          required: false
        },
        {
          code: 'UF_NOT_POSITION',
          name: 'Не учитывать позиции',
          type: 'checkbox',
          value: false,
          required: false
        },
        {
          code: 'UF_MIDDLE_POSITION',
          name: 'Считать среднюю позицию',
          type: 'checkbox',
          value: false,
          required: false
        }
      ]
    }
  },
  computed: {
    checkValid() {
      function checkError(item) {
        return item.error
      }

      return this.props.some(checkError)
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
      let project = {}
      let prop = {}

      this.success = false

      for(let i = 0; i < this.props.length; i++) {
        prop = this.props[i]
        project[prop.code] = prop.value
      }

      this.$store.dispatch('addProject', project).then(() => {
        this.success = true
        setTimeout(() => this.$router.push({path: '/'}), 500)
      })
    }
  },
  mounted() {
    this.$store.commit('setTopMenuPageLinks', this.links)
    if(this.$store.state.projectProps.UF_REGION.length == 0 && this.$store.state.projectProps.UF_USER.length == 0 && this.$store.state.projectProps.UF_MANAGER.length == 0){
      this.$router.push({path: '/'})
    }
  }
})
</script>