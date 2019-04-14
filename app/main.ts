import "bulma"
import "@fortawesome/fontawesome-free/css/all.css"
///@ts-ignore
import hljs from "highlightjs"
import Vue from "vue"

import App from "./App.vue"

document.addEventListener("DOMContentLoaded", e => {
  hljs.initHighlightingOnLoad()

  new Vue({
    render: h => h(App)
  }).$mount("#app")
})
