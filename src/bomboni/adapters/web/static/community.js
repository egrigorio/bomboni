/* Bomboni community layer: public reviews, photos, dish votes, check-ins,
   queue reports, follows, lunch meetups, lists, Q&A, badges and rankings.
   Activates only when /api/community/status reports a configured database;
   otherwise the app keeps its device-only behaviour. */
(() => {
  const SESSION_KEY = 'bomboni-session';
  const IMPORTED_KEY = 'bomboni-community-imported';

  const CT = {
    pt: { community:'Comunidade', searchPeople:'Procurar pessoas', feed:'Feed', meetups:'Almoços', lists:'Listas', ranking:'Ranking', everyone:'Todos', followingTab:'A seguir',
      reviews:'Avaliações', photos:'Fotos', questions:'Perguntas', reviewsCount:n=>`${n} ${n===1?'avaliação':'avaliações'}`, noReviews:'Ainda sem avaliações. Sê o primeiro!',
      queue:'Fila', queueLevels:['Curta','Média','Longa'], queueAsk:'Como está a fila agora?', queueNone:'Sem info', today:n=>`${n} hoje`,
      friendsHere:names=>`${names.join(', ')} ${names.length===1?'comeu':'comeram'} aqui esta semana`, helpful:'Útil', report:'Denunciar', reported:'Obrigado, vamos rever.',
      addPhoto:'Adicionar foto', photoAdded:'Foto partilhada!', photoTooLarge:'Foto demasiado grande.', noPhotos:'Ainda sem fotos deste restaurante.',
      ask:'Perguntar', askPlaceholder:'Pergunta à comunidade…', answer:'Responder', answerPlaceholder:'A tua resposta…', noQuestions:'Sem perguntas ainda.',
      planLunch:'Combinar almoço', at:'às', notePlaceholder:'Nota (opcional)', create:'Criar', join:'Vou', leave:'Sair', cancelMeetup:'Cancelar', noMeetups:'Sem almoços combinados. Abre um restaurante e toca em “Combinar almoço”.', meetupCreated:'Almoço combinado!',
      newList:'Nova lista', listTitle:'Título', listDescription:'Descrição (opcional)', addToList:'Guardar numa lista', added:'Adicionado!', noLists:'Ainda sem listas.', places:n=>`${n} ${n===1?'sítio':'sítios'}`, remove:'Remover', deleteList:'Apagar lista',
      allFaculties:'Todas as faculdades', points:'pts', noRanking:'O ranking deste mês ainda está vazio.', trending:'Em alta hoje', emptyFeed:'Ainda não há atividade. Faz check-in com “Comi aqui”!',
      ateAt:'comeu em', rated:'avaliou', photoAt:'partilhou uma foto em', follow:'Seguir', followingBtn:'A seguir', followers:'seguidores', followingCount:'a seguir', checkins:'refeições', privateProfile:'Este perfil é privado.',
      badges:'Medalhas', streak:n=>n===1?'1 dia seguido':`${n} dias seguidos`, publicProfile:'Ver perfil público', editProfile:'Editar perfil', bio:'Bio', faculty:'Faculdade', city:'Cidade', privateToggle:'Perfil privado', save:'Guardar', saved:'Guardado!',
      recap:'Resumo do semestre', meals:'refeições', spent:'gasto', topPlace:'Sítio preferido', topDish:'Prato preferido', loginNeeded:'Inicia sessão no Perfil para participar.', signupFailed:'Não foi possível enviar o código. Tenta mais tarde.', devCode:c=>`Código (modo local): ${c}`,
      taste:'Sabor', portion:'Porção', value:'Preço/qualidade', wait:'Espera', translated:'Traduzido', original:'Ver original', back:'Voltar', error:'Algo correu mal. Tenta de novo.',
      badgeNames:{explorer:'Explorador',photographer:'Fotógrafo',critic:'Crítico',trusted:'De confiança',pioneer:'Pioneiro',streak:'Em sequência'}, shareCheckin:'Check-in partilhado' },
    en: { community:'Community', searchPeople:'Search people', feed:'Feed', meetups:'Lunches', lists:'Lists', ranking:'Ranking', everyone:'Everyone', followingTab:'Following',
      reviews:'Reviews', photos:'Photos', questions:'Questions', reviewsCount:n=>`${n} ${n===1?'review':'reviews'}`, noReviews:'No reviews yet. Be the first!',
      queue:'Queue', queueLevels:['Short','Medium','Long'], queueAsk:'How is the queue right now?', queueNone:'No info', today:n=>`${n} today`,
      friendsHere:names=>`${names.join(', ')} ate here this week`, helpful:'Helpful', report:'Report', reported:'Thanks, we will review it.',
      addPhoto:'Add photo', photoAdded:'Photo shared!', photoTooLarge:'Photo is too large.', noPhotos:'No photos of this restaurant yet.',
      ask:'Ask', askPlaceholder:'Ask the community…', answer:'Answer', answerPlaceholder:'Your answer…', noQuestions:'No questions yet.',
      planLunch:'Plan a lunch', at:'at', notePlaceholder:'Note (optional)', create:'Create', join:'I’m in', leave:'Leave', cancelMeetup:'Cancel', noMeetups:'No lunches planned. Open a restaurant and tap “Plan a lunch”.', meetupCreated:'Lunch planned!',
      newList:'New list', listTitle:'Title', listDescription:'Description (optional)', addToList:'Save to a list', added:'Added!', noLists:'No lists yet.', places:n=>`${n} ${n===1?'place':'places'}`, remove:'Remove', deleteList:'Delete list',
      allFaculties:'All faculties', points:'pts', noRanking:'This month’s ranking is still empty.', trending:'Trending today', emptyFeed:'No activity yet. Check in with “I ate here”!',
      ateAt:'ate at', rated:'rated', photoAt:'shared a photo at', follow:'Follow', followingBtn:'Following', followers:'followers', followingCount:'following', checkins:'meals', privateProfile:'This profile is private.',
      badges:'Badges', streak:n=>`${n}-day streak`, publicProfile:'View public profile', editProfile:'Edit profile', bio:'Bio', faculty:'Faculty', city:'City', privateToggle:'Private profile', save:'Save', saved:'Saved!',
      recap:'Semester recap', meals:'meals', spent:'spent', topPlace:'Favourite place', topDish:'Favourite dish', loginNeeded:'Sign in on your Profile to take part.', signupFailed:'Could not send the code. Try again later.', devCode:c=>`Code (local mode): ${c}`,
      taste:'Taste', portion:'Portion', value:'Value', wait:'Wait', translated:'Translated', original:'See original', back:'Back', error:'Something went wrong. Try again.',
      badgeNames:{explorer:'Explorer',photographer:'Photographer',critic:'Critic',trusted:'Trusted',pioneer:'Pioneer',streak:'On a streak'}, shareCheckin:'Check-in shared' },
    es: { community:'Comunidad', searchPeople:'Buscar personas', feed:'Feed', meetups:'Comidas', lists:'Listas', ranking:'Ranking', everyone:'Todos', followingTab:'Siguiendo',
      reviews:'Reseñas', photos:'Fotos', questions:'Preguntas', reviewsCount:n=>`${n} ${n===1?'reseña':'reseñas'}`, noReviews:'Aún sin reseñas. ¡Sé el primero!',
      queue:'Cola', queueLevels:['Corta','Media','Larga'], queueAsk:'¿Cómo está la cola ahora?', queueNone:'Sin info', today:n=>`${n} hoy`,
      friendsHere:names=>`${names.join(', ')} comió aquí esta semana`, helpful:'Útil', report:'Denunciar', reported:'Gracias, lo revisaremos.',
      addPhoto:'Añadir foto', photoAdded:'¡Foto compartida!', photoTooLarge:'La foto es demasiado grande.', noPhotos:'Aún sin fotos de este restaurante.',
      ask:'Preguntar', askPlaceholder:'Pregunta a la comunidad…', answer:'Responder', answerPlaceholder:'Tu respuesta…', noQuestions:'Aún sin preguntas.',
      planLunch:'Quedar para comer', at:'a las', notePlaceholder:'Nota (opcional)', create:'Crear', join:'Voy', leave:'Salir', cancelMeetup:'Cancelar', noMeetups:'No hay comidas. Abre un restaurante y toca “Quedar para comer”.', meetupCreated:'¡Comida creada!',
      newList:'Nueva lista', listTitle:'Título', listDescription:'Descripción (opcional)', addToList:'Guardar en una lista', added:'¡Añadido!', noLists:'Aún sin listas.', places:n=>`${n} ${n===1?'sitio':'sitios'}`, remove:'Quitar', deleteList:'Borrar lista',
      allFaculties:'Todas las facultades', points:'pts', noRanking:'El ranking de este mes está vacío.', trending:'Tendencia hoy', emptyFeed:'Aún no hay actividad. ¡Haz check-in con “Comí aquí”!',
      ateAt:'comió en', rated:'valoró', photoAt:'compartió una foto en', follow:'Seguir', followingBtn:'Siguiendo', followers:'seguidores', followingCount:'siguiendo', checkins:'comidas', privateProfile:'Este perfil es privado.',
      badges:'Insignias', streak:n=>n===1?'1 día seguido':`${n} días seguidos`, publicProfile:'Ver perfil público', editProfile:'Editar perfil', bio:'Bio', faculty:'Facultad', city:'Ciudad', privateToggle:'Perfil privado', save:'Guardar', saved:'¡Guardado!',
      recap:'Resumen del semestre', meals:'comidas', spent:'gastado', topPlace:'Sitio favorito', topDish:'Plato favorito', loginNeeded:'Inicia sesión en tu Perfil para participar.', signupFailed:'No se pudo enviar el código.', devCode:c=>`Código (modo local): ${c}`,
      taste:'Sabor', portion:'Ración', value:'Calidad/precio', wait:'Espera', translated:'Traducido', original:'Ver original', back:'Volver', error:'Algo salió mal.',
      badgeNames:{explorer:'Explorador',photographer:'Fotógrafo',critic:'Crítico',trusted:'De confianza',pioneer:'Pionero',streak:'En racha'}, shareCheckin:'Check-in compartido' },
    de: { community:'Community', searchPeople:'Personen suchen', feed:'Feed', meetups:'Mittagessen', lists:'Listen', ranking:'Rangliste', everyone:'Alle', followingTab:'Gefolgt',
      reviews:'Bewertungen', photos:'Fotos', questions:'Fragen', reviewsCount:n=>`${n} ${n===1?'Bewertung':'Bewertungen'}`, noReviews:'Noch keine Bewertungen. Sei die erste Person!',
      queue:'Schlange', queueLevels:['Kurz','Mittel','Lang'], queueAsk:'Wie lang ist die Schlange gerade?', queueNone:'Keine Info', today:n=>`${n} heute`,
      friendsHere:names=>`${names.join(', ')} war diese Woche hier`, helpful:'Hilfreich', report:'Melden', reported:'Danke, wir prüfen das.',
      addPhoto:'Foto hinzufügen', photoAdded:'Foto geteilt!', photoTooLarge:'Foto ist zu groß.', noPhotos:'Noch keine Fotos.',
      ask:'Fragen', askPlaceholder:'Frag die Community…', answer:'Antworten', answerPlaceholder:'Deine Antwort…', noQuestions:'Noch keine Fragen.',
      planLunch:'Mittagessen planen', at:'um', notePlaceholder:'Notiz (optional)', create:'Erstellen', join:'Bin dabei', leave:'Verlassen', cancelMeetup:'Absagen', noMeetups:'Keine Treffen geplant. Öffne ein Restaurant und tippe auf „Mittagessen planen“.', meetupCreated:'Mittagessen geplant!',
      newList:'Neue Liste', listTitle:'Titel', listDescription:'Beschreibung (optional)', addToList:'Zu Liste hinzufügen', added:'Hinzugefügt!', noLists:'Noch keine Listen.', places:n=>`${n} ${n===1?'Ort':'Orte'}`, remove:'Entfernen', deleteList:'Liste löschen',
      allFaculties:'Alle Fakultäten', points:'Pkt', noRanking:'Die Rangliste ist diesen Monat noch leer.', trending:'Heute beliebt', emptyFeed:'Noch keine Aktivität. Checke mit „Hier gegessen“ ein!',
      ateAt:'aß im', rated:'bewertete', photoAt:'teilte ein Foto aus', follow:'Folgen', followingBtn:'Gefolgt', followers:'Follower', followingCount:'folgt', checkins:'Mahlzeiten', privateProfile:'Dieses Profil ist privat.',
      badges:'Abzeichen', streak:n=>n===1?'1 Tag in Folge':`${n} Tage in Folge`, publicProfile:'Öffentliches Profil', editProfile:'Profil bearbeiten', bio:'Bio', faculty:'Fakultät', city:'Stadt', privateToggle:'Privates Profil', save:'Speichern', saved:'Gespeichert!',
      recap:'Semesterrückblick', meals:'Mahlzeiten', spent:'ausgegeben', topPlace:'Lieblingsort', topDish:'Lieblingsgericht', loginNeeded:'Melde dich im Profil an, um mitzumachen.', signupFailed:'Code konnte nicht gesendet werden.', devCode:c=>`Code (lokaler Modus): ${c}`,
      taste:'Geschmack', portion:'Portion', value:'Preis/Leistung', wait:'Wartezeit', translated:'Übersetzt', original:'Original', back:'Zurück', error:'Etwas ist schiefgelaufen.',
      badgeNames:{explorer:'Entdecker',photographer:'Fotograf',critic:'Kritiker',trusted:'Vertrauenswürdig',pioneer:'Pionier',streak:'Serie'}, shareCheckin:'Check-in geteilt' },
    it: { community:'Community', searchPeople:'Cerca persone', feed:'Feed', meetups:'Pranzi', lists:'Liste', ranking:'Classifica', everyone:'Tutti', followingTab:'Seguiti',
      reviews:'Recensioni', photos:'Foto', questions:'Domande', reviewsCount:n=>`${n} ${n===1?'recensione':'recensioni'}`, noReviews:'Ancora nessuna recensione. Sii il primo!',
      queue:'Coda', queueLevels:['Corta','Media','Lunga'], queueAsk:'Com’è la coda adesso?', queueNone:'Nessuna info', today:n=>`${n} oggi`,
      friendsHere:names=>`${names.join(', ')} ha mangiato qui questa settimana`, helpful:'Utile', report:'Segnala', reported:'Grazie, lo verificheremo.',
      addPhoto:'Aggiungi foto', photoAdded:'Foto condivisa!', photoTooLarge:'Foto troppo grande.', noPhotos:'Ancora nessuna foto.',
      ask:'Chiedi', askPlaceholder:'Chiedi alla community…', answer:'Rispondi', answerPlaceholder:'La tua risposta…', noQuestions:'Ancora nessuna domanda.',
      planLunch:'Organizza un pranzo', at:'alle', notePlaceholder:'Nota (facoltativa)', create:'Crea', join:'Ci sono', leave:'Esci', cancelMeetup:'Annulla', noMeetups:'Nessun pranzo. Apri un ristorante e tocca “Organizza un pranzo”.', meetupCreated:'Pranzo organizzato!',
      newList:'Nuova lista', listTitle:'Titolo', listDescription:'Descrizione (facoltativa)', addToList:'Salva in una lista', added:'Aggiunto!', noLists:'Ancora nessuna lista.', places:n=>`${n} ${n===1?'posto':'posti'}`, remove:'Rimuovi', deleteList:'Elimina lista',
      allFaculties:'Tutte le facoltà', points:'pt', noRanking:'La classifica del mese è ancora vuota.', trending:'Di tendenza oggi', emptyFeed:'Ancora nessuna attività. Fai check-in con “Ho mangiato qui”!',
      ateAt:'ha mangiato da', rated:'ha valutato', photoAt:'ha condiviso una foto da', follow:'Segui', followingBtn:'Segui già', followers:'follower', followingCount:'seguiti', checkins:'pasti', privateProfile:'Questo profilo è privato.',
      badges:'Badge', streak:n=>n===1?'1 giorno di fila':`${n} giorni di fila`, publicProfile:'Profilo pubblico', editProfile:'Modifica profilo', bio:'Bio', faculty:'Facoltà', city:'Città', privateToggle:'Profilo privato', save:'Salva', saved:'Salvato!',
      recap:'Riepilogo del semestre', meals:'pasti', spent:'spesi', topPlace:'Posto preferito', topDish:'Piatto preferito', loginNeeded:'Accedi al Profilo per partecipare.', signupFailed:'Impossibile inviare il codice.', devCode:c=>`Codice (modalità locale): ${c}`,
      taste:'Gusto', portion:'Porzione', value:'Qualità/prezzo', wait:'Attesa', translated:'Tradotto', original:'Originale', back:'Indietro', error:'Qualcosa è andato storto.',
      badgeNames:{explorer:'Esploratore',photographer:'Fotografo',critic:'Critico',trusted:'Affidabile',pioneer:'Pioniere',streak:'In serie'}, shareCheckin:'Check-in condiviso' },
    fr: { community:'Communauté', searchPeople:'Chercher des personnes', feed:'Fil', meetups:'Déjeuners', lists:'Listes', ranking:'Classement', everyone:'Tous', followingTab:'Abonnements',
      reviews:'Avis', photos:'Photos', questions:'Questions', reviewsCount:n=>`${n} avis`, noReviews:'Pas encore d’avis. Soyez le premier !',
      queue:'File', queueLevels:['Courte','Moyenne','Longue'], queueAsk:'Comment est la file maintenant ?', queueNone:'Pas d’info', today:n=>`${n} aujourd’hui`,
      friendsHere:names=>`${names.join(', ')} a mangé ici cette semaine`, helpful:'Utile', report:'Signaler', reported:'Merci, nous allons vérifier.',
      addPhoto:'Ajouter une photo', photoAdded:'Photo partagée !', photoTooLarge:'Photo trop lourde.', noPhotos:'Pas encore de photos.',
      ask:'Demander', askPlaceholder:'Demandez à la communauté…', answer:'Répondre', answerPlaceholder:'Votre réponse…', noQuestions:'Pas encore de questions.',
      planLunch:'Organiser un déjeuner', at:'à', notePlaceholder:'Note (facultative)', create:'Créer', join:'J’y vais', leave:'Quitter', cancelMeetup:'Annuler', noMeetups:'Aucun déjeuner prévu. Ouvrez un restaurant et touchez « Organiser un déjeuner ».', meetupCreated:'Déjeuner organisé !',
      newList:'Nouvelle liste', listTitle:'Titre', listDescription:'Description (facultative)', addToList:'Ajouter à une liste', added:'Ajouté !', noLists:'Pas encore de listes.', places:n=>`${n} ${n===1?'lieu':'lieux'}`, remove:'Retirer', deleteList:'Supprimer la liste',
      allFaculties:'Toutes les facultés', points:'pts', noRanking:'Le classement du mois est encore vide.', trending:'Tendance aujourd’hui', emptyFeed:'Pas encore d’activité. Faites un check-in avec « J’ai mangé ici » !',
      ateAt:'a mangé à', rated:'a noté', photoAt:'a partagé une photo à', follow:'Suivre', followingBtn:'Abonné', followers:'abonnés', followingCount:'abonnements', checkins:'repas', privateProfile:'Ce profil est privé.',
      badges:'Badges', streak:n=>n===1?'1 jour':`${n} jours d’affilée`, publicProfile:'Voir le profil public', editProfile:'Modifier le profil', bio:'Bio', faculty:'Faculté', city:'Ville', privateToggle:'Profil privé', save:'Enregistrer', saved:'Enregistré !',
      recap:'Bilan du semestre', meals:'repas', spent:'dépensés', topPlace:'Lieu préféré', topDish:'Plat préféré', loginNeeded:'Connectez-vous dans votre Profil pour participer.', signupFailed:'Impossible d’envoyer le code.', devCode:c=>`Code (mode local) : ${c}`,
      taste:'Goût', portion:'Portion', value:'Rapport qualité/prix', wait:'Attente', translated:'Traduit', original:'Voir l’original', back:'Retour', error:'Une erreur est survenue.',
      badgeNames:{explorer:'Explorateur',photographer:'Photographe',critic:'Critique',trusted:'De confiance',pioneer:'Pionnier',streak:'En série'}, shareCheckin:'Check-in partagé' },
    ca: { community:'Comunitat', searchPeople:'Cerca persones', feed:'Feed', meetups:'Dinars', lists:'Llistes', ranking:'Rànquing', everyone:'Tothom', followingTab:'Seguint',
      reviews:'Ressenyes', photos:'Fotos', questions:'Preguntes', reviewsCount:n=>`${n} ${n===1?'ressenya':'ressenyes'}`, noReviews:'Encara no hi ha ressenyes. Sigues el primer!',
      queue:'Cua', queueLevels:['Curta','Mitjana','Llarga'], queueAsk:'Com està la cua ara?', queueNone:'Sense info', today:n=>`${n} avui`,
      friendsHere:names=>`${names.join(', ')} ha menjat aquí aquesta setmana`, helpful:'Útil', report:'Denunciar', reported:'Gràcies, ho revisarem.',
      addPhoto:'Afegeix foto', photoAdded:'Foto compartida!', photoTooLarge:'La foto és massa gran.', noPhotos:'Encara no hi ha fotos.',
      ask:'Pregunta', askPlaceholder:'Pregunta a la comunitat…', answer:'Respon', answerPlaceholder:'La teva resposta…', noQuestions:'Encara no hi ha preguntes.',
      planLunch:'Quedar per dinar', at:'a les', notePlaceholder:'Nota (opcional)', create:'Crea', join:'Hi vaig', leave:'Surt', cancelMeetup:'Cancel·la', noMeetups:'No hi ha dinars. Obre un restaurant i toca “Quedar per dinar”.', meetupCreated:'Dinar creat!',
      newList:'Nova llista', listTitle:'Títol', listDescription:'Descripció (opcional)', addToList:'Desa en una llista', added:'Afegit!', noLists:'Encara no hi ha llistes.', places:n=>`${n} ${n===1?'lloc':'llocs'}`, remove:'Treu', deleteList:'Esborra la llista',
      allFaculties:'Totes les facultats', points:'pts', noRanking:'El rànquing d’aquest mes encara és buit.', trending:'Tendència avui', emptyFeed:'Encara no hi ha activitat. Fes check-in amb “He menjat aquí”!',
      ateAt:'ha menjat a', rated:'ha valorat', photoAt:'ha compartit una foto a', follow:'Segueix', followingBtn:'Seguint', followers:'seguidors', followingCount:'seguint', checkins:'àpats', privateProfile:'Aquest perfil és privat.',
      badges:'Insígnies', streak:n=>n===1?'1 dia seguit':`${n} dies seguits`, publicProfile:'Perfil públic', editProfile:'Edita el perfil', bio:'Bio', faculty:'Facultat', city:'Ciutat', privateToggle:'Perfil privat', save:'Desa', saved:'Desat!',
      recap:'Resum del semestre', meals:'àpats', spent:'gastat', topPlace:'Lloc preferit', topDish:'Plat preferit', loginNeeded:'Inicia sessió al Perfil per participar.', signupFailed:'No s’ha pogut enviar el codi.', devCode:c=>`Codi (mode local): ${c}`,
      taste:'Gust', portion:'Ració', value:'Qualitat/preu', wait:'Espera', translated:'Traduït', original:'Original', back:'Torna', error:'Alguna cosa ha fallat.',
      badgeNames:{explorer:'Explorador',photographer:'Fotògraf',critic:'Crític',trusted:'De confiança',pioneer:'Pioner',streak:'En ratxa'}, shareCheckin:'Check-in compartit' },
  };
  const BADGE_ICONS = { explorer:'🧭', photographer:'📸', critic:'✍️', trusted:'🤝', pioneer:'🚩', streak:'🔥' };
  const ASPECTS = ['taste', 'portion', 'value', 'wait'];

  const C = { enabled: false, token: null, me: null, venue: null, venueTab: 'reviews', view: 'feed', following: false, faculty: '', translations: new Map(), summaries: new Map(), myLists: null };
  const t = () => CT[state.language] || CT.en;

  /* ---------------------------------------------------------- helpers */
  function h(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs || {})) {
      if (value == null || value === false) continue;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
      else if (key in node && key !== 'list') node[key] = value;
      else node.setAttribute(key, value === true ? '' : value);
    }
    for (const child of children.flat(Infinity)) {
      if (child == null || child === false) continue;
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return node;
  }

  // replaceChildren/append stringify null and arrays; drop empties and flatten first.
  const fill = (node, ...children) => node.replaceChildren(...children.flat(Infinity).filter(c => c != null && c !== false && c !== ''));
  const add = (node, ...children) => node.append(...children.flat(Infinity).filter(c => c != null && c !== false && c !== ''));

  async function api(path, { method = 'GET', body, query } = {}) {
    const url = new URL(`/api/community${path}`, location.origin);
    for (const [key, value] of Object.entries(query || {})) if (value != null && value !== '') url.searchParams.set(key, value);
    const headers = {};
    if (C.token) headers.Authorization = `Bearer ${C.token}`;
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    const response = await fetch(url, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
    let data = {};
    try { data = await response.json(); } catch {}
    if (response.status === 401 && C.token && data.error === 'auth_required') clearSession();
    if (!response.ok) throw Object.assign(new Error(data.error || 'request_failed'), { status: response.status, data });
    return data;
  }

  const loggedIn = () => Boolean(C.token && C.me);
  function requireLogin() {
    if (loggedIn()) return true;
    showToast(t().loginNeeded);
    closeSheet();
    switchTab('profile');
    return false;
  }
  function fail(error) {
    const map = { rate_limited: '⏳', photo_too_large: t().photoTooLarge };
    showToast(map[error?.message] || t().error);
  }
  function restaurantRef(r) { return { id: String(r.id), name: r.name || '', city: r.city || '' }; }
  function findRestaurant(id, name) {
    return state.restaurants.find(r => String(r.id) === String(id)) || { id, name, address: '', city: '', additional_fee_eur: null };
  }
  function openRestaurantById(id, name) {
    closeSheet();
    switchTab('explore');
    openRestaurant(findRestaurant(id, name));
  }
  function relativeTime(ms) {
    const diff = (Date.now() - ms) / 1000;
    const rtf = new Intl.RelativeTimeFormat(locale(), { numeric: 'auto' });
    if (Math.abs(diff) < 3600) return rtf.format(-Math.round(diff / 60), 'minute');
    if (Math.abs(diff) < 86400) return rtf.format(-Math.round(diff / 3600), 'hour');
    return rtf.format(-Math.round(diff / 86400), 'day');
  }
  function meetupTime(ms) {
    const d = new Date(ms);
    const sameDay = d.toDateString() === new Date().toDateString();
    const time = new Intl.DateTimeFormat(locale(), { hour: '2-digit', minute: '2-digit' }).format(d);
    return sameDay ? time : `${new Intl.DateTimeFormat(locale(), { weekday: 'short', day: 'numeric' }).format(d)} · ${time}`;
  }
  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
  const avatar = name => h('span', { class: 'cm-avatar', 'aria-hidden': 'true', text: (name || '?').slice(0, 1).toUpperCase() });
  const userLink = name => h('button', { type: 'button', class: 'cm-user-link', text: `@${name}`, onclick: e => { e.stopPropagation(); openProfile(name); } });
  const photoUrl = id => `/api/community/photos/${encodeURIComponent(id)}`;
  const empty = text => h('div', { class: 'profile-empty-hint', text });
  const spinner = () => { const d = h('div', { class: 'cm-loading' }); d.innerHTML = BONBON_SPINNER_HTML; return d; };

  async function translateAuto(texts) {
    const lang = state.language;
    const missing = [...new Set(texts.filter(x => x && !C.translations.has(`${lang}::${x}`)))].slice(0, 30);
    if (missing.length) {
      try {
        const r = await fetch('/api/translate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ language: lang, texts: missing, source: 'auto' }) });
        const data = await r.json();
        for (const item of data.results || []) C.translations.set(`${lang}::${item.original}`, item.is_translated ? item.translated : item.original);
      } catch {}
    }
    return text => C.translations.get(`${lang}::${text}`) || text;
  }
  function translatableText(text, className = 'cm-comment') {
    const node = h(className === 'cm-inline-text' ? 'span' : 'p', { class: className, text });
    if (!text) return node;
    translateAuto([text]).then(get => {
      const translated = get(text);
      if (translated && translated.toLocaleLowerCase() !== text.toLocaleLowerCase()) {
        node.textContent = translated;
        const toggle = h('button', { type: 'button', class: 'cm-link', text: t().original });
        let showingOriginal = false;
        toggle.addEventListener('click', () => {
          showingOriginal = !showingOriginal;
          node.firstChild.textContent = showingOriginal ? text : translated;
          toggle.textContent = showingOriginal ? t().translated : t().original;
        });
        node.replaceChildren(document.createTextNode(translated), ' ', toggle);
      }
    });
    return node;
  }
  function reportButton(type, id) {
    return h('button', { type: 'button', class: 'cm-icon-btn', 'aria-label': t().report, title: t().report, text: '⋯', onclick: async e => {
      e.stopPropagation();
      if (!requireLogin()) return;
      if (!confirm(`${t().report}?`)) return;
      try { await api('/reports', { method: 'POST', body: { type, id } }); showToast(t().reported); } catch (err) { fail(err); }
    } });
  }

  /* ---------------------------------------------------------- session */
  function saveSession(token, user) {
    C.token = token;
    C.me = user;
    try { localStorage.setItem(SESSION_KEY, token); } catch {}
    setCurrentUser({ username: user.username, email: user.email });
  }
  function clearSession() {
    C.token = null;
    C.me = null;
    try { localStorage.removeItem(SESSION_KEY); } catch {}
    setCurrentUser(null);
  }
  async function importLocalData() {
    let done = {};
    try { done = JSON.parse(localStorage.getItem(IMPORTED_KEY) || '{}'); } catch {}
    if (done[C.me.username]) return;
    const reviews = Object.values(getReviews()).map(r => ({ restaurant: { id: r.restaurantId, name: r.name, city: r.city }, rating: r.rating, comment: r.comment }));
    const checkins = getMeals().map(m => ({ restaurant: { id: m.restaurantId, name: m.name, city: m.city }, day: m.date, dish: m.dishName, fee: m.fee }));
    if (reviews.length || checkins.length) {
      try { await api('/import', { method: 'POST', body: { reviews, checkins } }); } catch { return; }
    }
    done[C.me.username] = true;
    try { localStorage.setItem(IMPORTED_KEY, JSON.stringify(done)); } catch {}
  }
  function afterLogin(data, toastText) {
    saveSession(data.token, data.user);
    showToast(toastText);
    updateProfileAuthUI();
    renderProfilePage();
    void importLocalData();
    if (state.selected) void renderVenue(state.selected);
  }

  let pendingEmail = null;
  let pendingSignup = null;
  function authError(id, text) {
    const el = $(id);
    if (el) { el.textContent = text; el.hidden = false; }
  }
  function interceptAuth() {
    document.addEventListener('submit', async event => {
      if (!C.enabled) return;
      const form = event.target;
      if (form.id !== 'auth-form' && form.id !== 'auth-verify-form') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const feature = featureCopy[state.language] || featureCopy.en;
      if (form.id === 'auth-form') {
        $('auth-error').hidden = true;
        const email = $('auth-email').value.trim().toLowerCase();
        const password = $('auth-password').value;
        const registering = $('auth-tab-register')?.classList.contains('active');
        if (!registering) {
          try {
            afterLogin(await api('/auth/login', { method: 'POST', body: { identifier: email, password } }), feature.loginSuccess || 'Sessão iniciada!');
          } catch { authError('auth-error', feature.authInvalidCreds || 'Email ou palavra-passe incorretos.'); }
          return;
        }
        const username = $('auth-username').value.trim().replace(/^@/, '');
        try {
          pendingSignup = { email, username, password };
          const data = await api('/auth/signup', { method: 'POST', body: pendingSignup });
          if (data.token) {
            // No email service configured yet: the account is created straight away.
            pendingSignup = null;
            afterLogin(data, feature.registerSuccess || 'Conta criada!');
            return;
          }
          pendingEmail = email;
          $('auth-form').hidden = true;
          $('auth-toggle').hidden = true;
          $('auth-verify-form').hidden = false;
          $('auth-verify-email-display').textContent = email;
          $('auth-verify-code').value = '';
          $('auth-verify-code').focus();
          showToast(data.dev_code ? t().devCode(data.dev_code) : `${feature.authCodeSentToast || 'Código enviado para'} ${email}`);
        } catch (err) {
          const messages = { email_taken: feature.authEmailExists, username_taken: feature.authUsernameExists, email_unavailable: t().signupFailed };
          authError('auth-error', messages[err.message] || err.message || t().error);
        }
        return;
      }
      $('auth-verify-error').hidden = true;
      try {
        afterLogin(await api('/auth/verify', { method: 'POST', body: { email: pendingEmail, code: $('auth-verify-code').value.trim() } }), feature.registerSuccess || 'Conta criada!');
      } catch { authError('auth-verify-error', feature.authInvalidCodeError || 'Código de verificação incorreto.'); }
    }, true);

    document.addEventListener('click', async event => {
      if (!C.enabled) return;
      if (event.target.closest('#profile-logout-btn')) {
        event.stopImmediatePropagation();
        try { await api('/auth/logout', { method: 'POST' }); } catch {}
        clearSession();
        showToast(featureCopy[state.language]?.logoutSuccess || 'Sessão terminada.');
        updateProfileAuthUI();
        renderProfilePage();
      } else if (event.target.closest('#auth-verify-resend-btn') && pendingSignup) {
        event.stopImmediatePropagation();
        try {
          const data = await api('/auth/signup', { method: 'POST', body: pendingSignup });
          const feature = featureCopy[state.language] || featureCopy.en;
          showToast(data.dev_code ? t().devCode(data.dev_code) : `${feature.authCodeResentToast || 'Novo código enviado para'} ${pendingSignup.email}`);
        } catch { showToast(t().signupFailed); }
      }
    }, true);
  }

  /* ---------------------------------------------- restaurant list chips */
  let decorateTimer = null;
  function scheduleDecorate() {
    // restaurants-rendered fires several times while the list settles; batch into one request.
    clearTimeout(decorateTimer);
    decorateTimer = setTimeout(() => { void decorateRestaurantCards(); }, 120);
  }
  async function decorateRestaurantCards() {
    const cards = [...document.querySelectorAll('#restaurant-list .restaurant-card[data-id]')];
    if (!cards.length) return;
    try {
      const fresh = Date.now() - 60000;
      const missing = cards.map(c => c.dataset.id).filter(id => !(C.summaries.get(id)?.at > fresh));
      if (missing.length) {
        const { results } = await api('/summaries', { query: { ids: missing.join(',') } });
        for (const [id, info] of Object.entries(results)) C.summaries.set(id, { info, at: Date.now() });
      }
      for (const card of cards) {
        const info = C.summaries.get(card.dataset.id)?.info;
        card.querySelector('.cm-card-meta')?.remove();
        if (!info || (!info.reviews && !info.checkins_today && !info.queue)) continue;
        const meta = h('span', { class: 'cm-card-meta' },
          info.reviews ? h('span', { class: 'cm-rating', text: `★ ${info.rating.toLocaleString(locale())} (${info.reviews})` }) : null,
          info.checkins_today ? h('span', { class: 'cm-today', text: `🔥 ${t().today(info.checkins_today)}` }) : null,
          info.queue ? h('span', { class: `cm-queue-dot level-${info.queue.level}`, text: `${t().queue}: ${t().queueLevels[info.queue.level - 1]}` }) : null);
        card.querySelector('.restaurant-info')?.append(meta);
      }
    } catch {}
  }

  /* --------------------------------------------------- restaurant page */
  function ensureVenueNodes() {
    let summary = $('cm-venue-summary');
    if (!summary) {
      summary = h('div', { class: 'cm-venue-summary', id: 'cm-venue-summary' });
      document.querySelector('.venue-meta')?.after(summary);
    }
    let block = $('cm-venue');
    if (!block) {
      block = h('section', { class: 'cm-venue', id: 'cm-venue' });
      $('dish-list').after(block);
    }
    return { summary, block };
  }

  async function renderVenue(restaurant) {
    if (!C.enabled) return;
    C.summaries.delete(String(restaurant.id));
    const { summary, block } = ensureVenueNodes();
    summary.replaceChildren();
    block.replaceChildren(spinner());
    let detail;
    try { detail = await api(`/restaurants/${encodeURIComponent(restaurant.id)}`); } catch { block.replaceChildren(); return; }
    if (state.selected?.id !== restaurant.id) return;
    C.venue = { restaurant, detail };
    renderVenueSummary(summary, restaurant, detail);
    renderVenueBlock(block, restaurant, detail);
  }

  function renderVenueSummary(host, restaurant, detail) {
    const s = detail.summary;
    const queueLabel = s.queue ? t().queueLevels[s.queue.level - 1] : t().queueNone;
    const queueBtn = h('button', { type: 'button', class: `cm-chip cm-queue${s.queue ? ` level-${s.queue.level}` : ''}`, text: `${t().queue}: ${queueLabel}` });
    const picker = h('div', { class: 'cm-queue-picker', hidden: true },
      h('span', { text: t().queueAsk }),
      ...t().queueLevels.map((label, i) => h('button', { type: 'button', class: `cm-chip level-${i + 1}${detail.my_queue === i + 1 ? ' active' : ''}`, text: label, onclick: async () => {
        if (!requireLogin()) return;
        try { detail.summary = await api('/queue', { method: 'POST', body: { restaurant_id: String(restaurant.id), level: i + 1 } }); detail.my_queue = i + 1; renderVenueSummary(host, restaurant, detail); } catch (err) { fail(err); }
      } })));
    queueBtn.addEventListener('click', () => { picker.hidden = !picker.hidden; });
    const rating = s.reviews
      ? h('button', { type: 'button', class: 'cm-chip cm-rating-chip', text: `★ ${s.rating.toLocaleString(locale())} · ${t().reviewsCount(s.reviews)}`, onclick: () => { C.venueTab = 'reviews'; renderVenueBlock($('cm-venue'), restaurant, detail); $('cm-venue').scrollIntoView({ behavior: 'smooth', block: 'start' }); } })
      : null;
    const today = s.checkins_today ? h('span', { class: 'cm-chip cm-today', text: `🔥 ${t().today(s.checkins_today)}` }) : null;
    const friends = detail.friends_recent?.length ? h('p', { class: 'cm-friends', text: t().friendsHere(detail.friends_recent.map(n => `@${n}`)) }) : null;
    fill(host, h('div', { class: 'cm-chip-row' }, rating, today, queueBtn), picker, friends);
  }

  function renderVenueBlock(host, restaurant, detail) {
    const tabs = [['reviews', t().reviews], ['photos', t().photos], ['questions', t().questions], ['meetups', t().meetups]];
    const bar = h('div', { class: 'search-filter-bar cm-venue-tabs', role: 'tablist' }, tabs.map(([key, label]) =>
      h('button', { type: 'button', class: `search-filter-chip${C.venueTab === key ? ' active' : ''}`, text: label, onclick: () => { C.venueTab = key; renderVenueBlock(host, restaurant, detail); } })));
    const body = h('div', { class: 'cm-venue-body' });
    if (C.venueTab === 'reviews') renderReviews(body, restaurant, detail);
    if (C.venueTab === 'photos') renderPhotoGrid(body, restaurant, detail);
    if (C.venueTab === 'questions') renderQuestions(body, restaurant, detail);
    if (C.venueTab === 'meetups') renderVenueMeetups(body, restaurant, detail);
    const listBtn = h('button', { type: 'button', class: 'cm-link cm-add-list', text: `+ ${t().addToList}`, onclick: () => openAddToList(restaurant) });
    const lists = detail.lists?.length ? h('div', { class: 'cm-chip-row cm-in-lists' }, detail.lists.map(l => h('button', { type: 'button', class: 'cm-chip', text: `📋 ${l.title}`, onclick: () => openList(l.id) }))) : null;
    fill(host, bar, body, lists, listBtn);
  }

  function aspectBars(aspects) {
    const rows = ASPECTS.filter(key => aspects?.[key] != null);
    if (!rows.length) return null;
    return h('div', { class: 'cm-aspects' }, rows.map(key => h('div', { class: 'cm-aspect' },
      h('span', { text: t()[key] }),
      h('span', { class: 'cm-bar' }, h('span', { style: `width:${(aspects[key] / 5) * 100}%` })),
      h('strong', { text: Number(aspects[key]).toLocaleString(locale(), { maximumFractionDigits: 1 }) }))));
  }

  function renderReviews(host, restaurant, detail) {
    const aspects = aspectBars(detail.summary.aspects);
    if (!detail.reviews.length) { add(host, aspects, empty(t().noReviews)); return; }
    const list = h('div', { class: 'profile-items-list' }, detail.reviews.map(review => {
      const helpful = h('button', { type: 'button', class: `cm-chip cm-helpful${review.voted ? ' active' : ''}`, text: `👍 ${t().helpful}${review.helpful ? ` · ${review.helpful}` : ''}`, disabled: review.mine, onclick: async () => {
        if (!requireLogin()) return;
        try { Object.assign(review, await api(`/reviews/${encodeURIComponent(review.id)}/helpful`, { method: 'POST' })); helpful.classList.toggle('active', review.voted); helpful.textContent = `👍 ${t().helpful}${review.helpful ? ` · ${review.helpful}` : ''}`; } catch (err) { fail(err); }
      } });
      return h('article', { class: 'cm-review' },
        h('div', { class: 'cm-review-head' }, avatar(review.username), userLink(review.username), h('span', { class: 'profile-stars', text: stars(review.rating) }), h('span', { class: 'cm-time', text: relativeTime(review.created_at) })),
        review.comment ? translatableText(review.comment) : null,
        h('div', { class: 'cm-review-actions' }, helpful, review.mine ? null : reportButton('review', review.id)));
    }));
    add(host, aspects, list);
  }

  function renderPhotoGrid(host, restaurant, detail) {
    const add = h('button', { type: 'button', class: 'review-save-btn cm-add-photo', text: `📷 ${t().addPhoto}`, onclick: () => pickPhoto(restaurant, '') });
    if (!detail.photos.length) { host.append(empty(t().noPhotos), add); return; }
    host.append(h('div', { class: 'cm-photo-grid' }, detail.photos.map(p => h('button', { type: 'button', class: 'cm-photo', onclick: () => openPhoto(p) },
      h('img', { src: photoUrl(p.id), alt: p.dish || restaurant.name, loading: 'lazy' })))), add);
  }

  function openPhoto(photo) {
    openSheet(h('figure', { class: 'cm-photo-full' },
      h('img', { src: photoUrl(photo.id), alt: photo.dish || '' }),
      h('figcaption', {}, photo.dish ? translatableText(photo.dish, 'cm-photo-dish') : null, h('span', {}, userLink(photo.username), ' · ', relativeTime(photo.created_at)), reportButton('photo', photo.id))));
  }

  function renderQuestions(host, restaurant, detail) {
    const input = h('input', { type: 'text', maxLength: 200, placeholder: t().askPlaceholder });
    const form = h('form', { class: 'cm-inline-form', onsubmit: async e => {
      e.preventDefault();
      if (!input.value.trim() || !requireLogin()) return;
      try { await api('/questions', { method: 'POST', body: { restaurant_id: String(restaurant.id), body: input.value } }); C.venueTab = 'questions'; await renderVenue(restaurant); } catch (err) { fail(err); }
    } }, input, h('button', { type: 'submit', class: 'review-save-btn', text: t().ask }));
    const items = detail.questions.map(q => {
      const answerInput = h('input', { type: 'text', maxLength: 200, placeholder: t().answerPlaceholder });
      return h('article', { class: 'cm-question' },
        h('div', { class: 'cm-review-head' }, avatar(q.username), userLink(q.username), h('span', { class: 'cm-time', text: relativeTime(q.created_at) }), reportButton('question', q.id)),
        translatableText(q.body, 'cm-question-body'),
        q.answers.map(a => h('div', { class: 'cm-answer' }, userLink(a.username), translatableText(a.body, 'cm-answer-body'))),
        h('form', { class: 'cm-inline-form cm-answer-form', onsubmit: async e => {
          e.preventDefault();
          if (!answerInput.value.trim() || !requireLogin()) return;
          try { await api(`/questions/${encodeURIComponent(q.id)}/answers`, { method: 'POST', body: { body: answerInput.value } }); C.venueTab = 'questions'; await renderVenue(restaurant); } catch (err) { fail(err); }
        } }, answerInput, h('button', { type: 'submit', class: 'review-cancel-btn', text: t().answer })));
    });
    host.append(form, items.length ? h('div', { class: 'cm-questions' }, items) : empty(t().noQuestions));
  }

  function meetupCard(m, onChange) {
    const action = m.mine
      ? h('button', { type: 'button', class: 'review-cancel-btn', text: t().cancelMeetup, onclick: () => toggleMeetup(m, false, onChange) })
      : h('button', { type: 'button', class: m.joined ? 'review-cancel-btn' : 'review-save-btn', text: m.joined ? t().leave : t().join, onclick: () => toggleMeetup(m, !m.joined, onChange) });
    return h('article', { class: 'cm-meetup' },
      h('div', { class: 'cm-meetup-time', text: meetupTime(m.starts_at) }),
      h('div', { class: 'cm-meetup-info' },
        h('button', { type: 'button', class: 'cm-place-link', text: m.restaurant_name, onclick: () => openRestaurantById(m.restaurant_id, m.restaurant_name) }),
        m.note ? translatableText(m.note, 'cm-meetup-note') : null,
        h('div', { class: 'cm-members' }, m.members.map(userLink))),
      h('div', { class: 'cm-meetup-actions' }, action, m.mine ? null : reportButton('meetup', m.id)));
  }
  async function toggleMeetup(m, join, onChange) {
    if (!requireLogin()) return;
    try { await api(`/meetups/${encodeURIComponent(m.id)}/join`, { method: join ? 'POST' : 'DELETE' }); onChange(); } catch (err) { fail(err); }
  }

  function meetupForm(restaurant, onCreated) {
    const next = new Date(Date.now() + 30 * 60000);
    next.setMinutes(next.getMinutes() < 30 ? 30 : 60, 0, 0);
    const pad = n => String(n).padStart(2, '0');
    const dateInput = h('input', { type: 'date', value: `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}` });
    const timeInput = h('input', { type: 'time', value: `${pad(next.getHours())}:${pad(next.getMinutes())}`, step: 900 });
    const note = h('input', { type: 'text', maxLength: 140, placeholder: t().notePlaceholder });
    return h('form', { class: 'cm-meetup-form', onsubmit: async e => {
      e.preventDefault();
      if (!requireLogin()) return;
      const startsAt = new Date(`${dateInput.value}T${timeInput.value}`).getTime();
      try {
        await api('/meetups', { method: 'POST', body: { restaurant: restaurantRef(restaurant), starts_at: startsAt, note: note.value } });
        showToast(t().meetupCreated);
        onCreated();
      } catch (err) { fail(err); }
    } }, h('strong', { text: t().planLunch }), h('div', { class: 'cm-meetup-fields' }, dateInput, timeInput), note, h('button', { type: 'submit', class: 'review-save-btn', text: t().create }));
  }

  function renderVenueMeetups(host, restaurant, detail) {
    const refresh = () => { C.venueTab = 'meetups'; void renderVenue(restaurant); };
    add(host,
      detail.meetups.length ? h('div', { class: 'cm-meetups' }, detail.meetups.map(m => meetupCard(m, refresh))) : null,
      meetupForm(restaurant, refresh));
  }

  /* --------------------------------------------------- review aspects */
  function ensureAspectInputs() {
    const box = $('venue-review-box');
    if (!box || $('cm-aspect-inputs')) return;
    const wrap = h('div', { class: 'cm-aspect-inputs', id: 'cm-aspect-inputs' }, ASPECTS.map(key => h('div', { class: 'cm-aspect-input' },
      h('span', { class: 'cm-aspect-label', 'data-aspect-label': key, text: t()[key] }),
      h('div', { class: 'cm-dots', 'data-aspect': key }, [1, 2, 3, 4, 5].map(v => h('button', { type: 'button', class: 'cm-dot', 'data-value': v, 'aria-label': `${key} ${v}`, onclick: e => {
        const dots = e.currentTarget.parentElement;
        dots.dataset.value = dots.dataset.value === String(v) ? '' : String(v);
        [...dots.children].forEach(d => d.classList.toggle('on', Number(d.dataset.value) <= Number(dots.dataset.value || 0)));
      } }))))));
    $('review-comment')?.before(wrap);
  }
  function readAspects() {
    const out = {};
    document.querySelectorAll('#cm-aspect-inputs [data-aspect]').forEach(d => { if (d.dataset.value) out[d.dataset.aspect] = Number(d.dataset.value); });
    return out;
  }
  function resetAspects() {
    document.querySelectorAll('#cm-aspect-inputs [data-aspect]').forEach(d => { d.dataset.value = ''; [...d.children].forEach(c => c.classList.remove('on')); });
    document.querySelectorAll('[data-aspect-label]').forEach(l => { l.textContent = t()[l.dataset.aspectLabel]; });
  }

  /* -------------------------------------------------- dish votes/photos */
  async function decorateDishes(restaurantId, dishes) {
    const cards = [...document.querySelectorAll('#dish-list .dish-card[data-dish]')];
    if (!cards.length) return;
    let stats = {};
    try { stats = (await api('/dishes/stats', { method: 'POST', body: { restaurant_id: String(restaurantId), dishes: cards.map(c => c.dataset.dish) } })).results; } catch { return; }
    if (state.selected?.id !== restaurantId) return;
    const key = name => name.toLowerCase().split(/\s+/).filter(Boolean).join(' ').slice(0, 200);
    for (const card of cards) {
      card.querySelector('.cm-dish-social')?.remove();
      const name = card.dataset.dish;
      const stat = stats[key(name)] || { up: 0, down: 0, mine: 0 };
      const body = card.children[1];
      const render = () => {
        const total = stat.up + stat.down;
        const pct = total ? Math.round((stat.up / total) * 100) : null;
        const vote = v => async () => {
          if (!requireLogin()) return;
          try { Object.assign(stat, await api('/dishes/vote', { method: 'POST', body: { restaurant_id: String(restaurantId), dish: name, vote: stat.mine === v ? 0 : v } })); render(); } catch (err) { fail(err); }
        };
        const row = h('div', { class: 'cm-dish-social' },
          h('button', { type: 'button', class: `cm-vote${stat.mine === 1 ? ' active' : ''}`, 'aria-label': '👍', text: `👍${stat.up ? ` ${stat.up}` : ''}`, onclick: vote(1) }),
          h('button', { type: 'button', class: `cm-vote down${stat.mine === -1 ? ' active' : ''}`, 'aria-label': '👎', text: `👎${stat.down ? ` ${stat.down}` : ''}`, onclick: vote(-1) }),
          pct != null ? h('span', { class: 'cm-pct', text: `${pct}%` }) : null,
          (stat.photos || []).slice(0, 3).map(id => h('button', { type: 'button', class: 'cm-dish-thumb', onclick: () => openPhoto({ id, dish: name, username: '', created_at: Date.now() }) }, h('img', { src: photoUrl(id), alt: '', loading: 'lazy' }))),
          h('button', { type: 'button', class: 'cm-vote cm-camera', 'aria-label': t().addPhoto, title: t().addPhoto, text: '📷', onclick: () => pickPhoto(state.selected, name) }));
        card.querySelector('.cm-dish-social')?.remove();
        body.append(row);
      };
      render();
    }
  }

  let photoTarget = null;
  function pickPhoto(restaurant, dish) {
    if (!requireLogin()) return;
    photoTarget = { restaurant, dish };
    const input = $('cm-photo-input');
    input.value = '';
    input.click();
  }
  async function compressImage(file) {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1080 / Math.max(bitmap.width, bitmap.height));
    const canvas = h('canvas', { width: Math.round(bitmap.width * scale), height: Math.round(bitmap.height * scale) });
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.78, 0.65, 0.5, 0.38]) {
      const url = canvas.toDataURL('image/jpeg', quality);
      if (url.length < 440000) return url;
    }
    throw new Error('photo_too_large');
  }
  async function uploadPhoto(file) {
    if (!file || !photoTarget) return;
    const { restaurant, dish } = photoTarget;
    try {
      const image = await compressImage(file);
      await api('/photos', { method: 'POST', body: { restaurant: restaurantRef(restaurant), dish, image } });
      showToast(t().photoAdded);
      if (state.selected?.id === restaurant.id) {
        C.venueTab = dish ? C.venueTab : 'photos';
        void renderVenue(restaurant);
        void decorateDishes(restaurant.id, state.currentMenuDishes);
      }
    } catch (err) { fail(err); }
  }

  /* ------------------------------------------------------------- sheet */
  function openSheet(content) {
    $('cm-sheet-body').replaceChildren(content);
    $('cm-sheet-back').textContent = t().back;
    $('cm-sheet').hidden = false;
    document.body.classList.add('cm-sheet-open');
  }
  function closeSheet() {
    if (!$('cm-sheet') || $('cm-sheet').hidden) return;
    $('cm-sheet').hidden = true;
    document.body.classList.remove('cm-sheet-open');
  }

  /* ----------------------------------------------------------- profiles */
  function badgeGrid(badges) {
    const names = t().badgeNames;
    return h('div', { class: 'cm-badges' }, badges.map(b => h('div', { class: `cm-badge${b.earned ? ' earned' : ''}`, title: `${names[b.id]} · ${b.progress}/${b.goal}` },
      h('span', { class: 'cm-badge-icon', text: BADGE_ICONS[b.id] }),
      h('span', { class: 'cm-badge-name', text: names[b.id] }),
      b.earned ? null : h('span', { class: 'cm-badge-progress', text: `${b.progress}/${b.goal}` }))));
  }

  async function openProfile(username) {
    openSheet(spinner());
    let p;
    try { p = await api(`/users/${encodeURIComponent(username)}`); } catch { closeSheet(); fail(); return; }
    const followBtn = p.is_me ? null : h('button', { type: 'button', class: p.following ? 'review-cancel-btn' : 'review-save-btn', text: p.following ? t().followingBtn : t().follow, onclick: async () => {
      if (!requireLogin()) return;
      try { await api(`/users/${encodeURIComponent(username)}/follow`, { method: p.following ? 'DELETE' : 'POST' }); openProfile(username); } catch (err) { fail(err); }
    } });
    const stat = (value, label) => h('div', {}, h('strong', { text: String(value) }), h('span', { text: label }));
    const content = h('div', { class: 'cm-profile' },
      h('div', { class: 'cm-profile-head' }, h('span', { class: 'cm-avatar big', text: p.user.username.slice(0, 1).toUpperCase() }),
        h('div', { class: 'cm-profile-name' }, h('h2', { text: `@${p.user.username}` }), h('p', { text: [p.user.faculty, p.user.city].filter(Boolean).join(' · ') })), followBtn),
      p.user.bio ? h('p', { class: 'cm-bio', text: p.user.bio }) : null,
      h('div', { class: 'profile-stats cm-profile-stats' }, stat(p.counts.checkins, t().checkins), stat(p.counts.reviews, t().reviews.toLowerCase()), stat(p.counts.followers, t().followers), stat(p.counts.following, t().followingCount)),
      p.streak ? h('p', { class: 'cm-streak', text: `🔥 ${t().streak(p.streak)}` }) : null,
      h('div', { class: 'profile-section-header' }, h('h3', { text: t().badges })), badgeGrid(p.badges),
      !p.visible ? empty(t().privateProfile) : [
        p.photos?.length ? [h('div', { class: 'profile-section-header' }, h('h3', { text: t().photos })), h('div', { class: 'cm-photo-grid' }, p.photos.map(ph => h('button', { type: 'button', class: 'cm-photo', onclick: () => openPhoto({ ...ph, username: p.user.username, created_at: Date.now() }) }, h('img', { src: photoUrl(ph.id), alt: ph.dish || ph.restaurant_name, loading: 'lazy' }))))] : null,
        p.reviews?.length ? [h('div', { class: 'profile-section-header' }, h('h3', { text: t().reviews })), h('div', { class: 'profile-items-list' }, p.reviews.map(r => h('div', { class: 'profile-item-card', onclick: () => openRestaurantById(r.restaurant_id, r.restaurant_name) },
          h('div', { class: 'profile-item-info' }, h('span', { class: 'profile-item-name', text: r.restaurant_name }), r.comment ? translatableText(r.comment, 'profile-item-sub') : null),
          h('span', { class: 'profile-stars', text: stars(r.rating) }))))] : null,
        p.lists?.length ? [h('div', { class: 'profile-section-header' }, h('h3', { text: t().lists })), listCards(p.lists)] : null,
      ]);
    openSheet(content);
  }

  async function renderMyProfile() {
    document.querySelector('#cm-profile-block')?.remove();
    if (!C.enabled || !loggedIn()) return;
    const host = h('div', { id: 'cm-profile-block', class: 'cm-profile-block' }, spinner());
    $('profile-user-card').after(host);
    let me, p;
    try { [me, p] = await Promise.all([api('/me'), api(`/users/${encodeURIComponent(C.me.username)}`)]); } catch { host.remove(); return; }
    C.me = me.user;
    const r = me.recap;
    const bio = h('input', { type: 'text', maxLength: 160, value: me.user.bio });
    const faculty = h('input', { type: 'text', maxLength: 80, value: me.user.faculty });
    const city = h('input', { type: 'text', maxLength: 80, value: me.user.city });
    const priv = h('input', { type: 'checkbox', checked: me.user.is_private });
    const edit = h('form', { class: 'cm-edit-profile', hidden: true, onsubmit: async e => {
      e.preventDefault();
      try { await api('/me', { method: 'POST', body: { bio: bio.value, faculty: faculty.value, city: city.value, is_private: priv.checked } }); showToast(t().saved); renderMyProfile(); } catch (err) { fail(err); }
    } },
      h('label', { class: 'auth-field-wrap' }, h('span', { text: t().bio }), bio),
      h('label', { class: 'auth-field-wrap' }, h('span', { text: t().faculty }), faculty),
      h('label', { class: 'auth-field-wrap' }, h('span', { text: t().city }), city),
      h('label', { class: 'cm-toggle' }, priv, h('span', { text: t().privateToggle })),
      h('button', { type: 'submit', class: 'review-save-btn', text: t().save }));
    const stat = (value, label) => h('div', {}, h('strong', { text: String(value) }), h('span', { text: label }));
    host.replaceChildren(
      h('div', { class: 'cm-chip-row cm-my-links' },
        p.streak ? h('span', { class: 'cm-chip cm-today', text: `🔥 ${t().streak(p.streak)}` }) : null,
        h('span', { class: 'cm-chip', text: `${p.counts.followers} ${t().followers}` }),
        h('span', { class: 'cm-chip', text: `${p.counts.following} ${t().followingCount}` }),
        h('button', { type: 'button', class: 'cm-link', text: t().publicProfile, onclick: () => openProfile(C.me.username) }),
        h('button', { type: 'button', class: 'cm-link', text: t().editProfile, onclick: () => { edit.hidden = !edit.hidden; } })),
      edit,
      h('div', { class: 'profile-section-header' }, h('h3', { text: t().badges })), badgeGrid(p.badges),
      h('div', { class: 'profile-section-header' }, h('h3', { text: `${t().recap} · ${r.label}` })),
      h('div', { class: 'cm-recap' },
        h('div', { class: 'profile-stats cm-profile-stats cm-recap-stats' }, stat(r.meals, t().meals), stat(r.places, t().places(r.places).replace(/^\d+\s/, '')), stat(formatMoney(r.spent), t().spent)),
        r.top_place ? h('p', {}, h('span', { text: `${t().topPlace}: ` }), h('strong', { text: r.top_place })) : null,
        r.top_dish ? h('p', {}, h('span', { text: `${t().topDish}: ` }), translatableText(r.top_dish, 'cm-inline-text')) : null));
  }

  /* ------------------------------------------------------- lists sheet */
  function listCards(lists) {
    return h('div', { class: 'profile-items-list' }, lists.map(l => h('div', { class: 'profile-item-card', onclick: () => openList(l.id) },
      h('div', { class: 'profile-item-info' }, h('span', { class: 'profile-item-name', text: l.title }), h('p', { class: 'profile-item-sub', text: `@${l.username} · ${t().places(l.items)}${l.city ? ` · ${l.city}` : ''}` })),
      h('span', { class: 'cm-chevron', text: '›' }))));
  }
  async function openList(id) {
    openSheet(spinner());
    let list;
    try { list = await api(`/lists/${encodeURIComponent(id)}`); } catch { closeSheet(); fail(); return; }
    const items = list.items.length ? h('div', { class: 'profile-items-list' }, list.items.map(item => h('div', { class: 'profile-item-card', onclick: () => openRestaurantById(item.restaurant_id, item.restaurant_name) },
      h('div', { class: 'profile-item-info' }, h('span', { class: 'profile-item-name', text: item.restaurant_name }), item.note ? translatableText(item.note, 'profile-item-sub') : null),
      list.mine ? h('button', { type: 'button', class: 'profile-del-btn', 'aria-label': t().remove, text: '✕', onclick: async e => {
        e.stopPropagation();
        try { await api(`/lists/${encodeURIComponent(id)}/items/remove`, { method: 'POST', body: { restaurant: { id: item.restaurant_id, name: item.restaurant_name } } }); openList(id); } catch (err) { fail(err); }
      } }) : h('span', { class: 'cm-chevron', text: '›' })))) : empty(t().noLists);
    openSheet(h('div', { class: 'cm-list-detail' },
      h('h2', { text: list.title }),
      h('p', { class: 'cm-bio' }, list.description ? translatableText(list.description, 'cm-inline-text') : null, h('span', {}, ' · ', userLink(list.username))),
      items,
      list.mine
        ? h('button', { type: 'button', class: 'profile-reset-btn', text: t().deleteList, onclick: async () => { try { await api(`/lists/${encodeURIComponent(id)}`, { method: 'DELETE' }); C.myLists = null; closeSheet(); if (C.view === 'lists') renderView(); } catch (err) { fail(err); } } })
        : reportButton('list', list.id)));
  }
  function newListForm(onCreated) {
    const title = h('input', { type: 'text', maxLength: 80, placeholder: t().listTitle, required: true });
    const description = h('input', { type: 'text', maxLength: 200, placeholder: t().listDescription });
    return h('form', { class: 'cm-meetup-form', onsubmit: async e => {
      e.preventDefault();
      if (!requireLogin()) return;
      try { const created = await api('/lists', { method: 'POST', body: { title: title.value, description: description.value, city: C.me?.city || '' } }); C.myLists = null; onCreated(created.id); } catch (err) { fail(err); }
    } }, h('strong', { text: t().newList }), title, description, h('button', { type: 'submit', class: 'review-save-btn', text: t().create }));
  }
  async function openAddToList(restaurant) {
    if (!requireLogin()) return;
    openSheet(spinner());
    try { C.myLists = (await api(`/users/${encodeURIComponent(C.me.username)}`)).lists || []; } catch { C.myLists = []; }
    const add = async listId => {
      try { await api(`/lists/${encodeURIComponent(listId)}/items`, { method: 'POST', body: { restaurant: restaurantRef(restaurant) } }); showToast(t().added); closeSheet(); if (state.selected?.id === restaurant.id) void renderVenue(restaurant); } catch (err) { fail(err); }
    };
    openSheet(h('div', { class: 'cm-list-detail' },
      h('h2', { text: t().addToList }), h('p', { class: 'cm-bio', text: restaurant.name }),
      C.myLists.length ? h('div', { class: 'profile-items-list' }, C.myLists.map(l => h('div', { class: 'profile-item-card', onclick: () => add(l.id) },
        h('div', { class: 'profile-item-info' }, h('span', { class: 'profile-item-name', text: l.title }), h('p', { class: 'profile-item-sub', text: t().places(l.items) })), h('span', { class: 'cm-chevron', text: '+' })))) : null,
      newListForm(add)));
  }

  /* ---------------------------------------------------- community page */
  function setView(view) {
    C.view = view;
    document.querySelectorAll('[data-cm-view]').forEach(b => b.classList.toggle('active', b.dataset.cmView === view));
    renderView();
  }
  async function renderView() {
    const host = $('cm-view');
    if (!host || !C.enabled) return;
    host.replaceChildren(spinner());
    const city = C.me?.city || '';
    try {
      if (C.view === 'feed') {
        const data = await api('/feed', { query: { following: C.following ? '1' : '', city } });
        const toggle = h('div', { class: 'cm-chip-row cm-feed-toggle' },
          h('button', { type: 'button', class: `cm-chip${!C.following ? ' active' : ''}`, text: t().everyone, onclick: () => { C.following = false; renderView(); } }),
          h('button', { type: 'button', class: `cm-chip${C.following ? ' active' : ''}`, text: t().followingTab, onclick: () => { if (!requireLogin()) return; C.following = true; renderView(); } }));
        const trending = data.trending?.length ? [h('div', { class: 'profile-section-header' }, h('h3', { text: t().trending })), h('div', { class: 'cm-chip-row cm-trending' }, data.trending.map(x => h('button', { type: 'button', class: 'cm-chip', text: `🔥 ${x.restaurant_name} · ${x.checkins}`, onclick: () => openRestaurantById(x.restaurant_id, x.restaurant_name) })))] : null;
        const meetups = data.meetups?.length ? [h('div', { class: 'profile-section-header' }, h('h3', { text: t().meetups })), h('div', { class: 'cm-meetups' }, data.meetups.map(m => meetupCard(m, renderView)))] : null;
        const items = data.items.length ? h('div', { class: 'cm-feed' }, data.items.map(feedItem)) : empty(t().emptyFeed);
        fill(host, toggle, trending, meetups, items);
      } else if (C.view === 'meetups') {
        const { results } = await api('/meetups', { query: { city } });
        host.replaceChildren(results.length ? h('div', { class: 'cm-meetups' }, results.map(m => meetupCard(m, renderView))) : empty(t().noMeetups));
      } else if (C.view === 'lists') {
        const { results } = await api('/lists', { query: { city } });
        host.replaceChildren(results.length ? listCards(results) : empty(t().noLists), newListForm(id => { renderView(); openList(id); }));
      } else if (C.view === 'ranking') {
        const data = await api('/leaderboard', { query: { faculty: C.faculty } });
        const select = h('select', { class: 'cm-select', onchange: e => { C.faculty = e.target.value; renderView(); } },
          h('option', { value: '', text: t().allFaculties }), data.faculties.map(f => h('option', { value: f, text: f, selected: f === C.faculty })));
        const rows = data.results.length ? h('div', { class: 'profile-items-list cm-ranking' }, data.results.map((row, i) => h('div', { class: 'profile-item-card', onclick: () => openProfile(row.username) },
          h('span', { class: `cm-rank${i < 3 ? ` top-${i + 1}` : ''}`, text: String(i + 1) }),
          h('div', { class: 'profile-item-info' }, h('span', { class: 'profile-item-name', text: `@${row.username}` }), row.faculty ? h('p', { class: 'profile-item-sub', text: row.faculty }) : null),
          h('strong', { class: 'cm-points', text: `${row.points} ${t().points}` })))) : empty(t().noRanking);
        host.replaceChildren(select, rows);
      }
    } catch { host.replaceChildren(empty(t().error)); }
  }
  function feedItem(item) {
    const verb = { review: t().rated, photo: t().photoAt, checkin: t().ateAt }[item.type];
    return h('article', { class: 'cm-feed-item' },
      avatar(item.username),
      h('div', { class: 'cm-feed-body' },
        h('p', { class: 'cm-feed-line' }, userLink(item.username), ` ${verb} `, h('button', { type: 'button', class: 'cm-place-link', text: item.restaurant_name, onclick: () => openRestaurantById(item.restaurant_id, item.restaurant_name) }),
          item.type === 'review' ? h('span', { class: 'profile-stars', text: ` ${stars(item.rating)}` }) : null),
        item.type === 'review' && item.comment ? translatableText(item.comment) : null,
        item.type === 'photo' ? h('button', { type: 'button', class: 'cm-feed-photo', onclick: () => openPhoto(item) }, h('img', { src: photoUrl(item.id), alt: item.dish || item.restaurant_name, loading: 'lazy' })) : null,
        item.dish && item.type !== 'review' ? translatableText(item.dish, 'cm-feed-dish') : null,
        h('span', { class: 'cm-time', text: relativeTime(item.created_at) })));
  }

  let searchTimer = null;
  function setupUserSearch() {
    const input = $('cm-user-search');
    const results = $('cm-user-results');
    input?.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const q = input.value.trim();
      if (q.length < 2) { results.hidden = true; results.replaceChildren(); return; }
      searchTimer = setTimeout(async () => {
        try {
          const data = await api('/users', { query: { q } });
          results.replaceChildren(h('div', { class: 'profile-items-list' }, data.results.map(u => h('div', { class: 'profile-item-card', onclick: () => openProfile(u.username) },
            avatar(u.username), h('div', { class: 'profile-item-info' }, h('span', { class: 'profile-item-name', text: `@${u.username}` }), h('p', { class: 'profile-item-sub', text: [u.faculty, u.city].filter(Boolean).join(' · ') }))))));
          results.hidden = !data.results.length;
        } catch {}
      }, 250);
    });
  }

  function applyCommunityLanguage() {
    $('cm-tab-label').textContent = t().community;
    $('cm-title').textContent = t().community;
    $('cm-user-search').placeholder = t().searchPeople;
    $('cm-user-search').setAttribute('aria-label', t().searchPeople);
    document.querySelectorAll('[data-cm-view]').forEach(b => { b.textContent = t()[b.dataset.cmView]; });
    resetAspects();
  }

  /* ------------------------------------------------------------ events */
  function bindEvents() {
    document.addEventListener('bomboni:restaurants-rendered', scheduleDecorate);
    document.addEventListener('bomboni:restaurant-opened', e => { C.venueTab = 'reviews'; ensureAspectInputs(); void renderVenue(e.detail.restaurant); });
    document.addEventListener('bomboni:menu-rendered', e => { void decorateDishes(e.detail.restaurantId, e.detail.dishes); });
    document.addEventListener('bomboni:tab', e => { closeSheet(); if (e.detail.name === 'community') renderView(); });
    document.addEventListener('bomboni:profile-rendered', () => { void renderMyProfile(); });
    document.addEventListener('bomboni:review-saved', async e => {
      if (!loggedIn()) return;
      const { review, restaurant } = e.detail;
      try {
        await api('/reviews', { method: 'POST', body: { restaurant: restaurantRef(restaurant), rating: review.rating, comment: review.comment, ...readAspects() } });
        resetAspects();
        if (state.selected?.id === restaurant.id) void renderVenue(restaurant);
      } catch (err) { fail(err); }
    });
    document.addEventListener('bomboni:review-deleted', async e => {
      if (!loggedIn()) return;
      try { await api(`/reviews/${encodeURIComponent(e.detail.restaurantId)}`, { method: 'DELETE' }); } catch {}
      if (state.selected?.id === e.detail.restaurantId) void renderVenue(state.selected);
    });
    document.addEventListener('bomboni:meal-logged', async e => {
      if (!loggedIn()) return;
      const { meal, restaurant } = e.detail;
      try {
        await api('/checkins', { method: 'POST', body: { restaurant: restaurantRef(restaurant), day: meal.date, dish: meal.dishName, fee: meal.fee } });
        if (meal.date === state.today) showToast(`✓ ${t().shareCheckin}`);
        if (state.selected?.id === restaurant.id) void renderVenue(restaurant);
      } catch {}
    });
    document.addEventListener('bomboni:meal-deleted', async e => {
      if (!loggedIn()) return;
      const { meal } = e.detail;
      const stillLogged = getMeals().some(m => m.restaurantId === meal.restaurantId && m.date === meal.date);
      if (!stillLogged) try { await api('/checkins', { method: 'DELETE', query: { restaurant_id: meal.restaurantId, day: meal.date } }); } catch {}
    });
    document.addEventListener('bomboni:draw-result', e => {
      const { restaurant, card } = e.detail;
      const slot = h('div', { class: 'cm-draw-meetup' });
      const button = h('button', { type: 'button', class: 'cm-link', text: `🍽️ ${t().planLunch}`, onclick: () => { button.remove(); slot.append(meetupForm(restaurant, () => { slot.replaceChildren(); switchTab('community'); setView('meetups'); })); } });
      slot.append(button);
      card.append(slot);
    });
    document.querySelectorAll('[data-cm-view]').forEach(b => b.addEventListener('click', () => setView(b.dataset.cmView)));
    $('cm-sheet-close').addEventListener('click', closeSheet);
    $('cm-sheet').addEventListener('click', e => { if (e.target.id === 'cm-sheet') closeSheet(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
    $('cm-photo-input').addEventListener('change', e => { void uploadPhoto(e.target.files?.[0]); });
    $('language-select')?.addEventListener('change', () => setTimeout(() => {
      applyCommunityLanguage();
      if (state.tab === 'community') renderView();
      if (state.selected) void renderVenue(state.selected);
    }, 0));
    setupUserSearch();
  }

  async function init() {
    let status;
    try {
      const response = await fetch('/api/community/status');
      status = response.ok ? await response.json() : null;
    } catch { status = null; }
    if (status?.enabled !== true) return;
    C.enabled = true;
    document.body.classList.add('community-on');
    document.querySelectorAll('.cm-only').forEach(node => { node.hidden = false; });
    interceptAuth();
    bindEvents();
    applyCommunityLanguage();
    try { C.token = localStorage.getItem(SESSION_KEY); } catch {}
    if (C.token) {
      try { C.me = (await api('/me')).user; setCurrentUser({ username: C.me.username, email: C.me.email }); void importLocalData(); }
      catch { clearSession(); }
    } else if (getCurrentUser()) {
      // A device-only account from before the community launch: ask to sign in again.
      setCurrentUser(null);
    }
    updateProfileAuthUI();
    if (state.tab === 'profile') renderProfilePage();
    scheduleDecorate();
    if (state.selected) void renderVenue(state.selected);
  }

  void init();
})();
