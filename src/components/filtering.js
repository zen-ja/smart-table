// @todo: #4.3 — настроить компаратор

export function initFiltering(elements) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // код с обработкой очистки поля
        if (action && action.name === 'clear') {
            const input = action.closest('label').querySelector('input');
            input.value = '';
            state[action.dataset.field] = '';
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        // state.total = [state.totalFrom, state.totalTo];
        // const compare = createComparison(defaultRules);
        // return data.filter(row => compare(row, state));

        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }

    // Object.keys(indexes)                                           // Получаем ключи из объекта
    //     .forEach((elementName) => {                                // Перебираем по именам
    //         elements[elementName].append(                          // в каждый элемент добавляем опции
    //             ...Object.values(indexes[elementName])             // формируем массив имён, значений опций
    //                 .map(name => {                                 // используйте name как значение и текстовое содержимое
    //                     // @todo: создать и вернуть тег опции
    //                     const tag = document.createElement("option");  //`<option value="${name}">${name}</option>`;
    //                     tag.value = name;
    //                     tag.textContent = name;

    //                     return tag;
    //                 })
    //         )
    //     })
    // return (data, state, action) => {
    //     // @todo: #4.2 — обработать очистку поля
    //     if (action && action.name === 'clear') {
    //         const input = action.closest('label').querySelector('input');
    //         input.value = '';
    //         state[action.dataset.field] = '';
    //     }
    //     // @todo: #4.5 — отфильтровать данные используя компаратор
    //     state.total = [state.totalFrom, state.totalTo];
    //     const compare = createComparison(defaultRules);
    //     return data.filter(row => compare(row, state));
    // }
}