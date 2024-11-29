// Get notes from local storage 
var notes = JSON.parse(localStorage.getItem('user_notes')) || [];

function display_Note(){   
    
    var note_title = document.getElementById('note_title');
    var note_description = document.getElementById('note_description');
    var user_display = document.getElementById('user_display');

    user_display.innerHTML = '';

    notes.forEach((ele, index) => {
    
        // Create div for box
        var display_div = document.createElement('div');
        display_div.className = 'display_box';
    
        // create div for action events
        var action_div = document.createElement('div');
        action_div.className = 'action_btn';
        
        // create i tag for edit
        var icon_edit = document.createElement('i');
        icon_edit.classList.add('fa-solid')
        icon_edit.classList.add('fa-pen-to-square')
        icon_edit.style.color = '#1D4ED8';
        
        // create i tag for delete
        var icon_delete = document.createElement('i');
        icon_delete.classList.add('fa-solid')
        icon_delete.classList.add('fa-trash')
        icon_delete.style.color = 'red';
    
        // append the icons to action div
        action_div.appendChild(icon_edit);
        action_div.appendChild(icon_delete);
        
        // append the action div to box div
        display_div.appendChild(action_div);
    
        // create the p for note title
        var note_p = document.createElement('p');
        note_p.className = 'title';
        note_p.textContent = ele.title;
        
        // create the p for note description
        var desc_p = document.createElement('p');
        desc_p.className = 'desc';
        desc_p.textContent = ele.description;
        
        // create the p for note time
        var time_p = document.createElement('p');
        var time_span = document.createElement('span');
        time_p.className = 'timing';
        time_p.textContent = `Created: ${ele.date}`;
        time_span.textContent = ele.time
        time_p.appendChild(time_span)
    
        // append all p to the box div
        display_div.appendChild(note_p);
        display_div.appendChild(desc_p);
        display_div.appendChild(time_p);
        
        // append the box div to the main display div
        user_display.appendChild(display_div);
    
        // add click event on delete icon
        icon_delete.addEventListener('click', function () {
            notes.splice(index, 1); 
            Save_Note();
            display_Note();
        });
    });

    Save_Note();

    note_title.value = '';
    note_description.value = '';


}

function Save_Note(){
    localStorage.setItem('user_notes', JSON.stringify(notes));
}

var add_btn = document.getElementById('add_btn');
add_btn.addEventListener('click', Add_local);

function Add_local(){
    var note_title = document.getElementById('note_title');
    var note_description = document.getElementById('note_description');
    
        var text_title = note_title.value
        var text_description = note_description.value

    if(text_title.trim() === '' || text_description.trim() === ''){
        alert('Please enter a note title and description')
        return;
     }

    var date = new Date();
    var currentDate = date.toLocaleDateString();
    var currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    notes.push({
        title: text_title,
        description: text_description,
        date: currentDate,
        time: currentTime,

    })

    Save_Note();
    display_Note();

    note_title.value = '';
    note_description.value = '';

}

display_Note();