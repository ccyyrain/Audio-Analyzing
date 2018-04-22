# Web Application Name: Audio Analysing System

The Applcation is designed to analyze the time-domain and frequency domain information and compare the features of two audio file, based on Express Module, using html/JavaScript/Node.js for development.

## Group Members:

* Yu Cui, cuixx322@umn.edu
* Anthony Zhang, zhan4490@umn.edu
* Tian Nan, nanxx026@umn.edu
* Raphael(Chuxuan) Ma, maxx0208@umn.edu


## Link to Site

<https://boiling-savannah-79784.herokuapp.com/>


## Key Features

**System Features:**

* Analysing the time-domain and frequency domain information for two difference audio file
* Using AJAX to upload the files
* Minimize the analyzing time of the uploaded files
* Feature Extraction for audio inputs


## Screenshots of Site

### Main Page
![Alt text](https://github.com/umn-5117-f17/module-1-group-assignment-great-firewall/blob/master/files/screenShot1.jpg)
### Basic Result Page
![Alt text](https://github.com/umn-5117-f17/module-1-group-assignment-great-firewall/blob/master/files/screenShot2.png)
### Complete Results
![Alt text](https://github.com/umn-5117-f17/module-1-group-assignment-great-firewall/blob/master/files/screenShot3.png)



## Audio Features 

* Frequency Flow
`frequencyFlow`
The loudest frequency trend over the entire song/audio.
* Energy 
`energy`
The infinite integral of the squared signal. According to Lathi [1].

* Spectral Centroid
`spectralCentroid`
An indicator of brightness of a given frequency map, also is the spectral centre of gavity.

* Spectral Flatness
`spectralFlatness`
The flatness of a given frequency domain data, represented by the ratio between geometric and arithmetic means. It is also an indicator of  the 'noisiness' of a sound.



## External Dependencies


* Web-audio-API: decode raw mp3 files into pulse code modulation data(pcm data).
* fft-js/ndarray-fft: performs fast fourier transformation
* fs: read/write files



***

[1] B. P. Lathi, *Modern Digital and Analog Communication Systems* 3e Osece. Oxford University Press, 3rd ed., 1998.
