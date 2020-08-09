 let $gameBody = $('.gameBody');
 let mainRows = null;
 let mainColumns = null;
 function getGameBoard(row, column) {
	 mainRows = row;
	 mainColumns = column;
	 $gameBody.empty();
	 for(let i=0; i<row; i++) {
		 let $rows = $('<div>').addClass('row');
		 for(let j=0; j<column; j++) {
			 let $columns = $('<div>').addClass('column hidden').attr('data-col', j).attr('data-row', i);
			 if(Math.random() < 0.15) {
				 $columns.addClass('bomb');
			 }
			 $rows.append($columns);
		 }
		 $gameBody.append($rows);
	 }
 }
$gameBody.on('click', '.column.hidden', function(){
	let $gameCell = $(this);
	let row = $gameCell.data('row');
	let column = $gameCell.data('col');
	console.log($gameCell, row, column);
	if($gameCell.hasClass("bomb")) {
		gameStatus(false);
	} else {
		showAdjacentBlockDetails(row, column);
		let checkGameStatus = $('.column.hidden').length == $('.column.bomb').length;
		console.log("$('.column.hidden').length", $('.column.hidden').length);
		console.log()
		if(checkGameStatus) {
			gameStatus(true);
		}
	}
})
function showAdjacentBlockDetails(r, c) {
	const visited = {};
	console.log(r, c);
	console.log(mainRows, mainColumns);
	function revCycle(i, j) {
		if(i >= mainRows ||  j >= mainColumns || i < 0 || j < 0 ) {
			return;
		}
		let trackPoint = i + " " + j;
		console.log("track", trackPoint);
		if(visited[trackPoint]) {
			return;
		}
		let $currentCell = $('.column.hidden[data-row='+i+'][data-col='+j+']');
		let explosionCount = getExplosionCounter(i, j);
		if(!$currentCell.hasClass('hidden') || $currentCell.hasClass('bomb')) {
			return;
		}
		$currentCell.removeClass('hidden');
		if(explosionCount) {
			$currentCell.text(explosionCount);
			return;
		}

		for(let cellI = -1; cellI <= 1; cellI++) {
			for(let cellJ = -1; cellJ <= 1; cellJ++) {
				revCycle(i+cellI, j+cellJ);
			}
		}
	}

	revCycle(r, c);
}
function getExplosionCounter(i, j) {
	let count =0;
	for (let neighbourI =-1 ; neighbourI <1; neighbourI++) {
		for (let neighbourJ = -1; neighbourJ < 1; neighbourJ++) {
			let newNeighbourI = i + neighbourI;
			let newNeighbourJ = j + neighbourJ;
			if(newNeighbourI >= mainRows || newNeighbourJ >= mainColumns || newNeighbourI < 0 || newNeighbourJ < 0) {
				continue;
			}
			let newCell = $('.column.hidden[data-row='+newNeighbourI+'][data-col='+newNeighbourJ+']');
			if(newCell.hasClass('bomb')) {
				count++;
			}
		}
	}
	return count;
}
function gameStatus(status) {
	let msg = null;
	if(status) {
		msg = "Congratulations, You've Won";
	} else {
		msg = "Explosion, You're Dead"
	}
	alert(msg);
	$('.column.hidden').removeClass('.hidden');
	startGame();
}
 
 function startGame() {
	 getGameBoard(10, 10);
 }

 startGame();