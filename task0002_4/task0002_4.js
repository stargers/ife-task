var inputEl = $('.inputBox');
var sugEl = $('.suggest');

var suggestList = ['test','test1','testest','othertest','othdsadf'];
console.log(sugEl.nodeType);

var value='';

clearChildren(value);

$.addEvent(inputEl,'input',function(e){
	value = inputEl.value;
	console.log(value);
	var quickRex = RegExp('^' + value);
	var result = suggestList.filter(function(item){
		return quickRex.test(item);
	});
	clearChildren(sugEl);

	if(result.length !=0){
		sugEl.style.border = '1px solid #eee';
		sugEl.style.boxShadow = '1px 1px 3px #ededed';
	}


	result.forEach(function(value,index){
		var newElement =document.createElement('li');
		newElement.innerHTML = value;
		sugEl.appendChild(newElement);
	});
})

$.addEvent(document,'click',function(){
	sugEl.style.display = 'none';
})

$.addEvent(inputEl,'click',function(e){
	sugEl.style.display = 'block';
	e.stopPropagation();
})

$.addEvent(sugEl,'click',function(e){
	sugEl.style.display = 'none';
	inputEl.value = e.target.innerText;
	console.log(e);
})