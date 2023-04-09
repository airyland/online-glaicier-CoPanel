export default [
  {
    "type": "style",
    "selector": "body",
    "styles": {
      "background-color": "yellow"
    }
  },
  {
    "type": "style",
    "selector": "img:first-child",
    "styles": {
      "animation": "spin 2s linear infinite",
      "content": "url('https://abs.twimg.com/icons/apple-touch-icon-192x192.png')"
    },
    "extra_styles": "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"
  },
  {
    "type": "change_text",
    "selector": "input:first-child",
    "new_text": "LET'S AI HACK！",
    "animate": "one_by_one"
  }
]