// // Time
// console.log(typeof Date.now())
// const date = new Date(Date.now()).toLocaleString()

// console.log(date)

const promiseBoi = () => {
  const p1 = new Promise((resolve) => {
    setTimeout(() => {
      resolve('SLOW')
    }, 300)
  })

  const p2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve('FAST ASF BOI')
    }, 200)
  })

  const p3 = new Promise((resolve) => {
    setTimeout(() => {
      resolve('she a runner she a track star')
    }, 100)
  })

  return Promise.all[(p1, p2, p3)]
}

console.log(async () => {
  await promiseBoi()
})
