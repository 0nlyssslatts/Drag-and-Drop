const list = document.querySelector(`.list`);
const listItem = list.querySelectorAll(`.list_item`);



list.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
});

list.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
});

const getNextItem = (cursorPosition, currentItem) => {
    const currentItemCoord = currentItem.getBoundingClientRect();
    const currentItemCenter = currentItemCoord.y + currentItemCoord.height / 2;
    
    const nextItem = (cursorPosition < currentItemCenter) ?
        currentItem :
        currentItem.nextElementSibling;
    
    return nextItem;
};

list.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();
    
    const activeItem = list.querySelector(`.selected`);
    const currentItem = evt.target;
    const isMoveable = activeItem !== currentItem &&
        currentItem.classList.contains(`list_item`);
        
    if (!isMoveable) {
        return;
    }
    
    const nextItem = getNextItem(evt.clientY, currentItem);
    
    if (
        nextItem && 
        activeItem === nextItem.previousElementSibling ||
        activeItem === nextItem
    ) {
        return;
    }
		
	list.insertBefore(activeItem, nextItem);
});