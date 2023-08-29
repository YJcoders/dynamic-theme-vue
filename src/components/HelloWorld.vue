<template>
  <div class="hello">
    <header>
      <h2>动态主题切换</h2>
      <div class="color-select">
        <div @click="onChangeTheme('blue')" class="card card-1">蓝色系</div>
        <div @click="onChangeTheme('red')" class="card card-2">红色系</div>
        <div @click="onChangeTheme('green')" class="card card-3">绿色系</div>
        <div @click="onChangeTheme('black')" class="card card-4">黑色系</div>
        <div @click="onChangeTheme('yellow')" class="card card-5">黄色系</div>
      </div>
    </header>
    <div>
      <AntDesignVue1 />
    </div>
  </div>
</template>

<script>
import AntDesignVue1 from './AntDesignVue1.x.vue';

export default {
  name: 'HelloWorld',
  components: { AntDesignVue1 },
  data() {
    return {

    }
  },
  methods: {
    onChangeTheme(color) {
      // 切换 @primary-color 组件主题色都会变化
      // 切换 @header-back-color @bg-color 这些是使用到的变量，需要根据项目实际情况，可进行对应修改处理
      window.less.modifyVars({
        '@primary-color': color,
        "@header-back-color": color,
        "@bg-color": color
      })

      // 切换 自定义变量
      const theme = { '--custom-success-color': 'red', '--custom-error-color': 'green', '--custom-text-color': 'pink', '--custom-border-color': 'red' }
      Object.keys(theme).forEach(key => {
        document.documentElement.style.setProperty(key, theme[key])
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
header {
  display: flex;
  justify-content: flex-end;
}

.color-select {
  display: flex;
  margin-left: 90px;

  .card {
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin-right: 20px;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }

  .card-1 {
    background: blue;
  }

  .card-2 {
    background: red;
  }

  .card-3 {
    background: greenyellow;
    color: #111
  }

  .card-4 {
    background: black;
  }

  .card-5 {
    background: yellow;
    color: #111
  }
}
</style>
