<template>
  <div :style="{fontSize:font_size + ' !important',fontFamily:font_family+ ' !important'}"
       :class="{darkTheme:darkTheme}" style="height: 100%">
    <loading-global v-if="showLoading"></loading-global>
    <router-view></router-view>
<!--    <right-click/>-->
  </div>
</template>

<script>

import LoadingGlobal from "@/components/home/loadingGlobal";
// import RightClick from "@/components/rightClick";

export default {
  name: "App",
  components: {/*RightClick,*/ LoadingGlobal},
  data() {
    return {
      lllllll:true,
      darkTheme: "",
      font_size: this.getFontSize(),
      font_family: this.getfontFamily(),
      showLoading: this.getLoadingAnimation()
    }
  },
  methods: {
    getLoadingAnimation() {
      return localStorage.getItem("loadingAnimation") === "true"
    },
    changeTheme() {
      this.$bus.$emit("darkTheme", this.darkTheme)
    },
    getfontFamily() {
      try {
        return (JSON.parse(localStorage.getItem("font_style"))).fontFamily
      } catch (e) {
        return ""
      }
    },
    getFontSize() {
      try {
        return (JSON.parse(localStorage.getItem("font_style"))).fontSize + "px"
      } catch (e) {
        return ""
      }
    },
  },
  beforeMount() {
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        this.showLoading = false
      }
    }
  },
  mounted() {
    var wave = localStorage.getItem("wave");
    if (wave !== "false") document.getElementsByTagName("baozi")[0].style.display = "block";
    this.$bus.$on("giveFontSize", (value) => {
      this.font_size = value + 'px'
      let font_style = JSON.parse(localStorage.getItem("font_style"));
      font_style.fontSize = value
      localStorage.setItem("font_style", JSON.stringify(font_style))
    })
    this.$bus.$on("giveFontFamily", (value) => {
      this.font_family = value
      let font_style = JSON.parse(localStorage.getItem("font_style"));
      font_style.fontFamily = value
      localStorage.setItem("font_style", JSON.stringify(font_style))
    })
    console.log('\n' + ' %c 包子起始页 %c https://search.bugjava.cn ' + '\n', 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');
  },
  beforeCreate() {
    this.$bus.$on("loadpage", (value) =>{
      if (value === true || value === false) {
        this.showLoading = value
      } else {
        this.showLoading = !this.showLoading
      }
    })
    if (!localStorage.getItem("ThemeColor")) {
      localStorage.setItem("ThemeColor", "followTheSystem")
    }
    if (!localStorage.getItem("ThemeBackGround")) {
      localStorage.setItem("ThemeBackGround", "img")
    }
    if (!localStorage.getItem("imgSrc")) {
      localStorage.setItem("imgSrc", "https://archive.biliimg.com/bfs/archive/f50cde64f88a92d5c8d82a71d755f877d7d6f7e1.jpg")
    }
    if (!localStorage.getItem("videoSrc")) {
      localStorage.setItem("videoSrc", "https://prod-streaming-video-msn-com.akamaized.net/a8c412fa-f696-4ff2-9c76-e8ed9cdffe0f/604a87fc-e7bc-463e-8d56-cde7e661d690.mp4")
    }
    if (!localStorage.getItem("gradient")) {
      localStorage.setItem("gradient", "true")
    }
    if (!localStorage.getItem("hitokotoClass")) {
      localStorage.setItem("hitokotoClass", "hitokoto")
    }
    if (!localStorage.getItem("loadingAnimation")) {
      localStorage.setItem("loadingAnimation", "false")
    }
    if (!localStorage.getItem("wave")) {
      localStorage.setItem("wave", "false")
    }
    if (!localStorage.getItem("upimgurl")) {
      localStorage.setItem("upimgurl", "true")
    }
    if (!localStorage.getItem("font_style")) {
      localStorage.setItem("font_style", JSON.stringify({
        fontSize: 16,
        fontFamily: 'Noto Sans SC'
      }))
    }
  },
}
</script>

<style>

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

@font-face {
  font-family: PingFang;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/PingFang.woff2");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: font_pr1;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/1.woff2");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: font_pr2;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/2.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr3;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/3.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr4;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/4.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr5;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/5.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr6;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/6.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr7;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/7.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr8;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/8.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr9;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/9.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr10;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/10.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr11;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/11.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr12;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/12.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr13;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/13.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr14;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/14.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr15;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/15.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr16;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/16.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr17;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/17.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr18;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/18.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr19;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/19.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: font_pr20;
  src: url("https://gh.api.99988866.xyz/https://raw.githubusercontent.com/acodegod/pic-cdn/main/2022/Fonts-main/20.woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

</style>
