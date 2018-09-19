var calculator = (function(){

	//calculation
	var calc = [];
	var allTypes = ['+','/','%','^','*'];
	var dots = 0;
	var calcString = 'Enter your calculation here';
	var digits = '';
	var addingNumber = true;
	var numberAfterDot = true;
	var backspaceNumber = false;
	var deleteNumber = false;

	//DOM elements
	var calcScreen = 	document.getElementsByClassName('calculation')[0].querySelector('p');
	var numbers = 		document.getElementsByClassName('numbers');
	var signs = 			document.getElementsByClassName('sign');
	var reset = 			document.getElementsByClassName('reset');
	var result = 			document.getElementsByClassName('result');
	var equal = 			document.getElementsByClassName('equal');
	var dot = 				document.getElementsByClassName('dot');
	var del = 				document.getElementsByClassName('del');

	_render();

	//events
	for(var i = 0; i<numbers.length; i++){
		numbers[i].addEventListener('click',addNumber);
	}
	for(var i = 0; i<signs.length; i++){
		signs[i].addEventListener('click',addSign);
	}
	reset[0].addEventListener('click',clear);
	equal[0].addEventListener('click',findResult);
	dot[0].addEventListener('click',addDot);
	del[0].addEventListener('click',delNum);

	//main
	function addNumber(){
		numberAfterDot = true;
		var number = this.querySelector('p').innerHTML;

		if(calcString == 'Enter your calculation here'){
			calcString = '';
		}
		digits+=number;
		calcString+= number;
		_render();
		deleteNumber = false;
	}

	function addSign(){

		if(digits!='' && numberAfterDot){
			if(!deleteNumber){
				calc.push( digits );
			}
			var sign = this.querySelector('p').innerHTML;
			calc.push( sign );
			calcString+=sign;
			digits = '';
			_render();
		}
	
		deleteNumber = true;
	}

	function delNum(){
		if(!deleteNumber){
			calc.push( digits	);
		}
		calcString = String(calcString);
		calcString = calcString.slice(0,-1);

		if(	allTypes.includes( calc[calc.length - 1] )	&& digits == ''){
			calc.splice(-1 , 1);
			digits = calc[calc.length - 1];
		}
		else{
			digits = String(digits);
			digits = digits.slice(0,-1);

			if(digits !=''){
				calc.splice(-1 , 1);
				calc.push(digits);
			}
			else{
				calc.splice(-1,1);
			}
		}
		deleteNumber = true;
		_render();
	}

	function addDot(){
		dots++;
		calcString+='.';
		digits+='.';
		numberAfterDot = false;
		_render();
	}

	function clear(){
		numberAfterDot = true;
		calc = [];
		calcLen = 0;
		calcString = 'Enter your calculation here';
		digits = '';
		addingNumber = true;
		result[0].innerHTML = '';;
		_render();
	}

 	function findResult(){

		calc.push(digits);
		while(calc.length > 1){
			calc[0] = get_result(calc[0],calc[1],calc[2]);
			calc.splice(1,2);
		}
		result[0].innerHTML = calc[0];
		digits = calc[0];
		calcString = calc[0];
		calc.splice(0,1);
		_render();
	}

	function get_result(x,sign,y){
		if(sign == '+'){
			return add(parseFloat(x),parseFloat(y));
		}
		if(sign == '-'){
			return minus(parseFloat(x),parseFloat(y));
		}
		if(sign == '*'){
			return mult(parseFloat(x),parseFloat(y));
		}
		if(sign == '/'){
			return dia(parseFloat(x),parseFloat(y));
		}
		if(sign == '^'){
			return power(parseFloat(x),parseFloat(y));
		}
	}

	function add(x,y){
		return x+y;
	}

	function power(x,y){
		return Math.pow(x,y);
	}

	function dia(x,y){
		return x/y;
	}

	function mult(x,y){
		return x*y;
	}
	function minus(x,y){
		return x - y;
	}

	function _render(){
		calcScreen.innerHTML = calcString;
	}

}());
