import { Plant } from '../types/plant';

export const PLANTS_DATA: Plant[] = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    latinName: 'Monstera Deliciosa',
    price: 120000,
    originalPrice: 145000,
    categoryTag: 'Indoor Favorite',
    isFeatured: true,
    isFavorited: true,
    roomCategories: ['semua', 'tamu', 'kantor'],
    plantForm: 'lantai',
    lightLevel: 'sedang',
    lightLabel: 'Sedang',
    size: 'sedang',
    sizeLabel: 'Sedang (20-50cm)',
    difficulty: 'mudah',
    difficultyLabel: 'Mudah dirawat',
    petFriendly: 'aman',
    petLabel: 'Aman',
    heightCm: 40,
    wateringFrequency: '2x/minggu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB312iqIl7Ogpz4wZPLIZkPg9hrzEZPt2I6dVy_7GL4qY4iBRAI8C8GKnbN7OwzBxkXw1cMHKv0zGGqDmi6lErSheQqfIFyolu57UYe6WrheCPSInILFlL-zSSrnCsFBC9Fi6I2yRDq13nctZ8c3c60NDGkfyORW8xffWacoR49ltQJUdbRSPZCyuwQWZntJpQGKrimLzrbmIoTH6PCc59p6cEM_3UgQoq8uA8OPzKUcSAA6b8sMqmy',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDXcdmRaN2i94oG7TZa29XqKNE8qnAom2rxb__6auPv49dtCpIxH0YJWA4G-ivJxlwftPRSgszaD7_PTIr2ZtNNA4-mpjtWBDsYTY6b4zDMzOPnt7p-lRIBamV1FtR94uPVBKgAQahtZvXPnahZYm8rJeyVufN9rBIsMjy397D0B6urYOgPqBZSXOKBDlUWT0GQ6-rStKSeI3kPqjfOAH2xaibvEnHWsp-yuS4FyHarZFguxWk7ptB7',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASLEdYLvBOVG-IZ-degSKU0uMylCPnvAdD7NiivEy9f1T_KY1BvBKBgNyfXONxtcuf6ZTC17-2Oj-U7jvEpIOVSVmeUyNcqw2OU0sDJZFu7Gmx8Ubd86YzBVo9t_AvN5Ynh9rae7CcnJc7dZrvPzfIxSJRTVaL5WOpWVxdCBR2r984r2RMaOENp7rxsL8LAQUeM9wPxpIXBvD8q7fuCUqideTkJAP4LRKHlSqIuLMQ3kVc9LRBXQp5',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDOcK0ovPgp9tDsJKLQnZzor_MPbGQVJsOGLQkxuo9TejkVm0mi42Elh8V3LEvOoJTGovF4PCZZc-wqCAao5dDcW559IcNKrp2vgh4GUfA8UBPVhAyNh7CZXxJPVPc3MPxS_QN9-K5klLsRC2PmkWN6ScLOpzcd2Q4gOtAY2DoubkudH0xFcOQzEbb3Jk3EUpNnuu0m0Du9ZFqBVVTAsap8YWvOyGCbeiK9GYhcRtlHosHfmQvdlA5S',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCXlsejedUXSJbKaQdL6lvMxpOIg0gQTifutAtmVYKYETNRj2BsGObp-7ZLMrV5p5T92h01BpH4Sp3edSwJaDZUSXzh3_ueF6L8BYeh1votkJIiZJHry95ievRBZboSYxaGTtI-6DX3t1remN9KynSOJLf0eNuXsoZpXO_kEw5PxBY_7pofMx5XIrn_M-jodfVlebfr5N0Mx2RRRneY4utPU1yU6Ee374WBtEFOIa_wMrZBO0rNF0Do'
    ],
    description: 'Tanaman hias berdaun lebar dengan corak berlubang alami yang ikonik, cocok untuk mempercantik ruang tamu maupun ruang kerja. Mampu memurnikan udara ruangan secara alami dan memberi kesan tropis yang menenangkan.',
    careDetails: {
      light: 'Letakkan di area dengan cahaya terang tidak langsung (indirect bright light). Hindari sinar matahari terik langsung agar daun tidak terbakar.',
      water: 'Siram cukup 2 kali seminggu saat 2-3 cm lapisan tanah atas terasa kering disentuh. Pastikan air tiris bebas dari lubang drainase.',
      leafCare: 'Lap permukaan daun secara berkala dengan kain lembap lembut agar stomata tetap terbuka dan helai daun mengilap segar.',
      humidity: 'Sangat menyukai kelembapan ruangan 60%-80%. Semprot lembut kabut air di pagi hari saat cuaca kering.'
    },
    specifications: {
      potSize: '18 cm (Terracotta clay pot berpori)',
      potMaterial: 'Artisanal Terracotta Pottery',
      soilMix: 'Porous organic mix (perlite + andam + cocopeat + sekam bakar)',
      shippingGuarantee: 'Kemasan protektif aman berlapis sabut kelapa khusus ke seluruh Indonesia bergaransi daun segar 14 hari.'
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Rian',
        location: 'Jakarta',
        role: 'Plant Parent 2 thn',
        rating: 5,
        comment: 'Gunakan spray air halus di pagi hari agar kelembapan terjaga optimal.',
        date: '2 hari lalu'
      },
      {
        id: 'rev-2',
        author: 'Sarah',
        location: 'Bandung',
        role: 'Urban Gardener',
        rating: 5,
        comment: 'Putar pot setiap 2 minggu agar seluruh helai daun tumbuh seimbang menghadap cahaya.',
        date: '1 minggu lalu'
      },
      {
        id: 'rev-3',
        author: 'Budi',
        location: 'Jogja',
        role: 'Botanist Hobbyist',
        rating: 5,
        comment: 'Waspada overwatering, pastikan pot memiliki lubang drainase lancar tanpa genangan.',
        date: '2 minggu lalu'
      }
    ]
  },
  {
    id: 'zamioculcas',
    name: 'Zamioculcas',
    latinName: 'Zamioculcas Zamiifolia (ZZ Plant)',
    price: 85000,
    originalPrice: 105000,
    categoryTag: 'Tahan Banting',
    isFavorited: false,
    roomCategories: ['semua', 'tamu', 'kantor'],
    plantForm: 'lantai',
    lightLevel: 'rendah',
    lightLabel: 'Rendah',
    size: 'sedang',
    sizeLabel: 'Sedang (20-50cm)',
    difficulty: 'mudah',
    difficultyLabel: 'Mudah dirawat',
    petFriendly: 'aman',
    petLabel: 'Aman',
    heightCm: 45,
    wateringFrequency: '1x/minggu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdpq785p0wezQM5VG6-Tn-IZQTCuvPvTF5malqdRnSt0tKBXjd4b5HD5phor662JyoCsZBIWtkWG4EBxU17MCxr1hG7lOF6U5E2Ck3CSwCUuSF-4vhrpWcI9-ABK8JtI69yMimTDDbNFEwulP1UZ3RiHL_3Chl8ZTtwdph1RGLscmav4xVLlb-JeorXQmran50_9hhBacRbXfpmbos3oq-2cDMdABCCvZMI4fx_gsRmjTNUh45ry8p',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdpq785p0wezQM5VG6-Tn-IZQTCuvPvTF5malqdRnSt0tKBXjd4b5HD5phor662JyoCsZBIWtkWG4EBxU17MCxr1hG7lOF6U5E2Ck3CSwCUuSF-4vhrpWcI9-ABK8JtI69yMimTDDbNFEwulP1UZ3RiHL_3Chl8ZTtwdph1RGLscmav4xVLlb-JeorXQmran50_9hhBacRbXfpmbos3oq-2cDMdABCCvZMI4fx_gsRmjTNUh45ry8p',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBBOWq5qUyNjh0oq8wMiBnwSEt9jFzGuS2DpfWM9SWXsJuUeg1cA2DPgPDzCJKLwPVK1H2hbiHTaJ6fTVQCuY9PJdLfxM3uQZ36Q3pOEZ1iU5Eud9rWD2j2X---6JyqZvsqrQWQQ3pjzxb10QutAORLEVYK2uVwSpy4xUHEBBxrH6X_mGzIOg1Yy7b3TeQyu1TmDUBwmpjE-rYi-0R0cLdOlp1BKgdh-b4G_smv9jWajkzfOmvqR8Gq'
    ],
    description: 'ZZ Plant terkenal sangat kuat dan toleran terhadap ruangan ber-AC serta minim sinar matahari. Daunnya yang mengilap seperti dilap lilin alami menjadikannya primadona meja kerja.',
    careDetails: {
      light: 'Sangat toleran cahaya rendah hingga sedang. Tetap tumbuh prima di sudut ruang tanpa jendela langsung.',
      water: 'Cukup disiram 1 kali dalam 1-2 minggu karena memiliki umbi penyimpan air di dalam tanah.',
      leafCare: 'Bersihkan debu dari daun setiap bulan dengan kain mikrofiber kering atau sedikit lembap.',
      humidity: 'Tahan di kelembapan standar ruangan berpendingin udara (AC).'
    },
    specifications: {
      potSize: '16 cm (Keramik pasir minimalis)',
      potMaterial: 'Sand Ceramic Glazed Pot',
      soilMix: 'Fast-draining cactus and succulent substrate mix',
      shippingGuarantee: 'Garansi sampai dengan selamat ke seluruh Indonesia.'
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'Dian K.',
        location: 'Surabaya',
        role: 'Work From Home Parent',
        rating: 5,
        comment: 'Sangat cocok di meja kerja, hampir lupa nyiram 2 minggu tapi daunnya tetap kinclong!',
        date: '3 hari lalu'
      }
    ]
  },
  {
    id: 'sansevieria',
    name: 'Sansevieria',
    latinName: 'Sansevieria Trifasciata',
    price: 60000,
    originalPrice: 75000,
    categoryTag: 'Pembersih Udara',
    isFavorited: false,
    roomCategories: ['semua', 'tidur', 'kantor'],
    plantForm: 'meja',
    lightLevel: 'rendah',
    lightLabel: 'Rendah',
    size: 'sedang',
    sizeLabel: 'Sedang (20-50cm)',
    difficulty: 'mudah',
    difficultyLabel: 'Mudah dirawat',
    petFriendly: 'aman',
    petLabel: 'Aman',
    heightCm: 35,
    wateringFrequency: '1x/10 hari',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-ylQsUDou9GVPwtNQL6y9luhTB26Y3lSpc0i45LjvGJJvSoTlhMvCXD8is5ijq9yu1jFCYAUDX9C4L-ZctHDLIHgI3Nxey1dG4aV-WZwpuKYiT0qXs_KDIVgrehrqJwaLJvCpW8cuYdJsht5UIeuV2ZR3agVvq8Sw2bLWNrxwPE74y510-iOlcAYIUgDtMugtAJpVCAWtGrDgIfj0wd1_Gfpfy1jiaF7RYCz1sA1so5TiriTh9_nU',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-ylQsUDou9GVPwtNQL6y9luhTB26Y3lSpc0i45LjvGJJvSoTlhMvCXD8is5ijq9yu1jFCYAUDX9C4L-ZctHDLIHgI3Nxey1dG4aV-WZwpuKYiT0qXs_KDIVgrehrqJwaLJvCpW8cuYdJsht5UIeuV2ZR3agVvq8Sw2bLWNrxwPE74y510-iOlcAYIUgDtMugtAJpVCAWtGrDgIfj0wd1_Gfpfy1jiaF7RYCz1sA1so5TiriTh9_nU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdTCYqspzinjlYp_UDN7bX0Yk_nelVqO35lgLvrwxTfXLKN9kPUtQxM9cv4-YbxUSs9Gn48sE9KodfC6Aqj0hj7VFUfN1ry8rj05ai6N7WyPfvwWxxfxUyg8gps7vHh8-e8omC652_m4Unpijk3lam6yvsUHfgBpcmuwvFDF73iHScDdN0ZzxkUWZ0r0iWj-Ct8KOA274JV0EDc_BNX9k1bCLhSdd9kTUkiKGYpFbd8eJzZWriuZbp'
    ],
    description: 'Lidah Mertua (Snake Plant) melepaskan oksigen di malam hari, menjadikannya pilihan tanaman terbaik untuk diletakkan di kamar tidur atau samping ranjang.',
    careDetails: {
      light: 'Beradaptasi baik di segala intensitas cahaya, dari cahaya temaram hingga sinar matahari cerah.',
      water: 'Siram sangat hemat, 1 kali tiap 10–14 hari. Biarkan tanah benar-benar mengering di antara jadwal siram.',
      leafCare: 'Daun tegak kokoh tidak membutuhkan pemangkasan khusus.',
      humidity: 'Toleran kelembapan rendah hingga tinggi.'
    },
    specifications: {
      potSize: '15 cm (Terracotta berulir)',
      potMaterial: 'Ribbed Terracotta Pot',
      soilMix: 'Porous mineral mix',
      shippingGuarantee: 'Kemasan khusus antibanting.'
    },
    reviews: [
      {
        id: 'rev-5',
        author: 'Arif N.',
        location: 'Semarang',
        role: 'Interior Designer',
        rating: 5,
        comment: 'Bentuknya sangat arsitektural dan bersih, cocok untuk gaya Japandi minimalis.',
        date: '5 hari lalu'
      }
    ]
  },
  {
    id: 'pothos-sirih-gading',
    name: 'Pothos Sirih Gading',
    latinName: 'Epipremnum Aureum',
    price: 45000,
    originalPrice: 55000,
    categoryTag: 'Mudah Merambat',
    isFavorited: false,
    roomCategories: ['semua', 'kantor', 'tamu'],
    plantForm: 'gantung',
    lightLevel: 'rendah',
    lightLabel: 'Rendah',
    size: 'sedang',
    sizeLabel: 'Sedang (20-50cm)',
    difficulty: 'mudah',
    difficultyLabel: 'Mudah dirawat',
    petFriendly: 'aman',
    petLabel: 'Aman',
    heightCm: 30,
    wateringFrequency: '2x/minggu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmGfTetVFCoXT1-tj8wQgvndyM4tRyb2hQBlZt4ST4k4ifVaHu9uMKWHl9verSOGpgVE6mKga4zrKH3SXTM0VqkNjB72a6EuONSW7M9lFcrp74lUcN71J5L_3Dh7n8r2O57dytzKXMaRwNDjABL3D_2IzD5NF-hn85slqE1sHx2VJUUrdILuONsLAITNRI4xVa04-A23dXhUICaZoj1lvKV-OI0t8ShdBe3tCsr-360ATmUlAgANss',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmGfTetVFCoXT1-tj8wQgvndyM4tRyb2hQBlZt4ST4k4ifVaHu9uMKWHl9verSOGpgVE6mKga4zrKH3SXTM0VqkNjB72a6EuONSW7M9lFcrp74lUcN71J5L_3Dh7n8r2O57dytzKXMaRwNDjABL3D_2IzD5NF-hn85slqE1sHx2VJUUrdILuONsLAITNRI4xVa04-A23dXhUICaZoj1lvKV-OI0t8ShdBe3tCsr-360ATmUlAgANss',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC-kLOFitZtWntF3A0G4FfMBpJm_vrtWhjvWCqv_4Re0xibdUubRfXafg_HqG4gyM8lG2zaPXT739VnQqJKq2v_asvkiLZqzfcRjyNf7SEPKgtWHggDhCHdRwmlJJdA0qfanF4RmfVa8qClTqApU74RTd-qLWO5jy35pejhkrIRF2fV2x7x08RGKVg9P8iPpQL_Q3N-fScYZDDQDIr8M1bel6d0ghWnmQ7Imd8xFXno0wIhWhAghJTL'
    ],
    description: 'Sirih Gading dengan helai daun hati bercorak emas kekuningan yang anggun menjuntai dari rak dinding atau pot gantung. Pertumbuhannya sangat cepat dan membawa kesan hidup pada ruangan.',
    careDetails: {
      light: 'Toleran cahaya redup hingga terang berpendar.',
      water: 'Siram 2 kali seminggu saat tanah bagian atas mulai kering.',
      leafCare: 'Pangkas ujung sulur secara berkala untuk memicu rimbunnya percabangan baru.',
      humidity: 'Menyukai kelembapan ruang sedang.'
    },
    specifications: {
      potSize: '14 cm (Keramik krim gantung)',
      potMaterial: 'Cream Glazed Hanging Pot',
      soilMix: 'Substrat porous dengan sekam fermentasi',
      shippingGuarantee: 'Daun terlindung busa lembut khusus.'
    },
    reviews: [
      {
        id: 'rev-6',
        author: 'Lina W.',
        location: 'Malang',
        role: 'Tanaman Pemula',
        rating: 5,
        comment: 'Cepat sekali panjangnya! Ditaruh di atas ambalan dapur jadi adem dilihat.',
        date: '4 hari lalu'
      }
    ]
  },
  {
    id: 'calathea-peacock',
    name: 'Calathea Peacock',
    latinName: 'Calathea Makoyana',
    price: 95000,
    originalPrice: 115000,
    categoryTag: 'Eksotis Tropis',
    isFavorited: false,
    roomCategories: ['semua', 'tidur', 'tamu'],
    plantForm: 'meja',
    lightLevel: 'rendah',
    lightLabel: 'Rendah',
    size: 'sedang',
    sizeLabel: 'Sedang (20-50cm)',
    difficulty: 'mudah',
    difficultyLabel: 'Mudah dirawat',
    petFriendly: 'aman',
    petLabel: 'Aman',
    heightCm: 32,
    wateringFrequency: '2x/minggu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUymUs2s3C6nj5hPnTw_5OQ2YRRwevLoo4NbvOgN3HfFo0XzlzV6eyEuxkFzakGhBkZnYeEo4jdGdYxMnjcAmkNESZSz7Y24Bv-R0E92H0KUS-nIOubO5L6ksunV8GAAh-62UEd-dozSWOxc5_HreX_lYP6IABUJwWXQXV2NuiR2dyU4O0QL3cTdapePsZcb6H-B1pEFnpMzZWU_R0euqmUOPzWjlcH6SiHHGPsmki-uxa5OzQ0hgv',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUymUs2s3C6nj5hPnTw_5OQ2YRRwevLoo4NbvOgN3HfFo0XzlzV6eyEuxkFzakGhBkZnYeEo4jdGdYxMnjcAmkNESZSz7Y24Bv-R0E92H0KUS-nIOubO5L6ksunV8GAAh-62UEd-dozSWOxc5_HreX_lYP6IABUJwWXQXV2NuiR2dyU4O0QL3cTdapePsZcb6H-B1pEFnpMzZWU_R0euqmUOPzWjlcH6SiHHGPsmki-uxa5OzQ0hgv',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFIICmhn6FmqwLzWFeEbUy2TvjONOO5oQ9RMATNIRSnKpn9kW_ndS-E6UN0Jff_4O3DLo9xPer2sN3ltO1AHXNlLKquII2CIwzUAdI9x1yI_Skw6ayP6LGraJRu58OAsXoFAXJfwDnd0-ISeI5NVuFe00UpOpkf71e385TrtUtuVkHapUAfOU32-xdsCmvThyX7ghUfkC8OuJD5nSm-zzOephdHkmP9r6FwL-MB1_ruvfg-fpCw3Ke'
    ],
    description: 'Calathea Peacock sering disebut tanaman merak karena lukisan alam di atas daunnya yang berpadu dengan bagian bawah daun berwarna ungu gelap elegan. Pada malam hari, daunnya akan terangkat menyerupai tangan berdoa.',
    careDetails: {
      light: 'Cahaya tersaring lembut (filtered shade). Jauhkan dari panas terik langsung.',
      water: 'Jaga kelembapan media tanam tetap sejuk merata dengan air endapan atau air matang.',
      leafCare: 'Semprot kabut air lembut di sekitar daun untuk menjaga kelembapan udara.',
      humidity: 'Sangat menyukai kelembapan di atas 65%.'
    },
    specifications: {
      potSize: '15 cm (Fluted matte planter)',
      potMaterial: 'Matte White Ribbed Planter',
      soilMix: 'Peat moss + perlite + cocopeat steril',
      shippingGuarantee: 'Proteksi packing berongga udara khusus.'
    },
    reviews: [
      {
        id: 'rev-7',
        author: 'Nadia S.',
        location: 'Bogor',
        role: 'Pencinta Calathea',
        rating: 5,
        comment: 'Corak daunnya luar biasa indah seperti dilukis tangan! Kucing saya juga aman.',
        date: '6 hari lalu'
      }
    ]
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    latinName: 'Chlorophytum Comosum',
    price: 40000,
    originalPrice: 50000,
    categoryTag: '100% Aman Hewan',
    isFavorited: false,
    roomCategories: ['semua', 'tamu', 'tidur'],
    plantForm: 'meja',
    lightLevel: 'rendah',
    lightLabel: 'Rendah',
    size: 'kecil',
    sizeLabel: 'Kecil (<20cm)',
    difficulty: 'mudah',
    difficultyLabel: 'Mudah dirawat',
    petFriendly: 'aman',
    petLabel: 'Aman',
    heightCm: 25,
    wateringFrequency: '2x/minggu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIDpRukeXte6iFlBjWyH3a6uoVHWWhyZw7zPnQU8aUzY7l0qyvfLMDx1BOW_hg_ZWwouMtryXmUltSutbT71PxoTFPL2Uc1ua6khNclF9q_rWrRY0P5PmYeCNisFGHCG4Yo68MIDtCDbo5x-hDEMvH0uITjVmvaicue66LScXFzZur7c76cqMrlv_8C4HvFXQ9cYtPPznh10OGMPWQCqtuY_CitWoI92KOkOlqzU9qBE9AiIusdwf3',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIDpRukeXte6iFlBjWyH3a6uoVHWWhyZw7zPnQU8aUzY7l0qyvfLMDx1BOW_hg_ZWwouMtryXmUltSutbT71PxoTFPL2Uc1ua6khNclF9q_rWrRY0P5PmYeCNisFGHCG4Yo68MIDtCDbo5x-hDEMvH0uITjVmvaicue66LScXFzZur7c76cqMrlv_8C4HvFXQ9cYtPPznh10OGMPWQCqtuY_CitWoI92KOkOlqzU9qBE9AiIusdwf3'
    ],
    description: 'Tanaman laba-laba dengan dedaunan tipis melengkung bercorak putih di tengah. Sangat aman dan non-toxic bagi kucing maupun anjing peliharaan di rumah.',
    careDetails: {
      light: 'Menyukai cahaya terang tidak langsung namun sangat toleran di pencahayaan sedang.',
      water: 'Siram 1-2 kali seminggu ketika tanah terasa kering.',
      leafCare: 'Bila ujung daun mengering, potong perlahan mengikuti bentuk lancip daun.',
      humidity: 'Toleran di segala kelembapan normal ruangan.'
    },
    specifications: {
      potSize: '13 cm (Terracotta earthen pot)',
      potMaterial: 'Warm Textured Clay Pot',
      soilMix: 'Campuran tanah subur bernutrisi',
      shippingGuarantee: 'Garansi sampai segar berdaun utuh.'
    },
    reviews: [
      {
        id: 'rev-8',
        author: 'Fajar E.',
        location: 'Denpasar',
        role: 'Pet & Plant Lover',
        rating: 5,
        comment: 'Pilihan terbaik buat pemilik anabul yang usil suka ngendus tanaman!',
        date: '1 minggu lalu'
      }
    ]
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    latinName: 'Ficus Lyrata',
    price: 185000,
    originalPrice: 220000,
    categoryTag: 'Tanaman Lantai',
    isFavorited: false,
    roomCategories: ['semua', 'tamu'],
    plantForm: 'lantai',
    lightLevel: 'terang',
    lightLabel: 'Terang',
    size: 'besar',
    sizeLabel: 'Besar (>50cm)',
    difficulty: 'sulit',
    difficultyLabel: 'Perawatan khusus',
    petFriendly: 'waspada',
    petLabel: 'Perlu pengawasan',
    heightCm: 75,
    wateringFrequency: '1x/minggu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgpe4-VAFErN_kmUPqCaabJVJq1bd_0dt_amRml0_xUzh-pFEK1VpT8cEYIWV_dVTxPCvDOOhAY-VkaJnrgJ8tkSMo5CJYUduZ0C5DbCl9T8TdA3bXgtTpAqjHyBsVmXbM8BZ6Y0UqIcCSxCMlrSgw8zhLxiqG11ofTvF56jm0wrt-BiUpZxSSnhSE3JPgrBFJuyTrtk_FVghxbVqQNV5O--0GCwdaOfsi7vp-0bRuzh5ujP2TI_Iu',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAgpe4-VAFErN_kmUPqCaabJVJq1bd_0dt_amRml0_xUzh-pFEK1VpT8cEYIWV_dVTxPCvDOOhAY-VkaJnrgJ8tkSMo5CJYUduZ0C5DbCl9T8TdA3bXgtTpAqjHyBsVmXbM8BZ6Y0UqIcCSxCMlrSgw8zhLxiqG11ofTvF56jm0wrt-BiUpZxSSnhSE3JPgrBFJuyTrtk_FVghxbVqQNV5O--0GCwdaOfsi7vp-0bRuzh5ujP2TI_Iu'
    ],
    description: 'Pohon biola berdaun lebar mengilap dengan postur tinggi dan berkarakter kuat. Memberikan aksen arsitektural yang megah untuk ruang tamu luas.',
    careDetails: {
      light: 'Membutuhkan tempat terang dekat jendela yang terkena sinar matahari lembut pagi hari.',
      water: 'Siram menyeluruh sekali seminggu dan hindari genangan di tatakan pot.',
      leafCare: 'Bersihkan helai daun besar secara teratur dengan kain lembut.',
      humidity: 'Menyukai ruangan dengan sirkulasi udara baik.'
    },
    specifications: {
      potSize: '24 cm (Earthenware Large Planter)',
      potMaterial: 'Heavy Glazed Earthenware',
      soilMix: 'Premium rich organic aeration mix',
      shippingGuarantee: 'Pengiriman peti kayu eksklusif garansi segar.'
    },
    reviews: []
  },
  {
    id: 'english-ivy',
    name: 'Trailing English Ivy',
    latinName: 'Hedera Helix',
    price: 55000,
    originalPrice: 65000,
    categoryTag: 'Tanaman Gantung',
    isFavorited: false,
    roomCategories: ['semua', 'tamu', 'tidur'],
    plantForm: 'gantung',
    lightLevel: 'sedang',
    lightLabel: 'Sedang',
    size: 'sedang',
    sizeLabel: 'Sedang (20-50cm)',
    difficulty: 'mudah',
    difficultyLabel: 'Mudah dirawat',
    petFriendly: 'waspada',
    petLabel: 'Perlu pengawasan',
    heightCm: 35,
    wateringFrequency: '2x/minggu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUPlja37lFLZgmMoEVeR6hS1puQfP72_szRLCKDtE3HC8vy4GqmTxC6GJ0LvRFp-u2N_pXXokVA4Oq88Gk1r6b4PHmZ2-zKRFXeznu-XCBukmaEOzwevh9t-3PZ10Ob3cBwNqC2szmo-O021gyLuFhu7zuMPCbD39K1N8y6S1dBBPSYo-4OZ_xTvqYY9FXoSPDWqxmz-5t4FvfMMJaWuDblthk2Gps2f0RfQGHIHrY7bEJWqkmXM_J',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDUPlja37lFLZgmMoEVeR6hS1puQfP72_szRLCKDtE3HC8vy4GqmTxC6GJ0LvRFp-u2N_pXXokVA4Oq88Gk1r6b4PHmZ2-zKRFXeznu-XCBukmaEOzwevh9t-3PZ10Ob3cBwNqC2szmo-O021gyLuFhu7zuMPCbD39K1N8y6S1dBBPSYo-4OZ_xTvqYY9FXoSPDWqxmz-5t4FvfMMJaWuDblthk2Gps2f0RfQGHIHrY7bEJWqkmXM_J'
    ],
    description: 'Tanaman sulur merambat dengan gantungan macrame artisan alami. Menghadirkan suasana hutan sejuk di sudut jendela.',
    careDetails: {
      light: 'Cahaya sedang hingga terang tersebar.',
      water: 'Siram saat lapisan tanah mulai kering, jangan biarkan terendam.',
      leafCare: 'Semprot lembut dedaunan untuk mempertahankan kesegaran sulur.',
      humidity: 'Menyukai kelembapan sejuk.'
    },
    specifications: {
      potSize: '14 cm + Tali Macrame Katun Tenun',
      potMaterial: 'Macrame Pot Hanger',
      soilMix: 'Lightweight potting mix',
      shippingGuarantee: 'Packing gantung terlindung.'
    },
    reviews: []
  },
  {
    id: 'peperomia-obtusifolia',
    name: 'Peperomia Hijau',
    latinName: 'Peperomia Obtusifolia',
    price: 48000,
    originalPrice: 58000,
    categoryTag: 'Tanaman Meja',
    isFavorited: false,
    roomCategories: ['semua', 'kantor', 'tidur'],
    plantForm: 'meja',
    lightLevel: 'sedang',
    lightLabel: 'Sedang',
    size: 'kecil',
    sizeLabel: 'Kecil (<20cm)',
    difficulty: 'mudah',
    difficultyLabel: 'Mudah dirawat',
    petFriendly: 'aman',
    petLabel: 'Aman',
    heightCm: 18,
    wateringFrequency: '1x/minggu',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFHC2QQydNP8SSmUORH4p09Ib26coNjNGsTaqKBnsdUVLTWDPxXQdyAFoCRL_ucOAl7j5dEcB-YYvm0vSix_mDYXFlE5BQ7hSUGvJEtsVqIuO4ehb_gYnu1Jmom1iQDmdqdkgLsqoFKjrJLTsCD2W-kP4VXRPm9o0EzfximH9TEtEwzGglcqoALxov4wkOiMvRHMkSJbHrZoZnbwSHOqJjMq_tB7M6DdJ6ZMeJmHZ2UufhFRGfOCE2',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFHC2QQydNP8SSmUORH4p09Ib26coNjNGsTaqKBnsdUVLTWDPxXQdyAFoCRL_ucOAl7j5dEcB-YYvm0vSix_mDYXFlE5BQ7hSUGvJEtsVqIuO4ehb_gYnu1Jmom1iQDmdqdkgLsqoFKjrJLTsCD2W-kP4VXRPm9o0EzfximH9TEtEwzGglcqoALxov4wkOiMvRHMkSJbHrZoZnbwSHOqJjMq_tB7M6DdJ6ZMeJmHZ2UufhFRGfOCE2'
    ],
    description: 'Bentuk ringkas dengan daun tebal seperti sukulen bertekstur kenyal. Sangat imut diletakkan di samping laptop atau rak buku.',
    careDetails: {
      light: 'Cahaya sedang hingga lampu meja kerja.',
      water: 'Siram hemat seminggu sekali.',
      leafCare: 'Hindari genangan air di ketiak daun.',
      humidity: 'Toleran kelembapan ruangan normal.'
    },
    specifications: {
      potSize: '11 cm (Terracotta mungil)',
      potMaterial: 'Mini Terracotta Clay Pot',
      soilMix: 'Porous potting mix',
      shippingGuarantee: 'Garansi sampai utuh.'
    },
    reviews: []
  }
];

export const INITIAL_CART = [
  {
    plant: PLANTS_DATA[0], // Monstera
    quantity: 1
  },
  {
    plant: PLANTS_DATA[1], // Zamioculcas
    quantity: 1
  }
];

export const COMMUNITY_TIPS = [
  {
    id: 'tip-1',
    author: 'Sari P.',
    role: 'Komunitas LittleSeed',
    city: 'Jakarta',
    title: 'Tips Siram Tanaman untuk Pemula',
    text: 'Jangan siram tanaman berdasarkan jadwal kaku. Sentuh permukaan tanah sedalam 2 cm — jika terasa kering dan ringan, barulah beri air secukupnya.',
    likes: 38,
    comments: 14
  },
  {
    id: 'tip-2',
    author: 'Rian Prasetya',
    role: 'Plant Parent 2 thn',
    city: 'Jakarta',
    title: 'Kelembapan Optimal Monstera',
    text: 'Gunakan spray air halus di pagi hari agar kelembapan terjaga optimal dan stomata daun bebas bernapas.',
    likes: 42,
    comments: 9
  },
  {
    id: 'tip-3',
    author: 'Sarah Melati',
    role: 'Urban Gardener',
    city: 'Bandung',
    title: 'Keseimbangan Daun & Arah Cahaya',
    text: 'Putar pot tanaman setiap 2 minggu sekitar 90 derajat agar seluruh helai daun tumbuh seimbang dan tidak condong ke satu arah saja.',
    likes: 29,
    comments: 6
  },
  {
    id: 'tip-4',
    author: 'Budi Hartono',
    role: 'Botanist Hobbyist',
    city: 'Yogyakarta',
    title: 'Mencegah Pembusukan Akar (Root Rot)',
    text: 'Waspada overwatering! Pastikan pot memiliki lubang drainase lancar tanpa genangan di tatakan pot.',
    likes: 51,
    comments: 18
  }
];
