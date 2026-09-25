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
    'meta.title': 'MONTERO — Concierge Service',
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
    'lp.tag0': 'Driven · Comfortable',
    'lp.tag1': 'Crewed · Provisioned',
    'lp.tag2': 'Flights · Transfers',
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
    'sec.svc.lede': 'Our services are limitless. In 99% of cases the answer to "What can you do...?" is WE CAN DO ALMOST ANYTHING!',
    'sec.dest.label': 'Destinations',
    'sec.dest.h': 'Where we <span class="h-cap">work</span>',
    'sec.dest.lede': 'We also provide remote support and settle many matters across the whole South American continent.',
    'dest.country.br': 'Brazil',
    'dest.country.ar': 'Argentina',
    'dest.country.py': 'Paraguay',
    'dest.ar.city': 'Buenos Aires',
    'dest.ar.txt': 'Recoleta and Palermo, the finest steakhouses and wine cellars on the continent, dinner that starts at eleven. A city that speaks Spanish with a European accent.',
    'dest.py.city': 'Asunción',
    'sec.conc.label': 'The Concierge',
    'sec.conc.h': '<span class="ln">One request is yours</span><span class="ln"><span class="h-cap">The rest is our business</span></span>',

    'conc.pull': '<span class="pl">One contact for anything you need in Latin America.</span>',
    'conc.p1': 'From a simple everyday errand to a complex matter involving lawyers, brokers, drivers or other specialists — you never have to find the people or coordinate them yourself.',
    'conc.p2': 'You simply hand the task to your concierge. We arrange everything else and carry it through to the result.',
    'conc.p3': 'Confidential. Personal. No extra calls, no message threads, no wasted time.',
    'conc.p4': '<b>It all starts with one message.</b><br>Tell us what you need. Even if you do not yet know who could solve it — that part is already our job.',
    'conc.signName': '<span class="sl">Concierge service across</span> <span class="sl">all of Latin America</span>',

    'sec.req.label': 'The Request',
    'sec.req.h': 'Let us take care of <span class="h-cap">everything.</span>',
    'sec.req.lede': 'Send us your request and we will be in touch.',

    'direct.wa': 'WhatsApp',
    'direct.tg': 'Telegram',
    'direct.tel': 'Telephone',


    'final.claim1': 'Everything you need in Brazil, Argentina',
    'final.claim2': 'on a single phone no.: +55-48-99648-1563',

    'foot.brand': 'Time <em>—</em> the highest form of luxury, and we look after it',
    'foot.privacy': 'Privacy',
    'foot.terms': 'Terms',

    'legal.stub': 'The %s document is not published yet.',

    'lang.title': 'Choose your language',
    'lang.sub': 'You can change it at any time — the switch sits in the header.',
    'lang.btn': 'Language',

    'form.fullName': 'Name',
    'form.whatsapp': 'WhatsApp | Telegram number',
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
['Armored Vehicle Rental','Driven · Comfortable · Safe',
 'An armored SUV at the hotel entrance at four in the morning, engine warm, driver already briefed. On domestic plates, papers in order, protection level to your requirement.',
 'Armored SUVs, sedans and vans','Protection levels B4 to B7',
 'Security-trained drivers','By the day, the week or the month','Request an armored vehicle'],
['Yacht & Boat Charter','Crewed · Provisioned · Private',
 'A crewed yacht, prepared entirely around your wishes. Or a fast boat for as long as you like. Routes built to order, the finest stretches of coast, and complete freedom of movement on the water.',
 'Crewed motor yachts and sailing','Jet skis and speedboats',
 'Islands, beaches and resorts across the continent','Chef, provisioning and diving','Request a yacht'],
['Helicopter Charter','Flights · Transfers · Scenic routes',
 'São Paulo to Buenos Aires without the hours on the road and the connections. City hops between helipads, transfers across Latin America, clearance arranged before you arrive.',
 'City transfers between helipads','Coastal and island runs',
 'Scenic flights over Rio, Foz do Iguaçu and more','Landing permissions and ground handling','Request a helicopter'],
['VIP Event Production','Full production · Private',
 'We produce private events of any format — from a dinner for a small group to a large closed evening. We find the venue, the staff and everything the event calls for.',
 'Private dinners, parties and celebrations','Venue sourcing and full production',
 'VIP areas and access to closed events','Chefs, musicians, security, photographers','Request an event'],
['Interpreters','Portuguese · English · Spanish · Russian',
 'An interpreter helps you talk at meetings and settle what matters without a language barrier.',
 'Consecutive and simultaneous interpreting','Business and negotiation settings',
 'Notary, bank and clinic appointments','Sworn translation of documents','Request an interpreter'],
['Residency & Citizenship','Visas · Naturalisation',
 'Temporary residence, permanent residence, citizenship. We hold the file, chase the deadlines and tell you what is actually happening — in your language, not in Portuguese legalese.',
 'Residency by investment, work and family','Permanent residence',
 'Naturalisation and passport','Help with documents for the whole family','Request residency support'],
['Legal Services','Counsel · Contracts · Legal matters',
 'Attorneys help you make sense of documents, contracts and legal questions before you take an important decision.',
 'Corporate and contract law','Property and title disputes',
 'Family, inheritance and immigration','Drafting and review of documents','Request legal support'],
['Accounting & Company Formation','CNPJ · Books · Filings',
 'We register the company properly and keep the books. We prepare the filings and watch the deadlines, so none of it lands on you.',
 'Company formation, CPF and CNPJ','Bookkeeping, payroll and tax filing',
 'Choosing the tax regime','Licences, permits, annual compliance','Request company setup'],
['Market Entry','Bringing your business in',
 'If you already have a business, we help you bring it into South America: we open the company, find the partners and set the work up on the ground.',
 'Branch, subsidiary or sole proprietorship','Import, customs and certification',
 'Distribution and local partners','Hiring and labour compliance','Request market entry'],
['Business Analytics','Data · Market · Costs',
 'We check the market, the demand, the competitors and the costs, to see how your business would work in South America.',
 'Market and demand research','Competitor and pricing analysis',
 'Revenue and cost projections','Site and region selection','Request analytics'],
['Business Launch Support','From nothing to open',
 'We help you start something new in South America from a blank page. We draw up the plan, register the company, find the premises, hire the staff and get everything ready to open.',
 'Concept and business plan','Registration and licences',
 'Premises, fit-out and suppliers','Staffing and getting the operation running','Request launch support'],
['Property Rental','Seasonal · Long-term · Off-market',
 'Seasonal villas in Jurerê, penthouses in Itaim, a house in Angra for the season. Inspected before you are shown them, and rented on a contract that protects you.',
 'Seasonal villas and beach houses','Long-term apartments and penthouses',
 'Off-market listings','Contracts, deposits and household setup','Request a rental'],
['Buying and renting homes','Acquiring a place to live',
 'Buying a home in South America as a foreigner is legal and safe. We check the property, the seller, the papers and every detail that matters.',
 'Search and off-market access','Verification of ownership',
 'Negotiation and closing','Registration, taxes and utilities','Request a purchase'],
['Investment Property & Deal Support','Analysis · Diligence · Deal closing',
 'We check whether the property is worth its price, what condition it is in and what income it can bring. We run the deal and put every document in order.',
 'Yield and exit analysis','Technical and legal due diligence',
 'Negotiation and deal terms','Closing, registration and handover of the property','Request deal support'],
['Investment Accounts','Opening · Transfer · Paperwork',
 'We open the account, move the money into South America and prepare the documents the bank and the financial institutions ask for.',
 'Investment and brokerage accounts','Transfers of money from abroad',
 'Registering the capital with the central bank','Proof of the source of funds','Request an account'],
['Currency Exchange','Online and across a desk',
 'We arrange currency exchange through licensed financial institutions authorised to carry out foreign exchange operations. We find the option that suits your amount and your purpose, agree the terms and help arrange the transaction — online or in person.',
 'Online exchange at an agreed rate','In-person exchange by appointment',
 'Handling large amounts','Receipts and the necessary documents','Request an exchange'],
['Transfer São Paulo – Florianópolis','700 km · Door to door',
 'Seven hundred kilometres of the BR-101, done properly: an armored car if you want one, a driver who has run this road a hundred times, and a stop wherever you choose.',
 'Door to door, São Paulo to Florianópolis','Armored or standard vehicles',
 'Overnight and daytime departures','Luggage, pets and child seats','Request this transfer'],
['Transfers','City to city, country to country',
 'Intercity and cross-border road transfers across the continent: São Paulo, Rio, Florianópolis, Buenos Aires, Asunción, Ciudad del Este — and anywhere in between. One car, one driver, one price agreed before departure.',
 'Routes across Brazil, Argentina and Paraguay','Airports, ports and private terminals',
 'Multi-day routes and border crossings','Fixed price agreed in advance','Request a transfer'],
['Travel Guide','The whole continent, with someone who knows it',
 'A guide who shows you the places worth seeing, the good restaurants and the beautiful routes. We arrange trips across Brazil, Argentina, Paraguay and the rest of South America.',
 'Private guiding in any South American country','Historic places, nature and coastline',
 'Restaurants, markets and interesting neighbourhoods','Photography and drone coverage','Request a guide'],
['Full Travel Services','Tickets · Hotels · Routes',
 'We arrange the whole trip: the flights, the hotels, the route, the tickets and the documents you need.',
 'Flights, hotels and apartments','Route planning across countries',
 'Tickets, permits and park access','Insurance and travel documents','Request travel arrangements'],
['Personal Companion','One person for the whole trip · 24/7',
 'We arrange personal help for the whole trip: translation, transport, bookings and sorting things out on the spot.',
 'Help throughout the trip','Translation and communication',
 'Driving and arranging journeys','Bookings and sorting things out','Request a companion'],
['Executive Protection','Licensed guards · Personal escort',
 'We arrange private security through vetted partner agencies — licensed security companies holding every permit required to carry out security work in the countries of Latin America.',
 'Close protection teams','Advance route and venue surveys',
 'Residential and event security','Risk assessment and travel briefings','Request protection'],
['Family & Maternity','Care · Schooling · Papers',
 'Obstetricians and private maternity suites in São Paulo, bilingual nannies who have stayed with the same families for years, school placement, and every document that follows a birth in South America.',
 'Maternity and obstetric care','Vetted nannies and household staff',
 'International school placement','Registry, documentation and citizenship','Request family assistance'],
['Private Events','By invitation · Built from scratch',
 'Access to places where a ticket simply cannot be bought. Private parties, members-only clubs, premieres and invitation-only VIP events. And if the event you want does not exist, we create it for you from scratch: a yacht, a private island, a villa or any other location. Full turnkey production to your own scenario — from the idea to the last detail.'],
['Support Across Brazil','A personal representative for the whole trip',
 'Your personal representative beside you for the whole trip. Our own member of staff physically accompanies you, your family or your delegation anywhere in Brazil, acting at once as interpreter, guide and personal concierge. They handle the itinerary, your safety and any question that arises on the spot — one person always at your side who takes every concern off your hands.'],
['Turnkey Tourism Remanso Travel','Signature routes · Hotels · Expeditions',
 'Together with Remanso Travel — an official tour operator in Brazil, founded by a Russian-speaking team — we arrange travel across the country entirely turnkey. Signature routes, expeditions, hotels and villas, transfers, yachts, guides and bespoke programmes — the whole of Brazil with one team that speaks your language.'],
['Transport & Logistics','From a car to a private jet',
 'We arrange any movement across Brazil — from a car to a private jet. Car rental with or without a driver, premium vehicles, transfers, minibuses for groups and delegations, private aviation, helicopters, boats and yachts. We match the transport to the task, build the logistics and organise the entire route from the point of departure to the destination.']
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
    'meta.title': 'MONTERO — Concierge Service',
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
    'sec.svc.lede': 'Nossos serviços são ilimitados. Em 99% dos casos, a resposta para "O que vocês conseguem...?" é CONSEGUIMOS PRATICAMENTE TUDO!',

    'lp.slogan1': 'Seu tempo.',
    'lp.slogan2': 'Nossa responsabilidade.',
    'lp.phil.label': 'Filosofia Montero',
    'lp.phil.h1': 'Seu tempo.',
    'lp.phil.h2': 'Seu luxo.',
    'lp.phil.txt': 'Assumimos tudo o que exige tempo,<br>recursos e contatos. Você recebe o resultado<br>— sem esforço extra e sem pessoas a mais.',
    'lp.phil.sign': 'Concierge privado — MONTERO',
    'lp.svc.label': 'Serviços',
    'lp.svc0': 'Carros blindados',
    'lp.tag0': 'Com motorista · Confortável',
    'lp.tag1': 'Com tripulação · Abastecido',
    'lp.tag2': 'Voos · Transfers',
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
    'dest.ar.txt': 'Recoleta e Palermo, as melhores churrascarias e adegas do continente, jantar que começa às onze da noite. Uma cidade que fala espanhol com sotaque europeu.',
    'dest.py.city': 'Assunção',
    'sec.conc.label': 'O Concierge',
    'sec.conc.h': '<span class="ln">Um pedido é seu</span><span class="ln"><span class="h-cap">O restante é conosco</span></span>',

    'conc.pull': '<span class="pl">Um único contato para qualquer necessidade na América Latina.</span>',
    'conc.p1': 'De um pedido simples do dia a dia a uma questão complexa que envolve advogados, corretores, motoristas ou outros especialistas — você não precisa procurar os executores nem coordená-los sozinho.',
    'conc.p2': 'Você apenas passa a tarefa ao seu concierge. Nós organizamos todo o resto e levamos a questão até o resultado.',
    'conc.p3': 'Confidencial. Pessoal. Sem ligações extras, sem trocas de mensagens, sem perda de tempo.',
    'conc.p4': '<b>Tudo começa com uma mensagem.</b><br>Diga o que precisa. Mesmo que ainda não saiba quem pode resolver — isso já é tarefa nossa.',
    'conc.signName': '<span class="sl">Serviço de concierge em</span> <span class="sl">toda a América Latina</span>',

    'sec.req.label': 'A Solicitação',
    'sec.req.h': 'Deixe que cuidemos de <span class="h-cap">tudo.</span>',
    'sec.req.lede': 'Envie sua solicitação e entraremos em contato.',

    'direct.wa': 'WhatsApp',
    'direct.tg': 'Telegram',
    'direct.tel': 'Telefone',


    'final.claim1': 'Tudo o que você precisa no Brasil, na Argentina',
    'final.claim2': 'em um único telefone: +55-48-99648-1563',

    'foot.brand': 'O tempo <em>—</em> a forma mais alta de luxo, e nós cuidamos dele',
    'foot.privacy': 'Privacidade',
    'foot.terms': 'Termos',

    'legal.stub': 'O documento %s ainda não foi publicado.',

    'lang.title': 'Escolha o seu idioma',
    'lang.sub': 'Pode mudar a qualquer momento — o seletor fica no topo.',
    'lang.btn': 'Idioma',

    'form.fullName': 'Nome',
    'form.whatsapp': 'Número de WhatsApp | Telegram',
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
['Aluguel de blindados','Com motorista · Confortável · Seguro',
 'Um SUV blindado na porta do hotel às quatro da manhã, motor quente, motorista já orientado. Com placas nacionais, documentação em ordem, nível de blindagem conforme a sua necessidade.',
 'SUVs, sedãs e vans blindados','Níveis de blindagem B4 a B7',
 'Motoristas com treinamento de segurança','Por dia, por semana ou por mês','Solicitar um blindado'],
['Iates e lanchas','Com tripulação · Abastecido · Privado',
 'Um iate tripulado, preparado inteiramente conforme os seus desejos. Ou uma lancha rápida pelo tempo que quiser. Roteiros sob medida, os melhores litorais e total liberdade de movimento na água.',
 'Iates a motor e veleiros com tripulação','Jet skis e lanchas',
 'Ilhas, praias e resorts do continente','Chef, provisões e mergulho','Solicitar um iate'],
['Fretamento de helicóptero','Voos · Transfers · Roteiros panorâmicos',
 'São Paulo a Buenos Aires sem horas de estrada nem conexões. Saltos entre helipontos urbanos, transferências pela América Latina e autorizações resolvidas antes de você chegar.',
 'Transferências entre helipontos urbanos','Litoral e ilhas',
 'Voos panorâmicos sobre o Rio, Foz do Iguaçu e mais','Autorizações de pouso e apoio em solo','Solicitar um helicóptero'],
['Eventos VIP','Organização completa · Privado',
 'Organizamos eventos privados de qualquer formato — de um jantar para poucos a uma grande noite fechada. Encontramos o local, a equipe e tudo o que o evento exigir.',
 'Jantares, festas e celebrações privadas','Busca de espaço e produção completa',
 'Áreas VIP e acesso a eventos fechados','Chefs, músicos, segurança, fotógrafos','Solicitar um evento'],
['Intérpretes','Português · Inglês · Espanhol · Russo',
 'O intérprete ajuda a conversar nas reuniões e a resolver o que importa sem barreira de idioma.',
 'Interpretação consecutiva e simultânea','Negociações e reuniões de negócios',
 'Cartório, banco e consultas médicas','Tradução juramentada de documentos','Solicitar um intérprete'],
['Residência e cidadania','Vistos · Naturalização',
 'Residência temporária, residência permanente, cidadania. Nós seguramos o processo, corremos atrás dos prazos e contamos o que está realmente acontecendo — no seu idioma, não em juridiquês.',
 'Residência por investimento, trabalho e família','Residência permanente',
 'Naturalização e passaporte','Ajuda com documentos para toda a família','Solicitar apoio de residência'],
['Serviços jurídicos','Advogados · Contratos · Questões jurídicas',
 'Os advogados ajudam a entender documentos, contratos e questões jurídicas antes de decisões importantes.',
 'Direito societário e contratual','Imóveis e disputas de titularidade',
 'Família, sucessões e imigração','Elaboração e análise de documentos','Solicitar apoio jurídico'],
['Contabilidade e abertura de empresas','CNPJ · Escrita · Obrigações',
 'Abrimos a empresa corretamente e cuidamos da contabilidade. Preparamos as obrigações e acompanhamos os prazos, para que nada disso fique com você.',
 'Abertura de empresa, CPF e CNPJ','Escrituração, folha e obrigações fiscais',
 'Escolha do regime tributário','Licenças, alvarás e compliance anual','Solicitar abertura de empresa'],
['Entrada no mercado','Trazendo o seu negócio',
 'Se você já tem um negócio, ajudamos a trazê-lo para a América do Sul: abrimos a empresa, encontramos parceiros e organizamos a operação no local.',
 'Filial, subsidiária ou empresário individual','Importação, aduana e certificação',
 'Distribuição e parceiros locais','Contratação e conformidade trabalhista','Solicitar entrada no mercado'],
['Análise de negócios','Dados · Mercado · Custos',
 'Verificamos o mercado, a demanda, os concorrentes e os custos, para entender como o seu negócio vai funcionar na América do Sul.',
 'Pesquisa de mercado e demanda','Análise de concorrência e preços',
 'Cálculo de receitas e custos','Escolha de região e ponto','Solicitar análise'],
['Abertura de negócio','Do zero até abrir as portas',
 'Ajudamos a começar algo novo na América do Sul a partir de uma folha em branco. Montamos o plano, registramos a empresa, encontramos o ponto, contratamos a equipe e preparamos tudo para a abertura.',
 'Conceito e plano de negócio','Registro e licenças',
 'Ponto, obra e fornecedores','Equipe e início da operação','Solicitar apoio de abertura'],
['Aluguel de imóveis','Temporada · Longo prazo · Fora do mercado',
 'Casas de temporada em Jurerê, coberturas no Itaim, uma casa em Angra para a estação. Vistoriadas antes de você conhecê-las e alugadas num contrato que protege você.',
 'Casas de temporada e casas de praia','Apartamentos e coberturas de longo prazo',
 'Imóveis fora do mercado aberto','Contratos, cauções e montagem da casa','Solicitar um aluguel'],
['Compra e aluguel de imóveis','Adquirir para morar',
 'Comprar uma casa na América do Sul sendo estrangeiro é legal e seguro. Verificamos o imóvel, o vendedor, os documentos e todos os detalhes que importam.',
 'Busca e acesso a imóveis fora do mercado','Verificação da titularidade',
 'Negociação e fechamento','Registro, impostos e serviços','Solicitar uma compra'],
['Imóveis de investimento e assessoria','Análise · Diligência · Fechamento do negócio',
 'Verificamos se o imóvel vale o preço, em que estado está e que renda pode gerar. Conduzimos o negócio e deixamos toda a documentação em ordem.',
 'Análise de rentabilidade e saída','Due diligence técnica e jurídica',
 'Negociação e condições do negócio','Fechamento, registro e entrega do imóvel','Solicitar assessoria de negócio'],
['Contas de investimento','Abertura · Transferência · Documentos',
 'Abrimos a conta, trazemos o dinheiro para a América do Sul e preparamos os documentos exigidos pelo banco e pelas instituições financeiras.',
 'Contas de investimento e corretora','Transferência de dinheiro do exterior',
 'Registro do capital no Banco Central','Comprovação da origem dos recursos','Solicitar abertura de conta'],
['Câmbio','Online e no balcão',
 'Organizamos o câmbio por meio de instituições financeiras licenciadas, autorizadas a realizar operações cambiais. Encontramos a opção adequada ao seu valor e à sua finalidade, acertamos as condições e ajudamos a realizar a operação — online ou presencialmente.',
 'Câmbio online com taxa combinada','Câmbio presencial com hora marcada',
 'Operações com valores altos','Comprovantes e documentos necessários','Solicitar câmbio'],
['Transfer São Paulo – Florianópolis','700 km · Porta a porta',
 'Setecentos quilômetros de BR-101, feitos direito: carro blindado se você quiser, um motorista que já fez essa estrada cem vezes e a parada onde você escolher.',
 'Porta a porta, São Paulo a Florianópolis','Veículos blindados ou comuns',
 'Saídas diurnas e noturnas','Bagagem, animais e cadeirinhas','Solicitar este transfer'],
['Transfers','De cidade em cidade, de país em país',
 'Transfers intermunicipais e internacionais pelo continente: São Paulo, Rio, Florianópolis, Buenos Aires, Assunção, Ciudad del Este — e qualquer ponto entre eles. Um carro, um motorista, um preço combinado antes da saída.',
 'Rotas pelo Brasil, Argentina e Paraguai','Aeroportos, portos e terminais privados',
 'Roteiros de vários dias e travessias de fronteira','Preço fixo acertado com antecedência','Solicitar um transfer'],
['Guia de viagem','O continente inteiro com quem conhece',
 'Um guia que mostra os lugares que valem a pena, os bons restaurantes e os roteiros bonitos. Organizamos viagens pelo Brasil, Argentina, Paraguai e outros países da América do Sul.',
 'Guia privado em qualquer país da América do Sul','Lugares históricos, natureza e litoral',
 'Restaurantes, mercados e bairros interessantes','Cobertura fotográfica e com drone','Solicitar um guia'],
['Serviços de viagem','Passagens · Hotéis · Roteiros',
 'Organizamos a viagem inteira: voos, hotéis, roteiro, ingressos e os documentos necessários.',
 'Voos, hotéis e apartamentos','Planejamento de roteiro entre países',
 'Ingressos, autorizações e acesso a parques','Seguro e documentos de viagem','Solicitar organização de viagem'],
['Acompanhante pessoal','Uma pessoa, a viagem inteira · 24/7',
 'Organizamos ajuda pessoal para toda a viagem: tradução, transporte, reservas e resolução de questões no local.',
 'Apoio durante toda a viagem','Tradução e comunicação',
 'Direção e organização dos deslocamentos','Reservas e resolução de questões','Solicitar um acompanhante'],
['Proteção executiva','Seguranças licenciados · Acompanhamento pessoal',
 'Organizamos a segurança privada por meio de agências parceiras verificadas — empresas de segurança licenciadas, com todas as autorizações necessárias para a atividade de segurança nos países da América Latina.',
 'Equipes de proteção pessoal','Vistoria prévia de rotas e locais',
 'Segurança residencial e de eventos','Avaliação de risco e briefings de viagem','Solicitar proteção'],
['Família e maternidade','Cuidado · Escolas · Documentos',
 'Obstetras e suítes de maternidade privadas em São Paulo, babás bilíngues que ficam anos com as mesmas famílias, vaga em escola internacional e cada documento que segue um nascimento na América do Sul.',
 'Pré-natal e parto','Babás e equipe doméstica verificadas',
 'Vaga em escolas internacionais','Cartório, documentação e cidadania','Solicitar apoio à família'],
['Eventos fechados','Somente com convite · Criado do zero',
 'Acesso onde não basta comprar um ingresso. Festas privadas, clubes fechados, estreias e eventos VIP apenas por convite. E se o evento desejado não existe, nós o criamos do zero para você: um iate, uma ilha privada, uma villa ou qualquer outro local. Organização completa, chave na mão, conforme o seu roteiro — da ideia ao último detalhe.'],
['Acompanhamento em todo o Brasil','Um representante pessoal em toda a viagem',
 'Seu representante pessoal ao seu lado durante toda a viagem. Nosso profissional acompanha fisicamente você, sua família ou sua delegação em qualquer ponto do Brasil, atuando ao mesmo tempo como intérprete, guia e concierge pessoal. Ele cuida do roteiro, da sua segurança e da solução de qualquer questão no local — uma única pessoa sempre ao seu lado, que assume todas as preocupações.'],
['Turismo chave na mão Remanso Travel','Roteiros autorais · Hotéis · Expedições',
 'Junto com a Remanso Travel — operadora de turismo oficial no Brasil, criada por uma equipe de língua russa — organizamos viagens pelo país totalmente chave na mão. Roteiros autorais, expedições, hotéis e villas, transfers, iates, guias e programas individuais — todo o Brasil com uma equipe que fala a sua língua.'],
['Transporte e logística','Do automóvel ao jato privado',
 'Organizamos qualquer deslocamento pelo Brasil — do automóvel ao jato privado. Aluguel de carros com e sem motorista, veículos premium, transfers, micro-ônibus para grupos e delegações, aviação privada, helicópteros, lanchas e iates. Escolhemos o transporte para cada necessidade, montamos a logística e organizamos todo o trajeto do ponto de partida até o destino.']
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
    'meta.title': 'MONTERO — Concierge Service',
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
    'sec.svc.lede': 'Nuestros servicios son ilimitados. En el 99% de los casos, la respuesta a "¿Qué pueden hacer...?" es ¡PODEMOS PRÁCTICAMENTE TODO!',

    'lp.slogan1': 'Su tiempo.',
    'lp.slogan2': 'Nuestra responsabilidad.',
    'lp.phil.label': 'Filosofía Montero',
    'lp.phil.h1': 'Su tiempo.',
    'lp.phil.h2': 'Su lujo.',
    'lp.phil.txt': 'Asumimos todo lo que exige tiempo,<br>recursos y contactos. Usted recibe el resultado<br>— sin esfuerzos ni personas de más.',
    'lp.phil.sign': 'Concierge privado — MONTERO',
    'lp.svc.label': 'Servicios',
    'lp.svc0': 'Autos blindados',
    'lp.tag0': 'Con chofer · Cómodo',
    'lp.tag1': 'Con tripulación · Aprovisionado',
    'lp.tag2': 'Vuelos · Traslados',
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
    'dest.ar.txt': 'Recoleta y Palermo, las mejores parrillas y bodegas del continente, una cena que empieza a las once. Una ciudad que habla español con acento europeo.',
    'dest.py.city': 'Asunción',
    'sec.conc.label': 'El Conserje',
    'sec.conc.h': '<span class="ln">Una petición es suya</span><span class="ln"><span class="h-cap">El resto es cosa nuestra</span></span>',

    'conc.pull': '<span class="pl">Un solo contacto para cualquier asunto en América Latina.</span>',
    'conc.p1': 'Desde una petición cotidiana hasta un asunto complejo que requiere abogados, corredores, choferes u otros especialistas — usted no tiene que buscar a los ejecutores ni coordinarlos.',
    'conc.p2': 'Usted simplemente le da la tarea a su conserje. Nosotros organizamos todo lo demás y llevamos el asunto hasta el resultado.',
    'conc.p3': 'Confidencial. Personal. Sin llamadas de más, sin cadenas de mensajes, sin pérdida de tiempo.',
    'conc.p4': '<b>Todo empieza con un mensaje.</b><br>Cuéntenos qué necesita. Aunque todavía no sepa quién puede resolverlo — eso ya es asunto nuestro.',
    'conc.signName': '<span class="sl">Servicio de conserjería en</span> <span class="sl">toda América Latina</span>',

    'sec.req.label': 'La Petición',
    'sec.req.h': 'Permítanos ocuparnos de <span class="h-cap">todo.</span>',
    'sec.req.lede': 'Envíenos su solicitud y nos pondremos en contacto.',

    'direct.wa': 'WhatsApp',
    'direct.tg': 'Telegram',
    'direct.tel': 'Teléfono',


    'final.claim1': 'Todo lo que necesita en Brasil, Argentina',
    'final.claim2': 'en un solo teléfono: +55-48-99648-1563',

    'foot.brand': 'El tiempo <em>—</em> la forma más alta de lujo, y nosotros lo cuidamos',
    'foot.privacy': 'Privacidad',
    'foot.terms': 'Términos',

    'legal.stub': 'El documento %s todavía no está publicado.',

    'lang.title': 'Elija su idioma',
    'lang.sub': 'Puede cambiarlo en cualquier momento — el selector está arriba.',
    'lang.btn': 'Idioma',

    'form.fullName': 'Nombre',
    'form.whatsapp': 'Número de WhatsApp | Telegram',
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
['Vehículos blindados','Con chofer · Cómodo · Seguro',
 'Un SUV blindado en la puerta del hotel a las cuatro de la mañana, motor caliente, chofer ya informado. Con matrícula nacional, papeles en regla, nivel de blindaje según su necesidad.',
 'SUV, sedanes y vans blindados','Niveles de blindaje B4 a B7',
 'Choferes con formación en seguridad','Por día, por semana o por mes','Solicitar un blindado'],
['Yates y lanchas','Con tripulación · Aprovisionado · Privado',
 'Un yate con tripulación, preparado por completo según sus deseos. O una lancha rápida por el tiempo que desee. Rutas a medida, las mejores costas y total libertad de movimiento en el agua.',
 'Yates a motor y veleros con tripulación','Motos de agua y lanchas',
 'Islas, playas y resorts del continente','Chef, provisiones y buceo','Solicitar un yate'],
['Alquiler de helicóptero','Vuelos · Traslados · Rutas panorámicas',
 'São Paulo a Buenos Aires sin horas de carretera ni escalas. Saltos entre helipuertos urbanos, traslados por América Latina y permisos resueltos antes de que usted llegue.',
 'Traslados entre helipuertos urbanos','Costa e islas',
 'Vuelos panorámicos sobre Río, Foz de Iguazú y más','Permisos de aterrizaje y asistencia en tierra','Solicitar un helicóptero'],
['Eventos VIP','Organización completa · Privado',
 'Organizamos eventos privados de cualquier formato — desde una cena para pocos hasta una gran velada cerrada. Encontramos el lugar, el personal y todo lo que el evento requiera.',
 'Cenas, fiestas y celebraciones privadas','Búsqueda de espacio y producción completa',
 'Zonas VIP y acceso a eventos cerrados','Chefs, músicos, seguridad, fotógrafos','Solicitar un evento'],
['Intérpretes','Portugués · Inglés · Español · Ruso',
 'El intérprete le ayuda a conversar en las reuniones y a resolver lo importante sin barrera de idioma.',
 'Interpretación consecutiva y simultánea','Negociaciones y reuniones de trabajo',
 'Notaría, banco y consultas médicas','Traducción jurada de documentos','Solicitar un intérprete'],
['Residencia y ciudadanía','Visados · Naturalización',
 'Residencia temporal, residencia permanente, ciudadanía. Nosotros sostenemos el expediente, perseguimos los plazos y le contamos lo que de verdad está pasando — en su idioma, no en jerga jurídica.',
 'Residencia por inversión, trabajo y familia','Residencia permanente',
 'Naturalización y pasaporte','Ayuda con los documentos de toda la familia','Solicitar apoyo de residencia'],
['Servicios jurídicos','Abogados · Contratos · Cuestiones jurídicas',
 'Los abogados le ayudan a entender documentos, contratos y cuestiones jurídicas antes de tomar decisiones importantes.',
 'Derecho societario y contractual','Inmuebles y disputas de titularidad',
 'Familia, sucesiones e inmigración','Elaboración y revisión de documentos','Solicitar apoyo jurídico'],
['Contabilidad y constitución de empresas','CNPJ · Libros · Declaraciones',
 'Constituimos la empresa correctamente y llevamos la contabilidad. Preparamos las declaraciones y vigilamos los plazos, para que nada de esto recaiga en usted.',
 'Constitución de empresa, CPF y CNPJ','Contabilidad, nóminas y declaraciones',
 'Elección del régimen tributario','Licencias, permisos y cumplimiento anual','Solicitar constitución de empresa'],
['Entrada al mercado','Traemos su negocio',
 'Si usted ya tiene un negocio, le ayudamos a traerlo a América del Sur: abrimos la empresa, buscamos socios y organizamos la operación en el lugar.',
 'Sucursal, filial o empresario individual','Importación, aduana y certificación',
 'Distribución y socios locales','Contratación y cumplimiento laboral','Solicitar entrada al mercado'],
['Analítica de negocio','Datos · Mercado · Costos',
 'Revisamos el mercado, la demanda, la competencia y los costos, para entender cómo funcionará su negocio en América del Sur.',
 'Estudio de mercado y demanda','Análisis de competencia y precios',
 'Cálculo de ingresos y costos','Elección de región y ubicación','Solicitar analítica'],
['Lanzamiento de negocio','De cero a abrir',
 'Le ayudamos a empezar algo nuevo en América del Sur desde una hoja en blanco. Preparamos el plan, registramos la empresa, buscamos el local, contratamos al personal y dejamos todo listo para abrir.',
 'Concepto y plan de negocio','Registro y licencias',
 'Local, obra y proveedores','Personal e inicio de la operación','Solicitar apoyo de lanzamiento'],
['Alquiler de inmuebles','Temporada · Largo plazo · Fuera de mercado',
 'Villas de temporada en Jurerê, áticos en Itaim, una casa en Angra para la estación. Inspeccionadas antes de que usted las vea y alquiladas con un contrato que le protege.',
 'Villas de temporada y casas de playa','Pisos y áticos de largo plazo',
 'Inmuebles fuera del mercado abierto','Contratos, fianzas y montaje del hogar','Solicitar un alquiler'],
['Compra y alquiler de vivienda','Adquirir para vivir',
 'Comprar una casa en América del Sur siendo extranjero es legal y seguro. Revisamos el inmueble, al vendedor, los documentos y todos los detalles que importan.',
 'Búsqueda y acceso fuera de mercado','Verificación de la titularidad',
 'Negociación y cierre','Registro, impuestos y suministros','Solicitar una compra'],
['Inmuebles de inversión y cierre','Análisis · Diligencia · Cierre de la operación',
 'Revisamos si el inmueble vale su precio, en qué estado está y qué renta puede dar. Llevamos la operación y dejamos toda la documentación en regla.',
 'Análisis de rentabilidad y salida','Due diligence técnica y jurídica',
 'Negociación y condiciones de la operación','Cierre, inscripción y entrega del inmueble','Solicitar acompañamiento'],
['Cuentas de inversión','Apertura · Transferencia · Documentos',
 'Abrimos la cuenta, llevamos el dinero a América del Sur y preparamos los documentos que piden el banco y las entidades financieras.',
 'Cuentas de inversión y de bróker','Transferencia de dinero desde el exterior',
 'Registro del capital en el banco central','Comprobación del origen de los fondos','Solicitar apertura de cuenta'],
['Cambio de divisas','Online y en mostrador',
 'Organizamos el cambio de divisas a través de entidades financieras licenciadas, autorizadas para realizar operaciones de cambio. Buscamos la opción adecuada a su importe y su objetivo, acordamos las condiciones y ayudamos a realizar la operación — online o en persona.',
 'Cambio online con tipo acordado','Cambio presencial con cita previa',
 'Operaciones con importes altos','Justificantes y documentos necesarios','Solicitar un cambio'],
['Traslado São Paulo – Florianópolis','700 km · Puerta a puerta',
 'Setecientos kilómetros de la BR-101, hechos como es debido: coche blindado si lo quiere, un chofer que ha hecho esta carretera cien veces y la parada donde usted diga.',
 'Puerta a puerta, São Paulo a Florianópolis','Vehículos blindados o estándar',
 'Salidas diurnas y nocturnas','Equipaje, mascotas y sillas infantiles','Solicitar este traslado'],
['Traslados','De ciudad en ciudad, de país en país',
 'Traslados interurbanos e internacionales por el continente: São Paulo, Río, Florianópolis, Buenos Aires, Asunción, Ciudad del Este — y cualquier punto entre ellos. Un coche, un chofer, un precio acordado antes de salir.',
 'Rutas por Brasil, Argentina y Paraguay','Aeropuertos, puertos y terminales privadas',
 'Rutas de varios días y cruces de frontera','Precio cerrado antes de la salida','Solicitar un traslado'],
['Guía de viaje','Todo el continente con quien lo conoce',
 'Un guía que le muestra los lugares que valen la pena, los buenos restaurantes y las rutas bonitas. Organizamos viajes por Brasil, Argentina, Paraguay y otros países de América del Sur.',
 'Guía privado en cualquier país de América del Sur','Lugares históricos, naturaleza y costa',
 'Restaurantes, mercados y barrios interesantes','Cobertura fotográfica y con dron','Solicitar un guía'],
['Servicios de viaje','Billetes · Hoteles · Rutas',
 'Organizamos el viaje completo: vuelos, hoteles, ruta, entradas y los documentos necesarios.',
 'Vuelos, hoteles y apartamentos','Planificación de ruta entre países',
 'Entradas, permisos y acceso a parques','Seguro y documentos de viaje','Solicitar organización del viaje'],
['Acompañante personal','Una persona, todo el viaje · 24/7',
 'Organizamos ayuda personal para todo el viaje: traducción, transporte, reservas y resolución de asuntos en el lugar.',
 'Apoyo durante todo el viaje','Traducción y comunicación',
 'Conducción y organización de los desplazamientos','Reservas y resolución de asuntos','Solicitar un acompañante'],
['Protección ejecutiva','Escoltas licenciados · Acompañamiento personal',
 'Organizamos la seguridad privada a través de agencias asociadas verificadas — empresas de seguridad licenciadas con todos los permisos necesarios para ejercer la actividad de seguridad en los países de América Latina.',
 'Equipos de protección personal','Reconocimiento previo de rutas y lugares',
 'Seguridad residencial y de eventos','Evaluación de riesgo y briefings de viaje','Solicitar protección'],
['Familia y maternidad','Cuidado · Colegios · Papeles',
 'Obstetras y suites de maternidad privadas en São Paulo, niñeras bilingües que llevan años con las mismas familias, plaza en colegio internacional y cada documento que sigue a un nacimiento en América del Sur.',
 'Seguimiento del embarazo y parto','Niñeras y personal doméstico verificados',
 'Plaza en colegios internacionales','Registro civil, documentos y ciudadanía','Solicitar apoyo familiar'],
['Eventos privados','Solo con invitación · Creado desde cero',
 'Acceso allí donde no basta con comprar una entrada. Fiestas privadas, clubes cerrados, estrenos y eventos VIP solo por invitación. Y si el evento que busca no existe, lo creamos para usted desde cero: un yate, una isla privada, una villa o cualquier otra localización. Organización integral llave en mano según su guion — de la idea al último detalle.'],
['Acompañamiento en todo Brasil','Un representante personal durante todo el viaje',
 'Su representante personal a su lado durante todo el viaje. Nuestro profesional le acompaña físicamente a usted, a su familia o a su delegación en cualquier punto de Brasil, actuando a la vez como intérprete, guía y conserje personal. Se encarga del itinerario, de su seguridad y de resolver cualquier asunto sobre el terreno — una sola persona siempre a su lado que asume todas las preocupaciones.'],
['Turismo llave en mano Remanso Travel','Rutas de autor · Hoteles · Expediciones',
 'Junto con Remanso Travel — operador turístico oficial en Brasil, creado por un equipo de habla rusa — organizamos viajes por el país completamente llave en mano. Rutas de autor, expediciones, hoteles y villas, traslados, yates, guías y programas individuales — todo Brasil con un único equipo que habla su idioma.'],
['Transporte y logística','Desde un automóvil hasta un jet privado',
 'Organizamos cualquier desplazamiento por Brasil — desde un automóvil hasta un jet privado. Alquiler de coches con y sin conductor, vehículos premium, traslados, microbuses para grupos y delegaciones, aviación privada, helicópteros, lanchas y yates. Elegimos el transporte para cada necesidad, diseñamos la logística y organizamos toda la ruta desde el punto de partida hasta el destino.']
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
    'meta.title': 'MONTERO — Concierge Service',
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
    'sec.svc.lede': 'I nostri servizi sono illimitati. Nel 99% dei casi la risposta a "Che cosa potete fare...?" è POSSIAMO PRATICAMENTE TUTTO!',

    'lp.slogan1': 'Il vostro tempo.',
    'lp.slogan2': 'La nostra responsabilità.',
    'lp.phil.label': 'Filosofia Montero',
    'lp.phil.h1': 'Il vostro tempo.',
    'lp.phil.h2': 'Il vostro lusso.',
    'lp.phil.txt': 'Ci facciamo carico di tutto ciò che richiede tempo,<br>risorse e contatti. Voi ricevete il risultato<br>— senza sforzi né persone in più.',
    'lp.phil.sign': 'Concierge privato — MONTERO',
    'lp.svc.label': 'Servizi',
    'lp.svc0': 'Auto blindate',
    'lp.tag0': 'Con autista · Confortevole',
    'lp.tag1': 'Con equipaggio · Rifornito',
    'lp.tag2': 'Voli · Transfer',
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
    'dest.ar.txt': 'Recoleta e Palermo, le migliori steakhouse e cantine del continente, una cena che comincia alle undici. Una città che parla spagnolo con accento europeo.',
    'dest.py.city': 'Asunción',
    'sec.conc.label': 'Il Concierge',
    'sec.conc.h': '<span class="ln">Una richiesta è vostra</span><span class="ln"><span class="h-cap">Il resto è affar nostro</span></span>',

    'conc.pull': '<span class="pl">Un solo contatto per qualsiasi esigenza in America Latina.</span>',
    'conc.p1': 'Da una richiesta quotidiana a una questione complessa che richiede avvocati, broker, autisti o altri specialisti — non deve cercare gli esecutori né coordinarli da solo.',
    'conc.p2': 'Lei affida semplicemente il compito al suo concierge. Noi organizziamo tutto il resto e portiamo la questione al risultato.',
    'conc.p3': 'Riservato. Personale. Senza telefonate in più, senza scambi di messaggi, senza perdite di tempo.',
    'conc.p4': '<b>Tutto comincia con un messaggio.</b><br>Ci dica di cosa ha bisogno. Anche se non sa ancora chi possa risolverlo — quello è già compito nostro.',
    'conc.signName': '<span class="sl">Servizio di concierge in</span> <span class="sl">tutta l’America Latina</span>',

    'sec.req.label': 'La Richiesta',
    'sec.req.h': 'Ci lasci pensare a <span class="h-cap">tutto.</span>',
    'sec.req.lede': 'Inviateci la vostra richiesta e vi contatteremo.',

    'direct.wa': 'WhatsApp',
    'direct.tg': 'Telegram',
    'direct.tel': 'Telefono',


    'final.claim1': 'Tutto ciò che le serve in Brasile, Argentina',
    'final.claim2': 'con un solo numero: +55-48-99648-1563',

    'foot.brand': 'Il tempo <em>—</em> la forma più alta di lusso, e noi ce ne occupiamo',
    'foot.privacy': 'Privacy',
    'foot.terms': 'Termini',

    'legal.stub': 'Il documento %s non è ancora pubblicato.',

    'lang.title': 'Scelga la sua lingua',
    'lang.sub': 'Può cambiarla in qualsiasi momento — il selettore è in alto.',
    'lang.btn': 'Lingua',

    'form.fullName': 'Nome',
    'form.whatsapp': 'Numero WhatsApp | Telegram',
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
['Auto blindate','Con autista · Confortevole · Sicura',
 'Un SUV blindato davanti all’hotel alle quattro del mattino, motore caldo, autista già istruito. Con targhe nazionali, documenti in regola, livello di blindatura secondo la sua esigenza.',
 'SUV, berline e van blindati','Livelli di blindatura da B4 a B7',
 'Autisti con formazione di sicurezza','A giornata, a settimana o a mese','Richiedere un’auto blindata'],
['Yacht e barche','Con equipaggio · Rifornito · Privato',
 'Uno yacht con equipaggio, preparato interamente secondo i suoi desideri. O un motoscafo veloce per il tempo che desidera. Itinerari su misura, le coste migliori e totale libertà di movimento in acqua.',
 'Yacht a motore e a vela con equipaggio','Moto d’acqua e motoscafi',
 'Isole, spiagge e resort del continente','Chef, provviste e immersioni','Richiedere uno yacht'],
['Noleggio elicottero','Voli · Transfer · Itinerari panoramici',
 'San Paolo–Buenos Aires senza ore di strada né scali. Spostamenti tra elisuperfici urbane, transfer in America Latina e autorizzazioni pronte prima del suo arrivo.',
 'Transfer tra elisuperfici urbane','Costa e isole',
 'Voli panoramici su Rio, Foz do Iguaçu e altro','Permessi di atterraggio e assistenza a terra','Richiedere un elicottero'],
['Eventi VIP','Organizzazione completa · Privato',
 'Organizziamo eventi privati di qualsiasi formato — da una cena per pochi a una grande serata riservata. Troviamo la sede, il personale e tutto ciò che serve.',
 'Cene, feste e celebrazioni private','Ricerca della sede e produzione completa',
 'Aree VIP e accesso a eventi riservati','Chef, musicisti, sicurezza, fotografi','Richiedere un evento'],
['Interpreti','Portoghese · Inglese · Spagnolo · Russo',
 'L’interprete la aiuta a parlare agli incontri e a risolvere ciò che conta senza barriera linguistica.',
 'Interpretariato consecutivo e simultaneo','Trattative e incontri di lavoro',
 'Notaio, banca e visite mediche','Traduzione giurata di documenti','Richiedere un interprete'],
['Residenza e cittadinanza','Visti · Naturalizzazione',
 'Residenza temporanea, residenza permanente, cittadinanza. Teniamo noi il fascicolo, rincorriamo le scadenze e le diciamo che cosa sta succedendo davvero — nella sua lingua, non in burocratese.',
 'Residenza per investimento, lavoro e famiglia','Residenza permanente',
 'Naturalizzazione e passaporto','Assistenza con i documenti per tutta la famiglia','Richiedere supporto sulla residenza'],
['Servizi legali','Avvocati · Contratti · Questioni legali',
 'Gli avvocati la aiutano a capire documenti, contratti e questioni legali prima delle decisioni importanti.',
 'Diritto societario e contrattuale','Immobili e controversie sulla proprietà',
 'Famiglia, successioni e immigrazione','Redazione e verifica dei documenti','Richiedere supporto legale'],
['Contabilità e apertura società','CNPJ · Libri · Adempimenti',
 'Apriamo la società correttamente e teniamo la contabilità. Prepariamo le dichiarazioni e seguiamo le scadenze, così nulla di tutto questo resta a lei.',
 'Costituzione della società, CPF e CNPJ','Contabilità, buste paga e dichiarazioni',
 'Scelta del regime fiscale','Licenze, permessi e adempimenti annuali','Richiedere l’apertura di una società'],
['Ingresso nel mercato','Portiamo dentro la sua azienda',
 'Se ha già un’azienda, la aiutiamo a portarla in Sud America: apriamo la società, troviamo i partner e organizziamo il lavoro sul posto.',
 'Filiale, controllata o ditta individuale','Import, dogana e certificazione',
 'Distribuzione e partner locali','Assunzioni e conformità del lavoro','Richiedere l’ingresso nel mercato'],
['Analisi di mercato','Dati · Mercato · Costi',
 'Verifichiamo il mercato, la domanda, i concorrenti e i costi, per capire come funzionerà la sua attività in Sud America.',
 'Ricerca di mercato e di domanda','Analisi della concorrenza e dei prezzi',
 'Calcolo di ricavi e costi','Scelta della regione e della sede','Richiedere un’analisi'],
['Avvio dell’attività','Dal foglio bianco all’apertura',
 'La aiutiamo a cominciare qualcosa di nuovo in Sud America da zero. Prepariamo il piano, registriamo la società, troviamo il locale, selezioniamo il personale e prepariamo tutto per l’apertura.',
 'Concept e piano d’impresa','Registrazione e licenze',
 'Locale, allestimento e fornitori','Personale e avvio dell’attività','Richiedere supporto all’avvio'],
['Affitto immobili','Stagionale · Lungo periodo · Fuori mercato',
 'Ville stagionali a Jurerê, attici a Itaim, una casa ad Angra per la stagione. Verificate prima che lei le veda e affittate con un contratto che la tutela.',
 'Ville stagionali e case sul mare','Appartamenti e attici a lungo termine',
 'Immobili fuori dal mercato aperto','Contratti, cauzioni e allestimento della casa','Richiedere un affitto'],
['Acquisto e affitto immobili','Acquisire per viverci',
 'Comprare casa in Sud America da straniero è legale e sicuro. Verifichiamo l’immobile, il venditore, i documenti e ogni dettaglio che conta.',
 'Ricerca e accesso fuori mercato','Verifica della titolarità',
 'Trattativa e chiusura','Registrazione, imposte e utenze','Richiedere un acquisto'],
['Immobili da reddito e assistenza','Analisi · Due diligence · Chiusura dell’operazione',
 'Verifichiamo se l’immobile vale il suo prezzo, in che stato è e quale reddito può dare. Seguiamo l’operazione e mettiamo in ordine tutti i documenti.',
 'Analisi di rendimento e di uscita','Due diligence tecnica e legale',
 'Trattativa e condizioni dell’operazione','Rogito, trascrizione e consegna dell’immobile','Richiedere assistenza sull’operazione'],
['Conti d’investimento','Apertura · Bonifico · Documenti',
 'Apriamo il conto, portiamo il denaro in Sud America e prepariamo i documenti richiesti dalla banca e dagli istituti finanziari.',
 'Conti d’investimento e di intermediazione','Trasferimento di denaro dall’estero',
 'Registrazione del capitale presso la banca centrale','Prova dell’origine dei fondi','Richiedere l’apertura di un conto'],
['Cambio valuta','Online e allo sportello',
 'Organizziamo il cambio valuta tramite istituti finanziari autorizzati a svolgere operazioni in valuta. Individuiamo la soluzione adatta al suo importo e al suo scopo, concordiamo le condizioni e aiutiamo a svolgere l’operazione — online o di persona.',
 'Cambio online a tasso concordato','Cambio di persona su appuntamento',
 'Operazioni con importi elevati','Ricevute e documenti necessari','Richiedere un cambio'],
['Transfer San Paolo – Florianópolis','700 km · Porta a porta',
 'Settecento chilometri di BR-101, fatti come si deve: auto blindata se la vuole, un autista che ha percorso questa strada cento volte e la sosta dove decide lei.',
 'Porta a porta, San Paolo–Florianópolis','Veicoli blindati o standard',
 'Partenze diurne e notturne','Bagagli, animali e seggiolini','Richiedere questo transfer'],
['Transfer','Di città in città, di paese in paese',
 'Transfer interurbani e internazionali in tutto il continente: San Paolo, Rio, Florianópolis, Buenos Aires, Asunción, Ciudad del Este — e qualsiasi punto nel mezzo. Un’auto, un autista, un prezzo concordato prima di partire.',
 'Rotte tra Brasile, Argentina e Paraguay','Aeroporti, porti e terminal privati',
 'Itinerari di più giorni e attraversamenti di frontiera','Prezzo fisso concordato in anticipo','Richiedere un transfer'],
['Guida turistica','Tutto il continente con chi lo conosce',
 'Una guida che mostra i luoghi che meritano, i buoni ristoranti e gli itinerari belli. Organizziamo viaggi in Brasile, Argentina, Paraguay e negli altri paesi del Sud America.',
 'Guida privata in qualsiasi paese del Sud America','Luoghi storici, natura e costa',
 'Ristoranti, mercati e quartieri interessanti','Servizio fotografico e riprese con drone','Richiedere una guida'],
['Servizi di viaggio','Biglietti · Hotel · Itinerari',
 'Organizziamo l’intero viaggio: voli, hotel, itinerario, biglietti e i documenti necessari.',
 'Voli, hotel e appartamenti','Pianificazione dell’itinerario tra paesi',
 'Biglietti, permessi e accesso ai parchi','Assicurazione e documenti di viaggio','Richiedere l’organizzazione del viaggio'],
['Accompagnatore personale','Una persona, per tutto il viaggio · 24/7',
 'Organizziamo un aiuto personale per tutto il viaggio: traduzione, trasporti, prenotazioni e questioni risolte sul posto.',
 'Assistenza per tutto il viaggio','Traduzione e comunicazione',
 'Guida e organizzazione degli spostamenti','Prenotazioni e risoluzione di questioni','Richiedere un accompagnatore'],
['Protezione personale','Agenti autorizzati · Accompagnamento personale',
 'Organizziamo la sicurezza privata tramite agenzie partner verificate — società di sicurezza autorizzate, in possesso di tutti i permessi necessari per l’attività di sicurezza nei paesi dell’America Latina.',
 'Squadre di protezione personale','Ispezione preventiva di percorsi e sedi',
 'Sicurezza di residenze ed eventi','Valutazione del rischio e briefing di viaggio','Richiedere protezione'],
['Famiglia e maternità','Cure · Scuole · Documenti',
 'Ostetrici e suite di maternità private a San Paolo, tate bilingui che restano anni nelle stesse famiglie, inserimento in scuole internazionali e ogni documento che segue una nascita in Sud America.',
 'Gravidanza e parto','Tate e personale domestico verificati',
 'Inserimento in scuole internazionali','Anagrafe, documenti e cittadinanza','Richiedere assistenza alla famiglia'],
['Eventi privati','Solo su invito · Creato da zero',
 'Accesso dove un biglietto non si può semplicemente comprare. Feste private, club chiusi, prime ed eventi VIP solo su invito. E se l’evento desiderato non esiste, lo creiamo per lei da zero: uno yacht, un’isola privata, una villa o qualsiasi altra location. Organizzazione completa chiavi in mano secondo il suo copione — dall’idea all’ultimo dettaglio.'],
['Accompagnamento in tutto il Brasile','Un rappresentante personale per tutto il viaggio',
 'Il suo rappresentante personale accanto a lei per tutto il viaggio. Un nostro collaboratore accompagna fisicamente lei, la sua famiglia o la sua delegazione in ogni punto del Brasile, come interprete, guida e concierge personale allo stesso tempo. Si occupa dell’itinerario, della sua sicurezza e della soluzione di qualsiasi questione sul posto — una sola persona sempre accanto a lei, che si assume ogni pensiero.'],
['Turismo chiavi in mano Remanso Travel','Itinerari d’autore · Hotel · Spedizioni',
 'Insieme a Remanso Travel — tour operator ufficiale in Brasile, nato da un team di lingua russa — organizziamo viaggi nel paese completamente chiavi in mano. Itinerari d’autore, spedizioni, hotel e ville, transfer, yacht, guide e programmi personalizzati — tutto il Brasile con un unico team che parla la sua lingua.'],
['Trasporti e logistica','Dall’automobile al jet privato',
 'Organizziamo qualsiasi spostamento in Brasile — dall’automobile al jet privato. Noleggio auto con e senza autista, vetture premium, transfer, minibus per gruppi e delegazioni, aviazione privata, elicotteri, motoscafi e yacht. Scegliamo il mezzo per ogni esigenza, costruiamo la logistica e organizziamo l’intero percorso dal punto di partenza alla destinazione.']
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
