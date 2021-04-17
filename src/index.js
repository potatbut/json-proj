import './index.scss'

import jquery from "jquery"
export default (window.$ = window.jQuery = jquery)

let moment = require('moment');
moment().format();

function formattedTime() {
  let startTime = '12:00'
  let endTime = '18:00'
  let UTCtime = moment.utc().format('HH:mm')
  console.log('UTC TIME: ' + UTCtime)
  if (startTime <= UTCtime && UTCtime <= endTime) {
    console.log('From 12:00 to 18:00 - happy hours! Congratulations! ')
  }
}
formattedTime()


$.getJSON('https://raw.githubusercontent.com/potatbut/json-server/master/db.json', function(data) {

  let numbers = data.numbers
  let month = []
  let short_month = []
  let long_month = []
  let short_year = []
  

  for (let i = 0; i < numbers.length; i++) {
    short_month.push(moment(numbers[i].date_from).format('MMM').toLowerCase())
    long_month.push(moment(numbers[i].date_from).format('MMMM'))
    short_year.push(moment(numbers[i].date_from).format('YY'))
  }
  
  $.each(numbers, function(index) {
    (this.is_visible) ?
    $('.content__head').append(
      '<p class="content__title" data-month="' + `${short_month[index]}` + '">' 
      + `${long_month[index]}` + 
      '<sup class="content__year-label">'+ `${short_year[index]}` +'</sup></p>'
    ):
    console.log (`${long_month[index]}` + ' is invisible')
    if(this.is_visible) {
      $('.content__body').append(
        '<ul class="content__list" data-month="'+ `${short_month[index]}` + '"> </ul>'
      )
    }
    let alias = this.alias
    let date_from = this.date_from
    let date_to = this.date_to
    $.each(this.number_list, function() {
      let check_alias = this.number_alias
      let date_alias = this.cdate
      if(alias == check_alias && date_from < date_alias && date_alias < date_to) {
        month.push(this)
      }
    })
    month.sort((a, b) => a.cdate > b.cdate ? -1 : 1)
  })
  
  let monthList = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec']
  
  for(let i = 0; i < monthList.length; i++) {
    $.each(month, function() {
      let date_current = moment(this.cdate).format('DD.MM.YYYY')
      if(this.number_alias == monthList[i]) {
        $('ul[data-month="' + `${monthList[i]}` +'"]')
        .append(
          '<li class="content__item"><p class="content__item-number">'
           + this.number + '</p>' + '<p class="content__item-date">'
            + date_current +'</p></li>')
      }
    })
  }
  
})


$(document).ajaxComplete(function(){
  let first_element = $('[data-month]').first().data().month
  $('[data-month="' + `${first_element}` + '"]').addClass('active')

  $('.content__search-input').on('keyup', function() {
    let value = $(this).val().toLowerCase()
    $('li.content__item').filter(function() {
       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })

  $('p.content__title').click(function() {
    $('[data-month]').removeClass('active')
    let target_element = $(this).data().month
    $('[data-month="' + `${target_element}` + '"]').addClass('active')
  })
})



