<template>
  <div>

   <textarea v-model="editPrompt" rows="5"></textarea>


   <span @click="sendPrompt">send</span>

  </div>
 </template>
 
 <script setup>
import { reactive, ref } from 'vue'
// import axios from 'axios'
import render from '../libs/render'
import basicPrompt from '../libs/prompt'
import { builtInPlugins, getPromptsOfContext } from '../libs/plugins'

const url = 'https://api.ai.ls'

// just for test
const editPrompt = ref(`将页面背景设为明黄色
将页面第一个图片变为自动旋转，并把图片地址改成 twitter logo url
将页面第一个输入框的文字改为 "LET'S AI HACK！"，并逐字出现`)

const listenSelected = function () {
  console.log('mouse up')
  var selectedText = window.getSelection().toString()
  if (selectedText) {
    console.log("Selected text: " + selectedText);
  }
}


// 考虑到时间，这句不要
// change text "About" to "Hello AI"

// setTimeout(() => {
//   console.log('执行')
//   render([
//   {
//     "type": "style",
//     "selector": "body",
//     "styles": {
//       "background-color": "yellow"
//     }
//   },
//   {
//     "type": "change_attr",
//     "selector": "img:first-of-type",
//     "attr": "src",
//     "new_text": "https://abs.twimg.com/icons/apple-touch-icon-192x192.png",
//     "animate": "one_by_one"
//   },
//   {
//     "type": "style",
//     "selector": "img:first-of-type",
//     "styles": {
//       "animation": "spin 2s linear infinite"
//     },
//     "extra_styles": "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"
//   },
//   {
//     "type": "change_text",
//     "selector": "input:first-of-type",
//     "text": "",
//     "new_text": "LET'S AI HACK！",
//     "animate": "one_by_one"
//   },
//   {
//     "type": "change_text",
//     "selector": "a:contains('About')",
//     "text": "About",
//     "new_text": "Hello AI"
//   }
// ])

// }, 1000)

// 第一个输入框上下循环跳动
// 将第二个图片顺时针旋转30度

const sendPrompt = async () => {
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
            messages: [{
      role: 'system',
      content: basicPrompt
    }, {
      role: 'assistant',
      content: 'ok'
    }, {
      role: 'user',
      content: editPrompt.value
    }  
  ]
          }),

    
  }, {
      headers: {
        authorization: 'bearer free'
      }
    })

  const data = response.body
  let currentAssistantMessage = ''
        const decoder = new TextDecoder('utf-8')
        if (!data) {
          throw new Error('No data')
        }
          const reader = data.getReader()
          
          let done = false

          while (!done) {
            const { value, done: readerDone } = await reader.read()
            // console.log('value', value)
            if (value) {
              let char = decoder.decode(value)
              // console.log('char', char)
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
                          currentAssistantMessage +=  content
                        }
                      } catch (e) {
                        console.log(e)
                      }
                    }
                  })
                console.log('current code:', currentAssistantMessage )
              }
            }
            done = readerDone
          }
          console.log('Done Receiving:', currentAssistantMessage)
        
          try {
            currentAssistantMessage = currentAssistantMessage.split('\n')
            if (!currentAssistantMessage[0].includes('[')) {
              currentAssistantMessage = currentAssistantMessage.slice(1).join('\n')
            } else {
              currentAssistantMessage = currentAssistantMessage.join('\n')
            }
            console.log('now code\n', currentAssistantMessage)
            const actions = JSON.parse(currentAssistantMessage)
            console.log('actions', actions)
            render(actions)
          } catch (e) {
            console.log(e)
          }
}


// 获取插件列表
const plugins = reactive([
...builtInPlugins,
{
  type: 'gpt', // developer
  name: 'hello',
  desc: 'desc',
  version: '0.0.1',
  match: 'https://www.google.com',
  enabled: false,
  actions: [
  {
    "type": "style",
    "selector": "body",
    "styles": {
      "background-color": "yellow"
    }
  },
  {
    "type": "change_attr",
    "selector": "img:first-of-type",
    "attr": "src",
    "new_text": "https://abs.twimg.com/icons/apple-touch-icon-192x192.png",
    "animate": "one_by_one"
  },
  {
    "type": "change_text",
    "selector": "input:first-of-type",
    "text": "",
    "new_text": "LET'S AI HACK！",
    "animate": "one_by_one"
  },
  {
    "type": "style",
    "selector": "img:first-of-type",
    "styles": {
      "animation": "spin 2s linear infinite"
    },
    "extra_styles": "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"
  }
]
}])

console.log(getPromptsOfContext('text', plugins))

function processUrl (url) {
  return url.replace(/\/$/, '')
}

for (const one of plugins) {
  if (one.enabled && one.type === 'gpt') {
    console.log(document.location.href, one.match)
    console.log(processUrl(document.location.href), processUrl(one.match))
    if (processUrl(document.location.href) === processUrl(one.match)) {
      render(one.actions)
    }
  }
}

console.log('inital plugins', plugins)
console.log(2)
async function initPlugins () {
  try {
  const rs = await chrome.storage.local.get(['plugins'])
  console.log(3)

  if (rs.plugins) {
    console.log(4)
    try {
      const list = JSON.parse(rs.plugins)
      plugins.value = list
    } catch (e) {console.log(e)}
  } else {
    console.log('无 plugin')
  }
  console.log(5)
  // console.log('plugin result', rs)
} catch (e) {
  console.log(e)
}
}

initPlugins()
console.log(initPlugins)
 </script>