function getStyle(element, attr) {
    //IE写法
    if (element.currentStyle) {
        return element.currentStyle[attr];
    //标准
    } else {
        return getComputedStyle(element, false)[attr];
    }
}

function startmove(element, json, interval,callback) {
     interval = interval || 30;
    console.log(interval);
	var flag = true;
    clearInterval(element.timer);	//清除元素之前定义的计时器
    element.timer = setInterval(function() {
        for (var arr in json) {		//对json对象中的每个属性进行计算
        	 //1.取当前的属性值
            var iCurrent = 0;
            if(arr == 'opacity'){
            	iCurrent = Math.round(getStyle(element,'opacity')*100);
            }else{
	            iCurrent = parseInt(getStyle(element, arr));	//得到元素最终呈现的属性值
            }

            //2.算当前速度
            var iSpeed = (json[arr] - iCurrent) / 10;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //3.未达到条件时，继续执行
            if(iCurrent != json[arr]){	
            	flag = false;
            	if(arr == 'opacity'){
            		element.style.filter = 'alpha(opacity:' + (iCurrent+iSpeed) +')'; //IE
            		element.style.opacity = (iCurrent + iSpeed)/100;	//标准
            	}else{
	            	element.style[arr] = iCurrent + iSpeed + 'px';
            	}
                console.log(iSpeed+'  '+iCurrent);
            }else{	
            	//终止条件
            	flag = true;
            }
        }
        //4.达到条件，执行回调
        if(flag){	
        	clearInterval(element.timer);
            	if(!!callback){
            		callback();
            	}
        }
    },30);
}



$.addEvent($('.innerLeft'),'click',function(){
	startmove($('.innerLeft'),{left:600},30,function(){
		console.log('complete');
	});
});

$.addEvent($('.third'),'click',function(){
	startmove($('.third'),{left:1000});
});

$.addEvent(document,'scroll',function(){
	console.log(document.documentElement.clientHeight +'  '+ $('.innerRight').clientHeight );
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var target = scrollTop + 
	(document.documentElement.clientHeight - $('.innerRight').clientHeight)/2;
	console.log(parseInt(target));
	startmove($('.innerRight'),parseInt(target));
})

var name = "Bob";  
var nameObj ={  
    name : "Tom",  
    showName : function(){  
        alert(this.name);  
    },  
    waitShowName : function(){
        var that = this;
        setTimeout("that.showName();", 1000);
    }
};       
nameObj.waitShowName();
