var video;
var poseNet;
var poses = [];

function setup() {
  createCanvas(640, 480);
  //saveCanvas('myCanvas', 'jpg');
  saveFrames('testimage', 'jpg', 1, 100, data => {
  print(data);
});

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, "multiple", modelReady);

  poseNet.on("pose", function(results) {
    poses = results;
  });
}

function modelReady() {
  console.log("Model is ready!");
}

function draw() {

  background(255);
  
  

  drawKeypoints();
  drawSkeleton();

}
// A function to draw ellipses over the detected keypoints
  function drawKeypoints()  {
    // Loop through all the poses detected
    for (var i = 0; i < poses.length; i++) {
       //For each pose detected, loop through all the keypoints
      var pose = poses[i].pose;
      for (var j = 0; j < pose.keypoints.length; j++) {
        // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        var keypoint = pose.keypoints[j];
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.2) {
          fill(231, 27, 100);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
    }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (var i = 0; i < poses.length; i++) {
    var skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (var j = 0; j < skeleton.length; j++) {
      var partA = skeleton[j][0];
      var partB = skeleton[j][1];
      stroke(231, 27, 100);
      strokeWeight(10);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
