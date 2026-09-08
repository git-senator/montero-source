/* ══════════════════════════════════════════════════════════════════════
   Переводы: русский — основа, дальше английский, португальский,
   испанский и итальянский.

   Русского в словаре нет: он снимается прямо с разметки при первой
   загрузке. Так исходный текст живёт в одном месте, и рассинхрона между
   HTML и словарём не бывает — правите страницу, русский меняется сам.

   Разметка размечена пятью атрибутами:
     data-i18n          — меняется textContent
     data-i18n-html     — меняется innerHTML (там, где внутри теги)
     data-i18n-ph       — меняется placeholder
     data-i18n-content  — меняется content (описание страницы в <meta>)
     data-i18n-aria     — меняется aria-label (подписи для скринридеров)

   Услуги, направления и шаги лежат массивами, а не двумя сотнями
   отдельных ключей: порядок полей один и тот же во всех языках,
   ключ svc.7.tag читается как svc[7][1].
   ══════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  /* Язык основы. Его нет в словаре — он снимается с разметки. */
  var BASE = 'ru';

  var LANGS = [
    { code: 'ru', native: 'Русский',    label: 'Russian' },
    { code: 'en', native: 'English',    label: 'English' },
    { code: 'pt', native: 'Português',  label: 'Portuguese' },
    { code: 'es', native: 'Español',    label: 'Spanish' },
    { code: 'it', native: 'Italiano',   label: 'Italian' }
  ];

  /* порядок полей услуги: имя, подпись, текст, четыре пункта, кнопка */
  var SVC = ['name', 'tag', 'text', 'i0', 'i1', 'i2', 'i3', 'cta'];

  var DICT = {};

  /* ══════════ ENGLISH ══════════ */
  DICT.en = {
    'meta.title': 'The House of Quiet Arrangements',
    'meta.desc': 'Private concierge for Brazil and Latin America. One request, everything arranged — mobility, aviation, yachts, residences, protection.',

    'brand.name': 'Latin America',
    'brand.sub': 'Private Concierge',

    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.destinations': 'Destinations',
    'nav.concierge': 'Concierge',
    'nav.request': 'Request',
    'nav.cta': '24/7 contact',

    'aria.home': 'Home',
    'aria.sections': 'Sections',
    'aria.menu': 'Menu',
    'aria.contact': 'Contact',
    'aria.legal': 'Legal',

    'hero.eyebrow': 'Brazil <em>·</em> Latin America <em>·</em> Answered at any hour',
    'hero.cta': 'Request a concierge',
    'hero.wa': 'Contact us',
    'hero.note': 'The list of families we keep is short. That is the service.',

    'rail.attendance': 'attendance',
    'rail.services': 'services',
    'rail.destinations': 'destinations',
    'rail.number': 'number',


    'lp.slogan1': 'Your time.',
    'lp.slogan2': 'Our responsibility.',
    'lp.phil.label': 'Montero philosophy',
    'lp.phil.h1': 'Your time.',
    'lp.phil.h2': 'Your luxury.',
    'lp.phil.txt': 'We take on everything that costs time,<br>resources and connections. You get the result<br>— without extra effort and extra people.',
    'lp.phil.sign': 'Private concierge — MONTERO',
    'lp.svc.label': 'Services',
    'lp.svc0': 'Armoured cars',
    'lp.tag1': 'Crewed · Provisioned',
    'lp.tag2': 'Rotor · Helipad',
    'lp.tag4': 'Portuguese · English',
    'lp.dest.label': 'Destinations',
    'lp.dest.word': 'destinations',
    'lp.dest.i0': 'Real estate',
    'lp.dest.i1': 'Lifestyle',
    'lp.dest.i2': 'Aviation',
    'lp.dest.i3': 'Business',
    'lp.one.h1': 'One number.',
    'lp.one.h2': 'One connection.',
    'lp.one.h3': 'One concierge.',
    'lp.one.txt': 'One number for matters that take dozens of contacts.<br>You put the wish into words.',
    'lp.one.sign': 'We turn it into reality.',
    'lp.one.cta': 'Contact 24/7',
    'lp.foot.sub': 'Private concierge',
    'lp.foot.claim': 'Your time is your luxury.',
    'lp.foot.geo': 'Brazil · South America',
    'lp.foot.cta': 'Request<br>concierge',
    'sec.svc.label': 'Services',
    'sec.svc.h': 'What we <span class="h-cap">deliver</span>',
    'sec.svc.lede': 'Our services are limitless. In 99% of cases the answer to “What can you do?” is WE CAN DO ALMOST ANYTHING!',
    'sec.dest.label': 'Destinations',
    'sec.dest.h': 'Where we <span class="h-cap">work</span>',
    'sec.dest.lede': 'We also provide remote support and settle many matters across the whole South American continent.',
    'dest.country.br': 'Brazil',
    'dest.country.ar': 'Argentina',
    'dest.country.py': 'Paraguay',
    'dest.ar.city': 'Buenos Aires',
    'dest.py.city': 'Asunción',
    'sec.conc.label': 'The Concierge',
    'sec.conc.h': '<span class="ln">One request is yours</span><span class="ln"><span class="h-cap">The rest is our business</span></span>',

    'conc.pull': 'One contact for anything you need in Brazil.',
    'conc.p1': 'From a simple everyday errand to a complex matter involving lawyers, brokers, drivers or other specialists — you never have to find the people or coordinate them yourself.',
    'conc.p2': 'You simply hand the task to your concierge. We arrange everything else and carry it through to the result.',
    'conc.p3': 'Confidential. Personal. No extra calls, no message threads, no wasted time.',
    'conc.p4': '<b>It all starts with one message.</b><br>Tell us what you need. Even if you do not yet know who could solve it — that part is already our job.',
    'conc.signName': '<span class="sl">Concierge service across</span> <span class="sl">the entire continent of</span> <span class="sl">South America</span>',

    'sec.req.label': 'The Request',
    'sec.req.h': 'Let us take care of <span class="h-cap">everything.</span>',
    'sec.req.lede': 'Send us your request and we will be in touch.',

    'direct.wa': 'WhatsApp',
    'direct.tg': 'Telegram',
    'direct.tel': 'Telephone',


    'final.claim1': 'Everything you need in Brazil, Argentina and Paraguay',
    'final.claim2': 'on a single phone number.',

    'foot.brand': 'Time <em>—</em> the highest form of luxury, and we look after it',
    'foot.privacy': 'Privacy',
    'foot.terms': 'Terms',

    'legal.stub': 'The %s document is not published yet.',

    'lang.title': 'Choose your language',
    'lang.sub': 'You can change it at any time — the switch sits in the header.',
    'lang.btn': 'Language',

    'form.fullName': 'Name',
    'form.whatsapp': 'WhatsApp/Telegram number',
    'form.email': 'Email',
    'form.country': 'Location',
    'form.service': 'Service',
    'form.location': 'Preferred location',
    'form.date': 'Preferred date',
    'form.phDate': 'dd/mm/yyyy',
    'form.message': 'What do you need?',
    'form.phMessage': 'An armoured SUV at 4:00 a.m. at my hotel in São Paulo, English-speaking driver.',
    'form.select': 'Select…',
    'form.noPref': 'No preference',
    'form.submit': 'Request private assistance',
    'form.sending': 'Sending…',
    'form.doneTitle': 'Request received',
    'form.doneText': 'We will contact you via WhatsApp shortly.',
    'form.doneAction': 'Open WhatsApp now',
    'form.failText': 'Something went wrong on our side. Message us on WhatsApp and we will pick it up immediately.',
    'form.required': 'This field is required.',
    'form.errPhone': 'Enter a valid phone number with country code.',
    'form.errEmail': 'Enter a valid email address.',
    'form.other': 'Something else',
    'form.loc.brazil': 'Elsewhere in Brazil',
    'form.loc.custom': 'Custom request',
    'form.loc.latam': 'Elsewhere in LATAM',
    'form.loc.camboriu': 'Balneário Camboriú',
    'form.loc.undecided': 'Not decided yet',

    svc: [
['Armored Vehicle Rental','Armored · Driven · Discreet',
 'An armored SUV at the hotel entrance at four in the morning, engine warm, driver already briefed. Plated in Brazil, papers in order, protection level to your requirement.',
 'Armored SUVs, sedans and vans','Protection levels B4 to B7',
 'Security-trained drivers','By the day, the week or the month','Request an armored vehicle'],
['Yacht & Boat Charter','Crewed · Provisioned · Private',
 'A crewed yacht in Angra dos Reis with the galley stocked to your list, or a fast boat for the afternoon. Three hundred and sixty-five islands, and a captain who knows all of them.',
 'Crewed motor yachts and sailing','Speedboats and tenders by the day',
 'Angra, Búzios, Paraty, Ilhabela','Chef, provisioning and dive support','Request a yacht'],
['Helicopter Charter','Rotor · Helipad · Twenty minutes',
 'São Paulo to Angra in twenty minutes instead of five hours on the BR-101. City hops between helipads, coastal transfers, clearance arranged before you arrive.',
 'City transfers between helipads','Coastal and island runs',
 'Scenic flights over Rio and Angra','Landing permissions and ground handling','Request a helicopter'],
['VIP Event Production','Produced · Private · Yours',
 'An evening built from nothing, for forty people, in a room nobody rents publicly. Or Carnival from a private box above the Sambadrome. Produced end to end.',
 'Private dinners, parties and celebrations','Venue sourcing and full production',
 'Carnival, Rock in Rio, F1 Interlagos','Chefs, musicians, security, photographers','Request an event'],
['Interpreters','Portuguese · English · Spanish · Russian',
 'An interpreter who sits through the entire meeting, not one who reads from a phrase book. Business negotiations, notary offices, clinics and courtrooms.',
 'Consecutive and simultaneous interpreting','Business and negotiation settings',
 'Notary, bank and clinic appointments','Sworn translation of documents','Request an interpreter'],
['Residency & Citizenship','Visas · RNM · Naturalisation',
 'Temporary residence, permanent residence, citizenship. We hold the file, chase the deadlines and tell you what is actually happening — in your language, not in Portuguese legalese.',
 'Residency by investment, work and family','Permanent residence and RNM card',
 'Naturalisation and passport','Family reunification and dependants','Request residency support'],
['Legal Services','Counsel · Contracts · Courts',
 'Attorneys who answer the telephone and explain the risk before you sign, not after. Corporate, property, family and immigration law — and litigation when it comes to that.',
 'Corporate and contract law','Property and title disputes',
 'Family, inheritance and immigration','Court representation and arbitration','Request legal support'],
['Accounting & Company Formation','CNPJ · Books · Filings',
 'A Brazilian company registered properly the first time, and an accountant who files on time every month. Nothing here is left for you to remember.',
 'Company formation, CPF and CNPJ','Bookkeeping, payroll and tax filing',
 'Simples, Lucro Presumido or Lucro Real','Licences, permits, annual compliance','Request company setup'],
['Market Entry','Bringing your business in',
 'You already have a business. We bring it into Brazil: the legal structure, the local entity, the partners, the distribution, and the people who will run it day to day.',
 'Branch, subsidiary or joint venture','Import, customs and certification',
 'Distribution and local partners','Hiring and labour compliance','Request market entry'],
['Business Analytics','Numbers before decisions',
 'A sober read on whether this market is worth entering — given before you spend, not after. Demand, competitors, margins, and what it actually costs to operate here.',
 'Market and demand research','Competitor and pricing analysis',
 'Unit economics and operating costs','Site and region selection','Request analytics'],
['Business Launch Support','From nothing to open',
 'Starting something new in Brazil from a blank page. Concept, registration, premises, staff, suppliers and the first ninety days — with one person accountable throughout.',
 'Concept and business plan','Registration and licences',
 'Premises, fit-out and suppliers','Staffing and the first ninety days','Request launch support'],
['Property Rental','Seasonal · Long-term · Off-market',
 'Seasonal villas in Jurerê, penthouses in Itaim, a house in Angra for the season. Inspected before you are shown them, and rented on a contract that protects you.',
 'Seasonal villas and beach houses','Long-term apartments and penthouses',
 'Off-market listings','Contracts, deposits and household setup','Request a rental'],
['Buying and renting homes','Acquiring a place to live',
 'Buying a home in Brazil as a foreigner is legal and straightforward — provided the title is clean, the seller is who they claim to be, and somebody reads every line.',
 'Search and off-market access','Title, debt and encumbrance checks',
 'Negotiation and escritura','Registration, taxes and utilities','Request a purchase'],
['Investment Property & Deal Support','Analysis · Diligence · Closing',
 'Whether the yield is real, whether the building is sound, whether the price makes sense. Then the paperwork, from the first offer to the registered deed.',
 'Yield and exit analysis','Technical and legal due diligence',
 'Negotiation and deal structuring','Closing, registration and handover','Request deal support'],
['Investment Accounts','Moving money in, legally',
 'An investment account opened so money reaches Brazil legally and without a three-week silence. Capital registered with the central bank, so it can leave again when you want it to.',
 'Investment and brokerage accounts','International transfers into Brazil',
 'Central bank registration of capital','Source-of-funds and compliance files','Request an account'],
['Currency Exchange','Online and across a desk',
 'Currency exchanged at a rate you see before you agree to it. Online for routine amounts, in person and by appointment for the ones that matter.',
 'Online exchange at a fixed rate','In-person exchange by appointment',
 'Large amounts with prior notice','Receipts and full documentation','Request an exchange'],
['Transfer São Paulo – Florianópolis','700 km · Door to door',
 'Seven hundred kilometres of the BR-101, done properly: an armored car if you want one, a driver who has run this road a hundred times, and a stop wherever you choose.',
 'Door to door, São Paulo to Florianópolis','Armored or standard vehicles',
 'Overnight and daytime departures','Luggage, pets and child seats','Request this transfer'],
['Transfers Across Brazil','From São Paulo, anywhere',
 'Out of São Paulo to anywhere in the country — Rio, Angra, Búzios, Campos do Jordão, the interior. One car, one driver, one price agreed before departure.',
 'Any destination from São Paulo','Airports, ports and private terminals',
 'Multi-day and multi-city routing','Fixed price agreed in advance','Request a transfer'],
['Travel Guide','Brazil, with someone who knows it',
 'A guide who knows which door to use, which restaurant is worth the drive, and which beach empties after four. Across the whole country, not one city.',
 'Private guiding in any Brazilian state','Historic centres, nature and coastline',
 'Restaurants, markets and neighbourhoods','Photography and drone coverage','Request a guide'],
['Full Travel Services','Booked and arranged',
 'Flights, hotels, routes, tickets, insurance and permits. Everything that normally takes a week of open tabs, handled by somebody else while you do something useful.',
 'Flights, hotels and pousadas','Route planning across states',
 'Tickets, permits and park access','Insurance and travel documents','Request travel arrangements'],
['Personal Companion','One person, the whole stay',
 'One person who stays with you from landing to departure. They translate, they drive, they book, they argue with the hotel — and they know when to say nothing at all.',
 'One companion for the entire stay','Translation, driving and bookings',
 'Available around the clock','Discretion as a condition of the job','Request a companion'],
['Executive Protection','Licensed · Advance · Invisible',
 'Licensed close-protection officers, routes surveyed the day before, residences held overnight. The kind of presence you notice only on the day it is not there.',
 'Close protection teams','Advance route and venue surveys',
 'Residential and event security','Risk assessment and travel briefings','Request protection'],
['Family & Maternity','Care · Schooling · Papers',
 'Obstetricians and private maternity suites in São Paulo, bilingual nannies who have stayed with the same families for years, school placement, and every document that follows a birth in Brazil.',
 'Maternity and obstetric care','Vetted nannies and household staff',
 'International school placement','Registry, documentation and citizenship','Request family assistance']
    ],
    dest: [
['Florianópolis','Jurerê Internacional, forty-two beaches and the summer address of São Paulo money. Villas, beach clubs and a season that runs December to March.'],
['Rio de Janeiro','Leblon and Ipanema, helicopter transfers across the bay, and a city that has never once negotiated its own beauty. Carnival is booked a year ahead.'],
['São Paulo','Where the business is actually done. Itaim and Jardins, the largest civil helicopter fleet in the hemisphere, and the hospitals people fly in for.']
    ],
    step: [
['You ask','One message, at any hour, in your language. WhatsApp, Telegram, or the form below.'],
['We answer','A named concierge replies, asks the two questions you forgot, and quotes a firm number.'],
['We arrange','Vendors vetted, contracts signed, deposits placed, drivers and crew briefed on your preferences.'],
['It is done','You arrive. Everything is already where it should be, and nobody has to be told twice.']
    ]
  };

  /* ══════════ PORTUGUÊS ══════════ */
  DICT.pt = {
    'meta.title': 'A Casa dos Arranjos Discretos',
    'meta.desc': 'Concierge privado para o Brasil e a América Latina. Um pedido e tudo é organizado — transporte, aviação, iates, residências, proteção.',

    'brand.name': 'América Latina',
    'brand.sub': 'Concierge Privado',

    'nav.home': 'Início',
    'nav.services': 'Serviços',
    'nav.destinations': 'Destinos',
    'nav.concierge': 'Concierge',
    'nav.request': 'Solicitar',
    'nav.cta': 'Contato 24/7',

    'aria.home': 'Início',
    'aria.sections': 'Seções',
    'aria.menu': 'Menu',
    'aria.contact': 'Contato',
    'aria.legal': 'Jurídico',

    'hero.eyebrow': 'Brasil <em>·</em> América Latina <em>·</em> Atendemos a qualquer hora',
    'hero.cta': 'Solicitar um concierge',
    'hero.wa': 'Fale conosco',
    'hero.note': 'A lista de famílias que atendemos é curta. É justamente esse o serviço.',

    'rail.attendance': 'atendimento',
    'rail.services': 'serviços',
    'rail.destinations': 'destinos',
    'rail.number': 'número',

    'sec.svc.label': 'Serviços',
    'sec.svc.h': 'O que <span class="h-cap">realizamos</span>',
    'sec.svc.lede': 'Nossos serviços são ilimitados. Em 99% dos casos, a resposta para “O que vocês conseguem?” é CONSEGUIMOS PRATICAMENTE TUDO!',

    'lp.slogan1': 'Seu tempo.',
    'lp.slogan2': 'Nossa responsabilidade.',
    'lp.phil.label': 'Filosofia Montero',
    'lp.phil.h1': 'Seu tempo.',
    'lp.phil.h2': 'Seu luxo.',
    'lp.phil.txt': 'Assumimos tudo o que exige tempo,<br>recursos e contatos. Você recebe o resultado<br>— sem esforço extra e sem pessoas a mais.',
    'lp.phil.sign': 'Concierge privado — MONTERO',
    'lp.svc.label': 'Serviços',
    'lp.svc0': 'Carros blindados',
    'lp.tag1': 'Com tripulação · Abastecido',
    'lp.tag2': 'Rotor · Helponto',
    'lp.tag4': 'Português · Inglês',
    'lp.dest.label': 'Destinos',
    'lp.dest.word': 'destinos',
    'lp.dest.i0': 'Imóveis',
    'lp.dest.i1': 'Estilo de vida',
    'lp.dest.i2': 'Aviação',
    'lp.dest.i3': 'Negócios',
    'lp.one.h1': 'Um número.',
    'lp.one.h2': 'Uma conexão.',
    'lp.one.h3': 'Um concierge.',
    'lp.one.txt': 'Um número para assuntos que exigem dezenas de contatos.<br>Você formula o desejo.',
    'lp.one.sign': 'Nós o transformamos em realidade.',
    'lp.one.cta': 'Falar 24/7',
    'lp.foot.sub': 'Concierge privado',
    'lp.foot.claim': 'Seu tempo é o seu luxo.',
    'lp.foot.geo': 'Brasil · América do Sul',
    'lp.foot.cta': 'Solicitar<br>concierge',
    'sec.dest.label': 'Destinos',
    'sec.dest.h': 'A geografia do nosso <span class="h-cap">trabalho</span>',
    'sec.dest.lede': 'Também oferecemos suporte remoto e resolvemos muitas questões em todo o continente sul-americano.',
    'dest.country.br': 'Brasil',
    'dest.country.ar': 'Argentina',
    'dest.country.py': 'Paraguai',
    'dest.ar.city': 'Buenos Aires',
    'dest.py.city': 'Assunção',
    'sec.conc.label': 'O Concierge',
    'sec.conc.h': '<span class="ln">Um pedido é seu</span><span class="ln"><span class="h-cap">O restante é conosco</span></span>',

    'conc.pull': 'Um único contato para qualquer necessidade no Brasil.',
    'conc.p1': 'De um pedido simples do dia a dia a uma questão complexa que envolve advogados, corretores, motoristas ou outros especialistas — você não precisa procurar os executores nem coordená-los sozinho.',
    'conc.p2': 'Você apenas passa a tarefa ao seu concierge. Nós organizamos todo o resto e levamos a questão até o resultado.',
    'conc.p3': 'Confidencial. Pessoal. Sem ligações extras, sem trocas de mensagens, sem perda de tempo.',
    'conc.p4': '<b>Tudo começa com uma mensagem.</b><br>Diga o que precisa. Mesmo que ainda não saiba quem pode resolver — isso já é tarefa nossa.',
    'conc.signName': '<span class="sl">Serviço de concierge em</span> <span class="sl">todo o continente</span> <span class="sl">sul-americano</span>',

    'sec.req.label': 'A Solicitação',
    'sec.req.h': 'Deixe que cuidemos de <span class="h-cap">tudo.</span>',
    'sec.req.lede': 'Envie sua solicitação e entraremos em contato.',

    'direct.wa': 'WhatsApp',
    'direct.tg': 'Telegram',
    'direct.tel': 'Telefone',


    'final.claim1': 'Tudo o que você precisa no Brasil, na Argentina e no Paraguai',
    'final.claim2': 'em um único número de telefone.',

    'foot.brand': 'O tempo <em>—</em> a forma mais alta de luxo, e nós cuidamos dele',
    'foot.privacy': 'Privacidade',
    'foot.terms': 'Termos',

    'legal.stub': 'O documento %s ainda não foi publicado.',

    'lang.title': 'Escolha o seu idioma',
    'lang.sub': 'Pode mudar a qualquer momento — o seletor fica no topo.',
    'lang.btn': 'Idioma',

    'form.fullName': 'Nome',
    'form.whatsapp': 'Número de WhatsApp/Telegram',
    'form.email': 'E-mail',
    'form.country': 'Localização',
    'form.service': 'Serviço',
    'form.location': 'Local de preferência',
    'form.date': 'Data de preferência',
    'form.phDate': 'dd/mm/aaaa',
    'form.message': 'Do que você precisa?',
    'form.phMessage': 'Um SUV blindado às 4h na porta do meu hotel em São Paulo, motorista que fale inglês.',
    'form.select': 'Selecione…',
    'form.noPref': 'Sem preferência',
    'form.submit': 'Enviar solicitação',
    'form.sending': 'Enviando…',
    'form.doneTitle': 'Solicitação recebida',
    'form.doneText': 'Entraremos em contato pelo WhatsApp em instantes.',
    'form.doneAction': 'Abrir o WhatsApp agora',
    'form.failText': 'Algo falhou do nosso lado. Chame no WhatsApp que assumimos na hora.',
    'form.required': 'Campo obrigatório.',
    'form.errPhone': 'Informe um telefone válido com código do país.',
    'form.errEmail': 'Informe um e-mail válido.',
    'form.other': 'Outro',
    'form.loc.brazil': 'Outro lugar no Brasil',
    'form.loc.custom': 'Pedido personalizado',
    'form.loc.latam': 'Outro país da LATAM',
    'form.loc.camboriu': 'Balneário Camboriú',
    'form.loc.undecided': 'Ainda não decidi',

    svc: [
['Aluguel de blindados','Blindado · Com motorista · Discreto',
 'Um SUV blindado na porta do hotel às quatro da manhã, motor quente, motorista já orientado. Emplacado no Brasil, documentação em ordem, nível de blindagem conforme a sua necessidade.',
 'SUVs, sedãs e vans blindados','Níveis de blindagem B4 a B7',
 'Motoristas com treinamento de segurança','Por dia, por semana ou por mês','Solicitar um blindado'],
['Iates e lanchas','Com tripulação · Abastecido · Privado',
 'Um iate tripulado em Angra dos Reis com a despensa montada pela sua lista, ou uma lancha rápida para a tarde. Trezentas e sessenta e cinco ilhas e um comandante que conhece todas.',
 'Iates a motor e veleiros com tripulação','Lanchas e tenders por dia',
 'Angra, Búzios, Paraty, Ilhabela','Chef, provisões e apoio de mergulho','Solicitar um iate'],
['Fretamento de helicóptero','Rotor · Helponto · Vinte minutos',
 'São Paulo a Angra em vinte minutos em vez de cinco horas na BR-101. Saltos entre helipontos, transferências para o litoral e autorizações resolvidas antes de você chegar.',
 'Transferências entre helipontos urbanos','Litoral e ilhas',
 'Voos panorâmicos sobre o Rio e Angra','Autorizações de pouso e apoio em solo','Solicitar um helicóptero'],
['Eventos VIP','Produzido · Privado · Seu',
 'Uma noite construída do zero, para quarenta pessoas, num salão que ninguém aluga publicamente. Ou o Carnaval de um camarote privado sobre o Sambódromo. Produzido de ponta a ponta.',
 'Jantares, festas e celebrações privadas','Busca de espaço e produção completa',
 'Carnaval, Rock in Rio, F1 em Interlagos','Chefs, músicos, segurança, fotógrafos','Solicitar um evento'],
['Intérpretes','Português · Inglês · Espanhol · Russo',
 'Um intérprete que fica na reunião inteira, não alguém lendo um guia de frases. Negociações, cartórios, clínicas e tribunais.',
 'Interpretação consecutiva e simultânea','Negociações e reuniões de negócios',
 'Cartório, banco e consultas médicas','Tradução juramentada de documentos','Solicitar um intérprete'],
['Residência e cidadania','Vistos · RNM · Naturalização',
 'Residência temporária, residência permanente, cidadania. Nós seguramos o processo, corremos atrás dos prazos e contamos o que está realmente acontecendo — no seu idioma, não em juridiquês.',
 'Residência por investimento, trabalho e família','Residência permanente e carteira RNM',
 'Naturalização e passaporte','Reunião familiar e dependentes','Solicitar apoio de residência'],
['Serviços jurídicos','Advogados · Contratos · Tribunais',
 'Advogados que atendem o telefone e explicam o risco antes de você assinar, não depois. Direito societário, imobiliário, de família e imigratório — e litígio, quando chega a esse ponto.',
 'Direito societário e contratual','Imóveis e disputas de titularidade',
 'Família, sucessões e imigração','Representação judicial e arbitragem','Solicitar apoio jurídico'],
['Contabilidade e abertura de empresas','CNPJ · Escrita · Obrigações',
 'Uma empresa brasileira registrada corretamente da primeira vez, e um contador que entrega tudo no prazo todo mês. Nada aqui fica na sua memória.',
 'Abertura de empresa, CPF e CNPJ','Escrituração, folha e obrigações fiscais',
 'Simples, Lucro Presumido ou Lucro Real','Licenças, alvarás e compliance anual','Solicitar abertura de empresa'],
['Entrada no mercado','Trazendo o seu negócio',
 'Você já tem um negócio. Nós o trazemos para o Brasil: estrutura jurídica, entidade local, parceiros, distribuição e as pessoas que vão tocar isso todo dia.',
 'Filial, subsidiária ou joint venture','Importação, aduana e certificação',
 'Distribuição e parceiros locais','Contratação e conformidade trabalhista','Solicitar entrada no mercado'],
['Análise de negócios','Números antes das decisões',
 'Uma leitura honesta sobre se vale a pena entrar neste mercado — dada antes de você gastar, não depois. Demanda, concorrentes, margens e quanto custa de fato operar aqui.',
 'Pesquisa de mercado e demanda','Análise de concorrência e preços',
 'Economia unitária e custos operacionais','Escolha de região e ponto','Solicitar análise'],
['Abertura de negócio','Do zero até abrir as portas',
 'Começar algo novo no Brasil a partir de uma folha em branco. Conceito, registro, ponto, equipe, fornecedores e os primeiros noventa dias — com um responsável do começo ao fim.',
 'Conceito e plano de negócio','Registro e licenças',
 'Ponto, obra e fornecedores','Equipe e os primeiros noventa dias','Solicitar apoio de abertura'],
['Aluguel de imóveis','Temporada · Longo prazo · Fora do mercado',
 'Casas de temporada em Jurerê, coberturas no Itaim, uma casa em Angra para a estação. Vistoriadas antes de você conhecê-las e alugadas num contrato que protege você.',
 'Casas de temporada e casas de praia','Apartamentos e coberturas de longo prazo',
 'Imóveis fora do mercado aberto','Contratos, cauções e montagem da casa','Solicitar um aluguel'],
['Compra e aluguel de imóveis','Adquirir para morar',
 'Comprar uma casa no Brasil sendo estrangeiro é legal e simples — desde que a matrícula esteja limpa, o vendedor seja quem diz ser e alguém leia cada linha.',
 'Busca e acesso a imóveis fora do mercado','Matrícula, dívidas e ônus',
 'Negociação e escritura','Registro, impostos e serviços','Solicitar uma compra'],
['Imóveis de investimento e assessoria','Análise · Diligência · Fechamento',
 'Se a rentabilidade é real, se o prédio está íntegro, se o preço faz sentido. E depois toda a papelada, da primeira proposta até a matrícula registrada.',
 'Análise de rentabilidade e saída','Due diligence técnica e jurídica',
 'Negociação e estruturação do negócio','Fechamento, registro e entrega','Solicitar assessoria de negócio'],
['Contas de investimento','Trazendo dinheiro de forma legal',
 'Uma conta de investimento aberta para que o dinheiro chegue ao Brasil legalmente e sem três semanas de silêncio. Capital registrado no Banco Central — ou seja, pode sair de novo.',
 'Contas de investimento e corretora','Transferências internacionais para o Brasil',
 'Registro de capital no Banco Central','Compliance e comprovação de origem','Solicitar abertura de conta'],
['Câmbio','Online e no balcão',
 'Câmbio a uma taxa que você vê antes de aceitar. Online para valores de rotina, presencial e com hora marcada para os que importam.',
 'Câmbio online com taxa travada','Câmbio presencial com hora marcada',
 'Valores altos com aviso prévio','Comprovantes e documentação completa','Solicitar câmbio'],
['Transfer São Paulo – Florianópolis','700 km · Porta a porta',
 'Setecentos quilômetros de BR-101, feitos direito: carro blindado se você quiser, um motorista que já fez essa estrada cem vezes e a parada onde você escolher.',
 'Porta a porta, São Paulo a Florianópolis','Veículos blindados ou comuns',
 'Saídas diurnas e noturnas','Bagagem, animais e cadeirinhas','Solicitar este transfer'],
['Transfers por todo o Brasil','De São Paulo, para onde for',
 'De São Paulo para qualquer ponto do país — Rio, Angra, Búzios, Campos do Jordão, o interior. Um carro, um motorista, um preço combinado antes da saída.',
 'Qualquer destino a partir de São Paulo','Aeroportos, portos e terminais privados',
 'Roteiros de vários dias e cidades','Preço fixo acertado com antecedência','Solicitar um transfer'],
['Guia de viagem','O Brasil com quem conhece',
 'Um guia que sabe por qual porta entrar, qual restaurante vale a viagem e qual praia esvazia depois das quatro. Pelo país inteiro, não por uma cidade só.',
 'Guia privado em qualquer estado','Centros históricos, natureza e litoral',
 'Restaurantes, mercados e bairros','Cobertura fotográfica e com drone','Solicitar um guia'],
['Serviços de viagem','Reservado e organizado',
 'Voos, hotéis, roteiros, ingressos, seguro e autorizações. Tudo o que normalmente consome uma semana de abas abertas, feito por outra pessoa enquanto você faz algo útil.',
 'Voos, hotéis e pousadas','Planejamento de roteiro entre estados',
 'Ingressos, autorizações e acesso a parques','Seguro e documentos de viagem','Solicitar organização de viagem'],
['Acompanhante pessoal','Uma pessoa, a viagem inteira',
 'Uma pessoa que fica com você do pouso à decolagem. Ela traduz, dirige, reserva, discute com o hotel — e sabe a hora de não dizer nada.',
 'Um acompanhante para toda a estadia','Tradução, direção e reservas',
 'Disponível 24 horas','Discrição como condição do trabalho','Solicitar um acompanhante'],
['Proteção executiva','Licenciada · Antecipada · Invisível',
 'Agentes licenciados de proteção pessoal, rotas vistoriadas na véspera, residências cobertas durante a noite. Aquela presença que só se nota no dia em que não está.',
 'Equipes de proteção pessoal','Vistoria prévia de rotas e locais',
 'Segurança residencial e de eventos','Avaliação de risco e briefings de viagem','Solicitar proteção'],
['Família e maternidade','Cuidado · Escolas · Documentos',
 'Obstetras e suítes de maternidade privadas em São Paulo, babás bilíngues que ficam anos com as mesmas famílias, vaga em escola internacional e cada documento que segue um nascimento no Brasil.',
 'Pré-natal e parto','Babás e equipe doméstica verificadas',
 'Vaga em escolas internacionais','Cartório, documentação e cidadania','Solicitar apoio à família']
    ],
    dest: [
['Florianópolis','Jurerê Internacional, quarenta e duas praias e o endereço de verão do dinheiro paulista. Casas, beach clubs e uma temporada que vai de dezembro a março.'],
['Rio de Janeiro','Leblon e Ipanema, transferências de helicóptero sobre a baía e uma cidade que nunca negociou a própria beleza. O Carnaval se reserva com um ano de antecedência.'],
['São Paulo','Onde os negócios realmente acontecem. Itaim e Jardins, a maior frota civil de helicópteros do hemisfério e os hospitais pelos quais se atravessa o continente.']
    ],
    step: [
['Você pede','Uma mensagem, a qualquer hora, no seu idioma. WhatsApp, Telegram ou o formulário abaixo.'],
['Nós respondemos','Um concierge com nome responde, faz as duas perguntas que você esqueceu e passa um valor firme.'],
['Nós organizamos','Fornecedores verificados, contratos assinados, sinais pagos, motoristas e tripulação orientados sobre as suas preferências.'],
['Está feito','Você chega. Tudo já está onde deveria estar, e ninguém precisa ouvir duas vezes.']
    ]
  };

  /* ══════════ ESPAÑOL ══════════ */
  DICT.es = {
    'meta.title': 'La Casa de los Arreglos Discretos',
    'meta.desc': 'Conserjería privada para Brasil y América Latina. Una petición y todo queda organizado — transporte, aviación, yates, residencias, protección.',

    'brand.name': 'América Latina',
    'brand.sub': 'Conserjería Privada',

    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.destinations': 'Destinos',
    'nav.concierge': 'Conserjería',
    'nav.request': 'Solicitar',
    'nav.cta': 'Contacto 24/7',

    'aria.home': 'Inicio',
    'aria.sections': 'Secciones',
    'aria.menu': 'Menú',
    'aria.contact': 'Contacto',
    'aria.legal': 'Legal',

    'hero.eyebrow': 'Brasil <em>·</em> América Latina <em>·</em> Respondemos a cualquier hora',
    'hero.cta': 'Solicitar un conserje',
    'hero.wa': 'Contáctenos',
    'hero.note': 'La lista de familias que atendemos es corta. En eso consiste el servicio.',

    'rail.attendance': 'atención',
    'rail.services': 'servicios',
    'rail.destinations': 'destinos',
    'rail.number': 'número',

    'sec.svc.label': 'Servicios',
    'sec.svc.h': 'Lo que <span class="h-cap">realizamos</span>',
    'sec.svc.lede': 'Nuestros servicios son ilimitados. En el 99% de los casos, la respuesta a «¿Qué pueden hacer?» es ¡PODEMOS PRÁCTICAMENTE TODO!',

    'lp.slogan1': 'Su tiempo.',
    'lp.slogan2': 'Nuestra responsabilidad.',
    'lp.phil.label': 'Filosofía Montero',
    'lp.phil.h1': 'Su tiempo.',
    'lp.phil.h2': 'Su lujo.',
    'lp.phil.txt': 'Asumimos todo lo que exige tiempo,<br>recursos y contactos. Usted recibe el resultado<br>— sin esfuerzos ni personas de más.',
    'lp.phil.sign': 'Concierge privado — MONTERO',
    'lp.svc.label': 'Servicios',
    'lp.svc0': 'Autos blindados',
    'lp.tag1': 'Con tripulación · Aprovisionado',
    'lp.tag2': 'Rotor · Helipuerto',
    'lp.tag4': 'Portugués · Inglés',
    'lp.dest.label': 'Destinos',
    'lp.dest.word': 'destinos',
    'lp.dest.i0': 'Inmuebles',
    'lp.dest.i1': 'Estilo de vida',
    'lp.dest.i2': 'Aviación',
    'lp.dest.i3': 'Negocios',
    'lp.one.h1': 'Un número.',
    'lp.one.h2': 'Una conexión.',
    'lp.one.h3': 'Un concierge.',
    'lp.one.txt': 'Un número para asuntos que exigen decenas de contactos.<br>Usted formula el deseo.',
    'lp.one.sign': 'Nosotros lo hacemos realidad.',
    'lp.one.cta': 'Contactar 24/7',
    'lp.foot.sub': 'Concierge privado',
    'lp.foot.claim': 'Su tiempo es su lujo.',
    'lp.foot.geo': 'Brasil · Sudamérica',
    'lp.foot.cta': 'Solicitar<br>concierge',
    'sec.dest.label': 'Destinos',
    'sec.dest.h': 'La geografía de nuestro <span class="h-cap">trabajo</span>',
    'sec.dest.lede': 'También ofrecemos apoyo remoto y resolvemos muchos asuntos en todo el continente sudamericano.',
    'dest.country.br': 'Brasil',
    'dest.country.ar': 'Argentina',
    'dest.country.py': 'Paraguay',
    'dest.ar.city': 'Buenos Aires',
    'dest.py.city': 'Asunción',
    'sec.conc.label': 'El Conserje',
    'sec.conc.h': '<span class="ln">Una petición es suya</span><span class="ln"><span class="h-cap">El resto es cosa nuestra</span></span>',

    'conc.pull': 'Un solo contacto para cualquier asunto en Brasil.',
    'conc.p1': 'Desde una petición cotidiana hasta un asunto complejo que requiere abogados, corredores, choferes u otros especialistas — usted no tiene que buscar a los ejecutores ni coordinarlos.',
    'conc.p2': 'Usted simplemente le da la tarea a su conserje. Nosotros organizamos todo lo demás y llevamos el asunto hasta el resultado.',
    'conc.p3': 'Confidencial. Personal. Sin llamadas de más, sin cadenas de mensajes, sin pérdida de tiempo.',
    'conc.p4': '<b>Todo empieza con un mensaje.</b><br>Cuéntenos qué necesita. Aunque todavía no sepa quién puede resolverlo — eso ya es asunto nuestro.',
    'conc.signName': '<span class="sl">Servicio de conserjería en</span> <span class="sl">todo el continente</span> <span class="sl">sudamericano</span>',

    'sec.req.label': 'La Petición',
    'sec.req.h': 'Permítanos ocuparnos de <span class="h-cap">todo.</span>',
    'sec.req.lede': 'Envíenos su solicitud y nos pondremos en contacto.',

    'direct.wa': 'WhatsApp',
    'direct.tg': 'Telegram',
    'direct.tel': 'Teléfono',


    'final.claim1': 'Todo lo que necesita en Brasil, Argentina y Paraguay',
    'final.claim2': 'en un solo número de teléfono.',

    'foot.brand': 'El tiempo <em>—</em> la forma más alta de lujo, y nosotros lo cuidamos',
    'foot.privacy': 'Privacidad',
    'foot.terms': 'Términos',

    'legal.stub': 'El documento %s todavía no está publicado.',

    'lang.title': 'Elija su idioma',
    'lang.sub': 'Puede cambiarlo en cualquier momento — el selector está arriba.',
    'lang.btn': 'Idioma',

    'form.fullName': 'Nombre',
    'form.whatsapp': 'Número de WhatsApp/Telegram',
    'form.email': 'Correo electrónico',
    'form.country': 'Ubicación',
    'form.service': 'Servicio',
    'form.location': 'Lugar preferido',
    'form.date': 'Fecha preferida',
    'form.phDate': 'dd/mm/aaaa',
    'form.message': '¿Qué necesita?',
    'form.phMessage': 'Un SUV blindado a las 4:00 en la puerta de mi hotel en São Paulo, chofer que hable inglés.',
    'form.select': 'Seleccione…',
    'form.noPref': 'Sin preferencia',
    'form.submit': 'Enviar la solicitud',
    'form.sending': 'Enviando…',
    'form.doneTitle': 'Solicitud recibida',
    'form.doneText': 'Le escribiremos por WhatsApp en breve.',
    'form.doneAction': 'Abrir WhatsApp ahora',
    'form.failText': 'Algo falló de nuestro lado. Escríbanos por WhatsApp y lo retomamos al instante.',
    'form.required': 'Este campo es obligatorio.',
    'form.errPhone': 'Indique un teléfono válido con código de país.',
    'form.errEmail': 'Indique un correo válido.',
    'form.other': 'Otro',
    'form.loc.brazil': 'Otro lugar de Brasil',
    'form.loc.custom': 'Solicitud personalizada',
    'form.loc.latam': 'Otro país de LATAM',
    'form.loc.camboriu': 'Balneário Camboriú',
    'form.loc.undecided': 'Aún no lo he decidido',

    svc: [
['Vehículos blindados','Blindado · Con chofer · Discreto',
 'Un SUV blindado en la puerta del hotel a las cuatro de la mañana, motor caliente, chofer ya informado. Matriculado en Brasil, papeles en regla, nivel de blindaje según su necesidad.',
 'SUV, sedanes y vans blindados','Niveles de blindaje B4 a B7',
 'Choferes con formación en seguridad','Por día, por semana o por mes','Solicitar un blindado'],
['Yates y lanchas','Con tripulación · Aprovisionado · Privado',
 'Un yate con tripulación en Angra dos Reis con la despensa hecha según su lista, o una lancha rápida para la tarde. Trescientas sesenta y cinco islas y un capitán que las conoce todas.',
 'Yates a motor y veleros con tripulación','Lanchas y tenders por día',
 'Angra, Búzios, Paraty, Ilhabela','Chef, provisiones y apoyo de buceo','Solicitar un yate'],
['Alquiler de helicóptero','Rotor · Helipuerto · Veinte minutos',
 'São Paulo a Angra en veinte minutos en vez de cinco horas por la BR-101. Saltos entre helipuertos, traslados a la costa y permisos resueltos antes de que usted llegue.',
 'Traslados entre helipuertos urbanos','Costa e islas',
 'Vuelos panorámicos sobre Río y Angra','Permisos de aterrizaje y asistencia en tierra','Solicitar un helicóptero'],
['Eventos VIP','Producido · Privado · Suyo',
 'Una noche construida desde cero, para cuarenta personas, en un salón que nadie alquila públicamente. O el Carnaval desde un palco privado sobre el Sambódromo. Producido de principio a fin.',
 'Cenas, fiestas y celebraciones privadas','Búsqueda de espacio y producción completa',
 'Carnaval, Rock in Rio, F1 en Interlagos','Chefs, músicos, seguridad, fotógrafos','Solicitar un evento'],
['Intérpretes','Portugués · Inglés · Español · Ruso',
 'Un intérprete que se queda toda la reunión, no alguien que lee una guía de frases. Negociaciones, notarías, clínicas y tribunales.',
 'Interpretación consecutiva y simultánea','Negociaciones y reuniones de trabajo',
 'Notaría, banco y consultas médicas','Traducción jurada de documentos','Solicitar un intérprete'],
['Residencia y ciudadanía','Visados · RNM · Naturalización',
 'Residencia temporal, residencia permanente, ciudadanía. Nosotros sostenemos el expediente, perseguimos los plazos y le contamos lo que de verdad está pasando — en su idioma, no en jerga jurídica.',
 'Residencia por inversión, trabajo y familia','Residencia permanente y tarjeta RNM',
 'Naturalización y pasaporte','Reagrupación familiar y dependientes','Solicitar apoyo de residencia'],
['Servicios jurídicos','Abogados · Contratos · Tribunales',
 'Abogados que contestan el teléfono y explican el riesgo antes de que usted firme, no después. Derecho societario, inmobiliario, de familia y migratorio — y litigio, si se llega a eso.',
 'Derecho societario y contractual','Inmuebles y disputas de titularidad',
 'Familia, sucesiones e inmigración','Representación judicial y arbitraje','Solicitar apoyo jurídico'],
['Contabilidad y constitución de empresas','CNPJ · Libros · Declaraciones',
 'Una empresa brasileña registrada bien a la primera, y un contador que presenta a tiempo todos los meses. Aquí no queda nada a su memoria.',
 'Constitución de empresa, CPF y CNPJ','Contabilidad, nóminas y declaraciones',
 'Simples, Lucro Presumido o Lucro Real','Licencias, permisos y cumplimiento anual','Solicitar constitución de empresa'],
['Entrada al mercado','Traemos su negocio',
 'Usted ya tiene un negocio. Nosotros lo traemos a Brasil: la estructura jurídica, la entidad local, los socios, la distribución y las personas que lo llevarán día a día.',
 'Sucursal, filial o joint venture','Importación, aduana y certificación',
 'Distribución y socios locales','Contratación y cumplimiento laboral','Solicitar entrada al mercado'],
['Analítica de negocio','Números antes de decidir',
 'Una lectura sobria de si vale la pena entrar en este mercado — dada antes de que gaste, no después. Demanda, competencia, márgenes y lo que cuesta de verdad operar aquí.',
 'Estudio de mercado y demanda','Análisis de competencia y precios',
 'Economía unitaria y costes operativos','Elección de región y ubicación','Solicitar analítica'],
['Lanzamiento de negocio','De cero a abrir',
 'Empezar algo nuevo en Brasil desde una hoja en blanco. Concepto, registro, local, equipo, proveedores y los primeros noventa días — con un responsable de principio a fin.',
 'Concepto y plan de negocio','Registro y licencias',
 'Local, obra y proveedores','Equipo y los primeros noventa días','Solicitar apoyo de lanzamiento'],
['Alquiler de inmuebles','Temporada · Largo plazo · Fuera de mercado',
 'Villas de temporada en Jurerê, áticos en Itaim, una casa en Angra para la estación. Inspeccionadas antes de que usted las vea y alquiladas con un contrato que le protege.',
 'Villas de temporada y casas de playa','Pisos y áticos de largo plazo',
 'Inmuebles fuera del mercado abierto','Contratos, fianzas y montaje del hogar','Solicitar un alquiler'],
['Compra y alquiler de vivienda','Adquirir para vivir',
 'Comprar una casa en Brasil siendo extranjero es legal y sencillo — siempre que el título esté limpio, el vendedor sea quien dice ser y alguien lea cada línea.',
 'Búsqueda y acceso fuera de mercado','Título, deudas y cargas',
 'Negociación y escritura','Registro, impuestos y suministros','Solicitar una compra'],
['Inmuebles de inversión y cierre','Análisis · Diligencia · Cierre',
 'Si la rentabilidad es real, si el edificio está sano, si el precio tiene sentido. Y después todo el papeleo, desde la primera oferta hasta la escritura inscrita.',
 'Análisis de rentabilidad y salida','Due diligence técnica y jurídica',
 'Negociación y estructuración','Cierre, inscripción y entrega','Solicitar acompañamiento'],
['Cuentas de inversión','Traer el dinero de forma legal',
 'Una cuenta de inversión abierta para que el dinero llegue a Brasil legalmente y sin tres semanas de silencio. Capital registrado en el banco central — es decir, también puede salir.',
 'Cuentas de inversión y de bróker','Transferencias internacionales a Brasil',
 'Registro de capital en el banco central','Cumplimiento y origen de fondos','Solicitar apertura de cuenta'],
['Cambio de divisas','Online y en mostrador',
 'Divisas a un tipo que usted ve antes de aceptarlo. Online para importes corrientes, en persona y con cita para los que importan.',
 'Cambio online con tipo fijado','Cambio presencial con cita previa',
 'Importes altos con aviso previo','Justificantes y documentación completa','Solicitar un cambio'],
['Traslado São Paulo – Florianópolis','700 km · Puerta a puerta',
 'Setecientos kilómetros de la BR-101, hechos como es debido: coche blindado si lo quiere, un chofer que ha hecho esta carretera cien veces y la parada donde usted diga.',
 'Puerta a puerta, São Paulo a Florianópolis','Vehículos blindados o estándar',
 'Salidas diurnas y nocturnas','Equipaje, mascotas y sillas infantiles','Solicitar este traslado'],
['Traslados por todo Brasil','Desde São Paulo, adonde sea',
 'Desde São Paulo a cualquier punto del país — Río, Angra, Búzios, Campos do Jordão, el interior. Un coche, un chofer, un precio acordado antes de salir.',
 'Cualquier destino desde São Paulo','Aeropuertos, puertos y terminales privadas',
 'Rutas de varios días y ciudades','Precio cerrado antes de la salida','Solicitar un traslado'],
['Guía de viaje','Brasil con quien lo conoce',
 'Un guía que sabe por qué puerta entrar, qué restaurante merece el viaje y qué playa se vacía después de las cuatro. Por todo el país, no por una sola ciudad.',
 'Guía privado en cualquier estado','Centros históricos, naturaleza y costa',
 'Restaurantes, mercados y barrios','Cobertura fotográfica y con dron','Solicitar un guía'],
['Servicios de viaje','Reservado y organizado',
 'Vuelos, hoteles, rutas, entradas, seguro y permisos. Todo lo que normalmente cuesta una semana de pestañas abiertas, hecho por otra persona mientras usted hace algo útil.',
 'Vuelos, hoteles y pousadas','Planificación de ruta entre estados',
 'Entradas, permisos y acceso a parques','Seguro y documentos de viaje','Solicitar organización del viaje'],
['Acompañante personal','Una persona, todo el viaje',
 'Una persona que está con usted desde el aterrizaje hasta el despegue. Traduce, conduce, reserva, discute con el hotel — y sabe cuándo no decir nada.',
 'Un acompañante para toda la estancia','Traducción, conducción y reservas',
 'Disponible las veinticuatro horas','La discreción como condición del trabajo','Solicitar un acompañante'],
['Protección ejecutiva','Licenciada · Anticipada · Invisible',
 'Agentes licenciados de protección personal, rutas revisadas la víspera, residencias cubiertas de noche. Esa presencia que solo se nota el día en que no está.',
 'Equipos de protección personal','Reconocimiento previo de rutas y lugares',
 'Seguridad residencial y de eventos','Evaluación de riesgo y briefings de viaje','Solicitar protección'],
['Familia y maternidad','Cuidado · Colegios · Papeles',
 'Obstetras y suites de maternidad privadas en São Paulo, niñeras bilingües que llevan años con las mismas familias, plaza en colegio internacional y cada documento que sigue a un nacimiento en Brasil.',
 'Seguimiento del embarazo y parto','Niñeras y personal doméstico verificados',
 'Plaza en colegios internacionales','Registro civil, documentos y ciudadanía','Solicitar apoyo familiar']
    ],
    dest: [
['Florianópolis','Jurerê Internacional, cuarenta y dos playas y la dirección de verano del dinero paulista. Villas, beach clubs y una temporada que va de diciembre a marzo.'],
['Río de Janeiro','Leblon e Ipanema, traslados en helicóptero sobre la bahía y una ciudad que jamás ha negociado su propia belleza. El Carnaval se reserva con un año de antelación.'],
['São Paulo','Donde los negocios se hacen de verdad. Itaim y Jardins, la mayor flota civil de helicópteros del hemisferio y los hospitales por los que se cruza el continente.']
    ],
    step: [
['Usted pide','Un mensaje, a cualquier hora, en su idioma. WhatsApp, Telegram o el formulario de abajo.'],
['Nosotros respondemos','Un conserje con nombre contesta, hace las dos preguntas que usted olvidó y da una cifra firme.'],
['Nosotros organizamos','Proveedores verificados, contratos firmados, señales pagadas, choferes y tripulación informados de sus preferencias.'],
['Está hecho','Usted llega. Todo está ya donde debe estar, y a nadie hay que decírselo dos veces.']
    ]
  };

  /* ══════════ ITALIANO ══════════ */
  DICT.it = {
    'meta.title': 'La Casa degli Accordi Silenziosi',
    'meta.desc': 'Concierge privato per il Brasile e l’America Latina. Una richiesta e tutto è organizzato — trasporti, aviazione, yacht, residenze, protezione.',

    'brand.name': 'America Latina',
    'brand.sub': 'Concierge Privato',

    'nav.home': 'Home',
    'nav.services': 'Servizi',
    'nav.destinations': 'Destinazioni',
    'nav.concierge': 'Concierge',
    'nav.request': 'Richiesta',
    'nav.cta': 'Contatto 24/7',

    'aria.home': 'Home',
    'aria.sections': 'Sezioni',
    'aria.menu': 'Menu',
    'aria.contact': 'Contatti',
    'aria.legal': 'Note legali',

    'hero.eyebrow': 'Brasile <em>·</em> America Latina <em>·</em> Rispondiamo a qualsiasi ora',
    'hero.cta': 'Richiedere un concierge',
    'hero.wa': 'Contattaci',
    'hero.note': 'La lista delle famiglie che seguiamo è corta. Il servizio è esattamente questo.',

    'rail.attendance': 'reperibilità',
    'rail.services': 'servizi',
    'rail.destinations': 'destinazioni',
    'rail.number': 'numero',

    'sec.svc.label': 'Servizi',
    'sec.svc.h': 'Che cosa <span class="h-cap">realizziamo</span>',
    'sec.svc.lede': 'I nostri servizi sono illimitati. Nel 99% dei casi la risposta a «Che cosa potete fare?» è POSSIAMO PRATICAMENTE TUTTO!',

    'lp.slogan1': 'Il vostro tempo.',
    'lp.slogan2': 'La nostra responsabilità.',
    'lp.phil.label': 'Filosofia Montero',
    'lp.phil.h1': 'Il vostro tempo.',
    'lp.phil.h2': 'Il vostro lusso.',
    'lp.phil.txt': 'Ci facciamo carico di tutto ciò che richiede tempo,<br>risorse e contatti. Voi ricevete il risultato<br>— senza sforzi né persone in più.',
    'lp.phil.sign': 'Concierge privato — MONTERO',
    'lp.svc.label': 'Servizi',
    'lp.svc0': 'Auto blindate',
    'lp.tag1': 'Con equipaggio · Rifornito',
    'lp.tag2': 'Rotore · Elisuperficie',
    'lp.tag4': 'Portoghese · Inglese',
    'lp.dest.label': 'Destinazioni',
    'lp.dest.word': 'destinazioni',
    'lp.dest.i0': 'Immobili',
    'lp.dest.i1': 'Stile di vita',
    'lp.dest.i2': 'Aviazione',
    'lp.dest.i3': 'Business',
    'lp.one.h1': 'Un numero.',
    'lp.one.h2': 'Un contatto.',
    'lp.one.h3': 'Un concierge.',
    'lp.one.txt': 'Un numero per questioni che richiedono decine di contatti.<br>Lei formula il desiderio.',
    'lp.one.sign': 'Noi lo rendiamo realtà.',
    'lp.one.cta': 'Contatto 24/7',
    'lp.foot.sub': 'Concierge privato',
    'lp.foot.claim': 'Il vostro tempo è il vostro lusso.',
    'lp.foot.geo': 'Brasile · Sud America',
    'lp.foot.cta': 'Richiedi<br>concierge',
    'sec.dest.label': 'Destinazioni',
    'sec.dest.h': 'La geografia del nostro <span class="h-cap">lavoro</span>',
    'sec.dest.lede': 'Offriamo anche assistenza a distanza e risolviamo molte questioni in tutto il continente sudamericano.',
    'dest.country.br': 'Brasile',
    'dest.country.ar': 'Argentina',
    'dest.country.py': 'Paraguay',
    'dest.ar.city': 'Buenos Aires',
    'dest.py.city': 'Asunción',
    'sec.conc.label': 'Il Concierge',
    'sec.conc.h': '<span class="ln">Una richiesta è vostra</span><span class="ln"><span class="h-cap">Il resto è affar nostro</span></span>',

    'conc.pull': 'Un solo contatto per qualsiasi esigenza in Brasile.',
    'conc.p1': 'Da una richiesta quotidiana a una questione complessa che richiede avvocati, broker, autisti o altri specialisti — non deve cercare gli esecutori né coordinarli da solo.',
    'conc.p2': 'Lei affida semplicemente il compito al suo concierge. Noi organizziamo tutto il resto e portiamo la questione al risultato.',
    'conc.p3': 'Riservato. Personale. Senza telefonate in più, senza scambi di messaggi, senza perdite di tempo.',
    'conc.p4': '<b>Tutto comincia con un messaggio.</b><br>Ci dica di cosa ha bisogno. Anche se non sa ancora chi possa risolverlo — quello è già compito nostro.',
    'conc.signName': '<span class="sl">Servizio di concierge in</span> <span class="sl">tutto il continente</span> <span class="sl">sudamericano</span>',

    'sec.req.label': 'La Richiesta',
    'sec.req.h': 'Ci lasci pensare a <span class="h-cap">tutto.</span>',
    'sec.req.lede': 'Inviateci la vostra richiesta e vi contatteremo.',

    'direct.wa': 'WhatsApp',
    'direct.tg': 'Telegram',
    'direct.tel': 'Telefono',


    'final.claim1': 'Tutto ciò che le serve in Brasile, Argentina e Paraguay',
    'final.claim2': 'su un unico numero di telefono.',

    'foot.brand': 'Il tempo <em>—</em> la forma più alta di lusso, e noi ce ne occupiamo',
    'foot.privacy': 'Privacy',
    'foot.terms': 'Termini',

    'legal.stub': 'Il documento %s non è ancora pubblicato.',

    'lang.title': 'Scelga la sua lingua',
    'lang.sub': 'Può cambiarla in qualsiasi momento — il selettore è in alto.',
    'lang.btn': 'Lingua',

    'form.fullName': 'Nome',
    'form.whatsapp': 'Numero WhatsApp/Telegram',
    'form.email': 'Email',
    'form.country': 'Località',
    'form.service': 'Servizio',
    'form.location': 'Località preferita',
    'form.date': 'Data preferita',
    'form.phDate': 'gg/mm/aaaa',
    'form.message': 'Di che cosa ha bisogno?',
    'form.phMessage': 'Un SUV blindato alle 4:00 davanti al mio hotel a San Paolo, autista che parli inglese.',
    'form.select': 'Selezioni…',
    'form.noPref': 'Nessuna preferenza',
    'form.submit': 'Inviare la richiesta',
    'form.sending': 'Invio…',
    'form.doneTitle': 'Richiesta ricevuta',
    'form.doneText': 'La contatteremo su WhatsApp a breve.',
    'form.doneAction': 'Aprire WhatsApp adesso',
    'form.failText': 'Qualcosa è andato storto dalla nostra parte. Ci scriva su WhatsApp e riprendiamo subito.',
    'form.required': 'Campo obbligatorio.',
    'form.errPhone': 'Inserisca un numero valido con prefisso internazionale.',
    'form.errEmail': 'Inserisca un indirizzo email valido.',
    'form.other': 'Altro',
    'form.loc.brazil': 'Un altro luogo in Brasile',
    'form.loc.custom': 'Richiesta personalizzata',
    'form.loc.latam': 'Un altro paese LATAM',
    'form.loc.camboriu': 'Balneário Camboriú',
    'form.loc.undecided': 'Non ho ancora deciso',

    svc: [
['Auto blindate','Blindata · Con autista · Discreta',
 'Un SUV blindato davanti all’hotel alle quattro del mattino, motore caldo, autista già istruito. Immatricolato in Brasile, documenti in regola, livello di blindatura secondo la sua esigenza.',
 'SUV, berline e van blindati','Livelli di blindatura da B4 a B7',
 'Autisti con formazione di sicurezza','A giornata, a settimana o a mese','Richiedere un’auto blindata'],
['Yacht e barche','Con equipaggio · Rifornito · Privato',
 'Uno yacht con equipaggio ad Angra dos Reis con la cambusa fatta sulla sua lista, o un motoscafo veloce per il pomeriggio. Trecentosessantacinque isole e un comandante che le conosce tutte.',
 'Yacht a motore e a vela con equipaggio','Motoscafi e tender a giornata',
 'Angra, Búzios, Paraty, Ilhabela','Chef, provviste e supporto immersioni','Richiedere uno yacht'],
['Noleggio elicottero','Rotore · Elisuperficie · Venti minuti',
 'San Paolo–Angra in venti minuti invece di cinque ore sulla BR-101. Spostamenti tra elisuperfici urbane, transfer sulla costa e autorizzazioni pronte prima del suo arrivo.',
 'Transfer tra elisuperfici urbane','Costa e isole',
 'Voli panoramici su Rio e Angra','Permessi di atterraggio e assistenza a terra','Richiedere un elicottero'],
['Eventi VIP','Prodotto · Privato · Suo',
 'Una serata costruita dal nulla, per quaranta persone, in una sala che nessuno affitta pubblicamente. O il Carnevale da un palco privato sopra il Sambodromo. Prodotto dall’inizio alla fine.',
 'Cene, feste e celebrazioni private','Ricerca della sede e produzione completa',
 'Carnevale, Rock in Rio, F1 a Interlagos','Chef, musicisti, sicurezza, fotografi','Richiedere un evento'],
['Interpreti','Portoghese · Inglese · Spagnolo · Russo',
 'Un interprete che resta per tutta la riunione, non qualcuno che legge un frasario. Trattative, studi notarili, cliniche e tribunali.',
 'Interpretariato consecutivo e simultaneo','Trattative e incontri di lavoro',
 'Notaio, banca e visite mediche','Traduzione giurata di documenti','Richiedere un interprete'],
['Residenza e cittadinanza','Visti · RNM · Naturalizzazione',
 'Residenza temporanea, residenza permanente, cittadinanza. Teniamo noi il fascicolo, rincorriamo le scadenze e le diciamo che cosa sta succedendo davvero — nella sua lingua, non in burocratese.',
 'Residenza per investimento, lavoro e famiglia','Residenza permanente e tessera RNM',
 'Naturalizzazione e passaporto','Ricongiungimento familiare e familiari a carico','Richiedere supporto sulla residenza'],
['Servizi legali','Avvocati · Contratti · Tribunali',
 'Avvocati che rispondono al telefono e spiegano il rischio prima che lei firmi, non dopo. Diritto societario, immobiliare, di famiglia e dell’immigrazione — e contenzioso, se si arriva a quello.',
 'Diritto societario e contrattuale','Immobili e controversie sulla proprietà',
 'Famiglia, successioni e immigrazione','Rappresentanza in giudizio e arbitrato','Richiedere supporto legale'],
['Contabilità e apertura società','CNPJ · Libri · Adempimenti',
 'Una società brasiliana registrata bene la prima volta, e un commercialista che deposita in tempo ogni mese. Qui non resta nulla alla sua memoria.',
 'Costituzione della società, CPF e CNPJ','Contabilità, buste paga e dichiarazioni',
 'Simples, Lucro Presumido o Lucro Real','Licenze, permessi e adempimenti annuali','Richiedere l’apertura di una società'],
['Ingresso nel mercato','Portiamo dentro la sua azienda',
 'Lei ha già un’azienda. Noi la portiamo in Brasile: struttura giuridica, entità locale, partner, distribuzione e le persone che la manderanno avanti ogni giorno.',
 'Filiale, controllata o joint venture','Import, dogana e certificazione',
 'Distribuzione e partner locali','Assunzioni e conformità del lavoro','Richiedere l’ingresso nel mercato'],
['Analisi di mercato','I numeri prima delle decisioni',
 'Una lettura sobria di quanto convenga entrare in questo mercato — data prima che lei spenda, non dopo. Domanda, concorrenti, margini e quanto costa davvero operare qui.',
 'Ricerca di mercato e di domanda','Analisi della concorrenza e dei prezzi',
 'Unit economics e costi operativi','Scelta della regione e della sede','Richiedere un’analisi'],
['Avvio dell’attività','Dal foglio bianco all’apertura',
 'Cominciare qualcosa di nuovo in Brasile da zero. Concept, registrazione, locale, personale, fornitori e i primi novanta giorni — con un solo responsabile lungo tutto il percorso.',
 'Concept e piano d’impresa','Registrazione e licenze',
 'Locale, allestimento e fornitori','Personale e i primi novanta giorni','Richiedere supporto all’avvio'],
['Affitto immobili','Stagionale · Lungo periodo · Fuori mercato',
 'Ville stagionali a Jurerê, attici a Itaim, una casa ad Angra per la stagione. Verificate prima che lei le veda e affittate con un contratto che la tutela.',
 'Ville stagionali e case sul mare','Appartamenti e attici a lungo termine',
 'Immobili fuori dal mercato aperto','Contratti, cauzioni e allestimento della casa','Richiedere un affitto'],
['Acquisto e affitto immobili','Acquisire per viverci',
 'Comprare casa in Brasile da straniero è legale e lineare — a condizione che il titolo sia pulito, che il venditore sia chi dice di essere e che qualcuno legga ogni riga.',
 'Ricerca e accesso fuori mercato','Titolo, debiti e gravami',
 'Trattativa ed escritura','Registrazione, imposte e utenze','Richiedere un acquisto'],
['Immobili da reddito e assistenza','Analisi · Due diligence · Rogito',
 'Se la redditività è reale, se l’edificio è sano, se il prezzo ha senso. E poi tutta la parte cartacea, dalla prima offerta al titolo trascritto.',
 'Analisi di rendimento e di uscita','Due diligence tecnica e legale',
 'Trattativa e strutturazione dell’operazione','Rogito, trascrizione e consegna','Richiedere assistenza sull’operazione'],
['Conti d’investimento','Far entrare il denaro legalmente',
 'Un conto d’investimento aperto perché il denaro arrivi in Brasile legalmente e senza tre settimane di silenzio. Capitale registrato presso la banca centrale — quindi può anche uscire.',
 'Conti d’investimento e di intermediazione','Bonifici internazionali verso il Brasile',
 'Registrazione del capitale in banca centrale','Compliance e origine dei fondi','Richiedere l’apertura di un conto'],
['Cambio valuta','Online e allo sportello',
 'Valuta a un tasso che lei vede prima di accettarlo. Online per gli importi ordinari, di persona e su appuntamento per quelli che contano.',
 'Cambio online a tasso bloccato','Cambio di persona su appuntamento',
 'Importi elevati con preavviso','Ricevute e documentazione completa','Richiedere un cambio'],
['Transfer San Paolo – Florianópolis','700 km · Porta a porta',
 'Settecento chilometri di BR-101, fatti come si deve: auto blindata se la vuole, un autista che ha percorso questa strada cento volte e la sosta dove decide lei.',
 'Porta a porta, San Paolo–Florianópolis','Veicoli blindati o standard',
 'Partenze diurne e notturne','Bagagli, animali e seggiolini','Richiedere questo transfer'],
['Transfer in tutto il Brasile','Da San Paolo, ovunque',
 'Da San Paolo verso qualsiasi punto del paese — Rio, Angra, Búzios, Campos do Jordão, l’interno. Un’auto, un autista, un prezzo concordato prima di partire.',
 'Qualsiasi destinazione da San Paolo','Aeroporti, porti e terminal privati',
 'Itinerari di più giorni e più città','Prezzo fisso concordato in anticipo','Richiedere un transfer'],
['Guida turistica','Il Brasile con chi lo conosce',
 'Una guida che sa da quale porta entrare, quale ristorante vale il viaggio e quale spiaggia si svuota dopo le quattro. In tutto il paese, non in una sola città.',
 'Guida privata in qualsiasi stato','Centri storici, natura e costa',
 'Ristoranti, mercati e quartieri','Servizio fotografico e riprese con drone','Richiedere una guida'],
['Servizi di viaggio','Prenotato e organizzato',
 'Voli, hotel, itinerari, biglietti, assicurazione e permessi. Tutto ciò che di solito costa una settimana di schede aperte, fatto da qualcun altro mentre lei fa qualcosa di utile.',
 'Voli, hotel e pousadas','Pianificazione dell’itinerario tra stati',
 'Biglietti, permessi e accesso ai parchi','Assicurazione e documenti di viaggio','Richiedere l’organizzazione del viaggio'],
['Accompagnatore personale','Una persona, per tutto il soggiorno',
 'Una persona che resta con lei dall’atterraggio alla partenza. Traduce, guida, prenota, discute con l’hotel — e sa quando non dire nulla.',
 'Un accompagnatore per tutto il soggiorno','Traduzione, guida e prenotazioni',
 'Disponibile ventiquattro ore su ventiquattro','La riservatezza come condizione del lavoro','Richiedere un accompagnatore'],
['Protezione personale','Autorizzata · Anticipata · Invisibile',
 'Agenti autorizzati di protezione personale, percorsi ispezionati il giorno prima, residenze presidiate di notte. Quella presenza che si nota solo il giorno in cui non c’è.',
 'Squadre di protezione personale','Ispezione preventiva di percorsi e sedi',
 'Sicurezza di residenze ed eventi','Valutazione del rischio e briefing di viaggio','Richiedere protezione'],
['Famiglia e maternità','Cure · Scuole · Documenti',
 'Ostetrici e suite di maternità private a San Paolo, tate bilingui che restano anni nelle stesse famiglie, inserimento in scuole internazionali e ogni documento che segue una nascita in Brasile.',
 'Gravidanza e parto','Tate e personale domestico verificati',
 'Inserimento in scuole internazionali','Anagrafe, documenti e cittadinanza','Richiedere assistenza alla famiglia']
    ],
    dest: [
['Florianópolis','Jurerê Internacional, quarantadue spiagge e l’indirizzo estivo del denaro di San Paolo. Ville, beach club e una stagione che va da dicembre a marzo.'],
['Rio de Janeiro','Leblon e Ipanema, transfer in elicottero sopra la baia e una città che non ha mai trattato sulla propria bellezza. Il Carnevale si prenota con un anno di anticipo.'],
['San Paolo','Dove gli affari si fanno davvero. Itaim e Jardins, la più grande flotta civile di elicotteri dell’emisfero e gli ospedali per cui si attraversa il continente.'],
    ],
    step: [
['Lei chiede','Un messaggio, a qualsiasi ora, nella sua lingua. WhatsApp, Telegram o il modulo qui sotto.'],
['Noi rispondiamo','Un concierge con nome e cognome risponde, fa le due domande che lei aveva dimenticato e dà una cifra ferma.'],
['Noi organizziamo','Fornitori verificati, contratti firmati, caparre versate, autisti ed equipaggio istruiti sulle sue preferenze.'],
['È fatto','Lei arriva. Tutto è già dove deve essere, e a nessuno serve ripeterlo due volte.']
    ]
  };

  /* ══════════════════════════════════════════════════════════════════
     Механика
     ══════════════════════════════════════════════════════════════════ */

  var STORE = 'la-concierge-lang';
  var base = null;          // русский, снятый с разметки
  var current = BASE;

  function nodes() {
    return document.querySelectorAll(
      '[data-i18n],[data-i18n-html],[data-i18n-ph],[data-i18n-content],[data-i18n-aria]');
  }

  function keyOf(el) {
    return el.getAttribute('data-i18n') ||
           el.getAttribute('data-i18n-html') ||
           el.getAttribute('data-i18n-ph') ||
           el.getAttribute('data-i18n-content') ||
           el.getAttribute('data-i18n-aria');
  }

  function read(el) {
    if (el.hasAttribute('data-i18n-html'))    return el.innerHTML;
    if (el.hasAttribute('data-i18n-ph'))      return el.getAttribute('placeholder') || '';
    if (el.hasAttribute('data-i18n-content')) return el.getAttribute('content') || '';
    if (el.hasAttribute('data-i18n-aria'))    return el.getAttribute('aria-label') || '';
    return el.textContent;
  }

  function write(el, v) {
    if (el.hasAttribute('data-i18n-html'))         el.innerHTML = v;
    else if (el.hasAttribute('data-i18n-ph'))      el.setAttribute('placeholder', v);
    else if (el.hasAttribute('data-i18n-content')) el.setAttribute('content', v);
    else if (el.hasAttribute('data-i18n-aria'))    el.setAttribute('aria-label', v);
    else el.textContent = v;
  }

  /* Первый проход: запоминаем русский прямо из разметки. Словарь для
     основы не нужен, и рассинхрон невозможен по построению. */
  function capture() {
    base = {};
    Array.prototype.forEach.call(nodes(), function (el) {
      var k = keyOf(el);
      if (!k || base[k] !== undefined) return;
      base[k] = read(el);
    });
  }

  /* svc.7.tag → DICT[lang].svc[7][1] */
  function fromArray(d, key) {
    var m = /^(svc|dest|step)\.(\d+)\.(\w+)$/.exec(key);
    if (!m || !d[m[1]]) return undefined;
    var row = d[m[1]][+m[2]];
    if (!row) return undefined;
    var fields = m[1] === 'svc' ? SVC : (m[1] === 'dest' ? ['name', 'txt'] : ['h', 'p']);
    var i = fields.indexOf(m[3]);
    return i < 0 ? undefined : row[i];
  }

  /* Русский всегда берём из разметки, остальные — из словаря. Если в
     словаре дырка, показываем русский, а не пустоту. */
  function t(key, fallback) {
    if (current === BASE) return (base && base[key] !== undefined) ? base[key] : fallback;
    var d = DICT[current];
    if (!d) return (base && base[key] !== undefined) ? base[key] : fallback;
    var v = d[key];
    if (v === undefined) v = fromArray(d, key);
    if (v === undefined) v = (base && base[key] !== undefined) ? base[key] : fallback;
    return v;
  }

  function apply(code) {
    if (!base) capture();
    current = (code === BASE || DICT[code]) ? code : BASE;
    document.documentElement.setAttribute('lang', current);

    Array.prototype.forEach.call(nodes(), function (el) {
      var k = keyOf(el);
      if (!k) return;
      var v = t(k, null);
      if (v === null || v === undefined) return;
      write(el, v);
    });

    try { localStorage.setItem(STORE, current); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: current } }));
  }

  function saved() {
    try { return localStorage.getItem(STORE); } catch (e) { return null; }
  }

  /* Подсказываем язык по браузеру, но не навязываем: выбор всё равно
     делает посетитель, мы лишь подсвечиваем вероятный. */
  function guess() {
    var list = navigator.languages || [navigator.language || BASE];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).slice(0, 2).toLowerCase();
      for (var j = 0; j < LANGS.length; j++) {
        if (LANGS[j].code === code) return code;
      }
    }
    return BASE;
  }

  global.I18N = {
    base: BASE,
    langs: LANGS,
    dict: DICT,
    t: t,
    apply: apply,
    saved: saved,
    guess: guess,
    get current() { return current; },
    capture: capture
  };
})(window);
