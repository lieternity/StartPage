<template>
  <div :class="{darkTheme:darkTheme}" style="height: 100%">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      darkTheme: ""
    }
  },
  methods: {
    changeTheme() {
      this.$bus.$emit("darkTheme", this.darkTheme)
    }
  },
  mounted() {
    if (localStorage.getItem("ThemeColor") === "followTheSystem") {
      if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
        console.log('Browser doesn\'t support dark mode');
      }

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.darkTheme = true
        this.changeTheme()
      }
      var listeners = {
        dark: (mediaQueryList) => {
          if (mediaQueryList.matches) {
            this.darkTheme = true
            this.changeTheme()
          }
        },
        light: (mediaQueryList) => {
          if (mediaQueryList.matches) {
            this.darkTheme = false
            this.changeTheme()
          }
        }
      }

      window.matchMedia('(prefers-color-scheme: dark)').addListener(listeners.dark)
      window.matchMedia('(prefers-color-scheme: light)').addListener(listeners.light)
    } else if (localStorage.getItem("ThemeColor") === "darkTheme") {
      this.darkTheme = true
      this.changeTheme()
    } else {
      this.darkTheme = false
      this.changeTheme()
    }
  },
  beforeCreate() {
    if (!localStorage.getItem("ThemeColor")) {
      localStorage.setItem("ThemeColor", "followTheSystem")
    }
    if (!localStorage.getItem("ThemeBackGround")) {
      localStorage.setItem("ThemeBackGround", "solidColor")
    }
    if (!localStorage.getItem("imgSrc")) {
      localStorage.setItem("imgSrc", "https://s1.ax1x.com/2022/06/19/XjgCGV.jpg")
    }
    if (!localStorage.getItem("gradient")) {
      localStorage.setItem("gradient", "false")
    }
  },
}
</script>

<style>
html {
  width: 100%;
  height: 100%;
}

body {
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: microsoft yahei light, microsoft yahei, pingfang sc, Helvetica, sans-serif, 等线;
  background-color: #333;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.darkTheme {
  filter: invert(.9) hue-rotate(.5turn);
}

</style>