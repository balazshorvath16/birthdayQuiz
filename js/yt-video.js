var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player_1;
var player_2;
var player_3;
var player_4;
var player_5;
var player_6;
function onYouTubeIframeAPIReady() {
	player_1 = new YT.Player('player1', {
		height: '390',
		width: '640',
		videoId: '_uvtNzusvE8',
	});
	player_2 = new YT.Player('player2', {
		height: '390',
		width: '640',
		videoId: 'Z_VZKFmIeeA',
	});
	player_3 = new YT.Player('player3', {
		height: '390',
		width: '640',
		videoId: 'sYgvtDNqClg',
	});
	player_4 = new YT.Player('player4', {
		height: '390',
		width: '640',
		videoId: 'sYgvtDNqClg',
	});
	player_5 = new YT.Player('player5', {
		height: '390',
		width: '640',
		videoId: 'sYgvtDNqClg',
	});
	player_6 = new YT.Player('player5', {
		height: '390',
		width: '640',
		videoId: 'sYgvtDNqClg',
	});
}
function onPlayerReady(event) {
	//event.target.playVideo();
}
var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 6000);
		done = true;
	}
}
function stopVideo() {
	player_1.stopVideo();
	player_2.stopVideo();
	player_3.stopVideo();
	player_4.stopVideo();
	player_5.stopVideo();
	player_6.stopVideo();
}