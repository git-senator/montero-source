/* ══════════════════════════════════════════════════════════════════════
   ПРАВОВЫЕ ДОКУМЕНТЫ

   Два текста — «Условия использования» и «Политика конфиденциальности» —
   лежат отдельным файлом, а не в общем словаре: они длинные, меняются
   своей жизнью и грузятся только когда посетитель их открыл.

   Структура одинакова для всех пяти языков:
     title  — заголовок документа
     upd    — строка «обновлено»
     lead   — вводные абзацы (массив)
     s      — разделы, каждый: [заголовок, абзац или массив абзацев]

   Важно про Бразилию: Кодекс защиты потребителя (CDC, закон 8.078/1990)
   не позволяет поставщику полностью снять с себя ответственность перед
   потребителем, а статья 51 прямо объявляет такие условия ничтожными.
   Поэтому во всех ограничениях стоит оговорка «в пределах, допустимых
   законом» — без неё раздел работал бы против владельца, а не за него.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var CO = 'Montero Private Concierge';
  var WA = '+55 21 97777 0800';
  var TG = 't.me/ROSSA_CO';

  window.LEGAL = {

    /* ── Русский ──────────────────────────────────────────────────── */
    ru: {
      upd: 'Обновлено: 1 сентября 2026 года',
      terms: {
        title: 'Условия использования',
        lead: [
          'Настоящие Условия регулируют доступ к сайту ' + CO + ' («мы», «нас», «наш») и его использование, а также пользование нашими консьерж-услугами.',
          'Открывая сайт или пользуясь им, вы принимаете эти Условия. Если вы с ними не согласны, пожалуйста, не пользуйтесь сайтом.'
        ],
        s: [
          ['1. Наши услуги',
           CO + ' оказывает консьерж-услуги и услуги в сфере образа жизни: помогает найти, согласовать, организовать и получить доступ к услугам и впечатлениям, которые предоставляют сторонние организации. Это может касаться поездок, транспорта, размещения, частных мероприятий, вопросов, связанных с недвижимостью, бытовых задач, бронирований и других консьерж-решений.'],
          ['2. Мы — посредник, а не исполнитель',
           ['Это ключевое положение настоящих Условий. Подавляющее большинство услуг, организуемых через нас, фактически оказывают независимые сторонние поставщики: перевозчики, водители, судовладельцы, авиакомпании, отели, рестораны, организаторы мероприятий, юридические и бухгалтерские фирмы, собственники недвижимости, экскурсоводы, переводчики и иные исполнители.',
            'Мы выступаем координатором и посредником: подбираем исполнителя, ведём переговоры, согласуем условия и сопровождаем задачу до результата. Мы не владеем этими организациями, не управляем ими, не контролируем их и не являемся их работодателем, если прямо не указано иное.',
            'У каждого стороннего поставщика свои условия, цены, правила отмены и брони, требования к клиенту и собственная ответственность. Пользуясь услугой такого поставщика, вы вступаете в отношения непосредственно с ним. Мы по вашей просьбе доводим до вас его условия и помогаем их соблюсти.',
            'Настоящий раздел не исключает и не ограничивает нашу собственную ответственность за то, что делаем непосредственно мы, и не отменяет прав, которые закон предоставляет потребителю императивно.']],
          ['3. Заявка и подтверждение',
           'Сведения на сайте носят справочный характер и могут меняться без предварительного уведомления: цены, наличие, расписания, места, характеристики и условия оказания услуг. Отправленная заявка сама по себе бронированием не является. Услуга считается подтверждённой только после того, как мы или соответствующий поставщик подтвердили её прямо и определённо.'],
          ['4. Цены и оплата',
           'Цены зависят от наличия, спроса, тарифов поставщиков, налогов, сборов, курсов валют и иных применимых начислений. Если прямо не указано иное, указанные на сайте цены не являются окончательными. О размере оплаты, предоплаты, сборов за отмену, сервисных сборов и платежей в пользу третьих лиц мы сообщаем до подтверждения услуги.'],
          ['5. Обязанности пользователя',
           'Вы обязуетесь сообщать достоверные сведения, пользоваться сайтом законно, не нарушать его работу, не пытаться получить несанкционированный доступ, не направлять ложную или вводящую в заблуждение информацию, не использовать сайт в противоправных целях и уважительно относиться к другим пользователям и к сторонним поставщикам.'],
          ['6. Интеллектуальная собственность',
           'Если не указано иное, содержимое сайта — тексты, логотипы, товарные знаки, графика, фотографии, дизайн, вёрстка, видео, программный код и прочие материалы — принадлежит ' + CO + ' либо используется по лицензии. Без нашего предварительного письменного разрешения запрещается копировать, воспроизводить, распространять, изменять, публиковать, продавать, декомпилировать или коммерчески использовать содержимое сайта.'],
          ['7. Отказ от гарантий',
           'В пределах, допустимых применимым законом, сайт и его содержимое предоставляются «как есть» и «как доступно». Мы не гарантируем бесперебойной, безошибочной, полностью защищённой работы. Мы прилагаем разумные усилия к тому, чтобы сведения были точными, но не гарантируем, что они всегда полны, актуальны и свободны от ошибок.'],
          ['8. Ограничение ответственности',
           ['В максимальных пределах, допустимых применимым законом, ' + CO + ' не отвечает за убытки, ущерб, задержки, отмены, неисполнение, действия и бездействие независимых сторонних поставщиков — авиакомпаний, отелей, транспортных компаний, туроператоров, собственников недвижимости, организаторов мероприятий, — а также за действия государственных органов, погоду, стихийные бедствия, технические сбои, забастовки и иные обстоятельства вне нашего разумного контроля.',
            'Ничто в настоящих Условиях не исключает и не ограничивает ответственность там, где это запрещено законом, в том числе права потребителя, предусмотренные Кодексом защиты потребителя Бразилии.']],
          ['9. Обстоятельства непреодолимой силы',
           'Мы не несём ответственности за неисполнение или задержку, вызванные обстоятельствами вне нашего разумного контроля: стихийными бедствиями, экстремальной погодой, войной, терроризмом, гражданскими беспорядками, действиями властей, эпидемиями, отказами инфраструктуры и связи, забастовками и иными подобными событиями.'],
          ['10. Безопасность сайта и запрещённые действия',
           'Запрещается посягать на безопасность и целостность сайта: несанкционированный доступ, эксплуатация уязвимостей, распространение вредоносного кода, атаки на отказ в обслуживании, автоматизированные злоупотребления, кража учётных данных, мошенничество и иная противоправная деятельность. Мы вправе ограничить или приостановить доступ, если у нас есть разумные основания полагать, что сайтом злоупотребляют.'],
          ['11. Внешние ссылки',
           'На сайте могут быть ссылки на сторонние сайты и сервисы. Мы их не контролируем и не отвечаем за их содержание, доступность, безопасность, правила и практики.'],
          ['12. Конфиденциальность',
           'Использование сайта регулируется также нашей Политикой конфиденциальности, где описано, как мы собираем и обрабатываем персональные данные.'],
          ['13. Изменения',
           'Мы можем время от времени изменять настоящие Условия. Обновлённая редакция публикуется с новой датой обновления. Продолжение пользования сайтом после публикации означает согласие с изменениями в пределах, допустимых законом.'],
          ['14. Применимое право',
           'К настоящим Условиям применяется право Федеративной Республики Бразилия — без ущерба для императивных норм о защите прав потребителей и иных прав, от которых нельзя отказаться по закону.'],
          ['15. Связь с нами',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      },
      privacy: {
        title: 'Политика конфиденциальности',
        lead: [
          'Мы уважаем вашу частную жизнь и обязуемся защищать ваши персональные данные.',
          'Эта Политика объясняет, как ' + CO + ' собирает, использует, хранит, передаёт и защищает персональные данные, когда вы пользуетесь сайтом и нашими консьерж-услугами.'
        ],
        s: [
          ['1. Какие данные мы собираем',
           'В зависимости от того, как вы с нами взаимодействуете, мы можем собирать имя и фамилию, адрес электронной почты, номер телефона или WhatsApp, страну и место пребывания, предпочтения и содержание заявки, сведения, которые вы сами сообщаете через форму или в переписке, а также технические данные: IP-адрес, сведения о браузере и устройстве, действия на сайте, файлы cookie и подобные технологии.'],
          ['2. Как мы используем данные',
           'Мы используем данные, чтобы отвечать на обращения, оказывать и координировать консьерж-услуги, организовывать запрошенные вами услуги, поддерживать связь с вами, улучшать сайт и сервис, обеспечивать безопасность, предотвращать мошенничество и злоупотребления, исполнять требования закона, а также — там, где это допускается законом и, при необходимости, с вашего согласия, — направлять сообщения рекламного характера.'],
          ['3. Кому мы передаём данные',
           ['Мы передаём необходимый минимум сведений проверенным сторонним поставщикам, когда без этого нельзя оказать запрошенную вами услугу: отелям и арендодателям, транспортным и авиационным компаниям, туроператорам, технологическим и платёжным сервисам, платформам связи и другим партнёрам, участвующим в исполнении вашей заявки.',
            'Мы не продаём ваши персональные данные.']],
          ['4. Передача данных за пределы Бразилии',
           'Отдельные технологические или сервисные поставщики могут обрабатывать данные за пределами Бразилии. При такой передаче мы принимаем разумные меры для соблюдения применимого законодательства о защите данных, включая Общий закон Бразилии о защите персональных данных (LGPD, закон 13.709/2018).'],
          ['5. Файлы cookie',
           'Сайт может использовать cookie и подобные технологии, чтобы работать исправно, улучшать функциональность, анализировать посещаемость, поддерживать безопасность и, где применимо, обеспечивать маркетинговые задачи. Управлять cookie можно в настройках браузера.'],
          ['6. Безопасность данных',
           'Мы применяем разумные технические и организационные меры для защиты персональных данных от несанкционированного доступа, утраты, неправомерного использования, изменения, раскрытия и уничтожения. При этом ни один способ передачи или хранения данных не является абсолютно безопасным.'],
          ['7. Ваши права по бразильскому закону',
           'В объёме, предусмотренном LGPD, вы вправе получить подтверждение факта обработки и доступ к данным, требовать исправления, анонимизации, блокирования или удаления данных в предусмотренных законом случаях, получать сведения о том, кому данные передавались, отозвать согласие, если обработка основана на согласии, требовать переносимости данных, требовать пересмотра отдельных автоматизированных решений, а также знать о последствиях отказа дать согласие.'],
          ['8. Сроки хранения',
           'Мы храним персональные данные ровно столько, сколько разумно необходимо для целей, описанных в этой Политике: для оказания услуг, исполнения договорных и законных обязанностей, разрешения споров, ведения деловой документации и защиты законных интересов. Когда данные больше не нужны, они удаляются или обезличиваются в соответствии с законом.'],
          ['9. Сторонние сайты',
           'На сайте могут быть ссылки на сторонние сайты, платформы и сервисы. Мы не отвечаем за их практики обработки данных, безопасность, содержание и правила.'],
          ['10. Данные детей',
           'Наши услуги не адресованы детям. Мы сознательно не собираем персональные данные детей там, где это запрещено применимым законом.'],
          ['11. Изменения',
           'Мы можем время от времени обновлять настоящую Политику. Новая редакция публикуется с обновлённой датой.'],
          ['12. Связь с нами',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      }
    },

    /* ── English ──────────────────────────────────────────────────── */
    en: {
      upd: 'Last updated: 1 September 2026',
      terms: {
        title: 'Terms of Use',
        lead: [
          'These Terms of Use govern your access to and use of the ' + CO + ' website (“we”, “us”, “our”) and our concierge services.',
          'By accessing or using the website you agree to these Terms. If you do not agree, please do not use the website.'
        ],
        s: [
          ['1. Our services',
           CO + ' provides concierge and lifestyle services, assisting clients in locating, coordinating, arranging and accessing services and experiences supplied by third parties. These may include travel assistance, transport, accommodation, private experiences, property-related assistance, lifestyle services, reservations and other concierge solutions.'],
          ['2. We act as an intermediary, not as the provider',
           ['This is a central provision of these Terms. The great majority of services arranged through us are in fact performed by independent third-party providers: carriers, drivers, boat owners, airlines, hotels, restaurants, event organisers, legal and accounting firms, property owners, guides, interpreters and other suppliers.',
            'We act as coordinator and intermediary: we select the provider, negotiate, agree the conditions and follow the matter through to its result. We do not own, operate, control or employ those providers unless expressly stated otherwise.',
            'Each third-party provider has its own terms, prices, cancellation and booking rules, client requirements and liability. When you use such a service you enter into a relationship directly with that provider. At your request we pass on its conditions and help you comply with them.',
            'This section does not exclude or limit our own liability for what we do ourselves, nor does it set aside rights granted to consumers by mandatory law.']],
          ['3. Requests and confirmation',
           'Information on the website is for general guidance and may change without notice: prices, availability, schedules, locations, specifications and service conditions. Submitting a request does not in itself constitute a booking. A service is confirmed only once we or the relevant provider have expressly confirmed it.'],
          ['4. Pricing and payments',
           'Prices vary with availability, demand, supplier pricing, taxes, fees, exchange rates and other applicable charges. Unless expressly stated otherwise, prices shown on the website are not guaranteed final prices. Payments, deposits, cancellation fees, service fees and third-party charges are communicated to you before a service is confirmed.'],
          ['5. Your responsibilities',
           'You agree to provide accurate information, to use the website lawfully, not to misuse or interfere with it, not to attempt unauthorised access, not to submit fraudulent or misleading information, not to use the website for unlawful purposes, and to treat other users and third-party providers with respect.'],
          ['6. Intellectual property',
           'Unless otherwise stated, website content — text, logos, trademarks, graphics, photographs, design, layout, video, software and other materials — is owned by or licensed to ' + CO + '. You may not copy, reproduce, distribute, modify, publish, sell, reverse engineer or commercially exploit it without our prior written authorisation.'],
          ['7. Disclaimer',
           'To the extent permitted by applicable law, the website and its content are provided on an “as is” and “as available” basis. We do not guarantee uninterrupted, error-free or fully secure operation. We make reasonable efforts to keep information accurate but do not guarantee that it is always complete, current or free of error.'],
          ['8. Limitation of liability',
           ['To the maximum extent permitted by applicable law, ' + CO + ' shall not be responsible for losses, damages, delays, cancellations, failures, acts or omissions of independent third-party providers — airlines, hotels, transport companies, tour operators, property owners, event organisers — nor for acts of public authorities, weather, natural disasters, technical failures, strikes or other circumstances beyond our reasonable control.',
            'Nothing in these Terms excludes or limits liability where that is prohibited by law, including consumer rights under the Brazilian Consumer Protection Code.']],
          ['9. Force majeure',
           'We are not liable for failure or delay caused by circumstances beyond our reasonable control, including natural disasters, extreme weather, war, terrorism, civil unrest, government action, epidemics, infrastructure or telecommunications failure, strikes and similar events.'],
          ['10. Website security and prohibited activity',
           'You must not attempt to compromise the security or integrity of the website. Prohibited activity includes unauthorised access, exploitation of vulnerabilities, distribution of malware, denial-of-service attacks, automated abuse, credential theft, fraud and other unlawful conduct. We may restrict or suspend access where we reasonably believe the website is being abused.'],
          ['11. External links',
           'The website may link to third-party websites and services. We do not control and are not responsible for their content, availability, security, policies or practices.'],
          ['12. Privacy',
           'Your use of the website is also subject to our Privacy Policy, which explains how we collect and process personal data.'],
          ['13. Changes',
           'We may amend these Terms from time to time. The updated version is published with a revised “last updated” date. Continued use after publication constitutes acceptance to the extent permitted by law.'],
          ['14. Governing law',
           'These Terms are governed by the laws of the Federative Republic of Brazil, without prejudice to mandatory consumer protection rules and other rights that cannot lawfully be waived.'],
          ['15. Contact',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      },
      privacy: {
        title: 'Privacy Policy',
        lead: [
          'We respect your privacy and are committed to protecting your personal data.',
          'This Policy explains how ' + CO + ' collects, uses, stores, shares and protects personal data when you use the website and our concierge services.'
        ],
        s: [
          ['1. Data we collect',
           'Depending on how you interact with us, we may collect your name, email address, telephone or WhatsApp number, country and location, preferences and the content of your request, information you provide through the form or in correspondence, and technical data: IP address, browser and device information, website activity, cookies and similar technologies.'],
          ['2. How we use data',
           'We use data to respond to enquiries, to provide and coordinate concierge services, to arrange the services you request, to communicate with you, to improve the website and our service, to maintain security, to prevent fraud and abuse, to comply with legal obligations and — where permitted by law and, where required, with your consent — to send marketing communications.'],
          ['3. Who we share data with',
           ['We share the minimum necessary information with trusted third-party providers where a requested service cannot be delivered otherwise: hotels and landlords, transport and airline companies, tour operators, technology and payment services, communication platforms and other partners involved in fulfilling your request.',
            'We do not sell your personal data.']],
          ['4. Transfers outside Brazil',
           'Some technology or service providers may process data outside Brazil. Where data is transferred internationally we take reasonable measures to comply with applicable data protection law, including the Brazilian General Data Protection Law (LGPD, Law 13.709/2018).'],
          ['5. Cookies',
           'The website may use cookies and similar technologies to operate correctly, improve functionality, analyse traffic, maintain security and, where applicable, support marketing. You can control cookies through your browser settings.'],
          ['6. Data security',
           'We apply reasonable technical and organisational measures to protect personal data against unauthorised access, loss, misuse, alteration, disclosure and destruction. No method of transmission or storage is completely secure.'],
          ['7. Your rights under Brazilian law',
           'To the extent provided by the LGPD, you may obtain confirmation of processing and access to your data, request correction, anonymisation, blocking or deletion where legally applicable, obtain information about sharing, withdraw consent where processing is based on consent, request portability, request review of certain automated decisions, and be informed of the consequences of refusing consent.'],
          ['8. Retention',
           'We keep personal data only for as long as reasonably necessary for the purposes described here: to provide services, to fulfil contractual and legal obligations, to resolve disputes, to maintain business records and to protect legitimate interests. When no longer required, data is securely deleted or anonymised in accordance with the law.'],
          ['9. Third-party websites',
           'The website may link to third-party websites, platforms and services. We are not responsible for their data practices, security, content or policies.'],
          ['10. Children',
           'Our services are not directed at children. We do not knowingly collect personal data from children where this is prohibited by applicable law.'],
          ['11. Changes',
           'We may update this Policy from time to time. The updated version is published with a revised date.'],
          ['12. Contact',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      }
    },

    /* ── Português ────────────────────────────────────────────────── */
    pt: {
      upd: 'Última atualização: 1 de setembro de 2026',
      terms: {
        title: 'Termos de Uso',
        lead: [
          'Estes Termos de Uso regem o acesso e a utilização do site da ' + CO + ' (“nós”, “nosso”) e dos nossos serviços de concierge.',
          'Ao acessar ou utilizar o site, você concorda com estes Termos. Se não concordar, por favor não utilize o site.'
        ],
        s: [
          ['1. Nossos serviços',
           'A ' + CO + ' presta serviços de concierge e de apoio ao estilo de vida, auxiliando clientes a localizar, coordenar, organizar e acessar serviços e experiências oferecidos por terceiros. Isso pode incluir apoio em viagens, transporte, hospedagem, experiências privadas, assuntos imobiliários, serviços do dia a dia, reservas e outras soluções de concierge.'],
          ['2. Atuamos como intermediários, não como prestadores',
           ['Esta é uma disposição central destes Termos. A grande maioria dos serviços organizados por meio de nós é efetivamente executada por prestadores terceiros independentes: transportadoras, motoristas, proprietários de embarcações, companhias aéreas, hotéis, restaurantes, organizadores de eventos, escritórios jurídicos e contábeis, proprietários de imóveis, guias, intérpretes e outros fornecedores.',
            'Atuamos como coordenadores e intermediários: selecionamos o prestador, negociamos, ajustamos as condições e acompanhamos a demanda até o resultado. Não somos proprietários, não operamos, não controlamos e não empregamos esses prestadores, salvo disposição expressa em contrário.',
            'Cada prestador terceiro possui seus próprios termos, preços, regras de reserva e cancelamento, requisitos e responsabilidades. Ao utilizar tal serviço, você estabelece relação diretamente com esse prestador. A seu pedido, transmitimos as condições aplicáveis e auxiliamos no seu cumprimento.',
            'Esta cláusula não exclui nem limita nossa própria responsabilidade por aquilo que executamos diretamente, nem afasta direitos assegurados ao consumidor por normas cogentes.']],
          ['3. Solicitações e confirmação',
           'As informações do site têm caráter geral e podem ser alteradas sem aviso prévio: preços, disponibilidade, horários, locais, especificações e condições de prestação. O envio de uma solicitação, por si só, não constitui reserva. O serviço só se considera confirmado após confirmação expressa por nós ou pelo prestador correspondente.'],
          ['4. Preços e pagamentos',
           'Os preços variam conforme disponibilidade, demanda, tabelas dos fornecedores, tributos, taxas, câmbio e demais encargos aplicáveis. Salvo indicação expressa, os preços exibidos no site não são preços finais garantidos. Pagamentos, sinais, multas de cancelamento, taxas de serviço e cobranças de terceiros são informados antes da confirmação.'],
          ['5. Responsabilidades do usuário',
           'Você se compromete a fornecer informações verdadeiras, utilizar o site de forma lícita, não interferir em seu funcionamento, não tentar acesso não autorizado, não enviar informações fraudulentas ou enganosas, não usar o site para fins ilícitos e tratar com respeito outros usuários e prestadores terceiros.'],
          ['6. Propriedade intelectual',
           'Salvo indicação em contrário, o conteúdo do site — textos, logotipos, marcas, gráficos, fotografias, design, diagramação, vídeos, software e demais materiais — pertence à ' + CO + ' ou é por ela licenciado. É vedado copiar, reproduzir, distribuir, modificar, publicar, vender, realizar engenharia reversa ou explorar comercialmente o conteúdo sem autorização prévia por escrito.'],
          ['7. Isenção de garantias',
           'Na medida permitida pela legislação aplicável, o site e seu conteúdo são fornecidos “no estado em que se encontram” e “conforme disponibilidade”. Não garantimos funcionamento ininterrupto, isento de erros ou totalmente seguro. Empregamos esforços razoáveis para manter as informações corretas, sem garantir que estejam sempre completas, atuais ou livres de erro.'],
          ['8. Limitação de responsabilidade',
           ['Na máxima extensão permitida pela legislação aplicável, a ' + CO + ' não responde por perdas, danos, atrasos, cancelamentos, inexecução, atos ou omissões de prestadores terceiros independentes — companhias aéreas, hotéis, transportadoras, operadoras de turismo, proprietários de imóveis, organizadores de eventos —, nem por atos de autoridades públicas, condições climáticas, desastres naturais, falhas técnicas, greves ou outras circunstâncias fora de nosso controle razoável.',
            'Nada nestes Termos exclui ou limita responsabilidade quando isso for vedado por lei, inclusive os direitos do consumidor previstos no Código de Defesa do Consumidor.']],
          ['9. Caso fortuito e força maior',
           'Não respondemos por inexecução ou atraso decorrentes de circunstâncias fora de nosso controle razoável, incluindo desastres naturais, clima extremo, guerra, terrorismo, distúrbios civis, atos governamentais, epidemias, falhas de infraestrutura e de telecomunicações, greves e eventos semelhantes.'],
          ['10. Segurança do site e condutas vedadas',
           'É vedado comprometer a segurança ou a integridade do site. São condutas proibidas o acesso não autorizado, a exploração de vulnerabilidades, a distribuição de código malicioso, ataques de negação de serviço, abuso automatizado, furto de credenciais, fraude e demais atos ilícitos. Podemos restringir ou suspender o acesso quando houver motivo razoável para crer em abuso.'],
          ['11. Links externos',
           'O site pode conter links para sites e serviços de terceiros. Não os controlamos e não respondemos por seu conteúdo, disponibilidade, segurança, políticas ou práticas.'],
          ['12. Privacidade',
           'O uso do site também está sujeito à nossa Política de Privacidade, que explica como coletamos e tratamos dados pessoais.'],
          ['13. Alterações',
           'Podemos alterar estes Termos periodicamente. A versão atualizada é publicada com nova data de atualização. A continuidade do uso após a publicação implica aceitação, na medida permitida por lei.'],
          ['14. Lei aplicável',
           'Estes Termos são regidos pelas leis da República Federativa do Brasil, sem prejuízo das normas cogentes de proteção ao consumidor e de outros direitos irrenunciáveis.'],
          ['15. Contato',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      },
      privacy: {
        title: 'Política de Privacidade',
        lead: [
          'Respeitamos sua privacidade e temos o compromisso de proteger seus dados pessoais.',
          'Esta Política explica como a ' + CO + ' coleta, usa, armazena, compartilha e protege dados pessoais quando você utiliza o site e nossos serviços de concierge.'
        ],
        s: [
          ['1. Dados que coletamos',
           'Conforme a forma de interação, podemos coletar nome, endereço de e-mail, telefone ou WhatsApp, país e localidade, preferências e o conteúdo da solicitação, informações fornecidas no formulário ou em conversas, além de dados técnicos: endereço IP, informações de navegador e dispositivo, atividade no site, cookies e tecnologias semelhantes.'],
          ['2. Como usamos os dados',
           'Utilizamos os dados para responder a contatos, prestar e coordenar serviços de concierge, organizar os serviços solicitados, comunicar-nos com você, aprimorar o site e o atendimento, manter a segurança, prevenir fraudes e abusos, cumprir obrigações legais e — quando permitido por lei e, se exigido, com seu consentimento — enviar comunicações de marketing.'],
          ['3. Com quem compartilhamos',
           ['Compartilhamos o mínimo necessário com prestadores terceiros de confiança quando o serviço solicitado não puder ser prestado de outro modo: hotéis e locadores, transportadoras e companhias aéreas, operadoras de turismo, serviços de tecnologia e de pagamento, plataformas de comunicação e demais parceiros envolvidos no atendimento.',
            'Não vendemos seus dados pessoais.']],
          ['4. Transferências internacionais',
           'Alguns fornecedores de tecnologia ou de serviços podem tratar dados fora do Brasil. Havendo transferência internacional, adotamos medidas razoáveis para observar a legislação aplicável de proteção de dados, incluindo a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).'],
          ['5. Cookies',
           'O site pode utilizar cookies e tecnologias semelhantes para funcionar corretamente, melhorar funcionalidades, analisar tráfego, manter a segurança e, quando aplicável, apoiar ações de marketing. Você pode controlar os cookies nas configurações do navegador.'],
          ['6. Segurança dos dados',
           'Adotamos medidas técnicas e organizacionais razoáveis para proteger dados pessoais contra acesso não autorizado, perda, uso indevido, alteração, divulgação e destruição. Nenhum método de transmissão ou armazenamento é completamente seguro.'],
          ['7. Seus direitos na LGPD',
           'Na medida prevista na LGPD, você pode obter confirmação do tratamento e acesso aos dados, solicitar correção, anonimização, bloqueio ou eliminação nas hipóteses legais, obter informação sobre compartilhamento, revogar o consentimento quando o tratamento nele se basear, solicitar portabilidade, pedir revisão de determinadas decisões automatizadas e ser informado sobre as consequências de negar consentimento.'],
          ['8. Prazo de retenção',
           'Mantemos dados pessoais apenas pelo tempo razoavelmente necessário às finalidades desta Política: prestar serviços, cumprir obrigações contratuais e legais, resolver litígios, manter registros comerciais e proteger interesses legítimos. Quando não forem mais necessários, os dados são eliminados de forma segura ou anonimizados conforme a lei.'],
          ['9. Sites de terceiros',
           'O site pode conter links para sites, plataformas e serviços de terceiros. Não respondemos por suas práticas de tratamento de dados, segurança, conteúdo ou políticas.'],
          ['10. Crianças',
           'Nossos serviços não se destinam a crianças. Não coletamos conscientemente dados pessoais de crianças quando isso for vedado pela legislação aplicável.'],
          ['11. Alterações',
           'Podemos atualizar esta Política periodicamente. A versão atualizada é publicada com nova data.'],
          ['12. Contato',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      }
    },

    /* ── Español ──────────────────────────────────────────────────── */
    es: {
      upd: 'Última actualización: 1 de septiembre de 2026',
      terms: {
        title: 'Condiciones de uso',
        lead: [
          'Estas Condiciones regulan el acceso y el uso del sitio de ' + CO + ' («nosotros», «nuestro») y de nuestros servicios de conserjería.',
          'Al acceder o utilizar el sitio, usted acepta estas Condiciones. Si no está de acuerdo, le rogamos que no lo utilice.'
        ],
        s: [
          ['1. Nuestros servicios',
           CO + ' presta servicios de conserjería y de apoyo al estilo de vida, ayudando a localizar, coordinar, organizar y acceder a servicios y experiencias ofrecidos por terceros: viajes, transporte, alojamiento, experiencias privadas, asuntos inmobiliarios, servicios cotidianos, reservas y otras soluciones de conserjería.'],
          ['2. Actuamos como intermediarios, no como prestadores',
           ['Esta es una disposición central de estas Condiciones. La gran mayoría de los servicios organizados a través de nosotros los ejecutan proveedores terceros independientes: transportistas, conductores, armadores, aerolíneas, hoteles, restaurantes, organizadores de eventos, despachos jurídicos y contables, propietarios de inmuebles, guías, intérpretes y otros proveedores.',
            'Actuamos como coordinadores e intermediarios: seleccionamos al proveedor, negociamos, acordamos las condiciones y acompañamos el asunto hasta su resultado. No somos propietarios de esos proveedores ni los operamos, controlamos o empleamos, salvo indicación expresa en contrario.',
            'Cada proveedor tiene sus propias condiciones, precios, normas de reserva y cancelación, requisitos y responsabilidad. Al utilizar tal servicio, usted entabla una relación directamente con ese proveedor. A su solicitud le trasladamos sus condiciones y le ayudamos a cumplirlas.',
            'Esta cláusula no excluye ni limita nuestra propia responsabilidad por lo que ejecutamos directamente, ni desplaza los derechos que la ley reconoce imperativamente al consumidor.']],
          ['3. Solicitudes y confirmación',
           'La información del sitio es orientativa y puede cambiar sin previo aviso: precios, disponibilidad, horarios, lugares, especificaciones y condiciones del servicio. El envío de una solicitud no constituye por sí mismo una reserva. El servicio se considera confirmado solo cuando nosotros o el proveedor correspondiente lo confirmamos de forma expresa.'],
          ['4. Precios y pagos',
           'Los precios varían según disponibilidad, demanda, tarifas de los proveedores, impuestos, tasas, tipos de cambio y otros cargos aplicables. Salvo indicación expresa, los precios del sitio no son precios finales garantizados. Los pagos, señales, penalizaciones por cancelación, tarifas de servicio y cargos de terceros se comunican antes de la confirmación.'],
          ['5. Obligaciones del usuario',
           'Usted se compromete a facilitar información veraz, a utilizar el sitio de forma lícita, a no interferir en su funcionamiento, a no intentar accesos no autorizados, a no enviar información fraudulenta o engañosa, a no usar el sitio con fines ilícitos y a tratar con respeto a otros usuarios y a los proveedores terceros.'],
          ['6. Propiedad intelectual',
           'Salvo indicación en contrario, el contenido del sitio —textos, logotipos, marcas, gráficos, fotografías, diseño, maquetación, vídeos, software y demás materiales— pertenece a ' + CO + ' o se utiliza bajo licencia. Queda prohibido copiar, reproducir, distribuir, modificar, publicar, vender, realizar ingeniería inversa o explotar comercialmente dicho contenido sin autorización previa por escrito.'],
          ['7. Exención de garantías',
           'En la medida permitida por la ley aplicable, el sitio y su contenido se ofrecen «tal cual» y «según disponibilidad». No garantizamos un funcionamiento ininterrumpido, libre de errores o plenamente seguro. Realizamos esfuerzos razonables para mantener la información exacta, sin garantizar que sea siempre completa, actual y libre de errores.'],
          ['8. Limitación de responsabilidad',
           ['En la máxima medida permitida por la ley aplicable, ' + CO + ' no responde por pérdidas, daños, retrasos, cancelaciones, incumplimientos, actos u omisiones de proveedores terceros independientes —aerolíneas, hoteles, empresas de transporte, operadores turísticos, propietarios de inmuebles, organizadores de eventos—, ni por actos de autoridades públicas, condiciones meteorológicas, desastres naturales, fallos técnicos, huelgas u otras circunstancias fuera de nuestro control razonable.',
            'Nada en estas Condiciones excluye ni limita la responsabilidad cuando ello esté prohibido por la ley, incluidos los derechos del consumidor previstos en el Código de Defensa del Consumidor de Brasil.']],
          ['9. Fuerza mayor',
           'No respondemos por incumplimientos o retrasos derivados de circunstancias fuera de nuestro control razonable, incluidos desastres naturales, clima extremo, guerra, terrorismo, disturbios civiles, actos de gobierno, epidemias, fallos de infraestructura y telecomunicaciones, huelgas y sucesos similares.'],
          ['10. Seguridad del sitio y conductas prohibidas',
           'No se permite comprometer la seguridad o la integridad del sitio. Están prohibidos el acceso no autorizado, la explotación de vulnerabilidades, la distribución de código malicioso, los ataques de denegación de servicio, el abuso automatizado, el robo de credenciales, el fraude y cualquier otra conducta ilícita. Podemos restringir o suspender el acceso cuando existan motivos razonables para creer que se abusa del sitio.'],
          ['11. Enlaces externos',
           'El sitio puede contener enlaces a sitios y servicios de terceros. No los controlamos ni respondemos por su contenido, disponibilidad, seguridad, políticas o prácticas.'],
          ['12. Privacidad',
           'El uso del sitio también se rige por nuestra Política de privacidad, que explica cómo recogemos y tratamos los datos personales.'],
          ['13. Modificaciones',
           'Podemos modificar estas Condiciones periódicamente. La versión actualizada se publica con una nueva fecha. El uso continuado tras la publicación implica su aceptación en la medida permitida por la ley.'],
          ['14. Ley aplicable',
           'Estas Condiciones se rigen por las leyes de la República Federativa de Brasil, sin perjuicio de las normas imperativas de protección al consumidor y de otros derechos irrenunciables.'],
          ['15. Contacto',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      },
      privacy: {
        title: 'Política de privacidad',
        lead: [
          'Respetamos su privacidad y nos comprometemos a proteger sus datos personales.',
          'Esta Política explica cómo ' + CO + ' recoge, usa, conserva, comparte y protege los datos personales cuando usted utiliza el sitio y nuestros servicios de conserjería.'
        ],
        s: [
          ['1. Datos que recogemos',
           'Según cómo interactúe con nosotros, podemos recoger nombre y apellidos, correo electrónico, teléfono o WhatsApp, país y localidad, preferencias y el contenido de su solicitud, la información que facilite en el formulario o en la correspondencia, y datos técnicos: dirección IP, información del navegador y del dispositivo, actividad en el sitio, cookies y tecnologías similares.'],
          ['2. Cómo usamos los datos',
           'Usamos los datos para responder consultas, prestar y coordinar servicios de conserjería, organizar los servicios solicitados, comunicarnos con usted, mejorar el sitio y el servicio, mantener la seguridad, prevenir fraudes y abusos, cumplir obligaciones legales y —cuando lo permita la ley y, si procede, con su consentimiento— enviar comunicaciones comerciales.'],
          ['3. Con quién compartimos',
           ['Compartimos lo mínimo necesario con proveedores terceros de confianza cuando el servicio solicitado no puede prestarse de otro modo: hoteles y arrendadores, empresas de transporte y aerolíneas, operadores turísticos, servicios tecnológicos y de pago, plataformas de comunicación y otros socios que intervienen en la ejecución.',
            'No vendemos sus datos personales.']],
          ['4. Transferencias fuera de Brasil',
           'Algunos proveedores tecnológicos o de servicios pueden tratar datos fuera de Brasil. En caso de transferencia internacional adoptamos medidas razonables para cumplir la normativa de protección de datos aplicable, incluida la Ley General de Protección de Datos de Brasil (LGPD, Ley 13.709/2018).'],
          ['5. Cookies',
           'El sitio puede utilizar cookies y tecnologías similares para funcionar correctamente, mejorar funcionalidades, analizar el tráfico, mantener la seguridad y, cuando proceda, apoyar acciones de marketing. Puede gestionarlas desde la configuración de su navegador.'],
          ['6. Seguridad de los datos',
           'Aplicamos medidas técnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados, pérdida, uso indebido, alteración, divulgación y destrucción. Ningún método de transmisión o almacenamiento es completamente seguro.'],
          ['7. Sus derechos conforme a la ley brasileña',
           'En la medida prevista por la LGPD, usted puede obtener confirmación del tratamiento y acceso a sus datos, solicitar rectificación, anonimización, bloqueo o supresión en los casos legalmente previstos, obtener información sobre el uso compartido, retirar el consentimiento cuando el tratamiento se base en él, solicitar portabilidad, pedir la revisión de determinadas decisiones automatizadas y conocer las consecuencias de negar el consentimiento.'],
          ['8. Conservación',
           'Conservamos los datos personales solo durante el tiempo razonablemente necesario para las finalidades descritas: prestar servicios, cumplir obligaciones contractuales y legales, resolver controversias, mantener registros mercantiles y proteger intereses legítimos. Cuando dejan de ser necesarios, se suprimen de forma segura o se anonimizan conforme a la ley.'],
          ['9. Sitios de terceros',
           'El sitio puede enlazar a sitios, plataformas y servicios de terceros. No respondemos por sus prácticas de tratamiento de datos, seguridad, contenido o políticas.'],
          ['10. Menores',
           'Nuestros servicios no se dirigen a menores. No recogemos conscientemente datos personales de menores cuando ello esté prohibido por la ley aplicable.'],
          ['11. Modificaciones',
           'Podemos actualizar esta Política periódicamente. La versión actualizada se publica con una nueva fecha.'],
          ['12. Contacto',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      }
    },

    /* ── Italiano ─────────────────────────────────────────────────── */
    it: {
      upd: 'Ultimo aggiornamento: 1 settembre 2026',
      terms: {
        title: 'Condizioni d’uso',
        lead: [
          'Le presenti Condizioni disciplinano l’accesso e l’utilizzo del sito di ' + CO + ' («noi», «nostro») e dei nostri servizi di concierge.',
          'Accedendo o utilizzando il sito, accettate le presenti Condizioni. Se non le accettate, vi preghiamo di non utilizzare il sito.'
        ],
        s: [
          ['1. I nostri servizi',
           CO + ' fornisce servizi di concierge e di supporto allo stile di vita, aiutando i clienti a individuare, coordinare, organizzare e accedere a servizi ed esperienze offerti da terzi: viaggi, trasporti, alloggi, esperienze private, questioni immobiliari, servizi quotidiani, prenotazioni e altre soluzioni di concierge.'],
          ['2. Agiamo da intermediari, non da fornitori',
           ['Questa è una disposizione centrale delle presenti Condizioni. La grande maggioranza dei servizi organizzati tramite noi è eseguita da fornitori terzi indipendenti: vettori, autisti, armatori, compagnie aeree, alberghi, ristoranti, organizzatori di eventi, studi legali e contabili, proprietari di immobili, guide, interpreti e altri operatori.',
            'Agiamo come coordinatori e intermediari: selezioniamo il fornitore, negoziamo, concordiamo le condizioni e seguiamo la pratica fino al risultato. Non siamo proprietari di tali fornitori e non li gestiamo, controlliamo o impieghiamo, salvo quanto espressamente indicato.',
            'Ogni fornitore terzo ha proprie condizioni, prezzi, regole di prenotazione e cancellazione, requisiti e responsabilità. Utilizzando tale servizio instaurate un rapporto diretto con quel fornitore. Su vostra richiesta vi trasmettiamo le sue condizioni e vi aiutiamo a rispettarle.',
            'La presente clausola non esclude né limita la nostra responsabilità per ciò che eseguiamo direttamente, né pregiudica i diritti riconosciuti al consumatore da norme inderogabili.']],
          ['3. Richieste e conferma',
           'Le informazioni del sito hanno carattere generale e possono variare senza preavviso: prezzi, disponibilità, orari, luoghi, specifiche e condizioni del servizio. L’invio di una richiesta non costituisce di per sé prenotazione. Il servizio si considera confermato solo dopo conferma espressa da parte nostra o del fornitore.'],
          ['4. Prezzi e pagamenti',
           'I prezzi variano in base a disponibilità, domanda, tariffe dei fornitori, imposte, oneri, cambi e altri addebiti applicabili. Salvo indicazione espressa, i prezzi indicati sul sito non sono prezzi finali garantiti. Pagamenti, acconti, penali di cancellazione, commissioni di servizio e addebiti di terzi sono comunicati prima della conferma.'],
          ['5. Obblighi dell’utente',
           'Vi impegnate a fornire informazioni veritiere, a utilizzare il sito lecitamente, a non interferirne il funzionamento, a non tentare accessi non autorizzati, a non inviare informazioni fraudolente o ingannevoli, a non usare il sito per scopi illeciti e a trattare con rispetto gli altri utenti e i fornitori terzi.'],
          ['6. Proprietà intellettuale',
           'Salvo diversa indicazione, i contenuti del sito — testi, loghi, marchi, grafica, fotografie, design, impaginazione, video, software e altri materiali — appartengono a ' + CO + ' o sono utilizzati su licenza. È vietato copiare, riprodurre, distribuire, modificare, pubblicare, vendere, decompilare o sfruttare commercialmente tali contenuti senza previa autorizzazione scritta.'],
          ['7. Esclusione di garanzie',
           'Nei limiti consentiti dalla legge applicabile, il sito e i suoi contenuti sono forniti «così come sono» e «secondo disponibilità». Non garantiamo un funzionamento ininterrotto, privo di errori o pienamente sicuro. Ci adoperiamo ragionevolmente per mantenere le informazioni corrette, senza garantire che siano sempre complete, aggiornate e prive di errori.'],
          ['8. Limitazione di responsabilità',
           ['Nella massima misura consentita dalla legge applicabile, ' + CO + ' non risponde di perdite, danni, ritardi, cancellazioni, inadempimenti, atti od omissioni di fornitori terzi indipendenti — compagnie aeree, alberghi, imprese di trasporto, tour operator, proprietari di immobili, organizzatori di eventi — né di atti delle autorità, condizioni meteorologiche, calamità naturali, guasti tecnici, scioperi o altre circostanze fuori dal nostro ragionevole controllo.',
            'Nulla nelle presenti Condizioni esclude o limita la responsabilità ove ciò sia vietato dalla legge, inclusi i diritti del consumatore previsti dal Codice di difesa del consumatore brasiliano.']],
          ['9. Forza maggiore',
           'Non rispondiamo di inadempimenti o ritardi dovuti a circostanze fuori dal nostro ragionevole controllo, tra cui calamità naturali, condizioni meteorologiche estreme, guerra, terrorismo, disordini civili, atti governativi, epidemie, guasti alle infrastrutture e alle telecomunicazioni, scioperi ed eventi analoghi.'],
          ['10. Sicurezza del sito e condotte vietate',
           'È vietato compromettere la sicurezza o l’integrità del sito. Sono vietati l’accesso non autorizzato, lo sfruttamento di vulnerabilità, la diffusione di software dannoso, gli attacchi denial-of-service, l’abuso automatizzato, il furto di credenziali, la frode e ogni altra condotta illecita. Possiamo limitare o sospendere l’accesso quando vi sia ragionevole motivo di ritenere che il sito venga abusato.'],
          ['11. Collegamenti esterni',
           'Il sito può contenere collegamenti a siti e servizi di terzi. Non li controlliamo e non rispondiamo dei loro contenuti, disponibilità, sicurezza, politiche o pratiche.'],
          ['12. Riservatezza',
           'L’uso del sito è soggetto anche alla nostra Informativa sulla privacy, che spiega come raccogliamo e trattiamo i dati personali.'],
          ['13. Modifiche',
           'Possiamo modificare periodicamente le presenti Condizioni. La versione aggiornata è pubblicata con una nuova data. L’uso continuato dopo la pubblicazione ne comporta l’accettazione nei limiti consentiti dalla legge.'],
          ['14. Legge applicabile',
           'Le presenti Condizioni sono regolate dalle leggi della Repubblica Federativa del Brasile, fatte salve le norme inderogabili di tutela del consumatore e gli altri diritti irrinunciabili.'],
          ['15. Contatti',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      },
      privacy: {
        title: 'Informativa sulla privacy',
        lead: [
          'Rispettiamo la vostra riservatezza e ci impegniamo a proteggere i vostri dati personali.',
          'La presente Informativa spiega come ' + CO + ' raccoglie, utilizza, conserva, condivide e protegge i dati personali quando utilizzate il sito e i nostri servizi di concierge.'
        ],
        s: [
          ['1. Dati raccolti',
           'A seconda del modo in cui interagite con noi, possiamo raccogliere nome e cognome, indirizzo e-mail, telefono o WhatsApp, paese e località, preferenze e contenuto della richiesta, informazioni fornite tramite il modulo o nella corrispondenza, nonché dati tecnici: indirizzo IP, informazioni su browser e dispositivo, attività sul sito, cookie e tecnologie analoghe.'],
          ['2. Come utilizziamo i dati',
           'Utilizziamo i dati per rispondere alle richieste, prestare e coordinare servizi di concierge, organizzare i servizi richiesti, comunicare con voi, migliorare il sito e il servizio, mantenere la sicurezza, prevenire frodi e abusi, adempiere agli obblighi di legge e — ove consentito dalla legge e, se richiesto, con il vostro consenso — inviare comunicazioni commerciali.'],
          ['3. Con chi condividiamo',
           ['Condividiamo il minimo necessario con fornitori terzi affidabili quando il servizio richiesto non può essere reso altrimenti: alberghi e locatori, imprese di trasporto e compagnie aeree, tour operator, servizi tecnologici e di pagamento, piattaforme di comunicazione e altri partner coinvolti nell’esecuzione.',
            'Non vendiamo i vostri dati personali.']],
          ['4. Trasferimenti fuori dal Brasile',
           'Alcuni fornitori tecnologici o di servizi possono trattare i dati fuori dal Brasile. In caso di trasferimento internazionale adottiamo misure ragionevoli per rispettare la normativa applicabile in materia di protezione dei dati, inclusa la legge brasiliana LGPD (Legge 13.709/2018).'],
          ['5. Cookie',
           'Il sito può utilizzare cookie e tecnologie analoghe per funzionare correttamente, migliorare le funzionalità, analizzare il traffico, mantenere la sicurezza e, ove applicabile, supportare attività di marketing. Potete gestirli dalle impostazioni del browser.'],
          ['6. Sicurezza dei dati',
           'Adottiamo misure tecniche e organizzative ragionevoli per proteggere i dati personali da accessi non autorizzati, perdita, uso improprio, alterazione, divulgazione e distruzione. Nessun metodo di trasmissione o conservazione è completamente sicuro.'],
          ['7. I vostri diritti secondo la legge brasiliana',
           'Nella misura prevista dalla LGPD potete ottenere conferma del trattamento e accesso ai dati, chiedere rettifica, anonimizzazione, blocco o cancellazione nei casi previsti dalla legge, ottenere informazioni sulla condivisione, revocare il consenso quando il trattamento vi si basa, chiedere la portabilità, chiedere il riesame di determinate decisioni automatizzate ed essere informati delle conseguenze del rifiuto del consenso.'],
          ['8. Conservazione',
           'Conserviamo i dati personali solo per il tempo ragionevolmente necessario alle finalità descritte: prestare i servizi, adempiere obblighi contrattuali e di legge, risolvere controversie, tenere le scritture aziendali e tutelare interessi legittimi. Quando non sono più necessari, i dati sono cancellati in modo sicuro o anonimizzati secondo la legge.'],
          ['9. Siti di terzi',
           'Il sito può contenere collegamenti a siti, piattaforme e servizi di terzi. Non rispondiamo delle loro pratiche di trattamento dei dati, sicurezza, contenuti o politiche.'],
          ['10. Minori',
           'I nostri servizi non sono rivolti ai minori. Non raccogliamo consapevolmente dati personali di minori ove ciò sia vietato dalla legge applicabile.'],
          ['11. Modifiche',
           'Possiamo aggiornare periodicamente la presente Informativa. La versione aggiornata è pubblicata con una nuova data.'],
          ['12. Contatti',
           CO + '\nWhatsApp: ' + WA + '\nTelegram: ' + TG]
        ]
      }
    }
  };
})();
