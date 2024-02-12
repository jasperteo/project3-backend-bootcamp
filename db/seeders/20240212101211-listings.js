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
      "listings",
      [
        {
          title: "test1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At volutpat diam ut venenatis tellus. Eu sem integer vitae justo eget magna fermentum. Quam nulla porttitor massa id neque. Quis lectus nulla at volutpat diam ut venenatis tellus. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam.",
          image_link:
            "https://content.rolex.com/v7/dam/2023-06/upright-c/m126710blnr-0002.png?impolicy=v7&imwidth=2440",
          seller_id: 1,
          buyer_id: null,
          watch_id: 1,
          starting_bid: 19000,
          buyout_price: 23000,
          status: true,
          ending_at: "2024-02-22",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "test2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cras ornare arcu dui vivamus arcu felis bibendum. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Cras pulvinar mattis nunc sed blandit libero volutpat sed. Nisi porta lorem mollis aliquam. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper.",
          image_link:
            "https://content.rolex.com/v7/dam/2023-06/upright-c/m126711chnr-0002.png?impolicy=v7&imwidth=2440",
          seller_id: 4,
          buyer_id: null,
          watch_id: 4,
          starting_bid: 24000,
          buyout_price: 26000,
          status: true,
          ending_at: "2024-02-22",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: "test3",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum eu facilisis sed odio morbi quis commodo odio aenean. Pellentesque id nibh tortor id aliquet. Lacus sed turpis tincidunt id aliquet risus feugiat in. Consectetur adipiscing elit pellentesque habitant. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Tempor nec feugiat nisl pretium fusce id velit. Mi ipsum faucibus vitae aliquet.",
          image_link:
            "https://content.rolex.com/v7/dam/2023-06/upright-c/m126710blro-0001.png?impolicy=v7&imwidth=2440",
          seller_id: 3,
          buyer_id: null,
          watch_id: 3,
          starting_bid: 23000,
          buyout_price: 27000,
          status: true,
          ending_at: "2024-02-22",
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
    await queryInterface.bulkDelete("listings", null, {});
  },
};
