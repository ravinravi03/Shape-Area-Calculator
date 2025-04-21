const fieldsDiv = document.getElementById('fields');
const calculateButton = document.getElementById('calculate');
const clearButton = document.getElementById('clearResult');
const shapeButtons = document.querySelectorAll('.shape-btn');
const areaContainer = document.getElementById('area');

//The default shape at startup is a circle.
let selectedShape = 'circle';

// ------ Event Listeners ------ //
document.addEventListener('DOMContentLoaded', () => {
    updateFields(selectedShape);

    const circleButton = document.querySelector('[data-shape="circle"]');
    circleButton.classList.add('bg-purple-500', 'text-white');
});

calculateButton.addEventListener("click", function(){
    sendPrompt();
})

clearButton.addEventListener('click', function() {
    const areaContainer = document.getElementById('area');
    areaContainer.innerHTML = '';
    document.title = 'Shape Area Calculator';;
});

shapeButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedShape = button.getAttribute('data-shape');
        updateFields(selectedShape);

        shapeButtons.forEach(btn => btn.classList.remove('bg-purple-500', 'text-white','shadow-lg'));
        button.classList.add('bg-purple-500', 'text-white', 'shadow-lg');
    });
});
// ------------------------------- //

// ---------- Functions ---------- //

/**
 * This function updates the HTML content of the fieldsDiv based on the selected shape.
 * @param {*} shape - The shape selected by the user, can be either circle, triangle or rectangle.
 * @returns - None
 */
function updateFields(shape) {
    let html = '';

    if (shape === 'circle') {
        html = `
            <label for="radius" class="p-2 block font-medium mb-1">Radius:</label>
            <input type="number" id="radius" name="radius" class="p-2 border rounded w-full mb-4 bg-purple-200">
        `;
    } else if (shape === 'triangle') {
        html = `
            <label for="base" class="p-2 block font-medium mb-1">Base:</label>
            <input type="number" id="base" name="base" class="p-2 border rounded w-full mb-4 bg-purple-200">
            <label for="height" class="p-2 block font-medium mb-1">Height:</label>
            <input type="number" id="height" name="height" class="p-2 border rounded w-full mb-4 bg-purple-200">
        `;
    } else if (shape === 'rectangle') {
        html = `
            <label for="width" class="p-2 block font-medium mb-1">Width:</label>
            <input type="number" id="width" name="width" class="p-2 border rounded w-full mb-4 bg-purple-200">
            <label for="height" class="p-2 block font-medium mb-1">Height:</label>
            <input type="number" id="height" name="height" class="p-2 border rounded w-full mb-4 bg-purple-200">
        `;
    }

    fieldsDiv.innerHTML = html;
}

/**
 * This sends the selected shape and its dimensions to /calculate to calculate the area of the shape.
 * @returns - None
 */
function sendPrompt(){
    let output = {};
    let isValidPrompt = true;

    if(selectedShape === 'circle'){
        const radiusValid = validateField('radius');
        if (radiusValid) {
            const radius = document.getElementById('radius').value;
            output = {
                'type': selectedShape,
                'radius': parseFloat(radius)
            };
        } else {
            isValidPrompt = false;
        }
    }else if (selectedShape === 'triangle'){
        const baseValid = validateField('base');
        const heightValid = validateField('height');
        if (baseValid && heightValid) {
            const base = document.getElementById('base').value;
            const height = document.getElementById('height').value;
            output = {
                'type': selectedShape,
                'base': parseFloat(base),
                'height': parseFloat(height)
            };
        } else {
            isValidPrompt = false;
        }
    }else if (selectedShape === 'rectangle'){
        const widthValid = validateField('width');
        const heightValid = validateField('height');
        if (widthValid && heightValid) {
            const width = document.getElementById('width').value;
            const height = document.getElementById('height').value;
            output = {
                'type': selectedShape,
                'width': parseFloat(width),
                'height': parseFloat(height)
            };
        } else {
            isValid = false;
        }
    }

    if(isValidPrompt){
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(output)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
            setResultMessage(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }else{
        alert("Please fill in all the fields with non-zero values");
    }
}

/**
 * This function ensures that the input parameters are valid and non-zero.
 * @param {*} fieldId - the id of the field in the HTML body to be validated
 * @returns - a boolean that indicates whether the value is valid or not
 */
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value;

    if (!value || parseFloat(value) <= 0) {
        field.classList.remove('bg-purple-200');
        field.classList.add('bg-red-200');
        return false;
    } else {
        field.classList.remove('bg-red-200');
        field.classList.add('bg-purple-200');
        return true;
    }
}

/**
 * This function appends to the text in the results container with result of the current prompt.
 * @param {*} data - the data returned from the /calculate endpoint
 * @returns - None 
 */
function setResultMessage(data) {
    let message = '';
    let pageTitle = 'Shape Area Calculator';

    if (data.area !== undefined) {
        if (data.type === 'circle') {
            message = `The area of a circle with a radius of ${data.radius} : ${data.area}`;
            pageTitle = `Circle Area: ${data.area}`;
        } else if (data.type === 'triangle') {
            message = `The area of a triangle with a base of ${data.base} and height of ${data.height} : ${data.area}`;
            pageTitle = `Triangle Area: ${data.area}`;
        } else if (data.type === 'rectangle') {
            message = `The area of a rectangle with a width of ${data.width} and height of ${data.height} : ${data.area}`;
            pageTitle = `Rectangle Area: ${data.area}`;
        } else {
            message = 'The Area is: ' + data.area;
            pageTitle = `Area: ${data.area}`;
        }
    } else {
        message = 'Failed to calculate area.';
    }

    const newEntry = document.createElement('p');
    newEntry.textContent = message;
    areaContainer.prepend(newEntry);

    areaContainer.scrollTop = areaContainer.scrollHeight;

    document.title = pageTitle;
}

// ------------------------------ //
