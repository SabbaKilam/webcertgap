//-----------------Abbas' JS Library -----------
//===============make DOM node element object from ID====
function o(s){
return document.getElementById(s);
}
//---------------------------------------------
function id(s){
return document.getElementById(s);
}
//---------------------------------------------
function _id(s){
return document.getElementById(s);
}
//---------------------------------------------
function on(e,o,h){
    if ( typeof o.addEventListener == "function" ){
        o.addEventListener(e, h, false);    
        if(e == "mousewheel"){
            o.addEventListener("DOMMouseScroll", h, false);
        }
        if(e == "DOMMouseScroll"){
            o.addEventListener("mousewheel", h, false);
        }        
    }else{
        o.attachEvent("on" + e, h);
    }
}
//==============Attach handler to an object for an event ====
function objectEventHandler(o,e,h){
    on(e,o,h);
};
//-----------------------------------------------
//variation: event listed as first argument
function whenUserDoesA(e,o,h){
    on(e,o,h);
}
//-----------------------------------------------
//variation: the function name is a more explicit verb: attach
function attachEventHandler(o,e,h){
    on(e,o,h);  
};
//================Create Ajax object=========================
Ajax = function(){//return XMLHttpRequest object or Error
  try{
    return new XMLHttpRequest();
  }
  catch(error){}
  try{
    return new ActiveXObject(Microsoft.XMLHTTP);
  }
  catch(error){}
  try{
    return new ActiveXObject(Msxml2.XMLHTTP);
  }
  catch(error){}
   
  throw new Error("Could not make AJAX request object.");
};
//==================================================
HttpObject = function(){//return XMLHttpRequest object or Error
  try{
    return new XMLHttpRequest();
  }
  catch(error){}
  try{
    return new ActiveXObject(Microsoft.XMLHTTP);
  }
  catch(error){}
  try{
    return new ActiveXObject(Msxml2.XMLHTTP);
  }
  catch(error){}
   
  throw new Error("Could not make AJAX request object.");
};
//============check for substring inside main string===========
function inStr(main,sub){
  var flag=false;
  if(main.indexOf(sub) !== -1){
    flag=true;  
  }
  return flag;
};
//==========check if ajax uploads files. Returns true or false=========================
ajaxUploadsFiles = function() {//http://blog.new-bamboo.co.uk/2012/01/10/ridiculously-simple-ajax-uploads-with-formdata
    return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();
//------------------internal functions-----------------------    
    function supportFileAPI() {
        var fi = document.createElement('INPUT');
        fi.type = 'file';
        return 'files' in fi;
    }
//------------------------------------------------------------    
    function supportAjaxUploadProgressEvents() {
        var xhr = new XMLHttpRequest();
        return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
    }
//------------------------------------------------------------    
    function supportFormData() {
        return !! window.FormData;
   }
};    
//=========================================================================
    function tagArray(o,s){
        return o.getElementsByTagName(s);
    }
//=======================================================    
function forAll(array, aFunction) {
  for (var i = 0; i < array.length; i++)
    aFunction(array[i]);
}
//=================================================
function forTwoArrays(ary1, ary2, action){
    if (ary1.length != ary2.length) return false;
    for(var i=0; i < ary1.length; i++){
        action(ary1[i],ary2[i]);
    }
    return true;
};
//===================================================
function forTwinArrays(ary1, ary2, action){
    if (ary1.length != ary2.length) return false;
    for(var i=0; i < ary1.length; i++){
        action(ary1[i],ary2[i]);
    }
    return true;
};
//===================================================
function callAfterMilliseconds(functionName,delay){
    return  setTimeout(functionName, delay);
}
//===================================================
function callAfterSeconds(functionName,delay){
    return  setTimeout(functionName, delay * 1000);
}
//=====================================================
function forBothDo(things1, things2, action){
    for(var i = 0; i < things1.length; i++ ){
        for(var j = 0; j < things2.length; j++){
            //action on the ordered pair Cartesian product things[i] X things[j] = (things1[i],things2[j]
            action(things1[i],things2[j]);
        }
    }
}
//=====================================================
function forBoth(things1, things2, action){
    for(var i = 0; i < things1.length; i++ ){
        for(var j = 0; j < things2.length; j++){
            action(things1[i],things2[j]);
        }
    }
}
//=====================================================
/* A function that retruns a boolean if its
** string argument is a finite number
*/
function isNumber(arg){
  return !isNaN(parseFloat(arg))  &&  isFinite(parseFloat(arg));
}
//====================================================
function forTripletArrays(a1,a2,a3,action){
	for(var i = 0; i < a2.length; i++){
		action(a1[i],a2[i],a3[i]);
	}
}
//====================================================
function _forTripletArrays(a1,a2,a3,action){
	for(var i = 0; i < a2.length; i++){
		action(a1[i],a2[i],a3[i]);
	}
}
//==================================================
function keyPressed(e){
    var theKey=0;
    e=(window.event)?event:e;
    theKey=(e.keyCode)?e.keyCode:e.charCode;
    return theKey;
}    
//==================================================
/**Drag and drop "mover" anywhere in "field"
  "mover" must be a child element of "field," 
  where field's position is relative,
  and mover's position is absolute.
  
  Example:
  
    #field{
      position: relative;
      background: url(../images/RainbowCandy.jpg) no-repeat center;
      background-size: cover;
      width: 1000px;
      height: 500px;
      margin: 0 auto;
    }

    #mover{
      background: url(../images/art.png) no-repeat center;
      background-size: cover;
      position: absolute;
      width: 50px;
      height: 50px;
      outline: 1px solid black;  
      opacity: 1.00;
    }  
*/
//=========================================
DnD = function(mover, field, dropGap){
  var e = e || window.event;
  var centerX, centerY;
  var currentX,currentY;   
  var halfWidth = mover.offsetWidth/2;
  var dragAllowed = false;
  on('load', window, adjustXY);
  on('resize', window, adjustXY);  
  on("mousedown", mover, allowDrag);
  on("mousemove", field, dragDiv);
  on("mouseup", mover, prohibitDrag);   
  on("mouseout", mover, prohibitDrag);  //maybeProhibitDrag;
  centerX = field.offsetLeft + halfWidth;
  centerY = field.offsetTop + halfWidth;
  //------------------------------------------
  function allowDrag(e){
      dragAllowed = true;
  }
  function dragDiv(e){
    if (dragAllowed){
      placeMover(e);      
    }
  }
  function placeMover(e){
    currentX = e.clientX;
    currentY = e.clientY;
    mover.style.top = (currentY - centerY) + "px";
    mover.style.left =(currentX - centerX) + "px";
  }
  //-------------------------------------------
  function prohibitDrag(e){
      dragAllowed=false;    
  }
  //-------------------------------------------
  function maybeProhibitDrag(e){// makes it hard to drop the mover
      var leftBehind = Math.abs(currentX - e.clientX)> dropGap && Math.abs(currentY - e.clientY) > dropGap;
      if(leftBehind ){
          dragAllowed=false;
      }
  }
  function adjustXY(){
      centerX = field.offsetLeft + halfWidth;
      centerY = field.offsetTop + halfWidth;
  }
}
//=============================================
/**A corollary function for hiding background art,
  or just to place the "mover" object where the mouse clicks.
*/  
function placeMover(mover, field, e){
  var e = e || window.event;
  var halfWidth = mover.offsetWidth/2;
  var halfHeight = mover.offsetHeight/2;
  var centerX = field.offsetLeft + halfWidth;
  var centerY = field.offsetTop + halfWidth;
  //place mover at e.client's in field, such as where a mouse clicked.
  mover.style.top = (e.clientY - centerY) + "px";
  mover.style.left = (e.clientX- centerX) + "px";
}
//---------------------------------------------------------------
//====the O(id) function===
function O(id){
  if( typeof id == 'object' ){
    return id;
  }
  else{
    return document.getElementById(id);
  }
}
//=====the S(obj) function for style
function S(obj){
    return O(obj).style;
}
//===the C(className) function for class array=====
function C(className){
  var objects = document.getElementsByTagName('*');
  var classArray = [];
  for(var i=0; i<objects.length; i++){
    if(objects[i].className === className){
      classArray.push(objects[i]);        
    }
  }
  return classArray;
}
//=================================================
//=== the lower-case c(className) abbreviated wrapper
function c(className){
  return document.getElementsByClassName(className);
}