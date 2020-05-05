import Vue from 'vue'
import moment from 'moment'

Vue.filter('date-format', (value,formatString='YYYY-MM-DD HH:mm:ss') => {
  return moment(value).format(formatString)
})

