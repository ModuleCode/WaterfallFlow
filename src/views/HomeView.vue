<template>
  <menu-small-panel :show="show"></menu-small-panel>
  <el-drawer v-model="store.drawer" :direction="store.menuopenfs" :with-header="false" :size="size">
    <menu-panel />
  </el-drawer>

  <water-flow :column="store.column" :gap="store.gap" :reshDataList="reshDataList" @getDataList="getImageList"
    :pageSize="30" @topbarshow="topbarshow">

  </water-flow>
</template>
<script setup>

import { ref } from 'vue';
import { useStore } from '@/store/index'
import MenuPanel from '@/components/MenuPanel.vue';
import WaterFlow from "@/components/WaterFlow.vue";
import MenuSmallPanel from '@/components/MenuSmallPanel.vue';
const store = useStore()
const size=ref('90%')
const show=ref(false)




function topbarshow(e) {
  console.log(e);
  show.value=e

}
</script>


<style></style>