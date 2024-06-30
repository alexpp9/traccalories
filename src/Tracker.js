import Storage from './Storage';

// JS
// Tracker
class CalorieTracker {
  constructor() {
    // Make properties private
    this._calorieLimit = Storage.getCaloriesLimit();
    this._totalCalories = Storage.getTotalCalories(0);
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    // Execute here because the constructor runs immediatly when one instantiates the CalorieTracker class;
    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();

    // Add value of calorie limit from storage to form input field
    document.getElementById('limit').value = this._calorieLimit;
  }

  // Public methods/API
  // Adds meal to meals array - meal shall be an object;
  addMeal(meal) {
    this._meals.push(meal);
    // Update total calories by number of calories from meal;
    this._totalCalories += meal.calories;
    // Update storage also
    Storage.updateTotalCalories(this._totalCalories);
    // Add meal to local storage
    Storage.saveMeal(meal);
    // Add new meal To DOM
    this._displayNewMeal(meal);
    // To render the state of the App, after a new meal/workout's been added;
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    // Substract calories "burned";
    this._totalCalories -= workout.calories;
    // Update storage also
    Storage.updateTotalCalories(this._totalCalories);
    // Add workout
    Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    // To render the state of the App, after a new meal/workout's been added;
    this._render();
  }

  //   remove meal
  removeMeal(id) {
    // Gives the index of the meal that matches the id passed in;
    const index = this._meals.findIndex((meal) => meal.id === id);
    // Check if match (if -1)
    if (index !== -1) {
      const meal = this._meals[index];
      // Substracts from total calories
      this._totalCalories -= meal.calories;
      // Update storage also
      Storage.updateTotalCalories(this._totalCalories);
      // Removes the meal from the Array;
      this._meals.splice(index, 1);
      //   Remove meal
      Storage.removeMeal(id);
      this._render();
    }
  }
  //   remove workout
  removeWorkout(id) {
    // Gives the index of the meal that matches the id passed in;
    const index = this._workouts.findIndex((workout) => workout.id === id);
    // Check if match (if -1)
    if (index !== -1) {
      const workout = this._workouts[index];
      // Substracts from total calories
      this._totalCalories += workout.calories;
      // Update storage also
      Storage.updateTotalCalories(this._totalCalories);
      // Removes the workout from the Array;
      this._workouts.splice(index, 1);
      //   Remove workout from storage
      Storage.removeWorkout(id);
      this._render();
    }
  }

  //   Reset App
  reset() {
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  //   Set limit
  setLimit(calorieLimit) {
    // Set it to the one we pass through
    this._calorieLimit = calorieLimit;
    // Set to storage
    Storage.setCalorieLimit(calorieLimit);
    // Display it
    this._displayCaloriesLimit();
    // Render state
    this._render();
  }

  //   Load items from Local Storage
  loadItems() {
    // Load meals
    this._meals.forEach((meal) => {
      this._displayNewMeal(meal);
    });
    // Load workouts
    this._workouts.forEach((workout) => {
      this._displayNewWorkout(workout);
    });
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
    progressEl.setAttribute('title', `${width.toFixed(2)}%`);
  }

  //   Display new meal to DOM
  _displayNewMeal(meal) {
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    mealEl.classList.add('card', 'my-2');
    // create <id> for each meal -> delete/update
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML = `
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${meal.name}</h4>
            <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
            >
            ${meal.calories}
            </div>
            <button class="delete btn btn-danger btn-smx-2">
            <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        </div>
    `;
    mealsEl.appendChild(mealEl);
  }
  //   Display new workout to DOM
  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.classList.add('card', 'my-2');
    // create <id> for each workout -> delete/update
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `
        <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${workout.name}</h4>
            <div
            class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
            >
            ${workout.calories}
            </div>
            <button class="delete btn btn-danger btn-smx-2">
            <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        </div>
    `;
    workoutsEl.appendChild(workoutEl);
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

// Exports
export default CalorieTracker;
