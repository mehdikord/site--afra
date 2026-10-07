export type TransactionType = "فروش" | "رهن" | "اجاره" | "مشارکت در فروش";
export type PropertyType = "مسکونی" | "تجاری" | "اداری" | "زمین" | "ویلا" | "سایر";
export type Badge = "ویژه" | "پیشنهاد افرا" | "جدید" | "فوری" | null;

export interface Property {
  id: string;
  code: string;
  title: string;
  transaction: TransactionType;
  type: PropertyType;
  location: string;
  district: string;
  price: number; // sale price OR monthly rent in Toman
  deposit?: number; // rahn deposit in Toman
  priceLabel: string;
  area: number;
  rooms: number;
  floor: number;
  buildingFloors: number;
  parking: number;
  storage: boolean;
  elevator: boolean;
  age: number; // years, 0 = نوساز
  badge: Badge;
  featured?: boolean;
  available: boolean;
  images: string[];
  description: string;
  facilities: string[];
  heating: string;
  cooling: string;
  view: string;
  renovation: string;
  map: { x: number; y: number }; // position on the mock map (%)
  postedDaysAgo: number;
}

const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const HERO_IMAGES = {
  main: u("photo-1613490493576-7fde63acd811", 2000),
  card1: u("photo-1600607687939-ce8a6c25118c", 800),
  card2: u("photo-1600596542815-ffad4c1539a9", 800),
  skyline: u("photo-1477959858617-67f85cf4f1df", 1600),
};

export const PROPERTIES: Property[] = [
  {
    id: "niavaran-penthouse",
    code: "AF-1042",
    title: "پنت‌هاوس مدرن با ویوی ابدی شهر",
    transaction: "فروش",
    type: "مسکونی",
    location: "نیاوران، خیابان بهار",
    district: "نیاوران",
    price: 68_500_000_000,
    priceLabel: "قیمت کل",
    area: 320,
    rooms: 4,
    floor: 12,
    buildingFloors: 12,
    parking: 3,
    storage: true,
    elevator: true,
    age: 2,
    badge: "پیشنهاد افرا",
    featured: true,
    available: true,
    images: [
      u("photo-1600596542815-ffad4c1539a9"),
      u("photo-1600607687939-ce8a6c25118c"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1600210492486-724fe5c67fb0"),
    ],
    description:
      "پنت‌هاوسی استثنایی در قلب نیاوران با طراحی مینیمال، نورگیری فوق‌العاده و تراسی رو به چشم‌انداز بی‌نظیر شهر. متریال درجه‌یک، آشپزخانه‌ی تمام‌مدرن و هوشمندسازی کامل ساختمان، این واحد را به انتخابی متمایز برای زندگی لوکس تبدیل کرده است. دسترسی عالی به مراکز تجاری و بزرگراه‌ها از دیگر مزیت‌های این فایل منتخب افراست.",
    facilities: ["استخر و سونا", "سالن بدنسازی", "لابی مجلل", "سیستم هوشمند", "آشپزخانه مدرن", "تراس بزرگ", "سرایداری ۲۴ ساعته", "دوربین مداربسته"],
    heating: "شوفاژ مرکزی + پکیج",
    cooling: "چیلر مرکزی",
    view: "چشم‌انداز ۳۶۰ درجه شهر و کوهستان",
    renovation: "نوساز، بدون نیاز به بازسازی",
    map: { x: 68, y: 22 },
    postedDaysAgo: 2,
  },
  {
    id: "zaferanieh-villa",
    code: "AF-1038",
    title: "ویلای دوبلکس با استخر چهارفصل",
    transaction: "فروش",
    type: "ویلا",
    location: "زعفرانیه، خیابان مقدس اردبیلی",
    district: "زعفرانیه",
    price: 145_000_000_000,
    priceLabel: "قیمت کل",
    area: 650,
    rooms: 5,
    floor: 0,
    buildingFloors: 3,
    parking: 4,
    storage: true,
    elevator: false,
    age: 5,
    badge: "ویژه",
    featured: true,
    available: true,
    images: [
      u("photo-1613977257363-707ba9348227"),
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600573472592-401b489a3cdc"),
      u("photo-1600566752355-35792bedcfea"),
    ],
    description:
      "ویلای سه‌طبقه‌ی دوبلکس در یکی از بهترین کوچه‌های زعفرانیه با حیاط محوطه‌سازی‌شده، استخر چهارفصل سرپوشیده و سالن پذیرایی دوبلکس با سقف بلند. ترکیبی از معماری مدرن و حس آرامش باغ‌شهر؛ مناسب خانواده‌هایی که حریم خصوصی و کیفیت ساخت برایشان اولویت است.",
    facilities: ["استخر چهارفصل", "جکوزی", "حیاط محوطه‌سازی‌شده", "سالن سینما", "آشپزخانه صنعتی", "اتاق مستر با حمام", "سیستم امنیتی", "باربیکیو"],
    heating: "موتورخانه مرکزی",
    cooling: "داکت اسپلیت",
    view: "حیاط اختصاصی و فضای سبز",
    renovation: "بازسازی کامل ۲ سال پیش",
    map: { x: 30, y: 30 },
    postedDaysAgo: 5,
  },
  {
    id: "elahieh-office",
    code: "AF-1031",
    title: "واحد اداری نورگیر در برج تجاری",
    transaction: "اجاره",
    type: "اداری",
    location: "الهیه، بلوار آفریقا",
    district: "الهیه",
    price: 95_000_000,
    deposit: 2_800_000_000,
    priceLabel: "اجاره ماهانه",
    area: 180,
    rooms: 3,
    floor: 8,
    buildingFloors: 14,
    parking: 2,
    storage: true,
    elevator: true,
    age: 4,
    badge: "فوری",
    featured: true,
    available: true,
    images: [
      u("photo-1497366216548-37526070297c"),
      u("photo-1497366811353-6870744d04b2"),
      u("photo-1524758631624-e2822e304c36"),
    ],
    description:
      "واحد اداری ۱۸۰ متری در برجی مدرن با لابی اختصاصی، سالن کنفرانس و پارکینگ اختصاصی. موقعیت اداری ممتاز در بلوار آفریقا با دسترسی سریع به اتوبان مدرس؛ گزینه‌ای ایده‌آل برای شرکت‌های فناوری و هولدینگ‌ها.",
    facilities: ["سالن کنفرانس", "لابی اختصاصی", "اینترنت فیبر", "سیستم اعلام حریق", "کافی‌بار", "اتاق سرور"],
    heating: "فن‌کوئل",
    cooling: "چیلر مرکزی",
    view: "چشم‌انداز شهری",
    renovation: "تجهیز کامل اداری",
    map: { x: 52, y: 45 },
    postedDaysAgo: 1,
  },
  {
    id: "saadatabad-res",
    code: "AF-1027",
    title: "آپارتمان ۱۵۰ متری فول‌امکانات",
    transaction: "رهن",
    type: "مسکونی",
    location: "سعادت‌آباد، بلوار دریا",
    district: "سعادت‌آباد",
    price: 0,
    deposit: 4_500_000_000,
    priceLabel: "رهن کامل",
    area: 150,
    rooms: 3,
    floor: 5,
    buildingFloors: 9,
    parking: 2,
    storage: true,
    elevator: true,
    age: 7,
    badge: "جدید",
    featured: true,
    available: true,
    images: [
      u("photo-1522708323590-d24dbb6b0267"),
      u("photo-1560448204-e02f11c3d0e2"),
      u("photo-1502672260266-1c1ef2d93688"),
    ],
    description:
      "واحد ۱۵۰ متری خوش‌نقشه با سه خواب مستر، آشپزخانه‌ی اوپن و نور عالی در برجی آرام و خانوادگی. رهن کامل با شرایط منعطف؛ مناسب سکونت بلندمدت در یکی از محبوب‌ترین محله‌های غرب تهران.",
    facilities: ["سالن اجتماعات", "پارکینگ اختصاصی", "انباری بزرگ", "بالکن", "کمد دیواری", "نورگیر عالی"],
    heating: "پکیج",
    cooling: "کولر گازی",
    view: "رو به فضای سبز مجتمع",
    renovation: "سرویس کامل تاسیسات",
    map: { x: 20, y: 58 },
    postedDaysAgo: 3,
  },
  {
    id: "farmanieh-duplex",
    code: "AF-1019",
    title: "دوبلکس لوکس با روف‌گاردن خصوصی",
    transaction: "فروش",
    type: "مسکونی",
    location: "فرمانیه، خیابان دیباجی",
    district: "فرمانیه",
    price: 42_000_000_000,
    priceLabel: "قیمت کل",
    area: 240,
    rooms: 3,
    floor: 6,
    buildingFloors: 7,
    parking: 2,
    storage: true,
    elevator: true,
    age: 0,
    badge: "پیشنهاد افرا",
    featured: true,
    available: true,
    images: [
      u("photo-1600607687920-4e2a09cf159d"),
      u("photo-1600585154526-990dced4db0d"),
      u("photo-1600121848594-d8644e57abab"),
    ],
    description:
      "دوبلکس نوساز با روف‌گاردن اختصاصی، طراحی دکوراسیون اروپایی و متریال وارداتی. طبقه‌ی بالا با نشیمن خصوصی و دسترسی مستقیم به روف؛ تجربه‌ای متفاوت از زندگی در فرمانیه با امضای کیفی افرا.",
    facilities: ["روف‌گاردن اختصاصی", "آسانسور اختصاصی", "آشپزخانه جزیره", "کف گرمایش", "هوشمندسازی", "لاندری"],
    heating: "کف گرمایش + پکیج",
    cooling: "داکت اسپلیت",
    view: "روف‌گاردن و چشم‌انداز شهر",
    renovation: "نوساز، کلیدنخورده",
    map: { x: 74, y: 48 },
    postedDaysAgo: 6,
  },
  {
    id: "vanak-retail",
    code: "AF-1015",
    title: "مغازه بر خیابان با ویترین عالی",
    transaction: "مشارکت در فروش",
    type: "تجاری",
    location: "ونک، خیابان ملاصدرا",
    district: "ونک",
    price: 28_000_000_000,
    priceLabel: "قیمت پیشنهادی",
    area: 95,
    rooms: 1,
    floor: 0,
    buildingFloors: 5,
    parking: 1,
    storage: true,
    elevator: false,
    age: 12,
    badge: "ویژه",
    featured: false,
    available: true,
    images: [
      u("photo-1441986300917-64674bd600d8"),
      u("photo-1486406146926-c627a92ad1ab"),
      u("photo-1567401893414-76b7b1e5a7a5"),
    ],
    description:
      "واحد تجاری ۹۵ متری بر اصلی ملاصدرا با پاخور فوق‌العاده و ویترین ۸ متری. مناسب برندها، کافه‌رستوران و خدمات لوکس؛ با امکان مشارکت در فروش و شرایط سرمایه‌گذاری ویژه از طریق مشاوران افرا.",
    facilities: ["ویترین ۸ متری", "انباری", "سرویس بهداشتی", "برق سه‌فاز", "سیستم تهویه"],
    heating: "پکیج",
    cooling: "داکت اسپلیت",
    view: "بر خیابان اصلی",
    renovation: "نیاز به نوسازی جزئی",
    map: { x: 45, y: 68 },
    postedDaysAgo: 9,
  },
  {
    id: "shahrak-land",
    code: "AF-1009",
    title: "زمین مسکونی با جواز ساخت",
    transaction: "فروش",
    type: "زمین",
    location: "شهرک غرب، بلوار دادمان",
    district: "شهرک غرب",
    price: 55_000_000_000,
    priceLabel: "قیمت کل",
    area: 480,
    rooms: 0,
    floor: 0,
    buildingFloors: 0,
    parking: 0,
    storage: false,
    elevator: false,
    age: 0,
    badge: null,
    featured: false,
    available: true,
    images: [
      u("photo-1500382017468-9049fed747ef"),
      u("photo-1449844908441-8829872d2607"),
    ],
    description:
      "قطعه زمین ۴۸۰ متری با جواز ساخت معتبر و بر مناسب در بلوکی آرام از شهرک غرب. موقعیت عالی برای ساخت آپارتمان لوکس یا ویلای اختصاصی؛ با همراهی تیم مشاوره‌ی ساخت‌وساز افرا از جواز تا اجرا.",
    facilities: ["جواز ساخت", "بر ۱۴ متری", "سند تک‌برگ", "امکان ساخت ۵ طبقه"],
    heating: "—",
    cooling: "—",
    view: "—",
    renovation: "زمین خام",
    map: { x: 24, y: 40 },
    postedDaysAgo: 12,
  },
  {
    id: "gheytarieh-apt",
    code: "AF-1004",
    title: "آپارتمان دنج دوخوابه نزدیک پارک",
    transaction: "اجاره",
    type: "مسکونی",
    location: "قیطریه، روبه‌روی پارک",
    district: "قیطریه",
    price: 38_000_000,
    deposit: 1_200_000_000,
    priceLabel: "اجاره ماهانه",
    area: 105,
    rooms: 2,
    floor: 3,
    buildingFloors: 6,
    parking: 1,
    storage: true,
    elevator: true,
    age: 9,
    badge: "جدید",
    featured: false,
    available: true,
    images: [
      u("photo-1502672260266-1c1ef2d93688"),
      u("photo-1560185127-6ed189bf02f4"),
      u("photo-1560185009-5bf9f2849488"),
    ],
    description:
      "واحد دوخوابه‌ی دنج و نورگیر روبه‌روی پارک قیطریه؛ با ودیعه‌ی متعارف و اجاره‌ی منصفانه. ساختمان آرام، همسایه‌های خوب و دسترسی پیاده به مترو و مراکز خرید؛ انتخابی هوشمندانه برای زوج‌های جوان.",
    facilities: ["پارکینگ", "انباری", "بالکن", "کمد دیواری", "نزدیک مترو"],
    heating: "شوفاژ",
    cooling: "کولر آبی",
    view: "رو به پارک",
    renovation: "نقاشی و سرویس تازه",
    map: { x: 60, y: 62 },
    postedDaysAgo: 4,
  },
  {
    id: "tehranpars-commercial",
    code: "AF-0998",
    title: "طبقه تجاری در مجتمع چندمنظوره",
    transaction: "فروش",
    type: "تجاری",
    location: "تهرانپارس، خیابان جشنواره",
    district: "تهرانپارس",
    price: 19_500_000_000,
    priceLabel: "قیمت کل",
    area: 210,
    rooms: 2,
    floor: 2,
    buildingFloors: 4,
    parking: 3,
    storage: true,
    elevator: true,
    age: 6,
    badge: null,
    featured: false,
    available: false,
    images: [
      u("photo-1486406146926-c627a92ad1ab"),
      u("photo-1556761175-b413da4baf72"),
      u("photo-1524758631624-e2822e304c36"),
    ],
    description:
      "طبقه‌ی دوم تجاری ۲۱۰ متری در مجتمعی پرتردد با سه پارکینگ اختصاصی. مناسب کلینیک، آموزشگاه و دفاتر خدماتی؛ بازدهی اجاره‌ی مناسب در شرق تهران. (این فایل در حال حاضر رزرو است.)",
    facilities: ["سه پارکینگ", "دو سرویس", "آبدارخانه", "سیستم اطفای حریق"],
    heating: "فن‌کوئل",
    cooling: "چیلر",
    view: "بر خیابان",
    renovation: "آماده بهره‌برداری",
    map: { x: 84, y: 72 },
    postedDaysAgo: 15,
  },
];

export const DISTRICTS = [
  "نیاوران",
  "زعفرانیه",
  "الهیه",
  "فرمانیه",
  "سعادت‌آباد",
  "شهرک غرب",
  "ونک",
  "قیطریه",
  "تهرانپارس",
];

export const TRANSACTION_TYPES: TransactionType[] = ["فروش", "رهن", "اجاره", "مشارکت در فروش"];
export const PROPERTY_TYPES: PropertyType[] = ["مسکونی", "تجاری", "اداری", "زمین", "ویلا", "سایر"];

/* ------------------------------ services ------------------------------ */
export interface Service {
  slug: string;
  title: string;
  short: string;
  desc: string;
  icon: string;
  accent: "magenta" | "emerald" | "sunset";
  points: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "buy-sell",
    title: "مشاوره خرید و فروش ملک",
    short: "همراهی تخصصی از انتخاب تا سند",
    desc: "از تحلیل بازار و قیمت‌گذاری منصفانه تا مذاکره و انتقال سند؛ در تمام مراحل خرید و فروش کنار شما هستیم تا معامله‌ای امن و هوشمندانه داشته باشید.",
    icon: "KeyRound",
    accent: "magenta",
    points: ["تحلیل قیمت و کارشناسی ملک", "مذاکره حرفه‌ای", "بررسی حقوقی و سند", "همراهی تا انتقال سند"],
  },
  {
    slug: "investment",
    title: "مشاوره سرمایه‌گذاری",
    short: "رشد سرمایه با استراتژی ملکی",
    desc: "شناسایی فرصت‌های سرمایه‌گذاری با بازدهی واقعی، تحلیل ریسک و طراحی سبد ملکی متناسب با اهداف مالی شما.",
    icon: "TrendingUp",
    accent: "emerald",
    points: ["تحلیل بازدهی و ریسک", "معرفی فرصت‌های منتخب", "استراتژی خرید و فروش", "مدیریت سبد ملکی"],
  },
  {
    slug: "rent",
    title: "مشاوره رهن و اجاره",
    short: "اجاره‌ای سریع، شفاف و بی‌دردسر",
    desc: "فایل‌های منتخب رهن و اجاره با قیمت واقعی بازار، قرارداد استاندارد و پشتیبانی در تمام مدت اجاره.",
    icon: "FileSignature",
    accent: "sunset",
    points: ["فایل‌های به‌روز و واقعی", "تنظیم قرارداد استاندارد", "کارشناسی ودیعه و اجاره", "پشتیبانی دوره اجاره"],
  },
  {
    slug: "construction",
    title: "مشاوره ساخت و ساز",
    short: "از زمین تا کلید، حرفه‌ای بسازید",
    desc: "مشاوره تخصصی مشارکت در ساخت، مدیریت پروژه و نظارت بر کیفیت اجرا برای سازندگان و مالکان زمین.",
    icon: "Building2",
    accent: "magenta",
    points: ["تحلیل توجیه پروژه", "قرارداد مشارکت اصولی", "نظارت بر کیفیت ساخت", "بازاریابی و فروش پروژه"],
  },
  {
    slug: "evaluation",
    title: "ارزیابی و بررسی ملک",
    short: "کارشناسی دقیق، تصمیم مطمئن",
    desc: "بررسی فنی، حقوقی و قیمتی ملک پیش از معامله؛ گزارش شفاف کارشناسی تا با اطمینان کامل تصمیم بگیرید.",
    icon: "ClipboardCheck",
    accent: "emerald",
    points: ["کارشناسی فنی ساختمان", "استعلام حقوقی و سند", "تحلیل قیمت منطقه", "گزارش کتبی کارشناسی"],
  },
  {
    slug: "deals",
    title: "همراهی تخصصی در معاملات",
    short: "وکیل ملکی شما در هر معامله",
    desc: "حضور مشاور ارشد افرا در جلسات مذاکره، بررسی قراردادها و مدیریت ریسک‌های حقوقی معامله.",
    icon: "ShieldCheck",
    accent: "sunset",
    points: ["حضور در مذاکرات", "بازبینی قرارداد", "مدیریت ریسک حقوقی", "پیگیری تا تحویل ملک"],
  },
];

/* -------------------------------- team -------------------------------- */
export interface Member {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  phone: string;
}

export const TEAM: Member[] = [
  {
    name: "مهندس آرش افراز",
    role: "بنیان‌گذار و مدیر ارشد",
    specialty: "سرمایه‌گذاری و معاملات کلان",
    bio: "بیش از یک دهه تجربه در بازار ملک تهران؛ متخصص معاملات شمال شهر و طراحی استراتژی سرمایه‌گذاری ملکی.",
    image: u("photo-1560250097-0b93528c311a", 600),
    phone: "۰۹۱۲ ـــ ــــ",
  },
  {
    name: "سارا محمدی",
    role: "مشاور ارشد خرید و فروش",
    specialty: "آپارتمان‌های لوکس شمال تهران",
    bio: "کارشناس فروش املاک لوکس با شناخت عمیق از مناطق ۱ و ۳؛ همراه مطمئن خریداران سخت‌پسند.",
    image: u("photo-1573496359142-b8d87734a5a2", 600),
    phone: "۰۹۱۲ ـــ ــــ",
  },
  {
    name: "رضا کریمی",
    role: "مشاور رهن و اجاره",
    specialty: "غرب تهران و شهرک غرب",
    bio: "متخصص بازار رهن و اجاره با صدها قرارداد موفق؛ سریع، دقیق و پاسخ‌گو در تمام مراحل اجاره.",
    image: u("photo-1472099645785-5658abf4ff4e", 600),
    phone: "۰۹۱۲ ـــ ــــ",
  },
  {
    name: "نگار احمدی",
    role: "مشاور سرمایه‌گذاری",
    specialty: "تحلیل بازار و سبد ملکی",
    bio: "تحلیلگر بازار ملک با رویکرد داده‌محور؛ کمک به سرمایه‌گذاران برای انتخاب فرصت‌های واقعی و کم‌ریسک.",
    image: u("photo-1580489944761-15a19d654956", 600),
    phone: "۰۹۱۲ ـــ ــــ",
  },
];

/* ----------------------------- testimonials ---------------------------- */
export interface Testimonial {
  name: string;
  role: string;
  kind: string;
  rating: number;
  text: string;
  image: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "خانواده نادری",
    role: "خریدار آپارتمان در سعادت‌آباد",
    kind: "خرید مسکونی",
    rating: 5,
    text: "از روز اول تا روز سند، همه‌چیز شفاف و حرفه‌ای پیش رفت. کارشناسی قیمتی افرا باعث شد ملکی زیر قیمت بازار بخریم.",
    image: u("photo-1544005313-94ddf0286df2", 200),
  },
  {
    name: "آقای صادقی",
    role: "سرمایه‌گذار",
    kind: "سرمایه‌گذاری",
    rating: 5,
    text: "تحلیل‌های دقیق بازار و معرفی فرصت‌های واقعی، نگاه من به سرمایه‌گذاری ملکی را کاملاً عوض کرد.",
    image: u("photo-1507003211169-0a1dd7228f2d", 200),
  },
  {
    name: "خانم رضایی",
    role: "مستأجر در قیطریه",
    kind: "رهن و اجاره",
    rating: 5,
    text: "در کمتر از یک هفته، خانه‌ای دقیقاً مطابق سلیقه و بودجه‌ام پیدا کردند. قرارداد هم کاملاً استاندارد بود.",
    image: u("photo-1438761681033-6461ffad8d80", 200),
  },
];

/* ------------------------------- about -------------------------------- */
export const MILESTONES = [
  { title: "شروع فعالیت افرا", desc: "آغاز کار با تمرکز بر مشاوره تخصصی خرید و فروش در شمال تهران." },
  { title: "توسعه تیم مشاوران", desc: "پیوستن مشاوران ارشد در حوزه‌های سرمایه‌گذاری و رهن و اجاره." },
  { title: "راه‌اندازی واحد ساخت‌وساز", desc: "ورود تخصصی به حوزه مشارکت در ساخت و مشاوره پروژه‌های ساختمانی." },
  { title: "پلتفرم هوشمند افرا", desc: "توسعه تجربه دیجیتال جست‌وجوی هوشمند و کشف ملک روی نقشه." },
  { title: "امروز افرا", desc: "برندی مرجع برای معاملات امن و انتخاب‌های هوشمندانه ملکی." },
];

export const VALUES = [
  { title: "شفافیت", desc: "قیمت واقعی، اطلاعات واقعی، بدون فایل صوری." },
  { title: "تخصص", desc: "مشاوره بر پایه شناخت عمیق بازار، نه حدس و گمان." },
  { title: "امنیت معامله", desc: "بررسی حقوقی و همراهی تا لحظه آخر سند." },
  { title: "احترام به مشتری", desc: "گوش دادن واقعی و پیشنهاد متناسب با نیاز شما." },
];

export const ABOUT_IMAGES = {
  main: u("photo-1487958449943-2429e8be8625"),
  second: u("photo-1600585154340-be6161a56a0c"),
  third: u("photo-1449824913935-59a10b8d2000"),
};
