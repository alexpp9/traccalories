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
    this._displayCaloriesProgress();
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
    const progressEl = document.querySelector('#calorie-progress');
    if (remaining <= 0) {
      // Parent of parent has the bg-class
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );

      //   For the bar
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  // Display calories progress
  _displayCaloriesProgress() {
    const progressEl = document.querySelector('#calorie-progress');
    // Get the percentange of totalCalories relative to the limit;
    // To control the progress bar;
    const percentage = (this._totalCalories / this._calorieLimit) * 100;

    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
    progressEl.setAttribute('title', `${width}%`);
  }

  //   Renders state
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
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
const breakfast = new Meal('Breakfast', 1691);
const lunch = new Meal('Lunch', 550);
tracker.addMeal(breakfast);
tracker.addMeal(lunch);

const run = new Workout('Morning run', 331);
const gym = new Workout('Gym session', 1200);
tracker.addWorkout(run);
tracker.addWorkout(gym);

console.log(tracker._meals[0]);
console.log(tracker._workouts[0]);
console.log(tracker._totalCalories);
