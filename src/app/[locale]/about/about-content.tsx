import { PageShell } from "@/components/site/PageShell";
import { SectionTabs } from "@/components/site/SectionTabs";
import { LeadershipSection } from "@/components/site/LeadershipSection";
import type { Locale } from "@/lib/i18n";

export function LocalizedAboutContent({ locale }: { locale: Locale }) {
  const isEn = locale === "en";

  return (
    <PageShell
      title={isEn ? "About / Ideology" : "About / Ideology"}
      description={
        isEn
          ? "A clear overview of Yuvva Pariwar Foundation’s introduction, mission/objectives, ideology, and code of conduct."
          : "यहाँ Yuvva Pariwar Foundation का परिचय, उद्देश्य, विचारधारा और फाउंडेशन के नियम/आचार-संहिता का स्पष्ट विवरण दिया गया है।"
      }
    >
      <SectionTabs
        tabs={[
          {
            key: "intro",
            label: isEn ? "Introduction" : "परिचय",
            title: isEn ? "Introduction to Yuvva Pariwar Foundation" : "Yuvva Pariwar Foundation का परिचय",
            body: isEn
              ? "Yuvva Pariwar Foundation is a service-driven social foundation with a clear commitment to timely, dignified support for people in need. We work on the principles of service + discipline—each member contributes with responsibility, transparency, and measurable impact.\n\nOur focus is to build strong local networks and run programs around healthcare, social empowerment, skill development, awareness, and community welfare. The goal is not only to help, but to create sustainable, long-term solutions that strengthen communities."
              : "Yuvva Pariwar Foundation एक सेवा-प्रधान सामाजिक फाउंडेशन है, जिसका उद्देश्य समाज के जरूरतमंद वर्ग तक आवश्यक सेवाएँ समय पर, सम्मान के साथ और पारदर्शी तरीके से पहुँचाना है। हम ‘सेवा + अनुशासन’ के सिद्धांत पर कार्य करते हैं—हर सदस्य जिम्मेदारी, ईमानदारी और सकारात्मक प्रभाव (Impact) के साथ जुड़ता है।\n\nहमारा फोकस स्थानीय स्तर पर मजबूत नेटवर्क बनाकर स्वास्थ्य सहायता, सामाजिक सशक्तिकरण, कौशल-विकास और जागरूकता से जुड़ी पहलों को प्रभावी रूप से आगे बढ़ाना है। फाउंडेशन का लक्ष्य केवल मदद करना नहीं, बल्कि लोगों को आत्मनिर्भर बनाते हुए दीर्घकालिक समाधान (Sustainable Solutions) तैयार करना है।",
          },
          {
            key: "mission",
            label: isEn ? "Objectives" : "उद्देश्य",
            title: isEn ? "Objectives and Core Focus Areas" : "उद्देश्य और मुख्य कार्य-क्षेत्र",
            body: isEn
              ? "Our mission is to serve with compassion and contribute to national progress by bridging gaps in essential services through focused initiatives:\n\n• Healthcare: medical help in rural/remote areas, awareness drives, and special programs for women and children.\n• Social empowerment: support for underprivileged communities and sustainable women empowerment activities.\n• Specialized care: dedicated support for disability care and malnutrition relief.\n• Skill development: vocational training (including nursing/paramedical) and career-oriented guidance.\n• Environment: plantation drives, cleanliness initiatives, and green/solar energy awareness.\n• Community & animal welfare: community development and holistic care for livestock/animals.\n\nWe aim to run each activity with clear documentation, transparency, and accountability so the right support reaches the right people."
              : "हमारा उद्देश्य सेवा, संवेदनशीलता और राष्ट्रीय प्रगति की भावना के साथ समाज में वास्तविक बदलाव लाना है। फाउंडेशन निम्न प्रमुख क्षेत्रों में कार्य करता है:\n\n• स्वास्थ्य सेवा (Healthcare): ग्रामीण/दूरस्थ क्षेत्रों में चिकित्सा सहायता, स्वास्थ्य जागरूकता, महिलाओं एवं बच्चों के लिए विशेष स्वास्थ्य पहल।\n• सामाजिक सशक्तिकरण (Social Empowerment): जरूरतमंद समुदायों का सहयोग, महिलाओं के लिए आत्मनिर्भरता व टिकाऊ गतिविधियाँ।\n• विशेष सहायता (Specialized Care): दिव्यांग सहायता, कुपोषण राहत और आवश्यक सपोर्ट सिस्टम।\n• कौशल-विकास (Skill Development): नर्सिंग/पैरामेडिकल सहित व्यावसायिक प्रशिक्षण और रोजगारोन्मुख मार्गदर्शन।\n• पर्यावरण संरक्षण (Environment): वृक्षारोपण, स्वच्छता, और हरित/सौर ऊर्जा जैसी पहलें।\n• सामुदायिक व पशु-कल्याण (Community & Animal Welfare): समुदाय विकास, पशुधन एवं पशु-सेवा के लिए जागरूकता व सहयोग।\n\nहम हर कार्यक्रम को जिम्मेदारी, दस्तावेज़ीकरण और पारदर्शिता के साथ संचालित करने का प्रयास करते हैं—ताकि सहायता सही व्यक्ति तक पहुँचे और विश्वास बना रहे।",
          },
          {
            key: "rules",
            label: isEn ? "Rules" : "नियम",
            title: isEn ? "Foundation Rules / Code of Conduct" : "फाउंडेशन के नियम / आचार-संहिता",
            body: isEn
              ? "Every member/volunteer is expected to follow these standards:\n\n• Service with discipline: work should be timely, responsible, and process-driven.\n• Respect and equality: no discrimination based on caste, religion, gender, or background.\n• Transparency: no false claims or misleading representation of donations, achievements, or activities.\n• Privacy: do not publish personal data (phone, address, documents) of members/beneficiaries without consent.\n• Professional behavior: maintain respectful communication in programs, meetings, and on social media.\n• Disciplinary action: violations or actions harming the foundation’s credibility can lead to removal of membership/support.\n\nBy joining the foundation, we all share responsibility to protect the dignity of the organization and its service mission."
              : "फाउंडेशन का प्रत्येक सदस्य और कार्यकर्ता निम्न नियमों का पालन करेगा:\n\n• सेवा-भावना और अनुशासन: हर कार्य समयबद्ध, जिम्मेदार और नियमों के अनुरूप हो।\n• सम्मान और समानता: किसी भी व्यक्ति के साथ जाति/धर्म/लिंग/वर्ग के आधार पर भेदभाव नहीं किया जाएगा।\n• पारदर्शिता: योगदान/सहायता/कार्यक्रम से जुड़ी जानकारी स्पष्ट और सत्य हो—गलत दावा या गलत प्रस्तुति निषिद्ध है।\n• गोपनीयता: सदस्यों/लाभार्थियों की व्यक्तिगत जानकारी (मोबाइल, पता, दस्तावेज़) को बिना अनुमति सार्वजनिक नहीं किया जाएगा।\n• शिष्ट व्यवहार: सोशल मीडिया/कार्यक्रम/मीटिंग में मर्यादित भाषा और सभ्य व्यवहार अनिवार्य है।\n• अनुशासनात्मक कार्रवाई: नियम उल्लंघन, गलत जानकारी, या फाउंडेशन की छवि को नुकसान पहुँचाने वाली गतिविधि पर सदस्यता/सहयोग समाप्त किया जा सकता है।\n\nयदि आप फाउंडेशन से जुड़ते हैं, तो इन नियमों के साथ संस्था की गरिमा और सेवा-उद्देश्य की रक्षा करना हमारी साझा जिम्मेदारी है।",
          },
        ]}
      />

      <div className="mt-12 bg-zinc-50 py-10 md:py-14 rounded-3xl mb-12">
        <LeadershipSection
          title={isEn ? "Leadership Team" : "नेतृत्व"}
          subtitle={isEn ? "Foundation pillars guiding the mission and execution." : "फाउंडेशन के स्तंभ जो मिशन का मार्गदर्शन करते हैं।"}
        />
      </div>
    </PageShell>
  );
}

