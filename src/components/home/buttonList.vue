<template>
  <div class="buttonlist">
    <router-link class="usericon" to="/user">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-user"></use>
      </svg>
    </router-link>
    <router-link class="seticon" to="/setting">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-setting-filling"></use>
      </svg>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "buttonList"
}
</script>

<style scoped>
.buttonlist {
  position: fixed;
  top: 20px;
  right: 30px;
  width: 120px;

}

.usericon, .seticon {
  display: inline-block;
  line-height: 48px;
  text-align: center;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
}
.usericon:hover, .seticon:hover{
  animation: changeSize 0.2s forwards;
}

svg {
  color: rgba(0, 0, 0, .5) !important;
  font-size: 24px;
}
@keyframes changeSize {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.05);
    transform: scale(1.1);
  }

  to {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
}
</style>