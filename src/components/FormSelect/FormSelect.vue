<template>
  <div>
    <label class="form__label" :for="'prop_' + code +'_' + index">
      <span>{{ name }}</span>
      <i class="material-icons form__icon" :class="validClass" v-if="active">{{ validIcon }}</i>
    </label>
    <select class="form__select" :id="'prop_' + code +'_' + index" :value="value" @input="onInput($event)">
      <option value="">-- Не выбрано --</option>
      <option v-for="item in list" :value="item.value">{{ item.name }}</option>
    </select>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'FormSelect',
  props: {
    code: String,
    name: String,
    list: Array,
    value: [String, Number],
    required: Boolean,
    index: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      active: false
    }
  },
  computed: {
    pattern() {
      return this.required ? new RegExp(/.+/) : new RegExp(/.*/)
    },
    validIcon() {
      return this.pattern.test(this.value) ? 'check_circle' : 'error'
    },
    validClass() {
      return this.pattern.test(this.value) ? 'form__icon--success' : 'form__icon--error'
    }
  },
  methods: {
    onInput($event){
      this.active = true

      this.$emit('changevalue', {
        value: $event.target.value,
        error: !this.pattern.test($event.target.value)
      })
    }
  },
  mounted() {
    this.$emit('changevalue', {
      value: this.value,
      error: !this.pattern.test(this.value)
    })
  }
})
</script>
<style src="./FormSelect.scss" scoped lang="scss"></style>