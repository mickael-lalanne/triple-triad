export interface Card {
    name: string;
    id: number;
    source: string;
    topValue: number;
    bottomValue: number;
    leftValue: number;
    rightValue: number;
    stars: 1 | 2 | 3 | 4 | 5;
}

export const ONE_STAR_CARDS: Card[] = [
    {
        name: 'Ahriman',
        id: 0,
        source: '1 star/FFXIV_TT_Ahriman.webp',
        topValue: 5,
        bottomValue: 2,
        leftValue: 2,
        rightValue: 5,
        stars: 1
    },
    {
        name: 'Amalj\'aa',
        id: 1,
        source: '1 star/FFXIV_TT_Amaljaa.webp',
        topValue: 1,
        bottomValue: 4,
        leftValue: 1,
        rightValue: 4,
        stars: 1
    },
    {
        name: 'Bomb',
        id: 2,
        source: '1 star/FFXIV_TT_Bomb.webp',
        topValue: 3,
        bottomValue: 3,
        leftValue: 3,
        rightValue: 4,
        stars: 1
    },
    {
        name: 'Cactuar',
        id: 3,
        source: '1 star/FFXIV_TT_Cactuar.webp',
        topValue: 4,
        bottomValue: 3,
        leftValue: 3,
        rightValue: 3,
        stars: 1
    },
    {
        name: 'Chocobo',
        id: 4,
        source: '1 star/FFXIV_TT_Chocobo.webp',
        topValue: 3,
        bottomValue: 2,
        leftValue: 1,
        rightValue: 7,
        stars: 1
    },
    {
        name: 'Coblyn',
        id: 5,
        source: '1 star/FFXIV_TT_Coblyn.webp',
        topValue: 3,
        bottomValue: 3,
        leftValue: 4,
        rightValue: 3,
        stars: 1
    },
    {
        name: 'Coeurl',
        id: 6,
        source: '1 star/FFXIV_TT_Coeurl.webp',
        topValue: 2,
        bottomValue: 2,
        leftValue: 5,
        rightValue: 5,
        stars: 1
    },
    {
        name: 'Dodo',
        id: 7,
        source: '1 star/FFXIV_TT_Dodo.webp',
        topValue: 4,
        bottomValue: 3,
        leftValue: 4,
        rightValue: 2,
        stars: 1
    },
    {
        name: 'Goobbue',
        id: 8,
        source: '1 star/FFXIV_TT_Goobbue.webp',
        topValue: 2,
        bottomValue: 5,
        leftValue: 2,
        rightValue: 5,
        stars: 1
    },
    {
        name: 'Ixal',
        id: 9,
        source: '1 star/FFXIV_TT_Ixal.webp',
        topValue: 6,
        bottomValue: 3,
        leftValue: 4,
        rightValue: 1,
        stars: 1
    },
    {
        name: 'Kobold',
        id: 10,
        source: '1 star/FFXIV_TT_Kobold.webp',
        topValue: 2,
        bottomValue: 4,
        leftValue: 6,
        rightValue: 2,
        stars: 1
    },
    {
        name: 'Mandragora',
        id: 11,
        source: '1 star/FFXIV_TT_Mandragora.webp',
        topValue: 4,
        bottomValue: 5,
        leftValue: 3,
        rightValue: 2,
        stars: 1
    },
    {
        name: 'Moogle',
        id: 12,
        source: '1 star/FFXIV_TT_Moogle.webp',
        topValue: 2,
        bottomValue: 3,
        leftValue: 7,
        rightValue: 1,
        stars: 1
    },
    {
        name: 'Morbol',
        id: 13,
        source: '1 star/FFXIV_TT_Morbol.webp',
        topValue: 5,
        bottomValue: 2,
        leftValue: 5,
        rightValue: 2,
        stars: 1
    },
    {
        name: 'Pudding',
        id: 14,
        source: '1 star/FFXIV_TT_Pudding.webp',
        topValue: 2,
        bottomValue: 3,
        leftValue: 5,
        rightValue: 4,
        stars: 1
    },
    {
        name: 'Sahagin',
        id: 15,
        source: '1 star/FFXIV_TT_Sahagin.webp',
        topValue: 4,
        bottomValue: 3,
        leftValue: 3,
        rightValue: 5,
        stars: 1
    },
    {
        name: 'Spriggan',
        id: 16,
        source: '1 star/FFXIV_TT_Spriggan.webp',
        topValue: 2,
        bottomValue: 4,
        leftValue: 4,
        rightValue: 3,
        stars: 1
    },
    {
        name: 'Sylph',
        id: 17,
        source: '1 star/FFXIV_TT_Sylph.webp',
        topValue: 2,
        bottomValue: 5,
        leftValue: 4,
        rightValue: 4,
        stars: 1
    },
    {
        name: 'Tataru',
        id: 18,
        source: '1 star/FFXIV_TT_Tataru.webp',
        topValue: 7,
        bottomValue: 3,
        leftValue: 2,
        rightValue: 2,
        stars: 1
    },
    {
        name: 'Tonberry',
        id: 19,
        source: '1 star/FFXIV_TT_Tonberry.webp',
        topValue: 2,
        bottomValue: 7,
        leftValue: 2,
        rightValue: 2,
        stars: 1
    }
];

export const TWO_STAR_CARDS: Card[] = [
    {
        name: 'Baderon Tenfingers',
        id: 20,
        source: '2 stars/FFXIV_TT_Baderon_Tenfingers.webp',
        topValue: 3,
        bottomValue: 5,
        leftValue: 5,
        rightValue: 7,
        stars: 2
    },
    {
        name: 'Biggs & Wedge',
        id: 21,
        source: '2 stars/FFXIV_TT_Biggs_Wedge.webp',
        topValue: 5,
        bottomValue: 7,
        leftValue: 5,
        rightValue: 3,
        stars: 2
    },
    {
        name: 'Blue Dragon',
        id: 22,
        source: '2 stars/FFXIV_TT_Blue_Dragon.webp',
        topValue: 2,
        bottomValue: 7,
        leftValue: 7,
        rightValue: 2,
        stars: 2
    },
    {
        name: 'Chimera',
        id: 23,
        source: '2 stars/FFXIV_TT_Chimera.webp',
        topValue: 7,
        bottomValue: 2,
        leftValue: 2,
        rightValue: 7,
        stars: 2
    },
    {
        name: 'Demon Wall',
        id: 24,
        source: '2 stars/FFXIV_TT_Demon_Wall.webp',
        topValue: 6,
        bottomValue: 2,
        leftValue: 3,
        rightValue: 7,
        stars: 2
    },
    {
        name: 'Frixio',
        id: 25,
        source: '2 stars/FFXIV_TT_Frixio.webp',
        topValue: 6,
        bottomValue: 6,
        leftValue: 6,
        rightValue: 2,
        stars: 2
    },
    {
        name: 'Gerolt',
        id: 26,
        source: '2 stars/FFXIV_TT_Gerolt.webp',
        topValue: 1,
        bottomValue: 3,
        leftValue: 7,
        rightValue: 7,
        stars: 2
    },
    {
        name: 'Livia sas Junius',
        id: 27,
        source: '2 stars/FFXIV_TT_Livia_sas_Junius.webp',
        topValue: 3,
        bottomValue: 7,
        leftValue: 1,
        rightValue: 7,
        stars: 2
    },
    {
        name: 'Memeroon',
        id: 28,
        source: '2 stars/FFXIV_TT_Memeroon.webp',
        topValue: 6,
        bottomValue: 6,
        leftValue: 2,
        rightValue: 6,
        stars: 2
    },
    {
        name: 'Momodi Modi',
        id: 29,
        source: '2 stars/FFXIV_TT_Momodi_Modi.webp',
        topValue: 7,
        bottomValue: 5,
        leftValue: 3,
        rightValue: 5,
        stars: 2
    },
    {
        name: 'Mother Miounne',
        id: 30,
        source: '2 stars/FFXIV_TT_Mother_Miounne.webp',
        topValue: 5,
        bottomValue: 3,
        leftValue: 7,
        rightValue: 5,
        stars: 2
    },
    {
        name: 'Mutamix Bubblypots',
        id: 31,
        source: '2 stars/FFXIV_TT_Mutamix_Bubblypots.webp',
        topValue: 2,
        bottomValue: 6,
        leftValue: 6,
        rightValue: 6,
        stars: 2
    },
    {
        name: 'Rhitahtyn sas Arvina',
        id: 32,
        source: '2 stars/FFXIV_TT_Rhitahtyn_sas_Arvina.webp',
        topValue: 7,
        bottomValue: 3,
        leftValue: 7,
        rightValue: 1,
        stars: 2
    },
    {
        name: 'Scarface Bugaal Ja',
        id: 33,
        source: '2 stars/FFXIV_TT_Scarface_Bugaal_Ja.webp',
        topValue: 6,
        bottomValue: 2,
        leftValue: 6,
        rightValue: 6,
        stars: 2
    },
    {
        name: 'Siren',
        id: 34,
        source: '2 stars/FFXIV_TT_Siren.webp',
        topValue: 3,
        bottomValue: 7,
        leftValue: 2,
        rightValue: 6,
        stars: 2
    },
    {
        name: 'Succubus',
        id: 35,
        source: '2 stars/FFXIV_TT_Succubus.webp',
        topValue: 7,
        bottomValue: 2,
        leftValue: 6,
        rightValue: 3,
        stars: 2
    },
    {
        name: 'Ultros & Typhon',
        id: 36,
        source: '2 stars/FFXIV_TT_Ultros_Typhon.webp',
        topValue: 2,
        bottomValue: 6,
        leftValue: 7,
        rightValue: 3,
        stars: 2
    }
];

export const THREE_STAR_CARDS: Card[] = [
    {
        name: 'Behemoth',
        id: 37,
        source: '3 stars/FFXIV_TT_Behemoth.webp',
        topValue: 7,
        bottomValue: 4,
        leftValue: 2,
        rightValue: 8,
        stars: 3
    },
    {
        name: 'Garuda',
        id: 38,
        source: '3 stars/FFXIV_TT_Garuda.webp',
        topValue: 7,
        bottomValue: 1,
        leftValue: 7,
        rightValue: 6,
        stars: 3
    },
    {
        name: 'Gilgamesh & Enkidu',
        id: 39,
        source: '3 stars/FFXIV_TT_Gilgamesh_&_Enkidu.webp',
        topValue: 8,
        bottomValue: 7,
        leftValue: 3,
        rightValue: 3,
        stars: 3
    },
    {
        name: 'Godbert Manderville',
        id: 40,
        source: '3 stars/FFXIV_TT_Godbert_Manderville.webp',
        topValue: 6,
        bottomValue: 5,
        leftValue: 6,
        rightValue: 6,
        stars: 3
    },
    {
        name: 'Good King Moggle Mog XII',
        id: 41,
        source: '3 stars/FFXIV_TT_Good_King_Moggle_Mog_XII.webp',
        topValue: 7,
        bottomValue: 7,
        leftValue: 1,
        rightValue: 6,
        stars: 3
    },
    {
        name: 'Ifrit',
        id: 42,
        source: '3 stars/FFXIV_TT_Ifrit.webp',
        topValue: 7,
        bottomValue: 6,
        leftValue: 7,
        rightValue: 1,
        stars: 3
    },
    {
        name: 'Nero tol Scaeva',
        id: 43,
        source: '3 stars/FFXIV_TT_Nero_tol_Scaeva.webp',
        topValue: 4,
        bottomValue: 8,
        leftValue: 7,
        rightValue: 1,
        stars: 3
    },
    {
        name: 'Papalymo & Yda',
        id: 44,
        source: '3 stars/FFXIV_TT_Papalymo_Yda.webp',
        topValue: 3,
        bottomValue: 8,
        leftValue: 2,
        rightValue: 7,
        stars: 3
    },
    {
        name: 'Raya-O-Senna & A-Ruhn-Senna',
        id: 45,
        source: '3 stars/FFXIV_TT_Raya-O-Senna_A-Ruhn-Senna.webp',
        topValue: 5,
        bottomValue: 6,
        leftValue: 6,
        rightValue: 6,
        stars: 3
    },
    {
        name: 'Thancred',
        id: 46,
        source: '3 stars/FFXIV_TT_Thancred.webp',
        topValue: 2,
        bottomValue: 8,
        leftValue: 7,
        rightValue: 3,
        stars: 3
    },
    {
        name: 'Titan',
        id: 47,
        source: '3 stars/FFXIV_TT_Titan.webp',
        topValue: 1,
        bottomValue: 7,
        leftValue: 6,
        rightValue: 7,
        stars: 3
    },
    {
        name: 'Urianger',
        id: 48,
        source: '3 stars/FFXIV_TT_Urianger.webp',
        topValue: 8,
        bottomValue: 4,
        leftValue: 7,
        rightValue: 1,
        stars: 3
    },
    {
        name: 'Y\'shtola',
        id: 49,
        source: '3 stars/FFXIV_TT_Yshtola.webp',
        topValue: 7,
        bottomValue: 1,
        leftValue: 4,
        rightValue: 8,
        stars: 3
    }
];

export const FOUR_STAR_CARDS: Card[] = [
    {
        name: 'Alphinaud & Alisaie',
        id: 50,
        source: '4 stars/FFXIV_TT_Alphinaud_Alisaie.webp',
        topValue: 9,
        bottomValue: 3,
        leftValue: 9,
        rightValue: 3,
        stars: 4
    },
    {
        name: 'Cid nan Garlond',
        id: 51,
        source: '4 stars/FFXIV_TT_Cid_nan_Garlond.webp',
        topValue: 5,
        bottomValue: 9,
        leftValue: 2,
        rightValue: 9,
        stars: 4
    },
    {
        name: 'Lahabrea',
        id: 52,
        source: '4 stars/FFXIV_TT_Lahabrea.webp',
        topValue: 4,
        bottomValue: 4,
        leftValue: 8,
        rightValue: 9,
        stars: 4
    },
    {
        name: 'Leviathan',
        id: 53,
        source: '4 stars/FFXIV_TT_Leviathan.webp',
        topValue: 8,
        bottomValue: 8,
        leftValue: 1,
        rightValue: 8,
        stars: 4
    },
    {
        name: 'Louisoix Leveilleur',
        id: 54,
        source: '4 stars/FFXIV_TT_Louisoix_Leveilleur.webp',
        topValue: 9,
        bottomValue: 9,
        leftValue: 3,
        rightValue: 4,
        stars: 4
    },
    {
        name: 'Minfilia',
        id: 55,
        source: '4 stars/FFXIV_TT_Minfilia.webp',
        topValue: 9,
        bottomValue: 2,
        leftValue: 5,
        rightValue: 8,
        stars: 4
    },
    {
        name: 'Odin',
        id: 56,
        source: '4 stars/FFXIV_TT_Odin.webp',
        topValue: 8,
        bottomValue: 1,
        leftValue: 8,
        rightValue: 8,
        stars: 4
    },
    {
        name: 'Ramuh',
        id: 57,
        source: '4 stars/FFXIV_TT_Ramuh.webp',
        topValue: 8,
        bottomValue: 8,
        leftValue: 8,
        rightValue: 1,
        stars: 4
    },
    {
        name: 'Shiva',
        id: 58,
        source: '4 stars/FFXIV_TT_Shiva.webp',
        topValue: 1,
        bottomValue: 8,
        leftValue: 8,
        rightValue: 8,
        stars: 4
    },
    {
        name: 'Ultima Weapon',
        id: 59,
        source: '4 stars/FFXIV_TT_Ultima_Weapon.webp',
        topValue: 7,
        bottomValue: 9,
        leftValue: 1,
        rightValue: 8,
        stars: 4
    }
];

export const FIVE_STAR_CARDS: Card[] = [
    {
        name: 'Bahamut',
        id: 60,
        source: '5 stars/FFXIV_TT_Bahamut.webp',
        topValue: 9,
        bottomValue: 9,
        leftValue: 6,
        rightValue: 5,
        stars: 5
    },
    {
        name: 'Gaius van Baelsar',
        id: 61,
        source: '5 stars/FFXIV_TT_Gaius_van_Baelsar.webp',
        topValue: 4,
        bottomValue: 5,
        leftValue: 9,
        rightValue: 10,
        stars: 5
    },
    {
        name: 'Hildibrand & Nashu',
        id: 62,
        source: '5 stars/FFXIV_TT_Hildibrand_Nashu.webp',
        topValue: 1,
        bottomValue: 10,
        leftValue: 8,
        rightValue: 8,
        stars: 5
    },
    {
        name: 'Kan-E-Senna',
        id: 63,
        source: '5 stars/FFXIV_TT_Kan-E-Senna.webp',
        topValue: 9,
        bottomValue: 1,
        leftValue: 7,
        rightValue: 10,
        stars: 5
    },
    {
        name: 'Merlwyb Bloefhiswyn',
        id: 64,
        source: '5 stars/FFXIV_TT_Merlwyb_Bloefhiswyn.webp',
        topValue: 5,
        bottomValue: 10,
        leftValue: 3,
        rightValue: 9,
        stars: 5
    },
    {
        name: 'Nanamo_Ul_Namo',
        id: 65,
        source: '5 stars/FFXIV_TT_Nanamo_Ul_Namo.webp',
        topValue: 10,
        bottomValue: 4,
        leftValue: 8,
        rightValue: 6,
        stars: 5
    },
    {
        name: 'Rhauban Aldynn',
        id: 66,
        source: '5 stars/FFXIV_TT_Rhauban_Aldynn.webp',
        topValue: 6,
        bottomValue: 9,
        leftValue: 10,
        rightValue: 2,
        stars: 5
    },
];

export const ALL_CARDS: Card[] = [...ONE_STAR_CARDS, ...TWO_STAR_CARDS, ...THREE_STAR_CARDS, ...FOUR_STAR_CARDS, ...FIVE_STAR_CARDS];
