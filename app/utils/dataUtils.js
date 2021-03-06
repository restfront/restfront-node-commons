(function() {
    'use strict';

    const _ = require('lodash');

    module.exports = {
        get: get,

        prepareArrayMapper,
        prepareObjectMapper,

        isValidKey,
        validKeyOrNull,
        parseKey,
        filterKeys
    };

    /**
     * Получить значение свойства из объекта, без учета чувствительности к регистру,
     * с возможностью указания нескольких названий свойства и значения по умолчанию.
     *
     * @param {Object}               object         Объект
     * @param {Array<String>|String} propNames      Название свойства, или массив названий
     * @param {*}                    [defaultValue] Значение по умолчанию
     * @returns {*} Значение свойства
     */
    function get(object, propNames, defaultValue) {
        if (Array.isArray(propNames)) {
            for (let i = 0; i < propNames.length; i++) {
                const propName = propNames[i];

                if (object[propName] != null) {
                    return object[propName];
                }
                if (object[propName.toLowerCase()] != null) {
                    return object[propName.toLowerCase()];
                }
                if (object[propName.toUpperCase()] != null) {
                    return object[propName.toUpperCase()];
                }
            }
        } else if (_.isString(propNames)) {
            if (object[propNames] != null) {
                return object[propNames];
            }
            if (object[propNames.toLowerCase()] != null) {
                return object[propNames.toLowerCase()];
            }
            if (object[propNames.toUpperCase()] != null) {
                return object[propNames.toUpperCase()];
            }
        }

        return defaultValue;
    }

    /**
     * Создать функцию-преобразователь результата БД запроса для получения массива объектов
     *
     * @param {Function} [factory] Функция-конструктор
     * @returns {Function<Array>}
     */
    function prepareArrayMapper(factory) {
        return function (result) {
            if (Array.isArray(result)) {
                return result.map((data) => {
                    if (!factory) {
                        return data;
                    }

                    if (factory.prototype) {
                        return new factory(data);
                    }

                    return factory(data);
                });
            }
        };
    }

    /**
     * Создать функцию-преобразователь результата БД запроса для получения одного объекта
     *
     * @param {Function} [factory] Функция-конструктор
     * @returns {Function<Object>}
     */
    function prepareObjectMapper(factory) {
        return function (result) {
            if (result && result.length > 0) {
                if (!factory) {
                    return result[0];
                }

                if (factory.prototype) {
                    return new factory(result[0]);
                }

                return factory(result[0]);
            }
        };
    }

    /**
     * Подходит ли значение под ключ в БД
     *
     * @param {number} value Значение
     * @returns {boolean}
     */
    function isValidKey(value) {
        return value > 0;
    }

    /**
     * Возвращаем ключ, если он валиден, иначе null
     *
     * @param {number} value Значение
     * @returns {Number|null}
     */
    function validKeyOrNull(value) {
        return isValidKey(value) ? value : null;
    }


    /**
     * Парсинг ключа БД из строки
     *
     * @param {number} value Значение
     * @returns {number}
     */
    function parseKey(value) {
        value = Number(value);
        return isValidKey(value) ? value : -1;
    }

    /**
     * Подготовка массива ключей: преобразование в числа, удаление дубликатов, удаление не ключей
     *
     * @param {Array} array Массив необработанных данных
     * @returns {Array<number>} Массив ключей
     */
    function filterKeys(array) {
        if (!Array.isArray(array)) {
            throw new Error('Not an array');
        }

        // Преобразование и фильтрация
        array = array
            .map((element) => Number(element))
            .filter((element) => isValidKey(element));

        // Удаление дубликатов
        array = _.uniq(array);

        return array;
    }
})();
