<template>
  <div>
    <label class="form__label" :for="'prop_' + code +'_' + index">
      <template v-if="!!name">
        <span>{{ name }}</span>
        <i class="material-icons form__icon" :class="validClass" v-if="active">{{ validIcon }}</i>
      </template>
    </label>
    <input class="form__input" :id="'prop_' + code +'_' + index" :type="type" :value="value" @input="onInput($event)">
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'FormInputText',
  props: {
    code: String,
    name: String,
    type: String,
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
  created() {
    this.$emit('changevalue', {
      value: this.value,
      error: !this.pattern.test(this.value)
    })
  }
})
</script>
<style src="./FormInputText.scss" scoped lang="scss"></style>