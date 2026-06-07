import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const SezioneFinale = () => {
  const { language } = useLanguage();

  const content = {
    it: {
      title: 'Costruiamo un ecosistema,',
      titleHighlight: 'non una promessa.',
      text1: 'Chi entra deve comprendere il progetto.',
      text2: 'Chi cerca soldi facili non è nel posto giusto.',
      cta: 'Voglio capire prima di entrare'
    },
    en: {
      title: "We're building an ecosystem,",
      titleHighlight: 'not a promise.',
      text1: 'Those who join must understand the project.',
      text2: "Those looking for easy money are in the wrong place.",
      cta: 'I want to understand before joining'
    },
    es: {
      title: 'Construimos un ecosistema,',
      titleHighlight: 'no una promesa.',
      text1: 'Quien entra debe comprender el proyecto.',
      text2: 'Quien busca dinero fácil no está en el lugar correcto.',
      cta: 'Quiero entender antes de entrar'
    },
    fr: {
      title: 'Nous construisons un écosystème,',
      titleHighlight: 'pas une promesse.',
      text1: 'Ceux qui rejoignent doivent comprendre le projet.',
      text2: "Ceux qui cherchent l'argent facile ne sont pas au bon endroit.",
      cta: 'Je veux comprendre avant de rejoindre'
    },
    de: {
      title: 'Wir bauen ein Ökosystem,',
      titleHighlight: 'kein Versprechen.',
      text1: 'Wer beitritt, muss das Projekt verstehen.',
      text2: 'Wer schnelles Geld sucht, ist hier falsch.',
      cta: 'Ich möchte verstehen, bevor ich beitrete'
    },
    ru: {
      title: 'Мы строим экосистему,',
      titleHighlight: 'а не обещание.',
      text1: 'Те, кто присоединяется, должны понимать проект.',
      text2: 'Те, кто ищет лёгкие деньги, не в том месте.',
      cta: 'Хочу понять перед вступлением'
    },
    zh: {
      title: '我们正在建设一个生态系统，',
      titleHighlight: '而不是一个承诺。',
      text1: '加入者必须理解这个项目。',
      text2: '寻找轻松赚钱的人来错地方了。',
      cta: '我想在加入之前先了解'
    }
  };

  const t = content[language] || content.en;

  return (
    <section id="sezione-finale" className="py-20 md:py-32 relative" data-testid="sezione-finale-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8">
            <span className="text-white">{t.title}</span>
            <br />
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          
          <div className="glass rounded-2xl p-8 border border-white/10 mb-8">
            <p className="text-slate-300 text-lg mb-4">{t.text1}</p>
            <p className="text-slate-400 text-lg">{t.text2}</p>
          </div>
          
          <motion.a
            href="#cosa-e"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-4 px-8 rounded-full uppercase tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.4)]"
          >
            <BookOpen className="w-5 h-5" />
            {t.cta}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SezioneFinale;
