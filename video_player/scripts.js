//Grab our elements 

const player = document.querySelector('.player'); //player is the 'papa' div so all subsequent querySelectors will be using player
const video = player.querySelector('.viewer'); 
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');//use for querySelectorAll when using more than one class selection 
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
	/*if(video.paused){
		video.play();
	}else{
		video.pause();
	}
	*/

	//same code as above
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';//if the video has been paused or played the icon will change text 
	toggle.textContent = icon;//binds the icon to the toggle class on the player
}

function skip(){
	video.currentTime += parseFloat(this.dataset.skip);//converts the skip time from a string into realtime
}

function handleRangeUpdate(){
	video[this.name] = this.value;//sets the value of each of the ranges to its name so that it updates in realtime
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;//percent used to take the current time of video / video length and * 100
	progressBar.style.flexBasis = `${percent}%`;//sets the CSS for the progress bar to the percent const
}

function scrub(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;//the point on the prgressBar that was clicked / the length of the bar * video length
	video.currentTime = scrubTime;//sets the video to the scrubTime
}

//Hook up the eventListeners

video.addEventListener('click', togglePlay); //binds togglePlay function to the video class
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);//binds togglePlay function to the play button
skipButtons.forEach(button => button.addEventListener('click', skip));//use forEach when selector has more than one query
//ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));//listens to when the ranges changes 
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));//plays if the mousedown in true 
progress.addEventListener('mousedown', () => mousedown = true);//checks to see if mousedown 
progress.addEventListener('mouseup', () => mousedown = false);//runs if mousedown = false, no scrub function











