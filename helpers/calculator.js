const calculator = (gender, age, weight, height, weeklyPhysicalActivity) => {

    let dailyCalories = 0

    switch (gender) {
        case 'male':
            dailyCalories = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)
            break;

        case 'female':
            dailyCalories = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)
            break;
    }

    switch (weeklyPhysicalActivity) {
        case 'sedentary':
            dailyCalories = dailyCalories * 1.2
            break;

        case 'lightlyActive':
            dailyCalories = dailyCalories * 1.375
            break;

        case 'moderatelyActive':
            dailyCalories = dailyCalories * 1.55
            break;

        case 'veryActive':
            dailyCalories = dailyCalories * 1.725
            break;

        case 'extremelyActive':
            dailyCalories = dailyCalories * 1.9
            break;
    }

    return dailyCalories
}

module.exports = calculator