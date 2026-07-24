/* data.js — curriculum content.
   Data lives as plain JS objects (not fetched JSON) so the app works
   when opened directly via file:// (double-click index.html), with
   no local server needed — fetch() of local JSON is blocked by CORS
   in that mode in most browsers.

   TO ADD CONTENT: extend CURRICULUM below. Each level has `skills`;
   each skill has `exercises`. Exercise types implemented in
   exercises.js: "mcq" (multiple choice) and "fill" (type the answer).
*/

const LEVELS_META = [
  { code:'A1', name_es:'Principiante', name_en:'Beginner' },
  { code:'A2', name_es:'Elemental',    name_en:'Elementary' },
  { code:'B1', name_es:'Intermedio',   name_en:'Intermediate' },
  { code:'B2', name_es:'Intermedio alto', name_en:'Upper-Intermediate' },
  { code:'C1', name_es:'Avanzado',     name_en:'Advanced' },
  { code:'C2', name_es:'Maestría',     name_en:'Mastery' },
];

const CURRICULUM = {

  A1: {
    skills: [
      {
        id:'a1-greetings',
        title_es:'Saludos y presentaciones',
        title_en:'Greetings & introductions',
        desc_es:'Palabras y frases básicas para saludar.',
        desc_en:'Basic words and phrases for greeting people.',
        exercises: [
          { type:'mcq', prompt_es:'¿Cómo se dice "Buenos días" en inglés?', prompt_en:'How do you say "Buenos días" in English?',
            options:['Good morning','Good night','Good bye','Good afternoon'], answer:'Good morning', speak:'Good morning' },
          { type:'mcq', prompt_es:'Traduce: "¿Cómo te llamas?"', prompt_en:'Translate: "¿Cómo te llamas?"',
            options:["What's your name?","How old are you?","Where are you from?","How are you?"], answer:"What's your name?", speak:"What's your name?" },
          { type:'fill', prompt_es:'Completa: "Nice to ___ you." (conocerte)', prompt_en:'Complete: "Nice to ___ you."',
            answer:'meet', speak:'Nice to meet you.' },
          { type:'mcq', prompt_es:'¿Cuál es la respuesta correcta a "How are you?"', prompt_en:'Which is a correct reply to "How are you?"',
            options:["I'm fine, thanks.","I'm five years.","I'm Monday.","I'm Caracas."], answer:"I'm fine, thanks." },
          { type:'fill', prompt_es:'Completa: "Good ___" (para despedirte de noche)', prompt_en:'Complete: "Good ___" (used at night)',
            answer:'night', speak:'Good night' },
          { type:'listen', prompt_es:'Escucha y escribe la frase completa.', prompt_en:'Listen and type the full phrase.',
            speak:'How are you today?', answer:'How are you today?' },
          { type:'mcq', prompt_es:'Traduce: "Con permiso" (para pasar entre personas)', prompt_en:'Translate: "Con permiso" (to pass by people)',
            options:['Excuse me','I am sorry','Please','Thank you'], answer:'Excuse me', speak:'Excuse me.' },
          { type:'fill', prompt_es:'Completa: "See you ___!" (luego)', prompt_en:'Complete: "See you ___!"',
            answer:'later', speak:'See you later!' },
        ]
      },
      {
        id:'a1-numbers',
        title_es:'Números y edad',
        title_en:'Numbers & age',
        desc_es:'Contar y decir tu edad en inglés.',
        desc_en:'Counting and saying your age in English.',
        exercises: [
          { type:'mcq', prompt_es:'¿Cómo se escribe el número 15 en inglés?', prompt_en:'How do you write the number 15 in English?',
            options:['fifteen','fifty','five','fourteen'], answer:'fifteen' },
          { type:'fill', prompt_es:'Completa: "I am twenty years ___." (viejo/de edad)', prompt_en:'Complete: "I am twenty years ___."',
            answer:'old' },
          { type:'mcq', prompt_es:'Traduce: "¿Cuántos años tienes?"', prompt_en:'Translate: "¿Cuántos años tienes?"',
            options:['How old are you?','How many are you?','What age you?','How old is you?'], answer:'How old are you?' },
          { type:'mcq', prompt_es:'¿Cuál número es "thirty"?', prompt_en:'Which number is "thirty"?',
            options:['30','13','3','33'], answer:'30' },
          { type:'fill', prompt_es:'Completa: "There are ___ students in the class." (doce)', prompt_en:'Complete: "There are ___ students in the class." (twelve)',
            answer:'twelve', speak:'There are twelve students in the class.' },
          { type:'mcq', prompt_es:'¿Cómo preguntas la edad de otra persona de forma educada?', prompt_en:'How do you politely ask someone their age?',
            options:['May I ask how old you are?','What is your age, tell me now.','Age? Now.','You, how old?'],
            answer:'May I ask how old you are?', speak:'May I ask how old you are?' },
        ]
      },
      {
        id:'a1-family',
        title_es:'La familia',
        title_en:'Family',
        desc_es:'Vocabulario básico de la familia.',
        desc_en:'Basic family vocabulary.',
        exercises: [
          { type:'mcq', prompt_es:'"Madre" en inglés es:', prompt_en:'"Madre" in English is:',
            options:['Mother','Father','Sister','Brother'], answer:'Mother' },
          { type:'mcq', prompt_es:'"Hermano" en inglés es:', prompt_en:'"Hermano" in English is:',
            options:['Brother','Sister','Uncle','Son'], answer:'Brother' },
          { type:'fill', prompt_es:'Completa: "My father\'s father is my grand___."', prompt_en:'Complete: "My father\'s father is my grand___."',
            answer:'father' },
          { type:'mcq', prompt_es:'"Prima/primo" en inglés es:', prompt_en:'"Prima/primo" in English is:',
            options:['Cousin','Nephew','Niece','Aunt'], answer:'Cousin', speak:'She is my cousin.' },
          { type:'fill', prompt_es:'Completa: "My mother\'s sister is my ___." (tía)', prompt_en:'Complete: "My mother\'s sister is my ___."',
            answer:'aunt', speak:'My mother\'s sister is my aunt.' },
        ]
      },
    ]
  },

  A2: {
    skills: [
      {
        id:'a2-daily-routine',
        title_es:'Rutina diaria',
        title_en:'Daily routine',
        desc_es:'Hablar de lo que haces cada día (presente simple).',
        desc_en:'Talking about what you do every day (present simple).',
        exercises: [
          { type:'mcq', prompt_es:'Traduce: "Yo me levanto a las siete."', prompt_en:'Translate: "Yo me levanto a las siete."',
            options:['I wake up at seven.','I woke up at seven.','I waking up at seven.','I wakes up at seven.'],
            answer:'I wake up at seven.', speak:'I wake up at seven.' },
          { type:'fill', prompt_es:'Completa: "She ___ to work every day." (va)', prompt_en:'Complete: "She ___ to work every day."',
            answer:'goes', speak:'She goes to work every day.' },
          { type:'mcq', prompt_es:'¿Cuál oración usa correctamente la tercera persona?', prompt_en:'Which sentence correctly uses third person?',
            options:['He watches TV at night.','He watch TV at night.','He watching TV at night.','He watched TV at night, always.'],
            answer:'He watches TV at night.', speak:'He watches TV at night.' },
          { type:'listen', prompt_es:'Escucha y escribe la frase.', prompt_en:'Listen and type the sentence.',
            speak:'I have breakfast at eight o\'clock.', answer:'I have breakfast at eight o\'clock' },
          { type:'fill', prompt_es:'Completa: "We ___ visit my grandmother on Sundays." (usualmente)', prompt_en:'Complete: "We ___ visit my grandmother on Sundays."',
            answer:'usually', speak:'We usually visit my grandmother on Sundays.' },
          { type:'mcq', prompt_es:'¿Cuál es la pregunta correcta en presente simple?', prompt_en:'Which is the correct question in present simple?',
            options:['Does she work on Mondays?','Does she works on Mondays?','Is she work on Mondays?','She works on Mondays?'],
            answer:'Does she work on Mondays?', speak:'Does she work on Mondays?' },
        ]
      },
      {
        id:'a2-past-simple',
        title_es:'Pasado simple',
        title_en:'Past simple',
        desc_es:'Contar cosas que ya pasaron.',
        desc_en:'Talking about things that already happened.',
        exercises: [
          { type:'mcq', prompt_es:'Traduce: "Ayer trabajé mucho."', prompt_en:'Translate: "Ayer trabajé mucho."',
            options:['I worked a lot yesterday.','I work a lot yesterday.','I working a lot yesterday.','I works a lot yesterday.'],
            answer:'I worked a lot yesterday.', speak:'I worked a lot yesterday.' },
          { type:'fill', prompt_es:'Completa (verbo irregular): "She ___ to Caracas last year." (fue)', prompt_en:'Complete (irregular verb): "She ___ to Caracas last year."',
            answer:'went', speak:'She went to Caracas last year.' },
          { type:'mcq', prompt_es:'¿Cuál es el pasado de "to eat"?', prompt_en:'What is the past tense of "to eat"?',
            options:['ate','eated','eaten','eating'], answer:'ate', speak:'I ate breakfast.' },
          { type:'fill', prompt_es:'Completa: "Did you ___ the movie?" (ver, forma base)', prompt_en:'Complete: "Did you ___ the movie?" (base form)',
            answer:'watch', speak:'Did you watch the movie?' },
          { type:'mcq', prompt_es:'¿Cuál es la forma negativa correcta de "She went to the party"?', prompt_en:'Which is the correct negative form of "She went to the party"?',
            options:["She didn't go to the party.","She not went to the party.","She didn't went to the party.","She goes not to the party."],
            answer:"She didn't go to the party.", speak:"She didn't go to the party." },
          { type:'fill', prompt_es:'Completa (pasado de "buy"): "I ___ a new phone last week." (compré)', prompt_en:'Complete (past of "buy"): "I ___ a new phone last week."',
            answer:'bought', speak:'I bought a new phone last week.' },
        ]
      },
      {
        id:'a2-shopping',
        title_es:'De compras',
        title_en:'Shopping',
        desc_es:'Frases útiles para comprar en una tienda.',
        desc_en:'Useful phrases for shopping.',
        exercises: [
          { type:'mcq', prompt_es:'Traduce: "¿Cuánto cuesta esto?"', prompt_en:'Translate: "¿Cuánto cuesta esto?"',
            options:['How much is this?','How many is this?','How much are this?','How this cost?'],
            answer:'How much is this?', speak:'How much is this?' },
          { type:'fill', prompt_es:'Completa: "Can I ___ this in a different size?" (probar)', prompt_en:'Complete: "Can I ___ this in a different size?"',
            answer:'try', speak:'Can I try this in a different size?' },
          { type:'mcq', prompt_es:'¿Cómo preguntas dónde está la caja registradora?', prompt_en:'How do you ask where the checkout is?',
            options:['Where is the checkout?','Where the checkout is?','Where checkout is?','Is where the checkout?'],
            answer:'Where is the checkout?', speak:'Where is the checkout?' },
          { type:'mcq', prompt_es:'¿Cómo preguntas si aceptan tarjeta?', prompt_en:'How do you ask if they accept card payment?',
            options:['Do you accept cards?','You accept cards?','Accept you cards?','Cards accept?'],
            answer:'Do you accept cards?', speak:'Do you accept cards?' },
          { type:'fill', prompt_es:'Completa: "Can I have a ___, please?" (recibo)', prompt_en:'Complete: "Can I have a ___, please?"',
            answer:'receipt', speak:'Can I have a receipt, please?' },
        ]
      },
    ]
  },
  B1: {
    skills: [
      {
        id:'b1-present-perfect',
        title_es:'Presente perfecto',
        title_en:'Present perfect',
        desc_es:'Hablar de experiencias y acciones sin tiempo específico.',
        desc_en:'Talking about experiences and actions without a specific time.',
        exercises: [
          { type:'mcq', prompt_es:'Traduce: "He visitado Londres tres veces."', prompt_en:'Translate: "He visitado Londres tres veces."',
            options:['I have visited London three times.','I visited London three times.','I have visit London three times.','I visiting London three times.'],
            answer:'I have visited London three times.', speak:'I have visited London three times.' },
          { type:'fill', prompt_es:'Completa: "She has never ___ sushi." (probado)', prompt_en:'Complete: "She has never ___ sushi."',
            answer:'tried', speak:'She has never tried sushi.' },
          { type:'mcq', prompt_es:'¿Cuál oración usa correctamente el presente perfecto?', prompt_en:'Which sentence correctly uses present perfect?',
            options:['Have you ever been to Japan?','Have you ever went to Japan?','Did you ever been to Japan?','You have ever go to Japan?'],
            answer:'Have you ever been to Japan?', speak:'Have you ever been to Japan?' },
          { type:'listen', prompt_es:'Escucha y escribe la frase.', prompt_en:'Listen and type the sentence.',
            speak:'They have already finished the project.', answer:'They have already finished the project' },
          { type:'mcq', prompt_es:'¿Cuál preposición se usa con un período de tiempo ("desde hace 3 años")?', prompt_en:'Which preposition is used with a duration ("for 3 years")?',
            options:['for','since','from','during'], answer:'for', speak:"I have lived here for three years." },
          { type:'fill', prompt_es:'Completa: "I have known her ___ 2019." (desde)', prompt_en:'Complete: "I have known her ___ 2019." (since)',
            answer:'since', speak:'I have known her since 2019.' },
        ]
      },
      {
        id:'b1-future-plans',
        title_es:'Planes futuros (going to / will)',
        title_en:'Future plans (going to / will)',
        desc_es:'Diferenciar entre planes decididos y decisiones espontáneas.',
        desc_en:'Distinguishing decided plans from spontaneous decisions.',
        exercises: [
          { type:'mcq', prompt_es:'Traduce (plan ya decidido): "Voy a estudiar inglés este año."', prompt_en:'Translate (already-decided plan): "Voy a estudiar inglés este año."',
            options:["I'm going to study English this year.","I will study English this year.","I study English this year.","I studying English this year."],
            answer:"I'm going to study English this year.", speak:"I'm going to study English this year." },
          { type:'fill', prompt_es:'Completa (decisión espontánea): "It\'s cold. I ___ close the window." (voy a cerrar)', prompt_en:'Complete (spontaneous decision): "It\'s cold. I ___ close the window."',
            answer:'will', speak:"I will close the window." },
          { type:'mcq', prompt_es:'¿Cuál frase describe una predicción con evidencia visible?', prompt_en:'Which sentence describes a prediction with visible evidence?',
            options:['Look at those clouds — it\'s going to rain.','Look at those clouds — it will rain.','Look at those clouds — it rains.','Look at those clouds — it rained.'],
            answer:'Look at those clouds — it\'s going to rain.', speak:'Look at those clouds, it is going to rain.' },
          { type:'fill', prompt_es:'Completa (negación de "will"): "Don\'t worry, I ___ tell anyone." (no diré)', prompt_en:'Complete (negative "will"): "Don\'t worry, I ___ tell anyone."',
            answer:"won't", speak:"I won't tell anyone." },
          { type:'mcq', prompt_es:'¿Cuál oración usa "will" para una promesa espontánea?', prompt_en:'Which sentence uses "will" for a spontaneous promise?',
            options:["I'll help you with that, don't worry.","I'm going to help you with that.","I help you with that.","I helped you with that."],
            answer:"I'll help you with that, don't worry.", speak:"I'll help you with that, don't worry." },
        ]
      },
      {
        id:'b1-comparatives',
        title_es:'Comparativos y superlativos',
        title_en:'Comparatives & superlatives',
        desc_es:'Comparar personas, cosas y lugares.',
        desc_en:'Comparing people, things, and places.',
        exercises: [
          { type:'mcq', prompt_es:'Traduce: "Este carro es más rápido que ese."', prompt_en:'Translate: "Este carro es más rápido que ese."',
            options:['This car is faster than that one.','This car is more fast than that one.','This car is fastest than that one.','This car is fast than that one.'],
            answer:'This car is faster than that one.', speak:'This car is faster than that one.' },
          { type:'fill', prompt_es:'Completa (superlativo de "good"): "This is the ___ restaurant in town." (mejor)', prompt_en:'Complete (superlative of "good"): "This is the ___ restaurant in town."',
            answer:'best', speak:'This is the best restaurant in town.' },
          { type:'mcq', prompt_es:'¿Cuál es el comparativo correcto de "expensive"?', prompt_en:'What is the correct comparative of "expensive"?',
            options:['more expensive','expensiver','most expensive','more expensiver'],
            answer:'more expensive', speak:'This one is more expensive.' },
          { type:'fill', prompt_es:'Completa (igualdad): "She is ___ tall as her brother." (tan)', prompt_en:'Complete (equality): "She is ___ tall as her brother."',
            answer:'as', speak:'She is as tall as her brother.' },
          { type:'mcq', prompt_es:'Traduce: "Esta ciudad es la más segura del país."', prompt_en:'Translate: "Esta ciudad es la más segura del país."',
            options:['This city is the safest in the country.','This city is the more safe in the country.','This city is safer in the country.','This city is the most safer in the country.'],
            answer:'This city is the safest in the country.', speak:'This city is the safest in the country.' },
        ]
      },
    ]
  },
  B2: {
    skills: [
      {
        id:'b2-modals-deduction',
        title_es:'Modales de deducción',
        title_en:'Modals of deduction',
        desc_es:'Expresar certeza, posibilidad y duda sobre el presente y el pasado.',
        desc_en:'Expressing certainty, possibility, and doubt about present and past.',
        exercises: [
          { type:'mcq', prompt_es:'Traduce (certeza fuerte): "Debe estar en casa, su carro está afuera."', prompt_en:'Translate (strong certainty): "Debe estar en casa, su carro está afuera."',
            options:['He must be home, his car is outside.','He should be home, his car is outside.','He can be home, his car is outside.','He might be home, his car is outside.'],
            answer:'He must be home, his car is outside.', speak:'He must be home, his car is outside.' },
          { type:'fill', prompt_es:'Completa (deducción pasada, negativa): "She ___ have forgotten; she never forgets." (no puede)', prompt_en:'Complete (past deduction, negative): "She ___ have forgotten; she never forgets."',
            answer:"can't", speak:"She can't have forgotten." },
          { type:'mcq', prompt_es:'¿Cuál expresa una posibilidad, no certeza?', prompt_en:'Which expresses possibility, not certainty?',
            options:['It might rain later.','It must rain later.','It has to rain later.','It rains later, for sure.'],
            answer:'It might rain later.', speak:'It might rain later.' },
          { type:'listen', prompt_es:'Escucha y escribe la frase.', prompt_en:'Listen and type the sentence.',
            speak:'They must have left already.', answer:'They must have left already' },
          { type:'mcq', prompt_es:'¿Cuál expresa arrepentimiento por algo que sí hiciste?', prompt_en:'Which expresses regret about something you did?',
            options:["I shouldn't have said that.","I mustn't have said that.","I can't have said that.","I might not say that."],
            answer:"I shouldn't have said that.", speak:"I shouldn't have said that." },
          { type:'fill', prompt_es:'Completa (posibilidad pasada): "She ___ have missed the bus." (podría)', prompt_en:'Complete (past possibility): "She ___ have missed the bus."',
            answer:'could', speak:'She could have missed the bus.' },
        ]
      },
      {
        id:'b2-passive-voice',
        title_es:'Voz pasiva',
        title_en:'Passive voice',
        desc_es:'Cuando la acción importa más que quién la hace.',
        desc_en:'When the action matters more than who does it.',
        exercises: [
          { type:'mcq', prompt_es:'Traduce a voz pasiva: "Someone stole my bike."', prompt_en:'Translate to passive: "Someone stole my bike."',
            options:['My bike was stolen.','My bike is stolen.','My bike stole.','My bike has stole.'],
            answer:'My bike was stolen.', speak:'My bike was stolen.' },
          { type:'fill', prompt_es:'Completa (pasiva, presente): "The reports ___ reviewed every Friday." (son)', prompt_en:'Complete (passive, present): "The reports ___ reviewed every Friday."',
            answer:'are', speak:'The reports are reviewed every Friday.' },
          { type:'mcq', prompt_es:'¿Cuál oración está correctamente en pasiva con "by"?', prompt_en:'Which sentence correctly uses passive with "by"?',
            options:['The bridge was designed by a famous engineer.','The bridge designed by a famous engineer.','The bridge was design by a famous engineer.','The bridge is designing by a famous engineer.'],
            answer:'The bridge was designed by a famous engineer.', speak:'The bridge was designed by a famous engineer.' },
          { type:'fill', prompt_es:'Completa (pasiva con modal): "The results ___ be announced tomorrow." (serán)', prompt_en:'Complete (passive with modal): "The results ___ be announced tomorrow."',
            answer:'will', speak:'The results will be announced tomorrow.' },
          { type:'mcq', prompt_es:'Traduce a pasiva: "They are building a new hospital."', prompt_en:'Translate to passive: "They are building a new hospital."',
            options:['A new hospital is being built.','A new hospital is build.','A new hospital was being built.','A new hospital is building.'],
            answer:'A new hospital is being built.', speak:'A new hospital is being built.' },
        ]
      },
      {
        id:'b2-reported-speech',
        title_es:'Estilo indirecto',
        title_en:'Reported speech',
        desc_es:'Contar lo que otra persona dijo.',
        desc_en:'Reporting what someone else said.',
        exercises: [
          { type:'mcq', prompt_es:'Directo: "I am tired," she said. → Indirecto:', prompt_en:'Direct: "I am tired," she said. → Reported:',
            options:['She said she was tired.','She said she is tired.','She said she is being tired.','She said she has tired.'],
            answer:'She said she was tired.', speak:'She said she was tired.' },
          { type:'fill', prompt_es:'Completa: "He told me he ___ coming to the party." (venía, forma pasada)', prompt_en:'Complete: "He told me he ___ coming to the party."',
            answer:'was', speak:'He told me he was coming to the party.' },
          { type:'mcq', prompt_es:'Directo: "Can you help me?" → Indirecto:', prompt_en:'Direct: "Can you help me?" → Reported:',
            options:['She asked if I could help her.','She asked can I help her.','She asked if I can help her.','She asked if you could help me.'],
            answer:'She asked if I could help her.', speak:'She asked if I could help her.' },
          { type:'mcq', prompt_es:'Directo: "Where do you live?" → Indirecto:', prompt_en:'Direct: "Where do you live?" → Reported:',
            options:['He asked where I lived.','He asked where do I live.','He asked where I live.','He asked where did I live.'],
            answer:'He asked where I lived.', speak:'He asked where I lived.' },
          { type:'fill', prompt_es:'Completa (orden imperativo indirecto): "The teacher told us ___ be quiet." (a)', prompt_en:'Complete (reported command): "The teacher told us ___ be quiet."',
            answer:'to', speak:'The teacher told us to be quiet.' },
        ]
      },
    ]
  },

  C1: {
    skills: [
      {
        id:'c1-mixed-conditionals',
        title_es:'Condicionales mixtos',
        title_en:'Mixed conditionals',
        desc_es:'Combinar tiempos para hablar de resultados hipotéticos entre pasado y presente.',
        desc_en:'Mixing time frames to talk about hypothetical results across past and present.',
        exercises: [
          { type:'mcq', prompt_es:'Traduce (pasado hipotético → presente): "Si hubiera estudiado medicina, ahora sería doctor."', prompt_en:'Translate (hypothetical past → present result): "Si hubiera estudiado medicina, ahora sería doctor."',
            options:['If I had studied medicine, I would be a doctor now.','If I studied medicine, I would be a doctor now.','If I have studied medicine, I would be a doctor now.','If I had studied medicine, I will be a doctor now.'],
            answer:'If I had studied medicine, I would be a doctor now.', speak:'If I had studied medicine, I would be a doctor now.' },
          { type:'fill', prompt_es:'Completa: "If she weren\'t so busy, she ___ have missed the deadline." (no habría)', prompt_en:'Complete: "If she weren\'t so busy, she ___ have missed the deadline."',
            answer:"wouldn't", speak:"If she weren't so busy, she wouldn't have missed the deadline." },
          { type:'mcq', prompt_es:'¿Cuál oración mezcla correctamente pasado y presente hipotético?', prompt_en:'Which sentence correctly mixes hypothetical past and present?',
            options:["If he hadn't lost his job, he wouldn't be so stressed now.","If he didn't lose his job, he wouldn't be so stressed now.","If he hasn't lost his job, he wouldn't be so stressed now.","If he hadn't lost his job, he won't be so stressed now."],
            answer:"If he hadn't lost his job, he wouldn't be so stressed now.", speak:"If he hadn't lost his job, he wouldn't be so stressed now." },
          { type:'fill', prompt_es:'Completa (presente hipotético → resultado pasado): "If I ___ more organized, I would have finished on time." (fuera)', prompt_en:'Complete (hypothetical present → past result): "If I ___ more organized, I would have finished on time."',
            answer:'were', speak:'If I were more organized, I would have finished on time.' },
          { type:'mcq', prompt_es:'¿Cuál es tercer condicional puro (pasado hipotético → resultado pasado)?', prompt_en:'Which is a pure third conditional (hypothetical past → past result)?',
            options:["If it hadn't rained, we would have gone to the beach.","If it doesn't rain, we would go to the beach.","If it hadn't rained, we go to the beach.","If it rains, we would have gone."],
            answer:"If it hadn't rained, we would have gone to the beach.", speak:"If it hadn't rained, we would have gone to the beach." },
        ]
      },
      {
        id:'c1-phrasal-verbs',
        title_es:'Verbos frasales y colocaciones',
        title_en:'Phrasal verbs & collocations',
        desc_es:'Uso natural de combinaciones frecuentes en inglés avanzado.',
        desc_en:'Natural use of frequent word combinations in advanced English.',
        exercises: [
          { type:'mcq', prompt_es:'"Postergar una reunión" se dice mejor:', prompt_en:'"To postpone a meeting" is best expressed as:',
            options:['put off a meeting','put on a meeting','put up a meeting','put out a meeting'],
            answer:'put off a meeting', speak:'We had to put off the meeting.' },
          { type:'fill', prompt_es:'Completa: "I need to look ___ this issue before the deadline." (investigar)', prompt_en:'Complete: "I need to look ___ this issue before the deadline."',
            answer:'into', speak:'I need to look into this issue.' },
          { type:'mcq', prompt_es:'¿Cuál colocación es correcta con "decision"?', prompt_en:'Which collocation is correct with "decision"?',
            options:['make a decision','do a decision','take a decision','have a decision'],
            answer:'make a decision', speak:'We need to make a decision.' },
          { type:'fill', prompt_es:'Completa: "The project fell ___ due to lack of funding." (fracasó)', prompt_en:'Complete: "The project fell ___ due to lack of funding."',
            answer:'through', speak:'The project fell through.' },
          { type:'mcq', prompt_es:'"Encontrarse algo por casualidad" se dice:', prompt_en:'"To find something by chance" is:',
            options:['come across','come over','come up','come into'], answer:'come across', speak:'I came across an old photo.' },
          { type:'fill', prompt_es:'Completa: "She decided to ___ up smoking." (dejar/renunciar)', prompt_en:'Complete: "She decided to ___ up smoking."',
            answer:'give', speak:'She decided to give up smoking.' },
        ]
      },
      {
        id:'c1-cohesion',
        title_es:'Conectores y cohesión avanzada',
        title_en:'Advanced connectors & cohesion',
        desc_es:'Enlazar ideas complejas con precisión, como en un ensayo.',
        desc_en:'Linking complex ideas precisely, as in an essay.',
        exercises: [
          { type:'mcq', prompt_es:'¿Cuál conector introduce mejor un contraste formal?', prompt_en:'Which connector best introduces a formal contrast?',
            options:['Nevertheless','But','So','And'],
            answer:'Nevertheless', speak:'Nevertheless, the results were inconclusive.' },
          { type:'fill', prompt_es:'Completa: "___ the delays, the project was finished on time." (a pesar de)', prompt_en:'Complete: "___ the delays, the project was finished on time."',
            answer:'Despite', speak:'Despite the delays, the project was finished on time.' },
          { type:'mcq', prompt_es:'¿Cuál conector expresa consecuencia de forma más formal que "so"?', prompt_en:'Which connector expresses consequence more formally than "so"?',
            options:['Consequently','And so','Then','Also'],
            answer:'Consequently', speak:'Consequently, the plan was revised.' },
          { type:'mcq', prompt_es:'¿Cuál conector contrasta dos ideas dentro de la misma oración?', prompt_en:'Which connector contrasts two ideas within the same sentence?',
            options:['whereas','moreover','therefore','furthermore'], answer:'whereas', speak:'She loves the city, whereas he prefers the countryside.' },
          { type:'fill', prompt_es:'Completa: "___, the report failed to address the main issue." (además)', prompt_en:'Complete: "___, the report failed to address the main issue."',
            answer:'Moreover', speak:'Moreover, the report failed to address the main issue.' },
        ]
      },
    ]
  },

  C2: {
    skills: [
      {
        id:'c2-inversion-emphasis',
        title_es:'Inversión y estructuras enfáticas',
        title_en:'Inversion & emphatic structures',
        desc_es:'Registro formal/literario: invertir el orden para dar énfasis.',
        desc_en:'Formal/literary register: inverting word order for emphasis.',
        exercises: [
          { type:'mcq', prompt_es:'¿Cuál es la forma invertida correcta de "I have never seen such chaos"?', prompt_en:'Which is the correct inverted form of "I have never seen such chaos"?',
            options:['Never have I seen such chaos.','Never I have seen such chaos.','Never did I have seen such chaos.','Never have seen I such chaos.'],
            answer:'Never have I seen such chaos.', speak:'Never have I seen such chaos.' },
          { type:'fill', prompt_es:'Completa (inversión con "not only"): "Not only ___ she late, she also forgot the documents." (llegó)', prompt_en:'Complete (inversion with "not only"): "Not only ___ she late, she also forgot the documents."',
            answer:'was', speak:'Not only was she late, she also forgot the documents.' },
          { type:'mcq', prompt_es:'¿Cuál oración usa correctamente "Under no circumstances"?', prompt_en:'Which sentence correctly uses "Under no circumstances"?',
            options:['Under no circumstances should you sign this.','Under no circumstances you should sign this.','Under no circumstances you sign this.','Under no circumstances should sign you this.'],
            answer:'Under no circumstances should you sign this.', speak:'Under no circumstances should you sign this.' },
          { type:'fill', prompt_es:'Completa (inversión con "Only after"): "Only after the meeting ___ we understand the plan." (hicimos)', prompt_en:'Complete (inversion with "Only after"): "Only after the meeting ___ we understand the plan."',
            answer:'did', speak:'Only after the meeting did we understand the plan.' },
          { type:'mcq', prompt_es:'¿Cuál es la forma invertida correcta de "I rarely realized how difficult it was"?', prompt_en:'Which is the correct inverted form of "I rarely realized how difficult it was"?',
            options:['Rarely did I realize how difficult it was.','Rarely I realized how difficult it was.','Rarely did I realized how difficult it was.','Rarely I did realize how difficult it was.'],
            answer:'Rarely did I realize how difficult it was.', speak:'Rarely did I realize how difficult it was.' },
        ]
      },
      {
        id:'c2-nuanced-idioms',
        title_es:'Matices idiomáticos y registro',
        title_en:'Nuanced idioms & register',
        desc_es:'Elegir la expresión correcta según el nivel de formalidad.',
        desc_en:'Choosing the right expression for the level of formality.',
        exercises: [
          { type:'mcq', prompt_es:'En un contexto muy formal, "to find out" se reemplaza mejor por:', prompt_en:'In a very formal context, "to find out" is better replaced by:',
            options:['to ascertain','to figure out','to dig up','to suss out'],
            answer:'to ascertain', speak:'We need to ascertain the facts.' },
          { type:'fill', prompt_es:'Completa (idioma: aceptar una pérdida con calma): "We\'ll just have to cut our ___." (pérdidas)', prompt_en:'Complete (idiom: to accept a loss calmly): "We\'ll just have to cut our ___."',
            answer:'losses', speak:'We\'ll just have to cut our losses.' },
          { type:'mcq', prompt_es:'¿Cuál expresión es un eufemismo apropiado para "despedir a alguien" en un memo corporativo?', prompt_en:'Which expression is an appropriate euphemism for "firing someone" in a corporate memo?',
            options:['letting someone go','kicking someone out','sacking someone','dumping someone'],
            answer:'letting someone go', speak:'We are letting him go.' },
          { type:'fill', prompt_es:'Completa (idioma: llegar a un acuerdo con esfuerzo): "After hours of talks, they finally reached ___ common ground." (un)', prompt_en:'Complete (idiom: to reach agreement with effort): "After hours of talks, they finally reached ___ common ground."',
            answer:'a', speak:'They finally reached a common ground.' },
          { type:'mcq', prompt_es:'¿Cuál expresión es apropiada en registro casual entre amigos, no en un memo?', prompt_en:'Which expression is appropriate in casual register among friends, not in a memo?',
            options:['dig up some info','ascertain the facts','conduct an inquiry','undertake an investigation'],
            answer:'dig up some info', speak:'Can you dig up some info on that?' },
        ]
      },
      {
        id:'c2-academic-discourse',
        title_es:'Discurso académico sutil',
        title_en:'Subtle academic discourse',
        desc_es:'Matizar afirmaciones con precisión, como en escritura académica.',
        desc_en:'Hedging claims with precision, as in academic writing.',
        exercises: [
          { type:'mcq', prompt_es:'¿Cuál oración matiza correctamente una afirmación (no es 100% seguro)?', prompt_en:'Which sentence correctly hedges a claim (not 100% certain)?',
            options:['The data would seem to suggest a correlation.','The data suggest a correlation, definitely.','The data prove a correlation.','The data is a correlation.'],
            answer:'The data would seem to suggest a correlation.', speak:'The data would seem to suggest a correlation.' },
          { type:'fill', prompt_es:'Completa (matiz académico): "It could be ___ that the results were skewed." (argumentado)', prompt_en:'Complete (academic hedge): "It could be ___ that the results were skewed."',
            answer:'argued', speak:'It could be argued that the results were skewed.' },
          { type:'mcq', prompt_es:'¿Cuál frase es apropiada para introducir una limitación del estudio?', prompt_en:'Which phrase is appropriate for introducing a study\'s limitation?',
            options:['It is worth noting that the sample size was small.','The sample size was small, sorry.','Sample size, small, unfortunately.','Small sample, my bad.'],
            answer:'It is worth noting that the sample size was small.', speak:'It is worth noting that the sample size was small.' },
          { type:'mcq', prompt_es:'¿Cuál adverbio matiza mejor una afirmación disputable en un ensayo?', prompt_en:'Which adverb best hedges a disputable claim in an essay?',
            options:['Arguably','Definitely','Obviously','Undoubtedly'], answer:'Arguably', speak:'Arguably, the policy had unintended consequences.' },
          { type:'fill', prompt_es:'Completa (formal, necesidad urgente): "It is ___ that we address this immediately." (imperativo)', prompt_en:'Complete (formal, urgent necessity): "It is ___ that we address this immediately."',
            answer:'imperative', speak:'It is imperative that we address this immediately.' },
        ]
      },
    ]
  },
};
