document.addEventListener('DOMContentLoaded', function() {

function classToggle( toggleElementName , toggleClassName) {
	var tElement = toggleElementName;
	var menuContainer = document.querySelector(tElement)
	var tClass = toggleClassName;
		if ( menuContainer.classList.contains(tClass) ) {
			menuContainer.classList.remove(tClass);
			} else {
			menuContainer.classList.add(tClass);
			}
	};

function menuToggler() {
		classToggle('.AiHeader_NavListContainer','ContainerHidden') 
	};

document.querySelector('#AiHeader_MobileMenuIcon').addEventListener('click', menuToggler );


function awakeTheLight() {
		console.log('here comes The Light');
		classToggle('.Try_FrontContainer','Try_FrontContainerBlow');
		classToggle('.Try_BackgroundCanvasBG','Try_BackgroundCanvasBGBlow');
		classToggle('.Try_BackgroundMiddleBG','Try_BackgroundMiddleBGBlow');
		classToggle('.LoaderCover','LoaderCoverVisible');
		classToggle('.AiHeader_NavContainer','HiddenBlock'); 
		classToggle('#imandraLoader','VisibleBlock');
		setTimeout(function() {
			classToggle('#imandraLoader','RevealBlock');
		}, 650);

	};


document.querySelector('.Try_Panel').addEventListener('click', awakeTheLight);


var S0 = "ai/imandra> ";
var S1 = "#about";
var S2 = "\n\nImandra is \n\n - AI for algorithms, scaled to the cloud;\n - a powerful new foundation for formally verified functional programming;\n - powering a new generation of tools for ensuring the safety, fairness,\n   transparency and correctness of complex algorithms.";
var S3 = "\n\nImandra's Reasoning as a Service APIs democratise access to deep advances\nin automated reasoning, bringing the power of tools traditionally reserved\nto institutions like NASA to algorithm development at large.";
var S4 = "\n\nDisclaimer: Imandra stores normalised representations of user definitions,\nqueries, counterexamples and proofs to improve future performance.";
var S5 = "\n\nPress here to consent and continue";

	var Description = document.getElementById('Try_Terminal');
	var typewriter = new Typewriter( Description, {
		    loop: true,
		    cursor: '',
		    animateCursor: true,
		    blinkSpeed: 0,
		    typingSpeed: 0,
		    deleteSpeed: 1,
		    charSpanClassName: 'BasicTypewriter',
		    devMode: false
	});

	typewriter.typeString(S0)
		.pauseFor(500)
		.changeSettings({typingSpeed: 550})
		.typeString(S1)
		.pauseFor(1000)
		.changeSettings({typingSpeed: 0})
		.typeWords(S2)
		.pauseFor(300)
		.typeWords(S3)
		.pauseFor(300)
		.typeWords(S4)
		.pauseFor(300)
		.changeSettings({charSpanClassName: 'BasicTypewriterBlue'})
		.typeString(S5)
		.changeSettings({blinkSpeed: 50})
		.pauseFor(11000)
		.pulseEffect('Pulse')
		.pauseFor(666)
		.changeSettings({blinkSpeed: 0})
		.clearAll()
    .start();

	var tryPanel = document.querySelector('#Try_Panel');
	var tryTerminal = document.querySelector('#Try_Terminal');
	var tryLoader = document.querySelector('#Try_Loader');

	function loadTry() {
		tryTerminal.style.display = 'none';
		tryLoader.style.display = 'block';

		function logOut() {
				var xhrLogout = new XMLHttpRequest();
				xhrLogout.open('GET', '/h/hub/logout');
				xhrLogout.send();
		}

		var xhrLogin = new XMLHttpRequest();
		xhrLogin.onload = loggedIn;

		console.log('logging in');
		xhrLogin.open('GET', '/h/hub/tmplogin');
		xhrLogin.send();

		function loggedIn () {
			if (xhrLogin.status == 200) {
				console.log('logged in');
				var xhrSpawn = new XMLHttpRequest();
				xhrSpawn.onload = function () {
					if (xhrSpawn.status == 200) {
						var ru = xhrSpawn.responseURL;
						console.log(ru);
						var notebookLoaded = false;

						if (ru) {
							var ruParts = ru.split('/');
							if (ruParts[ruParts.length - 1].substr(0,4) == 'tree') {
								notebookLoaded = true;
							}
						}

						if (notebookLoaded) {
							console.log('loaded');
							window.location.href = ru;
						} else {
							setTimeout(function () {
								console.log(xhrSpawn);
								console.log('rechecking spawn');
								xhrSpawn.open('GET', '/h/hub/spawn');
								xhrSpawn.send();
							}, 5000);
						}
					} else {
						console.error('Error spawning');
						console.error(xhrSpawn);

						//TODO: show error
						logOut();
						tryLoader.style.display = 'none';
						tryTerminal.style.display = 'block';
						tryPanel.addEventListener('click', loadTry);
					}
				};

				console.log('spawning');
				xhrSpawn.open('GET', '/h/hub/spawn');
				xhrSpawn.send();
			} else {
				console.error('Error logging in');
				console.error(xhrLogin);

				//TODO: show error
				logOut();
				tryLoader.style.display = 'none';
				tryTerminal.style.display = 'block';
				tryPanel.addEventListener('click', loadTry);
			}
		}

		tryPanel.removeEventListener('click', loadTry);
	}

	tryPanel.addEventListener('click', loadTry);
});
