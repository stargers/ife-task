console.log('deadline start');

var deadLineEl = $('#dealLine');
var startBtnEl = $('#startBtn');
var noteEl = $('#note');
var resultEl = $('#result');
var deadLineDate='';

var secBack = function() {
    var nowDate = new Date().getTime();
    console.log('sssss');
    var duringTime = deadLineDate - nowDate;
    if (duringTime < 0) {
        return noteEl.innerHTML = '已过期';
    } else {
        var day = parseIntNumber(parseInt(duringTime / 24 / 60 / 60 / 1000),2),
            hour = parseIntNumber(parseInt(duringTime / 60 / 60 / 1000 % 24),2),
            min = parseIntNumber(parseInt(duringTime / 60 / 1000 % 60),2),
            sec = parseIntNumber(parseInt(duringTime / 1000 % 60),2);
        resultEl.innerHTML = day + '天' + hour + '小时' + min + '分' + sec + '秒';
    }
    setTimeout(secBack, 1000);
};

$.addEvent(startBtnEl, 'click', function() {
    var text = trim(deadLineEl.value);
    var datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

    if (datePattern.test(text))
        var dateArr = text.split('-');
    else {
        return noteEl.innerHTML = '输入不符合格式';
    }

    deadLineDate = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);

    setTimeout(secBack, 1000);

})
