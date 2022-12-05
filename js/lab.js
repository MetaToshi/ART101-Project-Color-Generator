var colorButton = $("#colorButton")[0]; //The button used to generate colors
var colorsBlocks = $("#colors")[0]; //The color divs which show the random colors
var colors_Num = (colorsBlocks.childNodes.length-1)/2; //How many colors are generated

// Spotify

// window.onSpotifyIframeApiReady = (IFrameAPI) => {
    //let element = document.getElementById('embed-iframe');
    //let options = {
      //uri: 'spotify:track:2aKLffhxIXpXyp3GLLTrjD'
    //};
    //let callback = (EmbedController) => {};
    //IFrameAPI.createController(element, options, callback);



var h, s, l;
var colorResult;

var noiseRange = 5;
var noise, tempHue, tempSat, tempLig;

var clickCount = 0;

var royImage = $("#roy")[0];

colorButton.onclick = function()
{
  clickCount++;
  for(let i = 0; i < colors_Num; i++)
  {
    getRandomColor(i);
  }
  royImageChange();
  //Using a random number to determine if Roy says something this time

  //ifSaySomethingNum represents the likelihood that Roy says something (eg. When ifSaySomethingNum is 8, it means the likelihood is 80%)

  var ifSaySomethingNum = Math.floor(Math.random() * 10);

  if(ifSaySomethingNum < 8)
  {
    saySomething(clickCount);
  }

  console.log("clickCount: " + clickCount);

  console.log("-----------------------");
}

//Add event listener to all the colors. Copy the color info to the clipboard.
$("#color1").click(function(){
  copyColor("#color1");
});

$("#color2").click(function(){
  copyColor("#color2");
});

$("#color3").click(function(){
  copyColor("#color3");
});

$("#color4").click(function(){
  copyColor("#color4");
});

$("#color5").click(function(){
  copyColor("#color5");
});

// Change background depending on Roy's mood
/*function changeMoodBackground(x){
  document.body.style.background = x;
}
    if (clickCount < 6) {
      changeMoodBackground('yellow');
}
    else if (clickCount >= 6 && clickCount <= 12) {
      changeMoodBackground('blue');
    }
    else {
      changeMoodBackground('red');
    } */

function royImageChange()
{
  //Clickcount & Change Roy image
  if(clickCount < 6)
  {
    royImage.src = "img/Roy_1_body_animated.gif";
  }
  else if(clickCount >= 6 && clickCount <= 12)
  {
    royImage.src = "img/Roy_2_body_animated.gif";
  }
  else if(clickCount > 12 && clickCount <= 18)
  {
    royImage.src = "img/Roy_3_body_animated.gif";
    //Animate Roy going left - blocking button
    $("#roy").animate({
      right: '65%',
    });
  }
  else if(clickCount > 18 && clickCount <= 24){ //When clickCount > 18
    royImage.src = "img/Roy_4_body_animated.gif";

    }
  else if(clickCount == 25){ //When clickCount > 18
    royImage.src = "img/Roy_4_body_deflate.gif";
    //Animate Roy going Right - quitting his silly lil' job
    $("#roy").animate({
      right: "-100%",
    }, 5000, "swing")
    setTimeout(function (){
        royImage.src = "img/Roy_4_body_deflate.png"
    }, 1000)
    setTimeout(function (){
      $("#roy").hide();
    }, 2500) //Delays the hiding of Roy until he's stop moving
    }

}

//Generate random colors in color divs
function getRandomColor(index) //Index means the index of colors
{
  //Generate colors
  //The first base color is randomly generated

  switch(index)
  {
    case 0: //Randomly generate the first color as base color

      colorResult = "HSL(";
      for(let i = 0; i < 3; i++)
      {
        if(i < 1)
        {
          //hue value will be 0 ~ 360(included)
          h = Math.floor(Math.random() * 361);
          colorResult += h.toString();
          colorResult += ", "
        }
        else if(i < 2)
        {
          //saturation will be 30% ~ 80%
          s = 30 + Math.floor(Math.random() * 61);
          colorResult += s.toString();
          colorResult += "%, ";
        }
        else
        {
          //lightness will be 30% ~ 80%
          l = 30 + Math.floor(Math.random() * 51);
          colorResult += l.toString();
          colorResult += "%)";
        }
      }
      colorsBlocks.childNodes[2 * index + 1].style.backgroundColor = colorResult;

      tempHue = h;
      tempSat = s;
      tempLig = l;

      console.log("colorResult: " + colorResult);
      break;
    case 1: //Scond color with the same hue, darker

    //Add noise
    if(clickCount >= 6)
    {
      AddNoise();
    }

      //Add hue
      var tempColorResult = "HSL(";
      tempColorResult += tempHue.toString();
      tempColorResult += ", ";

      //Add saturation
      tempColorResult += ((tempLig - 20 < 10) ? 10 : tempLig - 20).toString();;
      tempColorResult += "%, ";

      //Add lightness
      tempColorResult += ((tempLig - 20 < 10) ? 10 : tempLig - 20).toString();;
      tempColorResult += "%)";

      //Assign the color
      colorsBlocks.childNodes[2 * index + 1].style.backgroundColor = tempColorResult;
      console.log("colorResult: " + tempColorResult);
      break;

    case 2: //Third color with the same hue, lighter

    //Add noise
    if(clickCount >= 6)
    {
      AddNoise();
    }

      //Add hue
      var tempColorResult = "HSL(";
      tempColorResult += tempHue.toString();
      tempColorResult += ", ";

      //Add saturation
      tempColorResult += ((tempSat - 15 < 0) ? 0 : tempSat - 15).toString();
      tempColorResult += "%, ";

      //Add lightness
      tempColorResult += ((tempLig + 10 > 100) ? 100 : tempLig + 10).toString();
      tempColorResult += "%)";

      //Assign the color
      colorsBlocks.childNodes[2 * index + 1].style.backgroundColor = tempColorResult;
      console.log("colorResult: " + tempColorResult);
      break;

    case 3: //Fourth color with different hue, darker

    //Add noise
    if(clickCount >= 6)
    {
      AddNoise();
    }

      //Add hue
      var tempColorResult = "HSL(";
      tempColorResult += ((tempHue - 170 > 0) ? tempHue - 170 : tempHue + 190).toString();
      tempColorResult += ", ";

      //Add saturation
      tempColorResult += ((tempSat + 20 > 100) ? 100 : tempSat + 20).toString();
      tempColorResult += "%, ";

      //Add lightness
      tempColorResult += ((tempLig - 20 < 10) ? 10 : tempLig - 20).toString();
      tempColorResult += "%)";

      //Assign the color
      colorsBlocks.childNodes[2 * index + 1].style.backgroundColor = tempColorResult;
      console.log("colorResult: " + tempColorResult);
      break;

    case 4: //Fifth color with different hue, lighter

    //Add noise
    if(clickCount >= 6)
    {
      AddNoise();
    }

      //Add hue
      var tempColorResult = "HSL(";
      tempColorResult += ((tempHue - 170 > 0) ? tempHue - 170 : tempHue + 190).toString();;
      tempColorResult += ", ";

      //Add saturation
      tempColorResult += ((tempSat - 7 > 0) ? tempSat - 7 : 0).toString();
      tempColorResult += "%, ";

      //Add lightness
      tempColorResult += ((tempLig + 8 > 100) ? 100 : tempLig + 8).toString();
      tempColorResult += "%)";

      //Assign the color
      colorsBlocks.childNodes[2 * index + 1].style.backgroundColor = tempColorResult;
      console.log("colorResult: " + tempColorResult);
      break;

  }
}

//Copy the color to the clipboard
function copyColor(colorId)
{
  var colorInfo = $(colorId)[0].style.backgroundColor;
  // Copy the text inside the text field
  navigator.clipboard.writeText(colorInfo);
  // Print the copied color
  if(colorInfo.length != 0)
  {
    $("#popupId").html("Copy the color: " + colorInfo);
    $("#popupId").toggleClass("show");
  }
}

//---------Text Box Changing Test Area------------------
var speeds =
{
  slow: 120,
  normal: 200,
  fast: 300
}

var textLines =
{
  happyQuotes:[
    { string: "I think this color palette fits your style!", speed: speeds.normal},
    { string: "One for the grandma!~", speed: speeds.slow},
    { string: "What do you think? Great, isn't it?", speed: speeds.fast},
    { string: "Look at that palette! Isn't it beautiful?", speed: speeds.fast}],
  heheQuotes: [
    { string: "Still deciding huh? I'm sure this one will sell you!", speed: speeds.normal},
    { string: "Surely, this one will be the one! ~", speed: speeds.normal},
    { string: "This one is just ~calling~ your name!", speed: speeds.normal}],
  frustratedQuotes: [
    { string: "Alright buddy, please decide on a color palette soon. I have customers waiting...", speed: speeds.normal},
    { string: "I need to get to the next customer. Please pick one as soon as possible.", speed: speeds.normal},
    { string: "Look, I appreciate your adventurous spirit, but you need to choose a palette.", speed: speeds.normal},
    { string: "There's so many colors, surely you've found the right one by now?", speed: speeds.normal}],
  angryQuotes: [
    { string: "We don't have that color in stock sir. Would you like to try again tomorrow?", speed: speeds.normal},
    { string: "I'm going to have to ask you to leave the store.", speed: speeds.normal},
    { string: "Excuse me?! What did you say?!", speed: speeds.normal},
    { string: "...", speed: speeds.normal},
    { string: "Please, I need to get to the next customer.", speed: speeds.normal}],
  quitsQuotes: [
    { string: "I'm not paid enough to do this crap.", speed: speeds.normal}]
}

//The function used to change what does Roy say
function saySomething(clickCount)
{
  var randomQuote; //Used to store the random quote string

  if(clickCount < 6) //Happy Roy says something
  {
    var randomNum = Math.floor(Math.random() * textLines.happyQuotes.length);
    randomQuote = textLines.happyQuotes[randomNum].string;
    $("#quote").html(randomQuote);
    console.log(randomQuote);
  }
  else if(clickCount >= 6 && clickCount <= 12) //Hehe Roy says something
  {
    var randomNum = Math.floor(Math.random() * textLines.heheQuotes.length);
    randomQuote = textLines.heheQuotes[randomNum].string;
    $("#quote").html(randomQuote);
    console.log(randomQuote);
  }
  else if(clickCount > 12 && clickCount <= 18) //Frustrated Roy says something
  {
    var randomNum = Math.floor(Math.random() * textLines.frustratedQuotes.length);
    randomQuote = textLines.frustratedQuotes[randomNum].string;
    $("#quote").html(randomQuote);
    console.log(randomQuote);
  }
  else if(clickCount > 18 && clickCount <= 24) //Angry Roy says something
  {
    var randomNum = Math.floor(Math.random() * textLines.angryQuotes.length);
    randomQuote = textLines.angryQuotes[randomNum].string;
    $("#quote").html(randomQuote);
    console.log(randomQuote);
  }
  else //Roy Rages and Walks away
  {
    var randomNum = Math.floor(Math.random() * textLines.quitsQuotes.length);
    randomQuote = textLines.quitsQuotes[randomNum].string;
    $("#quote").html(randomQuote);
    console.log(randomQuote);
  }
}


function AddNoise()
{
  noise = clickCount;
  tempHue = h;
  tempSat = s;
  tempLig = l;

  var ifPositive = Math.random() < 0.5 ? -1 : 1;
  noise *= Math.floor(Math.random() * noiseRange);
  noise *= ifPositive;

  while(noise > 360)
  {
    noise -= 360;
  }

  while(noise < 0)
  {
    noise += 360;
  }

  if(h + noise > 360)
  {
    tempHue = h + noise - 360;
  }
  else if(h + noise < 0)
  {
    tempHue = h + noise + 360;
  }
  else
  {
    tempHue = h + noise;
  }

  noise = clickCount;
  ifPositive = Math.random() < 0.5 ? -1 : 1;
  noise *= Math.floor(Math.random() * noiseRange);
  noise *= ifPositive;

  while(noise > 100)
  {
    noise -= 100;
  }

  while(noise < 0)
  {
    noise += 100;
  }

  if(s + noise > 100)
  {
    tempSat = s + noise - 100;
  }
  else if(h + noise < 0)
  {
    tempSat = s + noise + 100;
  }
  else
  {
    tempSat = s + noise;
  }

  noise = clickCount;
  ifPositive = Math.random() < 0.5 ? -1 : 1;
  noise *= Math.floor(Math.random() * noiseRange);
  noise *= ifPositive;

  while(noise > 100)
  {
    noise -= 100;
  }

  while(noise < 0)
  {
    noise += 100;
  }

  if(l + noise > 100)
  {
    tempLig = l + noise - 100;
  }
  else if(h + noise < 0)
  {
    tempLig = l + noise + 100;
  }
  else
  {
    tempLig = l + noise;
  }
}
