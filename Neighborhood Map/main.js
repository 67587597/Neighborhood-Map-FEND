var map;
var locations = [
{ title:'Safa and Marwa', location: {lat: 21.42394, lng: 39.82762}},
{ title:'Great Mosque of Mecca', location: {lat: 21.422889, lng: 39.825718}},
{ title:'Abraj Al Bait', location: {lat: 21.418674, lng: 39.824946}},
{ title:'Al Baik', location: {lat: 21.421111, lng: 39.821706}},
{ title:'Zamzam Well', location: {lat: 21.424068, lng: 39.831808}}
];
var markers =[];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.422871, lng: 39.825735},
    zoom: 15
  });
  var largeInfowindow = new google.maps.InfoWindow();
  //var bounds = new google.maps.LatLngBounds();
  for (var i=0; i<locations.length; i++)
  {
    var position = locations[i].location;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
      map: map,
      icon: 'http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png',
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });

    markers.push(marker);
    //bounds.extend(marker.position);
    marker.addListener('click', function()
    {
      populateInfoWindow(this, largeInfowindow);
    });
    marker.addListener('mouseover', function()
    {
      this.setIcon(highLightedIcon);
    });
    marker.addListener('mouseout', function()
    {
      this.setIcon(defaultIcon);
    });
  }

  //set  default icon
  var defaultIcon = 'http://1.bp.blogspot.com/_GZzKwf6g1o8/S6xwK6CSghI/AAAAAAAAA98/_iA3r4Ehclk/s1600/marker-green.png';

  //set highlited icon
  var highLightedIcon = 'http://maps.google.com/mapfiles/ms/icons/blue.png';

  function click()
  {
   document.getElementById("markers_info")
   var item    = document.createElement('div');

      item.innerHTML='Marker#'+(++i);
       item.onmouseover.populateInfoWindow(this, largeInfowindow);

  };
/*  function clickFunction()
  {
    var element = document.getElementById("markers_info");
    element.addListener('click', function()
    {
      this.setIcon(highLightedIcon);
        element.populateInfoWindow(this, largeInfowindow);

    });
  }

$(document).ready(function() {
     // make a .hover event
  $('#markers_info .marker').hover(
       // mouse in
       function () {
         // first we need to know which <div class="marker"></div> we hovered
         var index = $('#markers_info .marker').index(this);
         markers[index].setIcon(highlightedIcon);
       },
       // mouse out
       function () {
         // first we need to know which <div class="marker"></div> we hovered
         var index = $('.markers_info').index(this);
         markers[index].setIcon(defaultIcon);
       }
     );
   });
  /*     $("#markers_info ul li").on('mouseenter', function(){
            var index = $('.markers_info').index(this);
            markers[index].setIcon(alternateMarkers[id]);
        }).on('mouseleave', function(){
            var index = $('.markers_info').index(this);
            markers[index].setIcon(markersIcon[id]);
        });
        gmarkers.push(marker);
  // add a line to the side_bar html
  var marker_num = gmarkers.length-1;
  side_bar_html += '<a href="javascript:myclick(' + marker_num + ')" onmouseover="gmarkers['+marker_num+'].setIcon(defaultIcon)" onmouseout="gmarkers['+marker_num+'].setIcon(highLightedIcon)">' + name + '<\/a><br>';

var i = 0,
    sidebar = document.getElementById('.markers_infor');
var item    = document.createElement('div');
    item.innerHTML='Marker#'+(++i);
    item.marker=new google.maps.Marker({/});
    item.onmouseover=function(){this.marker.setAnimation(google.maps.Animation.BOUNCE);};
    item.onmouseout=function(){this.marker.setAnimation(null);};
    sidebar.appendChild(item);
*/
//create the live search
  function ViewModel()
  {
    var self =this;
    this.filter = ko.observable();
    this.locations = ko.observableArray(markers);

    // this.markers = ko.observableArray(markers);
    this.visibleLocations = ko.computed(function()
    {
      return this.locations().filter(function(location)
      {
        if(!self.filter() || location.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1){
          location.setVisible(true);


          //marker.populateInfoWindow(this, largeInfowindow);
          return location;

        } else {
          location.setVisible(false);
        }
          });
    },this);
  }
  ko.applyBindings(new ViewModel());
};

//function to populate info window with title and wiki url using AJAX
function populateInfoWindow(marker, infowindow) {
  var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
  var wikiTimeout = setTimeout(function ()
  {
    alert("failed to load wikipedia page");
  }, 40000);
  $.ajax
  ({
    url: wikiURL,
    dataType: "jsonp",
    success: function (response)
    {
     var articleList = response[3];
     var articleName = response[0];
     if (infowindow.marker != marker)
     {
      infowindow.marker = marker;
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function()
      {
        infowindow.setMarker(null);
      });
      infowindow.setContent('<div>' + marker.title + '</br> check here for wiki link: <a href ="' + articleList + '">' + articleName + ' </div>');
      clearTimeout(wikiTimeout);
    }
  }
})
}
//function to open navside
function openNav()
{
  document.getElementById("mySidenav").style.width = "250px";
}

// Set the width of the side navigation to 0 and the left margin of the page content to 0
function closeNav()
{
 document.getElementById("mySidenav").style.width = "0";
};
