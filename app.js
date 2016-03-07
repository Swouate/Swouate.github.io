//Application MVC

var Model = function () {

    var nbTry = 0;
    var maxTry = 9;
    var word = 'REMPORTER';
    var playerWord;
    var currentWord = new Array();

    this.getNbTry = function () {
        return nbTry;
    }

    this.getWord = function () {
        return word;
    }

    this.getWordArray = function () {
        return word.split('');
    }

    this.getPlayerWordArray = function () {
        return playerWord.split('');
    }

    this.getCurrentWord = function () {
        return currentWord;
    }

    this.setCurrentWord = function (word) {
        currentWord = word;
    }

    this.setPlayerWord = function (wordPlayer) {
        playerWord = wordPlayer.toUpperCase();
    }

    this.incrNbTry = function () {
        nbTry++;
    }

    this.isGameFinished = function () {
        if (this.getNbTry() == maxTry) {
            return 1;
        } else {
            if (this.getWord() == playerWord) return 2;
            return 0;
        }
    }

    return this;
};

var View = function () {

    var buttonValid;
    var x;
    var input;

    this.generateComponent = function () {
        var body = document.getElementsByTagName("body")[0];

        var table = document.createElement("table");
        table.setAttribute("class", "span5 center-table")
        var tablebody = document.createElement("tbody");

        for (var j = 0; j < 10; j++) {
            var row = document.createElement("tr");

            for (var i = 0; i < 9; i++) {
                cell = document.createElement("td");
                row.appendChild(cell);
            }
            tablebody.appendChild(row);
        }
        table.appendChild(tablebody);
        x = table.rows;
        body.appendChild(table);

        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "inputid");
        input.setAttribute("maxlength", "9");
        input.setAttribute("class", "col-2 col-xs-offset-3 col-2 col-sm-offset-4 col-2 col-md-offset-5 col-lg-offset-5")
        body.appendChild(input);

        buttonValid = document.createElement("button");
        buttonValid.appendChild(document.createTextNode("Valider"));
        buttonValid.setAttribute("class", "btn btn-warning");
        body.appendChild(buttonValid);
    }

    this.attachEvent = function (callback) {
        buttonValid.addEventListener('click', callback);

        /* document.getElementById('inputid').onkeypress = function (e) {
             if (("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ").indexOf(String.fromCharCode(e.keyCode)) === -1) {
                 e.preventDefault();
                 return false;
             }
         }*/
    }

    this.clearTableLine = function (position) {
        var i;
        for (i = 0; i < 9; i++) {
            x[position].cells[i].style.backgroundColor = "#4169E1";
        }
    }



    this.updateTablePlay = function (position, mot, arrayFindWord, arrayPlayerWord, currentWord) {
        var i;
        this.clearTableLine(position);
        for (i = 0; i < 9; i++) {
            x[position].cells[i].innerHTML = "<p>" + arrayPlayerWord[i] + "</p>";
            if (arrayFindWord[i] == arrayPlayerWord[i]) {
                x[position].cells[i].style.backgroundColor = "red";
                currentWord[i] = arrayFindWord[i];

            } else {
                if (mot.indexOf(arrayPlayerWord[i]) > -1) {
                    x[position].cells[i].style.backgroundColor = "orange";
                } else {}
            }
        }
        return currentWord;
    }

    this.updateTableNext = function (position, mot, arrayFindWord, arrayPlayerWord) {
        var i;
        //var currentword = new Array;
        for (i = 0; i < 9; i++) {
            x[position].cells[i].innerHTML = "<p>" + arrayPlayerWord[i] + "</p>";
            if (arrayFindWord[i] == arrayPlayerWord[i]) {
                x[position].cells[i].style.backgroundColor = "red";

            } else {
                if (mot.indexOf(arrayPlayerWord[i]) > -1) {
                    x[position].cells[i].style.backgroundColor = "orange";
                }
            }
        }
    }

    this.getPlayerWord = function () {
        var mot = input.value;
        while (mot.length != 9) {
            mot += ' ';
        }
        input.value = '';
        return mot;
    }

    this.getInputWithoutModification = function () {
        return input.value;
    }

    return this;
};

var Logic = function () {

    var model, view;

    var initialize = function () {
        model = new Model();
        view = new View();

        var currentArray = new Array();
        for (var i = 0; i < 9; i++) {
            if (i == 0) currentArray.push(model.getWordArray()[i]);
            else currentArray.push(' ');
        }
        model.setCurrentWord(currentArray);

        view.generateComponent();

        view.updateTableNext(0, model.getWord(), model.getWordArray(), model.getCurrentWord());
        view.attachEvent(play);
    };

    var updateView = function (word) {
        model.setCurrentWord(view.updateTablePlay(model.getNbTry(), model.getWord(), model.getWordArray(), word, model.getCurrentWord()));
        if (model.isGameFinished() == 0) {
            view.updateTableNext(model.getNbTry() + 1, model.getWord(), model.getWordArray(), model.getCurrentWord());
        } else {
            if (model.isGameFinished() == 1) {
                if (!alert('Vous avez perdu!')) {
                    window.location.reload();
                }

            }
            if (model.isGameFinished() == 2) {
                if (!alert('Vous avez trouvé le mot !')) {
                    window.location.reload();
                }
            }

        }
    };

    var play = function (ev) {
        if (view.getInputWithoutModification() != '') {
            model.setPlayerWord(view.getPlayerWord());
            updateView(model.getPlayerWordArray());
            model.incrNbTry();
        }
    };

    initialize();
};


new Logic();