import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                          // Получаем ключи из объекта
        .forEach((elementName) => {                                // Перебираем по именам
            elements[elementName].append(                          // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])             // формируем массив имён, значений опций
                    .map(name => {                                 // используйте name как значение и текстовое содержимое
                        // @todo: создать и вернуть тег опции
                        const tag = document.createElement("option");  //`<option value="${name}">${name}</option>`;
                        tag.value = name;
                        tag.textContent = name;

                        return tag;
                    })
            )
        })
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const input = action.closest('label').querySelector('input');
            input.value = '';
            state[action.dataset.field] = '';
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        state.total = [state.totalFrom, state.totalTo];
        const compare = createComparison(defaultRules);
        return data.filter(row => compare(row, state));
    }
}