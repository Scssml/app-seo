<template>
  <div id="app">
    <header class="top-panel bg-dark">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 align-self-center">
            <TopNav :links="$store.state.topMenuLeftLinks"/>
          </div>
          <div class="col-lg-6 align-self-center text-center top-panel__heading">
            {{ projectName }}
          </div>
          <div class="col-lg-3 align-self-center text-right">
            <TopNav :links="$store.state.topMenuRightLinks"/>
            <!--
            <div class="row">
              <div class="col-lg-6">
                <input class="form__input" :type="filters.project.type" v-model="filters.project.value" :placeholder="filters.project.name">
              </div>
              <div class="col-lg-6">
                <select class="form__select" v-model="filters.user.value">
                  <option value="">{{ filters.user.name }}</option>
                  <option v-for="item in filters.user.list" :value="item.value">{{ item.name }}</option>
                </select>
              </div>
            </div>
            -->
          </div>
        </div>
      </div>
    </header>
    <transition name="fade">
      <router-view :key="$route.name"/>
    </transition>
    <footer class="footer bg-dark"></footer>
  </div>
</template>

<script>
import Vue from 'vue'
import TopNav from '@/components/TopNav/TopNav.vue'

export default Vue.extend({
  components: {
    TopNav
  },
  computed: {
    projectName() {
      let id = parseInt(this.$route.params.id)
      return (id) ? this.$store.state.projectName : ''
    }
  },
  mounted() {
    this.$store.dispatch('getProjectProps')
  }
})
</script>

<style lang="scss">
  @import "../node_modules/bootstrap/scss/bootstrap";

  .pos-relative {
    position: relative;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity .5s ease-in-out .5s;
  }
  
  .fade-leave-active {
    transition: opacity .5s ease-in-out;
  }
  

  .slide-enter {
    transform: translateX(100%);
  }

  .slide-enter-active {
    transition: transform .5s ease-in-out .5s;
  }

  .slide-enter-to {
    transform: translateX(0);
  }

  .slide-leave {
    transform: translateX(0);
  }

  .slide-leave-active {
    transition: transform .5s ease-in-out;
  }

  .slide-leave-to {
    transform: translateX(-100%);
  }

  .top-panel {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 5;
    color: #fff;

    &__heading {
      font-size: 20px;
    }
  }
  .workarea {
    padding: 52px 15px 42px;
    /*
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    */
  }

  .line-height-1 {
    line-height: 1;
  }

  .btn-delete {
    position: absolute;
    text-indent: -999px;
    overflow: hidden;
    width: 20px;
    height: 20px;
    border: 2px solid red;
    border-radius: 50%;
    top: 0;
    right: 15px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      top: calc(50% - 1px);
      left: 0;
      background: red;
    }

    &:before {
      transform: rotate(45deg);
    }

    &:after {
      transform: rotate(-45deg);
    }
  }

  .footer {
    padding: 5px 0;
    min-height: 42px;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 5;
  }

  .form {
    
    &__input,
    &__select {
      display: inline-block;
      width: 100%;
      height: 32px;
      border: 1px solid #343a40;
      padding: 0 5px;
      outline: none;
    }

    &__submit {
      outline: none;
    }

    &__label {

      span {
        display: inline-block;
        vertical-align: middle;
      }
    }

    &__icon{
      vertical-align: middle;

      &--success {
        color: #006b00;
      }

      &--error {
        color: #d80000;
      }
    }
  }
</style>
