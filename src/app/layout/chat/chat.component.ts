import { Component, ViewEncapsulation, ViewChild, ElementRef, PipeTransform, Pipe, OnInit } from '@angular/core';

// import * as Twilio from 'twilio'
declare const Twilio: any;
declare var $:any
import { DomSanitizer } from "@angular/platform-browser";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Pipe({ name: 'safe' })
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	getPerDetails
	video: string = 'http://cpx.covetus.com/TwilioChat/'
	tc:any = {}
	GENERAL_CHANNEL_UNIQUE_NAME = 'general';
	GENERAL_CHANNEL_NAME = 'General Channel';
	MESSAGES_HISTORY_LIMIT = 50;
	constructor(private sanitizer: DomSanitizer,private location: Location, private router:Router,) { 
	this.getPerDetails = []
		var userPermission =  JSON.parse(localStorage.getItem('userPermission'))
		this.getPerDetails = userPermission.filter(o => o.Page_Name.includes((this.router.url).replace("/", "")));
		if(!this.getPerDetails[0].Is_View){
			this.location.back()
		}
	}

	ngOnInit() {
		
	}  	// c.$messageList = $('#message-list');
	//      $channelList = $('#channel-list');
	//      $inputText = $('#input-text');
	//      $usernameInput = $('#username-input');
	//      $statusRow = $('#status-row');
	//      $connectPanel = $('#connect-panel');
	//      $newChannelInputRow = $('#new-channel-input-row');
	//      $newChannelInput = $('#new-channel-input');
	//      $typingRow = $('#typing-row');
	//      $typingPlaceholder = $('#typing-placeholder');
	//      $usernameInput.focus();
	//      $usernameInput.on('keypress', handleUsernameInputKeypress);
	//      $inputText.on('keypress', handleInputTextKeypress);
	//      $newChannelInput.on('keypress', tc.handleNewChannelInputKeypress);
	//      //document.getElementById("connect-image").onclick=ConnectClientWithUsername(event);
	//      $(document).on('Click', '#connect-image', ConnectClientWithUsername);
	//      $('#add-channel-image').on('click', showAddChannelInput);
	//      $('#leave-span').on('click', disconnectClient);
	//      $('#delete-channel-span').on('click', deleteCurrentChannel);
	// handleUsernameInputKeypress(){

	// 	this.ConnectClientWithUsername()
	// }

	// handleInputTextKeypress(event) {

	// 	if (event.keyCode === 13) {
	// 		this.tc.tccurrentChannel.sendMessage($(this).val());
	// 		event.preventDefault();
	// 		$(this).val('');
	// 	}
	// 	else {
	// 		this.notifyTyping();
	// 	}
	// }
	// notifyTyping(){
	// 	var notifyTyping = $.throttle(function () {
	// 		this.tc.tccurrentChannel.typing();
	// 	}, 1000);

	// }


	// tchandleNewChannelInputKeypress = function (event) {
	// 	if (event.keyCode === 13) {
	// 		this.tcmessagingClient.createChannel({
	// 			friendlyName: $('#new-channel-input').val(),//$newChannelInput.val()
	// 		}).then(this.hideAddChannelInput);
	// 		$(this).val('');
	// 		event.preventDefault();
	// 	}
	// };

	// ConnectClientWithUsername(){

	// 	var usernameText = $('#username-input').val();// $usernameInput.val();
	// 	// $usernameInput.val('');
	// 	if (usernameText == '') {
	// 		alert('Username cannot be empty');
	// 		return;
	// 	}
	// 	this.tc.username = usernameText;
	// 	this.fetchAccessToken(this.tc.username);
	// }

	// fetchAccessToken(username) {
	// 	var Tok:any={};
	// 	Tok.device='browser';
	// 	Tok.identity=username;
	// 	console.log(Tok)
	// 	var noo = this
	// 	$.post('http://tchapi.thecloudhealth.com/API/Token/Create', Tok, null, 'json')
	// 	.done(function (response) {
	// 		console.log(response)
	// 		noo.connectMessagingClient(response.token)
	// 		// this.handler(response.token);
	// 	})
	// 	.fail(function (error) {
	// 		console.log('Failed to fetch the Access Token with error: ' + error);
	// 	});
	// }

	// connectMessagingClient(token) {
	// 	var fun = this
	// 	// Initialize the IP messaging client
	// 	fun.tc.accessManager = new Twilio.AccessManager(token);
	// 	fun.tc.messagingClient = new Twilio.Chat.Client(token);
	// 	fun.tc.messagingClient.initialize()
	// 	.then(function () {
	// 		fun.updateConnectedUI();
	// 		fun.loadChannelList(fun.joinGeneralChannel);
	// 		// debugger;
	// 		fun.tc.messagingClient.on('channelAdded', $.throttle(fun.tc.loadChannelList));
	// 		fun.tc.messagingClient.on('channelRemoved', $.throttle(fun.tc.loadChannelList));
	// 		fun.tc.messagingClient.on('tokenExpired', fun.refreshToken);
	// 	});
	// }

	// refreshToken() {
	// 	this.fetchAccessToken(this.tc.username, setNewToken);
	// }

	// setNewToken(tokenResponse) {
	// 	this.tc.accessManager.updateToken(tokenResponse.token);
	// }

	// updateConnectedUI() {
	// 	$('#username-span').text(this.tc.username);
	// 	$('#status-row').addClass('connected').removeClass('disconnected');
	// 	$('#message-list').addClass('connected').removeClass('disconnected');
	// 	$('#connect-panel').addClass('connected').removeClass('disconnected');
	// 	$('#input-text').addClass('with-shadow');
	// 	$('#typing-row').addClass('connected').removeClass('disconnected');
	// }

	// loadChannelList(handler) {
	// 	if (this.tc.messagingClient === undefined) {
	// 		console.log('Client is not initialized');
	// 		return;
	// 	}
	// 	console.log(this.tc.messagingClient)
	// 	var func = this
	// 	this.tc.messagingClient.getPublicChannelDescriptors().then(function (channels) {
	// 		func.tc.channelArray = func.sortChannelsByName(channels.items);
	// 		$('#channel-list').text('');
	// 		func.tc.channelArray.forEach(func.NewaddChannel);
	// 		if (typeof handler === 'function') {
	// 			alert('handler')
	// 			handler();
	// 		}
	// 	});
	// };

	// joinGeneralChannel = function () {
	// 	console.log('Attempting to join "general" chat channel...');
	// 	if (!this.tc.generalChannel) {
	// 		// If it doesn't exist, let's create it
	// 		this.tc.messagingClient.createChannel({
	// 			uniqueName: this.GENERAL_CHANNEL_UNIQUE_NAME,
	// 			friendlyName: this.GENERAL_CHANNEL_NAME,
	// 			isPrivate : true
	// 		}).then(function (channel) {
	// 			console.log('Created general channel');
	// 			this.tc.generalChannel = channel;
	// 			this.loadChannelList(this.joinGeneralChannel);
	// 		});
	// 	}
	// 	else {
	// 		console.log('Found general channel:');
	// 		setupChannel(this.tc.generalChannel);
	// 	}
	// };

	// initChannel(channel) {

	// 	console.log('Initialized channel ' + channel.friendlyName);
	// 	return this.tc.messagingClient.getChannelBySid(channel.sid);
	// }

	// joinChannel(_channel) {
	// 	return _channel.join()
	// 	.then(function (joinedChannel) {
	// 		console.log('Joined channel ' + joinedChannel.friendlyName);
	// 		updateChannelUI(_channel);
	// 		this.tc.currentChannel = _channel;
	// 		this.tc.loadMessages();
	// 		return joinedChannel;
	// 	});
	// }

	// initChannelEvents() {
	// 	console.log(this.tc.tccurrentChannel.friendlyName + ' ready.');
	// 	this.tc.tccurrentChannel.on('messageAdded', this.tcaddMessageToList);
	// 	this.tc.tccurrentChannel.on('typingStarted', showTypingStarted);
	// 	this.tc.tccurrentChannel.on('typingEnded', hideTypingStarted);
	// 	this.tc.tccurrentChannel.on('memberJoined', notifyMemberJoined);
	// 	this.tc.tccurrentChannel.on('memberLeft', notifyMemberLeft);
	// 	$inputText.prop('disabled', false).focus();
	// }

	// setupChannel(channel) {
	// 	return leaveCurrentChannel()
	// 	.then(function () {
	// 		return initChannel(channel);
	// 	})
	// 	.then(function (_channel) {
	// 		return joinChannel(_channel);
	// 	})
	// 	.then(initChannelEvents);
	// }

	// tcloadMessages = function () {
	// 	this.tc.tccurrentChannel.getMessages(this.MESSAGES_HISTORY_LIMIT).then(function (messages) {
	// 		messages.items.forEach(this.tcaddMessageToList);
	// 	});
	// };

	// leaveCurrentChannel() {

	// 	if (this.tc.tccurrentChannel) {
	// 		return this.tc.tccurrentChannel.leave().then(function (leftChannel) {
	// 			console.log('left ' + leftChannel.friendlyName);
	// 			leftChannel.removeListener('messageAdded', this.tcaddMessageToList);
	// 			leftChannel.removeListener('typingStarted', showTypingStarted);
	// 			leftChannel.removeListener('typingEnded', hideTypingStarted);
	// 			leftChannel.removeListener('memberJoined', notifyMemberJoined);
	// 			leftChannel.removeListener('memberLeft', notifyMemberLeft);
	// 		});
	// 	} else {
	// 		return Promise.resolve();
	// 	}
	// }

	// tcaddMessageToList = function (message) {
	// 	var rowDiv = $('<div>').addClass('row no-margin');
	// 	rowDiv.loadTemplate($('#message-template'), {
	// 		username: message.author,
	// 		date: dateFormatter.getTodayDate(message.timestamp),
	// 		body: message.body
	// 	});
	// 	if (message.author === this.tcusername) {
	// 		rowDiv.addClass('own-message');
	// 	}

	// 	this.tc$messageList.append(rowDiv);
	// 	scrollToMessageListBottom();
	// };

	// notifyMemberJoined(member) {
	// 	notify(member.identity + ' joined the channel')
	// }

	// notifyMemberLeft(member) {
	// 	notify(member.identity + ' left the channel');
	// }

	// notify(message) {
	// 	var row = $('<div>').addClass('col-md-12');
	// 	row.loadTemplate('#member-notification-template', {
	// 		status: message
	// 	});
	// 	this.tc$messageList.append(row);
	// 	scrollToMessageListBottom();
	// }

	// showTypingStarted(member) {
	// 	$typingPlaceholder.text(member.identity + ' is typing...');
	// }

	// hideTypingStarted(member) {
	// 	$typingPlaceholder.text('');
	// }

	// scrollToMessageListBottom() {
	// 	this.tc$messageList.scrollTop(this.tc$messageList[0].scrollHeight);
	// }

	// updateChannelUI(selectedChannel) {
	// 	var channelElements = $('.channel-element').toArray();
	// 	var channelElement = channelElements.filter(function (element) {
	// 		return $(element).data().sid === selectedChannel.sid;
	// 	});
	// 	channelElement = $(channelElement);
	// 	if (this.tc.tccurrentChannelContainer === undefined && selectedChannel.uniqueName === this.GENERAL_CHANNEL_UNIQUE_NAME) {
	// 		this.tc.tccurrentChannelContainer = channelElement;
	// 	}
	// 	this.tc.tccurrentChannelContainer.removeClass('selected-channel').addClass('unselected-channel');
	// 	channelElement.removeClass('unselected-channel').addClass('selected-channel');
	// 	this.tc.tccurrentChannelContainer = channelElement;
	// }

	// showAddChannelInput() {
	// 	if (this.tcmessagingClient) {
	// 		$newChannelInputRow.addClass('showing').removeClass('not-showing');
	// 		$channelList.addClass('showing').removeClass('not-showing');
	// 		$newChannelInput.focus();
	// 	}
	// }

	// hideAddChannelInput() {
	// 	$newChannelInputRow.addClass('not-showing').removeClass('showing');
	// 	$channelList.addClass('not-showing').removeClass('showing');
	// 	$newChannelInput.val('');
	// }

	// NewaddChannel(channel) {
	// 	// debugger
	// 	var newtc = {}
	// 	// console.log('im un add channel', funcv.tc)

	// 	var GENERAL_CHANNEL_UNIQUE_NAME = 'general'
	// 	var func = this
	// 	if (channel.uniqueName === GENERAL_CHANNEL_UNIQUE_NAME) {
	// 		newtc = channel;
	// 	}
	// 	alert($('#logout').attr('class')); 
	// 	console.log($('#myidadd').addClass('row channel-row'))
	// 	var rowDiv = $('#myidadd').addClass('row channel-row');
	// 	rowDiv.loadTemplate('#channel-template', {
	// 		channelName: channel.friendlyName
	// 	});
	// 	var channelP = rowDiv.children().children().first();
	// 	console.log(channelP)
	// 	func.selectChannel(channelP)
	// 	rowDiv.on('click', func.selectChannel(channelP));
	// 	channelP.data('sid', channel.sid);
	// 	if (func.tc.tccurrentChannel && channel.sid === func.tc.tccurrentChannel.sid) {
	// 		func.tc.tccurrentChannelContainer = channelP;
	// 		channelP.addClass('selected-channel');
	// 	}
	// 	else {
	// 		channelP.addClass('unselected-channel')
	// 	}

	// 	$('#channel-list').append(rowDiv);
	// }

	// deleteCurrentChannel() {
	// 	if (!this.tc.tccurrentChannel) {
	// 		return;
	// 	}
	// 	if (this.tc.tccurrentChannel.sid === this.tcgeneralChannel.sid) {
	// 		alert('You cannot delete the general channel');
	// 		return;
	// 	}
	// 	this.tc.tccurrentChannel.delete().then(function (channel) {
	// 		console.log('channel: ' + channel.friendlyName + ' deleted');
	// 		setupChannel(this.tcgeneralChannel);
	// 	});
	// }

	// selectChannel(event) {
	// 	var target = $(event.target);
	// 	var channelSid = target.data().sid;
	// 	var selectedChannel = this.tcchannelArray.filter(function (channel) {
	// 		return channel.sid === channelSid;
	// 	})[0];
	// 	if (selectedChannel === this.tc.tccurrentChannel) {
	// 		return;
	// 	}
	// 	setupChannel(selectedChannel);
	// };

	// disconnectClient() {
	// 	leaveCurrentChannel();
	// 	$channelList.text('');
	// 	this.tc$messageList.text('');
	// 	channels = undefined;
	// 	$statusRow.addClass('disconnected').removeClass('connected');
	// 	this.tc$messageList.addClass('disconnected').removeClass('connected');
	// 	$connectPanel.addClass('disconnected').removeClass('connected');
	// 	$inputText.removeClass('with-shadow');
	// 	$typingRow.addClass('disconnected').removeClass('connected');
	// }

	// sortChannelsByName(channels) {
	// 	var func = this
	// 	return channels.sort(function (a, b) {
	// 		if (a.friendlyName === func.GENERAL_CHANNEL_NAME) {
	// 			return -1;
	// 		}
	// 		if (b.friendlyName === func.GENERAL_CHANNEL_NAME) {
	// 			return 1;
	// 		}
	// 		return a.friendlyName.localeCompare(b.friendlyName);
	// 	});
	// };

}
