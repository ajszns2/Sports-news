let pollVotes = {
    bengals: 0,
    giants: 0,
    even: 0
};

// Load votes from local storage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedVotes = localStorage.getItem('pollVotes');
    if (savedVotes) {
        pollVotes = JSON.parse(savedVotes);
    }
});

function showResults() {
    const options = document.getElementsByName('poll');
    let selected = "";

    // Find which option is selected
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            selected = options[i].value;
            break;
        }
    }

    // Validate that an option was selected
    if (!selected) {
        const resultElement = document.getElementById("poll-result");
        resultElement.innerText = " Please select an option before voting.";
        resultElement.style.color = "#ff6b35";
        return;
    }

    // Increment the vote count
    pollVotes[selected]++;

    // Save to local storage
    localStorage.setItem('pollVotes', JSON.stringify(pollVotes));

    // Show result message
    const resultMessages = {
        bengals: "You voted: Bengals win this trade!",
        giants:  “You voted: Giants win this trade!",
        even: "You voted: It's an even trade!"
    };

    const resultElement = document.getElementById("poll-result");
    resultElement.innerText = resultMessages[selected];
    resultElement.style.color = "#34a853";

    // Uncheck the radio button
    document.getElementById("pollForm").reset();

    // Show and update poll statistics
    updatePollStats();
}

function updatePollStats() {
    const statsElement = document.getElementById("poll-stats");
    const totalVotes = pollVotes.bengals + pollVotes.giants + pollVotes.even;

    if (totalVotes === 0) {
        statsElement.style.display = "none";
        return;
    }

    statsElement.style.display = "block";

    // Calculate percentages
    const bengalsPercent = totalVotes > 0 ? (pollVotes.bengals / totalVotes) * 100 : 0;
    const giantsPercent = totalVotes > 0 ? (pollVotes.giants / totalVotes) * 100 : 0;
    const evenPercent = totalVotes > 0 ? (pollVotes.even / totalVotes) * 100 : 0;

    // Update vote counts
    document.getElementById("bengals-count").innerText = pollVotes.bengals;
    document.getElementById("giants-count").innerText = pollVotes.giants;
    document.getElementById("even-count").innerText = pollVotes.even;
    document.getElementById("total-votes").innerText = totalVotes;

    // Update progress bars
    document.getElementById("bengals-bar").style.width = bengalsPercent + "%";
    document.getElementById("giants-bar").style.width = giantsPercent + "%";
    document.getElementById("even-bar").style.width = evenPercent + "%";

    // Add percentage text to bars if they're large enough
    if (bengalsPercent > 15) {
        document.getElementById("bengals-bar").innerText = Math.round(bengalsPercent) + "%";
    }
    if (giantsPercent > 15) {
        document.getElementById("giants-bar").innerText = Math.round(giantsPercent) + "%";
    }
    if (evenPercent > 15) {
        document.getElementById("even-bar").innerText = Math.round(evenPercent) + "%";
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optional: Display initial poll stats if votes exist
document.addEventListener('DOMContentLoaded', () => {
    const totalVotes = pollVotes.bengals + pollVotes.giants + pollVotes.even;
    if (totalVotes > 0) {
        updatePollStats();
    }
});
