const products = [
  {
    discount: {
      amount: 10,
      expireDate: '2021-12-16T00:00:00.000Z',
      totalPrice: 170.99,
    },
    rating: 4.5,
    numReviews: 2,
    show: true,
    countInStock: 10,
    _id: '5fd9f4f0f9d80c4154890233',
    user: '5fd8ab618d79c11ecca39a42',
    name: 'Macbook Air',
    images: [
      {
        _id: '5fd9f4f0f9d80c4154890234',
        image: 'macbook1.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/qiye-116/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=190970'>育银 戚</a>",
      },
      {
        _id: '5fd9f4f0f9d80c4154890235',
        image: 'macbook2.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/pexels-2286921/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1282241'>Pexels</a>",
      },
      {
        _id: '5fd9f4f0f9d80c4154890236',
        image: 'macbook3.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/photos/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=336651'>Free-Photos</a>",
      },
    ],
    description:
      '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</h2><h4>Vivamus sed rutrum velit.&nbsp;</h4><p>Morbi sit amet nibh at turpis pulvinar pharetra. Etiam eu accumsan lacus. Vivamus viverra urna ac hendrerit ultrices. Integer scelerisque pharetra pellentesque. Donec posuere vitae lacus in dictum. Etiam sed lacus ex. Praesent ipsum est, dapibus quis pretium eget, ultrices facilisis nisi. Ut pretium ac felis hendrerit tincidunt. Mauris posuere ante vel ultricies tincidunt. Nam quis vestibulum neque, sit amet egestas dolor.&nbsp;</p><p><strong>Ut sodales auctor enim sit amet mollis:</strong>&nbsp;</p><ul><li>Proin tempus tellus at arcu commodo gravida.,</li><li>Suspendisse congue,&nbsp;</li><li>Ligula a blandit ornare, ante urna egestas massa,&nbsp;</li><li>Non rutrum est mauris sed libero.</li></ul><h3>Morbi eu viverra est.&nbsp;</h3><p>Phasellus nisl mi, ornare id ultrices et, viverra et dolor. Aenean rutrum ornare ex sit amet commodo.&nbsp;</p><p>Nullam imperdiet volutpat nunc ut aliquam.&nbsp;</p><blockquote><p><i><strong>Proin vel tortor ut ante lacinia rutrum. In fermentum et nunc dignissim gravida. Praesent eu risus vitae diam pulvinar venenatis.</strong></i></p></blockquote><p>&nbsp;Proin nec augue eu leo cursus maximus ac eu mi. Nulla arcu urna, cursus at finibus sed, sagittis sed metus. Donec lacinia varius nisl a consequat. Ut a ante nisi. Aenean efficitur purus non urna convallis condimentum. Pellentesque vel fermentum metus. Etiam id quam a augue condimentum euismod a in dolor.</p><h3>In non elementum sapien.</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis auctor metus vel convallis. Curabitur ut efficitur turpis, eget efficitur quam. Praesent tempus ipsum in euismod dapibus. Pellentesque volutpat euismod facilisis. Cras a ultricies libero, a sagittis erat. Phasellus rutrum enim quis tortor lobortis, eget vestibulum dolor aliquet. In egestas quam et tristique vestibulum. Fusce tincidunt dapibus ex, quis pharetra nulla efficitur sit amet.</p><h3>Suspendisse potenti.&nbsp;</h3><p>Sed fermentum lorem et risus imperdiet.</p><p><strong>Vel scelerisque nibh tempus.</strong>&nbsp;</p><ol><li>Aliquam tincidunt placerat lacus,&nbsp;</li><li>In rutrum justo convallis eu,</li><li>Ut est enim, dictum in aliquet a,&nbsp;</li><li>Finibus bibendum justo. Cras turpis massa, volutpat a rutrum vitae,</li></ol><p>Interdum vel nisl. Donec laoreet diam non tellus aliquet volutpat. Donec euismod nisi sed placerat volutpat. Vivamus vestibulum ligula eu nibh viverra, vitae tempor nisi euismod. Aliquam erat volutpat. Sed maximus ipsum lacus, eget ultrices quam hendrerit eleifend.</p><h3>In vestibulum mauris sed volutpat mollis.&nbsp;</h3><p>Pellentesque non consectetur neque. In vitae sapien massa. Cras risus sem, dictum vitae ligula in, posuere tincidunt libero. Vivamus sagittis lacus nec egestas gravida. Quisque lacus sapien, fringilla auctor commodo nec, efficitur et ex. Maecenas at consequat leo. Integer semper lobortis placerat. Quisque tellus dui, dignissim non est at, hendrerit molestie magna. Aliquam ac ex at nulla eleifend hendrerit ac non neque. Aliquam at diam massa. Suspendisse convallis arcu sit amet quam iaculis, nec vestibulum justo sagittis. Vestibulum placerat, felis lobortis lobortis dictum, sem elit convallis erat, eu fringilla nibh augue eu ipsum.</p>',
    brand: 'Apple',
    category: 'Electronics',
    price: 189.99,
    labels: [],
    reviews: [
      {
        comment: 'Very fast and silent',
        _id: '5fd9e24a55d5f13c28103094',
        name: 'John',
        rating: 4,
        user: '5fd8ab618d79c11ecca39a43',
        createdAt: '2020-12-16T10:32:42.808Z',
        updatedAt: '2020-12-16T10:32:42.808Z',
      },
      {
        comment: ':>',
        _id: '5fd9e29155d5f13c28103095',
        name: 'Jane',
        rating: 5,
        user: '5fd8ab618d79c11ecca39a44',
        createdAt: '2020-12-16T10:33:53.282Z',
        updatedAt: '2020-12-16T10:33:53.282Z',
      },
    ],
    __v: 0,
    createdAt: '2020-12-16T11:52:16.985Z',
    updatedAt: '2020-12-16T11:52:16.985Z',
  },
  {
    discount: {
      amount: 0,
      expireDate: '2020-12-16T00:00:00.000Z',
      totalPrice: 0,
    },
    rating: 0,
    numReviews: 0,
    show: true,
    countInStock: 7,
    _id: '5fd9f4f0f9d80c4154890239',
    user: '5fd8ab618d79c11ecca39a42',
    name: 'Kraken Pro V2',
    images: [
      {
        _id: '5fd9f4f0f9d80c415489023a',
        image: 'razer1.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/minimalist_-2133313/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1377194'>minimalist_</a>",
      },
      {
        _id: '5fd9f4f0f9d80c415489023b',
        image: 'razer2.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/minimalist_-2133313/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1377193'>minimalist_</a>",
      },
      {
        _id: '5fd9f4f0f9d80c415489023c',
        image: 'razer3.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/minimalist_-2133313/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1377195'>minimalist_</a>",
      },
    ],
    description:
      '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</h2><h4>Vivamus sed rutrum velit.&nbsp;</h4><p>Morbi sit amet nibh at turpis pulvinar pharetra. Etiam eu accumsan lacus. Vivamus viverra urna ac hendrerit ultrices. Integer scelerisque pharetra pellentesque. Donec posuere vitae lacus in dictum. Etiam sed lacus ex. Praesent ipsum est, dapibus quis pretium eget, ultrices facilisis nisi. Ut pretium ac felis hendrerit tincidunt. Mauris posuere ante vel ultricies tincidunt. Nam quis vestibulum neque, sit amet egestas dolor.&nbsp;</p><p><strong>Ut sodales auctor enim sit amet mollis:</strong>&nbsp;</p><ul><li>Proin tempus tellus at arcu commodo gravida.,</li><li>Suspendisse congue,&nbsp;</li><li>Ligula a blandit ornare, ante urna egestas massa,&nbsp;</li><li>Non rutrum est mauris sed libero.</li></ul><h3>Morbi eu viverra est.&nbsp;</h3><p>Phasellus nisl mi, ornare id ultrices et, viverra et dolor. Aenean rutrum ornare ex sit amet commodo.&nbsp;</p><p>Nullam imperdiet volutpat nunc ut aliquam.&nbsp;</p><blockquote><p><i><strong>Proin vel tortor ut ante lacinia rutrum. In fermentum et nunc dignissim gravida. Praesent eu risus vitae diam pulvinar venenatis.</strong></i></p></blockquote><p>&nbsp;Proin nec augue eu leo cursus maximus ac eu mi. Nulla arcu urna, cursus at finibus sed, sagittis sed metus. Donec lacinia varius nisl a consequat. Ut a ante nisi. Aenean efficitur purus non urna convallis condimentum. Pellentesque vel fermentum metus. Etiam id quam a augue condimentum euismod a in dolor.</p><h3>In non elementum sapien.</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis auctor metus vel convallis. Curabitur ut efficitur turpis, eget efficitur quam. Praesent tempus ipsum in euismod dapibus. Pellentesque volutpat euismod facilisis. Cras a ultricies libero, a sagittis erat. Phasellus rutrum enim quis tortor lobortis, eget vestibulum dolor aliquet. In egestas quam et tristique vestibulum. Fusce tincidunt dapibus ex, quis pharetra nulla efficitur sit amet.</p><h3>Suspendisse potenti.&nbsp;</h3><p>Sed fermentum lorem et risus imperdiet.</p><p><strong>Vel scelerisque nibh tempus.</strong>&nbsp;</p><ol><li>Aliquam tincidunt placerat lacus,&nbsp;</li><li>In rutrum justo convallis eu,</li><li>Ut est enim, dictum in aliquet a,&nbsp;</li><li>Finibus bibendum justo. Cras turpis massa, volutpat a rutrum vitae,</li></ol><p>Interdum vel nisl. Donec laoreet diam non tellus aliquet volutpat. Donec euismod nisi sed placerat volutpat. Vivamus vestibulum ligula eu nibh viverra, vitae tempor nisi euismod. Aliquam erat volutpat. Sed maximus ipsum lacus, eget ultrices quam hendrerit eleifend.</p><h3>In vestibulum mauris sed volutpat mollis.&nbsp;</h3><p>Pellentesque non consectetur neque. In vitae sapien massa. Cras risus sem, dictum vitae ligula in, posuere tincidunt libero. Vivamus sagittis lacus nec egestas gravida. Quisque lacus sapien, fringilla auctor commodo nec, efficitur et ex. Maecenas at consequat leo. Integer semper lobortis placerat. Quisque tellus dui, dignissim non est at, hendrerit molestie magna. Aliquam ac ex at nulla eleifend hendrerit ac non neque. Aliquam at diam massa. Suspendisse convallis arcu sit amet quam iaculis, nec vestibulum justo sagittis. Vestibulum placerat, felis lobortis lobortis dictum, sem elit convallis erat, eu fringilla nibh augue eu ipsum.</p>',
    brand: 'Razer',
    category: 'Electronics',
    price: 599.99,
    labels: [],
    reviews: [],
    __v: 0,
    createdAt: '2020-12-16T11:52:16.985Z',
    updatedAt: '2020-12-16T11:52:16.985Z',
  },
  {
    discount: {
      amount: 0,
      expireDate: '2020-12-16T00:00:00.000Z',
      totalPrice: 0,
    },
    rating: 0,
    numReviews: 0,
    show: true,
    countInStock: 5,
    _id: '5fd9f4f0f9d80c415489023d',
    user: '5fd8ab618d79c11ecca39a42',
    name: 'A9 II Mirrorless Camera Body',
    images: [
      {
        _id: '5fd9f4f0f9d80c415489023e',
        image: 'sony1.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/alexei_other-9114223/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4833557'>Alexei Chizhov</a>",
      },
      {
        _id: '5fd9f4f0f9d80c415489023f',
        image: 'sony2.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/alexei_other-9114223/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4833561'>Alexei Chizhov</a>",
      },
      {
        _id: '5fd9f4f0f9d80c4154890240',
        image: 'sony3.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/rkarkowski-289667/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=431119'>Robert Karkowski</a>",
      },
    ],
    description:
      '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</h2><h4>Vivamus sed rutrum velit.&nbsp;</h4><p>Morbi sit amet nibh at turpis pulvinar pharetra. Etiam eu accumsan lacus. Vivamus viverra urna ac hendrerit ultrices. Integer scelerisque pharetra pellentesque. Donec posuere vitae lacus in dictum. Etiam sed lacus ex. Praesent ipsum est, dapibus quis pretium eget, ultrices facilisis nisi. Ut pretium ac felis hendrerit tincidunt. Mauris posuere ante vel ultricies tincidunt. Nam quis vestibulum neque, sit amet egestas dolor.&nbsp;</p><p><strong>Ut sodales auctor enim sit amet mollis:</strong>&nbsp;</p><ul><li>Proin tempus tellus at arcu commodo gravida.,</li><li>Suspendisse congue,&nbsp;</li><li>Ligula a blandit ornare, ante urna egestas massa,&nbsp;</li><li>Non rutrum est mauris sed libero.</li></ul><h3>Morbi eu viverra est.&nbsp;</h3><p>Phasellus nisl mi, ornare id ultrices et, viverra et dolor. Aenean rutrum ornare ex sit amet commodo.&nbsp;</p><p>Nullam imperdiet volutpat nunc ut aliquam.&nbsp;</p><blockquote><p><i><strong>Proin vel tortor ut ante lacinia rutrum. In fermentum et nunc dignissim gravida. Praesent eu risus vitae diam pulvinar venenatis.</strong></i></p></blockquote><p>&nbsp;Proin nec augue eu leo cursus maximus ac eu mi. Nulla arcu urna, cursus at finibus sed, sagittis sed metus. Donec lacinia varius nisl a consequat. Ut a ante nisi. Aenean efficitur purus non urna convallis condimentum. Pellentesque vel fermentum metus. Etiam id quam a augue condimentum euismod a in dolor.</p><h3>In non elementum sapien.</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis auctor metus vel convallis. Curabitur ut efficitur turpis, eget efficitur quam. Praesent tempus ipsum in euismod dapibus. Pellentesque volutpat euismod facilisis. Cras a ultricies libero, a sagittis erat. Phasellus rutrum enim quis tortor lobortis, eget vestibulum dolor aliquet. In egestas quam et tristique vestibulum. Fusce tincidunt dapibus ex, quis pharetra nulla efficitur sit amet.</p><h3>Suspendisse potenti.&nbsp;</h3><p>Sed fermentum lorem et risus imperdiet.</p><p><strong>Vel scelerisque nibh tempus.</strong>&nbsp;</p><ol><li>Aliquam tincidunt placerat lacus,&nbsp;</li><li>In rutrum justo convallis eu,</li><li>Ut est enim, dictum in aliquet a,&nbsp;</li><li>Finibus bibendum justo. Cras turpis massa, volutpat a rutrum vitae,</li></ol><p>Interdum vel nisl. Donec laoreet diam non tellus aliquet volutpat. Donec euismod nisi sed placerat volutpat. Vivamus vestibulum ligula eu nibh viverra, vitae tempor nisi euismod. Aliquam erat volutpat. Sed maximus ipsum lacus, eget ultrices quam hendrerit eleifend.</p><h3>In vestibulum mauris sed volutpat mollis.&nbsp;</h3><p>Pellentesque non consectetur neque. In vitae sapien massa. Cras risus sem, dictum vitae ligula in, posuere tincidunt libero. Vivamus sagittis lacus nec egestas gravida. Quisque lacus sapien, fringilla auctor commodo nec, efficitur et ex. Maecenas at consequat leo. Integer semper lobortis placerat. Quisque tellus dui, dignissim non est at, hendrerit molestie magna. Aliquam ac ex at nulla eleifend hendrerit ac non neque. Aliquam at diam massa. Suspendisse convallis arcu sit amet quam iaculis, nec vestibulum justo sagittis. Vestibulum placerat, felis lobortis lobortis dictum, sem elit convallis erat, eu fringilla nibh augue eu ipsum.</p>',
    brand: 'Sony',
    category: 'Electronics',
    price: 929.99,
    labels: [],
    reviews: [],
    __v: 0,
    createdAt: '2020-12-16T11:52:16.986Z',
    updatedAt: '2020-12-16T11:52:16.986Z',
  },
  {
    discount: {
      amount: 0,
      expireDate: '2020-12-16T00:00:00.000Z',
      totalPrice: 0,
    },
    rating: 5,
    numReviews: 12,
    show: true,
    countInStock: 11,
    _id: '5fd9f4f0f9d80c4154890241',
    user: '5fd8ab618d79c11ecca39a42',
    name: 'Gameboy',
    images: [
      {
        _id: '5fd9f4f0f9d80c4154890242',
        image: 'gameboy1.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/ptra-359668/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3912103'>ptra</a>",
      },
      {
        _id: '5fd9f4f0f9d80c4154890243',
        image: 'gameboy2.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/dimhou-5987327/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3672462'>Dimitri Houtteman</a>",
      },
    ],
    description:
      '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</h2><h4>Vivamus sed rutrum velit.&nbsp;</h4><p>Morbi sit amet nibh at turpis pulvinar pharetra. Etiam eu accumsan lacus. Vivamus viverra urna ac hendrerit ultrices. Integer scelerisque pharetra pellentesque. Donec posuere vitae lacus in dictum. Etiam sed lacus ex. Praesent ipsum est, dapibus quis pretium eget, ultrices facilisis nisi. Ut pretium ac felis hendrerit tincidunt. Mauris posuere ante vel ultricies tincidunt. Nam quis vestibulum neque, sit amet egestas dolor.&nbsp;</p><p><strong>Ut sodales auctor enim sit amet mollis:</strong>&nbsp;</p><ul><li>Proin tempus tellus at arcu commodo gravida.,</li><li>Suspendisse congue,&nbsp;</li><li>Ligula a blandit ornare, ante urna egestas massa,&nbsp;</li><li>Non rutrum est mauris sed libero.</li></ul><h3>Morbi eu viverra est.&nbsp;</h3><p>Phasellus nisl mi, ornare id ultrices et, viverra et dolor. Aenean rutrum ornare ex sit amet commodo.&nbsp;</p><p>Nullam imperdiet volutpat nunc ut aliquam.&nbsp;</p><blockquote><p><i><strong>Proin vel tortor ut ante lacinia rutrum. In fermentum et nunc dignissim gravida. Praesent eu risus vitae diam pulvinar venenatis.</strong></i></p></blockquote><p>&nbsp;Proin nec augue eu leo cursus maximus ac eu mi. Nulla arcu urna, cursus at finibus sed, sagittis sed metus. Donec lacinia varius nisl a consequat. Ut a ante nisi. Aenean efficitur purus non urna convallis condimentum. Pellentesque vel fermentum metus. Etiam id quam a augue condimentum euismod a in dolor.</p><h3>In non elementum sapien.</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis auctor metus vel convallis. Curabitur ut efficitur turpis, eget efficitur quam. Praesent tempus ipsum in euismod dapibus. Pellentesque volutpat euismod facilisis. Cras a ultricies libero, a sagittis erat. Phasellus rutrum enim quis tortor lobortis, eget vestibulum dolor aliquet. In egestas quam et tristique vestibulum. Fusce tincidunt dapibus ex, quis pharetra nulla efficitur sit amet.</p><h3>Suspendisse potenti.&nbsp;</h3><p>Sed fermentum lorem et risus imperdiet.</p><p><strong>Vel scelerisque nibh tempus.</strong>&nbsp;</p><ol><li>Aliquam tincidunt placerat lacus,&nbsp;</li><li>In rutrum justo convallis eu,</li><li>Ut est enim, dictum in aliquet a,&nbsp;</li><li>Finibus bibendum justo. Cras turpis massa, volutpat a rutrum vitae,</li></ol><p>Interdum vel nisl. Donec laoreet diam non tellus aliquet volutpat. Donec euismod nisi sed placerat volutpat. Vivamus vestibulum ligula eu nibh viverra, vitae tempor nisi euismod. Aliquam erat volutpat. Sed maximus ipsum lacus, eget ultrices quam hendrerit eleifend.</p><h3>In vestibulum mauris sed volutpat mollis.&nbsp;</h3><p>Pellentesque non consectetur neque. In vitae sapien massa. Cras risus sem, dictum vitae ligula in, posuere tincidunt libero. Vivamus sagittis lacus nec egestas gravida. Quisque lacus sapien, fringilla auctor commodo nec, efficitur et ex. Maecenas at consequat leo. Integer semper lobortis placerat. Quisque tellus dui, dignissim non est at, hendrerit molestie magna. Aliquam ac ex at nulla eleifend hendrerit ac non neque. Aliquam at diam massa. Suspendisse convallis arcu sit amet quam iaculis, nec vestibulum justo sagittis. Vestibulum placerat, felis lobortis lobortis dictum, sem elit convallis erat, eu fringilla nibh augue eu ipsum.</p>',
    brand: 'Nintendo',
    category: 'Electronics',
    price: 399.99,
    labels: [
      {
        color: '#fff',
        bgColor: '#ff1010',
        _id: '5fd9e46227f0f24cb8b75df6',
        labelText: 'Still in original box!',
      },
    ],
    reviews: [
      {
        comment: 'Amazing!',
        _id: '5fd9e22955d5f13c28103093',
        name: 'John',
        rating: 5,
        user: '5fd8ab618d79c11ecca39a43',
        createdAt: '2020-12-16T10:32:09.791Z',
        updatedAt: '2020-12-16T10:32:09.791Z',
      },
    ],
    __v: 0,
    createdAt: '2020-12-16T11:52:16.986Z',
    updatedAt: '2020-12-16T11:52:16.986Z',
  },
  {
    discount: {
      amount: 0,
      expireDate: '2020-12-16T00:00:00.000Z',
      totalPrice: 0,
    },
    rating: 0,
    numReviews: 0,
    show: true,
    countInStock: 7,
    _id: '5fd9f4f0f9d80c4154890246',
    user: '5fd8ab618d79c11ecca39a42',
    name: 'iPhone 6 / 64GB',
    images: [
      {
        _id: '5fd9f4f0f9d80c4154890247',
        image: 'iphone1.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/cmart29-3708955/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1830479'>Chris Martin</a>",
      },
      {
        _id: '5fd9f4f0f9d80c4154890248',
        image: 'iphone2.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/jessbaileydesign-7369896/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3068617'>Jess Bailey</a>",
      },
      {
        _id: '5fd9f4f0f9d80c4154890249',
        image: 'iphone3.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/toomacz-805248/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=856188'>Jan Tůma</a>",
      },
    ],
    description:
      '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</h2><h4>Vivamus sed rutrum velit.&nbsp;</h4><p>Morbi sit amet nibh at turpis pulvinar pharetra. Etiam eu accumsan lacus. Vivamus viverra urna ac hendrerit ultrices. Integer scelerisque pharetra pellentesque. Donec posuere vitae lacus in dictum. Etiam sed lacus ex. Praesent ipsum est, dapibus quis pretium eget, ultrices facilisis nisi. Ut pretium ac felis hendrerit tincidunt. Mauris posuere ante vel ultricies tincidunt. Nam quis vestibulum neque, sit amet egestas dolor.&nbsp;</p><p><strong>Ut sodales auctor enim sit amet mollis:</strong>&nbsp;</p><ul><li>Proin tempus tellus at arcu commodo gravida.,</li><li>Suspendisse congue,&nbsp;</li><li>Ligula a blandit ornare, ante urna egestas massa,&nbsp;</li><li>Non rutrum est mauris sed libero.</li></ul><h3>Morbi eu viverra est.&nbsp;</h3><p>Phasellus nisl mi, ornare id ultrices et, viverra et dolor. Aenean rutrum ornare ex sit amet commodo.&nbsp;</p><p>Nullam imperdiet volutpat nunc ut aliquam.&nbsp;</p><blockquote><p><i><strong>Proin vel tortor ut ante lacinia rutrum. In fermentum et nunc dignissim gravida. Praesent eu risus vitae diam pulvinar venenatis.</strong></i></p></blockquote><p>&nbsp;Proin nec augue eu leo cursus maximus ac eu mi. Nulla arcu urna, cursus at finibus sed, sagittis sed metus. Donec lacinia varius nisl a consequat. Ut a ante nisi. Aenean efficitur purus non urna convallis condimentum. Pellentesque vel fermentum metus. Etiam id quam a augue condimentum euismod a in dolor.</p><h3>In non elementum sapien.</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis auctor metus vel convallis. Curabitur ut efficitur turpis, eget efficitur quam. Praesent tempus ipsum in euismod dapibus. Pellentesque volutpat euismod facilisis. Cras a ultricies libero, a sagittis erat. Phasellus rutrum enim quis tortor lobortis, eget vestibulum dolor aliquet. In egestas quam et tristique vestibulum. Fusce tincidunt dapibus ex, quis pharetra nulla efficitur sit amet.</p><h3>Suspendisse potenti.&nbsp;</h3><p>Sed fermentum lorem et risus imperdiet.</p><p><strong>Vel scelerisque nibh tempus.</strong>&nbsp;</p><ol><li>Aliquam tincidunt placerat lacus,&nbsp;</li><li>In rutrum justo convallis eu,</li><li>Ut est enim, dictum in aliquet a,&nbsp;</li><li>Finibus bibendum justo. Cras turpis massa, volutpat a rutrum vitae,</li></ol><p>Interdum vel nisl. Donec laoreet diam non tellus aliquet volutpat. Donec euismod nisi sed placerat volutpat. Vivamus vestibulum ligula eu nibh viverra, vitae tempor nisi euismod. Aliquam erat volutpat. Sed maximus ipsum lacus, eget ultrices quam hendrerit eleifend.</p><h3>In vestibulum mauris sed volutpat mollis.&nbsp;</h3><p>Pellentesque non consectetur neque. In vitae sapien massa. Cras risus sem, dictum vitae ligula in, posuere tincidunt libero. Vivamus sagittis lacus nec egestas gravida. Quisque lacus sapien, fringilla auctor commodo nec, efficitur et ex. Maecenas at consequat leo. Integer semper lobortis placerat. Quisque tellus dui, dignissim non est at, hendrerit molestie magna. Aliquam ac ex at nulla eleifend hendrerit ac non neque. Aliquam at diam massa. Suspendisse convallis arcu sit amet quam iaculis, nec vestibulum justo sagittis. Vestibulum placerat, felis lobortis lobortis dictum, sem elit convallis erat, eu fringilla nibh augue eu ipsum.</p>',
    brand: 'Apple',
    category: 'Electronics',
    price: 179.99,
    labels: [],
    reviews: [],
    __v: 0,
    createdAt: '2020-12-16T11:52:16.986Z',
    updatedAt: '2020-12-16T11:52:16.986Z',
  },
  {
    discount: {
      amount: 0,
      expireDate: '2020-12-16T00:00:00.000Z',
      totalPrice: 0,
    },
    rating: 0,
    numReviews: 0,
    show: true,
    countInStock: 12,
    _id: '5fd9f4f0f9d80c415489024a',
    user: '5fd8ab618d79c11ecca39a42',
    name: 'Apple Watch Series 6 GPS 40mm',
    images: [
      {
        _id: '5fd9f4f0f9d80c415489024b',
        image: 'appleWatch1.jpg',
        description:
          'Image by <a target="_blank" href="https://pixabay.com/users/alexbor-818402/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1500849">Alexandr Borecký</a>',
      },
      {
        _id: '5fd9f4f0f9d80c415489024c',
        image: 'appleWatch2.jpg',
        description:
          'Image by <a target="_blank" href="https://pixabay.com/users/stocksnap-894430/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2599673">StockSnap</a>',
      },
    ],
    description:
      '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</h2><h4>Vivamus sed rutrum velit.&nbsp;</h4><p>Morbi sit amet nibh at turpis pulvinar pharetra. Etiam eu accumsan lacus. Vivamus viverra urna ac hendrerit ultrices. Integer scelerisque pharetra pellentesque. Donec posuere vitae lacus in dictum. Etiam sed lacus ex. Praesent ipsum est, dapibus quis pretium eget, ultrices facilisis nisi. Ut pretium ac felis hendrerit tincidunt. Mauris posuere ante vel ultricies tincidunt. Nam quis vestibulum neque, sit amet egestas dolor.&nbsp;</p><p><strong>Ut sodales auctor enim sit amet mollis:</strong>&nbsp;</p><ul><li>Proin tempus tellus at arcu commodo gravida.,</li><li>Suspendisse congue,&nbsp;</li><li>Ligula a blandit ornare, ante urna egestas massa,&nbsp;</li><li>Non rutrum est mauris sed libero.</li></ul><h3>Morbi eu viverra est.&nbsp;</h3><p>Phasellus nisl mi, ornare id ultrices et, viverra et dolor. Aenean rutrum ornare ex sit amet commodo.&nbsp;</p><p>Nullam imperdiet volutpat nunc ut aliquam.&nbsp;</p><blockquote><p><i><strong>Proin vel tortor ut ante lacinia rutrum. In fermentum et nunc dignissim gravida. Praesent eu risus vitae diam pulvinar venenatis.</strong></i></p></blockquote><p>&nbsp;Proin nec augue eu leo cursus maximus ac eu mi. Nulla arcu urna, cursus at finibus sed, sagittis sed metus. Donec lacinia varius nisl a consequat. Ut a ante nisi. Aenean efficitur purus non urna convallis condimentum. Pellentesque vel fermentum metus. Etiam id quam a augue condimentum euismod a in dolor.</p><h3>In non elementum sapien.</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis auctor metus vel convallis. Curabitur ut efficitur turpis, eget efficitur quam. Praesent tempus ipsum in euismod dapibus. Pellentesque volutpat euismod facilisis. Cras a ultricies libero, a sagittis erat. Phasellus rutrum enim quis tortor lobortis, eget vestibulum dolor aliquet. In egestas quam et tristique vestibulum. Fusce tincidunt dapibus ex, quis pharetra nulla efficitur sit amet.</p><h3>Suspendisse potenti.&nbsp;</h3><p>Sed fermentum lorem et risus imperdiet.</p><p><strong>Vel scelerisque nibh tempus.</strong>&nbsp;</p><ol><li>Aliquam tincidunt placerat lacus,&nbsp;</li><li>In rutrum justo convallis eu,</li><li>Ut est enim, dictum in aliquet a,&nbsp;</li><li>Finibus bibendum justo. Cras turpis massa, volutpat a rutrum vitae,</li></ol><p>Interdum vel nisl. Donec laoreet diam non tellus aliquet volutpat. Donec euismod nisi sed placerat volutpat. Vivamus vestibulum ligula eu nibh viverra, vitae tempor nisi euismod. Aliquam erat volutpat. Sed maximus ipsum lacus, eget ultrices quam hendrerit eleifend.</p><h3>In vestibulum mauris sed volutpat mollis.&nbsp;</h3><p>Pellentesque non consectetur neque. In vitae sapien massa. Cras risus sem, dictum vitae ligula in, posuere tincidunt libero. Vivamus sagittis lacus nec egestas gravida. Quisque lacus sapien, fringilla auctor commodo nec, efficitur et ex. Maecenas at consequat leo. Integer semper lobortis placerat. Quisque tellus dui, dignissim non est at, hendrerit molestie magna. Aliquam ac ex at nulla eleifend hendrerit ac non neque. Aliquam at diam massa. Suspendisse convallis arcu sit amet quam iaculis, nec vestibulum justo sagittis. Vestibulum placerat, felis lobortis lobortis dictum, sem elit convallis erat, eu fringilla nibh augue eu ipsum.</p>',
    brand: 'Apple',
    category: 'Electronics',
    price: 409.99,
    labels: [],
    reviews: [],
    __v: 0,
    createdAt: '2020-12-16T11:52:16.987Z',
    updatedAt: '2020-12-16T11:52:16.987Z',
  },
  {
    discount: {
      amount: 25,
      expireDate: '2021-12-16T00:00:00.000Z',
      totalPrice: 400.49,
    },
    rating: 5,
    numReviews: 1,
    show: true,
    countInStock: 8,
    _id: '5fd9f4f0f9d80c415489024d',
    user: '5fd8ab618d79c11ecca39a42',
    name: 'Nx 300 Camera',
    images: [
      {
        _id: '5fd9f4f0f9d80c415489024e',
        image: 'samsung1.jpg',
        description:
          'Image by <a target="_blank" href="https://pixabay.com/users/hans-2/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=272263">Hans Braxmeier</a>',
      },
      {
        _id: '5fd9f4f0f9d80c415489024f',
        image: 'samsung2.jpg',
        description:
          'Image by <a target="_blank" href="https://pixabay.com/users/hans-2/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=272263">Hans Braxmeier</a>',
      },
      {
        _id: '5fd9f4f0f9d80c4154890250',
        image: 'samsung3.jpg',
        description:
          'Image by <a target="_blank" href="https://pixabay.com/users/hans-2/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=272263">Hans Braxmeier</a>',
      },
    ],
    description:
      '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</h2><h4>Vivamus sed rutrum velit.&nbsp;</h4><p>Morbi sit amet nibh at turpis pulvinar pharetra. Etiam eu accumsan lacus. Vivamus viverra urna ac hendrerit ultrices. Integer scelerisque pharetra pellentesque. Donec posuere vitae lacus in dictum. Etiam sed lacus ex. Praesent ipsum est, dapibus quis pretium eget, ultrices facilisis nisi. Ut pretium ac felis hendrerit tincidunt. Mauris posuere ante vel ultricies tincidunt. Nam quis vestibulum neque, sit amet egestas dolor.&nbsp;</p><p><strong>Ut sodales auctor enim sit amet mollis:</strong>&nbsp;</p><ul><li>Proin tempus tellus at arcu commodo gravida.,</li><li>Suspendisse congue,&nbsp;</li><li>Ligula a blandit ornare, ante urna egestas massa,&nbsp;</li><li>Non rutrum est mauris sed libero.</li></ul><h3>Morbi eu viverra est.&nbsp;</h3><p>Phasellus nisl mi, ornare id ultrices et, viverra et dolor. Aenean rutrum ornare ex sit amet commodo.&nbsp;</p><p>Nullam imperdiet volutpat nunc ut aliquam.&nbsp;</p><blockquote><p><i><strong>Proin vel tortor ut ante lacinia rutrum. In fermentum et nunc dignissim gravida. Praesent eu risus vitae diam pulvinar venenatis.</strong></i></p></blockquote><p>&nbsp;Proin nec augue eu leo cursus maximus ac eu mi. Nulla arcu urna, cursus at finibus sed, sagittis sed metus. Donec lacinia varius nisl a consequat. Ut a ante nisi. Aenean efficitur purus non urna convallis condimentum. Pellentesque vel fermentum metus. Etiam id quam a augue condimentum euismod a in dolor.</p><h3>In non elementum sapien.</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis auctor metus vel convallis. Curabitur ut efficitur turpis, eget efficitur quam. Praesent tempus ipsum in euismod dapibus. Pellentesque volutpat euismod facilisis. Cras a ultricies libero, a sagittis erat. Phasellus rutrum enim quis tortor lobortis, eget vestibulum dolor aliquet. In egestas quam et tristique vestibulum. Fusce tincidunt dapibus ex, quis pharetra nulla efficitur sit amet.</p><h3>Suspendisse potenti.&nbsp;</h3><p>Sed fermentum lorem et risus imperdiet.</p><p><strong>Vel scelerisque nibh tempus.</strong>&nbsp;</p><ol><li>Aliquam tincidunt placerat lacus,&nbsp;</li><li>In rutrum justo convallis eu,</li><li>Ut est enim, dictum in aliquet a,&nbsp;</li><li>Finibus bibendum justo. Cras turpis massa, volutpat a rutrum vitae,</li></ol><p>Interdum vel nisl. Donec laoreet diam non tellus aliquet volutpat. Donec euismod nisi sed placerat volutpat. Vivamus vestibulum ligula eu nibh viverra, vitae tempor nisi euismod. Aliquam erat volutpat. Sed maximus ipsum lacus, eget ultrices quam hendrerit eleifend.</p><h3>In vestibulum mauris sed volutpat mollis.&nbsp;</h3><p>Pellentesque non consectetur neque. In vitae sapien massa. Cras risus sem, dictum vitae ligula in, posuere tincidunt libero. Vivamus sagittis lacus nec egestas gravida. Quisque lacus sapien, fringilla auctor commodo nec, efficitur et ex. Maecenas at consequat leo. Integer semper lobortis placerat. Quisque tellus dui, dignissim non est at, hendrerit molestie magna. Aliquam ac ex at nulla eleifend hendrerit ac non neque. Aliquam at diam massa. Suspendisse convallis arcu sit amet quam iaculis, nec vestibulum justo sagittis. Vestibulum placerat, felis lobortis lobortis dictum, sem elit convallis erat, eu fringilla nibh augue eu ipsum.</p>',
    brand: 'Samsung',
    category: 'Electronics',
    price: 533.99,
    labels: [],
    reviews: [
      {
        comment: 'Amazing lens, worth the price',
        _id: '5fd9e36e27f0f24cb8b75df5',
        name: 'Jane',
        rating: 5,
        user: '5fd8ab618d79c11ecca39a44',
        createdAt: '2020-12-16T10:37:34.447Z',
        updatedAt: '2020-12-16T10:37:34.447Z',
      },
    ],
    __v: 0,
    createdAt: '2020-12-16T11:52:16.987Z',
    updatedAt: '2020-12-16T11:52:16.987Z',
  },
  {
    discount: {
      amount: 15,
      expireDate: '2022-01-01T00:00:00.000Z',
      totalPrice: 305.99,
    },
    rating: 5,
    numReviews: 2,
    show: true,
    countInStock: 12,
    _id: '5fd9f4f0f9d80c4154890252',
    user: '5fd8ab618d79c11ecca39a42',
    name: 'Galaxy S8 Edge',
    images: [
      {
        _id: '5fd9f4f0f9d80c4154890253',
        image: 'galaxy1.jpg',
        description:
          'Image by <a target="_blank" href="https://pixabay.com/users/stocksnap-894430/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2608530">StockSnap</a>',
      },
      {
        _id: '5fd9f4f0f9d80c4154890254',
        image: 'galaxy2.jpg',
        description:
          'Image by <a target="_blank" href="https://pixabay.com/users/pexels-2286921/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1283938">Pexels</a>',
      },
    ],
    description:
      '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</h2><h4>Vivamus sed rutrum velit.&nbsp;</h4><p>Morbi sit amet nibh at turpis pulvinar pharetra. Etiam eu accumsan lacus. Vivamus viverra urna ac hendrerit ultrices. Integer scelerisque pharetra pellentesque. Donec posuere vitae lacus in dictum. Etiam sed lacus ex. Praesent ipsum est, dapibus quis pretium eget, ultrices facilisis nisi. Ut pretium ac felis hendrerit tincidunt. Mauris posuere ante vel ultricies tincidunt. Nam quis vestibulum neque, sit amet egestas dolor.&nbsp;</p><p><strong>Ut sodales auctor enim sit amet mollis:</strong>&nbsp;</p><ul><li>Proin tempus tellus at arcu commodo gravida.,</li><li>Suspendisse congue,&nbsp;</li><li>Ligula a blandit ornare, ante urna egestas massa,&nbsp;</li><li>Non rutrum est mauris sed libero.</li></ul><h3>Morbi eu viverra est.&nbsp;</h3><p>Phasellus nisl mi, ornare id ultrices et, viverra et dolor. Aenean rutrum ornare ex sit amet commodo.&nbsp;</p><p>Nullam imperdiet volutpat nunc ut aliquam.&nbsp;</p><blockquote><p><i><strong>Proin vel tortor ut ante lacinia rutrum. In fermentum et nunc dignissim gravida. Praesent eu risus vitae diam pulvinar venenatis.</strong></i></p></blockquote><p>&nbsp;Proin nec augue eu leo cursus maximus ac eu mi. Nulla arcu urna, cursus at finibus sed, sagittis sed metus. Donec lacinia varius nisl a consequat. Ut a ante nisi. Aenean efficitur purus non urna convallis condimentum. Pellentesque vel fermentum metus. Etiam id quam a augue condimentum euismod a in dolor.</p><h3>In non elementum sapien.</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis auctor metus vel convallis. Curabitur ut efficitur turpis, eget efficitur quam. Praesent tempus ipsum in euismod dapibus. Pellentesque volutpat euismod facilisis. Cras a ultricies libero, a sagittis erat. Phasellus rutrum enim quis tortor lobortis, eget vestibulum dolor aliquet. In egestas quam et tristique vestibulum. Fusce tincidunt dapibus ex, quis pharetra nulla efficitur sit amet.</p><h3>Suspendisse potenti.&nbsp;</h3><p>Sed fermentum lorem et risus imperdiet.</p><p><strong>Vel scelerisque nibh tempus.</strong>&nbsp;</p><ol><li>Aliquam tincidunt placerat lacus,&nbsp;</li><li>In rutrum justo convallis eu,</li><li>Ut est enim, dictum in aliquet a,&nbsp;</li><li>Finibus bibendum justo. Cras turpis massa, volutpat a rutrum vitae,</li></ol><p>Interdum vel nisl. Donec laoreet diam non tellus aliquet volutpat. Donec euismod nisi sed placerat volutpat. Vivamus vestibulum ligula eu nibh viverra, vitae tempor nisi euismod. Aliquam erat volutpat. Sed maximus ipsum lacus, eget ultrices quam hendrerit eleifend.</p><h3>In vestibulum mauris sed volutpat mollis.&nbsp;</h3><p>Pellentesque non consectetur neque. In vitae sapien massa. Cras risus sem, dictum vitae ligula in, posuere tincidunt libero. Vivamus sagittis lacus nec egestas gravida. Quisque lacus sapien, fringilla auctor commodo nec, efficitur et ex. Maecenas at consequat leo. Integer semper lobortis placerat. Quisque tellus dui, dignissim non est at, hendrerit molestie magna. Aliquam ac ex at nulla eleifend hendrerit ac non neque. Aliquam at diam massa. Suspendisse convallis arcu sit amet quam iaculis, nec vestibulum justo sagittis. Vestibulum placerat, felis lobortis lobortis dictum, sem elit convallis erat, eu fringilla nibh augue eu ipsum.</p>',
    brand: 'Samsung',
    category: 'Electronics',
    price: 359.99,
    labels: [
      {
        color: '#000',
        bgColor: '#fff',
        _id: '5fd9e13055d5f13c2810308e',
        labelText: 'Extra Warranty + 1 year',
      },
    ],
    reviews: [
      {
        comment: 'Great!',
        _id: '5fd9e16f55d5f13c28103091',
        name: 'Admin',
        rating: 5,
        user: '5fd8ab618d79c11ecca39a42',
        createdAt: '2020-12-16T10:29:03.098Z',
        updatedAt: '2020-12-16T10:29:03.098Z',
      },
      {
        comment: ':)',
        _id: '5fd9e1ab55d5f13c28103092',
        name: 'John',
        rating: 5,
        user: '5fd8ab618d79c11ecca39a42',
        createdAt: '2020-12-16T10:30:03.290Z',
        updatedAt: '2020-12-16T10:30:03.290Z',
      },
    ],
    __v: 0,
    createdAt: '2020-12-16T11:52:16.988Z',
    updatedAt: '2020-12-16T11:52:16.988Z',
  },
  {
    discount: {
      amount: 0,
      expireDate: '2020-12-16T00:00:00.000Z',
      totalPrice: 0,
    },
    rating: 0,
    numReviews: 0,
    show: true,
    countInStock: 0,
    _id: '5fd9f4f0f9d80c4154890258',
    user: '5fd8ab618d79c11ecca39a42',
    name: 'iPad 6th Gen. 128GB',
    images: [
      {
        _id: '5fd9f4f0f9d80c4154890259',
        image: 'ipad1.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/inproperstyle-617761/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1291524'>C. Koch</a>",
      },
      {
        _id: '5fd9f4f0f9d80c415489025a',
        image: 'ipad2.jpg',
        description:
          "Image by <a target='_blank' href='https://pixabay.com/users/maxxgirr-3565425/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=4532326'>Maxx Girr</a>",
      },
    ],
    description:
      '<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.&nbsp;</h2><h4>Vivamus sed rutrum velit.&nbsp;</h4><p>Morbi sit amet nibh at turpis pulvinar pharetra. Etiam eu accumsan lacus. Vivamus viverra urna ac hendrerit ultrices. Integer scelerisque pharetra pellentesque. Donec posuere vitae lacus in dictum. Etiam sed lacus ex. Praesent ipsum est, dapibus quis pretium eget, ultrices facilisis nisi. Ut pretium ac felis hendrerit tincidunt. Mauris posuere ante vel ultricies tincidunt. Nam quis vestibulum neque, sit amet egestas dolor.&nbsp;</p><p><strong>Ut sodales auctor enim sit amet mollis:</strong>&nbsp;</p><ul><li>Proin tempus tellus at arcu commodo gravida.,</li><li>Suspendisse congue,&nbsp;</li><li>Ligula a blandit ornare, ante urna egestas massa,&nbsp;</li><li>Non rutrum est mauris sed libero.</li></ul><h3>Morbi eu viverra est.&nbsp;</h3><p>Phasellus nisl mi, ornare id ultrices et, viverra et dolor. Aenean rutrum ornare ex sit amet commodo.&nbsp;</p><p>Nullam imperdiet volutpat nunc ut aliquam.&nbsp;</p><blockquote><p><i><strong>Proin vel tortor ut ante lacinia rutrum. In fermentum et nunc dignissim gravida. Praesent eu risus vitae diam pulvinar venenatis.</strong></i></p></blockquote><p>&nbsp;Proin nec augue eu leo cursus maximus ac eu mi. Nulla arcu urna, cursus at finibus sed, sagittis sed metus. Donec lacinia varius nisl a consequat. Ut a ante nisi. Aenean efficitur purus non urna convallis condimentum. Pellentesque vel fermentum metus. Etiam id quam a augue condimentum euismod a in dolor.</p><h3>In non elementum sapien.</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis auctor metus vel convallis. Curabitur ut efficitur turpis, eget efficitur quam. Praesent tempus ipsum in euismod dapibus. Pellentesque volutpat euismod facilisis. Cras a ultricies libero, a sagittis erat. Phasellus rutrum enim quis tortor lobortis, eget vestibulum dolor aliquet. In egestas quam et tristique vestibulum. Fusce tincidunt dapibus ex, quis pharetra nulla efficitur sit amet.</p><h3>Suspendisse potenti.&nbsp;</h3><p>Sed fermentum lorem et risus imperdiet.</p><p><strong>Vel scelerisque nibh tempus.</strong>&nbsp;</p><ol><li>Aliquam tincidunt placerat lacus,&nbsp;</li><li>In rutrum justo convallis eu,</li><li>Ut est enim, dictum in aliquet a,&nbsp;</li><li>Finibus bibendum justo. Cras turpis massa, volutpat a rutrum vitae,</li></ol><p>Interdum vel nisl. Donec laoreet diam non tellus aliquet volutpat. Donec euismod nisi sed placerat volutpat. Vivamus vestibulum ligula eu nibh viverra, vitae tempor nisi euismod. Aliquam erat volutpat. Sed maximus ipsum lacus, eget ultrices quam hendrerit eleifend.</p><h3>In vestibulum mauris sed volutpat mollis.&nbsp;</h3><p>Pellentesque non consectetur neque. In vitae sapien massa. Cras risus sem, dictum vitae ligula in, posuere tincidunt libero. Vivamus sagittis lacus nec egestas gravida. Quisque lacus sapien, fringilla auctor commodo nec, efficitur et ex. Maecenas at consequat leo. Integer semper lobortis placerat. Quisque tellus dui, dignissim non est at, hendrerit molestie magna. Aliquam ac ex at nulla eleifend hendrerit ac non neque. Aliquam at diam massa. Suspendisse convallis arcu sit amet quam iaculis, nec vestibulum justo sagittis. Vestibulum placerat, felis lobortis lobortis dictum, sem elit convallis erat, eu fringilla nibh augue eu ipsum.</p>',
    brand: 'Apple',
    category: 'Electronics',
    price: 233.99,
    labels: [],
    reviews: [],
    __v: 0,
    createdAt: '2020-12-16T11:52:16.988Z',
    updatedAt: '2020-12-16T11:52:16.988Z',
  },
];

export const mainImages = [
  'macbook1.jpg',
  'macbook2.jpg',
  'macbook3.jpg',
  'razer1.jpg',
  'razer2.jpg',
  'razer3.jpg',
  'sony1.jpg',
  'sony2.jpg',
  'sony3.jpg',
  'gameboy1.jpg',
  'gameboy2.jpg',
  'iphone1.jpg',
  'iphone2.jpg',
  'iphone3.jpg',
  'ipad1.jpg',
  'ipad2.jpg',
  'samsung1.jpg',
  'samsung2.jpg',
  'samsung3.jpg',
  'galaxy1.jpg',
  'galaxy2.jpg',
  'appleWatch1.jpg',
  'appleWatch2.jpg',
];

export default products;
