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
      /*
      const recognize = async ({ target: { files }  }) => {
        const { data: { text } } = await Tesseract.recognize(blob, 'eng', {
          // corePath: './../node_modules/tesseract.js-core/tesseract-core.wasm.js',
          logger: m => console.log(m),
        });
        console.log(text);
      }
      */
      Tesseract.recognize(blob, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        const results = document.getElementById('results');
        results.innerText = text;
      });
    });

}
