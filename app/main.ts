import "bulma"
import "@fortawesome/fontawesome-free/css/all.css"
///@ts-ignore
import hljs from "highlightjs"

const _ = document.querySelector.bind(document)
const __ = document.querySelectorAll.bind(document)

const isSupportedWebShareAPI = !!navigator.share

document.addEventListener("DOMContentLoaded", e => {
  hljs.initHighlightingOnLoad()

  // _(".my-content")!.innerHTML = "hello parcel!"

  if (!isSupportedWebShareAPI) {
    _("#danger")!.classList.remove("my-not-show")
    __("button").forEach(el => (el.disabled = true))
  }
})
