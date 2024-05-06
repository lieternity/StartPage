<template>
  <transition name="bounce">
    <div v-if="visible" class="message_container">
      <div class="msg-box">
        <div class="icon-em">
          <svg class="icon" aria-hidden="true">
            <use v-bind:xlink:href="styleDom[type].icon"></use>
          </svg>
        </div>
        <div class="msg-text">{{ text }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name:"MessageBox",
  props: {
    text: {
      type: String,
      default: "这是一条消息提示！",
    },
    type: {
      type: String,
      default: "info",
    },
    durition: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      visible: false,
      styleDom: {
        success: {
          icon:'#icon-success',
        },
        warn: {
          icon: "#icon-warning",
        },
        info: {
          icon: "#icon-info",
        },
        error: {
          icon: "#icon-error",
        },
      },
    };
  },
  mounted(){
    this.visible = true
    let timer = setTimeout(() => {
      this.visible = false
      clearTimeout(timer)
    }, this.durition+1000);
  }
};
</script>

<style scoped>
.message_container{
  z-index: 999999999999999999;
  position: fixed;
  height: 0;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 20px;
  left: 0;
  right: 0;
}
.msg-box {
  display: flex;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  padding: 12px 28px;
  border-radius: 25px;
  background-color: #00000030;
  color: #ffffff;
  white-space: nowrap;
  max-width: 720px;
  transform: translateY(50%);
  font-size: 16px;
  align-items: center;
  flex-wrap: nowrap;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, .24), 0 6px 12px 0 rgba(0, 0, 0, .16), 0 9px 18px 8px rgba(0, 0, 0, .10);
}
.icon-em {
  width: 20px;
  height: 20px;
  display: flex;
  position: relative;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  vertical-align: middle;
  margin-right: 10px;
  font-size: 20px;
  user-select: none;
}
.icon-em > * {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.msg-text {
  display: flex;
  vertical-align: middle;
  flex-wrap: wrap;
  width: 100%;
  font-size: 14px;
  overflow: hidden;
}
.bounce-enter-active {
  animation: bounce-in 0.3s;
  animation-timing-function: linear;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
  animation-timing-function: linear;
}
@keyframes bounce-in {
  from {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
  }

  50% {
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }

  to {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
