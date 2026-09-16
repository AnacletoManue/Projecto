import { HealthFacility, SymptomItem, SampleImage } from '../types';

export const ANGOLA_HEALTH_FACILITIES: HealthFacility[] = [
  {
    id: 'hgl-luanda',
    name: 'Hospital Geral de Luanda',
    province: 'Luanda',
    municipality: 'Kilamba Kiaxi',
    address: 'Bairro Palanca, Estrada da Samba / Avenida Deolinda Rodrigues',
    phone: '+244 923 111 200',
    type: 'referencia_infecciosas',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Ala de isolamento e triagem epidemiológica ativa para casos suspeitos de erupções cutâneas agudas.'
  },
  {
    id: 'hab-luanda',
    name: 'Hospital Américo Boavida (HAB)',
    province: 'Luanda',
    municipality: 'Rangel',
    address: 'Avenida Ngola Kiluanje, Rangel, Luanda',
    phone: '+244 924 888 111',
    type: 'referencia_infecciosas',
    hasIsolationUnit: true,
    hasPediatrics: false,
    isOpen24h: true,
    guidanceNote: 'Hospital central de referência universitário com serviço de infectologia e colheita de amostras PCR.'
  },
  {
    id: 'hpd-luanda',
    name: 'Hospital Pediátrico David Bernardino',
    province: 'Luanda',
    municipality: 'Maianga',
    address: 'Rua Amílcar Cabral, Maianga, Luanda',
    phone: '+244 222 322 284',
    type: 'hospital_pediatrico',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Principal unidade de referência pediátrica do país para recém-nascidos, crianças e adolescentes com lesões.'
  },
  {
    id: 'complexo-cardeal-luanda',
    name: 'Complexo Hospitalar Cardeal Dom Alexandre do Nascimento',
    province: 'Luanda',
    municipality: 'Talatona / Camama',
    address: 'Avenida Pedro de Castro Van-Dúnem Loy, Camama, Luanda',
    phone: '+244 930 112 111',
    type: 'hospital_geral',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Infraestrutura de alta tecnologia com unidades de cuidados intensivos e isolamento de alta pressão negativa.'
  },
  {
    id: 'hm-cacuaco',
    name: 'Hospital Municipal de Cacuaco',
    province: 'Luanda',
    municipality: 'Cacuaco',
    address: 'Estrada Nacional Luanda-Kifangondo, Cacuaco',
    phone: '+244 921 555 333',
    type: 'hospital_geral',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Posto de triagem periférico para a zona norte de Luanda e corredor de tráfego interprovincial.'
  },
  {
    id: 'cs-samba',
    name: 'Centro de Saúde da Samba',
    province: 'Luanda',
    municipality: 'Luanda / Samba',
    address: 'Rua Principal da Samba, Bairro da Samba Grande',
    phone: '+244 928 444 999',
    type: 'centro_saude',
    hasIsolationUnit: false,
    hasPediatrics: true,
    isOpen24h: false,
    guidanceNote: 'Atendimento de atenção primária. Realiza triagem inicial e encaminhamento com ambulância para o HGL.'
  },
  {
    id: 'hgb-benguela',
    name: 'Hospital Geral de Benguela',
    province: 'Benguela',
    municipality: 'Benguela',
    address: 'Rua Governador Silva Carvalho, Centro, Benguela',
    phone: '+244 923 881 900',
    type: 'hospital_provincial',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Centro de referência para a província de Benguela com equipa de resposta rápida e isolamento.'
  },
  {
    id: 'hml-lobito',
    name: 'Hospital Municipal do Lobito',
    province: 'Benguela',
    municipality: 'Lobito',
    address: 'Zona Alta, Bairro da Bela Vista, Lobito',
    phone: '+244 926 777 444',
    type: 'hospital_geral',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Vigilância epidemiológica para área portuária e ferroviária do Corredor do Lobito.'
  },
  {
    id: 'hgh-huambo',
    name: 'Hospital Geral do Huambo',
    province: 'Huambo',
    municipality: 'Huambo',
    address: 'Avenida Norton de Matos, Cidade Alta, Huambo',
    phone: '+244 923 661 222',
    type: 'hospital_provincial',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Referência no Planalto Central de Angola com enfermaria de isolamento para doenças de notificação obrigatória.'
  },
  {
    id: 'hgc-cabinda',
    name: 'Hospital Geral de Cabinda',
    province: 'Cabinda',
    municipality: 'Cabinda',
    address: 'Bairro Chiloango, Avenida Duque de Chiazi, Cabinda',
    phone: '+244 923 440 111',
    type: 'referencia_infecciosas',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Zona de fronteira estratégica. Equipa reforçada para triagem de casos transfronteiriços de Mpox.'
  },
  {
    id: 'hgu-uige',
    name: 'Hospital Geral do Uíge',
    province: 'Uíge',
    municipality: 'Uíge',
    address: 'Rua do Comércio, Centro Urbano, Uíge',
    phone: '+244 922 990 888',
    type: 'hospital_provincial',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Vigilância redobrada nas rotas e postos fronteiriços do norte do país com protocolos de testagem rápida.'
  },
  {
    id: 'hgz-zaire',
    name: 'Hospital Geral de Mbanza Kongo',
    province: 'Zaire',
    municipality: 'Mbanza Kongo',
    address: 'Bairro Sagrada Esperança, Mbanza Kongo',
    phone: '+244 923 115 678',
    type: 'hospital_provincial',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Ponto de referência sanitária e quarentena temporária na província do Zaire.'
  },
  {
    id: 'hcl-huila',
    name: 'Hospital Central do Lubango (Dr. António Agostinho Neto)',
    province: 'Huíla',
    municipality: 'Lubango',
    address: 'Avenida 4 de Fevereiro, Lubango',
    phone: '+244 923 554 123',
    type: 'hospital_provincial',
    hasIsolationUnit: true,
    hasPediatrics: true,
    isOpen24h: true,
    guidanceNote: 'Referência do Sul de Angola para doenças infectocontagiosas e assistência médica especializada.'
  }
];

export const SYMPTOM_CHECKLIST: SymptomItem[] = [
  {
    id: 'fever',
    label: 'Febre Súbita (> 38°C)',
    description: 'Temperatura corporal elevada que começou de forma repentina nos últimos dias.',
    category: 'primario',
    weight: 3
  },
  {
    id: 'lymph_nodes',
    label: 'Gânglios / Ínguas Inchados (Linfadenopatia)',
    description: 'Nódulos dolorosos ou inchados no pescoço, debaixo da mandíbula, axilas ou virilha. (Sinal muito característico do Mpox).',
    category: 'primario',
    weight: 4
  },
  {
    id: 'skin_rash',
    label: 'Lesões, Bolhas ou Erupções na Pele',
    description: 'Manchas vermelhas que evoluem para pequenas bolhas com líquido ou pústulas no rosto, mãos, boca, pés ou corpo.',
    category: 'lesao',
    weight: 5
  },
  {
    id: 'intense_headache',
    label: 'Dor de Cabeça Intensa (Cefaleia)',
    description: 'Dor persistente e forte na cabeça, comum nos primeiros dias de infecção.',
    category: 'primario',
    weight: 2
  },
  {
    id: 'muscle_back_pain',
    label: 'Dores Musculares e nas Costas (Mialgia)',
    description: 'Sensação de cansaço profundo, dores articulares e peso na região lombar.',
    category: 'primario',
    weight: 2
  },
  {
    id: 'sore_throat',
    label: 'Dor de Garganta ou Dificuldade ao Engolir',
    description: 'Sensação de queimação na garganta, por vezes acompanhada de pequenas lesões orais.',
    category: 'primario',
    weight: 2
  },
  {
    id: 'direct_contact',
    label: 'Contacto Próximo com Alguém com Lesões',
    description: 'Contacto pele a pele, abraço, partilha de cama, roupas ou toalhas com pessoa com erupção cutânea suspeita.',
    category: 'exposicao',
    weight: 5
  },
  {
    id: 'wild_animal',
    label: 'Manipulação de Caça / Animais Silvestres',
    description: 'Contacto directo ou preparação de carne de caça (bushmeat) crua ou mal cozinhada recentemente.',
    category: 'exposicao',
    weight: 3
  }
];

export const MPOX_FAQS = [
  {
    question: 'O que é a Mpox e como ela se transmite em Angola?',
    answer: 'A Mpox (antigamente chamada de Varíola dos Macacos) é uma infecção viral causada pelo vírus Mpox. Ela se transmite principalmente pelo contacto físico directo e próximo com a pele ou fluidos de alguém infectado, contacto com objetos contaminados (como lençóis, toalhas e roupas não lavadas) e, em menor grau, por gotículas respiratórias expelidas em conversas muito próximas e prolongadas. Também pode ocorrer por contacto com animais silvestres infectados.'
  },
  {
    question: 'A Mpox tem cura? Qual é o tratamento?',
    answer: 'Sim! Na esmagadora maioria das pessoas, a Mpox é autolimitada: o próprio sistema imunitário combate o vírus e a doença desaparece entre 2 a 4 semanas. O tratamento médico foca no alívio dos sintomas (hidratação, analgésicos para a dor, antitérmicos para a febre) e em manter as feridas limpas e protegidas contra infecções bacterianas secundárias.'
  },
  {
    question: 'Como distinguir a Mpox da Varicela (Catapora) ou Alergias?',
    answer: 'Uma das marcas principais da Mpox é o inchaço nítido dos gânglios linfáticos (ínguas dolorosas no pescoço, axilas e virilhas), algo raro na varicela comum. Além disso, as feridas de Mpox costumam evoluir todas juntas no mesmo estágio (mácula -> pápula -> pústula com covinha no centro -> crosta) e atingem com frequência as palmas das mãos e solas dos pés.'
  },
  {
    question: 'O que devo fazer imediatamente se suspeitar de ter a doença?',
    answer: 'Mantenha a calma! Não coce nem rebente as bolhas. Cubra as lesões com roupas leves de manga comprida ou gaze limpa, coloque uma máscara facial, evite contacto físico com pessoas da sua casa e ligue gratuitamente para a Linha 111 (CISP Angola). Caso precise se deslocar ao hospital, avise logo na recepção para ser acolhido em sala de triagem separada.'
  },
  {
    question: 'Posso usar pomadas ou remédios caseiros nas feridas?',
    answer: 'Não aplique cinzas, pós químicos ou substâncias abrasivas nas lesões, pois isso pode causar infecções graves por bactérias e retardar a cicatrização. Lave apenas delicadamente com água morna e sabão neutro e procure orientação médica para pomadas cicatrizantes e anti-sépticas recomendadas pelo Ministério da Saúde.'
  },
  {
    question: 'Existe vacina contra a Mpox?',
    answer: 'Sim, existem vacinas seguras recomendadas pela OMS. O Ministério da Saúde de Angola e a União Africana / Africa CDC estão a coordenar estratégias de vacinação prioritária para profissionais de saúde na linha de frente, contactos directos de casos confirmados e grupos vulneráveis.'
  }
];

export const MPOX_STAGES = [
  {
    dayRange: 'Dias 0 a 5',
    title: 'Fase de Invasão (Pródromos)',
    badge: 'Início',
    description: 'Surgimento repentino de febre alta, cansaço extremo, dores fortes no corpo e nas costas. Surge o inchaço típico dos gânglios (ínguas dolorosas no pescoço e virilha).'
  },
  {
    dayRange: 'Dias 1 a 3 da erupção',
    title: 'Máculas e Pápulas',
    badge: 'Evolução Cutânea',
    description: 'Manchas avermelhadas planas (máculas) que rapidamente se tornam pequenos relevos firmes na pele (pápulas), começando no rosto e espalhando-se para braços, mãos e pés.'
  },
  {
    dayRange: 'Dias 4 a 7 da erupção',
    title: 'Vesículas e Pústulas (Covinha Central)',
    badge: 'Fase Crítica',
    description: 'As lesões enchem-se de líquido transparente (vesículas) e depois turvo/amarelado (pústulas), frequentemente com uma depressão central (umbilicação). Podem doer ou arder.'
  },
  {
    dayRange: 'Dias 7 a 21+',
    title: 'Crostas e Cicatrização',
    badge: 'Recuperação',
    description: 'As pústulas secam, formando crostas escuras. Quando todas as cascas caem naturalmente e revelam pele nova íntegra, a pessoa deixa de transmitir o vírus.'
  }
];

// Reference lesion sample illustrations to allow testing without private photo upload
export const SAMPLE_TEST_CASES: SampleImage[] = [
  {
    id: 'sample-pustule-umbilicated',
    title: 'Amostra Didática: Pústula com Umbilicação Central',
    category: 'Suspeita Mpox',
    description: 'Lesão característica bem delimitada, base eritematosa e pequena depressão central.',
    dataUrl: createSynthesizedLesionDataUrl('mpox')
  },
  {
    id: 'sample-varicella-dewdrop',
    title: 'Amostra Didática: Vesícula Múltipla Dispersa (Varicela)',
    category: 'Diagnóstico Diferencial',
    description: 'Vesículas delicadas e lesões em diferentes estágios de evolução simultânea.',
    dataUrl: createSynthesizedLesionDataUrl('varicella')
  },
  {
    id: 'sample-folliculitis-allergy',
    title: 'Amostra Didática: Foliculite / Picada Inflamatória',
    category: 'Condição Comum',
    description: 'Pápulas superficiais isoladas em torno de folículos pilosos, sem umbilicação.',
    dataUrl: createSynthesizedLesionDataUrl('folliculitis')
  }
];

// Helper to generate clear, clinical schematic SVG data URLs for sample testing
function createSynthesizedLesionDataUrl(type: 'mpox' | 'varicella' | 'folliculitis'): string {
  let svg = '';
  if (type === 'mpox') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="skin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#b87a55" />
          <stop offset="100%" stop-color="#8a5332" />
        </radialGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#cc3333" stop-opacity="0.8" />
          <stop offset="70%" stop-color="#991b1b" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#8a5332" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="pustule" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="60%" stop-color="#eab308" />
          <stop offset="85%" stop-color="#ca8a04" />
          <stop offset="100%" stop-color="#854d0e" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#skin)" />
      <!-- Skin texture dots -->
      <circle cx="90" cy="110" r="2" fill="#744223" opacity="0.4"/>
      <circle cx="310" cy="80" r="1.5" fill="#744223" opacity="0.4"/>
      <circle cx="280" cy="330" r="2" fill="#744223" opacity="0.4"/>
      <!-- Erythematous halo -->
      <circle cx="200" cy="200" r="95" fill="url(#halo)" />
      <!-- Raised pustule body -->
      <circle cx="200" cy="200" r="54" fill="url(#pustule)" stroke="#a16207" stroke-width="2" />
      <!-- Characteristic central umbilication -->
      <ellipse cx="200" cy="200" rx="14" ry="12" fill="#713f12" />
      <ellipse cx="200" cy="200" rx="10" ry="8" fill="#451a03" />
      <circle cx="185" cy="185" r="4" fill="#ffffff" opacity="0.5" />
      <!-- Text label -->
      <rect x="20" y="350" width="360" height="32" rx="6" fill="#0f172a" opacity="0.75" />
      <text x="200" y="371" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="600">
        Lesão de Estudo: Pústula Umbilicada com Halo
      </text>
    </svg>`;
  } else if (type === 'varicella') {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="skin2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#b87a55" />
          <stop offset="100%" stop-color="#8a5332" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#skin2)" />
      <!-- Multiple smaller vesicles at different stages -->
      <!-- Vesicle 1 -->
      <circle cx="160" cy="150" r="30" fill="#dc2626" opacity="0.3" />
      <circle cx="160" cy="150" r="16" fill="#fef9c3" stroke="#eab308" stroke-width="1.5" />
      <circle cx="155" cy="145" r="3" fill="#ffffff" opacity="0.7" />
      <!-- Small papule 2 -->
      <circle cx="260" cy="180" r="22" fill="#ef4444" opacity="0.4" />
      <circle cx="260" cy="180" r="10" fill="#b91c1c" />
      <!-- Crust 3 -->
      <circle cx="190" cy="270" r="18" fill="#451a03" stroke="#292524" stroke-width="2" />
      <!-- Text label -->
      <rect x="20" y="350" width="360" height="32" rx="6" fill="#0f172a" opacity="0.75" />
      <text x="200" y="371" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="600">
        Lesão de Estudo: Erupção Polimórfica Dispersa
      </text>
    </svg>`;
  } else {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <radialGradient id="skin3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#b87a55" />
          <stop offset="100%" stop-color="#8a5332" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#skin3)" />
      <!-- Isolated erythematous papule around hair follicle -->
      <circle cx="200" cy="200" r="45" fill="#f87171" opacity="0.4" />
      <circle cx="200" cy="200" r="18" fill="#ef4444" />
      <circle cx="200" cy="200" r="6" fill="#fef08a" />
      <!-- Hair strand -->
      <path d="M 200 200 Q 220 140 240 100" stroke="#1c1917" stroke-width="2" fill="none" opacity="0.6"/>
      <!-- Text label -->
      <rect x="20" y="350" width="360" height="32" rx="6" fill="#0f172a" opacity="0.75" />
      <text x="200" y="371" fill="#f8fafc" font-size="12" font-family="sans-serif" text-anchor="middle" font-weight="600">
        Lesão de Estudo: Foliculite / Inflamação Isolada
      </text>
    </svg>`;
  }

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
