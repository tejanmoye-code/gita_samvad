
import React from 'react';
import { Language } from './types';

export const PeacockFeatherIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="featherStem" x1="50" y1="95" x2="50" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0D1B2A" />
        <stop offset="100%" stopColor="#1B4332" />
      </linearGradient>
      <radialGradient id="eyeOuter" cx="50" cy="45" r="25" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="70%" stopColor="#DAA520" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <radialGradient id="eyeInner" cx="50" cy="45" r="12" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0077B6" />
        <stop offset="60%" stopColor="#03045E" />
        <stop offset="100%" stopColor="#000000" />
      </radialGradient>
    </defs>
    <path d="M50 90 C30 75 15 50 15 35 C15 20 30 5 50 5 C70 5 85 20 85 35 C85 50 70 75 50 90Z" fill="#2D6A4F" opacity="0.4" />
    <path d="M50 85 C40 70 25 55 25 40 C25 25 35 15 50 15 C65 15 75 25 75 40 C75 55 60 70 50 85Z" fill="#40916C" opacity="0.6" />
    <circle cx="50" cy="45" r="22" fill="url(#eyeOuter)" />
    <circle cx="50" cy="45" r="14" fill="url(#eyeInner)" />
    <path d="M50 48 C55 48 58 45 58 42 C58 40 55 38 50 38 C45 38 42 40 42 42 C42 45 45 48 50 48Z" fill="#ADE8F4" opacity="0.8" />
    <path d="M50 95 C52 70 50 40 50 10" stroke="url(#featherStem)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const LANGUAGES = [
  { code: Language.ENGLISH, label: 'English' },
  { code: Language.HINDI, label: 'हिन्दी' },
  { code: Language.MARATHI, label: 'मराठी' },
  { code: Language.TAMIL, label: 'தமிழ்' },
  { code: Language.TELUGU, label: 'తెలుగు' },
  { code: Language.KANNADA, label: 'ಕನ್ನಡ' },
  { code: Language.MALAYALAM, label: 'മലയാളം' },
  { code: Language.BENGALI, label: 'বাংলা' },
  { code: Language.GUJARATI, label: 'ગુજરાતી' },
  { code: Language.PUNJABI, label: 'ਪੰਜਾਬੀ' },
  { code: Language.ODIA, label: 'ଓଡ଼ିଆ' },
  { code: Language.URDU, label: 'اردو' }
];

export const UI_TRANSLATIONS: Record<string, Record<Language, string>> = {
  app_name: {
    [Language.ENGLISH]: 'Gita संवाद',
    [Language.HINDI]: 'गीता संवाद',
    [Language.MARATHI]: 'गीता संवाद',
    [Language.TAMIL]: 'கீதா சம்வாத்',
    [Language.TELUGU]: 'గీతా సంవాదం',
    [Language.KANNADA]: 'ಗೀತಾ ಸಂವಾದ',
    [Language.MALAYALAM]: 'ഗീതാ സംവാദം',
    [Language.BENGALI]: 'গীতা সংবাদ',
    [Language.GUJARATI]: 'ગીતા સંવાદ',
    [Language.PUNJABI]: 'ਗੀਤਾ ਸੰਵਾਦ',
    [Language.ODIA]: 'ଗୀତା ସମ୍ବାଦ',
    [Language.URDU]: 'گیتا سمواد',
    [Language.SANSKRIT]: 'गीता संवाद'
  },
  subtitle: {
    [Language.ENGLISH]: 'A Conversation with Krishna',
    [Language.HINDI]: 'कृष्ण के साथ एक संवाद',
    [Language.MARATHI]: 'कृष्णाशी संवाद',
    [Language.TAMIL]: 'கிருஷ்ணருடன் ஒரு உரையாடல்',
    [Language.TELUGU]: 'కృష్ణుడితో సంభాషణ',
    [Language.KANNADA]: 'ಕೃಷ್ಣನೊಂದಿಗೆ ಸಂಭಾಷಣೆ',
    [Language.MALAYALAM]: 'കൃഷ്ണനുമായുള്ള സംഭാഷണം',
    [Language.BENGALI]: 'কৃষ্ণের সাথে কথোপকথন',
    [Language.GUJARATI]: 'કૃષ્ણ સાથે વાતચીત',
    [Language.PUNJABI]: 'ਕ੍ਰਿਸ਼ਨ ਨਾਲ ਗੱਲਬाਤ',
    [Language.ODIA]: 'କୃଷ୍ଣଙ୍କ ସହ ଏକ କଥୋପକଥନ',
    [Language.URDU]: 'کرشنا کے ساتھ گفتگو',
    [Language.SANSKRIT]: 'कृष्णेन सह संवाद:'
  },
  press_to_chat: {
    [Language.ENGLISH]: 'Press here to chat',
    [Language.HINDI]: 'संवाद शुरू करने के लिए यहाँ दबाएँ',
    [Language.MARATHI]: 'गप्पा मारण्यासाठी येथे दाबा',
    [Language.TAMIL]: 'அரட்டை அடிக்க இங்கே அழுத்தவும்',
    [Language.TELUGU]: 'సంభాషించడానికి ఇక్కడ నొక్కండి',
    [Language.KANNADA]: 'ಚಾಟ್ ಮಾಡಲು ಇಲ್ಲಿ ಒತ್ತಿರಿ',
    [Language.MALAYALAM]: 'സംസാരിക്കാൻ ഇവിടെ അമർത്തുക',
    [Language.BENGALI]: 'চ্যাট করতে এখানে টিপুন',
    [Language.GUJARATI]: 'વાતચીત શરૂ કરવા અહીં દબાવો',
    [Language.PUNJABI]: 'ਗੱਲਬਾਤ ਲਈ ਇੱਥੇ ਦਬਾਓ',
    [Language.ODIA]: 'ଚାଟ୍ କରିବା ପାଇଁ ଏଠାରେ ଦବାନ୍ତୁ',
    [Language.URDU]: 'بات کرنے کے لیے یہاں دبائیں',
    [Language.SANSKRIT]: 'संवादं कर्तुम् अत्र नुদन्तु'
  },
  library: {
    [Language.ENGLISH]: 'Chat Library',
    [Language.HINDI]: 'संवाद पुस्तकालय',
    [Language.MARATHI]: 'संवाद ग्रंथालय',
    [Language.TAMIL]: 'அரட்டை நூலகம்',
    [Language.TELUGU]: 'సంభాషణ గ్రంథాలయం',
    [Language.KANNADA]: 'ಚಾಟ್ ಗ್ರಂಥಾಲಯ',
    [Language.MALAYALAM]: 'സംഭാഷണ ലൈബ്രറി',
    [Language.BENGALI]: 'চ্যাট লাইব্রেরি',
    [Language.GUJARATI]: 'વાતચીત પુસ્તકાલય',
    [Language.PUNJABI]: 'ਗੱਲਬਾਤ ਲਾਇਬ੍ਰੇਰੀ',
    [Language.ODIA]: 'ଚାଟ୍ ଲାଇବ୍ରେରୀ',
    [Language.URDU]: 'بات چیت کی لائبریری',
    [Language.SANSKRIT]: 'संवादकोश:'
  },
  shri_krishna: {
    [Language.ENGLISH]: 'Shri Krishna',
    [Language.HINDI]: 'श्री कृष्ण',
    [Language.MARATHI]: 'श्री कृष्ण',
    [Language.TAMIL]: 'ஸ்ரீ கிருஷ்ணா',
    [Language.TELUGU]: 'శ్రీ కృష్ణ',
    [Language.KANNADA]: 'ಶ್ರೀ ಕೃಷ್ಣ',
    [Language.MALAYALAM]: 'ശ്രീ കൃഷ്ണൻ',
    [Language.BENGALI]: 'শ্রী কৃষ্ণ',
    [Language.GUJARATI]: 'શ્રી કૃષ્ણ',
    [Language.PUNJABI]: 'ਸ਼੍ਰੀ ਕ੍ਰਿਸ਼ਨ',
    [Language.ODIA]: 'ଶ୍ରୀ କୃଷ୍ଣ',
    [Language.URDU]: 'شری کرشنا',
    [Language.SANSKRIT]: 'श्री कृष्ण:'
  },
  listen: {
    [Language.ENGLISH]: 'Listen',
    [Language.HINDI]: 'सुनें',
    [Language.MARATHI]: 'ऐका',
    [Language.TAMIL]: 'கேளுங்கள்',
    [Language.TELUGU]: 'వినండి',
    [Language.KANNADA]: 'ಕೇಳಿ',
    [Language.MALAYALAM]: 'ശ്രദ്ധിക്കുക',
    [Language.BENGALI]: 'শুনুন',
    [Language.GUJARATI]: 'સાંભળો',
    [Language.PUNJABI]: 'ਸੁਣੋ',
    [Language.ODIA]: 'ଶୁଣନ୍ତୁ',
    [Language.URDU]: 'سنیں',
    [Language.SANSKRIT]: 'शृणोतु'
  },
  speaking: {
    [Language.ENGLISH]: 'Speaking...',
    [Language.HINDI]: 'बोल रहे हैं...',
    [Language.MARATHI]: 'बोलत आहे...',
    [Language.TAMIL]: 'பேசுகிறார்...',
    [Language.TELUGU]: 'మాట్లాడుతున్నారు...',
    [Language.KANNADA]: 'ಮಾತನಾಡುತ್ತಿದ್ದಾರೆ...',
    [Language.MALAYALAM]: 'സംസാരിക്കുന്നു...',
    [Language.BENGALI]: 'বলছেন...',
    [Language.GUJARATI]: 'બોલી રહ્યા છે...',
    [Language.PUNJABI]: 'ਬੋਲ ਰਹੇ ਹਨ...',
    [Language.ODIA]: 'କହୁଛନ୍ତି...',
    [Language.URDU]: 'بول رہے ہیں...',
    [Language.SANSKRIT]: 'वदति...'
  },
  contemplating: {
    [Language.ENGLISH]: 'Contemplating...',
    [Language.HINDI]: 'विचार कर रहे हैं...',
    [Language.MARATHI]: 'विचार करत आहे...',
    [Language.TAMIL]: 'சிந்திக்கிறார்...',
    [Language.TELUGU]: 'ఆలోచిస్తున్నారు...',
    [Language.KANNADA]: 'ಚಿಂತಿಸುತ್ತಿದ್ದಾರೆ...',
    [Language.MALAYALAM]: 'ചിന്തിക്കുന്നു...',
    [Language.BENGALI]: 'চিন্তা করছেন...',
    [Language.GUJARATI]: 'વિચારી રહ્યા છે...',
    [Language.PUNJABI]: 'ਵਿਚਾਰ ਰਹੇ ਹਨ...',
    [Language.ODIA]: 'ଚିନ୍ତା କରୁଛନ୍ତି...',
    [Language.URDU]: 'غور کر رہے ہیں...',
    [Language.SANSKRIT]: 'चिन्तयति...'
  },
  seek_guidance: {
    [Language.ENGLISH]: 'Seek guidance...',
    [Language.HINDI]: 'मार्गदर्शन मांगें...',
    [Language.MARATHI]: 'मार्गदर्शन मागा...',
    [Language.TAMIL]: 'வழிகாட்டுதலைப் பெறுங்கள்...',
    [Language.TELUGU]: 'మార్గదర్శకత్వం కోరండి...',
    [Language.KANNADA]: 'ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ...',
    [Language.MALAYALAM]: 'മാർഗനിർദ്ദേശം തേടുക...',
    [Language.BENGALI]: 'নির্দেশনা সন্ধান করুন...',
    [Language.GUJARATI]: 'માર્ગદર્શન મેળવો...',
    [Language.PUNJABI]: 'ਮਾਰਗਦਰਸ਼ਨ ਲਓ...',
    [Language.ODIA]: 'ମାର୍ଗଦର୍ଶନ ମାଗନ୍ତୁ...',
    [Language.URDU]: 'رہنمائی طلب کریں...',
    [Language.SANSKRIT]: 'मार्गदर्शनं प्रार्थयन्तु...'
  },
  initial_greeting: {
    [Language.ENGLISH]: 'O seeker {name}, what weighs heavy on your heart? Speak freely, for I am here to guide you through the wisdom of the Bhagavad Gita.',
    [Language.HINDI]: 'हे साधक {name}, तुम्हारे हृदय पर क्या भार है? नि:संकोच कहें, क्योंकि मैं यहाँ श्रीमद्भगवद्गीता के ज्ञान के माध्यम से तुम्हारा मार्गदर्शन करने के लिए हूँ।',
    [Language.MARATHI]: 'हे साधक {name}, तुझ्या हृदयावर काय ओझे आहे? मोकळेपणाने बोल, कारण मी तुला श्रीमद्भगवद्गीतेच्या ज्ञानातून मार्गदर्शन करण्यासाठी येथे आहे.',
    [Language.TAMIL]: 'தேடுபவர் {name} அவர்களே, உங்கள் இதயம் எதனால் பாரமாக இருக்கிறது? தாராளமாகப் பேசுங்கள், ஏனென்றால் பகவத் கீதையின் ஞானத்தின் மூலம் உங்களுக்கு வழிகாட்ட நான் இங்கே இருக்கிறேன்.',
    [Language.TELUGU]: 'ఓ అన్వేషకుడా {name}, నీ హృదయంలో ఏది భారంగా ఉంది? స్ვეచ్ఛగా మాట్లాడు, ఎందుకంటే భగవద్గీత జ్ఞానం ద్వారా నీకు మార్గదర్శకత్వం చేయడానికి నేను ఇక్కడ ఉన్నాను.',
    [Language.KANNADA]: 'ಓ ಅನ್ವೇಷಕ {name}, ನಿನ್ನ ಹೃದಯದಲ್ಲಿ ಯಾವ ಭಾರವಿದೆ? ಮುಕ್ತವಾಗಿ ಮಾತನಾಡು, ಏಕೆಂದರೆ ਭਗವద్ಗೀತೆಯ ಜ್ಞಾನದ ಮೂಲಕ ನಿನಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ನಾನು ಇಲ್ಲಿದ್ದೇನೆ.',
    [Language.MALAYALAM]: 'അന്വേഷകനായ {name}, നിങ്ങളുടെ ഹൃദയത്തിൽ എന്ത് ഭാരമാണുള്ളത്? സ്വതന്ത്രമായി സംസാരിക്കൂ, ഭഗവദ്ഗീതയുടെ ജ്ഞാനത്തിലൂടെ നിങ്ങളെ നയിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്.',
    [Language.BENGALI]: 'হে সাধক {name}, তোমার হৃদয়ে কিসের ভার? নির্দ্বিধায় বলো, কারণ আমি এখানে তোমাকে শ্রীমদ্ভগবদ্গীতার জ্ঞানের মাধ্যমে পথ দেখানোর জন্য আছি।',
    [Language.GUJARATI]: 'હે સાધક {name}, તારા હૃદય પર શું ભાર છે? નિઃસંકોચ બોલ, કારણ કે હું અહીં તને શ્રીમદ ભગવદ ગીતાના જ્ઞાન દ્વારા માર્ગદર્શન આપવા માટે છું.',
    // Fixed: Used backticks to correctly handle the single quote in Punjabi text
    [Language.PUNJABI]: `ਹੇ ਸਾਧਕ {name}, ਤੁਹਾਡੇ ਦਿਲ 'ਤੇ ਕੀ ਭਾਰ ਹੈ? ਖੁੱਲ੍ਹ ਕੇ ਬੋਲੋ, ਕਿਉਂਕਿ ਮੈਂ ਇੱਥੇ ਸ਼੍ਰੀਮਦ ਭਗਵਦ ਗੀਤਾ ਦੇ ਗਿਆਨ ਰਾਹੀਂ ਤੁਹਾਡਾ ਮਾਰਗਦਰਸ਼ਨ ਕਰਨ ਲਈ ਹਾਂ।`,
    [Language.ODIA]: 'ହେ ସାଧକ {name}, ତୁମ ହୃଦୟରେ କି ଭାର ଅଛି? ମୁକ୍ତ ଭାବରେ କୁହ, କାରଣ ମୁଁ ଏଠାରେ ଶ୍ରୀମଦ ଭଗବଦ ଗିତା ଜ୍ଞାନ ମାଧ୍ୟମରେ ତୁମକୁ ମାର୍ਗଦର୍ଶନ କରିବାକୁ ଅଛି।',
    [Language.URDU]: 'اے طالب {name}، تمہارے دل پر کیا بوجھ ہے؟ کھل کر کہو، کیونکہ میں یہاں بھگوت گیتا کی حکمت کے ذریعے تمہاری رہنمائی کے لیے ہوں۔',
    [Language.SANSKRIT]: 'हे साधक {name}, तव हृदये किं भारम् अस्ति? मुक्तकण्ठेन वदतु, यतोहं श्रीमद्भगवद्गीताया: ज्ञानेन त्वां मार्गदर्शयितुम् अत्र अस्मि।'
  },
  no_chats: {
    [Language.ENGLISH]: 'No previous conversations found.',
    [Language.HINDI]: 'कोई पिछला संवाद नहीं मिला।',
    [Language.MARATHI]: 'मागील संवाद सापडले नाहीत.',
    [Language.TAMIL]: 'முந்தைய உரையாடல்கள் எதுவும் கிடைக்கவில்லை.',
    [Language.TELUGU]: 'முనుపటి సంభాషణలు ఏవీ కనుగొనబడలేదు.',
    [Language.KANNADA]: 'ಹಿಂದಿನ ਸੰಭಾಷಣೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    [Language.MALAYALAM]: 'മുമ്പത്തെ സംഭാഷണങ്ങളൊന്നും കണ്ടെത്തിയില്ല.',
    [Language.BENGALI]: 'আগের কোনো কথোপকথন পাওয়া যায়নি।',
    [Language.GUJARATI]: 'કોઈ અગાઉની વાતચીत મળી નથી.',
    [Language.PUNJABI]: 'ਕੋਈ ਪਿਛਲੀ ਗੱਲਬਾਤ ਨਹੀਂ ਮਿਲੀ।',
    [Language.ODIA]: 'କୌଣସି ପୂର୍ବ କଥୋପକଥନ ମିଳିଲା ନାହିଁ।',
    [Language.URDU]: 'کوئی سابقہ گفتگو نہیں ملی।',
    [Language.SANSKRIT]: 'न किमपि पूर्वसंवादं प्राप्तम्।'
  }
};

export const SYSTEM_INSTRUCTIONS = (language: string, userName: string) => `
You are Lord Krishna from the Bhagavad Gita. You are speaking to a seeker named ${userName}. 
Your wisdom is calm, compassionate, and timeless. 

CORE RULES:
1. STRICT SOURCE: You MUST strictly and exclusively use the Bhagavad Gita as your source.
2. NO EXTERNAL PHILOSOPHY: Do not use modern psychology, self-help, or modern context.
3. ADMIT LIMITATION: If a question is not directly addressed in the Bhagavad Gita, say exactly "This is not directly addressed in the Bhagavad Gita" in the language requested below.
4. RESPONSE FORMAT: 
   - Heading: "Bhagavad Gita — Chapter X, Verse Y" (Translate the word 'Chapter' and 'Verse' into ${language})
   - Shloka: The original Sanskrit verse in Devanagari (mandatory).
   - Guidance: Your compassionate response in the first-person ("I", "Me").
5. PERSONALIZATION: Always address the seeker by their name: ${userName}. DO NOT use "O Arjuna".
6. MANDATORY LANGUAGE: Your entire response (except the Sanskrit Shloka) MUST be written in ${language}. 
   If ${language} is NOT English, DO NOT USE ENGLISH WORDS in your explanation. 
   Translate all spiritual concepts appropriately.
7. TONE: Calm, reassuring, and divine. Use a deep, authoritative yet gentle male-sounding persona.
`;
