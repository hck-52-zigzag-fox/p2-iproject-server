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
      "Products",
      [
        {
          name: "Air Jordan 1 Dark Mocha",
          description:
            "This OG AJ1 employs a new twist on a familiar colour scheme: dark mocha. Continuing its rich history with the Jordan Brand, the crisp mocha colour blocking on soft nubuck leather gives this OG a clean and subtle look.",
          price: 7000000,
          imageUrl:
            "https://static.nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/8723269b-1e63-4b5e-922b-6d3aca20b715/air-jordan-1-dark-mocha-release-date.jpg",
          color: "Dark Mocha",
        },
        {
          name: "Air Jordan 1 Royal Toe",
          description:
            "The Air Jordan 1 Retro High OG 'Royal Toe' applies a familiar blend of colors to the iconic silhouette. The all-leather upper features a white base with contrasting black overlays and pops of Game Royal at the collar, toe box and rubber outsole. A lightly padded nylon tongue in black is topped with a Nike Air tongue tag, while the classic Jordan Wings logo appears in white on the lateral collar flap.",
          price: 4000000,
          imageUrl:
            "https://sneakernews.com/wp-content/uploads/2020/04/Air-Jordan-1-Game-Royal-2020-555088_041-5.jpg",
          color: "Blue White Black",
        },
        {
          name: "Air Jordan 1 Retro High OG Chicago Lost & Found",
          description:
            "The Air Jordan 1 Retro High OG Chicago Lost & Found brings back the iconic silhouette that started it all. Featuring the high-cut shape of the original 1985 release, the leather upper combines a white base with a black signature Swoosh and scarlet overlays at the forefoot and heel. Cracked black leather appears on the padded collar, while a vintage pre-yellowed finish is applied to the white rubber midsole. The vintage 80s aesthetic extends to the special packaging, highlighted by a damaged box plastered with sale stickers and topped with a mismatched replacement lid. An accompanying sales invoice is emblematic of a time when the Air Jordan 1 lingered on the shelves of mom and pop stores, eventually making their way into the hands of lucky customers at a steep discount.",
          price: 6500000,
          imageUrl:
            "https://senikersku.com/wp-content/uploads/2022/11/Air-Jordan-1-Retro-High-OG-Lost-Found-2.png",
          color: "White Red",
        },
        {
          name: "Air Jordan 1 Top 3",
          description:
            "In 2016, Nike combined three original Air Jordan 1 colorways ('Bred/Banned,' 'Chicago,' and 'Royal') into one new colorway, the Air Jordan 1 Retro High OG Top 3. The sneaker comes in mismatched' color panels and outsoles while staying true to the original design by featuring the Wings logo on the ankle and Nike Air branding on the insole and tongue. Top 3 also nods to Jordan being drafted third overall in the 1984 NBA Draft. ",
          price: 8000000,
          imageUrl:
            "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//107/MTA-9288728/air_jordan_nike_aj1_retro_high_top_3_full01_c7n8inax.jpg",
          color: "Blue White Black Red",
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
    await queryInterface.bulkDelete("Products", null, {});
  },
};
