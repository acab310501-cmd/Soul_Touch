import type { LucideIcon } from 'lucide-react';
import { Hand, Flower2, Flame, Droplets, Sparkles, Wind } from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  icon: LucideIcon;
  short: string;
  full: string;
  duration: string;
  price: string;
  benefits: string[];
};

export const services: Service[] = [
  {
    id: 'classic',
    title: 'Классический массаж',
    icon: Hand,
    short: 'Глубокое расслабление мышц. Снятие напряжения и улучшение кровообращения',
    full: 'Классический массаж — это фундамент восстановления. Плавные, ритмичные движения мастера снимают поверхностное и глубокое напряжение, возвращают мышцам эластичность, а телу — лёгкость. Идеально подходит для первого знакомства со студией и для регулярного поддержания формы.',
    duration: '60 / 90 мин',
    price: 'от 3 500 ₽',
    benefits: ['Снятие мышечного напряжения', 'Улучшение кровообращения', 'Повышение тонуса кожи', 'Глубокий отдых'],
  },
  {
    id: 'thai',
    title: 'Тайский массаж',
    icon: Flower2,
    short: 'Древняя практика восстановления энергии и гибкости',
    full: 'Тайский массаж — это древнее искусство работы с энергетическими линиями тела. Мастер использует мягкие растяжки, надавливания и акробатические движения, чтобы раскрыть суставы, освободить заблокированную энергию и вернуть телу подвижность. Вы уйдёте с ощущением, будто заново родились.',
    duration: '90 мин',
    price: '5 500 ₽',
    benefits: ['Восстановление гибкости', 'Работа с энергетическими линиями', 'Снятие блоков в теле', 'Бодрость и лёгкость'],
  },
  {
    id: 'stone',
    title: 'Стоун-терапия',
    icon: Flame,
    short: 'Тепло вулканических камней для глубокого расслабления',
    full: 'Стоун-терапия использует тепло вулканических базальтовых камней, которые мастер размещает на ключевых точках тела. Глубокое, проникающее тепло плавит напряжение, улучшает обмен веществ и погружает в состояние медитативного покоя. Камни словно забирают усталость в землю.',
    duration: '80 мин',
    price: '6 000 ₽',
    benefits: ['Глубокое прогревание мышц', 'Снятие хронического напряжения', 'Улучшение обмена веществ', 'Медитативное расслабление'],
  },
  {
    id: 'lymph',
    title: 'Лимфодренаж',
    icon: Droplets,
    short: 'Мягкие движения для выведения токсинов и улучшения лимфотока',
    full: 'Лимфодренажный массаж — это деликатная, но мощная техника, которая запускает естественный отток лишней жидкости и токсинов. Лёгкие, волнообразные движения мастера стимулируют лимфатическую систему, снимают отёчность и возвращают телу свежесть. Ощущение обновления, которое видно в зеркале.',
    duration: '60 мин',
    price: 'от 3 500 ₽',
    benefits: ['Снятие отёчности', 'Выведение токсинов', 'Улучшение лимфотока', 'Видимый эффект свежести'],
  },
  {
    id: 'anti-cellulite',
    title: 'Антицеллюлитный',
    icon: Sparkles,
    short: 'Интенсивная техника для упругости кожи и разглаживания',
    full: 'Антицеллюлитный массаж — это интенсивная, целенаправленная работа с проблемными зонами. Мастер использует специальные техники разогрева, разминания и лимфодренажа, которые стимулируют микроциркуляцию, повышают упругость кожи и выравнивают рельеф. Курс даёт видимый результат уже после нескольких сеансов.',
    duration: '60 мин',
    price: 'от 3 500 ₽',
    benefits: ['Упругость кожи', 'Выравнивание рельефа', 'Активизация микроциркуляции', 'Видимый результат'],
  },
  {
    id: 'spa-ritual',
    title: 'SPA-ритуал',
    icon: Wind,
    short: 'Комплекс: массаж + обёртывание + ароматерапия',
    full: 'SPA-ритуал — это полное путешествие к гармонии. Два часа, в которых соединены массаж, обёртывание с натуральными составами, ароматерапия и работа с энергетикой тела. Вы погружаетесь в атмосферу свечей, мягкой музыки и тёплых масел — и выходите другим человеком. Это лучший подарок себе.',
    duration: '120 мин',
    price: '8 500 ₽',
    benefits: ['Полное обновление', 'Обёртывание + ароматерапия', 'Глубокий эмоциональный отдых', 'Ощущение перерождения'],
  },
];

export type Master = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  photo: string;
  bio: string;
};

export const masters: Master[] = [
  {
    id: 'elena',
    name: 'Елена Воронова',
    specialty: 'Тайский массаж · Стоун-терапия',
    experience: '12 лет практики',
    photo: 'https://images.pexels.com/photos/3998007/pexels-photo-3998007.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bio: 'Елена обучалась тайскому массажу в Чиангмае и привезла оттуда подлинное искусство работы с телом. Её прикосновение — это медленный, глубокий разговор с каждой мышцей.',
  },
  {
    id: 'marina',
    name: 'Марина Лебедева',
    specialty: 'Классический массаж · Лимфодренаж',
    experience: '9 лет практики',
    photo: 'https://images.pexels.com/photos/6076102/pexels-photo-6076102.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bio: 'Марина находит подход к каждому телу — от первого сеанса она чувствует, где живёт напряжение. Её специализация — мягкое, но глубокое восстановление.',
  },
  {
    id: 'anna',
    name: 'Анна Соколова',
    specialty: 'SPA-ритуалы · Ароматерапия',
    experience: '7 лет практики',
    photo: 'https://images.pexels.com/photos/3865545/pexels-photo-3865545.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bio: 'Анна создаёт ритуалы, в которых время замедляется. Она подбирает масла и ароматы под настроение гостя и превращает каждый сеанс в личное путешествие.',
  },
  {
    id: 'dmitry',
    name: 'Дмитрий Козлов',
    specialty: 'Антицеллюлитный · Спортивный',
    experience: '10 лет практики',
    photo: 'https://images.pexels.com/photos/19641806/pexels-photo-19641806.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    bio: 'Дмитрий работает с теми, кому нужен результат — интенсивная работа с телом, спортивное восстановление и чёткий план курса. Его руки знают, где живёт усталость.',
  },
];

export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  service: string;
  photo: string;
};

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Ольга',
    text: 'После стоун-терапии я словно заново родилась. Глубокое тепло камней сняло напряжение, которое я носила месяцами. Это не массаж — это ритуал возвращения к себе.',
    rating: 5,
    service: 'Стоун-терапия',
    photo: 'https://images.pexels.com/photos/1820575/pexels-photo-1820575.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'r2',
    name: 'Андрей',
    text: 'Пришёл с хронической болью в спине. После курса у Дмитрия забыл, что такое скованность. Профессионализм на каждом сеансе — чувствовалось, что мастер точно знает, что делает.',
    rating: 5,
    service: 'Классический массаж',
    photo: 'https://images.pexels.com/photos/16160801/pexels-photo-16160801.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'r3',
    name: 'Светлана',
    text: 'SPA-ритуал — это два часа полного счастья. Свечи, масла, мягкая музыка и руки, которые словно читают тело. Ушла с ощущением, что сбросила десять лет.',
    rating: 5,
    service: 'SPA-ритуал',
    photo: 'https://images.pexels.com/photos/38366748/pexels-photo-38366748.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'r4',
    name: 'Ирина',
    text: 'Лимфодренаж у Марины дал результат, который видно в зеркале уже на следующий день. Лёгкость, отсутствие отёчности — и при этом всё было очень деликатно и мягко.',
    rating: 5,
    service: 'Лимфодренаж',
    photo: 'https://images.pexels.com/photos/35367077/pexels-photo-35367077.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'r5',
    name: 'Екатерина',
    text: 'Тайский массаж у Елены — это нечто. Я не знала, что тело может быть настолько гибким и свободным. После сеанса будто заново научилась дышать полной грудью.',
    rating: 5,
    service: 'Тайский массаж',
    photo: 'https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export type PriceRow = {
  service: string;
  duration: string;
  price: string;
};

export const prices: PriceRow[] = [
  { service: 'Классический массаж', duration: '60 мин', price: '3 500 ₽' },
  { service: 'Классический массаж', duration: '90 мин', price: '4 900 ₽' },
  { service: 'Тайский массаж', duration: '90 мин', price: '5 500 ₽' },
  { service: 'Стоун-терапия', duration: '80 мин', price: '6 000 ₽' },
  { service: 'Лимфодренаж', duration: '60 мин', price: '3 500 ₽' },
  { service: 'Антицеллюлитный', duration: '60 мин', price: '3 800 ₽' },
  { service: 'SPA-ритуал', duration: '120 мин', price: '8 500 ₽' },
];

export type GalleryImage = {
  src: string;
  alt: string;
  span: string;
};

export const galleryImages: GalleryImage[] = [
  { src: 'https://images.pexels.com/photos/6560308/pexels-photo-6560308.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Светлый массажный кабинет', span: 'md:row-span-2' },
  { src: 'https://images.pexels.com/photos/6186740/pexels-photo-6186740.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Свеча и полотенца в SPA-зоне', span: '' },
  { src: 'https://images.pexels.com/photos/6629530/pexels-photo-6629530.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Горячие камни для стоун-терапии', span: '' },
  { src: 'https://images.pexels.com/photos/7789646/pexels-photo-7789646.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Интерьер массажной комнаты', span: 'md:row-span-2' },
  { src: 'https://images.pexels.com/photos/6560252/pexels-photo-6560252.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Ароматерапия на деревянном столике', span: '' },
  { src: 'https://images.pexels.com/photos/35884499/pexels-photo-35884499.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Расслабляющая атмосфера кабинета', span: '' },
  { src: 'https://images.pexels.com/photos/7303279/pexels-photo-7303279.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Свеча с лепестками в деревянной чаше', span: '' },
  { src: 'https://images.pexels.com/photos/433626/pexels-photo-433626.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Масла в SPA-комнате', span: '' },
];

export const heroImage = 'https://images.pexels.com/photos/6187652/pexels-photo-6187652.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const philosophyImage = 'https://images.pexels.com/photos/6629612/pexels-photo-6629612.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const certificateImage = 'https://images.pexels.com/photos/6629536/pexels-photo-6629536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

/**
 * Single source of truth for studio contact details.
 * Update these values with your real accounts/number before publishing.
 */
export const contact = {
  phoneDisplay: '+7 (495) 123-45-67',
  phoneDigits: '74951234567',
  email: 'hello@soultouch.ru',
  address: 'Москва, ул. Тверская 15, 2 этаж, студия «Soul Touch»',
  hours: 'Ежедневно с 9:00 до 21:00',
  whatsapp: 'https://wa.me/74951234567',
  telegram: 'https://t.me/soultouch',
  instagram: 'https://instagram.com/soultouch',
  youtube: 'https://youtube.com/@soultouch',
};
