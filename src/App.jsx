// SPL - Saad Pro Life | سعد برو لايف
// تطبيق صحة المرأة الشامل
// إعداد: سعد علي سعد القرني | فني مختبر سبت العلايه

import { useState, useEffect, useCallback } from "react";

// ==================== CONSTANTS ====================
const TABS = [
  { id: "cycle", icon: "🌙", label: "الدورة الشهرية" },
  { id: "fertility", icon: "🌸", label: "الخصوبة والحمل" },
  { id: "chinese", icon: "☯️", label: "جنس المولود" },
  { id: "mood", icon: "💆", label: "المزاج والصحة" },
  { id: "cart", icon: "🛒", label: "السلة الصحية" },
  { id: "children", icon: "👶", label: "تربية الأطفال" },
  { id: "profile", icon: "👤", label: "ملفي" },
];

const SUPPLEMENTS = [
  { id: 1, name: "حمض الفوليك", dose: "400-800 mcg", benefit: "أساسي قبل وأثناء الحمل", category: "حمل", icon: "💊" },
  { id: 2, name: "أوميغا 3", dose: "1000 mg", benefit: "صحة الدماغ والقلب والمزاج", category: "عام", icon: "🐟" },
  { id: 3, name: "فيتامين D3", dose: "2000-4000 IU", benefit: "المناعة والعظام والهرمونات", category: "عام", icon: "☀️" },
  { id: 4, name: "المغنيسيوم", dose: "300-400 mg", benefit: "تحسين النوم وتخفيف آلام الدورة", category: "دورة", icon: "🔮" },
  { id: 5, name: "CoQ10", dose: "200-600 mg", benefit: "جودة البويضات والطاقة", category: "خصوبة", icon: "⚡" },
  { id: 6, name: "إينوزيتول", dose: "2-4 g", benefit: "تنظيم الدورة وتحسين PCOS", category: "دورة", icon: "🌿" },
  { id: 7, name: "فيتامين B6", dose: "25-50 mg", benefit: "تخفيف متلازمة ما قبل الدورة", category: "دورة", icon: "💛" },
  { id: 8, name: "حديد", dose: "18-27 mg", benefit: "تعويض نزيف الدورة ومنع الأنيميا", category: "دورة", icon: "🔴" },
  { id: 9, name: "زنك", dose: "8-11 mg", benefit: "الخصوبة وصحة الجلد والمناعة", category: "جمال", icon: "🌟" },
  { id: 10, name: "بروبيوتيك", dose: "10B CFU", benefit: "صحة المهبل والجهاز الهضمي", category: "نظافة", icon: "🦠" },
  { id: 11, name: "فيتامين E", dose: "400 IU", benefit: "مضاد أكسدة وتحسين بطانة الرحم", category: "خصوبة", icon: "🌻" },
  { id: 12, name: "أشواغاندا", dose: "300-600 mg", benefit: "تخفيف التوتر وتوازن الكورتيزول", category: "مزاج", icon: "🌱" },
];

const BEAUTY_CARE = [
  { id: 1, name: "غسيل لطيف pH متوازن", type: "تنظيف خارجي", icon: "🧴", tip: "استخدمي مرتين يومياً" },
  { id: 2, name: "سيروم فيتامين C", type: "تنظيف خارجي", icon: "🍊", tip: "صباحاً قبل الحماية من الشمس" },
  { id: 3, name: "مرطب SPF 30+", type: "تنظيف خارجي", icon: "🛡️", tip: "يومياً بغض النظر عن الطقس" },
  { id: 4, name: "ريتينول ليلي", type: "تنظيف خارجي", icon: "🌙", tip: "3 مرات أسبوعياً - ليلاً فقط" },
  { id: 5, name: "غسول مهبلي لاكتيك أسيد", type: "نظافة داخلية", icon: "🌸", tip: "يحافظ على pH الطبيعي" },
  { id: 6, name: "كريم مرطب منطقة حساسة", type: "نظافة داخلية", icon: "💧", tip: "يومياً للترطيب والحماية" },
  { id: 7, name: "حمام بخار للوجه", type: "تنظيف خارجي", icon: "♨️", tip: "مرة أسبوعياً 10 دقائق" },
  { id: 8, name: "ماسك الطين", type: "تنظيف خارجي", icon: "🟤", tip: "مرتين أسبوعياً للمسام" },
];

const CHINESE_GENDER_TABLE = {
  // [lunar_month][lunar_age] => "ذكر" أو "أنثى"
  // جدول مبسط - التقويم الصيني للجنس
  data: [
    [1,18,"أنثى"],[1,19,"ذكر"],[1,20,"أنثى"],[1,21,"ذكر"],[1,22,"أنثى"],[1,23,"ذكر"],[1,24,"أنثى"],[1,25,"ذكر"],[1,26,"أنثى"],[1,27,"ذكر"],[1,28,"أنثى"],[1,29,"ذكر"],[1,30,"أنثى"],[1,31,"ذكر"],[1,32,"أنثى"],[1,33,"ذكر"],[1,34,"أنثى"],[1,35,"أنثى"],[1,36,"أنثى"],[1,37,"ذكر"],[1,38,"أنثى"],[1,39,"ذكر"],[1,40,"أنثى"],[1,41,"ذكر"],[1,42,"ذكر"],[1,43,"ذكر"],[1,44,"ذكر"],[1,45,"ذكر"],
    [2,18,"ذكر"],[2,19,"أنثى"],[2,20,"ذكر"],[2,21,"أنثى"],[2,22,"ذكر"],[2,23,"أنثى"],[2,24,"ذكر"],[2,25,"أنثى"],[2,26,"ذكر"],[2,27,"أنثى"],[2,28,"ذكر"],[2,29,"أنثى"],[2,30,"ذكر"],[2,31,"أنثى"],[2,32,"ذكر"],[2,33,"أنثى"],[2,34,"ذكر"],[2,35,"ذكر"],[2,36,"ذكر"],[2,37,"أنثى"],[2,38,"ذكر"],[2,39,"أنثى"],[2,40,"ذكر"],[2,41,"أنثى"],[2,42,"أنثى"],[2,43,"أنثى"],[2,44,"أنثى"],[2,45,"أنثى"],
    [3,18,"أنثى"],[3,19,"ذكر"],[3,20,"أنثى"],[3,21,"ذكر"],[3,22,"أنثى"],[3,23,"ذكر"],[3,24,"أنثى"],[3,25,"ذكر"],[3,26,"أنثى"],[3,27,"ذكر"],[3,28,"ذكر"],[3,29,"ذكر"],[3,30,"أنثى"],[3,31,"ذكر"],[3,32,"أنثى"],[3,33,"ذكر"],[3,34,"أنثى"],[3,35,"أنثى"],[3,36,"ذكر"],[3,37,"ذكر"],[3,38,"أنثى"],[3,39,"ذكر"],[3,40,"أنثى"],[3,41,"ذكر"],[3,42,"ذكر"],[3,43,"ذكر"],[3,44,"ذكر"],[3,45,"أنثى"],
    [4,18,"ذكر"],[4,19,"أنثى"],[4,20,"ذكر"],[4,21,"أنثى"],[4,22,"ذكر"],[4,23,"أنثى"],[4,24,"ذكر"],[4,25,"أنثى"],[4,26,"ذكر"],[4,27,"ذكر"],[4,28,"أنثى"],[4,29,"أنثى"],[4,30,"ذكر"],[4,31,"أنثى"],[4,32,"ذكر"],[4,33,"أنثى"],[4,34,"ذكر"],[4,35,"ذكر"],[4,36,"أنثى"],[4,37,"أنثى"],[4,38,"ذكر"],[4,39,"أنثى"],[4,40,"ذكر"],[4,41,"أنثى"],[4,42,"أنثى"],[4,43,"أنثى"],[4,44,"أنثى"],[4,45,"ذكر"],
    [5,18,"أنثى"],[5,19,"ذكر"],[5,20,"أنثى"],[5,21,"ذكر"],[5,22,"أنثى"],[5,23,"ذكر"],[5,24,"أنثى"],[5,25,"ذكر"],[5,26,"أنثى"],[5,27,"أنثى"],[5,28,"ذكر"],[5,29,"ذكر"],[5,30,"أنثى"],[5,31,"ذكر"],[5,32,"أنثى"],[5,33,"ذكر"],[5,34,"أنثى"],[5,35,"ذكر"],[5,36,"ذكر"],[5,37,"أنثى"],[5,38,"أنثى"],[5,39,"ذكر"],[5,40,"أنثى"],[5,41,"ذكر"],[5,42,"ذكر"],[5,43,"ذكر"],[5,44,"ذكر"],[5,45,"أنثى"],
    [6,18,"ذكر"],[6,19,"أنثى"],[6,20,"ذكر"],[6,21,"أنثى"],[6,22,"ذكر"],[6,23,"أنثى"],[6,24,"ذكر"],[6,25,"أنثى"],[6,26,"أنثى"],[6,27,"ذكر"],[6,28,"أنثى"],[6,29,"أنثى"],[6,30,"ذكر"],[6,31,"أنثى"],[6,32,"أنثى"],[6,33,"أنثى"],[6,34,"ذكر"],[6,35,"أنثى"],[6,36,"أنثى"],[6,37,"ذكر"],[6,38,"ذكر"],[6,39,"أنثى"],[6,40,"ذكر"],[6,41,"أنثى"],[6,42,"أنثى"],[6,43,"أنثى"],[6,44,"أنثى"],[6,45,"ذكر"],
    [7,18,"ذكر"],[7,19,"ذكر"],[7,20,"أنثى"],[7,21,"أنثى"],[7,22,"أنثى"],[7,23,"ذكر"],[7,24,"أنثى"],[7,25,"أنثى"],[7,26,"ذكر"],[7,27,"أنثى"],[7,28,"ذكر"],[7,29,"ذكر"],[7,30,"أنثى"],[7,31,"ذكر"],[7,32,"ذكر"],[7,33,"ذكر"],[7,34,"أنثى"],[7,35,"ذكر"],[7,36,"ذكر"],[7,37,"أنثى"],[7,38,"ذكر"],[7,39,"ذكر"],[7,40,"أنثى"],[7,41,"ذكر"],[7,42,"ذكر"],[7,43,"ذكر"],[7,44,"ذكر"],[7,45,"أنثى"],
    [8,18,"أنثى"],[8,19,"أنثى"],[8,20,"ذكر"],[8,21,"ذكر"],[8,22,"ذكر"],[8,23,"أنثى"],[8,24,"ذكر"],[8,25,"ذكر"],[8,26,"أنثى"],[8,27,"ذكر"],[8,28,"أنثى"],[8,29,"أنثى"],[8,30,"ذكر"],[8,31,"أنثى"],[8,32,"أنثى"],[8,33,"أنثى"],[8,34,"ذكر"],[8,35,"أنثى"],[8,36,"أنثى"],[8,37,"ذكر"],[8,38,"أنثى"],[8,39,"أنثى"],[8,40,"ذكر"],[8,41,"أنثى"],[8,42,"أنثى"],[8,43,"أنثى"],[8,44,"أنثى"],[8,45,"ذكر"],
    [9,18,"أنثى"],[9,19,"ذكر"],[9,20,"ذكر"],[9,21,"أنثى"],[9,22,"ذكر"],[9,23,"أنثى"],[9,24,"ذكر"],[9,25,"ذكر"],[9,26,"أنثى"],[9,27,"أنثى"],[9,28,"ذكر"],[9,29,"ذكر"],[9,30,"أنثى"],[9,31,"ذكر"],[9,32,"ذكر"],[9,33,"ذكر"],[9,34,"أنثى"],[9,35,"ذكر"],[9,36,"ذكر"],[9,37,"أنثى"],[9,38,"ذكر"],[9,39,"ذكر"],[9,40,"أنثى"],[9,41,"ذكر"],[9,42,"ذكر"],[9,43,"ذكر"],[9,44,"ذكر"],[9,45,"أنثى"],
    [10,18,"ذكر"],[10,19,"أنثى"],[10,20,"أنثى"],[10,21,"ذكر"],[10,22,"أنثى"],[10,23,"ذكر"],[10,24,"أنثى"],[10,25,"أنثى"],[10,26,"ذكر"],[10,27,"ذكر"],[10,28,"أنثى"],[10,29,"أنثى"],[10,30,"ذكر"],[10,31,"أنثى"],[10,32,"أنثى"],[10,33,"أنثى"],[10,34,"ذكر"],[10,35,"أنثى"],[10,36,"أنثى"],[10,37,"ذكر"],[10,38,"أنثى"],[10,39,"أنثى"],[10,40,"ذكر"],[10,41,"أنثى"],[10,42,"أنثى"],[10,43,"أنثى"],[10,44,"أنثى"],[10,45,"ذكر"],
    [11,18,"أنثى"],[11,19,"ذكر"],[11,20,"ذكر"],[11,21,"أنثى"],[11,22,"ذكر"],[11,23,"أنثى"],[11,24,"ذكر"],[11,25,"ذكر"],[11,26,"أنثى"],[11,27,"أنثى"],[11,28,"ذكر"],[11,29,"ذكر"],[11,30,"أنثى"],[11,31,"ذكر"],[11,32,"ذكر"],[11,33,"ذكر"],[11,34,"أنثى"],[11,35,"ذكر"],[11,36,"ذكر"],[11,37,"أنثى"],[11,38,"ذكر"],[11,39,"ذكر"],[11,40,"ذكر"],[11,41,"ذكر"],[11,42,"ذكر"],[11,43,"ذكر"],[11,44,"ذكر"],[11,45,"أنثى"],
    [12,18,"ذكر"],[12,19,"أنثى"],[12,20,"أنثى"],[12,21,"ذكر"],[12,22,"أنثى"],[12,23,"ذكر"],[12,24,"أنثى"],[12,25,"أنثى"],[12,26,"ذكر"],[12,27,"ذكر"],[12,28,"أنثى"],[12,29,"أنثى"],[12,30,"ذكر"],[12,31,"أنثى"],[12,32,"أنثى"],[12,33,"أنثى"],[12,34,"ذكر"],[12,35,"أنثى"],[12,36,"أنثى"],[12,37,"ذكر"],[12,38,"أنثى"],[12,39,"أنثى"],[12,40,"أنثى"],[12,41,"أنثى"],[12,42,"أنثى"],[12,43,"أنثى"],[12,44,"أنثى"],[12,45,"ذكر"],
  ]
};

const CHILD_TIPS = {
  "0-1": {
    title: "الرضيع (0-12 شهر)",
    tips: ["التواصل البصري أساسي للتطور العاطفي","أغانٍ وقصص بسيطة تبني اللغة مبكراً","الروتين الثابت يمنح أماناً نفسياً","الرضاعة الطبيعية تعزز المناعة والترابط"],
    concerns: ["بكاء مستمر يستدعي استشارة طبية","تأخر الاستجابة للأصوات","صعوبة في الرضاعة"],
  },
  "1-3": {
    title: "مرحلة المشي والكلام (1-3 سنوات)",
    tips: ["العب الحر يطور الإبداع والمهارات","حدودٌ واضحة بأسلوب حنون","قراءة القصص يومياً ضرورة وليست رفاهية","لا تقارن طفلك بأطفال آخرين"],
    concerns: ["عدم نطق أي كلمة بعمر 18 شهر","نوبات غضب شديدة جداً","تأخر المشي بعد 18 شهر"],
  },
  "3-6": {
    title: "مرحلة ما قبل المدرسة (3-6 سنوات)",
    tips: ["الألعاب التعاونية تبني المهارات الاجتماعية","اسمح للطفل باتخاذ قرارات صغيرة","علّم التعبير عن المشاعر بالكلام","الروتين والمتابعة تبني الثقة بالنفس"],
    concerns: ["صعوبة التركيز أكثر من دقائق","لا يتفاعل مع أطفال آخرين","مشاكل في التحكم ببول أو براز"],
  },
  "6-12": {
    title: "سن المدرسة (6-12 سنة)",
    tips: ["شجّع نقاط قوته ولا تركز على ضعفه","الأنشطة الرياضية تبني الانضباط والصحة","حوارات مفتوحة حول المشاعر والأصدقاء","المشاركة في المهام المنزلية تبني المسؤولية"],
    concerns: ["تراجع مستوى الدراسة المفاجئ","عزلة اجتماعية","اضطرابات النوم المتكررة"],
  },
  "12-18": {
    title: "المراهقة (12-18 سنة)",
    tips: ["احترم خصوصيته مع الحفاظ على التواصل","ناقش المواقف لا تصدر أحكاماً","كن قدوة لا مجرد آمر","الحدود الواضحة مع مساحة للاستقلالية"],
    concerns: ["الانعزال التام عن الأسرة","أي إشارات لإيذاء النفس","تغيرات مزاجية حادة جداً"],
  },
};

// ==================== UTILITIES ====================
function getLunarAge(gregorianAge) {
  // العمر القمري = العمر الميلادي + 1
  return gregorianAge + 1;
}

function getChineseGender(motherAge, conceptionMonth) {
  const lunarAge = getLunarAge(motherAge);
  const entry = CHINESE_GENDER_TABLE.data.find(
    ([m, a]) => m === conceptionMonth && a === lunarAge
  );
  return entry ? entry[2] : null;
}

function calculateOvulation(lastPeriod, cycleLength) {
  const last = new Date(lastPeriod);
  const ovulationDay = cycleLength - 14;
  const ovulation = new Date(last);
  ovulation.setDate(ovulation.getDate() + ovulationDay);

  const fertileStart = new Date(ovulation);
  fertileStart.setDate(fertileStart.getDate() - 5);
  const fertileEnd = new Date(ovulation);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  const nextPeriod = new Date(last);
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

  const today = new Date();
  const daysSinceLast = Math.floor((today - last) / (1000 * 60 * 60 * 24));
  const phase = daysSinceLast <= 5 ? "حيض" :
    daysSinceLast <= ovulationDay - 5 ? "مرحلة الجريب" :
    daysSinceLast <= ovulationDay + 1 ? "🌸 نافذة الخصوبة" :
    daysSinceLast <= cycleLength ? "مرحلة الجسم الأصفر" : "قد تأخرت الدورة";

  return { ovulation, fertileStart, fertileEnd, nextPeriod, phase, daysSinceLast, ovulationDay };
}

function formatDate(d) {
  return d.toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" });
}

function getChildCategory(age) {
  if (age < 1) return "0-1";
  if (age < 3) return "1-3";
  if (age < 6) return "3-6";
  if (age < 12) return "6-12";
  return "12-18";
}

// ==================== MAIN APP ====================
export default function SPLApp() {
  const [activeTab, setActiveTab] = useState("cycle");
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState({
    name: "", age: 28, maritalStatus: "متزوجة",
    cycleLength: 28, lastPeriod: new Date().toISOString().split("T")[0],
    irregular: false, conditions: [],
    children: [{ name: "", age: "" }],
    partnerAge: 30,
  });
  const [chineseData, setChineseData] = useState({ month: 1, desiredGender: "ذكر" });
  const [savedToCart, setSavedToCart] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const addToCart = (item, type) => {
    const key = `${type}-${item.id}`;
    if (!savedToCart[key]) {
      setCart(prev => [...prev, { ...item, type }]);
      setSavedToCart(prev => ({ ...prev, [key]: true }));
    }
  };

  const removeFromCart = (id, type) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.type === type)));
    setSavedToCart(prev => {
      const n = { ...prev };
      delete n[`${type}-${id}`];
      return n;
    });
  };

  const cycleInfo = profile.lastPeriod
    ? calculateOvulation(profile.lastPeriod, profile.cycleLength)
    : null;

  const chineseResult = getChineseGender(profile.age, chineseData.month);
  
  const bestMonthsForDesiredGender = () => {
    const desired = chineseData.desiredGender;
    const lunarAge = getLunarAge(profile.age);
    const months = [];
    for (let m = 1; m <= 12; m++) {
      const entry = CHINESE_GENDER_TABLE.data.find(([mo, a]) => mo === m && a === lunarAge);
      if (entry && entry[2] === desired) months.push(m);
    }
    return months;
  };

  const shareReport = () => {
    const text = `تقرير SPL - سعد برو لايف 🌸\n` +
      `الاسم: ${profile.name || "غير محدد"}\n` +
      `العمر: ${profile.age} سنة\n` +
      `مرحلة الدورة: ${cycleInfo?.phase || "غير محسوب"}\n` +
      `موعد الإباضة: ${cycleInfo ? formatDate(cycleInfo.ovulation) : "-"}\n` +
      `نافذة الخصوبة: ${cycleInfo ? `${formatDate(cycleInfo.fertileStart)} - ${formatDate(cycleInfo.fertileEnd)}` : "-"}\n` +
      `\nإعداد: سعد علي سعد القرني | فني مختبر مستشفى سبت العلايه\n` +
      `التطبيق: SPL - Saad Pro Life`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2000);
    });
  };

  const HORMONE_RANGES = [
    { name: "FSH", unit: "mIU/mL", follicular: "3-10", midCycle: "4-25", luteal: "1-7", note: "ارتفاع FSH قد يدل على ضعف الاحتياطي المبيضي" },
    { name: "LH", unit: "mIU/mL", follicular: "2-15", midCycle: "22-105", luteal: "0.6-19", note: "ارتفاع LH مع FSH قد يدل على PCOS" },
    { name: "E2 (إستراديول)", unit: "pg/mL", follicular: "25-145", midCycle: "150-750", luteal: "30-450", note: "يعكس نشاط الجريبات المبيضية" },
    { name: "Progesterone", unit: "ng/mL", follicular: "<1", midCycle: "<3", luteal: ">7", note: "ارتفاع الأسبوع الـ21 يؤكد الإباضة" },
    { name: "AMH", unit: "ng/mL", follicular: "1.0-3.5", midCycle: "1.0-3.5", luteal: "1.0-3.5", note: "أفضل مؤشر للاحتياطي المبيضي - مستقر طوال الدورة" },
    { name: "TSH", unit: "mIU/L", follicular: "0.4-4.0", midCycle: "0.4-4.0", luteal: "0.4-4.0", note: "قيم > 2.5 قد تؤثر على الخصوبة" },
    { name: "Prolactin", unit: "ng/mL", follicular: "3-29", midCycle: "3-29", luteal: "3-29", note: "ارتفاعه يثبط الإباضة ويسبب عدم انتظام الدورة" },
    { name: "DHEA-S", unit: "μg/dL", follicular: "65-380", midCycle: "65-380", luteal: "65-380", note: "ارتفاعه قد يدل على فرط الأندروجينات" },
  ];

  return (
    <div style={{
      fontFamily: "'Noto Sans Arabic', 'Cairo', sans-serif",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      minHeight: "100vh",
      direction: "rtl",
      color: "#f0e6ff",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Ambient glow effects */}
      <div style={{
        position: "fixed", top: -100, right: -100, width: 300, height: 300,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(255,100,150,0.15) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: 100, left: -80, width: 250, height: 250,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(100,150,255,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, rgba(255,100,150,0.2), rgba(150,100,255,0.2))",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 20px 10px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                background: "linear-gradient(135deg, #ff6496, #a855f7)",
                borderRadius: 10, padding: "4px 10px",
                fontSize: 11, fontWeight: 700, letterSpacing: 1,
              }}>SPL</div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Saad Pro Life</span>
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
              إعداد: سعد علي سعد القرني
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={shareReport} style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20, padding: "5px 12px", color: "#fff", fontSize: 12, cursor: "pointer",
            }}>
              {copiedMsg ? "✅ نُسخ" : "📤 مشاركة"}
            </button>
            <button onClick={() => window.print()} style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 20, padding: "5px 12px", color: "#fff", fontSize: 12, cursor: "pointer",
            }}>🖨️</button>
          </div>
        </div>

        {/* Phase indicator strip */}
        {cycleInfo && (
          <div style={{
            marginTop: 8,
            background: cycleInfo.phase.includes("خصوبة") ? "rgba(255,100,100,0.25)" :
              cycleInfo.phase.includes("حيض") ? "rgba(200,50,50,0.2)" : "rgba(100,100,255,0.15)",
            borderRadius: 20, padding: "4px 12px", display: "inline-block",
            fontSize: 11, border: "1px solid rgba(255,255,255,0.1)",
          }}>
            📍 الآن: <strong>{cycleInfo.phase}</strong> — يوم {cycleInfo.daysSinceLast} من الدورة
          </div>
        )}
      </div>

      {/* TAB BAR */}
      <div style={{
        display: "flex", overflowX: "auto", gap: 0,
        background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        scrollbarWidth: "none",
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: "0 0 auto", padding: "10px 14px",
            background: activeTab === t.id ? "rgba(255,100,150,0.2)" : "transparent",
            border: "none", borderBottom: activeTab === t.id ? "2px solid #ff6496" : "2px solid transparent",
            color: activeTab === t.id ? "#ff6496" : "rgba(255,255,255,0.5)",
            fontSize: 11, cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, whiteSpace: "nowrap", transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 16 }}>{t.icon}</span>
            {t.label}
            {t.id === "cart" && cart.length > 0 && (
              <span style={{
                background: "#ff6496", borderRadius: "50%", width: 14, height: 14,
                fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", position: "absolute", marginRight: -18, marginTop: -2,
              }}>{cart.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: "16px", paddingBottom: 80, position: "relative", zIndex: 1 }}>

        {/* ========== CYCLE TAB ========== */}
        {activeTab === "cycle" && (
          <div>
            <SectionTitle icon="🌙" title="تتبع الدورة الشهرية" />

            <Card>
              <label style={labelStyle}>تاريخ آخر دورة</label>
              <input type="date" value={profile.lastPeriod}
                onChange={e => setProfile(p => ({ ...p, lastPeriod: e.target.value }))}
                style={inputStyle} />
              <label style={{ ...labelStyle, marginTop: 12 }}>طول الدورة (يوم)</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input type="range" min="21" max="45" value={profile.cycleLength}
                  onChange={e => setProfile(p => ({ ...p, cycleLength: Number(e.target.value) }))}
                  style={{ flex: 1, accentColor: "#ff6496" }} />
                <span style={{ color: "#ff6496", fontWeight: 700, fontSize: 18 }}>{profile.cycleLength}</span>
              </div>
            </Card>

            {cycleInfo && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                  {[
                    { label: "الإباضة المتوقعة", value: formatDate(cycleInfo.ovulation), icon: "🥚", color: "#f59e0b" },
                    { label: "الدورة القادمة", value: formatDate(cycleInfo.nextPeriod), icon: "📅", color: "#a855f7" },
                    { label: "بداية نافذة الخصوبة", value: formatDate(cycleInfo.fertileStart), icon: "🌸", color: "#ec4899" },
                    { label: "نهاية النافذة", value: formatDate(cycleInfo.fertileEnd), icon: "🌺", color: "#ef4444" },
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: `linear-gradient(135deg, ${item.color}22, ${item.color}11)`,
                      border: `1px solid ${item.color}44`,
                      borderRadius: 14, padding: "12px",
                    }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Cycle phases visual */}
                <Card style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, color: "#ff6496" }}>مراحل الدورة الشهرية</div>
                  <CycleBar cycleLength={profile.cycleLength} daysSinceLast={cycleInfo.daysSinceLast} ovulationDay={cycleInfo.ovulationDay} />
                  <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                    {[
                      { color: "#ef4444", label: "حيض (1-5)" },
                      { color: "#3b82f6", label: "جريب (6-12)" },
                      { color: "#f59e0b", label: "إباضة" },
                      { color: "#a855f7", label: "جسم أصفر" },
                    ].map((p, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
                        <span style={{ color: "rgba(255,255,255,0.6)" }}>{p.label}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#a855f7" }}>💬 أفضل وقت للجماع</div>
                  <div style={{ fontSize: 12, lineHeight: 1.8, color: "rgba(255,255,255,0.75)" }}>
                    ✅ <strong style={{ color: "#f59e0b" }}>للمتعة:</strong> في مرحلة الإباضة ترتفع الرغبة الجنسية بشكل طبيعي بسبب الإستروجين — أيام {cycleInfo.ovulationDay - 2} إلى {cycleInfo.ovulationDay + 1}<br />
                    🌸 <strong style={{ color: "#ec4899" }}>للحمل:</strong> ابدئي 3 أيام قبل الإباضة (يوم {cycleInfo.ovulationDay - 3}) وحتى يوم الإباضة<br />
                    😴 <strong style={{ color: "#6b7280" }}>الراحة:</strong> أيام الحيض وآخر الدورة — الجسم بحاجة لتعافٍ
                  </div>
                </Card>
              </>
            )}

            <Card style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#22d3ee" }}>🧪 قيم الهرمونات المرجعية</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                قيم مرجعية حسب مرحلة الدورة — راجعي طبيبك لتفسير نتائجك
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.05)" }}>
                      {["الهرمون", "الوحدة", "جريب", "إباضة", "جسم أصفر"].map(h => (
                        <th key={h} style={{ padding: "6px 4px", color: "#a855f7", fontWeight: 600, textAlign: "center" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HORMONE_RANGES.map((h, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "6px 4px", fontWeight: 600, color: "#f0e6ff" }}>{h.name}</td>
                        <td style={{ padding: "6px 4px", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{h.unit}</td>
                        <td style={{ padding: "6px 4px", color: "#3b82f6", textAlign: "center" }}>{h.follicular}</td>
                        <td style={{ padding: "6px 4px", color: "#f59e0b", textAlign: "center" }}>{h.midCycle}</td>
                        <td style={{ padding: "6px 4px", color: "#a855f7", textAlign: "center" }}>{h.luteal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 10 }}>
                {HORMONE_RANGES.map((h, i) => (
                  <div key={i} style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 3 }}>
                    <span style={{ color: "#22d3ee" }}>•</span> <strong>{h.name}:</strong> {h.note}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ========== FERTILITY TAB ========== */}
        {activeTab === "fertility" && (
          <div>
            <SectionTitle icon="🌸" title="الخصوبة والحمل" />

            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#f59e0b" }}>
                📊 مؤشر الخصوبة حسب العمر
              </div>
              {[
                { range: "20-25", level: 95, label: "ذروة الخصوبة", color: "#22c55e" },
                { range: "25-30", level: 88, label: "خصوبة ممتازة", color: "#84cc16" },
                { range: "30-35", level: 72, label: "خصوبة جيدة", color: "#f59e0b" },
                { range: "35-38", level: 50, label: "تراجع ملحوظ", color: "#f97316" },
                { range: "38-40", level: 30, label: "تحديات خصوبة", color: "#ef4444" },
                { range: "40+", level: 15, label: "يُنصح باستشارة طبية", color: "#dc2626" },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3, fontSize: 11 }}>
                    <span style={{ color: "rgba(255,255,255,0.7)" }}>سن {item.range}</span>
                    <span style={{ color: item.color }}>{item.label} ({item.level}%)</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${item.level}%`, height: "100%", background: item.color, borderRadius: 10, transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
            </Card>

            <Card style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#ec4899" }}>
                📋 خطوات تحسين الخصوبة
              </div>
              {[
                { step: "1", title: "تحليل الهرمونات", desc: "FSH, LH, E2, AMH, TSH, Prolactin في اليوم 2-3 من الدورة", icon: "🧪" },
                { step: "2", title: "متابعة الإباضة", desc: "استخدمي أشرطة LH أو تصوير مهبلي لتأكيد الإباضة", icon: "🔬" },
                { step: "3", title: "تحسين التغذية", desc: "حمض الفوليك، أوميغا 3، فيتامين D، مضادات الأكسدة", icon: "🥗" },
                { step: "4", title: "إدارة الوزن", desc: "BMI المثالي 18.5-24.9 لأفضل خصوبة", icon: "⚖️" },
                { step: "5", title: "تجنب المؤثرات", desc: "التوقف عن التدخين، تقليل الكافيين، تجنب التوتر الزائد", icon: "🚫" },
                { step: "6", title: "توقيت الجماع", desc: "يومياً أو كل يوم خلال نافذة الخصوبة (5 أيام قبل الإباضة)", icon: "📅" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, marginBottom: 10,
                  padding: "10px", background: "rgba(255,255,255,0.04)",
                  borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ fontSize: 22 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#f0e6ff" }}>{item.step}. {item.title}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </Card>

            <Card style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#a855f7" }}>
                🤰 علامات الحمل المبكر
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { sign: "تأخر الدورة", week: "الأسبوع 4-5" },
                  { sign: "غثيان صباحي", week: "الأسبوع 4-8" },
                  { sign: "حساسية الثدي", week: "الأسبوع 3-4" },
                  { sign: "تعب وإرهاق", week: "الأسبوع 4-6" },
                  { sign: "كثرة التبول", week: "الأسبوع 4-6" },
                  { sign: "تغير الرغبة الشمية", week: "الأسبوع 4-8" },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: "rgba(168,85,247,0.1)", borderRadius: 10,
                    padding: "8px", border: "1px solid rgba(168,85,247,0.2)",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>• {s.sign}</div>
                    <div style={{ fontSize: 10, color: "#a855f7" }}>{s.week}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, padding: 10, background: "rgba(34,211,238,0.1)", borderRadius: 10, fontSize: 11, color: "#22d3ee" }}>
                ⚡ اختبار الحمل الأفضل: بول الصباح الأول بعد تأخر الدورة بـ 3-5 أيام
              </div>
            </Card>
          </div>
        )}

        {/* ========== CHINESE GENDER TAB ========== */}
        {activeTab === "chinese" && (
          <div>
            <SectionTitle icon="☯️" title="جنس المولود - الطريقة الصينية" />
            <Card>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 12, lineHeight: 1.7 }}>
                الجدول الصيني للتنبؤ بجنس المولود — يعتمد على العمر القمري للأم وشهر الحمل القمري. الدقة المزعومة 70-93% وهي للتسلية والاسترشاد فقط.
              </div>

              <label style={labelStyle}>شهر الحمل المرغوب (ميلادي)</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                {[...Array(12)].map((_, i) => (
                  <button key={i + 1} onClick={() => setChineseData(p => ({ ...p, month: i + 1 }))} style={{
                    padding: "8px 4px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 11,
                    background: chineseData.month === i + 1 ? "linear-gradient(135deg, #ff6496, #a855f7)" : "rgba(255,255,255,0.07)",
                    color: chineseData.month === i + 1 ? "#fff" : "rgba(255,255,255,0.6)",
                    fontWeight: chineseData.month === i + 1 ? 700 : 400,
                  }}>
                    {["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][i]}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 14, padding: 16, borderRadius: 16, textAlign: "center",
                background: chineseResult === "ذكر" ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,197,253,0.1))" : 
                  chineseResult === "أنثى" ? "linear-gradient(135deg, rgba(236,72,153,0.2), rgba(251,182,206,0.1))" : "rgba(255,255,255,0.05)",
                border: chineseResult === "ذكر" ? "1px solid rgba(59,130,246,0.3)" : 
                  chineseResult === "أنثى" ? "1px solid rgba(236,72,153,0.3)" : "1px solid rgba(255,255,255,0.1)",
              }}>
                <div style={{ fontSize: 40 }}>{chineseResult === "ذكر" ? "👦" : chineseResult === "أنثى" ? "👧" : "❓"}</div>
                <div style={{ fontSize: 22, fontWeight: 800, marginTop: 8, color: chineseResult === "ذكر" ? "#60a5fa" : chineseResult === "أنثى" ? "#f472b6" : "#6b7280" }}>
                  {chineseResult || "أدخلي عمرك أولاً"}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                  عمرك القمري: {getLunarAge(profile.age)} | شهر: {["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][chineseData.month - 1]}
                </div>
              </div>
            </Card>

            <Card style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#f59e0b" }}>🗓️ أفضل الشهور لاختيار الجنس</div>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                {["ذكر", "أنثى"].map(g => (
                  <button key={g} onClick={() => setChineseData(p => ({ ...p, desiredGender: g }))} style={{
                    flex: 1, padding: "8px", borderRadius: 10, border: "none", cursor: "pointer",
                    background: chineseData.desiredGender === g ? (g === "ذكر" ? "rgba(59,130,246,0.3)" : "rgba(236,72,153,0.3)") : "rgba(255,255,255,0.06)",
                    color: chineseData.desiredGender === g ? "#fff" : "rgba(255,255,255,0.5)", fontSize: 13,
                  }}>
                    {g === "ذكر" ? "👦 أريد ذكر" : "👧 أريد أنثى"}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {bestMonthsForDesiredGender().map(m => (
                  <div key={m} style={{
                    background: chineseData.desiredGender === "ذكر" ? "rgba(59,130,246,0.2)" : "rgba(236,72,153,0.2)",
                    border: `1px solid ${chineseData.desiredGender === "ذكر" ? "rgba(59,130,246,0.4)" : "rgba(236,72,153,0.4)"}`,
                    borderRadius: 20, padding: "4px 12px", fontSize: 12,
                    color: chineseData.desiredGender === "ذكر" ? "#93c5fd" : "#f9a8d4",
                  }}>
                    {["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][m - 1]}
                  </div>
                ))}
                {bestMonthsForDesiredGender().length === 0 && (
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>أدخلي عمرك في ملفك الشخصي أولاً</div>
                )}
              </div>
            </Card>

            <Card style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: "#22d3ee" }}>📊 جدول كامل لعمرك القمري</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                      <th style={{ padding: "6px 8px", color: "#a855f7" }}>الشهر</th>
                      {[...Array(12)].map((_, i) => (
                        <th key={i} style={{ padding: "4px", color: "rgba(255,255,255,0.4)", fontSize: 9 }}>
                          {["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"][i].slice(0,3)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: "6px 8px", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>النتيجة</td>
                      {[...Array(12)].map((_, i) => {
                        const result = getChineseGender(profile.age, i + 1);
                        return (
                          <td key={i} style={{
                            padding: "4px", textAlign: "center", fontSize: 12,
                            color: result === "ذكر" ? "#60a5fa" : result === "أنثى" ? "#f472b6" : "#6b7280",
                            fontWeight: 700,
                          }}>
                            {result === "ذكر" ? "♂" : result === "أنثى" ? "♀" : "?"}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ========== MOOD TAB ========== */}
        {activeTab === "mood" && (
          <div>
            <SectionTitle icon="💆" title="المزاج والصحة النفسية" />

            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#22d3ee" }}>
                📈 المزاج حسب مراحل الدورة
              </div>
              {[
                { phase: "الحيض (1-5)", mood: "تعب وحساسية", tip: "راحة، دفء، مغنيسيوم، كمادات دافئة", color: "#ef4444", icon: "🔴" },
                { phase: "مرحلة الجريب (6-13)", mood: "طاقة وتفاؤل وتركيز", tip: "مثالي للمشاريع والتعلم والتمارين المكثفة", color: "#22c55e", icon: "🟢" },
                { phase: "الإباضة (14)", mood: "ذروة الثقة والجاذبية", tip: "تواصل اجتماعي، مقابلات، قرارات مهمة", color: "#f59e0b", icon: "🟡" },
                { phase: "ما قبل الدورة (15-28)", mood: "قلق، حساسية، تعب", tip: "B6، مغنيسيوم، تجنب الكافيين والسكر", color: "#a855f7", icon: "🟣" },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "10px 12px", marginBottom: 8, borderRadius: 12,
                  background: `${item.color}15`, border: `1px solid ${item.color}30`,
                }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: item.color }}>{item.phase}</div>
                      <div style={{ fontSize: 11, color: "#f0e6ff", margin: "2px 0" }}>المزاج: {item.mood}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>💡 {item.tip}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Card>

            <Card style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#f59e0b" }}>
                🧘 تقنيات تحسين المزاج
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { icon: "🏃", title: "تمرين 30 دقيقة", desc: "يرفع الإندورفين طبيعياً" },
                  { icon: "🌿", title: "أشواغاندا", desc: "يخفض كورتيزول التوتر" },
                  { icon: "☀️", title: "ضوء الشمس الصباحي", desc: "ينظم الميلاتونين والسيروتونين" },
                  { icon: "😴", title: "نوم 7-9 ساعات", desc: "أساس التوازن الهرموني" },
                  { icon: "🎵", title: "موسيقى هادئة", desc: "تخفض ضغط الدم والتوتر" },
                  { icon: "📓", title: "كتابة يومياتك", desc: "تصريف عاطفي فعّال" },
                  { icon: "🧠", title: "تأمل 10 دقائق", desc: "يقلل القلق ويحسن التركيز" },
                  { icon: "🤝", title: "تواصل اجتماعي", desc: "يرفع الأوكسيتوسين" },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#f0e6ff" }}>{item.title}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Card>

            <Card style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#ec4899" }}>
                🍽️ أطعمة تدعم الصحة الهرمونية
              </div>
              {[
                { food: "الكتان المطحون", benefit: "يوازن الإستروجين", timing: "يومياً ملعقة كبيرة" },
                { food: "البيض الكامل", benefit: "كولين وبروتين لبناء الهرمونات", timing: "2-3 بيضات يومياً" },
                { food: "السلمون والسردين", benefit: "أوميغا 3 لتقليل الالتهاب", timing: "3 مرات أسبوعياً" },
                { food: "الأفوكادو", benefit: "دهون صحية لإنتاج الهرمونات", timing: "نصف حبة يومياً" },
                { food: "الخضروات الصليبية", benefit: "تدعم استقلاب الإستروجين", timing: "الكمية المعتدلة" },
                { food: "التوت والفراولة", benefit: "مضادات أكسدة قوية", timing: "يومياً حفنة" },
              ].map((f, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>🥑 {f.food}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{f.benefit}</div>
                  </div>
                  <div style={{ fontSize: 10, color: "#f59e0b", textAlign: "left", maxWidth: 90 }}>{f.timing}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ========== CART TAB ========== */}
        {activeTab === "cart" && (
          <div>
            <SectionTitle icon="🛒" title="السلة الصحية والجمالية" />

            <div style={{ display: "flex", gap: 8, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
              {["الكل", "دورة", "خصوبة", "حمل", "مزاج", "جمال", "نظافة", "عام"].map(cat => (
                <button key={cat} onClick={() => {}} style={{
                  flex: "0 0 auto", padding: "6px 14px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontSize: 11, cursor: "pointer",
                }}>{cat}</button>
              ))}
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#f59e0b" }}>💊 المكملات الغذائية الموصى بها</div>
            {SUPPLEMENTS.map(item => (
              <div key={item.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                marginBottom: 8, borderRadius: 14, background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{ fontSize: 24 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{item.benefit}</div>
                  <div style={{ fontSize: 10, color: "#f59e0b", marginTop: 2 }}>الجرعة: {item.dose}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                  <span style={{
                    background: "rgba(168,85,247,0.2)", borderRadius: 10, padding: "2px 8px",
                    fontSize: 9, color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)",
                  }}>{item.category}</span>
                  <button onClick={() => savedToCart[`supp-${item.id}`] ? removeFromCart(item.id, "supp") : addToCart(item, "supp")} style={{
                    background: savedToCart[`supp-${item.id}`] ? "rgba(239,68,68,0.2)" : "rgba(255,100,150,0.2)",
                    border: `1px solid ${savedToCart[`supp-${item.id}`] ? "rgba(239,68,68,0.4)" : "rgba(255,100,150,0.4)"}`,
                    borderRadius: 8, padding: "4px 10px", color: savedToCart[`supp-${item.id}`] ? "#ef4444" : "#ff6496",
                    fontSize: 11, cursor: "pointer",
                  }}>{savedToCart[`supp-${item.id}`] ? "✓ مضاف" : "+ أضف"}</button>
                </div>
              </div>
            ))}

            <div style={{ fontSize: 12, fontWeight: 700, margin: "18px 0 10px", color: "#22d3ee" }}>✨ العناية بالجمال والنظافة</div>
            {BEAUTY_CARE.map(item => (
              <div key={item.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
                marginBottom: 8, borderRadius: 14, background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <div style={{ fontSize: 24 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#22d3ee", marginTop: 2 }}>{item.type}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{item.tip}</div>
                </div>
                <button onClick={() => savedToCart[`beauty-${item.id}`] ? removeFromCart(item.id, "beauty") : addToCart(item, "beauty")} style={{
                  background: savedToCart[`beauty-${item.id}`] ? "rgba(239,68,68,0.2)" : "rgba(34,211,238,0.15)",
                  border: `1px solid ${savedToCart[`beauty-${item.id}`] ? "rgba(239,68,68,0.4)" : "rgba(34,211,238,0.3)"}`,
                  borderRadius: 8, padding: "4px 10px",
                  color: savedToCart[`beauty-${item.id}`] ? "#ef4444" : "#22d3ee",
                  fontSize: 11, cursor: "pointer",
                }}>{savedToCart[`beauty-${item.id}`] ? "✓ مضاف" : "+ أضف"}</button>
              </div>
            ))}

            {cart.length > 0 && (
              <Card style={{ marginTop: 18, background: "rgba(255,100,150,0.08)", border: "1px solid rgba(255,100,150,0.2)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#ff6496" }}>
                  🛒 سلتي ({cart.length} عنصر)
                </div>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, fontSize: 12 }}>
                    <span>{item.icon} {item.name}</span>
                    <button onClick={() => removeFromCart(item.id, item.type)} style={{
                      background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.3)",
                      borderRadius: 6, padding: "2px 8px", color: "#ef4444", fontSize: 10, cursor: "pointer",
                    }}>حذف</button>
                  </div>
                ))}
                <button onClick={shareReport} style={{
                  width: "100%", marginTop: 10, padding: "10px",
                  background: "linear-gradient(135deg, #ff6496, #a855f7)",
                  border: "none", borderRadius: 12, color: "#fff",
                  fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}>
                  📤 مشاركة السلة
                </button>
              </Card>
            )}
          </div>
        )}

        {/* ========== CHILDREN TAB ========== */}
        {activeTab === "children" && (
          <div>
            <SectionTitle icon="👶" title="الأطفال والتربية" />

            <Card>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#f59e0b" }}>
                بيانات الأطفال
              </div>
              {profile.children.map((child, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input placeholder={`اسم الطفل ${i + 1}`} value={child.name}
                    onChange={e => {
                      const ch = [...profile.children];
                      ch[i] = { ...ch[i], name: e.target.value };
                      setProfile(p => ({ ...p, children: ch }));
                    }}
                    style={{ ...inputStyle, flex: 1 }} />
                  <input placeholder="العمر" type="number" value={child.age}
                    onChange={e => {
                      const ch = [...profile.children];
                      ch[i] = { ...ch[i], age: e.target.value };
                      setProfile(p => ({ ...p, children: ch }));
                    }}
                    style={{ ...inputStyle, width: 70 }} />
                </div>
              ))}
              <button onClick={() => setProfile(p => ({ ...p, children: [...p.children, { name: "", age: "" }] }))} style={{
                width: "100%", padding: "8px", background: "rgba(255,255,255,0.05)",
                border: "1px dashed rgba(255,255,255,0.2)", borderRadius: 10, color: "rgba(255,255,255,0.5)",
                fontSize: 12, cursor: "pointer",
              }}>+ إضافة طفل</button>
            </Card>

            {profile.children.filter(c => c.age !== "").map((child, i) => {
              const age = Number(child.age);
              const cat = getChildCategory(age);
              const info = CHILD_TIPS[cat];
              return (
                <Card key={i} style={{ marginTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#f0e6ff" }}>{child.name || `الطفل ${i + 1}`}</div>
                      <div style={{ fontSize: 11, color: "#f59e0b" }}>{info.title}</div>
                    </div>
                    <div style={{
                      background: "linear-gradient(135deg, #f59e0b, #f97316)",
                      borderRadius: "50%", width: 40, height: 40,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, fontWeight: 800, color: "#fff",
                    }}>{age}</div>
                  </div>

                  <div style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", marginBottom: 6 }}>✅ نصائح التربية</div>
                  {info.tips.map((tip, j) => (
                    <div key={j} style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 4, paddingRight: 8 }}>
                      • {tip}
                    </div>
                  ))}

                  <div style={{ fontSize: 11, fontWeight: 700, color: "#ef4444", margin: "10px 0 6px" }}>⚠️ علامات تستدعي الانتباه</div>
                  {info.concerns.map((c, j) => (
                    <div key={j} style={{ fontSize: 11, color: "rgba(255,180,180,0.7)", marginBottom: 4, paddingRight: 8 }}>
                      • {c}
                    </div>
                  ))}
                </Card>
              );
            })}

            <Card style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: "#a855f7" }}>
                💔 التعامل مع الأطفال في حالة الطلاق أو الانفصال
              </div>
              {[
                { icon: "🛡️", tip: "لا تجعل الأطفال وسيلة للعقاب بين الزوجين - يُلحق ضرراً نفسياً بالغاً" },
                { icon: "🗣️", tip: "أخبريهم بالطلاق بلغة بسيطة مناسبة لعمرهم - التكتم يُولّد قلقاً أشد" },
                { icon: "💙", tip: "أكدي دائماً أن الطلاق لا علاقة له بهم وأنهما يحبانهم بنفس القدر" },
                { icon: "📅", tip: "حافظي على روتين ثابت للأطفال - الاستقرار ضرورة لا رفاهية بعد الطلاق" },
                { icon: "🚫", tip: "تجنبي الحديث السلبي عن الأب أمام الأطفال حتى لو كان ذلك صعباً" },
                { icon: "🏥", tip: "إذا ظهرت أعراض كالتبول اللاإرادي أو العدوانية - استشيري معالج أطفال" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{item.tip}</div>
                </div>
              ))}
            </Card>
          </div>
        )}

        {/* ========== PROFILE TAB ========== */}
        {activeTab === "profile" && (
          <div>
            <SectionTitle icon="👤" title="ملفي الشخصي" />

            <Card>
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <div style={{
                  width: 70, height: 70, borderRadius: "50%", margin: "0 auto 8px",
                  background: "linear-gradient(135deg, #ff6496, #a855f7)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30,
                }}>👩</div>
                <input placeholder="اسمك" value={profile.name}
                  onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  style={{ ...inputStyle, textAlign: "center", fontSize: 16, fontWeight: 700, background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.2)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={labelStyle}>العمر</label>
                  <input type="number" value={profile.age} min="18" max="55"
                    onChange={e => setProfile(p => ({ ...p, age: Number(e.target.value) }))}
                    style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>عمر الزوج</label>
                  <input type="number" value={profile.partnerAge} min="18" max="80"
                    onChange={e => setProfile(p => ({ ...p, partnerAge: Number(e.target.value) }))}
                    style={inputStyle} />
                </div>
              </div>

              <label style={{ ...labelStyle, marginTop: 12 }}>الحالة الاجتماعية</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["متزوجة", "مطلقة", "أرملة", "عزباء"].map(s => (
                  <button key={s} onClick={() => setProfile(p => ({ ...p, maritalStatus: s }))} style={{
                    flex: 1, padding: "8px 4px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)",
                    background: profile.maritalStatus === s ? "linear-gradient(135deg, rgba(255,100,150,0.3), rgba(168,85,247,0.3))" : "rgba(255,255,255,0.05)",
                    color: profile.maritalStatus === s ? "#fff" : "rgba(255,255,255,0.5)",
                    fontSize: 11, cursor: "pointer", fontWeight: profile.maritalStatus === s ? 700 : 400,
                  }}>{s}</button>
                ))}
              </div>

              <label style={{ ...labelStyle, marginTop: 12 }}>حالات طبية</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["PCOS", "بطانة رحم مهاجرة", "خيلاء", "قصور درقي", "فرط برولاكتين", "لا يوجد"].map(c => (
                  <button key={c} onClick={() => setProfile(p => ({
                    ...p, conditions: p.conditions.includes(c)
                      ? p.conditions.filter(x => x !== c)
                      : [...p.conditions, c]
                  }))} style={{
                    padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.15)",
                    background: profile.conditions.includes(c) ? "rgba(255,100,150,0.2)" : "rgba(255,255,255,0.05)",
                    color: profile.conditions.includes(c) ? "#ff6496" : "rgba(255,255,255,0.5)",
                    fontSize: 11, cursor: "pointer",
                  }}>{c}</button>
                ))}
              </div>
            </Card>

            <Card style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12, color: "#ff6496" }}>
                📋 ملخص صحتي
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { label: "العمر القمري", value: `${getLunarAge(profile.age)} سنة`, icon: "🌙" },
                  { label: "حالتي", value: profile.maritalStatus, icon: "💍" },
                  { label: "طول الدورة", value: `${profile.cycleLength} يوم`, icon: "📅" },
                  { label: "مرحلة الدورة", value: cycleInfo?.phase || "-", icon: "🔄" },
                  { label: "الإباضة القادمة", value: cycleInfo ? formatDate(cycleInfo.ovulation) : "-", icon: "🥚" },
                  { label: "الدورة القادمة", value: cycleInfo ? formatDate(cycleInfo.nextPeriod) : "-", icon: "🗓️" },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    <div style={{ fontSize: 16, marginBottom: 4 }}>{item.icon}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#f0e6ff" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </Card>

            <div style={{
              marginTop: 20, padding: 16, textAlign: "center",
              background: "rgba(255,255,255,0.03)", borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 2 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                  SPL — Saad Pro Life
                </div>
                إعداد: <span style={{ color: "#ff6496" }}>سعد علي سعد القرني</span><br />
                فني مختبر | مستشفى سبت العلايه العام<br />
                تجمع عسير الصحي<br />
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                  ⚠️ هذا التطبيق للتثقيف الصحي فقط — استشيري طبيبك دائماً
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ==================== HELPER COMPONENTS ====================
function SectionTitle({ icon, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#f0e6ff" }}>{title}</h2>
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      backdropFilter: "blur(10px)",
      borderRadius: 16,
      padding: "14px",
      border: "1px solid rgba(255,255,255,0.08)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function CycleBar({ cycleLength, daysSinceLast, ovulationDay }) {
  const pct = (daysSinceLast / cycleLength) * 100;
  const ovPct = (ovulationDay / cycleLength) * 100;
  return (
    <div style={{ position: "relative", height: 20, borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.06)" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(5/cycleLength)*100}%`, background: "#ef444499" }} />
      <div style={{ position: "absolute", left: `${(5/cycleLength)*100}%`, top: 0, bottom: 0, width: `${((ovulationDay-5)/cycleLength)*100}%`, background: "#3b82f699" }} />
      <div style={{ position: "absolute", left: `${ovPct}%`, top: 0, bottom: 0, width: `${(2/cycleLength)*100}%`, background: "#f59e0b" }} />
      <div style={{ position: "absolute", left: `${(ovulationDay+2)/cycleLength*100}%`, top: 0, bottom: 0, width: `${((cycleLength-ovulationDay-2)/cycleLength)*100}%`, background: "#a855f799" }} />
      {daysSinceLast <= cycleLength && (
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: `${Math.min(pct, 100)}%`,
          width: 3, background: "#fff", borderRadius: 2, transform: "translateX(-50%)",
          boxShadow: "0 0 6px rgba(255,255,255,0.8)",
        }} />
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.06)", color: "#f0e6ff", fontSize: 13,
  outline: "none", boxSizing: "border-box",
};

const labelStyle = {
  display: "block", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontWeight: 600,
};
