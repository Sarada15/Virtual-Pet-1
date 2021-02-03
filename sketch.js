//Create variables here
var dog, dogImg, happyDog;
var database;
var foodS, foodStock;



function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  //assign firebase databse to variable database
  database = firebase.database();

    //image(dog, 250,250);

    dog = createSprite(250,250,20,50);
    dog.scale = 0.3
      dog.addImage(dogImg);

    //fetching "Food" value to foodStock using database.ref
    foodStock = database.ref("Food");
      foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  
    if (keyDown(UP_ARROW)) {

      foodS = foodS - 1;

      writeStock(foodS);
      dog.addImage(happyDog);
    }
  
  
  drawSprites();
  //add styles here
      textSize(20);
      fill("black");
      text("Food Stock: " + foodS, 350, 30);

}

//Function to read values from database
function readStock(data) {
  foodS = data.val();
}

//Function to write values in database
function writeStock(x) {
  
  if(x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }
  
  database.ref("/").update({
    Food:x
  })
}







