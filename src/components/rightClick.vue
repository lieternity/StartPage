<template>
  <div class="userRightClick" style="left: 199px; top: 5px; display: none;">
    <ul>
      <li>
        <a href="/">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shouye"></use>
          </svg>
          <span>首页</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);" @click="getSelect();">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fuzhi"></use>
          </svg>
          <span>复制</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);" @click="stick();">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-niantie"></use>
          </svg>
          <span>粘贴</span>
        </a>
      </li>
      <li>
        <a href="javascript:history.go(1);">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-go-full"></use>
          </svg>
          <span>前进</span>
        </a>
      </li>
      <li>
        <a href="javascript:history.go(-1);">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-backward-full"></use>
          </svg>
          <span>后退</span>
        </a>
      </li>
      <li style="border-bottom:1px solid gray">
        <a href="javascript:window.location.reload();">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-htmal5icon23"></use>
          </svg>
          <span>刷新</span></a>
      </li>
      <li>
        <a target="_blank" href="https://blog.bugjava.cn">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-microblog"></use>
          </svg>
          <span>Blog</span>
        </a>
      </li>
      <li>
        <a target="_blank" href="https://api.bugjava.cn/">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-api"></use>
          </svg>
          <span>API</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import jQuery from "jquery"

export default {
  name: "rightClick",
  data() {
    return {
      clickNode: ""
    }
  },
  methods: {
    getSelect() {
      "" === (window.getSelection ? window.getSelection() : document.selection.createRange().text) ? this.$message({
        type: "warning",
        message: "请选择需要复制的内容！"
      }) : document.execCommand("Copy")
    },
    stick() {
      navigator.clipboard.readText().then(
          clipText => {
            this.clickNode.value += clipText
          }
      )
    }
  },
  beforeCreate() {
    document.oncontextmenu = (e) => {
      this.clickNode = e.target
      return false;
    }
    document.onkeydown = function () {
      //f12
      if (window.event && window.event.keyCode === 123) {
        event.keyCode = 0;
        event.returnValue = false;
        return false;
      }
      //ctrl+u
      if (event.ctrlKey && window.event.keyCode === 85) {
        return false;
      }
      //ctrl+shift+i
      if ((event.ctrlKey) && (event.shiftKey) && (event.keyCode === 73)) {
        return false;
      }
      // Ctrl+S
      else if ((event.ctrlKey) && (event.keyCode === 83)) {
        return false;
      }
    };


  },
  beforeMount() {
    (function (a) {
      a.extend({
        mouseMoveShow: function (b) {
          var d = 0,
              c = 0,
              h = 0,
              k = 0,
              e = 0,
              f = 0;
          a(window).mousemove(function (g) {
            d = a(window).width();
            c = a(window).height();
            h = g.clientX;
            k = g.clientY;
            e = g.pageX;
            f = g.pageY;
            h + a(b).width() >= d && (e = e - a(b).width() - 5);
            k + a(b).height() >= c && (f = f - a(b).height() - 5);
            a("html").on({
              contextmenu: function (c) {
                3 === c.which && a(b).css({
                  left: e,
                  top: f
                }).show()
              },
              click: function () {
                a(b).hide()
              }
            })
          })
        },
        disabledContextMenu: function () {
          window.oncontextmenu = function () {
            return !1
          }
        }
      })
    })(jQuery);

    jQuery(function () {
      for (var a = navigator.userAgent, b = "Android;iPhone;SymbianOS;Windows Phone;iPad;iPod".split(";"), d = !0, c = 0; c < b.length; c++) if (0 < a.indexOf(b[c])) {
        d = !1;
        break
      }
      d && (jQuery.mouseMoveShow(".userRightClick"), jQuery.disabledContextMenu())
    });


  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

div.userRightClick {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-color: #fff;
  font-size: 13px !important;
  width: 130px;
  -moz-box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
  box-shadow: 0 0 15px #333;
  position: absolute;
  display: none;
  z-index: 10000;
  opacity: 0.9;
  border-radius: 8px;
  overflow: hidden;
}

div.userRightClick ul {
  list-style-type: none;
  list-style-position: outside;
  margin: 0;
  padding: 0;
  display: block;
}

div.userRightClick ul li {
  margin: 0;
  padding: 0;
  line-height: 35px;
}

div.userRightClick ul li a {
  color: #666;
  padding: 0 15px;
  display: block;
}

div.userRightClick ul li a:hover {
  color: #fff;
  background: rgba(64, 158, 255, 0.88);
}

div.userRightClick ul li a svg {
  margin-right: 10px;
}

div.userRightClick {
  background: #fff !important;
}


</style>