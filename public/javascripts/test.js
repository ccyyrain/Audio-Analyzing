var AudioVisual = function (musicurl) {
  this.musicUrl = musicurl;
  this.init();
};

AudioVisual.prototype = {
  analyzing: function (analyser) {
    // 获取的音频数据
    var bufferLength = analyser.frequencyBinCount,
    dataArray = new Uint8Array(bufferLength);

    var that = this;

    that.analyser.getByteFrequencyData(dataArray);
  }.
  init : function (){
    //fix browser vender for AudioContext and requestAnimationFrame
    // Webkit/blink browser require a prefix, and it needs the window object specifically declared to work in Safari
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;

    // declare new audio context
    try {
      this.audioCtx = new AudioContext();

      // Get an AudioBufferSourceNode.
      // This is the AudioNode to use when we want to play an AudioBuffer
      var $file = document.getElementById('uploadedFile');

      var that = this;



    }


  }
