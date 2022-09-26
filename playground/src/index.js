import './styles/global'
import * as local from '../../dist'
import * as publish from '@compy-ryu/ts-module'
import $ from './utils'

console.log(local.isNull(null))

document.addEventListener('DOMContentLoaded', () => {
  const debounced = publish.debounce(() => alert('클릭 후 1초 후에 출력합니다'), 1000)

  $('#test').addEventListener('click', debounced)
})
