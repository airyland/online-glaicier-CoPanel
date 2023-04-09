<template>
  <div
    class="copanel-bubble"
    :class="[
      type ? `copanel-bubble--${type}` : '',
      { 'is-right': position === 'right' }
    ]">
    <div
      class="copanel-bubble__content">
      <div
        class="copanel-bubble__label"
        v-if="label">
        <i
          class="ri-star-line copanel-bubble__label-icon">
        </i>
        
        <span>
          {{ label }}
        </span>
      </div>
      
      <div
        class="copanel-bubble__message"
        v-if="!loading">
        <slot>
          <template
            v-if="message">
            {{ message }}
          </template>
          
          <el-image
            class="copanel-bubble__image"
            v-if="image"
            :src="image"
            :preview-src-list="[image]"
            alt="CoPanel"
            fit="contain" />
        </slot>
      </div>
      
      <div
        class="copanel-bubble__loader"
        v-if="loading">
        <div
          class="copanel-bubble__loader-dot"
          v-for="item in 3"
          :key="item"
          :style="{
            'animation-delay': `${0.12 * item}s`
          }">
        </div>
      </div>
    </div>
    
    <div
      class="copanel-bubble__prompt-list"
      v-if="showPrompts">
      <base-button
        v-for="item in prompts.filter((item, index) => { return index < 3 })"
        :key="item.value"
        outline
        round
        size="small"
        type="primary"
        @click="$emit('send-prompt', item.value)">
        {{ item.label }}
      </base-button>
      
      <el-popover
        v-if="prompts.length > 3"
        placement="bottom-end"
        :width="160"
        trigger="click">
        <base-menu-item
          v-for="item in prompts.filter((item, index) => { return index >= 3 })"
          :key="item.value">
          {{ item.label }}
        </base-menu-item>
        
        <template 
          #reference>
          <base-button
            class="copanel-bubble__prompt-more"
            right-icon="ri-arrow-down-s-fill"
            outline
            round
            size="small"
            type="primary">
            More
          </base-button>
        </template>
      </el-popover>
    </div>
    
    <div
      class="copanel-bubble__control-bar"
      v-if="showControlBar">
      <el-popover
        ref="controlPopover"
        popper-class="copanel-bubble__control-popover"
        placement="right"
        :width="242"
        trigger="click">
        <div
          class="copanel-bubble__control-popover-content">
          <copanel-plugin-form
            @cancel="hideControlPopover"
            @save="saveLocalPlugin">
          </copanel-plugin-form>
        </div>
        
        <template 
          #reference>
          <base-button
            outline
            round
            size="small"
            type="primary">
            Save as Plugin
          </base-button>
        </template>
      </el-popover>
      
      <base-button
        outline
        round
        size="small"
        type="primary">
        Regenerate
      </base-button>
    </div>
  </div>
</template>

<script setup>
import { ElPopover, ElImage, ElMessage } from 'element-plus'
import { ref, defineEmits, defineProps, computed } from 'vue'
import BaseButton from '../base-button'
import BaseMenuItem from '../base-menu-item'
import CopanelPluginForm from '../copanel-plugin-form'

const props = defineProps({
  desc: {
    type: String
  },
  prompt: {
    type: String
  },
  actions: {
    type: Object
  },
  image: {
    type: String
  },
  label: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  },
  message: {
    type: String
  },
  position: {
    type: String
  },
  showControlBar: {
    type: Boolean,
    default: false
  },
  showPrompts: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'default'
  }
})

const emits = defineEmits([
  'send-prompt'
])

const prompts = computed(() => {
  if (props.image) {
    return [{
      value: 'compress',
      label: 'Compress'
    }, {
      value: 'send-to-midjourney',
      label: 'Send to Midjourney'
    }, {
      value: 'describe',
      label: 'Describe'
    }]
  } else {
    return [{
      value: 'summarize',
      label: 'Summarize'
    }, {
      value: 'translate',
      label: 'Translate'
    }, {
      value: 'rewrite',
      label: 'Rewrite'
    }, {
      value: 'lookup',
      label: 'Look Up'
    }, {
      value: 'checkgrammar',
      label: 'Check Grammar'
    }]
  }
}) 

const controlPopover = ref(null)
const hideControlPopover = () => {
  controlPopover.value.hide()
}

const saveLocalPlugin = async (data) => {
  console.log('save', data, props, props.actions, props.prompt)
  let plugins = []
  // 先读取，再更新
  try {
    const rs = await chrome.storage.local.get(['plugins'])
    if (rs.plugins) {
      console.log(4)
      try {
        const list = JSON.parse(rs.plugins)
        plugins = list
      } catch (e) {console.log(e)}
    } else {
      console.log('无 plugin')
    }
  } catch (e) {
    console.log(e)
  }

  const plugin = {
    ...data,
    actions: JSON.stringify(props.actions),
    raw_desc: props.desc,
    prompt: props.prompt,
    enabled: true,
    created_at: new Date().getTime(),
  }

  const matched = plugins.find(one => one.name === plugin.name)
  if (matched) {
    ElMessage.error('Name exists')
    return
  }
  plugins.push(plugin)

  await chrome.storage.local.set({
    plugins: JSON.stringify(plugins)
  })

  ElMessage.success('Saved!')

  hideControlPopover()
}
</script>

<style lang="scss">
.copanel-bubble {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px 0;
  
  &--primary {
    .copanel-bubble__content {
      background: var(--copanel-color-primary);
    }
    
    .copanel-bubble__message {
      color: white;
    }
  }
  
  &--info {
    .copanel-bubble__content {
      background: var(--copanel-color-primary-light);
    }
    
    .copanel-bubble__message {
      color: var(--copanel-color-primary);
    }
  }
  
  &.is-right {
    align-items: flex-end;
  }
  
  &__content {
    padding: 12px;
    border-radius: 12px;
    background: var(--copanel-bg-color);
  }
  
  &__label {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px 3px 8px;
    margin-bottom: 8px;
    border-radius: 10px;
    font-size: 12px;
    background: white;
    color: var(--copanel-color-primary);
  }
  
  &__label-icon {
    margin-right: 4px;
    font-size: 14px;
    line-height: 1;
    color: var(--copanel-color-primary);
  }
  
  &__message {
    font-size: 14px;
    line-height: 20px;
  }
  
  &__image {
    width: 100%;
  }
  
  &__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px 0;
  }
  
  &__loader-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 2px;
    border-radius: 50%;
    background-color: var(--copanel-color-primary);
    animation-name: pulse;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.2, 0.68, 0.18, 1.08);
    animation-iteration-count: infinite;
    animation-duration: 0.75s;
  }
  
  &__prompt-list,
  &__control-bar {
    margin-top: 12px;
  }
  
  &__prompt-more {
    padding-right: 8px;
  }
  
  &__control-popover {
    &.el-popper {
      padding: 0;
    }
  }
  
  &__control-popover-content {
    max-height: calc(100vh - 20px);
    padding: 12px;
    overflow-y: auto;
  }
}

@keyframes pulse {
  0%,
  80% {
    transform: scale(1);      
    opacity: 1;
  }
  45% {
    transform: scale(0.1);       
    opacity: 0.7;
  }
}
</style>