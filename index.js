JS:
function showResults() {
    const options = document.getElementsByName('poll');
    let selected = "";

    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selected = options[i].value;
        }
    }

    const resultText = {
        bengals: "You voted: Bengals win this trade!",
        giants: "You voted: Giants win this trade!",
        even: "You voted: It's an even trade!"
    };

    document.getElementById("poll-result").innerText =
        resultText[selected] || "Please select an option before voting.";
}
