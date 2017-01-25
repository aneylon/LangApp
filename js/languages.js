var curLib = " ";
var curCharacters = " ";
var curCard = 0;
var knownCards = new Array();
var notSureCards = new Array();
var unknownCards = new Array();

$(document).ready(function(){
	$("#jMenu").click(function() {
		$("#japaneseMenu").slideToggle("fast");
	});
	$("#cMenu").click(function() {
		$("#chineseMenu").slideToggle("fast");
	});
	$("#kMenu").click(function() {
		$("#koreanMenu").slideToggle("fast");
	});
	$("#tMenu").click(function() {
		$("#thaiMenu").slideToggle("fast");
	});
	$("#sMenu").click(function() {
		$("#spanishMenu").slideToggle("fast");
	});

	$("#loadSpanishPhrases").click(function() {
		setElementFontSize ( "#curChar", "50px" );
		$.getJSON ( "json/sp.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});
	$("#loadThaiLetters").click(function() {
		setElementFontSize ( "#curChar", "50px" );
		$.getJSON ( "json/tl.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});
	$("#loadJapanesePhrases").click(function() {
		setElementFontSize ( "#curChar", "50px" );
		$.getJSON ( "json/jp.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadChinesePhrases").click(function() {
		setElementFontSize ( "#curChar", "50px" );
		$.getJSON ( "json/cp.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadKoreanPhrases").click(function() {
		setElementFontSize ( "#curChar", "50px" );
		$.getJSON ( "json/kp.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadThaiPhrases").click(function() {
		setElementFontSize ( "#curChar", "50px" );
		$.getJSON ( "json/tp.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadJLPTN5Vocab").click(function() {
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/JLPTN5Vocab.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadJLPTN4Vocab").click(function() {
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/JLPTN4Vocab.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadJLPTN3Vocab").click(function() {
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/JLPTN3Vocab.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadJLPTN2Vocab").click(function() {
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/JLPTN2Vocab.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadJLPTN1Vocab").click(function() {
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/JLPTN1Vocab.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadKatakana").click(function(){
		setElementFontSize ( "#curChar", "150px" );
		$.getJSON ( "json/katakana.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadHiragana").click(function(){
		setElementFontSize ( "#curChar", "150px" );
		$.getJSON ( "json/hiragana.json", function ( data ) {
			updateCurrentLibrary ( data );
		});
	});

	$("#loadHangul").click(function(){
		setElementFontSize ( "#curChar", "150px" );
		$.getJSON ( "json/hangul.json", function ( data ) {
			updateCurrentLibrary( data );
		});
	});

	$("#loadKoreanVocab").click(function(){
		setElementFontSize ( "#curChar", "60px" );
		$.getJSON ( "json/kv.json", function ( data ) {
			updateCurrentLibrary( data );
		});
	});

	$("#loadKoreanVocab2").click(function(){
		setElementFontSize ( "#curChar", "60px" );
		$.getJSON ( "json/kt.json", function ( data ) {
			updateCurrentLibrary( data );
		});
	});

	$("#loadBopomofo").click(function(){
		setElementFontSize ( "#curChar", "150px" );
		$.getJSON ( "json/bopomofo.json", function ( data ) {
			updateCurrentLibrary( data );
		});
	});

	$("#loadChineseVocab").click(function(){
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/ChineseVocab.json", function ( data ) {
			updateCurrentLibrary( data );
		});
	});

	$("#loadHSK1Vocab").click(function(){
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/hsk1.json", function ( data ) {
			updateCurrentLibrary( data );
		});
	});

	$("#loadHSK2Vocab").click(function(){
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/hsk2.json", function ( data ) {
			updateCurrentLibrary( data );
		});
	});

	$("#loadHSK3Vocab").click(function(){
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/hsk3.json", function ( data ) {
			updateCurrentLibrary( data );
		});
	});

	$("#loadHSK4Vocab").click(function(){
		setElementFontSize ( "#curChar", "75px" );
		$.getJSON ( "json/hsk4.json", function ( data ) {
			updateCurrentLibrary( data );
		});
	});

	$( "#curChar" ).click(function() {
		toggleInfoPanel();
	});

	$("#knowIt").click(function() {
		sendCardToDeck ( curCard, knownCards );
		hideInfoPanel();
	});

	$("#notSure").click(function() {
		sendCardToDeck ( curCard, notSureCards );
		hideInfoPanel();
	});

	$("#dontKnow").click(function() {
		sendCardToDeck ( curCard, unknownCards );
		hideInfoPanel();
	});
});

function setElementFontSize ( cssElementName, fontSizePX ) {
	$( cssElementName ).css( "font-size", fontSizePX );
}

function toggleInfoPanel () {
	$("#curCharInfo").fadeToggle("fast");
}

function hideInfoPanel () {
	$("#curCharInfo").fadeOut("fast", function () {
		nextCardInDeck();
	});
}

function sendCardToDeck ( currentCardNumber, deckToSendTo ) {
	deckToSendTo.push(curCharacters[currentCardNumber]);
}

function nextCardInDeck() {
	if ( curCard != curCharacters.length -1 ){
		curCard++;
	} else if ( curCard == curCharacters.length - 1 ) {
		curCard = 0;
		knownCards = shuffleDeck(knownCards);
		notSureCards = shuffleDeck(notSureCards);
		unknownCards = shuffleDeck(unknownCards);
		curCharacters = unknownCards;
		pushToArray ( notSureCards, curCharacters );
		pushToArray ( knownCards, curCharacters );
		clearTempDecks();
	}
	updateDisplayCharacter( curCard );
}

function pushToArray ( original, target ) {
	for ( var i = 0; i < original.length; i++ ) {
			target.push ( original[i]);
		}
}

function updateDisplayCharacter( x ) {
	$("#curChar").text(curCharacters[x].character);
	//$("#curCharInfo").text(curCharacters[x].charTip);
	$("#curCharInfo").html(curCharacters[x].charTip);
}

function updateCurrentLibrary ( libraryData ) {
	$("#curCharInfo").fadeOut("fast");
	curCard = 0;
	clearTempDecks();
	curLib = libraryData;
	$("#libTitle").text(curLib.name.libName);
	$("#libTitle").attr("title", curLib.name.tip);
	curCharacters = curLib.characters;
	curCharacters = shuffleDeck ( curCharacters );
	updateDisplayCharacter( curCard );
}

function shuffleDeck ( array ) {
	for ( var i = array.length - 1; i > 0; i-- ) {
		var j = Math.floor(Math.random() * ( i + 1 ));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function clearTempDecks () {
	knownCards = new Array();
	notSureCards = new Array();
	unknownCards = new Array();
}

function showAllTheInfos () {
	console.log("the current Card is : " + curCard);
	console.log("current characters are : ");
	for ( var i = 0; i < curCharacters.length; i++ ) {
		console.log ( curCharacters[i].character + " " + curCharacters[i].charTip );
	}
	console.log("known characters are : ");
	for ( var i = 0; i < knownCards.length; i++ ) {
		console.log ( knownCards[i].character + " " + knownCards[i].charTip );
	}
	console.log("not sure cards are : ");
	for ( var i = 0; i < notSureCards.length; i++ ) {
		console.log ( notSureCards[i].character + " " + notSureCards[i].charTip );
	}
	console.log("unknown cards are : ");
	for ( var i = 0; i < unknownCards.length; i++ ) {
		console.log ( unknownCards[i].character + " " + unknownCards[i].charTip );
	}
}