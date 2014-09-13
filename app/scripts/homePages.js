angular.module('app.homePages', [])

  .controller('HomeCtrl', ['$scope', function($scope) {

    $scope.activeCell = function(x, y) {
      return x == $scope.current.x && y == $scope.current.y;
    };

    $scope.east = {
      name: 'east',
      arrow: 'glyphicon-chevron-right',
      update: function(position) {
        position.x += 1;
      },
      next: null,
      prev: null
    };

    $scope.north = {
      name: 'north',
      arrow: 'glyphicon-chevron-up',
      update: function(position) {
        position.y += 1;
      },
      next: null,
      prev: null
    };

    $scope.west = {
      name: 'west',
      arrow: 'glyphicon-chevron-left',
      update: function(position) {
        position.x -= 1;
      },
      next: null,
      prev: null
    };

    $scope.south = {
      name: 'south',
      arrow: 'glyphicon-chevron-down',
      update: function(position) {
        position.y -= 1;
      },
      next: null,
      prev: null
    };

    $scope.north.next = $scope.west;
    $scope.north.prev = $scope.east;
    $scope.west.next = $scope.south;
    $scope.west.prev = $scope.north;
    $scope.south.next = $scope.east;
    $scope.south.prev = $scope.west;
    $scope.east.next = $scope.north;
    $scope.east.prev = $scope.south;

    $scope.current = {
      x: 0,
      y: 0,
      direction: $scope.north
    };

    $scope.control = function(command) {
      if(command == 'L') {
        $scope.current.direction = $scope.current.direction.next;
      } else if(command == 'R') {
        $scope.current.direction = $scope.current.direction.prev;
      } else if(command == 'M') {
        $scope.current.direction.update($scope.current);
      }
    }
  }])