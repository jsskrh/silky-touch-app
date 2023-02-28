import db from "../../../utils/db";
import Category from "../../../models/category";

const handler = async (req, res) => {
  await db.connect();

  const men = new Category({
    slug: "men",
    name: "Men",
    title: "Men's Collection",
    subtitle:
      "Get the quintessential Versace look by pairing the latest runway styles with a statement bag and modern shoes. For the finishing touch, browse an array of luxurious accessories.",
  });
  const clothing = new Category({
    slug: "clothing",
    name: "Clothing",
    title: "Men's Clothing",
    subtitle:
      "A fashionable selection of menswear - an array of suits, shirts, T-shirts, coats, jackets, pants and jeans for men with impeccable style.",
  });
  const pants = new Category({
    name: "Pants & Shorts",
    slug: "pants-shorts",
    title: "Men's Pants and Shorts",
    subtitle:
      "Versace pants and shorts for men in an array of styles and fits, from tailored formal pants to comfortable sweatpants and print silk shorts.",
  });
  const shirts = new Category({
    name: "Shirts",
    slug: "shirts",
    title: "Men's Shirts",
    subtitle:
      "Crafted from smooth silk or cotton, Versace shirts for men bring elegance and personality. Various designs are enhanced by bold prints and heritage embellishments. Crisp formal button shirts complete a business formal or casual look when paired with a blazer or tie.",
  });
  const sweatshirts = new Category({
    name: "Sweatshirts",
    slug: "sweatshirts",
    title: "Men's Sweatshirts and Hoodies",
    subtitle:
      "A casual yet Very Versace look—the Versace collection of luxury sweatshirts and hoodies for men featuring logo sweatshirts and signature printed hoodies.",
  });
  const tshirts = new Category({
    name: "T-Shirts",
    slug: "t-shirts-polos",
    title: "Men's T-Shirts & Polos",
    subtitle:
      "Browse a selection of t-shirts and polo shirts for men, crafted from comfortable and fine fabrics and embellished with signature prints. Slip on a t-shirt with a pair of Versace jeans and shoes .",
  });
  const jackets = new Category({
    name: "Jackets & coats",
    slug: "jackets-coats",
    title: "Men's Jackets & Coats",
    subtitle:
      "Discover our wide selection of stylish jackets and coats for men: from leather jackets to bombers, vests, peacoats and puffer jackets.",
  });
  const bags = new Category({
    slug: "bags",
    name: "Bags",
    title: "Men's Bags",
    subtitle:
      "Complete your look with a selection of luxury bags, including backpacks, belt bags and totes.",
  });
  const shoes = new Category({
    slug: "shoes",
    name: "Shoes",
    title: "Men's Shoes",
    subtitle:
      "Stride in style with finely crafted shoes for men - choose from a range of elegant styles from monk straps to oxfords, derbys, moccasins and driving shoes. Luxurious comfort - find the right sneakers from low top to high top or slip ons, or leather sandals and pool slides for a casual look.",
  });
  const sneakers = new Category({
    name: "Sneakers",
    slug: "sneakers",
    title: "Men's Sneakers",
    subtitle:
      "Discover our newest collection of luxury sneakers for men in a wide range of styles: from the Chain Reaction and Trigreca , to other high top and low top sneakers embellished with signature motifs.",
  });
  const derby = new Category({
    name: "Derby Shoes",
    slug: "derby-shoes",
    title: "Men's Derby Shoes",
    subtitle:
      "The Versace shoe collection for men includes lace-up Derby styles enriched with La Greca, Barocco and Medusa accents.",
  });
  const loafers = new Category({
    name: "Loafers & Slippers",
    slug: "loafers-slippers",
    title: "Men's Loafers and Slippers",
    subtitle:
      "The Versace shoe collection for men includes slip-on loafers and slippers made from leather, suede, and velvet, enriched with La Greca motifs and Medusa hardware.",
  });
  const boots = new Category({
    name: "Boots",
    slug: "boots",
    title: "Men's Boots",
    subtitle:
      "Complete your look with Versace's luxury boots for men - Made in Italy from the finest materials.",
  });
  const sandals = new Category({
    name: "Sandals & Slides",
    slug: "sandals-slides",
    title: "Men's Sandals and Slides",
    subtitle:
      "Add a luxurious touch to your summer - explore Versace's selection of fashion slides and leather sandals in an array of styles and Medusa and Barocco embellishments. Pair your logo slides with Versace swimwear.",
  });
  const accessories = new Category({
    slug: "accessories",
    name: "Accessories",
    title: "Men's Accessories",
    subtitle:
      "Travel in impeccable style with luxurious fashion accessories that bring your look to a new level of sophistication - from travel bags to formal shoes, add a touch of class to your look with fine leather belts and wallets Made in Italy. Finish off your look with necklaces and cufflinks for the gentleman of Versace.",
  });
  const belts = new Category({
    name: "Belts",
    slug: "belts",
    title: "Men's Belts",
    subtitle:
      "Add a touch of luxury to your look - crafted in Italy from the finest materials, Versace's fine leather belts are embellished with iconic buckles inspired by the House's rich heritage.",
  });
  const wallets = new Category({
    name: "Wallets",
    slug: "wallets",
    title: "Men's Wallets",
    subtitle:
      "Keep your credit cards and essential documents at hand - browse our selection of card holders and wallets crafted from the finest materials in a wide range of colours and heritage prints.",
  });
  const underwear = new Category({
    slug: "underwear-beachwear",
    name: "Underwear and Beachwear",
    title: "Men's Underwear and Beachwear",
  });
  const bathrobes = new Category({
    name: "Bathrobes",
    slug: "bathrobes-robes",
    title: "Men's Bathrobes",
    subtitle:
      "Bring iconic Versace prints and motifs to the beach, the pool or the bedroom. Browse the collection of luxury bathrobes for men, made from smooth silk and soft cotton.",
  });
  const women = new Category({
    slug: "women",
    name: "Women",
    title: "Women's Collection",
    subtitle:
      "For the ultimate Versace look, pair the latest runway styles with a luxurious handbag and expertly crafted shoes. Add statement accessories for a perfect finishing touch.",
  });
  const wClothing = new Category({
    slug: "clothing",
    name: "Clothing",
    title: "Women's Clothing",
    subtitle:
      "Find the perfect style for a modern look. Shop this season's most glamorous ready-to-wear from dresses, blouses, trousers and jackets. Elegant T-shirts, knitwear, beachwear and lingerie for a stylish wardrobe.",
  });
  const blouses = new Category({
    slug: "blouses-tops",
    name: "Blouses & Tops",
    title: "Women's Shirts and Tops",
    subtitle:
      "A true expression of Versace attitude—discover shirts, tops and bodysuits for women in the latest prints and styles, from silk shirts to lace bralette tops.",
  });
  const wShirts = new Category({
    slug: "t-shirts-sweatshirts",
    name: "T-Shirts & Sweatshirts",
    title: "Wen's T-Shirts and Sweatshirts",
    subtitle:
      "Simply Versace—a selection of Versace women's t-shirts, sweatshirts and hoodies. Explore the possibilities of seasonal prints and brand codes like the GV Signature and La Medusa.",
  });

  women.categories.push(wClothing._id);
  wClothing.categories.push(blouses._id);
  wClothing.categories.push(wShirts._id);
  men.categories.push(clothing._id);
  clothing.categories.push(pants._id);
  clothing.categories.push(shirts._id);
  clothing.categories.push(sweatshirts._id);
  clothing.categories.push(tshirts._id);
  clothing.categories.push(jackets._id);
  men.categories.push(bags._id);
  men.categories.push(shoes._id);
  shoes.categories.push(sneakers._id);
  shoes.categories.push(derby._id);
  shoes.categories.push(loafers._id);
  shoes.categories.push(boots._id);
  shoes.categories.push(sandals._id);
  men.categories.push(accessories._id);
  accessories.categories.push(belts._id);
  accessories.categories.push(wallets._id);
  men.categories.push(underwear._id);
  underwear.categories.push(bathrobes._id);

  await Promise.all([
    men.save(),
    clothing.save(),
    pants.save(),
    shirts.save(),
    sweatshirts.save(),
    tshirts.save(),
    jackets.save(),
    bags.save(),
    shoes.save(),
    sneakers.save(),
    derby.save(),
    loafers.save(),
    boots.save(),
    sandals.save(),
    accessories.save(),
    belts.save(),
    wallets.save(),
    underwear.save(),
    bathrobes.save(),
    women.save(),
    wClothing.save(),
    blouses.save(),
    wShirts.save(),
  ]);
  res.send({ message: "Seeded successfully" });
};

export default handler;
