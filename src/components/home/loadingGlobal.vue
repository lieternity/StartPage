<template>
  <div class="loadRoot">
    <div class="loader1">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loadingGlobal"
}
</script>

<style scoped>
.loadRoot {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999999999;
  /* 100%窗口高度 */
  height: 100vh;
  width: 100vw;
  /* 弹性布局 水平+垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 渐变背景 */
  /*background: linear-gradient(15deg, #13547a, #80d0c7);*/
  background-color: #FFFFFF;
}

.loader1 {
  width: 200px;
  height: 200px;
  /* 相对定位 */
  position: relative;
}

.loader1 div {
  border-width: 5px;
  border-style: solid;
  border-left-color: #fff;
  border-right-color: #fff;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  /* 绝对定位 */
  position: absolute;
  /* 执行动画：动画名 时长 慢速开始然后变快然后慢速结束 无限次播放 */
  animation: spin 2s ease infinite,colors 5s ease-in-out infinite;
}

/* 为每一个圆环设置大小、定位、动画延迟时间 */
.loader1 div:nth-child(1) {
  width: 50px;
  height: 50px;
  left: 70px;
  top: 70px;
}

.loader1 div:nth-child(2) {
  width: 70px;
  height: 70px;
  left: 60px;
  top: 60px;
  /* 动画延迟时间 */
  animation-delay: 0.1s;
}

.loader1 div:nth-child(3) {
  width: 90px;
  height: 90px;
  left: 50px;
  top: 50px;
  animation-delay: 0.2s;
}

.loader1 div:nth-child(4) {
  width: 110px;
  height: 110px;
  left: 40px;
  top: 40px;
  animation-delay: 0.3s;
}

/* 定义动画 */
@keyframes spin {
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0);
  }
}

@keyframes colors {
  0% {
    border-left-color: #4285F4;
    border-right-color: #4285F4;
  }
  25% {
    border-left-color: #DE3E35;
    border-right-color: #DE3E35;
  }
  50% {
    border-left-color: #F7C223;
    border-right-color: #F7C223;
  }
  75% {
    border-left-color: #1B9A59;
    border-right-color: #1B9A59;
  }
  100% {
    border-left-color: #4285F4;
    border-right-color: #4285F4;
  }
}

</style>