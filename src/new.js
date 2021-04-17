"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./index.scss");

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = window.$ = window.jQuery = _jquery.default;

exports.default = _default;

function formattedTime(formatTime = new Date()) {
  let startTime = '12:00';
  let endTime = '18:00';
  let UTCtime = [formatTime.getUTCHours(), formatTime.getUTCMinutes()].map(n => n < 10 ? `0${n}` : `${n}`).join(':');

  if (startTime < UTCtime && UTCtime < endTime) {
    console.log('From 12:00 to 18:00 - happy hours! Congratulations!');
  }

  console.log('UTC TIME: ' + UTCtime);
}

formattedTime();
$.getJSON('https://raw.githubusercontent.com/potatbut/json-server/master/db.json', function (data) {
  let numbers = data.numbers;
  let month = [];
  $.each(numbers, function () {
    this.is_visible ? $('.content__head').append('<p class="content__title" data-month="' + new Date(this.date_from).toLocaleString('en', {
      month: 'short'
    }).toLowerCase() + '">' + new Date(this.date_from).toLocaleString('en', {
      month: 'long'
    }) + '<sup class="content__year-label">' + new Date(this.date_from).getFullYear().toString().substr(-2) + '</sup></p>') : console.log(new Date(this.date_from).toLocaleString('en', {
      month: 'long'
    }) + ' is invisible');

    if (this.is_visible) {
      $('.content__body').append('<ul class="content__list" data-month="' + new Date(this.date_from).toLocaleString('en', {
        month: 'short'
      }).toLowerCase() + '"> </ul>');
    }

    let alias = this.alias;
    let date_from = this.date_from;
    let date_to = this.date_to;
    $.each(this.number_list, function () {
      let check_alias = this.number_alias;
      let date_alias = this.cdate;

      if (alias == check_alias && date_from < date_alias && date_alias < date_to) {
        month.push(this);
      }
    });
    month.sort((a, b) => a.cdate > b.cdate ? -1 : 1);
  });
  let monthList = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];

  for (let i = 0; i < monthList.length; i++) {
    $.each(month, function () {
      let formatDate = new Date(this.cdate);

      let formattedDate = () => [formatDate.getDate(), formatDate.getMonth() + 1, formatDate.getFullYear()].map(n => n < 10 ? `0${n}` : `${n}`).join('.');

      if (this.number_alias == monthList[i]) {
        $('ul[data-month="' + `${monthList[i]}` + '"]').append('<li class="content__item"><p class="content__item-number">' + this.number + '</p>' + '<p class="content__item-date">' + formattedDate() + '</p></li>');
      }
    });
  }
});
$(document).ajaxComplete(function () {
  let first_element = $('[data-month]').first().data().month;
  $('[data-month="' + `${first_element}` + '"]').addClass('active');
  $('.content__search-input').on('keyup', function () {
    let value = $(this).val().toLowerCase();
    $('li.content__item').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
  $('p.content__title').click(function () {
    $('[data-month]').removeClass('active');
    let target_element = $(this).data().month;
    $('[data-month="' + `${target_element}` + '"]').addClass('active');
  });
});