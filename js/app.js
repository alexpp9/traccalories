// Tracker
class CalorieTracker {
  constructor() {
    // Make properties private
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    // Execute here because the constructor runs immediatly when one instantiates the CalorieTracker class;
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }

  // Public methods/API
  // Adds meal to meals array - meal shall be an object;
  addMeal(meal) {
    this._meals.push(meal);
    // Update total calories by number of calories from meal;
    this._totalCalories += meal.calories;
    // To render the state of the App, after a new meal/workout's been added;
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    // Substract calories "burned";
    this._totalCalories -= workout.calories;
    // To render the state of the App, after a new meal/workout's been added;
    this._render();
  }
  // Private methods
  //   Display the total of calories (gain/loss)
  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  //   Display the limit - of calories (can be changed - later)
  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  //   Display consumed calories (eaten)
  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    caloriesConsumedEl.innerHTML = consumed;
  }
  //   Display burned calories (workout)
  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurnedEl.innerHTML = burned;
  }

  // Display remaining calories (goal)
  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;
  }
  //   Renders state
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }
}

// Meal Class
class Meal {
  constructor(name, calories) {
    // Create random id
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}
// Workout Class
class Workout {
  constructor(name, calories) {
    // Create random id
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

// Initialize tracker
const tracker = new CalorieTracker();
const breakfast = new Meal('Breakfast', 691);
tracker.addMeal(breakfast);

const run = new Workout('Morning run', 331);
tracker.addWorkout(run);

console.log(tracker._meals[0]);
console.log(tracker._workouts[0]);
console.log(tracker._totalCalories);
