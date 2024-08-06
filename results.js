document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const weight = parseFloat(urlParams.get('weight'));
    const height = parseFloat(urlParams.get('height'));
    const age = parseFloat(urlParams.get('age'));
    const goal = urlParams.get('goal');
    const activity = urlParams.get('activity');

    const caloriesNeeded = calculateCalories(weight, height, age, activity, goal);

    // Update the calories needed on the page
    document.getElementById('calories-needed').innerHTML = `السعرات الحرارية التي تحتاجها: <strong>${caloriesNeeded.toFixed(0)} سعر حراري</strong>`;

    // Chart.js setup
    const ctx = document.getElementById('calories-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['الوقت', 'أول', 'ثاني', 'ثالث', 'رابع'], // Replace with actual labels
            datasets: [{
                label: 'السعرات الحرارية',
                data: [0, 50, 100, 75, 100], // Replace with actual data
                borderColor: '#007BFF',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    display: true
                },
                y: {
                    display: true
                }
            }
        }
    });

    function calculateCalories(weight, height, age, activityLevel, goal) {
        let bmr;
        // Basal Metabolic Rate (BMR) Calculation using the Mifflin-St Jeor Equation
        if (true) { // Assuming male for simplicity, update based on gender selection
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        let tdee;
        switch(activityLevel) {
            case 'none':
                tdee = bmr * 1.2;
                break;
            case 'gym':
                tdee = bmr * 1.55;
                break;
            case 'daily':
                tdee = bmr * 1.725;
                break;
            default:
                tdee = bmr * 1.2;
        }
        if (goal === 'lose') {
            return tdee - 500;
        } else if (goal === 'gain') {
            return tdee + 500;
        } else {
            return tdee;
        }
    }
});
