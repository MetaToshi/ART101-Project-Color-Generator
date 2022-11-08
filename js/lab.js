/*
Authors: Wang Lao
Class: ART 101
*/

var outputEl = document.getElementById("output");
var outputButton = document.getElementById("moveElementButton");
var colorsEl = document.getElementById("colors");
var colors_Num = (colorsEl.childNodes.length-1)/2;

var r, g, b, a;
var colorResult;

var clickCount = 0;

var testClickCount = 0;
var imageButton = document.getElementById("imageButton");
var testImage = document.getElementById("photo");

outputButton.onclick = function()
{
  /*
  console.log("--------------------Phase 1--------------------");
  console.log("colors: ", colorsEl);
  console.log("childNodes: ", colorsEl.childNodes);
  console.log("length: ", colorsEl.childNodes.length);
  console.log("The number of colors = ", (colorsEl.childNodes.length-1)/2);

  console.log("--------------------Phase 2--------------------");

  console.log("First child is: ", colorsEl.childNodes[1], ". Let's change its background color!");
  colorsEl.childNodes[1].style.backgroundColor = "blue";

  console.log("Now let's try to change the color with number!");
  colorsEl.childNodes[1].style.backgroundColor = "rgba(255, 34, 48, 0.8)";

  console.log("--------------------Phase 3--------------------");

  console.log("Finally, let's try change the color using a function!");
  getRandomColor(0);

  */

  console.log("--------------------Phase 4--------------------");

  //console.log("Final test for all colors!")
  clickCount++;
  console.log("clickCount: ", clickCount);
  for(let i = 0; i < colors_Num; i++)
  {
    getRandomColor(i);
  }
}

imageButton.onclick = function()
{
  changeImage();
}

function getRandomColor(x)
{
  colorResult = "rgba(";
  for(let i = 0; i < 4; i++)
  {
    if(i < 3)
    {
      colorResult += Math.floor(Math.random() * 256).toString();
      colorResult += ", "
    }
    else
    {
      colorResult += (Math.random() * 0.9 + 0.1).toString();
      colorResult += ")"
    }
  }
  console.log(colorResult);
  colorsEl.childNodes[2*x+1].style.backgroundColor = colorResult;
  return;
}

function changeImage()
{
  testClickCount++;
  if(testClickCount % 2 == 0)
  {
    console.log("testClickCount: ", testClickCount % 2);
    console.log("testImage: ", testImage);
    testImage.src = "img/photo.jpg";
  }
  else
  {
    console.log("testClickCount: ", testClickCount % 2);
    console.log("testImage: ", testImage);
    testImage.src = "img/photo2.jpg";
  }
}
