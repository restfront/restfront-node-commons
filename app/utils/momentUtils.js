(function() {
    'use strict';

    var moment = require('moment');

    var DATE_FORMAT = 'YYYY-MM-DD',
        TIME_FORMAT = 'HH:mm:ss',
        DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSSS';

    module.exports = {
        /**
         * Форматировать дату в строку
         *
         * @param {moment|Date|String} date     Дата
         * @param {String}             [format] Формат
         * @returns {String}
         */
        formatDate: function (date, format) {
            if (!date) { return ''; }

            if (!moment.isMoment(date)) {
                date = this.parseDate(date);
            }
            return date ? date.format(format ? format : DATE_FORMAT) : '';
        },

        /**
         * Форматировать время в строку
         *
         * @param {moment|Date|String} time     Время
         * @param {String}             [format] Формат
         * @returns {String}
         */
        formatTime: function (time, format) {
            if (!time) { return ''; }

            if (!moment.isMoment(time)) {
                time = this.parseTime(time);
            }
            return time ? time.format(format ? format : TIME_FORMAT) : '';
        },

        /**
         * Форматировать дату и время в строку
         *
         * @param {moment|Date|String} dateTime Дата и время
         * @param {String}             [format] Формат
         * @returns {String}
         */
        formatDateTime: function (dateTime, format) {
            if (!dateTime) { return ''; }

            if (!moment.isMoment(dateTime)) {
                dateTime = this.parseDateTime(dateTime);
            }
            return dateTime ? dateTime.format(format ? format : DATETIME_FORMAT) : '';
        },

        /**
         * Создать moment на основе переданной даты
         *
         * @param {Date} date Дата
         * @returns {moment|undefined}
         */
        fromDate: function (date) {
            if (date) {
                return moment(date);
            }
        },

        /**
         * Парсинг даты
         *
         * @param {Date|String} dateStr  Дата
         * @param {String}      [format] Формат даты
         * @returns {moment|undefined}
         */
        parseDate: function (dateStr, format) {
            if (dateStr) {
                if (moment.isDate(dateStr)) {
                    return this.fromDate(dateStr);
                }
                return moment(dateStr, format || DATE_FORMAT);
            }
        },

        /**
         * Парсинг времени
         *
         * @param {Date|String} timeStr  Время
         * @param {String}      [format] Формат времени
         * @returns {moment|undefined}
         */
        parseTime: function (timeStr, format) {
            if (timeStr) {
                if (moment.isDate(timeStr)) {
                    return this.fromDate(timeStr);
                }
                return moment(timeStr, format || TIME_FORMAT);
            }
        },

        /**
         * Парсинг даты и времени
         *
         * @param {Date|String} dateTimeStr Дата и время
         * @param {String}      [format]    Формат даты и времени
         * @returns {moment|undefined}
         */
        parseDateTime: function (dateTimeStr, format) {
            if (dateTimeStr) {
                if (moment.isDate(dateTimeStr)) {
                    return this.fromDate(dateTimeStr);
                }
                return moment(dateTimeStr, format || DATETIME_FORMAT);
            }
        }
    };
})();