// Storage Class
// static - methods
class Storage {
  // Get calorieLimit from local storage
  // Under "calorieLimit" name
  static getCaloriesLimit(defaultLimit = 2000) {
    let calorieLimit;
    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem('calorieLimit');
    }
    return calorieLimit;
  }
  // Set Calorie limit
  static setCalorieLimit(calorieLimit) {
    localStorage.setItem('calorieLimit', calorieLimit);
  }
  //  Get total calories
  static getTotalCalories(calories) {
    let totalCalories;
    if (localStorage.getItem('totalCalories') === null) {
      totalCalories = calories;
    } else {
      totalCalories = +localStorage.getItem('totalCalories');
    }
    return totalCalories;
  }
  // Update total calories for each added meal/workout;
  static updateTotalCalories(calories) {
    localStorage.setItem('totalCalories', calories);
  }
  //   Get meals
  static getMeals() {
    let meals;
    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;
  }
  // Save meals to local storage
  static saveMeal(meal) {
    const meals = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }
  //   Remove meal
  static removeMeal(id) {
    // If id's match, remove item at the index;
    const meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });
    // Reinsert array in local storage without removed item;
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  //   Get workouts
  static getWorkouts() {
    let workouts;
    if (localStorage.getItem('workouts') === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }
    return workouts;
  }

  // Save workouts to local storage
  static saveWorkout(workout) {
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
  //   Remove workout
  static removeWorkout(id) {
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });
    // Reinsert array in local storage without removed item;
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
  //   Cler all
  static clearAll() {
    // Individually done so we can keep <calorie limit>
    localStorage.removeItem('totalCalories');
    localStorage.removeItem('meals');
    localStorage.removeItem('workouts');

    // This can be used to clear all
    // localStorage.clear();
  }
}

export default Storage;
