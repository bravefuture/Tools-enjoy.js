# enjoy.js 工具库 

- 命名空间:
```javascript
enjoy.namespace('A.CAT');
enjoy.A.CAT.name = 'kk';
```

- 取数组最小值:
```javascript
enjoy.min([4, 8, 3, 6]);
=> 3
```

- 取数组最大值:
```javascript
enjoy.max([4, 8, 3, 6]);
=> 6
```

- 数组是否含某值:
```javascript
enjoy.has([4, 8, 3, 6], 6);
=> true
```

- 数组排序(第二个参数1为升序，0为降序):
```javascript
enjoy.sort([4, 8, 3, 6], 0);
=> [8, 6, 4, 3]
```

- 数组去重:
```javascript
enjoy.unique([4, 8, 8, 3, 6, 6]);
=> [4, 8, 3, 6]
```

- 取数组某值的下标值:
```javascript
enjoy.index([4, 8, 3, 6, 8], 8);
=> [1, 4]
```

- 遍历数组:
```javascript
enjoy.each([4, 8, 3, 6], function(i, v) {
    console.log(v)
});
=> [4, 8, 3, 6]
```

- 数组类型筛选:
```javascript
enjoy.filter([4, 8, 3, 6, 'str'], 'number');
=> [4, 8, 3, 6]
```

- 存放对象(所有对象将存放在enjoy.obj中):
```javascript
enjoy.set('enjoy', true);
enjoy.obj => Object {enjoy: true}
```

- 取存放对象的value值:
```javascript
enjoy.get('enjoy');
```

- 取所有对象:
```javascript
enjoy.getAll();
```

- 取对象总数:
```javascript
enjoy.getSize();
```

- 是否含某键名:
```javascript
enjoy.hasKey('enjoy');
```

- 是否含某值:
```javascript
enjoy.hasValue(true);
```

- 删除键值及键名:
```javascript
enjoy.remove('enjoy');
```

- 删除所有对象:
```javascript
enjoy.removeAll();
```

- 函数只执行一次:
```javascript
var btn = {};
enjoy.once(function() {
    console.log(1);
}, btn);
```

- 设定函数执行次数:
```javascript
enjoy.times(function() {
    console.log(1);
}, btn, 2);
```

- 轮流执行函数:
```javascript
 var btn = {};
enjoy.turns(function() {
    console.log(1);
}, function() {
    console.log(2);
}, btn);
```

- 模拟setInterval:
```javascript
enjoy.interval(function() {
    console.log(1)
}, 1000);
```

- 保留小数点位数:
```javascript
enjoy.digits(1.223, 2);
=> 1.22
```

- 取字节数:
```javascript
enjoy.getChar('enjoy');
=> 5
```

- 判断标签是否支持某属性:
```javascript
enjoy.supportAttr('placeholder', 'input');
=> true
```

- 键盘事件:
```javascript
enjoy.key(13, function() {
    console.log('Enter');
});
```

- 图片预加载:
```javascript
enjoy.imgLoaded(array, fn, overtime, count);
@param  {[type]}   array    [图片地址数组]
@param  {Function} fn       [所有图片加载完执行函数]
@param  {[type]}   overtime [超时]
@param  {[type]}   count    [每加载完一张图片则调用该函数]
```

- 时间格式转换(秒):
```javascript
enjoy.timeFormat(60);
=> Object {day: 0, hour: "00", minute: "01", second: "00"}
```

- 补零:
```javascript
enjoy.addZero(1, 3);
=> 001
```

- 是否为ie6或更低版本浏览器:
```javascript
enjoy.isIE6();
```

- 是否含有中文:
```javascript
enjoy.hasChinese();
```

- 是否为中文:
```javascript
enjoy.isChinese();
```

- 是否为邮箱地址:
```javascript
enjoy.isEmail();
```

- 是否为手机号码:
```javascript
enjoy.isPhone();
```

- 限制图片最大高宽度:
```javascript
enjoy.maxWH(img, data, w, h);
@param  {[type]} img  [图片对象]
@param  {[type]} data [src所存贮的属性名]
@param  {[type]} w    [最大宽度]
@param  {[type]} h    [最大高度]
```

- 平台判断:
```javascript
enjoy.platform('win');
```

- 取随机数:
```javascript
enjoy.random(11);
```

- 定位:
```javascript
enjoy.fixed(dom, left, top);
@param  {[type]} dom  [dom对象]
@param  {[type]} left [左偏移]
@param  {[type]} top  [上偏移]
```

- 模拟placeholder:
```javascript
enjoy.placeholder();
```

- 转义HTML:
```javascript
enjoy.eHTML('<div></div>');
=> &lt;div&gt;&lt;/div&gt;
```

- 反转义HTML:
```javascript
enjoy.uneHTML('&lt;div&gt;&lt;/div&gt;');
=> <div></div>
```

- 设置cookie:
```javascript
enjoy.setCookie(name, value, hour, domain, path);
@param {[type]} name   [名称]
@param {[type]} value  [值]
@param {[type]} hour   [时长]
@param {[type]} domain [所在域名]
@param {[type]} path   [所在路径]
```

- 获取cookie:
```javascript
enjoy.getCookie(name);
```

- 删除cookie:
```javascript
enjoy.removeCookie(name, domain, path);
```