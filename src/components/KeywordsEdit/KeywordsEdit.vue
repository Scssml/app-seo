<template>
  <div>
    <h3>Изменение фраз</h3>
    <div class="alert alert-success" v-if="success">Фразы изменены</div>
    <div class="alert alert-danger" v-if="error">Ошибка</div>
    <form @submit.prevent="submitForm()" v-if="!success">
      <div class="row justify-content-end">
        <div class="col-lg-3 mb-3">
          <FormInputCheckbox
            code="checkboxAll"
            name="Не учитывать позиции"
            :value="checkboxAll"
            :required="false"
            key="checkboxAll"
            index="1"
            @changevalue="checkAll('UF_NOT_POSITION', $event)"
          />
        </div>
      </div>
      <div class="row border-bottom pb-3 mb-3" v-for="(keyword, indexKeyword) in keywords">
        <div class="col-lg-3 align-self-end mb-3">
          <FormInputText 
            :code="props[0].code"
            :name="props[0].name"
            :type="props[0].type"
            :value="keyword[props[0].code]"
            :required="props[0].required"
            :key="0"
            :index="indexKeyword"
            @changevalue="changeValue(indexKeyword, props[0].code, $event)"
          />
        </div>
        <div class="col-lg-3 align-self-end mb-3">
          <FormInputText 
            :code="props[1].code"
            :name="props[1].name"
            :type="props[1].type"
            :value="keyword[props[1].code]"
            :required="props[1].required"
            :key="1"
            :index="indexKeyword"
            @changevalue="changeValue(indexKeyword, props[1].code, $event)"
          />
        </div>
        <div class="col-lg-1 align-self-end mb-3">
          <FormInputText 
            :code="props[2].code"
            :name="props[2].name"
            :type="props[2].type"
            :value="keyword[props[2].code]"
            :required="props[2].required"
            :key="2"
            :index="indexKeyword"
            @changevalue="changeValue(indexKeyword, props[2].code, $event)"
          />
        </div>
        <div class="col-lg-2 align-self-end mb-3">
          <FormInputCheckbox
            :code="props[3].code"
            :name="props[3].name"
            :value="keyword[props[3].code]"
            :required="props[3].required"
            :key="3"
            :index="indexKeyword"
            @changevalue="changeValue(indexKeyword, props[3].code, $event)"
          />
        </div>
        <div class="col-lg-3 align-self-end mb-3">
          <FormInputCheckbox
            :code="props[4].code"
            :name="props[4].name"
            :value="keyword[props[4].code]"
            :required="props[4].required"
            :key="4"
            :index="indexKeyword"
            @changevalue="changeValue(indexKeyword, props[4].code, $event)"
          />
        </div>
      </div>
      <input type="submit" class="form__submit btn btn-success" :disabled="checkValid" value="Сохранить">
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import FormInputText from '@/components/FormInputText/FormInputText.vue'
import FormSelect from '@/components/FormSelect/FormSelect.vue'
import FormInputCheckbox from '@/components/FormInputCheckbox/FormInputCheckbox.vue'

export default Vue.extend({
  name: 'KeywordsEdit',
  components: {
    FormInputText,
    FormSelect,
    FormInputCheckbox
  },
  data() {
    return {
      id: parseInt(this.$route.params.id),
      success: false,
      error: false,
      checkboxAll: false,
      props: [
        {
          code: 'UF_NAME',
          name: 'Фраза',
          type: 'text',
          required: true
        },
        {
          code: 'UF_SEO_PAGE',
          name: 'Страница для продвижения',
          type: 'text',
          required: true
        },
        {
          code: 'UF_PRICE',
          name: 'Цена',
          type: 'number',
          required: true
        },
        {
          code: 'UF_ACTIVE',
          name: 'Активность',
          type: 'checkbox',
          required: false
        },
        {
          code: 'UF_NOT_POSITION',
          name: 'Не учитывать позиции',
          type: 'checkbox',
          required: false
        }
      ],
      keywords: [],
      errorsValid: []
    }
  },
  computed: {
    checkValid() {
      function checkError(item) {
        let error = false

        for(let prop in item) {
          (item[prop]) ? error = item[prop] : ''
        }

        return error
      }

      return this.errorsValid.some(checkError)
    }
  },
  methods: {
    getProjectKeywords() {
      this.$store.dispatch('getKeywordsEdit', this.id).then((keywordsEdit) => {
        let keywords = keywordsEdit

        if(keywords.length > 0) {
          this.keywords = keywords

          for(let i = 0; i < keywords.length; i++) {
            let props = {}
            let keyword = keywords[i]

            for(let j = 0; j < this.props.length; j++) {
              let prop = this.props[j]

              this.keywords[i][prop.code] = (this.props[j].type == 'checkbox') ? !!parseInt(keyword[prop.code]) : keyword[prop.code]
              props[this.props[j].code] = false
            }

            this.errorsValid.push(props)
          }
        } else {
          this.$router.push({path: `/project/${this.id}/add_keywords`})
        }
      })
    },
    changeValue(index, code, data) {
      this.keywords[index][code] = data.value
      this.errorsValid[index][code] = data.error
    },
    checkAll(propCode, data) {
      this.checkboxAll = data.value

      for(let i = 0; i < this.keywords.length; i++) {
        this.keywords[i][propCode] = this.checkboxAll
      }
    },
    submitForm() {
      this.success = false

      this.$store.dispatch('updateKeywords', this.keywords).then(() => {
        setTimeout(() => this.$router.push({path: `/project/${this.id}`}), 500)
        this.success = true
      })
    }
  },
  mounted() {
    this.$store.commit('setTopMenuPageLinks', this.links)
    this.getProjectKeywords()
  }
})
</script>
<style src="./KeywordsEdit.scss" scoped lang="scss"></style>