var leftLis = $('.leftList').getElementsByTagName('li');

function refreshList(element,tag){
	var listArr = element.getElementsByTagName(tag),
		listLen = listArr.length;

	var offsetHeight = listArr[0].offsetHeight;
	var offsetLeft = listArr[0].offsetLeft;
	for(var j = 0;j<listLen;j++){
		listArr[j].style.left = offsetLeft + 'px';
		listArr[j].style.top = j*offsetHeight + 1 + 'px';
		listArr[j].style.backgroundColor = randomColor();
	}

};

//产生随机颜色代码
function randomColor() {
    //颜色字符串  
    var colorStr = "#";
    //字符串的每一字符的范围  
    var randomArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    //产生一个六位的字符串  
    for (var i = 0; i < 6; i++) {
        //15是范围上限，0是范围下限，两个函数保证产生出来的随机数是整数  
        colorStr += randomArr[Math.ceil(Math.random() * (15 - 0) + 0)];
    }

    return colorStr;
}


refreshList($('.leftList'),'li');
refreshList($('.rightList'),'li');
var distX,distY,
	oriX,oriY;
function move(e){
		that.style.left = e.clientX - distX + 'px';
		that.style.top = e.clientY - distY + 'px';
}

//
delegateEvent($('.container'),'li','mousedown',function(e){
	//鼠标点击位置距离元素边界位置
	distX = e.offsetX;
	distY = e.offsetY;
	//元素初始位置
	oriX = parseInt(e.target.style.left);
	oriY = parseInt(e.target.style.top);
	that = e.target;
	addClass(e.target,'active');
		console.log(oriX +' '+oriY);
	$.addEvent(document,'mousemove',move);

	$.addEvent(document,'mouseup',function(e){
		removeEvent(this,'mousemove',move);
		removeClass(e.target,'active');

		startmove(that,{left:oriX,top:oriY},30,function(){
			console.log('comeback');
		})
	})
})


