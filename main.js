array_1=['Cactus', 'Eraser', 'Book', 'Lion'];
random_no=Math.floor((Math.random()*4));
sketch=array_1[random_no];
document.getElementById("sketch_name").innerHTML="sketch To be Drawn "+sketch;
timer_counter=0;
timer_check="";
drawn_sketch='';
answer_holder="";
score=0;
function setup(){
    canvas=createCanvas(280,280);
    canvas.center();
    background("white");
    synth=window.speechSynthesis;
    canvas.mouseReleased(classifyCanvas);
}
function clear_canvas(){
    background("white");
    stroke(0);
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX, pmouseY,mouseX, mouseY);
    }
    check_sketch();
    if(drawn_sketch==sketch){
        answer_holder="set";
        score++;
        document.getElementById("score").innerHTML='Score-'+score;
    }
}
function check_sketch(){
    timer_counter++;
    document.getElementById("my_timer").innerHTML=timer_counter;
    console.log(timer_counter);
    if (timer_counter>400){
        timer_counter=0;
    document.getElementById("my_timer").innerHTML=timer_counter;
    timer_check="compleated";
    }
    if (answer_holder=="set" || timer_check=="compleated") {
    timer_check="";
    answer_holder="";
    update_canvas();
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("label").innerHTML="Label: " + results[0].label;
        document.getElementById("confidence").innerHTML="Confidence: " + Math.round(results[0].confidence*100)+"%";
        utterThis=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis)
    }
}