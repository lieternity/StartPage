<template>
  <div v-show="hour !== ''" class="clock">
    <div class="hours">
      <div class="first">
        <div class="number">{{ hour[0] }}</div>
      </div>
      <div class="second">
        <div class="number">{{ hour[1] }}</div>
      </div>
    </div>
    <div class="tick">:</div>
    <div class="minutes">
      <div class="first">
        <div class="number">{{ minute[0] }}</div>
      </div>
      <div class="second">
        <div class="number">{{ minute[1] }}</div>
      </div>
    </div>
    <div class="tick">:</div>
    <div class="seconds">
      <div class="first">
        <div class="number">{{ second[0] }}</div>
      </div>
      <div class="second infinite">
        <div class="number">{{ second[1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"

export default {
  name: "timeBox",
  data() {
    return {
      hour: "",
      minute: "",
      second: ""
    }
  },
  methods: {
    time() {
      let time = dayjs().format("HHmmss");
      this.hour = (time + "").substr(0, 2);
      this.minute = (time + "").substr(2, 4);
      this.second = (time + "").substr(4, 6);
    }
  },
  computed: {},
  mounted() {
    this.timeInterval = setInterval(this.time, 50);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval)
  }

}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.clock {
  height: 10vh;
  color: white;
  font-size: 6vh;
  font-family: sans-serif;
  line-height: 10.2vh;
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  top: 16%;
}

.clock:hover {
  animation: pulse_enter 0.5s linear;
}

.clock::after {
  bottom: 0;
  background: linear-gradient(to bottom, transparent, black);
}

.clock > div {
  display: flex;
}

.tick {
  line-height: 8vh;
}

.tick-hidden {
  opacity: 0;
}

.move {
  animation: move linear 1s infinite;
}

@keyframes move {
  from {
    transform: translateY(0vh);
  }
  to {
    transform: translateY(-20vh);
  }
}

@keyframes pulse_enter {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }
}


</style>