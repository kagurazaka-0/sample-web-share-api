<template lang="pug">
  .v-app
    article(v-if="!isSupportedWebShareAPI")#danger.message.is-danger.my-not-show
      .message-header
        p
          i.fas.fa-exclamation-circle
          span Browser is not supported WebShareAPI.
      .message-body このブラウザはWebShareAPIに対応してません。
    .shares
      .share(v-for="value of values")
        pre
          .title {{value.name}}
          code.js.
            {{ value.option | toStringFromObj }}
        button(:disabled="!isSupportedWebShareAPI", @click="handleShareClick(value.option)").button.is-fullwidth.is-primary
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
interface AAA {
  name: string
  option: Option
}

@Component({
  filters: {
    toStringFromObj
  }
})
export default class App extends Vue {
  isSupportedWebShareAPI = isSupportedWebShareAPI

  values: Array<AAA> = [
    {
      name: "タイトルのみ",
      option: { title: "Hello WebShareAPI!" }
    },
    {
      name: "テキストのみ",
      option: { text: "Hello WebShareAPI!(Text)" }
    },
    {
      name: "このサイトのURLのみ",
      option: { url: location.href }
    },
    {
      name: "他のサイトのURLのみ",
      option: { url: "https://qiita.com/katsuya_U" }
    },
    {
      name: "タイトルとテキスト",
      option: { title: "Title", text: "Text" }
    },
    {
      name: "タイトルとURL",
      option: { title: "Title", url: location.href }
    },
    {
      name: "テキストとURL",
      option: { text: "Text", url: location.href }
    },
    {
      name: "タイトルとテキストとURL",
      option: { title: "Title", text: "Text", url: location.href }
    }
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
      padding: 1px 10px;
      font-size: 1rem;
      color: white;
      font-weight: normal;
    }
  }
}
</style>
