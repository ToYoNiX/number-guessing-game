function gameEnd(form, guessed) {
    form.innerHTML = `
        <h2>Congratulations!</h2>
        <p>The number you guessed is ${guessed}!</p>
        <button class="btn btn-warning mt-3" onclick="location.reload()">Play Again</button>
    `;
}

function gameStart(form, left, right, prev) {
    let mid = Math.floor(left + (right - left) / 2);

    if (mid === prev) {
        form.innerHTML = `
            <h2>Out of Range!</h2>
            <button class="btn btn-warning mt-3" onclick="location.reload()">Play Again</button>
        `;
        return;
    }

    form.innerHTML = `
        <p>Is the number you guessed ${mid}?</p>
        <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary" id="larger">Larger</button>
            <button class="btn btn-primary" id="smaller">Smaller</button>
            <button class="btn btn-success" id="equal">Equal</button>
        </div>
    `;

    form.onclick = function (event) {
        let id = event.target.id;
        if (id === "larger") {
            gameStart(form, mid + 1, right, mid);
        } else if (id === "smaller") {
            gameStart(form, left, mid - 1, mid);
        } else if (id === "equal") {
            gameEnd(form, mid, mid);
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('click', function (event) {
        let id = event.target.id;
        let form = document.querySelector('.game-container');

        if (id) {
            if (id === "1-100") {
                gameStart(form, 1, 100);
            } else if (id === "1-1000") {
                gameStart(form, 1, 1000);
            } else if (id === "1-10000") {
                gameStart(form, 1, 10000);
            }
        }

        event.preventDefault();
    });
});