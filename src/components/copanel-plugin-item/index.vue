<template>
  <div
    class="copanel-plugin-item">
    <div
      class="copanel-plugin-item__left">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 22C19.3137 22 22 19.3137 22 16C22 12.6863 19.3137 10 16 10C12.6863 10 10 12.6863 10 16C10 19.3137 12.6863 22 16 22Z" fill="#B692F6" fill-opacity="0.9"/>
        <path d="M8 22C11.3137 22 14 19.3137 14 16C14 12.6863 11.3137 10 8 10C4.6863 10 2 12.6863 2 16C2 19.3137 4.6863 22 8 22Z" fill="#9E77ED" fill-opacity="0.9"/>
        <path d="M12 14C15.3137 14 18 11.3137 18 8.00002C18 4.68629 15.3137 2 12 2C8.6863 2 6 4.68629 6 8.00002C6 11.3137 8.6863 14 12 14Z" fill="#7F56D9" fill-opacity="0.9"/>
      </svg>
    </div>
    
    <div
      class="copanel-plugin-item__content">
      <div
        class="copanel-plugin-item__byline">
        <div
          class="copanel-plugin-item__title">
          {{ data.name }}
        </div>
        
        <base-tag
          v-if="data.price"
          class="copanel-plugin-item__tag">
          {{  data.price }}
        </base-tag>
      </div>
      
      <div
        class="copanel-plugin-item__desc">
        {{ data.desc }}
      </div>
      
      <div
        class="copanel-plugin-item__meta">
        By {{ data.created_by }} · Used by {{ data.used_by }} people
      </div>
    </div>
    
    <base-button
      class="copanel-plugin-item__action-button"
      :class="data.is_installed ? 'is-danger' : ''"
      size="small"
      type="text">
      {{ data.is_installed ? 'Remove' : 'Install' }}
    </base-button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import BaseButton from '../base-button'
import BaseTag from '../base-tag'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss">
.copanel-plugin-item {
  display: flex;
  padding: 12px 16px;
  border-radius: var(--copanel-border-radius);
  transition: all .3s ease;
  
  &:hover {
    background: var(--copanel-bg-color-light);
  }
  
  &__left {
    display: flex;
  }
  
  &__content {
    flex: 1;
    margin: 0 16px 0 12px;
  }
  
  &__byline {
    display: flex;
    align-items: center;
  }
  
  &__title {
    font-weight: 500;
    line-height: 20px;
  }
  
  &__tag {
    margin-left: 4px;
  }
  
  &__desc {
    font-size: 12px;
    color: var(--copanel-text-color-muted);
  }
  
  &__meta {
    margin-top: 4px;
    font-size: 12px;
    color: var(--copanel-text-color-muted);
  }
  
  &__action-button {
    padding: 0 4px;
    height: 20px;
    color: var(--copanel-color-primary);
    
    &:hover {
      color: var(--copanel-color-primary-dark);
    }
    
    &.is-danger {
      color: var(--copanel-color-danger);
      
      &:hover {
        color: var(--copanel-color-danger-dark);
      }
    }
  }
}
</style>