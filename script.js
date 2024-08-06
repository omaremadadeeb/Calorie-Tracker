document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calorie-form');
    const recommendationsContent = document.getElementById('recommendations-content');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Gather form data
        const height = parseFloat(document.getElementById('height').value);
        const age = parseFloat(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const goal = document.getElementById('goal').value;
        const activity = document.getElementById('activity').value;
        const diet = document.getElementById('diet').value;

        // Calculate calories needed
        const caloriesNeeded = calculateCalories(weight, height, age, activity, goal);

        // Show results
        recommendationsContent.innerHTML = `
            <h2>نتائج حساب السعرات الحرارية</h2>
            <p>السعرات الحرارية التي تحتاجها: <strong>${caloriesNeeded.toFixed(0)} سعر حراري</strong></p>
            <p>استنادًا إلى نظام الرجيم المختار: ${diet}</p>
        `;

        // Redirect to results page with query parameters
        window.location.href = `results.html?weight=${weight}&height=${height}&age=${age}&goal=${goal}&activity=${activity}`;
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
