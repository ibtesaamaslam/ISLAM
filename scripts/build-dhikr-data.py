#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates frontend/src/data/dhikrData.ts with 52 Authentic Zikrs.
Each Zikr has:
- Arabic with full tashkeel
- Transliteration
- Urdu translation
- English translation
- urduVirtue (reward in Urdu FIRST)
- virtue (reward in English)
- Authentic Hadith reference (Bukhari, Muslim, Tirmidhi, Abu Dawood, etc.)
- Recommended goal & category
"""

import json
import os

dhikr_list = [
    # 1
    {
        "id": "subhanallahi-wa-bihamdihi-azeem",
        "arabic": "سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيمِ",
        "transliteration": "Subḥānallāhi wa bi-ḥamdihi, Subḥānallāhil-‘Aẓīm",
        "englishMeaning": "Glory be to Allah and all praise is His; Glory be to Allah the Magnificent.",
        "urduMeaning": "اللہ پاک ہے اپنی تعریف کے ساتھ، اللہ پاک ہے جو بہت عظمت والا ہے۔",
        "urduVirtue": "رسول اللہ ﷺ نے فرمایا: دو کلمے جو زبان پر ہلکے، میزان میں بھاری اور رحمان کو بے حد پیارے ہیں۔",
        "virtue": "Two words that are light on the tongue, heavy on the Scale of good deeds, and beloved to Ar-Rahman (the Most Merciful).",
        "reference": "Sahih al-Bukhari (6406) & Sahih Muslim (2694)",
        "recommendedGoal": 100,
        "category": "Beloved to Ar-Rahman",
        "badgeColor": "from-amber-500 to-orange-500"
    },
    # 2
    {
        "id": "subhanallahi-wa-bihamdihi-100",
        "arabic": "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        "transliteration": "Subḥānallāhi wa bi-ḥamdih",
        "englishMeaning": "Glory be to Allah and all praise is due to Him.",
        "urduMeaning": "اللہ پاک ہے اور تمام تعریفیں اسی کے لیے ہیں۔",
        "urduVirtue": "جو شخص صبح اور شام 100 مرتبہ یہ پڑھے، اس کے گناہ معاف کر دیے جاتے ہیں چاہے وہ سمندر کے جھاگ کے برابر ہی کیوں نہ ہوں۔",
        "virtue": "Whoever recites this 100 times in the morning and evening, their sins will be forgiven even if they were like the foam of the sea.",
        "reference": "Sahih Muslim (2691) & Sahih al-Bukhari (6405)",
        "recommendedGoal": 100,
        "category": "Forgiveness of Sins",
        "badgeColor": "from-sky-500 to-blue-600"
    },
    # 3
    {
        "id": "la-hawla-wa-la-quwwata",
        "arabic": "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيمِ",
        "transliteration": "Lā ḥawla wa lā quwwata illā billāhil-‘Aliyyil-‘Aẓīm",
        "englishMeaning": "There is no power and no strength except with Allah, the Most High, the Supreme.",
        "urduMeaning": "گناہ سے بچنے کی طاقت اور نیکی کرنے کی قوت صرف اللہ ہی کی توفیق سے ہے۔",
        "urduVirtue": "نبی کریم ﷺ نے فرمایا: کیا میں تمہیں جنت کے خزانوں میں سے ایک خزانہ نہ بتاؤں؟ یہ کلمہ جنت کا خزانہ ہے۔",
        "virtue": "The Prophet (PBUH) said: Shall I not guide you to a treasure from the treasures of Paradise (Kanzun min kunuz al-Jannah)?",
        "reference": "Sahih al-Bukhari (4205) & Sahih Muslim (2704)",
        "recommendedGoal": 100,
        "category": "Treasure of Jannah",
        "badgeColor": "from-emerald-500 to-teal-600"
    },
    # 4
    {
        "id": "astaghfirullah-wa-atoobu-ilayh",
        "arabic": "أَسْتَغْفِرُ اللهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ",
        "transliteration": "Astaghfirullāhal-‘Aẓīma wa atūbu ilayh",
        "englishMeaning": "I seek the forgiveness of Allah the Magnificent and I repent unto Him.",
        "urduMeaning": "میں عظمت والے اللہ سے بخشش مانگتا ہوں اور اسی کے حضور توبہ کرتا ہوں۔",
        "urduVirtue": "جو شخص استغفار کو لازم پکڑتا ہے، اللہ تعالیٰ اس کی ہر تنگی دور فرماتا ہے، ہر پریشانی سے نجات دیتا ہے اور ایسی جگہ سے رزق عطا کرتا ہے جہاں اس کا گمان بھی نہیں ہوتا۔",
        "virtue": "Whoever seeks forgiveness constantly, Allah makes for him from every distress a relief, from every hardship a way out, and provides for him from where he does not expect.",
        "reference": "Sunan Abi Dawud (1518) & Sahih al-Bukhari (6307)",
        "recommendedGoal": 100,
        "category": "Peace & Forgiveness",
        "badgeColor": "from-indigo-500 to-violet-600"
    },
    # 5
    {
        "id": "sayyidul-istighfar",
        "arabic": "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        "transliteration": "Allāhumma Anta Rabbī lā ilāha illā Ant, khalaqtanī wa anā ‘abduk, wa anā ‘alā ‘ahdika wa wa‘dika mastata‘t, a‘ūdhu bika min sharri mā ṣana‘t, abū’u laka bini‘matika ‘alayya wa abū’u bidhambī faghfir lī fa-innahu lā yaghfirudh-dhunūba illā Ant",
        "englishMeaning": "O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.",
        "urduMeaning": "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں۔ تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں اور اپنی طاقت بھر تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے اعمال کے شر سے تیری پناہ مانگتا ہوں، اپنے اوپر تیری نعمتوں کا اعتراف کرتا ہوں اور اپنے گناہوں کا اقرار کرتا ہوں، پس مجھے بخش دے کیونکہ تیرے سوا کوئی گناہوں کو بخشنے والا نہیں۔",
        "urduVirtue": "یہ سید الاستغفار ہے۔ جو شخص اسے دن میں یقین کے ساتھ پڑھے اور شام سے پہلے فوت ہو جائے تو وہ اہل جنت میں سے ہوگا، اور جو رات کو پڑھے اور صبح سے پہلے فوت ہو جائے تو وہ اہل جنت میں سے ہوگا۔",
        "virtue": "The Master of Forgiveness. Whoever recites it during the day with firm faith and dies before evening, or at night and dies before morning, will be among the people of Paradise.",
        "reference": "Sahih al-Bukhari (6306)",
        "recommendedGoal": 1,
        "category": "Master of Forgiveness",
        "badgeColor": "from-emerald-600 to-green-700"
    },
    # 6
    {
        "id": "four-beloved-words",
        "arabic": "سُبْحَانَ اللهِ، وَالْحَمْدُ لِلهِ، وَلَا إِلٰهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ",
        "transliteration": "Subḥānallāh, wal-ḥamdu lillāh, wa lā ilāha illallāh, wallāhu akbar",
        "englishMeaning": "Glory be to Allah, all praise is for Allah, there is no god but Allah, and Allah is the Greatest.",
        "urduMeaning": "اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے۔",
        "urduVirtue": "رسول اللہ ﷺ نے فرمایا: اللہ تعالیٰ کے نزدیک سب سے پسندیدہ چار کلام یہی ہیں، اور یہ میرے نزدیک ان تمام چیزوں سے زیادہ پیارے ہیں جن پر سورج طلوع ہوتا ہے۔",
        "virtue": "The Prophet (PBUH) said: The most beloved words to Allah are four. Reciting them is dearer to me than all over which the sun rises.",
        "reference": "Sahih Muslim (2137) & (2695)",
        "recommendedGoal": 33,
        "category": "Most Beloved to Allah",
        "badgeColor": "from-yellow-500 to-amber-600"
    },
    # 7
    {
        "id": "dua-yunus-ayat-kareema",
        "arabic": "لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        "transliteration": "Lā ilāha illā Anta, Subḥānaka, innī kuntu minaẓ-ẓālimīn",
        "englishMeaning": "There is no deity worthy of worship except You; Exalted are You. Indeed, I have been of the wrongdoers.",
        "urduMeaning": "تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصوروار تھا۔",
        "urduVirtue": "حضرت یونس علیہ السلام کی مچھلی کے پیٹ والی دعا۔ کوئی بھی مسلمان جب کسی مشکل و پریشانی میں یہ دعا مانگے گا تو اللہ ضرور اس کی دعا قبول فرمائے گا۔",
        "virtue": "The prayer of Prophet Yunus (AS) in the belly of the whale. No Muslim ever calls upon Allah with this in distress except that Allah relieves him.",
        "reference": "Jami` at-Tirmidhi (3505) - Sahih",
        "recommendedGoal": 33,
        "category": "Relief in Distress",
        "badgeColor": "from-cyan-600 to-blue-700"
    },
    # 8
    {
        "id": "la-ilaha-illallah-wahdahu",
        "arabic": "لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        "transliteration": "Lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa Huwa ‘alā kulli shay’in Qadīr",
        "englishMeaning": "There is no deity worthy of worship except Allah alone, without partner. To Him belongs all sovereignty and to Him belongs all praise, and He has power over all things.",
        "urduMeaning": "اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے، اور وہ ہر چیز پر قادر ہے۔",
        "urduVirtue": "جس نے دن میں 100 بار یہ پڑھا اسے دس غلام آزاد کرنے کا ثواب ملتا ہے، سو نیکیاں لکھی جاتی ہیں، سو گناہ مٹا دیے جاتے ہیں اور اس دن شام تک شیطان سے حفاظت رہتی ہے۔",
        "virtue": "Whoever says this 100 times in a day receives the reward of freeing ten slaves, 100 good deeds are recorded, 100 sins erased, and it is a shield against Shaytan that day until evening.",
        "reference": "Sahih al-Bukhari (3293) & Sahih Muslim (2691)",
        "recommendedGoal": 100,
        "category": "Pinnacle of Tawheed",
        "badgeColor": "from-amber-600 to-yellow-600"
    },
    # 9
    {
        "id": "darood-ibrahim",
        "arabic": "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَىٰ إِبْرَاهِيمَ وَعَلَىٰ آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
        "transliteration": "Allāhumma ṣalli ‘alā Muḥammadin wa ‘alā āli Muḥammadin kamā ṣallayta ‘alā Ibrāhīma wa ‘alā āli Ibrāhīma innaka Ḥamīdum Majīd",
        "englishMeaning": "O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy, Majestic.",
        "urduMeaning": "اے اللہ! رحمتیں نازل فرما محمد ﷺ پر اور ان کی آل پر جیسا کہ تو نے رحمتیں نازل فرمائیں ابراہیم علیہ السلام پر اور ان کی آل پر۔ بے شک تو تعریف کیا گیا بڑی بزرگی والا ہے۔",
        "urduVirtue": "جو مجھ پر ایک بار درود بھیجتا ہے اللہ اس پر دس رحمتیں نازل فرماتا ہے، اس کے دس گناہ مٹا دیتا ہے اور اس کے دس درجات بلند فرماتا ہے۔",
        "virtue": "Whoever sends blessings upon me once, Allah sends ten blessings upon him, erases ten sins, and raises him ten degrees in rank.",
        "reference": "Sunan an-Nasa'i (1297) & Sahih Muslim",
        "recommendedGoal": 10,
        "category": "Darood & Salawat",
        "badgeColor": "from-rose-500 to-pink-600"
    },
    # 10
    {
        "id": "subhanallahi-adada-khalqihi",
        "arabic": "سُبْحَانَ اللهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
        "transliteration": "Subḥānallāhi wa bi-ḥamdihi, ‘adada khalqihi, wa riḍā nafsihi, wa zinata ‘arshihi, wa midāda kalimātih",
        "englishMeaning": "Glory be to Allah and praise is His, according to the number of His creation, according to the pleasure of His Self, according to the weight of His Throne, and according to the ink of His words.",
        "urduMeaning": "اللہ پاک ہے اور اپنی تعریفوں کے ساتھ پاک ہے، اس کی مخلوق کی گنتی کے برابر، اس کی ذات کی رضا کے مطابق، اس کے عرش کے وزن کے برابر، اور اس کے کلمات کی سیاہی کے مطابق۔",
        "urduVirtue": "نبی اکرم ﷺ نے سیدہ جویریہ رضی اللہ عنہا سے فرمایا: میں نے تمہارے بعد چار ایسے کلمات تین بار پڑھے ہیں کہ اگر ان کا وزن تمہاری صبح سے کی گئی تمام تسبیحات کے ساتھ کیا جائے تو ان کا وزن بھاری ہوگا۔",
        "virtue": "The Prophet (PBUH) said: I recited four phrases three times which, if weighed against all that you have recited since morning, would outweigh them in reward.",
        "reference": "Sahih Muslim (2726)",
        "recommendedGoal": 3,
        "category": "Comprehensive Reward",
        "badgeColor": "from-teal-500 to-emerald-600"
    },
    # 11
    {
        "id": "radheetu-billahi-rabba",
        "arabic": "رَضِيتُ بِاللهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
        "transliteration": "Raḍītu billāhi Rabbā, wa bil-Islāmi dīnā, wa bi-Muḥammadin (ṣallallāhu ‘alayhi wa sallam) Nabiyyā",
        "englishMeaning": "I am pleased with Allah as my Lord, with Islam as my religion, and with Muhammad (peace and blessings be upon him) as my Prophet.",
        "urduMeaning": "میں اللہ کے رب ہونے پر، اسلام کے دین ہونے پر، اور محمد ﷺ کے نبی ہونے پر راضی اور خوش ہوں۔",
        "urduVirtue": "جو شخص صبح اور شام تین مرتبہ یہ کہے، اللہ تعالیٰ پر حق ہے کہ قیامت کے دن اسے راضی اور خوش فرمائے۔",
        "virtue": "Whoever says this three times in the morning and evening, it is a duty upon Allah to please him on the Day of Resurrection.",
        "reference": "Sunan Abi Dawud (5072) & Jami` at-Tirmidhi (3389) - Sahih",
        "recommendedGoal": 3,
        "category": "Morning & Evening Protection",
        "badgeColor": "from-amber-500 to-emerald-600"
    },
    # 12
    {
        "id": "bismillahil-ladhi-la-yadurru",
        "arabic": "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ",
        "transliteration": "Bismillāhil-ladhī lā yaḍurru ma‘as-mihi shay’un fil-arḍi wa lā fis-samā’, wa Huwas-Samī‘ul-‘Alīm",
        "englishMeaning": "In the name of Allah, with whose Name nothing on earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
        "urduMeaning": "اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی، اور وہی سب کچھ سننے والا اور جاننے والا ہے۔",
        "urduVirtue": "جو شخص صبح اور شام تین بار یہ دعا پڑھے، اسے کوئی چیز ناگہانی نقصان یا تکلیف نہیں پہنچا سکے گی۔",
        "virtue": "Whoever recites this three times in the morning and evening, nothing will harm him.",
        "reference": "Sunan Abi Dawud (5088) & Jami` at-Tirmidhi (3388) - Sahih",
        "recommendedGoal": 3,
        "category": "Divine Shield & Safety",
        "badgeColor": "from-blue-600 to-indigo-700"
    },
    # 13
    {
        "id": "ya-hayyu-ya-qayyum",
        "arabic": "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ",
        "transliteration": "Yā Ḥayyu yā Qayyūmu bi-raḥmatika astaghīth, aṣliḥ lī sha’nī kullah, wa lā takilnī ilā nafsī ṭarfata ‘ayn",
        "englishMeaning": "O Ever-Living, O Sustainer of all existence, by Your mercy I seek assistance. Rectify all my affairs, and do not leave me in charge of myself even for the blink of an eye.",
        "urduMeaning": "اے زندہ و جاوید! اے تمام کائنات کو سنبھالنے والے! تیری ہی رحمت کے واسطے سے میں مدد مانگتا ہوں، میرے تمام کام سنوار دے اور پلک جھپکنے کے لیے بھی مجھے میرے نفس کے حوالے نہ فرما۔",
        "urduVirtue": "رسول اللہ ﷺ نے سیدہ فاطمہ رضی اللہ عنہا کو وصیت فرمائی کہ صبح و شام اس دعا کا اہتمام کریں، یہ ہر قسم کی الجھن اور پریشانی کو دور کرتی ہے۔",
        "virtue": "The Prophet (PBUH) advised Fatima (RA) to recite this every morning and evening. It brings Allah's complete guidance and protection over all life affairs.",
        "reference": "Sunan an-Nasa'i in Al-Kubra (10405) & Al-Hakim - Sahih",
        "recommendedGoal": 3,
        "category": "Relief & Divine Support",
        "badgeColor": "from-violet-600 to-purple-700"
    },
    # 14
    {
        "id": "hasbiyallahu-la-ilaha-illa-huwa",
        "arabic": "حَسْبِيَ اللهُ لَا إِلٰهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        "transliteration": "Ḥasbiyallāhu lā ilāha illā Huwa, ‘alayhi tawakkaltu wa Huwa Rabbul-‘Arshil-‘Aẓīm",
        "englishMeaning": "Allah is sufficient for me. There is no deity except Him. Upon Him I have relied, and He is the Lord of the Great Throne.",
        "urduMeaning": "اللہ میرے لیے کافی ہے، اس کے سوا کوئی معبود نہیں، اسی پر میں نے بھروسہ کیا، اور وہ عرش عظیم کا مالک ہے۔",
        "urduVirtue": "جو شخص صبح اور شام سات بار یہ پڑھے گا، اللہ تعالیٰ اس کے دنیا اور آخرت کے تمام اہم معاملات اور فکروں کے لیے کافی ہو جائے گا۔",
        "virtue": "Whoever says this seven times in the morning and evening, Allah will suffice him for all that concerns him of worldly and hereafter matters.",
        "reference": "Sunan Abi Dawud (5081) - Sahih Mawquf",
        "recommendedGoal": 7,
        "category": "Complete Sufficiency",
        "badgeColor": "from-emerald-500 to-green-600"
    },
    # 15
    {
        "id": "tasbeeh-fatima-subhanallah",
        "arabic": "سُبْحَانَ اللهِ (٣٣ مَرَّةً)",
        "transliteration": "Subḥānallāh (33 times)",
        "englishMeaning": "Glory be to Allah (33 times).",
        "urduMeaning": "اللہ ہر عیب اور نقص سے پاک ہے (۳۳ بار)۔",
        "urduVirtue": "فرض نماز کے بعد 33 بار سبحان اللہ، 33 بار الحمد للہ اور 34 بار اللہ اکبر کہنا دن بھر کی تھکن کو مٹا کر جسمانی و روحانی طاقت بخشتا ہے۔",
        "virtue": "Taught by the Prophet (PBUH) to Ali and Fatima (RA); reciting this after prayers brings spiritual strength surpassing all worldly comforts.",
        "reference": "Sahih al-Bukhari (3705) & Sahih Muslim (2727)",
        "recommendedGoal": 33,
        "category": "Tasbeeh of Fatima",
        "badgeColor": "from-sky-500 to-indigo-600"
    },
    # 16
    {
        "id": "tasbeeh-fatima-alhamdulillah",
        "arabic": "الْحَمْدُ لِلهِ (٣٣ مَرَّةً)",
        "transliteration": "Al-ḥamdu lillāh (33 times)",
        "englishMeaning": "All praise is due to Allah (33 times).",
        "urduMeaning": "ہر قسم کی تعریف اور شکر صرف اللہ کے لیے ہے (۳۳ بار)۔",
        "urduVirtue": "الحمد للہ میزان کو نیکیوں سے بھر دیتا ہے، اور شکر گزاری پر اللہ تعالیٰ نعمتوں میں مزید برکت اور اضافہ فرماتا ہے۔",
        "virtue": "The Prophet (PBUH) said: Alhamdulillah fills the Scale (Mizan) with rewards, and gratitude invites more divine blessings.",
        "reference": "Sahih Muslim (223)",
        "recommendedGoal": 33,
        "category": "Gratitude & Scale Filler",
        "badgeColor": "from-teal-600 to-emerald-700"
    },
    # 17
    {
        "id": "tasbeeh-fatima-allahuakbar",
        "arabic": "اللهُ أَكْبَرُ (٣٤ مَرَّةً)",
        "transliteration": "Allāhu Akbar (34 times)",
        "englishMeaning": "Allah is the Greatest (34 times).",
        "urduMeaning": "اللہ سب سے بڑا اور سب سے بلند و بالا ہے (۳۴ بار)۔",
        "urduVirtue": "دل میں اللہ کی عظمت بٹھاتا ہے اور دنیا کے ہر خوف، پریشانی اور وسوسے پر فتح نصیب کرتا ہے۔",
        "virtue": "Affirms the Supreme Greatness of Allah, removing anxiety and grounding the believer in unwavering courage and peace.",
        "reference": "Sahih al-Bukhari (5362)",
        "recommendedGoal": 34,
        "category": "Majesty of Allah",
        "badgeColor": "from-orange-500 to-red-600"
    },
    # 18
    {
        "id": "subhanallahi-wa-bihamdihi-subhanallah-100",
        "arabic": "سُبْحَانَ اللهِ الْعَظِيمِ وَبِحَمْدِهِ",
        "transliteration": "Subḥānallāhil-‘Aẓīmi wa bi-ḥamdih",
        "englishMeaning": "Glory be to Allah the Magnificent, and praise is His.",
        "urduMeaning": "عظمت والا اللہ پاک ہے اور اپنی تمام تعریفوں کے ساتھ پاک ہے۔",
        "urduVirtue": "جو شخص یہ کلمہ پڑھتا ہے، جنت میں اس کے لیے کھجور کا ایک شاندار اور سایہ دار درخت لگا دیا جاتا ہے۔",
        "virtue": "Whoever says this, a date-palm tree is planted for him in Paradise.",
        "reference": "Jami` at-Tirmidhi (3464) - Sahih",
        "recommendedGoal": 100,
        "category": "Planting Trees in Jannah",
        "badgeColor": "from-lime-600 to-green-700"
    },
    # 19
    {
        "id": "ayat-al-kursi",
        "arabic": "اللَّهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
        "transliteration": "Allāhu lā ilāha illā Huwal-Ḥayyul-Qayyūm, lā ta’khudhuhu sinatuw-wa lā nawm...",
        "englishMeaning": "Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep...",
        "urduMeaning": "اللہ، اس کے سوا کوئی معبود نہیں، وہ ہمیشہ زندہ رہنے والا اور سب کو سنبھالنے والا ہے۔ نہ اسے اونگھ آتی ہے نہ نیند...",
        "urduVirtue": "جو شخص ہر فرض نماز کے بعد آیت الکرسی پڑھے گا، اس کے جنت میں داخل ہونے میں موت کے سوا کوئی چیز رکاوٹ نہیں۔",
        "virtue": "Whoever recites Ayat al-Kursi after every obligatory prayer, nothing prevents him from entering Paradise except death.",
        "reference": "Sunan an-Nasa'i (Al-Sunan al-Kubra 9848) - Sahih",
        "recommendedGoal": 1,
        "category": "Greatest Ayah of Quran",
        "badgeColor": "from-amber-600 to-yellow-500"
    },
    # 20
    {
        "id": "surah-ikhlas",
        "arabic": "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        "transliteration": "Qul Huwallāhu Aḥad. Allāhuṣ-Ṣamad. Lam yalid wa lam yūlad. Wa lam yakul-lahu kufuwan aḥad",
        "englishMeaning": "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.'",
        "urduMeaning": "کہہ دیجیے: وہ اللہ ایک ہے۔ اللہ بے نیاز ہے۔ نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے۔ اور نہ کوئی اس کا ہمسر ہے۔",
        "urduVirtue": "سورۃ الاخلاص کا ایک بار پڑھنا ایک تہائی قرآن (ثلث القرآن) کے برابر اجر و ثواب رکھتا ہے۔",
        "virtue": "Reciting Surah Al-Ikhlas is equivalent to reciting one-third of the entire Quran in reward.",
        "reference": "Sahih al-Bukhari (5015)",
        "recommendedGoal": 3,
        "category": "Purity of Monotheism",
        "badgeColor": "from-sky-600 to-blue-700"
    },
    # 21
    {
        "id": "surah-falaq",
        "arabic": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        "transliteration": "Qul a‘ūdhu bi-Rabbil-falaq, min sharri mā khalaq, wa min sharri ghāsiqin idhā waqab, wa min sharrin-naffāthāti fil-‘uqad, wa min sharri ḥāsidin idhā ḥasad",
        "englishMeaning": "Say, 'I seek refuge in the Lord of daybreak From the evil of that which He created, And from the evil of darkness when it settles, And from the evil of the blowers in knots, And from the evil of an envier when he envies.'",
        "urduMeaning": "کہہ دیجیے: میں صبح کے رب کی پناہ مانگتا ہوں، اس کی تمام مخلوق کے شر سے، اور اندھیری رات کے شر سے جب وہ چھا جائے، اور گرہوں میں پھونکنے والوں کے شر سے، اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔",
        "urduVirtue": "معوذتین (سورۃ الفلق اور سورۃ الناس) جیسی کوئی پناہ مانگنے والی سورتیں نازل نہیں ہوئیں، یہ ہر قسم کے جادو، نظر بد اور شرور سے مکمل حفاظت ہیں۔",
        "virtue": "No verses for seeking refuge have ever been revealed like Al-Falaq and An-Nas. They shield the reciter against evil eye, envy, and witchcraft.",
        "reference": "Sahih Muslim (814)",
        "recommendedGoal": 3,
        "category": "Refuge from Envy & Evil",
        "badgeColor": "from-indigo-600 to-purple-700"
    },
    # 22
    {
        "id": "surah-nas",
        "arabic": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
        "transliteration": "Qul a‘ūdhu bi-Rabbin-nās, Malikin-nās, Ilāhin-nās, min sharril-waswāsil-khannās, alladhī yuwaswisu fī ṣudūrin-nās, minal-jinnati wan-nās",
        "englishMeaning": "Say, 'I seek refuge in the Lord of mankind, The Sovereign of mankind, The God of mankind, From the evil of the retreating whisperer - Who whispers into the breasts of mankind - From among the jinn and mankind.'",
        "urduMeaning": "کہہ دیجیے: میں پناہ مانگتا ہوں انسانوں کے پروردگار کی، انسانوں کے بادشاہ کی، انسانوں کے معبود کی، وسوسہ ڈالنے والے پیچھے ہٹ جانے والے کے شر سے، جو لوگوں کے سینوں میں وسوسے ڈالتا ہے، خواہ وہ جنوں میں سے ہو یا انسانوں میں سے۔",
        "urduVirtue": "صبح و شام تین مرتبہ قل ہو اللہ احد اور معوذتین پڑھنا ہر قسم کے شرور و فتن سے تمہارے لیے کافی ہو جاتا ہے۔",
        "virtue": "Reciting Surah Al-Ikhlas, Al-Falaq, and An-Nas three times in the morning and evening suffices you against all harm.",
        "reference": "Sunan Abi Dawud (5082) & Jami` at-Tirmidhi (3575) - Sahih",
        "recommendedGoal": 3,
        "category": "Protection from Whispers",
        "badgeColor": "from-teal-600 to-cyan-700"
    },
    # 23
    {
        "id": "allahumma-ajirni-minan-nar",
        "arabic": "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
        "transliteration": "Allāhumma ajirnī minan-nār",
        "englishMeaning": "O Allah, save me from the Fire of Hell.",
        "urduMeaning": "اے اللہ! مجھے جہنم کی آگ سے پناہ عطا فرما۔",
        "urduVirtue": "جو شخص فجر اور مغرب کے بعد سات مرتبہ یہ کہے، اگر وہ اس دن یا رات فوت ہو جائے تو اس کے لیے جہنم سے نجات لکھ دی جاتی ہے۔",
        "virtue": "Whoever recites this seven times after Fajr and Maghrib, if he dies that day or night, deliverance from the Hellfire is decreed for him.",
        "reference": "Sunan Abi Dawud (5079) & Ahmad - Sahih Hasan",
        "recommendedGoal": 7,
        "category": "Salvation from Hellfire",
        "badgeColor": "from-red-600 to-rose-700"
    },
    # 24
    {
        "id": "allahumma-innee-as-alukal-jannah",
        "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ",
        "transliteration": "Allāhumma innī as’alukal-Jannah",
        "englishMeaning": "O Allah, I ask You for Paradise.",
        "urduMeaning": "اے اللہ! میں تجھ سے جنت الفردوس کا سوال کرتا ہوں۔",
        "urduVirtue": "جب کوئی بندہ تین مرتبہ اللہ سے جنت مانگتا ہے تو جنت خود التجا کرتی ہے: اے اللہ! اسے جنت میں داخل فرما دے۔",
        "virtue": "Whoever asks Allah for Paradise three times, Paradise itself says: 'O Allah, admit him into Paradise!'",
        "reference": "Jami` at-Tirmidhi (2572) & Sunan an-Nasa'i - Sahih",
        "recommendedGoal": 3,
        "category": "Supplication for Jannah",
        "badgeColor": "from-emerald-500 to-teal-600"
    },
    # 25
    {
        "id": "bismillahi-tawakkaltu-alallah",
        "arabic": "بِسْمِ اللهِ تَوَكَّلْتُ عَلَى اللهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
        "transliteration": "Bismillāhi tawakkaltu ‘alallāh, lā ḥawla wa lā quwwata illā billāh",
        "englishMeaning": "In the name of Allah; I place my trust in Allah; there is no might and no power except with Allah.",
        "urduMeaning": "اللہ کے نام سے میں نکلا، میں نے اللہ پر بھروسہ کیا، اللہ کے بغیر نیکی کی طاقت ہے نہ برائی سے بچنے کی قوت۔",
        "urduVirtue": "گھر سے نکلتے وقت جو یہ پڑھے، اسے ندا دی جاتی ہے: تجھے ہدایت مل گئی، تیری کفایت ہو گئی، اور تو محفوظ کر دیا گیا، اور شیطان اس سے دور ہو جاتا ہے۔",
        "virtue": "When leaving home, reciting this prompts angels to say: 'You are guided, defended, and protected,' and Shaytan steps away from you.",
        "reference": "Sunan Abi Dawud (5095) & Jami` at-Tirmidhi (3426) - Sahih",
        "recommendedGoal": 1,
        "category": "Leaving Home Protection",
        "badgeColor": "from-cyan-600 to-blue-600"
    },
    # 26
    {
        "id": "rabbi-ighfir-li-waliwalidayya",
        "arabic": "رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
        "transliteration": "Rabbigh-fir lī wa li-wālidayya wa lil-mu’minīna yawma yaqūmul-ḥisāb",
        "englishMeaning": "Our Lord, forgive me and my parents and the believers the Day the account is established.",
        "urduMeaning": "اے ہمارے پروردگار! مجھے اور میرے والدین کو اور سب ایمان والوں کو بخش دے جس دن حساب قائم ہوگا۔",
        "urduVirtue": "قرآنی دعا برائے والدین؛ انسان کے دنیا سے جانے کے بعد اس کے درجات اس کے نیک بچوں کی دعائے مغفرت سے جنت میں بلند کیے جاتے ہیں۔",
        "virtue": "A parent's rank in Paradise is raised high on account of their righteous child continuously praying for their forgiveness.",
        "reference": "Quran Surah Ibrahim (14:41) & Sunan Ibn Majah (3660)",
        "recommendedGoal": 10,
        "category": "Dua for Parents",
        "badgeColor": "from-pink-600 to-rose-700"
    },
    # 27
    {
        "id": "dua-before-sleep",
        "arabic": "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        "transliteration": "Bismikallāhumma amūtu wa aḥyā",
        "englishMeaning": "In Your Name, O Allah, I die and I live.",
        "urduMeaning": "اے اللہ! تیرے ہی نام کے ساتھ میں مرتا (سوتا) ہوں اور جیتا (جاگتا) ہوں۔",
        "urduVirtue": "سونے سے پہلے کی سنت نبوی دعا؛ نیند کو اللہ کی یاد سے سجاتے ہوئے روح کو رب کی امان میں سونپنے کا مسنون عمل۔",
        "virtue": "Sunnah bedtime supplication that commits your soul into the safe hands of Allah throughout the night.",
        "reference": "Sahih al-Bukhari (6312)",
        "recommendedGoal": 1,
        "category": "Sleep Sunnah",
        "badgeColor": "from-indigo-600 to-slate-700"
    },
    # 28
    {
        "id": "dua-waking-up",
        "arabic": "الْحَمْدُ لِلهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        "transliteration": "Al-ḥamdu lillāhil-ladhī aḥyānā ba‘da mā amātanā wa ilayhin-nushūr",
        "englishMeaning": "All praise is for Allah who gave us life after causing us to die, and unto Him is the resurrection.",
        "urduMeaning": "تمام تعریفیں اس اللہ کے لیے ہیں جس نے ہمیں مارنے (سلانے) کے بعد زندہ کیا اور اسی کی طرف اٹھ کر جانا ہے۔",
        "urduVirtue": "نیند سے بیدار ہوتے ہی پڑھنے کی دعا؛ دن کا آغاز شکر اور آخرت کی یاد سے کر کے پورے دن میں برکت اور نور پیدا کرتی ہے۔",
        "virtue": "Begins your day with gratitude, acknowledging the blessing of life and renewing focus on righteousness.",
        "reference": "Sahih al-Bukhari (6312) & Sahih Muslim",
        "recommendedGoal": 1,
        "category": "Waking Up Sunnah",
        "badgeColor": "from-amber-500 to-orange-600"
    },
    # 29
    {
        "id": "rabbi-zidni-ilma",
        "arabic": "رَّبِّ زِدْنِي عِلْمًا",
        "transliteration": "Rabbi zidnī ‘ilmā",
        "englishMeaning": "My Lord, increase me in knowledge.",
        "urduMeaning": "اے میرے پروردگار! میرے علم میں اضافہ فرما۔",
        "urduVirtue": "قرآن کریم کی سب سے خوبصورت دعا برائے علم و حکمت، اللہ تعالیٰ نے اپنے نبی ﷺ کو علم میں اضافے کی دعا کا حکم فرمایا۔",
        "virtue": "Directly commanded by Allah in the Quran to seek continuous spiritual, intellectual, and beneficial knowledge.",
        "reference": "Quran Surah Ta-Ha (20:114)",
        "recommendedGoal": 21,
        "category": "Seeking Knowledge",
        "badgeColor": "from-blue-500 to-cyan-600"
    },
    # 30
    {
        "id": "allahumma-innee-as-aluka-ilman-nafi-a",
        "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        "transliteration": "Allāhumma innī as’aluka ‘ilman nāfi‘an, wa rizqan ṭayyiban, wa ‘amalan mutaqabbalā",
        "englishMeaning": "O Allah, I ask You for beneficial knowledge, good and pure provision, and deeds that are accepted.",
        "urduMeaning": "اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ حلال رزق، اور قبول ہونے والے عمل کا سوال کرتا ہوں۔",
        "urduVirtue": "نبی کریم ﷺ فجر کی نماز کے بعد ہر صبح یہ جامع دعا فرمایا کرتے تھے، جو علم، رزق اور عمل کی قبولیت کا خزانہ ہے۔",
        "virtue": "Recited daily by the Prophet (PBUH) after the Fajr prayer, encompassing the essentials of a blessed life: knowledge, pure sustenance, and accepted deeds.",
        "reference": "Sunan Ibn Majah (925) - Sahih",
        "recommendedGoal": 3,
        "category": "Morning Prayer Gem",
        "badgeColor": "from-teal-500 to-green-600"
    },
    # 31
    {
        "id": "allahumma-antassalam",
        "arabic": "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        "transliteration": "Allāhumma Antas-Salāmu wa minkas-salām, tabārakta yā Dhal-Jalāli wal-Ikrām",
        "englishMeaning": "O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of Majesty and Honor.",
        "urduMeaning": "اے اللہ! تو ہی سراپا سلامتی ہے اور تیری ہی طرف سے سلامتی ہے، تو بڑی برکت والا ہے اے عظمت اور بزرگی والے۔",
        "urduVirtue": "رسول اللہ ﷺ نماز کا سلام پھیرنے کے فوراً بعد تین بار استغفار کے بعد یہ کلمات پڑھتے تھے، جو دل کو سکینت اور اطمینان بخشتے ہیں۔",
        "virtue": "Sunnah immediately following prayer, connecting the soul with Allah's eternal peace, honor, and majesty.",
        "reference": "Sahih Muslim (591)",
        "recommendedGoal": 1,
        "category": "Post-Prayer Peace",
        "badgeColor": "from-sky-500 to-teal-500"
    },
    # 32
    {
        "id": "allahumma-a-inni-ala-dhikrika",
        "arabic": "اللَّهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ",
        "transliteration": "Allāhumma a‘innī ‘alā dhikrika wa shukrika wa ḥusni ‘ibādatik",
        "englishMeaning": "O Allah, help me to remember You, to give You thanks, and to worship You in an excellent manner.",
        "urduMeaning": "اے اللہ! اپنے ذکر، اپنے شکر، اور اپنی بہترین عبادت کرنے پر میری مدد فرما۔",
        "urduVirtue": "نبی اکرم ﷺ نے سیدنا معاذ بن جبل رضی اللہ عنہ سے فرمایا: اے معاذ! واللہ میں تم سے محبت کرتا ہوں، تو ہر نماز کے بعد یہ دعا مانگنا کبھی نہ چھوڑنا۔",
        "virtue": "Specially gifted by the Prophet (PBUH) to Mu'adh ibn Jabal (RA) out of immense love, to be recited at the end of every prayer.",
        "reference": "Sunan Abi Dawud (1522) - Sahih",
        "recommendedGoal": 3,
        "category": "Prophetic Advice of Love",
        "badgeColor": "from-amber-600 to-rose-600"
    },
    # 33
    {
        "id": "audhu-bikalimatillahit-tammati",
        "arabic": "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        "transliteration": "A‘ūdhu bi-kalimātillāhit-tāmmāti min sharri mā khalaq",
        "englishMeaning": "I seek refuge in the perfect words of Allah from the evil of that which He has created.",
        "urduMeaning": "میں اللہ کے مکمل کلمات کی پناہ مانگتا ہوں اس کی پیدا کی ہوئی تمام مخلوقات کے شر سے۔",
        "urduVirtue": "جو شخص کسی بھی جگہ پڑاؤ ڈالتے وقت یا شام کے وقت یہ پڑھے، اس جگہ سے روانہ ہونے تک کوئی زہریلا کیڑا یا مصیبت اسے نقصان نہیں پہنچا سکتی۔",
        "virtue": "Whoever recites this when stopping anywhere or in the evening, no poisonous creature or harm will touch him until he departs.",
        "reference": "Sahih Muslim (2708) & (2709)",
        "recommendedGoal": 3,
        "category": "Shield from Venom & Danger",
        "badgeColor": "from-emerald-600 to-teal-700"
    },
    # 34
    {
        "id": "subhanal-malikil-quddoos",
        "arabic": "سُبْحَانَ الْمَلِكِ الْقُدُّوسِ (٣ مَرَّةً)",
        "transliteration": "Subḥānal-Malikil-Quddūs (3 times)",
        "englishMeaning": "Glory be to the Sovereign, the Most Holy (3 times).",
        "urduMeaning": "پاک ہے وہ حقیقی بادشاہ جو نہایت مقدس و بے عیب ہے (۳ بار)۔",
        "urduVirtue": "نبی کریم ﷺ نماز وتر سے فارغ ہونے کے بعد یہ کلمات تین مرتبہ بآواز بلند فرماتے تھے اور تیسری بار اپنی آواز کو کھینچتے تھے۔",
        "virtue": "Recited by the Prophet (PBUH) upon concluding Witr prayer, elevating the voice on the third repetition in sacred praise.",
        "reference": "Sunan an-Nasa'i (1732) & Sunan Abi Dawud - Sahih",
        "recommendedGoal": 3,
        "category": "Post-Witr Sunnah",
        "badgeColor": "from-indigo-500 to-violet-600"
    },
    # 35
    {
        "id": "dua-for-anxiety-hamm-hazn",
        "arabic": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
        "transliteration": "Allāhumma innī a‘ūdhu bika minal-hammi wal-ḥazan, wal-‘ajzi wal-kasal, wal-bukhli wal-jubn, wa ḍala‘id-dayni wa ghalabatir-rijāl",
        "englishMeaning": "O Allah, I seek refuge in You from anxiety and grief, helplessness and laziness, stinginess and cowardice, the burden of debt and the domination of men.",
        "urduMeaning": "اے اللہ! میں تیری پناہ مانگتا ہوں فکر و غم سے، عاجزی اور سستی سے، بخل اور بزدلی سے، قرض کے بوجھ سے اور لوگوں کے دباؤ و تسلط سے۔",
        "urduVirtue": "رسول اللہ ﷺ اکثر یہ دعا مانگا کرتے تھے؛ یہ مالی تنگی، قرضوں، بے چینی اور نفسیاتی دباؤ کا سب سے طاقتور نبوی علاج ہے۔",
        "virtue": "The master supplication against anxiety, depression, debt, and weakness; recited frequently by the Prophet (PBUH).",
        "reference": "Sahih al-Bukhari (6363)",
        "recommendedGoal": 3,
        "category": "Cure for Anxiety & Debt",
        "badgeColor": "from-blue-600 to-cyan-600"
    },
    # 36
    {
        "id": "dua-entering-home",
        "arabic": "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَىٰ رَبِّنَا تَوَكَّلْنَا",
        "transliteration": "Bismillāhi walajnā, wa bismillāhi kharajnā, wa ‘alā Rabbinā tawakkalnā",
        "englishMeaning": "In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we rely.",
        "urduMeaning": "اللہ کے نام کے ساتھ ہم داخل ہوئے، اللہ کے نام کے ساتھ ہم نکلے، اور اپنے رب پر ہی ہم نے بھروسہ کیا۔",
        "urduVirtue": "گھر میں داخل ہوتے وقت اللہ کا نام لینے اور سلام کرنے سے شیطان اپنے چیلوں سے کہتا ہے: یہاں نہ تمہارے رات گزارنے کی جگہ ہے نہ کھانا۔",
        "virtue": "Remembering Allah and greeting upon entering home bars Shaytan from dwelling or eating in your residence.",
        "reference": "Sunan Abi Dawud (5096) & Sahih Muslim",
        "recommendedGoal": 1,
        "category": "Entering Home Blessing",
        "badgeColor": "from-teal-600 to-emerald-600"
    },
    # 37
    {
        "id": "dua-for-forgiveness-rabbana-zalamna",
        "arabic": "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        "transliteration": "Rabbanā ẓalamnā anfusanā wa illam taghfir lanā wa tarḥamnā lanakūnanna minal-khāsirīn",
        "englishMeaning": "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
        "urduMeaning": "اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا، اور اگر تو نے ہمیں نہ بخشا اور ہم پر رحم نہ کیا تو ہم یقیناً نقصان اٹھانے والوں میں سے ہو جائیں گے۔",
        "urduVirtue": "سیدنا آدم اور حوا علیہما السلام کی توبہ کی قرآنی دعا؛ جس سے اللہ تعالیٰ نے ان کی توبہ قبول فرمائی اور ان پر رحم فرمایا۔",
        "virtue": "The Quranic prayer of Adam and Hawwa (AS) through which Allah accepted their repentance and showered them with mercy.",
        "reference": "Quran Surah Al-A'raf (7:23)",
        "recommendedGoal": 7,
        "category": "Prophetic Repentance",
        "badgeColor": "from-rose-600 to-amber-600"
    },
    # 38
    {
        "id": "dua-for-ease-allahumma-la-sahla",
        "arabic": "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا",
        "transliteration": "Allāhumma lā sahla illā mā ja‘altahu sahlā, wa Anta taj‘alul-ḥazna idhā shi’ta sahlā",
        "englishMeaning": "O Allah, there is no ease except in that which You have made easy, and You make the difficult easy if You will.",
        "urduMeaning": "اے اللہ! کوئی کام آسان نہیں سوائے اس کے جسے تو آسان بنا دے، اور تو جب چاہتا ہے مشکل و غم کو آسانی میں بدل دیتا ہے۔",
        "urduVirtue": "کسی بھی امتحان، مشکل کام یا پیچیدہ مرحلے کے وقت یہ دعا مانگنے سے اللہ تعالیٰ بندے کے لیے راستے آسان فرما دیتا ہے۔",
        "virtue": "A blessed Sunnah prayer to invoke when facing exams, difficult tasks, or challenges, turning hardship into ease.",
        "reference": "Sahih Ibn Hibban (974) - Sahih",
        "recommendedGoal": 3,
        "category": "Overcoming Difficulty",
        "badgeColor": "from-amber-500 to-yellow-600"
    },
    # 39
    {
        "id": "dua-for-protection-against-shirk",
        "arabic": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
        "transliteration": "Allāhumma innī a‘ūdhu bika an ushrika bika wa anā a‘lam, wa astaghfiruka limā lā a‘lam",
        "englishMeaning": "O Allah, I seek refuge in You from knowingly associating partners with You, and I seek Your forgiveness for that which I do not know.",
        "urduMeaning": "اے اللہ! میں تیری پناہ مانگتا ہوں اس بات سے کہ میں جانتے بوجھتے تیرے ساتھ کسی کو شریک ٹھہراؤں، اور تجھ سے بخشش مانگتا ہوں اس کی جس کا مجھے علم نہیں۔",
        "urduVirtue": "نبی اکرم ﷺ نے فرمایا: شرک چیونٹی کی چال سے بھی زیادہ پوشیدہ ہوتا ہے، کیا میں تمہیں ایسا کلمہ نہ سکھاؤں جو تمہیں چھوٹے اور بڑے شرک دونوں سے بچائے؟",
        "virtue": "Taught by the Prophet (PBUH) to safeguard faith against subtle hypocrisy, vanity, and all forms of association with Allah.",
        "reference": "Al-Adab Al-Mufrad by Bukhari (716) - Sahih",
        "recommendedGoal": 3,
        "category": "Purity of Intention",
        "badgeColor": "from-purple-600 to-indigo-600"
    },
    # 40
    {
        "id": "dua-entering-masjid",
        "arabic": "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        "transliteration": "Allāhummaf-taḥ lī abwāba raḥmatik",
        "englishMeaning": "O Allah, open for me the doors of Your mercy.",
        "urduMeaning": "اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔",
        "urduVirtue": "مسجد میں دایاں پاؤں رکھ کر داخل ہوتے وقت کی مسنون دعا؛ جو بندے پر اللہ کی خصوصی رحمتوں اور مغفرت کا نزول کرتی ہے۔",
        "virtue": "Sunnah upon stepping with the right foot into the mosque, opening the floodgates of Allah's spiritual mercy.",
        "reference": "Sahih Muslim (713)",
        "recommendedGoal": 1,
        "category": "Masjid Entrance",
        "badgeColor": "from-emerald-500 to-teal-500"
    },
    # 41
    {
        "id": "dua-leaving-masjid",
        "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        "transliteration": "Allāhumma innī as’aluka min faḍlik",
        "englishMeaning": "O Allah, I ask You from Your bounty.",
        "urduMeaning": "اے اللہ! میں تجھ سے تیرے فضل و کرم کا سوال کرتا ہوں۔",
        "urduVirtue": "مسجد سے بایاں پاؤں نکالتے وقت کی مسنون دعا؛ نماز کی برکت کے ساتھ دنیاوی روزگار میں حلال برکت اور فضل مانگنے کا طریقہ۔",
        "virtue": "Sunnah upon stepping out of the mosque, seeking Allah's halal bounty, prosperity, and guidance in daily endeavors.",
        "reference": "Sahih Muslim (713)",
        "recommendedGoal": 1,
        "category": "Masjid Exit Bounty",
        "badgeColor": "from-cyan-600 to-sky-600"
    },
    # 42
    {
        "id": "dua-travel-safari",
        "arabic": "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ ۝ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
        "transliteration": "Subḥānal-ladhī sakh-khara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā Rabbinā lamunqalibūn",
        "englishMeaning": "Glory be to Him who has subjected this to us, when we could never have done it by ourselves. And indeed, to our Lord we will return.",
        "urduMeaning": "پاک ہے وہ ذات جس نے اس سواری کو ہمارے تابع کر دیا حالانکہ ہم اسے قابو میں لانے والے نہ تھے، اور یقیناً ہم اپنے رب ہی کی طرف لوٹ کر جانے والے ہیں۔",
        "urduVirtue": "سواری پر سوار ہوتے وقت اور سفر کے آغاز کی قرآنی دعا؛ سفر کو حادثات سے محفوظ رکھنے اور منزل تک سلامتی کا ضامن عمل۔",
        "virtue": "The Quranic and prophetic travel supplication providing safety, peace of mind, and divine protection on journeys.",
        "reference": "Quran Surah Az-Zukhruf (43:13-14) & Sahih Muslim (1342)",
        "recommendedGoal": 1,
        "category": "Safe Journey",
        "badgeColor": "from-amber-600 to-orange-600"
    },
    # 43
    {
        "id": "dua-after-wudu",
        "arabic": "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
        "transliteration": "Ash-hadu allā ilāha illallāhu waḥdahu lā sharīka lah, wa ash-hadu anna Muḥammadan ‘abduhū wa rasūluh. Allāhummaj-‘alnī minat-tawwābīna waj-‘alnī minal-mutaṭahhirīn",
        "englishMeaning": "I bear witness that there is no god but Allah alone without partner, and Muhammad is His servant and messenger. O Allah, make me among those who constantly repent and make me among those who purify themselves.",
        "urduMeaning": "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ محمد ﷺ اس کے بندے اور رسول ہیں۔ اے اللہ! مجھے خوب توبہ کرنے والوں اور پاک صاف رہنے والوں میں شامل فرما۔",
        "urduVirtue": "جو شخص کامل وضو کے بعد یہ کلمات کہتا ہے، اس کے لیے جنت کے آٹھوں دروازے کھول دیے جاتے ہیں، جس سے چاہے داخل ہو جائے۔",
        "virtue": "Whoever completes wudu and recites this supplication, all eight gates of Paradise are opened for him to enter from whichever he pleases.",
        "reference": "Sahih Muslim (234) & Jami` at-Tirmidhi (55)",
        "recommendedGoal": 1,
        "category": "8 Gates of Jannah",
        "badgeColor": "from-emerald-500 to-green-600"
    },
    # 44
    {
        "id": "dua-for-health-afiyah",
        "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
        "transliteration": "Allāhumma innī as’alukal-‘afwa wal-‘āfiyata fid-dunyā wal-ākhirah",
        "englishMeaning": "O Allah, I ask You for forgiveness and well-being in this world and in the Hereafter.",
        "urduMeaning": "اے اللہ! میں تجھ سے دنیا اور آخرت میں درگزر، معافی اور عافیت (صحت و سلامتی) کا سوال کرتا ہوں۔",
        "urduVirtue": "نبی کریم ﷺ سے پوچھا گیا: ایمان کے بعد سب سے افضل چیز کیا مانگیں؟ فرمایا: عافیت مانگو، کیونکہ عافیت سے بہتر کوئی نعمت نہیں۔",
        "virtue": "The Prophet (PBUH) stated that after certainty of faith, no one is granted a greater gift from Allah than 'Afiyah (wholesome well-being and protection).",
        "reference": "Jami` at-Tirmidhi (3558) & Sunan Ibn Majah - Sahih",
        "recommendedGoal": 3,
        "category": "Crown of Well-Being",
        "badgeColor": "from-teal-600 to-cyan-600"
    },
    # 45
    {
        "id": "dua-for-steadfast-heart",
        "arabic": "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَىٰ دِينِكَ",
        "transliteration": "Yā Muqallibal-qulūbi thabbit qalbī ‘alā dīnik",
        "englishMeaning": "O Turner of the hearts, make my heart firm upon Your religion.",
        "urduMeaning": "اے دلوں کو پھیرنے والے! میرے دل کو اپنے دین پر مضبوطی سے جما دے۔",
        "urduVirtue": "ام المومنین سیدہ عائشہ رضی اللہ عنہا فرماتی ہیں کہ رسول اللہ ﷺ کثرت سے یہ دعا مانگا کرتے تھے کیونکہ تمام دل رحمان کی دو انگلیوں کے درمیان ہیں۔",
        "virtue": "The most frequent prayer of the Prophet (PBUH), seeking divine perseverance and protection against misguidance.",
        "reference": "Jami` at-Tirmidhi (2140) - Sahih",
        "recommendedGoal": 7,
        "category": "Steadfastness in Faith",
        "badgeColor": "from-rose-500 to-pink-600"
    },
    # 46
    {
        "id": "subhanallahi-wa-bihamdihi-100-evening",
        "arabic": "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلهِ، وَالْحَمْدُ لِلهِ، لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        "transliteration": "Amsaynā wa amsal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah",
        "englishMeaning": "We have reached the evening and with it the whole Kingdom remains Allah's. All praise is for Allah, there is no deity except Allah alone without partner.",
        "urduMeaning": "ہم نے شام کی اور شام کے وقت بھی ساری بادشاہی اللہ ہی کی ہے، اور تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے۔",
        "urduVirtue": "شام کے وقت کا مسنون نبوی ذکر؛ جو رات کو تاریکی، خطرات اور وسوسوں سے محفوظ رکھ کر دل میں توحید کی روشنی برقرار رکھتا ہے۔",
        "virtue": "Sunnah evening remembrance reaffirming sovereignty, gratitude, and divine protection as night settles.",
        "reference": "Sahih Muslim (2723)",
        "recommendedGoal": 1,
        "category": "Evening Serenity",
        "badgeColor": "from-indigo-700 to-slate-800"
    },
    # 47
    {
        "id": "dua-morning-asbahna",
        "arabic": "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلهِ، وَالْحَمْدُ لِلهِ، لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        "transliteration": "Aṣbaḥnā wa aṣbaḥal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah",
        "englishMeaning": "We have entered the morning and with it all dominion belongs to Allah. All praise is for Allah, there is no deity except Allah alone without partner.",
        "urduMeaning": "ہم نے صبح کی اور صبح کے وقت بھی ساری بادشاہی اللہ ہی کی ہے، اور تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے۔",
        "urduVirtue": "صبح کا مسنون نبوی ذکر؛ نئے دن کا آغاز اللہ کی بادشاہی اور شکر سے کر کے دن بھر میں برکت اور کامرانی عطا کرتا ہے۔",
        "virtue": "Morning Sunnah greeting the dawn with devotion, seeking goodness and light throughout the coming day.",
        "reference": "Sahih Muslim (2723)",
        "recommendedGoal": 1,
        "category": "Morning Radiance",
        "badgeColor": "from-amber-500 to-yellow-600"
    },
    # 48
    {
        "id": "dua-for-goodness-rabbana-atina",
        "arabic": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        "transliteration": "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā ‘adhāban-nār",
        "englishMeaning": "Our Lord, give us in this world that which is good and in the Hereafter that which is good, and save us from the punishment of the Fire.",
        "urduMeaning": "اے ہمارے پروردگار! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما، اور ہمیں دوزخ کے عذاب سے بچا لے۔",
        "urduVirtue": "قرآن و سنت کی سب سے جامع اور کثرت سے مانگی جانے والی دعا؛ جس میں دنیا و آخرت کی تمام بھلائیاں اور جہنم سے نجات جمع ہے۔",
        "virtue": "The most comprehensive and frequently uttered supplication of the Prophet (PBUH), combining all goodness of both worlds.",
        "reference": "Quran Surah Al-Baqarah (2:201) & Sahih al-Bukhari (6389)",
        "recommendedGoal": 7,
        "category": "Most Comprehensive Dua",
        "badgeColor": "from-emerald-600 to-teal-600"
    },
    # 49
    {
        "id": "salat-alan-nabi-short",
        "arabic": "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَىٰ نَبِيِّنَا مُحَمَّدٍ",
        "transliteration": "Allāhumma ṣalli wa sallim ‘alā Nabiyyinā Muḥammad",
        "englishMeaning": "O Allah, send Your blessings and peace upon our Prophet Muhammad.",
        "urduMeaning": "اے اللہ! ہمارے نبی حضرت محمد ﷺ پر رحمتیں اور سلامتی نازل فرما۔",
        "urduVirtue": "جو شخص صبح دس بار اور شام دس بار مجھ پر درود پڑھے گا، قیامت کے دن اسے میری شفاعت نصیب ہوگی۔",
        "virtue": "Whoever sends blessings upon me ten times in the morning and ten times in the evening will attain my intercession on the Day of Resurrection.",
        "reference": "At-Tabarani (Majma' az-Zawa'id 10/120) - Hasan",
        "recommendedGoal": 10,
        "category": "Intercession of the Prophet",
        "badgeColor": "from-rose-600 to-red-600"
    },
    # 50
    {
        "id": "alhamdulillah-alaa-kulli-haal",
        "arabic": "الْحَمْدُ لِلهِ عَلَىٰ كُلِّ حَالٍ",
        "transliteration": "Al-ḥamdu lillāhi ‘alā kulli ḥāl",
        "englishMeaning": "Praise be to Allah in all circumstances and conditions.",
        "urduMeaning": "ہر حال میں تمام تعریفیں اور شکر صرف اللہ ہی کے لیے ہے۔",
        "urduVirtue": "جب نبی کریم ﷺ کو کوئی ایسی بات پیش آتی جو ناگوار ہوتی تو آپ یہ فرماتے؛ یہ ہر آزمائش میں صبر اور رضا کا سب سے پیارا کلمہ ہے۔",
        "virtue": "Recited by the Prophet (PBUH) during trials or unpleasant situations, affirming unwavering contentment and praise of Allah's divine wisdom.",
        "reference": "Sunan Ibn Majah (3803) - Sahih",
        "recommendedGoal": 10,
        "category": "Praise in All Conditions",
        "badgeColor": "from-slate-600 to-slate-800"
    },
    # 51
    {
        "id": "dua-for-entering-market",
        "arabic": "لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        "transliteration": "Lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamdu, yuḥyī wa yumītu wa Huwa ḥayyun lā yamūt, biyadihil-khayru wa Huwa ‘alā kulli shay’in Qadīr",
        "englishMeaning": "There is no god but Allah alone, without partner. To Him belongs all kingdom and praise. He gives life and causes death, and He is Ever-Living, never dying. In His Hand is all goodness, and He is over all things competent.",
        "urduMeaning": "اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کی بادشاہی اور اسی کی تعریف ہے، وہی زندہ کرتا ہے اور وہی مارتا ہے، اور وہ ہمیشہ زندہ ہے جسے موت نہیں، اسی کے ہاتھ میں تمام بھلائی ہے اور وہ ہر چیز پر قادر ہے۔",
        "urduVirtue": "جو شخص بازار یا مارکیٹ میں داخل ہوتے وقت یہ کہے، اللہ اس کے لیے دس لاکھ (10 لاکھ) نیکیاں لکھتا ہے، دس لاکھ گناہ معاف فرماتا ہے اور جنت میں اس کا محل بناتا ہے۔",
        "virtue": "Whoever recites this when entering the marketplace, Allah writes for him one million good deeds, erases one million sins, and builds for him a house in Paradise.",
        "reference": "Jami` at-Tirmidhi (3428) & Sunan Ibn Majah (2235) - Hasan",
        "recommendedGoal": 1,
        "category": "Million Rewards Marketplace Dua",
        "badgeColor": "from-amber-600 to-yellow-600"
    },
    # 52
    {
        "id": "subhanaka-allahumma-wa-bihamdika-tawbah",
        "arabic": "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
        "transliteration": "Subḥānakallāhumma wa bi-ḥamdika, ash-hadu allā ilāha illā Anta, astaghfiruka wa atūbu ilayk",
        "englishMeaning": "Glory be to You, O Allah, and praise is to You. I bear witness that there is no god but You. I seek Your forgiveness and I repent to You.",
        "urduMeaning": "اے اللہ! تو اپنی تعریفوں کے ساتھ پاک ہے، میں گواہی دیتا ہوں کہ تیرے سوا کوئی معبود نہیں، میں تجھ سے بخشش مانگتا ہوں اور تیرے حضور توبہ کرتا ہوں۔",
        "urduVirtue": "کفارہ مجلس کا ذکر؛ کسی بھی محفل یا بیٹھک کے اختتام پر پڑھنے سے اس مجلس میں ہوئی تمام لغزشیں اور کوتاہیاں معاف کر دی جاتی ہیں۔",
        "virtue": "Expiation of the gathering (Kaffaratul-Majlis). Reciting it upon concluding any conversation or meeting erases any shortcomings that occurred within it.",
        "reference": "Jami` at-Tirmidhi (3433) & Abu Dawud - Sahih",
        "recommendedGoal": 3,
        "category": "Expiation of Gatherings",
        "badgeColor": "from-indigo-600 to-blue-700"
    }
]

file_content = '''export interface DhikrItem {
    id: string;
    arabic: string;
    transliteration: string;
    englishMeaning: string;
    urduMeaning: string;
    urduVirtue: string;
    virtue: string;
    reference: string;
    recommendedGoal: number;
    category: string;
    badgeColor: string;
}

export const dhikrList: DhikrItem[] = ''' + json.dumps(dhikr_list, ensure_ascii=False, indent=4) + ''';

export const getDhikrOfTheDay = (): DhikrItem => {
    const today = new Date();
    // Rotate through the 52+ authentic zikrs based on day of year
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % dhikrList.length;
    return dhikrList[index];
};

export const getTodayKey = (): string => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};
'''

with open('frontend/src/data/dhikrData.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f'Successfully wrote {len(dhikr_list)} authentic Zikrs to frontend/src/data/dhikrData.ts')
