export default function (sketch) {
  let myp5 = ref()
  onMounted(() => {
    myp5.value = new p5(sketch)
  })
  return myp5
}