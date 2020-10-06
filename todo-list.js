
// https://courses.wesbos.com/account/access/5e87246d9edbdf363811b51a/view/375774374

const todoForm = document.querySelector('.todo');
const list = document.querySelector('.list');

// we need an array to hold our state
let items = [];

function handleSubmit(e) {
  e.preventDefault();
  console.group('Submitted!!')
  const name = e.currentTarget.item.value;
  // If it is empty then dont submit it 
  if(!name) {
    return;
  }
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  // push the items into our state
  items.push(item);
  console.log(`There are now ${items.length} in your state`);

  // Clear the form
  e.target.reset();

  // Fire off a custom event that will tell anyone who cares that the items have been updated!
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  console.log(items);
  const html = items
    .map(
      item => `<li class="shopping-item">
      <input
          data-qa="checkItem"
          value="${item.id}"
          type= "checkbox"
          ${item.complete && 'checked'}
      >
      <span class="itemName">${item.name}</span>
      <button
        data-qa="deleteItem"
        aria-label="Remove ${item.name}"
        value="${item.id}"
        >&times;</button>
    </li>`
  )
  .join('');
  list.innerHTML = html;
}

// Create a funtion that extracts the items into localStorage (browser)
function mirrorToLocalStorage() {
  console.info('Saving items to localStorage');
  // Convert objects to string by using JSON.stringify
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info('Restoring from local storage');
  // pull the items from localStorage
  const listItems = JSON.parse(localStorage.getItem('items'));
  if (listItems.length) {
    // Take each item within an array and 'spread' it into the method .push[]
    // items.push(...listtItems);

    // other options to extract the list of array and turn it into an argument 
    items = listItems;
    // items.push(listItems[0])
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log('DELETING ITEM', id)
  //  Update our items array without this one
  items = items.filter(item => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}


function markAsComplete(id) {
  console.log('marking as complete', id);
  const itemRef = items.find(item => item = item.id === id);
  console.log(itemRef);
  itemRef.complete = !itemRef.complete
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

todoForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// We added a listener for a 'click' on a list <ul> which is in reference to the button </ul>
list.addEventListener('click', function(e) {
  // convert the value into a number
  const id = parseInt(e.target.value)

  if(e.target.matches('button')) {
    deleteItem(id);
  }
  if(e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
})


restoreFromLocalStorage();