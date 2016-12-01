function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function getShuffled(array) {
	return shuffle(Array.prototype.slice.call(array));
}
var spaces = [
			'Killed by random crit rocket',
			'Auto­balanced',
			'Die inches from health kit',
			'Spun-up heavy around corner',
			'Korean/​Japanese/​Chinese spy',
			'Level 3 sentry protecting spawn',
			'Tele entrance right next to exit',
			'Weapons named as owner\'s property',
			'Health pack stolen while burning',
			'Vote­scramble',
			'Sentry in sentry spot',
			'3+ players standing in spawn',
			'Offensive player/​weapon name',
			'Gibus+​pyrovision',
			'Phlog pyro',
			'Pre-​game conga',
			'Player(s) shooting at über',
			'Player(s) walking into pits',
			'Trade offer in chat',
			'What is that guy doing?',
			'3+ spies/​snipers on one team',
			'Players not actually playing game',
			'2+ mini-sentries in same area',
			'Players complaining in chat',
			"Chat binds (  ͡° ͜ʖ ͡°)",
			'Taunted in killcam',
			'Teleporter exit facing wall',
			'Long-range heavy',
			'2 sentries right next to each other',
			'Scout takes level 1 teleporter',
			'Micspam',
			'Spawn­camped by heavy + medic',
			'Heavy being healed, keeps calling for medic',
			'Frontier Justice + Gunslinger',
			'Die of afterburn in front of friendly pyro',
			'2+ snipers on same balcony',
			'Explosive-​jumping player dies of fall damage'
		];
function createSpaceMenu() {
	for (l = 0; l < spaces.length; l++) {
		var spaceItem = document.createElement('li');
		spaceItem.setAttribute("class", "list-group-item");
		spaceItem.setAttribute("data-color", "success");
		spaceItem.setAttribute("data-checked", "true");
		/*var removeBtn = document.createElement('span');
		removeBtn.setAttribute("class", "glyphicon glyphicon-remove-circle remove-btn");
		removeBtn.setAttribute("onclick", "this.parentNode.parentNode.removeChild(this.parentNode);");
		spaceItem.appendChild(removeBtn);*/
		spaceItem.appendChild(document.createTextNode(spaces[l]));
		document.getElementById("space-chooser").appendChild(spaceItem);
	}
	var addBtn = document.createElement('li');
	addBtn.setAttribute("class", "btn btn-success list-group-btn");
	addBtn.setAttribute("id", "add-btn");
	addBtn.setAttribute("data-placement", "top");
	var addBtnIcon = document.createElement('span');
	addBtnIcon.setAttribute("class", "state-icon glyphicon glyphicon-plus");
	addBtn.appendChild(addBtnIcon);
	addBtn.appendChild(document.createTextNode("Add item..."));
	document.getElementById("space-chooser").appendChild(addBtn);
	var elem = 'Enter item name:<input class="form-control" id="name-field" type="text" onkeydown="if (event.keyCode == 13) {newItem(this.parentNode.parentNode, document.getElementById(&quot;name-field&quot;).value); $(&quot;#add-btn&quot;).popover(&quot;hide&quot;)}"/> <span class="btn btn-success btn-sm form-btn" onclick="newItem(this.parentNode.parentNode, document.getElementById(&quot;name-field&quot;).value); $(&quot;#add-btn&quot;).popover(&quot;hide&quot;)">Add</span><span class="btn btn-danger btn-sm form-btn" onclick="$(&quot;#add-btn&quot;).popover(&quot;hide&quot;)">Close</span>'
	$("#add-btn").popover({animation:true, content:elem, html:true});
}
function newItem(elem, text) {
	var spaceItem = document.createElement('li');
	spaceItem.setAttribute("class", "list-group-item list-group-item-success success");
	spaceItem.setAttribute("data-color", "success");
	spaceItem.setAttribute("data-checked", "true");
	spaceItem.appendChild(document.createTextNode(text));
	var removeBtn = document.createElement('span');
	removeBtn.setAttribute("class", "glyphicon glyphicon-remove-circle remove-btn");
	removeBtn.setAttribute("onclick", "this.parentNode.parentNode.removeChild(this.parentNode);");
	spaceItem.appendChild(removeBtn);
	elem.parentNode.insertBefore(spaceItem, elem.parentNode.childNodes[elem.parentNode.childNodes.length - 2]);
	itemInit(spaceItem);
}
function newCard() {
	var usedSpaces = getChecked();
	var totalSpaces = document.getElementById('width').value * document.getElementById('height').value;
	if (document.getElementById("space-alert")) {
		document.getElementById("space-alert").parentNode.removeChild(document.getElementById("space-alert"));
	}
	if (usedSpaces.length >= totalSpaces) {
		var randSpaces = getShuffled(usedSpaces);
		document.getElementById("grid").innerHTML = ""
		for (r = 1; r <= document.getElementById('height').value; r++) {
			var row = document.createElement('div');
			row.setAttribute("class", "grid-row");
			document.getElementById("grid").appendChild(row);
			for (c = 1; c <= document.getElementById('width').value; c++) {
				var space = document.createElement('div');
				var spaceText = document.createElement('div');
				spaceText.setAttribute("class", "cell-text");
				var spaceTextNode = document.createTextNode(randSpaces[(c - 1) + (r * document.getElementById('width').value) - document.getElementById('width').value]);
				spaceText.appendChild(spaceTextNode);
				var spaceTextContainer = document.createElement('div');
				spaceTextContainer.setAttribute("class", "cell-text-container");
				spaceTextContainer.appendChild(spaceText);
				space.appendChild(spaceTextContainer);
				space.setAttribute("class", "cell");
				row.appendChild(space);
			}
		}
		$(".cell").click(function () {
			$(this).toggleClass("selected");
		});
	} else {
		var alert = document.createElement('div');
		alert.setAttribute("class", "alert alert-danger alert-dismissible");
		alert.setAttribute("id", "space-alert");
		alert.setAttribute("role", "alert");
		alert.appendChild(document.createTextNode(["There are more bingo squares (" + totalSpaces + ") than selected options (" + usedSpaces.length + ")."]));
		var alertClose = document.createElement('button');
		alertClose.setAttribute("class", "close");
		alertClose.setAttribute("data-dismiss", "alert");
		alertClose.appendChild(document.createTextNode("×"));
		alert.appendChild(alertClose);
		document.getElementById("grid").parentNode.insertBefore(alert, document.getElementById("grid"));
	}
}
function bingoInit() {
	createSpaceMenu();
	checkbox();
	newCard();
	if(mq.matches) {
		scaleCard();
	} else {
		console.log(mq.media);
	}
}
function printCard() {
	$('#grid-container').printThis({
		loadCSS:"style.css"
	})
}
function scaleCard() {
	if (window.innerWidth / document.getElementById('grid').offsetWidth < window.innerHeight / document.getElementById('grid').offsetHeight) {
		document.getElementById("grid").style.transform = ["scale(" + (window.innerWidth / document.getElementById('grid').offsetWidth) + ", " + (window.innerWidth / document.getElementById('grid').offsetWidth) + ")"];
	} else {
		document.getElementById("grid").style.transform = ["scale(" + (window.innerHeight / document.getElementById('grid').offsetHeight) + ", " + (window.innerHeight / document.getElementById('grid').offsetHeight) + ")"];
	}
	document.getElementById("grid").style.transformOrigin = "50% 0 0"
}
var mq = window.matchMedia('print');
