<template>
  <div>
    <el-button type="success" @click="add()">相加</el-button>
    <h1>
      {{ data }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const emit = defineEmits(["getnum"]);
defineProps<{
  data: string;
}>();
const price = ref(1);
const add = () => {
  price.value += 1;

  emit("getnum", price.value);
};

defineExpose({
  price,
  add
})
</script>

<style lang="scss" scoped>
</style>
