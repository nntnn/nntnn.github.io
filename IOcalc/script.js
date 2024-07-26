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
    const r_g  = parseFloat(document.getElementById('d_grow').value) / 100 + 1;
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

    // const cumulativeProfit = initialValue * retp ** years + cumValue * (1 - retp ** (years)) / (1 - retp);
    // const cumulativeProfit = initialValue * retp ** years + cumValue * retp**(years-1)*(r_g**(years+1)-retp**(years+1) )/(r_g-retp);
    let cumulativeProfit = initialValue * retp ** years;
    if (retp == r_g) {
        cumulativeProfit += years * cumValue * retp**(years-1);
    } else {
        cumulativeProfit += cumValue * (retp**years - r_g**years)/(retp - r_g);
    }
    document.getElementById('result').innerText = `Final balance after ${years} passed : ${cumulativeProfit.toFixed(2)}`;
    // document.getElementById('principal').innerText = `Principal ${years} passed : ${cumulativeProfit.toFixed(2)}`;

    // graph
    const labels = [];
    const principalData = [];
    const interestData = [];
    const totalVolumeData = [];

    for (let i = 0; i <= years; i++) {
        labels.push(`${i}`);
        let principal = initialValue;
        if  (r_g == 1.0) {
            principal = principal + cumValue * i;
        } else {
            principal = principal + cumValue * (1-r_g**i) / (1-r_g);
        }; 

        let totalVolume = initialValue * retp ** i;
        if (retp == r_g) {
             totalVolume += cumValue * i * retp**(i-1);
        } else {
            totalVolume += cumValue * (retp**i-r_g**i)/(retp-r_g);
        }
        const interest = totalVolume - principal;
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
