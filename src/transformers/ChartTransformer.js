import { BaseTransformer } from './BaseTransformer'

export class ChartTransformer extends BaseTransformer {
  static fetch (data) {
    let mutableData = {
      label: [],
      val: [],
    }
    mutableData.val = Object.values(data)
    mutableData.label = editLabelData(Object.keys(data))
    return mutableData
  }
}

function editLabelData (data) {
  let date = []
  data.forEach(value => {
    date.push(value.slice(6, 8) + '/' + value.slice(4, 6) + '/' + value.slice(0, 4))
  })
  return date
}
