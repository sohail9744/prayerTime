'use strict';

/**
 * prayer-time service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::prayer-time.prayer-time');
