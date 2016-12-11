var listEl = $('.programList');

console.log(listEl);

delegateEvent(listEl,'li','click',function(e){
	console.log(e.target);
	if(e.target.classList.contains('proClass')){
		console.log('toggle');
		e.target.classList.toggle('active');
	}
});


// console.log(listItemEl);

var taskList = [{
    member: [{
        type: '1',
        name: 'task1',
    }, {
        type: '1',
        name: 'task3'
    }],
    name: '默认类别'
}, {
    member: [{
        type: '2',
        name: 'task2',
    }, {
        type: '2',
        name: 'task4',
    }],
    name: '第一类'
}];


function addItem(parentEl, dataList,itemConfig,callback) {
	var config = {
		tag:itemConfig.tag || 'li',
		iconClass: itemConfig.iconClass || '',
		liClass:itemConfig.liClass || '',
	},
    	len = dataList.length;

    for (var i = 0; i < len; i++) {
        var listItemEl = document.createElement(config.tag);
        addClass(listItemEl,config.liClass);
        var iconEl = document.createElement('span');
        addClass(iconEl, config.iconClass);

        listItemEl.appendChild(iconEl);

        var textEl = document.createElement('span');
        textEl.innerHTML = dataList[i].name;

        listItemEl.appendChild(textEl);
        parentEl.appendChild(listItemEl);

        !!callback && callback(listItemEl);
    }
}

//添加所有任务
for (var i = 0; i < taskList.length; i++) {
    addItem($('.totalTaskList'), taskList[i].member, {
        tag: 'li',
        iconClass: 'glyphicon glyphicon-paperclip',
        liClass:'currentTaskList'
    });

    var currentType = [taskList[i]];

    addItem($('.typeList'), currentType, {
        tag: 'li',
        iconClass: "glyphicon glyphicon-folder-open",
        liClass: 'proClass currentTaskList'
    }, function(el) {
    	var ulItem = document.createElement('ul');
    	addClass(ulItem,'currentTaskList');
    	el.appendChild(ulItem);

        addItem(ulItem, currentType[0].member, {
            tag: 'li',
            iconClass: 'glyphicon glyphicon-paperclip',
        });
    });
}





