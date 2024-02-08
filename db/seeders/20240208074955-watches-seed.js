"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "watches",
      [
        {
          ref_num: "126710BLNR",
          brand: "Rolex",
          model: 'GMT-Master II "Batman"',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          ref_num: "116610LV",
          brand: "Rolex",
          model: 'Submariner Date "Hulk"',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          ref_num: "126710BLRO",
          brand: "Rolex",
          model: 'GMT-Master II "Pepsi"',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          ref_num: "126711CHNR",
          brand: "Rolex",
          model: 'GMT-Master II "Root Beer"',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("watches", null, {});
  },
};
