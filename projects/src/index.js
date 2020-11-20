/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */

function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
function map(array, fn) {
  const newArr = [];
  for (let i = 0; i < array.length; i++) {
    newArr.push(fn(array[i], i, array));
  }
  return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
function isNotNull(value) {
  return value !== null && value !== undefined;
}

function reduce(array, fn, initial) {
  let acc = isNotNull(initial) ? initial : array[0];
  const firstIndex = isNotNull(initial) ? 0 : 1;

  for (let i = firstIndex; i < array.length; i++) {
    acc = fn(acc, array[i], i, array);
  }
  return acc;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const arr = Object.keys(obj);
  console.log(arr);
  const newArr = arr.map(function (el) {
    return el.toUpperCase();
  });
  return newArr;
}

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {
  return new Proxy(obj, {
    set(target, prop, val) {
      if (typeof val == 'number') {
        target[prop] = val * val;
        return true;
      } else {
        return false;
      }
    },
  });
}

export { forEach, map, reduce, upperProps, createProxy };
