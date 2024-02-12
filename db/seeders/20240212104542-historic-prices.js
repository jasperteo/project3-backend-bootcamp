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
      "historic_prices",
      [
        {
          watch_id: 1,
          price: 21727,
          transacted_at: new Date("2024-02-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 1,
          price: 21441,
          transacted_at: new Date("2024-01-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 1,
          price: 21686,
          transacted_at: new Date("2023-12-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 1,
          price: 21786,
          transacted_at: new Date("2023-11-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 1,
          price: 22070,
          transacted_at: new Date("2023-10-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 2,
          price: 24977,
          transacted_at: new Date("2024-02-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 2,
          price: 24588,
          transacted_at: new Date("2024-01-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 2,
          price: 24997,
          transacted_at: new Date("2023-12-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 2,
          price: 25195,
          transacted_at: new Date("2023-11-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 2,
          price: 24986,
          transacted_at: new Date("2023-10-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 3,
          price: 27008,
          transacted_at: new Date("2024-02-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 3,
          price: 26145,
          transacted_at: new Date("2024-01-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 3,
          price: 26235,
          transacted_at: new Date("2023-12-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 3,
          price: 26221,
          transacted_at: new Date("2023-11-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 3,
          price: 26171,
          transacted_at: new Date("2023-10-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 4,
          price: 25805,
          transacted_at: new Date("2024-02-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 4,
          price: 25457,
          transacted_at: new Date("2024-01-02"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 4,
          price: 25772,
          transacted_at: new Date("2023-12-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 4,
          price: 26160,
          transacted_at: new Date("2023-11-01"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          watch_id: 4,
          price: 26073,
          transacted_at: new Date("2023-10-02"),
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
    await queryInterface.bulkDelete("historic_prices", null, {});
  },
};
