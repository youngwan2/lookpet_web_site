<template>
  <div>
    <QuillEditor theme="snow" toolbar="full" />
  </div>
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
export default {
  components: {
    QuillEditor
  },
  data() {
    return {}
  }
}
</script>
<style></style>
