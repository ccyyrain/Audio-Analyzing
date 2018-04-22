# Module 1 Group Assignment: The Describerator

CSCI 5117, Fall 2017

[Assignment description](https://docs.google.com/document/d/1956Z3EZJi9RWU6JqPHEh5ZZBmDOKFex-HtsBLz66tt4/edit#)

Please fill out all of the following sections to help us grade your submission:


## Name of App: Audio Analysing System


## Name of Team: Great Firewall


## Students

* Anthony Zhang, zhan4490@umn.edu
* Tian Nan, nanxx026@umn.edu
* Yu Cui, cuixx322@umn.edu
* Raphael(Chuxuan) Ma, maxx0208@umn.edu


## Link to Site

<https://boiling-savannah-79784.herokuapp.com/>


## Key Features

**Describe the most challenging features you implemented
(one sentence per bullet, maximum 4 bullets):**

* Analysing the time-domain and frequency domain information for two difference audio file
* Using AJAX to upload the files
* Minimize the analyzing time of the uploaded files
* Feature Extraction for audio inputs


## Screenshots of Site

**[Add a screenshot of each key page (maximum 4)](https://stackoverflow.com/questions/10189356/how-to-add-screenshot-to-readmes-in-github-repository)
along with a very brief caption:**
## Main Page
![Alt text](https://github.com/umn-5117-f17/module-1-group-assignment-great-firewall/blob/master/files/screenShot1.jpg)
## Basic Result Page
![Alt text](https://github.com/umn-5117-f17/module-1-group-assignment-great-firewall/blob/master/files/screenShot2.png)
## Complete Results
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


**Document integrations with 3rd Party code or services here.
Please do not document required libraries (e.g., Express, Bulma).**
Library or service name: description of use
* 
* Web-audio-API: decode raw mp3 files into pulse code modulation data(pcm data).
* fft-js/ndarray-fft: performs fast fourier transformation
* fs: read/write files

**If there's anything else you would like to disclose about how your project
relied on external code, expertise, or anything else, please disclose that
here:**

***

[1] B. P. Lathi, *Modern Digital and Analog Communication Systems* 3e Osece. Oxford University Press, 3rd ed., 1998.
