<template>
    <div class="menu-small-panel" :style="{ display: props.show == true ? 'flex' : 'none' }">
        <img src="@/assets/setting.svg" alt="" @click="showMenu">
    </div>
</template>

<script setup>
import tipsfx from '@/assets/tipsfx.mp3';
import { useSound } from '@vueuse/sound'
const { play } = useSound(tipsfx)

const props = defineProps(['show'])
import { useStore } from '@/store/index'
const store = useStore()
function showMenu(){
    play()
    store.drawer=true
}
</script>

<style>
.menu-small-panel {
    width: 15vw;
    height: 15vw;
    max-width: 70px;
    max-height: 70px;
    border-radius: 100%;
    box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.345);
    position: fixed;
    bottom: 4vw;
    right: 4vw;
    background-color: rgba(244, 238, 230, 0.639);
    z-index: 10;
    border: 3px solid rgba(255, 250, 250, 0.582);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>