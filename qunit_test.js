// function isArray(arr){
//     console.log(arr);
//     return (arr instanceof Array);
// }

function isArray(arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
}

function isFunction(fn) {
    return Object.prototype.toString.call(fn) == '[object Function]';
}

function cloneObject(obj) {
    var resultObj = isArray(obj) ? [] : {}; //判断当前对象类型是数组还是对象
    for (var key in obj) {
        if (typeof obj[key] === 'object') {
            //如果当前属性是对象，则递归调用函数
            resultObj[key] = cloneObject(obj[key]);

        } else if (typeof obj[key] === 'function') { //不复制function
            continue;
        } else {
            resultObj[key] = obj[key]; //否则 为值类型，直接复制  
        }
    }

    return resultObj;
}

// function uniqArray(arr) {
//     var len = arr.length,
//         result = [];

//     for (var i = 0; i < len; i++) {
//         for (var j = i + 1; j < len; j++) {
//             if (arr[i] == arr[j]) {
//                 break;
//             }
//         }
//         if (j == len) {
//             result.push(arr[i]);
//         }
//     }
//     return result;
// }

function uniqArray(arr) {
    var len = arr.length,
        result = [],
        hashCode = {};

    for (var i = 0; i < len; i++) {
        if (!hashCode[arr[i]]) {
            result.push(arr[i]);
            hashCode[arr[i]] = true;
        }
    }
    return result;
}

function isEmail(emailStr) {
    var emailPattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/g;

    return emailPattern.test(emailStr);
}

function isPhoneNumber(phoneNumberStr) {
    var numberPattern = /^1[3578]\d{9}$/g;

    return numberPattern.test(phoneNumberStr);
}


function addClass(element, newClassName){
    element.classList.add(newClassName);
}

function removeClass(element, oldClassName) {
    element.classList.remove(oldClassName);
}

function isSiblingNode(element, siblingNode) {
    var parentEl = element.parentNode;
    if(parentEl != siblingNode.parentNode) return false;

    var i,len,child = parentEl.firstElementChild;
    while(child != parentEl.lastElementChild){
        if(child == siblingNode)return true;
        child = child.nextElementSibling;
    }
    return false;
}

function getPosition(element) {
    return '{' + element.offsetLeft+' ，' + element.offsetTop +'}';
}

function $(selector){
    var currentEl = this;

    if(typeof selector != 'string') return false;
    // var selectorList = selector.split(' ');

    // while(selectorList.length != 1){
    //     var currentSelector = selectorList.shift();
    //     var currentGroup = $(currentSelector);
    //     console.log($(selectorList.join()));
    //     ($(selectorList.join()).bind(currentGroup))();
    // }


    var idPattern = /^#(\w|-)+/,
        classPattern = /^\.[\w-]+/,
        attriPattern = /\[([\w-]+)\]/;
        attriValuePattern = /\[([\w-]+)=([\w-]+)\]/;

    if(idPattern.test(selector)){
        selector = selector.replace(/^#/,'');
        console.log(selector);
        return document.getElementById(selector);
    }
    if(classPattern.test(selector)){
        selector = selector.replace(/^\./,'');
        return document.getElementsByClassName(selector)[0];
    }
    if(attriPattern.test(selector)){
        selector = selector.replace(attriPattern,'$1');
        console.log(selector);
        var filter = function(node){
            return node.hasAttribute(selector) ? NodeFilter.FILTER_ACCEPT :NodeFilter.FILTER_SKIP;

        }
        var iterator = document.createNodeIterator(document.body,NodeFilter.SHOW_ELEMENT,filter,false);
        return iterator.nextNode();
    }
    if (attriValuePattern.test(selector)) {
        var attri, value;
        selector.replace(attriValuePattern, function(match, p1, p2) {
            attri = p1;
            value = p2;
        });
        var filter = function(node) {
            return node.hasAttribute(attri) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;

        }
        var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, filter, false);
        var node = iterator.nextNode();
        while(node!=null){
            if(node.getAttribute(attri) == value){
                return node;
            }
            node = iterator.nextNode();            
        }

        return null;
    }

    return null;
}

 function parseIntnumber(parseNum,fill){
    parseNum +='';
    var intPattern = eval('/^\\d{'+fill+'}$/');

    while(!intPattern.test(parseNum)){
        parseNum = '0' + parseNum;
    }

    return parseNum;
 }


QUnit.test("对象深度复制测试", function(assert) {
    var srcObj = {
        a: 1,
        b: {
            b1: ["hello", "hi"],
            b2: "JavaScript"
        },
        c: function() {
            console.log('sss');
        }
    };
    var cloneObj = cloneObject(srcObj);
    cloneObj.b.b1[0] = 'change text';
    cloneObj.a = 123;
    assert.ok(cloneObj.b.b1[0] != srcObj.b.b1[0], '通过表示成功，数组属性互不影响');
    assert.ok(cloneObj.a != srcObj.a, '通过表示成功，值属性互不影响');

    assert.equal(parseIntnumber(2,2),'02','相等');
});

QUnit.test('数组去重', function(assert) {
    var srcArr = [1, 3, 5, 7, 5, 3],
        answerArr = [1, 3, 5, 7];

    assert.deepEqual(uniqArray(srcArr), answerArr, '通过表示 两数组相等');
})

QUnit.test('邮箱匹配', function(assert) {
    var str1 = 'xuruizuan@163.com',
        str2 = 'xurui.eric@gmail.com',
        str3 = '2341241212@qq.com';

    assert.ok(isEmail(str1), 'ok')
    assert.ok(isEmail(str2), 'ok')
    assert.ok(isEmail(str3), 'ok')
})

QUnit.test('手机号匹配', function(assert) {
    var str1 = '13541548641',
        str2 = '188056410215',
        str3 = '23401246510';
    var ss = 'riifeubjyjsafuxrnqjrszvbyzlpzdoyverwtae';

    function fn(str) {
        var strArr = str.split(''),
            hashCode = [];
        var i = 0,
            len = strArr.length;
        while (i < len) {
            if (hashCode.indexOf(strArr[i]) == -1) {
                hashCode.push(strArr[i]);
            }
            var start = i++;
            var s = strArr[start];
            while (strArr[start] == strArr[i]) {
                s += strArr[i];
                if (hashCode.indexOf(s) == -1) {
                    hashCode.push(s);
                }
                i++;
            }
        }
        return hashCode.length;
    }
    assert.ok(isPhoneNumber(str1), 'ok')
    assert.ok(!isPhoneNumber(str2), 'ok')
    assert.ok(!isPhoneNumber(str3), 'ok')
});


QUnit.test('dom test',function(assert){
    var inputDom = document.getElementById('input');
    var divDom = document.getElementsByClassName('oldClass')[0];
    var fatherDom = document.getElementsByClassName('fatherClass')[0];
    var childDom = document.getElementsByClassName('childClass')[0];
        console.log(document.body.querySelectorAll('div'));
    console.log(fatherDom.parentNode == divDom.parentNode);
    console.log(divDom);

    assert.ok(isSiblingNode(fatherDom,divDom),'there are on the same floor');
    assert.ok(!isSiblingNode(childDom,divDom),'there are on the different floor');

    console.log(divDom);
    console.log(inputDom);
    addClass(divDom,'newClass');
    console.log(getPosition(document.getElementById('qunit-testrunner-toolbar')));


    assert.equal(2,divDom.classList.length,'has add newClass');
    assert.equal(1, divDom.nodeType, 'element type is element');
    assert.equal(divDom.getAttribute('class'),'oldClass newClass','yes');

    removeClass(divDom,'newClass');
    console.log(divDom.classList.length);
    assert.equal(divDom.getAttribute('class'),'oldClass','yes');


    var parentEl = document.getElementById('qunit-fixture');
    console.log('===================');
    console.log($('#input'));
    console.log($('[data-main=100]'));
    console.log($('.oldClass'));
});