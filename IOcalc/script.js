function calculateProfit() {
    const initialValue = parseFloat(document.getElementById('initial-value').value);
    const returns = parseFloat(document.getElementById('returns').value);
    
    if (isNaN(initialValue) || isNaN(returns)) {
        document.getElementById('result').innerText = 'Please enter valid numbers.';
        return;
    }

    const cumulativeProfit = initialValue * (1 + returns / 100);
    document.getElementById('result').innerText = `Cumulative Profit: $${cumulativeProfit.toFixed(2)}`;
}
