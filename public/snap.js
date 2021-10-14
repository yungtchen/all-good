const ALLERGENS = [
  'peanuts',
  'treenuts',
  'bicarbonate'
]
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

async function snapPhoto() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('player');
    context.drawImage(video, 0, 0, 640, 480);

    canvas.toBlob((blob) => {
      Tesseract.recognize(blob, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        const results = document.getElementById('results');
        results.innerText = text;
        const found = checkForAllergens(ALLERGENS, text);
        const list = document.getElementById('list');
        found.forEach(listItem => {
          const li = document.createElement('li');
          li.innerText = listItem;
          list.appendChild(li);
        });
      });
    });
}

function checkForAllergens(allergens, text) {
  const noWS = text.split(' ')
                .join('')
                .toLowerCase();
  const found = [];
  allergens.forEach((word) => {
    if(noWS.search(word) >-1 ){
      found.push(word);
    }
  });
  return found;
}