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
        const url = process.env.VUE_APP_SERVE + '/api/baidusug';
        this.$http.get(url, {
          params: {
            wd: value
          },
        }).then(res => {
          if (res.data.code === 200) {
            this.candidates = [];
            for (let value of res.data.s) {
              this.candidates.push(value.q)
            }
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
  animation: menuFadeOut 0.3s linear;
  overflow-y: hidden;
  transition: .25s;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  width: 100%;
  align-content: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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