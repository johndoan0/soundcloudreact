// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

var $ = require('jQuery'),
	Backbone = require('backbone'),
	React = require('react'), 
	SC = require('soundcloud')

let fetch = require('./fetcher')

console.log('javascript loaded')

// ==== Fetch/API request
SC.initialize({
  client_id: '7e1122ad9a135f955afdfc49a9499ead',
  redirect_uri: './callback.html'
});

var SCGetObj = SC.get('/tracks', {q: 'trap music'}).then(function(tracks){
	return (React.render(<SCPlayerView tracksObj={tracks}/>, document.querySelector("#container")))
})

// console.log(SCGetObj)


// ==== VIEW
var SCPlayerView = React.createClass({
	render: function(){
		// console.log(this.props.tracksObj)
		//<Scrubber />
		// <SCControls />
				// <PlayedLoved />
				// <ArtistSongTitle />
		var sInfo = this.props.tracksObj
		return(
			<div id="scplayerview">
				<SongInfo songInfo={sInfo}/>
			</div>
		)
	}
})

// ==== BUTTON CONTROLS FOR EACH SONG
var SongControls = React.createClass({
	getInitialState: function(){
		return {playpause: 'Play',
				volume: '2'}
	},

	_playPauseClick: function(e){
		this.setState({playpause: 'Pause'})
		if(this.state.playpause === 'Pause') this.setState({playpause: 'Play'})
	},

	_volumeClick: function(e){
		if(this.state.volume === 'Mute') this.setState({volume: '1'})
		else if(this.state.volume === '1') this.setState({volume: '2'})	
		else if(this.state.volume === '2') this.setState({volume: '3'})
		else if(this.state.volume === '3') this.setState({volume: '4'})
		else if(this.state.volume === '4') this.setState({volume: 'Mute'})
	},

	render: function(){
		console.log('info in the SongControls component', this.props.tracks)
		return(
			<div className="songcontrols">
				<button className="replay" type="button">Replay</button>
				<button className="playpause" type="button" onClick={this._playPauseClick}>{this.state.playpause}</button>
				<button className="volume" type="button" onClick={this._volumeClick}>Volume {this.state.volume}</button>
			</div>	
		)
	},
})


// ==== SINGLE SONG METADATA
var SongInfo = React.createClass({

	_metaData: function(singleInfo){
		var songTitle = singleInfo.title.substr(0,15) + "..."
		var artwork = singleInfo.artwork_url
		var favCount = singleInfo.favoritings_count
		var playCount = singleInfo.playback_count
		var artist = singleInfo.user.username
		var tracks = singleInfo
		
		return(
			<div className="metadata">
				<img src={artwork} />
				<div className="textmetadata">
					<p>Song: {songTitle}</p>
					<p>Artist: {artist}</p>
					<p>Favorited {favCount} times</p>
					<p>Played {playCount} times</p>
					<SongControls tracks={tracks}/>
				</div>
			</div>
		)
	},

	render: function(){
		// console.log('this.props.songInfo on SongInfo component', this.props.songInfo) 
		// console.log(this.props.songInfo)
		var songInfoArr = this.props.songInfo,
			self = this

		return(
			<div className="listtracks">
				{songInfoArr.map(self._metaData)}
			</div>			
		)
	}
})















//////////////////////////   old
var PlayedLoved = React.createClass({
	render: function(){
		//pass api request into playedloved
		return(
			<div id="playedloved">
				<div id="played">played</div>
				<div id="loved">loved</div>
			</div>

		)
	}
})

var ArtistSongTitle = React.createClass({
	render: function(){
		//artist and song title to be pulled from api passed into AST this.props.w/e
		return(
			<div id="artistsongtitle">
				<p id="artist">artist</p>
				<p id="songtitle">song title</p>
			</div>
		)
	}
})

var SCControls = React.createClass({
	
	getInitialState: function(){
		return {
			playpause: 'play',
			replay: 'R',
			volume: '2'
		}
	},

	_playPauseClick: function(e){
		// console.log('click playpause')
		this.setState({playpause: 'pause'})
		if(this.state.playpause === 'pause') this.setState({playpause: 'play'})
	},

	_replayClick: function(){
		this.setState({replay: 'X'})
		if(this.state.replay === 'X') this.setState({replay: 'R'})
	},

	_volumeClick: function(){
		if(this.state.volume === '0') this.setState({volume: '1'})
		else if(this.state.volume === '1') this.setState({volume: '2'})	
		else if(this.state.volume === '2') this.setState({volume: '3'})
		else if(this.state.volume === '3') this.setState({volume: '4'})
		else if(this.state.volume === '4') this.setState({volume: '0'})
	},

	render: function(){
		return(
			<div id="sccontrols">
				<div onClick={this._replayClick} id="replay">{this.state.replay}</div>
				<div onClick={this._playPauseClick} id="playpause">{this.state.playpause}</div>
				<div onClick={this._volumeClick} id="volume">{this.state.volume}</div>
			</div>
		)
	}
})


