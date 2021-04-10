//Variables

const form = document.querySelector('#create-input');
const input = document.querySelector('#toDoName');
const list = document.querySelector('#task-list');
const allDelete = document.querySelector('.btnAllDelete');
const uyariContainer = document.querySelector('.uyari-container');
let items;

//active functions
loadItems();
eventListeners();

function eventListeners() {
    //submit event item eklemek için.
    form.addEventListener('submit', addNewItem);

    //click event çarpıya bastığımda silmesi için simple silme.
    list.addEventListener('click', simpleTaskDelete);

    //click event deleteAll butonu ile tümünü silmek için.
    allDelete.addEventListener('click', deleteAll);
}

//her elemanı listeden alıp ekleyeceğiz.
//loadItems
function loadItems(item){

    items = getItemFromLS();

    items.forEach(function (item) {
        createItem(item);
    })
}
//Set Item to Local Storage
//local storage e veri eklemek için
function setItemFromLS(text) {
    //ilk başta localstoragedeki kayıtlı bilgiyi elimize alalım
    items = getItemFromLS();
    //Şimdide girilen text i push methodu ile diziye aktaralım
    items.push(text);
    //localStorage e aktaralım diziye aktardığımız veriyi
    localStorage.setItem('items',JSON.stringify(items));
}
//Get Item From Local Storage
//localStorage deki veriyi dizi olarak çekmek için.
function getItemFromLS() {
    //eğer items boş ise items değişkeninin boş bir diziye çeviriyoruz
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        //eğer items içerisinde bir veri varsa alıyoruz
        items = JSON.parse(localStorage.getItem('items'));
    }
    //en sonda items ı geri döndürüyoruz
    return items;
}
//CreateItem
function createItem(text) {
    
    //Create Elements
    //create uyari

    //create li
    const li = document.createElement('li');
    li.setAttribute('class', 'task-item');

    //create h4
    const h4 = document.createElement('h4');

    //h4 add textNode
    h4.appendChild(document.createTextNode(text));

    //create icon
    const icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-times');

    //li add h4 and icon
    li.appendChild(h4);
    li.appendChild(icon);
    list.appendChild(li);
    };

//AddNewItem
function addNewItem(e) {
    const uyariBari = document.createElement('div');
    uyariBari.setAttribute('id', 'alert');

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
        uyariBari.setAttribute('class', 'succes');
        uyariBari.textContent = "Görev başarıyla eklendi.";
        uyariContainer.appendChild(uyariBari);
        //Save To Local Storage
        setItemFromLS(input.value);
        createItem(input.value);

        //önceki uyarıları silme
        if (uyariContainer.childNodes.length > 1) {
            uyariContainer.childNodes[0].remove();
        }
        //clear input


        input.value = '';
    }

    e.preventDefault();
}
//delete ıtem from ls function
function deleteItemFromLS(text) {
    items = getItemFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1); 
        }
    });
    //son halini tekrar ls kaydet.
    localStorage.setItem('items',JSON.stringify(items));

}
//Simple Task Delete
//listeyi seçip event bubbling sayesinde silme işlemi yapacağız.
function simpleTaskDelete(e) {
    //simpleDelete
    //icon control
    if (e.target.className === 'fas fa-times') { //eğer tıklanılan target ın className i bu ise 
        if (confirm('Are you sure ?')) {
            e.target.parentElement.remove();
            //delete item from LS
            //deleteItemFromLS nin alacağı değeri girdik
            deleteItemFromLS(e.target.parentElement.textContent);
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
    //tüm elemanları local strageden sileriz.
    localStorage.clear();
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






















