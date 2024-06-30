import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './Item';

import './css/bootstrap.css';
import './css/style.css';

// Initialize
class App {
  constructor() {
    this._tracker = new CalorieTracker();
    // Load event listeners
    this._loadEventListeners();
    //   Call loadItems
    this._tracker.loadItems();
  }
  //   Load event listneers
  _loadEventListeners() {
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
    // Reset
    document
      .getElementById('reset')
      .addEventListener('click', this._reset.bind(this));
    // Change Limit
    document
      .getElementById('limit-form')
      .addEventListener('submit', this._setLimit.bind(this));
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
    const bsCollapse = new Collapse(collapseItem, {
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

  //   Reset
  _reset() {
    this._tracker.reset(); // This will deal with dashboard calories
    // DOM reset
    document.getElementById('meal-items').innerHTML = '';
    document.getElementById('workout-items').innerHTML = '';
    // Clear filter input value
    document.getElementById('filter-meals').value = '';
    document.getElementById('filter-workouts').value = '';
  }

  //   Set limit
  _setLimit(e) {
    e.preventDefault();

    const limit = document.getElementById('limit');
    if (limit.value === '') {
      alert('Please add a limit');
      return;
    }
    this._tracker.setLimit(+limit.value);
    limit.value = '';
    // Close bootstrap modal
    const modalEl = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  }
}

// Initialize App
const app = new App();
