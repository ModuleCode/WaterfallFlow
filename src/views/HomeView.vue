<template>
  <el-drawer v-model="drawer" :direction="store.menuopenfs" :with-header="false" :size="size" >
    <menu-panel />
  </el-drawer>
  <pu-bu-liu :column="store.column" :gap="store.gap" :pageSize="30" @topbarshow="topbarshow" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import PuBuLiu from '@/components/PuBuLiu.vue';
import { isPhone } from '@/tools/tools.js'
import { useStore } from '@/store/index'
import MenuPanel from '@/components/MenuPanel.vue';
const store = useStore()

const direction = ref('ttb')//方向
const size = ref("90%")//大小
const drawer = ref(true)

function topbarshow(displayValue) {
  drawer.value = displayValue
}
onMounted(() => {
  if (isPhone()) {
    store.gap="ttb"
  }else{
    store.gap="ltr"
    size.value="40%"
  }
})

</script>


<style></style>