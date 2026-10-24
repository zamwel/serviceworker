import {
  Smartphone,
  Cpu,
  ShieldAlert,
  BatteryCharging,
  Wifi,
  PhoneCall,
  Copy,
  Sparkles,
  Zap,
  ShieldCheck,
  Search,
  Check,
  Layers,
  Activity,
  Settings,
  type LucideIcon,
} from "lucide-react";

export const BRAND = {
  name: "Mobile Secret Codes",
  company: "Codeink Technologies",
  tagline: "Unlock hidden diagnostics, device info & USSD secret codes.",
  description:
    "Mobile Secret Codes is the ultimate phone diagnostics and hidden code handbook. Access manufacturer secret codes, test hardware sensors, view battery metrics, and discover device tips and tricks for all major phone brands.",
  shortDescription:
    "Explore hidden USSD/MMI codes, run hardware sensor diagnostics, and discover phone tricks for Android and iOS devices.",
  packageId: "com.stsl.codeink.secretcodes",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.stsl.codeink.secretcodes",
  playRedeemUrl: "https://play.google.com/redeem",
  supportEmail: "deverloper.codeink.playconsole@gmail.com",
  developerEmail: "dev1samtechstudiolab@gmail.com",
  siteUrl: "https://serviceworker-two.vercel.app/privacies/secretcodes",
  origin: "https://serviceworker-two.vercel.app",
  basePath: "/privacies/secretcodes",
  logo: "/secretcodes/logo.png",
  rating: "4.7",
  ratingCount: "8500",
  downloads: "100K+",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Brands", href: "#brands" },
  { label: "Categories", href: "#categories" },
  { label: "How It Works", href: "#how" },
  { label: "Safety & FAQ", href: "#faq" },
] as const;

export type Feature = { icon: LucideIcon; title: string; desc: string };

export const CORE_FEATURES: Feature[] = [
  {
    icon: PhoneCall,
    title: "One-Tap Dialer",
    desc: "Launch codes directly into your native phone dialer with a single tap - no typing errors.",
  },
  {
    icon: Activity,
    title: "Hardware Diagnostics",
    desc: "Test touchscreen responsiveness, dead pixels, vibrator, speaker, RGB lights, and sensors.",
  },
  {
    icon: Cpu,
    title: "Deep Device Specs",
    desc: "Inspect CPU architecture, RAM, storage, Android version, firmware build, and kernel info.",
  },
  {
    icon: BatteryCharging,
    title: "Battery & Power Health",
    desc: "Access specialized battery status menus, voltage metrics, charging status, and cycle stats.",
  },
  {
    icon: Wifi,
    title: "Network & Field Tests",
    desc: "View SIM details, IMEI numbers, Wi-Fi chip tests, network bands, and signal strength.",
  },
  {
    icon: Copy,
    title: "Copy & Instant Share",
    desc: "Copy any secret code to clipboard in one click or share with friends and repair technicians.",
  },
  {
    icon: Sparkles,
    title: "Phone Tips & Tricks",
    desc: "Step-by-step guides for speedup, secret gestures, battery saving, and system optimization.",
  },
  {
    icon: ShieldCheck,
    title: "100% Offline Access",
    desc: "Complete database lives offline on your device - ready anytime without needing mobile data.",
  },
];

export const SUPPORTED_BRANDS = [
  { name: "Samsung", logo: "/secretcodes/brands/samsung.png", count: "50+ Codes" },
  { name: "Apple", logo: "/secretcodes/brands/apple.png", count: "30+ Codes" },
  { name: "Xiaomi", logo: "/secretcodes/brands/phone.png", count: "40+ Codes" },
  { name: "Huawei", logo: "/secretcodes/brands/huawei.png", count: "35+ Codes" },
  { name: "Oppo", logo: "/secretcodes/brands/oppo.png", count: "30+ Codes" },
  { name: "Vivo", logo: "/secretcodes/brands/vivo.png", count: "30+ Codes" },
  { name: "Motorola", logo: "/secretcodes/brands/moto.png", count: "25+ Codes" },
  { name: "Sony", logo: "/secretcodes/brands/sony.png", count: "25+ Codes" },
  { name: "Infinix", logo: "/secretcodes/brands/infinix.png", count: "20+ Codes" },
  { name: "Tecno", logo: "/secretcodes/brands/tecno.png", count: "20+ Codes" },
  { name: "Itel", logo: "/secretcodes/brands/itel.png", count: "15+ Codes" },
  { name: "Nokia", logo: "/secretcodes/brands/nokia.png", count: "20+ Codes" },
];

export const CODE_SHOWCASE = [
  {
    code: "*#06#",
    title: "IMEI Information",
    badge: "Universal",
    desc: "Displays unique International Mobile Equipment Identity for SIM slots.",
    tag: "Informational",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    code: "*#0*#",
    title: "Hardware Diagnostic Test",
    badge: "Samsung",
    desc: "Opens the factory test menu to check LCD, vibration, sensors, and touch.",
    tag: "Diagnostics",
    color: "from-purple-500/20 to-indigo-500/10",
  },
  {
    code: "*#*#4636#*#*",
    title: "Testing Menu & Battery",
    badge: "Android General",
    desc: "Provides detailed phone info, usage statistics, Wi-Fi metrics, and battery history.",
    tag: "Engineering",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    code: "*#0228#",
    title: "Battery Status & Fuel Gauge",
    badge: "Samsung / Android",
    desc: "View exact ADC reading, battery voltage, temperature, and battery capacity.",
    tag: "Battery",
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    code: "*#1234#",
    title: "Firmware Version (PDA/CSC)",
    badge: "System",
    desc: "Quickly view installed PDA, CSC, and phone modem baseband firmware versions.",
    tag: "Firmware",
    color: "from-indigo-500/20 to-blue-500/10",
  },
  {
    code: "*#*#232338#*#*",
    title: "Wi-Fi MAC Address",
    badge: "Network",
    desc: "Displays the hardware MAC address of the device's wireless interface.",
    tag: "Connectivity",
    color: "from-cyan-500/20 to-emerald-500/10",
  },
];

export const STEPS = [
  {
    step: "01",
    title: "Select Your Device Brand",
    desc: "Choose your brand from our curated catalog or search directly for specific models and general Android codes.",
  },
  {
    step: "02",
    title: "Browse Diagnostic Categories",
    desc: "Explore clean categories like Testing, Battery, Firmware, Network, Audio, and System Information.",
  },
  {
    step: "03",
    title: "Tap to Dial or Copy",
    desc: "Hit the call button to open your native dialer preloaded with the code, or copy it to your clipboard with one tap.",
  },
  {
    step: "04",
    title: "Review Results Safely",
    desc: "Read hardware diagnostics and specifications immediately with built-in safety guidance on every code.",
  },
];

export const FAQS = [
  {
    q: "What are mobile secret codes (USSD / MMI codes)?",
    a: "Secret codes (also known as USSD, MMI, or service codes) are sequences of numbers, asterisks (*), and hashes (#) that interact directly with your device firmware or carrier network to open hidden engineering menus, diagnostic screens, and system data.",
  },
  {
    q: "Are the codes safe to run on my device?",
    a: "Yes, the overwhelming majority of codes in Mobile Secret Codes are read-only diagnostic and informational codes (such as checking your IMEI with *#06#, viewing battery health, or testing your screen). Any advanced configuration or reset codes are clearly marked with warning indicators so you remain in complete control.",
  },
  {
    q: "Why do some codes not work on my specific phone?",
    a: "Some mobile operators, carriers, or custom Android OS skins (e.g. customized carrier firmware) disable certain manufacturer secret menus. A code that works on an unlocked device may be blocked by a specific carrier's proprietary dialer.",
  },
  {
    q: "Does Mobile Secret Codes require Root access?",
    a: "No! Mobile Secret Codes works completely on standard, unrooted devices. You do not need to root or modify your Android operating system in any way.",
  },
  {
    q: "Does the app need an active internet connection?",
    a: "No. The entire code library, device tips, and hardware testing instructions are packaged directly into the application, so they work 100% offline wherever you are.",
  },
  {
    q: "Can I copy codes or share them with a technician?",
    a: "Yes. Every code entry includes both a one-tap Dial action and a Copy to Clipboard action, plus a Share button so you can send instructions to friends or repair shops.",
  },
];

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Supported Brands", href: "#brands" },
    { label: "Code Showcase", href: "#categories" },
    { label: "Google Play Store", href: BRAND.playStoreUrl },
  ],
  company: [
    { label: "Codeink Technologies", href: "https://codeinktechnologies.com/" },
    { label: "Contact Developer", href: `mailto:${BRAND.supportEmail}` },
  ],
  legal: [
    { label: "Privacy Policy", href: `${BRAND.basePath}/privacy` },
    { label: "Terms of Service", href: `${BRAND.basePath}/tos` },
    { label: "EULA", href: `${BRAND.basePath}/eula` },
    { label: "Safety Disclaimer", href: `${BRAND.basePath}/disclaimer` },
  ],
};

export const HIGHLIGHTS = [
  { icon: Zap, label: "Instant One-Tap Dial" },
  { icon: ShieldCheck, label: "Safe & Read-Only Tests" },
  { icon: ShieldAlert, label: "Zero Permissions Required" },
] as const;
