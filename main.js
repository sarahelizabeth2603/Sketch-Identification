function preload(){
    classifier = ml5.imageClassifier("DoodleNet");

}
function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;


}
function draw(){
    strokeWeight(10);
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX , pmouseY , mouseX , mouseY );
    }

}

function ClearCanvas(){
    background("white");
}

function classifyCanvas(){
    classifier.classify(canvas, gotresults);
}

function gotresults(error , results){
    if(error){
        console.log("Error");
    }
    else{
        console.log(results);
        document.getElementById("label").innerHTML = "Label: "+results[0].label;
        document.getElementById("confidence").innerHTML = "Confidence: "+Math.round(results[0].confidence * 100) + "%";
        utterthis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterthis);
    }
}