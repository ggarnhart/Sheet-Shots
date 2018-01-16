/*
  For now, all scroll snap points are done with the jquery plugin "jquery-panelsnap"
  You can find this on Github at https://github.com/guidobouman/jquery-panelsnap
  Thanks to whoever made that - much appreciated.

  That said, as CSS scroll snap points become more widely adopted, this may change.
*/

const prefix = "https://spreadsheets.google.com/feeds/list/";
const sheetID = "1S4JAECA5iQr6Ft5_-ERe6UfaDKzPScDAikajQG6M-r8";
const postfix = "/od6/public/values?alt=json";

const spreadsheetURL = prefix+sheetID+postfix;

var captionArr = [];
var locationArr = [];
var divScrollTopPx = [];

$.getJSON(spreadsheetURL,function(data){

  console.log(data);

  for(var i = 0; i<data.feed.entry.length; i++){
    //containers start at 0. Negative one woulda been weird.
    //count extra one (from landing page) here.

    //all these other bad boys (doubt you'll need em) start at 0
    //as one would expect
    var photoID = "photo"+i;
    var captionID = "caption"+i;
    var locationID= "location"+i;
    var itemID = "item"+i; //the id of the photo container / the thing that will have a background image

    var photoLink = data.feed.entry[i].gsx$links.$t;
    captionArr[i] = data.feed.entry[i].gsx$captions.$t;
    locationArr[i] = data.feed.entry[i].gsx$location.$t;

    var html = '<div class="item" id='+itemID+'>';
    html += '</div>';

    $(".photoCol").append(html);


    var jqID = "#" + itemID;
    $(jqID).css("background-image", "url("+photoLink+")");

    divScrollTopPx[i] = $(jqID).offset(); //stores how many pixels down the page this item is
  }

  //scrolling animations
  $(function(){
    $.scrollify({
      section: ".item",
    });
  });
});

var windowHeight = $(window).height();
window.onscroll = function (e){
  var scrollAmount = $(window).scrollTop();

  var amountByPic = scrollAmount/windowHeight;
  var currentCaption = captionArr[amountByPic-1];
  var currentLoc = locationArr[amountByPic-1];

  $("#captionHeader").text(currentCaption);
  $("#locationText").text(currentLoc);

/*
  $("#pin").animate({marginTop: "3em"});
  $("#pin").css("box-shadow","box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);");
*/

  if(scrollAmount == 0){
    $("#captionHeader").text("Captions will appear here.");
    $("#locationText").text("Locations will appear here.");
  }
}
