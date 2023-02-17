const totalAmount = document.querySelector('#totalAmount')
const price = Array.from(document.querySelectorAll('.price'), item => item.textContent)

const initialValue = 0

const totalPrice = price.reduce((a, b) => Number(a) + Number(b), initialValue)

totalAmount.innerText = totalPrice