"use strict";
//extent is using for prototype
var extend = function (o) {
	function F() {}
	F.prototype = o;
	return new F();
}
//main container of the application
var Container = function (){
	this.divWidth =  '251px';
	this.divHeight =  '302px';
	this.divId =  'main';
	this.divAppend = 'resp-calculator';
}
//it will be used to display divs in html document
var DisplayDiv = {
	displayContainer: function(obj){
		var newdiv = document.createElement("div"); // Create a <div>
		newdiv.id = obj.divId;
		newdiv.style.width = obj.divWidth;
		newdiv.style.height = obj.divHeight;
		document.getElementById(obj.divAppend).appendChild(newdiv);
	}, 
	divFloafLeft: function(divId){
		document.getElementById(divId).style.float = 'left';
	},
	addtextfield: function(divId){
		var inputtext = document.createElement("input");
		inputtext.id = 'txt-screen';
		inputtext.type = "text";
		inputtext.style.width = '190px';
		inputtext.style.height = '46px';
		inputtext.style.float = 'left';
		document.getElementById(divId).appendChild(inputtext); // put it into the DOM
	}
}
//this chunk of code if for generating buttons
var generateButton = {
	createbutton: function(objCreateButton){
		var newbutton = document.createElement("BUTTON");
		newbutton.id = objCreateButton.buttonId;
		var t = document.createTextNode(objCreateButton.buttonvalue);
		newbutton.appendChild(t);                                // Append the text to <button>
		document.getElementById(objCreateButton.divAppend).appendChild(newbutton);
		this.buttonstyle(objCreateButton);
	},
	buttonstyle:function(objCreateButton){
		document.getElementById(objCreateButton.buttonId).style.width = objCreateButton.buttonWidth;
		document.getElementById(objCreateButton.buttonId).style.height = objCreateButton.buttonHeight;
		document.getElementById(objCreateButton.buttonId).style.float = 'left';
	}
}

//Starting calculator interface

//creating main container
var objCont = new Container();
DisplayDiv.displayContainer(objCont);

//creating screen div
var objscreen = extend(objCont);
objscreen.divHeight = '65px';
objscreen.divId =  'screen';
objscreen.divAppend = objCont.divId;
DisplayDiv.displayContainer(objscreen);

//createing inner screen left div
var objscreenleftdiv = extend(objCont);
objscreenleftdiv.divWidth = '200px';
objscreenleftdiv.divHeight = '60px';
objscreenleftdiv.divId =  'screenLeftDiv';
objscreenleftdiv.divAppend = 'screen';
DisplayDiv.displayContainer(objscreenleftdiv);
DisplayDiv.divFloafLeft(objscreenleftdiv.divId);
DisplayDiv.addtextfield(objscreenleftdiv.divId);


//creating inner screen right div
var objscreenrightdiv = extend(objCont);
objscreenrightdiv.divWidth = '45px';
objscreenrightdiv.divHeight = '60px';
objscreenrightdiv.divId =  'clear-button';
objscreenrightdiv.divAppend = 'screen';
DisplayDiv.displayContainer(objscreenrightdiv);
DisplayDiv.divFloafLeft(objscreenrightdiv.divId);

//creating div for buttons
var objnumbersdiv = extend(objCont);
objnumbersdiv.divWidth = '251px';
objnumbersdiv.divHeight = '220px';
objnumbersdiv.divId =  'numbers-buttons';
objnumbersdiv.divAppend = objCont.divId;
DisplayDiv.displayContainer(objnumbersdiv);

//creating numeric buttons
var objCreateButton = extend(objCont);
objCreateButton.buttonWidth = '50px';
objCreateButton.buttonHeight = '50px';
for(var i=1;i<=9;i++){
	objCreateButton.buttonId = 'button_'+i;
	objCreateButton.buttonvalue = i;
	objCreateButton.divAppend = objnumbersdiv.divId;
	generateButton.createbutton(objCreateButton);
}
//creating zero button
objCreateButton.buttonId = 'button_0';
objCreateButton.buttonvalue = 0;
generateButton.createbutton(objCreateButton);

//creating add button
objCreateButton.buttonId = 'button_add';
objCreateButton.buttonvalue = '+';
generateButton.createbutton(objCreateButton);

//creating subtract button
objCreateButton.buttonId = 'button_sub';
objCreateButton.buttonvalue = '-';
generateButton.createbutton(objCreateButton);

//creating product button
objCreateButton.buttonId = 'button_prod';
objCreateButton.buttonvalue = '*';
generateButton.createbutton(objCreateButton);

//creating division button
objCreateButton.buttonId = 'button_div';
objCreateButton.buttonvalue = '/';
generateButton.createbutton(objCreateButton);

//creating decimal button
objCreateButton.buttonId = 'button_dot';
objCreateButton.buttonvalue = '.';
generateButton.createbutton(objCreateButton);

//This is the clear button which will be placed at top
objCreateButton.buttonId = 'btnclear';
objCreateButton.buttonHeight = '56px';
objCreateButton.buttonvalue = 'C';
objCreateButton.divAppend = objscreenrightdiv.divId;
generateButton.createbutton(objCreateButton);

//creating result button
objCreateButton.buttonId = 'button_equal';
objCreateButton.buttonWidth = '250px';
objCreateButton.buttonvalue = '=';
objCreateButton.divAppend = objnumbersdiv.divId;
generateButton.createbutton(objCreateButton);

//End Calculator Interface

//Given below code relates to the functionality of calculator

document.getElementById(objnumbersdiv.divId).addEventListener( 'click', function ( event ) {
    var elementId = event.target.id;
    switch(elementId){
    	case 'button_add':
    	case 'button_sub':
    	case 'button_prod':
    	case 'button_div':
    		document.getElementById('txt-screen').value = document.getElementById('txt-screen').value + event.target.innerHTML;
    	break;
    	case 'button_dot':
    		document.getElementById('txt-screen').value = document.getElementById('txt-screen').value + '.';
    	break;
    	case 'button_equal':
    		var val = document.getElementById('txt-screen').value;
			try { 
				var res = eval(document.getElementById('txt-screen').value);
			} 
			finally{
				var res = eval(val);
			}
			document.getElementById('txt-screen').value = document.getElementById('txt-screen').value + '=' + res;
    	break;
    	default :
    		for(var i=0;i<=9;i++){
			    if( event.target.id == 'button_'+i ) {
			        document.getElementById('txt-screen').value = document.getElementById('txt-screen').value + i;
			        break;
				};
			}
    	break;
    }
});

//clear screen
document.getElementById("btnclear").addEventListener( 'click', function () {
	document.getElementById('txt-screen').value = '';
});
//on enter key returns result
document.getElementById("txt-screen").addEventListener( 'keyup', function (e) {
	if(e.keyCode === 13 && document.activeElement !== 'text') {
		var val = document.getElementById('txt-screen').value;
		try { 
        	var res = eval(document.getElementById('txt-screen').value);
		}
		finally{
			var res = eval(val);
		}
		document.getElementById('txt-screen').value = document.getElementById('txt-screen').value + '=' + res;
    }else{
    	if(e.keyCode >= 65 && e.keyCode <= 90){
    		var str = document.getElementById('txt-screen').value;
    		document.getElementById('txt-screen').value = str.slice(0,-1) ;
    	}
    }
});