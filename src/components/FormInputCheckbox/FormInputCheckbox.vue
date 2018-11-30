<template>
  <div>
    <input class="form__checkbox" :id="'prop_' + code +'_' + index" type="checkbox" :checked="value" @change="onInput($event)">
    <label class="form__label" :for="'prop_' + code +'_' + index">
      <span>{{ name }}</span>
      <i class="material-icons form__icon" :class="validClass" v-if="active">{{ validIcon }}</i>
    </label>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'FormInputCheckbox',
  props: {
    code: String,
    name: String,
    value: Boolean,
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
      return this.required ? new RegExp(/true/) : new RegExp(/.*/)
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
        value: $event.target.checked,
        error: !this.pattern.test($event.target.checked)
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
<style src="./FormInputCheckbox.scss" scoped lang="scss"></style>