import "bulma"
import "@fortawesome/fontawesome-free/css/all.css"

const _ = document.querySelector.bind(document)

document.addEventListener("DOMContentLoaded", e => {
  _(".main")!.innerHTML = "hello parcel!"
})
