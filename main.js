'use strict';

const START_EDITING = 'action1';
const STOP_EDITING = 'action2';
const EDIT = 'action3';

const initialState = {
    items: ['Apron', 'Belt', 'Cardigan', 'Dress', 'Earrings', 'Fur coat', 'Gloves', 'Hat'],
    selected: -1
}

function startEditing(id) {
    return {
        type: START_EDITING,
        id
    }
};

function stopEditing() {
    return {
        type: STOP_EDITING
    }
};

function edit(name) {
    return {
        type: EDIT,
        name
    }
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case START_EDITING:
            return {
                ...state,
                selected: action.id
            }

        case STOP_EDITING:
            return {
                ...state,
                selected: -1
            }

        case EDIT:
            let editedArray = [...state.items];
            if (action.name === '') {
                editedArray.splice(state.selected, 1);
            }
            else {
                editedArray[state.selected] = action.name;
            }

            return {
                ...state,
                items: editedArray,
                selected: -1,
            }
        default:
            return state;
    }
}

const store = Redux.createStore(reducer);

function render() {

    const state = store.getState();
    const list = document.querySelector('.list');
    list.innerHTML = '';

    for (const item of state.items) {
        const listItem = document.createElement('LI');

        if (state.items.indexOf(item) !== state.selected) {

            const editButton = document.createElement('BUTTON');
            editButton.innerText = 'Edit';

            listItem.innerText = item;
            listItem.append(editButton);

            editButton.addEventListener('click', () => {
                store.dispatch(startEditing(state.items.indexOf(item)));
            });

        } else {

            const form = document.createElement('FORM');
            const input = document.createElement('INPUT');

            input.value = item;
            input.setAttribute('autofocus', '');

            form.append(input);
            listItem.append(form);

            input.addEventListener('blur', (event) => {
                store.dispatch(stopEditing());
            });

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                store.dispatch(edit(input.value));
            });
        }

        list.append(listItem);
    }
}

store.subscribe(() => {
    render();
});

render();