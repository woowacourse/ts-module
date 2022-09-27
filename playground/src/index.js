import './styles/global'
import $local from '../../dist'
import $ from '@compy-ryu/ts-module'

document.addEventListener('DOMContentLoaded', () => {
  console.log($.isNull(null))

  const debounced = $.debounce(() => alert('클릭 후 1초 후에 출력합니다'), 1000)

  $('#debounce').addEvent('click', debounced)
  $('#fetch').addEvent('click', async () => {
    const result = await $.fetch('http://localhost:9000', {
      headers: {
        Authorization: 'Bearer test-header',
      },
    })

    const data = await result.json()

    console.log(data)

    const testElement = $('#fetch')
    document.body.removeChild(testElement)
  })
})
