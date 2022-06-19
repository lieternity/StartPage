<template>
  <div class="buttonlist">
    <router-link class="usericon" to="/">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-home-fill"></use>
      </svg>
    </router-link>
    <div @click="back" class="returnicon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-return"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "btnGroup",
  methods:{
    back(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.buttonlist {
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;

}

.usericon, .returnicon {
  margin-left: 18px;
}

svg {
  color: #757575;
  font-size: 24px;
}
</style>