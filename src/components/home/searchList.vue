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
import jQuery from "jquery";
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
  },
  mounted() {
    this.$bus.$on("getCandidates", (value) => {
      if (value === "") {
        this.candidates = [];
      } else {
        // const url = process.env.VUE_APP_SERVE + '/api/baidusug';
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
  },
  beforeMount() {
    jQuery(document).keydown(function(event) {
    var $active;
    if (event.keyCode == 40) {
      $active = jQuery(".searchCandidateBackground .active");
      if ($active.length == 0 && jQuery(".searchCandidateBackground ul li").length > 0) {
        jQuery(".searchCandidateBackground li:first-child").addClass("active");
      } else {
        $active.removeClass("active");
        $active.next().addClass("active");
      }
    }
    if (event.keyCode == 38) {
      $active = jQuery(".searchCandidateBackground .active");
      if ($active.length == 0 && jQuery(".searchCandidateBackground ul li").length > 0) {
        jQuery(".searchCandidateBackground li:last-child").addClass("active");
      } else {
        $active.removeClass("active");
        $active.prev().addClass("active");
      }
    }
    });
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
  z-index: 2;
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
  transition: all 0.1s;
}

.active {
  text-indent: 20px;
  cursor: pointer;
  background-color: #b5b5b5;
}
</style>