<template>
  <div class="searchCandidates">
    <div v-show="candidates.length" class="searchCandidateBackground">
      <ul>
        <li @mouseenter="changeActive($event)"
            @mouseleave="removeActive($event)"
            @click="$bus.$emit('startSearch',candidate)"
            v-for="candidate in candidates"
            :key="candidate">
          {{ candidate }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "searchList",
  data() {
    return {
      candidates: [],
      seen: false,
      current: 0
    }
  },
  methods: {
    changeActive($event) {
      $event.currentTarget.className = 'active';
    },
    removeActive($event) {
      $event.currentTarget.className = '';
    }
  }
  ,
  mounted() {
    this.$bus.$on("getCandidates", (value) => {
      if (value === "") {
        this.candidates = [];
      } else {
        const url = 'https://suggestion.baidu.com/su';
        this.$http.jsonp(url, {
          params: {
            wd: value
          },
          jsonp: 'cb'
        }).then(res => {
          if (res.data) {
            this.candidates = res.data.s
          } else {
            this.candidates = [];
          }
        });
      }
    })
  }
}
</script>

<style scoped>
.searchCandidates {
  position: absolute;
  width: 550px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.8;
}

.searchCandidates:hover {
  animation: searchFadeOut 0.2s forwards;
}

.searchCandidateBackground {

  height: auto;
  border-top: none;
  z-index: -1;
  font-size: medium;

  overflow-y: hidden;
  transition: .25s;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  width: 100%;
  align-content: center;
  background-color: #ffffff;
  border-radius: 12px;
}

ul {
  width: 100%;
  list-style: none;
  overflow: hidden;
  padding: 0;
}

li {
  line-height: 20px;
  width: 100%;
  height: 20px;
  padding: 5px;
}

.active {
  text-indent: 20px;
  cursor: pointer;
  background-color: #b5b5b5;
}
</style>