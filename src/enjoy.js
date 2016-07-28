/**
 * [The core function enjoy.js]
 * @author Yc
 * @email  yongcheng0660@163.com
 * @since  2014-06-15
 */
(function(window, undefined){
	/**
	 * [root 创建一个全局对象]
	 * @type {[type]}
	 */
	var root = window,
		dc = document,
		host = window.location.host;

	/**
	 * [_enjoy 防冲突]
	 * @type {[type]}
	 */
	var oldEnjoy = root.enjoy;

	/**
	 * [Prototype 缓存内置对象原型]
	 * @type {[type]}
	 */
	var split = String.prototype.split,
		push = Array.prototype.push,
		pop = Array.prototype.pop,
		unshift = Array.prototype.unshift,
		shift = Array.prototype.shift,
		slice = Array.prototype.slice,
		join = Array.prototype.join,
		splice = Array.prototype.splice,
		sort = Array.prototype.sort,
		hasOwn = Object.prototype.hasOwnProperty;

	/**
	 * [enjoy 创建enjoy对象]
	 * @type {Object}
	 */
	var enjoy = {};

	/**
	 * [version 版本声明]
	 * @type {String}
	 */
	enjoy.version = '0.0.1';

	/**
	 * [namespace 命名空间]
	 * @return {[type]} [description]
	 * 调用
	 * enjoy.namespace('A.CAT');
	 * enjoy.A.CAT.name = 'kk';
	 */
	enjoy.namespace = function(str){
		if(typeof str === 'string'){
			var array = split.call(str, '.'),
				arrayLen = array.length,
				i = (array[0] === 'namespace')? 1 : 0,
				o = this; 
			for(i; i < arrayLen; i++){
		        o[array[i]] = o[array[i]] || {};
		        o = o[array[i]];
		    }
		}
	};

	/**
	 * [ArrayMethod 创建数组方法构造函数及继承方法]
	 */
	var ArrayMethod = function(){};

	ArrayMethod.prototype = {
		/**
		 * [min 取数组最小值]
		 * @param  {[type]} array [纯数字数组]
		 * @return {[type]}       [返回最小值]
		 */
		min: function(array){
			if(array.constructor === Array){
				return Math.min.apply(this, array);
			}
		},
		/**
		 * [max 取数组最大值]
		 * @param  {[type]} array [纯数字数组]
		 * @return {[type]}       [返回最大值]
		 */
		max: function(array){
			if(array.constructor === Array){
				return Math.max.apply(this, array);
			}
		},
		/**
		 * [has 数组是否含某值]
		 * @param  {[type]}  array [数组]
		 * @param  {[type]}  value [值]
		 * @return {Boolean}       [返回true或false]
		 */
		has: function(array, value){
			if(array.constructor === Array){
				var arrayLen = array.length,
					has = false;
				for(var i = 0; i < arrayLen; i++){
					if(array[i] === value){
						has = true;
					}
				}
				return has;
			}
		},
		/**
		 * [sort 数组排序]
		 * @param  {[type]}  array [纯数字数组]
		 * @param  {Boolean} isASC [是否为升序，1为升序，0为降序]
		 * @return {[type]}        [返回排序数组]
		 */
		sort: function(array, isASC){
			if(array.constructor === Array){
				isASC = Boolean(isASC);
				/**
				 * [newArray 创建新数组并进行排序，不改变原数组]
				 */
				var newArray = [],
					arrayLen = array.length;
				for(var i = 0; i < arrayLen; i++){
					push.call(newArray, array[i]);
				}
				var compare = function(value1, value2){
					return isASC === true ? (value1 - value2) : (value2 - value1);
				}
				return sort.call(newArray, compare);
			}
		},
		/**
		 * [unique 数组去重]
		 * @param  {[type]} array [数组]
		 * @return {[type]}       [返回去重数组]
		 */
		unique: function(array){
			if(array.constructor === Array){
				var newArray = [],
					obj = {},
					arrayLen = array.length;
				for(var i = 0; i < arrayLen; i++){
					if(!obj[array[i]]){
						push.call(newArray, array[i]);
						obj[array[i]] = 1;
					}
				}
				return newArray;
			}
		},
		/**
		 * [index 取数组某值的下标值]
		 * @param  {[type]} array [数组]
		 * @param  {[type]} value [查询值]
		 * @return {[type]}       [返回一个数组的下标值]
		 */
		index: function(array, value){
			if(array.constructor === Array){
				var arrayLen = array.length,
					arrayIndex = [];
				for(var i = 0; i < arrayLen; i++){
					if(array[i] === value){
						push.call(arrayIndex, i);
					}
				}
				return arrayIndex;
			}
		},
		/**
		 * [each 遍历数组]
		 * @param  {[type]}   array [数组]
		 * @param  {Function} fn    [调用函数]
		 */
		each: function(array, fn){
			if(array.constructor === Array && typeof fn === 'function'){
				var arrayLen = array.length;
				for(var i = 0; i < arrayLen; i++){
					fn.call(this, i, array[i]);
				}
			}
		},
		/**
		 * [filter 数组类型筛选]
		 * @param  {[type]} array [数组]
		 * @param  {[type]} type  [类型]
		 * @return {[type]}       [返回筛选数组]
		 */
		filter: function(array, type){
			if(array.constructor === Array){
				var arrayLen = array.length,
					newArray = [];
				for(var i = 0; i < arrayLen; i++){
					if(typeof array[i] === type){
						push.call(newArray, array[i]);
					}
				}
				return newArray;		
			}
		}
	};

	/**
	 * [arrayMethod 实例化数组方法]
	 * @type {ArrayMethod}
	 */
	var arrayMethod = new ArrayMethod();

	/**
	 * [enjoy继承arrayMethod的所有方法]
	 */
	(function(){
		for(var aMKey in arrayMethod){
			enjoy[aMKey] = arrayMethod[aMKey];
		};
	})();

	/**
	 * [objectMethod 创建对象方法构造函数及继承方法]
	 */
	var ObjectMethod = function(){
		/**
		 * [obj 存储对象]
		 * @type {Object}
		 */
		this.obj = {};
	};

	ObjectMethod.prototype = {
		/**
		 * [set 存放对象]
		 * @param {[type]} key   [键名,唯一，新值会替换旧值]
		 * @param {[type]} value [键值]
		 */
		set: function(key, value){
			if(typeof value === 'function'){
				value.apply(this, arguments);
			}
			else{
				this.obj[key] = value;
			}
		},
		/**
		 * [get 取值]
		 * @param  {[type]} key [键名]
		 * @return {[type]}     [返回对应键值]
		 */
		get: function(key){
			for(var i in this.obj){
				if(i === key){
					return this.obj[i];
					break;
				}
			}
		},
		/**
		 * [getAll 取所有对象]
		 * @return {[type]} [返回所有对象]
		 */
		getAll: function(){
			return this.obj;
		},
		/**
		 * [getSize 取对象总数]
		 * @return {[type]} [返回对象总个数]
		 */
		getSize: function(){
			var count = 0;
			for(var i in this.obj){
				count++;
			}
			return count;
		},
		/**
		 * [hasKey 是否含某键名]
		 * @param  {[type]}  key [键名]
		 * @return {Boolean}     [返回true或false]
		 */
		hasKey: function(key){
			var has = false;
			for(var i in this.obj){
				if(i === key){
					has = true;
					break;
				}
			}
			return has;
		},
		/**
		 * [hasValue 是否含某值]
		 * @param  {[type]}  value [键值]
		 * @return {Boolean}       [返回true或false]
		 */
		hasValue: function(value){
			var has = false;
			for(var i in this.obj){
				if(this.obj[i] === value){
					has = true;
					break;
				}
			}
			return has;
		},
		/**
		 * [remove 删除键值及键名]
		 * @param  {[type]} key [键值]
		 * @return {[type]}     [返回所删除的键值]
		 */
		remove: function(key){
			var value = 'this key does not exist!';
			for(var i in this.obj){
				if(key === i){
					value = this.obj[key];
					delete this.obj[key];
					break;
				}
			}
			return value;
		},
		/**
		 * [removeAll 删除对象]
		 * @return {[type]} [返回删除对象]
		 */
		removeAll: function(){
			var obj = this.obj;
			delete this.obj;
			return obj;
		}
	};

	/**
	 * [arrayMethod 实例化对象方法]
	 * @type {ArrayMethod}
	 */
	var objectMethod = new ObjectMethod();

	/**
	 * [enjoy继承arrayMethod的所有方法]
	 */
	(function(){
		for(var oMKey in objectMethod){
			enjoy[oMKey] = objectMethod[oMKey];
		};
	})();

	/**
	 * [FunctionMethod 创建函数方法构造函数及继承方法]
	 */
	var FunctionMethod = function(){};
	FunctionMethod.prototype = {
		/**
		 * [once 函数只执行一次]
		 * @param  {Function} fn  [回调函数]
		 * @param  {[type]}   that [执行开关，以this作为参数]
		 */
		once: function(fn, that){
			if(typeof that !== 'undefined'){
				fn = fn || function(){};
				if(that.first === undefined){
					that.first = true;
				}
				if(that.first === true){
					fn.apply(this, arguments);
					that.first = false;
				}
			}
		},
		/**
		 * [times 设定函数执行次数]
		 * @param  {Function} fn  [回调函数]
		 * @param  {[type]}   that [执行开关，以this作为参数]
		 * @param  {[type]}   ts  [可执行次数]
		 */
		times: function(fn, that, ts){
			if(typeof that !== 'undefined'){
				fn = fn || function(){};
				if(that.first === undefined){
					that.first = true;
					that.i = 0;
				}
				if(that.first === true){
					fn.apply(this, arguments);
					that.i++;
					if(that.i === ts){
						that.first = false;
					}				
				}
			}
		},
		/**
		 * [turns 轮流执行函数]
		 * @param  {[type]} fn1  [被执行函数1]
		 * @param  {[type]} fn2  [被执行函数2]
		 * @param  {[type]} that [执行开关，以this作为参数]
		 */
		turns: function(fn1, fn2, that){
			if(typeof that !== 'undefined'){
				fn1 = fn1 || function(){};
				fn2 = fn2 || function(){};
				if(that.tg === undefined){
					fn1.apply(this, arguments);
					that.tg = true;
				}
				else{
					fn2.apply(this, arguments);
					that.tg = undefined;				
				}
			}
		},
		/**
		 * [interval 模拟setInterval]
		 * @param  {Function} fn        [被执行函数]
		 * @param  {[type]}   time      [间隔时间]
		 * @param  {[type]}   timerName [定时器名称]
		 * @return {[type]}             [返回定时器]
		 */
		interval: function(fn, time, timerName){
			var _self = this;
			this[timerName] = setTimeout(function(){
				fn.apply(this, arguments);
				_self[timerName] = setTimeout(arguments.callee, time);
			});
		},
		/**
		 * [digits 保留小数点位数]
		 * @param  {[type]} n [数字传入]
		 * @param  {[type]} d [小数点位数]
		 * @return {[type]}   [返回字符串结果]
		 */
		digits: function(n, d){
			var result = (Math.round(n * Math.pow(10, d)) / Math.pow(10, d)).toString(),
				array = split.call(result, '.'),
				dsLen = typeof array[1] === 'undefined'? 0 : array[1].length;
			if(dsLen < d){
				if(dsLen === 0){
					result += '.';
				}
				var add = d - dsLen;
				for(var i = 0; i < add; i++){
					result += '0';
				}				
			}
			return result;
		},
		/**
		 * [getChar 取字节数]
		 * @param  {[type]} str [传入字符串]
		 * @return {[type]}     [返回字节数]
		 */
		getChar: function(str){
			var strLen = str.length,
				charLen = 0;			
			for(var i = 0; i < strLen; i++){
				var unicode = str.charCodeAt(i);
				if((unicode >= 0 && unicode <= 255) || (unicode >= 0xff61 && unicode <= 0xff9f)){
					charLen += 1;
				}
				else{
					charLen += 2;
				}
			}
			return charLen;
		},
		/**
		 * [supportAttr 判断标签是否支持某属性]
		 * @param  {[type]} attr [属性]
		 * @param  {[type]} tag  [标签]
		 * @return {[type]}      [返回true或false]
		 */
		supportAttr: function(attr, tag){
			var support = false;
			if(attr in dc.createElement(tag)){
				support = true;
			}
			return support;
		},
		/**
		 * [key 键盘事件]
		 * @param  {[type]}   k  [键盘值]
		 * @param  {Function} fn [执行函数]
		 */
		key: function(k, fn){
			fn = fn || function(){};
			dc.onkeyup = function(e){
				e = e || window.event;
				var code = e.keyCode || e.which || e.charCode;
				if(typeof k === 'string'){
					var array = split.call(k, '+'),
						item1 = array[0],
						item2 = array[1];
					if(e[item1 + 'Key'] === true && code === Number(item2)){
						fn.call(this, k);
					}
				}
				else{
					if(code === k){
						fn.call(this, k);
					}
				}
			}
		},
		/**
		 * [imgLoaded 图片预加载]
		 * @param  {[type]}   array    [图片地址数组]
		 * @param  {Function} fn       [所有图片加载完执行函数]
		 * @param  {[type]}   overtime [超时]
		 * @param  {[type]}   count    [每加载完一张图片则调用该函数]
		 * @return {[type]}            [description]
		 */
		imgLoaded: function(array, fn, overtime, count){
			var arrayLen = array.length,
				loaded = 0;
			if(array.constructor !== Array || arrayLen === 0){
				return;
			}
			fn = fn || function(){};
			overtime = overtime || 500;
			count = count || function(){};
			/**
			 * 超时回调
			 */
			var timer = setTimeout(function(){
				fn.call(this, loaded, array);
			}, overtime * arrayLen);

			for(var i = 0; i < arrayLen; i++){
				(function(i){
					var img = new Image();
					img.onload = function(){
						loaded++;
						count.call(this, loaded, arrayLen);
						if(loaded === arrayLen){
							fn.call(this, loaded, array);
							clearTimeout(timer);
						}
					}
					img.src = array[i];
				})(i);
			}
		},
		/**
		 * [timeFormat 时间格式转换]
		 * @param  {[type]} n [传入数字]
		 * @return {[type]}   [返回json数据包含天、小时、分钟、秒]
		 */
		timeFormat: function(n){
            if(typeof n === 'number'){
                var obj = {},
                	day = Math.floor(n / 86400),
					hour = this.addZero(Math.floor((n - day * 86400) / 3600), 2),
					minute = this.addZero(Math.floor((n - day * 86400 - hour * 3600)/60), 2),
					second = this.addZero(Math.floor(n - day * 86400 - hour * 3600 - minute * 60), 2);
				obj = {
					day: day,
					hour: hour,
					minute: minute,
					second: second
				}
                return obj;
            }
        },
        /**
         * [addZero 补零]
         * @param {[type]} str [原字符串]
         * @param {[type]} n   [加零后的字符串长度]
         */
        addZero: function(str, n){
			var str = '' + str;
			while(str.length < n){
				str = '0' + str;
			};
			return str;
		},
		/**
		 * [isIE6 是否为ie6或更低版本浏览器]
		 * @return {Boolean} [返回true或false]
		 */
		isIE6: function(){
			return typeof(dc.body.style.maxHeight) === 'undefined' ? true : false;
		},
		/**
		 * [hasChinese 是否含有中文]
		 * @param  {[type]}  str [传入字符串]
		 * @return {Boolean}     [返回true或false]
		 */
		hasChinese: function(str){
			var reg = /.*[\u4e00-\u9fa5]+.*$/;
            return reg.test(str);
        },
		/**
		 * [isChinese 是否为中文]
		 * @param  {[type]}  str [传入字符串]
		 * @return {Boolean}     [返回true或false]
		 */
		isChinese: function(str){
			var reg = /^[\u4e00-\u9fa5]+$/;
            return reg.test(str);
        },
        /**
         * [isEmail 是否为邮箱地址]
         * @param  {[type]}  str [传入字符串]
         * @return {Boolean}     [返回true或false]
         */
        isEmail: function(str){
        	var reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i;
        	return reg.test(str);
        },
        /**
         * [isPhone 是否为手机号码]
         * @param  {[type]}  str [传入字符串]
         * @return {Boolean}     [返回true或false]
         */
        isPhone: function(str){
        	var reg = /^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$/;
        	return reg.test(str);
        },
		/**
		 * [maxWH 图片最大宽度]
		 * @param  {[type]} img  [图片对象]
		 * @param  {[type]} data [src所存贮的属性名]
		 * @param  {[type]} w    [最大宽度]
		 * @param  {[type]} h    [最大高度]
		 */
		maxWH: function(img, data, w, h){
			var src = img.getAttribute(data);
			this.imgLoaded([src], function(){
				img.setAttribute('src', src);
				var imgW = img.offsetWidth,
					imgH = img.offsetHeight,
					scale = imgW / imgH;
				if(imgW > w){
					img.style.width = w + 'px';
					img.style.height = parseInt(w / scale) + 'px';
				}
				if(imgH > h && h !== undefined){
					img.style.height = h + 'px';
					img.style.width = parseInt(h * scale) + 'px';
				}
			});
		},
		/**
		 * [platform 平台判断]
		 * @param  {[type]}  d [平台名]
		 * @return {Boolean}   [无传入平台名时，返回所有平台对象，
		 * 有传入则返回该平台的true或false]
		 */
		platform: function(d){
			var platform = root.navigator.platform,
				useragent = root.navigator.userAgent,
				device = {
			       	win: platform,
			        mac: platform,
			       	linux: platform,
			       	iphone: platform,
			       	ipad: useragent,
			       	ipod: useragent,
			       	android: useragent
				},
				is = {};
			for(var i in device){
				is[i] = new RegExp(i, 'i').test(device[i]);
			}
			if(typeof d === 'undefined'){
				return is;
			}
			else{
				for(var j in is){
					if(j === d){
						return is[d];
						break;
					}
				}
			}			
		},
		/**
		 * [random 取随机数]
		 * @param  {[type]} len [随机数长度]
		 * @return {[type]}     [返回随机数]
		 */
		random: function(len){
			len = len || 15;
			var chars = 'abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ0123456789'
				charsLen = chars.length,
				result = [];
			for(var i = 0; i < len; i++){
				var index = Math.floor(Math.random() * charsLen);
				push.call(result, chars.substr(index, 1));
			}
			return join.call(result, '');
		},
		/**
		 * [fixed 定位]
		 * @param  {[type]} dom  [dom对象]
		 * @param  {[type]} left [左偏移]
		 * @param  {[type]} top  [上偏移]
		 */
		fixed: function(dom, left, top){
			if(!!dom.length){
				return;
			}
			left = parseInt(left) || 0;
			top = parseInt(top) || 0;
			if(this.isIE6()){
				dom.style.position = 'absolute';
				var change = function(){
					dom.style.left = left + 'px';
					dom.style.top = top + dc.documentElement.scrollTop + 'px';
				}
				root.onscroll = function(){
					change();
				}
				root.onresize = function(){
					change();
				}
			}
			else{
				dom.style.position = 'fixed';
				dom.style.left = left + 'px';
				dom.style.top = top + 'px';
			}
		},
		/**
		 * [placeholder 模拟placeholder]
		 */
		placeholder: function(){
			if(this.supportAttr('placeholder', 'input')){
				return;
			}
			var input = dc.getElementsByTagName('input'),
				textarea = dc.getElementsByTagName('textarea'),
			rebuild = function(o){
				var oLen = o.length;
				while(oLen--){
					var pHVal = o[oLen].getAttribute('placeholder');
					if(pHVal){		
						var span = dc.createElement('span'),
						    spanPHVal = dc.createTextNode(pHVal);
						span.appendChild(spanPHVal);
						span.className = 'enjoy-placeholder';
						o[oLen].parentNode.insertBefore(span, o[oLen]);
						o[oLen].parentNode.style.position = 'relative';
						span.style.cssText = 'position:absolute;';						
						(function(i){
							var thisInput = o[i],
							    span = thisInput.previousSibling;	
							if(thisInput.value !== ''){
								span.style.display = 'none';
							}					
							thisInput.onfocus = function(){
								if(thisInput.value === ''){
									span.style.display = 'none';
								}
							}
							thisInput.onblur = function(){
								if(thisInput.value === ''){
									span.style.display = 'block';
								}
							}
						})(oLen);
					}
				}
			};
			rebuild(input);
			rebuild(textarea);
		},
		/**
		 * [eHTML 转义HTML]
		 * @param  {[type]} str [传入HTML字符串]
		 * @return {[type]}     [返回转义HTML]
		 */
		eHTML: function(str) {
		    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		},
		/**
		 * [uneHTML 反转义HTML]
		 * @param  {[type]} str [传入转义字符串]
		 * @return {[type]}     [返回反转义HTML]
		 */
		uneHTML: function(str) {
		    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
		}
	}
	/**
	 * [FunctionMethod 实例化函数方法]
	 * @type {FunctionMethod}
	 */
	var functionMethod = new FunctionMethod();

	/**
	 * [enjoy继承FunctionMethod的所有方法]
	 */
	(function(){
		for(var fnKey in functionMethod){
			enjoy[fnKey] = functionMethod[fnKey];
		};
	})();

	/**
	 * [Cookie 创建cookie方法构造函数及继承方法]
	 */
	var Cookie = function(){};
	Cookie.prototype = {
		/**
		 * [setCookie 设置cookie]
		 * @param {[type]} name   [名称]
		 * @param {[type]} value  [值]
		 * @param {[type]} hour   [时长]
		 * @param {[type]} domain [所在域名]
		 * @param {[type]} path   [所在路径]
		 */
		setCookie: function(name, value, hour, domain, path){
			var cookieNV = name + '=' + escape(value) + '; ';
			if(hour){
				var date = new Date();
				date.setTime(date.getTime() + hour * 1000 * 3600);
			}
			var cookieExpires = hour ? 'expires=' + date.toGMTString() + '; ' : '',
				cookieDomain = domain ? 'domain=' + domain + '; ' : 'domain=' + host + '; ',
				cookiePath = path ? 'path=' + path + '; ' : 'path=/;';
			document.cookie = cookieNV + cookieExpires + cookieDomain + cookiePath;
		},
		/**
		 * [getCookie 获取cookie]
		 * @param  {[type]} name [名称]
		 * @return {[type]}      [返回该名称cookie值]
		 */
		getCookie: function(name){
			var cookieStr = document.cookie,
				cookieArr = split.call(cookieStr, '; '),
				cookieArrL = cookieArr.length;
			for(var i = 0; i < cookieArrL; i++){
				var cookieEach = split.call(cookieArr[i], '=');
				if(cookieEach[0] == name){
					return cookieEach[1];
					break;
				}
			}
			return '';
		},
		/**
		 * [removeCookie 删除cookie]
		 * @param  {[type]} name   [名称]
		 */
		removeCookie: function(name, domain, path){
			var cookieDomain = domain ? 'domain=' + domain + '; ' : 'domain=' + host + '; ',
				cookiePath = path ? 'path=' + path + '; ' : 'path=/;',
				date = new Date();
			date.setTime(date.getTime() - 1000);
			document.cookie = name + '=none; expires=' + date.toGMTString() + '; ' + cookieDomain + cookiePath;
		}
	};

	/**
	 * [Cookie 实例化]
	 * @type {Function}
	 */
	var cookie = new Cookie();

	/**
	 * [enjoy继承cookie的所有方法]
	 */
	(function(){
		for(var cookieKey in cookie){
			enjoy[cookieKey] = cookie[cookieKey];
		};
	})();

	/**
	 * [root 返回封装enjoy对象]
	 * @type {[type]}
	 */
	if(typeof root === 'object' && typeof root.document === 'object'){
		root.enjoy = enjoy;
	}

})(window, undefined);







