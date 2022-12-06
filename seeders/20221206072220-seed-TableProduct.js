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
        {
          name: "Air Jordan 1 Bred Toe",
          description:
            "Arriving in stores in February 2018, the Air Jordan 1 Retro High OG Bred Toe is a new spin on a classic design. The Chicago Bulls-inspired colorway combines elements of the Bred and Black Toe editions of the Air Jordan 1, executed on a premium leather build. The high-top features a black Swoosh on the white quarter panel, along with contrasting pops of red on the toe box, heel, collar, and outsole. The shoe stays true to its OG 1985 roots with Nike Air branding on the tongue tag and sockliner.",
          price: 7500000,
          imageUrl:
            "https://cdn.istyle.im/images/product/web/93/89/80/00/0/000000808993_02_800.jpg",
          color: "White Red",
        },
        {
          name: "Air Jordan 1 Retro High OG 'Bred' 2013",
          description:
            "Banned by the NBA in 1985, Michael Jordan was charged $5,000 per game for wearing the Air Jordan 1 Black/Red because they didn't include the color white which was part of the Chicago Bulls official team colors. Used as a marketing tactic, Nike crafted the Banned campaign around the sneakers to launch and promote the Air Jordan line. The sneaker was retroed in 1994, 2011, 2013 and 2016. The 2011 pair features an 'X' on the heel paying homage to the 'Banned' nickname.",
          price: 14000000,
          imageUrl: "https://cdn.flightclub.com/TEMPLATE/012496/1.jpg",
          color: "Red White Black",
        },
        {
          name: "Air Jordan 1 Retro High OG NRG 'Gold Toe'",
          description:
            "The Air Jordan 1 Retro High OG NRG 'Gold Toe' features a black patent leather upper with distinctive metallic gold accents on the perforated toe box, tongue branding, and the heel panel. The high top also boasts a white side panel which extends from the midfoot to the heel, and a white rubber midsole. Other details include suede accents on the lacing structure, large Swoosh branding, and a tonal black outsole.",
          price: 5500000,
          imageUrl:
            "https://cf.shopee.co.id/file/34eca8b09309a959c6026b09d90f8332",
          color: "Gold White Black",
        },
        {
          name: "Travis Scott x Air Jordan 1 Retro High OG 'Mocha'",
          description:
            "The Travis Scott x Air Jordan 1 Retro High features a new look on the iconic silhouette, thanks to an oversized backward-facing Swoosh on the lateral side. A traditionally oriented Swoosh graces the medial side of the upper, which is built with a blend of white leather and brown suede. Additional unique details include a double-layer construction on the collar and Scott's crudely drawn face logo embossed on the heel.",
          price: 18000000,
          imageUrl:
            "https://sneakernews.com/wp-content/uploads/2019/04/travis-scott-jordan-1-official-release-date-5.jpg",
          color: "Brown White",
        },
        {
          name: "Fragment Design x Travis Scott x Air Jordan 1 Retro High",
          description:
            "The Fragment Design x Travis Scott x Air Jordan 1 Retro High brings together two of Jordan Brand's most influential creative partners. The resulting design finds the foundational sneaker dressed in white tumbled leather with Scott's signature inverted Swoosh in contrasting black leather. Similar to the rapper's AJ1 collaboration from 2019, a hidden pouch is built into the black nylon collar. Contrasting military blue hits settle on the toe box, collar flap and heel overlay. The latter is stamped with Fragment's lightning bolt logo on the right shoe and La Flame's Cactus Jack smiley face on the left. Additional branding elements include a standard Nike Air woven tongue tag, a secondary Cactus Jack tongue tag and a classic Jordan Wings logo imprinted on the lateral ankle. A rubber cupsole with pre-yellowed sidewalls lend the shoe a vintage aesthetic.",
          price: 40000000,
          imageUrl:
            "https://sneakerbardetroit.com/wp-content/uploads/2021/07/Travis-Scott-Fragment-Air-Jordan-1-DH3227-105-Release-Date-Price-4-1068x711.jpg",
          color: "Blue White Black",
        },
        {
          name: "Off-White x Air Jordan 1 Retro High OG 'Chicago'",
          description:
            "Created by designer Virgil Abloh, the Air Jordan 1 x Off-White comes in the classic Chicago colorway. Some of the sneakers' half-finished features include a Swoosh connected to the shoe with visible blue stitching, 'Air' printed on the midsole, and an Off-White zip tie on the collar. The box comes deconstructed as it's been turned inside-out with the inside consisting of a black base and gold Jumpman logo, while the outside is plain cardboard with the words 'Jumpman' printed on it. Virgil's Off-White collection included remixed iterations of the Air VaporMax, Air Presto, Air Max 90, Blazer, Air Max 97, Hyperdunk 2017, Air Force 1, Zoom Fly, and Chuck Taylor.",
          price: 80000000,
          imageUrl:
            "https://i.pinimg.com/originals/68/91/99/6891990694adecf5a8b7467c3231ca1a.jpg",
          color: "White Red Black",
        },
        {
          name: "Dior x Air Jordan 1 High",
          description:
            "Bridging the gap between street-ready sportswear and luxury fashion, the Dior x Air Jordan 1 High is drawn from a larger collaboration that spans footwear, apparel and accessories. Designer Kim Jones take on the iconic sneaker makes use of a white and grey upper constructed from Italian leather with hand-painted edges. Dual branding hits take the form of a Dior woven tongue tag, a Nike Swoosh in Dior Oblique jacquard, and icy outsoles revealing a Dior and Dior Wings logo on each shoe.",
          price: 16500000,
          imageUrl:
            "https://alacasa.id/lkgallery/teaser/Debut-Air-Jordan-1-X-DIOR-Akhirnya-Diluncurkan_31_20191204104300.jpg",
          color: "Grey White",
        },
        {
          name: "Air Jordan 1 Retro High OG 'Yellow Toe'",
          description:
            "The Air Jordan 1 Retro High OG 'Yellow Toe' also known as 'Taxi' brings back the distinctive color blocking of the AJ1 'Bred Toe' from 2018. The all-leather upper combines a white quarter panel with a yellow toe box, black forefoot overlay, and black signature Swoosh. Additional hits of amber land on the heel overlay and collar flap, featuring a retro Wings logo stamped on the lateral side. A woven Nike Air tag graces the black nylon tongue. The high-top rests on a durable rubber cupsole, highlighted by white sidewalls and a yellow rubber outsole.",
          price: 4000000,
          imageUrl:
            "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/8/19/78830392-9cd2-41f7-8b04-58bcff53c69f.jpg",
          color: "White Yellow",
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
