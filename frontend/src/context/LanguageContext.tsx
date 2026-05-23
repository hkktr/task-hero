import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'en' | 'pl'

interface LangCtx {
  lang: Lang
  toggle: () => void
  t: (key: keyof typeof translations) => string
}

const translations = {
  // Nav
  'nav.explore': { en: 'Explore', pl: 'Odkryj' },
  'nav.newRequest': { en: 'New Request', pl: 'Nowe ogłoszenie' },
  'nav.cancel': { en: 'Cancel', pl: 'Anuluj' },
  // Welcome
  'welcome.badge': { en: 'Community First', pl: 'Społeczność na pierwszym miejscu' },
  'welcome.h1a': { en: 'Where Every', pl: 'Gdzie Każda' },
  'welcome.h1b': { en: 'Help', pl: 'Pomoc' },
  'welcome.h1c': { en: 'Finds a Home.', pl: 'Znajdzie Dom.' },
  'welcome.sub': {
    en: "Kindred Hearth is more than a platform—it's a digital community center built on empathy, connecting neighbors for meaningful support and local impact.",
    pl: 'TaskHero to więcej niż platforma — to cyfrowe centrum społeczności oparte na empatii, łączące sąsiadów dla wzajemnego wsparcia i lokalnych zmian.',
  },
  'welcome.card.title': { en: 'New Request', pl: 'Nowe ogłoszenie' },
  'welcome.card.time': { en: '2 mins ago', pl: '2 min temu' },
  'welcome.card.text': {
    en: '"Looking for a hand with gardening this Saturday morning..."',
    pl: '"Szukam pomocy przy ogrodzie w tę sobotę rano..."',
  },
  'welcome.howTitle': { en: 'Simple Acts, Big Impact', pl: 'Proste Działania, Wielka Zmiana' },
  'welcome.howSub': {
    en: 'Our process is designed to be frictionless, safe, and deeply personal.',
    pl: 'Nasz proces jest prosty, bezpieczny i głęboko osobisty.',
  },
  'welcome.step1.title': { en: 'Find Your Kindred', pl: 'Znajdź Swojego Sąsiada' },
  'welcome.step1.desc': {
    en: 'Browse local requests or offer your specific skills. We match hearts based on proximity and passion.',
    pl: 'Przeglądaj lokalne ogłoszenia lub zaoferuj swoje umiejętności. Łączymy ludzi na podstawie bliskości i pasji.',
  },
  'welcome.step2.title': { en: 'Connect Directly', pl: 'Połącz się Bezpośrednio' },
  'welcome.step2.desc': {
    en: 'Chat within our secure portal to finalize details. No awkward intermediaries, just neighbors talking to neighbors.',
    pl: 'Rozmawiaj przez bezpieczny portal. Żadnych pośredników — tylko sąsiedzi rozmawiający z sąsiadami.',
  },
  'welcome.step3.title': { en: 'Spark Joy', pl: 'Rozpal Radość' },
  'welcome.step3.desc': {
    en: 'Complete the task and share the story. Every fulfilled request strengthens the fabric of our hearth.',
    pl: 'Wykonaj zadanie i podziel się historią. Każda spełniona prośba wzmacnia naszą społeczność.',
  },
  'welcome.statsTitle': { en: 'Our Growing Hearth', pl: 'Nasza Rosnąca Społeczność' },
  'welcome.statsSub': {
    en: 'Real numbers from real people making a difference every single day.',
    pl: 'Prawdziwe liczby od prawdziwych ludzi, którzy codziennie robią różnicę.',
  },
  'welcome.stat1': { en: 'Requests Fulfilled', pl: 'Spełnionych próśb' },
  'welcome.stat2': { en: 'Local Organizers', pl: 'Lokalnych organizatorów' },
  'welcome.stat3': { en: 'Hours Volunteered', pl: 'Godzin wolontariatu' },
  'welcome.reach': { en: 'Neighborhood Reach', pl: 'Zasięg sąsiedzki' },
  'welcome.reachSub': {
    en: 'Spreading warmth across 45 unique communities and counting.',
    pl: 'Ciepło rozchodzi się po 45 unikalnych społecznościach i wciąż rośnie.',
  },
  'welcome.join': { en: 'Join Us', pl: 'Dołącz' },
  // Explore
  'explore.heading': { en: 'Find your next', pl: 'Znajdź swoją następną' },
  'explore.impact': { en: 'impact', pl: 'akcję' },
  'explore.sub': {
    en: 'Discover opportunities to connect with your community and make a meaningful difference today.',
    pl: 'Odkryj możliwości połączenia się ze społecznością i wprowadź znaczącą zmianę już dziś.',
  },
  'explore.gridView': { en: 'Grid View', pl: 'Siatka' },
  'explore.mapView': { en: 'Map View', pl: 'Mapa' },
  'explore.search': { en: 'Search opportunities near you...', pl: 'Szukaj ogłoszeń w pobliżu...' },
  'explore.anyDate': { en: 'Any Date', pl: 'Dowolna data' },
  'explore.allInterests': { en: 'All Interests', pl: 'Wszystkie' },
  'explore.count': { en: 'Local requests ', pl: 'Lokalne ogłoszenia' },
  'explore.loading': { en: 'Loading...', pl: 'Ładowanie...' },
  'explore.noResults': { en: 'No available requests in your area', pl: 'Brak dostępnych ogłoszeń w Twojej okolicy' },
  'explore.checkDetails': { en: 'Check details', pl: 'Sprawdź szczegóły' },
  'explore.volunteer': { en: 'Volunteer', pl: 'Dołącz' },
  // Point
  'point.notFound': { en: 'Request not found', pl: 'Nie znaleziono ogłoszenia' },
  'point.back': { en: 'Back to Explore', pl: 'Powrót do odkrywania' },
  'point.viewAllPhotos': { en: 'View all photos', pl: 'Zobacz wszystkie zdjęcia' },
  'point.signUp': { en: 'Sign Up as Volunteer', pl: 'Zapisz się jako wolontariusz' },
  'point.contact': { en: 'Contact Organizer', pl: 'Skontaktuj się z organizatorem' },
  'point.community': { en: 'Community Joining', pl: 'Dołączający' },
  'point.meeting': { en: 'Meeting Point', pl: 'Punkt zbiórki' },
  'point.dateTime': { en: 'Date & Time', pl: 'Data i godzina' },
  // Account
  'account.impact': { en: 'Impact Overview', pl: 'Podsumowanie aktywności' },
  'account.hours': { en: 'Hours Volunteered', pl: 'Godzin wolontariatu' },
  'account.projects': { en: 'Projects Completed', pl: 'Ukończonych projektów' },
  'account.upcoming': { en: 'Upcoming commitments', pl: 'Nadchodzące zobowiązania' },
  'account.myRequests': { en: 'My requests', pl: 'Moje ogłoszenia' },
  'account.edit': { en: 'Edit profile', pl: 'Edytuj profil' },
  'account.save': { en: 'Save', pl: 'Zapisz' },
  'account.cancel': { en: 'Cancel', pl: 'Anuluj' },
  'account.noRequests': { en: 'No requests yet', pl: 'Brak ogłoszeń' },
  // Post steps
  'post.step': { en: 'Step', pl: 'Krok' },
  'post.back': { en: 'Back', pl: 'Wstecz' },
  'post.of': { en: 'of', pl: 'z' },
  'post.step1.title': { en: 'Basic informations', pl: 'Podstawowe informacje' },
  'post.step1.titleLabel': { en: 'Give your request a clear title', pl: 'Nadaj ogłoszeniu jasny tytuł' },
  'post.step1.titleHint': {
    en: 'Think of this as a headline. Be specific so neighbors know exactly how they can lend a hand.',
    pl: 'Potraktuj to jak nagłówek. Bądź konkretny, żeby sąsiedzi wiedzieli dokładnie jak pomóc.',
  },
  'post.step1.titlePlaceholder': {
    en: 'e.g., Need help moving a sofa this Saturday',
    pl: 'np. Potrzebuję pomocy przy przeprowadzce w sobotę',
  },
  'post.step1.catLabel': { en: 'What kind of help do you need?', pl: 'Jakiego rodzaju pomocy potrzebujesz?' },
  'post.step1.catHint': {
    en: 'Selecting the right category helps us match you with the best available community members.',
    pl: 'Wybór właściwej kategorii pomoże nam dopasować najlepszych wolontariuszy.',
  },
  'post.step1.descLabel': { en: 'Describe the details', pl: 'Opisz szczegóły' },
  'post.step1.descHint': {
    en: 'Share a little more about the situation. The more detail you provide, the faster people can say "yes!"',
    pl: 'Opisz sytuację dokładniej. Im więcej szczegółów, tym szybciej ktoś powie "tak!"',
  },
  'post.step1.descPlaceholder': {
    en: "e.g., I'm moving from a 2nd-floor apartment...",
    pl: 'np. Przeprowadzam się z mieszkania na 2. piętrze...',
  },
  'post.step1.btn': { en: 'Continue to Time & Needs', pl: 'Przejdź do czasu i potrzeb' },
  'post.step1.titleRequired': { en: 'Title is required', pl: 'Tytuł jest wymagany' },
  'post.step1.tip': {
    en: "Requests with a friendly description and a clear photo (you'll add this later)",
    pl: 'Ogłoszenia z przyjaznym opisem i wyraźnym zdjęciem (dodasz je później) uzyskują więcej odpowiedzi.',
  },
  'post.step2.title': { en: 'Time & Needs', pl: 'Czas i potrzeby' },
  'post.step2.when': { en: 'When do you need help?', pl: 'Kiedy potrzebujesz pomocy?' },
  'post.step2.date': { en: 'Proposed Date', pl: 'Proponowana data' },
  'post.step2.dateRequired': { en: 'Date is required', pl: 'Data jest wymagana' },
  'post.step2.datePast': { en: 'Date cannot be in the past', pl: 'Data nie może być z przeszłości' },
  'post.step2.timeframe': { en: 'Set the timeframe', pl: 'Ustaw ramy czasowe' },
  'post.step2.start': { en: 'Start Time', pl: 'Godzina rozpoczęcia' },
  'post.step2.end': { en: 'Estimated End Time', pl: 'Szacowana godzina zakończenia' },
  'post.step2.timeRequired': { en: 'Start and end times are required', pl: 'Godzina rozpoczęcia i zakończenia są wymagane' },
  'post.step2.timeInvalid': { en: 'End time must be after start time', pl: 'Godzina zakończenia musi być późniejsza niż rozpoczęcia' },
  'post.step2.hands': { en: 'How many hands?', pl: 'Ile osób potrzebujesz?' },
  'post.step2.volunteers': { en: 'Number of volunteers', pl: 'Liczba wolontariuszy' },
  'post.step2.volunteersHint': {
    en: 'How many people are needed for this task?',
    pl: 'Ile osób jest potrzebnych do tego zadania?',
  },
  'post.step2.btn': { en: 'Add Media', pl: 'Dodaj zdjęcia' },
  'post.step2.tip1': {
    en: 'Allow for a 30-minute buffer for greeting and setup.',
    pl: 'Zostaw 30 minut na powitanie i przygotowanie.',
  },
  'post.step2.tip2': {
    en: 'For heavy tasks, 2-3 volunteers is usually ideal.',
    pl: 'Przy ciężkich zadaniach 2-3 wolontariuszy to zwykle ideał.',
  },
  'post.step2.tips': { en: 'Tips for Success', pl: 'Wskazówki' },
  'post.step3.title': { en: 'Add Media', pl: 'Dodaj zdjęcia' },
  'post.step3.upload': { en: 'Click or drag photos here', pl: 'Kliknij lub przeciągnij zdjęcia tutaj' },
  'post.step3.uploadHint': { en: 'Support for JPG, PNG, up to 10MB each', pl: 'Obsługuje JPG, PNG, do 10 MB każde' },
  'post.step3.uploading': { en: 'Uploading...', pl: 'Wysyłanie...' },
  'post.step3.uploaded': { en: 'Uploaded Photos', pl: 'Dodane zdjęcia' },
  'post.step3.files': { en: 'FILES', pl: 'PLIKI' },
  'post.step3.btn': { en: 'Add Localization', pl: 'Dodaj lokalizację' },
  'post.step4.title': { en: 'Place', pl: 'Miejsce' },
  'post.step4.where': { en: 'Where is it?', pl: 'Gdzie to jest?' },
  'post.step4.street': { en: 'Street Address', pl: 'Ulica i numer' },
  'post.step4.city': { en: 'City', pl: 'Miasto' },
  'post.step4.postal': { en: 'Postal Code', pl: 'Kod pocztowy' },
  'post.step4.geocoding': { en: 'Finding address on the map...', pl: 'Szukanie adresu na mapie...' },
  'post.step4.enterAddress': { en: 'Please enter the address to see the location on the map', pl: 'Wprowadź adres, aby zobaczyć lokalizację na mapie' },
  'post.step4.btn': { en: 'Send to accept', pl: 'Wyślij do akceptacji' },
  'post.step4.submitting': { en: 'Submitting...', pl: 'Wysyłanie...' },
  // Admin
  'admin.title': { en: 'Pending Moderation', pl: 'Oczekujące na moderację' },
  'admin.review': { en: 'Review', pl: 'Przejrzyj' },
  'admin.count': { en: 'announcements pending', pl: 'ogłoszeń oczekuje' },
  'admin.heading': { en: 'Pending', pl: 'Oczekujące' },
  'admin.headingAccent': { en: 'moderation', pl: 'moderacji' },
  'admin.sub': {
    en: 'Review and approve new community announcements before they go live.',
    pl: 'Przejrzyj i zaakceptuj nowe ogłoszenia społeczności zanim staną się publiczne.',
  },
  'admin.live': { en: 'Live Queue', pl: 'Kolejka na żywo' },
  'admin.search': { en: 'Search announcements...', pl: 'Szukaj ogłoszeń...' },
  'admin.filterAll': { en: 'All', pl: 'Wszystkie' },
  'admin.stats.pending': { en: 'Pending', pl: 'Oczekujące' },
  'admin.stats.today': { en: 'Approved today', pl: 'Dziś zatwierdzone' },
  'admin.stats.week': { en: 'This week', pl: 'Ten tydzień' },
  'admin.stats.avgTime': { en: 'Avg response', pl: 'Średni czas' },
  'admin.postedBy': { en: 'Posted by', pl: 'Dodał(a)' },
  'admin.empty.title': { en: "You're all caught up", pl: 'Wszystko obrobione' },
  'admin.empty.sub': {
    en: 'No announcements waiting for review. Great job!',
    pl: 'Brak ogłoszeń oczekujących na moderację. Dobra robota!',
  },
  // Form errors
  'form.required': { en: 'Please fill in all fields', pl: 'Wypełnij wszystkie pola' },
  'form.passwordMismatch': { en: 'Passwords do not match', pl: 'Hasła nie są identyczne' },
  // Categories
  'cat.allInterests': { en: 'All Interests', pl: 'Wszystkie' },
  'cat.animals': { en: 'Animals', pl: 'Zwierzęta' },
  'cat.elderlyCare': { en: 'Elderly Care', pl: 'Seniorzy' },
  'cat.ecology': { en: 'Ecology', pl: 'Ekologia' },
  'cat.emergency': { en: 'Emergency', pl: 'Nagłe przypadki' },
  'cat.0': { en: 'Moving & Lifting', pl: 'Przeprowadzka' },
  'cat.1': { en: 'Gardening', pl: 'Ogrodnictwo' },
  'cat.2': { en: 'Pet Care', pl: 'Opieka nad zwierzętami' },
  'cat.3': { en: 'Grocery Pickup', pl: 'Zakupy' },
  'cat.4': { en: 'Handyman', pl: 'Majsterkowanie' },
  // Review
  'review.userHas': { en: 'User has', pl: 'Użytkownik posiada już' },
  'review.otherAnnouncements': { en: 'other announcements', pl: 'inne ogłoszenia' },
  'review.fullProfile': { en: 'View full profile', pl: 'Zobacz pełny profil' },
  'review.category': { en: 'Category', pl: 'Kategoria' },
  'review.choose': { en: 'Choose...', pl: 'Wybierz...' },
  'review.help': { en: 'Help', pl: 'Pomoc' },
  'review.giveaway': { en: 'Give away for free', pl: 'Oddaj za darmo' },
  'review.notePlaceholder': {
    en: 'Click here to add a note for users',
    pl: 'Naciśnij tutaj, aby dodać notatkę dla użytkowników',
  },
  'review.accept': { en: 'Accept', pl: 'Zaakceptuj' },
  'review.rejectPlaceholder': {
    en: 'Click here to write a rejection reason',
    pl: 'Naciśnij tutaj, aby napisać uzasadnienie',
  },
  'review.reject': { en: 'Reject', pl: 'Odrzuć' },
  // Login / Register
  'login.title1': { en: 'Login and', pl: 'Zaloguj się i' },
  'login.title2': { en: 'Help', pl: 'Pomóż' },
  'login.login': { en: 'Login', pl: 'Login' },
  'login.password': { en: 'Password', pl: 'Hasło' },
  'login.btn': { en: 'Login', pl: 'Zaloguj się' },
  'login.noAccount': { en: "If u dn't have account -", pl: 'Nie masz konta -' },
  'login.create': { en: 'Create one', pl: 'Utwórz je' },
  'register.title1': { en: 'Register and', pl: 'Zarejestruj się i' },
  'register.title2': { en: 'Post', pl: 'Dodaj ogłoszenie' },
  'register.nickname': { en: 'Nickname', pl: 'Nazwa użytkownika' },
  'register.email': { en: 'E-mail', pl: 'E-mail' },
  'register.password': { en: 'Password', pl: 'Hasło' },
  'register.btn': { en: 'Register', pl: 'Zarejestruj się' },
  'register.hasAccount': { en: 'I have an account -', pl: 'Mam już konto -' },
  'register.login': { en: 'Login', pl: 'Zaloguj się' },
} as const satisfies Record<string, Record<Lang, string>>

const LanguageContext = createContext<LangCtx>({
  lang: 'pl',
  toggle: () => {},
  t: (key) => key,
})

const LANG_STORAGE_KEY = 'lang'

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Lang | null
    return savedLang === 'en' ? 'en' : 'pl'
  })

  const toggle = () => {
    setLang((prevLang) => {
      const newLang = prevLang === 'en' ? 'pl' : 'en'
      localStorage.setItem(LANG_STORAGE_KEY, newLang)
      return newLang
    })
  }

  const t = (key: keyof typeof translations) => translations[key]?.[lang] ?? key

  return <LanguageContext.Provider value={{ lang, toggle, t }}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext)
