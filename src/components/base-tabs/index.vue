<template>
  <div
    class="base-tabs">
    <div
      class="base-tabs__header">
      <div
        class="base-tabs__nav">
        <div
          class="base-tabs__nav-item"
          :class="{
            'active': item.value === activeTab
          }"
          v-for="item in tabs"
          :key="item.value"
          @click="onChangeTab(item.value)">
          {{ item.label }}
        </div>
      </div>
    </div>
    
    <div
      class="base-tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, provide } from 'vue'

const props = defineProps({
  modelValue: {
    type: String
  },
  tabs: {
    type: Array,
    required: true
  }
})

const emits = defineEmits([
  'on-change-tab',
  'update:modelValue'
])

let activeTab = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emits('update:modelValue', val)
  }
})

provide('tabProps', props)

const onChangeTab = (value) => {
  activeTab.value = value
  emits('on-change-tab', value)
}
</script>

<style lang="scss">
.base-tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &__header {
    padding: 16px 16px 8px;
  }
  
  &__nav {
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: var(--copanel-border-radius);
    background: var(--copanel-bg-color);
  }
  
  &__nav-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0 20px;
    border-radius: 10px;
    font-size: 12px;
    color: var(--copanel-text-color-secondary);
    cursor: pointer;
    transition: all .3s ease;
    
    &.active {
      font-weight: 500;
      background: white;
      color: var(--copanel-color-primary);
    }
  }
  
  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 0 16px 16px;
  }
}
</style>