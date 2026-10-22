export interface HadithItem {
    header: string;
    hadithNumber: string;
    bookSlug: string;
    hadithUrdu: string;
    hadithEnglish: string;
}

export const curatedHadiths: Record<string, HadithItem[]> = {
    "Anger Management": [
        {
            header: "Sahih al-Bukhari",
            hadithNumber: "6114",
            bookSlug: "Good Manners and Form (Al-Adab)",
            hadithUrdu: "حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”طاقتور وہ شخص نہیں جو کشتی میں لوگوں کو پچھاڑ دے، بلکہ اصل طاقتور اور بہادر وہ ہے جو غصے کے وقت اپنے نفس پر قابو رکھے۔“",
            hadithEnglish: "Narrated Abu Huraira: Allah's Messenger (ﷺ) said, 'The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger.'"
        },
        {
            header: "Jami at-Tirmidhi",
            hadithNumber: "2191",
            bookSlug: "Chapters on Description of the Day of Judgement",
            hadithUrdu: "رسول اللہ ﷺ نے فرمایا: ”جس نے غصہ پیا حالانکہ وہ اسے نافذ کرنے پر قادر تھا، اللہ تعالیٰ قیامت کے دن تمام مخلوق کے سامنے اسے بلائے گا اور اسے اختیار دے گا کہ جس حور کو چاہے منتخب کر لے۔“",
            hadithEnglish: "The Messenger of Allah (ﷺ) said, 'Whoever suppresses his anger when he has the power to act upon it, Allah will call him before all creation on the Day of Resurrection to let him choose whatever companion of Paradise he desires.'"
        }
    ],
    "General Wisdom": [
        {
            header: "Sahih al-Bukhari",
            hadithNumber: "13",
            bookSlug: "Book of Belief (Al-Iman)",
            hadithUrdu: "حضرت انس رضی اللہ عنہ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: ”تم میں سے کوئی شخص اس وقت تک سچا مومن نہیں ہو سکتا جب تک کہ وہ اپنے مسلمان بھائی کے لیے بھی وہی خیر پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔“",
            hadithEnglish: "Narrated Anas: The Prophet (ﷺ) said, 'None of you will have true faith till he wishes for his (Muslim) brother what he likes for himself.'"
        },
        {
            header: "Sahih al-Bukhari",
            hadithNumber: "1",
            bookSlug: "Revelation (Bad' al-Wahy)",
            hadithUrdu: "امیر المومنین عمر بن خطاب رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”تمام اعمال کا دارومدار نیتوں پر ہے، اور ہر انسان کو وہی ملے گا جس کی اس نے نیت کی۔“",
            hadithEnglish: "Narrated 'Umar bin Al-Khattab: Allah's Messenger (ﷺ) said, 'The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.'"
        }
    ],
    "Manners": [
        {
            header: "Sahih al-Bukhari",
            hadithNumber: "6029",
            bookSlug: "Good Manners and Form (Al-Adab)",
            hadithUrdu: "حضرت عبداللہ بن عمرو رضی اللہ عنہما سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”بے شک تم میں سب سے بہترین اور مجھے سب سے زیادہ محبوب وہ انسان ہے جس کے اخلاق سب سے اچھے اور خوبصورت ہوں۔“",
            hadithEnglish: "Narrated Abdullah bin Amr: The Prophet (ﷺ) said, 'The best among you are those who have the best manners and character.'"
        },
        {
            header: "Jami at-Tirmidhi",
            hadithNumber: "2003",
            bookSlug: "Chapters on Righteousness and Relations",
            hadithUrdu: "حضرت ابودرداء رضی اللہ عنہ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: ”قیامت کے دن مومن کے ترازو میں اچھے اخلاق سے زیادہ وزنی اور بھاری کوئی چیز نہیں ہوگی۔“",
            hadithEnglish: "The Prophet (ﷺ) said, 'Nothing is weightier on the Scale of good deeds on the Day of Judgment than good character.'"
        }
    ],
    "Parents": [
        {
            header: "Sahih al-Bukhari",
            hadithNumber: "5971",
            bookSlug: "Good Manners and Form (Al-Adab)",
            hadithUrdu: "حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ ایک شخص نے رسول اللہ ﷺ سے پوچھا: میرے اچھے سلوک اور خدمت کا سب سے زیادہ حقدار کون ہے؟ آپ ﷺ نے فرمایا: ”تمہاری ماں۔“ اس نے عرض کیا: پھر کون؟ فرمایا: ”تمہاری ماں۔“ اس نے عرض کیا: پھر کون؟ فرمایا: ”تمہاری ماں۔“ اس نے عرض کیا: پھر کون؟ آپ ﷺ نے فرمایا: ”پھر تمہارا باپ۔“",
            hadithEnglish: "Narrated Abu Huraira: A man asked Allah's Messenger (ﷺ), 'Who is most deserving of my fine companionship and care?' The Prophet (ﷺ) said, 'Your mother.' The man said, 'Then who?' He said, 'Your mother.' The man said, 'Then who?' He said, 'Your mother.' The man said, 'Then who?' He said, 'Then your father.'"
        },
        {
            header: "Jami at-Tirmidhi",
            hadithNumber: "1899",
            bookSlug: "Chapters on Righteousness and Relations",
            hadithUrdu: "حضرت عبداللہ بن عمرو رضی اللہ عنہما سے روایت ہے کہ نبی اکرم ﷺ نے فرمایا: ”رب کی رضا باپ کی رضا میں ہے، اور رب کی ناراضگی باپ کی ناراضگی میں ہے۔“",
            hadithEnglish: "The Prophet (ﷺ) said, 'The pleasure of the Lord is in the pleasure of the parents, and the displeasure of the Lord is in the displeasure of the parents.'"
        }
    ],
    "Charity": [
        {
            header: "Jami at-Tirmidhi",
            hadithNumber: "1956",
            bookSlug: "Chapters on Righteousness and Relations",
            hadithUrdu: "حضرت ابو ذر رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”اپنے مسلمان بھائی کے سامنے تمہارا مسکرانا بھی تمہارے لیے صدقہ (ثواب) ہے۔“",
            hadithEnglish: "Narrated Abu Dharr: The Messenger of Allah (ﷺ) said, 'Your smiling in the face of your brother is charity for you.'"
        },
        {
            header: "Sahih Muslim",
            hadithNumber: "2588",
            bookSlug: "The Book of Virtue and Good Manners",
            hadithUrdu: "حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”صدقہ دینے سے مال میں کبھی کمی نہیں آتی، اور معاف کرنے سے اللہ بندے کی عزت میں اضافہ ہی فرماتا ہے۔“",
            hadithEnglish: "Narrated Abu Huraira: Allah's Messenger (ﷺ) said, 'Charity does not decrease wealth, and no one forgives another except that Allah increases his honor.'"
        }
    ],
    "Patience": [
        {
            header: "Sahih Muslim",
            hadithNumber: "2999",
            bookSlug: "The Book of Zakat and Asceticism",
            hadithUrdu: "حضرت صہیب رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”مومن کا معاملہ بھی کتنا عجیب و خوبصورت ہے! اس کے ہر معاملے میں خیر ہے؛ اگر اسے خوشی ملے اور وہ شکر کرے تو یہ اس کے لیے خیر ہے، اور اگر تکلیف پہنچے اور وہ صبر کرے تو یہ بھی اس کے لیے خیر ہے۔“",
            hadithEnglish: "The Messenger of Allah (ﷺ) said, 'Wonderful is the case of a believer; there is good in every affair of his. If ease comes to him, he thanks Allah and it is good for him; and if hardship afflicts him, he observes patience and it is good for him.'"
        },
        {
            header: "Sahih al-Bukhari",
            hadithNumber: "1469",
            bookSlug: "Book of Zakat",
            hadithUrdu: "رسول اللہ ﷺ نے فرمایا: ”جو شخص صبر کی کوشش کرتا ہے اللہ تعالیٰ اسے صبر کی توفیق عطا فرما دیتا ہے، اور صبر سے زیادہ بہتر اور وسیع نعمت کسی کو نہیں دی گئی۔“",
            hadithEnglish: "The Prophet (ﷺ) said, 'Whoever tries to be patient, Allah will grant him patience. And no one has ever been granted a gift better and more comprehensive than patience.'"
        }
    ],
    "Honesty": [
        {
            header: "Sahih al-Bukhari",
            hadithNumber: "6094",
            bookSlug: "Good Manners and Form (Al-Adab)",
            hadithUrdu: "حضرت عبداللہ رضی اللہ عنہ سے روایت ہے کہ نبی کریم ﷺ نے فرمایا: ”ہمیشہ سچائی کو لازم پکڑو، کیونکہ سچائی نیکی کی طرف رہنمائی کرتی ہے اور نیکی جنت کی طرف لے جاتی ہے، اور انسان سچ بولتا رہتا ہے یہاں تک کہ اللہ کے ہاں سچا لکھ دیا جاتا ہے۔“",
            hadithEnglish: "Narrated Abdullah: The Prophet (ﷺ) said, 'Truthfulness leads to righteousness, and righteousness leads to Paradise. A man continues to tell the truth until he is recorded with Allah as a truthful person.'"
        }
    ],
    "Knowledge": [
        {
            header: "Sunan Ibn Majah",
            hadithNumber: "224",
            bookSlug: "The Book of the Sunnah",
            hadithUrdu: "حضرت انس بن مالک رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”علم دین حاصل کرنا ہر مسلمان پر فرض ہے۔“",
            hadithEnglish: "Narrated Anas bin Malik: The Messenger of Allah (ﷺ) said, 'Seeking knowledge is an obligation upon every Muslim.'"
        },
        {
            header: "Sahih Muslim",
            hadithNumber: "2699",
            bookSlug: "Book of Knowledge (Al-'Ilm)",
            hadithUrdu: "حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”جو شخص علم حاصل کرنے کے راستے پر چلتا ہے، اللہ تعالیٰ اس کے بدلے اس کے لیے جنت کا راستہ آسان فرما دیتا ہے۔“",
            hadithEnglish: "Narrated Abu Huraira: The Messenger of Allah (ﷺ) said, 'Whoever treads a path seeking knowledge, Allah will make easy for him the path to Paradise.'"
        }
    ],
    "Neighbors": [
        {
            header: "Sahih al-Bukhari",
            hadithNumber: "6014",
            bookSlug: "Good Manners and Form (Al-Adab)",
            hadithUrdu: "حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”جو شخص اللہ اور قیامت کے دن پر ایمان رکھتا ہو، اسے چاہیے کہ اپنے پڑوسی کا احترام کرے اور اس کے ساتھ بھلائی کرے۔“",
            hadithEnglish: "Narrated Abu Huraira: Allah's Messenger (ﷺ) said, 'Whoever believes in Allah and the Last Day should honor and be good to his neighbor.'"
        }
    ],
    "Forgiveness": [
        {
            header: "Sahih Muslim",
            hadithNumber: "2588",
            bookSlug: "The Book of Virtue and Good Manners",
            hadithUrdu: "رسول اللہ ﷺ نے فرمایا: ”معاف کر دینے سے اللہ بندے کی عزت اور شرف میں ہی اضافہ فرماتا ہے، اور جو شخص اللہ کی خاطر عاجزی اختیار کرتا ہے اللہ تعالیٰ اسے بلندی عطا فرماتا ہے۔“",
            hadithEnglish: "The Messenger of Allah (ﷺ) said, 'No one forgives another except that Allah increases him in honor, and no one humbles himself for the sake of Allah except that Allah exalts him.'"
        }
    ],
    "Prayer": [
        {
            header: "Sahih al-Bukhari",
            hadithNumber: "528",
            bookSlug: "Times of the Prayers (Mawaqit as-Salat)",
            hadithUrdu: "حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”بتاؤ اگر تم میں سے کسی کے دروازے پر نہر بہتی ہو جس میں وہ روزانہ پانچ بار نہاتا ہو، تو کیا اس کے جسم پر کوئی میل کچیل باقی رہے گا؟ صحابہ نے عرض کیا: نہیں۔ آپ ﷺ نے فرمایا: یہی پانچ نمازوں کی مثال ہے جن کے ذریعے اللہ تمام گناہوں کو مٹا دیتا ہے۔“",
            hadithEnglish: "Narrated Abu Huraira: Allah's Messenger (ﷺ) said, 'If there was a river at the door of anyone of you and he took a bath in it five times a day, would you notice any dirt on him?' They said, 'Not a trace of dirt.' He said, 'That is the example of the five prayers with which Allah blots out evil deeds.'"
        }
    ],
    "Cleanliness": [
        {
            header: "Sahih Muslim",
            hadithNumber: "223",
            bookSlug: "The Book of Purification (Taharah)",
            hadithUrdu: "حضرت ابو مالک اشعری رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”پاکیزگی اور صفائی نصف (آدھا) ایمان ہے۔“",
            hadithEnglish: "Narrated Abu Malik al-Ash'ari: The Messenger of Allah (ﷺ) said, 'Cleanliness and purification is half of faith.'"
        }
    ],
    "Kindness": [
        {
            header: "Sahih Muslim",
            hadithNumber: "2594",
            bookSlug: "The Book of Virtue and Good Manners",
            hadithUrdu: "ام المومنین سیدہ عائشہ رضی اللہ عنہا سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”بے شک نرمی اور مہربانی جس چیز میں بھی ہو اسے خوبصورت اور زینت دار بنا دیتی ہے، اور جس چیز سے نکال لی جائے اسے عیب دار کر دیتی ہے۔“",
            hadithEnglish: "Narrated Aisha: Allah's Messenger (ﷺ) said, 'Kindness is not found in anything but that it adds to its beauty, and it is not withdrawn from anything but that it leaves it defective.'"
        }
    ],
    "Gratitude": [
        {
            header: "Jami at-Tirmidhi",
            hadithNumber: "1954",
            bookSlug: "Chapters on Righteousness and Relations",
            hadithUrdu: "حضرت ابوہریرہ رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”جس انسان نے لوگوں کے احسان کا شکریہ ادا نہیں کیا، اس نے حقیقت میں اللہ کا بھی شکر ادا نہیں کیا۔“",
            hadithEnglish: "Narrated Abu Huraira: The Prophet (ﷺ) said, 'He who does not thank people does not thank Allah.'"
        }
    ],
    "Humility": [
        {
            header: "Sunan Ibn Majah",
            hadithNumber: "4176",
            bookSlug: "The Book of Zuhd",
            hadithUrdu: "حضرت عیاض بن حمار رضی اللہ عنہ سے روایت ہے کہ رسول اللہ ﷺ نے فرمایا: ”بے شک اللہ تعالیٰ نے مجھ پر وحی فرمائی ہے کہ تم سب عاجزی اور انکساری اختیار کرو، تاکہ کوئی شخص کسی دوسرے پر فخر نہ کرے اور کوئی کسی پر زیادتی نہ کرے۔“",
            hadithEnglish: "Narrated Iyad bin Himar: The Messenger of Allah (ﷺ) said, 'Verily, Allah has revealed to me that you should be humble, so that no one boasts over another and no one oppresses another.'"
        }
    ]
};
