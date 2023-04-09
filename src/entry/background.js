chrome.contextMenus.create({
  id: 'copanel_image',
  contexts: ['image'],
  title: 'Send to CoPanel',
  // onClick (data) {
  //   console.log('click ', data)
  // }
}
  ,function (info, tab) {
    // 点击菜单项时的操作
    console.log("copanel image clicked!", info, tab);
  }
)

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  // 处理点击之后的逻辑
  const { mediaType, srcUrl } = info
  if (mediaType === 'image') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { 
        event: 'selected_image',
        src: srcUrl,
        message: "Hello from background!" 
      })
    })
  }
})


chrome.omnibox.onInputEntered.addListener(
  function (a, b) {
    console.log("收到 enter 事件", a, b)
  }
)
chrome.omnibox.onInputChanged.addListener(
  function (a, suggest) {
    console.log("收到 input change事件", a)

    // chrome.omnibox.setDefaultSuggestion(
    //   {
    //     description: 'ChatGPT 3.5: ' + a
    //   },
    //   function (a) {
    //     console.log('set', a)
    //   }
    // )
    var suggestions = [
      { content: 'gpt3.5', description: 'GPT-3.5: ' + a },
      { content: 'gpt4', description: 'GPT-4' + a}
    ]
suggest(suggestions)
  }
)