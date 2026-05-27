/* =========================================================
   Arquivo Hermético - JavaScript puro
   Funcionalidades:
   - Menu responsivo
   - Voltar ao topo
   - Tema claro/escuro com localStorage
   - Busca interna
   - Cards expansíveis
   - Linha do tempo interativa
   - Galeria filtrável
   - Animações suaves ao rolar
   ========================================================= */

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const commonsFile = (fileName) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;

const escapeHtml = (text = "") =>
  String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const symbols = [
  {
    title: "Caduceu",
    origin: "Greco-romano; recepção hermética",
    type: "Mediação e linguagem",
    image: commonsFile("Caduceus.svg"),
    alt: "Símbolo do caduceu com duas serpentes e asas",
    text: "O caduceu está ligado a Hermes/Mercúrio como mensageiro, mediador e condutor entre planos. Em leituras herméticas posteriores, passou a sugerir equilíbrio, circulação e união de forças opostas.",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Caduceus.svg"
  },
  {
    title: "Olho de Hórus",
    origin: "Egito Antigo; amuletos e iconografia",
    type: "Proteção e integridade",
    image: commonsFile("Eye_Horus_Louvre_Sb3566.jpg"),
    alt: "Amuleto antigo em forma de Olho de Hórus",
    text: "Também chamado de olho udjat, aparece como símbolo de proteção, restauração e integridade. Deve ser entendido dentro de contextos religiosos e funerários egípcios, não como objeto decorativo sem história.",
    source: "Wikimedia Commons / Louvre",
    license: "Ver licença na fonte",
    link: "https://commons.wikimedia.org/wiki/File:Eye_Horus_Louvre_Sb3566.jpg"
  },
  {
    title: "Ankh",
    origin: "Egito Antigo",
    type: "Vida e continuidade",
    image: commonsFile("Ankh.svg"),
    alt: "Símbolo egípcio ankh em traço simples",
    text: "O ankh é frequentemente interpretado como sinal de vida. Em arte egípcia, aparece nas mãos de divindades e em cenas rituais, ligado à vitalidade e à continuidade.",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Ankh.svg"
  },
  {
    title: "Ouroboros",
    origin: "Antiguidade tardia e manuscritos alquímicos",
    type: "Ciclo e totalidade",
    image: commonsFile("Serpiente_alquimica.jpg"),
    alt: "Ouroboros alquímico de manuscrito antigo",
    text: "A serpente que morde a própria cauda simboliza ciclo, retorno, continuidade e unidade. Na alquimia, pode aparecer como imagem de transformação e de fechamento do processo.",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Serpiente_alquimica.jpg"
  },
  {
    title: "Sol e Lua",
    origin: "Alquimia, astrologia e arte sacra",
    type: "Polaridade simbólica",
    image: commonsFile("Symbolic_picture_in_alchemical_text_showing_crowned_man_standing_on_sun_and_crowned_woman_standing_on_moon_joining_flowers_with_descending_dove,_which_represents_marriage_and_the_union_of_LCCN92517537.jpg"),
    alt: "Gravura alquímica mostrando figuras associadas ao Sol e à Lua",
    text: "Sol e Lua foram lidos como imagens de polaridade, ritmo, união e complementaridade. O sentido varia: pode ser cosmológico, astrológico, alquímico ou devocional.",
    source: "Library of Congress / Wikimedia Commons",
    license: "Ver licença na fonte",
    link: "https://commons.wikimedia.org/wiki/File:Symbolic_picture_in_alchemical_text_showing_crowned_man_standing_on_sun_and_crowned_woman_standing_on_moon_joining_flowers_with_descending_dove,_which_represents_marriage_and_the_union_of_LCCN92517537.jpg"
  },
  {
    title: "Pentagrama histórico",
    origin: "Geometria e tradições simbólicas antigas",
    type: "Proporção e proteção",
    image: commonsFile("Pentagram.svg"),
    alt: "Pentagrama geométrico de cinco pontas",
    text: "O pentagrama possui longa história em matemática, arte, religião e esoterismo. Evite reduzir o símbolo a leituras modernas únicas: o significado depende do contexto cultural.",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Pentagram.svg"
  },
  {
    title: "Árvore da Vida hermética",
    origin: "Cabala e recepção esotérica ocidental",
    type: "Mapa simbólico",
    image: commonsFile("Kabbalistic_Tree_of_Life_(Sephiroth)_2.svg"),
    alt: "Diagrama da Árvore da Vida com sefirot e caminhos",
    text: "Na Cabala e em tradições herméticas posteriores, a Árvore da Vida foi usada como diagrama de emanação, linguagem simbólica e mapa contemplativo. Há diferenças importantes entre usos judaicos e usos esotéricos ocidentais.",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Kabbalistic_Tree_of_Life_(Sephiroth)_2.svg"
  },
  {
    title: "Esfera armilar",
    origin: "Astronomia antiga e medieval",
    type: "Cosmos e movimento",
    image: commonsFile("Armillary_sphere.png"),
    alt: "Ilustração de uma esfera armilar antiga",
    text: "A esfera armilar representa círculos celestes e modelos de movimento astronômico. Ela aparece na história da astronomia, da navegação e da imaginação cosmológica.",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Armillary_sphere.png"
  },
  {
    title: "Tábua de Esmeralda",
    origin: "Tradição hermético-alquímica medieval",
    type: "Texto e recepção",
    image: commonsFile("Emerald_tablet.jpg"),
    alt: "Imagem histórica associada à Tábua de Esmeralda",
    text: "A Tábua de Esmeralda é um texto breve de grande recepção alquímica. Suas origens são discutidas, e leituras modernas devem distinguir tradição lendária de evidência histórica.",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Emerald_tablet.jpg"
  }
];

const timeline = [
  {
    period: "Egito Antigo",
    date: "c. 3000–332 a.C.",
    title: "Escrita, templo e ordem",
    image: commonsFile("The_Temple_of_Dendur_MET_LC-68_154_EGDP025607.jpg"),
    alt: "Templo egípcio de Dendur preservado no Metropolitan Museum of Art",
    text: "O Egito Antigo desenvolveu sistemas religiosos, administrativos e artísticos de longa duração. A escrita, os rituais e os monumentos expressavam relações entre poder, memória, divindade, morte e continuidade.",
    source: "The Met / Wikimedia Commons",
    link: "https://commons.wikimedia.org/wiki/File:The_Temple_of_Dendur_MET_LC-68_154_EGDP025607.jpg"
  },
  {
    period: "Grécia Antiga",
    date: "c. séc. VI–IV a.C.",
    title: "Filosofia, número e cosmos",
    image: commonsFile("Plato_Silanion_Musei_Capitolini_MC1377.jpg"),
    alt: "Busto de Platão em museu",
    text: "Platão, tradições pitagóricas e outras escolas antigas contribuíram para temas que seriam reinterpretados por correntes posteriores: alma, harmonia, número, contemplação e vida filosófica.",
    source: "Wikimedia Commons",
    link: "https://commons.wikimedia.org/wiki/File:Plato_Silanion_Musei_Capitolini_MC1377.jpg"
  },
  {
    period: "Período Helenístico",
    date: "323–30 a.C.",
    title: "Encontros culturais",
    image: commonsFile("Hermes_mercurius_trismegistus_siena_cathedral.jpg"),
    alt: "Imagem de Hermes Trismegisto no pavimento de Siena",
    text: "Após Alexandre, o Mediterrâneo oriental se tornou um espaço de intensa circulação cultural. Nessa atmosfera, deuses, línguas e ideias foram aproximados, reinterpretados e traduzidos.",
    source: "Wikimedia Commons",
    link: "https://commons.wikimedia.org/wiki/File:Hermes_mercurius_trismegistus_siena_cathedral.jpg"
  },
  {
    period: "Alexandria",
    date: "séc. III a.C.–séc. IV d.C.",
    title: "Bibliotecas, escolas e traduções",
    image: commonsFile("Papyrus_inscribed_with_an_account_and_a_religious_text_MET_22.3.528_3195.jpg"),
    alt: "Fragmento de papiro egípcio com escrita antiga",
    text: "Alexandria simboliza a combinação de erudição, tradução, filosofia, ciência antiga e diversidade religiosa. Nem todo texto hermético vem de Alexandria, mas a cidade representa bem o ambiente cultural da época.",
    source: "The Met / Wikimedia Commons",
    link: "https://www.metmuseum.org/art/collection/search/545456"
  },
  {
    period: "Textos herméticos",
    date: "séc. I–III d.C. e tradições posteriores",
    title: "Corpus, Asclepius e hermética técnica",
    image: commonsFile("Emerald_tablet.jpg"),
    alt: "Imagem associada à Tábua de Esmeralda",
    text: "Os textos atribuídos a Hermes Trismegisto incluem tratados filosófico-religiosos e materiais técnicos sobre astrologia, alquimia e magia. A autoria é tradicional, não biográfica no sentido moderno.",
    source: "Wikimedia Commons",
    link: "https://commons.wikimedia.org/wiki/File:Emerald_tablet.jpg"
  },
  {
    period: "Idade Média",
    date: "séc. VIII–XV",
    title: "Transmissão árabe e latina",
    image: commonsFile("Serpiente_alquimica.jpg"),
    alt: "Ouroboros em manuscrito alquímico",
    text: "A alquimia, a astrologia e textos filosóficos circularam por línguas e culturas diversas. Muitas ideias antigas chegaram ao Ocidente latino por traduções e adaptações medievais.",
    source: "Wikimedia Commons",
    link: "https://commons.wikimedia.org/wiki/File:Serpiente_alquimica.jpg"
  },
  {
    period: "Renascimento",
    date: "séc. XV–XVI",
    title: "Redescoberta e recepção",
    image: commonsFile("Siena.Duomo.floor01.jpg"),
    alt: "Mosaico de Hermes Trismegisto no piso da Catedral de Siena",
    text: "Humanistas renascentistas leram textos herméticos como testemunhos de sabedoria muito antiga. Depois, a crítica histórica passou a situá-los de forma mais tardia.",
    source: "Wikimedia Commons",
    link: "https://commons.wikimedia.org/wiki/File:Siena.Duomo.floor01.jpg"
  },
  {
    period: "Ocultismo moderno",
    date: "séc. XIX–XX",
    title: "Releituras esotéricas",
    image: commonsFile("Kabbalistic_Tree_of_Life_(Sephiroth)_2.svg"),
    alt: "Árvore da Vida em diagrama esotérico",
    text: "Ordens, autores e movimentos modernos reorganizaram temas herméticos, cabalísticos, astrológicos e alquímicos. Essa recepção é histórica, mas não deve ser confundida com as fontes antigas originais.",
    source: "Wikimedia Commons",
    link: "https://commons.wikimedia.org/wiki/File:Kabbalistic_Tree_of_Life_(Sephiroth)_2.svg"
  }
];

const gallery = [
  {
    title: "Hermes Trismegisto, Catedral de Siena",
    category: "Símbolos",
    image: commonsFile("Hermes_mercurius_trismegistus_siena_cathedral.jpg"),
    alt: "Hermes Trismegisto em pavimento da Catedral de Siena",
    author: "Autor desconhecido",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Hermes_mercurius_trismegistus_siena_cathedral.jpg"
  },
  {
    title: "Templo de Dendur",
    category: "Templos",
    image: commonsFile("The_Temple_of_Dendur_MET_LC-68_154_EGDP025607.jpg"),
    alt: "Templo de Dendur exposto no Metropolitan Museum of Art",
    author: "The Metropolitan Museum of Art",
    source: "The Met / Wikimedia Commons",
    license: "CC0 / domínio público",
    link: "https://commons.wikimedia.org/wiki/File:The_Temple_of_Dendur_MET_LC-68_154_EGDP025607.jpg"
  },
  {
    title: "Desenho do Templo de Dendur, Henry Salt",
    category: "Egito",
    image: commonsFile("Temple_of_dendur_drawing_by_henry_salt.jpg"),
    alt: "Desenho antigo do Templo de Dendur",
    author: "Henry Salt",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Temple_of_dendur_drawing_by_henry_salt.jpg"
  },
  {
    title: "Alquimista em seu laboratório",
    category: "Alquimia",
    image: commonsFile("An_alchemist_in_his_laboratory._Wellcome_L0051290.jpg"),
    alt: "Alquimista trabalhando em laboratório antigo",
    author: "Wellcome Collection",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:An_alchemist_in_his_laboratory._Wellcome_L0051290.jpg"
  },
  {
    title: "Ouroboros de manuscrito alquímico",
    category: "Alquimia",
    image: commonsFile("Serpiente_alquimica.jpg"),
    alt: "Ouroboros desenhado em manuscrito alquímico",
    author: "Theodoros Pelecanos, atribuído",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Serpiente_alquimica.jpg"
  },
  {
    title: "Chrysopoeia de Cleópatra",
    category: "Manuscritos",
    image: commonsFile("Chrysopoea_of_Cleopatra_1.png"),
    alt: "Ilustração alquímica com ouroboros e inscrições gregas",
    author: "Manuscrito alquímico grego",
    source: "Wikimedia Commons",
    license: "Ver página da fonte",
    link: "https://commons.wikimedia.org/wiki/File:Chrysopoea_of_Cleopatra_1.png"
  },
  {
    title: "Amuleto com Olho de Hórus",
    category: "Egito",
    image: commonsFile("Eye_Horus_Louvre_Sb3566.jpg"),
    alt: "Amuleto em forma de Olho de Hórus",
    author: "Desconhecido; fotografia de Jastrow",
    source: "Wikimedia Commons / Louvre",
    license: "Ver página da fonte",
    link: "https://commons.wikimedia.org/wiki/File:Eye_Horus_Louvre_Sb3566.jpg"
  },
  {
    title: "Signos do zodíaco, manuscrito do século XIII",
    category: "Astrologia",
    image: commonsFile("Zodiac_signs,_XIII_century_MS._Wellcome_M0009344.jpg"),
    alt: "Signos zodiacais em manuscrito antigo",
    author: "Wellcome Collection",
    source: "Wikimedia Commons",
    license: "CC BY 4.0",
    link: "https://commons.wikimedia.org/wiki/File:Zodiac_signs,_XIII_century_MS._Wellcome_M0009344.jpg"
  },
  {
    title: "Esfera armilar",
    category: "Astrologia",
    image: commonsFile("Armillary_sphere.png"),
    alt: "Ilustração antiga de esfera armilar",
    author: "Looxix / Encyclopédie",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Armillary_sphere.png"
  },
  {
    title: "Pentagrama geométrico",
    category: "Símbolos",
    image: commonsFile("Pentagram.svg"),
    alt: "Pentagrama geométrico simples",
    author: "Heptagon",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Pentagram.svg"
  },
  {
    title: "Árvore da Vida",
    category: "Símbolos",
    image: commonsFile("Kabbalistic_Tree_of_Life_(Sephiroth)_2.svg"),
    alt: "Diagrama da Árvore da Vida",
    author: "AnonMoos",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Kabbalistic_Tree_of_Life_(Sephiroth)_2.svg"
  },
  {
    title: "Tábua de Esmeralda",
    category: "Manuscritos",
    image: commonsFile("Emerald_tablet.jpg"),
    alt: "Imagem histórica associada à Tábua de Esmeralda",
    author: "Fonte histórica reproduzida",
    source: "Wikimedia Commons",
    license: "Domínio público",
    link: "https://commons.wikimedia.org/wiki/File:Emerald_tablet.jpg"
  }
];

const sources = [
  {
    group: "Fontes de texto",
    items: [
      {
        name: "Encyclopaedia Britannica — Hermetism",
        description: "Resumo histórico sobre hermetismo, textos atribuídos a Hermes Trismegisto e contexto greco-egípcio.",
        link: "https://www.britannica.com/topic/Hermetism"
      },
      {
        name: "Encyclopaedia Britannica — Hermes Trismegistus",
        description: "Referência sobre Hermes Trismegisto, Thoth e escritos herméticos.",
        link: "https://www.britannica.com/topic/Hermes-Trismegistos-Egyptian-god"
      },
      {
        name: "Stanford Encyclopedia of Philosophy — Plato",
        description: "Referência acadêmica para filosofia grega e leitura histórica de Platão.",
        link: "https://plato.stanford.edu/entries/plato/"
      },
      {
        name: "Stanford Encyclopedia of Philosophy — Pythagoreanism",
        description: "Referência acadêmica para pitagorismo, vida filosófica e tradição antiga.",
        link: "https://plato.stanford.edu/entries/pythagoreanism/"
      }
    ]
  },
  {
    group: "Fontes de imagens",
    items: [
      {
        name: "Wikimedia Commons",
        description: "Acervo colaborativo de imagens livres; sempre verificar autoria e licença na página de cada arquivo.",
        link: "https://commons.wikimedia.org/"
      },
      {
        name: "The Metropolitan Museum of Art — Open Access",
        description: "Imagens e dados de obras em domínio público disponíveis sob CC0.",
        link: "https://www.metmuseum.org/hubs/open-access"
      },
      {
        name: "British Museum Collection",
        description: "Base de objetos museológicos para pesquisa histórica e iconográfica.",
        link: "https://www.britishmuseum.org/collection"
      },
      {
        name: "Wellcome Collection",
        description: "Acervo de história da medicina, alquimia, manuscritos, imagens e cultura visual.",
        link: "https://wellcomecollection.org/"
      }
    ]
  },
  {
    group: "Bibliotecas digitais",
    items: [
      {
        name: "Internet Archive",
        description: "Livros digitalizados e obras em domínio público, útil para edições antigas e pesquisa histórica.",
        link: "https://archive.org/"
      },
      {
        name: "Project Gutenberg",
        description: "Biblioteca de textos em domínio público, especialmente útil para traduções antigas.",
        link: "https://www.gutenberg.org/"
      },
      {
        name: "Perseus Digital Library",
        description: "Textos clássicos gregos e latinos, traduções e ferramentas de pesquisa filológica.",
        link: "https://www.perseus.tufts.edu/hopper/"
      },
      {
        name: "Library of Congress",
        description: "Acervo público dos Estados Unidos com manuscritos, gravuras, fotografias e livros.",
        link: "https://www.loc.gov/"
      }
    ]
  },
  {
    group: "Museus e acervos públicos",
    items: [
      {
        name: "Europeana",
        description: "Portal europeu de patrimônio cultural, museus, bibliotecas e arquivos.",
        link: "https://www.europeana.eu/"
      },
      {
        name: "Public Domain Review",
        description: "Ensaios e coleções de obras históricas em domínio público.",
        link: "https://publicdomainreview.org/"
      },
      {
        name: "World History Encyclopedia",
        description: "Artigos educativos sobre história antiga, cultura material e religiões do mundo antigo.",
        link: "https://www.worldhistory.org/"
      },
      {
        name: "Sacred Texts Archive",
        description: "Arquivo histórico de textos religiosos e esotéricos; verificar edição, tradução e contexto.",
        link: "https://sacred-texts.com/"
      }
    ]
  }
];

function setupMenu() {
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  $$("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupTheme() {
  const themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("arquivoHermeticoTheme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = savedTheme || (prefersLight ? "light" : "dark");

  document.body.dataset.theme = initialTheme;
  updateThemeIcon(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = nextTheme;
    localStorage.setItem("arquivoHermeticoTheme", nextTheme);
    updateThemeIcon(nextTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = $("#themeToggle span");
  if (icon) icon.textContent = theme === "dark" ? "☾" : "☀";
}

function setupBackToTop() {
  const button = $("#backToTop");
  if (!button) return;

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 640);
  }, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupRevealAnimation() {
  const elements = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((el) => observer.observe(el));
}

function setupExpandableCards() {
  $$(".expandable").forEach((card) => {
    const button = $(".read-more", card);
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = card.classList.toggle("open");
      button.textContent = isOpen ? "Ler menos" : "Ler mais";
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function renderSymbols() {
  const container = $("#symbolsGrid");
  if (!container) return;

  container.innerHTML = symbols.map((symbol) => `
    <article class="symbol-card reveal searchable" data-title="${escapeHtml(symbol.title)} ${escapeHtml(symbol.origin)} ${escapeHtml(symbol.type)}">
      <img loading="lazy" src="${symbol.image}" alt="${escapeHtml(symbol.alt)}">
      <div class="symbol-card-body">
        <span class="tag">${escapeHtml(symbol.type)}</span>
        <h3>${escapeHtml(symbol.title)}</h3>
        <div class="symbol-meta">
          <span>${escapeHtml(symbol.origin)}</span>
          <span>${escapeHtml(symbol.license)}</span>
        </div>
        <p>${escapeHtml(symbol.text)}</p>
        <p class="card-credit">
          Fonte: ${escapeHtml(symbol.source)}.
          <a href="${symbol.link}" target="_blank" rel="noopener">Abrir fonte</a>
        </p>
      </div>
    </article>
  `).join("");
}

function renderTimeline() {
  const list = $("#timelineList");
  const panel = $("#timelinePanel");
  if (!list || !panel) return;

  const renderPanel = (index) => {
    const item = timeline[index];
    panel.innerHTML = `
      <img loading="lazy" src="${item.image}" alt="${escapeHtml(item.alt)}">
      <div class="timeline-panel-content searchable" data-title="${escapeHtml(item.period)} ${escapeHtml(item.title)}">
        <span class="tag">${escapeHtml(item.date)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p><strong>${escapeHtml(item.period)}</strong></p>
        <p>${escapeHtml(item.text)}</p>
        <p class="card-credit">
          Fonte: ${escapeHtml(item.source)}.
          <a href="${item.link}" target="_blank" rel="noopener">Abrir fonte</a>
        </p>
      </div>
    `;
  };

  list.innerHTML = timeline.map((item, index) => `
    <button class="timeline-item ${index === 0 ? "active" : ""}" type="button" role="option" aria-selected="${index === 0}" data-index="${index}">
      <span>${escapeHtml(item.date)}</span>
      ${escapeHtml(item.period)}
    </button>
  `).join("");

  renderPanel(0);

  $$(".timeline-item", list).forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      $$(".timeline-item", list).forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");
      renderPanel(index);
      setupSearch();
    });
  });
}

function renderGallery(activeCategory = "Todos") {
  const grid = $("#galleryGrid");
  if (!grid) return;

  const filtered = activeCategory === "Todos"
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  grid.innerHTML = filtered.map((item) => `
    <article class="gallery-card reveal searchable" data-title="${escapeHtml(item.title)} ${escapeHtml(item.category)} ${escapeHtml(item.author)}">
      <img loading="lazy" src="${item.image}" alt="${escapeHtml(item.alt)}">
      <div class="gallery-body">
        <span class="tag">${escapeHtml(item.category)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <dl>
          <dt>Autor</dt><dd>${escapeHtml(item.author)}</dd>
          <dt>Fonte</dt><dd>${escapeHtml(item.source)}</dd>
          <dt>Licença</dt><dd>${escapeHtml(item.license)}</dd>
        </dl>
        <a href="${item.link}" target="_blank" rel="noopener">Ver página original</a>
      </div>
    </article>
  `).join("");

  setupRevealAnimation();
}

function renderGalleryFilters() {
  const container = $("#galleryFilters");
  if (!container) return;

  const categories = ["Todos", ...new Set(gallery.map((item) => item.category))];

  container.innerHTML = categories.map((category, index) => `
    <button class="filter-button ${index === 0 ? "active" : ""}" type="button" data-category="${escapeHtml(category)}">
      ${escapeHtml(category)}
    </button>
  `).join("");

  $$(".filter-button", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$(".filter-button", container).forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderGallery(button.dataset.category);
      setupSearch();
    });
  });
}

function renderSources() {
  const container = $("#sourcesGrid");
  if (!container) return;

  container.innerHTML = sources.map((group) => `
    <article class="source-group reveal searchable" data-title="${escapeHtml(group.group)} ${escapeHtml(group.items.map((item) => item.name).join(" "))}">
      <h3>${escapeHtml(group.group)}</h3>
      <ul>
        ${group.items.map((item) => `
          <li>
            <a href="${item.link}" target="_blank" rel="noopener"><strong>${escapeHtml(item.name)}</strong></a>
            <p>${escapeHtml(item.description)}</p>
          </li>
        `).join("")}
      </ul>
    </article>
  `).join("");
}

function setupSearch() {
  const input = $("#globalSearch");
  const results = $("#searchResults");
  if (!input || !results) return;

  const buildIndex = () => {
    const elements = $$(".searchable");
    return elements.map((el, index) => {
      if (!el.id) el.id = `resultado-${index}`;
      const heading = $("h2, h3", el);
      const title = heading?.textContent?.trim() || el.dataset.title || "Resultado";
      const text = `${el.dataset.title || ""} ${el.textContent || ""}`.replace(/\s+/g, " ").trim();
      return { id: el.id, title, text };
    });
  };

  const runSearch = () => {
    const query = input.value.trim().toLowerCase();
    const index = buildIndex();

    if (query.length < 2) {
      results.classList.remove("active");
      results.innerHTML = "";
      return;
    }

    const matches = index
      .filter((item) => item.text.toLowerCase().includes(query))
      .slice(0, 8);

    results.classList.add("active");

    if (!matches.length) {
      results.innerHTML = `<p>Nenhum resultado encontrado para <strong>${escapeHtml(query)}</strong>.</p>`;
      return;
    }

    results.innerHTML = `
      <p>${matches.length} resultado(s) encontrado(s):</p>
      ${matches.map((item) => `
        <a class="search-result-item" href="#${item.id}">
          ✦ ${escapeHtml(item.title)}
        </a>
      `).join("")}
    `;
  };

  input.oninput = runSearch;

  results.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    results.classList.remove("active");
  });
}

function setupCopyDonationLink() {
  const buttons = $$(".copy-link");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.dataset.copy;
      if (!text) return;

      const original = button.textContent;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
        }

        button.textContent = "Link copiado";
        button.classList.add("copied");
        setTimeout(() => {
          button.textContent = original;
          button.classList.remove("copied");
        }, 1800);
      } catch (error) {
        button.textContent = "Copie manualmente";
        setTimeout(() => {
          button.textContent = original;
        }, 1800);
      }
    });
  });
}

function setupKeyboardFocus() {
  document.addEventListener("keyup", (event) => {
    if (event.key !== "Tab") return;
    document.body.classList.add("keyboard-user");
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-user");
  });
}

function updateFooterYear() {
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}

function init() {
  setupMenu();
  setupTheme();
  setupBackToTop();
  renderSymbols();
  renderTimeline();
  renderGalleryFilters();
  renderGallery();
  renderSources();
  setupExpandableCards();
  setupRevealAnimation();
  setupSearch();
  setupCopyDonationLink();
  setupKeyboardFocus();
  updateFooterYear();
}

document.addEventListener("DOMContentLoaded", init);
