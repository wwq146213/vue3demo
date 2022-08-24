<template>
  <div>
    <Hello ref="child" @getnum="getnum" :data='strs' />
    <div>第一个ts页面</div>
    <div>
      <h1>{{ num }}</h1>
      <h1>{{ obj.name }}</h1>
      <h1>{{ obj.age }}</h1>
      <h1>{{ obj.code }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Hello from '@/components/HelloWorld.vue'
import { ElMessage } from 'element-plus';
const child = ref()
const num = ref(1)
interface tsobj {
  name: string;
  age: string;
  code: number | string;
}
const strs = ref('传参测试呢动是 是')
const obj: tsobj = reactive({
  name: "wngweiqi",
  age: "23",
  code: "1123",
})

const loading = () => {
  num.value = 123
  obj.code = 1010101
}
const getnum = (price: number) => {
  num.value = price
}
const set = (obj1: any) => {
  console.log(obj1)
  obj1.name = '张三'
  obj1.age = 24
  obj1 = new Object()
  obj1.name = '王泽'
  console.log(obj1)
}
onMounted(() => {
  let o = new Object()
  set(o)
  console.log(o)
  //  setTimeout(()=>{
  //       loading()
  //    child.value.add();
  //        ElMessage.success(''+child.value.price)
  //  },2000)
})

</script>

<style lang="scss" scoped>
</style>