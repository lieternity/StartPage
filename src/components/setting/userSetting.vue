<template>
  <div class="userRoot" style=" width: 100%;margin-top: 20px; padding: 0 0 0 20px;">
    <h2>用户</h2>
    <el-card shadow="hover" class="box-card">
      <el-link class="signOut" @click="signOut" type="primary">退出登录</el-link>
      <el-avatar :size="80" :src="userInfo.avatar"></el-avatar>
      <div class="userName">
        {{ userInfo.name }}
      </div>
      <div class="createTime">
        注册时间：{{ createTime }}
      </div>
      <el-upload
          action=""
          class="alignContainer"
          :http-request="upload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
      >
        <div class="avatar-update">修改头像</div>
      </el-upload>

    </el-card>
    <el-switch
        v-model="upimgurl"
        active-text="GitHub图床"
        inactive-text="smms图床">
    </el-switch>
    <div class="userSettings">
      <el-button type="primary" round @click="changeInfo = true">修改用户名</el-button>
      <el-button type="info" round @click="uploadConfig = true">上传用户配置</el-button>
      <el-button type="success" round @click="syncConfig = true">同步用户配置</el-button>
      <el-button type="danger" round @click="deluser =true">注销用户</el-button>
      <el-dialog
          title="提示"
          :visible.sync="changeInfo"
          width="30%"
          center>
        <span>
          <el-input v-model="userInfo.name" placeholder="请输入新用户名"></el-input>
        </span>

        <span slot="footer" class="dialog-footer">
    <el-button @click="changeInfo = false">取 消</el-button>
    <el-button type="primary" @click="changeInfoFn">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog
          title="提示"
          :visible.sync="deluser"
          width="30%"
          center>
        <span>
         你确定？？？
        </span>

        <span slot="footer" class="dialog-footer">
    <el-button @click="deluser = false">取 消</el-button>
    <el-button type="primary" @click="deluserfn">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog
          title="提示"
          :visible.sync="uploadConfig"
          width="30%"
          center>
        <span>
         将本地的配置上传？？？
        </span>

        <span slot="footer" class="dialog-footer">
    <el-button @click="uploadConfig = false">取 消</el-button>
    <el-button type="primary" @click="uploadConfigFn">确 定</el-button>
  </span>
      </el-dialog>
      <el-dialog
          title="提示"
          :visible.sync="syncConfig"
          width="30%"
          center>
        <span>
         将云端的配置同步至本地？？？
        </span>

        <span slot="footer" class="dialog-footer">
    <el-button @click="syncConfig = false">取 消</el-button>
    <el-button type="primary" @click="syncConfigFn">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {Message} from "element-ui";
import {decodeBase64ToData, encodeDataToBase64} from "@/utils/base64Utils";


export default {
  name: "userSetting",
  data() {
    return {
      upimgurl: "",
      userInfo: this.getCircleUrl(),
      changeInfo: false,
      deluser: false,
      syncConfig: false,
      uploadConfig: false,
      localStorageArray: [],
      allData: {}
    }
  },
  watch: {
    upimgurl(value) {
      localStorage.setItem("upimgurl", value)
    }
  },
  mounted() {
    Message({
      showClose: true,
      message: 'Github头像图床出问题了，暂时不可以使用',
      type: 'warning',
      duration: 3000,
    });
    this.upimgurl = JSON.parse(localStorage.getItem("upimgurl"))
  },
  methods: {
    signOut() {
      Message({
        showClose: true,
        message: '退出成功',
        type: 'warning',
        duration: 1000,
        onClose() {
          window.location.reload();
        }
      });
      window.localStorage.removeItem('user');
    },
    getCircleUrl() {
      return JSON.parse(localStorage.getItem("user"));
    },
    beforeAvatarUpload(file) {
      const isJpgOrPng = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJpgOrPng) {
        Message({
          showClose: true,
          message: '上传头像图片只能是 JPG 或者 PNG格式!',
          type: 'error'
        });
      }
      if (!isLt2M) {
        Message({
          showClose: true,
          message: '上传头像图片大小不能超过 5MB!',
          type: 'error'
        });
      }
      return isJpgOrPng && isLt2M;
    },
    upload(file) {
      if (this.upimgurl) {
        const formData = new FormData()
        formData.append('pic', file.file)

        this.$axios.post(process.env.VUE_APP_UPLOAD, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }, {
          timeout: 30000
        }).then(res => {
          if (res.data.code === 'image_repeated') {
            this.userInfo.avatar = res.data.images;
            this.uploadAvatar(res.data.images)
          } else {
            this.userInfo.avatar = res.data.data.url;
            this.uploadAvatar(res.data.data.url)
          }
        })
      } else {
        var that = this
        var imgFile = new FileReader();
        imgFile.readAsDataURL(file.file);
        imgFile.onload = function () {
          let imgData = this.result; //base64数据
          that.$axios({
            method: "post",
            url: "https://twikoo.bugjava.cn/",
            data: {
              accessToken: "5f4bc17eb43a4457ad462dd5689a1875",
              event: "UPLOAD_IMAGE",
              fileName: file.file.name,
              photo: imgData
            }
          }).then((data) => {
            if (data.data.code === 1040) {
              const reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
              let str = data.data.err.match(reg);
              if (str && str.length > 0) {
                that.userInfo.avatar = str[0];
                that.uploadAvatar(str[0])
              } else {
                Message({
                  showClose: true,
                  message: '上传失败',
                  type: 'error',
                  duration: 3000,
                });
              }
            } else {
              that.userInfo.avatar = data.data.data.url;
              that.uploadAvatar(data.data.data.url)
            }
          })
        }

      }
    },
    uploadAvatar(newAvatar) {
      let user = JSON.parse(localStorage.getItem("user"));
      user.avatar = newAvatar
      localStorage.setItem("user", JSON.stringify(user))
      this.$axios({
        method: "get",
        url: process.env.VUE_APP_SERVE + "/api/uploadAvatar",
        params: {
          user: this.userInfo.uid,
          passwd: this.userInfo.passwd,
          avatar: newAvatar
        }
      }).then((req) => {
        if (req.data.code === 200) {
          Message({
            showClose: true,
            message: '切换成功',
            type: 'success'
          });
        } else {
          Message({
            showClose: true,
            message: '切换失败',
            type: 'warning'
          });
        }
      }).catch((err) => {
        Message({
          showClose: true,
          message: err,
          type: 'warning'
        });
      })
    },
    changeInfoFn() {
      if (this.userInfo.name.trim().length > 0) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.name = this.userInfo.name
        localStorage.setItem("user", JSON.stringify(user))
        this.$axios({
          method: "get",
          url: process.env.VUE_APP_SERVE + "/api/updateName",
          params: {
            user: this.userInfo.uid,
            passwd: this.userInfo.passwd,
            name: this.userInfo.name
          }
        }).then((req) => {
          if (req.data.code === 200) {
            this.changeInfo = false;
            Message({
              showClose: true,
              message: '切换成功',
              type: 'success'
            });
          } else {
            Message({
              showClose: true,
              message: '切换失败',
              type: 'warning'
            });
          }
        }).catch((err) => {
          Message({
            showClose: true,
            message: err,
            type: 'warning'
          });
        })
      } else {
        this.$message({
          type: "warning",
          message: "此处无声胜有声？"
        });
        return false;
      }
    },
    deluserfn() {
      this.$axios({
        method: "get",
        url: process.env.VUE_APP_SERVE + "/api/deluser",
        params: {
          user: this.userInfo.uid,
          passwd: this.userInfo.passwd
        }
      }).then((req) => {
        if (req.data.code === 200) {
          this.deluser = false;
          localStorage.removeItem("user");
          Message({
            showClose: true,
            message: '删除成功',
            type: 'success',
            duration: "1000",
            onClose() {
              window.location.reload();
            }
          });
        } else {
          Message({
            showClose: true,
            message: '删除失败',
            type: 'warning'
          });
        }
      }).catch((err) => {
        Message({
          showClose: true,
          message: err,
          type: 'warning'
        });
      })
    },
    uploadConfigFn() {
      for (let i = 0; i < localStorage.length; i++) {
        for (let i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          this.allData[key] = localStorage.getItem(key);
        }
      }
      this.$axios({
        method: "post",
        url: process.env.VUE_APP_SERVE + "/api/uploadconfig",
        data: {
          user: this.userInfo.uid,
          passwd: this.userInfo.passwd,
          config: encodeDataToBase64(this.allData)
        }
      }).then((req) => {
        if (req.data.code === 200) {
          this.uploadConfig = false;
          Message({
            showClose: true,
            message: '上传成功',
            type: 'success',
            duration: "1000",
          });
        } else {
          Message({
            showClose: true,
            message: '上传失败',
            type: 'warning'
          });
        }
      }).catch((err) => {
        Message({
          showClose: true,
          message: err,
          type: 'warning'
        });
      })

    },
    syncConfigFn() {
      const hasOwnProperty = Object.prototype.hasOwnProperty;
      this.$axios({
        method: "get",
        url: process.env.VUE_APP_SERVE + "/api/syncConfig",
        params: {
          user: this.userInfo.uid,
          passwd: this.userInfo.passwd
        }
      }).then((req) => {
        if (req.data.code === 200) {
          this.syncConfig = false;
          let configarr = decodeBase64ToData(req.data.config);
          console.log(configarr)
          for (const key in configarr) {
            if (hasOwnProperty.call(configarr, key)) {
              localStorage.setItem(key, configarr[key]);
            }
          }
          Message({
            showClose: true,
            message: '同步成功',
            type: 'success',
            duration: "1000",
            onClose() {
              // window.location.reload();
            }
          });
        } else if (req.data.code === 403) {
          Message({
            showClose: true,
            message: '您还没有上传过配置!!!',
            type: 'warning'
          });
        } else {
          Message({
            showClose: true,
            message: '同步失败',
            type: 'warning'
          });
        }
      }).catch((err) => {
        Message({
          showClose: true,
          message: err,
          type: 'warning'
        });
      })

    }


  },
  computed: {
    createTime() {
      return dayjs(this.userInfo.registerTime).format('YYYY-MM-DD HH:mm:ss')
    }
  }

}
</script>

<style scoped>
h2 {
  color: #666666;
}

.userRoot {
  display: flex;
  flex-direction: column !important;
  gap: 1.5rem !important;
}

.userName {
  height: 30px;
  width: 150px;
  line-height: 100%;
  position: absolute;
  top: 30px;
  display: inline-block;
  margin-left: 30px;
  font-size: 23px;
  font-weight: bold;
}

.createTime {
  position: absolute;
  display: inline-block;
  margin-left: 30px;
  bottom: 30px;
}

.avatar-update {
  margin-left: 8px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
  /*display: flex;*/
  position: relative;
}

.userSettings {
  display: inline-block;
}

.signOut {
  position: absolute;
  top: 10px;
  right: 20px;
}
</style>
