<template>
  <button
    class="base-button"
    :class="[
      { 
        'is-icon': !$slots.default,
        'is-circle': circle, 
        'is-disabled': disabled,
        'is-full-width': fullWidth,
        'is-outline': outline,
        'is-plain': plain,
        'is-round': round
      },
      size ? `base-button--${size}` : '',
      type ? `base-button--${type}` : ''
    ]"
    :disabled="disabled"
    @click="$emit('click')">
    <i
      class="base-button__icon"
      :class="icon"
      v-if="icon">
    </i>
    
    <span
      v-if="$slots.default">
      <slot></slot>
    </span>
    
    <i
      class="base-button__right-icon"
      :class="rightIcon"
      v-if="rightIcon">
    </i>
  </button>
</template>

<script setup>
const props = defineProps({
  circle: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String
  },
  outline: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  rightIcon: {
    type: String
  },
  round: {
    type: Boolean,
    default: false
  },
  size: {
    type: String
  },
  type: {
    type: String
  }
})

const emits = defineEmits([
  'click'
])
</script>

<style lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: none;
  cursor: pointer;
  transition: all .3s ease;
  height: 32px;
  padding: 0 12px;
  border-radius: var(--copanel-border-radius);
  border: 1px solid var(--copanel-border-color);
  font-size: 14px;
  background: var(--copanel-bg-color);
  color: var(--copanel-text-color-primary);
  
  & + & {
    margin-left: 8px;
  }
  
  &:hover {
    background: var(--copanel-bg-color-dark);
  }
  
  &.is-circle {
    border-radius: 50%;
  }
  
  &.is-disabled {
    opacity: .8;
    cursor: not-allowed;
  }
  
  &.is-full-width {
    width: 100%;
  }
  
  &.is-round {
    border-radius: 16px;
  }
  
  &.is-outline {
    border-color: var(--copanel-border-color-darker);
    background: white;
    color: var(--copanel-text-color-primary);
    
    &:hover {
      background: var(--copanel-bg-color-light);
    }
    
    &.is-disabled:hover {
      background: white;
    }
  }
  
  &.is-plain {
    &.base-button--primary {
      border-color: var(--copanel-color-primary-light);
      background: var(--copanel-color-primary-light);
      color: var(--copanel-color-primary);
    }
    
    &:hover {
      color: var(--copanel-color-primary-dark);
    }
  }
  
  &--large {
    height: 40px;
    
    &.is-round {
      border-radius: 20px;
    }
  }
  
  &--small {
    height: 24px;
    border-radius: 8px;
    font-size: 12px;
    
    &.is-round {
      border-radius: 12px;
    }
    
    .base-button__icon {
      font-size: 14px;
    }
  }
  
  &--primary {
    border-color: var(--copanel-color-primary);
    background: var(--copanel-color-primary);
    color: white;
    
    &:hover {
      background: var(--copanel-color-primary-dark);
      color: white;
    }
    
    &.is-disabled:hover {
      background: var(--copanel-color-primary);
    }
    
    &.is-outline {
      border-color: var(--copanel-color-primary);
      background: white;
      color: var(--copanel-color-primary);
      
      &:hover {
        background: var(--copanel-color-primary-light);
      }
    }
  }
  
  // &--danger {
  //   border-color: var(--copanel-color-danger);
  //   background: var(--copanel-color-danger);
  //   color: white;
    
  //   &:hover {
  //     background: var(--copanel-color-danger-dark);
  //     color: white;
  //   }
    
  //   &.is-disabled:hover {
  //     background: var(--copanel-color-danger);
  //   }
  // }
  
  // &--info {
  //   border-color: var(--copanel-button-info-bg-color);
  //   background: var(--copanel-button-info-bg-color);
  //   color: var(--copanel-color-primary);
    
  //   &:hover {
  //     background: var(--copanel-button-info-hover-bg-color);
  //     color: var(--copanel-color-primary-dark);
  //   }
    
  //   &.is-disabled:hover {
  //     color: var(--copanel-button-info-text-color);
  //   }
  // }
  
  &--text {
    border: 0;
    background: none;
    
    &:hover {
      background: none;
    }
  }
  
  &.is-icon {
    width: 32px;
    padding: 0;
    // color: var(--copanel-text-color-secondary);
    
    // &:hover {
    //   color: var(--copanel-text-color-primary);
    // }
    
    &.base-button--large {
      width: 40px;
    }
    
    &.base-button--small {
      width: 24px;
    }
  }
  
  &__icon {
    font-size: 18px;
    font-weight: normal;
    line-height: 1;
    
    & + span {
      margin-left: 8px;
    }
  }
  
  &__right-icon {
    font-size: 14px;
    line-height: 1;
    margin-left: 2px;
  }
}
</style>