<template>
  <div
    class="copanel">
    <copanel-header
      @hide-widget="hideWidget"
      @show-plugin-store="pluginStoreVisible = true">
    </copanel-header>
    
    <div
      class="copanel-body"
      id="chat-box">
      <copanel-bubble>
        How can I help you?
      </copanel-bubble>
      
      <copanel-bubble
        image="https://cdn.dribbble.com/userupload/5024773/file/original-9a8545dd1d47240ff0c43116fec6e859.png?compress=1&resize=2048x1536">
      </copanel-bubble>
      
      <copanel-bubble
        position="right"
        type="primary"
        @send-prompt="sendPrompt">
        What is the best programming language?
      </copanel-bubble>
      
      <copanel-bubble
        label="Selected Text"
        position="right"
        show-prompts
        type="info"
        @send-prompt="sendPrompt">
        What is the best programming language?
      </copanel-bubble>
      
      <copanel-bubble
        show-control-bar>
        Completed
      </copanel-bubble>

      <copanel-bubble
        v-for="item in messages"
        :key="item.id"
        :desc="item.desc"
        :message="item.content || ''"
        :label="item.label"
        :prompt="item.prompt"
        :actions="item.actions"
        :position="item.role === 'user' ? 'right' : 'left'"
        :show-prompts="item.showPrompts"
        :showControlBar="item.showControlBar"
        :type="item.type || 'info'"
        :image="item.image"
        @send-prompt="sendPrompt">
      </copanel-bubble>

      <copanel-bubble
        v-if="showLoading"
        loading>
      </copanel-bubble>
    </div>
      
    <div
      class="copanel-bottom">
      <div
        class="copanel-editor">
        <el-autocomplete
          class="copanel-editor__input"
          v-model="message"
          :autosize="{ minRows: 1, maxRows: 4 }"
          :fetch-suggestions="queryPrompts"
          popper-class="copanel-editor__autocomplete"
          placeholder="Use / to choose a prompt"
          placement="top"
          resize="none"
          size="large"
          :trigger-on-focus="false"
          type="textarea"
          @select="handleSelectPrompt"
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.enter.shift.exact.prevent="message += '\n'">
          <template 
            #default="{ item }">
            <div 
              class="el-autocomplete-item__value">
              {{ item.value }}
            </div>
            
            <span 
              class="el-autocomplete-item__desc">
              {{ item.desc }}
            </span>
          </template>
        </el-autocomplete>
        
        <base-button
          class="copanel-editor__send-button"
          icon="ri-magic-fill"
          type="text"
          @click="sendMessage">
        </base-button>
      </div>
    </div>
    
    <transition
      name="slide">
      <copanel-plugin-store
        v-show="pluginStoreVisible"
        @hide-plugin-store="pluginStoreVisible = false">
      </copanel-plugin-store>
    </transition>
  </div>
</template>

<script setup>
import { ElAutocomplete } from 'element-plus'
import { ref, reactive, onMounted, watch, provide } from 'vue'
import CopanelHeader from '../components/copanel-header'
import BaseButton from '../components/base-button'
import CopanelPluginStore from '../components/copanel-plugin-store'
import CopanelBubble from '../components/copanel-bubble'
import basicPrompt from '../libs/prompt'
import render from '../libs/render'
import fallbackActions from '../libs/fallback'

let pluginStoreVisible = ref(false)
provide('pluginStoreVisible', pluginStoreVisible)

const hideWidget = () => {
  console.log('hide widget')
}

const plugins = reactive([])

function processUrl (url) {
  return url.replace(/\/$/, '')
}

async function initPlugins () {
  try {
    const rs = await chrome.storage.local.get(['plugins'])
    if (rs.plugins) {
      try {
        const list = JSON.parse(rs.plugins)
        for (const one of list) {
          plugins.push(one)
        }
      } catch (e) {console.log(e)}
    } else {
      console.log('无 plugin')
    }
  } catch (e) {
    console.log(e)
  }

  // 执行
  for (let i = 0; i < plugins.length; i++) {
    const one = plugins[i]
    if (one.enabled) {
      console.log(processUrl(document.location.href) === processUrl(one.match))
      if (processUrl(document.location.href) === processUrl(one.match)) {
        if (one.actions) {
          try {
            render(JSON.parse(one.actions))
          } catch (e) {
            console.log('render error', e)
          }
        } else {
          console.log('no actions found')
        }
      }
    }
  }
}

initPlugins()

const url = 'https://api.ai.ls'
let messages = reactive([])

const showLoading = ref(false)
const message = ref('')
const prompts = reactive([{
  value: '/summarize',
  desc: 'summarize',
}, {
  value: '/translate',
  desc: 'translate'
}, {
  value: '/editpage',
  desc: 'edit page'
}, {
  value: '/rewrite',
  desc: 'rewrite'
}, {
  value: '/lookup',
  desc: 'look up'
}, {
  value: '/summarize [text]',
  desc: 'summarize',
}, {
  value: '/translate [text]',
  desc: 'translate'
}, {
  value: '/rewrite [text]',
  desc: 'rewrite'
}, {
  value: '/lookup [text]',
  desc: 'look up'
}])

// 滚动到底部
const autoScrollToBottom = function () {
  setTimeout(() => {
    var element = document.getElementById("chat-box")
    element.scrollTop = element.scrollHeight
  })
  saveChats()
}

watch(messages, () => {
  autoScrollToBottom()
})

// 保存历史记录
const saveChats = function () {
  // for dev cleaning
  for (const one of messages) {
    if (one.showPrompts && one.showControlBar) {
      delete one.showPrompts
    }
  }
  chrome.storage.local.set({
    chats: JSON.stringify(messages)
  })
}

/**
 * 
 * event: "selected_image"
 * message: "Hello from background!"
 * src: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  messages.push({
    role: 'user',
    type: 'info',
    label: 'Selected Image',
    content: '',
    image: request.src,
    showPrompts: true,
    context: 'image',
    createdAt: new Date().getTime()
  })
  autoScrollToBottom()
})

onMounted(() => {
  document.addEventListener("selectionchange", () => {
    let text = ''
    if (document.getSelection()) {
      text = document.getSelection().toString().trim()
    }

    // 如果已有消息，先删除。并放到最后
    const index = messages.findIndex(one => one.isSelected === true)

    if (!text && index === -1) {
      return
    }

    if (index !== -1) {
      messages.splice(index, 1)
    }

    if (text) {
      messages.push({
        role: 'user',
        type: 'info',
        isSelected: true,
        label: 'Selected Text',
        showPrompts: true,
        context: 'text',
        content: text,
        createdAt: new Date().getTime()
      })
    }

    autoScrollToBottom()

    // 获取位置
    const selection = document.getSelection()
    if (selection) {
      const oRange = selection.getRangeAt(0)
      const oRect = oRange.getBoundingClientRect()
      console.log('位置', oRect)
    }
  })
})

const queryPrompts = (queryString, cb) => {
  const results = queryString
    ? prompts.filter((item) => {
      return item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    })
    : prompts
    
  // call callback function to return suggestion objects
  cb(results)
}
console.log(22)

const handleSelectPrompt = (prompt) => {
  if (prompt.value.endsWith('[text]')) {
    message.value = prompt.value.replace('[text]', '')
  } else {
    message.value = ''
  }
}

const init = async () => {
  const chats = await chrome.storage.local.get(['chats'])
  console.log('chats', chats)
  if (chats.chats) {
    const json = JSON.parse(chats.chats)
    console.log('json', json)
    try {
     for (const one of json) {
      if (one.role === 'assistant' && !one.content) {
        
      } else {
        messages.push(one)
      }
     }
     // test
    //  messages.push({
    //             role: 'magic',
    //             type: 'primary',
    //             content: `You Magic is executed successfully!`,
    //             showPrompts: true,
    //             context: 'magic'
    //           })

             //  console.log('messages', messages)
    } catch (e) {
      console.log('error', e)
    }
    autoScrollToBottom()
  }
}

init().then(() => {}).catch(e => {
  console.log('init error', e)
})

const updateAssistant = (str) => {
  if (str) {
    showLoading.value = false
  }
  if (messages[messages.length - 1].role === 'user') {
    messages.push({
      role: 'assistant',
      type: 'default',
      content: str
    })
  } else {
    messages[messages.length - 1].content += str
  }

  chrome.storage.local.set({
    chats: JSON.stringify(messages)
  })

  autoScrollToBottom()
}

const sendAPI = async (_messages, isCode = false) => {
  showLoading.value = true
  const response = await fetch(url + '/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer free`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      stream: true,
      messages: _messages
    }),
  }, {
    headers: {
      authorization: 'bearer free'
    }
  })
  showLoading.value = false
  const data = response.body
  let currentAssistantMessage = ''
  updateAssistant(currentAssistantMessage)
    const decoder = new TextDecoder('utf-8')
    if (!data) {
      throw new Error('No data')
    }
      const reader = data.getReader()
      
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        if (value) {
          let char = decoder.decode(value)
          if (char === '\n' && currentAssistantMessage.endsWith('\n')) {
            continue
          }
          if (char) {
    
              const lines = char.split('\n').filter(one => !!one && one !== '\n').map(one => one.replace('data:', '').trim())
              lines.forEach(one => {
                if (one && one !== '[DONE]') {
                  try {
                    const json = JSON.parse(one)
                    const content = json.choices[0].delta.content
                    if (content) {
                      updateAssistant(content)
                      currentAssistantMessage +=  content
                    }
                  } catch (e) {
                    console.log(e)
                  }
                }
              })
          }
        }
        done = readerDone
      }
    
      if (isCode) {
        try {
        currentAssistantMessage = currentAssistantMessage.split('\n').filter(one => !/^```/.test(one))
        if (!currentAssistantMessage[0].includes('[')) {
          currentAssistantMessage = currentAssistantMessage.slice(1).join('\n')
        } else {
          currentAssistantMessage = currentAssistantMessage.join('\n')
        }
        console.log('code\n', currentAssistantMessage)
        const actions = JSON.parse(currentAssistantMessage)
        console.log('actions', actions)
        try {
          render(actions)
          messages[messages.length - 1].actions = actions
          console.log('render done')

          setTimeout(() => {
            console.log('添加成功消息')
            messages.push({
              role: 'magic',
              type: 'primary',
              content: `Your spell has been successfully cast!`,
              showControlBar: true,
              showPrompts: false,
              context: 'magic',
              desc:  messages[messages.length - 2].content,
              prompt: messages[messages.length - 1].content,
              actions: messages[messages.length - 1].actions
            })
            saveChats()
          }, 100)
          
        } catch (e) {
          console.log('error', e)
          try {
            render(fallbackActions)
            messages[messages.length - 1].actions = fallbackActions
            messages.push({
              role: 'magic',
              type: 'primary',
              showControlBar: true,
              content: `Your spell has been successfully cast!`,
              showPromptfs: false,
              context: 'magic',
              desc:  messages[messages.length - 2].content,
              prompt: messages[messages.length - 1].content,
              actions: messages[messages.length - 1].actions
            })
          } catch (e) {
            console.log('error', e)
          }
          messages.push({
            role: 'magic',
            type: 'default',
            content: `Sorry. Fail to execute. Please try again: ${e.message}`
          })
        }
      } catch (e) {
        console.log(e)
      }
      }  
}


const sendMessage = async () => {
  console.log('send message')
  console.log(message.value)
  let input = message.value
  if (!input) {
    return
  }

  if (input === '/magic') {
    input = `/magic 将页面背景设为明黄色
将页面第一个图片变为自动旋转，并把图片地址改成 twitter logo url
将页面第一个输入框的文字改为 "LET'S AI HACK！"，并逐字出现`
  }

  messages.push({
    role: 'user',
    content: input,
    type: "primary",
    showPrompts: false
  })
  message.value = ''

  autoScrollToBottom()

  if (input.includes('/magic')) {
    await sendAPI([{
      role: 'system',
      content: basicPrompt
    }, {
      role: 'assistant',
      content: 'ok'
    }, {
      role: 'user',
      content: input.replace('/magic', '')
    }], true, 'magic')
    return
  }

  let ms = messages
  .filter(one => one.role === 'system' || one.role === 'user' || one.role === 'assistant')
  .filter(one => !(one.role === 'assistant' && !one.content))
  .map(one => {
    return {
      role: one.role,
      content: one.content
    }
  })
  if (ms.length > 8) {
    ms = ms.slice(ms.length - 8)
  }
  await sendAPI(ms)
}

const sendPrompt = (value) => {
  console.log(value)
}
</script>

<style lang="scss">
.copanel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 416px;
  height: 100vh;
  border-left: 1px solid var(--copanel-border-color-dark);
  font-size: 14px;
  background: white;
  color: var(--copanel-text-color-primary);
  
  &,
  * {
    box-sizing: border-box;
    font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
  }
  
  * {
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: rgba(234, 236, 240, .8);
    }
  }
}

.copanel-body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.copanel-bottom {
  padding: 16px;
}

.copanel-editor {
  display: flex;
  padding: 8px;
  border-radius: var(--copanel-border-radius);
  background: var(--copanel-bg-color);
  
  &__input {
    flex: 1;
    padding: 2px 0;
    
    .el-textarea {
      &__inner {
        padding: 4px 8px;
        line-height: 20px;
        background: none;
        box-shadow: none;
        color: var(--copanel-text-color-primary);
      }
    }
  }
  
  &__send-button {
    border-radius: 10px;
    
    &.is-icon {
      & {
        color: var(--copanel-color-primary);
        background: white;
      }
      
      &:hover {
        color: var(--copanel-color-primary-dark);
        background: white;
      }
    }
  }
  
  &__autocomplete {
    left: auto !important;
    right: 16px !important;
    border-radius: var(--copanel-border-radius);
    
    .el-autocomplete-suggestion {
      width: 384px;
      
      &__wrap {
        padding: 12px;
        height: 272px;
        max-height: calc(100vh - 80px);
      }
      
      &__list {
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 10px;
          
          &:hover,
          &.highlighted {
            background: var(--copanel-bg-color-light);
          }
        }
      }
    }
    
    .el-autocomplete-item {
      &__value {
        color: var(--copanel-text-color-primary);
      }
      
      &__desc {
        color: var(--copanel-text-color-muted);
      }
    }
    
    .el-popper__arrow {
      display: none;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all .3s ease;
}

.slide-enter-from, 
.slide-leave-to {
  transform: translateX(100%);
} 
</style>