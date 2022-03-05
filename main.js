let latitude,longitude,destination

$(document).ready(function(){
  alert("please allow device to know your location")
  initGeolocation()
})

$(function(){
  $("#navigate-button").click(function(){
    window.location.href = `ar_navigation.html?source=
    ${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
   })
})

function initGeolocation(){
 if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(success)    
 }
 else{
  alert("Sorry.your browser does not support geolocation service.") 
 } 
}

function success(position){
 console.log(position)  
 longitude = position.coords.longitude
 latitude = position.coords.latitude
 mapboxgl.accessToken = 'pk.eyJ1IjoiYXNod2luMjAwNiIsImEiOiJjbDAwemZrNW8wcDJhM3F0MTducTI4dTRwIn0.wF6rF0KZjuhyr4Dz13YKVQ'
 
 var map = new mapboxgl.Map({
  container:'map',
  style:'mapbox://styles/mapbox/streets-v11',
  center:[longitude,latitude],
  zoom:10  
})
map.addControl(
  new mapboxgl.GeolocateControl({
   positionOptions:{
    enableHighAccuracy:true
   },
   trackUserLocation:true
 
  })   
 )
 
 map.addControl(
  new MapboxDirections({
   accessToken:mapboxgl.accessToken
  }),
   'top-left'  
   )
   map.on('click',function(e){
     destination = e.lngLat
   })
   map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions:{
       enableHighAccuracy:true 
      },
      trackUserLocation:true
    }) 
   )
   setTimeout(function(){
     $(".mapboxgl-ctrl-icon").click()
   },3000)

}

