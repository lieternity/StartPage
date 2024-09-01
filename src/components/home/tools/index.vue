<script>

export default {
  name: "ToolList",
  data() {
    return {
      "showDialog": false
    }
  },
  methods: {},
}
</script>

<template>
  <div>
    <div @click="showDialog = true" class="custom-btn btn">
      <span>热搜</span>
    </div>
  </div>
</template>

<style scoped>
.custom-btn {
  cursor: pointer;
  height: 60px;
  width: 200px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000030;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color .3s, box-shadow .3s;
}

.custom-btn:hover {
  background-color: #00000040;
  box-shadow: 0 0 0 2px #00000040;
}
</style>
