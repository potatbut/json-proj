import './index.scss'

import jquery from "jquery"
export default (window.$ = window.jQuery = jquery)




$.getJSON('https://raw.githubusercontent.com/potatbut/json-server/master/db.json', function(data) {

  let numbers = data.numbers
  let month = []

  $.each(numbers, function() {
    (this.is_visible) ?
    $('.content__head').append(
      '<p class="content__title" data-month="' 
      + new Date(this.date_from).toLocaleString('en', {month: 'short'}) + 
      '">' 
      + new Date(this.date_from).toLocaleString('en', {month: 'long'}) + 
      '</p>'
    ):
    console.log (new Date(this.date_from).toLocaleString('en', {month: 'long'}) + ' is invisible')
  })

  $.each(numbers, function() {
    if(this.is_visible){
      $('.content__body').append(
        '<ul class="content__list" data-month="'
        + new Date(this.date_from).toLocaleString('en', {month: 'short'}) + 
        '"> </ul>'
    )}
  })
  $.each(numbers, function() {
    if(this.is_visible) {
      $.each(this.number_list, function() {
        if(!this.type) {
          month.push(this)
        }
      })
      month.sort((a, b) => a.cdate > b.cdate ? -1 : 1)
    }
  })

  $.each(month, function() {
    let formatDate = new Date(this.cdate)
      let formattedDate = () => 
      [formatDate.getDate(), formatDate.getMonth()+1, formatDate.getFullYear()]
      .map(n => n < 10 ? `0${n}` : `${n}`).join('.');

    if(this.number_alias == 'jan') {
      $('ul[data-month="Jan"]').append('<li class="content__item"> <p class="content__item-number">'+ this.number + '</p>' + '<p class="content__item-date">' + formattedDate() +'</p></li>')
    } else if (this.number_alias == 'feb') {
      $('ul[data-month="Feb"]').append('<li class="content__item"> <p class="content__item-number">'+ this.number + '</p>' + '<p class="content__item-date">' + formattedDate() +'</p></li>')
    }
  })
})



$(document).ajaxComplete(function(){
  $('[data-month="Jan"]').addClass('active')
  $('.content__search-input').on('keyup', function() {
    let value = $(this).val().toLowerCase()
    $('li.content__item').filter(function() {
       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
  $('p.content__title').click(function() {
    if(event.target.dataset.month == "Feb") {
      $('[data-month="Feb"]').addClass('active')
      $('[data-month="Jan"]').removeClass('active')
    }
    if(event.target.dataset.month == "Jan") {
      $('[data-month="Jan"]').addClass('active')
      $('[data-month="Feb"]').removeClass('active')
    }
  })
})




function formattedTime(formatTime = new Date()) {
  let startTime = '12:00'
  let endTime = '18:00'
  let UTCtime = [
    formatTime.getUTCHours(), 
    formatTime.getUTCMinutes()
  ].map(n => n < 10 ? `0${n}` : `${n}`).join(':')
  if (startTime < UTCtime && UTCtime < endTime) {
    console.log('From 12:00 to 18:00 - happy hours! Congratulations!')
  }
  return 'UTC TIME: ' + UTCtime
}

console.log(formattedTime())