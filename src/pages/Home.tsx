import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Building2,
  Heart,
  Instagram,
  Music,
  Phone,
  Smartphone,
  Users,
} from 'lucide-react';

const images = {
  logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/4f9697d48_WhatsAppImage2025-12-30at135237.jpeg',
  mascotBeer:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/00a917f89_image.png',
  mascotFamily:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/99bce8c5e_image.png',
  negoXuh:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/5c78a184e_image.png',
  nossoSamba:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/8963477e2_image.png',
  inclusivo:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/2333d1cd4_image.png',
  acoesSociais:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/e6940ed5d_image.png',
  familia:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/145624ea6_image.png',
  patrocinio:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/dac3052bd_image.png',
  cotaBlack:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/1b310e11b_image.png',
  cotaDiamante:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/2d97c2787_image.png',
  cotaCenturium:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/cdad545b9_image.png',
  abadas:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/189b65efb_image.png',
  contato:
    'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_695405b194ce4c263b77133d/e7ad6995d_image.png',
};

const sponsors = [
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/3aa10a22f_WhatsAppImage2025-12-30at135028.jpeg',
    alt: 'Pastel Mineiro',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/03b5572e3_WhatsAppImage2025-12-30at1350291.jpg',
    alt: 'Carvão Joinha',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/2834e5403_WhatsAppImage2025-12-30at135030.jpg',
    alt: 'Faria - Farinha de Milho',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/d4f65df02_WhatsAppImage2025-12-30at1350311.jpg',
    alt: 'Faria - Apimentada',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/a8658df64_WhatsAppImage2025-12-30at135031.jpg',
    alt: 'Faria - Apimentada 2',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/8aa536db7_WhatsAppImage2025-12-30at1350321.jpg',
    alt: 'Faria - Tradicional',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/8c106e35d_WhatsAppImage2025-12-30at135032.jpg',
    alt: 'Fubá Faria',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/34ef586d6_WhatsAppImage2025-12-30at135051.jpeg',
    alt: 'Doce de Leite Carapuça',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/b29520d3e_WhatsAppImage2025-12-30at135132.jpg',
    alt: 'Tesouro de Minas',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/b3dd4eb2b_WhatsAppImage2025-12-30at135238.jpeg',
    alt: 'Panificadora Modelo',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/53b6bf028_GPM2.png',
    alt: 'Grupo Pedro Matos',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/01c850a4a_NOVAMARCASOFTCOM_HORIZONTALpdf.png',
    alt: 'Softcom',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/07ecf4795_novolar.png',
    alt: 'Novolar',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/66aa6bfbd_WhatsAppImage2026-01-02at0947361.jpg',
    alt: 'IFG',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/d57480afd_WhatsAppImage2026-01-02at094736.jpeg',
    alt: 'Gelo Ali',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/81d2fb2ad_WhatsAppImage2026-01-02at0947371.jpeg',
    alt: 'Deixa Comigo Express',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/1515aae84_pastoral.png',
    alt: 'Pastoral Familiar',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/743dd0110_WhatsAppImage2026-01-02at094737.jpeg',
    alt: 'Pulo da Alegria',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/99b40c051_WhatsAppImage2026-01-02at102431.jpg',
    alt: 'Flash Mídia',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695407e788e62ca1c15313af/d24fe7978_povilho.png',
    alt: 'Polvilho Azedo 3 Irmãos',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-[#0a0a0a] to-[#0a0a0a]" />

        {/* Floating lizard decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-20">
          <img
            src={images.logo}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-20 left-10 w-24 h-24 opacity-15 rotate-45">
          <img
            src={images.logo}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src={images.logo}
                alt="Bloco dos Calangos"
                className="w-40 h-40 md:w-56 md:h-56 mx-auto lg:mx-0 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
              />

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4">
                <span className="text-lime-400">BLOCO DOS</span>
                <br />
                <span className="text-white">CALANGOS</span>
              </h1>
              <p className="text-xl md:text-2xl text-lime-300 font-medium mb-6">
                🎭🐊 Onde a alegria é tradição e a cultura é compartilhada
              </p>
              <p className="text-gray-400 text-lg max-w-xl mb-8">
                Patrocinar o Bloco dos Calangos é associar sua marca a um evento
                que une
                <span className="text-lime-400 font-semibold">
                  {' '}
                  tradição, família, cultura
                </span>{' '}
                e
                <span className="text-lime-400 font-semibold">
                  {' '}
                  responsabilidade social
                </span>
                .
              </p>
              <a
                href="https://wa.me/5535984070711?text=Olá!%20Gostaria%20de%20informações%20sobre%20patrocínio%20do%20Bloco%20dos%20Calangos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-lime-500 hover:bg-lime-400 text-black font-bold text-lg px-8 py-6"
                >
                  SEJA UM PATROCINADOR
                </Button>
              </a>
            </motion.div>

            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src={images.mascotFamily}
                alt="Mascote Calango"
                className="w-full max-w-md mx-auto drop-shadow-[0_0_80px_rgba(132,204,22,0.3)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-lime-400 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-lime-400 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Users,
                value: '450+',
                label: 'CALANGOS',
                color: 'text-lime-400',
              },
              {
                icon: Users,
                value: '0-100',
                label: 'ANOS',
                sublabel: 'PÚBLICO GERAL',
                color: 'text-green-400',
              },
              {
                icon: Smartphone,
                value: '📲',
                label: 'ALCANCE DIGITAL',
                sublabel: 'Seguidores e Engajamento',
                color: 'text-yellow-400',
              },
              {
                icon: Building2,
                value: '🏛',
                label: 'APOIO OFICIAL',
                sublabel: 'Prefeitura Municipal',
                color: 'text-blue-400',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-center border border-gray-700/50 hover:border-lime-500/50 transition-all duration-300"
              >
                <div
                  className={`text-4xl md:text-5xl font-black ${stat.color} mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-white font-bold text-sm md:text-base">
                  {stat.label}
                </div>
                {stat.sublabel && (
                  <div className="text-gray-400 text-xs mt-1">
                    {stat.sublabel}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sobre o Bloco */}
      <section className="py-20 relative">
        <div className="absolute right-0 top-0 w-48 h-48 opacity-20">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-lime-500 fill-current"
          >
            <path d="M50,10 Q60,25 70,15 Q80,30 90,20 Q85,40 95,50 Q80,55 90,70 Q75,65 80,80 Q60,75 65,90 Q50,80 40,90 Q45,75 30,80 Q35,65 20,70 Q30,55 15,50 Q25,40 15,30 Q30,35 35,20 Q45,30 50,10" />
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-2">
              <span className="text-lime-400">INCLUSIVO</span>
            </h2>
            <h2 className="text-3xl md:text-5xl font-black mb-8 ml-8 md:ml-16">
              <span className="text-white">E EXCLUSIVO</span>
            </h2>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30">
              <div className="flex items-center gap-2 mb-4 text-yellow-400">
                <span>✨</span>
                <span className="font-semibold">SOBRE O BLOCO</span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                O{' '}
                <span className="text-lime-400 font-semibold">
                  Bloco dos Calangos
                </span>{' '}
                é um projeto cultural de carnaval de rua que nasceu com o
                propósito de resgatar a tradição carnavalesca,{' '}
                <span className="text-lime-300">
                  promover lazer seguro para famílias
                </span>{' '}
                e fortalecer os laços comunitários em Pouso Alegre.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Mais do que um bloco, somos um{' '}
                <span className="text-lime-400 font-semibold">
                  movimento cultural popular
                </span>
                , que valoriza a música, a alegria e a convivência entre
                gerações, criando um{' '}
                <span className="text-lime-300">
                  ambiente acolhedor, inclusivo e festivo
                </span>{' '}
                para crianças, jovens, adultos e idosos.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Atrações */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#080808]">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-5xl font-black text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-lime-400">ATRAÇÕES</span>
            <span className="text-white"> MUSICAIS</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="relative overflow-hidden rounded-3xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={images.negoXuh}
                alt="Nego Xuh"
                className="w-full h-80 object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Music className="text-lime-400 w-8 h-8 mb-2" />
                <h3 className="text-3xl font-black text-white">NEGO XUH</h3>
              </div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-3xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={images.nossoSamba}
                alt="Nosso Samba"
                className="w-full h-80 object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Music className="text-lime-400 w-8 h-8 mb-2" />
                <h3 className="text-3xl font-black text-white">NOSSO SAMBA</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ações Sociais */}
      <section className="py-20 relative">
        <div className="absolute left-0 top-20 w-32 h-32 opacity-15">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-lime-500 fill-current rotate-180"
          >
            <path d="M50,10 Q60,25 70,15 Q80,30 90,20 Q85,40 95,50 Q80,55 90,70 Q75,65 80,80 Q60,75 65,90 Q50,80 40,90 Q45,75 30,80 Q35,65 20,70 Q30,55 15,50 Q25,40 15,30 Q30,35 35,20 Q45,30 50,10" />
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-12">
              <span className="text-lime-400">AÇÕES</span>
              <span className="text-white"> SOCIAIS</span>
            </h2>

            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/30">
              <div className="flex items-center gap-2 mb-6 text-purple-400">
                <span>🎭</span>
                <span className="font-semibold">Compromisso Social</span>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                O Bloco dos Calangos mantém uma forte conexão com ações sociais
                e culturais, apoiando e integrando:
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <Heart className="text-lime-400 w-5 h-5" />
                  <span className="text-lime-300 font-semibold">
                    Crianças da Casa São Rafael
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Heart className="text-lime-400 w-5 h-5" />
                  <span className="text-lime-300 font-semibold">
                    Grupo de Capoeira Ginga Minas
                  </span>
                </li>
              </ul>

              <p className="text-gray-300 text-lg leading-relaxed">
                Essas parcerias reforçam nosso compromisso com a{' '}
                <span className="text-lime-400">inclusão social</span>, a
                <span className="text-lime-400"> formação cultural</span> e o{' '}
                <span className="text-lime-400">
                  fortalecimento da comunidade local
                </span>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Família */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#080808]">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={images.familia}
              alt="Família Calangos"
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
                REPRESENTAMOS A <span className="text-lime-400">FAMÍLIA</span>
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl">
                Uma oportunidade única de gerar visibilidade, fortalecer o
                relacionamento com a comunidade local e posicionar sua marca de
                forma positiva em um dos momentos mais simbólicos da cultura
                brasileira: o Carnaval de Rua.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Patrocínio */}
      <section id="patrocinio" className="py-20 relative">
        <div className="absolute right-0 bottom-20 w-40 h-40 opacity-15">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-lime-500 fill-current"
          >
            <path d="M50,10 Q60,25 70,15 Q80,30 90,20 Q85,40 95,50 Q80,55 90,70 Q75,65 80,80 Q60,75 65,90 Q50,80 40,90 Q45,75 30,80 Q35,65 20,70 Q30,55 15,50 Q25,40 15,30 Q30,35 35,20 Q45,30 50,10" />
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lime-400 font-semibold mb-2">✨ OPORTUNIDADE</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              PATROCÍNIO
            </h2>
            <p className="text-gray-400 text-lg">(VAGAS LIMITADAS)</p>
            <div className="inline-block mt-6 bg-lime-500 text-black font-bold px-6 py-3 rounded-full">
              SEJA UM CALANGO OFICIAL ⚠️
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cota Black */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden h-full">
                <CardContent className="p-0">
                  <img
                    src={images.cotaBlack}
                    alt="Cota Black"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            </motion.div>

            {/* Cota Diamante */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-lime-500/50 overflow-hidden h-full ring-2 ring-lime-500/30">
                <CardContent className="p-0">
                  <img
                    src={images.cotaDiamante}
                    alt="Cota Diamante"
                    className="w-full"
                  />
                </CardContent>
              </Card>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-lime-500 text-black font-bold text-sm px-4 py-1 rounded-full">
                POPULAR
              </div>
            </motion.div>

            {/* Cota Centurium */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-yellow-500/50 overflow-hidden h-full">
                <CardContent className="p-0">
                  <img
                    src={images.cotaCenturium}
                    alt="Cota Centurium"
                    className="w-full"
                  />
                </CardContent>
              </Card>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black font-bold text-sm px-4 py-1 rounded-full">
                MASTER
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Abadás e Reservas */}
      <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#080808]">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-center mb-8">
              <span className="text-lime-400">ABADÁS</span>
              <span className="text-white"> PERSONALIZADOS</span>
            </h2>

            <img
              src={images.abadas}
              alt="Abadás Personalizados"
              className="w-full rounded-3xl mb-8"
            />

            {/* Informações de Compra */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-lime-500/30">
              <h3 className="text-2xl font-bold text-lime-400 mb-6 text-center">
                💳 RESERVE SEU ABADÁ
              </h3>

              <div className="space-y-4 text-center">
                <div className="bg-black/30 rounded-xl p-6 border border-lime-500/20">
                  <p className="text-gray-400 mb-2">PIX para Reservas</p>
                  <p className="text-3xl font-bold text-white mb-2">
                    79078915668
                  </p>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText('79078915668');
                      alert('PIX copiado!');
                    }}
                    variant="outline"
                    className="border-lime-500 text-lime-400 hover:bg-lime-500 hover:text-black"
                  >
                    Copiar PIX
                  </Button>
                </div>

                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                  <p className="text-yellow-400 font-semibold">⚠️ IMPORTANTE</p>
                  <p className="text-gray-300 mt-2">
                    Após realizar o pagamento, envie o comprovante pelo WhatsApp
                    para validação
                  </p>
                </div>

                <a
                  href="https://wa.me/5535984070711?text=Olá!%20Acabei%20de%20fazer%20o%20PIX%20para%20reserva%20do%20abadá"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    size="lg"
                    className="w-full bg-green-500 hover:bg-green-400 text-white font-bold"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Enviar Comprovante via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nossos Patrocinadores */}
      <section className="py-20 bg-gradient-to-b from-[#080808] to-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-center mb-4">
              <span className="text-lime-400">NOSSOS</span>
              <span className="text-white"> PARCEIROS E PATROCINADORES</span>
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              Empresas que acreditam e apoiam o Bloco dos Calangos
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-4 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <img
                    src={sponsor.src}
                    alt={sponsor.alt}
                    className="w-full h-32 object-contain"
                  />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="https://wa.me/5535984070711?text=Olá!%20Gostaria%20de%20ser%20um%20patrocinador%20do%20Bloco%20dos%20Calangos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-lime-500 hover:bg-lime-400 text-black font-bold text-lg px-10 py-6"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  SEJA UM PATROCINADOR
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/30">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img src={images.logo} alt="Logo" className="w-32 h-32" />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-gray-400 mb-2">ENTRE EM ✨</p>
                  <h2 className="text-4xl md:text-5xl font-black text-lime-400 mb-6">
                    CONTATO
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <div className="w-10 h-10 bg-lime-500/20 rounded-full flex items-center justify-center">
                        <span className="text-lime-400">👤</span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Founder</p>
                        <p className="text-white font-semibold">
                          Douglas Ravanhani
                        </p>
                      </div>
                    </div>

                    <a
                      href="tel:+5535984070711"
                      className="flex items-center gap-3 justify-center md:justify-start hover:opacity-80 transition-opacity"
                    >
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-white font-semibold">
                        (35) 9 8407-0711
                      </span>
                    </a>

                    <a
                      href="https://instagram.com/blocodoscalangos"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 justify-center md:justify-start hover:opacity-80 transition-opacity"
                    >
                      <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-pink-400" />
                      </div>
                      <span className="text-white font-semibold">
                        @blocodoscalangos
                      </span>
                    </a>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <a
                    href="https://wa.me/5535984070711"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="bg-green-500 hover:bg-green-400 text-white font-bold"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={images.logo} alt="Logo" className="w-12 h-12" />
            <span className="text-xl font-bold text-white">
              Bloco dos Calangos
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Bloco dos Calangos. Todos os direitos reservados. Site criado
            por: Grupo Pedro Matos (35)99969-5213
          </p>
          <p className="text-lime-400 text-sm mt-2">
            🎭🐊 Onde a alegria é tradição e a cultura é compartilhada
          </p>
        </div>
      </footer>
    </div>
  );
}
