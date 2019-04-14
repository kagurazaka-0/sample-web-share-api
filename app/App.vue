<template lang="pug">
  .v-app
    article(v-if="!isSupportedWebShareAPI")#danger.message.is-danger.my-not-show
      .message-header
        p
          i.fas.fa-exclamation-circle
          span Browser is not supported WebShareAPI.
      .message-body このブラウザはWebShareAPIに対応してません。
    .shares
      .share(v-for="option of options")
        pre
          .title title
          code.js.
            {{ option | toStringFromObj }}
        button(:disabled="!isSupportedWebShareAPI", @click="handleShareClick(option)").button.is-fullwidth.is-primary
          span.icon.is-small
            i.fas.fa-share-square
          span 共有する

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

const isSupportedWebShareAPI = !!navigator.share

const toStringFromObj = (obj: { [x: string]: any }) => {
  let array: Array<string> = []
  for (const key in obj) {
    const value = obj[key]
    const str = typeof value === "string" ? `"${value}"` : value
    array.push(`\n    ${key}: ${str}`)
  }
  return `{${array.join(",")}\n}`
}

type Option = { url: string } | { text: string } | { title: string }

@Component({
  filters: {
    toStringFromObj
  }
})
export default class App extends Vue {
  isSupportedWebShareAPI = isSupportedWebShareAPI

  options: Array<Option> = [
    { title: "Hello WebShareAPI!" },
    { url: location.href },
    { url: "https://qiita.com/katsuya_U" }
  ]

  handleShareClick(option: Option) {
    navigator.share!(option)
  }
}
</script>

<style lang="scss" scoped>
.v-app {
  width: 95vw;
  max-width: 700px;
  margin: auto;
  padding: 20px;
  border-radius: 7px;
  background-color: #eeeeee;
}

.share {
  margin-top: 15px;
  pre {
    position: relative;
    .title {
      position: absolute;
      top: 0;
      left: 0;

      background-color: gray;
      padding: 0 10px;
      font-size: 1rem;
      color: white;
      font-weight: normal;
    }
  }
}

p .fas ~ span,
a ~ a {
  margin-left: 10px;
}
</style>
