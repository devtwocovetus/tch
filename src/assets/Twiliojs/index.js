'use strict';
// debugger;
//var Video = require(['Scripts/Twiliojs/twilio-video']);
const Video = Twilio.Video;
var activeRoom;
var previewTracks;
var identity;
var roomName;
var getIdentity;
var datatoken;
var getPartientfullName

// Attach the Track to the DOM.
function attachTrack(track, container) {
	container.appendChild(track.attach());
}

// Attach array of Tracks to the DOM.
function attachTracks(tracks, container) {
	tracks.forEach(function(track) {
		attachTrack(track, container);
	});
}

// Detach given track from the DOM.
function detachTrack(track) {
	track.detach().forEach(function(element) {
		element.remove();
	});
}

// Appends remoteParticipant name to the DOM.
function appendName(identity, container) {
	const name = document.createElement('p');
	name.id = `participantName-${identity}`;
	name.className = 'instructions';
	name.textContent = identity;
	container.appendChild(name);
}

// Removes remoteParticipant container from the DOM.
function removeName(participant) {
	if (participant) {
		let { identity } = participant;
		const container = document.getElementById(
			`participantContainer-${identity}`
			);
		container.parentNode.removeChild(container);
	}
}

// A new RemoteTrack was published to the Room.
function trackPublished(publication, container) {
	if (publication.isSubscribed) {
		attachTrack(publication.track, container);
	}
	publication.on('subscribed', function(track) {
		log('Subscribed to ' + publication.kind + ' track');
		attachTrack(track, container);
	});
	publication.on('unsubscribed', detachTrack);
}

// A RemoteTrack was unpublished from the Room.
function trackUnpublished(publication) {
	log(publication.kind + ' track was unpublished.');
}

// A new RemoteParticipant joined the Room
function participantConnected(participant, container) {
	let selfContainer = document.createElement('div');
	selfContainer.id = `participantContainer-${participant.identity}`;

	container.appendChild(selfContainer);
	appendName(participant.identity, selfContainer);

	participant.tracks.forEach(function(publication) {
		trackPublished(publication, selfContainer);
	});
	participant.on('trackPublished', function(publication) {
		trackPublished(publication, selfContainer);
	});
	participant.on('trackUnpublished', trackUnpublished);
}

// Detach the Participant's Tracks from the DOM.
function detachParticipantTracks(participant) {
	var tracks = getTracks(participant);
	tracks.forEach(detachTrack);
}

// When we are about to transition away from this page, disconnect
// from the room, if joined.
window.addEventListener('beforeunload', leaveRoomIfJoined);


 // debugger;
 function GenerateToken(){
	getIdentity = localStorage.getItem('identityId')
	getPartientfullName= localStorage.getItem('identityName')
	
	$.getJSON('https://api.tchdemo.com/api/Token/GetToken', { Identity: getIdentity}, function (data) {
		identity = data.identity;
		// debugger;
		$('#room-controls').css("display","block");

		datatoken =data.token;

	});

	// alert('yes im hitted '+myitem)
}
 function JoinVideo(){

				// debugger;
				roomName = $('#room-name').val();
				if (!roomName) {
					// alert('Please enter a room name.');
					return;
				}

				log("Start Meeting '" + roomName + "'...");
				var connectOptions = {
					name: roomName,
					logLevel: 'debug',
					// identityName: getPartientfullName
				};

				if (previewTracks) {
					connectOptions.tracks = previewTracks;
				}

				// Join the Room with the token from the server and the
				// LocalParticipant's Tracks.
				// debugger;
				Video.connect(datatoken, connectOptions).then(roomJoined, function (error) {
						// debugger;
					 // window.room = roomJoined;
					 log('Could not connect to Twilio: ' + error.message);
					});


			};

			function LeaveVideo() {
				log('Leaving room...');
				activeRoom.disconnect();
			};
// Obtain a token from the server in order to connect to the Room.


// Get the Participant's Tracks.
function getTracks(participant) {
	return Array.from(participant.tracks.values()).filter(function(publication) {
		return publication.track;
	}).map(function(publication) {
		return publication.track;
	});
}

// Successfully connected!
function roomJoined(room) {
		// debugger;
		window.room = activeRoom = room;

		log("Joined as '" + getPartientfullName + "'");
		document.getElementById('button-join').style.display = 'none';
		document.getElementById('button-leave').style.display = 'block';

	// Attach LocalParticipant's Tracks, if not already attached.
	var previewContainer = document.getElementById('local-media');
	if (!previewContainer.querySelector('video')) {
		attachTracks(getTracks(room.localParticipant), previewContainer);
	}

	// Attach the Tracks of the Room's Participants.
	var remoteMediaContainer = document.getElementById('remote-media');
	room.participants.forEach(function(participant) {
		log("Already in Room: '" + participant.identity + "'");
		participantConnected(participant, remoteMediaContainer);
	});

	// When a Participant joins the Room, log the event.
	room.on('participantConnected', function(participant) {
		log("Joining: '" + participant.identity + "'");
		participantConnected(participant, remoteMediaContainer);
	});

	// When a Participant leaves the Room, detach its Tracks.
	room.on('participantDisconnected', function(participant) {
		log("RemoteParticipant '" + participant.identity + "' left the room");
		detachParticipantTracks(participant);
		removeName(participant);
	});

	// Once the LocalParticipant leaves the room, detach the Tracks
	// of all Participants, including that of the LocalParticipant.
	room.on('disconnected', function() {
		log('Left');
		if (previewTracks) {
			previewTracks.forEach(function(track) {
				track.stop();
			});
			previewTracks = null;
		}
		detachParticipantTracks(room.localParticipant);
		room.participants.forEach(detachParticipantTracks);
		room.participants.forEach(removeName);
		activeRoom = null;
		document.getElementById('button-join').style.display = 'block';
		document.getElementById('button-leave').style.display = 'none';
	});
}

// Preview LocalParticipant's Tracks.
function PreviewButton() {
	var localTracksPromise = previewTracks
	? Promise.resolve(previewTracks)
	: Video.createLocalTracks();

	localTracksPromise.then(function(tracks) {
		window.previewTracks = previewTracks = tracks;
		var previewContainer = document.getElementById('local-media');
		if (!previewContainer.querySelector('video')) {
			attachTracks(tracks, previewContainer);
		}
	},function(error) {
		console.error('Unable to access local media', error);
		log('Unable to access Camera and Microphone');
	}
	);
};

// Activity log.
function log(message) {
	var logDiv = document.getElementById('log');
	logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
	logDiv.scrollTop = logDiv.scrollHeight;
}

// Leave Room.
function leaveRoomIfJoined() {
	if (activeRoom) {
		activeRoom.disconnect();
	}
}
