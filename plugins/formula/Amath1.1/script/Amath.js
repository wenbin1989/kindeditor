/*********************************************************
*	A mathml editor on web
*  Copyright (C) 2012-2013  FangBolang
*
* @author: Boalng Fang
* @Email: bolangfang@yahoo.com
* @Work Unit: School of Aero School, Tsinghua
************************************************************/
var A = {
	symbles:{
		mainmenu: {menu:["mo1","mo2","mi","matrix","operate"],},
		submenu: {
			//token: ["mtext","mi","mo","ms","mspace"],
			//layout: ["mrow","mfrac","msqrt","mroot","mstyle","merror","mpadded"],
			//limit: ["msub","msup","munder","mover","munderover","mmultiscripts"],
			//tabs: ["mtable",""],
			mi: ["&pi;","&ImaginaryI;","&ExponentialE;","&DifferentialD;","&CapitalDifferentialD;","sin","cos","sinh","cosh","&#x222b;","&#x2205;",
				"&#x3b3;","&#x221e;"],
			mo1:["+","&#x2212;","&#x2260;","&lt;","&le;","&sum;","(",")","[","]","{","}",
				"&#x2264;","&#x2260;","&#x2265;","&#x2261;","&#xac;","&#x2243;","&#x2032;",
				"|","||","&#x2202;","&#x2207;","&#x2207;","&#x22c5;","&#x21a6;","&#xd7;"],
			mo2:["&#x2208;","&#x2227;","&#x2218;","&#x230a;","&#x230b;","&#x2208;","&#x2209;","&#x2227;","&#x22C0;","&#xac;","&#x21d2;",
				"&#x2200;","&#x2308;","&#x2309;","&#x222a;","&#x22c2;","&#x2286;","&#x2282;","&#x2288;","&#x2284;","&#x2216;","&#x220f;",
				"&#x2329;","&#x232a;","&#xaf;","&#x3c3;","&#x2061;","&#x2297;","&#x2AFE;"],
			matrix: [""],
			operate: [""]
		}
	},
	html:"",
	templehtml:"",
	create: function(symbles){
		this.createMenu(symbles.mainmenu.menu);
		this.createSubmenu(symbles.submenu);
	},
	createMenu: function(elements){
		for(var i=0;i<elements.length;i++)
			this.html+='<li><a href=#'+elements[i]+'><span>'+elements[i]+'</span></a></li>';
		this.html = '<ul>'+this.html+'</ul>';
	},
	createSubmenu: function(submenu){
		function wrapmath(elt){
			return '<div class="box"><math xmlns="http://www.w3.org/1998/Math/MathML">'+elt+'</math></div>'
		}
		for(var tag in submenu){
			this.html+='<div id="'+tag+'">';
			if(tag=="operate"){
				var temp='<msqrt><mi>a</mi></msqrt>';					// sqrt
				this.html+=wrapmath(temp);
				temp ='<mroot><mi>a</mi><mi>n</mi></mroot>';			//root
				this.html+=wrapmath(temp);
				temp ='<mfrac linethickness="1"><mi>a</mi><mi>b</mi></mfrac>';				//fraction
				this.html+=wrapmath(temp);
				temp ='<mfrac bevelled="true"><mi>a</mi><mi>b</mi></mfrac>';
				this.html+=wrapmath(temp);
				temp='<msub><mi>a</mi><mi>b</mi></msub>';
				this.html+=wrapmath(temp);
				temp='<msup><mi>a</mi><mi>b</mi></msup>';
				this.html+=wrapmath(temp);
				temp='<msubsup><mi>B</mi><mi>a</mi><mi>b</mi></msubsup>'
				this.html+=wrapmath(temp);
				temp='<munder><mrow><mi>a</mi></mrow><mo>&UnderBrace;</mo></mover>';
				this.html+=wrapmath(temp);
				temp='<mover><mrow><mi>a</mi></mrow><mo>&Hat;</mo></mover>';
				this.html+=wrapmath(temp);
				temp='<munderover><mo>&#x222b;</mo><mi>a</mi><mi>b</mi></munderover>';	//integrate
				this.html+=wrapmath(temp);
				temp='<msubsup><mo>&#x222b;</mo><mi>a</mi><mi>b</mi></msubsup>';	//integrate
				this.html+=wrapmath(temp);
				temp='<mfenced><mi>x</mi><mn>1</mn></mfenced>';
				this.html+=wrapmath(temp);
				temp='<mfenced open="[" close="]"><mi>x</mi><mn>1</mn></mfenced>';
				this.html+=wrapmath(temp);
				temp='<mfenced open="(" close="]"><mi>x</mi><mn>1</mn></mfenced>';
				this.html+=wrapmath(temp);
				temp='<mfenced open="[" close=")"><mi>x</mi><mn>1</mn></mfenced>';
				this.html+=wrapmath(temp);
				temp='<mfrac><mrow><mi>&#x2202;</mi><mi>x</mi></mrow><mrow><mi>&#x2202;</mi><mi>y</mi></mrow></mfrac>';
				this.html+=wrapmath(temp);
				temp='<mfrac><mrow><msup><mi>&#x2202;</mi><mn>2</mn></msup><mi>x</mi></mrow><mrow><mi>&#x2202;</mi><msup><mi>y</mi><mn>2</mn></msup></mrow></mfrac>';
				this.html+=wrapmath(temp);
				temp='<mfrac><mrow><msup><mi>&#x2202;</mi><mn>2</mn></msup><mi>x</mi></mrow><mrow><mi>&#x2202;</mi><mi>y</mi><mi>&#x2202;</mi><mi>z</mi></mrow></mfrac>';
				this.html+=wrapmath(temp);
			}else if(tag=="matrix"){
				var rowcol="";
				rowcol='<mrow><mo>(</mo><mtable>';
				for(var i=0;i<3;i++){
					rowcol+='<mtr>';
					for(var j=0;j<3;j++){
						rowcol+='<mtd><mn>0</mn></mtd>';
					}
					rowcol+='</mtr>';
					var temp = rowcol+'</mtable><mo>)</mo></mrow>';
					this.html+='<div class="boxm"><math xmlns="http://www.w3.org/1998/Math/MathML">'+temp+'</math></div>';
				};
				var rowcol="";
				rowcol='<mrow><mo>(</mo><mtable>';
				for(var i=0;i<3;i++){
					rowcol+='<mtr>';
					rowcol+='<mtd><mn>0</mn></mtd>';
					rowcol+='</mtr>';
				};
				var temp = rowcol+'</mtable><mo>)</mo></mrow>';
				this.html+='<div class="boxm"><math xmlns="http://www.w3.org/1998/Math/MathML">'+temp+'</math></div>';
			}else if(tag==="mi"){
				for(var i=0;i<submenu[tag].length;i++)
					this.html+='<div class="box"><math xmlns="http://www.w3.org/1998/Math/MathML"><mi>'+submenu[tag][i]+'</mi></math></div>';
			}else if(tag==="mo1"||tag=="mo2"){
				for(var i=0;i<submenu[tag].length;i++)
					this.html+='<div class="box"><math xmlns="http://www.w3.org/1998/Math/MathML"><mo>'+submenu[tag][i]+'</mo></math></div>';
			}			
			this.html+='</div>';
		};
	},
	insertHtml: function(html){					
		var str='<div class="seperate">&nbsp</div>'+html+'<div class="seperate">&nbsp</div>',
		node = $.parseHTML(str);
		$(".cursor").before(node);
		$(".seperate").click(function() {
				//$('.cursor').removeClass("cursor");
				$(".cursor").removeClass("cursor");
                $(this).addClass("cursor");
            });
		$("#formula mi").click(function(){
			$(".cursor").removeClass("cursor");
			$(this).addClass("cursor");
		});
	}
};
var C = {
	keymap:{
		8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"SpaceBar",
		33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Del",
	
		45:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",
	
		65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",
		81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",
	
		96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",
		106:"Multiplay",107:"Add",109:"Subtract",110:"Decimal",111:"Divide",
	
		112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",
	
		59:";",61:"=",186:";",187:"=",
		188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"
	},
	keyboard: function(letter){	
		function navigate(direction){
			if(direction=="Right"){
				var p=getfocusposition();
				this.deleteFocus();
				setfocus(p+1);				
			}else{
				var p=getfocusposition();
				this.deleteFocus();
				setfocus(p-1);
			}
		}
		switch(letter){
			case "Right":
			case "Left":
				navigate(letter);
				break;
			case "Control":
			
			break;
			case "Shift":
			break;
			case "SpaceBar":
			break;
			case "F1":
			case "F2":
			case "F3":
			case "F4":
			case "F5":case "F6":case "F7":case "F8":case "F9":case "F10":case "F11":case "F12":
			break;
			default:
				letter = letter.toLowerCase();
				A.insertHtml('<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>'+letter+'</mi></math>');
		}
	}

};
//var math = Object.create(A);
A.create(A.symbles);
$("#tabs").html(A.html);
$("#tabs").tabs();
function togglecursor(){
	$(".cursor").toggleClass("blink");
};
self.setInterval("togglecursor()",300);
$(document).ready(function(){
	$(".box").click(function(){
		//$(".cursor").before($(this).html()); 
		A.insertHtml($(this).html());
		$("#status").text($(this).html());
	});
	$(".boxm").click(function(){
		//$(".cursor").before($(this).html());
		A.insertHtml($(this).html());
		$("#status").text($(this).html());
	});
	$(".box").hover(function(){
		$(this).toggleClass("mouseover");
	});
	$(".boxm").hover(function(){
		$(this).toggleClass("mouseover");
	});
	$(this).on("keydown",function(e){
		C.keyboard(C.keymap[e.which]);
		$("#status").text("<mi>"+C.keymap[e.which]+"</mi>");
	});
});
