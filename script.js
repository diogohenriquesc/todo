'use strict';

const addButton = document.querySelector('.todo__add-input');
const textInput = document.querySelector('.todo__text-input');
const ListComponent = document.querySelector('.todo__list');
const liClassList = 'todo__item';
const liContentClassList = 'todo__item-content';
const liDeleteClassList = ['todo__delete-button', 'fa-solid', 'fa-trash-can'];

addButton.addEventListener('click', addItem);

document.addEventListener('DOMContentLoaded', () => {
	loadSavedItems();
});

function addItem() {
	const itemContent = textInput.value;

	if (itemContent !== '') {
		const item = createItem(itemContent);
		ListComponent.appendChild(item);
		saveItems();
		clearInput(textInput);
	}
}

function createItem(value) {
	const li = document.createElement('li');
	li.classList.add(liClassList);

	const liContent = document.createElement('p');
	liContent.classList.add(liContentClassList);
	liContent.innerHTML = value;

	const liDeleteBtn = document.createElement('button');
	liDeleteBtn.classList.add(...liDeleteClassList);
	liDeleteBtn.setAttribute('title', 'Remove item');
	liDeleteBtn.setAttribute('aria-label', 'Remove item');
	liDeleteBtn.setAttribute('onclick', 'removeItem(this)');

	li.appendChild(liContent);
	li.appendChild(liDeleteBtn);

	return li;
}


function removeItem(button) {
	const todoList = button.parentElement.parentElement;
	const thisListItem = button.parentElement;
	todoList.removeChild(thisListItem);

	saveItems();
}

function saveItems() {
	localStorage.setItem('savedItems', `${ListComponent.innerHTML}`);
}

function loadSavedItems() {
	ListComponent.innerHTML = localStorage.getItem('savedItems');
}

function clearInput(input) {
	input.value = '';
}

// Color theme
const body = document.body;
const themeToggler = document.querySelector('.todo__theme-toggler');
const togglerLightIconClass = 'fa-sun';
const togglerDarkIconClass = 'fa-moon';

document.addEventListener('DOMContentLoaded', () => {
	loadSavedTheme();
});

themeToggler.addEventListener('click', switchColorTheme);

function switchColorTheme() {
	body.dataset.theme = body.dataset.theme == 'dark' ? 'light' : 'dark';
	saveTheme(body.dataset.theme);
	changeTogglerIcon(body.dataset.theme);
}

function changeTogglerIcon(theme) {
	if (theme === 'light') {
		themeToggler.classList.replace(togglerLightIconClass, togglerDarkIconClass);
	} else {
		themeToggler.classList.replace(togglerDarkIconClass, togglerLightIconClass);
	}
}

function saveTheme(theme) {
	localStorage.setItem('theme', theme);
}

function loadSavedTheme() {
	if (localStorage.getItem('theme') !== null) {
		const savedTheme = localStorage.getItem('theme');
		setColorTheme(savedTheme);
	}
}

function setColorTheme(theme) {
	body.dataset.theme = theme;
	changeTogglerIcon(theme);
}
