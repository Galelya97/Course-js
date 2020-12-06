/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

let currentDrag;
let startX = 0;
let startY = 0;

document.addEventListener('mousemove', (e) => {
  if (currentDrag) {
    currentDrag.style.left = e.pageX - startX + 'px';
    currentDrag.style.top = e.pageY - startY + 'px';
  }
});

const random = (max) => Math.floor(Math.random() * max) + 1;

export function createDiv() {
  const createDiv = document.createElement('div');
  createDiv.className = 'draggable-div';
  createDiv.style.width = `${random(100)}px`;
  createDiv.style.height = `${random(100)}px`;
  createDiv.style.backgroundColor = `#${random(parseInt('fff', 16)).toString(16)}`;
  createDiv.style.position = 'absolute';
  createDiv.style.top = `${random(100)}vh`;
  createDiv.style.left = `${random(100)}vw`;

  createDiv.addEventListener('mousedown', (e) => {
    currentDrag = createDiv;
    startX = e.offsetX;
    startY = e.offsetY;
  });

  createDiv.addEventListener('mouseup', () => (currentDrag = null));

  return createDiv;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
