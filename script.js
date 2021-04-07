//Variables

const form = document.querySelector('#create-input');
const input = document.querySelector('#toDoName');
const list = document.querySelector('#task-list');
const allDelete = document.querySelector('.btnAllDelete');
const uyariContainer = document.querySelector('.uyari-container');
//eventListener fonksiyonu Aktif
eventListeners();

//eventListeners
function eventListeners() {
    //submit event item eklemek için.
    form.addEventListener('submit', addNewItem);

    //click event çarpıya bastığımda silmesi için simple silme.
    list.addEventListener('click', simpleTaskDelete);

    //click event deleteAll butonu ile tümünü silmek için.
    allDelete.addEventListener('click', deleteAll);
}

//AddNewItem
function addNewItem(e) {

    //Create Elements
    //create uyari
    const uyariBari = document.createElement('div');
    uyariBari.setAttribute('id', 'alert');

    //create li
    const li = document.createElement('li');
    li.setAttribute('class', 'task-item');

    //create h4
    const h4 = document.createElement('h4');

    //h4 add textNode
    h4.appendChild(document.createTextNode(input.value));

    //create icon
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-times');

    //li add h4 and icon
    li.appendChild(h4);
    li.appendChild(icon);

    if (input.value === '') {
        //alert('Boş bırakmayınız.');
        uyariBari.setAttribute('class', 'danger');
        uyariBari.textContent = "Lütfen metin kutusunu boş bırakmayınız.";
        uyariContainer.appendChild(uyariBari);

        //önceki uyarıları silme
        if (uyariContainer.childNodes.length > 1) {
            uyariContainer.childNodes[0].remove();
        }
    }
    else {
        list.appendChild(li);
        uyariBari.setAttribute('class', 'succes');
        uyariBari.textContent = "Görev başarıyla eklendi.";
        uyariContainer.appendChild(uyariBari);

        //önceki uyarıları silme
        if (uyariContainer.childNodes.length > 1) {
            uyariContainer.childNodes[0].remove();
        }
        //clear input
        input.value = '';
    }

    e.preventDefault();
}

//Simple Task Delete
//listeyi seçip event bubbling sayesinde silme işlemi yapacağız.
function simpleTaskDelete(e) {
    //simpleDelete
    //icon control
    if (e.target.className === 'fas fa-times') { //eğer tıklanılan target ın className i bu ise 
        if (confirm('Are you sure ?')) {
            e.target.parentElement.remove();
        }
    }

    e.preventDefault();
}

//deleteAll
function deleteAll(e) {
    //Yöntem 1
    if (confirm('Are you sure ?')) {
        list.innerHTML = '';
    }


    //yöntem 2 for html collection almak için children kullanmalıyız.
    // for(let i=0; i<list.children.length; i++){
    //     //console.log(list.children[i]); //test.
    //     list.children[i].remove();
    // }



    //yöntem 3 foreach methodu ile yapabilmek için childNodes kullanmam lazım
    //onaylarsa sileeceğiz.

    // if (confirm('Are you sure ?')) {
    //     list.childNodes.forEach(function (item) {
    //         //element kontrolü
    //         if (item.nodeType === 1) {
    //             item.remove();
    //         }
    //     });

    // }

    e.preventDefault();
}






















