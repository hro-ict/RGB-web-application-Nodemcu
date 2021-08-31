
function RGBToHex(r,g,b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  code= "#" + r + g + b;
  return code.toUpperCase()
}




//send message to NodemCu
function sendmsg (msg){
    var ws = new WebSocket("ws://192.168.1.88:8010"); //ip adress of NodemCu
    
    ws.onopen = function () {
        ws.send(msg);
    };
    
    ws.onmessage = function (evt) {
        let received= evt.data;
        // document.getElementById("hex_code").innerHTML=received;
        
    };
    
    
  }



slider = document.getElementById("myRange");
output = document.getElementById("value_red");
// output.innerHTML = slider.value;

slider2 = document.getElementById("myRange2");
output2 = document.getElementById("value_green");
// output2.innerHTML = slider2.value;

slider3 = document.getElementById("myRange3");
output3 = document.getElementById("value_blue");


// Function for string
String.prototype.format = function() {
    var newStr = this, i = 0;
    while (/%s/.test(newStr))
        newStr = newStr.replace("%s", arguments[i++])

    return newStr;
}




slider.oninput = function() {
document.getElementById("color").style.backgroundColor= "rgb(%s,%s,%s)".format(slider.value, slider2.value, slider3.value);
hex_code= RGBToHex(parseInt (slider.value),parseInt (slider2.value),parseInt (slider3.value));
$("#hex_code").html(hex_code);
$("#rgb_code").html("RGB (%s,%s,%s)".format(slider.value, slider2.value, slider3.value));
var percent_red= (slider.value/255)*100
output.innerHTML = " "+Math.round(percent_red)+" %";
sendmsg("%sr%sg%s".format(slider.value, slider2.value, slider3.value))


}
slider2.oninput = function() {
document.getElementById("color").style.backgroundColor= "rgb(%s,%s,%s)".format(slider.value, slider2.value, slider3.value);
hex_code= RGBToHex(parseInt (slider.value),parseInt (slider2.value),parseInt (slider3.value));
$("#hex_code").html(hex_code);
$("#rgb_code").html("RGB (%s,%s,%s)".format(slider.value, slider2.value, slider3.value));           
var percent_green= (slider2.value/255)*100
output2.innerHTML = " "+Math.round(percent_green)+" %";
sendmsg("%sr%sg%s".format(slider.value, slider2.value, slider3.value))
  
}

slider3.oninput = function() {
document.getElementById("color").style.backgroundColor= "rgb(%s,%s,%s)".format(slider.value, slider2.value, slider3.value);

hex_code= RGBToHex(parseInt (slider.value),parseInt (slider2.value),parseInt (slider3.value));
$("#hex_code").html(hex_code);
$("#rgb_code").html("RGB (%s,%s,%s)".format(slider.value, slider2.value, slider3.value));

var percent_blue= (slider3.value/255)*100
output3.innerHTML = " "+Math.round(percent_blue)+" %";
sendmsg("%sr%sg%s".format(slider.value, slider2.value, slider3.value))
  
}
