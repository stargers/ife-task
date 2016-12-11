console.log($('#checkBtn'));
var btn = $('#checkBtn');
var inputEl = $('#interest');
var listEl = $('#list');


$.addEvent(btn,'click',function(){
	while(listEl.hasChildNodes()){
		listEl.removeChild(listEl.firstChild);	
	}
	var inputStr = inputEl.value;
	var strArr = uniqArray1(inputStr.split(' '))

	for(var i =0,len = strArr.length;i<len;i++){
		if(!strArr[i]) continue;
		var newElement = document.createElement('li');
		newElement.innerHTML = strArr[i];
		listEl.appendChild(newElement);
	}

})

var checkBtn2 = $('#checkBtn2');
var textAreaEl =$('#textAreaEl');
var listEl2 = $('#list2');

$.addEvent(checkBtn2,'click',function(){
	while(listEl2.hasChildNodes()){
		listEl2.removeChild(listEl2.firstChild);	
	}
	var text = textAreaEl.value;
	var strArr = text.split(/[\n,，、; ]/)
	for(var i =0,len = strArr.length;i<len;i++){
		if(!strArr[i]) continue;
		var newElement = document.createElement('li');
		newElement.innerHTML = strArr[i];
		listEl2.appendChild(newElement);
	}
});

var checkBtn3 = $('#checkBtn3');
var inputEl3 = $('#step3_input');
var noteEl = $('#note');
var listEl3 = $('#list3');

$.addEvent(checkBtn3,'click',function(){
	while(listEl3.hasChildNodes()){
		listEl3.removeChild(listEl3.firstChild);
	}

	if(noteEl.hasChildNodes())
		noteEl.removeChild(noteEl.firstChild);

	var text = trim(inputEl3.value);
	var strArr = text.split(/[\n,;\s]/);
	var len =strArr.length;
	console.log(text +' | '+len);
	if(len >= 2 && len <=10 ){
		for(var i =0;i<len;i++){
		if(!trim(strArr[i])) continue;
		var newLabel = document.createElement('label');
		newLabel.for = 'id'+i;

		var newInput = document.createElement('input');
		var newTextEl = document.createElement('span');
		newTextEl.innerHTML = strArr[i];
		newInput.id = 'id'+i;
		newInput.setAttribute('type','checkBox');
		newLabel.appendChild(newInput);
		newLabel.appendChild(newTextEl);
		listEl3.appendChild(newLabel);

	}
	}else{
		var newElement = document.createElement('span');
		newElement.innerHTML = '输入爱好数量不符合要求';
		noteEl.appendChild(newElement);
	}
})