function updateYearsFromInput() {
    const yearsInput = document.getElementById('years-input');
    const yearsSlider = document.getElementById('years-slider');
    yearsSlider.value = yearsInput.value;
}

function updateYearsFromSlider() {
    const yearsInput = document.getElementById('years-input');
    const yearsSlider = document.getElementById('years-slider');
    yearsInput.value = yearsSlider.value;
}

function calculateProfit() {
    const initialValue = parseFloat(document.getElementById('initial-value').value);
    const cumValue = parseFloat(document.getElementById('cumulative').value);
    const years = parseFloat(document.getElementById('years-input').value);
    const returns = parseFloat(document.getElementById('returns').value);
    const retp = returns / 100 + 1;

    if (isNaN(initialValue) || isNaN(cumValue) || isNaN(years) || isNaN(returns)) {
        document.getElementById('result').innerText = 'Please enter valid numbers.';
        return;
    }

    if (retp === 0) {
        document.getElementById('result').innerText = 'Return rate must not be -1.';
        return;
    }

    const cumulativeProfit = initialValue * retp ** years + cumValue * (1 - retp ** (years - 1)) / (1 - retp);
    document.getElementById('result').innerText = `Cumulative Profit: ${cumulativeProfit.toFixed(2)}`;
}
