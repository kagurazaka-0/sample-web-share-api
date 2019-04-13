interface Navigator {
  share?(option: { url: string } | { text: string } | { title: string }): Promise<void>
}
