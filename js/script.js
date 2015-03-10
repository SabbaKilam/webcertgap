/**
// Author: Abbas Abdulmalik
// Creation Date: March 9, 2015
// Revised: March 9, 2015
// Note: web dev proposal
*/
//////////////////////////data below/////////////
var content = O("content");
var menu = O("menu");
var colorsArray = ["lightgray",
"hsl(204, 89%, 55%)",
"hsl(162, 53%, 39%)",
"hsl(40, 53%, 48%)",
"hsl(9, 63%, 53%)",
"hsl(277, 97%, 70%)"
];
var topicArray = document.getElementsByClassName("topic");
var selectedArray = [{"topic1":false},
 {"topic2":false},
 {"topic3":false},
 {"topic4":false},
 {"topic5":false},
 {"topic6":false}
 ];
//////////////////////////event handlers//////////////

window.onload = init

//===========================
window.onresize = resize;
//===========================
function resize(){
    S(document.documentElement).fontSize = innerWidth/100 + "px";
    var totalHeight = window.innerHeight;
    S("menu").height = 3*(totalHeight/8) + "px";
    S("menu").paddingTop = (totalHeight/4)  + "px";
    S("menu").paddingBottom = 3*(totalHeight/8) + "px"; 
    S("topicHolder").height = (totalHeight) + "px";
    //center the heading
    S("heading").left =(innerWidth/2 - O("heading").offsetWidth/2) + "px";
    
    // shroud covers entire page
    S("shroud").height = innerHeight + "px";
    S("shroud").width = innerWidth + "px";
    
    //center the shroud's content
    S("shroudContent").left =(innerWidth/2 - O("shroudContent").offsetWidth/2) + "px";  
    
    //temporary show of width in pixels
    //O("pixels").innerHTML = innerWidth +"px";
}
//================================
objectEventHandler(O("shroud"),"click", closeShroud);
    //-----helper-------
    function closeShroud(){
        S("shroud").visibility = "hidden";
        S("shroudContent").opacity = 0;            
    }
//==================================
objectEventHandler(O("heading"),"click",function(){
    matchSelectedColor();
    S("shroud").visibility = "visible";
    S("shroudContent").opacity = 1;    
    resize();
    //------------helper-------------
    function matchSelectedColor(){        
        forTripletArrays(selectedArray, colorsArray, topicArray, function(topicSelected, aColor, aTopic){
            if( topicSelected[aTopic.id] === true ){
                S("shroudContent").background = "-webkit-linear-gradient(" + aColor + ",lightgray)";
                S("shroudContent").background = "-moz-linear-gradient(" + aColor + ",lightgray)";
                S("shroudContent").background = "-ms-linear-gradient(" + aColor + ",lightgray)";
                S("shroudContent").background = "-o-linear-gradient(" + aColor + ",lightgray)";
                S("shroudContent").background = "linear-gradient(" + aColor + ",lightgray)";
            }
        });
    }
    //-------------------------------
});
//===================================
objectEventHandler(O("envelope"),"click",function(e){
    document.location = "mailto:aabdulmalik@pit.edu?subject=WebCertGap";
    e.stopPropagation();
});
//=================================
function init(){
    resize();
    O("topic1").click();
};
//=================================
//Change background color for topic choice on mouseover
forTwinArrays(topicArray,colorsArray, function(aTopic,aColor){
    objectEventHandler(aTopic,"mouseover",function(){
        S(aTopic).background = aColor;
    })
});
//==================================
//Return background color back to black for topic choice on mouseout
// (unless it was previously selected by a click)
forTwinArrays(topicArray, selectedArray, function(aTopic, aSelection){
    objectEventHandler(aTopic,"mouseout",function(){
        if(!aSelection[aTopic.id]){
            S(aTopic).background = "black";
        }
    });
});
//==================================
// Establish click handlers for all topic choices
// chooses proper color for choice label
// drops in new content (from ajax call) and proper color for content
// swap in new content like a sliding door
forTripletArrays(topicArray, colorsArray, selectedArray, function(aTopic, aColor, aSelection){
    objectEventHandler(aTopic,"click",function(){
        if ( aSelection[aTopic.id] === true ){
            //already selected: nothing to do.
            return;
        }
        //------------use AJAX to get content data --------
        var ajax = new XMLHttpRequest();
        var url = "http://abbas411.com/webcertgap/"+ aTopic.id + ".html";
        ajax.open("GET", url, true);
        ajax.send();
        //-------------Ajax handler gets data-----------
        ajax.onload = function(){
            if( this.status === 200 || this.status === 0){
                //give the old content time to hide before loading new content.
                setTimeout(function(){
                    O("topicContents").innerHTML = ajax.response;
                },20);
            }
            else{
                alert("Trouble getting data.");
            }
        }
        //-----------END of Ajax stuff----------------------
        falsifyAllSelectedObjects();
        S("topicHolder").width = 0;


        //register the fact that this topic is now selected    
        aSelection[aTopic.id] = true;
        
        S(aTopic).background = aColor;
                       
        //delay opening topic window to accomodate transition delay
        setTimeout(function(){
            //put scrollbar's scrollbox at the top
            O("topicContents").scrollTop = 0;
            S("topicHolder").background = aColor;  
            S("topicHolder").width = "100%";
        }, 250)
    });
    //--------------------helper-----------
    function falsifyAllSelectedObjects(){
        forTwinArrays(topicArray, selectedArray, function(aTopic,aSelection){
           aSelection[aTopic.id] = false;
           S(aTopic).background = "black";
        });    
    };
});
////////////////////////////////////////END///////////////////////////
