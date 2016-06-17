function GameOfLifeCntl($scope, $http, $resource) {

    $scope.newGame = function() {
        $scope.history = [];
        $scope.board = init($scope.height, $scope.width);
    };
    function _initilize() {
        $scope.height = 10;
        $scope.width = 10;
        $scope.newGame();
    }

    function init(height, width) {
        var board = [];
        for (var h = 0; h < height; h++) {
            var row = [];
            for (var w = 0; w < width; w++) {
                row.push(false);
            }
            board.push(row);
        }
        return board;
    }

    $scope.defineModel = function (type) {
        if(type === 'blinker'){
            $scope.board = init($scope.height, $scope.width);
            var count = 3;           
         
                for (var j = 0 ; j < $scope.width, count > 0; j++) {
                    $scope.board[1][j] = true;
                    $scope.$apply();
                    count--;
                }
            
                console.log($scope.board);

        } else if (type === 'beacon') {
            $scope.board = init($scope.height, $scope.width);
            if ($scope.height > 5 && $scope.width > 5) {
                $scope.board[1][0] = true;
                $scope.board[1][1] = true;
                $scope.board[2][0] = true;
                $scope.board[2][1] = true;

                $scope.board[3][2] = true;
                $scope.board[3][3] = true;
                $scope.board[4][2] = true;
                $scope.board[4][3] = true;
            }

        } else if (type === 'toad') {
            $scope.board = init($scope.height, $scope.width);
            if ($scope.height > 3 && $scope.width > 3) {
                var row1 = 3, row2 = 3;
                for (var i = 1; i < $scope.width, row2 > 0; i++) {
                    $scope.board[1][i] = true;
                    row2--;
                }
                for (var j = 0 ; j < $scope.height, row1 > 0; j++) {
                    $scope.board[2][j] = true;
                    $scope.$apply();
                    row1--;
                }
            } else {
                alert('height and width of grid should be more than 3');
            }
        }
        else if (type === 'glider') {
            $scope.board = init($scope.height, $scope.width);
            $scope.board[2][0] = true;
            $scope.board[2][1] = true;
            $scope.board[2][2] = true;

            $scope.board[0][1] = true;
            $scope.board[1][2] = true;
        }
        else if (type === 'column') {
            if ($scope.height < 16 || $scope.width < 8) {
                $scope.height = 16;
                $scope.width = 8;
            }
            $scope.board = init($scope.height, $scope.width);

            $scope.board[2][3] = true;
            $scope.board[2][4] = true;
            $scope.board[2][5] = true;

            $scope.board[3][4] = true;
            $scope.board[4][4] = true;

            $scope.board[5][3] = true;
            $scope.board[5][4] = true;
            $scope.board[5][5] = true;

            $scope.board[7][3] = true;
            $scope.board[7][4] = true;
            $scope.board[7][5] = true;

            $scope.board[8][3] = true;
            $scope.board[8][4] = true;
            $scope.board[8][5] = true;

            
            $scope.board[10][3] = true;
            $scope.board[10][4] = true;
            $scope.board[10][5] = true;

            $scope.board[11][4] = true;
            $scope.board[12][4] = true;

            $scope.board[13][3] = true;
            $scope.board[13][4] = true;
            $scope.board[13][5] = true;
        }
    }

    function updateModel(height, width, model) {
        $http.post('http://localhost:2640/updatemodel', {
                "gridHeight": height,
                "gridWidth": width,
                "board": model
            })
            .success(function(response) {
                console.log('got response');
                 $scope.board = response.board;
                  // $scope.$apply();
            });
    }

    $scope.autoUpdate = function () {
        console.log($scope.autoUpdateValue);
        if ($scope.autoUpdateValue) {
            $scope.interval = setInterval(function () {
             updateModel($scope.height, $scope.width, $scope.board);
            },
           1000)
        } else {
            clearInterval($scope.interval);
        }
    }
    $scope.update = function() {
        updateModel($scope.height, $scope.width, $scope.board);
    }    

    $scope.toggle = function(row, cell) {
        $scope.history = []; // Reset history as it is no longer accurate       
        $scope.board[row][cell] = !$scope.board[row][cell];
    };

    $scope.cellClass = function(row, cell) {
        if (willDie($scope.board, row, cell)) {
            return "die";
        }
        if (newCell($scope.board, row, cell)) {
            return "new";
        }
        return "";
    };   

    function willLive(board, row, cell) {
        return cellAt(board, row, cell) && neighbours(board, row, cell) >= 2 && neighbours(board, row, cell) <= 3;
    }

    function willDie(board, row, cell) {
        return cellAt(board, row, cell) && (neighbours(board, row, cell) < 2 || neighbours(board, row, cell) > 3);
    }

    function newCell(board, row, cell) {
        return !cellAt(board, row, cell) && neighbours(board, row, cell) == 3;
    }

    function neighbours(board, row, cell) {
        var n = 0;
        n += cellAt(board, row - 1, cell - 1) ? 1 : 0;
        n += cellAt(board, row - 1, cell + 0) ? 1 : 0;
        n += cellAt(board, row - 1, cell + 1) ? 1 : 0;
        n += cellAt(board, row + 0, cell - 1) ? 1 : 0;
        n += cellAt(board, row + 0, cell + 1) ? 1 : 0;
        n += cellAt(board, row + 1, cell - 1) ? 1 : 0;
        n += cellAt(board, row + 1, cell + 0) ? 1 : 0;
        n += cellAt(board, row + 1, cell + 1) ? 1 : 0;
        return n;
    }

    function cellAt(board, row, cell) {
        return (row >= 0 && row < board.length &&
            cell >= 0 && cell < board[row].length &&
            board[row][cell]);
    }
    _initilize();
}
