angular.module('toDoList', []).service('globalServices', function() {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});