export const formatTime = (time) => {
  let t = time.split('.')[0]
  return {
    day: t.split('T')[0],
    hour: t.split('T')[1]
  }
}