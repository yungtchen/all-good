const player = document.getElementById('player');
let recording = true;
const constraints = {
  video: true,
};

navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    player.srcObject = stream;
  });

async function  toggleCamera() {
    if(recording) {
        player.srcObject.getVideoTracks().forEach(track => track.stop());
        recording = false;
    } else {
        const stream =await  navigator.mediaDevices.getUserMedia(constraints)
        player.srcObject = stream;
        recording = true;
    }
}

function snapPhoto() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('player');
    context.drawImage(video, 0, 0, 640, 480);
}
