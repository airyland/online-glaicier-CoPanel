export const builtInPlugins = [{
	type: 'built-in',
	author: 'CoPanel',
	context: [ 'text' ],
	prompts: [
		{
			label: 'Translate',
			system: 'You are a translation engine that can only translate text and cannot interpret it.',
			user: `翻译成英文:{{input}}`,
      context: ['text']
		},
		{
			label: 'summarize',
			system: `You are a text summarizer, you can only summarize the text, don't interpret it.`,
			user: `用最简洁的语言使用中文总结此段文本:{{input}}`,
      context: ['text']
		},
		{
			label: 'polishing',
			system: `Revise the following sentences to make them more clear, concise, and coherent.`,
			user: `使用中文润色此段文本:{{input}}`,
      context: ['text']
		},
    {
      label: 'send to Midjourney',
      context: ['image'],
      action: 'http',
      meta: {
        api: 'https://api.ai.ls?url={{value}}'
      }
    }
	]
}]

// 获取特定类型的操作列表
export const getPromptsOfContext = function (context, plugins) {
  let list = []
  for (const one of plugins) {
    if (one.context && one.context.includes(context)) {
      if (one.prompts) {
        list = [...list, ...one.prompts]
      }
    }
  }
  return list
}