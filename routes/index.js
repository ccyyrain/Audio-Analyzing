var express = require('express');
var router = express.Router();
var fs = require('fs');
var exec = require('exec');
var multer = require('multer');
var AudioContext = require('web-audio-api').AudioContext
var upload = multer({
  dest: '/tmp/'
})
var multer = require('multer');
context = new AudioContext;
var pcmdata = [];
var fft = require('ndarray-fft');
var ndarray = require('ndarray');




var fft = require('fft-js').fft;
var fftUtil = require('fft-js').util;

//these are the varibles for frequency flow canvas
data_list_1 = [];
data_list_2 = [];
//
router.use('/public', express.static(__dirname + '/public'));

// router.get('/', function(req, res, next) {
//     res.render('index', {
//         title: 'Singing Rating system'
//     });
// });

router.get('/', function(req, res, next) {
  res.render('upload', {
    title: 'Audio Analysis System'
  });
});


//var upload = multer({ storage: multer.memoryStorage() })
router.post('/file_upload1', upload.single('file_mp3'), function(req, res){
  if (!req.file) {
    res.status(500).send('error: no file');
  }
  else if(req.file.mimetype != 'audio/mp3' && req.file.mimetype != 'audio/mpeg'){
    var failed = 'OH ****'
    res.json({
      'filename': 123,
      'mimetype': req.file.mimetype,
      'size (bytes)': req.file.size,
      'Upload': failed
    });
  }
  else {
    //var file1 = file1.mp3
    // var des_file = "./files/" + req.file.file1;
    filename = "file1.mp3";
    var des_file = "./files/" + filename;
    fs.readFile(req.file.path, function(err, data){
      fs.writeFile(des_file, data, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('got a non-text file. here are some bytes:');
          console.log(req.file.buffer);
        }
        var success = 'Success!'
        res.json({
          'filename': des_file,
          'mimetype': req.file.mimetype,
          'size (bytes)': req.file.size,
          'Upload': success
        });
      });
    });
  }
});

router.post('/file_upload2', upload.single('file_mp3'), function(req, res){
  if (!req.file) {
    res.status(500).send('error: no file');
  }
  else if(req.file.mimetype != 'audio/mp3' && req.file.mimetype != 'audio/mpeg'){
    var failed = 'OH ****'
    res.json({
      'filename': 123,
      'mimetype': req.file.mimetype,
      'size (bytes)': req.file.size,
      'Upload': failed
    });
  }
  else {
    //var file1 = file1.mp3
    // var des_file = "./files/" + req.file.file1;
    filename = "file2.mp3";
    var des_file = "./files/" + filename;
    fs.readFile(req.file.path, function(err, data){
      fs.writeFile(des_file, data, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('got a non-text file. here are some bytes:');
          console.log(req.file.buffer);
        }
        var success = 'Success!'
        res.json({
          'filename': des_file,
          'mimetype': req.file.mimetype,
          'size (bytes)': req.file.size,
          'Upload': success
        });
      });
    });
  }
})


// shield for good !

router.post('/result', function(req, res) {
  //define match_percentage
  match_percentage = 0;
  console.log("Final Result begins here");
  // var soundfile = "files/file1.mp3"; //1st one
  var soundfile = "files/file1.mp3"; //1st one
  decodeSoundFile(soundfile);

  function decodeSoundFile(soundfile) {
    console.log("decoding the first mp3 file ", soundfile, " ..... ")
    fs.readFile(soundfile, function(err, buf) {
      if (err) throw err
      context.decodeAudioData(buf, function(audioBuffer) {
        console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
        var pcmdata = (audioBuffer.getChannelData(1));
        //console.log(typeof(pcmdata));
        var samplerate = audioBuffer.sampleRate; // store sample rate
        var duration = audioBuffer.duration; // store duration
        var numberOfChannels = audioBuffer.numberOfChannels;
        maxvals = [];
        max = 0;

        //load second audio file
        //var soundfile_2 = 'files/file2.mp3' //2nd
        var soundfile_2 = 'files/file2.mp3' //2nd
        console.log("decoding the second mp3 file", soundfile_2, ".....")
        fs.readFile(soundfile_2, function(err, buf) {
          if (err) throw err
          context.decodeAudioData(buf, function(audioBuffer) {
            //console.log('biterate is', audioBuffer.biteRate);
            console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
            var pcmdata_2 = (audioBuffer.getChannelData(1));
            var samplerate_2 = audioBuffer.sampleRate; // store sample rate
            var duration_2 = audioBuffer.duration; // store duration
            var numberOfChannels_2 = audioBuffer.numberOfChannels;
            var stepsize = 1024 * 4;
            var index_size = Math.ceil(pcmdata.length / stepsize);
            var index_size_2 = Math.ceil(pcmdata_2.length / stepsize);

            console.log(Math.min(index_size, index_size_2));
            index = Math.min(index_size, index_size_2);
            // we can load two music at the same time now

            // index_size roughly equals to the duration
            volume = 0;
            volume_2 = 0;



            count_match = 0;
            max_magnitudes_key_list = [];
            max_magnitudes_key_2_list = [];
            match_list = [];

            // store enery
            energy_1_list = [];
            energy_2_list = [];
            // store spectralCentroid
            controid_1_list = [];
            controid_2_list = [];
            // store flatness
            flatness_1_list = [];
            flatness_2_list = [];
            //

            for (i = 0; i <= index; i++) {

              signal = pcmdata.slice(i * stepsize, i * stepsize + stepsize);
              signal_2 = pcmdata_2.slice(i * stepsize, i * stepsize + stepsize);
              // the last one or two pcmdata has length less than 4096.
              if (signal.length == stepsize && signal_2.length == stepsize) {
                fftsize = 16;


                var phasors = fft(signal);
                var phasors_2 = fft(signal_2);

                var frequencies = fftUtil.fftFreq(phasors, 4096), // Sample rate and coef is just used for length, and frequency step
                magnitudes = fftUtil.fftMag(phasors);

                var frequencies_2 = fftUtil.fftFreq(phasors_2, 4096), // Sample rate and coef is just used for length, and frequency step
                magnitudes_2 = fftUtil.fftMag(phasors_2);
                // find the top 3 maximum of magnitudes
                var max_magnitudes = [0, 0, 0];
                var max_magnitudes_key = [0, 0, 0];
                var temp_volume = 0; //before log

                // temp values for flatness
                var numerator_1 = 0;
                var denominator_1 = 0;

                var energy_1 = 0;
                var centroid_1 = 0;
                // temp values for centroid
                var cen_num_1 = 0;
                //  var cen_denom_1 = 0;

                for (key in magnitudes) {

                  if (magnitudes.hasOwnProperty(key)) {
                    if (magnitudes[key] > max_magnitudes[0]) {
                      max_magnitudes[2] = max_magnitudes[1];
                      max_magnitudes_key[2] = max_magnitudes_key[1];
                      max_magnitudes[1] = max_magnitudes[0];
                      max_magnitudes_key[1] = max_magnitudes_key[0];
                      max_magnitudes[0] = magnitudes[key];
                      max_magnitudes_key[0] = parseInt(key);

                    } else if (magnitudes[key] > max_magnitudes[1]) {
                      max_magnitudes[2] = max_magnitudes[1];
                      max_magnitudes_key[2] = max_magnitudes_key[1];
                      max_magnitudes[1] = magnitudes[key];
                      max_magnitudes_key[1] = parseInt(key);
                    } else if (magnitudes[key] > max_magnitudes[2]) {
                      max_magnitudes[2] = magnitudes[key];
                      max_magnitudes_key[2] = parseInt(key);
                    }
                    // add volume
                    temp_volume += magnitudes[key];
                    // compute spectralFlatness
                    numerator_1 += Math.log(magnitudes[key]);
                    denominator_1 += magnitudes[key];

                    cen_num_1 += Math.pow(key,1)*Math.abs(magnitudes[key]);


                    //numerator += Math.pow(k, i) * Math.abs(amplitudeSpect[k]);
                    //denominator += amplitudeSpect[k];

                    energy_1 += Math.pow(Math.abs(magnitudes[key]), 2);

                  }
                };

                // get rid of "infinity"
                if (temp_volume <= Math.pow(10, -50)) {
                  console.log('temp volume too small');
                  temp_volume = Math.pow(10,0);
                  //temp_volume = Math.pow(10, -50);
                };
                // append the key to the max_key_list
                max_magnitudes_key_list.push(max_magnitudes_key[0] * 22 * 1024 / (stepsize / 2));
                // append flatness
                flatness_1_list.push( Math.exp(numerator_1/(stepsize/2) ) * (stepsize/2)/denominator_1 );
                energy_1_list.push(energy_1);
                controid_1_list.push(cen_num_1/denominator_1); // they have the same denominator



                volume += 20 * Math.log10(temp_volume);
                //console.log(volume);





                // do the second music
                var max_magnitudes_2 = [0, 0, 0];
                var max_magnitudes_key_2 = [0, 0, 0];
                temp_volume_2 = 0;

                // temp values for flatness
                var numerator_2 = 0;
                var denominator_2 = 0;

                var energy_2 = 0;
                var centroid_2 = 0;
                // temp values for centroid
                var cen_num_2 = 0;
                //  var cen_denom_1 = 0;

                for (key in magnitudes) {

                  if (magnitudes_2.hasOwnProperty(key)) {
                    if (magnitudes_2[key] > max_magnitudes_2[0]) {
                      max_magnitudes_2[2] = max_magnitudes_2[1];
                      max_magnitudes_key_2[2] = max_magnitudes_key_2[1];
                      max_magnitudes_2[1] = max_magnitudes_2[0];
                      max_magnitudes_key_2[1] = max_magnitudes_key_2[0];
                      max_magnitudes_2[0] = magnitudes_2[key];
                      max_magnitudes_key_2[0] = parseInt(key);

                    } else if (magnitudes_2[key] > max_magnitudes_2[1]) {
                      max_magnitudes_2[2] = max_magnitudes_2[1];
                      max_magnitudes_key_2[2] = max_magnitudes_key_2[1];
                      max_magnitudes_2[1] = magnitudes_2[key];
                      max_magnitudes_key_2[1] = parseInt(key);
                    } else if (magnitudes_2[key] > max_magnitudes_2[2]) {
                      max_magnitudes_2[2] = magnitudes_2[key];
                      max_magnitudes_key_2[2] = parseInt(key);
                    }
                    // add volume
                    temp_volume_2 += magnitudes_2[key];
                    // compute spectralFlatness
                    numerator_2 += Math.log(magnitudes_2[key]);
                    denominator_2 += magnitudes_2[key];

                    cen_num_2 += Math.pow(key,1)*Math.abs(magnitudes_2[key]);

                    energy_2 += Math.pow(Math.abs(magnitudes_2[key]), 2);


                  }
                };

                // get rid of "infinity"

                if (temp_volume_2 <= Math.pow(10, -50)) {
                  console.log('temp volume too small');
                  temp_volume_2 = Math.pow(10,0);
                  //temp_volume_2 = Math.pow(10, -50);
                };
                // append the max_key to max_magnitudes_key_2_list
                max_magnitudes_key_2_list.push(max_magnitudes_key_2[0] * 22 * 1024 / (stepsize / 2));

                // append flatness
                flatness_2_list.push( Math.exp(numerator_2/(stepsize/2) ) * (stepsize/2)/denominator_2);
                energy_2_list.push(energy_2);
                controid_2_list.push(cen_num_2/denominator_2); // they have the same denominator


                volume_2 += 20 * Math.log10(temp_volume_2);
                // console.log(temp_volume,temp_volume_2);
                // console.log(max_magnitudes_key, max_magnitudes_key_2);
                // show how similar two audio files are
                var min_diff = 500;
                for (ii = 0; ii < max_magnitudes_key.length; ii++) {
                  for (jj = 0; jj < max_magnitudes_key.length; jj++) {
                    //console.log(Math.abs(max_magnitudes_key[i]-max_magnitudes_key_2[j]));
                    if (Math.abs(max_magnitudes_key[ii] - max_magnitudes_key_2[jj]) <= min_diff) {
                      min_diff = Math.abs(max_magnitudes_key[ii] - max_magnitudes_key_2[jj]);
                      //Increase it to
                      y1 = 11 * max_magnitudes_key[ii];
                      y2 = 11 * max_magnitudes_key_2[jj];
                    }
                  }
                };

                console.log(min_diff);
                if (min_diff <= 2) {
                  count_match++;
                  match_list.push(1);
                } else { // min_diff >2
                  match_list.push(0);
                }
              }
              data_list_1.push(y1);
              data_list_2.push(y2);
            };
            //match_percentage = (count_match + 1) / index;
            match_percentage = (count_match) / index;
            console.log('match percentage is', count_match / index);

            // after index for loop, display the updated volume
            console.log('average volume for song 1 is', volume / index);
            console.log('average volume for song 2 is', volume_2 / index);
            var sum = match_list.reduce(function(a, b) {
              return a + b;
            }, 0);
            console.log('match_list calculatation', (sum + 1) / index);
            res.render('result', {title: 'Result Page',
              test_msg: Math.floor(match_percentage*100),
              channel_1: numberOfChannels,
              channel_2: numberOfChannels_2,
              rate_1: samplerate,
              rate_2: samplerate_2,
              dur_1: (duration).toFixed(2),
              dur_2: (duration_2).toFixed(2),
              vol_1: 100,
              vol_2: Math.floor((volume_2 / index)/(volume / index)*100)
            });
          })
        });
      }, function(err) {
        throw err
      })
    })
  };
});



router.post('/plot',function(req,res){
  var data = {
    data1: data_list_1,
    data2: data_list_2,
    data3: flatness_1_list,
    data4: flatness_2_list,
    data5: energy_1_list,
    data6: energy_2_list,
    data7: controid_1_list,
    data8: controid_2_list,
    data9: match_list
  }
  res.json(data);
  data = [];
  data_list_2 = [];
  data_list_1 = [];
})

router.post('/half_result', function(req, res){
  //define match_percentage
  match_percentage = 0;
  console.log("This should output immdediate result");
  var soundfile = "files/file1.mp3"; //1st one
  decodeSoundFile(soundfile);

  function decodeSoundFile(soundfile) {
    console.log("decoding mp3 file ", soundfile, " ..... ")
    fs.readFile(soundfile, function(err, buf) {
      if (err) throw err
      context.decodeAudioData(buf, function(audioBuffer) {
        console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
        var pcmdata = (audioBuffer.getChannelData(1));
        var samplerate = audioBuffer.sampleRate; // store sample rate
        var duration = audioBuffer.duration; // store duration
        var numberOfChannels = audioBuffer.numberOfChannels;
        maxvals = [];
        max = 0;

        //load second audio file
        //var soundfile_2 = 'files/file2.mp3' //2nd
        var soundfile_2 = 'files/file2.mp3' //2nd
        console.log("decoding the second mp3 file", soundfile_2, ".....")
        fs.readFile(soundfile_2, function(err, buf) {
          if (err) throw err
          context.decodeAudioData(buf, function(audioBuffer) {
            console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
            var pcmdata_2 = (audioBuffer.getChannelData(1));
            var samplerate_2 = audioBuffer.sampleRate; // store sample rate
            var duration_2 = audioBuffer.duration; // store duration
            var numberOfChannels_2 = audioBuffer.numberOfChannels;
            var stepsize = 1024 * 4;
            var index_size = Math.ceil(pcmdata.length / stepsize);
            var index_size_2 = Math.ceil(pcmdata_2.length / stepsize);

            console.log(Math.min(index_size, index_size_2));
            res.render('half_result', {
              title: 'Half Result Page',
              channel_1: numberOfChannels,
              channel_2: numberOfChannels_2,
              rate_1: samplerate,
              rate_2: samplerate_2,
              dur_1: (duration).toFixed(2),
              dur_2: (duration_2).toFixed(2),
            })
          });
        }), function(err) {
          throw err
        }
      });
    });
  };






});

module.exports = router;
