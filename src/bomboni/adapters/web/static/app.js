const translations = {
  pt:{eyebrow:'ALMOÇO COM BONI, SEM BARREIRAS',heroA:'Uma boa refeição',heroB:'fica',heroEm:'mais perto.',heroCopy:'Restaurantes de boni à sua volta, com os pratos no seu idioma.',search:'Restaurante…',near:'Perto de si',sorting:'A ordenar pela sua localização',enable:'Ativar localização para ordenar por distância.',loading:'A encontrar restaurantes…',loadingDishes:'A procurar pratos nos cardápios de hoje…',more:'Ver mais',emptyKicker:'A SUA PRÓXIMA PARAGEM',emptyTitle:'Escolha um restaurante',emptyCopy:'Veja o menu de boni do dia, traduzido para si. O nome original fica sempre disponível.',emptyFoot:'Menus oficiais · tradução automática',back:'Todos os restaurantes',venueKicker:'RESTAURANTE DE BONI',menuOverline:'MENU DE BONI',today:'Pratos do dia',fee:'Copagamento',noMenu:'Não há pratos publicados para esta data.',menuSource:'Menu publicado para',retrieved:'consultado às',disclaimer:'Tradução automática. Confirme ingredientes e alergénios diretamente com o restaurante.',footer:'Dados de refeições estudantis · Eslovénia',source:'Fonte oficial',locating:'A obter localização…',locationReady:'A ordenar pela distância',locationFallback:'Ljubljana · localização não permitida',noResults:'Nenhum restaurante encontrado.',noDishResults:'Nenhum restaurante com este prato hoje.',searchDishPrompt:'Pesquise por um prato para ver quais restaurantes o servem hoje.',error:'Não foi possível carregar os dados. Tente novamente.',translationMissing:'Sem tradução automática disponível',restaurantCount:'restaurantes',categories:{Meat:'Carne',Fish:'Peixe',Meatless:'Sem carne',Mixed:'Misto','Salad bar':'Saladas','Fast food':'Rápido'}},
  en:{eyebrow:'STUDENT MEALS, WITHOUT THE LANGUAGE BARRIER',heroA:'A good meal',heroB:'is',heroEm:'closer than you think.',heroCopy:'Student meal restaurants around you, with dishes in your language.',search:'Restaurant…',near:'Near you',sorting:'Sorted by your location',enable:'Enable location to sort by distance.',loading:'Finding nearby restaurants…',loadingDishes:'Searching today’s menus for dishes…',more:'Show more',emptyKicker:'YOUR NEXT STOP',emptyTitle:'Choose a restaurant',emptyCopy:'See today’s student meal menu translated for you. The original name is always available.',emptyFoot:'Official menus · machine translated',back:'All restaurants',venueKicker:'STUDENT MEAL RESTAURANT',menuOverline:'STUDENT MENU',today:'Today’s dishes',fee:'Student co-pay',noMenu:'No dishes are published for this date.',menuSource:'Menu published for',retrieved:'checked at',disclaimer:'Machine translation. Check ingredients and allergens with the restaurant.',footer:'Student meal listings · Slovenia',source:'Official source',locating:'Getting location…',locationReady:'Sorted by distance',locationFallback:'Ljubljana · location unavailable',noResults:'No restaurants found.',noDishResults:'No restaurants found with this dish today.',searchDishPrompt:'Search for a dish to see which restaurants have it today.',error:'Could not load the data. Please try again.',translationMissing:'Translation unavailable',restaurantCount:'restaurants',categories:{Meat:'Meat',Fish:'Fish',Meatless:'Meatless',Mixed:'Mixed','Salad bar':'Salad bar','Fast food':'Fast food'}},
  es:{eyebrow:'BONI SIN BARRERAS DE IDIOMA',heroA:'Una buena comida',heroB:'está',heroEm:'más cerca.',heroCopy:'Restaurantes con boni cerca de ti y platos en tu idioma.',search:'Restaurante…',near:'Cerca de ti',sorting:'Ordenados por tu ubicación',enable:'Activa la ubicación para ordenar por distancia.',loading:'Buscando restaurantes…',loadingDishes:'Buscando platos en los menús de hoy…',more:'Ver más',emptyKicker:'TU PRÓXIMA PARADA',emptyTitle:'Elige un restaurante',emptyCopy:'Consulta el menú de boni del día traducido. El nombre original siempre está disponible.',emptyFoot:'Menús oficiales · traducción automática',back:'Todos los restaurantes',venueKicker:'RESTAURANTE CON BONI',menuOverline:'MENÚ BONI',today:'Platos de hoy',fee:'Copago',noMenu:'No hay platos publicados para esta fecha.',menuSource:'Menú publicado para',retrieved:'consultado a las',disclaimer:'Traducción automática. Confirma los ingredientes y alérgenos con el restaurante.',footer:'Comidas de estudiantes · Eslovenia',source:'Fuente oficial',locating:'Obteniendo ubicación…',locationReady:'Ordenados por distancia',locationFallback:'Ljubljana · ubicación no disponible',noResults:'No se encontraron restaurantes.',noDishResults:'No hay restaurantes con este plato hoy.',searchDishPrompt:'Busca un plato para ver qué restaurantes lo ofrecen hoy.',error:'No se pudieron cargar los datos. Inténtalo de nuevo.',translationMissing:'Traducción no disponible',restaurantCount:'restaurantes',categories:{Meat:'Carne',Fish:'Pescado',Meatless:'Sin carne',Mixed:'Mixto','Salad bar':'Ensaladas','Fast food':'Rápido'}},
  de:{eyebrow:'STUDENTENMENÜS OHNE SPRACHBARRIEREN',heroA:'Ein gutes Essen',heroB:'ist',heroEm:'ganz in der Nähe.',heroCopy:'Boni-Restaurants in deiner Nähe, mit Gerichten in deiner Sprache.',search:'Restaurant…',near:'In deiner Nähe',sorting:'Nach Standort sortiert',enable:'Standort aktivieren, um nach Entfernung zu sortieren.',loading:'Restaurants werden gesucht…',loadingDishes:'Gerichte in heutigen Menüs werden gesucht…',more:'Mehr anzeigen',emptyKicker:'DEIN NÄCHSTER STOPP',emptyTitle:'Restaurant auswählen',emptyCopy:'Sieh dir das heutige Boni-Menü übersetzt an. Der Originalname bleibt immer sichtbar.',emptyFoot:'Offizielle Menüs · maschinell übersetzt',back:'Alle Restaurants',venueKicker:'BONI-RESTAURANT',menuOverline:'BONI-MENÜ',today:'Gerichte heute',fee:'Eigenanteil',noMenu:'Für dieses Datum sind keine Gerichte veröffentlicht.',menuSource:'Menü veröffentlicht für',retrieved:'abgerufen um',disclaimer:'Maschinelle Übersetzung. Zutaten und Allergene bitte direkt beim Restaurant prüfen.',footer:'Studentenmenüs · Slowenien',source:'Offizielle Quelle',locating:'Standort wird ermittelt…',locationReady:'Nach Entfernung sortiert',locationFallback:'Ljubljana · Standort nicht verfügbar',noResults:'Keine Restaurants gefunden.',noDishResults:'Heute kein Restaurant mit diesem Gericht gefunden.',searchDishPrompt:'Suche nach einem Gericht, um passende Restaurants zu finden.',error:'Daten konnten nicht geladen werden. Bitte erneut versuchen.',translationMissing:'Keine Übersetzung verfügbar',restaurantCount:'Restaurants',categories:{Meat:'Fleisch',Fish:'Fisch',Meatless:'Fleischlos',Mixed:'Gemischt','Salad bar':'Salate','Fast food':'Schnellgericht'}},
  it:{eyebrow:'BONI SENZA BARRIERE LINGUISTICHE',heroA:'Un buon pasto',heroB:'è',heroEm:'più vicino.',heroCopy:'Ristoranti con boni vicino a te, con i piatti nella tua lingua.',search:'Ristorante…',near:'Vicino a te',sorting:'Ordinati per posizione',enable:'Attiva la posizione per ordinare per distanza.',loading:'Cerco ristoranti…',loadingDishes:'Cerco piatti nei menu di oggi…',more:'Mostra altri',emptyKicker:'LA TUA PROSSIMA TAPPA',emptyTitle:'Scegli un restaurante',emptyCopy:'Scopri il menu boni del giorno tradotto. Il nome originale resta sempre disponibile.',emptyFoot:'Menu ufficiali · traduzione automatica',back:'Tutti i ristoranti',venueKicker:'RISTORANTE BONI',menuOverline:'MENU BONI',today:'Piatti di oggi',fee:'Quota studente',noMenu:'Nessun piatto pubblicato per questa data.',menuSource:'Menu pubblicato per',retrieved:'consultato alle',disclaimer:'Traduzione automatica. Verifica ingredienti e allergeni con il ristorante.',footer:'Menu per studenti · Slovenia',source:'Fonte ufficiale',locating:'Rilevo la posizione…',locationReady:'Ordinati per distanza',locationFallback:'Ljubljana · posizione non disponibile',noResults:'Nessun ristorante trovato.',noDishResults:'Nessun ristorante con questo piatto oggi.',searchDishPrompt:'Cerca un piatto per vedere quali ristoranti lo servono oggi.',error:'Impossibile caricare i dati. Riprova.',translationMissing:'Traduzione non disponibile',restaurantCount:'ristoranti',categories:{Meat:'Carne',Fish:'Pesce',Meatless:'Senza carne',Mixed:'Misto','Salad bar':'Insalate','Fast food':'Veloce'}},
  fr:{eyebrow:'LES BONI SANS BARRIÈRE DE LANGUE',heroA:'Un bon repas',heroB:'est',heroEm:'tout près.',heroCopy:'Des restaurants avec boni près de vous, avec les plats dans votre langue.',search:'Restaurant…',near:'Près de vous',sorting:'Triés selon votre position',enable:'Activez la localisation pour trier par distance.',loading:'Recherche de restaurants…',loadingDishes:'Recherche de plats dans les menus du jour…',more:'Voir plus',emptyKicker:'VOTRE PROCHAINE ÉTAPE',emptyTitle:'Choisissez un restaurant',emptyCopy:'Consultez le menu boni du jour traduit. Le nom original reste toujours disponible.',emptyFoot:'Menus officiels · traduction automatique',back:'Tous les restaurants',venueKicker:'RESTAURANT BONI',menuOverline:'MENU BONI',today:'Plats du jour',fee:'Participation étudiant',noMenu:'Aucun plat publié pour cette date.',menuSource:'Menu publié pour',retrieved:'consulté à',disclaimer:'Traduction automatique. Vérifiez les ingrédients et allergènes auprès du restaurant.',footer:'Repas étudiants · Slovénie',source:'Source officielle',locating:'Localisation en cours…',locationReady:'Triés par distance',locationFallback:'Ljubljana · localisation indisponible',noResults:'Aucun restaurant trouvé.',noDishResults:'Aucun restaurant trouvé avec ce plat aujourd’hui.',searchDishPrompt:'Recherchez un plat pour voir quels restaurants le proposent aujourd’hui.',error:'Impossible de charger les données. Réessayez.',translationMissing:'Traduction indisponible',restaurantCount:'restaurants',categories:{Meat:'Viande',Fish:'Poisson',Meatless:'Sans viande',Mixed:'Mixte','Salad bar':'Salades','Fast food':'Rapide'}}
};

const searchModeLabels = {
  restaurants: { pt:'Restaurantes', en:'Restaurants', es:'Restaurantes', de:'Restaurants', it:'Ristoranti', fr:'Restaurants' },
  dishes: { pt:'No cardápio', en:'On the menu', es:'En el menú', de:'Auf der Karte', it:'Nel menu', fr:'Au menu' }
};

const dishSearchPlaceholders = {
  pt: 'Pesquisar prato (ex: pizza, sushi, salada)…',
  en: 'Search dish (e.g. pizza, sushi, salad)…',
  es: 'Buscar plato (ej: pizza, sushi, ensalada)…',
  de: 'Gericht suchen (z.B. Pizza, Sushi, Salat)…',
  it: 'Cerca piatto (es: pizza, sushi, insalata)…',
  fr: 'Rechercher un plat (ex: pizza, sushi, salade)…'
};

const restaurantSearchPlaceholders = {
  pt: 'Restaurante, rua ou cidade…',
  en: 'Restaurant, street or city…',
  es: 'Restaurante, calle o ciudad…',
  de: 'Restaurant, Straße oder Stadt…',
  it: 'Ristorante, via o città…',
  fr: 'Restaurant, rue ou ville…'
};

const imageSearchLabels={pt:'Pesquisar imagens de',en:'Search images for',es:'Buscar imágenes de',de:'Bilder suchen für',it:'Cerca immagini di',fr:'Rechercher des images de'};
const locationError={pt:'Não foi possível obter a localização.',en:'Could not get your location.',es:'No se pudo obtener tu ubicación.',de:'Standort konnte nicht ermittelt werden.',it:'Impossibile ottenere la posizione.',fr:'Impossible d’obtenir la position.'};
const nearbyLabels={pt:'Perto de si',en:'Near you',es:'Cerca de ti',de:'In deiner Nähe',it:'Vicino a te',fr:'Près de vous'};
const mobileTabLabels={pt:{explore:'Explorar',favorites:'Favoritos',draw:'Sorteio',profile:'Perfil'},en:{explore:'Explore',favorites:'Saved',draw:'Decide',profile:'Profile'},es:{explore:'Explorar',favorites:'Favoritos',draw:'Sorteo',profile:'Perfil'},de:{explore:'Entdecken',favorites:'Favoriten',draw:'Auslosen',profile:'Profil'},it:{explore:'Esplora',favorites:'Preferiti',draw:'Estrai',profile:'Profilo'},fr:{explore:'Explorer',favorites:'Favoris',draw:'Tirage',profile:'Profil'}};
const const featureCopy={
  pt:{drawEyebrow:'DECISÃO DO DIA',drawTitle:'Vamos sortear',drawDescription:'Escolhe alguns filtros ou deixa o acaso decidir.',city:'Cidade',anyCity:'Qualquer cidade',food:'Tipo de comida',anyFood:'Sem preferência',mode:'Quero sortear',restaurant:'Restaurante',dish:'Prato',price:'Copagamento máximo',noLimit:'Sem limite',draw:'Sortear',searching:'A procurar opções nos menus de hoje…',noResult:'Não encontrei opções para esses filtros.',resultRestaurant:'O teu restaurante',resultDish:'O teu prato',openMenu:'Ver menu',drawError:'Não foi possível concluir o sorteio. Tenta novamente.',favoritesEyebrow:'A TUA LISTA',favoritesTitle:'Favoritos',favoritesSubtitle:'Os teus restaurantes guardados para acesso rápido.',favoritesEmptyTitle:'Sem restaurantes guardados',favoritesEmptyCopy:'Toca no coração de qualquer restaurante para guardá-lo aqui.',profileEyebrow:'A TUA CONTA',profileTitle:'Perfil',profileSubtitle:'O teu resumo de refeições, avaliações e gastos com boni.',profileUserTitle:'O teu registo pessoal',profileUserCopy:'Dados das tuas refeições guardados no teu dispositivo.',reviews:'Avaliações feitas',history:'Refeições registadas',foodStats:'Comida mais escolhida',spending:'Gasto com boni',myReviews:'As Minhas Avaliações',mealHistory:'Últimos Restaurantes',savedVenues:'Restaurantes Favoritos',emptyReviews:'Ainda não avaliaste nenhum restaurante. Abre um restaurante e clica em “Avaliar”.',emptyHistory:'Ainda não registaste refeições. Clica em “Comi aqui” quando visitares um restaurante.',emptyFavs:'Nenhum restaurante favorito guardado.',favBtn:'Favorito',favBtnActive:'Guardado',logBtn:'Comi aqui',logBtnDone:'Comi hoje',rateBtn:'Avaliar',rateBtnEdit:'Editar nota',rateBoxTitle:'Avaliar este restaurante',reviewPlaceholder:'Escreve uma nota rápida sobre o restaurante…',cancel:'Cancelar',save:'Guardar',resetBtn:'Limpar dados locais',favAdded:'Adicionado aos favoritos!',favRemoved:'Removido dos favoritos.',mealLogged:'Refeição registada no teu perfil!',mealDeleted:'Refeição removida.',reviewSaved:'Avaliação guardada!',reviewDeleted:'Avaliação removida.',clearDataConfirm:'Tens a certeza que queres limpar todo o teu histórico, avaliações e favoritos locais?',dataCleared:'Dados locais apagados com sucesso.',scanned:'menus consultados'},
  en:{drawEyebrow:'TODAY’S DECISION',drawTitle:'Let’s decide',drawDescription:'Choose a few filters or leave it to chance.',city:'City',anyCity:'Any city',food:'Food type',anyFood:'No preference',mode:'Pick a',restaurant:'Restaurant',dish:'Dish',price:'Maximum co-pay',noLimit:'No limit',draw:'Pick for me',searching:'Checking today’s menus…',noResult:'No options match those filters.',resultRestaurant:'Your restaurant',resultDish:'Your dish',openMenu:'View menu',drawError:'The draw failed. Please try again.',favoritesEyebrow:'YOUR LIST',favoritesTitle:'Favorites',favoritesSubtitle:'Your saved restaurants for quick access.',favoritesEmptyTitle:'No saved restaurants',favoritesEmptyCopy:'Tap the heart on any restaurant to save it here.',profileEyebrow:'YOUR ACCOUNT',profileTitle:'Profile',profileSubtitle:'Your summary of meals, reviews, and boni spending.',profileUserTitle:'Your personal record',profileUserCopy:'Meal data stored locally on your device.',reviews:'Reviews given',history:'Logged meals',foodStats:'Most chosen food',spending:'Spent on boni',myReviews:'My Reviews',mealHistory:'Recent Restaurants',savedVenues:'Favorite Restaurants',emptyReviews:'You haven’t reviewed any restaurants yet. Open a venue and tap “Rate”.',emptyHistory:'No meals logged yet. Tap “Ate here” when you visit a restaurant.',emptyFavs:'No favorite restaurants saved yet.',favBtn:'Favorite',favBtnActive:'Saved',logBtn:'Ate here',logBtnDone:'Eaten today',rateBtn:'Rate',rateBtnEdit:'Edit rating',rateBoxTitle:'Rate this restaurant',reviewPlaceholder:'Write a quick note about this restaurant…',cancel:'Cancel',save:'Save',resetBtn:'Clear local data',favAdded:'Added to favorites!',favRemoved:'Removed from favorites.',mealLogged:'Meal logged to your profile!',mealDeleted:'Meal removed.',reviewSaved:'Review saved!',reviewDeleted:'Review deleted.',clearDataConfirm:'Are you sure you want to clear your local meal history, reviews, and favorites?',dataCleared:'Local data cleared.',scanned:'menus checked'},
  es:{drawEyebrow:'LA DECISIÓN DE HOY',drawTitle:'Vamos a sortear',drawDescription:'Elige algunos filtros o deja que decida el azar.',city:'Ciudad',anyCity:'Cualquier ciudad',food:'Tipo de comida',anyFood:'Sin preferencia',mode:'Sortear',restaurant:'Restaurante',dish:'Plato',price:'Copago máximo',noLimit:'Sin límite',draw:'Sortear',searching:'Buscando en los menús de hoy…',noResult:'No hay opciones con esos filtros.',resultRestaurant:'Tu restaurante',resultDish:'Tu plato',openMenu:'Ver menú',drawError:'No se pudo completar el sorteo.',favoritesEyebrow:'TU LISTA',favoritesTitle:'Favoritos',favoritesSubtitle:'Tus restaurantes guardados para acceso rápido.',favoritesEmptyTitle:'Sin restaurantes guardados',favoritesEmptyCopy:'Toca el corazón de cualquier restaurante para guardarlo aquí.',profileEyebrow:'TU CUENTA',profileTitle:'Perfil',profileSubtitle:'Tu resumen de comidas, reseñas y gastos con boni.',profileUserTitle:'Tu registro personal',profileUserCopy:'Datos guardados localmente en tu dispositivo.',reviews:'Reseñas hechas',history:'Comidas registradas',foodStats:'Comida más elegida',spending:'Gasto en boni',myReviews:'Mis Reseñas',mealHistory:'Últimos Restaurantes',savedVenues:'Restaurantes Favoritos',emptyReviews:'Aún no has valorado ningún restaurante. Abre uno y pulsa “Valorar”.',emptyHistory:'Aún no has registrado comidas. Pulsa “Comí aquí” al visitar un restaurante.',emptyFavs:'No tienes restaurantes favoritos guardados.',favBtn:'Favorito',favBtnActive:'Guardado',logBtn:'Comí aquí',logBtnDone:'Comí hoy',rateBtn:'Valorar',rateBtnEdit:'Editar nota',rateBoxTitle:'Valorar este restaurante',reviewPlaceholder:'Escribe una nota rápida sobre el restaurante…',cancel:'Cancelar',save:'Guardar',resetBtn:'Borrar datos locales',favAdded:'¡Añadido a favoritos!',favRemoved:'Eliminado de favoritos.',mealLogged:'¡Comida registrada en tu perfil!',mealDeleted:'Comida eliminada.',reviewSaved:'¡Reseña guardada!',reviewDeleted:'Reseña eliminada.',clearDataConfirm:'¿Seguro que quieres borrar todo tu historial, reseñas y favoritos locales?',dataCleared:'Datos locales borrados.',scanned:'menús consultados'},
  de:{drawEyebrow:'DIE ENTSCHEIDUNG DES TAGES',drawTitle:'Lass uns auslosen',drawDescription:'Wähle Filter oder lass den Zufall entscheiden.',city:'Stadt',anyCity:'Jede Stadt',food:'Essensart',anyFood:'Keine Präferenz',mode:'Auswählen',restaurant:'Restaurant',dish:'Gericht',price:'Maximaler Eigenanteil',noLimit:'Kein Limit',draw:'Auslosen',searching:'Heutige Menüs werden geprüft…',noResult:'Keine passenden Optionen gefunden.',resultRestaurant:'Dein Restaurant',resultDish:'Dein Gericht',openMenu:'Menü ansehen',drawError:'Die Auslosung ist fehlgeschlagen.',favoritesEyebrow:'DEINE LISTE',favoritesTitle:'Favoriten',favoritesSubtitle:'Deine gespeicherten Restaurants für schnellen Zugriff.',favoritesEmptyTitle:'Keine gespeicherten Restaurants',favoritesEmptyCopy:'Tippe auf das Herz bei einem Restaurant, um es hier zu speichern.',profileEyebrow:'DEIN KONTO',profileTitle:'Profil',profileSubtitle:'Deine Übersicht über Mahlzeiten, Bewertungen und Ausgaben.',profileUserTitle:'Dein persönliches Protokoll',profileUserCopy:'Daten lokal auf deinem Gerät gespeichert.',reviews:'Abgegebene Bewertungen',history:'Erfasste Mahlzeiten',foodStats:'Meistgewähltes Essen',spending:'Boni-Ausgaben',myReviews:'Meine Bewertungen',mealHistory:'Letzte Restaurants',savedVenues:'Lieblingsrestaurants',emptyReviews:'Du hast noch keine Restaurants bewertet. Öffne ein Restaurant und tippe auf „Bewerten“.',emptyHistory:'Noch keine Mahlzeiten erfasst. Tippe auf „Hier gegessen“, wenn du ein Restaurant besuchst.',emptyFavs:'Keine Lieblingsrestaurants gespeichert.',favBtn:'Favorit',favBtnActive:'Gespeichert',logBtn:'Hier gegessen',logBtnDone:'Heute gegessen',rateBtn:'Bewerten',rateBtnEdit:'Bewertung bearbeiten',rateBoxTitle:'Dieses Restaurant bewerten',reviewPlaceholder:'Schreibe eine kurze Notiz über das Restaurant…',cancel:'Abbrechen',save:'Speichern',resetBtn:'Lokale Daten löschen',favAdded:'Zu Favoriten hinzugefügt!',favRemoved:'Aus Favoriten entfernt.',mealLogged:'Mahlzeit im Profil erfasst!',mealDeleted:'Mahlzeit gelöscht.',reviewSaved:'Bewertung gespeichert!',reviewDeleted:'Bewertung gelöscht.',clearDataConfirm:'Möchtest du wirklich deinen lokalen Verlauf, Bewertungen und Favoriten löschen?',dataCleared:'Lokale Daten gelöscht.',scanned:'Menüs geprüft'},
  it:{drawEyebrow:'LA SCELTA DI OGGI',drawTitle:'Facciamo decidere al caso',drawDescription:'Scegli qualche filtro oppure lascia fare al caso.',city:'Città',anyCity:'Qualsiasi città',food:'Tipo di cibo',anyFood:'Nessuna preferenza',mode:'Estrai',restaurant:'Ristorante',dish:'Piatto',price:'Quota massima',noLimit:'Nessun limite',draw:'Estrai',searching:'Controllo i menu di oggi…',noResult:'Nessuna opzione con questi filtri.',resultRestaurant:'Il tuo ristorante',resultDish:'Il tuo piatto',openMenu:'Vedi menu',drawError:'Estrazione non riuscita.',favoritesEyebrow:'LA TUA LISTA',favoritesTitle:'Preferiti',favoritesSubtitle:'I tuoi ristoranti salvati per accesso rapido.',favoritesEmptyTitle:'Nessun ristorante salvato',favoritesEmptyCopy:'Tocca il cuore su un ristorante per salvarlo qui.',profileEyebrow:'IL TUO ACCOUNT',profileTitle:'Profilo',profileSubtitle:'Il tuo riepilogo di pasti, recensioni e spese con boni.',profileUserTitle:'Il tuo registro personale',profileUserCopy:'Dati dei tuoi pasti salvati sul dispositivo.',reviews:'Recensioni fatte',history:'Pasti registrati',foodStats:'Cibo più scelto',spending:'Spesa per boni',myReviews:'Le Mie Recensioni',mealHistory:'Ultimi Ristoranti',savedVenues:'Ristoranti Preferiti',emptyReviews:'Non hai ancora valutato nessun ristorante. Apri un locale e tocca “Valuta”.',emptyHistory:'Nessun pasto ancora registrato. Tocca “Ho mangiato qui” quando visiti un ristorante.',emptyFavs:'Nessun ristorante preferito salvato.',favBtn:'Preferito',favBtnActive:'Salvato',logBtn:'Ho mangiato qui',logBtnDone:'Mangiato oggi',rateBtn:'Valuta',rateBtnEdit:'Modifica voto',rateBoxTitle:'Valuta questo ristorante',reviewPlaceholder:'Scrivi una breve nota sul ristorante…',cancel:'Annulla',save:'Salva',resetBtn:'Cancella dati locali',favAdded:'Aggiunto ai preferiti!',favRemoved:'Rimosso dai preferiti.',mealLogged:'Pasto registrato nel profilo!',mealDeleted:'Pasto rimosso.',reviewSaved:'Recensione salvata!',reviewDeleted:'Recensione eliminata.',clearDataConfirm:'Sei sicuro di voler cancellare cronologia, recensioni e preferiti locali?',dataCleared:'Dati locali cancellati.',scanned:'menu controllati'},
  fr:{drawEyebrow:'LA DÉCISION DU JOUR',drawTitle:'Laissons le hasard choisir',drawDescription:'Choisissez des filtres ou laissez faire le hasard.',city:'Ville',anyCity:'Toutes les villes',food:'Type de plat',anyFood:'Sans préférence',mode:'Tirer au sort',restaurant:'Restaurant',dish:'Plat',price:'Participation maximale',noLimit:'Sans limite',draw:'Tirer au sort',searching:'Recherche dans les menus du jour…',noResult:'Aucune option ne correspond à ces filtres.',resultRestaurant:'Votre restaurant',resultDish:'Votre plat',openMenu:'Voir le menu',drawError:'Le tirage au sort a échoué.',favoritesEyebrow:'VOTRE LISTE',favoritesTitle:'Favoris',favoritesSubtitle:'Vos restaurants enregistrés pour un accès rapide.',favoritesEmptyTitle:'Aucun restaurant enregistré',favoritesEmptyCopy:'Touchez le cœur sur un restaurant pour l’enregistrer ici.',profileEyebrow:'VOTRE COMPTE',profileTitle:'Profil',profileSubtitle:'Votre résumé de repas, avis et dépenses avec boni.',profileUserTitle:'Votre registre personnel',profileUserCopy:'Données de repas stockées sur votre appareil.',reviews:'Avis donnés',history:'Repas enregistrés',foodStats:'Plat le plus choisi',spending:'Dépensé en boni',myReviews:'Mes Avis',mealHistory:'Restaurants Récents',savedVenues:'Restaurants Favoris',emptyReviews:'Vous n’avez pas encore noté de restaurant. Ouvrez un restaurant et touchez « Noter ».',emptyHistory:'Aucun repas enregistré. Touchez « J’ai mangé ici » lorsque vous visitez un restaurant.',emptyFavs:'Aucun restaurant favori enregistré.',favBtn:'Favori',favBtnActive:'Enregistré',logBtn:'J’ai mangé ici',logBtnDone:'Mangé aujourd’hui',rateBtn:'Noter',rateBtnEdit:'Modifier note',rateBoxTitle:'Noter ce restaurant',reviewPlaceholder:'Écrivez une note rapide sur ce restaurant…',cancel:'Annuler',save:'Enregistrer',resetBtn:'Effacer les données locales',favAdded:'Ajouté aux favoris !',favRemoved:'Retiré des favoris.',mealLogged:'Repas enregistré dans votre profil !',mealDeleted:'Repas supprimé.',reviewSaved:'Avis enregistré !',reviewDeleted:'Avis supprimé.',clearDataConfirm:'Voulez-vous vraiment effacer votre historique, vos avis et vos favoris locaux ?',dataCleared:'Données locales effacées.',scanned:'menus vérifiés'}
};
const hoursLabels={pt:{open:'Aberto',closed:'Fechado',unknown:'Sem horário',checking:'A verificar',today:'Hoje'},en:{open:'Open',closed:'Closed',unknown:'Hours n/a',checking:'Checking',today:'Today'},es:{open:'Abierto',closed:'Cerrado',unknown:'Sin horario',checking:'Consultando',today:'Hoy'},de:{open:'Geöffnet',closed:'Geschlossen',unknown:'Keine Zeiten',checking:'Prüfe…',today:'Heute'},it:{open:'Aperto',closed:'Chiuso',unknown:'Orari n/d',checking:'Verifica…',today:'Oggi'},fr:{open:'Ouvert',closed:'Fermé',unknown:'Horaires n/d',checking:'Vérification',today:'Aujourd’hui'}};
const drawSampleLabel={pt:(scanned,total)=>`Sorteio entre ${scanned} de ${total} restaurantes`,en:(scanned,total)=>`Draw from ${scanned} of ${total} restaurants`,es:(scanned,total)=>`Sorteo entre ${scanned} de ${total} restaurantes`,de:(scanned,total)=>`Auswahl aus ${scanned} von ${total} Restaurants`,it:(scanned,total)=>`Estrazione tra ${scanned} di ${total} ristoranti`,fr:(scanned,total)=>`Tirage parmi ${scanned} restaurants sur ${total}`};
const drawNoSampleLabel={pt:n=>`Não encontrei uma opção nos ${n} restaurantes sorteados.`,en:n=>`No match in the ${n} restaurants checked.`,es:n=>`No encontré opciones en los ${n} restaurantes consultados.`,de:n=>`Keine passende Option unter den ${n} geprüften Restaurants.`,it:n=>`Nessuna opzione tra i ${n} ristoranti controllati.`,fr:n=>`Aucune option parmi les ${n} restaurants vérifiés.`};
const installCopy={pt:{label:'Instalar app',ios:'No Safari, toque em Partilhar e escolha “Adicionar ao ecrã principal”.',browser:'Use o menu do navegador para instalar o Bomboni.'},en:{label:'Install app',ios:'In Safari, tap Share and choose “Add to Home Screen”.',browser:'Use your browser menu to install Bomboni.'},es:{label:'Instalar app',ios:'En Safari, toca Compartir y elige “Añadir a pantalla de inicio”.',browser:'Usa el menú del navegador para instalar Bomboni.'},de:{label:'App installieren',ios:'Tippe in Safari auf Teilen und wähle „Zum Home-Bildschirm“.',browser:'Installiere Bomboni über das Browsermenü.'},it:{label:'Installa app',ios:'In Safari, tocca Condividi e scegli “Aggiungi alla schermata Home”.',browser:'Usa il menu del browser per installare Bomboni.'},fr:{label:'Installer',ios:'Dans Safari, touchez Partager puis « Sur l’écran d’accueil ».',browser:'Installez Bomboni depuis le menu du navigateur.'}};

const BONBON_SPINNER_HTML='<span class="bonbon-spinner" aria-hidden="true"><svg viewBox="0 0 32 32"><rect x="9.5" y="10.5" width="13" height="11" rx="5.5"/><path d="M9.5 16 L3.5 10 L5 16 L3.5 22 Z"/><path d="M22.5 16 L28.5 10 L27 16 L28.5 22 Z"/><path d="M9.5 13 C8.8 14.5 8.8 17.5 9.5 19"/><path d="M22.5 13 C23.2 14.5 23.2 17.5 22.5 19"/><path d="M15.5 10.5 C17 13.5 17 18.5 15.5 21.5"/></svg></span>';

let deferredInstallPrompt=null;
let activeMenuRequest=0;
let dishSearchTimer=null;
const restaurantHours={};
const loadingHours=new Set();
const menuCache=new Map();
let savedTranslations={};try{savedTranslations=JSON.parse(localStorage.getItem('bomboni-translations')||'{}');}catch{}
const savedLanguage=localStorage.getItem('bomboni-language');
const state = {
  language: translations[savedLanguage]?savedLanguage:'pt',
  location: null,
  locationLabel: '',
  restaurants: [],
  visible: 15,
  selected: null,
  date: '',
  today: new Intl.DateTimeFormat('en-CA', {timeZone: 'Europe/Ljubljana'}).format(new Date()),
  translationCache: savedTranslations,
  tab: 'explore',
  searchMode: 'restaurants',
  dishResults: [],
  isSearchingDishes: false,
  currentMenuDishes: []
};

// Sync today date with backend in background without blocking interactions
fetch('/api/today').then(r=>r.json()).then(d=>{if(d?.date){state.today=d.date;if(!state.date)state.date=d.date;}}).catch(()=>{});

const STORAGE_FAVORITES='bomboni-favorites';
const STORAGE_REVIEWS='bomboni-reviews';
const STORAGE_MEALS='bomboni-meals';

function getFavorites(){try{return JSON.parse(localStorage.getItem(STORAGE_FAVORITES)||'{}');}catch{return {};}}
function saveFavorites(data){try{localStorage.setItem(STORAGE_FAVORITES,JSON.stringify(data));}catch{}}
function isFavorite(restaurantId){return Boolean(getFavorites()[restaurantId]);}

function toggleFavorite(restaurant){
  const favs=getFavorites();
  const id=restaurant.id;
  const isFav=Boolean(favs[id]);
  const feature=featureCopy[state.language]||featureCopy.en;
  if(isFav){
    delete favs[id];
    saveFavorites(favs);
    showToast(feature.favRemoved||'Removido dos favoritos.');
  }else{
    favs[id]={
      id:restaurant.id,
      name:restaurant.name,
      address:restaurant.address,
      city:restaurant.city,
      additional_fee_eur:restaurant.additional_fee_eur,
      source_url:restaurant.source_url
    };
    saveFavorites(favs);
    showToast(feature.favAdded||'Adicionado aos favoritos!');
  }
  updateFavoriteButtons(id);
  if(state.tab==='favorites')renderFavoritesPage();
  if(state.tab==='profile')renderProfilePage();
}

function updateFavoriteButtons(restaurantId){
  const isFav=isFavorite(restaurantId);
  document.querySelectorAll(`.card-fav-btn[data-id="${restaurantId}"]`).forEach(btn=>{
    btn.classList.toggle('active',isFav);
  });
  if(state.selected&&state.selected.id===restaurantId){
    const venueFavBtn=$('venue-fav-btn');
    const venueFavText=$('venue-fav-text');
    if(venueFavBtn&&venueFavText){
      venueFavBtn.classList.toggle('active',isFav);
      venueFavBtn.classList.toggle('is-fav',isFav);
      const feature=featureCopy[state.language]||featureCopy.en;
      venueFavText.textContent=isFav?(feature.favBtnActive||'Guardado'):(feature.favBtn||'Favorito');
    }
  }
}

function getReviews(){try{return JSON.parse(localStorage.getItem(STORAGE_REVIEWS)||'{}');}catch{return {};}}
function saveReviews(data){try{localStorage.setItem(STORAGE_REVIEWS,JSON.stringify(data));}catch{}}
function getReview(restaurantId){return getReviews()[restaurantId]||null;}

function saveReview(restaurantId,rating,comment,restaurant){
  const revs=getReviews();
  const feature=featureCopy[state.language]||featureCopy.en;
  revs[restaurantId]={
    restaurantId,
    name:restaurant.name,
    address:restaurant.address,
    city:restaurant.city,
    additional_fee_eur:restaurant.additional_fee_eur,
    rating:Number(rating)||5,
    comment:(comment||'').trim(),
    date:state.today,
    timestamp:Date.now()
  };
  saveReviews(revs);
  showToast(feature.reviewSaved||'Avaliação guardada!');
  updateVenueReviewUI();
  if(state.tab==='profile')renderProfilePage();
}

function deleteReview(restaurantId){
  const revs=getReviews();
  const feature=featureCopy[state.language]||featureCopy.en;
  if(revs[restaurantId]){
    delete revs[restaurantId];
    saveReviews(revs);
    showToast(feature.reviewDeleted||'Avaliação removida.');
    updateVenueReviewUI();
    if(state.tab==='profile')renderProfilePage();
  }
}

function getMeals(){try{return JSON.parse(localStorage.getItem(STORAGE_MEALS)||'[]');}catch{return [];}}
function saveMeals(data){try{localStorage.setItem(STORAGE_MEALS,JSON.stringify(data));}catch{}}
function hasLoggedMealToday(restaurantId){return getMeals().some(m=>m.restaurantId===restaurantId&&m.date===state.today);}

function logMeal(restaurant){
  const meals=getMeals();
  const feature=featureCopy[state.language]||featureCopy.en;
  let category='Mixed';
  if(state.currentMenuDishes&&state.currentMenuDishes.length){
    const cats=state.currentMenuDishes.flatMap(d=>d.categories||[]);
    if(cats.length){
      const counts={};
      cats.forEach(c=>{counts[c]=(counts[c]||0)+1;});
      category=Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];
    }
  }
  const entry={
    id:`${restaurant.id}-${Date.now()}`,
    restaurantId:restaurant.id,
    name:restaurant.name,
    address:restaurant.address,
    city:restaurant.city,
    fee:Number(restaurant.additional_fee_eur)||0,
    category,
    date:state.today,
    timestamp:Date.now()
  };
  meals.unshift(entry);
  saveMeals(meals);
  showToast(feature.mealLogged||'Refeição registada no teu perfil!');
  updateVenueMealLogUI();
  if(state.tab==='profile')renderProfilePage();
}

function deleteMeal(mealId){
  let meals=getMeals();
  const feature=featureCopy[state.language]||featureCopy.en;
  meals=meals.filter(m=>m.id!==mealId);
  saveMeals(meals);
  showToast(feature.mealDeleted||'Refeição removida.');
  updateVenueMealLogUI();
  if(state.tab==='profile')renderProfilePage();
}

function clearAllLocalData(){
  const feature=featureCopy[state.language]||featureCopy.en;
  if(!window.confirm(feature.clearDataConfirm||'Tens a certeza que queres limpar todo o teu histórico, avaliações e favoritos locais?'))return;
  localStorage.removeItem(STORAGE_FAVORITES);
  localStorage.removeItem(STORAGE_REVIEWS);
  localStorage.removeItem(STORAGE_MEALS);
  showToast(feature.dataCleared||'Dados locais apagados.');
  if(state.searchMode==='dishes')renderDishesSearch();else renderRestaurants();
  if(state.tab==='favorites')renderFavoritesPage();
  if(state.tab==='profile')renderProfilePage();
  if(state.selected){
    updateFavoriteButtons(state.selected.id);
    updateVenueReviewUI();
    updateVenueMealLogUI();
  }
}

let currentReviewRating=5;
function setReviewStars(val){
  currentReviewRating=val;
  document.querySelectorAll('#review-stars .star-btn').forEach(btn=>{
    btn.classList.toggle('selected',Number(btn.dataset.value)<=val);
  });
}

function updateVenueReviewUI(){
  if(!state.selected)return;
  const rev=getReview(state.selected.id);
  const rateBtn=$('venue-rate-btn');
  const rateText=$('venue-rate-text');
  const ratingDisplay=$('venue-rating-display');
  const ratingSep=$('venue-rating-sep');
  const feature=featureCopy[state.language]||featureCopy.en;
  if(rev){
    rateBtn.classList.add('active');
    rateText.textContent=feature.rateBtnEdit||'Editar nota';
    ratingDisplay.hidden=false;
    ratingSep.hidden=false;
    ratingDisplay.innerHTML=`<span style="color:#e5993b;margin-right:3px;">★</span><strong>${rev.rating}.0</strong>`;
  }else{
    rateBtn.classList.remove('active');
    rateText.textContent=feature.rateBtn||'Avaliar';
    ratingDisplay.hidden=true;
    ratingSep.hidden=true;
  }
}

function updateVenueMealLogUI(){
  if(!state.selected)return;
  const logged=hasLoggedMealToday(state.selected.id);
  const logBtn=$('venue-log-meal-btn');
  const logText=$('venue-log-text');
  const feature=featureCopy[state.language]||featureCopy.en;
  if(logged){
    logBtn.classList.add('active');
    logText.textContent=feature.logBtnDone||'Comi hoje';
  }else{
    logBtn.classList.remove('active');
    logText.textContent=feature.logBtn||'Comi aqui';
  }
}

const $ = (id) => document.getElementById(id);
const languageSelect = $('language-select');
const safeText = (value) => value == null ? '' : String(value);

function locale(){ return ({pt:'pt-PT',en:'en-GB',es:'es-ES',de:'de-DE',it:'it-IT',fr:'fr-FR'})[state.language] || 'pt-PT'; }
function tr(){ return translations[state.language] || translations.pt; }

function applyLanguage(){
  const t=tr();const feature=featureCopy[state.language]||featureCopy.en; document.documentElement.lang=state.language; languageSelect.value=state.language;
  $('location-label').textContent=state.locationLabel||({pt:'Usar localização',en:'Set location',es:'Usar ubicación',de:'Standort setzen',it:'Imposta posizione',fr:'Définir la position'}[state.language]);
  $('search-mode-restaurants').textContent=searchModeLabels.restaurants[state.language]||searchModeLabels.restaurants.en;
  $('search-mode-dishes').textContent=searchModeLabels.dishes[state.language]||searchModeLabels.dishes.en;
  $('search-input').placeholder=state.searchMode==='dishes'?(dishSearchPlaceholders[state.language]||dishSearchPlaceholders.en):(restaurantSearchPlaceholders[state.language]||restaurantSearchPlaceholders.en);
  $('search-input').setAttribute('aria-label',$('search-input').placeholder);
  $('hero-title').textContent=({pt:'Restaurantes com boni',en:'Student meal restaurants',es:'Restaurantes con boni',de:'Boni-Restaurants',it:'Ristoranti con boni',fr:'Restaurants avec boni'}[state.language]);
  $('list-title').textContent=({pt:'Restaurantes',en:'Restaurants',es:'Restaurantes',de:'Restaurants',it:'Ristoranti',fr:'Restaurants'}[state.language]);
  $('load-more').textContent=t.more;
  $('back-label').textContent=t.back; $('menu-title').textContent=t.today;
  $('date-prev').setAttribute('aria-label',({pt:'Dia anterior',en:'Previous day',es:'Día anterior',de:'Vorheriger Tag',it:'Giorno precedente',fr:'Jour précédent'}[state.language]));
  $('date-next').setAttribute('aria-label',({pt:'Dia seguinte',en:'Next day',es:'Día seguinte',de:'Nächster Tag',it:'Giorno successivo',fr:'Jour suivant'}[state.language]));
  $('footer-source').textContent=t.source;
  $('footer-install').textContent=installCopy[state.language]?.label||installCopy.en.label;
  document.querySelectorAll('[data-tab-label]').forEach(label=>{label.textContent=mobileTabLabels[state.language]?.[label.dataset.tabLabel]||mobileTabLabels.en[label.dataset.tabLabel];});
  for(const [id,key] of Object.entries({
    'draw-eyebrow':'drawEyebrow','draw-title':'drawTitle','draw-description':'drawDescription','draw-city-label':'city','draw-any-city':'anyCity',
    'draw-category-label':'food','draw-any-category':'anyFood','draw-mode-label':'mode','draw-mode-restaurant':'restaurant','draw-mode-dish':'dish',
    'draw-price-label':'price','draw-submit-label':'draw',
    'favorites-eyebrow':'favoritesEyebrow','favorites-title':'favoritesTitle','favorites-subtitle':'favoritesSubtitle',
    'favorites-empty-title':'favoritesEmptyTitle','favorites-empty-copy':'favoritesEmptyCopy',
    'profile-eyebrow':'profileEyebrow','profile-title':'profileTitle','profile-subtitle':'profileSubtitle',
    'profile-user-title':'profileUserTitle','profile-user-copy':'profileUserCopy',
    'profile-spend-label':'spending','profile-food-label':'foodStats','profile-history-label':'history','profile-reviews-label':'reviews',
    'profile-sec-reviews':'myReviews','profile-sec-history':'mealHistory','profile-sec-favs':'savedVenues',
    'profile-reset-btn':'resetBtn','review-box-title':'rateBoxTitle','review-cancel-btn':'cancel','review-save-btn':'save'
  })){const el=$(id);if(el&&feature[key])el.textContent=feature[key];}
  const reviewComment=$('review-comment');if(reviewComment&&feature.reviewPlaceholder)reviewComment.placeholder=feature.reviewPlaceholder;
  $('draw-price').placeholder=feature.noLimit;
  document.querySelectorAll('[data-category]').forEach(option=>{option.textContent=t.categories[option.dataset.category]||option.dataset.category;});
  $('mobile-tab-bar').setAttribute('aria-label',({pt:'Navegação principal',en:'Main navigation',es:'Navegación principal',de:'Hauptnavigation',it:'Navigazione principale',fr:'Navigation principale'}[state.language]));
  renderDrawCities();
  if(state.searchMode==='dishes')renderDishesSearch();else renderRestaurants();
  if(state.tab==='favorites')renderFavoritesPage();
  if(state.tab==='profile')renderProfilePage();
  if(state.selected){
    updateFavoriteButtons(state.selected.id);
    updateVenueReviewUI();
    updateVenueMealLogUI();
  }
}

function switchTab(name){
  state.tab=name;
  $('layout').hidden=name!=='explore';
  $('draw-page').hidden=name!=='draw';
  $('favorites-page').hidden=name!=='favorites';
  $('profile-page').hidden=name!=='profile';
  $('footer').hidden=name!=='explore';
  if(name!=='explore'){
    state.selected=null;
    $('menu-panel').hidden=true;
    $('menu-panel').classList.remove('mobile-open');
    $('layout').classList.remove('menu-open');
    renderRestaurants();
  }
  if(name==='favorites')renderFavoritesPage();
  if(name==='profile')renderProfilePage();
  document.querySelectorAll('.mobile-tab').forEach(tab=>{
    const active=tab.dataset.tab===name;
    tab.classList.toggle('active',active);
    if(active)tab.setAttribute('aria-current','page');else tab.removeAttribute('aria-current');
  });
  window.scrollTo({top:0,behavior:'smooth'});
}

async function installApp(){
  if(deferredInstallPrompt){deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;$('install-button').hidden=true;return;}
  const standalone=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone;
  if(standalone){showToast(installCopy[state.language]?.label||installCopy.en.label);return;}
  const isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent)&&!window.MSStream;
  showToast(isIOS?(installCopy[state.language]?.ios||installCopy.en.ios):(installCopy[state.language]?.browser||installCopy.en.browser));
}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstallPrompt=event;$('install-button').hidden=false;});
window.addEventListener('appinstalled',()=>{$('install-button').hidden=true;showToast(installCopy[state.language]?.label||installCopy.en.label);});
$('install-button').addEventListener('click',installApp);
$('footer-install').addEventListener('click',installApp);

function showToast(message){const toast=$('toast');toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800);}
function formatMoney(value){if(value==null)return '—';return new Intl.NumberFormat(locale(),{style:'currency',currency:'EUR'}).format(value);}
function formatDate(value){return new Intl.DateTimeFormat(locale(),{weekday:'long',day:'numeric',month:'long'}).format(new Date(`${value}T12:00:00`));}
function displayAddress(address,city){return city&&address?.toLocaleLowerCase().includes(city.toLocaleLowerCase())?address:[address,city].filter(Boolean).join(', ');}
function normalizeSearch(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();}
function editDistanceAtMostOne(a,b){if(Math.abs(a.length-b.length)>1)return false;let i=0,j=0,edits=0;while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue;}if(++edits>1)return false;if(a.length>b.length)i++;else if(b.length>a.length)j++;else{i++;j++;}}return edits+(i<a.length||j<b.length?1:0)<=1;}
function searchScore(r,query){
  const q=normalizeSearch(query);if(!q)return 1;
  const name=normalizeSearch(r.name), address=normalizeSearch(r.address), city=normalizeSearch(r.city), tags=normalizeSearch((r.tags||[]).join(' '));
  const fields=[name,address,city,tags], all=fields.join(' ');
  if(name===q)return 1000;if(name.startsWith(q))return 900;if(name.includes(q))return 800;
  if(address.startsWith(q)||city===q)return 700;if(all.includes(q))return 600;
  const terms=q.split(/\s+/);const words=all.split(/\s+/);
  if(!terms.every(term=>words.some(word=>word.startsWith(term)||(term.length>=5&&editDistanceAtMostOne(term,word)))))return 0;
  const nameWords=name.split(/\s+/);const nameMatches=terms.filter(term=>nameWords.some(word=>word.startsWith(term))).length;
  return 300+nameMatches*20;
}

function scheduleForToday(hours){
  if(!hours||!Object.keys(hours).length)return null;
  const weekday=new Intl.DateTimeFormat('en-US',{timeZone:'Europe/Ljubljana',weekday:'long'}).format(new Date()).toLocaleLowerCase();
  const entries=Object.entries(hours).map(([day,value])=>[day.toLocaleLowerCase().replace(/[^a-z]/g,''),String(value||'').trim()]);
  const exact=entries.find(([day])=>day===weekday);
  const weekend=weekday==='saturday'?entries.find(([day])=>day==='saturday'):weekday==='sunday'?entries.find(([day])=>day.includes('sunday')):null;
  const weekdays=entries.find(([day])=>day.includes('weekday')||day.includes('weekdays')||day.includes('workday'));
  const entry=exact||weekend||((weekday!=='saturday'&&weekday!=='sunday')?weekdays:null);
  return entry?.[1]||null;
}

function restaurantHoursStatus(restaurant){
  const labels=hoursLabels[state.language]||hoursLabels.en;
  if(loadingHours.has(restaurant.id))return {status:'checking',schedule:labels.checking};
  if(!Object.hasOwn(restaurantHours,restaurant.id))return {status:'checking',schedule:labels.checking};
  const schedule=scheduleForToday(restaurantHours[restaurant.id]);
  if(!schedule)return {status:'unknown',schedule:labels.unknown};
  const ranges=[...schedule.matchAll(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/g)];
  if(!ranges.length){
    const closed=/closed|close|zaprto|zaprta|ne obratuje/i.test(schedule);
    return {status:closed?'closed':'unknown',schedule:`${labels.today}: ${schedule}`};
  }
  const current=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Ljubljana',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
  const now=Number(current.find(part=>part.type==='hour')?.value||0)*60+Number(current.find(part=>part.type==='minute')?.value||0);
  const isOpen=ranges.some(match=>{const start=Number(match[1])*60+Number(match[2]);let end=Number(match[3])*60+Number(match[4]);if(end<start)end+=1440;return now>=start&&now<end;});
  const formatted=schedule.replace(/\s*[-–]\s*/g,'–').replace(/\s*,\s*/g,' · ');
  return {status:isOpen?'open':'closed',schedule:`${labels.today}: ${formatted}`};
}

async function loadRestaurantHours(restaurants){
  const pending=restaurants.filter(restaurant=>!Object.hasOwn(restaurantHours,restaurant.id)&&!loadingHours.has(restaurant.id));
  if(!pending.length)return;
  pending.forEach(restaurant=>loadingHours.add(restaurant.id));
  try{
    const ids=pending.map(restaurant=>restaurant.id).join(',');
    const response=await fetch(`/api/restaurant-hours?ids=${encodeURIComponent(ids)}`);
    if(!response.ok)throw new Error('hours');
    const data=await response.json();
    for(const item of data.results||[])restaurantHours[item.restaurant_id]=item.opening_hours||{};
  }catch{}
  finally{
    pending.forEach(restaurant=>{loadingHours.delete(restaurant.id);if(!Object.hasOwn(restaurantHours,restaurant.id))restaurantHours[restaurant.id]={};});
    if(state.searchMode==='dishes')renderDishesSearch();else renderRestaurants();
  }
}

function updateSearchClear(){
  const val=$('search-input').value;
  $('search-clear').hidden=!val;
}

$('search-clear').addEventListener('click',()=>{
  $('search-input').value='';
  updateSearchClear();
  $('search-input').focus();
  $('restaurant-scroll-area')?.scrollTo({top:0,behavior:'instant'});
  if(state.searchMode==='dishes'){
    state.dishResults=[];
    renderDishesSearch();
  }else{
    renderRestaurants();
  }
});

function setSearchMode(mode){
  state.searchMode=mode;
  $('restaurant-scroll-area')?.scrollTo({top:0,behavior:'instant'});
  $('search-mode-restaurants').classList.toggle('active',mode==='restaurants');
  $('search-mode-dishes').classList.toggle('active',mode==='dishes');
  $('search-input').placeholder=mode==='dishes'?(dishSearchPlaceholders[state.language]||dishSearchPlaceholders.en):(restaurantSearchPlaceholders[state.language]||restaurantSearchPlaceholders.en);
  $('search-input').setAttribute('aria-label',$('search-input').placeholder);
  if(mode==='dishes')handleDishSearch();else renderRestaurants();
}

$('search-mode-restaurants').addEventListener('click',()=>setSearchMode('restaurants'));
$('search-mode-dishes').addEventListener('click',()=>setSearchMode('dishes'));

function renderRestaurants(){
  if(state.searchMode==='dishes'){renderDishesSearch();return;}
  const t=tr();const host=$('restaurant-list');const query=$('search-input').value.trim();
  updateSearchClear();
  const records=state.restaurants.map((restaurant,index)=>({restaurant,index,score:searchScore(restaurant,query)})).filter(item=>item.score>0).sort((a,b)=>b.score-a.score||a.index-b.index).map(item=>item.restaurant);const shown=records.slice(0,state.visible);
  $('result-count').textContent=records.length;
  host.replaceChildren();
  if(!records.length){const empty=document.createElement('div');empty.className='loading-card';empty.textContent=t.noResults;host.append(empty);$('load-more').hidden=true;return;}
  shown.forEach((r,index)=>{
    const card=document.createElement('div');card.className=`restaurant-card${state.selected?.id===r.id?' active':''}`;
    card.setAttribute('role','button');card.setAttribute('tabindex','0');
    card.style.animationDelay=`${Math.min(index,10)*24}ms`;
    const avatar=document.createElement('span');avatar.className='restaurant-avatar';avatar.textContent=(r.name||'?').trim().slice(0,1).toLocaleUpperCase();
    const info=document.createElement('span');info.className='restaurant-info';const name=document.createElement('span');name.className='restaurant-name';name.textContent=r.name;const address=document.createElement('span');address.className='restaurant-address';address.textContent=displayAddress(r.address,r.city);const hours=restaurantHoursStatus(r);const schedule=document.createElement('span');schedule.className='restaurant-hours';schedule.textContent=hours.schedule;info.append(name,address,schedule);
    const right=document.createElement('span');right.className='restaurant-right';const fee=document.createElement('span');fee.className='fee';fee.textContent=formatMoney(r.additional_fee_eur);const openTag=document.createElement('span');openTag.className=`open-status ${hours.status}`;openTag.textContent=hoursLabels[state.language]?.[hours.status]||hoursLabels.en[hours.status];
    const isFav=isFavorite(r.id);
    const favBtn=document.createElement('button');favBtn.type='button';favBtn.className=`card-fav-btn${isFav?' active':''}`;favBtn.dataset.id=r.id;
    favBtn.setAttribute('aria-label',isFav?(featureCopy[state.language]?.favBtnActive||'Guardado'):(featureCopy[state.language]?.favBtn||'Favorito'));
    favBtn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>';
    favBtn.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(r);});
    right.append(fee,openTag,favBtn);card.append(avatar,info,right);
    card.addEventListener('click',()=>openRestaurant(r));
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openRestaurant(r);}});
    host.append(card);
  });
  $('load-more').hidden=records.length<=state.visible;
  void loadRestaurantHours(shown);
}

function handleDishSearch(){
  updateSearchClear();
  const query=$('search-input').value.trim();
  if(!query){
    state.dishResults=[];
    state.isSearchingDishes=false;
    renderDishesSearch();
    return;
  }
  clearTimeout(dishSearchTimer);
  dishSearchTimer=setTimeout(async()=>{
    state.isSearchingDishes=true;
    renderDishesSearch();
    try{
      const currentCity=state.restaurants.find(r=>r.city)?.city||'Ljubljana';
      const response=await fetch(`/api/dishes?query=${encodeURIComponent(query)}&city=${encodeURIComponent(currentCity)}`);
      if(!response.ok)throw new Error('dishes');
      const data=await response.json();
      state.dishResults=data.results||[];
    }catch{
      state.dishResults=[];
    }finally{
      state.isSearchingDishes=false;
      renderDishesSearch();
    }
  },300);
}

function renderDishesSearch(){
  const t=tr();const host=$('restaurant-list');const query=$('search-input').value.trim();
  $('load-more').hidden=true;
  host.replaceChildren();
  if(!query){
    $('result-count').textContent='0';
    const hint=document.createElement('div');hint.className='loading-card';hint.textContent=t.searchDishPrompt;host.append(hint);
    return;
  }
  if(state.isSearchingDishes){
    $('result-count').textContent='…';
    const loading=document.createElement('div');loading.className='loading-card';loading.innerHTML=`${BONBON_SPINNER_HTML}<span>${t.loadingDishes}</span>`;host.append(loading);
    return;
  }
  $('result-count').textContent=state.dishResults.length;
  if(!state.dishResults.length){
    const empty=document.createElement('div');empty.className='loading-card';empty.textContent=t.noDishResults;host.append(empty);
    return;
  }
  const restaurantsToLoadHours=[];
  state.dishResults.forEach((item,index)=>{
    const r=item.restaurant;const dish=item.dish;
    restaurantsToLoadHours.push(r);
    const card=document.createElement('div');card.className=`restaurant-card${state.selected?.id===r.id?' active':''}`;
    card.setAttribute('role','button');card.setAttribute('tabindex','0');
    card.style.animationDelay=`${Math.min(index,10)*24}ms`;
    const avatar=document.createElement('span');avatar.className='restaurant-avatar';avatar.textContent=(r.name||'?').trim().slice(0,1).toLocaleUpperCase();
    const info=document.createElement('span');info.className='restaurant-info';
    const name=document.createElement('span');name.className='restaurant-name';name.textContent=r.name;
    const address=document.createElement('span');address.className='restaurant-address';address.textContent=displayAddress(r.address,r.city);
    const dishTag=document.createElement('span');dishTag.className='dish-match-badge';dishTag.textContent=dish.name;
    const hours=restaurantHoursStatus(r);const schedule=document.createElement('span');schedule.className='restaurant-hours';schedule.textContent=hours.schedule;
    info.append(name,address,dishTag,schedule);
    const right=document.createElement('span');right.className='restaurant-right';const fee=document.createElement('span');fee.className='fee';fee.textContent=formatMoney(r.additional_fee_eur);const openTag=document.createElement('span');openTag.className=`open-status ${hours.status}`;openTag.textContent=hoursLabels[state.language]?.[hours.status]||hoursLabels.en[hours.status];
    const isFav=isFavorite(r.id);
    const favBtn=document.createElement('button');favBtn.type='button';favBtn.className=`card-fav-btn${isFav?' active':''}`;favBtn.dataset.id=r.id;
    favBtn.setAttribute('aria-label',isFav?(featureCopy[state.language]?.favBtnActive||'Guardado'):(featureCopy[state.language]?.favBtn||'Favorito'));
    favBtn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>';
    favBtn.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(r);});
    right.append(fee,openTag,favBtn);card.append(avatar,info,right);
    card.addEventListener('click',()=>openRestaurant(r));
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openRestaurant(r);}});
    host.append(card);
  });
  void loadRestaurantHours(restaurantsToLoadHours);
}

async function loadRestaurants(){
  $('restaurant-list').innerHTML=`<div class="loading-card">${BONBON_SPINNER_HTML}<span>${tr().loading}</span></div>`;
  const params=new URLSearchParams({limit:'500'});if(state.location){params.set('lat',state.location.latitude);params.set('lon',state.location.longitude);}
  try{const response=await fetch(`/api/restaurants?${params}`);if(!response.ok)throw new Error('restaurants');const data=await response.json();state.restaurants=data.results||[];state.visible=15;renderDrawCities();if(state.location){const nearest=state.restaurants.find(r=>r.city);state.locationLabel=nearest?.distance_km!=null&&nearest.distance_km<20?nearest.city:nearbyLabels[state.language];$('location-label').textContent=state.locationLabel;}if(state.searchMode==='dishes')renderDishesSearch();else renderRestaurants();}
  catch{showToast(tr().error);$('restaurant-list').innerHTML=`<div class="loading-card">${tr().error}</div>`;}
}

function renderDrawCities(){
  const select=$('draw-city');const selected=select.value;const feature=featureCopy[state.language]||featureCopy.en;
  select.replaceChildren(new Option(feature.anyCity,''));
  [...new Set(state.restaurants.map(restaurant=>restaurant.city).filter(Boolean))].sort((a,b)=>a.localeCompare(b)).forEach(city=>select.add(new Option(city,city)));
  select.value=selected;
}

async function submitDraw(event){
  event.preventDefault();
  const feature=featureCopy[state.language]||featureCopy.en;
  const button=$('draw-submit');const label=$('draw-submit-label');const resultHost=$('draw-result');
  const params=new URLSearchParams({mode:new FormData($('draw-form')).get('draw-mode')||'restaurant'});
  const city=$('draw-city').value;const category=$('draw-category').value;const price=$('draw-price').value.trim();
  if(city)params.set('city',city);if(category)params.set('category',category);if(price)params.set('max_price_eur',price.replace(',','.'));
  button.disabled=true;label.textContent=feature.searching;resultHost.hidden=false;resultHost.className='draw-result is-loading';
  resultHost.innerHTML=`<div class="loading-card" style="justify-content:center;background:transparent;border:0;padding:24px 0;">${BONBON_SPINNER_HTML}<span>${feature.searching}</span></div>`;
  try{
    const response=await fetch(`/api/draw?${params}`);const payload=await response.json();if(!response.ok)throw new Error(payload.error||'draw');
    if(!payload.result){resultHost.className='draw-result is-empty';resultHost.textContent=payload.sampled?drawNoSampleLabel[state.language](payload.candidates_scanned):feature.noResult;return;}
    const restaurant=payload.result.restaurant;const dish=payload.result.dish;const card=document.createElement('article');card.className='draw-card';
    const kicker=document.createElement('span');kicker.className='page-eyebrow';kicker.textContent=dish?feature.resultDish:feature.resultRestaurant;
    const title=document.createElement('h2');title.textContent=dish?dish.name:restaurant.name;
    if(dish){const translations=await translatedText([dish.name]);const translated=translations.results?.find(item=>item.original===dish.name)?.translated;if(translated&&translated!==dish.name)title.textContent=translated;}
    const detail=document.createElement('p');detail.textContent=dish?`${restaurant.name} · ${displayAddress(restaurant.address,restaurant.city)}`:displayAddress(restaurant.address,restaurant.city);
    if(payload.sampled){const note=document.createElement('p');note.className='draw-sample-note';note.textContent=drawSampleLabel[state.language](payload.candidates_scanned,payload.candidate_total);card.append(kicker,title,detail,note);}else card.append(kicker,title,detail);
    const meta=document.createElement('span');meta.className='draw-card-fee';meta.textContent=formatMoney(restaurant.additional_fee_eur);
    const open=document.createElement('button');open.type='button';open.className='draw-open';open.textContent=feature.openMenu;open.addEventListener('click',()=>{switchTab('explore');openRestaurant(restaurant);});
    card.append(meta,open);resultHost.replaceChildren(card);resultHost.className='draw-result';
  }catch{resultHost.className='draw-result is-empty';resultHost.textContent=feature.drawError;}
  finally{button.disabled=false;label.textContent=feature.draw;}
}

function requestLocation(){
  if(!navigator.geolocation){showToast(locationError[state.language]);return;}
  $('location-label').textContent=({pt:'A localizar…',en:'Locating…',es:'Ubicando…',de:'Standort…',it:'Posizione…',fr:'Localisation…'}[state.language]);
  navigator.geolocation.getCurrentPosition(position=>{state.location={latitude:position.coords.latitude,longitude:position.coords.longitude};state.locationLabel='';loadRestaurants();},()=>{$('location-label').textContent=({pt:'Usar localização',en:'Set location',es:'Usar ubicación',de:'Standort setzen',it:'Imposta posizione',fr:'Définir la position'}[state.language]);showToast(locationError[state.language]);},{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
}

function categoryClass(category){const c=(category||'').toLocaleLowerCase();if(c.includes('fish'))return 'fish';if(c.includes('meatless'))return 'none';if(c.includes('meat'))return 'meat';return '';}

async function translatedText(texts){
  const unique=[...new Set(texts)];const keyFor=text=>`${state.language}::${text}`;const cached=unique.filter(text=>state.translationCache[keyFor(text)]).map(original=>({original,translated:state.translationCache[keyFor(original)],is_translated:true}));const missing=unique.filter(text=>!state.translationCache[keyFor(text)]);
  if(!missing.length)return {results:cached};
  try{const r=await fetch('/api/translate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language:state.language,texts:missing.slice(0,30)})});if(!r.ok)throw new Error('translation');const data=await r.json();for(const item of data.results||[]){if(item.is_translated)state.translationCache[keyFor(item.original)]=item.translated;}const cacheKeys=Object.keys(state.translationCache);if(cacheKeys.length>1000)cacheKeys.slice(0,cacheKeys.length-1000).forEach(key=>delete state.translationCache[key]);localStorage.setItem('bomboni-translations',JSON.stringify(state.translationCache));return {results:[...cached,...(data.results||[]),...missing.slice(30).map(original=>({original,translated:original,is_translated:false}))]};}
  catch{return {results:[...cached,...missing.map(original=>({original,translated:original,is_translated:false}))]};}
}

async function openRestaurant(restaurant){
  state.selected=restaurant;
  state.date=state.today;
  state.currentMenuDishes=[];
  const reviewBox=$('venue-review-box');
  if(reviewBox)reviewBox.hidden=true;
  updateFavoriteButtons(restaurant.id);
  updateVenueReviewUI();
  updateVenueMealLogUI();
  if(state.searchMode==='dishes')renderDishesSearch();else renderRestaurants();
  $('menu-panel').hidden=false;
  $('menu-panel').classList.add('mobile-open');
  $('menu-content').hidden=false;
  $('layout').classList.add('menu-open');
  $('dish-list').innerHTML=`<div class="loading-card" style="justify-content:center;">${BONBON_SPINNER_HTML}<span>${tr().loading}</span></div>`;
  if(window.innerWidth<=1000&&window.innerWidth>760)requestAnimationFrame(()=>$('menu-panel').scrollIntoView({behavior:'smooth',block:'start'}));
  $('venue-name').textContent=restaurant.name;
  $('venue-address').textContent=displayAddress(restaurant.address,restaurant.city);
  $('venue-avatar').textContent=(restaurant.name||'?').trim().slice(0,1).toLocaleUpperCase();
  $('venue-fee').textContent=`${tr().fee}: ${formatMoney(restaurant.additional_fee_eur)}`;
  $('source-link').href=restaurant.source_url;
  await loadMenu(restaurant.id,state.date,restaurant.name);
}

function renderMenuDishes(menu,requestId,id){
  state.currentMenuDishes=menu.dishes||[];
  $('menu-title').textContent=formatDate(menu.date);
  state.date=menu.date;
  const host=$('dish-list');host.replaceChildren();
  if(!menu.dishes?.length){
    const no=document.createElement('div');no.className='loading-card';no.textContent=tr().noMenu;host.append(no);
    return;
  }
  const dishNodes=[];
  menu.dishes.forEach((dish,index)=>{
    const card=document.createElement('article');card.className='dish-card';
    const number=document.createElement('span');number.className='dish-number';number.textContent=dish.number??String(index+1).padStart(2,'0');
    const body=document.createElement('div');
    const titleRow=document.createElement('div');titleRow.className='dish-title-row';
    const title=document.createElement('div');title.className='dish-name';
    const keyFor=text=>`${state.language}::${text}`;
    const syncTranslated=state.translationCache[keyFor(dish.name)];
    title.textContent=syncTranslated||dish.name;
    const imageSearch=document.createElement('a');imageSearch.className='image-search-button';
    imageSearch.href=`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(dish.name)}`;
    imageSearch.target='_blank';imageSearch.rel='noopener noreferrer';
    imageSearch.setAttribute('aria-label',`${imageSearchLabels[state.language]} ${dish.name}`);
    imageSearch.title=`${imageSearchLabels[state.language]} ${dish.name}`;
    imageSearch.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"/><circle cx="9" cy="10" r="1.5"/><path d="m5 17 4.5-4.5 3 3L15 13l5 5"/><circle cx="18" cy="6" r="3.2" class="search-lens"/><path d="m20.4 8.4 2 2" class="search-lens"/></svg>';
    titleRow.append(title,imageSearch);body.append(titleRow);

    const originalNode=document.createElement('div');
    if(syncTranslated&&syncTranslated.toLocaleLowerCase()!==dish.name.toLocaleLowerCase()){
      originalNode.className='dish-original';originalNode.textContent=dish.name;body.append(originalNode);
    }else if(state.language!=='sl'){
      originalNode.className='dish-status';originalNode.textContent=tr().translationMissing;body.append(originalNode);
    }

    const sides=(dish.sides||[]).filter(Boolean);
    const sideNode=document.createElement('div');
    if(sides.length){
      const sideNames=sides.map(s=>state.translationCache[keyFor(s)]||s);
      sideNode.className='dish-sides';
      sideNode.textContent=`${sideNames.join(' · ')}${sideNames.some((n,i)=>n!==sides[i])?`  /  ${sides.join(' · ')}`:''}`;
      body.append(sideNode);
    }

    if(dish.categories?.length){
      const tags=document.createElement('div');tags.className='dish-tags';
      dish.categories.forEach(category=>{
        const tag=document.createElement('span');tag.className=`dish-tag ${categoryClass(category)}`;tag.textContent=tr().categories[category]||category;tags.append(tag);
      });
      body.append(tags);
    }
    card.append(number,body);host.append(card);
    dishNodes.push({dish,title,originalNode,sideNode,sides});
  });

  // Resolve machine translation progressively in background without blocking menu display
  const dishTexts=menu.dishes.flatMap(d=>[d.name,...(d.sides||[])]);
  translatedText(dishTexts).then(result=>{
    if(requestId!==activeMenuRequest||state.selected?.id!==id)return;
    const map=new Map((result.results||[]).map(item=>[item.original,item]));
    dishNodes.forEach(({dish,title,originalNode,sideNode,sides})=>{
      const translated=map.get(dish.name);
      if(translated?.is_translated&&translated.translated){
        title.textContent=translated.translated;
        if(translated.translated.toLocaleLowerCase()!==dish.name.toLocaleLowerCase()){
          originalNode.className='dish-original';originalNode.textContent=dish.name;
        }
      }
      if(sides.length){
        const sideNames=sides.map(s=>map.get(s)?.translated||s);
        sideNode.textContent=`${sideNames.join(' · ')}${sideNames.some((n,i)=>n!==sides[i])?`  /  ${sides.join(' · ')}`:''}`;
      }
    });
  }).catch(()=>{});
}

async function loadMenu(id,menuDate,restaurantName){
  const requestId=++activeMenuRequest;state.date=menuDate;
  const cacheKey=`${id}::${menuDate}`;
  const cached=menuCache.get(cacheKey);
  if(cached){
    renderMenuDishes(cached,requestId,id);
    return;
  }
  $('dish-list').innerHTML=`<div class="loading-card" style="justify-content:center;">${BONBON_SPINNER_HTML}<span>${tr().loading}</span></div>`;
  try{
    const nameParam=encodeURIComponent(restaurantName||state.selected?.name||'');
    const response=await fetch(`/api/restaurants/${encodeURIComponent(id)}/menu?date=${encodeURIComponent(menuDate)}&name=${nameParam}`);
    if(!response.ok)throw new Error('menu');
    const menu=await response.json();
    if(requestId!==activeMenuRequest||state.selected?.id!==id)return;
    menuCache.set(cacheKey,menu);
    renderMenuDishes(menu,requestId,id);
  }catch{
    if(requestId===activeMenuRequest)$('dish-list').innerHTML=`<div class="loading-card">${tr().error}</div>`;
  }
}

function changeMenuDate(offset){
  if(!state.selected||!state.date)return;
  const next=new Date(`${state.date}T12:00:00`);
  next.setDate(next.getDate()+offset);
  loadMenu(state.selected.id,next.toISOString().slice(0,10),state.selected.name);
}

languageSelect.addEventListener('change',()=>{
  state.language=languageSelect.value;
  localStorage.setItem('bomboni-language',state.language);
  applyLanguage();
  if(state.selected)loadMenu(state.selected.id,state.date,state.selected.name);
});

$('search-input').addEventListener('input',()=>{
  $('restaurant-scroll-area')?.scrollTo({top:0,behavior:'instant'});
  if(state.searchMode==='dishes')handleDishSearch();else renderRestaurants();
});

$('load-more').addEventListener('click',()=>{state.visible+=15;renderRestaurants();});
$('location-button').addEventListener('click',requestLocation);
$('back-button').addEventListener('click',()=>{
  state.selected=null;
  $('menu-panel').hidden=true;
  $('menu-panel').classList.remove('mobile-open');
  $('layout').classList.remove('menu-open');
  if(state.searchMode==='dishes')renderDishesSearch();else renderRestaurants();
});
$('date-prev').addEventListener('click',()=>changeMenuDate(-1));
$('date-next').addEventListener('click',()=>changeMenuDate(1));
$('mobile-tab-bar').addEventListener('click',event=>{const button=event.target.closest('[data-tab]');if(button)switchTab(button.dataset.tab);});
$('draw-form').addEventListener('submit',submitDraw);
$('dish-list').addEventListener('touchstart',event=>{const touch=event.touches[0];$('dish-list').dataset.touchX=touch.clientX;$('dish-list').dataset.touchY=touch.clientY;},{passive:true});
$('dish-list').addEventListener('touchend',event=>{const touch=event.changedTouches[0];const dx=touch.clientX-Number($('dish-list').dataset.touchX||touch.clientX);const dy=touch.clientY-Number($('dish-list').dataset.touchY||touch.clientY);if(Math.abs(dx)>75&&Math.abs(dy)<55)changeMenuDate(dx<0?1:-1);},{passive:true});
document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();$('search-input').focus();}
  if(event.key==='Escape'&&state.selected){
    state.selected=null;$('menu-panel').hidden=true;$('menu-panel').classList.remove('mobile-open');$('layout').classList.remove('menu-open');
    if(state.searchMode==='dishes')renderDishesSearch();else renderRestaurants();
  }
});

function renderFavoritesPage(){
  const favObj=getFavorites();
  const favList=Object.values(favObj);
  const host=$('favorites-list');
  const empty=$('favorites-empty');
  if(!favList.length){
    empty.hidden=false;
    host.hidden=true;
    host.replaceChildren();
    return;
  }
  empty.hidden=true;
  host.hidden=false;
  host.replaceChildren();
  favList.forEach((r,index)=>{
    const fullRestaurant=state.restaurants.find(item=>item.id===r.id)||r;
    const card=document.createElement('div');
    card.className=`restaurant-card${state.selected?.id===r.id?' active':''}`;
    card.setAttribute('role','button');
    card.setAttribute('tabindex','0');
    card.style.animationDelay=`${Math.min(index,10)*24}ms`;
    const avatar=document.createElement('span');avatar.className='restaurant-avatar';avatar.textContent=(r.name||'?').trim().slice(0,1).toLocaleUpperCase();
    const info=document.createElement('span');info.className='restaurant-info';
    const name=document.createElement('span');name.className='restaurant-name';name.textContent=r.name;
    const address=document.createElement('span');address.className='restaurant-address';address.textContent=displayAddress(r.address,r.city);
    const hours=restaurantHoursStatus(fullRestaurant);
    const schedule=document.createElement('span');schedule.className='restaurant-hours';schedule.textContent=hours.schedule;
    info.append(name,address,schedule);
    const right=document.createElement('span');right.className='restaurant-right';
    const fee=document.createElement('span');fee.className='fee';fee.textContent=formatMoney(r.additional_fee_eur);
    const openTag=document.createElement('span');openTag.className=`open-status ${hours.status}`;openTag.textContent=hoursLabels[state.language]?.[hours.status]||hoursLabels.en[hours.status];
    const favBtn=document.createElement('button');favBtn.type='button';favBtn.className='card-fav-btn active';favBtn.dataset.id=r.id;
    favBtn.setAttribute('aria-label',featureCopy[state.language]?.favBtnActive||'Guardado');
    favBtn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>';
    favBtn.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(fullRestaurant);});
    right.append(fee,openTag,favBtn);card.append(avatar,info,right);
    card.addEventListener('click',()=>{switchTab('explore');openRestaurant(fullRestaurant);});
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();switchTab('explore');openRestaurant(fullRestaurant);}});
    host.append(card);
  });
  void loadRestaurantHours(favList);
}

function renderProfilePage(){
  const feature=featureCopy[state.language]||featureCopy.en;
  const meals=getMeals();
  const reviews=getReviews();
  const favObj=getFavorites();
  const favList=Object.values(favObj);

  // Spending stat
  const totalSpend=meals.reduce((sum,m)=>sum+(Number(m.fee)||0),0);
  $('profile-spend-val').textContent=formatMoney(totalSpend);

  // Top food category stat
  const catCounts={};
  let totalWithCat=0;
  meals.forEach(m=>{
    if(m.category&&m.category!=='Mixed'){
      catCounts[m.category]=(catCounts[m.category]||0)+1;
      totalWithCat++;
    }
  });
  const topCatEntry=Object.entries(catCounts).sort((a,b)=>b[1]-a[1])[0];
  if(topCatEntry&&totalWithCat>0){
    const catName=tr().categories[topCatEntry[0]]||topCatEntry[0];
    const pct=Math.round((topCatEntry[1]/totalWithCat)*100);
    $('profile-food-val').textContent=`${catName} (${pct}%)`;
  }else if(meals.length>0){
    $('profile-food-val').textContent=tr().categories['Mixed']||'Misto';
  }else{
    $('profile-food-val').textContent='—';
  }

  // Count stats and badges
  $('profile-history-val').textContent=String(meals.length);
  $('profile-reviews-val').textContent=String(Object.keys(reviews).length);
  $('profile-reviews-badge').textContent=String(Object.keys(reviews).length);
  $('profile-history-badge').textContent=String(meals.length);
  $('profile-favs-badge').textContent=String(favList.length);

  // 1. Reviews Section
  const revHost=$('profile-reviews-list');
  revHost.replaceChildren();
  const revList=Object.values(reviews).sort((a,b)=>b.timestamp-a.timestamp);
  if(!revList.length){
    const hint=document.createElement('div');hint.className='profile-empty-hint';hint.textContent=feature.emptyReviews||'Ainda não avaliaste nenhum restaurante.';revHost.append(hint);
  }else{
    revList.forEach(rev=>{
      const card=document.createElement('div');card.className='profile-item-card';
      const info=document.createElement('div');info.className='profile-item-info';
      const name=document.createElement('span');name.className='profile-item-name';name.textContent=rev.name;
      const sub=document.createElement('p');sub.className='profile-item-sub';sub.textContent=rev.date?formatDate(rev.date):'';
      info.append(name,sub);
      if(rev.comment){
        const comment=document.createElement('div');comment.className='profile-item-review-text';comment.textContent=`“${rev.comment}”`;info.append(comment);
      }
      const right=document.createElement('div');right.className='profile-item-right';
      const stars=document.createElement('span');stars.className='profile-stars';stars.textContent='★'.repeat(rev.rating)+'☆'.repeat(5-rev.rating);
      const delBtn=document.createElement('button');delBtn.type='button';delBtn.className='profile-del-btn';
      delBtn.setAttribute('aria-label',feature.reviewDeleted||'Eliminar avaliação');
      delBtn.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
      delBtn.addEventListener('click',e=>{e.stopPropagation();deleteReview(rev.restaurantId);});
      right.append(stars,delBtn);card.append(info,right);
      card.addEventListener('click',()=>{
        const fullRestaurant=state.restaurants.find(item=>item.id===rev.restaurantId)||{id:rev.restaurantId,name:rev.name,address:rev.address,city:rev.city,additional_fee_eur:rev.additional_fee_eur};
        switchTab('explore');openRestaurant(fullRestaurant);
      });
      revHost.append(card);
    });
  }

  // 2. Meal History Section
  const histHost=$('profile-history-list');
  histHost.replaceChildren();
  if(!meals.length){
    const hint=document.createElement('div');hint.className='profile-empty-hint';hint.textContent=feature.emptyHistory||'Ainda não registaste refeições.';histHost.append(hint);
  }else{
    meals.slice(0,15).forEach(m=>{
      const card=document.createElement('div');card.className='profile-item-card';
      const info=document.createElement('div');info.className='profile-item-info';
      const name=document.createElement('span');name.className='profile-item-name';name.textContent=m.name;
      const sub=document.createElement('p');sub.className='profile-item-sub';sub.textContent=`${displayAddress(m.address,m.city)} · ${formatDate(m.date)}`;
      info.append(name,sub);
      const right=document.createElement('div');right.className='profile-item-right';
      const fee=document.createElement('span');fee.className='fee';fee.textContent=formatMoney(m.fee);
      const delBtn=document.createElement('button');delBtn.type='button';delBtn.className='profile-del-btn';
      delBtn.setAttribute('aria-label',feature.mealDeleted||'Eliminar registo');
      delBtn.innerHTML='<svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
      delBtn.addEventListener('click',e=>{e.stopPropagation();deleteMeal(m.id);});
      right.append(fee,delBtn);card.append(info,right);
      card.addEventListener('click',()=>{
        const fullRestaurant=state.restaurants.find(item=>item.id===m.restaurantId)||{id:m.restaurantId,name:m.name,address:m.address,city:m.city,additional_fee_eur:m.fee};
        switchTab('explore');openRestaurant(fullRestaurant);
      });
      histHost.append(card);
    });
  }

  // 3. Favorites List in Profile Section
  const favsHost=$('profile-favs-list');
  favsHost.replaceChildren();
  if(!favList.length){
    const hint=document.createElement('div');hint.className='profile-empty-hint';hint.textContent=feature.emptyFavs||'Nenhum restaurante favorito guardado.';favsHost.append(hint);
  }else{
    favList.forEach(fav=>{
      const card=document.createElement('div');card.className='profile-item-card';
      const info=document.createElement('div');info.className='profile-item-info';
      const name=document.createElement('span');name.className='profile-item-name';name.textContent=fav.name;
      const sub=document.createElement('p');sub.className='profile-item-sub';sub.textContent=displayAddress(fav.address,fav.city);
      info.append(name,sub);
      const right=document.createElement('div');right.className='profile-item-right';
      const fee=document.createElement('span');fee.className='fee';fee.textContent=formatMoney(fav.additional_fee_eur);
      const delBtn=document.createElement('button');delBtn.type='button';delBtn.className='profile-del-btn';
      delBtn.setAttribute('aria-label',feature.favRemoved||'Remover dos favoritos');
      delBtn.innerHTML='<svg viewBox="0 0 24 24"><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" fill="#cf5544" stroke="#cf5544" stroke-width="1.8"/></svg>';
      delBtn.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(fav);});
      right.append(fee,delBtn);card.append(info,right);
      card.addEventListener('click',()=>{
        const fullRestaurant=state.restaurants.find(item=>item.id===fav.id)||fav;
        switchTab('explore');openRestaurant(fullRestaurant);
      });
      favsHost.append(card);
    });
  }
}

// Action button listeners in venue and profile
$('venue-fav-btn')?.addEventListener('click',()=>{if(state.selected)toggleFavorite(state.selected);});
$('venue-log-meal-btn')?.addEventListener('click',()=>{if(state.selected)logMeal(state.selected);});
$('venue-rate-btn')?.addEventListener('click',()=>{
  if(!state.selected)return;
  const box=$('venue-review-box');
  box.hidden=!box.hidden;
  if(!box.hidden){
    const existing=getReview(state.selected.id);
    if(existing){
      setReviewStars(existing.rating);
      $('review-comment').value=existing.comment||'';
    }else{
      setReviewStars(5);
      $('review-comment').value='';
    }
    $('review-comment').focus();
  }
});
document.querySelectorAll('#review-stars .star-btn').forEach(btn=>{
  btn.addEventListener('click',()=>setReviewStars(Number(btn.dataset.value)));
});
$('review-cancel-btn')?.addEventListener('click',()=>{$('venue-review-box').hidden=true;});
$('venue-review-box')?.addEventListener('submit',e=>{
  e.preventDefault();
  if(!state.selected)return;
  saveReview(state.selected.id,currentReviewRating,$('review-comment').value,state.selected);
  $('venue-review-box').hidden=true;
});
$('profile-reset-btn')?.addEventListener('click',clearAllLocalData);

applyLanguage();
loadRestaurants();
if(navigator.geolocation)navigator.geolocation.getCurrentPosition(p=>{state.location={latitude:p.coords.latitude,longitude:p.coords.longitude};loadRestaurants();},()=>{}, {enableHighAccuracy:false,timeout:5000,maximumAge:300000});
