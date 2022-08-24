<template>
  <div>
      <Hello ref="child" @getnum="getnum"  :data='strs'/>
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

import { onMounted, reactive, ref,Ref } from "vue";

const child = ref(null) as Ref;
    const num = ref(1)
    interface tsobj  {
      name: string;
      age: string;
      code:number|string;
    }
    const strs=ref('传参测试呢动是 是')
    const obj:tsobj = reactive({
      name: "wngweiqi",
      age: "23",
      code: "1123",
    })

    const loading = () => {
      num.value = 123
      obj.code = 1010101
    }
    const getnum =(price:number)=>{
      num.value=price
    }
    onMounted(() => {
       setTimeout(()=>{
            loading()
         child.value.add();
             ElMessage.success(''+child.value.price)
       },2000)
    })
 
</script>

<style lang="scss" scoped>
</style>