// مشغل القرآن الكريم الكامل
const QuranPlayer = {
    // حالات التطبيق
    state: {
        currentReciter: null,
        currentSurah: null,
        currentAyah: 1,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        repeatMode: false,
        bookmarks: [],
        nightMode: false,
        fontSize: 'medium',
        audioUrls: {},
        isLoading: false
    },
    
    // عناصر DOM
    elements: {},
    
    // تهيئة التطبيق
    init: function() {
        // تهيئة بيانات القرآن
        QuranData.init();
        
        // تخزين عناصر DOM
        this.cacheElements();
        
        // تحميل الحالة من التخزين المحلي
        this.loadState();
        
        // تهيئة واجهة المستخدم
        this.initUI();
        
        // إعداد مستمعي الأحداث
        this.setupEventListeners();
        
        // إعداد مشغل الصوت
        this.setupAudioPlayer();
        
        // تحديث واجهة المستخدم
        this.updateUI();
        
        // تحديث سنة التذييل
        document.getElementById('current-year').textContent = new Date().getFullYear();
        
        console.log('تم تهيئة مشغل القرآن الكريم بنجاح');
    },
    
    // تخزين عناصر DOM
    cacheElements: function() {
        this.elements = {
            // الأزرار
            nightModeBtn: document.getElementById('night-mode-btn'),
            bookmarksBtn: document.getElementById('bookmarks-btn'),
            fontSizeBtn: document.getElementById('font-size-btn'),
            infoBtn: document.getElementById('info-btn'),
            playPauseBtn: document.getElementById('play-pause'),
            prevAyahBtn: document.getElementById('prev-ayah'),
            nextAyahBtn: document.getElementById('next-ayah'),
            rewindBtn: document.getElementById('rewind'),
            forwardBtn: document.getElementById('forward'),
            repeatBtn: document.getElementById('repeat-btn'),
            bookmarkAyahBtn: document.getElementById('bookmark-ayah-btn'),
            shareAyahBtn: document.getElementById('share-ayah-btn'),
            copyAyahBtn: document.getElementById('copy-ayah-btn'),
            closeAlert: document.getElementById('close-alert'),
            
            // القوائم
            surahList: document.getElementById('surah-list'),
            recitersList: document.getElementById('reciters-list'),
            recitersSidebarList: document.getElementById('reciters-sidebar-list'),
            bookmarksList: document.getElementById('bookmarks-list'),
            
            // عرض المعلومات
            nowPlayingText: document.getElementById('now-playing-text'),
            surahInfo: document.getElementById('surah-info'),
            currentSurahName: document.getElementById('current-surah-name'),
            currentSurahAyahs: document.getElementById('current-surah-ayahs'),
            currentSurahType: document.getElementById('current-surah-type'),
            ayahText: document.getElementById('ayah-text'),
            ayahTranslation: document.getElementById('ayah-translation'),
            ayahNumber: document.getElementById('ayah-number'),
            
            // عناصر المشغل
            currentTime: document.getElementById('current-time'),
            duration: document.getElementById('duration'),
            progress: document.getElementById('progress'),
            progressBar: document.getElementById('progress-bar'),
            audioPlayer: document.getElementById('audio-player'),
            
            // الحاويات
            ayahsContainer: document.getElementById('ayahs-container'),
            tafseerContainer: document.getElementById('tafseer-container'),
            
            // البحث والتبويبات
            surahSearch: document.getElementById('surah-search'),
            tabs: document.querySelectorAll('.tab'),
            tabContents: document.querySelectorAll('.tab-content'),
            
            // التنبيهات
            alert: document.getElementById('alert'),
            alertMessage: document.getElementById('alert-message')
        };
    },
    
    // تهيئة واجهة المستخدم
    initUI: function() {
        // عرض السور
        this.renderSurahs();
        
        // عرض القراء
        this.renderReciters();
        
        // عرض الإشارات المرجعية
        this.renderBookmarks();
        
        // تعيين سورة افتراضية
        if (!this.state.currentSurah && QuranData.surahs.length > 0) {
            this.state.currentSurah = QuranData.surahs[0];
        }
        
        // تعيين قارئ افتراضي
        if (!this.state.currentReciter && QuranData.reciters.length > 0) {
            this.state.currentReciter = QuranData.reciters[0];
        }
        
        // تحديث واجهة المستخدم
        this.updateUI();
        
        // تحميل آيات السورة الحالية
        if (this.state.currentSurah) {
            this.renderAyahs();
            this.renderTafseer();
        }
    },
    
    // تحميل الحالة من التخزين المحلي
    loadState: function() {
        try {
            const savedState = localStorage.getItem('quranPlayerState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                
                // تحميل وضع الليل
                this.state.nightMode = parsedState.nightMode || false;
                if (this.state.nightMode) {
                    document.body.classList.add('dark-mode');
                }
                
                // تحميل الإشارات المرجعية
                this.state.bookmarks = parsedState.bookmarks || [];
                
                // تحميل حجم الخط
                this.state.fontSize = parsedState.fontSize || 'medium';
                this.applyFontSize();
                
                // تحميل القارئ الحالي
                if (parsedState.currentReciter) {
                    this.state.currentReciter = QuranData.reciters.find(
                        r => r.id === parsedState.currentReciter.id
                    );
                }
                
                // تحميل السورة الحالية
                if (parsedState.currentSurah) {
                    this.state.currentSurah = QuranData.surahs.find(
                        s => s.id === parsedState.currentSurah.id
                    );
                    this.state.currentAyah = parsedState.currentAyah || 1;
                }
                
                // تحميل وضع التكرار
                this.state.repeatMode = parsedState.repeatMode || false;
            }
        } catch (error) {
            console.error('خطأ في تحميل الحالة:', error);
            this.showAlert('تعذر تحميل الإعدادات السابقة');
        }
    },
    
    // حفظ الحالة في التخزين المحلي
    saveState: function() {
        try {
            const stateToSave = {
                nightMode: this.state.nightMode,
                bookmarks: this.state.bookmarks,
                fontSize: this.state.fontSize,
                currentReciter: this.state.currentReciter ? {
                    id: this.state.currentReciter.id,
                    name: this.state.currentReciter.name
                } : null,
                currentSurah: this.state.currentSurah ? {
                    id: this.state.currentSurah.id,
                    name: this.state.currentSurah.name
                } : null,
                currentAyah: this.state.currentAyah,
                repeatMode: this.state.repeatMode
            };
            
            localStorage.setItem('quranPlayerState', JSON.stringify(stateToSave));
        } catch (error) {
            console.error('خطأ في حفظ الحالة:', error);
        }
    },
    
    // تطبيق حجم الخط
    applyFontSize: function() {
        let size;
        switch(this.state.fontSize) {
            case 'small': size = '1.3rem'; break;
            case 'medium': size = '1.6rem'; break;
            case 'large': size = '2rem'; break;
            case 'x-large': size = '2.5rem'; break;
            default: size = '1.6rem';
        }
        
        this.elements.ayahText.style.fontSize = size;
    },
    
    // عرض السور
    renderSurahs: function() {
        const surahListElement = this.elements.surahList;
        if (!surahListElement) return;
        
        surahListElement.innerHTML = '';
        
        QuranData.surahs.forEach(surah => {
            const surahItem = document.createElement('li');
            surahItem.className = 'surah-item';
            
            if (this.state.currentSurah && surah.id === this.state.currentSurah.id) {
                surahItem.classList.add('active');
            }
            
            surahItem.innerHTML = `
                <div>
                    <div class="surah-name">${surah.name}</div>
                    <div class="surah-details">${surah.ayahs} آية - ${surah.type}</div>
                </div>
                <div class="ayah-number-small">${surah.id}</div>
            `;
            
            surahItem.addEventListener('click', () => {
                this.selectSurah(surah);
            });
            
            surahListElement.appendChild(surahItem);
        });
    },
    
    // عرض القراء
    renderReciters: function() {
        const recitersListElement = this.elements.recitersList;
        const recitersSidebarListElement = this.elements.recitersSidebarList;
        
        if (!recitersListElement || !recitersSidebarListElement) return;
        
        recitersListElement.innerHTML = '';
        recitersSidebarListElement.innerHTML = '';
        
        QuranData.reciters.forEach(reciter => {
            const reciterItem = document.createElement('li');
            reciterItem.className = 'reciter-item';
            
            if (this.state.currentReciter && reciter.id === this.state.currentReciter.id) {
                reciterItem.classList.add('active');
            }
            
            reciterItem.innerHTML = `
                <div class="reciter-info">
                    <div class="reciter-name">${reciter.name}</div>
                    <div class="reciter-country">${reciter.country} - ${reciter.style}</div>
                </div>
                <i class="fas fa-microphone"></i>
            `;
            
            reciterItem.addEventListener('click', () => {
                this.selectReciter(reciter);
            });
            
            recitersListElement.appendChild(reciterItem.cloneNode(true));
            recitersSidebarListElement.appendChild(reciterItem);
        });
    },
    
    // عرض الإشارات المرجعية
    renderBookmarks: function() {
        const bookmarksListElement = this.elements.bookmarksList;
        if (!bookmarksListElement) return;
        
        if (this.state.bookmarks.length === 0) {
            bookmarksListElement.innerHTML = `
                <li class="bookmark-item empty-bookmarks">
                    <div>لا توجد إشارات مرجعية</div>
                </li>
            `;
            document.getElementById('bookmarks-count').textContent = '0';
            return;
        }
        
        bookmarksListElement.innerHTML = '';
        document.getElementById('bookmarks-count').textContent = this.state.bookmarks.length;
        
        this.state.bookmarks.forEach((bookmark, index) => {
            const surah = QuranData.surahs.find(s => s.id === bookmark.surahId);
            if (!surah) return;
            
            const surahAyahs = QuranData.ayahs[bookmark.surahId];
            const ayahText = surahAyahs && surahAyahs.find(a => a.number === bookmark.ayah) 
                ? surahAyahs.find(a => a.number === bookmark.ayah).text 
                : 'الآية';
            
            const bookmarkItem = document.createElement('li');
            bookmarkItem.className = 'bookmark-item';
            
            bookmarkItem.innerHTML = `
                <div>
                    <div class="bookmark-ayah">${ayahText.substring(0, 50)}${ayahText.length > 50 ? '...' : ''}</div>
                    <div class="bookmark-info">سورة ${surah.name} - الآية ${bookmark.ayah}</div>
                </div>
                <div class="bookmark-actions">
                    <button class="bookmark-action-btn goto-bookmark" data-index="${index}">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="bookmark-action-btn delete-bookmark" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            bookmarksListElement.appendChild(bookmarkItem);
        });
        
        // إضافة مستمعي الأحداث للإشارات المرجعية
        document.querySelectorAll('.goto-bookmark').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.goto-bookmark').dataset.index);
                this.goToBookmark(index);
            });
        });
        
        document.querySelectorAll('.delete-bookmark').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('.delete-bookmark').dataset.index);
                this.deleteBookmark(index);
            });
        });
    },
    
    // اختيار سورة
    selectSurah: function(surah) {
        this.state.currentSurah = surah;
        this.state.currentAyah = 1;
        
        // تحديث واجهة المستخدم
        this.updateUI();
        this.renderSurahs();
        this.renderAyahs();
        this.renderTafseer();
        
        // إعادة تعيين التشغيل
        this.resetPlayback();
        
        // حفظ الحالة
        this.saveState();
        
        this.showAlert(`تم اختيار سورة ${surah.name}`);
    },
    
    // اختيار قارئ
    selectReciter: function(reciter) {
        this.state.currentReciter = reciter;
        
        // تحديث واجهة المستخدم
        this.updateUI();
        this.renderReciters();
        
        // حفظ الحالة
        this.saveState();
        
        this.showAlert(`تم اختيار القارئ ${reciter.name}`);
    },
    
    // تحديث واجهة المستخدم
    updateUI: function() {
        if (this.state.currentSurah && this.state.currentReciter) {
            this.elements.nowPlayingText.textContent = 
                `${this.state.currentReciter.name} - سورة ${this.state.currentSurah.name}`;
            
            this.elements.currentSurahName.textContent = this.state.currentSurah.name;
            this.elements.currentSurahAyahs.textContent = this.state.currentSurah.ayahs;
            this.elements.currentSurahType.textContent = this.state.currentSurah.type;
            
            this.elements.surahInfo.textContent = 
                `سورة ${this.state.currentSurah.name} - ${this.state.currentSurah.ayahs} آية - ${this.state.currentSurah.type}`;
            
            // تحديث عرض الآية الحالية
            this.updateAyahDisplay();
            
            // تحديث زر التكرار
            this.elements.repeatBtn.classList.toggle('active', this.state.repeatMode);
        }
    },
    
    // تحديث عرض الآية الحالية
    updateAyahDisplay: function() {
        if (!this.state.currentSurah) return;
        
        const surahAyahs = QuranData.ayahs[this.state.currentSurah.id];
        if (!surahAyahs) return;
        
        const currentAyah = surahAyahs.find(a => a.number === this.state.currentAyah);
        if (!currentAyah) return;
        
        this.elements.ayahText.textContent = currentAyah.text;
        this.elements.ayahTranslation.textContent = currentAyah.translation;
        this.elements.ayahNumber.textContent = this.state.currentAyah;
        
        // تحديث زر الإشارة المرجعية
        const isBookmarked = this.state.bookmarks.some(b => 
            b.surahId === this.state.currentSurah.id && b.ayah === this.state.currentAyah);
        
        const bookmarkBtn = this.elements.bookmarkAyahBtn;
        bookmarkBtn.innerHTML = `<i class="${isBookmarked ? 'fas' : 'far'} fa-bookmark"></i> ${isBookmarked ? 'محفوظة' : 'حفظ'}`;
        
        if (isBookmarked) {
            bookmarkBtn.classList.add('active');
        } else {
            bookmarkBtn.classList.remove('active');
        }
    },
    
    // عرض آيات السورة
    renderAyahs: function() {
        const ayahsContainer = this.elements.ayahsContainer;
        if (!ayahsContainer) return;
        
        if (!this.state.currentSurah) {
            ayahsContainer.innerHTML = '<div class="loading">اختر سورة لعرض آياتها</div>';
            return;
        }
        
        const surahAyahs = QuranData.ayahs[this.state.currentSurah.id];
        if (!surahAyahs || surahAyahs.length === 0) {
            ayahsContainer.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner fa-spin"></i> جاري تحميل آيات سورة ${this.state.currentSurah.name}...
                    <p style="margin-top: 10px; font-size: 0.9rem;">في التطبيق الكامل، ستكون جميع آيات القرآن متاحة</p>
                </div>
            `;
            return;
        }
        
        ayahsContainer.innerHTML = '';
        
        surahAyahs.forEach(ayah => {
            const ayahElement = document.createElement('div');
            ayahElement.className = 'surah-ayah';
            if (ayah.number === this.state.currentAyah) {
                ayahElement.classList.add('active');
            }
            
            ayahElement.innerHTML = `
                <span>${ayah.text}</span>
                <span class="ayah-number-small">${ayah.number}</span>
            `;
            
            ayahElement.addEventListener('click', () => {
                this.state.currentAyah = ayah.number;
                this.updateAyahDisplay();
                this.renderAyahs();
                this.renderTafseer();
                this.saveState();
            });
            
            ayahsContainer.appendChild(ayahElement);
        });
    },
    
    // عرض تفسير السورة
    renderTafseer: function() {
        const tafseerContainer = this.elements.tafseerContainer;
        if (!tafseerContainer) return;
        
        if (!this.state.currentSurah) {
            tafseerContainer.innerHTML = '<div class="loading">اختر سورة لعرض تفسيرها</div>';
            return;
        }
        
        const surahTafseer = QuranData.tafseer[this.state.currentSurah.id];
        if (!surahTafseer || surahTafseer.length === 0) {
            tafseerContainer.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner fa-spin"></i> جاري تحميل تفسير سورة ${this.state.currentSurah.name}...
                    <p style="margin-top: 10px; font-size: 0.9rem;">في التطبيق الكامل، ستكون تفسيرات جميع آيات القرآن متاحة</p>
                </div>
            `;
            return;
        }
        
        tafseerContainer.innerHTML = '';
        
        surahTafseer.forEach(item => {
            const tafseerElement = document.createElement('div');
            tafseerElement.className = 'surah-ayah';
            if (item.number === this.state.currentAyah) {
                tafseerElement.classList.add('active');
            }
            
            tafseerElement.innerHTML = `
                <div style="margin-bottom: 10px;">
                    <strong>الآية ${item.number}:</strong> ${item.text}
                </div>
                <div style="color: #666; font-size: 1rem; font-family: 'Segoe UI', sans-serif;">
                    <strong>التفسير:</strong> ${item.tafseer}
                </div>
                <span class="ayah-number-small">${item.number}</span>
            `;
            
            tafseerElement.addEventListener('click', () => {
                this.state.currentAyah = item.number;
                this.updateAyahDisplay();
                this.renderAyahs();
                this.renderTafseer();
                this.saveState();
            });
            
            tafseerContainer.appendChild(tafseerElement);
        });
    },
    
    // إعداد مستمعي الأحداث
    setupEventListeners: function() {
        // أزرار التحكم
        this.elements.nightModeBtn.addEventListener('click', () => this.toggleNightMode());
        this.elements.fontSizeBtn.addEventListener('click', () => this.cycleFontSize());
        this.elements.infoBtn.addEventListener('click', () => this.showInfo());
        this.elements.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.elements.prevAyahBtn.addEventListener('click', () => this.prevAyah());
        this.elements.nextAyahBtn.addEventListener('click', () => this.nextAyah());
        this.elements.rewindBtn.addEventListener('click', () => this.rewind());
        this.elements.forwardBtn.addEventListener('click', () => this.forward());
        this.elements.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.elements.bookmarkAyahBtn.addEventListener('click', () => this.toggleBookmark());
        this.elements.shareAyahBtn.addEventListener('click', () => this.shareAyah());
        this.elements.copyAyahBtn.addEventListener('click', () => this.copyAyah());
        this.elements.closeAlert.addEventListener('click', () => this.hideAlert());
        
        // شريط التقدم
        this.elements.progressBar.addEventListener('click', (e) => this.seek(e));
        
        // البحث
        this.elements.surahSearch.addEventListener('input', (e) => this.searchSurahs(e.target.value));
        
        // التبويبات
        this.elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                this.switchTab(tabId);
            });
        });
        
        // التنبيهات (تختفي تلقائياً)
        this.elements.alert.addEventListener('click', () => this.hideAlert());
        
        // حفظ الحالة قبل إغلاق الصفحة
        window.addEventListener('beforeunload', () => this.saveState());
        
        // إدارة حالة الاتصال بالإنترنت
        window.addEventListener('online', () => {
            this.showAlert('تم استعادة الاتصال بالإنترنت');
        });
        
        window.addEventListener('offline', () => {
            this.showAlert('أنت الآن غير متصل بالإنترنت، التطبيق يعمل بشكل طبيعي');
        });
    },
    
    // إعداد مشغل الصوت
    setupAudioPlayer: function() {
        const audio = this.elements.audioPlayer;
        
        audio.addEventListener('loadedmetadata', () => {
            this.state.duration = audio.duration;
            this.elements.duration.textContent = this.formatTime(audio.duration);
        });
        
        audio.addEventListener('timeupdate', () => {
            this.state.currentTime = audio.currentTime;
            this.elements.currentTime.textContent = this.formatTime(audio.currentTime);
            
            const progressPercent = (audio.currentTime / audio.duration) * 100 || 0;
            this.elements.progress.style.width = `${progressPercent}%`;
        });
        
        audio.addEventListener('ended', () => {
            if (this.state.repeatMode) {
                audio.currentTime = 0;
                audio.play();
            } else {
                this.nextAyah();
            }
        });
        
        audio.addEventListener('error', (e) => {
            console.error('خطأ في تحميل الصوت:', e);
            this.showAlert('تعذر تحميل التسجيل الصوتي. جاري استخدام محاكاة الصوت.');
            this.simulateAudio();
        });
    },
    
    // تبديل وضع الليل
    toggleNightMode: function() {
        this.state.nightMode = !this.state.nightMode;
        document.body.classList.toggle('dark-mode', this.state.nightMode);
        
        this.showAlert(`وضع الليل ${this.state.nightMode ? 'مفعل' : 'معطل'}`);
        this.saveState();
    },
    
    // تبديل حجم الخط
    cycleFontSize: function() {
        const sizes = ['small', 'medium', 'large', 'x-large'];
        const currentIndex = sizes.indexOf(this.state.fontSize);
        const nextIndex = (currentIndex + 1) % sizes.length;
        this.state.fontSize = sizes[nextIndex];
        
        this.applyFontSize();
        this.saveState();
        
        const sizeNames = {
            'small': 'صغير',
            'medium': 'متوسط',
            'large': 'كبير',
            'x-large': 'كبير جداً'
        };
        
        this.showAlert(`تم تغيير حجم الخط إلى ${sizeNames[this.state.fontSize]}`);
    },
    
    // تبديل تشغيل/إيقاف
    togglePlayPause: function() {
        this.state.isPlaying = !this.state.isPlaying;
        
        const playPauseBtn = this.elements.playPauseBtn;
        
        if (this.state.isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            
            // محاولة تشغيل الصوت الفعلي
            const audio = this.elements.audioPlayer;
            const audioUrl = this.getAudioUrl();
            
            if (audioUrl) {
                audio.src = audioUrl;
                audio.play().catch(e => {
                    console.log('تعذر تشغيل الصوت، جاري استخدام المحاكاة:', e);
                    this.simulateAudio();
                });
            } else {
                // استخدام المحاكاة إذا لم يكن هناك رابط صوتي
                this.simulateAudio();
            }
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            this.elements.audioPlayer.pause();
        }
        
        this.saveState();
    },
    
    // الحصول على رابط الصوت
    getAudioUrl: function() {
        if (!this.state.currentReciter || !this.state.currentSurah) return '';
        
        // في التطبيق الحقيقي، سيكون هذا رابطًا حقيقيًا للتسجيل الصوتي
        // يمكن استخدام خدمة مثل mp3quran.net أو everyayah.com
        
        // مثال: `https://server8.mp3quran.net/${this.state.currentReciter.code}/${String(this.state.currentSurah.id).padStart(3, '0')}.mp3`
        
        // بالنسبة لهذا المثال، سنعود برابط فارغ لاستخدام المحاكاة
        return '';
    },
    
    // محاكاة الصوت
    simulateAudio: function() {
        this.state.duration = 30; // 30 ثانية كمثال
        this.elements.duration.textContent = this.formatTime(this.state.duration);
        
        if (this.state.isPlaying) {
            const simulatePlayback = () => {
                if (this.state.isPlaying && this.state.currentTime < this.state.duration) {
                    this.state.currentTime += 1;
                    this.elements.currentTime.textContent = this.formatTime(this.state.currentTime);
                    
                    const progressPercent = (this.state.currentTime / this.state.duration) * 100;
                    this.elements.progress.style.width = `${progressPercent}%`;
                    
                    setTimeout(simulatePlayback, 1000);
                } else if (this.state.currentTime >= this.state.duration) {
                    this.state.isPlaying = false;
                    this.elements.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                    
                    if (this.state.repeatMode) {
                        this.state.currentTime = 0;
                        setTimeout(() => this.togglePlayPause(), 500);
                    } else {
                        this.nextAyah();
                    }
                }
            };
            
            simulatePlayback();
        }
    },
    
    // الآية السابقة
    prevAyah: function() {
        if (this.state.currentAyah > 1) {
            this.state.currentAyah--;
            this.updateAyahDisplay();
            this.renderAyahs();
            this.renderTafseer();
            this.resetPlayback();
            this.saveState();
        }
    },
    
    // الآية التالية
    nextAyah: function() {
        if (this.state.currentSurah && this.state.currentAyah < this.state.currentSurah.ayahs) {
            this.state.currentAyah++;
            this.updateAyahDisplay();
            this.renderAyahs();
            this.renderTafseer();
            this.resetPlayback();
            this.saveState();
        } else if (this.state.currentSurah && this.state.currentAyah >= this.state.currentSurah.ayahs) {
            // إذا وصلنا لنهاية السورة، ننتقل للسورة التالية
            const currentIndex = QuranData.surahs.findIndex(s => s.id === this.state.currentSurah.id);
            if (currentIndex < QuranData.surahs.length - 1) {
                this.selectSurah(QuranData.surahs[currentIndex + 1]);
            }
        }
    },
    
    // الرجوع للخلف 10 ثوان
    rewind: function() {
        const audio = this.elements.audioPlayer;
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    },
    
    // التقدم للأمام 10 ثوان
    forward: function() {
        const audio = this.elements.audioPlayer;
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    },
    
    // التقدم إلى وقت محدد
    seek: function(e) {
        const progressBar = this.elements.progressBar;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const audio = this.elements.audioPlayer;
        audio.currentTime = percent * audio.duration;
    },
    
    // إعادة تعيين التشغيل
    resetPlayback: function() {
        this.state.currentTime = 0;
        this.state.isPlaying = false;
        
        this.elements.currentTime.textContent = '0:00';
        this.elements.progress.style.width = '0%';
        this.elements.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        
        this.elements.audioPlayer.pause();
        this.elements.audioPlayer.currentTime = 0;
    },
    
    // تبديل وضع التكرار
    toggleRepeat: function() {
        this.state.repeatMode = !this.state.repeatMode;
        this.elements.repeatBtn.classList.toggle('active', this.state.repeatMode);
        
        this.showAlert(`وضع التكرار ${this.state.repeatMode ? 'مفعل' : 'معطل'}`);
        this.saveState();
    },
    
    // تبديل الإشارة المرجعية
    toggleBookmark: function() {
        if (!this.state.currentSurah) return;
        
        const bookmarkIndex = this.state.bookmarks.findIndex(b => 
            b.surahId === this.state.currentSurah.id && b.ayah === this.state.currentAyah);
        
        if (bookmarkIndex === -1) {
            // إضافة إشارة مرجعية
            this.state.bookmarks.push({
                surahId: this.state.currentSurah.id,
                surahName: this.state.currentSurah.name,
                ayah: this.state.currentAyah,
                date: new Date().toISOString()
            });
            
            this.showAlert(`تم إضافة الآية ${this.state.currentAyah} من سورة ${this.state.currentSurah.name} إلى الإشارات المرجعية`);
        } else {
            // إزالة إشارة مرجعية
            this.state.bookmarks.splice(bookmarkIndex, 1);
            this.showAlert(`تم إزالة الآية ${this.state.currentAyah} من سورة ${this.state.currentSurah.name} من الإشارات المرجعية`);
        }
        
        this.renderBookmarks();
        this.updateAyahDisplay();
        this.saveState();
    },
    
    // الانتقال إلى إشارة مرجعية
    goToBookmark: function(index) {
        if (index < 0 || index >= this.state.bookmarks.length) return;
        
        const bookmark = this.state.bookmarks[index];
        const surah = QuranData.surahs.find(s => s.id === bookmark.surahId);
        
        if (surah) {
            this.selectSurah(surah);
            this.state.currentAyah = bookmark.ayah;
            this.updateAyahDisplay();
            this.renderAyahs();
            this.renderTafseer();
            this.saveState();
            
            this.showAlert(`تم الانتقال إلى الآية ${bookmark.ayah} من سورة ${surah.name}`);
        }
    },
    
    // حذف إشارة مرجعية
    deleteBookmark: function(index) {
        if (index < 0 || index >= this.state.bookmarks.length) return;
        
        const bookmark = this.state.bookmarks[index];
        this.state.bookmarks.splice(index, 1);
        
        this.renderBookmarks();
        this.updateAyahDisplay();
        this.saveState();
        
        this.showAlert(`تم حذف الإشارة المرجعية للآية ${bookmark.ayah} من سورة ${bookmark.surahName}`);
    },
    
    // مشاركة الآية
    shareAyah: function() {
        if (!this.state.currentSurah) return;
        
        const surahAyahs = QuranData.ayahs[this.state.currentSurah.id];
        if (!surahAyahs) return;
        
        const currentAyah = surahAyahs.find(a => a.number === this.state.currentAyah);
        if (!currentAyah) return;
        
        const textToShare = `${currentAyah.text}\n(سورة ${this.state.currentSurah.name} - الآية ${this.state.currentAyah})\n\nمشاركة من تطبيق مشغل القرآن الكريم`;
        
        if (navigator.share) {
            navigator.share({
                title: `آية من سورة ${this.state.currentSurah.name}`,
                text: textToShare,
                url: window.location.href
            }).catch(err => console.log('خطأ في المشاركة:', err));
        } else {
            // نسخ إلى الحافظة
            this.copyToClipboard(textToShare);
            this.showAlert('تم نسخ الآية إلى الحافظة');
        }
    },
    
    // نسخ الآية
    copyAyah: function() {
        if (!this.state.currentSurah) return;
        
        const surahAyahs = QuranData.ayahs[this.state.currentSurah.id];
        if (!surahAyahs) return;
        
        const currentAyah = surahAyahs.find(a => a.number === this.state.currentAyah);
        if (!currentAyah) return;
        
        const textToCopy = `${currentAyah.text}\n(سورة ${this.state.currentSurah.name} - الآية ${this.state.currentAyah})`;
        this.copyToClipboard(textToCopy);
        this.showAlert('تم نسخ الآية إلى الحافظة');
    },
    
    // نسخ إلى الحافظة
    copyToClipboard: function(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    },
    
    // البحث في السور
    searchSurahs: function(query) {
        const surahItems = document.querySelectorAll('.surah-item');
        const normalizedQuery = query.trim().toLowerCase();
        
        surahItems.forEach(item => {
            const surahName = item.querySelector('.surah-name').textContent.toLowerCase();
            const surahDetails = item.querySelector('.surah-details').textContent.toLowerCase();
            
            if (surahName.includes(normalizedQuery) || surahDetails.includes(normalizedQuery)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    },
    
    // تبديل التبويبات
    switchTab: function(tabId) {
        // تحديث التبويبات النشطة
        this.elements.tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabId);
        });
        
        // تحديث محتويات التبويبات
        this.elements.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
    },
    
    // عرض معلومات التطبيق
    showInfo: function() {
        this.showAlert(`
            <strong>مشغل القرآن الكريم الكامل</strong><br>
            الإصدار 3.0<br><br>
            
            <strong>الميزات:</strong><br>
            - جميع سور القرآن الكريم (114 سورة)<br>
            - 10 من أشهر القراء<br>
            - عرض الآيات مع التفسير الميسر<br>
            - وضع الليل لحماية العينين<br>
            - نظام الإشارات المرجعية<br>
            - البحث في السور<br>
            - يعمل بدون إنترنت بالكامل<br><br>
            
            <strong>التقنيات المستخدمة:</strong><br>
            - HTML5, CSS3, JavaScript<br>
            - Service Workers للعمل دون اتصال<br>
            - IndexedDB للتخزين المحلي<br><br>
            
            <strong>المطور:</strong><br>
            فريق تطوير تطبيقات الويب<br>
            &copy; ${new Date().getFullYear()}
        `);
    },
    
    // عرض تنبيه
    showAlert: function(message) {
        this.elements.alertMessage.innerHTML = message;
        this.elements.alert.classList.add('show');
        
        // إخفاء التنبيه تلقائياً بعد 5 ثواني
        setTimeout(() => {
            this.hideAlert();
        }, 5000);
    },
    
    // إخفاء تنبيه
    hideAlert: function() {
        this.elements.alert.classList.remove('show');
    },
    
    // تنسيق الوقت
    formatTime: function(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
};

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    QuranPlayer.init();
    
    // تسجيل Service Worker لتطبيق PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(registration => {
                    console.log('Service Worker مسجل بنجاح:', registration.scope);
                })
                .catch(error => {
                    console.log('فشل تسجيل Service Worker:', error);
                });
        });
    }
});
