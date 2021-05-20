img=""
status=""
objects=[]

function preload(){
img=loadImage('home-design.jpg')
}

function setup(){
    canvas=createCanvas(640,480)
    canvas.center()
    
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status : Detecting Objects"
}

function draw(){
    image(img,0,0,640,480)
   if(status!= ""){
       for(i=0; i<objects.length; i++){
           document.getElementById("status").innerHTML="Status= Object Detected"
           
           fill("grey")
           percent=floor(objects[i].confidence*100)
           text(objects[i].label+" "+ percent+ "%",objects[i].x+15,objects[i].y+15);
           noFill()
           stroke("grey")
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
       }
   }
}
function modelLoaded(){
    console.log("Model Loaded")
    status=true
    objectDetector.detect(img,gotResult)
}

function gotResult(error,result){
if(error){
    console.log(error)
}
console.log(result)
objects=result

}
