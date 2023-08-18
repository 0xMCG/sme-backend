import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { ReservoirApi } from 'src/lib/reservoir.api';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CollectionService {
  constructor(
    private readonly reservoirApi: ReservoirApi,
    @InjectModel('HotTop') private readonly hotTopSchema,
    @InjectModel('SellingTop') private readonly sellingTopSchema,
  ) {}

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  sellingTop() {
    // const sellingTops = [
    //   {
    //     "volume": 0,
    //     "count": 11978,
    //     "id": "0x907997b2caf998617efe2d5f535427ff2c955629",
    //     "name": "Chin Pokies (Official)",
    //     "image": "https://i.seadn.io/gcs/files/9c407b042577ba643f7a841e16ea0c97.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0,
    //     "count": 5325,
    //     "id": "0x0000000000664ceffed39244a8312bd895470803",
    //     "name": "mint.fun !fundrop pass",
    //     "image": "https://i.seadn.io/gcs/files/0f86db252c58e4bd1632d57ddee379b9.gif?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.89897,
    //     "count": 4752,
    //     "id": "0xf7a2e54d9c8c15d60726a5e11c8e98b25e484899",
    //     "name": "Milady2023",
    //     "image": null,
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 71.20393,
    //     "count": 3219,
    //     "id": "0x02e9b2389156ee8ed963b1341a69d5f54ada4d82",
    //     "name": "frENS",
    //     "image": "https://i.seadn.io/gcs/files/9e2b5b11eb00c4346791c752a2b2d933.jpg?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.0587,
    //     "count": 3078,
    //     "id": "0x2f47ca81a38cb76f94256706750a4ea879e7cf9f",
    //     "name": "RainbowParrot",
    //     "image": "https://i.seadn.io/gcs/files/82ff74c03886d9d18954be5ff1e921b8.jpg?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.0225,
    //     "count": 2837,
    //     "id": "0x15bb07b07816de9625bb3247332c9550b3717d97",
    //     "name": "Documenta X by Vuk Cosic",
    //     "image": "https://i.seadn.io/gcs/files/7fe842fd3ece16a52b154c5038643bd3.gif?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.05233,
    //     "count": 2155,
    //     "id": "0x0a791089acf48912a9cfde00e3a6afe9edbc3221",
    //     "name": "Raid Fairy",
    //     "image": "https://i.seadn.io/gcs/files/7a9ccf48884d24e250c33df49814e2d3.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 16.096,
    //     "count": 2012,
    //     "id": "0x0082578eedfd01ec97c36165469d012d6dc257cc",
    //     "name": "Infinity",
    //     "image": "https://i.seadn.io/gcs/files/4d211c64da28d5bdd68615587b92efeb.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 620.55424,
    //     "count": 1520,
    //     "id": "0xf9e39ce3463b8def5748ff9b8f7825af8f1b1617",
    //     "name": "Yue Minjun - Kingdom of the Laughing Man: Boundless",
    //     "image": "https://i.seadn.io/gcs/files/f4a830994b74222390702590a4303cf3.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0,
    //     "count": 1396,
    //     "id": "0xabe292b291a18699b09608de86888d77ad6baf23",
    //     "name": "VIP3 Membership Card",
    //     "image": "https://i.seadn.io/gcs/files/9b9719ed161cc8a243c71471a4489478.jpg?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 28.580000000000002,
    //     "count": 1237,
    //     "id": "0x7516ce30a4abadef77f7dd878bb849f0291c3771",
    //     "name": "AEB BEGINS",
    //     "image": "https://i.seadn.io/gcs/files/24be494910d931456c446f1ece9c6559.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.03139,
    //     "count": 1235,
    //     "id": "0xb30357d7237930ab93fb81c668707f5a77fb0a4f",
    //     "name": "Ugly Nouns",
    //     "image": null,
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 36.09875,
    //     "count": 1149,
    //     "id": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    //     "name": "ENS: Ethereum Name Service",
    //     "image": "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.053950000000000005,
    //     "count": 1121,
    //     "id": "0x10ec466749a26b90704f2f5f7d4c72aa48908d71",
    //     "name": "CoCoin",
    //     "image": null,
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.25183,
    //     "count": 1092,
    //     "id": "0x427b8efee2d6453bb1c59849f164c867e4b2b376",
    //     "name": "BEBverse Dimensions",
    //     "image": "https://i.seadn.io/gcs/files/4f4380587c2dea23b5404bdda06fec00.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 7.8113,
    //     "count": 1081,
    //     "id": "0x1bcbf0164d8cdc1bc7b74904b38f0363074bce30",
    //     "name": "Lettuce Headz",
    //     "image": "https://i.seadn.io/gcs/files/51fc18382b8aa7d2858a0dc7de094308.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.03124,
    //     "count": 1077,
    //     "id": "0x7bb824eced0a777c17ac0000b0e7f8e036f1538f",
    //     "name": "GlowSticks",
    //     "image": "https://i.seadn.io/gcs/files/765bb5082fa9abe349b783c308870976.jpg?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0,
    //     "count": 1005,
    //     "id": "0x6414e52fb0d419cdff8f93aec3aa15fdbc584bdf",
    //     "name": "Remixilated Babies",
    //     "image": "https://i.seadn.io/gcs/files/92da19f19d6566033e784d55c3db9073.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.37509,
    //     "count": 931,
    //     "id": "0x5a564d5aa8c39df28ff38247bbd786eec85bb476",
    //     "name": "COLD!",
    //     "image": "https://i.seadn.io/gcs/files/d18ef2b378040244c7c5b8e258ee78fa.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0.06392,
    //     "count": 921,
    //     "id": "0x4790e4cbac1add9278554211663acd14cf45f543",
    //     "name": "Flower Fairy",
    //     "image": "https://i.seadn.io/gcs/files/12807afc6176cd13581cbb390e6f6b11.gif?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 15.78144,
    //     "count": 876,
    //     "id": "0xd4416b13d2b3a9abae7acd5d6c2bbdbe25686401",
    //     "name": "ENS: Ethereum Name Service",
    //     "image": "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 0,
    //     "count": 745,
    //     "id": "0xcab1d8574d1a38651f544bbc45ce32541790abef",
    //     "name": "3am in LA",
    //     "image": "https://i.seadn.io/gae/7U8uQy1QyoLnstAUH3YshJFWmn0PLaumhyEMTMzm61-5uNh4t3r99eTP_RY9KTfgS7PWLoLaNKacqO1S3yR5_F4bb8TgdkMUZ787?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 150.74887,
    //     "count": 626,
    //     "id": "0xaf40b66072fe00cacf5a25cd1b7f1688cde20f2f",
    //     "name": "Fold by rudxane",
    //     "image": "https://i.seadn.io/gcs/files/929601545052b74cfa6779dd016ad527.png?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 7.50364,
    //     "count": 525,
    //     "id": "0x9b1750e5e27b491f2e3b3fa969e11a41f4ebb550",
    //     "name": "Dorkz",
    //     "image": "https://i.seadn.io/gcs/files/a35d1e2ec55edc9322dac21283906cfc.gif?w=500&auto=format",
    //     "recentSales": []
    //   },
    //   {
    //     "volume": 2.95,
    //     "count": 521,
    //     "id": "0x8ddef0396d4b61fcbb0e4a821dfac52c011f79da",
    //     "name": "cre8ors",
    //     "image": null,
    //     "recentSales": []
    //   }
    // ]

    // for (const sellingTop of sellingTops) {
    //   const model = new this.sellingTopSchema(sellingTop);
    //   model.save()
    // }

    return this.sellingTopSchema.find({}).limit(20).exec();
  }

  hotTop() {
    // const data = this.reservoirApi.getCollectionsV6();
    // const hotTops = [
    //   {
    //     "id": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    //     "slug": "boredapeyachtclub",
    //     "createdAt": "2022-02-09T21:14:58.386Z",
    //     "name": "Bored Ape Yacht Club",
    //     "image": "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/3P5K3dzgdB",
    //     "externalUrl": "http://www.boredapeyachtclub.com/",
    //     "twitterUsername": "BoredApeYC",
    //     "openseaVerificationStatus": "verified",
    //     "description": "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gae/qEmayxrH93qnzmfNdPm0JpZ4JN3LeZijfBvFn1JfTRuNbI8TnFFEHu6PUjGGihXm52aRU7yqr3G67fTgNE5Xf5AAIDIORgHRQN_F?w=500&auto=format",
    //       "https://i.seadn.io/gae/QdRMtumX_Be9H5pQdIJ_JTM4uer3lKZU_MAmlq6xCGlJSNASnKoO6xfKN-huho5q9__Yy7DX5npAobmKxAAWWToqnq5ulRHGfZZ2?w=500&auto=format",
    //       "https://i.seadn.io/gae/a8Nciu2Mmfe3XFn1h1cGhOuKtRYiZ_3szOZqGP19zQPrp8Kv3WzGNufbPhqhIHMlRhRs9bxjPmLGZjb4ET1bNm4n_cvhzEjF9WMCTGA?w=500&auto=format",
    //       "https://i.seadn.io/gae/fzVNf6RMBadRICyHLG9KRKcaB6NM4jQzytNX760vyvKOf48FisPh5tW_ImEbU4BKnYv0Ae0h5AZ20VWUqnAoMMhB3pp3P9rwCXNxAQ?w=500&auto=format"
    //     ],
    //     "tokenCount": "10000",
    //     "onSaleCount": "323",
    //     "primaryContract": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    //     "tokenSetId": "contract:0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    //     "creator": "0xaba7161a7fb69c88e16ed9f455ce62b791ee4d03",
    //     "royalties": {
    //       "recipient": "0xaae7ac476b117bccafe2f05f582906be44bc8ff1",
    //       "breakdown": [
    //         {
    //           "bps": 250,
    //           "recipient": "0xaae7ac476b117bccafe2f05f582906be44bc8ff1"
    //         }
    //       ],
    //       "bps": 250
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 250,
    //           "recipient": "0xaae7ac476b117bccafe2f05f582906be44bc8ff1"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 250,
    //           "recipient": "0xaae7ac476b117bccafe2f05f582906be44bc8ff1"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 250,
    //           "recipient": "0xa858ddc0445d8131dac4d1de01f834ffcba52ef1"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x7c273737006b2cbc79dee17245ed81bb82cb212a9de46e8871fd9bebc2808cc2",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "29110000000000000000",
    //           "decimal": 29.11,
    //           "usd": 54052.73306,
    //           "native": 29.11
    //         }
    //       },
    //       "maker": "0x8bff50aad8b4e06c5e148eaeb9d7aef69e26cdc3",
    //       "validFrom": 1691563842,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    //         "tokenId": "7219",
    //         "name": null,
    //         "image": "https://i.seadn.io/gae/VNScYCS4sP9OhcnGHKz2NQVQn2PUDBU_D9VYjirhp0JNHv0Fd-D5oUD-vknKk_DzP1sS84-PpCQrEWH9kkHGBcj4Fq14QWYufDV1kA?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0x5891ce1d14abf5c9159fb68424c40e8d61cc5d765693cfc351082b36bccdddda",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "28670000000000000000",
    //           "decimal": 28.67,
    //           "usd": 53197.26118,
    //           "native": 28.67
    //         },
    //         "netAmount": {
    //           "raw": "28670000000000000000",
    //           "decimal": 28.67,
    //           "usd": 53197.26118,
    //           "native": 28.67
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565442,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 1,
    //       "7day": 1,
    //       "30day": 2,
    //       "allTime": 3
    //     },
    //     "volume": {
    //       "1day": 820.62,
    //       "7day": 5888.1247,
    //       "30day": 38064.03296,
    //       "allTime": 1380934.01007
    //     },
    //     "volumeChange": {
    //       "1day": 1.8144551460638383,
    //       "7day": 0.5582559851541841,
    //       "30day": 0.4305864479581322
    //     },
    //     "floorSale": {
    //       "1day": 28.81,
    //       "7day": 28.78,
    //       "30day": 30
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.01041305102395,
    //       "7day": 1.011466296038916,
    //       "30day": 0.9703333333333334
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 5622,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    //     "slug": "cryptopunks",
    //     "createdAt": "2022-09-13T15:07:21.425Z",
    //     "name": "CryptoPunks",
    //     "image": "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/48oVuDyfe_xhs24BC2TTVcaYCX7rrU5mpuQLyTgRDbKHj2PtzKZsQ5qC3xTH4ar34wwAXxEKH8uUDPAGffbg7boeGYqX6op5vBDcbA?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/tQp4pSE",
    //     "externalUrl": "https://cryptopunks.app/",
    //     "twitterUsername": "cryptopunksnfts",
    //     "openseaVerificationStatus": "verified",
    //     "description": "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gae/VqWHjABPo6PwS-nszlRoPR0y3Oph939lSm8U4dJLZqGpi7YfSHvv7V59y8QmIA-b9hoI288LFplFsCGSPukSG05UB0dlfI8fBpjJ?w=500&auto=format",
    //       "https://i.seadn.io/gae/JpXz659GsRCV7db1JsLOLgrj7ggBrDQUslZeknQ9WGAcVeV6_rD7lfw6Noi-wH8psacGMNuf4DWCPq8-LUJhvz2NeYieqbp_HSGFug?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/48129313a135b9fd2b603ba0579ccd9e.png?w=500&auto=format",
    //       "https://i.seadn.io/gae/SeMzXNRN-zMbJvLTZtYjJwS72F8TvRsFH7bjP9T4rOWR9wyJZJbfWihRr6OoQ2-lq7M8_FW9dGAJRzlrF9qRKoyUigr8QWYfpEIbzg?w=500&auto=format"
    //     ],
    //     "tokenCount": "10000",
    //     "onSaleCount": "1082",
    //     "primaryContract": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    //     "tokenSetId": "contract:0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    //     "creator": "0xc352b534e8b987e036a93539fd6897f53488e56a",
    //     "royalties": {
    //       "recipient": null,
    //       "breakdown": [],
    //       "bps": 0
    //     },
    //     "allRoyalties": {
    //       "opensea": []
    //     },
    //     "floorAsk": {
    //       "id": "0x8d462fa7e5ef4c1e6997b5d305f248e973ad259e3c6c257ae5b64f9899396891",
    //       "sourceDomain": "cryptopunks.app",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "47270000000000000000",
    //           "decimal": 47.27,
    //           "usd": 87773.02273,
    //           "native": 47.27
    //         }
    //       },
    //       "maker": "0x2238c8b16c36628b8f1f36486675c1e2a30debf1",
    //       "validFrom": 1691519495,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
    //         "tokenId": "6186",
    //         "name": "CryptoPunk #6186",
    //         "image": "https://i.seadn.io/gae/dl3Yf_87PY1BFRNRXslnaSTTjtPJWV4-Mg76fLNJQ9IpEmbXtwiL8O8BV5OzHq4o7CY-pqtf9s0rIcUazMAIQ5YQJ2sjZMJJ87loRA?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": null,
    //       "sourceDomain": null,
    //       "price": null,
    //       "maker": null,
    //       "validFrom": null,
    //       "validUntil": null
    //     },
    //     "rank": {
    //       "1day": 4,
    //       "7day": 3,
    //       "30day": 7,
    //       "allTime": 4
    //     },
    //     "volume": {
    //       "1day": 296,
    //       "7day": 1805.73133,
    //       "30day": 8658.02433,
    //       "allTime": 1128586.56648
    //     },
    //     "volumeChange": {
    //       "1day": 4.589147286821706,
    //       "7day": 1.8735345487174633,
    //       "30day": 1.5669135434357522
    //     },
    //     "floorSale": {
    //       "1day": 59,
    //       "7day": 45,
    //       "30day": 47.5
    //     },
    //     "floorSaleChange": {
    //       "1day": 0.8011864406779661,
    //       "7day": 1.0504444444444445,
    //       "30day": 0.9951578947368421
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 3807,
    //     "contractKind": "cryptopunks",
    //     "mintedTimestamp": 1498225851,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    //     "slug": "mutant-ape-yacht-club",
    //     "createdAt": "2022-02-09T21:11:26.292Z",
    //     "name": "Mutant Ape Yacht Club",
    //     "image": "https://i.seadn.io/gae/lHexKRMpw-aoSyB1WdFBff5yfANLReFxHzt1DOj_sg7mS14yARpuvYcUtsyyx-Nkpk6WTcUPFoG53VnLJezYi8hAs0OxNZwlw6Y-dmI?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/5c-HcdLMinTg3LvEwXYZYC-u5nN22Pn5ivTPYA4pVEsWJHU1rCobhUlHSFjZgCHPGSmcGMQGCrDCQU8BfSfygmL7Uol9MRQZt6-gqA?w=500&auto=format",
    //     "discordUrl": null,
    //     "externalUrl": null,
    //     "twitterUsername": null,
    //     "openseaVerificationStatus": "verified",
    //     "description": "The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a Mutant Ape in the public sale.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/d6c5cd5f40f9d2c8756b24ca4513246a.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/36f5be61b3bc177d61456f38212d5419.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/0773382c9efc9f18a923ae8890cac201.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/9c084d4cb4581c2585d4f00e0950c10b.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "19481",
    //     "onSaleCount": "652",
    //     "primaryContract": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    //     "tokenSetId": "contract:0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    //     "creator": "0x9056d15c49b19df52ffad1e6c11627f035c0c960",
    //     "royalties": {
    //       "recipient": "0xaae7ac476b117bccafe2f05f582906be44bc8ff1",
    //       "breakdown": [
    //         {
    //           "bps": 250,
    //           "recipient": "0xaae7ac476b117bccafe2f05f582906be44bc8ff1"
    //         }
    //       ],
    //       "bps": 250
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 250,
    //           "recipient": "0xaae7ac476b117bccafe2f05f582906be44bc8ff1"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 250,
    //           "recipient": "0xaae7ac476b117bccafe2f05f582906be44bc8ff1"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 250,
    //           "recipient": "0xa858ddc0445d8131dac4d1de01f834ffcba52ef1"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0xf3b6c8aa56f7b3c8b4be293a724b70a83ade3d12bc87eb98076c4b0828b4eff1",
    //       "sourceDomain": "looksrare.org",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "5700000000000000000",
    //           "decimal": 5.7,
    //           "usd": 10584.01163,
    //           "native": 5.7
    //         }
    //       },
    //       "maker": "0x7c7c9ce081becb5f44ef9eed3a90d99057d2eb53",
    //       "validFrom": 1691562104,
    //       "validUntil": 1694154097,
    //       "token": {
    //         "contract": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    //         "tokenId": "20784",
    //         "name": "#20784 (M1)",
    //         "image": "https://i.seadn.io/gcs/files/5b99b84d34529d7c5a9bec995249c2a4.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0x8cc39c2a75f9c34de3af12209038356bfd1c764c0bc26f59bae803c92c0a5498",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "5630000000000000000",
    //           "decimal": 5.63,
    //           "usd": 10446.47996,
    //           "native": 5.63
    //         },
    //         "netAmount": {
    //           "raw": "5630000000000000000",
    //           "decimal": 5.63,
    //           "usd": 10446.47996,
    //           "native": 5.63
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565462,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 2,
    //       "7day": 2,
    //       "30day": 3,
    //       "allTime": 5
    //     },
    //     "volume": {
    //       "1day": 686.4263,
    //       "7day": 4284.45864,
    //       "30day": 21259.48908,
    //       "allTime": 993134.60151
    //     },
    //     "volumeChange": {
    //       "1day": 0.9875797185773245,
    //       "7day": 1.0655018605157167,
    //       "30day": 0.4698494231987918
    //     },
    //     "floorSale": {
    //       "1day": 0.1,
    //       "7day": 5.11,
    //       "30day": 0.001
    //     },
    //     "floorSaleChange": {
    //       "1day": 57,
    //       "7day": 1.1154598825831703,
    //       "30day": 5700
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 11460,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0xed5af388653567af2f388e6224dc7c4b3241c544",
    //     "slug": "azuki",
    //     "createdAt": "2022-02-09T21:10:09.763Z",
    //     "name": "Azuki",
    //     "image": "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/O0XkiR_Z2--OPa_RA6FhXrR16yBOgIJqSLdHTGA0-LAhyzjSYcb3WEPaCYZHeh19JIUEAUazofVKXcY2qOylWCdoeBN6IfGZLJ3I4A?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/azuki",
    //     "externalUrl": "http://www.azuki.com",
    //     "twitterUsername": "Azuki",
    //     "openseaVerificationStatus": "verified",
    //     "description": "Take the red bean to join the garden. View the collection at [azuki.com/gallery](https://azuki.com/gallery).\r\n\r\nAzuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit [azuki.com](https://azuki.com) for more details.\r\n\r\nWe rise together. We build together. We grow together.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/70ce1f42350abb3c8cda61f88dcaf5db.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/6e1d416e525d6c9a45d622788c06c8c9.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/8dd26703eb8500a3462e11877eb16fe8.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/853057c4a99f0e8a12fdef9404b3a6c0.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "10000",
    //     "onSaleCount": "626",
    //     "primaryContract": "0xed5af388653567af2f388e6224dc7c4b3241c544",
    //     "tokenSetId": "contract:0xed5af388653567af2f388e6224dc7c4b3241c544",
    //     "creator": "0x2ae6b0630ebb4d155c6e04fcb16840ffa77760aa",
    //     "royalties": {
    //       "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x49468334c17e585d43f3d248d7b4cf7073d716682f499a444c8191c3773c5771",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "4858000000000000000",
    //           "decimal": 4.858,
    //           "usd": 9020.54886,
    //           "native": 4.858
    //         }
    //       },
    //       "maker": "0x29469395eaf6f95920e59f858042f0e28d98a20b",
    //       "validFrom": 1691565381,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0xed5af388653567af2f388e6224dc7c4b3241c544",
    //         "tokenId": "3976",
    //         "name": "Azuki #3976",
    //         "image": "https://i.seadn.io/gcs/files/bc4a90e43bba14344b853d604a13e184.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0x98bbc25f543840490cb58485f9ff4f49684bd4c4d74600199e70dfc51ec0ef18",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "4800000000000000000",
    //           "decimal": 4.8,
    //           "usd": 8906.41275,
    //           "native": 4.8
    //         },
    //         "netAmount": {
    //           "raw": "4776000000000000000",
    //           "decimal": 4.776,
    //           "usd": 8861.88069,
    //           "native": 4.776
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565442,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 7,
    //       "7day": 5,
    //       "30day": 1,
    //       "allTime": 6
    //     },
    //     "volume": {
    //       "1day": 228.5096,
    //       "7day": 3047.93387,
    //       "30day": 22604.04906,
    //       "allTime": 697688.43109
    //     },
    //     "volumeChange": {
    //       "1day": 0.732228541924338,
    //       "7day": 0.9084793403473287,
    //       "30day": 0.24370457399120254
    //     },
    //     "floorSale": {
    //       "1day": 4.8,
    //       "7day": 4.93,
    //       "30day": 6.8
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.0120833333333332,
    //       "7day": 0.9853955375253549,
    //       "30day": 0.7144117647058823
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 4364,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258",
    //     "slug": "otherdeed",
    //     "createdAt": "2022-04-29T14:03:45.673Z",
    //     "name": "Otherdeed for Otherside",
    //     "image": "https://i.seadn.io/gae/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY4zI?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/E_XVuM8mX1RuqBym2JEX4RBg_sj9KbTFBAi0qU4eBr2E3VCC0bwpWrgHqBOaWsKGTf4-DBseuZJGvsCVBnzLjxqgq7rAb_93zkZ-?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/the-otherside",
    //     "externalUrl": "https://otherside.xyz",
    //     "twitterUsername": "othersidemeta",
    //     "openseaVerificationStatus": "verified",
    //     "description": "Otherdeed is the key to claiming land in Otherside. Each have a unique blend of environment and sediment — some with resources, some home to powerful artifacts. And on a very few, a Koda roams.",
    //     "sampleImages": [
    //       "https://img.seadn.io/files/e05c03e4d2fbf5577230fc7d926c680d.jpg?h=1024&w=1024&auto=format",
    //       "https://img.seadn.io/files/e05c03e4d2fbf5577230fc7d926c680d.jpg?h=1024&w=1024&auto=format",
    //       "https://i.seadn.io/gcs/files/e05c03e4d2fbf5577230fc7d926c680d.jpg?w=500&auto=format",
    //       "https://img.seadn.io/files/e05c03e4d2fbf5577230fc7d926c680d.jpg?h=1024&w=1024&auto=format"
    //     ],
    //     "tokenCount": "100000",
    //     "onSaleCount": "1733",
    //     "primaryContract": "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258",
    //     "tokenSetId": "contract:0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258",
    //     "creator": "0xe53c9cbfc1314b6cf6ba508230457df130552bc6",
    //     "royalties": {
    //       "recipient": "0x37ceb4ba093d40234c6fb312d9791b67c04ef49a",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x37ceb4ba093d40234c6fb312d9791b67c04ef49a"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x37ceb4ba093d40234c6fb312d9791b67c04ef49a"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x37ceb4ba093d40234c6fb312d9791b67c04ef49a"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x37ceb4ba093d40234c6fb312d9791b67c04ef49a"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x738be4c70272b3c36daa97aaf737070c562e21cd37df793be6deede1114d1c0d",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "597000000000000000",
    //           "decimal": 0.597,
    //           "usd": 1108.53595,
    //           "native": 0.597
    //         }
    //       },
    //       "maker": "0x163c29e5d553b3ecb5f31c2b7fb9714f66ebb8d9",
    //       "validFrom": 1691560989,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258",
    //         "tokenId": "57839",
    //         "name": null,
    //         "image": "https://i.seadn.io/gcs/files/dc1ce459df4c740392f2a4104721f4de.jpg?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0x43fe5fb093d76d7fadad45922d2d9c041118f128e1c3bb0d393ff60fe2c5c138",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "600000000000000000",
    //           "decimal": 0.6,
    //           "usd": 1113.30159,
    //           "native": 0.6
    //         },
    //         "netAmount": {
    //           "raw": "597000000000000000",
    //           "decimal": 0.597,
    //           "usd": 1107.73509,
    //           "native": 0.597
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565441,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 36,
    //       "7day": 39,
    //       "30day": 24,
    //       "allTime": 7
    //     },
    //     "volume": {
    //       "1day": 27.20067,
    //       "7day": 244.162,
    //       "30day": 1391.59373,
    //       "allTime": 669264.82249
    //     },
    //     "volumeChange": {
    //       "1day": 0.6582692137318802,
    //       "7day": 0.8715307814998989,
    //       "30day": 0.5879404996144089
    //     },
    //     "floorSale": {
    //       "1day": 0.5736,
    //       "7day": 0.5924,
    //       "30day": 0.6869
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.040794979079498,
    //       "7day": 1.0077650236326807,
    //       "30day": 0.8691221429611297
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 17659,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": 1651240726,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
    //     "slug": "clonex",
    //     "createdAt": "2022-02-09T16:30:18.274Z",
    //     "name": "CLONE X - X TAKASHI MURAKAMI",
    //     "image": "https://i.seadn.io/gae/XN0XuD8Uh3jyRWNtPTFeXJg_ht8m5ofDx6aHklOiy4amhFuWUa0JaR6It49AH8tlnYS386Q0TW_-Lmedn0UET_ko1a3CbJGeu5iHMg?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gcs/files/7feabe9facae686cd9d1b599ec18f461.png?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/rtfkt",
    //     "externalUrl": "http://www.rtfkt.com",
    //     "twitterUsername": "RTFKT",
    //     "openseaVerificationStatus": "verified",
    //     "description": "🧬 CLONE X 🧬\r\n\r\n20,000 next-gen Avatars, by RTFKT and Takashi Murakami 🌸",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/0654056dba85e9d6ead02b4a6c1b0376.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/b447bff5b222b059727bc5f884eb40f1.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/74384a0e426172aaa8e9935aeb46cd2a.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/9625d62a1fdc38fdd3477b4f5a3d6f22.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "19504",
    //     "onSaleCount": "1078",
    //     "primaryContract": "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
    //     "tokenSetId": "contract:0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
    //     "creator": "0x12ea19217c65f36385bb030d00525c1034e2f0af",
    //     "royalties": {
    //       "recipient": "0xe65b6865dbce299ae6a20efcc7543362540741d8",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xe65b6865dbce299ae6a20efcc7543362540741d8"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xe65b6865dbce299ae6a20efcc7543362540741d8"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xe65b6865dbce299ae6a20efcc7543362540741d8"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xe65b6865dbce299ae6a20efcc7543362540741d8"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x62535f9c280b50cb4bc2d7990a7a7be6f6407a304802bfd2971d6242cf5ef15a",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "1460000000000000000",
    //           "decimal": 1.46,
    //           "usd": 2710.99245,
    //           "native": 1.46
    //         }
    //       },
    //       "maker": "0x29469395eaf6f95920e59f858042f0e28d98a20b",
    //       "validFrom": 1691550537,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
    //         "tokenId": "3146",
    //         "name": "CloneX #4792",
    //         "image": "https://i.seadn.io/gcs/files/a7e6ee3aedd1d53007c8a77d65ae705c.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0xc062239074fd86bc2f14968342972c75779319c7602f3f9b286721b520385266",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "1440000000000000000",
    //           "decimal": 1.44,
    //           "usd": 2671.92383,
    //           "native": 1.44
    //         },
    //         "netAmount": {
    //           "raw": "1440000000000000000",
    //           "decimal": 1.44,
    //           "usd": 2671.92383,
    //           "native": 1.44
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565468,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 21,
    //       "7day": 7,
    //       "30day": 10,
    //       "allTime": 8
    //     },
    //     "volume": {
    //       "1day": 52.56677,
    //       "7day": 709.46377,
    //       "30day": 2392.16465,
    //       "allTime": 404669.91679
    //     },
    //     "volumeChange": {
    //       "1day": 1.101060157563703,
    //       "7day": 0.9826887326009071,
    //       "30day": 0.7105122984852418
    //     },
    //     "floorSale": {
    //       "1day": 1.25,
    //       "7day": 1.33,
    //       "30day": 1.7
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.168,
    //       "7day": 1.0977443609022557,
    //       "30day": 0.8588235294117647
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 9493,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x495f947276749ce646f68ac8c248420045cb7b5e",
    //     "slug": "opensea-shared-storefront",
    //     "createdAt": "2022-02-09T17:09:22.616Z",
    //     "name": "OpenSea Shared Storefront",
    //     "image": "https://lh3.googleusercontent.com/Xyo6-8GOJjyyJMH3uYrKVz9Sb4KHtg2CRImF14yYUJQMJdp6yvC6DWjrB1EEoePBcbiB0qF7yN0ruTQDfzDZ6ueVYG0grnbc-kwRIQ",
    //     "banner": null,
    //     "discordUrl": null,
    //     "externalUrl": null,
    //     "twitterUsername": null,
    //     "openseaVerificationStatus": null,
    //     "description": null,
    //     "sampleImages": [
    //       "https://lh3.googleusercontent.com/Xyo6-8GOJjyyJMH3uYrKVz9Sb4KHtg2CRImF14yYUJQMJdp6yvC6DWjrB1EEoePBcbiB0qF7yN0ruTQDfzDZ6ueVYG0grnbc-kwRIQ"
    //     ],
    //     "tokenCount": "124851",
    //     "onSaleCount": "1097",
    //     "primaryContract": "0x495f947276749ce646f68ac8c248420045cb7b5e",
    //     "tokenSetId": "contract:0x495f947276749ce646f68ac8c248420045cb7b5e",
    //     "creator": null,
    //     "royalties": {
    //       "recipient": null,
    //       "breakdown": [],
    //       "bps": 0
    //     },
    //     "allRoyalties": {},
    //     "floorAsk": {
    //       "id": "0xe53ffc32ea3831c3ff003e21c07515cb4781df72aed64c0652fdd0e98f30a62c",
    //       "sourceDomain": "element.market",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "990000000000000",
    //           "decimal": 0.00099,
    //           "usd": 1.83828,
    //           "native": 0.00099
    //         }
    //       },
    //       "maker": "0x792159c56c3614d821f84b3e41e83740d13ee752",
    //       "validFrom": 1690281666,
    //       "validUntil": 1692873726,
    //       "token": {
    //         "contract": "0x495f947276749ce646f68ac8c248420045cb7b5e",
    //         "tokenId": "112181281911606623139618406244681643982144645714733653838216532176424948203521",
    //         "name": null
    //       }
    //     },
    //     "topBid": {
    //       "id": null,
    //       "sourceDomain": null,
    //       "price": null,
    //       "maker": null,
    //       "validFrom": null,
    //       "validUntil": null
    //     },
    //     "rank": {
    //       "1day": 761,
    //       "7day": 383,
    //       "30day": 1058,
    //       "allTime": 9
    //     },
    //     "volume": {
    //       "1day": 0.149,
    //       "7day": 2.06461,
    //       "30day": 24.27346,
    //       "allTime": 359703.65069
    //     },
    //     "volumeChange": {
    //       "1day": 2.1316165951359083,
    //       "7day": 0.2680998324871119,
    //       "30day": 0.8773167574518809
    //     },
    //     "floorSale": {
    //       "1day": 0.01,
    //       "7day": 0.00911,
    //       "30day": 0.0001
    //     },
    //     "floorSaleChange": {
    //       "1day": 0.099,
    //       "7day": 0.10867178924259056,
    //       "30day": 9.9
    //     },
    //     "collectionBidSupported": false,
    //     "ownerCount": 713361,
    //     "contractKind": "erc1155",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x23581767a106ae21c074b2276d25e5c3e136a68b",
    //     "slug": "proof-moonbirds",
    //     "createdAt": "2022-04-15T17:36:05.484Z",
    //     "name": "Moonbirds",
    //     "image": "https://i.seadn.io/gcs/files/4bce6187fea476154b311dafaf327c89.png?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gcs/files/f0d3006fb5a1f09d1619a024762f5aee.png?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/proof",
    //     "externalUrl": "https://proof.xyz/moonbirds",
    //     "twitterUsername": "moonbirds",
    //     "openseaVerificationStatus": "verified",
    //     "description": "Moonbirds is the art collector’s PFP. Each of the 10,000 digital artworks in the collection grants holders access to unique experiences to connect with artists and own and champion their art. As a community, Moonbirds is a home for creatives, dreamers, and collectors seeking real connection as we all contribute to the future of web3 art, culture, and technology.\n\nMoonbird art is entirely in-chain, meaning the images are outputted directly from the smart contract, with no need for storage on IPFS or the like. There are also a number of customisable backgrounds available to holders based on their on-chain activity (such as other NFT holdings)—which disappear when the bird is transferred. You can check what each bird looks like with the different backgrounds (and see if they have any unclaimed rewards!) on our [site](https://proof.xyz/moonbirds)",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/d6c3dc9c4948d5e116c482e5b3284c13.png?w=500&auto=format",
    //       "https://openseauserdata.com/files/14a61914665fa337444b7a922287aa70.bin",
    //       "https://i.seadn.io/gcs/files/87c8ee68edd5eb7713a16cb7f02c8870.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/3f5f8e8a91282fe30cb02ddf51c944d5.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "10000",
    //     "onSaleCount": "207",
    //     "primaryContract": "0x23581767a106ae21c074b2276d25e5c3e136a68b",
    //     "tokenSetId": "contract:0x23581767a106ae21c074b2276d25e5c3e136a68b",
    //     "creator": "0x6c8984baf566db08675310b122bf0be9ea269eca",
    //     "royalties": {
    //       "recipient": "0xd1d507b688b518d2b7a4f65007799a5e9d80e974",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xd1d507b688b518d2b7a4f65007799a5e9d80e974"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x73464dfeac74096a05604234b471412c73d5076f"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xd1d507b688b518d2b7a4f65007799a5e9d80e974"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xd1d507b688b518d2b7a4f65007799a5e9d80e974"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x95ddf14aba7b81571fcfcf5403b8aa52d67bc72366b917875ada980163d79bfa",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "1564000000000000000",
    //           "decimal": 1.564,
    //           "usd": 2904.10424,
    //           "native": 1.564
    //         }
    //       },
    //       "maker": "0x90b74ef7bc1975bcb1c67450c7b1575922b67e54",
    //       "validFrom": 1691563785,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0x23581767a106ae21c074b2276d25e5c3e136a68b",
    //         "tokenId": "7627",
    //         "name": "#7627 🪺",
    //         "image": "https://openseauserdata.com/files/cf36ec1709439f03ce1ea852508f5ea6.bin"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0xe74a54302cf48c57c78979a925a5315c8038215d0a76a9430341e1af1cea9f48",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "1540000000000000000",
    //           "decimal": 1.54,
    //           "usd": 2857.47409,
    //           "native": 1.54
    //         },
    //         "netAmount": {
    //           "raw": "1540000000000000000",
    //           "decimal": 1.54,
    //           "usd": 2857.47409,
    //           "native": 1.54
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565417,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 24,
    //       "7day": 22,
    //       "30day": 34,
    //       "allTime": 10
    //     },
    //     "volume": {
    //       "1day": 35.2562,
    //       "7day": 201.62971,
    //       "30day": 1407.29643,
    //       "allTime": 339395.10025
    //     },
    //     "volumeChange": {
    //       "1day": 1.6753644369800482,
    //       "7day": 0.2895385406956065,
    //       "30day": 0.8273074294974689
    //     },
    //     "floorSale": {
    //       "1day": 1.55,
    //       "7day": 1.5126,
    //       "30day": 1.79
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.0090322580645161,
    //       "7day": 1.0339812243818591,
    //       "30day": 0.8737430167597765
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 6356,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": 1650043630,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    //     "slug": "doodles-official",
    //     "createdAt": "2022-02-09T21:10:23.583Z",
    //     "name": "Doodles",
    //     "image": "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/svc_rQkHVGf3aMI14v3pN-ZTI7uDRwN-QayvixX-nHSMZBgb1L1LReSg1-rXj4gNLJgAB0-yD8ERoT-Q2Gu4cy5AuSg-RdHF9bOxFDw?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/doodles",
    //     "externalUrl": "https://doodles.app",
    //     "twitterUsername": "doodles",
    //     "openseaVerificationStatus": "verified",
    //     "description": "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000. Each Doodle allows its owner to vote for experiences and activations paid for by the Doodles Community Treasury.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/8c96682b31bd484e921c105751009228.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/af5d635a8ba3fe11fd5b6ae414c91e78.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/d621cc4f6966775379e08e7ac11ba4b1.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/a1cb93336417e4b27d1715a586edac38.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "10000",
    //     "onSaleCount": "439",
    //     "primaryContract": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    //     "tokenSetId": "contract:0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    //     "creator": "0x2b3ab8e7bb14988616359b78709538b10900ab7d",
    //     "royalties": {
    //       "recipient": "0xd1f124cc900624e1ff2d923180b3924147364380",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xd1f124cc900624e1ff2d923180b3924147364380"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xd1f124cc900624e1ff2d923180b3924147364380"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x5e81037b4c57ebacc0cf3da2eb67ea9292c706b1fe1659b8cbfb7a50dd3aa088",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "1569900000000000000",
    //           "decimal": 1.5699,
    //           "usd": 2915.05962,
    //           "native": 1.5699
    //         }
    //       },
    //       "maker": "0x90b74ef7bc1975bcb1c67450c7b1575922b67e54",
    //       "validFrom": 1691562141,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    //         "tokenId": "9154",
    //         "name": "Doodle #9154",
    //         "image": "https://i.seadn.io/gcs/files/57e0b76c0d64c7582cc903381e3b20fd.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0xc70154bbfae8b4405be760dfb6d24ba00fb1311fa47253fbb4a2c678933a6a34",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "1520000000000000000",
    //           "decimal": 1.52,
    //           "usd": 2820.36404,
    //           "native": 1.52
    //         },
    //         "netAmount": {
    //           "raw": "1520000000000000000",
    //           "decimal": 1.52,
    //           "usd": 2820.36404,
    //           "native": 1.52
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565498,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 20,
    //       "7day": 33,
    //       "30day": 33,
    //       "allTime": 11
    //     },
    //     "volume": {
    //       "1day": 55.641,
    //       "7day": 304.96792,
    //       "30day": 942.31445,
    //       "allTime": 296826.65689
    //     },
    //     "volumeChange": {
    //       "1day": 2.4037783398493535,
    //       "7day": 1.4446260938988928,
    //       "30day": 0.4599897411027327
    //     },
    //     "floorSale": {
    //       "1day": 1.52,
    //       "7day": 1.35,
    //       "30day": 1.62
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.0328289473684211,
    //       "7day": 1.1628888888888889,
    //       "30day": 0.9690740740740741
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 5541,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623",
    //     "slug": "bored-ape-kennel-club",
    //     "createdAt": "2022-02-09T21:11:14.169Z",
    //     "name": "Bored Ape Kennel Club",
    //     "image": "https://i.seadn.io/gcs/files/c4dfc6be4d9c5d4f073de2efe181416a.jpg?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gcs/files/a5414557ae405cb6233b4e2e4fa1d9e6.jpg?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/wjH7hGz2yS",
    //     "externalUrl": "http://boredapeyachtclub.com/#/kennel-club",
    //     "twitterUsername": "boredapeyc",
    //     "openseaVerificationStatus": "verified",
    //     "description": "It gets lonely in the swamp sometimes. That's why every ape should have a four-legged companion. To curl up at your feet. To bring you a beer. To fire a missile launcher at that bastard Jimmy the Monkey.\r\n\r\nThat's why we've started the Bored Ape Kennel Club, and why we're offering up a dog NFT for adoption to every single member of the BAYC – for free (you only pay gas).\r\n\r\nLearn more at: http://boredapeyachtclub.com/#/kennel-club",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/c88f3fac175a095c1670db249822135f.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/a10b8728a597c0134ace70a2a8df6c54.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/b6e77527085727c0871c5535dcaf495b.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/f73c2c2faffda72bf1ec50b86fa3fd3b.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "9602",
    //     "onSaleCount": "263",
    //     "primaryContract": "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623",
    //     "tokenSetId": "contract:0xba30e5f9bb24caa003e9f2f0497ad287fdf95623",
    //     "creator": "0xaf62311ee2224fed4d3884a1793b4c50b86f4462",
    //     "royalties": {
    //       "recipient": null,
    //       "breakdown": [],
    //       "bps": 0
    //     },
    //     "allRoyalties": {
    //       "eip2981": [],
    //       "onchain": [],
    //       "opensea": [
    //         {
    //           "bps": 250,
    //           "recipient": "0xa858ddc0445d8131dac4d1de01f834ffcba52ef1"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x35fa54a279a996e81f69b1cf6e5f88c265b5486faf0096c2547601fcbb8c711e",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "2149600000000000000",
    //           "decimal": 2.1496,
    //           "usd": 3991.47217,
    //           "native": 2.1496
    //         }
    //       },
    //       "maker": "0x29469395eaf6f95920e59f858042f0e28d98a20b",
    //       "validFrom": 1691561393,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623",
    //         "tokenId": "2553",
    //         "name": null,
    //         "image": "https://i.seadn.io/gcs/files/ddbf7437e7fc06fc51276322b502996b.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0x72edb17bba1581fd1501d0f4ff33b489108b7fc247ba18cacc46f478e740cfaa",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "2120000000000000000",
    //           "decimal": 2.12,
    //           "usd": 3933.66563,
    //           "native": 2.12
    //         },
    //         "netAmount": {
    //           "raw": "2120000000000000000",
    //           "decimal": 2.12,
    //           "usd": 3933.66563,
    //           "native": 2.12
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565480,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 15,
    //       "7day": 12,
    //       "30day": 21,
    //       "allTime": 12
    //     },
    //     "volume": {
    //       "1day": 80.63529,
    //       "7day": 1677.93215,
    //       "30day": 4581.40536,
    //       "allTime": 267151.21719
    //     },
    //     "volumeChange": {
    //       "1day": 0.2322417483350543,
    //       "7day": 2.223670841875371,
    //       "30day": 0.886421506300827
    //     },
    //     "floorSale": {
    //       "1day": 2.09,
    //       "7day": 2.09,
    //       "30day": 2.45
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.0285167464114833,
    //       "7day": 1.0285167464114833,
    //       "30day": 0.8773877551020408
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 5231,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
    //     "slug": "meebits",
    //     "createdAt": "2022-02-09T21:17:04.752Z",
    //     "name": "Meebits",
    //     "image": "https://i.seadn.io/gcs/files/2d036c8c2bed042a1588622c3173677f.png?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gcs/files/cbeed39f76506b4baf71005d7127d0df.png?w=500&auto=format",
    //     "discordUrl": "https://discord.com/invite/meebits",
    //     "externalUrl": "https://meebits.app/",
    //     "twitterUsername": "MeebitsNFTs",
    //     "openseaVerificationStatus": "verified",
    //     "description": "The Meebits are 20,000 unique 3D voxel characters, created by a custom generative algorithm, then registered on the Ethereum blockchain.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/a07376ec3582b7296ee076d0cf2b64f3.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/51039ca2a60fad5ac5fb69b62043d62b.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/274036baa2d2beac18bee1177f92399c.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/d119792a2fcad4a9084c6df2891e3331.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "20000",
    //     "onSaleCount": "716",
    //     "primaryContract": "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
    //     "tokenSetId": "contract:0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
    //     "creator": "0xc352b534e8b987e036a93539fd6897f53488e56a",
    //     "royalties": {
    //       "recipient": "0xa858ddc0445d8131dac4d1de01f834ffcba52ef1",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xa858ddc0445d8131dac4d1de01f834ffcba52ef1"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xa858ddc0445d8131dac4d1de01f834ffcba52ef1"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x2fc1864d0d2a1479fd27ba53eb75ec8804ec8d33a29e7e9e1e18e680465f2a4a",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "1161900000000000000",
    //           "decimal": 1.1619,
    //           "usd": 2157.46721,
    //           "native": 1.1619
    //         }
    //       },
    //       "maker": "0x90b74ef7bc1975bcb1c67450c7b1575922b67e54",
    //       "validFrom": 1691563826,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
    //         "tokenId": "4807",
    //         "name": "Meebit #4807",
    //         "image": "https://i.seadn.io/gcs/files/b5c4391493742603fd0335d188e02853.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0xa76e916b988163e010de38a548641a1ac3c70f16233218fdc56361df60e1088c",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "1150000000000000000",
    //           "decimal": 1.15,
    //           "usd": 2133.82805,
    //           "native": 1.15
    //         },
    //         "netAmount": {
    //           "raw": "1144250000000000000",
    //           "decimal": 1.14425,
    //           "usd": 2123.15891,
    //           "native": 1.14425
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565491,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 31,
    //       "7day": 60,
    //       "30day": 25,
    //       "allTime": 13
    //     },
    //     "volume": {
    //       "1day": 29.121,
    //       "7day": 244.41292,
    //       "30day": 717.96405,
    //       "allTime": 233764.98293
    //     },
    //     "volumeChange": {
    //       "1day": 0.6165172249463265,
    //       "7day": 1.5902319545236914,
    //       "30day": 0.5146110234899752
    //     },
    //     "floorSale": {
    //       "1day": 1.1499,
    //       "7day": 1.08,
    //       "30day": 1.33582
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.010435690060005,
    //       "7day": 1.0758333333333334,
    //       "30day": 0.8698042366804427
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 6569,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
    //     "slug": "wrapped-cryptopunks",
    //     "createdAt": "2022-02-09T17:22:43.931Z",
    //     "name": "Wrapped Cryptopunks",
    //     "image": "https://i.seadn.io/gcs/files/e0972d771af4d633e70e00338aa38e34.png?w=500&auto=format",
    //     "banner": "https://storage.googleapis.com/opensea-prod.appspot.com/static/banners/wrapped-banner2.png",
    //     "discordUrl": "https://discord.gg/Bvf5m9k",
    //     "externalUrl": "https://wrappedpunks.com/",
    //     "twitterUsername": "arkgalleryDAO",
    //     "openseaVerificationStatus": "verified",
    //     "description": "Wrapped Punks are ERC721 Tokens, each one backed 1:1 by an original Cryptopunk by Larvalabs.\r\n\r\nBuy an original Cryptopunk at https://larvalabs.com/cryptopunks\r\n\r\nTurn your Original Cryptopunk into an ERC721 at https://wrappedpunks.com/\r\n\r\nCryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gae/bmyCzhDjDr3Fr3QfJH-7fwWyzI_BsgXLPhu5I-aOnI3Ussr9wmVV8FdI9EjMgkAzEKf-2YRHqrQBf_SjLu9a_VFIIOTXvbXMIwesOw?w=500&auto=format",
    //       "https://i.seadn.io/gae/v3GjexaYP9YOym6g1F9xrs7AbJOJJ9eBdzS7iqGm7Lt8eNwr_k1aY_Wb5dJord8TAfxAtjkzu3xNXcY-R71McO29c_EQ0HLbiB5ODA?w=500&auto=format",
    //       "https://i.seadn.io/gae/tnrEr6Erk87RSExFh0OplsBuMrCs3oMSGAtdyQFNOI_G7BvttGeU78FCrcwPnkKniWGlIqbLy0foRq0i4FXi2y1kUV569gKxAgCM6g?w=500&auto=format",
    //       "https://i.seadn.io/gae/GWeYmUlc1q8B4WtEgcZP8T6Lj_Sss_KX4vVfp31_sbfEArrW32L0MjPb7N2Or5lNce9-McO29pOUo5nTGnfWTg_-GfJ3Ai2ULmv9zg?w=500&auto=format"
    //     ],
    //     "tokenCount": "819",
    //     "onSaleCount": "23",
    //     "primaryContract": "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
    //     "tokenSetId": "contract:0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
    //     "creator": "0x3c63d087ad7de996221c57fe4e55dfcee182ae27",
    //     "royalties": {
    //       "recipient": null,
    //       "breakdown": [],
    //       "bps": 0
    //     },
    //     "allRoyalties": {
    //       "opensea": []
    //     },
    //     "floorAsk": {
    //       "id": "0xe45522ad2a707e3320c80e3ed7b0d76b5d617338313b16b36fbfa350370f5edc",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "47900000000000000000",
    //           "decimal": 47.9,
    //           "usd": 88942.83455,
    //           "native": 47.9
    //         }
    //       },
    //       "maker": "0x29469395eaf6f95920e59f858042f0e28d98a20b",
    //       "validFrom": 1691121324,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0xb7f7f6c52f2e2fdb1963eab30438024864c313f6",
    //         "tokenId": "4329",
    //         "name": "W#4329",
    //         "image": "https://i.seadn.io/gcs/files/cdc8b7bb328425329ba17577ed4e23ba.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0xb2713a1e394dc9a2ca8518b6e02c22cf587f813116c29e7b5c7bdfb9dfff112a",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "46430000000000000000",
    //           "decimal": 46.43,
    //           "usd": 86150.98836,
    //           "native": 46.43
    //         },
    //         "netAmount": {
    //           "raw": "46430000000000000000",
    //           "decimal": 46.43,
    //           "usd": 86150.98836,
    //           "native": 46.43
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565442,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 22,
    //       "7day": 23,
    //       "30day": 15,
    //       "allTime": 14
    //     },
    //     "volume": {
    //       "1day": 46.43,
    //       "7day": 93.03,
    //       "30day": 1658.76263,
    //       "allTime": 190334.97573
    //     },
    //     "volumeChange": {
    //       "1day": null,
    //       "7day": 0.32821761219305673,
    //       "30day": 0.152371348826092
    //     },
    //     "floorSale": {
    //       "1day": 46.43,
    //       "7day": 45.53,
    //       "30day": 48.7
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.0316605642903296,
    //       "7day": 1.0520535910388755,
    //       "30day": 0.9835728952772074
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 134,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949",
    //     "slug": "beanzofficial",
    //     "createdAt": "2022-03-31T05:32:40.084Z",
    //     "name": "BEANZ Official",
    //     "image": "https://i.seadn.io/gae/_R4fuC4QGYd14-KwX2bD1wf-AWjDF2VMabfqWFJhIgiN2FnAUpnD5PLdJORrhQ8gly7KcjhQZZpuzYVPF7CDSzsqmDh97z84j2On?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ?w=500&auto=format",
    //     "discordUrl": null,
    //     "externalUrl": null,
    //     "twitterUsername": "Azuki",
    //     "openseaVerificationStatus": "verified",
    //     "description": "BEANZ are a small species that sprouts from the dirt in the garden. They make for a great sidekick to an Azuki, although some like to kick it alone. They're earnestly driven by the desire to help. However, certain BEANZ feel a calling to pave their own path...",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/4cc59c3f6695e06eab684a00d47ab0ac.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/d86a5175b727b442c28d6ce6e8c9b6fb.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/283e706c944a227cebd3f7a0fa282534.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/bb7ce118175b048eff46d23ac8e2c272.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "19950",
    //     "onSaleCount": "1041",
    //     "primaryContract": "0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949",
    //     "tokenSetId": "contract:0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949",
    //     "creator": "0x2ae6b0630ebb4d155c6e04fcb16840ffa77760aa",
    //     "royalties": {
    //       "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb4d24dacbdffa1bbf9a624044484b3feeb7fdf74"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x6093247228a57cd2b179301e16f73e88b764ccb13e7b27ffe97a70e9334fb45f",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "331500000000000000",
    //           "decimal": 0.3315,
    //           "usd": 615.54383,
    //           "native": 0.3315
    //         }
    //       },
    //       "maker": "0x74aa8463874aebb1ae29be8f8ba1adc322a9402d",
    //       "validFrom": 1691526186,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0x306b1ea3ecdf94ab739f1910bbda052ed4a9f949",
    //         "tokenId": "12242",
    //         "name": "Bean #12242",
    //         "image": "https://i.seadn.io/gcs/files/9e13147b7074711c418c8b2cda81fe28.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0x62c66da28dbe812101d4d4fb8a45d00e94353115f6969f20421a41b7322729ec",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "330000000000000000",
    //           "decimal": 0.33,
    //           "usd": 612.31588,
    //           "native": 0.33
    //         },
    //         "netAmount": {
    //           "raw": "328350000000000000",
    //           "decimal": 0.32835,
    //           "usd": 609.2543,
    //           "native": 0.32835
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565468,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 43,
    //       "7day": 49,
    //       "30day": 14,
    //       "allTime": 15
    //     },
    //     "volume": {
    //       "1day": 21.85701,
    //       "7day": 146.1814,
    //       "30day": 1237.6248,
    //       "allTime": 183336.44876
    //     },
    //     "volumeChange": {
    //       "1day": 1.2095945567350304,
    //       "7day": 0.5839871533613031,
    //       "30day": 0.0687321309752008
    //     },
    //     "floorSale": {
    //       "1day": 0.305,
    //       "7day": 0.3723,
    //       "30day": 0.40522
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.0868852459016394,
    //       "7day": 0.8904109589041096,
    //       "30day": 0.8180696462846175
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 8006,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x81ae0be3a8044772d04f32398bac1e1b4b215aa8",
    //     "slug": "dreadfulz",
    //     "createdAt": "2022-03-31T09:58:21.943Z",
    //     "name": "Dreadfulz",
    //     "image": "https://i.seadn.io/gae/oQSLnpxU-UkQ_uYPNKL2MIpHAwjylHeguSiBOpsNbJAmspGswIOzRKy8KIvLlFn7-Oq-jcpp8gYeGtuEi49iXDxkiNl0kast1oZauQ?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/WZYz7rZ9d0bF4vEx7XNLa1Ok42K3yYIWxhbUVtNgNmQgMoBsqsvzsa9sMvWYIXATI5QuUC0zmpIC7E_5dYUCl8GCCVVZBQeBUN0kIQ?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/dreadfulz",
    //     "externalUrl": "https://stake.dreadfulz.com",
    //     "twitterUsername": "DreadfulzNFT",
    //     "openseaVerificationStatus": "disabled_top_trending",
    //     "description": "73.82% Staked\r\n\r\nHolder count on Opensea is incorrect due to staking contract\r\n\r\nStake & Earn $DREAD: https://stake.dreadfulz.com\r\n\r\n7,777 Dreadfulz have inked their name in fealty to the Grand Inquisitor. Bound by avarice, lustful for $DREAD.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/d502766576bae2fc16b1c3dad7ec0022.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/19a864b1c6fd7a648a1efb3623d45b87.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/d86a7f1594f1068d687ea1895a2914d9.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/3a99269a90ca997301d968a219fbebe5.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "7777",
    //     "onSaleCount": "128",
    //     "primaryContract": "0x81ae0be3a8044772d04f32398bac1e1b4b215aa8",
    //     "tokenSetId": "contract:0x81ae0be3a8044772d04f32398bac1e1b4b215aa8",
    //     "creator": null,
    //     "royalties": {
    //       "recipient": "0x4f092353a8a54797d7bba99b1d279cbd736531d5",
    //       "breakdown": [
    //         {
    //           "bps": 750,
    //           "recipient": "0x4f092353a8a54797d7bba99b1d279cbd736531d5"
    //         }
    //       ],
    //       "bps": 750
    //     },
    //     "allRoyalties": {
    //       "opensea": [
    //         {
    //           "bps": 750,
    //           "recipient": "0x4f092353a8a54797d7bba99b1d279cbd736531d5"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x49bf28d27657d917130ab6d585a3c095b734b60f580d05916050acce583660b4",
    //       "sourceDomain": "opensea.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "9000000000000000",
    //           "decimal": 0.009,
    //           "usd": 16.7116,
    //           "native": 0.009
    //         }
    //       },
    //       "maker": "0x621ba9d2312cb0727497746f663a87c5ea45978e",
    //       "validFrom": 1691380006,
    //       "validUntil": 1692505444,
    //       "token": {
    //         "contract": "0x81ae0be3a8044772d04f32398bac1e1b4b215aa8",
    //         "tokenId": "2971",
    //         "name": "Dreadfulz #2971",
    //         "image": "https://i.seadn.io/gcs/files/d6bdae86d25a695072a7bfb0573c2b8a.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0x05bad3419f942084a16820af7f8c1cb825198041f3c1f03df779e274b17d6f2c",
    //       "sourceDomain": "opensea.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    //           "name": "Wrapped Ether",
    //           "symbol": "WETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "4200000000000000",
    //           "decimal": 0.0042,
    //           "usd": 7.79311,
    //           "native": 0.0042
    //         },
    //         "netAmount": {
    //           "raw": "4200000000000000",
    //           "decimal": 0.0042,
    //           "usd": 7.79311,
    //           "native": 0.0042
    //         }
    //       },
    //       "maker": "0x61e9c01f1b0f88467b5a703bae144301c3ee99e6",
    //       "validFrom": 1691561500,
    //       "validUntil": 1691647901
    //     },
    //     "rank": {
    //       "1day": null,
    //       "7day": 1743,
    //       "30day": 1123,
    //       "allTime": 16
    //     },
    //     "volume": {
    //       "1day": 0,
    //       "7day": 0.0148,
    //       "30day": 0.2979,
    //       "allTime": 182255.22843
    //     },
    //     "volumeChange": {
    //       "1day": null,
    //       "7day": 1.2982456140350878,
    //       "30day": 0.27961329078280456
    //     },
    //     "floorSale": {
    //       "1day": 0,
    //       "7day": 0,
    //       "30day": 0.008
    //     },
    //     "floorSaleChange": {
    //       "1day": null,
    //       "7day": null,
    //       "30day": 1.125
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 1657,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    //     "slug": "pudgypenguins",
    //     "createdAt": "2022-02-09T21:17:25.374Z",
    //     "name": "Pudgy Penguins",
    //     "image": "https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gcs/files/89f0cd4457af5632e66fb44bf43309cd.png?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/pudgypenguins",
    //     "externalUrl": "https://www.pudgypenguins.com/",
    //     "twitterUsername": "pudgypenguins",
    //     "openseaVerificationStatus": "verified",
    //     "description": "Pudgy Penguins is a collection of 8,888 NFT’s, accelerating Web3 innovation through IP utilization and community empowerment. Embodying love, empathy, & compassion, the Pudgy Penguins are a beacon of good vibes & positivity for everyone. Each holder receives exclusive access to experiences, events, IP licensing opportunities and more. Let’s break through the boundaries of Web3 together.\r\n\r\nPudgy Collections:\r\n[Lil Pudgys](https://opensea.io/collection/lilpudgys) | [Pudgy Rods](https://opensea.io/collection/pudgyrods)",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/9532039f781bff7aa8faf6af6a209399.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/1b7a7f29a76202e7baca6d9e5d158703.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/38a3faf1892660a7b39920bd657a652d.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/38a74df9b1ba012728d8b0c2cb16fda8.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "8888",
    //     "onSaleCount": "508",
    //     "primaryContract": "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    //     "tokenSetId": "contract:0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    //     "creator": "0xe9da256a28630efdc637bfd4c65f0887be1aeda8",
    //     "royalties": {
    //       "recipient": "0x1afa64e9b8e3090f2001f66d9c9a74cde646738a",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x1afa64e9b8e3090f2001f66d9c9a74cde646738a"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x1afa64e9b8e3090f2001f66d9c9a74cde646738a"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x1afa64e9b8e3090f2001f66d9c9a74cde646738a"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x1afa64e9b8e3090f2001f66d9c9a74cde646738a"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x6fb88a232c3174274898e98c2edcf2a4f042f13b157ca049dbbe9e397055ceb5",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "4090000000000000000",
    //           "decimal": 4.09,
    //           "usd": 7594.49255,
    //           "native": 4.09
    //         }
    //       },
    //       "maker": "0x29469395eaf6f95920e59f858042f0e28d98a20b",
    //       "validFrom": 1691547662,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    //         "tokenId": "4372",
    //         "name": "Pudgy Penguin #4372",
    //         "image": "https://i.seadn.io/gcs/files/5585f0ccaf0f41f0ba26fcaeebac3ff8.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0xb493473aca5f1c885ef592701ce8f3ec7f9bc234ca34f543557a821570b4df61",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "4060000000000000000",
    //           "decimal": 4.06,
    //           "usd": 7533.34079,
    //           "native": 4.06
    //         },
    //         "netAmount": {
    //           "raw": "4039700000000000000",
    //           "decimal": 4.0397,
    //           "usd": 7495.67408,
    //           "native": 4.0397
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565442,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 6,
    //       "7day": 8,
    //       "30day": 12,
    //       "allTime": 17
    //     },
    //     "volume": {
    //       "1day": 261.7001,
    //       "7day": 1074.03654,
    //       "30day": 6033.56013,
    //       "allTime": 181971.08913
    //     },
    //     "volumeChange": {
    //       "1day": 3.8827049669080016,
    //       "7day": 0.9411038329079444,
    //       "30day": 0.9388139426541753
    //     },
    //     "floorSale": {
    //       "1day": 3.9947,
    //       "7day": 4.116,
    //       "30day": 3.8
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.023856610008261,
    //       "7day": 0.9936831875607386,
    //       "30day": 1.0763157894736841
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 4605,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x1a92f7381b9f03921564a437210bb9396471050c",
    //     "slug": "cool-cats-nft",
    //     "createdAt": "2022-02-09T21:15:15.778Z",
    //     "name": "Cool Cats NFT",
    //     "image": "https://i.seadn.io/gae/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gcs/files/9db3e1197b7655b791b125dd86db4bc7.png?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/coolcatsnft",
    //     "externalUrl": "http://coolcatsnft.com",
    //     "twitterUsername": "coolcats",
    //     "openseaVerificationStatus": "verified",
    //     "description": "Cool Cats is a collection of 9,999 randomly generated and stylistically curated NFTs that exist on the Ethereum Blockchain. Cool Cat holders can participate in exclusive events such as NFT claims, raffles, community giveaways, and more. Remember, all cats are cool, but some are cooler than others.\r\n\r\n- [Cool Cats Collabs](https://opensea.io/collection/cool-cats-collabs)\r\n- [Cool Cats Events](https://opensea.io/collection/cool-cats-events)\r\n- [Cool Cats Achievements](https://opensea.io/collection/cool-cats-achievements)\r\n- [Cool Cats Originals](https://opensea.io/collection/cool-cats-originals)",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/01782b994893649333f10735d5b86a2d.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/54bc736afd6a8c90ddfec33cd3f5a41d.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/59405d1cc578c13aa1c9f54a1808690d.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/c745fea1f7b4cdd85882f02ff4f70239.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "9965",
    //     "onSaleCount": "332",
    //     "primaryContract": "0x1a92f7381b9f03921564a437210bb9396471050c",
    //     "tokenSetId": "contract:0x1a92f7381b9f03921564a437210bb9396471050c",
    //     "creator": "0xd5886f211b4ca0aa4df48c4df311437534ac19bf",
    //     "royalties": {
    //       "recipient": "0xd98d29beb788ff04e7a648775fcb083282ae9c4b",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xd98d29beb788ff04e7a648775fcb083282ae9c4b"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xd98d29beb788ff04e7a648775fcb083282ae9c4b"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x5b66058a4f5ef76740ec5daa4b02524ea8adda770b0f6cdace369f3c7346306d",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "638200000000000000",
    //           "decimal": 0.6382,
    //           "usd": 1185.03793,
    //           "native": 0.6382
    //         }
    //       },
    //       "maker": "0xc7f4eba65d2fd3fa4909ca73fe5bdbfb629f282b",
    //       "validFrom": 1691562581,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0x1a92f7381b9f03921564a437210bb9396471050c",
    //         "tokenId": "3926",
    //         "name": "Cool Cat #3926",
    //         "image": "https://i.seadn.io/gcs/files/f2e7e3e6387fbd3ff5339eac797705a0.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0xed95731db62c798fdde91dbcf86de548c10d677056aae121701031aeb3774a89",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "610000000000000000",
    //           "decimal": 0.61,
    //           "usd": 1131.85662,
    //           "native": 0.61
    //         },
    //         "netAmount": {
    //           "raw": "606950000000000000",
    //           "decimal": 0.60695,
    //           "usd": 1126.19734,
    //           "native": 0.60695
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565441,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 67,
    //       "7day": 99,
    //       "30day": 51,
    //       "allTime": 18
    //     },
    //     "volume": {
    //       "1day": 11.68471,
    //       "7day": 89.88194,
    //       "30day": 401.76072,
    //       "allTime": 147786.96775
    //     },
    //     "volumeChange": {
    //       "1day": 1.9301772422593777,
    //       "7day": 1.2277695028971296,
    //       "30day": 0.8943713933436681
    //     },
    //     "floorSale": {
    //       "1day": 0.62,
    //       "7day": 0.63,
    //       "30day": 0.65
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.0293548387096774,
    //       "7day": 1.013015873015873,
    //       "30day": 0.9818461538461538
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 5681,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    //     "slug": "ens",
    //     "createdAt": "2022-02-09T15:25:43.854Z",
    //     "name": "ENS: Ethereum Name Service",
    //     "image": "https://i.seadn.io/gae/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ?w=500&auto=format",
    //     "banner": null,
    //     "discordUrl": null,
    //     "externalUrl": "https://ens.domains",
    //     "twitterUsername": "ensdomains",
    //     "openseaVerificationStatus": "verified",
    //     "description": "Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.",
    //     "sampleImages": [],
    //     "tokenCount": "3088435",
    //     "onSaleCount": "153039",
    //     "primaryContract": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    //     "tokenSetId": "contract:0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    //     "creator": "0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8",
    //     "royalties": {
    //       "recipient": null,
    //       "breakdown": [],
    //       "bps": 0
    //     },
    //     "allRoyalties": {
    //       "opensea": []
    //     },
    //     "floorAsk": {
    //       "id": "0xb3eaf1f36e3e90c8548fd9a168ce2011431b5528471685f84f90d847ab7e3a3a",
    //       "sourceDomain": "ens.vision",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "300000000000000",
    //           "decimal": 0.0003,
    //           "usd": 0.55705,
    //           "native": 0.0003
    //         }
    //       },
    //       "maker": "0x4c250c52ef90dc638196bc6427ac60a089a486cd",
    //       "validFrom": 1690989839,
    //       "validUntil": 1691594697,
    //       "token": {
    //         "contract": "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
    //         "tokenId": "9680779466678742876954973237186882591877361098884471323571896160644710475489",
    //         "name": null
    //       }
    //     },
    //     "topBid": {
    //       "id": null,
    //       "sourceDomain": null,
    //       "price": null,
    //       "maker": null,
    //       "validFrom": null,
    //       "validUntil": null
    //     },
    //     "rank": {
    //       "1day": 64,
    //       "7day": 46,
    //       "30day": 114,
    //       "allTime": 19
    //     },
    //     "volume": {
    //       "1day": 12.91122,
    //       "7day": 137.36953,
    //       "30day": 458.08412,
    //       "allTime": 118976.86427
    //     },
    //     "volumeChange": {
    //       "1day": 0.3609753557204496,
    //       "7day": 0.9974565165113867,
    //       "30day": 1.0601120847099281
    //     },
    //     "floorSale": {
    //       "1day": 0.0003,
    //       "7day": 0.00049,
    //       "30day": 0.0003
    //     },
    //     "floorSaleChange": {
    //       "1day": 1,
    //       "7day": 0.6122448979591837,
    //       "30day": 1
    //     },
    //     "collectionBidSupported": false,
    //     "ownerCount": 705990,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a",
    //     "slug": "sandbox",
    //     "createdAt": "2022-02-09T17:13:34.916Z",
    //     "name": "The Sandbox",
    //     "image": "https://i.seadn.io/gae/SXH8tW1siikB80rwCRnjm1a5xM_MwTg9Xl9Db6mioIk9HIlDM09pVoSR7GKJgS6ulSUpgW9BDtMk_ePX_NKgO9A?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gcs/files/fb46c14805de22fb1565130608b52f62.png?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/vAe4zvY",
    //     "externalUrl": "https://www.sandbox.game/",
    //     "twitterUsername": "thesandboxgame",
    //     "openseaVerificationStatus": "verified",
    //     "description": "The Sandbox is a community-driven platform where creators can monetize voxel assets and gaming experiences on the blockchain. The Sandbox metaverse comprises a map made up of 166,464 LANDS.  LAND owners can host contests and events, stake SAND to earn and customize assets, monetize assets and experiences, vote in the metaverse governance, play games that you or others create, and more! Trade the collection and keep your eyes peeled for future drops.",
    //     "sampleImages": [
    //       "https://api.sandbox.game/lands/0fb75897-df22-462a-815d-276d71a2e0e6/v2/preview-500px-x-500px.jpg"
    //     ],
    //     "tokenCount": "105400",
    //     "onSaleCount": "0",
    //     "primaryContract": "0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a",
    //     "tokenSetId": "contract:0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a",
    //     "creator": null,
    //     "royalties": {
    //       "recipient": "0x7a9fe22691c811ea339d9b73150e6911a5343dca",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0x7a9fe22691c811ea339d9b73150e6911a5343dca"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": null,
    //     "floorAsk": {
    //       "id": null,
    //       "sourceDomain": "reservoir.tools",
    //       "price": null,
    //       "maker": null,
    //       "validFrom": 2147483647,
    //       "validUntil": null,
    //       "token": null
    //     },
    //     "topBid": {
    //       "id": null,
    //       "sourceDomain": null,
    //       "price": null,
    //       "maker": null,
    //       "validFrom": null,
    //       "validUntil": null
    //     },
    //     "rank": {
    //       "1day": null,
    //       "7day": null,
    //       "30day": null,
    //       "allTime": 20
    //     },
    //     "volume": {
    //       "1day": 0,
    //       "7day": 0,
    //       "30day": 0,
    //       "allTime": 98743.1533
    //     },
    //     "volumeChange": {
    //       "1day": 0,
    //       "7day": 0,
    //       "30day": 0
    //     },
    //     "floorSale": {
    //       "1day": 1.42,
    //       "7day": 1.42,
    //       "30day": 1.42
    //     },
    //     "floorSaleChange": {
    //       "1day": 0,
    //       "7day": 0,
    //       "30day": 0
    //     },
    //     "collectionBidSupported": false,
    //     "ownerCount": 24,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0xe785e82358879f061bc3dcac6f0444462d4b5330",
    //     "slug": "world-of-women-nft",
    //     "createdAt": "2022-02-09T21:15:06.245Z",
    //     "name": "World of Women",
    //     "image": "https://i.seadn.io/gcs/files/8604de2d9aaec98dd389e3af1b1a14b6.gif?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/GHhptRLebBOWOy8kfXpYCVqsqdes-1-6I_jbuRnGTHHW6TD63CtciH75Dotfu2u8v6EmkWt-tjhkFRVLxRUwgMfKqqy5W24AolJayeo?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/worldofwomen",
    //     "externalUrl": "http://worldofwomen.art",
    //     "twitterUsername": "worldofwomennft",
    //     "openseaVerificationStatus": "verified",
    //     "description": "World of Women is a collection of 10,000 NFTs that gives you full access to our network of artists, creators, entrepreneurs, and executives who are championing diversity and equal opportunity on the blockchain.\n\nCreated and illustrated by Yam Karkai (@ykarkai), World of Women has made prominent appearances at Christie's, The New Yorker and Billboard.\n\nJoin us to receive exclusive access to NFT drops, experiences, and much more.\n\nThe Time is WoW.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/ec98c091ed165ab8e1e8dbd0e5c44164.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/4a3ff3efedaa2e80b540edd34b9cc592.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/2566ac9952d283d90abba89516c00fa9.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/9f9b7c2415faa7c3d38cb66f1244a3f9.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "10000",
    //     "onSaleCount": "351",
    //     "primaryContract": "0xe785e82358879f061bc3dcac6f0444462d4b5330",
    //     "tokenSetId": "contract:0xe785e82358879f061bc3dcac6f0444462d4b5330",
    //     "creator": "0xc9b6321dc216d91e626e9baa61b06b0e4d55bdb1",
    //     "royalties": {
    //       "recipient": "0xb1ab2274b58b23d2a701f164b9a641efc69bc3f1",
    //       "breakdown": [
    //         {
    //           "bps": 400,
    //           "recipient": "0xb1ab2274b58b23d2a701f164b9a641efc69bc3f1"
    //         }
    //       ],
    //       "bps": 400
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 400,
    //           "recipient": "0xb1ab2274b58b23d2a701f164b9a641efc69bc3f1"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 400,
    //           "recipient": "0xb1ab2274b58b23d2a701f164b9a641efc69bc3f1"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 400,
    //           "recipient": "0xb1ab2274b58b23d2a701f164b9a641efc69bc3f1"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0x3b69d79eec7094badc085f74e5d8150704206b815d7f516054de64ebf8861ee8",
    //       "sourceDomain": "opensea.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    //           "name": "Wrapped Ether",
    //           "symbol": "WETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "596400000000000000",
    //           "decimal": 0.5964,
    //           "usd": 1106.62178,
    //           "native": 0.5964
    //         }
    //       },
    //       "maker": "0x20b994538da94624bd6ce4152867ffc12a3b7062",
    //       "validFrom": 1691564334,
    //       "validUntil": 1691566134,
    //       "token": {
    //         "contract": "0xe785e82358879f061bc3dcac6f0444462d4b5330",
    //         "tokenId": "854",
    //         "name": "WoW #854",
    //         "image": "https://i.seadn.io/gcs/files/ed323b952daccbd9fea821f9c78592cb.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0x0417028a35cb8ee523fbe1f6db1fc48c3088748d3ae91b0f6e810f285599d750",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "560000000000000000",
    //           "decimal": 0.56,
    //           "usd": 1039.08149,
    //           "native": 0.56
    //         },
    //         "netAmount": {
    //           "raw": "557200000000000000",
    //           "decimal": 0.5572,
    //           "usd": 1033.88608,
    //           "native": 0.5572
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565360,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 133,
    //       "7day": 125,
    //       "30day": 57,
    //       "allTime": 21
    //     },
    //     "volume": {
    //       "1day": 3.8038,
    //       "7day": 26.2166,
    //       "30day": 152.55974,
    //       "allTime": 86824.91433
    //     },
    //     "volumeChange": {
    //       "1day": 1.6265973914902716,
    //       "7day": 0.6870837046445173,
    //       "30day": 0.7389242778592475
    //     },
    //     "floorSale": {
    //       "1day": 0.599,
    //       "7day": 0.6408,
    //       "30day": 0.6591
    //     },
    //     "floorSaleChange": {
    //       "1day": 0.9956594323873121,
    //       "7day": 0.9307116104868914,
    //       "30day": 0.9048702776513428
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 5574,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   },
    //   {
    //     "id": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    //     "slug": "milady",
    //     "createdAt": "2022-02-09T17:14:49.886Z",
    //     "name": "Milady Maker",
    //     "image": "https://i.seadn.io/gae/a_frplnavZA9g4vN3SexO5rrtaBX_cBTaJYcgrPtwQIqPhzgzUendQxiwUdr51CGPE2QyPEa1DHnkW1wLrHAv5DgfC3BP-CWpFq6BA?w=500&auto=format",
    //     "banner": "https://i.seadn.io/gae/1TtiQPPiqoc6hqMw3xVYnlEatEi6QhRQGDQA3B3yZfhr2nuXbedAQCOcTs1UZot6-4FXSiYM6xOtHWcaJNwFdRyuOlC_q5erFRbMYA?w=500&auto=format",
    //     "discordUrl": "https://discord.gg/milady",
    //     "externalUrl": "https://miladymaker.net",
    //     "twitterUsername": "miladymaker",
    //     "openseaVerificationStatus": "verified",
    //     "description": "Milady Maker is a collection of 10,000 generative pfpNFT's in a neochibi aesthetic inspired by street style tribes.",
    //     "sampleImages": [
    //       "https://i.seadn.io/gcs/files/2eba49f90dc812c39bcbd98dbc0756d0.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/196f84601d0607a23ac19ff1772e0744.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/09c542dd0ec9ca49be12088c62ff58de.png?w=500&auto=format",
    //       "https://i.seadn.io/gcs/files/31125fc7d55902bb88db810ba54093d8.png?w=500&auto=format"
    //     ],
    //     "tokenCount": "10000",
    //     "onSaleCount": "899",
    //     "primaryContract": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    //     "tokenSetId": "contract:0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    //     "creator": "0xb520f068a908a1782a543aacc3847adb77a04778",
    //     "royalties": {
    //       "recipient": "0xb520f068a908a1782a543aacc3847adb77a04778",
    //       "breakdown": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb520f068a908a1782a543aacc3847adb77a04778"
    //         }
    //       ],
    //       "bps": 500
    //     },
    //     "allRoyalties": {
    //       "eip2981": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb520f068a908a1782a543aacc3847adb77a04778"
    //         }
    //       ],
    //       "onchain": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xb520f068a908a1782a543aacc3847adb77a04778"
    //         }
    //       ],
    //       "opensea": [
    //         {
    //           "bps": 500,
    //           "recipient": "0xcf3e932f72e5f15411d125ad80579a3ef205b9b4"
    //         }
    //       ]
    //     },
    //     "floorAsk": {
    //       "id": "0xb0e4be02db81826117e57a23dbad0ff63c5a08a9cf0007447d7cd6dbfd48170f",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000000000000000000000000000000000",
    //           "name": "Ether",
    //           "symbol": "ETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "3448990000000000000",
    //           "decimal": 3.44899,
    //           "usd": 6404.23689,
    //           "native": 3.44899
    //         }
    //       },
    //       "maker": "0x29469395eaf6f95920e59f858042f0e28d98a20b",
    //       "validFrom": 1691542309,
    //       "validUntil": 0,
    //       "token": {
    //         "contract": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    //         "tokenId": "8774",
    //         "name": "Milady 8774",
    //         "image": "https://i.seadn.io/gcs/files/66b96da09b083e452631090a0d622786.png?w=500&auto=format"
    //       }
    //     },
    //     "topBid": {
    //       "id": "0x0e53a1fc05a2b58bf021aad1ae02cca570a6aeb899a22d25f02f5e12f27bc991",
    //       "sourceDomain": "blur.io",
    //       "price": {
    //         "currency": {
    //           "contract": "0x0000000000a39bb272e79075ade125fd351887ac",
    //           "name": "Blur ETH",
    //           "symbol": "BETH",
    //           "decimals": 18
    //         },
    //         "amount": {
    //           "raw": "3390000000000000000",
    //           "decimal": 3.39,
    //           "usd": 6290.15401,
    //           "native": 3.39
    //         },
    //         "netAmount": {
    //           "raw": "3373050000000000000",
    //           "decimal": 3.37305,
    //           "usd": 6258.70324,
    //           "native": 3.37305
    //         }
    //       },
    //       "maker": "0x0000000000a39bb272e79075ade125fd351887ac",
    //       "validFrom": 1691565442,
    //       "validUntil": 0
    //     },
    //     "rank": {
    //       "1day": 9,
    //       "7day": 25,
    //       "30day": 18,
    //       "allTime": 22
    //     },
    //     "volume": {
    //       "1day": 173.70219,
    //       "7day": 2051.54434,
    //       "30day": 6259.42885,
    //       "allTime": 83642.70252
    //     },
    //     "volumeChange": {
    //       "1day": 0.6124656985650818,
    //       "7day": 2.393005220050012,
    //       "30day": 1.0378267678854614
    //     },
    //     "floorSale": {
    //       "1day": 3.37,
    //       "7day": 2.6682,
    //       "30day": 2.5913
    //     },
    //     "floorSaleChange": {
    //       "1day": 1.023439169139466,
    //       "7day": 1.2926279889063788,
    //       "30day": 1.3309883070273607
    //     },
    //     "collectionBidSupported": true,
    //     "ownerCount": 3573,
    //     "contractKind": "erc721",
    //     "mintedTimestamp": null,
    //     "mintStages": []
    //   }
    // ];

    // for (const hotTop of hotTops) {
    //   let model = new this.hotTopSchema(hotTop);
    //   model.save()
    // }

    return this.hotTopSchema.find({}).limit(20).exec();
  }

  findAll() {
    return `This action returns all collection`;
  }

  findOne(id: string) {
    return this.hotTopSchema.findOne({ id }).exec();
  }

  // update(id: number, updateCollectionDto: UpdateCollectionDto) {
  //   return `This action updates a #${id} collection`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} collection`;
  // }
}
