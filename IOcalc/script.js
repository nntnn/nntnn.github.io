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
    const infla = parseFloat(document.getElementById('inflation_ratio').value);
    const retp = (returns - infla) / 100 + 1;


    if (isNaN(initialValue) || isNaN(cumValue) || isNaN(years) || isNaN(returns)) {
        document.getElementById('result').innerText = 'Please enter valid numbers.';
        return;
    }

    if (retp === 0) {
        document.getElementById('result').innerText = 'Return rate must not be -1.';
        return;
    }

    const cumulativeProfit = initialValue * retp ** years + cumValue * (1 - retp ** (years)) / (1 - retp);
    document.getElementById('result').innerText = `Final balance after ${years} passed : ${cumulativeProfit.toFixed(2)}`;

    // graph
    const labels = [];
    const principalData = [];
    const interestData = [];
    const totalVolumeData = [];

    for (let i = 0; i <= years; i++) {
        labels.push(`${i}`);
        const principal = initialValue + i*cumValue;
        const interest = initialValue*(retp**i-1) + cumValue*((1-retp**i)/(1-retp)-i);
        const totalVolume = principal + interest
        principalData.push(principal.toFixed(2));
        interestData.push(interest.toFixed(2));
        totalVolumeData.push(totalVolume.toFixed(2));
    }

    if (profitChart) {
        profitChart.destroy();
    }

    const ctx = document.getElementById('profitChart').getContext('2d');
    profitChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Principal',
                    data: principalData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true
                },
                {
                    label: 'Interest',
                    data: interestData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true
                },
                {
                    label: 'Net balance',
                    data: totalVolumeData,
                    borderColor: 'rgba(132, 220, 99, 1)',
                    backgroundColor: 'rgba(132, 220, 99, 0.2)',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'duration'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });


}
