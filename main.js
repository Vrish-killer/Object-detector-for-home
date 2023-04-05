Status = "";
objects = [];


function setup () {
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Modal Loaded");
    Status = true;
}

function draw(){
image(video, 0, 0, 480, 380);
if(Status != "")
{
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("Status").innerHTML = "Number of objects detected are : "+ objects.length;

        fill ("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + ""+ percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#FF000");
        rect (objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
