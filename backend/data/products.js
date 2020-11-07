const products = [
  {
    name: 'Macbook Air',
    images: [
      {
        image: 'macbook1.jpg',
        credit:
          "<a href='https://pixabay.com/users/qiye-116/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=190970'>育银 戚</a>",
      },
      {
        image: 'macbook2.jpg',
        credit:
          "<a href='https://pixabay.com/users/pexels-2286921/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1282241'>Pexels</a>",
      },
      {
        image: 'macbook3.jpg',
        credit:
          "<a href='https://pixabay.com/photos/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=336651'>Free-Photos</a>",
      },
    ],
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Kraken Pro V2',
    images: [
      {
        image: 'razer1.jpg',
        credit:
          "<a href='https://pixabay.com/users/minimalist_-2133313/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1377194'>minimalist_</a>",
      },
      {
        image: 'razer2.jpg',
        credit:
          "<a href='https://pixabay.com/users/minimalist_-2133313/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1377193'>minimalist_</a>",
      },
      {
        image: 'razer3.jpg',
        credit:
          "<a href='https://pixabay.com/users/minimalist_-2133313/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1377195'>minimalist_</a>",
      },
    ],
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Razer',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'A9 II Mirrorless Camera Body',
    images: [
      {
        image: 'sony1.jpg',
        credit:
          "<a href='https://pixabay.com/users/alexei_other-9114223/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4833557'>Alexei Chizhov</a>",
      },
      {
        image: 'sony2.jpg',
        credit:
          "<a href='https://pixabay.com/users/alexei_other-9114223/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4833561'>Alexei Chizhov</a>",
      },
      {
        image: 'sony3.jpg',
        credit:
          "<a href='https://pixabay.com/users/rkarkowski-289667/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=431119'>Robert Karkowski</a>",
      },
    ],
    description:
      'The new Alpha 9 II builds on the impressive legacy of the original Alpha 9, maintaining ground breaking speed performance including blackout-free continuous shooting at up to 20 frames per second with Auto Focus and Auto Exposure tracking, 60 times per second AF/AE calculations while incorporating even more functionality driven directly from the voice of professionals. Updates include significantly enhanced connectivity and file delivery, continuous shooting at up to 10 fps with mechanical shutter, evolved AF performance with newly optimised algorithms, a re-designed build to enhance durability and operability and more.',
    brand: 'Sony',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Gameboy',
    images: [
      {
        image: 'gameboy1.jpg',
        credit:
          "<a href='https://pixabay.com/users/ptra-359668/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3912103'>ptra</a>",
      },
      {
        image: 'gameboy2.jpg',
        credit:
          "<a href='https://pixabay.com/users/dimhou-5987327/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3672462'>Dimitri Houtteman</a>",
      },
    ],
    description:
      'The Game Boy is an 8-bit handheld game console developed and manufactured by Nintendo. The first handheld in the Game Boy family, it was first released in Japan on April 21, 1989, then North America, three months later, and lastly in Europe, more than one year later.',
    brand: 'Nintendo',
    category: 'Electronics',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'iPhone 6 / 64GB',
    images: [
      {
        image: 'iphone1.jpg',
        credit:
          "<a href='https://pixabay.com/users/cmart29-3708955/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1830479'>Chris Martin</a>",
      },
      {
        image: 'iphone2.jpg',
        credit:
          "<a href='https://pixabay.com/users/jessbaileydesign-7369896/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3068617'>Jess Bailey</a>",
      },
      {
        image: 'iphone3.jpg',
        credit:
          "<a href='https://pixabay.com/users/toomacz-805248/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=856188'>Jan Tůma</a>",
      },
    ],
    description:
      'The Apple iPhone 6s Smartphone sports a 4.7-inch Retina HD display and is available in elegant space gray. It has a storage capacity of 32 GB, and it runs on iOS. The slim phone features 3D Touch as well as Touch ID technology. Powered by the A9 chip with 64-bit architecture and integrated M9 motion coprocessor, it provides high speed and efficiency. Featuring a 12 MP iSight rear camera and a 5 MP FaceTime HD front camera, it allows you to capture sharp and detailed photographs or videos. In addition, this light and compact phone offers LTE and Wi-Fi connectivity. This device is compatible with Cricket, AT&T Carriers.',
    brand: 'Apple',
    category: 'Electronics',
    price: 179.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'iPad 6th Gen. 128GB',
    images: [
      {
        image: 'ipad1.jpg',
        credit:
          "<a href='https://pixabay.com/users/inproperstyle-617761/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1291524'>C. Koch</a>",
      },
      {
        image: 'ipad2.jpg',
        credit:
          "<a href='https://pixabay.com/users/maxxgirr-3565425/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4532326'>Maxx Girr</a>",
      },
    ],
    description:
      'Offering a host of features with an eye-catching design, the Apple iPad 128GB tablet PC in space grey certainly packs a punch. Powered by the 2.03 GHz Apple A10 Fusion processor and running on iOS operating system, this iPad adapts to your needs with maximum performance, enhanced battery life, and an unparalleled visual experience. The iPad (6th Gen has a 9.7" IPS LED-backlit 2048 by 1536 display (264 ppi with an "oleophobic" (oil repellent coating. With a 128GB memory capacity, the Apple iPad lets you save all your multimedia files. Plus, the tablet supports Wi-Fi and allows you to surf the Web and download videos and games at lightning-fast speed. What’s more, the 8 MP camera enables you to capture stunning, high-quality images with amazing clarity.',
    brand: 'Apple',
    category: 'Electronics',
    price: 233.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
];

export default products;
