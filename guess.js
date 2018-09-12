(function () {
	$(document).ready(function () {
		Array.prototype.remove = function (item) {
			var index = this.indexOf(item);
			this.splice(index, 1);
		}
		Array.prototype.randomGet = function () {
			var index = Math.floor((Math.random() * this.length));
			return this[index];
		}
		Array.prototype.contain = function (item) {
			var index = this.indexOf(item);
			return index != -1 ? true : false;
		}

		function getNum() {
			var arr = [];
			var legal = false;
			for (let i = 0; i < 10; i++) {
				arr.push(i);
			}
			while (!legal) {
				var NUM = 0,
					i = 4;
				while (i--) {
					var random = arr.randomGet();
					arr.remove(random);
					var _num = random * Math.pow(10, i);
					NUM += _num;
				}
				//由于第一位数为0时是不合法的，所以再取一次
				if (NUM > 1000) legal = true;
			}
			window.NUM = NUM;
		}

		function check(num) {
			var numA = 0,
				numB = 0;
			var numArr = num.toString().split('');
			var NUMArr = NUM.toString().split('');
			for (var i = 0; i < 4; i++) {
				if (numArr[i] == NUMArr[i]) numA++;
				else if (NUMArr.contain(numArr[i])) {
					numB++;
				}
			}
			if (numA == 4) showMsg('恭喜', '你猜对了！');
			else if (window.count >= 10) showMsg('不要灰心，再来一次', NUM);
			return {
				numA: numA,
				numB: numB
			}

		}

		function showMsg(title, msg) {
			var title = $('<h6>' + title + '</h6>');
			var msg = $('<h2>' + msg + '</h2>');
			$('.back').append(title, msg);
			$('.front,.back').toggleClass('active');

		}

		function star() {
			window.record = [];
			window.count = 0;
			var NUM = getNum();

		}
		star();

		//数字键
		$('span:not(.spe)').click(function () {
			var str = $('.screen').text();
			if (str.length >= 4 || $(this).hasClass('disabled')) return;
			if (str.length == 0 && $(this).text() == 0) return;
			//为了保证你每次不输入重复数字
			$(this).addClass('disabled');
			window.record.push($(this));
			str += $(this).text();
			$('.screen').text(str);
		})
		//删除键
		$('.del').click(function () {
			var str = $('.screen').text();
			if (str.length == 0) return;
			str = str.substr(0, str.length - 1);
			$('.screen').text(str);
			var last = window.record.pop();
			last.removeClass('disabled');
		})
		//提交键
		$('.sbt').click(function () {
			var str = $('.screen').text();
			if (str.length < 4) return;
			window.count++;
			var result = check(parseInt(str));
			var p = $('<p>' + str + ':' + result.numA.toString() + "A" + result.numB.toString() + "B" + '</p>');
			$('.front').append(p);
			$('.screen').text('');
			$('span').removeClass('disabled');

		})
	})
}())
