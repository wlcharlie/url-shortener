const btn = document.querySelector('#btn-copy')
const shortenUrl = document.querySelector('#shorten-url')
btn.addEventListener('click', function () {
  shortenUrl.select()
  document.execCommand('copy')
  alert('已複製!')
})