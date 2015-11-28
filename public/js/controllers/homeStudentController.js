function homeStudentController($scope) {

    //MAP
    L.mapbox.accessToken = 'pk.eyJ1IjoianVsaWVucjExNCIsImEiOiJjaWhobXZ2eHYwMGFxdTJtNDhuNW5xMjBxIn0.KkUadZFGBKA1ENyPLDTxjg';
    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([40, -74.50], 9);
}