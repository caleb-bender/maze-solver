
var nRows = 20;
var nCols = 40;
var maze = null;
var infoButton = null;

var modeTexts = ["wall select/delete", "select start block", "select end block"];

function changeModeText(mode) {

	document.getElementById("mode-view").innerText = "Mode: " + modeTexts[mode[0]];
}

var mode = [0, changeModeText];

// the ai of the maze
var ai = null;

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function main() {

	if (isMobile.any()) {
		document.body.innerHTML = '<p style="text-align: center; margin: 2rem 1rem; font-size: 2rem; color: white; margin: 0 2rem;">This app only supports PCs because the controls use a mouse and keyboard &#128546;</p>';
		return;
	}
	// create the maze
	maze = new MazeStructure(nRows, nCols);
	for (let i = 0; i < maze.size(); i++) {

		maze.setAt(i, new Block(maze, mode, i, false, "maze-structure", nCols));
	}
	// create an info button to toggle on and off the instructions displaying
	infoButton = new ToggleButton(document.getElementById("info-icon"), document.getElementById("instructions"), "p-text-hidden", "p-text");

	// create the ai
	ai = new MazeAI(maze);
	// add listeners for different keys
	document.addEventListener("keyup", function (event) {

		if (event.key == "s") {

			mode[0] = 1;
		} else if (event.key == "e") {

			mode[0] = 2;
		} else if (event.key == "Escape") {

			mode[0] = 0;
		} else if (event.key == "c") {

			maze.clearBlocks();
		} else if (event.key == "Enter") {
			
			ai.clearPath();
			ai.findSolution();
		}
		mode[1](mode);
		

	});

	document.addEventListener("click", function (event) {

		ai.clearPath();
	});
}


window.addEventListener("load", main);