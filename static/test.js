
var scores = [2, 5, 3, 1, 4];
var countries = ["Canada", "poop", "Sweden", "France", "China"];
console.log(countries)


var temp;

for (var i = 0; i < scores.length; i++) {
    for (var j = i + 1; j < scores.length; j++) {
        if (scores[i] < scores[j]) {
            temp = scores[i];
            scores[i] = scores[j];
            scores[j] = temp;

            temp = countries[i];
            countries[i] = countries[j];
            countries[j] = temp;
        }
    }
}


console.log(countries)