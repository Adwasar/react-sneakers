const a = [{a:1}, {b:2}, {c:3}]
const b = [...a].map(el => (
  {
    ...el,
    adwas: 123
  }
))
console.log(b);