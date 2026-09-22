import { Language } from '../types';

export interface TranslationDictionary {
  navHome: string;
  navProblem: string;
  navFeatures: string;
  navWorks: string;
  navMarket: string;
  navDashboard: string;

  ready: string;
  tryTedkraft: string;

  eyebrow: string;
  heroLine1: string;
  heroLine2: string;
  heroLine3: string;
  heroText: string;
  startCreating: string;
  exploreProcess: string;

  voiceFirst: string;
  aiPhotography: string;
  multilingual: string;
  smartPricing: string;

  problemTitle: string;
  problemIntro: string;
  poorPhotography: string;
  poorPhotographyText: string;
  difficultCataloguing: string;
  difficultCataloguingText: string;
  languageBarriers: string;
  languageBarriersText: string;
  pricingUncertainty: string;
  pricingUncertaintyText: string;
  limitedMarket: string;
  limitedMarketText: string;
  lowDigital: string;
  lowDigitalText: string;

  aiTitle: string;
  aiIntro: string;
  productStudio: string;
  productStudioText: string;
  tryProductStudio: string;
  voiceCatalogue: string;
  voiceCatalogueText: string;
  multilingualAI: string;
  multilingualAIText: string;
  fairPrice: string;
  fairPriceText: string;
  demand: string;
  demandText: string;
  buyerMatching: string;
  buyerMatchingText: string;

  workflowTitle: string;
  workflowIntro: string;
  speak: string;
  speakText: string;
  aiUnderstands: string;
  catalogue: string;

  marketTitle1: string;
  marketTitle2: string;
  marketText: string;
  findBuyers: string;
  marketLinkage: string;
  artisan: string;
  tedkraftAI: string;
  hotels: string;
  corporate: string;
  retailers: string;

  finalTitle1: string;
  finalTitle2: string;
  finalText: string;
  finalButton: string;

  footerTitle: string;
  footerText: string;
  sih: string;

  modalEngine: string;
  createProduct: string;
  modalDescription: string;

  stepVoice: string;
  tapSpeak: string;
  listening: string;
  voiceCaptured: string;
  voiceLanguages: string;
  voiceExample: string;

  stepPhoto: string;
  uploadProduct: string;
  imageTypes: string;

  generatedCatalogue: string;
  waiting: string;
  homeDecor: string;

  catalogueProduct: string;
  catalogueDescription: string;
  material: string;
  bamboo: string;
  craft: string;
  handWeaving: string;
  time: string;
  twoDays: string;

  generateCatalogueBtn: string;
  fairPriceButton: string;
  fairPriceRange: string;
  fairPriceExplanation: string;

  dashboardEyebrow: string;
  heroCraft: string;
  heroBusiness: string;
  heroDescription: string;
  addProduct: string;
  verified: string;

  productsUploaded: string;
  marketViews: string;
  potentialBuyers: string;
  estimatedSales: string;

  highDemand: string;
  highDemandText: string;
  priceOpportunity: string;
  priceOpportunityText: string;
  buyerOpportunity: string;
  buyerOpportunityText: string;
  recommendationTitle: string;
  recommendationText: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    navHome: "Home",
    navProblem: "The Problem",
    navFeatures: "AI Features",
    navWorks: "How It Works",
    navMarket: "Market Linkage",
    navDashboard: "Dashboard",

    ready: "READY TO GROW?",
    tryTedkraft: "TRY TEDKRAFT →",

    eyebrow: "AI-DRIVEN ARTISAN COMMERCE",
    heroLine1: "Your craft.",
    heroLine2: "Your story.",
    heroLine3: "Your market.",
    heroText: "TEDKRAFT is an AI-powered virtual business manager designed to help marginalized artisans transform traditional craftsmanship into professional digital businesses.",
    startCreating: "START CREATING →",
    exploreProcess: "EXPLORE THE PROCESS",

    voiceFirst: "VOICE FIRST",
    aiPhotography: "AI PHOTOGRAPHY",
    multilingual: "MULTILINGUAL",
    smartPricing: "SMART PRICING",

    problemTitle: "THE PROBLEM",
    problemIntro: "Many artisans have exceptional skills but struggle with key challenges in entering the digital marketplace.",
    poorPhotography: "Poor Product Photography",
    poorPhotographyText: "Artisans often struggle to create professional e-commerce photographs.",
    difficultCataloguing: "Difficult Cataloguing",
    difficultCataloguingText: "Creating descriptions, categories and product information can be complicated.",
    languageBarriers: "Language Barriers",
    languageBarriersText: "Regional-language artisans face difficulties reaching wider markets.",
    pricingUncertainty: "Pricing Uncertainty",
    pricingUncertaintyText: "Lack of market information leads to uncertain pricing decisions.",
    limitedMarket: "Limited Market Access",
    limitedMarketText: "Dependence on fairs, exhibitions and intermediaries limits year-round opportunities.",
    lowDigital: "Low Digital Literacy",
    lowDigitalText: "Existing platforms can be confusing for first-time digital sellers.",

    aiTitle: "TEDKRAFT AI",
    aiIntro: "Simple tools that turn traditional craftsmanship into digital opportunity.",
    productStudio: "AI Product Studio",
    productStudioText: "Enhance lighting, remove distracting backgrounds and prepare professional product images.",
    tryProductStudio: "TRY PRODUCT STUDIO →",
    voiceCatalogue: "Voice → Catalogue",
    voiceCatalogueText: "Speak naturally and let AI extract product information automatically.",
    multilingualAI: "Multilingual AI",
    multilingualAIText: "Generate professional listings across regional languages, English and Hindi.",
    fairPrice: "Fair Price Advisor",
    fairPriceText: "Understand material cost, labour, market range and demand before deciding your price.",
    demand: "Demand Intelligence",
    demandText: "Discover products and categories that are receiving increased market interest.",
    buyerMatching: "AI Buyer Matching",
    buyerMatchingText: "Connect artisans with retailers, hotels, corporate buyers and wholesalers.",

    workflowTitle: "HOW IT WORKS",
    workflowIntro: "One simple journey from artisan voice to digital market.",
    speak: "SPEAK",
    speakText: '"This is a handmade bamboo basket. It took two days."',
    aiUnderstands: "AI UNDERSTANDS",
    catalogue: "CATALOGUE",

    marketTitle1: "From craft",
    marketTitle2: "to market.",
    marketText: "TEDKRAFT helps artisans discover relevant customers, retailers, hotels, corporate buyers and bulk opportunities.",
    findBuyers: "FIND BUYERS →",
    marketLinkage: "✦ MARKET LINKAGE",
    artisan: "ARTISAN",
    tedkraftAI: "TEDKRAFT AI",
    hotels: "Hotels",
    corporate: "Corporate",
    retailers: "Retailers",

    finalTitle1: "Traditional skill deserves",
    finalTitle2: "modern opportunity.",
    finalText: "AI-powered digital commerce for India's artisans.",
    finalButton: "TRY TEDKRAFT →",

    footerTitle: "TEDKRAFT",
    footerText: "AI-Driven Market Linkage and Smart Cataloging for Marginalized Artisans",
    sih: "SIH Problem Statement 26090",

    modalEngine: "TEDKRAFT AI ENGINE",
    createProduct: "CREATE YOUR PRODUCT",
    modalDescription: "Speak about your product and upload a photograph.",

    stepVoice: "STEP 01 — VOICE",
    tapSpeak: "TAP TO SPEAK",
    listening: "LISTENING...",
    voiceCaptured: "VOICE CAPTURED",
    voiceLanguages: "Tamil • Hindi • English",
    voiceExample: 'Example: "This is a handmade bamboo basket..."',

    stepPhoto: "STEP 02 — PHOTO",
    uploadProduct: "TAKE PHOTO OF YOUR PRODUCT",
    imageTypes: "JPG / PNG",

    generatedCatalogue: "✦ AI GENERATED CATALOGUE",
    waiting: "WAITING",
    homeDecor: "HOME DÉCOR",

    catalogueProduct: "Handwoven Natural Bamboo Storage Basket",
    catalogueDescription: "A handcrafted bamboo basket made using traditional weaving techniques.",
    material: "MATERIAL",
    bamboo: "Bamboo",
    craft: "CRAFT",
    handWeaving: "Hand Weaving",
    time: "TIME",
    twoDays: "2 Days",

    generateCatalogueBtn: "GENERATE CATALOGUE",
    fairPriceButton: "₹ FAIR PRICE",
    fairPriceRange: "AI FAIR PRICE RANGE",
    fairPriceExplanation: "Based on material cost, labour, comparable products and demand signals.",

    dashboardEyebrow: "06 — ARTISAN DASHBOARD",
    heroCraft: "Your craft.",
    heroBusiness: "Your business.",
    heroDescription: "A simple view of your products, market activity and TEDKRAFT AI recommendations.",
    addProduct: "+ ADD PRODUCT",
    verified: "✓ VERIFIED ARTISAN",

    productsUploaded: "PRODUCTS UPLOADED",
    marketViews: "MARKET VIEWS",
    potentialBuyers: "POTENTIAL BUYERS",
    estimatedSales: "ESTIMATED SALES",

    highDemand: "HIGH DEMAND DETECTED",
    highDemandText: "Bamboo home décor is receiving increased interest this month.",
    priceOpportunity: "PRICE OPPORTUNITY",
    priceOpportunityText: "Your bamboo basket may support a selling range of ₹750–₹850.",
    buyerOpportunity: "BUYER OPPORTUNITY",
    buyerOpportunityText: "8 potential buyers are looking for products in your category.",
    recommendationTitle: "Consider producing more bamboo home décor products.",
    recommendationText: "Similar products are receiving increased market interest."
  },

  ta: {
    navHome: "முகப்பு",
    navProblem: "பிரச்சனை",
    navFeatures: "AI அம்சங்கள்",
    navWorks: "எப்படி செயல்படுகிறது",
    navMarket: "சந்தை இணைப்பு",
    navDashboard: "டாஷ்போர்டு",

    ready: "வளர தயாரா?",
    tryTedkraft: "TEDKRAFT முயற்சிக்கவும் →",

    eyebrow: "AI அடிப்படையிலான கைவினை வணிகம்",
    heroLine1: "உங்கள் கலை.",
    heroLine2: "உங்கள் கதை.",
    heroLine3: "உங்கள் சந்தை.",
    heroText: "TEDKRAFT என்பது கைவினைஞர்கள் தங்கள் பாரம்பரிய கைவினையை தொழில்முறை டிஜிட்டல் வணிகமாக மாற்ற உதவும் AI அடிப்படையிலான மெய்நிகர் வணிக மேலாளர்.",
    startCreating: "உருவாக்கத் தொடங்குங்கள் →",
    exploreProcess: "செயல்முறையைப் பார்க்கவும்",

    voiceFirst: "குரல் மூலம்",
    aiPhotography: "AI புகைப்படம்",
    multilingual: "பல மொழிகள்",
    smartPricing: "ஸ்மார்ட் விலை",

    problemTitle: "பிரச்சனை",
    problemIntro: "பல கைவினைஞர்களுக்கு சிறந்த திறன்கள் இருந்தாலும் டிஜிட்டல் சந்தையில் நுழைவதில் பல சவால்கள் உள்ளன.",
    poorPhotography: "மோசமான தயாரிப்பு புகைப்படம்",
    poorPhotographyText: "தொழில்முறை இ-காமர்ஸ் புகைப்படங்களை உருவாக்குவது கடினமாக உள்ளது.",
    difficultCataloguing: "கடினமான பட்டியலிடல்",
    difficultCataloguingText: "விளக்கங்கள், வகைகள் மற்றும் தயாரிப்பு தகவல்களை உருவாக்குவது சிக்கலாக இருக்கலாம்.",
    languageBarriers: "மொழித் தடைகள்",
    languageBarriersText: "பிராந்திய மொழி பேசும் கைவினைஞர்கள் பரந்த சந்தைகளை அடைவதில் சிரமப்படுகின்றனர்.",
    pricingUncertainty: "விலை நிர்ணய நிச்சயமின்மை",
    pricingUncertaintyText: "சந்தை தகவல் இல்லாததால் விலை நிர்ணய முடிவுகள் நிச்சயமற்றதாகின்றன.",
    limitedMarket: "குறைந்த சந்தை அணுகல்",
    limitedMarketText: "கண்காட்சிகள் மற்றும் இடைத்தரகர்களை சார்ந்திருப்பது ஆண்டு முழுவதும் கிடைக்கும் வாய்ப்புகளை குறைக்கிறது.",
    lowDigital: "குறைந்த டிஜிட்டல் அறிவு",
    lowDigitalText: "முதல் முறையாக டிஜிட்டல் விற்பனை செய்பவர்களுக்கு தற்போதைய தளங்கள் குழப்பமாக இருக்கலாம்.",

    aiTitle: "TEDKRAFT AI",
    aiIntro: "பாரம்பரிய கைவினையை டிஜிட்டல் வாய்ப்பாக மாற்றும் எளிய கருவிகள்.",
    productStudio: "AI தயாரிப்பு ஸ்டுடியோ",
    productStudioText: "ஒளியை மேம்படுத்தி, தேவையற்ற பின்னணியை அகற்றி, தொழில்முறை தயாரிப்பு புகைப்படங்களை உருவாக்குங்கள்.",
    tryProductStudio: "தயாரிப்பு ஸ்டுடியோவை முயற்சிக்கவும் →",
    voiceCatalogue: "குரல் → பட்டியல்",
    voiceCatalogueText: "இயல்பாகப் பேசுங்கள்; AI தயாரிப்பு தகவல்களை தானாகப் பிரித்தெடுக்கும்.",
    multilingualAI: "பலமொழி AI",
    multilingualAIText: "பிராந்திய மொழிகள், ஆங்கிலம் மற்றும் இந்தியில் தொழில்முறை பட்டியல்களை உருவாக்குங்கள்.",
    fairPrice: "நியாயமான விலை ஆலோசகர்",
    fairPriceText: "விலையை நிர்ணயிப்பதற்கு முன் பொருள் செலவு, உழைப்பு, சந்தை வரம்பு மற்றும் தேவையைப் புரிந்துகொள்ளுங்கள்.",
    demand: "தேவை நுண்ணறிவு",
    demandText: "சந்தையில் அதிகரித்து வரும் ஆர்வம் கொண்ட தயாரிப்புகள் மற்றும் வகைகளை கண்டறியுங்கள்.",
    buyerMatching: "AI வாங்குபவர் பொருத்தம்",
    buyerMatchingText: "கைவினைஞர்களை சில்லறை விற்பனையாளர்கள், ஹோட்டல்கள், நிறுவன வாங்குபவர்கள் மற்றும் மொத்த விற்பனையாளர்களுடன் இணைக்கவும்.",

    workflowTitle: "எப்படி செயல்படுகிறது",
    workflowIntro: "கைவினைஞரின் குரலில் இருந்து டிஜிட்டல் சந்தை வரை ஒரு எளிய பயணம்.",
    speak: "பேசுங்கள்",
    speakText: '"இது கையால் செய்யப்பட்ட மூங்கில் கூடை. இதை செய்ய இரண்டு நாட்கள் ஆனது."',
    aiUnderstands: "AI புரிந்துகொள்கிறது",
    catalogue: "பட்டியல்",

    marketTitle1: "கைவினையிலிருந்து",
    marketTitle2: "சந்தைக்கு.",
    marketText: "TEDKRAFT கைவினைஞர்கள் தொடர்புடைய வாடிக்கையாளர்கள், சில்லறை விற்பனையாளர்கள், ஹோட்டல்கள், நிறுவன வாங்குபவர்கள் மற்றும் மொத்த வாய்ப்புகளை கண்டறிய உதவுகிறது.",
    findBuyers: "வாங்குபவர்களைக் கண்டறியவும் →",
    marketLinkage: "✦ சந்தை இணைப்பு",
    artisan: "கைவினைஞர்",
    tedkraftAI: "TEDKRAFT AI",
    hotels: "ஹோட்டல்கள்",
    corporate: "நிறுவனங்கள்",
    retailers: "சில்லறை விற்பனையாளர்கள்",

    finalTitle1: "பாரம்பரிய திறமைக்கு",
    finalTitle2: "நவீன வாய்ப்பு தேவை.",
    finalText: "இந்திய கைவினைஞர்களுக்கான AI அடிப்படையிலான டிஜிட்டல் வணிகம்.",
    finalButton: "TEDKRAFT முயற்சிக்கவும் →",

    footerTitle: "TEDKRAFT",
    footerText: "கைவினைஞர்களுக்கான AI அடிப்படையிலான சந்தை இணைப்பு மற்றும் ஸ்மார்ட் பட்டியலிடல்",
    sih: "SIH பிரச்சனை அறிக்கை 26090",

    modalEngine: "TEDKRAFT AI ENGINE",
    createProduct: "உங்கள் தயாரிப்பை உருவாக்குங்கள்",
    modalDescription: "உங்கள் தயாரிப்பைப் பற்றி பேசுங்கள் மற்றும் புகைப்படத்தைப் பதிவேற்றுங்கள்.",

    stepVoice: "படி 01 — குரல்",
    tapSpeak: "பேச தட்டவும்",
    listening: "கேட்கிறது...",
    voiceCaptured: "குரல் பதிவு செய்யப்பட்டது",
    voiceLanguages: "தமிழ் • இந்தி • ஆங்கிலம்",
    voiceExample: 'உதாரணம்: "இது கையால் செய்யப்பட்ட மூங்கில் கூடை..."',

    stepPhoto: "படி 02 — புகைப்படம்",
    uploadProduct: "தயாரிப்பைப் பதிவேற்றவும்",
    imageTypes: "JPG / PNG",

    generatedCatalogue: "✦ AI உருவாக்கிய பட்டியல்",
    waiting: "காத்திருக்கிறது",
    homeDecor: "வீட்டு அலங்காரம்",

    catalogueProduct: "கையால் நெய்யப்பட்ட இயற்கை மூங்கில் சேமிப்பு கூடை",
    catalogueDescription: "பாரம்பரிய நெசவு முறைகளைப் பயன்படுத்தி கையால் செய்யப்பட்ட மூங்கில் கூடை.",
    material: "பொருள்",
    bamboo: "மூங்கில்",
    craft: "கைவினை",
    handWeaving: "கையால் நெய்தல்",
    time: "நேரம்",
    twoDays: "2 நாட்கள்",

    generateCatalogueBtn: "பட்டியலை உருவாக்கவும்",
    fairPriceButton: "₹ நியாயமான விலை",
    fairPriceRange: "AI நியாயமான விலை வரம்பு",
    fairPriceExplanation: "பொருள் செலவு, உழைப்பு, ஒப்பிடக்கூடிய தயாரிப்புகள் மற்றும் தேவை அடிப்படையில்.",

    dashboardEyebrow: "06 — கைவினைஞர் டாஷ்போர்டு",
    heroCraft: "உங்கள் கைவினை.",
    heroBusiness: "உங்கள் வணிகம்.",
    heroDescription: "உங்கள் தயாரிப்புகள், சந்தை செயல்பாடுகள் மற்றும் TEDKRAFT AI பரிந்துரைகளின் எளிய பார்வை.",
    addProduct: "+ தயாரிப்பு சேர்க்க",
    verified: "✓ சரிபார்க்கப்பட்ட கைவினைஞர்",

    productsUploaded: "பதிவேற்றிய தயாரிப்புகள்",
    marketViews: "சந்தை பார்வைகள்",
    potentialBuyers: "சாத்தியமான வாங்குபவர்கள்",
    estimatedSales: "மதிப்பிடப்பட்ட விற்பனை",

    highDemand: "அதிக தேவை கண்டறியப்பட்டது",
    highDemandText: "மூங்கில் வீட்டு அலங்காரப் பொருட்களுக்கு இந்த மாதம் அதிக ஆர்வம் உள்ளது.",
    priceOpportunity: "விலை வாய்ப்பு",
    priceOpportunityText: "உங்கள் மூங்கில் கூடைக்கு ₹750–₹850 விலை வரம்பு பொருத்தமாக இருக்கலாம்.",
    buyerOpportunity: "வாங்குபவர் வாய்ப்பு",
    buyerOpportunityText: "உங்கள் பிரிவில் 8 சாத்தியமான வாங்குபவர்கள் உள்ளனர்.",
    recommendationTitle: "மேலும் மூங்கில் வீட்டு அலங்காரப் பொருட்களை உருவாக்குங்கள்.",
    recommendationText: "இதே போன்ற தயாரிப்புகளுக்கு சந்தையில் அதிக ஆர்வம் காணப்படுகிறது."
  },

  hi: {
    navHome: "होम",
    navProblem: "समस्या",
    navFeatures: "AI सुविधाएँ",
    navWorks: "यह कैसे काम करता है",
    navMarket: "बाज़ार संपर्क",
    navDashboard: "डैशबोर्ड",

    ready: "बढ़ने के लिए तैयार?",
    tryTedkraft: "TEDKRAFT आज़माएँ →",

    eyebrow: "AI आधारित कारीगर वाणिज्य",
    heroLine1: "आपकी कला।",
    heroLine2: "आपकी कहानी।",
    heroLine3: "आपका बाज़ार।",
    heroText: "TEDKRAFT एक AI आधारित वर्चुअल बिज़नेस मैनेजर है जो कारीगरों को पारंपरिक कारीगरी को पेशेवर डिजिटल व्यवसाय में बदलने में मदद करता है।",
    startCreating: "बनाना शुरू करें →",
    exploreProcess: "प्रक्रिया देखें",

    voiceFirst: "वॉइस फर्स्ट",
    aiPhotography: "AI फोटोग्राफी",
    multilingual: "बहुभाषी",
    smartPricing: "स्मार्ट मूल्य",

    problemTitle: "समस्या",
    problemIntro: "कई कारीगरों के पास शानदार कौशल है, लेकिन डिजिटल बाज़ार में प्रवेश करने में उन्हें कई चुनौतियों का सामना करना पड़ता है।",
    poorPhotography: "खराब उत्पाद फोटोग्राफी",
    poorPhotographyText: "कारीगरों के लिए पेशेवर ई-कॉमर्स तस्वीरें बनाना कठिन होता है।",
    difficultCataloguing: "मुश्किल कैटलॉगिंग",
    difficultCataloguingText: "विवरण, श्रेणियाँ और उत्पाद जानकारी बनाना जटिल हो सकता है।",
    languageBarriers: "भाषा की बाधाएँ",
    languageBarriersText: "क्षेत्रीय भाषा बोलने वाले कारीगर बड़े बाज़ारों तक पहुँचने में कठिनाई महसूस करते हैं।",
    pricingUncertainty: "मूल्य निर्धारण की अनिश्चितता",
    pricingUncertaintyText: "बाज़ार की जानकारी की कमी से मूल्य निर्धारण के निर्णय अनिश्चित हो जाते हैं।",
    limitedMarket: "सीमित बाज़ार पहुँच",
    limitedMarketText: "मेलों, प्रदर्शनियों और बिचौलियों पर निर्भरता साल भर के अवसरों को सीमित करती है।",
    lowDigital: "कम डिजिटल साक्षरता",
    lowDigitalText: "पहली बार डिजिटल बिक्री करने वालों के लिए मौजूदा प्लेटफॉर्म भ्रमित करने वाले हो सकते हैं।",

    aiTitle: "TEDKRAFT AI",
    aiIntro: "पारंपरिक कारीगरी को डिजिटल अवसर में बदलने वाले सरल उपकरण।",
    productStudio: "AI प्रोडक्ट स्टूडियो",
    productStudioText: "रोशनी बेहतर करें, अनचाहे बैकग्राउंड हटाएँ और पेशेवर उत्पाद तस्वीरें तैयार करें।",
    tryProductStudio: "प्रोडक्ट स्टूडियो आज़माएँ →",
    voiceCatalogue: "वॉइस → कैटलॉग",
    voiceCatalogueText: "स्वाभाविक रूप से बोलें और AI को उत्पाद की जानकारी अपने आप निकालने दें।",
    multilingualAI: "बहुभाषी AI",
    multilingualAIText: "क्षेत्रीय भाषाओं, अंग्रेज़ी और हिंदी में पेशेवर लिस्टिंग बनाएँ।",
    fairPrice: "उचित मूल्य सलाहकार",
    fairPriceText: "कीमत तय करने से पहले सामग्री लागत, श्रम, बाज़ार सीमा और मांग को समझें।",
    demand: "डिमांड इंटेलिजेंस",
    demandText: "उन उत्पादों और श्रेणियों को खोजें जिनमें बाज़ार की रुचि बढ़ रही है।",
    buyerMatching: "AI खरीदार मिलान",
    buyerMatchingText: "कारीगरों को रिटेलर, होटल, कॉर्पोरेट खरीदार और थोक विक्रेताओं से जोड़ें.",

    workflowTitle: "यह कैसे काम करता है",
    workflowIntro: "कारीगर की आवाज़ से डिजिटल बाज़ार तक एक सरल यात्रा।",
    speak: "बोलें",
    speakText: '"यह हाथ से बनी बाँस की टोकरी है। इसे बनाने में दो दिन लगे।"',
    aiUnderstands: "AI समझता है",
    catalogue: "कैटलॉग",

    marketTitle1: "कारीगरी से",
    marketTitle2: "बाज़ार तक।",
    marketText: "TEDKRAFT कारीगरों को संबंधित ग्राहक, रिटेलर, होटल, कॉर्पोरेट खरीदार और थोक अवसर खोजने में मदद करता है।",
    findBuyers: "खरीदार खोजें →",
    marketLinkage: "✦ बाज़ार संपर्क",
    artisan: "कारीगर",
    tedkraftAI: "TEDKRAFT AI",
    hotels: "होटल",
    corporate: "कॉर्पोरेट",
    retailers: "रिटेलर",

    finalTitle1: "पारंपरिक कौशल को",
    finalTitle2: "आधुनिक अवसर मिलना चाहिए।",
    finalText: "भारत के कारीगरों के लिए AI आधारित डिजिटल कॉमर्स।",
    finalButton: "TEDKRAFT आज़माएँ →",

    footerTitle: "TEDKRAFT",
    footerText: "कारीगरों के लिए AI आधारित बाज़ार संपर्क और स्मार्ट कैटलॉगिंग",
    sih: "SIH समस्या विवरण 26090",

    modalEngine: "TEDKRAFT AI ENGINE",
    createProduct: "अपना उत्पाद बनाएँ",
    modalDescription: "अपने उत्पाद के बारे में बोलें और एक फोटो अपलोड करें।",

    stepVoice: "चरण 01 — वॉइस",
    tapSpeak: "बोलने के लिए टैप करें",
    listening: "सुन रहा है...",
    voiceCaptured: "आवाज़ रिकॉर्ड हो गई",
    voiceLanguages: "तमिल • हिंदी • अंग्रेज़ी",
    voiceExample: 'उदाहरण: "यह हाथ से बनी बाँस की टोकरी है..."',

    stepPhoto: "चरण 02 — फोटो",
    uploadProduct: "उत्पाद अपलोड करें",
    imageTypes: "JPG / PNG",

    generatedCatalogue: "✦ AI द्वारा बनाया गया कैटलॉग",
    waiting: "प्रतीक्षा",
    homeDecor: "होम डेकोर",

    catalogueProduct: "हाथ से बुनी प्राकृतिक बाँस की स्टोरेज टोकरी",
    catalogueDescription: "पारंपरिक बुनाई तकनीकों से बनाई गई हाथ से तैयार बाँस की टोकरी।",
    material: "सामग्री",
    bamboo: "बाँस",
    craft: "कारीगरी",
    handWeaving: "हाथ से बुनाई",
    time: "समय",
    twoDays: "2 दिन",

    generateCatalogueBtn: "कैटलॉग बनाएँ",
    fairPriceButton: "₹ उचित मूल्य",
    fairPriceRange: "AI उचित मूल्य सीमा",
    fairPriceExplanation: "सामग्री लागत, श्रम, समान उत्पादों और मांग के आधार पर।",

    dashboardEyebrow: "06 — कारीगर डैशबोर्ड",
    heroCraft: "आपका शिल्प.",
    heroBusiness: "आपका व्यवसाय.",
    heroDescription: "आपके उत्पादों, बाज़ार गतिविधि और TEDKRAFT AI सुझावों का सरल अवलोकन।",
    addProduct: "+ उत्पाद जोड़ें",
    verified: "✓ सत्यापित कारीगर",

    productsUploaded: "अपलोड किए गए उत्पाद",
    marketViews: "बाज़ार दृश्य",
    potentialBuyers: "संभावित खरीदार",
    estimatedSales: "अनुमानित बिक्री",

    highDemand: "उच्च मांग का पता चला",
    highDemandText: "इस महीने बाँस की गृह सज्जा में रुचि बढ़ रही है।",
    priceOpportunity: "मूल्य अवसर",
    priceOpportunityText: "आपकी बाँस की टोकरी के लिए ₹750–₹850 की कीमत उपयुक्त हो सकती है।",
    buyerOpportunity: "खरीदार अवसर",
    buyerOpportunityText: "आपकी श्रेणी में 8 संभावित खरीदार हैं।",
    recommendationTitle: "अधिक बाँस की गृह सज्जा के उत्पाद बनाने पर विचार करें।",
    recommendationText: "समान उत्पादों में बाज़ार की रुचि बढ़ रही है।"
  },

  kn: {
    navHome: "ಮುಖಪುಟ",
    navProblem: "ಸಮಸ್ಯೆ",
    navFeatures: "AI ವೈಶಿಷ್ಟ್ಯಗಳು",
    navWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    navMarket: "ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ",
    navDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",

    ready: "ಬೆಳೆಯಲು ಸಿದ್ಧವೇ?",
    tryTedkraft: "TEDKRAFT ಪ್ರಯತ್ನಿಸಿ →",

    eyebrow: "AI ಆಧಾರಿತ ಕರಕುಶಲ ವಾಣಿಜ್ಯ",
    heroLine1: "ನಿಮ್ಮ ಕಲೆ.",
    heroLine2: "ನಿಮ್ಮ ಕಥೆ.",
    heroLine3: "ನಿಮ್ಮ ಮಾರುಕಟ್ಟೆ.",
    heroText: "TEDKRAFT ಎಂಬುದು ಸಾಂಪ್ರದಾಯಿಕ ಕರಕುಶಲತೆಯನ್ನು ವೃತ್ತಿಪರ ಡಿಜಿಟಲ್ ವ್ಯವಹಾರವಾಗಿ ಪರಿವರ್ತಿಸಲು ಕರಕುಶಲಗಾರರಿಗೆ ಸಹಾಯ ಮಾಡುವ AI ಆಧಾರಿತ ವರ್ಚುವಲ್ ವ್ಯವಹಾರ ನಿರ್ವಾಹಕವಾಗಿದೆ.",
    startCreating: "ರಚಿಸಲು ಪ್ರಾರಂಭಿಸಿ →",
    exploreProcess: "ಪ್ರಕ್ರಿಯೆಯನ್ನು ವೀಕ್ಷಿಸಿ",

    voiceFirst: "ವಾಯ್ಸ್ ಫಸ್ಟ್",
    aiPhotography: "AI ಫೋಟೋಗ್ರಫಿ",
    multilingual: "ಬಹುಭಾಷಾ",
    smartPricing: "ಸ್ಮಾರ್ಟ್ ಬೆಲೆ",

    problemTitle: "ಸಮಸ್ಯೆ",
    problemIntro: "ಹಲವು ಕರಕುಶಲಗಾರರು ಅತ್ಯುತ್ತಮ ಕೌಶಲ್ಯಗಳನ್ನು ಹೊಂದಿದ್ದರೂ ಡಿಜಿಟಲ್ ಮಾರುಕಟ್ಟೆಯನ್ನು ಪ್ರವೇಶಿಸುವಲ್ಲಿ ಪ್ರಮುಖ ಸವಾಲುಗಳನ್ನು ಎದುರಿಸುತ್ತಾರೆ.",
    poorPhotography: "ಕಳಪೆ ಉತ್ಪನ್ನ ಛಾಯಾಗ್ರಹಣ",
    poorPhotographyText: "ವೃತ್ತಿಪರ ಇ-ಕಾಮರ್ಸ್ ಛಾಯಾಚಿತ್ರಗಳನ್ನು ರಚಿಸುವುದು ಕರಕುಶಲಗಾರರಿಗೆ ಕಷ್ಟಕರವಾಗಿದೆ.",
    difficultCataloguing: "ಕಷ್ಟಕರವಾದ ಕ್ಯಾಟಲಾಗ್ ತಯಾರಿಕೆ",
    difficultCataloguingText: "ವಿವರಣೆಗಳು, ವರ್ಗಗಳು ಮತ್ತು ಉತ್ಪನ್ನದ ಮಾಹಿತಿಯನ್ನು ರಚಿಸುವುದು ಸಂಕೀರ್ಣವಾಗಬಹುದು.",
    languageBarriers: "ಭಾಷೆಯ ಅಡೆತಡೆಗಳು",
    languageBarriersText: "ಪ್ರಾದೇಶಿಕ ಭಾಷೆಯ ಕರಕುಶಲಗಾರರು ವಿಶಾಲ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ತಲುಪಲು ಕಷ್ಟಪಡುತ್ತಾರೆ.",
    pricingUncertainty: "ಬೆಲೆ ನಿರ್ಧಾರದ ಅನಿಶ್ಚಿತತೆ",
    pricingUncertaintyText: "ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿಯ ಕೊರತೆಯು ಅನಿಶ್ಚಿತ ಬೆಲೆ ನಿರ್ಧಾರಗಳಿಗೆ ಕಾರಣವಾಗುತ್ತದೆ.",
    limitedMarket: "ಸೀಮಿತ ಮಾರುಕಟ್ಟೆ ಪ್ರವೇಶ",
    limitedMarketText: "ಪ್ರದರ್ಶನಗಳು ಮತ್ತು ಮಧ್ಯವರ್ತಿಗಳ ಮೇಲಿನ ಅವಲಂಬನೆಯು ವರ್ಷಪೂರ್ತಿ ಅವಕಾಶಗಳನ್ನು ಸೀಮಿತಗೊಳಿಸುತ್ತದೆ.",
    lowDigital: "ಕಡಿಮೆ ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ",
    lowDigitalText: "ಮೊದಲ ಬಾರಿಗೆ ಡಿಜಿಟಲ್ ಮಾರಾಟ ಮಾಡುವವರಿಗೆ ಪ್ರಸ್ತುತ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು ಗೊಂದಲಮಯವಾಗಿರಬಹುದು.",

    aiTitle: "TEDKRAFT AI",
    aiIntro: "ಸಾಂಪ್ರದಾಯಿಕ ಕರಕುಶಲತೆಯನ್ನು ಡಿಜಿಟಲ್ ಅವಕಾಶವನ್ನಾಗಿ ಮಾಡುವ ಸರಳ ಉಪಕರಣಗಳು.",
    productStudio: "AI ಪ್ರಾಡಕ್ಟ್ ಸ್ಟುಡಿಯೋ",
    productStudioText: "ಬೆಳಕನ್ನು ಸುಧಾರಿಸಿ, ಅನಗತ್ಯ ಹಿನ್ನೆಲೆಯನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ವೃತ್ತಿಪರ ಉತ್ಪನ್ನ ಚಿತ್ರಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ.",
    tryProductStudio: "ಪ್ರೊಡಕ್ಟ್ ಸ್ಟುಡಿಯೋ ಪ್ರಯತ್ನಿಸಿ →",
    voiceCatalogue: "ವಾಯ್ಸ್ → ಕ್ಯಾಟಲಾಗ್",
    voiceCatalogueText: "ಸಹಜವಾಗಿ ಮಾತನಾಡಿ ಮತ್ತು AI ಉತ್ಪನ್ನ ಮಾಹಿತಿಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪಡೆದುಕೊಳ್ಳಲು ಬಿಡಿ.",
    multilingualAI: "ಬಹುಭಾಷಾ AI",
    multilingualAIText: "ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳು, ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಹಿಂದಿಯಲ್ಲಿ ವೃತ್ತಿಪರ ಪಟ್ಟಿಗಳನ್ನು ರಚಿಸಿ.",
    fairPrice: "ನ್ಯಾಯಯುತ ಬೆಲೆ ಸಲಹೆಗಾರ",
    fairPriceText: "ಬೆಲೆಯನ್ನು ನಿರ್ಧರಿಸುವ ಮೊದಲು ವಸ್ತು ವೆಚ್ಚ, ಶ್ರಮ, ಮಾರುಕಟ್ಟೆ ಶ್ರೇಣಿ ಮತ್ತು ಬೇಡಿಕೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    demand: "ಡಿಮ್ಯಾಂಡ್ ಇಂಟೆಲಿಜೆನ್ಸ್",
    demandText: "ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹೆಚ್ಚುತ್ತಿರುವ ಆಸಕ್ತಿಯನ್ನು ಪಡೆಯುತ್ತಿರುವ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ವರ್ಗಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",
    buyerMatching: "AI ಖರೀದಿದಾರರ ಹೊಂದಾಣಿಕೆ",
    buyerMatchingText: "ಕರಕುಶಲಗಾರರನ್ನು ಚಿಲ್ಲರೆ ಮಾರಾಟಗಾರರು, ಹೋಟೆಲ್‌ಗಳು, ಕಾರ್ಪೊರೇಟ್ ಖರೀದಿದಾರರು ಮತ್ತು ಸಗಟು ಮಾರಾಟಗಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ.",

    workflowTitle: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    workflowIntro: "ಕರಕುಶಲಗಾರರ ಧ್ವನಿಯಿಂದ ಡಿಜಿಟಲ್ ಮಾರುಕಟ್ಟೆಯವರೆಗೆ ಒಂದು ಸರಳ ಪ್ರಯಾಣ.",
    speak: "ಮಾತನಾಡಿ",
    speakText: '"ಇದು ಕೈಯಿಂದ ಮಾಡಿದ ಬಿದಿರಿನ ಬುಟ್ಟಿ. ಇದನ್ನು ಮಾಡಲು ಎರಡು ದಿನ ತೆಗೆದುಕೊಂಡಿತು."',
    aiUnderstands: "AI ಅರ್ಥಮಾಡಿಕೊಳ್ಳುತ್ತದೆ",
    catalogue: "ಕ್ಯಾಟಲಾಗ್",

    marketTitle1: "ಕರಕುಶಲತೆಯಿಂದ",
    marketTitle2: "ಮಾರುಕಟ್ಟೆಗೆ.",
    marketText: "TEDKRAFT ಕರಕುಶಲಗಾರರಿಗೆ ಸಂಬಂಧಿತ ಗ್ರಾಹಕರು, ಚಿಲ್ಲರೆ ಮಾರಾಟಗಾರರು, ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಕಾರ್ಪೊರೇಟ್ ಅವಕಾಶಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    findBuyers: "ಖರೀದಿದಾರರನ್ನು ಹುಡುಕಿ →",
    marketLinkage: "✦ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ",
    artisan: "ಕರಕುಶಲಗಾರ",
    tedkraftAI: "TEDKRAFT AI",
    hotels: "ಹೋಟೆಲ್‌ಗಳು",
    corporate: "ಕಾರ್ಪೊರೇಟ್",
    retailers: "ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರಿಗಳು",

    finalTitle1: "ಸಾಂಪ್ರದಾಯಿಕ ಕೌಶಲ್ಯಕ್ಕೆ",
    finalTitle2: "ಆಧುನಿಕ ಅವಕಾಶ ಸಿಗಬೇಕು.",
    finalText: "ಭಾರತದ ಕರಕುಶಲಗಾರರಿಗೆ AI ಆಧಾರಿತ ಡಿಜಿಟಲ್ ವಾಣಿಜ್ಯ.",
    finalButton: "TEDKRAFT ಪ್ರಯತ್ನಿಸಿ →",

    footerTitle: "TEDKRAFT",
    footerText: "ಕರಕುಶಲಗಾರರಿಗಾಗಿ AI ಆಧಾರಿತ ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಕ್ಯಾಟಲಾಗ್",
    sih: "SIH ಸಮಸ್ಯೆ ವಿವರಣೆ 26090",

    modalEngine: "TEDKRAFT AI ENGINE",
    createProduct: "ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ರಚಿಸಿ",
    modalDescription: "ನಿಮ್ಮ ಉತ್ಪನ್ನದ ಬಗ್ಗೆ ಮಾತನಾಡಿ ಮತ್ತು ಛಾಯಾಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",

    stepVoice: "ಹಂತ 01 — ವಾಯ್ಸ್",
    tapSpeak: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    listening: "ಆಲಿಸಲಾಗುತ್ತಿದೆ...",
    voiceCaptured: "ಧ್ವನಿ ದಾಖಲಾಗಿದೆ",
    voiceLanguages: "ತಮಿಳು • ಹಿಂದಿ • ಇಂಗ್ಲಿಷ್",
    voiceExample: 'ಉದಾಹರಣೆ: "ಇದು ಕೈಯಿಂದ ಮಾಡಿದ ಬಿದಿರಿನ ಬುಟ್ಟಿ..."',

    stepPhoto: "ಹಂತ 02 — ಫೋಟೋ",
    uploadProduct: "ಉತ್ಪನ್ನ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    imageTypes: "JPG / PNG",

    generatedCatalogue: "✦ AI ರಚಿಸಿದ ಕ್ಯಾಟಲಾಗ್",
    waiting: "ನಿರೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ",
    homeDecor: "ಮನೆ ಅಲಂಕಾರ",

    catalogueProduct: "ಕೈಯಿಂದ ನೇಯ್ದ ನೈಸರ್ಗಿಕ ಬಿದಿರು ಸಂಗ್ರಹ ಬುಟ್ಟಿ",
    catalogueDescription: "ಸಾಂಪ್ರದಾಯಿಕ ನೇಯ್ಗೆ ತಂತ್ರಗಳನ್ನು ಬಳಸಿ ಕೈಯಿಂದ ಮಾಡಿದ ಬಿದಿರು ಬುಟ್ಟಿ.",
    material: "ವಸ್ತು",
    bamboo: "ಬಿದಿರು",
    craft: "ಕರಕುಶಲ",
    handWeaving: "ಕೈ ನೇಯ್ಗೆ",
    time: "ಸಮಯ",
    twoDays: "2 ದಿನಗಳು",

    generateCatalogueBtn: "ಕ್ಯಾಟಲಾಗ್ ರಚಿಸಿ",
    fairPriceButton: "₹ ನ್ಯಾಯಯುತ ಬೆಲೆ",
    fairPriceRange: "AI ನ್ಯಾಯಯುತ ಬೆಲೆ ಶ್ರೇಣಿ",
    fairPriceExplanation: "ವಸ್ತು ವೆಚ್ಚ, ಶ್ರಮ, ಹೋಲಿಸಬಹುದಾದ ಉತ್ಪನ್ನಗಳು ಮತ್ತು ಬೇಡಿಕೆಯ ಆಧಾರದ ಮೇಲೆ.",

    dashboardEyebrow: "06 — ಕರಕುಶಲಗಾರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    heroCraft: "ನಿಮ್ಮ ಕಲೆ.",
    heroBusiness: "ನಿಮ್ಮ ವ್ಯವಹಾರ.",
    heroDescription: "ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳು, ಮಾರುಕಟ್ಟೆ ಚಟುವಟಿಕೆ ಮತ್ತು TEDKRAFT AI ಸಲಹೆಗಳ ಸರಳ ನೋಟ.",
    addProduct: "+ ಉತ್ಪನ್ನ ಸೇರಿಸಿ",
    verified: "✓ ಪರಿಶೀಲಿಸಿದ ಕರಕುಶಲಗಾರ",

    productsUploaded: "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಉತ್ಪನ್ನಗಳು",
    marketViews: "ಮಾರುಕಟ್ಟೆ ವೀಕ್ಷಣೆಗಳು",
    potentialBuyers: "ಸಂಭಾವ್ಯ ಖರೀದಿದಾರರು",
    estimatedSales: "ಅಂದಾಜು ಮಾರಾಟ",

    highDemand: "ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ ಕಂಡುಬಂದಿದೆ",
    highDemandText: "ಈ ತಿಂಗಳು ಬಿದಿರು ಮನೆ ಅಲಂಕಾರ ಉತ್ಪನ್ನಗಳಿಗೆ ಹೆಚ್ಚಿನ ಆಸಕ್ತಿ ಇದೆ.",
    priceOpportunity: "ಬೆಲೆ ಅವಕಾಶ",
    priceOpportunityText: "ನಿಮ್ಮ ಬಿದಿರು ಬುಟ್ಟಿಗೆ ₹750–₹850 ಬೆಲೆ ಸೂಕ್ತವಾಗಿರಬಹುದು.",
    buyerOpportunity: "ಖರೀದಿದಾರರ ಅವಕಾಶ",
    buyerOpportunityText: "ನಿಮ್ಮ ವರ್ಗದಲ್ಲಿ 8 ಸಂಭಾವ್ಯ ಖರೀದಿದಾರರಿದ್ದಾರೆ.",
    recommendationTitle: "ಹೆಚ್ಚಿನ ಬಿದಿರು ಮನೆ ಅಲಂಕಾರ ಉತ್ಪನ್ನಗಳನ್ನು ತಯಾರಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ.",
    recommendationText: "ಇದೇ ರೀತಿಯ ಉತ್ಪನ್ನಗಳಿಗೆ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹೆಚ್ಚಿನ ಆಸಕ್ತಿ ಇದೆ."
  },

  te: {
    navHome: "హోమ్",
    navProblem: "సమస్య",
    navFeatures: "AI ఫీచర్లు",
    navWorks: "ఎలా పనిచేస్తుంది",
    navMarket: "మార్కెట్ లింకేజ్",
    navDashboard: "డ్యాష్‌బోర్డ్",

    ready: "వృద్ధికి సిద్ధమా?",
    tryTedkraft: "TEDKRAFT ప్రయత్నించండి →",

    eyebrow: "AI ఆధారిత కళాకారుల వాణిజ్యం",
    heroLine1: "మీ కళ.",
    heroLine2: "మీ కథ.",
    heroLine3: "మీ మార్కెట్.",
    heroText: "TEDKRAFT అనేది కళాకారులు తమ సాంప్రదాయ కళను నైపుణ్యంతో కూడిన డిజిటల్ వ్యాపారంగా మార్చడానికి సహాయపడే AI ఆధారిత వర్చువల్ బిజినెస్ మేనేజర్.",
    startCreating: "సృష్టించడం ప్రారంభించండి →",
    exploreProcess: "ప్రక్రియను చూడండి",

    voiceFirst: "వాయిస్ ఫస్ట్",
    aiPhotography: "AI ఫోటోగ్రఫీ",
    multilingual: "బహుభాషా",
    smartPricing: "స్మార్ట్ ధర",

    problemTitle: "సమస్య",
    problemIntro: "చాలా మంది కళాకారులకు అద్భుతమైన నైపుణ్యాలు ఉన్నప్పటికీ డిజిటల్ మార్కెట్‌లోకి ప్రవేశించడంలో సవాళ్లను ఎదుర్కొంటారు.",
    poorPhotography: "తక్కువ నాణ్యత గల ఫోటోలు",
    poorPhotographyText: "ప్రొఫెషనల్ ఇ-కామర్స్ ఫోటోలను సృష్టించడం కళాకారులకు కష్టంగా ఉంటుంది.",
    difficultCataloguing: "కష్టమైన కేటలాగింగ్",
    difficultCataloguingText: "వివరాలు, వర్గాలు మరియు ఉత్పత్తి సమాచారాన్ని తయారు చేయడం సంక్లిష్టంగా ఉంటుంది.",
    languageBarriers: "భాషా అవరోధాలు",
    languageBarriersText: "ప్రాంతీయ భాషా కళాకారులు విస్తృత మార్కెట్‌లను చేరుకోవడంలో ఇబ్బంది పడతారు.",
    pricingUncertainty: "ధరల నిర్ణయంలో అనిశ్చితి",
    pricingUncertaintyText: "మార్కెట్ సమాచారం లేకపోవడం వల్ల ధరల నిర్ణయంలో అనిశ్చితి ఏర్పడుతుంది.",
    limitedMarket: "పరిమిత మార్కెట్ ప్రవేశం",
    limitedMarketText: "ప్రదర్శనలు మరియు దళారులపై ఆధారపడటం వల్ల ఏడాది పొడవునా అవకాశాలు పరిమితమవుతాయి.",
    lowDigital: "తక్కువ డిజిటల్ అవగాహన",
    lowDigitalText: "మొదటిసారి డిజిటల్ అమ్మకాలు చేసేవారికి ప్రస్తుతం ఉన్న ప్లాట్‌ఫారమ్‌లు గందరగోళంగా ఉండవచ్చు.",

    aiTitle: "TEDKRAFT AI",
    aiIntro: "సాంప్రదాయ కళను డిజిటల్ అవకాశంగా మార్చే సరళమైన సాధనాలు.",
    productStudio: "AI ప్రొడక్ట్ స్టూడియో",
    productStudioText: "వెలుగును మెరుగుపరచి, అనవసరమైన నేపథ్యాన్ని తొలగించి, ప్రొఫెషనల్ చిత్రాలను సిద్ధం చేయండి.",
    tryProductStudio: "ప్రొడక్ట్ స్టూడియో ప్రయత్నించండి →",
    voiceCatalogue: "వాయిస్ → కేటలాగ్",
    voiceCatalogueText: "సాధారణంగా మాట్లాడండి, AI ఉత్పత్తి సమాచారాన్ని స్వయంచాలకంగా సేకరిస్తుంది.",
    multilingualAI: "బహుభాషా AI",
    multilingualAIText: "ప్రాంతీయ భాషలు, ఇంగ్లీష్ మరియు హిందీలలో ప్రొఫెషనల్ లిస్టింగ్‌లను సృష్టించండి.",
    fairPrice: "న్యాయమైన ధర సలహాదారు",
    fairPriceText: "ధరను నిర్ణయించే ముందు మెటీరియల్ ఖర్చు, శ్రమ మరియు మార్కెట్ శ్రేణిని అర్థం చేసుకోండి.",
    demand: "డిమాండ్ ఇంటెలిజెన్స్",
    demandText: "మార్కెట్‌లో ఆసక్తి పెరుగుతున్న ఉత్పత్తులు మరియు వర్గాలను కనుగొనండి.",
    buyerMatching: "AI కొనుగోలుదారుల అనుసంధానం",
    buyerMatchingText: "కళాకారులను రిటైలర్లు, హోటళ్ళు, కార్పొరేట్ కొనుగోలుదారులతో అనుసంధానించండి.",

    workflowTitle: "ఇది ఎలా పనిచేస్తుంది",
    workflowIntro: "కళాకారుడి వాయిస్ నుండి డిజిటల్ మార్కెట్ వరకు ఒక సరళమైన ప్రయాణం.",
    speak: "మాట్లాడండి",
    speakText: '"ఇది చేతితో చేసిన వెదురు బుట్ట. దీనికి రెండు రోజులు పట్టింది."',
    aiUnderstands: "AI అర్థం చేసుకుంటుంది",
    catalogue: "కేటలాగ్",

    marketTitle1: "హస్తకళ నుండి",
    marketTitle2: "మార్కెట్ వరకు.",
    marketText: "TEDKRAFT కళాకారులకు సంబంధిత కస్టమర్లు, రిటైలర్లు, హోటళ్ళు మరియు కార్పొరేట్ అవకాశాలను కనుగొనడంలో సహాయపడుతుంది.",
    findBuyers: "కొనుగోలుదారులను వెతకండి →",
    marketLinkage: "✦ మార్కెట్ లింకేజ్",
    artisan: "కళాకారుడు",
    tedkraftAI: "TEDKRAFT AI",
    hotels: "హోటళ్ళు",
    corporate: "కార్పొరేట్",
    retailers: "రిటైలర్లు",

    finalTitle1: "సాంప్రదాయ నైపుణ్యానికి",
    finalTitle2: "ఆధునిక అవకాశం లభించాలి.",
    finalText: "భారతీయ కళాకారుల కోసం AI ఆధారిత డిజిటల్ వాణిజ్యం.",
    finalButton: "TEDKRAFT ప్రయత్నించండి →",

    footerTitle: "TEDKRAFT",
    footerText: "కళాకారుల కోసం AI ఆధారిత మార్కెట్ అనుసంధానం మరియు స్మార్ట్ కేటలాగింగ్",
    sih: "SIH సమస్య వివరణ 26090",

    modalEngine: "TEDKRAFT AI ENGINE",
    createProduct: "మీ ఉత్పత్తిని సృష్టించండి",
    modalDescription: "మీ ఉత్పత్తి గురించి మాట్లాడండి మరియు ఫోటోను అప్‌లోడ్ చేయండి.",

    stepVoice: "దశ 01 — వాయిస్",
    tapSpeak: "మాట్లాడటానికి ట్యాప్ చేయండి",
    listening: "వింటోంది...",
    voiceCaptured: "వాయిస్ రికార్డ్ అయింది",
    voiceLanguages: "తమిళ్ • హిందీ • ఇంగ్లీష్",
    voiceExample: 'ఉదాహరణ: "ఇది చేతితో చేసిన వెదురు బుట్ట..."',

    stepPhoto: "దశ 02 — ఫోటో",
    uploadProduct: "ఉత్పత్తి ఫోటోను అప్‌లోడ్ చేయండి",
    imageTypes: "JPG / PNG",

    generatedCatalogue: "✦ AI సృష్టించిన కేటలాగ్",
    waiting: "వేచి చూస్తోంది",
    homeDecor: "హోమ్ డెకోర్",

    catalogueProduct: "చేతితో నేసిన సహజ వెదురు నిల్వ బుట్ట",
    catalogueDescription: "సాంప్రదాయ నేత పద్ధతులతో తయారు చేసిన చేతిపని వెదురు బుట్ట.",
    material: "మెటీరియల్",
    bamboo: "వెదురు",
    craft: "హస్తకళ",
    handWeaving: "చేతి నేత",
    time: "సమయం",
    twoDays: "2 రోజులు",

    generateCatalogueBtn: "కేటలాగ్ సృష్టించండి",
    fairPriceButton: "₹ న్యాయమైన ధర",
    fairPriceRange: "AI న్యాయమైన ధర శ్రేణి",
    fairPriceExplanation: "మెటీరియల్ ఖర్చు, శ్రమ, పోల్చదగిన ఉత్పత్తులు మరియు డిమాండ్ ఆధారంగా.",

    dashboardEyebrow: "06 — కళాకారుల డ్యాష్‌బోర్డ్",
    heroCraft: "మీ కళ.",
    heroBusiness: "మీ వ్యాపారం.",
    heroDescription: "మీ ఉత్పత్తులు, మార్కెట్ కార్యకలాపాలు మరియు TEDKRAFT AI సిఫార్సుల సరళమైన వీక్షణ.",
    addProduct: "+ ఉత్పత్తిని జోడించండి",
    verified: "✓ ధృవీకరించబడిన కళాకారుడు",

    productsUploaded: "అప్‌లోడ్ చేసిన ఉత్పత్తులు",
    marketViews: "మార్కెట్ వీక్షణలు",
    potentialBuyers: "సంభావ్య కొనుగోలుదారులు",
    estimatedSales: "అంచనా అమ్మకాలు",

    highDemand: "అధిక డిమాండ్ గుర్తించబడింది",
    highDemandText: "ఈ నెలలో వెదురు హోమ్ డెకోర్ ఉత్పత్తులకు ఆసక్తి పెరుగుతోంది.",
    priceOpportunity: "ధర అవకాశం",
    priceOpportunityText: "మీ వెదురు బుట్టకు ₹750–₹850 ధర శ్రేణి తగినది కావచ్చు.",
    buyerOpportunity: "కొనుగోలుదారు అవకాశం",
    buyerOpportunityText: "మీ కేటగిరీలో 8 మంది సంభావ్య కొనుగోలుదారులు ఉన్నారు.",
    recommendationTitle: "మరిన్ని వెదురు హోమ్ డెకోర్ ఉత్పత్తులను సృష్టించడం పరిశీలించండి.",
    recommendationText: "ఇలాంటి ఉత్పత్తులకు మార్కెట్‌లో ఆసక్తి పెరుగుతోంది."
  }
};
