/**
 * مشغل القرآن الكريم - الإصدار 4.0
 * المطور: Mohammed Elsonbaty
 */

class QuranApp {
    constructor() {
        this.init();
    }
    
    init() {
        // تهيئة البيانات
        this.data = QuranData.init();
        
        // حالة التطبيق
        this.state = {
            currentReciter: this.data.reciters[0],
            currentSurah: this.data.surahs[0],
            currentAyah: 1,
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            repeatMode: false,
            autoContinue: true,
            volume: 80,
            bookmarks: [],
            favorites: [],
            recent: [],
            settings: {
                theme: 'light',
                fontSize: 'medium',
                highlightColor: '#1565C0',
                showTafseer: true,
                showTranslation: true
            },
            readingMode: false,
            currentPage: 1
        };
        
        // تهيئة DOM
        this.initDOM();
        
        // تحميل الحالة
        this.loadState();
        
        // إعداد الأحداث
        this.setupEvents();
        
        // تحديث الواجهة
        this.updateUI();
        
        // إشعار البدء
        this.showNotification('مرحباً بك في مشغل القرآن الكريم', `الإصدار ${this.data.appInfo.version}`, 'success');
    }
    
    initDOM() {
        // عناصر التنقل
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navMenuBtn = document.getElementById('mobile-menu-btn');
        this.navMenu = document.getElementById('nav-menu');
        this.themeToggle = document.getElementById('theme-toggle');
        this.fullscreenToggle = document.getElementById('fullscreen-toggle');
        
        // عناصر المشغل
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.prevAyahBtn = document.getElementById('prev-ayah-btn');
        this.nextAyahBtn = document.getElementById('next-ayah-btn');
        this.repeatBtn = document.getElementById('repeat-btn');
        this.bookmarkBtn = document.getElementById('bookmark-btn');
        this.prevSurahBtn = document.getElementById('prev-surah-btn');
        this.nextSurahBtn = document.getElementById('next-surah-btn');
        this.surahListBtn = document.getElementById('surah-list-btn');
        
        // عناصر العرض
        this.currentSurahDisplay = document.getElementById('current-surah-display');
        this.currentAyahDisplay = document.getElementById('current-ayah-display');
        this.currentReciterDisplay = document.getElementById('current-reciter-display');
        this.ayahText = document.getElementById('ayah-text');
        this.ayahTranslation = document.getElementById('ayah-translation');
        this.playerStatus = document.getElementById('player-status');
        this.statusIndicator = this.playerStatus.querySelector('.status-indicator');
        
        // عناصر التقدم
        this.progressBar = document.getElementById('progress-bar');
        this.progress = document.getElementById('progress');
        this.currentTimeDisplay = document.getElementById('current-time');
        this.durationDisplay = document.getElementById('duration');
        
        // مكتبة القرآن
        this.librarySearch = document.getElementById('library-search');
        this.clearSearchBtn = document.getElementById('clear-search-btn');
        this.surahFilter = document.getElementById('surah-filter');
        this.viewButtons = document.querySelectorAll('.view-btn');
        this.surahLibrary = document.getElementById('surah-library');
        this.favoriteCount = document.getElementById('favorite-count');
        
        // وضع القراءة
        this.readingMode = document.getElementById('reading-mode');
        this.readingContent = document.getElementById('reading-content');
        this.exitReadingBtn = document.getElementById('exit-reading-btn');
        this.readingSettingsBtn = document.getElementById('reading-settings-btn');
        this.prevPageBtn = document.getElementById('prev-page-btn');
        this.nextPageBtn = document.getElementById('next-page-btn');
        this.currentPageDisplay = document.getElementById('current-page');
        this.totalPagesDisplay = document.getElementById('total-pages');
        this.readingSurahName = document.getElementById('reading-surah-name');
        this.readingSurahInfo = document.getElementById('reading-surah-info');
        
        // القراء
        this.recitersGrid = document.getElementById('reciters-grid');
        
        // الإشارات المرجعية
        this.bookmarksContainer = document.getElementById('bookmarks-container');
        this.emptyBookmarks = document.getElementById('empty-bookmarks');
        this.exploreSurahsBtn = document.getElementById('explore-surahs-btn');
        
        // الإعدادات
        this.darkModeToggle = document.getElementById('dark-mode-toggle');
        this.fontSizeButtons = document.querySelectorAll('.font-size-btn');
        this.colorOptions = document.querySelectorAll('.color-option');
        this.volumeSlider = document.getElementById('volume-slider');
        this.autoRepeatToggle = document.getElementById('auto-repeat-toggle');
        this.autoContinueToggle = document.getElementById('auto-continue-toggle');
        this.clearCacheBtn = document.getElementById('clear-cache-btn');
        this.backupBookmarksBtn = document.getElementById('backup-bookmarks-btn');
        this.resetSettingsBtn = document.getElementById('reset-settings-btn');
        
        // التلاوات الحديثة
        this.recentList = document.getElementById('recent-list');
        this.clearRecentBtn = document.getElementById('clear-recent-btn');
        
        // العناصر المساعدة
        this.audioPlayer = document.getElementById('audio-player');
        this.modal = document.getElementById('confirmation-modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalMessage = document.getElementById('modal-message');
        this.modalCancelBtn = document.getElementById('modal-cancel-btn');
        this.modalConfirmBtn = document.getElementById('modal-confirm-btn');
        this.modalCloseBtn = document.getElementById('modal-close-btn');
        this.notification = document.getElementById('notification');
        this.notificationTitle = document.getElementById('notification-title');
        this.notificationMessage = document.getElementById('notification-message');
        this.notificationCloseBtn = document.getElementById('notification-close-btn');
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingMessage = document.getElementById('loading-message');
        this.loadingProgress = document.getElementById('loading-progress');
        this.loadingPercentage = document.getElementById('loading-percentage');
        
        // الأقسام
        this.sections = document.querySelectorAll('.content-section');
    }
    
    setupEvents() {
        // التنقل
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
                this.closeMobileMenu();
            });
        });
        
        // القائمة المتنقلة
        if (this.navMenuBtn) {
            this.navMenuBtn.addEventListener('click', () => {
                this.navMenu.classList.toggle('show');
            });
        }
        
        // تبديل الثيم
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // الشاشة الكاملة
        this.fullscreenToggle.addEventListener('click', () => {
            this.toggleFullscreen();
        });
        
        // مشغل الصوت
        this.setupAudioPlayer();
        
        // مكتبة القرآن
        this.setupLibrary();
        
        // وضع القراءة
        this.setupReadingMode();
        
        // الإشارات المرجعية
        this.setupBookmarks();
        
        // الإعدادات
        this.setupSettings();
        
        // الأحداث العامة
        this.setupGlobalEvents();
    }
    
    setupAudioPlayer() {
        // مشغل الصوت
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevAyahBtn.addEventListener('click', () => this.prevAyah());
        this.nextAyahBtn.addEventListener('click', () => this.nextAyah());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
        this.prevSurahBtn.addEventListener('click', () => this.prevSurah());
        this.nextSurahBtn.addEventListener('click', () => this.nextSurah());
        this.surahListBtn.addEventListener('click', () => this.switchSection('library'));
        
        // شريط التقدم
        this.progressBar.addEventListener('click', (e) => this.seek(e));
        
        // مشغل الصوت HTML5
        this.audioPlayer.addEventListener('loadedmetadata', () => {
            this.state.duration = this.audioPlayer.duration;
            this.updateProgressDisplay();
        });
        
        this.audioPlayer.addEventListener('timeupdate', () => {
            this.state.currentTime = this.audioPlayer.currentTime;
            this.updateProgressDisplay();
        });
        
        this.audioPlayer.addEventListener('ended', () => {
            if (this.state.repeatMode) {
                this.audioPlayer.currentTime = 0;
                this.audioPlayer.play();
            } else if (this.state.autoContinue) {
                this.nextAyah();
            } else {
                this.state.isPlaying = false;
                this.updatePlayerUI();
            }
        });
    }
    
    setupLibrary() {
        // البحث
        this.librarySearch.addEventListener('input', (e) => {
            this.filterSurahs(e.target.value);
        });
        
        this.clearSearchBtn.addEventListener('click', () => {
            this.librarySearch.value = '';
            this.filterSurahs('');
        });
        
        // التصفية
        this.surahFilter.addEventListener('change', (e) => {
            this.sortSurahs(e.target.value);
        });
        
        // عرض الشبكة/القائمة
        this.viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.changeLibraryView(view);
            });
        });
        
        // تحميل مكتبة السور
        this.loadSurahLibrary();
    }
    
    setupReadingMode() {
        this.exitReadingBtn.addEventListener('click', () => this.exitReadingMode());
        this.readingSettingsBtn.addEventListener('click', () => this.showReadingSettings());
        this.prevPageBtn.addEventListener('click', () => this.prevPage());
        this.nextPageBtn.addEventListener('click', () => this.nextPage());
    }
    
    setupBookmarks() {
        this.exploreSurahsBtn?.addEventListener('click', () => {
            this.switchSection('library');
        });
        
        this.loadBookmarks();
    }
    
    setupSettings() {
        // المظهر
        this.darkModeToggle.addEventListener('change', (e) => {
            this.state.settings.theme = e.target.checked ? 'dark' : 'light';
            this.applyTheme();
            this.saveState();
        });
        
        // حجم الخط
        this.fontSizeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const size = e.currentTarget.dataset.size;
                this.changeFontSize(size);
            });
        });
        
        // لون التمييز
        this.colorOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const color = e.currentTarget.dataset.color;
                this.changeHighlightColor(color);
            });
        });
        
        // الصوت
        this.volumeSlider.addEventListener('input', (e) => {
            this.state.volume = e.target.value;
            this.audioPlayer.volume = this.state.volume / 100;
            this.saveState();
        });
        
        this.autoRepeatToggle.addEventListener('change', (e) => {
            this.state.repeatMode = e.target.checked;
            this.saveState();
        });
        
        this.autoContinueToggle.addEventListener('change', (e) => {
            this.state.autoContinue = e.target.checked;
            this.saveState();
        });
        
        // البيانات
        this.clearCacheBtn.addEventListener('click', () => this.clearCache());
        this.backupBookmarksBtn.addEventListener('click', () => this.backupBookmarks());
        this.resetSettingsBtn.addEventListener('click', () => this.resetSettings());
    }
    
    setupGlobalEvents() {
        // النوافذ المنبثقة
        this.modalCancelBtn.addEventListener('click', () => this.closeModal());
        this.modalConfirmBtn.addEventListener('click', () => this.confirmModal());
        this.modalCloseBtn.addEventListener('click', () => this.closeModal());
        
        // الإشعارات
        this.notificationCloseBtn.addEventListener('click', () => this.hideNotification());
        
        // الأحداث العامة
        document.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
            
            if (e.target === this.notification) {
                this.hideNotification();
            }
        });
        
        // التلاوات الحديثة
        this.clearRecentBtn.addEventListener('click', () => this.clearRecent());
        this.loadRecentRecitations();
    }
    
    // ===== الوظائف الأساسية =====
    
    switchSection(sectionId) {
        // تحديث التنقل
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
        });
        
        // إظهار القسم المحدد
        this.sections.forEach(section => {
            section.classList.toggle('active', section.id === `${sectionId}-section`);
        });
        
        // تحميل بيانات القسم إذا لزم
        if (sectionId === 'library' && this.surahLibrary.children.length === 0) {
            this.loadSurahLibrary();
        } else if (sectionId === 'reciters' && this.recitersGrid.children.length === 0) {
            this.loadReciters();
        } else if (sectionId === 'bookmarks') {
            this.loadBookmarks();
        }
    }
    
    toggleTheme() {
        this.state.settings.theme = this.state.settings.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveState();
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = this.state.settings.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        this.showNotification(
            'تم تغيير المظهر',
            `الوضع ${this.state.settings.theme === 'dark' ? 'المظلم' : 'الفاتح'} مفعل`,
            'success'
        );
    }
    
    applyTheme() {
        if (this.state.settings.theme === 'dark') {
            document.body.classList.add('dark-mode');
            this.darkModeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            this.darkModeToggle.checked = false;
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`خطأ في تفعيل الشاشة الكاملة: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
    
    closeMobileMenu() {
        if (this.navMenu.classList.contains('show')) {
            this.navMenu.classList.remove('show');
        }
    }
    
    // ===== مشغل الصوت =====
    
    togglePlayPause() {
        if (this.state.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        // في التطبيق الحقيقي، هنا سيتم تحميل الصوت الفعلي
        // هذا نموذج لمحاكاة التشغيل
        
        this.state.isPlaying = true;
        this.updatePlayerUI();
        
        // محاكاة التقدم
        this.simulatePlayback();
        
        // إضافة للتلاوات الحديثة
        this.addRecentRecitation();
    }
    
    pause() {
        this.state.isPlaying = false;
        this.updatePlayerUI();
    }
    
    simulatePlayback() {
        if (this.state.isPlaying && this.state.currentTime < this.state.duration) {
            this.state.currentTime += 1;
            this.updateProgressDisplay();
            
            setTimeout(() => this.simulatePlayback(), 1000);
        } else if (this.state.currentTime >= this.state.duration) {
            if (this.state.repeatMode) {
                this.state.currentTime = 0;
                setTimeout(() => this.play(), 500);
            } else if (this.state.autoContinue) {
                this.nextAyah();
            } else {
                this.pause();
            }
        }
    }
    
    prevAyah() {
        if (this.state.currentAyah > 1) {
            this.state.currentAyah--;
            this.updateAyahDisplay();
            this.resetPlayback();
        }
    }
    
    nextAyah() {
        if (this.state.currentAyah < this.state.currentSurah.ayahs) {
            this.state.currentAyah++;
            this.updateAyahDisplay();
            this.resetPlayback();
        } else {
            this.nextSurah();
        }
    }
    
    prevSurah() {
        const currentIndex = this.data.surahs.findIndex(s => s.id === this.state.currentSurah.id);
        if (currentIndex > 0) {
            this.selectSurah(this.data.surahs[currentIndex - 1]);
        }
    }
    
    nextSurah() {
        const currentIndex = this.data.surahs.findIndex(s => s.id === this.state.currentSurah.id);
        if (currentIndex < this.data.surahs.length - 1) {
            this.selectSurah(this.data.surahs[currentIndex + 1]);
        }
    }
    
    selectSurah(surah) {
        this.state.currentSurah = surah;
        this.state.currentAyah = 1;
        this.updateAyahDisplay();
        this.resetPlayback();
        this.saveState();
        
        this.showNotification('تم التحديد', `سورة ${surah.name}`, 'info');
    }
    
    selectReciter(reciter) {
        this.state.currentReciter = reciter;
        this.updatePlayerUI();
        this.saveState();
        
        this.showNotification('تم التحديد', `القارئ ${reciter.name}`, 'info');
    }
    
    toggleRepeat() {
        this.state.repeatMode = !this.state.repeatMode;
        this.repeatBtn.classList.toggle('active', this.state.repeatMode);
        this.saveState();
        
        this.showNotification(
            'وضع التكرار',
            this.state.repeatMode ? 'مفعل' : 'معطل',
            'info'
        );
    }
    
    toggleBookmark() {
        const bookmark = {
            id: this.data.utilities.generateId(),
            surahId: this.state.currentSurah.id,
            surahName: this.state.currentSurah.name,
            ayah: this.state.currentAyah,
            ayahText: this.ayahText.textContent,
            translation: this.ayahTranslation.textContent,
            date: new Date().toISOString(),
            note: '',
            tags: []
        };
        
        const existingIndex = this.state.bookmarks.findIndex(b => 
            b.surahId === bookmark.surahId && b.ayah === bookmark.ayah
        );
        
        if (existingIndex === -1) {
            this.state.bookmarks.push(bookmark);
            this.bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
            this.bookmarkBtn.classList.add('active');
            this.showNotification('تم الإضافة', 'آية جديدة في الإشارات المرجعية', 'success');
        } else {
            this.state.bookmarks.splice(existingIndex, 1);
            this.bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
            this.bookmarkBtn.classList.remove('active');
            this.showNotification('تم الحذف', 'آية محذوفة من الإشارات المرجعية', 'info');
        }
        
        this.saveState();
    }
    
    seek(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.state.currentTime = percent * this.state.duration;
        this.updateProgressDisplay();
    }
    
    resetPlayback() {
        this.state.currentTime = 0;
        this.state.isPlaying = false;
        this.updatePlayerUI();
        this.updateProgressDisplay();
    }
    
    updatePlayerUI() {
        // تحديث حالة التشغيل
        const playPauseIcon = this.playPauseBtn.querySelector('i');
        playPauseIcon.className = this.state.isPlaying ? 'fas fa-pause' : 'fas fa-play';
        
        // تحديث المؤشر
        this.statusIndicator.classList.toggle('playing', this.state.isPlaying);
        this.statusIndicator.nextElementSibling.textContent = 
            this.state.isPlaying ? 'جاري التشغيل' : 'متوقف';
        
        // تحديث زر التكرار
        this.repeatBtn.classList.toggle('active', this.state.repeatMode);
        
        // تحديث زر الإشارة المرجعية
        const isBookmarked = this.state.bookmarks.some(b => 
            b.surahId === this.state.currentSurah.id && b.ayah === this.state.currentAyah
        );
        
        this.bookmarkBtn.innerHTML = isBookmarked ? 
            '<i class="fas fa-bookmark"></i>' : 
            '<i class="far fa-bookmark"></i>';
        this.bookmarkBtn.classList.toggle('active', isBookmarked);
    }
    
    updateAyahDisplay() {
        // تحديث معلومات السورة
        this.currentSurahDisplay.textContent = `سورة ${this.state.currentSurah.name}`;
        this.currentAyahDisplay.textContent = `الآية ${this.state.currentAyah} من ${this.state.currentSurah.ayahs}`;
        this.currentReciterDisplay.textContent = this.state.currentReciter.name;
        
        // هنا في التطبيق الكامل، سيتم جلب نص الآية والترجمة من قاعدة البيانات
        // هذا نموذج تجريبي
        
        const sampleAyahs = {
            1: [
                "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
                "الرَّحْمَٰنِ الرَّحِيمِ",
                "مَالِكِ يَوْمِ الدِّينِ",
                "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
                "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
                "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
            ],
            112: [
                "قُلْ هُوَ اللَّهُ أَحَدٌ",
                "اللَّهُ الصَّمَدُ",
                "لَمْ يَلِدْ وَلَمْ يُولَدْ",
                "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ"
            ]
        };
        
        const sampleTranslations = {
            1: [
                "بسم الله الرحمن الرحيم",
                "الحمد لله رب العالمين",
                "الرحمن الرحيم",
                "مالك يوم الدين",
                "إياك نعبد وإياك نستعين",
                "اهدنا الصراط المستقيم",
                "صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين"
            ],
            112: [
                "قل هو الله أحد",
                "الله الصمد",
                "لم يلد ولم يولد",
                "ولم يكن له كفوا أحد"
            ]
        };
        
        const surahAyahs = sampleAyahs[this.state.currentSurah.id] || 
            [`آية ${this.state.currentAyah} من سورة ${this.state.currentSurah.name}`];
        
        const surahTranslations = sampleTranslations[this.state.currentSurah.id] || 
            [`ترجمة الآية ${this.state.currentAyah}`];
        
        this.ayahText.textContent = surahAyahs[this.state.currentAyah - 1] || surahAyahs[0];
        this.ayahTranslation.textContent = surahTranslations[this.state.currentAyah - 1] || surahTranslations[0];
        
        // تحديث واجهة المشغل
        this.updatePlayerUI();
    }
    
    updateProgressDisplay() {
        const progressPercent = (this.state.currentTime / this.state.duration) * 100 || 0;
        this.progress.style.width = `${progressPercent}%`;
        
        this.currentTimeDisplay.textContent = this.formatTime(this.state.currentTime);
        this.durationDisplay.textContent = this.formatTime(this.state.duration);
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // ===== مكتبة القرآن =====
    
    loadSurahLibrary() {
        this.showLoading('جاري تحميل مكتبة القرآن الكريم...');
        
        setTimeout(() => {
            this.surahLibrary.innerHTML = '';
            
            this.data.surahs.forEach(surah => {
                const surahCard = this.createSurahCard(surah);
                this.surahLibrary.appendChild(surahCard);
            });
            
            this.updateStats();
            this.hideLoading();
            
            this.showNotification('تم التحميل', 'مكتبة القرآن جاهزة', 'success');
        }, 500);
    }
    
    createSurahCard(surah) {
        const card = document.createElement('div');
        card.className = 'surah-card';
        card.dataset.id = surah.id;
        
        const isFavorite = this.state.favorites.includes(surah.id);
        const progress = Math.floor(Math.random() * 100); // محاكاة للتقدم
        
        card.innerHTML = `
            <div class="surah-card-header">
                <div class="surah-card-number">${surah.id}</div>
                <div class="surah-card-actions">
                    <button class="surah-action-btn favorite-btn ${isFavorite ? 'active' : ''}" 
                            title="${isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="surah-action-btn bookmark-btn" title="إضافة إشارة">
                        <i class="far fa-bookmark"></i>
                    </button>
                </div>
            </div>
            
            <div class="surah-card-title">${surah.name}</div>
            
            <div class="surah-card-meta">
                <span>${surah.ayahs} آية</span>
                <span>•</span>
                <span>${surah.type}</span>
                <span>•</span>
                <span>${surah.readingTime}</span>
            </div>
            
            <div class="surah-card-description">
                ${surah.description}
            </div>
            
            <div class="surah-card-tags">
                ${surah.tags.map(tag => `<span class="surah-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="surah-card-footer">
                <div class="surah-card-progress">
                    <div class="progress-label">
                        <span>التقدم</span>
                        <span>${progress}%</span>
                    </div>
                    <div class="progress-bar-small">
                        <div class="progress-small" style="width: ${progress}%"></div>
                    </div>
                </div>
                
                <div class="surah-card-buttons">
                    <button class="surah-card-btn read-btn">
                        <i class="fas fa-book-reader"></i>
                        قراءة
                    </button>
                    <button class="surah-card-btn primary listen-btn">
                        <i class="fas fa-headphones"></i>
                        استماع
                    </button>
                </div>
            </div>
        `;
        
        // إضافة الأحداث
        const favoriteBtn = card.querySelector('.favorite-btn');
        const bookmarkBtn = card.querySelector('.bookmark-btn');
        const readBtn = card.querySelector('.read-btn');
        const listenBtn = card.querySelector('.listen-btn');
        
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorite(surah.id);
        });
        
        bookmarkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.addSurahBookmark(surah);
        });
        
        readBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openReadingMode(surah);
        });
        
        listenBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectSurah(surah);
            this.switchSection('home');
            this.play();
        });
        
        card.addEventListener('click', () => {
            this.selectSurah(surah);
            this.switchSection('home');
        });
        
        return card;
    }
    
    filterSurahs(query) {
        const cards = this.surahLibrary.querySelectorAll('.surah-card');
        const normalizedQuery = query.toLowerCase().trim();
        
        cards.forEach(card => {
            const title = card.querySelector('.surah-card-title').textContent.toLowerCase();
            const description = card.querySelector('.surah-card-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.surah-tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(normalizedQuery) || 
                           description.includes(normalizedQuery) ||
                           tags.some(tag => tag.includes(normalizedQuery));
            
            card.style.display = matches ? 'block' : 'none';
        });
    }
    
    sortSurahs(criteria) {
        const cards = Array.from(this.surahLibrary.querySelectorAll('.surah-card'));
        
        cards.sort((a, b) => {
            const aId = parseInt(a.dataset.id);
            const bId = parseInt(b.dataset.id);
            
            switch(criteria) {
                case 'name':
                    const aName = a.querySelector('.surah-card-title').textContent;
                    const bName = b.querySelector('.surah-card-title').textContent;
                    return aName.localeCompare(bName, 'ar');
                    
                case 'length':
                    const aLength = parseInt(a.querySelector('.surah-card-meta span').textContent);
                    const bLength = parseInt(b.querySelector('.surah-card-meta span').textContent);
                    return aLength - bLength;
                    
                case 'type':
                    const aType = a.querySelector('.surah-card-meta span:nth-child(3)').textContent;
                    const bType = b.querySelector('.surah-card-meta span:nth-child(3)').textContent;
                    return aType.localeCompare(bType, 'ar');
                    
                default: // order
                    return aId - bId;
            }
        });
        
        // إعادة ترتيب البطاقات
        cards.forEach(card => this.surahLibrary.appendChild(card));
    }
    
    changeLibraryView(view) {
        this.viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        if (view === 'grid') {
            this.surahLibrary.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        } else {
            this.surahLibrary.style.gridTemplateColumns = '1fr';
        }
    }
    
    toggleFavorite(surahId) {
        const index = this.state.favorites.indexOf(surahId);
        
        if (index === -1) {
            this.state.favorites.push(surahId);
        } else {
            this.state.favorites.splice(index, 1);
        }
        
        this.updateStats();
        this.saveState();
        
        // تحديث الزر
        const card = this.surahLibrary.querySelector(`[data-id="${surahId}"]`);
        if (card) {
            const favoriteBtn = card.querySelector('.favorite-btn');
            favoriteBtn.classList.toggle('active', index === -1);
            favoriteBtn.title = index === -1 ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة';
        }
    }
    
    addSurahBookmark(surah) {
        const bookmark = {
            id: this.data.utilities.generateId(),
            surahId: surah.id,
            surahName: surah.name,
            ayah: 1,
            ayahText: `بداية سورة ${surah.name}`,
            translation: '',
            date: new Date().toISOString(),
            note: 'بداية السورة',
            tags: ['بداية']
        };
        
        this.state.bookmarks.push(bookmark);
        this.saveState();
        
        this.showNotification('تم الإضافة', `سورة ${surah.name} في الإشارات المرجعية`, 'success');
    }
    
    updateStats() {
        this.favoriteCount.textContent = this.state.favorites.length;
    }
    
    // ===== وضع القراءة =====
    
    openReadingMode(surah) {
        this.state.currentSurah = surah;
        this.state.readingMode = true;
        this.state.currentPage = 1;
        
        this.readingSurahName.textContent = `سورة ${surah.name}`;
        this.readingSurahInfo.textContent = `${surah.ayahs} آية • ${surah.type} • ${surah.readingTime}`;
        
        this.loadReadingContent();
        this.readingMode.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    exitReadingMode() {
        this.state.readingMode = false;
        this.readingMode.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    loadReadingContent() {
        this.readingContent.innerHTML = '';
        
        // محاكاة محتوى القراءة
        for (let i = 1; i <= Math.min(10, this.state.currentSurah.ayahs); i++) {
            const ayahElement = this.createAyahElement(i);
            this.readingContent.appendChild(ayahElement);
        }
        
        this.currentPageDisplay.textContent = this.state.currentPage;
        this.totalPagesDisplay.textContent = Math.ceil(this.state.currentSurah.ayahs / 10);
        
        this.updateReadingNavigation();
    }
    
    createAyahElement(number) {
        const div = document.createElement('div');
        div.className = 'ayah-reading';
        
        // محاكاة نص الآية
        const sampleText = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَٰنِ الرَّحِيمِ";
        const words = sampleText.split(' ');
        const start = ((number - 1) * 5) % words.length;
        const ayahText = words.slice(start, start + 5).join(' ');
        
        div.innerHTML = `
            <div class="ayah-text-reading">
                ${ayahText}
                <span class="ayah-number-reading">${number}</span>
            </div>
            <div class="ayah-translation-reading">
                ترجمة الآية ${number}: ${ayahText}
            </div>
            <div class="ayah-actions-reading">
                <button class="ayah-action-btn" data-action="bookmark" data-ayah="${number}">
                    <i class="far fa-bookmark"></i>
                </button>
                <button class="ayah-action-btn" data-action="copy" data-ayah="${number}">
                    <i class="far fa-copy"></i>
                </button>
                <button class="ayah-action-btn" data-action="share" data-ayah="${number}">
                    <i class="fas fa-share-alt"></i>
                </button>
            </div>
        `;
        
        // إضافة الأحداث
        div.querySelectorAll('.ayah-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = e.currentTarget.dataset.action;
                const ayah = parseInt(e.currentTarget.dataset.ayah);
                this.handleAyahAction(action, ayah);
            });
        });
        
        return div;
    }
    
    prevPage() {
        if (this.state.currentPage > 1) {
            this.state.currentPage--;
            this.loadReadingContent();
        }
    }
    
    nextPage() {
        const totalPages = Math.ceil(this.state.currentSurah.ayahs / 10);
        if (this.state.currentPage < totalPages) {
            this.state.currentPage++;
            this.loadReadingContent();
        }
    }
    
    updateReadingNavigation() {
        this.prevPageBtn.disabled = this.state.currentPage <= 1;
        this.nextPageBtn.disabled = this.state.currentPage >= Math.ceil(this.state.currentSurah.ayahs / 10);
    }
    
    handleAyahAction(action, ayah) {
        switch(action) {
            case 'bookmark':
                this.addAyahBookmark(ayah);
                break;
            case 'copy':
                this.copyAyahText(ayah);
                break;
            case 'share':
                this.shareAyah(ayah);
                break;
        }
    }
    
    addAyahBookmark(ayah) {
        const bookmark = {
            id: this.data.utilities.generateId(),
            surahId: this.state.currentSurah.id,
            surahName: this.state.currentSurah.name,
            ayah: ayah,
            ayahText: `نص الآية ${ayah}`,
            translation: `ترجمة الآية ${ayah}`,
            date: new Date().toISOString(),
            note: '',
            tags: []
        };
        
        this.state.bookmarks.push(bookmark);
        this.saveState();
        
        this.showNotification('تم الإضافة', `الآية ${ayah} في الإشارات المرجعية`, 'success');
    }
    
    copyAyahText(ayah) {
        const text = `الآية ${ayah} من سورة ${this.state.currentSurah.name}`;
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('تم النسخ', 'النص في الحافظة', 'success');
        });
    }
    
    shareAyah(ayah) {
        const text = `الآية ${ayah} من سورة ${this.state.currentSurah.name} - تطبيق القرآن الكريم`;
        
        if (navigator.share) {
            navigator.share({
                title: `الآية ${ayah} - سورة ${this.state.currentSurah.name}`,
                text: text,
                url: window.location.href
            });
        } else {
            this.copyAyahText(ayah);
        }
    }
    
    showReadingSettings() {
        this.showNotification('إعدادات القراءة', 'قريباً في التحديثات القادمة', 'info');
    }
    
    // ===== القراء =====
    
    loadReciters() {
        this.recitersGrid.innerHTML = '';
        
        this.data.reciters.forEach(reciter => {
            const reciterCard = this.createReciterCard(reciter);
            this.recitersGrid.appendChild(reciterCard);
        });
    }
    
    createReciterCard(reciter) {
        const card = document.createElement('div');
        card.className = 'reciter-card';
        
        card.innerHTML = `
            <div class="reciter-avatar" style="border-color: ${reciter.color}">
                <i class="${reciter.icon}" style="color: ${reciter.color}"></i>
            </div>
            
            <div class="reciter-name">${reciter.name}</div>
            <div class="reciter-country">${reciter.country}</div>
            
            <div class="reciter-style">${reciter.style}</div>
            
            <div class="reciter-description">
                ${reciter.description}
            </div>
            
            <div class="reciter-stats">
                <div class="reciter-stat">
                    <span class="reciter-stat-value">${reciter.popularity}</span>
                    <span class="reciter-stat-label">التقييم</span>
                </div>
                <div class="reciter-stat">
                    <span class="reciter-stat-value">${reciter.recordings}</span>
                    <span class="reciter-stat-label">تسجيلات</span>
                </div>
            </div>
            
            <div class
