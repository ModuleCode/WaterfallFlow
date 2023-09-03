<template>
    <div class="setting-item">
        <div class="label" v-if="!closeLabel">
            <span>{{ label }}</span>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>
//['label','close-label']
const props = defineProps({
    label: String,
    closeLabel: {
        type: Boolean,
        default: false
    }

});
</script>

<style scoped>
.setting-item {
    display: flex;
    margin: 10px 0;
}

.setting-item>.label {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.5;
}

.setting-item>.content {
    flex: 1;
}
</style>