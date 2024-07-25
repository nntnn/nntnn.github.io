let profitChart;

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

    // graph
    const labels = [];
    const data = [];
    for (let i = 0; i <= years; i++) {
        labels.push(`Year ${i}`);
        const profit = initialValue * retp ** i + cumValue * (1 - retp ** i) / (1 - retp);
        data.push(profit.toFixed(2));
    }

    if (profitChart) {
        profitChart.destroy();
    }

    const ctx = document.getElementById('profitChart').getContext('2d');
    profitChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cumulative Profit',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Cumulative Profit'
                    }
                }
            }
        }
    });

}
