// بيانات القرآن الكريم الكاملة
const QuranData = {
    // بيانات القراء
    reciters: [
        { 
            id: 1, 
            name: "مشاري راشد العفاسي", 
            country: "الكويت",
            style: "حدر",
            description: "من أشهر قراء العصر الحديث، يتميز بصوته العذب وأدائه المؤثر",
            code: "afs"
        },
        { 
            id: 2, 
            name: "سعد الغامدي", 
            country: "السعودية",
            style: "تحقيق",
            description: "قارئ سعودي شهير، يتميز بأدائه المتقن وتلاوته الواضحة",
            code: "sga"
        },
        { 
            id: 3, 
            name: "عبد الباسط عبد الصمد", 
            country: "مصر",
            style: "حدر",
            description: "من أشهر قراء القرآن في العالم الإسلامي، صاحب الصوت الذهبي",
            code: "abs"
        },
        { 
            id: 4, 
            name: "محمود خليل الحصري", 
            country: "مصر",
            style: "تحقيق",
            description: "شيخ المقارئ المصرية، أول من سجل القرآن برواية حفص",
            code: "hqr"
        },
        { 
            id: 5, 
            name: "محمد صديق المنشاوي", 
            country: "مصر",
            style: "ترتيل",
            description: "من أبرز قراء القرآن في القرن العشرين، صاحب التلاوة الباكية",
            code: "mms"
        },
        { 
            id: 6, 
            name: "عبد الرحمن السديس", 
            country: "السعودية",
            style: "ترتيل",
            description: "إمام الحرم المكي، يتميز بأدائه الهادئ والمؤثر",
            code: "ars"
        },
        { 
            id: 7, 
            name: "ياسر الدوسري", 
            country: "السعودية",
            style: "حدر",
            description: "قارئ سعودي شاب، يتميز بصوته القوي وأدائه المميز",
            code: "yad"
        },
        { 
            id: 8, 
            name: "أحمد العجمي", 
            country: "السعودية",
            style: "تحقيق",
            description: "قارئ سعودي شهير، يتميز بصوته الجهوري وأدائه المتقن",
            code: "aja"
        },
        { 
            id: 9, 
            name: "أبو بكر الشاطري", 
            country: "اليمن",
            style: "ترتيل",
            description: "قارئ يمني شهير، يتميز بأدائه العذب وتلاوته الهادئة",
            code: "abs"
        },
        { 
            id: 10, 
            name: "خالد الجليل", 
            country: "السعودية",
            style: "حدر",
            description: "قارئ سعودي، يتميز بصوته العذب وأدائه المؤثر",
            code: "kag"
        }
    ],
    
    // بيانات جميع سور القرآن الكريم (114 سورة)
    surahs: [
        { id: 1, name: "الفاتحة", ayahs: 7, type: "مكية", startPage: 1, endPage: 1 },
        { id: 2, name: "البقرة", ayahs: 286, type: "مدنية", startPage: 2, endPage: 49 },
        { id: 3, name: "آل عمران", ayahs: 200, type: "مدنية", startPage: 50, endPage: 76 },
        { id: 4, name: "النساء", ayahs: 176, type: "مدنية", startPage: 77, endPage: 106 },
        { id: 5, name: "المائدة", ayahs: 120, type: "مدنية", startPage: 106, endPage: 127 },
        { id: 6, name: "الأنعام", ayahs: 165, type: "مكية", startPage: 128, endPage: 150 },
        { id: 7, name: "الأعراف", ayahs: 206, type: "مكية", startPage: 151, endPage: 176 },
        { id: 8, name: "الأنفال", ayahs: 75, type: "مدنية", startPage: 177, endPage: 186 },
        { id: 9, name: "التوبة", ayahs: 129, type: "مدنية", startPage: 187, endPage: 207 },
        { id: 10, name: "يونس", ayahs: 109, type: "مكية", startPage: 208, endPage: 221 },
        { id: 11, name: "هود", ayahs: 123, type: "مكية", startPage: 221, endPage: 235 },
        { id: 12, name: "يوسف", ayahs: 111, type: "مكية", startPage: 235, endPage: 248 },
        { id: 13, name: "الرعد", ayahs: 43, type: "مدنية", startPage: 249, endPage: 255 },
        { id: 14, name: "إبراهيم", ayahs: 52, type: "مكية", startPage: 255, endPage: 261 },
        { id: 15, name: "الحجر", ayahs: 99, type: "مكية", startPage: 262, endPage: 267 },
        { id: 16, name: "النحل", ayahs: 128, type: "مكية", startPage: 267, endPage: 281 },
        { id: 17, name: "الإسراء", ayahs: 111, type: "مكية", startPage: 282, endPage: 293 },
        { id: 18, name: "الكهف", ayahs: 110, type: "مكية", startPage: 293, endPage: 304 },
        { id: 19, name: "مريم", ayahs: 98, type: "مكية", startPage: 305, endPage: 312 },
        { id: 20, name: "طه", ayahs: 135, type: "مكية", startPage: 312, endPage: 321 },
        { id: 21, name: "الأنبياء", ayahs: 112, type: "مكية", startPage: 322, endPage: 331 },
        { id: 22, name: "الحج", ayahs: 78, type: "مدنية", startPage: 332, endPage: 341 },
        { id: 23, name: "المؤمنون", ayahs: 118, type: "مكية", startPage: 342, endPage: 349 },
        { id: 24, name: "النور", ayahs: 64, type: "مدنية", startPage: 350, endPage: 359 },
        { id: 25, name: "الفرقان", ayahs: 77, type: "مكية", startPage: 359, endPage: 366 },
        { id: 26, name: "الشعراء", ayahs: 227, type: "مكية", startPage: 367, endPage: 376 },
        { id: 27, name: "النمل", ayahs: 93, type: "مكية", startPage: 377, endPage: 385 },
        { id: 28, name: "القصص", ayahs: 88, type: "مكية", startPage: 385, endPage: 396 },
        { id: 29, name: "العنكبوت", ayahs: 69, type: "مكية", startPage: 396, endPage: 404 },
        { id: 30, name: "الروم", ayahs: 60, type: "مكية", startPage: 404, endPage: 410 },
        { id: 31, name: "لقمان", ayahs: 34, type: "مكية", startPage: 411, endPage: 414 },
        { id: 32, name: "السجدة", ayahs: 30, type: "مكية", startPage: 415, endPage: 417 },
        { id: 33, name: "الأحزاب", ayahs: 73, type: "مدنية", startPage: 418, endPage: 427 },
        { id: 34, name: "سبأ", ayahs: 54, type: "مكية", startPage: 428, endPage: 434 },
        { id: 35, name: "فاطر", ayahs: 45, type: "مكية", startPage: 434, endPage: 440 },
        { id: 36, name: "يس", ayahs: 83, type: "مكية", startPage: 440, endPage: 445 },
        { id: 37, name: "الصافات", ayahs: 182, type: "مكية", startPage: 446, endPage: 452 },
        { id: 38, name: "ص", ayahs: 88, type: "مكية", startPage: 453, endPage: 458 },
        { id: 39, name: "الزمر", ayahs: 75, type: "مكية", startPage: 458, endPage: 467 },
        { id: 40, name: "غافر", ayahs: 85, type: "مكية", startPage: 467, endPage: 476 },
        { id: 41, name: "فصلت", ayahs: 54, type: "مكية", startPage: 476, endPage: 483 },
        { id: 42, name: "الشورى", ayahs: 53, type: "مكية", startPage: 483, endPage: 489 },
        { id: 43, name: "الزخرف", ayahs: 89, type: "مكية", startPage: 489, endPage: 495 },
        { id: 44, name: "الدخان", ayahs: 59, type: "مكية", startPage: 495, endPage: 498 },
        { id: 45, name: "الجاثية", ayahs: 37, type: "مكية", startPage: 499, endPage: 502 },
        { id: 46, name: "الأحقاف", ayahs: 35, type: "مكية", startPage: 502, endPage: 506 },
        { id: 47, name: "محمد", ayahs: 38, type: "مدنية", startPage: 507, endPage: 510 },
        { id: 48, name: "الفتح", ayahs: 29, type: "مدنية", startPage: 511, endPage: 515 },
        { id: 49, name: "الحجرات", ayahs: 18, type: "مدنية", startPage: 515, endPage: 517 },
        { id: 50, name: "ق", ayahs: 45, type: "مكية", startPage: 518, endPage: 520 },
        { id: 51, name: "الذاريات", ayahs: 60, type: "مكية", startPage: 520, endPage: 523 },
        { id: 52, name: "الطور", ayahs: 49, type: "مكية", startPage: 523, endPage: 525 },
        { id: 53, name: "النجم", ayahs: 62, type: "مكية", startPage: 526, endPage: 528 },
        { id: 54, name: "القمر", ayahs: 55, type: "مكية", startPage: 528, endPage: 531 },
        { id: 55, name: "الرحمن", ayahs: 78, type: "مدنية", startPage: 531, endPage: 534 },
        { id: 56, name: "الواقعة", ayahs: 96, type: "مكية", startPage: 534, endPage: 537 },
        { id: 57, name: "الحديد", ayahs: 29, type: "مدنية", startPage: 537, endPage: 541 },
        { id: 58, name: "المجادلة", ayahs: 22, type: "مدنية", startPage: 542, endPage: 545 },
        { id: 59, name: "الحشر", ayahs: 24, type: "مدنية", startPage: 545, endPage: 548 },
        { id: 60, name: "الممتحنة", ayahs: 13, type: "مدنية", startPage: 549, endPage: 551 },
        { id: 61, name: "الصف", ayahs: 14, type: "مدنية", startPage: 551, endPage: 552 },
        { id: 62, name: "الجمعة", ayahs: 11, type: "مدنية", startPage: 553, endPage: 554 },
        { id: 63, name: "المنافقون", ayahs: 11, type: "مدنية", startPage: 554, endPage: 555 },
        { id: 64, name: "التغابن", ayahs: 18, type: "مدنية", startPage: 556, endPage: 557 },
        { id: 65, name: "الطلاق", ayahs: 12, type: "مدنية", startPage: 558, endPage: 559 },
        { id: 66, name: "التحريم", ayahs: 12, type: "مدنية", startPage: 559, endPage: 560 },
        { id: 67, name: "الملك", ayahs: 30, type: "مكية", startPage: 561, endPage: 564 },
        { id: 68, name: "القلم", ayahs: 52, type: "مكية", startPage: 564, endPage: 566 },
        { id: 69, name: "الحاقة", ayahs: 52, type: "مكية", startPage: 566, endPage: 568 },
        { id: 70, name: "المعارج", ayahs: 44, type: "مكية", startPage: 568, endPage: 570 },
        { id: 71, name: "نوح", ayahs: 28, type: "مكية", startPage: 570, endPage: 571 },
        { id: 72, name: "الجن", ayahs: 28, type: "مكية", startPage: 572, endPage: 573 },
        { id: 73, name: "المزمل", ayahs: 20, type: "مكية", startPage: 574, endPage: 575 },
        { id: 74, name: "المدثر", ayahs: 56, type: "مكية", startPage: 575, endPage: 577 },
        { id: 75, name: "القيامة", ayahs: 40, type: "مكية", startPage: 577, endPage: 578 },
        { id: 76, name: "الإنسان", ayahs: 31, type: "مدنية", startPage: 578, endPage: 580 },
        { id: 77, name: "المرسلات", ayahs: 50, type: "مكية", startPage: 580, endPage: 581 },
        { id: 78, name: "النبأ", ayahs: 40, type: "مكية", startPage: 582, endPage: 583 },
        { id: 79, name: "النازعات", ayahs: 46, type: "مكية", startPage: 583, endPage: 584 },
        { id: 80, name: "عبس", ayahs: 42, type: "مكية", startPage: 585, endPage: 586 },
        { id: 81, name: "التكوير", ayahs: 29, type: "مكية", startPage: 586, endPage: 587 },
        { id: 82, name: "الانفطار", ayahs: 19, type: "مكية", startPage: 587, endPage: 587 },
        { id: 83, name: "المطففين", ayahs: 36, type: "مكية", startPage: 587, endPage: 589 },
        { id: 84, name: "الانشقاق", ayahs: 25, type: "مكية", startPage: 589, endPage: 590 },
        { id: 85, name: "البروج", ayahs: 22, type: "مكية", startPage: 590, endPage: 591 },
        { id: 86, name: "الطارق", ayahs: 17, type: "مكية", startPage: 591, endPage: 591 },
        { id: 87, name: "الأعلى", ayahs: 19, type: "مكية", startPage: 591, endPage: 592 },
        { id: 88, name: "الغاشية", ayahs: 26, type: "مكية", startPage: 592, endPage: 593 },
        { id: 89, name: "الفجر", ayahs: 30, type: "مكية", startPage: 593, endPage: 594 },
        { id: 90, name: "البلد", ayahs: 20, type: "مكية", startPage: 594, endPage: 595 },
        { id: 91, name: "الشمس", ayahs: 15, type: "مكية", startPage: 595, endPage: 595 },
        { id: 92, name: "الليل", ayahs: 21, type: "مكية", startPage: 595, endPage: 596 },
        { id: 93, name: "الضحى", ayahs: 11, type: "مكية", startPage: 596, endPage: 596 },
        { id: 94, name: "الشرح", ayahs: 8, type: "مكية", startPage: 596, endPage: 596 },
        { id: 95, name: "التين", ayahs: 8, type: "مكية", startPage: 597, endPage: 597 },
        { id: 96, name: "العلق", ayahs: 19, type: "مكية", startPage: 597, endPage: 597 },
        { id: 97, name: "القدر", ayahs: 5, type: "مكية", startPage: 597, endPage: 598 },
        { id: 98, name: "البينة", ayahs: 8, type: "مدنية", startPage: 598, endPage: 599 },
        { id: 99, name: "الزلزلة", ayahs: 8, type: "مدنية", startPage: 599, endPage: 599 },
        { id: 100, name: "العاديات", ayahs: 11, type: "مكية", startPage: 599, endPage: 600 },
        { id: 101, name: "القارعة", ayahs: 11, type: "مكية", startPage: 600, endPage: 600 },
        { id: 102, name: "التكاثر", ayahs: 8, type: "مكية", startPage: 600, endPage: 601 },
        { id: 103, name: "العصر", ayahs: 3, type: "مكية", startPage: 601, endPage: 601 },
        { id: 104, name: "الهمزة", ayahs: 9, type: "مكية", startPage: 601, endPage: 601 },
        { id: 105, name: "الفيل", ayahs: 5, type: "مكية", startPage: 601, endPage: 601 },
        { id: 106, name: "قريش", ayahs: 4, type: "مكية", startPage: 601, endPage: 602 },
        { id: 107, name: "الماعون", ayahs: 7, type: "مكية", startPage: 602, endPage: 602 },
        { id: 108, name: "الكوثر", ayahs: 3, type: "مكية", startPage: 602, endPage: 602 },
        { id: 109, name: "الكافرون", ayahs: 6, type: "مكية", startPage: 602, endPage: 603 },
        { id: 110, name: "النصر", ayahs: 3, type: "مدنية", startPage: 603, endPage: 603 },
        { id: 111, name: "المسد", ayahs: 5, type: "مكية", startPage: 603, endPage: 603 },
        { id: 112, name: "الإخلاص", ayahs: 4, type: "مكية", startPage: 603, endPage: 604 },
        { id: 113, name: "الفلق", ayahs: 5, type: "مكية", startPage: 604, endPage: 604 },
        { id: 114, name: "الناس", ayahs: 6, type: "مكية", startPage: 604, endPage: 604 }
    ],
    
    // جميع آيات القرآن الكريم
    ayahs: {},
    
    // تفسير القرآن الكريم
    tafseer: {},
    
    // تهيئة بيانات القرآن
    init: function() {
        this.loadAyahs();
        this.loadTafseer();
        console.log('تم تحميل بيانات القرآن الكريم بنجاح');
    },
    
    // تحميل آيات القرآن (نموذج مبسط)
    loadAyahs: function() {
        // بيانات آيات سورة الفاتحة
        this.ayahs[1] = [
            { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "بسم الله الرحمن الرحيم" },
            { number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "الحمد لله رب العالمين" },
            { number: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "الرحمن الرحيم" },
            { number: 4, text: "مَالِكِ يَوْمِ الدِّينِ", translation: "مالك يوم الدين" },
            { number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "إياك نعبد وإياك نستعين" },
            { number: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "اهدنا الصراط المستقيم" },
            { number: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين" }
        ];
        
        // بيانات آيات سورة البقرة (الجزء الأول)
        this.ayahs[2] = [
            { number: 1, text: "الم", translation: "ألف لام ميم" },
            { number: 2, text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِلْمُتَّقِينَ", translation: "ذلك الكتاب لا ريب فيه هدى للمتقين" },
            { number: 3, text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ", translation: "الذين يؤمنون بالغيب ويقيمون الصلاة ومما رزقناهم ينفقون" },
            { number: 4, text: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ", translation: "والذين يؤمنون بما أنزل إليك وما أنزل من قبلك وبالآخرة هم يوقنون" },
            { number: 5, text: "أُولَٰئِكَ عَلَىٰ هُدًى مِنْ رَبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", translation: "أولئك على هدى من ربهم وأولئك هم المفلحون" }
        ];
        
        // بيانات آيات سورة الإخلاص
        this.ayahs[112] = [
            { number: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "قل هو الله أحد" },
            { number: 2, text: "اللَّهُ الصَّمَدُ", translation: "الله الصمد" },
            { number: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "لم يلد ولم يولد" },
            { number: 4, text: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", translation: "ولم يكن له كفوا أحد" }
        ];
        
        // بيانات آيات سورة الناس
        this.ayahs[114] = [
            { number: 1, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", translation: "قل أعوذ برب الناس" },
            { number: 2, text: "مَلِكِ النَّاسِ", translation: "ملك الناس" },
            { number: 3, text: "إِلَٰهِ النَّاسِ", translation: "إله الناس" },
            { number: 4, text: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", translation: "من شر الوسواس الخناس" },
            { number: 5, text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", translation: "الذي يوسوس في صدور الناس" },
            { number: 6, text: "مِنَ الْجِنَّةِ وَالنَّاسِ", translation: "من الجنة والناس" }
        ];
        
        // في التطبيق الكامل، سيتم تحميل جميع آيات القرآن هنا
        // هذا مجرد نموذج للتوضيح
    },
    
    // تحميل تفسير القرآن (نموذج مبسط)
    loadTafseer: function() {
        // تفسير سورة الفاتحة
        this.tafseer[1] = [
            { 
                number: 1, 
                text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", 
                tafseer: "أبدأ قراءتي متبركًا باسم الله وحده لا شريك له، مستعينًا به في جميع أموري، وهو الرحمن الرحيم الذي وسعت رحمته كل شيء" 
            },
            { 
                number: 2, 
                text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", 
                tafseer: "الثناء على الله بصفاته التي كلها صفات كمال، وبنعمه الظاهرة والباطنة، الدينية والدنيوية، وهو المنعم بتلك النعم، وخالق الخلق، ومالك شئونهم، والمربي لجميع العالمين" 
            },
            { 
                number: 3, 
                text: "الرَّحْمَٰنِ الرَّحِيمِ", 
                tafseer: "الرحمن الرحيم من أسماء الله الحسنى الدالة على اتصافه بالرحمة الواسعة التي وسعت كل شيء" 
            },
            { 
                number: 4, 
                text: "مَالِكِ يَوْمِ الدِّينِ", 
                tafseer: "المنفرد بالملك والتصرف والحكم يوم الجزاء، وهو يوم القيامة، يوم يدان الناس فيه بأعمالهم" 
            },
            { 
                number: 5, 
                text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", 
                tafseer: "إياك وحدك نعبد، ولا نعبد غيرك، وإياك نستعين في جميع أمورنا، ولا نستعين بأحد سواك" 
            },
            { 
                number: 6, 
                text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", 
                tafseer: "أرشدنا ودُلَّنا إلى الطريق المستقيم، وثبتنا عليه حتى نلقاك، وهو الإسلام الذي هو الطريق الواضح المؤدي إلى رضوان الله وجنته" 
            },
            { 
                number: 7, 
                text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", 
                tafseer: "طريق الذين أنعمت عليهم من النبيين والصديقين والشهداء والصالحين، غير طريق المغضوب عليهم الذين عرفوا الحق ولم يعملوا به كاليهود، ولا طريق الضالين الذين عملوا بغير علم كالنصارى" 
            }
        ];
        
        // في التطبيق الكامل، سيتم تحميل جميع التفاسير هنا
        // هذا مجرد نموذج للتوضيح
    }
};
