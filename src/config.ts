export type CountryCode = 'AR' | 'INTL';

export interface PackPriceTier {
  precio: number;
  tachado: number;
  checkout: string;
}

export interface PackConfig {
  id: 1 | 2;
  nombre: string;
  frase: string;
  sello?: string;
  destacado?: boolean;
  imagen: string;
  imagenAlt: string;
  incluye: string[];
  nota: string;
  muestraDefaultTab: 'semillas' | 'bitacora' | 'sentirbien';
  ars: PackPriceTier;
  usd: PackPriceTier;
}

export interface EbookSamplePage {
  id: string;
  pageNumber: number;
  etiqueta: string;
  titulo: string;
  subtitulo: string;
  parrafos: string[];
  destacadoFinal?: string;
}

export interface VideoTestimonialItem {
  id: string;
  contexto: string;
  programa: string;
  titular: string;
  embedUrl: string;
  thumbnailUrl: string;
  duracion: string;
}

export interface WrittenTestimonialItem {
  id: string;
  nombre: string;
  lugar: string;
  titular: string;
  cita: string;
}

export interface AboutGalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  fit: 'cover' | 'contain';
  objectPosition?: string;
  width: number;
  height: number;
}

export interface NaserItem {
  letra: 'N' | 'A' | 'S' | 'R';
  nombre: string;
  linea: string;
}

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export const DEADLINE_ISO = '2026-11-30T23:59:59-03:00';

export function getIsBlackFriday(now: Date = new Date()): boolean {
  return now.getTime() <= new Date(DEADLINE_ISO).getTime();
}

export const CONFIG = {
  // Fecha límite real de Black Friday (hora Argentina UTC-3)
  deadlineISO: DEADLINE_ISO,

  // Meta Pixel
  metaPixelId: '1523403705533348',

  // Garantía real confirmada en Hotmart
  guaranteeDays: 7,

  // Contacto y redes
  whatsappNumber: '5492215570773',
  whatsappPrefill:
    'Hola Alexis, vi la página de Black Friday y tengo una duda sobre los packs.',
  accompanimentWhatsappUrl:
    'https://wa.me/5492215570773?text=Hola%20Alexis%2C%20quiero%20saber%20sobre%20el%20acompa%C3%B1amiento%20con%20sesiones',
  contactEmail: 'modosentir@gmail.com',
  instagramHandle: '@alexiscopello.3p',
  instagramUrl: 'https://www.instagram.com/alexiscopello.3p',

  // Fotos reales de Alexis (WebP comprimidas)
  media: {
    heroCasualPhoto: '/assets/aistudio/alexis-mate.webp',
    heroCasualAlt: 'Alexis Copello tomando mate',
    heroCasualPlaceholder: 'Alexis Copello tomando mate',
    heroWidth: 640,
    heroHeight: 853,
    ogImage: '/src/assets/images/og_share_banner_1794872217052.jpg',
  },

  // Galería editorial de Alexis (WebP comprimidas)
  aboutGallery: [
    {
      id: 'foro-ponencia',
      src: '/assets/aistudio/foro-ponencia.webp',
      alt: 'Alexis Copello exponiendo en el Primer Foro de Paz y Salud Mental de Latinoamérica',
      caption:
        'Ponencia en el 1er Foro de Paz y Salud Mental de Latinoamérica · Querétaro, México',
      fit: 'cover',
      objectPosition: 'object-[center_20%]',
      width: 900,
      height: 1350,
    },
    {
      id: 'foro-mate',
      src: '/assets/aistudio/foro-mate.webp',
      alt: 'Alexis Copello conversando en el escenario con mate y micrófono en el Foro',
      caption: 'En el escenario del Foro, mate en mano, compartiendo en vivo',
      fit: 'cover',
      objectPosition: 'object-[center_22%]',
      width: 900,
      height: 1350,
    },
    {
      id: 'foro-flyer',
      src: '/assets/aistudio/foro-flyer.webp',
      alt: 'Flyer oficial del 1er Foro de Paz y Salud Mental en CEART Querétaro, México, con Alexis Copello entre los ponentes',
      caption:
        'Flyer oficial · 1er Foro de Paz y Salud Mental (CEART, Querétaro, México)',
      fit: 'contain',
      width: 900,
      height: 1200,
    },
    {
      id: 'charla-bn',
      src: '/assets/aistudio/charla-bn.webp',
      alt: 'Alexis Copello hablando con micrófono en un encuentro presencial grupal',
      caption: 'Conversaciones y encuentros presenciales en Latinoamérica',
      fit: 'cover',
      objectPosition: 'object-[center_22%]',
      width: 900,
      height: 1600,
    },
    {
      id: 'taller-pizarra',
      src: '/assets/aistudio/taller-pizarra.webp',
      alt: 'Alexis Copello dictando un taller presencial frente a la pizarra sobre pensamiento y sentimiento',
      caption: 'Taller presencial · Pensamiento y sentimiento',
      fit: 'cover',
      objectPosition: 'object-center',
      width: 900,
      height: 506,
    },
  ] as AboutGalleryItem[],

  // Los 2 packs (precios independientes por moneda, sin conversión automática)
  packs: [
    {
      id: 1,
      nombre: 'Primer Paso',
      frase: 'Algo bueno para leer o escuchar cuando la cabeza no para.',
      imagen: '/assets/aistudio/pack-1.webp',
      imagenAlt:
        'Pack 1 Primer Paso: ebook y audiolibro SentirBIEN y Semillas de Calma',
      incluye: [
        'Ebook y audiolibro SentirBIEN',
        'Semillas de Calma, 21 audios breves',
      ],
      nota: '100% digital · acceso inmediato · sin suscripciones.',
      muestraDefaultTab: 'semillas',
      ars: {
        precio: 17000,
        tachado: 47000,
        checkout:
          'https://pay.hotmart.com/K108529531D?off=6g1x96xq&checkoutMode=10',
      },
      usd: {
        precio: 17,
        tachado: 47,
        checkout: 'https://pay.hotmart.com/O108511066Y?checkoutMode=10',
      },
    },
    {
      id: 2,
      nombre: '21 Días de Claridad',
      frase: 'Que diciembre te encuentre con la cabeza más liviana.',
      sello: 'Mi recomendación',
      destacado: true,
      imagen: '/assets/aistudio/pack-2.webp',
      imagenAlt:
        'Pack 2 21 Días de Claridad: Bitácora NASER, Semillas de Calma, SentirBIEN y curso El Camino de Sentir',
      incluye: [
        'Bitácora NASER, guía de 21 días',
        'Semillas de Calma, 21 audios breves',
        'Ebook y audiolibro SentirBIEN',
        'Curso El Camino de Sentir, en video',
      ],
      nota: '100% digital · acceso inmediato · cada día se sostiene solo.',
      muestraDefaultTab: 'bitacora',
      ars: {
        precio: 37000,
        tachado: 87000,
        checkout: 'https://pay.hotmart.com/Q108521069M?checkoutMode=10',
      },
      usd: {
        precio: 37,
        tachado: 87,
        checkout: 'https://pay.hotmart.com/Y108528402J?checkoutMode=10',
      },
    },
  ] as PackConfig[],

  // Muestras ("Probalo antes de elegir")
  muestras: {
    semillas: {
      tabLabel: 'Semillas de Calma',
      audioSrc: '/assets/aistudio/semilla_01_Notar_b65ad5ff.mp3',
      caption: 'Escuchá el Día 1 completo.',
      placeholderTag: 'Semillas de Calma · Día 1',
    },
    sentirbien: {
      tabLabel: 'SentirBIEN (Ebook + Audio)',
      audioSrc:
        'https://d1yei2z3i6k35z.cloudfront.net/4448676/6a480ddab77818.34290962_SentirBIEN8.mp3',
      audioTitle: 'Audiolibro SentirBIEN · Capítulo de muestra',
      audioSubtitle:
        'Narrado con la propia voz de Alexis Copello. Hacé una pausa, ponete auriculares si podés y simplemente escuchá.',
      audioPlaceholderTag: 'Audiolibro SentirBIEN',
      ebookPages: [
        {
          id: 'page-05',
          pageNumber: 5,
          etiqueta: 'Introducción',
          titulo: 'Antes de empezar, unas palabras para vos',
          subtitulo: 'Páginas reales del ebook oficial SentirBIEN',
          parrafos: [
            'Hola, me llamo Alexis, y voy a acompañarte como guía en un viaje apasionante de transformación interior, que —sin dudas— también impactará tu mundo exterior.',
            'Si estás leyendo SentirBIEN, es probable que hasta ahora hayas vivido el estrés, la ansiedad, la culpa, el miedo, la vergüenza, la inseguridad... como si fueran un problema. Como obstáculos que te impiden avanzar en distintos aspectos de tu vida, ¿no es así?',
            'Tu pareja, tus hijos, el trabajo, las amistades, la intimidad, tus proyectos, anhelos, tu salud... todo está atravesado por la forma en que vivís esas emociones.',
            'Posiblemente ya probaste con distintos abordajes o lecturas para intentar controlar lo que sentís. Algunos tal vez te dieron cierto alivio... pero no fue duradero. Otros, ni siquiera eso.',
            'Si es así, entonces sos como yo hace unos años. Yo también recorrí muchos caminos antes de dar con una mirada que cambió mi manera de vivir por completo.',
          ],
          destacadoFinal:
            'Vamos a mirar las emociones desde un lugar completamente distinto —sí, incluso esas que te incomodan, las que duelen y las que evitarías sentir.',
        },
        {
          id: 'page-32',
          pageNumber: 32,
          etiqueta: 'Anécdota real',
          titulo: 'El episodio del tomógrafo',
          subtitulo: 'Cuando una sola frase activó el sistema de alerta',
          parrafos: [
            'Hace unos años, empecé a tener episodios de vértigo. Acostado, caminando o al levantarme, todo a mi alrededor comenzaba a girar. Sentía mareos, inestabilidad, una especie de vaivén interno que me impedía estar en equilibrio.',
            'Me ordenaron hacer varios estudios, entre ellos, una resonancia de la zona cervical. Cuando lo conté a algunas personas cercanas, me anticiparon lo peor: “Te vas a sentir encerrado, vas a tener claustrofobia, te van a temblar las piernas, te va a faltar el aire...”',
            'No le di demasiada importancia. Llegado el día, me presenté tranquilo para hacerme el estudio. Me recibió una doctora muy amable. Me pidió que dejara todo lo metálico, me hizo algunas preguntas de rutina y me dio un pulsador.',
            '—Si en algún momento te sentís mal, apretás esto y te saco —me dijo.',
          ],
          destacadoFinal:
            'Esa última frase activó mi sistema de alerta. Ya con la bata verde hospital y unas pantuflas que me hacían sentir en mi versión menos sexy posible, caminé hacia el tubo del resonador... (el desenlace sigue en el libro y en el audiolibro).',
        },
      ] as EbookSamplePage[],
    },
    bitacora: {
      tabLabel: 'Bitácora NASER',
      pages: [
        {
          id: 1,
          src: '/assets/aistudio/bitacora_hoja_1_2c90f6ba.png',
          titulo: 'Bitácora NASER · Portada',
          placeholderTag: 'Bitácora NASER · Portada',
        },
        {
          id: 2,
          src: '/assets/aistudio/bitacora_hoja_2_7f5093b8.png',
          titulo: 'Bitácora NASER · Antes de empezar',
          placeholderTag: 'Bitácora NASER · Antes de empezar',
        },
        {
          id: 3,
          src: '/assets/aistudio/bitacora_hoja_3_d63d2454.png',
          titulo: 'Bitácora NASER · Cómo usarla',
          placeholderTag: 'Bitácora NASER · Cómo usarla',
        },
      ],
    },
  },

  // Qué es NASER (versión compacta, una línea corta por letra; nunca método/pasos/técnica/fórmula)
  naser: [
    {
      letra: 'N',
      nombre: 'Notar',
      linea: 'Darte cuenta de que estás pensando, sin enredarte en la historia.',
    },
    {
      letra: 'A',
      nombre: 'Atender',
      linea: 'Mirar lo que sentís como brújula de lo que hoy te está ocupando.',
    },
    {
      letra: 'S',
      nombre: 'Sentir',
      linea: 'Dejar que la emoción esté, sin pelearle ni buscar explicarla.',
    },
    {
      letra: 'R',
      nombre: 'Rendir',
      linea: 'Soltar el intento de forzar calma y dejar que el ruido afloje solo.',
    },
  ] as NaserItem[],

  // Testimonios reales en video (solo los 5 de talleres y mentoría; carga diferida al tocar play)
  testimoniosVideo: [
    {
      id: 'vid-test-1',
      contexto: 'Taller grupal con Alexis',
      programa: 'Participante de Taller Vivencial · RCM Reset Clara Mente',
      titular:
        'Bajar la intensidad de la ansiedad de 8 a 2 en el taller vivencial',
      embedUrl:
        'https://iframe.mediadelivery.net/embed/532986/dca20e18-3afa-4b2b-a20f-9591fd46914a?autoplay=false&loop=false&muted=false&preload=false&responsive=true',
      thumbnailUrl:
        'https://vz-f1630d4d-faf.b-cdn.net/dca20e18-3afa-4b2b-a20f-9591fd46914a/thumbnail.jpg',
      duracion: '2:15 min',
    },
    {
      id: 'vid-test-2',
      contexto: 'Taller grupal con Alexis',
      programa: 'Participante de Taller Vivencial · RCM Reset Clara Mente',
      titular: 'Un balde de agua fresca sin vueltas ni teorías complejas',
      embedUrl:
        'https://iframe.mediadelivery.net/embed/532986/8fca5c8b-dc41-409e-8980-016a69e01f06?autoplay=false&loop=false&muted=false&preload=false&responsive=true',
      thumbnailUrl:
        'https://vz-f1630d4d-faf.b-cdn.net/8fca5c8b-dc41-409e-8980-016a69e01f06/thumbnail_cf7f7b1e.jpg',
      duracion: '1:48 min',
    },
    {
      id: 'vid-test-4',
      contexto: 'Mentoría individual con Alexis',
      programa: 'Participante de Programa de Profundización',
      titular: 'Descubrir en la mentoría que siempre volvemos al equilibrio',
      embedUrl:
        'https://iframe.mediadelivery.net/embed/532986/5d2bf264-0502-4ee2-b847-996ac59b17bf?autoplay=false&loop=false&muted=false&preload=false&responsive=true',
      thumbnailUrl:
        'https://vz-f1630d4d-faf.b-cdn.net/5d2bf264-0502-4ee2-b847-996ac59b17bf/thumbnail_38c63e8d.jpg',
      duracion: '1:52 min',
    },
    {
      id: 'vid-test-5',
      contexto: 'Mentoría individual con Alexis',
      programa: 'Participante de Programa de Profundización',
      titular:
        'Hice decenas de formaciones previas y este espacio tocó otra tecla',
      embedUrl:
        'https://iframe.mediadelivery.net/embed/532986/8e431010-cdb5-45b6-95e7-2ae7231dbc03?autoplay=false&loop=false&muted=false&preload=false&responsive=true',
      thumbnailUrl:
        'https://vz-f1630d4d-faf.b-cdn.net/8e431010-cdb5-45b6-95e7-2ae7231dbc03/thumbnail_d302e221.jpg',
      duracion: '2:30 min',
    },
    {
      id: 'vid-test-6',
      contexto: 'Mentoría individual con Alexis',
      programa: 'Participante de Programa de Profundización',
      titular: 'Cambios concretos en mi día a día al dejar de reaccionar',
      embedUrl:
        'https://iframe.mediadelivery.net/embed/532986/90a83383-29da-423f-8fda-b50cdbe5b526?autoplay=false&loop=false&muted=false&preload=false&responsive=true',
      thumbnailUrl:
        'https://vz-f1630d4d-faf.b-cdn.net/90a83383-29da-423f-8fda-b50cdbe5b526/thumbnail_9d9d6746.jpg',
      duracion: '1:58 min',
    },
  ] as VideoTestimonialItem[],

  // Testimonios escritos reales de lectores de SentirBIEN
  testimoniosEscritos: [
    {
      id: 'w-2',
      nombre: 'Paola',
      lugar: 'Argentina',
      titular: 'No le tenía fe por el precio y la sorpresa fue enorme',
      cita: 'No le tenía mucha fe antes de comprarlo por lo barato que era, pero la sorpresa fue enorme. Corto, didáctico y un baldazo de agua fresca. 100% recomendable.',
    },
    {
      id: 'w-3',
      nombre: 'Luis',
      lugar: 'México',
      titular: 'Ya noto un cambio en cómo vivo la emoción',
      cita: 'Al principio pensé que era un chiste de mal gusto. ¿Qué tiene de bendita la ansiedad si es un horror? Hasta que pude ver lo que viene a decirme y ya noto un cambio profundo en la forma en cómo la vivo.',
    },
    {
      id: 'w-4',
      nombre: 'Victoria',
      lugar: 'México',
      titular: 'Saber que siempre tiendo al equilibrio es tranquilizante',
      cita: 'No puede ser tan simple y tan fresco. Siempre estuvo al alcance de mi mano, y yo ni enterada. Saber que siempre tiendo al equilibrio es algo sumamente tranquilizante y ahora lo veo obvio. Gracias, gracias, gracias.',
    },
    {
      id: 'w-5',
      nombre: 'María Laura',
      lugar: 'Argentina',
      titular: 'He leído miles de libros de autoayuda y esto fue distinto',
      cita: 'Hice cursos, terapias y leí muchísimos libros de gestión emocional. Pero esta comprensión hizo algo que no puedo explicar bien. Me siento muchísimo más liviana y con la cabeza menos acelerada.',
    },
    {
      id: 'w-6',
      nombre: 'Diego',
      lugar: 'Buenos Aires',
      titular: 'Tuve un cambio notable en mi día a día',
      cita: 'Era una persona reactiva que vivía en estado de alerta constante. He logrado cambios que jamás en mi vida imaginé que podía tener con solo comprender de dónde nacía mi reacción.',
    },
  ] as WrittenTestimonialItem[],

  // Preguntas frecuentes (exactamente las 7 preguntas definidas)
  faqs: [
    {
      pregunta: '¿Cómo recibo el material?',
      respuesta:
        'Apenas se confirma el pago, Hotmart te envía el acceso al email. El material digital es tuyo para volver cuando quieras, sin suscripciones ni cobros recurrentes.',
    },
    {
      pregunta: '¿En qué moneda pago?',
      respuesta:
        'Si estás en Argentina, elegí "Argentina" arriba y pagás en pesos al precio que ves aquí. Desde cualquier otro país, elegí "Otros países" y pagás en tu moneda local aunque el precio aquí esté en dólares. Hotmart acepta los medios de pago de tu país.',
    },
    {
      pregunta: '¿Puedo regalar un pack?',
      respuesta:
        'Sí. Al momento de realizar el pago completá con el mail de la persona que querés que lo reciba y le llega directamente, o le reenviás los datos de acceso si preferís que te llegue todo a vos.',
    },
    {
      pregunta: '¿Es terapia?',
      respuesta:
        'No. Es un acompañamiento para mirar de otra manera lo que te pasa. No reemplaza un tratamiento de salud.',
    },
    {
      pregunta: '¿Qué pasa si no me sirve?',
      respuesta:
        'Tenés garantía total de 7 días a través de Hotmart. Si sentís que el material no te aporta o no era lo que buscabas, pedís el reembolso dentro de esos 7 días (o nos escribís a modosentir@gmail.com) y se te devuelve el 100% sin preguntas ni vueltas.',
    },
    {
      pregunta: '¿Necesito experiencia previa?',
      respuesta:
        'No. Está pensado para cualquier persona, sin conocimientos previos.',
    },
    {
      pregunta: '¿Y si ya probé terapia, libros o meditación y nada me dura?',
      respuesta:
        'La mayoría de quienes llegan a estos espacios ya recorrieron muchos caminos. Acá no vas a sumar una tarea más a tu lista: es una invitación a mirar en otra dirección para que puedas soltar la pelea con tu propia cabeza.',
    },
  ] as FaqItem[],
};

export function formatPrice(amount: number, country: CountryCode): string {
  if (country === 'AR') {
    const formatted = amount.toLocaleString('es-AR');
    return `$${formatted}`;
  }
  return `USD ${amount}`;
}

export function getWhatsAppUrl(): string {
  const text = encodeURIComponent(CONFIG.whatsappPrefill);
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}

export function getTaxNotice(country: CountryCode): string {
  return country === 'AR'
    ? 'Pagás en pesos. Hotmart suma las tarifas del medio de pago.'
    : 'Pagás en tu moneda local. Según tu país, Hotmart puede sumar impuestos.';
}
