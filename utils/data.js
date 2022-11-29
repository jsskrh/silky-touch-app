import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "John",
      email: "admin@testing.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jane",
      email: "user@testing.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],

  catalogue: {
    men: {
      accessories: {
        text: "Travel in impeccable style with luxurious fashion accessories that bring your look to a new level of sophistication - from travel bags to formal shoes, add a touch of class to your look with fine leather belts and wallets Made in Italy. Finish off your look with necklaces and cufflinks for the gentleman of Versace.",
      },
      clothing: {
        text: "A fashionable selection of menswear - an array of suits, shirts, T-shirts, coats, jackets, pants and jeans for men with impeccable style.",
        "pants-shorts": {
          title: "Men's Pants and Shorts",
          text: "Versace pants and shorts for men in an array of styles and fits, from tailored formal pants to comfortable sweatpants and print silk shorts.",
        },
        shirts: {
          title: "Men's Shirts",
          text: "Crafted from smooth silk or cotton, Versace shirts for men bring elegance and personality. Various designs are enhanced by bold prints and heritage embellishments. Crisp formal button shirts complete a business formal or casual look when paired with a blazer or tie.",
        },
        sweatshirts: {
          title: "Men's Sweatshirts and Hoodies",
          text: "A casual yet Very Versace look—the Versace collection of luxury sweatshirts and hoodies for men featuring logo sweatshirts and signature printed hoodies.",
        },
        "t-shirts-polos": {
          title: "Men's T-Shirts & Polos",
          text: "Browse a selection of t-shirts and polo shirts for men, crafted from comfortable and fine fabrics and embellished with signature prints. Slip on a t-shirt with a pair of Versace jeans and shoes .",
        },
      },
    },

    women: {
      clothing: {
        "t-shirts-sweatshirts": {
          title: "Men's T-Shirts and Sweatshirts",
          text: "Simply Versace—a selection of Versace women's t-shirts, sweatshirts and hoodies. Explore the possibilities of seasonal prints and brand codes like the GV Signature and La Medusa.",
        },
      },
    },

    unisex: {
      accessories: {
        "soft-accessories": {
          title: "Men's Soft Accessories",
          text: "The Versace soft accessories selection includes hats, gloves, scarves and foulards made with the finest fabrics in statement Versace prints.",
        },
      },
    },
  },

  products: [
    {
      name: "La Greca Shirt",
      slug: "la-greca-shirt",
      images: [
        { primary: "/images/1/image1.jpg" },
        { secondary: "/images/1/image2.jpg" },
        { modelFront: "/images/1/image3.jpg" },
        { modelBack: "/images/1/image4.jpg" },
        { materialCloseUp: "/images/1/image5.webp" },
      ],
      price: 1025,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "shirts",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "Crafted in a lightweight cotton, this short-sleeved button-down shirt features the La Greca print and a relaxed camp collar.",
      details: [
        "La Greca print",
        "Short sleeves",
        "Camp collar",
        "Front button closure",
        "Side slits",
        "Outer Fabric: 52% Cotton, 48% Lyocell",
        "Outer Fabric 2: 52% Cotton, 48% Lyocell",
        "Machine wash cold (delicate)",
        "Do not bleach",
        "Do not tumble dry",
        "Cool iron on reverse with damp cloth on top",
        "Delicate dry clean",
        "Wash inside out",
      ],
      sku: "1003926-1A04992_5G320",
    },
    {
      name: "Barocco Silk Shirt",
      slug: "barocco-silk-shirt",
      images: [
        { primary: "/images/2/image1.webp" },
        { secondary: "/images/2/image2.webp" },
        { modelFront: "/images/2/image3.webp" },
        { modelBack: "/images/2/image4.jpg" },
        { materialCloseUp: "/images/2/image5.webp" },
      ],
      price: 1550,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "shirts",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "Crafted from pure silk this short-sleeved button-down shirt features the signature Barocco print - a beloved house code featuring stylised acanthus leaves.",
      details: [
        "Barocco print",
        "Button down front",
        "Collar",
        "Outer fabric: 100% Silk",
        "Cool iron",
        "Delicate dry clean",
        "Do not bleach",
        "Do not tumble dry",
        "Do not wash",
      ],
      sku: "1003926-1A03044_5B000",
    },
    {
      name: "Barocco T-Shirt",
      slug: "barocco-t-shirt",
      images: [
        { primary: "/images/3/image1.webp" },
        { secondary: "/images/3/image2.webp" },
        { modelFront: "/images/3/image3.jpg" },
        { modelBack: "/images/3/image4.webp" },
      ],
      price: 925,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "t-shirts-polos",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "In a slim silhouette, this short-sleeved cotton T-shirt features Versace's signature Barocco print - a beloved house code featuring stylised acanthus leaves.",
      details: [
        "Barocco print",
        "Short sleeves",
        "Ribbed crewneck",
        "Outer fabric: 100%  Cotton",
        "Cool iron",
        "Delicate dry clean",
        "Do not bleach",
        "Do not tumble dry",
        "Do not wash",
      ],
      sku: "1006662-1A04612_5B000",
    },
    {
      name: "Barocco Shorts",
      slug: "barocco-shorts",
      images: [
        { primary: "/images/4/image1.webp" },
        { secondary: "/images/4/image2.jpg" },
        { modelFront: "/images/4/image3.webp" },
        { modelBack: "/images/4/image4.webp" },
        { materialCloseUp: "/images/4/image5.jpg" },
      ],
      price: 1225,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "pants-shorts",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "A comfortable design, these knee-length shorts are crafted from pure silk twill in the signature Barocco print.",
      details: [
        "Barocco print",
        "Lining: 100% Cupro",
        "Outer fabric: 100%  Silk",
        "Cool iron",
        "Delicate dry clean",
        "Do not bleach",
        "Do not tumble dry",
        "Do not wash",
      ],
      sku: "1002476-1A03044_5B000",
    },
    {
      name: "Barocco Bucket Hat",
      slug: "barocco-bucket-hat",
      images: [
        { primary: "/images/5/image1.webp" },
        { secondary: "/images/5/image2.webp" },
        { modelFront: "/images/5/image3.webp" },
      ],
      price: 625,
      brand: "Versace",
      category: "unisex",
      subcategory: "accessories",
      subSubcategory: "soft-accessories",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "A contemporary accessory, this bucket hat features the iconic Barocco print.",
      details: [
        "Barocco print",
        "Lining: 100% Polyamide",
        "Outer fabric: 100% Polyamide",
        "Do not bleach",
        "Do not dry clean",
        "Do not iron",
        "Do not tumble dry",
        "Do not wash",
      ],
      sku: "1001591-1A02963_5B000",
    },
    {
      name: "Metropolitano Check Wool Pants",
      slug: "metropolitano-check-wool-pants",
      tags: ["Runway Show"],
      images: [
        { primary: "/images/6/image1.webp" },
        { secondary: "/images/6/image2.jpg" },
        { modelFront: "/images/6/image3.jpg" },
        { modelBack: "/images/6/image4.jpg" },
        { materialCloseUp: "/images/6/image5.jpg" },
        { video: "/images/6/video1.mp4" },
      ],
      price: 1950,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "pants-shorts",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "A painterly Metropolitano Check motif outlines these tapered formal pants. A tailored style, they are finished with a front pleat and a concealed hook and zip closure.",
      details: [
        "Metropolitano Check print",
        "Belt loops",
        "Tapered fit",
        "Side pockets",
        "Concealed hook and zip closure",
        "Back welt pockets",
        "Outer Fabric: 100% Pure Virgin Wool",
        "Lining 1: 100% Cupro",
        "Lining 2: 100% Cotton",
        "Do not bleach",
        "Do not tumble dry",
        "Do not wash",
        "Cool iron",
        "Delicate dry clean",
      ],
      sku: "1006714-1A04925_5E050",
    },
    {
      name: "Medusa Hoodie",
      slug: "medusa-hoodie",
      images: [
        { primary: "/images/7/image1.webp" },
        { secondary: "/images/7/image2.jpg" },
        { modelFront: "/images/7/image3.jpg" },
        { modelBack: "/images/7/image4.webp" },
        { materialCloseUp: "/images/7/image5.jpg" },
      ],
      price: 2150,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "sweatshirts",
      color: ["Brown", "Gray"],
      countInStock: 20,
      description:
        "Crafted from a soft cotton and cashmere blend, this hooded sweatshirt features a snap buttoned fastening, accented by Medusa hardware. In a sporty raglan cut, it's finished with a ribbed high-neck and trims.",
      details: [
        "Medusa hardware",
        "Long sleeves",
        "High-neck",
        "Hood",
        "Snap button closure",
        "Side welt pockets",
        "Elasticated hem and cuffs",
        "Ribbed trims",
        "Outer fabric: 91% Cotton 9% Cashmere",
        "Lining: 100% Cotton",
        "Trim: 100% Cotton",
        "Embroidery: 100% Viscose",
        "Cool iron",
        "Delicate dry clean",
        "Do not bleach",
        "Do not tumble dry",
        "Do not wash",
      ],
      sku: "1006492-1A04502_1E210",
    },
    {
      name: "Barocco Silhouette Silk Shirt",
      slug: "barocco-silhouette-silk-shirt",
      images: [
        { primary: "/images/8/image1.webp" },
        { secondary: "/images/8/image2.webp" },
        { modelFront: "/images/8/image3.webp" },
        { modelBack: "/images/8/image4.webp" },
        { materialCloseUp: "/images/8/image5.webp" },
      ],
      price: 1525,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "shirts",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "Made from a fluid silk twill, this shirt has a loose fit, featuring a print rendition of a studded Barocco Silhouette pattern. The short-sleeved style is finished with a relaxed open collar and buttoned front.",
      details: [
        "Barocco Silhouette print",
        "Short sleeves",
        "Camp collar",
        "Front button closure",
        "Outer Composition: 100% Silk",
      ],
      sku: "1003926-1A06140_5B950",
    },
    {
      name: "Barocco 660 Silk Shirt",
      slug: "barocco-660-silk-shirt",
      images: [
        { primary: "/images/9/image1.webp" },
        { secondary: "/images/9/image2.webp" },
        { modelFront: "/images/9/image3.webp" },
        { modelBack: "/images/9/image4.webp" },
        { materialCloseUp: "/images/9/image5.jpg" },
        { materialCloseUp: "/images/9/image6.webp" },
        { video: "/images/9/video1.mp4" },
      ],
      price: 1825,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "shirts",
      color: ["Brown", "Gold"],
      countInStock: 20,
      description:
        "Crafted from pure silk, this long-sleeved shirt showcases the Barocco 660 print—a reimagining of an archival Barocco print.",
      details: [
        "Barocco 660 print",
        "Long sleeves",
        "Pointed collar",
        "Front button closure",
        "Buttoned cuffs",
        "Outer Composition: 100% Silk",
      ],
      sku: "1003941-1A05710_5B940",
    },
    {
      name: "Medusa La Greca Overshirt",
      slug: "medusa-la-greca-overshirt",
      images: [
        { primary: "/images/10/image1.webp" },
        { secondary: "/images/10/image2.webp" },
        { modelFront: "/images/10/image3.webp" },
        { modelBack: "/images/10/image4.webp" },
        { materialCloseUp: "/images/10/image5.webp" },
        { video: "/images/10/video1.mp4" },
      ],
      price: 737,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "shirts",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "A lightweight design with wide short sleeves, this shirt features Medusa buttons and a tonal La Greca print inserts.",
      details: [
        "Medusa buttons",
        "La Greca print",
        "Short sleeves",
        "Camp collar",
        "Outer Fabric: 100% Polyamide",
        "Lining: 100% Cotton",
        "Trim: 100% Polyamide",
        "Cool iron",
        "Delicate dry clean",
        "Do not bleach",
        "Do not tumble dry",
        "Dry flat",
        "Machine wash cold (delicate)",
      ],
      sku: "1006019-1A04118_1B000",
    },
    {
      name: "Barocco Silhouette Silk Shorts",
      slug: "barocco-silhouette-silk-shorts",
      images: [
        { primary: "/images/11/image1.webp" },
        { secondary: "/images/11/image2.jpg" },
        { modelFront: "/images/11/image3.jpg" },
        { modelBack: "/images/11/image4.jpg" },
        { materialCloseUp: "/images/11/image5.jpg" },
      ],
      price: 1250,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "pants-shorts",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "Crafted from silk twill, these knee-length shorts feature a printed stud rendition of the Barocco Silhouette motif. This wide-leg style is finished with an elasticized waistband.",
      details: [
        "Barocco Silhouette print",
        "Side pockets",
        "Elasticated waistband",
        "Outer composition: 100% Silk",
        "Lining: 100% Cupro",
      ],
      sku: "1002476-1A06140_5B950",
    },
    {
      name: "Versace Wide-Leg Jeans",
      slug: "versace-wide-leg-jeans",
      images: [
        { primary: "/images/12/image1.webp" },
        { secondary: "/images/12/image2.webp" },
        { modelFront: "/images/12/image3.webp" },
        { modelBack: "/images/12/image4.webp" },
        { materialCloseUp: "/images/12/image5.webp" },
      ],
      price: 925,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "pants-shorts",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "In a wide-leg silhouette, these washed jeans feature large denim panelling with contrast stitching and cargo pockets on the leg.",
      details: [
        "Denim panelling detail",
        "Belt loops",
        "Button and zip closure",
        "Cargo pockets",
        "Back and side pockets",
        "Outer composition: 100% Cotton",
        "Lining: 65% Polyester, 35% Cotton",
        "Trim: 100% Calf leather",
      ],
      sku: "1008624-1A05762_1D490",
    },
    {
      name: "Medusa Slim-Fit Jeans",
      slug: "medusa-slim-fit-jeans",
      images: [
        { primary: "/images/13/image1.webp" },
        { secondary: "/images/13/image2.webp" },
        { modelFront: "/images/13/image3.webp" },
        { modelBack: "/images/13/image4.webp" },
        { materialCloseUp: "/images/13/image5.jpg" },
      ],
      price: 750,
      brand: "Versace",
      category: "men",
      subcategory: "clothing",
      subSubcategory: "pants-shorts",
      color: ["Fuchsia", "Turquoise"],
      countInStock: 20,
      description:
        "In a stretch cotton denim, these slim-fit jeans feature a five-pocket design with a three-dimensional Medusa plaque at the back.",
      details: [
        "Medusa plaque",
        "Belt loops",
        "Slim fit",
        "Five-pocket design",
        "Button and zip closure",
        "Outer fabric: 98% Cotton 2% Elastane",
        "Lining: 100% Cotton",
        "Trim: 100% Calf leather",
        "Cool iron on reverse with damp cloth on top",
        "Delicate dry clean",
        "Do not bleach",
        "Do not tumble dry",
        "Machine wash cold (delicate)",
        "Protect accessory before washing",
        "Wash inside out",
      ],
      sku: "A81832-1A03458_1D210",
    },
  ],

  countries: [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua &amp; Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia &amp; Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre &amp; Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts &amp; Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad &amp; Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks &amp; Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ],
};

export default data;
