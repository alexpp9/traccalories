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
    // Add new meal To DOM
    this._displayNewMeal(meal);
    // To render the state of the App, after a new meal/workout's been added;
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    // Substract calories "burned";
    this._totalCalories -= workout.calories;
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
      // Removes the meal from the Array;
      this._meals.splice(index, 1);
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
      // Removes the workout from the Array;
      this._workouts.splice(index, 1);
      this._render();
    }
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
class App {
  constructor() {
    this._tracker = new CalorieTracker();

    // Event listeners
    // When calling <this> such as below, it'll refer to the element from HTML, but we want it to refer to the instance of the APP calling the constructor;
    // For that, we need to <bind>
    // Add new meal/workout
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));
    //   remove item meal/workout -> event delegation;
    document
      .getElementById('meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal'));
    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));
    //   Filter item
    // keyup => filter as typing
    document
      .getElementById('filter-meals')
      .addEventListener('keyup', this._filterItem.bind(this, 'meal'));
    document
      .getElementById('filter-workouts')
      .addEventListener('keyup', this._filterItem.bind(this, 'workout'));
  }

  // New meal
  _newItem(type, e) {
    e.preventDefault();

    // Get fields
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    // Validate inputs
    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }
    // The <+> is there to make it number from string;
    if (type === 'meal') {
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
    }
    if (type === 'workout') {
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(workout);
    }

    name.value = '';
    calories.value = '';

    // Retract form after submit
    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }

  // Remove item
  _removeItem(type, e) {
    // Targets everything inside the card elements with the class either .delete or fa-xmark;
    // That's what will trigger the deletion;
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      if (confirm('Are you sure?')) {
        // get closesc element with .card class from the target
        const id = e.target.closest('.card').getAttribute('data-id');

        // Decide what to delete
        type === 'meal'
          ? // Remove from dashboard
            this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);

        // Remove from DOM
        e.target.closest('.card').remove();
      }
    }
  }
  //   Filter items
  _filterItem(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      // The item e do forEach over is the card;
      // We want the name property which is a child of a child
      const name = item.firstElementChild.firstElementChild.textContent;
      //   If it returns something, display it, else hide it;
      if (name.toLocaleLowerCase().indexOf(text) !== -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
}

// Initialize App
const app = new App();
