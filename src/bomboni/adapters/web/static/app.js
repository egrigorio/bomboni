const translations = {
  pt:{eyebrow:'ALMOÇO COM BONI, SEM BARREIRAS',heroA:'Uma boa refeição',heroB:'fica',heroEm:'mais perto.',heroCopy:'Restaurantes de boni à sua volta, com os pratos no seu idioma.',search:'Restaurante…',near:'Perto de si',sorting:'A ordenar pela sua localização',enable:'Ativar localização para ordenar por distância.',loading:'A encontrar restaurantes…',loadingDishes:'A procurar pratos nos cardápios de hoje…',more:'Ver mais restaurantes',emptyKicker:'A SUA PRÓXIMA PARAGEM',emptyTitle:'Escolha um restaurante',emptyCopy:'Veja o menu de boni do dia, traduzido para si. O nome original fica sempre disponível.',emptyFoot:'Menus oficiais · tradução automática',back:'Todos os restaurantes',venueKicker:'RESTAURANTE DE BONI',menuOverline:'MENU DE BONI',today:'Pratos do dia',fee:'Copagamento',noMenu:'Não há pratos publicados para esta data.',menuSource:'Menu publicado para',retrieved:'consultado às',disclaimer:'Tradução automática. Confirme ingredientes e alergénios diretamente com o restaurante.',footer:'Dados de refeições estudantis · Eslovénia',source:'Fonte oficial',locating:'A obter localização…',locationReady:'A ordenar pela distância',locationFallback:'Ljubljana · localização não permitida',noResults:'Nenhum restaurante encontrado.',noDishResults:'Nenhum restaurante com este prato hoje.',searchDishPrompt:'Pesquise por um prato para ver quais restaurantes o servem hoje.',error:'Não foi possível carregar os dados. Tente novamente.',translationMissing:'Sem tradução automática disponível',restaurantCount:'restaurantes',categories:{Meat:'Carne',Fish:'Peixe',Meatless:'Sem carne',Mixed:'Misto','Salad bar':'Saladas','Fast food':'Rápido'}},
  en:{eyebrow:'STUDENT MEALS, WITHOUT THE LANGUAGE BARRIER',heroA:'A good meal',heroB:'is',heroEm:'closer than you think.',heroCopy:'Student meal restaurants around you, with dishes in your language.',search:'Restaurant…',near:'Near you',sorting:'Sorted by your location',enable:'Enable location to sort by distance.',loading:'Finding nearby restaurants…',loadingDishes:'Searching today’s menus for dishes…',more:'Show more restaurants',emptyKicker:'YOUR NEXT STOP',emptyTitle:'Choose a restaurant',emptyCopy:'See today’s student meal menu translated for you. The original name is always available.',emptyFoot:'Official menus · machine translated',back:'All restaurants',venueKicker:'STUDENT MEAL RESTAURANT',menuOverline:'STUDENT MENU',today:'Today’s dishes',fee:'Student co-pay',noMenu:'No dishes are published for this date.',menuSource:'Menu published for',retrieved:'checked at',disclaimer:'Machine translation. Check ingredients and allergens with the restaurant.',footer:'Student meal listings · Slovenia',source:'Official source',locating:'Getting location…',locationReady:'Sorted by distance',locationFallback:'Ljubljana · location unavailable',noResults:'No restaurants found.',noDishResults:'No restaurants found with this dish today.',searchDishPrompt:'Search for a dish to see which restaurants have it today.',error:'Could not load the data. Please try again.',translationMissing:'Translation unavailable',restaurantCount:'restaurants',categories:{Meat:'Meat',Fish:'Fish',Meatless:'Meatless',Mixed:'Mixed','Salad bar':'Salad bar','Fast food':'Fast food'}},
  es:{eyebrow:'BONI SIN BARRERAS DE IDIOMA',heroA:'Una buena comida',heroB:'está',heroEm:'más cerca.',heroCopy:'Restaurantes con boni cerca de ti y platos en tu idioma.',search:'Restaurante…',near:'Cerca de ti',sorting:'Ordenados por tu ubicación',enable:'Activa la ubicación para ordenar por distancia.',loading:'Buscando restaurantes…',loadingDishes:'Buscando platos en los menús de hoy…',more:'Ver más restaurantes',emptyKicker:'TU PRÓXIMA PARADA',emptyTitle:'Elige un restaurante',emptyCopy:'Consulta el menú de boni del día traducido. El nombre original siempre está disponible.',emptyFoot:'Menús oficiales · traducción automática',back:'Todos los restaurantes',venueKicker:'RESTAURANTE CON BONI',menuOverline:'MENÚ BONI',today:'Platos de hoy',fee:'Copago',noMenu:'No hay platos publicados para esta fecha.',menuSource:'Menú publicado para',retrieved:'consultado a las',disclaimer:'Traducción automática. Confirma los ingredientes y alérgenos con el restaurante.',footer:'Comidas de estudiantes · Eslovenia',source:'Fuente oficial',locating:'Obteniendo ubicación…',locationReady:'Ordenados por distancia',locationFallback:'Ljubljana · ubicación no disponible',noResults:'No se encontraron restaurantes.',noDishResults:'No hay restaurantes con este plato hoy.',searchDishPrompt:'Busca un plato para ver qué restaurantes lo ofrecen hoy.',error:'No se pudieron cargar los datos. Inténtalo de nuevo.',translationMissing:'Traducción no disponible',restaurantCount:'restaurantes',categories:{Meat:'Carne',Fish:'Pescado',Meatless:'Sin carne',Mixed:'Mixto','Salad bar':'Ensaladas','Fast food':'Rápido'}},
  de:{eyebrow:'STUDENTENMENÜS OHNE SPRACHBARRIEREN',heroA:'Ein gutes Essen',heroB:'ist',heroEm:'ganz in der Nähe.',heroCopy:'Boni-Restaurants in deiner Nähe, mit Gerichten in deiner Sprache.',search:'Restaurant…',near:'In deiner Nähe',sorting:'Nach Standort sortiert',enable:'Standort aktivieren, um nach Entfernung zu sortieren.',loading:'Restaurants werden gesucht…',loadingDishes:'Gerichte in heutigen Menüs werden gesucht…',more:'Mehr Restaurants anzeigen',emptyKicker:'DEIN NÄCHSTER STOPP',emptyTitle:'Restaurant auswählen',emptyCopy:'Sieh dir das heutige Boni-Menü übersetzt an. Der Originalname bleibt immer sichtbar.',emptyFoot:'Offizielle Menüs · maschinell übersetzt',back:'Alle Restaurants',venueKicker:'BONI-RESTAURANT',menuOverline:'BONI-MENÜ',today:'Gerichte heute',fee:'Eigenanteil',noMenu:'Für dieses Datum sind keine Gerichte veröffentlicht.',menuSource:'Menü veröffentlicht für',retrieved:'abgerufen um',disclaimer:'Maschinelle Übersetzung. Zutaten und Allergene bitte direkt beim Restaurant prüfen.',footer:'Studentenmenüs · Slowenien',source:'Offizielle Quelle',locating:'Standort wird ermittelt…',locationReady:'Nach Entfernung sortiert',locationFallback:'Ljubljana · Standort nicht verfügbar',noResults:'Keine Restaurants gefunden.',noDishResults:'Heute kein Restaurant mit diesem Gericht gefunden.',searchDishPrompt:'Suche nach einem Gericht, um passende Restaurants zu finden.',error:'Daten konnten nicht geladen werden. Bitte erneut versuchen.',translationMissing:'Keine Übersetzung verfügbar',restaurantCount:'Restaurants',categories:{Meat:'Fleisch',Fish:'Fisch',Meatless:'Fleischlos',Mixed:'Gemischt','Salad bar':'Salate','Fast food':'Schnellgericht'}},
  it:{eyebrow:'BONI SENZA BARRIERE LINGUISTICHE',heroA:'Un buon pasto',heroB:'è',heroEm:'più vicino.',heroCopy:'Ristoranti con boni vicino a te, con i piatti nella tua lingua.',search:'Ristorante…',near:'Vicino a te',sorting:'Ordinati per posizione',enable:'Attiva la posizione per ordinare per distanza.',loading:'Cerco ristoranti…',loadingDishes:'Cerco piatti nei menu di oggi…',more:'Mostra altri ristoranti',emptyKicker:'LA TUA PROSSIMA TAPPA',emptyTitle:'Scegli un restaurante',emptyCopy:'Scopri il menu boni del giorno tradotto. Il nome originale resta sempre disponibile.',emptyFoot:'Menu ufficiali · traduzione automatica',back:'Tutti i ristoranti',venueKicker:'RISTORANTE BONI',menuOverline:'MENU BONI',today:'Piatti di oggi',fee:'Quota studente',noMenu:'Nessun piatto pubblicato per questa data.',menuSource:'Menu pubblicato per',retrieved:'consultato alle',disclaimer:'Traduzione automatica. Verifica ingredienti e allergeni con il ristorante.',footer:'Menu per studenti · Slovenia',source:'Fonte ufficiale',locating:'Rilevo la posizione…',locationReady:'Ordinati per distanza',locationFallback:'Ljubljana · posizione non disponibile',noResults:'Nessun ristorante trovato.',noDishResults:'Nessun ristorante con questo piatto oggi.',searchDishPrompt:'Cerca un piatto per vedere quali ristoranti lo servono oggi.',error:'Impossibile caricare i dati. Riprova.',translationMissing:'Traduzione non disponibile',restaurantCount:'ristoranti',categories:{Meat:'Carne',Fish:'Pesce',Meatless:'Senza carne',Mixed:'Misto','Salad bar':'Insalate','Fast food':'Veloce'}},
  fr:{eyebrow:'LES BONI SANS BARRIÈRE DE LANGUE',heroA:'Un bon repas',heroB:'est',heroEm:'tout près.',heroCopy:'Des restaurants avec boni près de vous, avec les plats dans votre langue.',search:'Restaurant…',near:'Près de vous',sorting:'Triés selon votre position',enable:'Activez la localisation pour trier par distance.',loading:'Recherche de restaurants…',loadingDishes:'Recherche de plats dans les menus du jour…',more:'Voir plus de restaurants',emptyKicker:'VOTRE PROCHAINE ÉTAPE',emptyTitle:'Choisissez un restaurant',emptyCopy:'Consultez le menu boni du jour traduit. Le nom original reste toujours disponible.',emptyFoot:'Menus officiels · traduction automatique',back:'Tous les restaurants',venueKicker:'RESTAURANT BONI',menuOverline:'MENU BONI',today:'Plats du jour',fee:'Participation étudiant',noMenu:'Aucun plat publié pour cette date.',menuSource:'Menu publié pour',retrieved:'consulté à',disclaimer:'Traduction automatique. Vérifiez les ingrédients et allergènes auprès du restaurant.',footer:'Repas étudiants · Slovénie',source:'Source officielle',locating:'Localisation en cours…',locationReady:'Triés par distance',locationFallback:'Ljubljana · localisation indisponible',noResults:'Aucun restaurant trouvé.',noDishResults:'Aucun restaurant trouvé avec ce plat aujourd’hui.',searchDishPrompt:'Recherchez un plat pour voir quels restaurants le proposent aujourd’hui.',error:'Impossible de charger les données. Réessayez.',translationMissing:'Traduction indisponible',restaurantCount:'restaurants',categories:{Meat:'Viande',Fish:'Poisson',Meatless:'Sans viande',Mixed:'Mixte','Salad bar':'Salades','Fast food':'Rapide'}},
  ca:{eyebrow:'MENÚS D’ESTUDIANT SENSE BARRERES DE LLENGUA',heroA:'Un bon àpat',heroB:'és',heroEm:'més a prop.',heroCopy:'Restaurants de boni a prop teu, amb els plats en el teu idioma.',search:'Restaurant…',near:'A prop teu',sorting:'Ordenats per la teva ubicació',enable:'Activa la ubicació per ordenar per distància.',loading:'Cercant restaurants…',loadingDishes:'Cercant plats als menús d’avui…',more:'Veure més restaurants',emptyKicker:'LA TEVA PROPERA PARADA',emptyTitle:'Tria un restaurant',emptyCopy:'Consulta el menú de boni d’avui traduït. El nom original sempre queda visible.',emptyFoot:'Menús oficials · traducció automàtica',back:'Tots els restaurants',venueKicker:'RESTAURANT DE BONI',menuOverline:'MENÚ DE BONI',today:'Plats d’avui',fee:'Copagament',noMenu:'No hi ha plats publicats per a aquesta data.',menuSource:'Menú publicat per a',retrieved:'consultat a les',disclaimer:'Traducció automàtica. Comprova ingredients i al·lèrgens amb el restaurant.',footer:'Dades de menjars d’estudiants · Eslovènia',source:'Font oficial',locating:'Obtenint ubicació…',locationReady:'Ordenats per distància',locationFallback:'Ljubljana · ubicació no disponible',noResults:'No s’ha trobat cap restaurant.',noDishResults:'Cap restaurant amb aquest plat avui.',searchDishPrompt:'Cerca un plat per veure quins restaurants el serveixen avui.',error:'No s’han pogut carregar les dades. Torna-ho a provar.',translationMissing:'Sense traducció automàtica disponible',restaurantCount:'restaurants',categories:{Meat:'Carn',Fish:'Peix',Meatless:'Sense carn',Mixed:'Mixte','Salad bar':'Amanides','Fast food':'Ràpid'}}
};

const searchModeLabels = {
  restaurants: { pt:'Restaurantes', en:'Restaurants', es:'Restaurantes', de:'Restaurants', it:'Ristoranti', fr:'Restaurants', ca:'Restaurants' },
  dishes: { pt:'No cardápio', en:'On the menu', es:'En el menú', de:'Auf der Karte', it:'Nel menu', fr:'Au menu', ca:'A la carta' }
};

const dishSearchPlaceholders = {
  pt: 'Pesquisar prato (ex: pizza, sushi, salada)…',
  en: 'Search dish (e.g. pizza, sushi, salad)…',
  es: 'Buscar plato (ej: pizza, sushi, ensalada)…',
  de: 'Gericht suchen (z.B. Pizza, Sushi, Salat)…',
  it: 'Cerca piatto (es: pizza, sushi, insalata)…',
  fr: 'Rechercher un plat (ex: pizza, sushi, salade)…',
  ca: 'Cercar plat (ex: pizza, sushi, amanida)…'
};

const restaurantSearchPlaceholders = {
  pt: 'Restaurante, rua ou cidade…',
  en: 'Restaurant, street or city…',
  es: 'Restaurante, calle o ciudad…',
  de: 'Restaurant, Straße oder Stadt…',
  it: 'Ristorante, via o città…',
  fr: 'Restaurant, rue ou ville…',
  ca: 'Restaurant, carrer o ciutat…'
};

const imageSearchLabels = { pt:'Pesquisar imagens de', en:'Search images for', es:'Buscar imágenes de', de:'Bilder suchen für', it:'Cerca immagini di', fr:'Rechercher des images de', ca:'Cercar imatges de' };
const locationError = { pt:'Não foi possível obter a localização.', en:'Could not get your location.', es:'No se pudo obtener tu ubicación.', de:'Standort konnte nicht ermittelt werden.', it:'Impossibile ottenere la posizione.', fr:'Impossible d’obtenir la position.', ca:'No s’ha pogut obtenir la ubicació.' };
const nearbyLabels = { pt:'Perto de si', en:'Near you', es:'Cerca de ti', de:'In deiner Nähe', it:'Vicino a te', fr:'Près de vous', ca:'A prop teu' };
const mobileTabLabels = {
  pt:{explore:'Explorar',favorites:'Favoritos',draw:'Sorteio',profile:'Perfil',mcp:'Conectar IA'},
  en:{explore:'Explore',favorites:'Saved',draw:'Decide',profile:'Profile',mcp:'Connect AI'},
  es:{explore:'Explorar',favorites:'Favoritos',draw:'Sorteo',profile:'Perfil',mcp:'Conectar IA'},
  de:{explore:'Entdecken',favorites:'Favoriten',draw:'Auslosen',profile:'Profil',mcp:'KI verbinden'},
  it:{explore:'Esplora',favorites:'Preferiti',draw:'Estrai',profile:'Profilo',mcp:'Connetti IA'},
  fr:{explore:'Explorer',favorites:'Favoris',draw:'Tirage',profile:'Profil',mcp:'Connecter IA'},
  ca:{explore:'Explorar',favorites:'Preferits',draw:'Sorteig',profile:'Perfil',mcp:'Connectar IA'}
};

const featureCopy = {
  pt:{
    drawEyebrow:'DECISÃO DO DIA',drawTitle:'Vamos sortear',drawDescription:'Escolhe alguns filtros ou deixa o acaso decidir.',city:'Cidade',anyCity:'Qualquer cidade',food:'Tipo de comida',anyFood:'Sem preferência',mode:'Quero sortear',restaurant:'Restaurante',dish:'Prato',price:'Copagamento máximo',noLimit:'Sem limite',draw:'Sortear',searching:'A procurar opções nos menus de hoje…',noResult:'Não encontrei opções para esses filtros.',resultRestaurant:'O teu restaurante',resultDish:'O teu prato',openMenu:'Ver menu',drawError:'Não foi possível concluir o sorteio. Tenta novamente.',
    favoritesEyebrow:'A TUA LISTA',favoritesTitle:'Favoritos',favoritesSubtitle:'Os teus restaurantes e pratos guardados para acesso rápido.',favoritesEmptyVenuesTitle:'Sem restaurantes guardados',favoritesEmptyVenuesCopy:'Toca no coração de qualquer restaurante para guardá-lo aqui.',favoritesEmptyDishesTitle:'Sem pratos guardados',favoritesEmptyDishesCopy:'Toca no coração de qualquer prato no menu para guardá-lo aqui.',favVenuesTab:'Restaurantes',favDishesTab:'Pratos',
    profileEyebrow:'A TUA CONTA',profileTitle:'Perfil',profileSubtitle:'O teu resumo de refeições, avaliações e gastos com boni.',profileUserTitle:'O teu registo pessoal',profileUserCopy:'Dados das tuas refeições guardados no teu dispositivo.',reviews:'Avaliações feitas',history:'Refeições registadas',foodStats:'Comida mais escolhida',spending:'Gasto com boni',myReviews:'As Minhas Avaliações',mealHistory:'Últimas Refeições Registadas',calendarTitle:'Calendário de Refeições',emptyReviews:'Ainda não avaliaste nenhum restaurante. Abre um restaurante e clica em “Avaliar”.',emptyHistory:'Ainda não registaste refeições. Clica em “Comi aqui” quando visitares um restaurante.',
    favBtn:'Favorito',favBtnActive:'Guardado',logBtn:'Comi aqui',logBtnDone:'Comi hoje',rateBtn:'Avaliar',rateBtnEdit:'Editar nota',rateBoxTitle:'Avaliar este restaurante',reviewPlaceholder:'Escreve uma nota rápida sobre o restaurante…',cancel:'Cancelar',save:'Guardar',resetBtn:'Limpar dados locais',favAdded:'Adicionado aos favoritos!',favRemoved:'Removido dos favoritos.',favDishAdded:'Prato adicionado aos favoritos!',favDishRemoved:'Prato removido dos favoritos.',mealLogged:'Refeição registada no teu histórico!',mealUnlogged:'Refeição desmarcada do teu histórico.',mealDeleted:'Refeição removida.',reviewSaved:'Avaliação guardada!',reviewDeleted:'Avaliação removida.',clearDataConfirm:'Tens a certeza que queres limpar todo o teu histórico, avaliações e favoritos locais?',dataCleared:'Dados locais apagados com sucesso.',scanned:'menus consultados',
    loginTab:'Entrar',registerTab:'Criar conta',loginSuccess:'Sessão iniciada com sucesso!',registerSuccess:'Conta criada com sucesso!',logoutSuccess:'Sessão terminada.',authRequiredReview:'Inicia sessão no teu perfil para avaliar restaurantes.',calEmptyDay:'Nenhuma refeição registada neste dia.',calSavedMeal:'Refeição guardada no histórico!',calAddMeal:'+ Registar refeição neste dia',calCloseForm:'− Fechar formulário',
    mealPickerTitle:'O que comeste aqui hoje?',mealPickerSub:'Escolhe o prato para registar com precisão no teu histórico.',mealPickerNext:'Continuar',mealPickerRateTitle:'Como avalias este restaurante?',mealPickerRateSub:'Dá a tua nota em estrelas ou podes saltar este passo.',mealPickerSkip:'Saltar',mealPickerConfirmRate:'Avaliar e registar',mealPickerDailyMenu:'Menu do dia / Refeição',mealPickerOtherDish:'Outro prato / Opção livre',mealPickerCustomPrompt:'Qual prato comeste?',mealLoggedAndRated:'Refeição registada e avaliação guardada!',
    authUsernameLabel:'Nome de utilizador',authUsernamePlaceholder:'@o-teu-username',authEmailLabel:'Email',authEmailPlaceholder:'teu.email@exemplo.com',authPasswordLabel:'Palavra-passe',profileMemberBadge:'Membro Bomboni',profileLogout:'Sair',profileLogoutTitle:'Terminar sessão',calMonthBadge:'Histórico',calPrevMonth:'Mês anterior',calNextMonth:'Mês seguinte',calWeekdays:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],calLogFormTitle:'Registar refeição',calLogRestLabel:'Restaurante',calLogChooseRest:'Escolhe um restaurante…',calLogDishLabel:'Prato / Comida',calLogChooseRestFirst:'Escolhe primeiro o restaurante…',calLogLoadingDishes:'A carregar pratos do menu…',calLogChooseDish:'Escolhe um prato…',calLogCustomDishPlaceholder:'Escreve o nome do prato',calLogFeeLabel:'Copagamento (€)',historyPrev:'Anterior',historyNext:'Seguinte',dishFavAddTitle:'Guardar prato nos favoritos',dishFavRemoveTitle:'Remover dos favoritos',dishLogMarkTitle:'Registar que comi este prato hoje',dishLogUnmarkTitle:'Desmarcar refeição de hoje',sourceLinkTitle:'Abrir fonte oficial',searchClearAria:'Limpar pesquisa',authUsernameMin:'Nome de utilizador deve ter pelo menos 3 caracteres.',authPasswordMin:'A palavra-passe deve ter pelo menos 6 caracteres.',authEmailExists:'Este email já está registado.',authUsernameExists:'Este nome de utilizador já existe.',authInvalidCreds:'Email ou palavra-passe incorretos.',
    authVerifyTitle:'Verificar email',authVerifySub:'Insere o código de 4 dígitos enviado para',authVerifyCodeLabel:'Código de 4 dígitos',authVerifySubmitBtn:'Verificar e criar conta',authResendCodeBtn:'Reenviar código',authBackBtn:'Voltar',authCodeSentToast:'Código de verificação enviado para',authCodeResentToast:'Novo código de verificação enviado para',authInvalidCodeError:'Código de verificação incorreto.',
    mcpEyebrow:'INTEGRAÇÃO MCP',mcpTitle:'Conectar assistentes de IA',mcpSubtitle:'Consulte cardápios, copagamentos e restaurantes de boni diretamente no Gemini, Claude, Cursor ou em qualquer cliente compatível com MCP.',mcpUrlTitle:'Endereço do Servidor MCP',mcpUrlDesc:'Cole esta URL no seu cliente ou assistente de IA para conectar o Bomboni na nuvem:',mcpCopyLink:'Copiar link',mcpCopied:'Copiado!',mcpProtocolNote:'Compatível com Streamable HTTP e SSE (aceita <code>/api/mcp</code> e <code>/mcp</code>).',mcpPingBtn:'Testar conexão',mcpGuideTitle:'Como configurar no seu assistente',mcpGuideDesc:'Selecione o assistente para ver as instruções diretas:',mcpTabUniversal:'Outras IAs / HTTP',mcpCopyConfig:'Copiar configuração',mcpPromptsTitle:'Exemplos de perguntas',mcpPromptsDesc:'Uma vez conectado, você pode perguntar em linguagem natural:',mcpQuery1:'“Onde almoçar com boni em Ljubljana hoje por menos de 4 euros?”',mcpQuery2:'“Quais restaurantes têm peixe ou opções vegetarianas abertos agora?”',mcpQuery3:'“Veja os pratos de hoje do Abi Falafel no Bomboni e traduza para português.”',mcpQuery4:'“Tem opções de sushi perto do centro com desconto de estudante?”',mcpToolsTitle:'Ferramentas incluídas',mcpToolsDesc:'O assistente consulta dados oficiais através de 4 funções:',mcpToolSearchRest:'Busca estabelecimentos por cidade, nome ou tags (pizza, vegetariano).',mcpToolGetRest:'Endereço, copagamento em euros, horários e telefone pelo ID.',mcpToolGetMenu:'Pratos do dia publicados no portal oficial (hoje ou datas específicas).',mcpToolSearchItems:'Varre cardápios da cidade por prato específico (ex: hambúrguer, salada).',mcpFooterLink:'Conectar IA (MCP)',mcpLinkCopiedToast:'Link do servidor MCP copiado!',mcpConfigCopiedToast:'Configuração copiada!',mcpCopyFail:'Não foi possível copiar.',mcpPingChecking:'A verificar conexão ao servidor MCP…',mcpPingSuccess:(ms, name, count) => `✓ Conexão verificada (${ms}ms)! Servidor "${name}" ativo com ${count} ferramentas prontas.`,mcpPingError:msg => `Falha na verificação: ${msg}.`
  },
  en:{
    drawEyebrow:'TODAY’S DECISION',drawTitle:'Let’s decide',drawDescription:'Choose a few filters or leave it to chance.',city:'City',anyCity:'Any city',food:'Food type',anyFood:'No preference',mode:'Pick a',restaurant:'Restaurant',dish:'Dish',price:'Maximum co-pay',noLimit:'No limit',draw:'Pick for me',searching:'Checking today’s menus…',noResult:'No options match those filters.',resultRestaurant:'Your restaurant',resultDish:'Your dish',openMenu:'View menu',drawError:'The draw failed. Please try again.',
    favoritesEyebrow:'YOUR LIST',favoritesTitle:'Favorites',favoritesSubtitle:'Your saved restaurants and dishes for quick access.',favoritesEmptyVenuesTitle:'No saved restaurants',favoritesEmptyVenuesCopy:'Tap the heart on any restaurant to save it here.',favoritesEmptyDishesTitle:'No saved dishes',favoritesEmptyDishesCopy:'Tap the heart on any menu dish to save it here.',favVenuesTab:'Restaurants',favDishesTab:'Dishes',
    profileEyebrow:'YOUR ACCOUNT',profileTitle:'Profile',profileSubtitle:'Your summary of meals, reviews, and boni spending.',profileUserTitle:'Your personal record',profileUserCopy:'Meal data stored locally on your device.',reviews:'Reviews given',history:'Logged meals',foodStats:'Most chosen food',spending:'Spent on boni',myReviews:'My Reviews',mealHistory:'Recent Logged Meals',calendarTitle:'Meal Calendar',emptyReviews:'You haven’t reviewed any restaurants yet. Open a venue and tap “Rate”.',emptyHistory:'No meals logged yet. Tap “Ate here” when you visit a restaurant.',
    favBtn:'Favorite',favBtnActive:'Saved',logBtn:'Ate here',logBtnDone:'Eaten today',rateBtn:'Rate',rateBtnEdit:'Edit rating',rateBoxTitle:'Rate this restaurant',reviewPlaceholder:'Write a quick note about this restaurant…',cancel:'Cancel',save:'Save',resetBtn:'Clear local data',favAdded:'Added to favorites!',favRemoved:'Removed from favorites.',favDishAdded:'Dish added to favorites!',favDishRemoved:'Dish removed from favorites.',mealLogged:'Meal logged to your history!',mealUnlogged:'Meal unlogged from history.',mealDeleted:'Meal removed.',reviewSaved:'Review saved!',reviewDeleted:'Review deleted.',clearDataConfirm:'Are you sure you want to clear your local meal history, reviews, and favorites?',dataCleared:'Local data cleared.',scanned:'menus checked',
    loginTab:'Log in',registerTab:'Sign up',loginSuccess:'Logged in successfully!',registerSuccess:'Account created successfully!',logoutSuccess:'Logged out.',authRequiredReview:'Log in to your profile to rate restaurants.',calEmptyDay:'No meals logged on this day.',calSavedMeal:'Meal saved to history!',calAddMeal:'+ Log meal on this day',calCloseForm:'− Close form',
    mealPickerTitle:'What did you eat here today?',mealPickerSub:'Select the dish to log it accurately in your history.',mealPickerNext:'Continue',mealPickerRateTitle:'How would you rate this restaurant?',mealPickerRateSub:'Rate with stars or skip this step.',mealPickerSkip:'Skip',mealPickerConfirmRate:'Rate & log',mealPickerDailyMenu:'Daily menu / Meal',mealPickerOtherDish:'Other dish / Custom option',mealPickerCustomPrompt:'What dish did you eat?',mealLoggedAndRated:'Meal logged and review saved!',
    authUsernameLabel:'Username',authUsernamePlaceholder:'@your-username',authEmailLabel:'Email',authEmailPlaceholder:'your.email@example.com',authPasswordLabel:'Password',profileMemberBadge:'Bomboni Member',profileLogout:'Log out',profileLogoutTitle:'Log out',calMonthBadge:'History',calPrevMonth:'Previous month',calNextMonth:'Next month',calWeekdays:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],calLogFormTitle:'Log meal',calLogRestLabel:'Restaurant',calLogChooseRest:'Choose a restaurant…',calLogDishLabel:'Dish / Food',calLogChooseRestFirst:'Choose a restaurant first…',calLogLoadingDishes:'Loading menu dishes…',calLogChooseDish:'Choose a dish…',calLogCustomDishPlaceholder:'Enter dish name',calLogFeeLabel:'Co-pay (€)',historyPrev:'Previous',historyNext:'Next',dishFavAddTitle:'Save dish to favorites',dishFavRemoveTitle:'Remove from favorites',dishLogMarkTitle:'Log that I ate this dish today',dishLogUnmarkTitle:'Unlog today’s meal',sourceLinkTitle:'Open official source',searchClearAria:'Clear search',authUsernameMin:'Username must be at least 3 characters.',authPasswordMin:'Password must be at least 6 characters.',authEmailExists:'This email is already registered.',authUsernameExists:'This username is already taken.',authInvalidCreds:'Incorrect email or password.',
    authVerifyTitle:'Verify email',authVerifySub:'Enter the 4-digit code sent to',authVerifyCodeLabel:'4-digit code',authVerifySubmitBtn:'Verify and create account',authResendCodeBtn:'Resend code',authBackBtn:'Back',authCodeSentToast:'Verification code sent to',authCodeResentToast:'New verification code sent to',authInvalidCodeError:'Incorrect verification code.',
    mcpEyebrow:'MCP INTEGRATION',mcpTitle:'Connect AI assistants',mcpSubtitle:'Check menus, co-pays and student meal restaurants directly in Gemini, Claude, Cursor, or any MCP-compatible client.',mcpUrlTitle:'MCP Server Address',mcpUrlDesc:'Paste this URL into your AI client or assistant to connect Bomboni in the cloud:',mcpCopyLink:'Copy link',mcpCopied:'Copied!',mcpProtocolNote:'Supports Streamable HTTP and SSE (accepts both <code>/api/mcp</code> and <code>/mcp</code>).',mcpPingBtn:'Test connection',mcpGuideTitle:'How to set up in your assistant',mcpGuideDesc:'Select your assistant to view setup instructions:',mcpTabUniversal:'Other AIs / HTTP',mcpCopyConfig:'Copy config',mcpPromptsTitle:'Example prompts',mcpPromptsDesc:'Once connected, you can ask in natural language:',mcpQuery1:'“Where can I have student lunch in Ljubljana today for under 4 euros?”',mcpQuery2:'“Which restaurants have fish or vegetarian options open right now?”',mcpQuery3:'“Show today’s menu from Abi Falafel in Bomboni and translate the dishes.”',mcpQuery4:'“Are there sushi options near the center with student discount?”',mcpToolsTitle:'Included tools',mcpToolsDesc:'The assistant queries official portal data through 4 functions:',mcpToolSearchRest:'Searches restaurants by city, name, or tags (pizza, vegetarian).',mcpToolGetRest:'Address, co-pay in euros, opening hours, and phone by ID.',mcpToolGetMenu:'Daily dishes published on the official portal (today or specific dates).',mcpToolSearchItems:'Scans city menus for specific dishes (e.g. burger, salad).',mcpFooterLink:'Connect AI (MCP)',mcpLinkCopiedToast:'MCP server link copied!',mcpConfigCopiedToast:'Configuration copied!',mcpCopyFail:'Could not copy.',mcpPingChecking:'Checking MCP server connection…',mcpPingSuccess:(ms, name, count) => `✓ Connection verified (${ms}ms)! Server "${name}" active with ${count} tools ready.`,mcpPingError:msg => `Verification failed: ${msg}.`
  },
  es:{
    drawEyebrow:'LA DECISIÓN DE HOY',drawTitle:'Vamos a sortear',drawDescription:'Elige algunos filtros o deja que decida el azar.',city:'Ciudad',anyCity:'Cualquier ciudad',food:'Tipo de comida',anyFood:'Sin preferencia',mode:'Sortear',restaurant:'Restaurante',dish:'Plato',price:'Copago máximo',noLimit:'Sin límite',draw:'Sortear',searching:'Buscando en los menús de hoy…',noResult:'No hay opciones con esos filtros.',resultRestaurant:'Tu restaurante',resultDish:'Tu plato',openMenu:'Ver menú',drawError:'No se pudo completar el sorteo.',
    favoritesEyebrow:'TU LISTA',favoritesTitle:'Favoritos',favoritesSubtitle:'Tus restaurantes y platos guardados para acceso rápido.',favoritesEmptyVenuesTitle:'Sin restaurantes guardados',favoritesEmptyVenuesCopy:'Toca el corazón en cualquier restaurante para guardarlo.',favoritesEmptyDishesTitle:'Sin platos guardados',favoritesEmptyDishesCopy:'Toca el corazón en cualquier plato para guardarlo.',favVenuesTab:'Restaurantes',favDishesTab:'Platos',
    profileEyebrow:'TU CUENTA',profileTitle:'Perfil',profileSubtitle:'Tu resumen de comidas, reseñas y gastos con boni.',profileUserTitle:'Tu registro personal',profileUserCopy:'Datos guardados localmente en tu dispositivo.',reviews:'Reseñas hechas',history:'Comidas registradas',foodStats:'Comida más elegida',spending:'Gasto en boni',myReviews:'Mis Reseñas',mealHistory:'Últimas Comidas Registradas',calendarTitle:'Calendario de Comidas',emptyReviews:'Aún no has valorado ningún restaurante. Abre uno y pulsa “Valorar”.',emptyHistory:'Aún no has registrado comidas. Pulsa “Comí aquí” al visitar un restaurante.',
    favBtn:'Favorito',favBtnActive:'Guardado',logBtn:'Comí aquí',logBtnDone:'Comí hoy',rateBtn:'Valorar',rateBtnEdit:'Editar nota',rateBoxTitle:'Valorar este restaurante',reviewPlaceholder:'Escribe una nota rápida sobre el restaurante…',cancel:'Cancelar',save:'Guardar',resetBtn:'Borrar datos locales',favAdded:'¡Añadido a favoritos!',favRemoved:'Eliminado de favoritos.',favDishAdded:'¡Plato añadido a favoritos!',favDishRemoved:'Plato eliminado de favoritos.',mealLogged:'¡Comida registrada en tu historial!',mealUnlogged:'Comida desmarcada del historial.',mealDeleted:'Comida eliminada.',reviewSaved:'¡Reseña guardada!',reviewDeleted:'Reseña eliminada.',clearDataConfirm:'¿Seguro que quieres borrar todo tu historial, reseñas y favoritos locales?',dataCleared:'Datos locales borrados.',scanned:'menús consultados',
    loginTab:'Iniciar sesión',registerTab:'Crear cuenta',loginSuccess:'¡Sesión iniciada con éxito!',registerSuccess:'¡Cuenta creada con éxito!',logoutSuccess:'Sesión cerrada.',authRequiredReview:'Inicia sesión en tu perfil para valorar restaurantes.',calEmptyDay:'Sin comidas registradas en este día.',calSavedMeal:'¡Comida guardada en el historial!',calAddMeal:'+ Registrar comida en este día',calCloseForm:'− Cerrar formulario',
    mealPickerTitle:'¿Qué comiste aquí hoy?',mealPickerSub:'Elige el plato para registrarlo con precisión en tu historial.',mealPickerNext:'Continuar',mealPickerRateTitle:'¿Cómo valoras este restaurante?',mealPickerRateSub:'Puntúa con estrellas o salta este paso.',mealPickerSkip:'Saltar',mealPickerConfirmRate:'Valorar y registrar',mealPickerDailyMenu:'Menú del día / Comida',mealPickerOtherDish:'Otro plato / Opción libre',mealPickerCustomPrompt:'¿Qué plato comiste?',mealLoggedAndRated:'¡Comida registrada y reseña guardada!',
    authUsernameLabel:'Nombre de usuario',authUsernamePlaceholder:'@tu-usuario',authEmailLabel:'Correo electrónico',authEmailPlaceholder:'tu.email@ejemplo.com',authPasswordLabel:'Contraseña',profileMemberBadge:'Miembro Bomboni',profileLogout:'Cerrar sesión',profileLogoutTitle:'Cerrar sesión',calMonthBadge:'Historial',calPrevMonth:'Mes anterior',calNextMonth:'Mes siguiente',calWeekdays:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],calLogFormTitle:'Registrar comida',calLogRestLabel:'Restaurante',calLogChooseRest:'Elige un restaurante…',calLogDishLabel:'Plato / Comida',calLogChooseRestFirst:'Elige primero el restaurante…',calLogLoadingDishes:'Cargando platos del menú…',calLogChooseDish:'Elige un plato…',calLogCustomDishPlaceholder:'Escribe el nombre del plato',calLogFeeLabel:'Copago (€)',historyPrev:'Anterior',historyNext:'Siguiente',dishFavAddTitle:'Guardar plato en favoritos',dishFavRemoveTitle:'Eliminar de favoritos',dishLogMarkTitle:'Registrar que comí este plato hoy',dishLogUnmarkTitle:'Desmarcar comida de hoy',sourceLinkTitle:'Abrir fuente oficial',searchClearAria:'Limpiar búsqueda',authUsernameMin:'El nombre de usuario debe tener al menos 3 caracteres.',authPasswordMin:'La contraseña debe tener al menos 6 caracteres.',authEmailExists:'Este correo ya está registrado.',authUsernameExists:'Este nombre de usuario ya existe.',authInvalidCreds:'Correo o contraseña incorrectos.',
    authVerifyTitle:'Verificar correo',authVerifySub:'Introduce el código de 4 dígitos enviado a',authVerifyCodeLabel:'Código de 4 dígitos',authVerifySubmitBtn:'Verificar y crear cuenta',authResendCodeBtn:'Reenviar código',authBackBtn:'Volver',authCodeSentToast:'Código de verificación enviado a',authCodeResentToast:'Nuevo código de verificación enviado a',authInvalidCodeError:'Código de verificación incorrecto.',
    mcpEyebrow:'INTEGRACIÓN MCP',mcpTitle:'Conectar asistentes de IA',mcpSubtitle:'Consulta menús, copagos y restaurantes de boni directamente en Gemini, Claude, Cursor o cualquier cliente compatible con MCP.',mcpUrlTitle:'Dirección del Servidor MCP',mcpUrlDesc:'Pega esta URL en tu cliente o asistente de IA para conectar Bomboni en la nube:',mcpCopyLink:'Copiar enlace',mcpCopied:'¡Copiado!',mcpProtocolNote:'Compatible con Streamable HTTP y SSE (acepta <code>/api/mcp</code> y <code>/mcp</code>).',mcpPingBtn:'Probar conexión',mcpGuideTitle:'Cómo configurar en tu asistente',mcpGuideDesc:'Selecciona tu asistente para ver las instrucciones:',mcpTabUniversal:'Otras IAs / HTTP',mcpCopyConfig:'Copiar configuración',mcpPromptsTitle:'Ejemplos de preguntas',mcpPromptsDesc:'Una vez conectado, puedes preguntar en lenguaje natural:',mcpQuery1:'“¿Dónde almorzar con boni en Liubliana hoy por menos de 4 euros?”',mcpQuery2:'“¿Qué restaurantes tienen pescado u opciones vegetarianas abiertos ahora?”',mcpQuery3:'“Consulta los platos de hoy de Abi Falafel en Bomboni y tradúcelos al español.”',mcpQuery4:'“¿Hay opciones de sushi cerca del centro con descuento de estudiante?”',mcpToolsTitle:'Herramientas incluidas',mcpToolsDesc:'El asistente consulta datos oficiales a través de 4 funciones:',mcpToolSearchRest:'Busca establecimientos por ciudad, nombre o etiquetas (pizza, vegetariano).',mcpToolGetRest:'Dirección, copago en euros, horarios y teléfono por ID.',mcpToolGetMenu:'Platos del día publicados en el portal oficial (hoy o fechas concretas).',mcpToolSearchItems:'Rastrea menús de la ciudad buscando platos específicos (ej: hamburguesa, ensalada).',mcpFooterLink:'Conectar IA (MCP)',mcpLinkCopiedToast:'¡Enlace del servidor MCP copiado!',mcpConfigCopiedToast:'¡Configuración copiada!',mcpCopyFail:'No se pudo copiar.',mcpPingChecking:'Comprobando conexión con el servidor MCP…',mcpPingSuccess:(ms, name, count) => `✓ ¡Conexión verificada (${ms}ms)! Servidor "${name}" activo con ${count} herramientas listas.`,mcpPingError:msg => `Fallo en la verificación: ${msg}.`
  },
  de:{
    drawEyebrow:'DIE ENTSCHEIDUNG DES TAGES',drawTitle:'Lass uns auslosen',drawDescription:'Wähle Filter oder lass den Zufall entscheiden.',city:'Stadt',anyCity:'Jede Stadt',food:'Essensart',anyFood:'Keine Präferenz',mode:'Auswählen',restaurant:'Restaurant',dish:'Gericht',price:'Maximaler Eigenanteil',noLimit:'Kein Limit',draw:'Auslosen',searching:'Heutige Menüs werden geprüft…',noResult:'Keine passenden Optionen gefunden.',resultRestaurant:'Dein Restaurant',resultDish:'Dein Gericht',openMenu:'Menü ansehen',drawError:'Die Auslosung ist fehlgeschlagen.',
    favoritesEyebrow:'DEINE LISTE',favoritesTitle:'Favoriten',favoritesSubtitle:'Deine gespeicherten Restaurants und Gerichte für schnellen Zugriff.',favoritesEmptyVenuesTitle:'Keine Restaurants gespeichert',favoritesEmptyVenuesCopy:'Tippe auf das Herz bei einem Restaurant, um es zu speichern.',favoritesEmptyDishesTitle:'Keine Gerichte gespeichert',favoritesEmptyDishesCopy:'Tippe auf das Herz bei einem Gericht, um es zu speichern.',favVenuesTab:'Restaurants',favDishesTab:'Gerichte',
    profileEyebrow:'DEIN KONTO',profileTitle:'Profil',profileSubtitle:'Deine Übersicht über Mahlzeiten, Bewertungen und Ausgaben.',profileUserTitle:'Dein persönliches Protokoll',profileUserCopy:'Daten lokal auf deinem Gerät gespeichert.',reviews:'Abgegebene Bewertungen',history:'Erfasste Mahlzeiten',foodStats:'Meistgewähltes Essen',spending:'Boni-Ausgaben',myReviews:'Meine Bewertungen',mealHistory:'Zuletzt erfasste Mahlzeiten',calendarTitle:'Mahlzeiten-Kalender',emptyReviews:'Du hast noch keine Restaurants bewertet. Öffne ein Restaurant und tippe auf „Bewerten“.',emptyHistory:'Noch keine Mahlzeiten erfasst. Tippe auf „Hier gegessen“, wenn du ein Restaurant besuchst.',
    favBtn:'Favorit',favBtnActive:'Gespeichert',logBtn:'Hier gegessen',logBtnDone:'Heute gegessen',rateBtn:'Bewerten',rateBtnEdit:'Bewertung bearbeiten',rateBoxTitle:'Dieses Restaurant bewerten',reviewPlaceholder:'Schreibe eine kurze Notiz über das Restaurant…',cancel:'Abbrechen',save:'Speichern',resetBtn:'Lokale Daten löschen',favAdded:'Zu Favoriten hinzugefügt!',favRemoved:'Aus Favoriten entfernt.',favDishAdded:'Gericht zu Favoriten hinzugefügt!',favDishRemoved:'Gericht aus Favoriten entfernt.',mealLogged:'Mahlzeit erfasst!',mealUnlogged:'Mahlzeit abgewählt.',mealDeleted:'Mahlzeit gelöscht.',reviewSaved:'Bewertung gespeichert!',reviewDeleted:'Bewertung gelöscht.',clearDataConfirm:'Möchtest du wirklich deinen lokalen Verlauf, Bewertungen und Favoriten löschen?',dataCleared:'Lokale Daten gelöscht.',scanned:'Menüs geprüft',
    loginTab:'Anmelden',registerTab:'Registrieren',loginSuccess:'Erfolgreich angemeldet!',registerSuccess:'Konto erfolgreich erstellt!',logoutSuccess:'Abgemeldet.',authRequiredReview:'Melde dich in deinem Profil an, um Restaurants zu bewerten.',calEmptyDay:'Keine Mahlzeiten an diesem Tag erfasst.',calSavedMeal:'Mahlzeit im Verlauf gespeichert!',calAddMeal:'+ Mahlzeit erfassen',calCloseForm:'− Formular schließen',
    mealPickerTitle:'Was hast du heute hier gegessen?',mealPickerSub:'Wähle das Gericht, um es genau im Verlauf zu erfassen.',mealPickerNext:'Weiter',mealPickerRateTitle:'Wie bewertest du dieses Restaurant?',mealPickerRateSub:'Gib eine Sternebewertung ab oder überspringe diesen Schritt.',mealPickerSkip:'Überspringen',mealPickerConfirmRate:'Bewerten & erfassen',mealPickerDailyMenu:'Tagesmenü',mealPickerOtherDish:'Anderes Gericht / Freie Option',mealPickerCustomPrompt:'Welches Gericht hast du gegessen?',mealLoggedAndRated:'Mahlzeit erfasst und Bewertung gespeichert!',
    authUsernameLabel:'Benutzername',authUsernamePlaceholder:'@dein-benutzername',authEmailLabel:'E-Mail',authEmailPlaceholder:'deine.email@beispiel.de',authPasswordLabel:'Passwort',profileMemberBadge:'Bomboni-Mitglied',profileLogout:'Abmelden',profileLogoutTitle:'Abmelden',calMonthBadge:'Verlauf',calPrevMonth:'Vorheriger Monat',calNextMonth:'Nächster Monat',calWeekdays:['Mo','Di','Mi','Do','Fr','Sa','So'],calLogFormTitle:'Mahlzeit erfassen',calLogRestLabel:'Restaurant',calLogChooseRest:'Wähle ein Restaurant…',calLogDishLabel:'Gericht / Speise',calLogChooseRestFirst:'Wähle zuerst das Restaurant…',calLogLoadingDishes:'Lade Menügerichte…',calLogChooseDish:'Wähle ein Gericht…',calLogCustomDishPlaceholder:'Gib den Namen des Gerichts ein',calLogFeeLabel:'Eigenanteil (€)',historyPrev:'Zurück',historyNext:'Weiter',dishFavAddTitle:'Gericht zu Favoriten hinzufügen',dishFavRemoveTitle:'Aus Favoriten entfernen',dishLogMarkTitle:'Erfassen, dass ich dieses Gericht heute gegessen habe',dishLogUnmarkTitle:'Heutige Mahlzeit abwählen',sourceLinkTitle:'Offizielle Quelle öffnen',searchClearAria:'Suche löschen',authUsernameMin:'Benutzername muss mindestens 3 Zeichen lang sein.',authPasswordMin:'Passwort muss mindestens 6 Zeichen lang sein.',authEmailExists:'Diese E-Mail ist bereits registriert.',authUsernameExists:'Dieser Benutzername ist bereits vergeben.',authInvalidCreds:'Falsche E-Mail oder falsches Passwort.',
    authVerifyTitle:'E-Mail bestätigen',authVerifySub:'Gib den 4-stelligen Code ein, der gesendet wurde an',authVerifyCodeLabel:'4-stelliger Code',authVerifySubmitBtn:'Bestätigen & Konto erstellen',authResendCodeBtn:'Code erneut senden',authBackBtn:'Zurück',authCodeSentToast:'Bestätigungscode gesendet an',authCodeResentToast:'Neuer Bestätigungscode gesendet an',authInvalidCodeError:'Falscher Bestätigungscode.',
    mcpEyebrow:'MCP-INTEGRATION',mcpTitle:'KI-Assistenten verbinden',mcpSubtitle:'Prüfe Menüs, Zuzahlungen und Boni-Restaurants direkt in Gemini, Claude, Cursor oder jedem MCP-fähigen Client.',mcpUrlTitle:'MCP-Server-Adresse',mcpUrlDesc:'Füge diese URL in deinen KI-Client oder Assistenten ein, um Bomboni in der Cloud zu verbinden:',mcpCopyLink:'Link kopieren',mcpCopied:'Kopiert!',mcpProtocolNote:'Kompatibel mit Streamable HTTP und SSE (akzeptiert <code>/api/mcp</code> und <code>/mcp</code>).',mcpPingBtn:'Verbindung testen',mcpGuideTitle:'Einrichtung in deinem Assistenten',mcpGuideDesc:'Wähle deinen Assistenten für die passende Anleitung:',mcpTabUniversal:'Andere KIs / HTTP',mcpCopyConfig:'Konfiguration kopieren',mcpPromptsTitle:'Beispielfragen',mcpPromptsDesc:'Einmal verbunden, kannst du in natürlicher Sprache fragen:',mcpQuery1:'“Wo kann ich heute in Ljubljana mit Boni für unter 4 Euro zu Mittag essen?”',mcpQuery2:'“Welche Restaurants mit Fisch oder vegetarischen Optionen haben jetzt geöffnet?”',mcpQuery3:'“Zeige das heutige Menü von Abi Falafel im Bomboni und übersetze die Gerichte.”',mcpQuery4:'“Gibt es Sushi-Optionen in der Nähe des Zentrums mit Studentenrabatt?”',mcpToolsTitle:'Enthaltene Werkzeuge',mcpToolsDesc:'Der Assistent fragt offizielle Daten über 4 Funktionen ab:',mcpToolSearchRest:'Sucht Lokale nach Stadt, Name oder Tags (Pizza, vegetarisch).',mcpToolGetRest:'Adresse, Zuzahlung in Euro, Öffnungszeiten und Telefon über die ID.',mcpToolGetMenu:'Tagesgerichte aus dem offiziellen Portal (heute oder bestimmte Tage).',mcpToolSearchItems:'Durchsucht Menüs der Stadt nach bestimmten Gerichten (z. B. Burger, Salat).',mcpFooterLink:'KI verbinden (MCP)',mcpLinkCopiedToast:'MCP-Server-Link kopiert!',mcpConfigCopiedToast:'Konfiguration kopiert!',mcpCopyFail:'Kopieren fehlgeschlagen.',mcpPingChecking:'Verbindung zum MCP-Server wird geprüft…',mcpPingSuccess:(ms, name, count) => `✓ Verbindung bestätigt (${ms}ms)! Server „${name}“ aktiv mit ${count} Werkzeugen bereit.`,mcpPingError:msg => `Verifizierung fehlgeschlagen: ${msg}.`
  },
  it:{
    drawEyebrow:'LA SCELTA DI OGGI',drawTitle:'Facciamo decidere al caso',drawDescription:'Scegli qualche filtro oppure lascia fare al caso.',city:'Città',anyCity:'Qualsiasi città',food:'Tipo di cibo',anyFood:'Nessuna preferenza',mode:'Estrai',restaurant:'Ristorante',dish:'Piatto',price:'Quota massima',noLimit:'Nessun limite',draw:'Estrai',searching:'Controllo i menu di oggi…',noResult:'Nessuna opzione con questi filtri.',resultRestaurant:'Il tuo ristorante',resultDish:'Il tuo piatto',openMenu:'Vedi menu',drawError:'Estrazione non riuscita.',
    favoritesEyebrow:'LA TUA LISTA',favoritesTitle:'Preferiti',favoritesSubtitle:'I tuoi ristoranti e piatti salvati per accesso rapido.',favoritesEmptyVenuesTitle:'Nessun ristorante salvato',favoritesEmptyVenuesCopy:'Tocca il cuore su un ristorante per salvarlo qui.',favoritesEmptyDishesTitle:'Nessun piatto salvato',favoritesEmptyDishesCopy:'Tocca il cuore su un piatto per salvarlo qui.',favVenuesTab:'Ristoranti',favDishesTab:'Piatti',
    profileEyebrow:'IL TUO ACCOUNT',profileTitle:'Profilo',profileSubtitle:'Il tuo riepilogo di pasti, recensioni e spese con boni.',profileUserTitle:'Il tuo registro personale',profileUserCopy:'Dati dei tuoi pasti salvati sul dispositivo.',reviews:'Recensioni fatte',history:'Pasti registrati',foodStats:'Cibo più scelto',spending:'Spesa per boni',myReviews:'Le Mie Recensioni',mealHistory:'Ultimi Pasti Registrati',calendarTitle:'Calendario Pasti',emptyReviews:'Non hai ancora valutato nessun ristorante. Apri un locale e tocca “Valuta”.',emptyHistory:'Nessun pasto ancora registrato. Tocca “Ho mangiato qui” quando visiti un ristorante.',
    favBtn:'Preferito',favBtnActive:'Salvato',logBtn:'Ho mangiato qui',logBtnDone:'Mangiato oggi',rateBtn:'Valuta',rateBtnEdit:'Modifica voto',rateBoxTitle:'Valuta questo ristorante',reviewPlaceholder:'Scrivi una breve nota sul ristorante…',cancel:'Annulla',save:'Salva',resetBtn:'Cancella dati locali',favAdded:'Aggiunto ai preferiti!',favRemoved:'Rimosso dai preferiti.',favDishAdded:'Piatto aggiunto ai preferiti!',favDishRemoved:'Piatto rimosso dai preferiti.',mealLogged:'Pasto registrato nella cronologia!',mealUnlogged:'Pasto deselezionato.',mealDeleted:'Pasto rimosso.',reviewSaved:'Recensione salvata!',reviewDeleted:'Recensione eliminata.',clearDataConfirm:'Sei sicuro di voler cancellare cronologia, recensioni e preferiti locali?',dataCleared:'Dati locali cancellati.',scanned:'menu controllati',
    loginTab:'Accedi',registerTab:'Registrati',loginSuccess:'Accesso effettuato con successo!',registerSuccess:'Account creato con successo!',logoutSuccess:'Disconnesso.',authRequiredReview:'Accedi al tuo profilo per valutare i ristoranti.',calEmptyDay:'Nessun pasto registrato in questo giorno.',calSavedMeal:'Pasto salvato nella cronologia!',calAddMeal:'+ Registra pasto in questo giorno',calCloseForm:'− Chiudi modulo',
    mealPickerTitle:'Cosa hai mangiato qui oggi?',mealPickerSub:'Scegli il piatto per registrarlo con precisione nella cronologia.',mealPickerNext:'Continua',mealPickerRateTitle:'Come valuti questo ristorante?',mealPickerRateSub:'Assegna delle stelle o salta questo passaggio.',mealPickerSkip:'Salta',mealPickerConfirmRate:'Valuta e registra',mealPickerDailyMenu:'Menu del giorno / Pasto',mealPickerOtherDish:'Altro piatto / Opzione libera',mealPickerCustomPrompt:'Che piatto hai mangiato?',mealLoggedAndRated:'Pasto registrato e recensione salvata!',
    authUsernameLabel:'Nome utente',authUsernamePlaceholder:'@tuo-username',authEmailLabel:'Email',authEmailPlaceholder:'tua.email@esempio.it',authPasswordLabel:'Password',profileMemberBadge:'Membro Bomboni',profileLogout:'Esci',profileLogoutTitle:'Disconnetti',calMonthBadge:'Cronologia',calPrevMonth:'Mese precedente',calNextMonth:'Mese successivo',calWeekdays:['Lun','Mar','Mer','Gio','Ven','Sab','Dom'],calLogFormTitle:'Registra pasto',calLogRestLabel:'Ristorante',calLogChooseRest:'Scegli un ristorante…',calLogDishLabel:'Piatto / Cibo',calLogChooseRestFirst:'Scegli prima il ristorante…',calLogLoadingDishes:'Caricamento piatti dal menu…',calLogChooseDish:'Scegli un piatto…',calLogCustomDishPlaceholder:'Scrivi il nome del piatto',calLogFeeLabel:'Quota (€)',historyPrev:'Precedente',historyNext:'Successivo',dishFavAddTitle:'Aggiungi piatto ai preferiti',dishFavRemoveTitle:'Rimuovi dai preferiti',dishLogMarkTitle:'Registra che ho mangiato questo piatto oggi',dishLogUnmarkTitle:'Deseleziona pasto di oggi',sourceLinkTitle:'Apri fonte ufficiale',searchClearAria:'Cancella ricerca',authUsernameMin:'Il nome utente deve contenere almeno 3 caratteri.',authPasswordMin:'La password deve contenere almeno 6 caratteri.',authEmailExists:'Questa email è già registrata.',authUsernameExists:'Questo nome utente è già occupato.',authInvalidCreds:'Email o password non corretti.',
    authVerifyTitle:'Verifica email',authVerifySub:'Inserisci il codice a 4 cifre inviato a',authVerifyCodeLabel:'Codice a 4 cifre',authVerifySubmitBtn:'Verifica e crea account',authResendCodeBtn:'Reinvia codice',authBackBtn:'Indietro',authCodeSentToast:'Codice di verifica inviato a',authCodeResentToast:'Nuovo codice di verifica inviato a',authInvalidCodeError:'Codice di verifica errato.',
    mcpEyebrow:'INTEGRAZIONE MCP',mcpTitle:'Connetti assistenti IA',mcpSubtitle:'Consulta menu, quote e ristoranti con boni direttamente su Gemini, Claude, Cursor o qualsiasi client compatibile con MCP.',mcpUrlTitle:'Indirizzo del Server MCP',mcpUrlDesc:'Incolla questo URL nel tuo client o assistente IA per connettere Bomboni nel cloud:',mcpCopyLink:'Copia link',mcpCopied:'Copiato!',mcpProtocolNote:'Compatibile con Streamable HTTP e SSE (supporta <code>/api/mcp</code> e <code>/mcp</code>).',mcpPingBtn:'Testa connessione',mcpGuideTitle:'Come configurare nel tuo assistente',mcpGuideDesc:'Seleziona il tuo assistente per vedere le istruzioni:',mcpTabUniversal:'Altre IA / HTTP',mcpCopyConfig:'Copia configurazione',mcpPromptsTitle:'Esempi di domande',mcpPromptsDesc:'Una volta connesso, puoi fare domande in linguaggio naturale:',mcpQuery1:'“Dove posso pranzare con i boni a Lubiana oggi con meno di 4 euro?”',mcpQuery2:'“Quali ristoranti con pesce o opzioni vegetariane sono aperti adesso?”',mcpQuery3:'“Guarda i piatti di oggi di Abi Falafel su Bomboni e traducili in italiano.”',mcpQuery4:'“Ci sono opzioni sushi vicino al centro con sconto studenti?”',mcpToolsTitle:'Strumenti inclusi',mcpToolsDesc:'L’assistente consulta i dati ufficiali tramite 4 funzioni:',mcpToolSearchRest:'Cerca locali per città, nome o tag (pizza, vegetariano).',mcpToolGetRest:'Indirizzo, quota in euro, orari di apertura e telefono tramite ID.',mcpToolGetMenu:'Piatti del giorno pubblicati sul portale ufficiale (oggi o date specifiche).',mcpToolSearchItems:'Scansiona i menu della città per piatti specifici (es. hamburger, insalata).',mcpFooterLink:'Connetti IA (MCP)',mcpLinkCopiedToast:'Link del server MCP copiato!',mcpConfigCopiedToast:'Configurazione copiata!',mcpCopyFail:'Impossibile copiare.',mcpPingChecking:'Verifica della connessione al server MCP…',mcpPingSuccess:(ms, name, count) => `✓ Connessione verificata (${ms}ms)! Server "${name}" attivo con ${count} strumenti pronti.`,mcpPingError:msg => `Verifica non riuscita: ${msg}.`
  },
  fr:{
    drawEyebrow:'LA DÉCISION DU JOUR',drawTitle:'Laissons le hasard choisir',drawDescription:'Choisissez des filtres ou laissez faire le hasard.',city:'Ville',anyCity:'Toutes les villes',food:'Type de plat',anyFood:'Sans préférence',mode:'Tirer au sort',restaurant:'Restaurant',dish:'Plat',price:'Participation maximale',noLimit:'Sans limite',draw:'Tirer au sort',searching:'Recherche dans les menus du jour…',noResult:'Aucune option ne correspond à ces filtres.',resultRestaurant:'Votre restaurant',resultDish:'Votre plat',openMenu:'Voir le menu',drawError:'Le tirage au sort a échoué.',
    favoritesEyebrow:'VOTRE LISTE',favoritesTitle:'Favoris',favoritesSubtitle:'Vos restaurants et plats enregistrés pour un accès rapide.',favoritesEmptyVenuesTitle:'Aucun restaurant enregistré',favoritesEmptyVenuesCopy:'Touchez le cœur sur un restaurant pour l’enregistrer.',favoritesEmptyDishesTitle:'Aucun plat enregistré',favoritesEmptyDishesCopy:'Touchez le cœur sur un plat pour l’enregistrer.',favVenuesTab:'Restaurants',favDishesTab:'Plats',
    profileEyebrow:'VOTRE COMPTE',profileTitle:'Profil',profileSubtitle:'Votre résumé de repas, avis et dépenses avec boni.',profileUserTitle:'Votre registre personnel',profileUserCopy:'Données de repas stockées sur votre appareil.',reviews:'Avis donnés',history:'Repas enregistrés',foodStats:'Plat le plus choisi',spending:'Dépensé en boni',myReviews:'Mes Avis',mealHistory:'Derniers Repas Enregistrés',calendarTitle:'Calendrier des repas',emptyReviews:'Vous n’avez pas encore noté de restaurant. Ouvrez un restaurant et touchez « Noter ».',emptyHistory:'Aucun repas enregistré. Touchez « J’ai mangé ici » lorsque vous visitez un restaurant.',
    favBtn:'Favori',favBtnActive:'Enregistré',logBtn:'J’ai mangé ici',logBtnDone:'Mangé aujourd’hui',rateBtn:'Noter',rateBtnEdit:'Modifier note',rateBoxTitle:'Noter ce restaurant',reviewPlaceholder:'Écrivez une note rapide sur ce restaurant…',cancel:'Annuler',save:'Enregistrer',resetBtn:'Effacer les données locales',favAdded:'Ajouté aux favoris !',favRemoved:'Retiré des favoris.',favDishAdded:'Plat ajouté aux favoris !',favDishRemoved:'Plat retiré des favoris.',mealLogged:'Repas enregistré dans votre historique !',mealUnlogged:'Repas désélectionné.',mealDeleted:'Repas supprimé.',reviewSaved:'Avis enregistré !',reviewDeleted:'Avis supprimé.',clearDataConfirm:'Voulez-vous vraiment effacer votre historique, vos avis et vos favoris locaux ?',dataCleared:'Données locales effacées.',scanned:'menus vérifiés',
    loginTab:'Connexion',registerTab:'Créer un compte',loginSuccess:'Connexion réussie !',registerSuccess:'Compte créé avec succès !',logoutSuccess:'Déconnecté.',authRequiredReview:'Connectez-vous à votre profil pour noter les restaurants.',calEmptyDay:'Aucun repas enregistré ce jour-là.',calSavedMeal:'Repas enregistré dans l’historique !',calAddMeal:'+ Enregistrer un repas ce jour-là',calCloseForm:'− Fermer le formulaire',
    mealPickerTitle:'Qu’avez-vous mangé ici aujourd’hui ?',mealPickerSub:'Choisissez le plat pour l’enregistrer avec précision dans votre historique.',mealPickerNext:'Continuer',mealPickerRateTitle:'Comment évaluez-vous ce restaurant ?',mealPickerRateSub:'Donnez une note ou sautez cette étape.',mealPickerSkip:'Passer',mealPickerConfirmRate:'Évaluer et enregistrer',mealPickerDailyMenu:'Menu du jour / Plat',mealPickerOtherDish:'Autre plat / Option libre',mealPickerCustomPrompt:'Quel plat avez-vous mangé ?',mealLoggedAndRated:'Repas enregistré et avis sauvegardé !',
    authUsernameLabel:'Nom d’utilisateur',authUsernamePlaceholder:'@votre-nom',authEmailLabel:'E-mail',authEmailPlaceholder:'votre.email@exemple.fr',authPasswordLabel:'Mot de passe',profileMemberBadge:'Membre Bomboni',profileLogout:'Déconnexion',profileLogoutTitle:'Se déconnecter',calMonthBadge:'Historique',calPrevMonth:'Mois précédent',calNextMonth:'Mois suivant',calWeekdays:['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],calLogFormTitle:'Enregistrer un repas',calLogRestLabel:'Restaurant',calLogChooseRest:'Choisissez un restaurant…',calLogDishLabel:'Plat / Nourriture',calLogChooseRestFirst:'Choisissez d’abord le restaurant…',calLogLoadingDishes:'Chargement des plats du menu…',calLogChooseDish:'Choisissez un plat…',calLogCustomDishPlaceholder:'Entrez le nom du plat',calLogFeeLabel:'Participation (€)',historyPrev:'Précédent',historyNext:'Suivant',dishFavAddTitle:'Ajouter le plat aux favoris',dishFavRemoveTitle:'Retirer des favoris',dishLogMarkTitle:'Enregistrer que j’ai mangé ce plat aujourd’hui',dishLogUnmarkTitle:'Désélectionner le repas d’aujourd’hui',sourceLinkTitle:'Ouvrir la source officielle',searchClearAria:'Effacer la recherche',authUsernameMin:'Le nom d’utilisateur doit comporter au moins 3 caractères.',authPasswordMin:'Le mot de passe doit comporter au moins 6 caractères.',authEmailExists:'Cet e-mail est déjà enregistré.',authUsernameExists:'Ce nom d’utilisateur est déjà pris.',authInvalidCreds:'E-mail ou mot de passe incorrect.',
    authVerifyTitle:'Vérifier e-mail',authVerifySub:'Entrez le code à 4 chiffres envoyé à',authVerifyCodeLabel:'Code à 4 chiffres',authVerifySubmitBtn:'Vérifier et créer un compte',authResendCodeBtn:'Renvoyer le code',authBackBtn:'Retour',authCodeSentToast:'Code de vérification envoyé à',authCodeResentToast:'Nouveau code de vérification envoyé à',authInvalidCodeError:'Code de vérification incorrect.',
    mcpEyebrow:'INTÉGRATION MCP',mcpTitle:'Connecter des assistants IA',mcpSubtitle:'Consultez les menus, participations et restaurants boni directement dans Gemini, Claude, Cursor ou tout client compatible MCP.',mcpUrlTitle:'Adresse du Serveur MCP',mcpUrlDesc:'Collez cette URL dans votre client ou assistant IA pour connecter Bomboni dans le cloud :',mcpCopyLink:'Copier le lien',mcpCopied:'Copié !',mcpProtocolNote:'Compatible avec Streamable HTTP et SSE (accepte <code>/api/mcp</code> et <code>/mcp</code>).',mcpPingBtn:'Tester la connexion',mcpGuideTitle:'Comment configurer dans votre assistant',mcpGuideDesc:'Sélectionnez votre assistant pour voir les instructions :',mcpTabUniversal:'Autres IA / HTTP',mcpCopyConfig:'Copier la configuration',mcpPromptsTitle:'Exemples de questions',mcpPromptsDesc:'Une fois connecté, vous pouvez poser des questions en langage naturel :',mcpQuery1:'« Où déjeuner avec des boni à Ljubljana aujourd’hui pour moins de 4 euros ? »',mcpQuery2:'« Quels restaurants proposant du poisson ou des options végétariennes sont ouverts ? »',mcpQuery3:'« Affiche les plats du jour d’Abi Falafel dans Bomboni et traduis-les en français. »',mcpQuery4:'« Y a-t-il des options de sushi près du centre avec réduction étudiante ? »',mcpToolsTitle:'Outils inclus',mcpToolsDesc:'L’assistant consulte les données officielles via 4 fonctions :',mcpToolSearchRest:'Recherche des restaurants par ville, nom ou mot-clé (pizza, végétarien).',mcpToolGetRest:'Adresse, participation en euros, horaires et téléphone par ID.',mcpToolGetMenu:'Plats du jour publiés sur le portail officiel (aujourd’hui ou dates précises).',mcpToolSearchItems:'Scanne les menus de la ville pour un plat précis (ex. burger, salade).',mcpFooterLink:'Connecter IA (MCP)',mcpLinkCopiedToast:'Lien du serveur MCP copié !',mcpConfigCopiedToast:'Configuration copiée !',mcpCopyFail:'Impossible de copier.',mcpPingChecking:'Vérification de la connexion au serveur MCP…',mcpPingSuccess:(ms, name, count) => `✓ Connexion vérifiée (${ms}ms) ! Serveur « ${name} » actif avec ${count} outils prêts.`,mcpPingError:msg => `Échec de la vérification : ${msg}.`
  },
  ca:{
    drawEyebrow:'DECISIÓ DEL DIA',drawTitle:'Fem un sorteig',drawDescription:'Tria alguns filtres o deixa que decideixi l’atzar.',city:'Ciutat',anyCity:'Qualsevol ciutat',food:'Tipus de menjar',anyFood:'Sense preferència',mode:'Vull sortejar',restaurant:'Restaurant',dish:'Plat',price:'Copagament màxim',noLimit:'Sense límit',draw:'Sortejar',searching:'Cercant opcions als menús d’avui…',noResult:'No s’han trobat opcions amb aquests filtres.',resultRestaurant:'El teu restaurant',resultDish:'El teu plat',openMenu:'Veure menú',drawError:'No s’ha pogut completar el sorteig.',
    favoritesEyebrow:'LA TEVA LLISTA',favoritesTitle:'Preferits',favoritesSubtitle:'Els teus restaurants i plats desats per accedir-hi ràpidament.',favoritesEmptyVenuesTitle:'Sense restaurants desats',favoritesEmptyVenuesCopy:'Toca el cor a qualsevol restaurant per desar-lo aquí.',favoritesEmptyDishesTitle:'Sense plats desats',favoritesEmptyDishesCopy:'Toca el cor a qualsevol plat del menú per desar-lo aquí.',favVenuesTab:'Restaurants',favDishesTab:'Plats',
    profileEyebrow:'EL TEU COMPTE',profileTitle:'Perfil',profileSubtitle:'El teu resum d’àpats, ressenyes i despeses amb boni.',profileUserTitle:'El teu registre personal',profileUserCopy:'Dades dels teus àpats guardades al teu dispositiu.',reviews:'Ressenyes fetes',history:'Àpats registrats',foodStats:'Menjar més triat',spending:'Despesa en boni',myReviews:'Les Meves Ressenyes',mealHistory:'Darrers Àpats Registrats',calendarTitle:'Calendari d’Àpats',emptyReviews:'Encara no has valorat cap restaurant. Obre un restaurant i toca “Valorar”.',emptyHistory:'Encara no has registrat cap àpat. Toca “He menjat aquí” quan visitis un restaurant.',
    favBtn:'Preferit',favBtnActive:'Desat',logBtn:'He menjat aquí',logBtnDone:'Menjat avui',rateBtn:'Valorar',rateBtnEdit:'Editar nota',rateBoxTitle:'Valorar aquest restaurant',reviewPlaceholder:'Escriu una nota ràpida sobre el restaurant…',cancel:'Cancel·lar',save:'Desar',resetBtn:'Esborrar dades locals',favAdded:'Afegit als preferits!',favRemoved:'Eliminat dels preferits.',favDishAdded:'Plat afegit als preferits!',favDishRemoved:'Plat eliminat dels preferits.',mealLogged:'Àpat registrat al teu historial!',mealUnlogged:'Àpat desmarcat de l’historial.',mealDeleted:'Àpat eliminat.',reviewSaved:'Ressenya desada!',reviewDeleted:'Ressenya eliminada.',clearDataConfirm:'Segur que vols esborrar tot el teu historial, ressenyes i preferits locals?',dataCleared:'Dades locals esborrades.',scanned:'menús consultats',
    loginTab:'Entrar',registerTab:'Crear compte',loginSuccess:'Sessió iniciada amb èxit!',registerSuccess:'Compte creat amb èxit!',logoutSuccess:'Sessió tancada.',authRequiredReview:'Inicia sessió al teu perfil per valorar restaurants.',calEmptyDay:'Cap àpat registrat en aquest dia.',calSavedMeal:'Àpat desat a l’historial!',calAddMeal:'+ Registrar àpat en aquest dia',calCloseForm:'− Tancar formulari',
    mealPickerTitle:'Què has menjat aquí avui?',mealPickerSub:'Tria el plat per registrar-lo amb precisió al teu historial.',mealPickerNext:'Continuar',mealPickerRateTitle:'Com valores aquest restaurant?',mealPickerRateSub:'Dona una nota amb estrelles o pots saltar aquest pas.',mealPickerSkip:'Saltar',mealPickerConfirmRate:'Valorar i registrar',mealPickerDailyMenu:'Menú del dia / Àpat',mealPickerOtherDish:'Altre plat / Opció lliure',mealPickerCustomPrompt:'Quin plat has menjat?',mealLoggedAndRated:'Àpat registrat i ressenya desada!',
    authUsernameLabel:'Nom d’usuari',authUsernamePlaceholder:'@el-teu-nom',authEmailLabel:'Correu electrònic',authEmailPlaceholder:'el.teu.email@exemple.cat',authPasswordLabel:'Contrasenya',profileMemberBadge:'Membre Bomboni',profileLogout:'Sortir',profileLogoutTitle:'Tancar sessió',calMonthBadge:'Historial',calPrevMonth:'Mes anterior',calNextMonth:'Mes següent',calWeekdays:['Dl','Dt','Dc','Dj','Dv','Ds','Dg'],calLogFormTitle:'Registrar àpat',calLogRestLabel:'Restaurant',calLogChooseRest:'Tria un restaurant…',calLogDishLabel:'Plat / Menjar',calLogChooseRestFirst:'Tria primer el restaurant…',calLogLoadingDishes:'Carregant plats del menú…',calLogChooseDish:'Escolhe um prato…',calLogCustomDishPlaceholder:'Escriu el nom del plat',calLogFeeLabel:'Copagament (€)',historyPrev:'Anterior',historyNext:'Següent',dishFavAddTitle:'Desar plat als preferits',dishFavRemoveTitle:'Eliminar dels preferits',dishLogMarkTitle:'Registrar que he menjat aquest plat avui',dishLogUnmarkTitle:'Desmarcar àpat d’avui',sourceLinkTitle:'Obrir font oficial',searchClearAria:'Netejar cerca',authUsernameMin:'El nom d’usuari ha de tenir almenys 3 caràcters.',authPasswordMin:'La contrasenya ha de tenir almenys 6 caràcters.',authEmailExists:'Aquest correu ja està registrat.',authUsernameExists:'Aquest nom d’usuari ja existeix.',authInvalidCreds:'Correu o contrasenya incorrectes.',
    authVerifyTitle:'Verificar correu',authVerifySub:'Introdueix el codi de 4 dígits enviat a',authVerifyCodeLabel:'Codi de 4 dígits',authVerifySubmitBtn:'Verificar i crear compte',authResendCodeBtn:'Tornar a enviar codi',authBackBtn:'Tornar',authCodeSentToast:'Codi de verificació enviat a',authCodeResentToast:'Nou codi de verificació enviat a',authInvalidCodeError:'Codi de verificació incorrecte.',
    mcpEyebrow:'INTEGRACIÓ MCP',mcpTitle:'Connectar assistents d’IA',mcpSubtitle:'Consulta menús, copagaments i restaurants de boni directament a Gemini, Claude, Cursor o qualsevol client compatible amb MCP.',mcpUrlTitle:'Adreça del Servidor MCP',mcpUrlDesc:'Enganxa aquest URL al teu client o assistent d’IA per connectar Bomboni al núvol:',mcpCopyLink:'Copiar enllaç',mcpCopied:'Copiat!',mcpProtocolNote:'Compatible amb Streamable HTTP i SSE (accepta <code>/api/mcp</code> e <code>/mcp</code>).',mcpPingBtn:'Provar connexió',mcpGuideTitle:'Com configurar al teu assistent',mcpGuideDesc:'Selecciona el teu assistent per veure les instruccions:',mcpTabUniversal:'Altres IA / HTTP',mcpCopyConfig:'Copiar configuració',mcpPromptsTitle:'Exemples de preguntes',mcpPromptsDesc:'Un cop connectat, pots preguntar en llenguatge natural:',mcpQuery1:'“On dinar amb boni a Ljubljana avui per menys de 4 euros?”',mcpQuery2:'“Quins restaurants tenen peix o opcions vegetarianes oberts ara?”',mcpQuery3:'“Mira els plats d’avui d’Abi Falafel a Bomboni i tradueix-los al català.”',mcpQuery4:'“Hi ha opcions de sushi a prop del centre amb descompte d’estudiant?”',mcpToolsTitle:'Eines incloses',mcpToolsDesc:'L’assistent consulta les dades oficials mitjançant 4 funcions:',mcpToolSearchRest:'Cerca establiments per ciutat, nom o etiquetes (pizza, vegetarià).',mcpToolGetRest:'Adreça, copagament en euros, horaris i telèfon per ID.',mcpToolGetMenu:'Plats del dia publicats al portal oficial (avui o dates específiques).',mcpToolSearchItems:'Escaneja els menús de la ciutat per un plat específic (ex: hamburguesa, amanida).',mcpFooterLink:'Connectar IA (MCP)',mcpLinkCopiedToast:'Enllaç del servidor MCP copiat!',mcpConfigCopiedToast:'Configuració copiada!',mcpCopyFail:'No s’ha pogut copiar.',mcpPingChecking:'Comprovant connexió amb el servidor MCP…',mcpPingSuccess:(ms, name, count) => `✓ Connexió verificada (${ms}ms)! Servidor "${name}" actiu amb ${count} eines llestes.`,mcpPingError:msg => `Error de verificació: ${msg}.`
  }
};

const hoursLabels = {
  pt:{open:'Aberto',closed:'Fechado',unknown:'Sem horário',checking:'A verificar',today:'Hoje'},
  en:{open:'Open',closed:'Closed',unknown:'Hours n/a',checking:'Checking',today:'Today'},
  es:{open:'Abierto',closed:'Cerrado',unknown:'Sin horario',checking:'Consultando',today:'Hoy'},
  de:{open:'Geöffnet',closed:'Geschlossen',unknown:'Keine Zeiten',checking:'Prüfe…',today:'Heute'},
  it:{open:'Aperto',closed:'Chiuso',unknown:'Orari n/d',checking:'Verifica…',today:'Oggi'},
  fr:{open:'Ouvert',closed:'Fermé',unknown:'Horaires n/d',checking:'Vérification',today:'Aujourd’hui'},
  ca:{open:'Obert',closed:'Tancat',unknown:'Sense horari',checking:'Comprovant…',today:'Avui'}
};

const drawSampleLabel = {
  pt:(scanned,total)=>`Sorteio entre ${scanned} de ${total} restaurantes`,
  en:(scanned,total)=>`Draw from ${scanned} of ${total} restaurants`,
  es:(scanned,total)=>`Sorteo entre ${scanned} de ${total} restaurantes`,
  de:(scanned,total)=>`Auswahl aus ${scanned} von ${total} Restaurants`,
  it:(scanned,total)=>`Estrazione tra ${scanned} di ${total} ristoranti`,
  fr:(scanned,total)=>`Tirage parmi ${scanned} restaurants sur ${total}`,
  ca:(scanned,total)=>`Sorteig entre ${scanned} de ${total} restaurants`
};

const drawNoSampleLabel = {
  pt:n=>`Não encontrei uma opção nos ${n} restaurantes sorteados.`,
  en:n=>`No match in the ${n} restaurants checked.`,
  es:n=>`No encontré opciones en los ${n} restaurantes consultados.`,
  de:n=>`Keine passende Option unter den ${n} geprüften Restaurants.`,
  it:n=>`Nessuna opzione tra i ${n} ristoranti controllati.`,
  fr:n=>`Aucune option parmi les ${n} restaurants vérifiés.`,
  ca:n=>`No s’ha trobat cap opció entre els ${n} restaurants consultats.`
};

const installCopy = {
  pt:{label:'Instalar app',ios:'No Safari, toque em Partilhar e escolha “Adicionar ao ecrã principal”.',browser:'Use o menu do navegador para instalar o Bomboni.'},
  en:{label:'Install app',ios:'In Safari, tap Share and choose “Add to Home Screen”.',browser:'Use your browser menu to install Bomboni.'},
  es:{label:'Instalar app',ios:'En Safari, toca Compartir y elige “Añadir a pantalla de inicio”.',browser:'Usa el menú del navegador para instalar Bomboni.'},
  de:{label:'App installieren',ios:'Tippe in Safari auf Teilen und wähle „Zum Home-Bildschirm“.',browser:'Installiere Bomboni über das Browsermenü.'},
  it:{label:'Installa app',ios:'In Safari, tocca Condividi e scegli “Aggiungi alla schermata Home”.',browser:'Usa il menu del browser per installare Bomboni.'},
  fr:{label:'Installer',ios:'Dans Safari, touchez Partager puis « Sur l’écran d’accueil ».',browser:'Installez Bomboni depuis le menu du navigateur.'},
  ca:{label:'Instal·lar app',ios:'A Safari, toca Compartir i tria “Afegir a la pantalla d’inici”.',browser:'Usa el menú del navegador per instal·lar Bomboni.'}
};

const BONBON_SPINNER_HTML = '<span class="bonbon-spinner" aria-hidden="true"><svg viewBox="0 0 32 32"><rect x="9.5" y="10.5" width="13" height="11" rx="5.5"/><path d="M9.5 16 L3.5 10 L5 16 L3.5 22 Z"/><path d="M22.5 16 L28.5 10 L27 16 L28.5 22 Z"/><path d="M9.5 13 C8.8 14.5 8.8 17.5 9.5 19"/><path d="M22.5 13 C23.2 14.5 23.2 17.5 22.5 19"/><path d="M15.5 10.5 C17 13.5 17 18.5 15.5 21.5"/></svg></span>';

let deferredInstallPrompt = null;
let activeMenuRequest = 0;
let dishSearchTimer = null;
const restaurantHours = {};
const loadingHours = new Set();
const menuCache = new Map();
let savedTranslations = {};
try { savedTranslations = JSON.parse(localStorage.getItem('bomboni-translations') || '{}'); } catch {}
const savedLanguage = localStorage.getItem('bomboni-language');

// Default proximity sorting: Ljubljana city center fallback coordinates
const DEFAULT_COORDS = { latitude: 46.056946, longitude: 14.505751 };
let savedLocation = null;
try { savedLocation = JSON.parse(localStorage.getItem('bomboni-location') || 'null'); } catch {}

const state = {
  language: translations[savedLanguage] ? savedLanguage : 'pt',
  location: savedLocation || DEFAULT_COORDS,
  locationLabel: '',
  restaurants: [],
  visible: 15,
  selected: null,
  date: '',
  today: new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Ljubljana' }).format(new Date()),
  translationCache: savedTranslations,
  tab: 'explore',
  searchMode: 'restaurants',
  favTab: 'venues',
  historyPage: 1,
  dishResults: [],
  isSearchingDishes: false,
  currentMenuDishes: [],
  pendingPickedDish: null,
  pickerRating: 5,
  calendarYear: new Date().getFullYear(),
  calendarMonth: new Date().getMonth(),
  calendarSelectedDate: new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Ljubljana' }).format(new Date())
};
document.body.dataset.tab = state.tab;

// Sync today date with backend in background
fetch('/api/today').then(r => r.json()).then(d => {
  if (d?.date) {
    state.today = d.date;
    if (!state.date) state.date = d.date;
  }
}).catch(() => {});

/* -------------------------------------------------------------
   Storage & Domain Persistence
   ------------------------------------------------------------- */
const STORAGE_FAVORITES = 'bomboni-favorites';
const STORAGE_FAV_DISHES = 'bomboni-favorite-dishes';
const STORAGE_REVIEWS = 'bomboni-reviews';
const STORAGE_MEALS = 'bomboni-meals';
const STORAGE_USERS = 'bomboni-users';
const STORAGE_USERNAMES = 'bomboni-usernames';
const STORAGE_AUTH_USER = 'bomboni-auth-user';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_USERS) || '{}'); } catch { return {}; }
}
function getUsernamesMap() {
  try {
    const raw = localStorage.getItem(STORAGE_USERNAMES);
    if (raw) return JSON.parse(raw);
  } catch {}
  const users = getUsers();
  const map = {};
  for (const u of Object.values(users)) {
    if (u && u.username && u.email) map[u.username.toLowerCase()] = u.email;
  }
  try { localStorage.setItem(STORAGE_USERNAMES, JSON.stringify(map)); } catch {}
  return map;
}
function getUserByUsername(username) {
  if (!username) return null;
  const lower = username.toLowerCase();
  const map = getUsernamesMap();
  const email = map[lower];
  const users = getUsers();
  if (email && users[email]) return users[email];
  const fallback = Object.values(users).find(u => u?.username?.toLowerCase() === lower);
  if (fallback) {
    map[lower] = fallback.email;
    try { localStorage.setItem(STORAGE_USERNAMES, JSON.stringify(map)); } catch {}
  }
  return fallback || null;
}
function saveUsers(data) {
  try {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(data));
    const map = {};
    for (const u of Object.values(data)) {
      if (u && u.username && u.email) map[u.username.toLowerCase()] = u.email;
    }
    localStorage.setItem(STORAGE_USERNAMES, JSON.stringify(map));
  } catch {}
}
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem(STORAGE_AUTH_USER) || 'null'); } catch { return null; }
}
function setCurrentUser(user) {
  try {
    if (user) localStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_AUTH_USER);
  } catch {}
}

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(STORAGE_FAVORITES) || '{}'); } catch { return {}; }
}
function saveFavorites(data) {
  try { localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(data)); } catch {}
}
function isFavorite(restaurantId) {
  return Boolean(getFavorites()[restaurantId]);
}

function toggleFavorite(restaurant) {
  const favs = getFavorites();
  const id = restaurant.id;
  const isFav = Boolean(favs[id]);
  const feature = featureCopy[state.language] || featureCopy.en;
  if (isFav) {
    delete favs[id];
    saveFavorites(favs);
    showToast(feature.favRemoved || 'Removido dos favoritos.');
  } else {
    favs[id] = {
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      city: restaurant.city,
      additional_fee_eur: restaurant.additional_fee_eur,
      source_url: restaurant.source_url
    };
    saveFavorites(favs);
    showToast(feature.favAdded || 'Adicionado aos favoritos!');
  }
  updateFavoriteButtons(id, !isFav);
  if (state.tab === 'favorites') renderFavoritesPage();
}

function updateFavoriteButtons(restaurantId, isFav = isFavorite(restaurantId)) {
  const targetId = String(restaurantId);
  const buttons = document.querySelectorAll(`.card-fav-btn[data-id="${targetId}"]`);
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.toggle('active', isFav);
  }
  if (state.selected && state.selected.id === restaurantId) {
    const venueFavBtn = $('venue-fav-btn');
    const venueFavText = $('venue-fav-text');
    if (venueFavBtn && venueFavText) {
      venueFavBtn.classList.toggle('active', isFav);
      venueFavBtn.classList.toggle('is-fav', isFav);
      const feature = featureCopy[state.language] || featureCopy.en;
      venueFavText.textContent = isFav ? (feature.favBtnActive || 'Guardado') : (feature.favBtn || 'Favorito');
    }
  }
}

function getFavoriteDishes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_FAV_DISHES) || '{}'); } catch { return {}; }
}
function saveFavoriteDishes(data) {
  try { localStorage.setItem(STORAGE_FAV_DISHES, JSON.stringify(data)); } catch {}
}
function dishKey(restaurantId, dishName) {
  return `${restaurantId}::${(dishName || '').trim()}`;
}
function isFavoriteDish(restaurantId, dishName) {
  return Boolean(getFavoriteDishes()[dishKey(restaurantId, dishName)]);
}

function toggleFavoriteDish(dish, restaurant) {
  const favs = getFavoriteDishes();
  const key = dishKey(restaurant.id, dish.name);
  const isFav = Boolean(favs[key]);
  const feature = featureCopy[state.language] || featureCopy.en;
  if (isFav) {
    delete favs[key];
    saveFavoriteDishes(favs);
    showToast(feature.favDishRemoved || 'Prato removido dos favoritos.');
  } else {
    favs[key] = {
      key,
      dishName: dish.name,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantAddress: restaurant.address,
      restaurantCity: restaurant.city,
      fee: restaurant.additional_fee_eur,
      categories: dish.categories || [],
      sides: dish.sides || [],
      dateSaved: state.today,
      timestamp: Date.now()
    };
    saveFavoriteDishes(favs);
    showToast(feature.favDishAdded || 'Prato adicionado aos favoritos!');
  }
  updateDishFavoriteButtons(restaurant.id, dish.name);
  if (state.tab === 'favorites') renderFavoritesPage();
}

function updateDishFavoriteButtons(restaurantId, dishName) {
  const isFav = isFavoriteDish(restaurantId, dishName);
  const key = dishKey(restaurantId, dishName);
  const feature = featureCopy[state.language] || featureCopy.en;
  document.querySelectorAll(`.dish-fav-btn[data-dish-key="${key}"]`).forEach(btn => {
    btn.classList.toggle('active', isFav);
    btn.title = isFav ? (feature.dishFavRemoveTitle || 'Remover dos favoritos') : (feature.dishFavAddTitle || 'Guardar prato nos favoritos');
    btn.setAttribute('aria-label', btn.title);
  });
}

function getReviews() {
  try { return JSON.parse(localStorage.getItem(STORAGE_REVIEWS) || '{}'); } catch { return {}; }
}
function saveReviews(data) {
  try { localStorage.setItem(STORAGE_REVIEWS, JSON.stringify(data)); } catch {}
}
function getReview(restaurantId) {
  return getReviews()[restaurantId] || null;
}

function saveReview(restaurantId, rating, comment, restaurant) {
  const revs = getReviews();
  const feature = featureCopy[state.language] || featureCopy.en;
  const user = getCurrentUser();
  revs[restaurantId] = {
    restaurantId,
    name: restaurant.name,
    address: restaurant.address,
    city: restaurant.city,
    additional_fee_eur: restaurant.additional_fee_eur,
    rating: Number(rating) || 5,
    comment: (comment || '').trim(),
    username: user ? user.username : 'estudante',
    date: state.today,
    timestamp: Date.now()
  };
  saveReviews(revs);
  updateVenueReviewUI();
  if (state.tab === 'profile') renderProfilePage();
  emit('review-saved', { review: revs[restaurantId], restaurant });
}

function deleteReview(restaurantId) {
  const revs = getReviews();
  const feature = featureCopy[state.language] || featureCopy.en;
  if (revs[restaurantId]) {
    delete revs[restaurantId];
    saveReviews(revs);
    emit('review-deleted', { restaurantId });
    showToast(feature.reviewDeleted || 'Avaliação removida.');
    updateVenueReviewUI();
    if (state.tab === 'profile') renderProfilePage();
  }
}

function getMeals() {
  try { return JSON.parse(localStorage.getItem(STORAGE_MEALS) || '[]'); } catch { return []; }
}
function saveMeals(data) {
  try { localStorage.setItem(STORAGE_MEALS, JSON.stringify(data)); } catch {}
}
function hasLoggedMealToday(restaurantId) {
  return getMeals().some(m => m.restaurantId === restaurantId && m.date === state.today);
}
function isDishLoggedToday(restaurantId, dishName) {
  const targetDate = state.date || state.today;
  return getMeals().some(m => m.restaurantId === restaurantId && m.dishName === dishName && m.date === targetDate);
}

function logMeal(restaurant, dishName = '', category = 'Mixed', customDate = null) {
  const meals = getMeals();
  const user = getCurrentUser();
  const entry = {
    id: `${restaurant.id}-${Date.now()}`,
    restaurantId: restaurant.id,
    name: restaurant.name,
    dishName: dishName || '',
    address: restaurant.address,
    city: restaurant.city,
    fee: Number(restaurant.additional_fee_eur) || 0,
    category: category || 'Mixed',
    username: user ? user.username : null,
    date: customDate || state.today,
    timestamp: Date.now()
  };
  meals.unshift(entry);
  saveMeals(meals);
  emit('meal-logged', { meal: entry, restaurant });
  updateVenueMealLogUI();
  if (state.tab === 'profile') {
    renderProfilePage();
    renderMiniCalendar();
  }
}

function deleteMeal(mealId) {
  let meals = getMeals();
  const feature = featureCopy[state.language] || featureCopy.en;
  const removed = meals.find(m => m.id === mealId);
  meals = meals.filter(m => m.id !== mealId);
  saveMeals(meals);
  if (removed) emit('meal-deleted', { meal: removed });
  showToast(feature.mealDeleted || 'Refeição removida.');
  updateVenueMealLogUI();
  if (state.tab === 'profile') {
    renderProfilePage();
    renderMiniCalendar();
  }
}

function clearAllLocalData() {
  const feature = featureCopy[state.language] || featureCopy.en;
  if (!window.confirm(feature.clearDataConfirm || 'Tens a certeza que queres limpar todo o teu histórico, avaliações e favoritos locais?')) return;
  localStorage.removeItem(STORAGE_FAVORITES);
  localStorage.removeItem(STORAGE_FAV_DISHES);
  localStorage.removeItem(STORAGE_REVIEWS);
  localStorage.removeItem(STORAGE_MEALS);
  showToast(feature.dataCleared || 'Dados locais apagados.');
  if (state.searchMode === 'dishes') renderDishesSearch(); else renderRestaurants();
  if (state.tab === 'favorites') renderFavoritesPage();
  if (state.tab === 'profile') renderProfilePage();
  renderMcpPage();
  if (state.selected) {
    updateFavoriteButtons(state.selected.id);
    updateVenueReviewUI();
    updateVenueMealLogUI();
  }
}

let currentReviewRating = 5;
function setReviewStars(val) {
  currentReviewRating = val;
  document.querySelectorAll('#review-stars .star-btn').forEach(btn => {
    btn.classList.toggle('selected', Number(btn.dataset.value) <= val);
  });
}

function setPickerStars(val) {
  state.pickerRating = val;
  document.querySelectorAll('#meal-picker-stars .star-btn').forEach(btn => {
    btn.classList.toggle('selected', Number(btn.dataset.value) <= val);
  });
}

function updateVenueReviewUI() {
  if (!state.selected) return;
  const rev = getReview(state.selected.id);
  const rateBtn = $('venue-rate-btn');
  const rateText = $('venue-rate-text');
  const ratingDisplay = $('venue-rating-display');
  const ratingSep = $('venue-rating-sep');
  const feature = featureCopy[state.language] || featureCopy.en;
  if (rev) {
    rateBtn.classList.add('active');
    rateText.textContent = feature.rateBtnEdit || 'Editar nota';
    ratingDisplay.hidden = false;
    ratingSep.hidden = false;
    ratingDisplay.innerHTML = `<span style="color:#e5993b;margin-right:3px;">★</span><strong>${rev.rating}.0</strong>`;
  } else {
    rateBtn.classList.remove('active');
    rateText.textContent = feature.rateBtn || 'Avaliar';
    ratingDisplay.hidden = true;
    ratingSep.hidden = true;
  }
}

function updateVenueMealLogUI() {
  if (!state.selected) return;
  const logged = hasLoggedMealToday(state.selected.id);
  const logBtn = $('venue-log-meal-btn');
  const logText = $('venue-log-text');
  const feature = featureCopy[state.language] || featureCopy.en;
  if (logged) {
    logBtn.classList.add('active');
    logText.textContent = feature.logBtnDone || 'Comi hoje';
  } else {
    logBtn.classList.remove('active');
    logText.textContent = feature.logBtn || 'Comi aqui';
  }
}

/* -------------------------------------------------------------
   DOM & UI Core Utilities
   ------------------------------------------------------------- */
const $ = (id) => document.getElementById(id);
const languageSelect = $('language-select');
const safeText = (value) => value == null ? '' : String(value);

function locale() {
  return ({ pt:'pt-PT', en:'en-GB', es:'es-ES', de:'de-DE', it:'it-IT', fr:'fr-FR', ca:'ca-ES' })[state.language] || 'pt-PT';
}
function tr() {
  return translations[state.language] || translations.pt;
}

function formatMoney(value) {
  if (value == null) return '—';
  return new Intl.NumberFormat(locale(), { style:'currency', currency:'EUR' }).format(value);
}
function formatDate(value) {
  return new Intl.DateTimeFormat(locale(), { weekday:'long', day:'numeric', month:'long' }).format(new Date(`${value}T12:00:00`));
}
function formatDistance(distKm) {
  if (distKm == null) return '';
  return distKm < 1 ? `${Math.round(distKm * 1000)} m` : `${distKm.toFixed(1)} km`;
}
function displayAddress(address, city) {
  return city && address?.toLocaleLowerCase().includes(city.toLocaleLowerCase()) ? address : [address, city].filter(Boolean).join(', ');
}
function normalizeSearch(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
function editDistanceAtMostOne(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else { i++; j++; }
  }
  return edits + (i < a.length || j < b.length ? 1 : 0) <= 1;
}
function searchScore(r, query) {
  const q = normalizeSearch(query);
  if (!q) return 1;
  const name = normalizeSearch(r.name), address = normalizeSearch(r.address), city = normalizeSearch(r.city), tags = normalizeSearch((r.tags || []).join(' '));
  const fields = [name, address, city, tags], all = fields.join(' ');
  if (name === q) return 1000;
  if (name.startsWith(q)) return 900;
  if (name.includes(q)) return 800;
  if (address.startsWith(q) || city === q) return 700;
  if (all.includes(q)) return 600;
  const terms = q.split(/\s+/);
  const words = all.split(/\s+/);
  if (!terms.every(term => words.some(word => word.startsWith(term) || (term.length >= 5 && editDistanceAtMostOne(term, word))))) return 0;
  const nameWords = name.split(/\s+/);
  const nameMatches = terms.filter(term => nameWords.some(word => word.startsWith(term))).length;
  return 300 + nameMatches * 20;
}

function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

function applyLanguage() {
  const t = tr();
  const feature = featureCopy[state.language] || featureCopy.en;
  document.documentElement.lang = state.language;
  languageSelect.value = state.language;
  $('search-mode-restaurants').textContent = searchModeLabels.restaurants[state.language] || searchModeLabels.restaurants.en;
  $('search-mode-dishes').textContent = searchModeLabels.dishes[state.language] || searchModeLabels.dishes.en;
  $('search-input').placeholder = state.searchMode === 'dishes' ? (dishSearchPlaceholders[state.language] || dishSearchPlaceholders.en) : (restaurantSearchPlaceholders[state.language] || restaurantSearchPlaceholders.en);
  $('search-input').setAttribute('aria-label', $('search-input').placeholder);
  const searchClear = $('search-clear');
  if (searchClear) searchClear.setAttribute('aria-label', feature.searchClearAria || 'Limpar pesquisa');
  const loadingLabel = $('loading-label');
  if (loadingLabel) loadingLabel.textContent = t.loading;
  $('load-more').textContent = t.more;
  $('back-label').textContent = dl().back;
  $('source-link-label').textContent = appPlatform() ? dl().useBoni : dl().site;
  $('official-site-link').textContent = dl().officialSite;
  $('copy-menu-label').textContent = dl().copyMenu;
  $('copy-menu-btn').setAttribute('aria-label', dl().copyMenu);
  $('copy-menu-btn').title = dl().copyMenu;
  const srcLink = $('source-link');
  if (srcLink) srcLink.setAttribute('aria-label', appPlatform() ? dl().useBoni : dl().site);
  $('menu-title').textContent = (state.selected && state.date) ? formatDate(state.date) : t.today;
  $('date-prev').setAttribute('aria-label', ({ pt:'Dia anterior', en:'Previous day', es:'Día anterior', de:'Vorheriger Tag', it:'Giorno precedente', fr:'Jour précédent', ca:'Dia anterior' }[state.language]));
  $('date-next').setAttribute('aria-label', ({ pt:'Dia seguinte', en:'Next day', es:'Día seguinte', de:'Nächster Tag', it:'Giorno successivo', fr:'Jour suivant', ca:'Dia següent' }[state.language]));
  $('footer-source').textContent = t.source;
  $('footer-install').textContent = installCopy[state.language]?.label || installCopy.en.label;

  document.querySelectorAll('[data-tab-label]').forEach(label => {
    label.textContent = mobileTabLabels[state.language]?.[label.dataset.tabLabel] || mobileTabLabels.en[label.dataset.tabLabel];
  });
  const mcpDesktopLabel = $('mcp-desktop-label');
  if (mcpDesktopLabel) {
    mcpDesktopLabel.textContent = mobileTabLabels[state.language]?.mcp || mobileTabLabels.en.mcp;
  }

  for (const [id, key] of Object.entries({
    'draw-eyebrow':'drawEyebrow','draw-title':'drawTitle','draw-description':'drawDescription','draw-city-label':'city','draw-any-city':'anyCity',
    'draw-category-label':'food','draw-any-category':'anyFood','draw-mode-label':'mode','draw-mode-restaurant':'restaurant','draw-mode-dish':'dish',
    'draw-price-label':'price','draw-submit-label':'draw',
    'favorites-eyebrow':'favoritesEyebrow','favorites-title':'favoritesTitle','favorites-subtitle':'favoritesSubtitle',
    'fav-tab-venues-label':'favVenuesTab','fav-tab-dishes-label':'favDishesTab',
    'profile-eyebrow':'profileEyebrow','profile-title':'profileTitle','profile-subtitle':'profileSubtitle',
    'profile-spend-label':'spending','profile-food-label':'foodStats','profile-history-label':'history','profile-reviews-label':'reviews',
    'profile-sec-reviews':'myReviews','profile-sec-history':'mealHistory',
    'profile-sec-calendar':'calendarTitle','profile-calendar-badge':'calMonthBadge',
    'profile-reset-btn':'resetBtn','review-box-title':'rateBoxTitle','review-cancel-btn':'cancel','review-save-btn':'save',
    'meal-picker-title':'mealPickerTitle','meal-picker-sub':'mealPickerSub',
    'meal-picker-cancel':'cancel','meal-picker-next':'mealPickerNext',
    'meal-picker-rate-title':'mealPickerRateTitle','meal-picker-rate-sub':'mealPickerRateSub',
    'meal-picker-skip':'mealPickerSkip','meal-picker-confirm-rate':'mealPickerConfirmRate',
    'auth-tab-login':'loginTab','auth-tab-register':'registerTab',
    'auth-username-label':'authUsernameLabel','auth-email-label':'authEmailLabel','auth-password-label':'authPasswordLabel',
    'auth-verify-title':'authVerifyTitle','auth-verify-code-label':'authVerifyCodeLabel',
    'auth-verify-submit-btn':'authVerifySubmitBtn','auth-verify-resend-btn':'authResendCodeBtn',
    'auth-verify-back-btn':'authBackBtn',
    'profile-user-badge':'profileMemberBadge','profile-logout-text':'profileLogout',
    'cal-log-form-title':'calLogFormTitle','cal-log-rest-label':'calLogRestLabel','cal-log-dish-label':'calLogDishLabel',
    'cal-log-fee-label':'calLogFeeLabel','cal-log-cancel':'cancel','cal-log-save':'save',
    'history-prev-btn':'historyPrev','history-next-btn':'historyNext',
    'mcp-eyebrow':'mcpEyebrow','mcp-title':'mcpTitle','mcp-subtitle':'mcpSubtitle',
    'mcp-url-card-title':'mcpUrlTitle','mcp-url-card-desc':'mcpUrlDesc',
    'mcp-copy-cloud-text':'mcpCopyLink','mcp-ping-btn':'mcpPingBtn',
    'mcp-guide-title':'mcpGuideTitle','mcp-guide-desc':'mcpGuideDesc',
    'mcp-tab-universal':'mcpTabUniversal','mcp-copy-snippet-btn':'mcpCopyConfig',
    'mcp-prompts-title':'mcpPromptsTitle','mcp-prompts-desc':'mcpPromptsDesc',
    'mcp-query-1':'mcpQuery1','mcp-query-2':'mcpQuery2','mcp-query-3':'mcpQuery3','mcp-query-4':'mcpQuery4',
    'mcp-tools-title':'mcpToolsTitle','mcp-tools-desc':'mcpToolsDesc',
    'mcp-tool-search-restaurants':'mcpToolSearchRest','mcp-tool-get-restaurant':'mcpToolGetRest',
    'mcp-tool-get-restaurant-menu':'mcpToolGetMenu','mcp-tool-search-menu-items':'mcpToolSearchItems',
    'footer-mcp-link':'mcpFooterLink'
  })) {
    const el = $(id);
    if (el && feature[key]) el.textContent = feature[key];
  }

  const mcpProtoNote = $('mcp-protocol-note');
  if (mcpProtoNote && feature.mcpProtocolNote) {
    mcpProtoNote.innerHTML = feature.mcpProtocolNote;
  }
  const mcpCloudUrl = $('mcp-cloud-url');
  if (mcpCloudUrl && feature.mcpUrlTitle) {
    mcpCloudUrl.setAttribute('aria-label', feature.mcpUrlTitle);
  }

  // Update button states
  const calLogForm = $('cal-log-form');
  const calAddMealBtn = $('cal-add-meal-btn');
  if (calAddMealBtn) {
    calAddMealBtn.textContent = (calLogForm && !calLogForm.hidden) ? (feature.calCloseForm || '− Fechar formulário') : (feature.calAddMeal || '+ Registar refeição neste dia');
  }

  const authSubmitBtn = $('auth-submit-btn');
  if (authSubmitBtn) {
    authSubmitBtn.textContent = authMode === 'register' ? (feature.registerTab || 'Criar conta') : (feature.loginTab || 'Entrar');
  }

  const logoutBtn = $('profile-logout-btn');
  if (logoutBtn && feature.profileLogoutTitle) {
    logoutBtn.setAttribute('title', feature.profileLogoutTitle);
    logoutBtn.setAttribute('aria-label', feature.profileLogoutTitle);
  }

  const venueFavText = $('venue-fav-text');
  if (venueFavText) {
    const isFav = state.selected ? isFavorite(state.selected.id) : false;
    venueFavText.textContent = isFav ? (feature.favBtnActive || 'Guardado') : (feature.favBtn || 'Favorito');
  }
  const venueLogText = $('venue-log-text');
  if (venueLogText) {
    const isLogged = state.selected ? hasLoggedMealToday(state.selected.id) : false;
    venueLogText.textContent = isLogged ? (feature.logBtnDone || 'Comi hoje') : (feature.logBtn || 'Comi aqui');
  }
  const venueRateText = $('venue-rate-text');
  if (venueRateText) {
    const existing = state.selected ? getReview(state.selected.id) : null;
    venueRateText.textContent = existing ? (feature.rateBtnEdit || 'Editar nota') : (feature.rateBtn || 'Avaliar');
  }

  // Dynamic placeholders
  const reviewComment = $('review-comment');
  if (reviewComment && feature.reviewPlaceholder) reviewComment.placeholder = feature.reviewPlaceholder;
  const drawPrice = $('draw-price');
  if (drawPrice && feature.noLimit) drawPrice.placeholder = feature.noLimit;
  const authUsername = $('auth-username');
  if (authUsername && feature.authUsernamePlaceholder) authUsername.placeholder = feature.authUsernamePlaceholder;
  const authEmail = $('auth-email');
  if (authEmail && feature.authEmailPlaceholder) authEmail.placeholder = feature.authEmailPlaceholder;
  const authVerifySub = $('auth-verify-sub');
  if (authVerifySub) {
    const emailDisplay = $('auth-verify-email-display');
    const emailText = emailDisplay ? emailDisplay.textContent : '';
    authVerifySub.replaceChildren();
    const strongEl = document.createElement('strong');
    strongEl.id = 'auth-verify-email-display';
    strongEl.textContent = emailText;
    authVerifySub.append(document.createTextNode(`${feature.authVerifySub || 'Insere o código de 4 dígitos enviado para'} `), strongEl, document.createTextNode('.'));
  }
  const calCustomDish = $('cal-log-dish-custom');
  if (calCustomDish && feature.calLogCustomDishPlaceholder) calCustomDish.placeholder = feature.calLogCustomDishPlaceholder;
  const calLogDish = $('cal-log-dish');
  if (calLogDish && !$('cal-log-restaurant')?.value) {
    calLogDish.replaceChildren(new Option(feature.calLogChooseRestFirst || 'Escolhe primeiro o restaurante…', ''));
  }

  // Star rating aria-labels
  const starWord = ({ pt:'estrelas', en:'stars', es:'estrellas', de:'Sterne', it:'stelle', fr:'étoiles', ca:'estrelles' })[state.language] || 'estrelas';
  const starSingle = ({ pt:'estrela', en:'star', es:'estrella', de:'Stern', it:'stella', fr:'étoile', ca:'estrella' })[state.language] || 'estrela';
  document.querySelectorAll('.star-rating .star-btn').forEach(btn => {
    btn.setAttribute('aria-label', `${btn.dataset.value} ${btn.dataset.value === '1' ? starSingle : starWord}`);
  });

  // Weekdays in mini calendar
  const weekdaysHost = $('calendar-weekdays');
  if (weekdaysHost && feature.calWeekdays) {
    weekdaysHost.replaceChildren();
    feature.calWeekdays.forEach(day => {
      const sp = document.createElement('span');
      sp.textContent = day;
      weekdaysHost.append(sp);
    });
  }
  const calPrevBtn = $('cal-prev');
  if (calPrevBtn && feature.calPrevMonth) calPrevBtn.setAttribute('aria-label', feature.calPrevMonth);
  const calNextBtn = $('cal-next');
  if (calNextBtn && feature.calNextMonth) calNextBtn.setAttribute('aria-label', feature.calNextMonth);

  document.querySelectorAll('[data-category]').forEach(option => {
    option.textContent = t.categories[option.dataset.category] || option.dataset.category;
  });
  $('mobile-tab-bar').setAttribute('aria-label', ({ pt:'Navegação principal', en:'Main navigation', es:'Navegación principal', de:'Hauptnavigation', it:'Navigazione principale', fr:'Navigation principale', ca:'Navegació principal' }[state.language]));

  renderDrawCities();
  if (state.searchMode === 'dishes') renderDishesSearch(); else renderRestaurants();
  if (state.tab === 'favorites') renderFavoritesPage();
  if (state.tab === 'profile') renderProfilePage();
  renderMcpPage();
  if (state.selected) {
    updateFavoriteButtons(state.selected.id);
    updateVenueReviewUI();
    updateVenueMealLogUI();
  }
}

function emit(name, detail = {}) {
  document.dispatchEvent(new CustomEvent(`bomboni:${name}`, { detail }));
}

function switchTab(name) {
  state.tab = name;
  document.body.dataset.tab = name;
  $('layout').hidden = name !== 'explore';
  $('draw-page').hidden = name !== 'draw';
  $('favorites-page').hidden = name !== 'favorites';
  $('profile-page').hidden = name !== 'profile';
  const mcpPage = $('mcp-page');
  if (mcpPage) mcpPage.hidden = name !== 'mcp';
  const communityPage = $('community-page');
  if (communityPage) communityPage.hidden = name !== 'community';
  $('footer').hidden = name !== 'explore' && name !== 'mcp';

  if (name !== 'explore') {
    state.selected = null;
    $('menu-panel').hidden = true;
    $('menu-panel').classList.remove('mobile-open');
    $('layout').classList.remove('menu-open');
    renderRestaurants();
  }
  if (name === 'favorites') {
    $('fav-tab-venues-btn')?.classList.toggle('active', state.favTab === 'venues');
    $('fav-tab-venues-btn')?.setAttribute('aria-selected', String(state.favTab === 'venues'));
    $('fav-tab-dishes-btn')?.classList.toggle('active', state.favTab === 'dishes');
    $('fav-tab-dishes-btn')?.setAttribute('aria-selected', String(state.favTab === 'dishes'));
    renderFavoritesPage();
  }
  if (name === 'profile') renderProfilePage();
  if (name === 'mcp') {
    renderMcpPage();
    if (window.location.pathname !== '/mcp') {
      try { history.pushState(null, '', '/mcp'); } catch {}
    }
  } else if (window.location.pathname === '/mcp') {
    try { history.pushState(null, '', '/'); } catch {}
  }

  document.querySelectorAll('.mobile-tab, .desktop-nav-link').forEach(tab => {
    const active = tab.dataset.tab === name;
    tab.classList.toggle('active', active);
    if (active) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  emit('tab', { name });
}

/* -------------------------------------------------------------
   Restaurant Schedules & Batch Fetching
   ------------------------------------------------------------- */
const LJUBLJANA_WEEKDAY_FORMATTER = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Ljubljana', weekday: 'long' });

function scheduleForToday(hours) {
  if (!hours || !Object.keys(hours).length) return null;
  const weekday = LJUBLJANA_WEEKDAY_FORMATTER.format(new Date()).toLocaleLowerCase();
  const entries = Object.entries(hours).map(([day, value]) => [day.toLocaleLowerCase().replace(/[^a-z]/g, ''), String(value || '').trim()]);
  const exact = entries.find(([day]) => day === weekday);
  const weekend = weekday === 'saturday' ? entries.find(([day]) => day === 'saturday') : weekday === 'sunday' ? entries.find(([day]) => day.includes('sunday')) : null;
  const weekdays = entries.find(([day]) => day.includes('weekday') || day.includes('weekdays') || day.includes('workday'));
  const entry = exact || weekend || ((weekday !== 'saturday' && weekday !== 'sunday') ? weekdays : null);
  return entry?.[1] || null;
}

function restaurantHoursStatus(restaurant) {
  const labels = hoursLabels[state.language] || hoursLabels.en;
  if (loadingHours.has(restaurant.id)) return { status:'checking', schedule:labels.checking };
  if (!Object.hasOwn(restaurantHours, restaurant.id)) return { status:'checking', schedule:labels.checking };
  const schedule = scheduleForToday(restaurantHours[restaurant.id]);
  if (!schedule) return { status:'unknown', schedule:labels.unknown };
  const ranges = [...schedule.matchAll(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/g)];
  if (!ranges.length) {
    const closed = /closed|close|zaprto|zaprta|ne obratuje/i.test(schedule);
    return { status: closed ? 'closed' : 'unknown', schedule: `${labels.today}: ${schedule}` };
  }
  const current = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Ljubljana', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const now = Number(current.find(part => part.type === 'hour')?.value || 0) * 60 + Number(current.find(part => part.type === 'minute')?.value || 0);
  const isOpen = ranges.some(match => {
    const start = Number(match[1]) * 60 + Number(match[2]);
    let end = Number(match[3]) * 60 + Number(match[4]);
    if (end < start) end += 1440;
    return now >= start && now < end;
  });
  const formatted = schedule.replace(/\s*[-–]\s*/g, '–').replace(/\s*,\s*/g, ' · ');
  return { status: isOpen ? 'open' : 'closed', schedule: `${labels.today}: ${formatted}` };
}

async function loadRestaurantHours(restaurants) {
  const pending = restaurants.filter(restaurant => !Object.hasOwn(restaurantHours, restaurant.id) && !loadingHours.has(restaurant.id));
  if (!pending.length) return;
  pending.forEach(restaurant => loadingHours.add(restaurant.id));
  try {
    const ids = pending.map(restaurant => restaurant.id).join(',');
    const response = await fetch(`/api/restaurant-hours?ids=${encodeURIComponent(ids)}`);
    if (!response.ok) throw new Error('hours');
    const data = await response.json();
    for (const item of data.results || []) restaurantHours[item.restaurant_id] = item.opening_hours || {};
  } catch {}
  finally {
    pending.forEach(restaurant => {
      loadingHours.delete(restaurant.id);
      if (!Object.hasOwn(restaurantHours, restaurant.id)) restaurantHours[restaurant.id] = {};
    });
    if (state.searchMode === 'dishes') renderDishesSearch(); else renderRestaurants();
  }
}

/* -------------------------------------------------------------
   Search Box & Modes
   ------------------------------------------------------------- */
function updateSearchClear() {
  const val = $('search-input').value;
  $('search-clear').hidden = !val;
}

$('search-clear').addEventListener('click', () => {
  $('search-input').value = '';
  updateSearchClear();
  $('search-input').focus();
  $('restaurant-scroll-area')?.scrollTo({ top: 0, behavior: 'instant' });
  if (state.searchMode === 'dishes') {
    state.dishResults = [];
    renderDishesSearch();
  } else {
    renderRestaurants();
  }
});

function setSearchMode(mode) {
  state.searchMode = mode;
  $('restaurant-scroll-area')?.scrollTo({ top: 0, behavior: 'instant' });
  $('search-mode-restaurants').classList.toggle('active', mode === 'restaurants');
  $('search-mode-dishes').classList.toggle('active', mode === 'dishes');
  $('search-input').placeholder = mode === 'dishes' ? (dishSearchPlaceholders[state.language] || dishSearchPlaceholders.en) : (restaurantSearchPlaceholders[state.language] || restaurantSearchPlaceholders.en);
  $('search-input').setAttribute('aria-label', $('search-input').placeholder);
  if (mode === 'dishes') handleDishSearch(); else renderRestaurants();
}

$('search-mode-restaurants').addEventListener('click', () => setSearchMode('restaurants'));
$('search-mode-dishes').addEventListener('click', () => setSearchMode('dishes'));

/* -------------------------------------------------------------
   Restaurant & Dish Search Rendering
   ------------------------------------------------------------- */
function renderRestaurants() {
  if (state.searchMode === 'dishes') { renderDishesSearch(); return; }
  const t = tr();
  const host = $('restaurant-list');
  const query = $('search-input').value.trim();
  updateSearchClear();

  const records = state.restaurants
    .map((restaurant, index) => ({ restaurant, index, score: searchScore(restaurant, query) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(item => item.restaurant);

  const shown = records.slice(0, state.visible);
  host.replaceChildren();

  if (!records.length) {
    const empty = document.createElement('div');
    empty.className = 'loading-card';
    empty.textContent = t.noResults;
    host.append(empty);
    $('load-more').hidden = true;
    return;
  }

  shown.forEach((r, index) => {
    const card = document.createElement('div');
    card.className = `restaurant-card${state.selected?.id === r.id ? ' active' : ''}`;
    card.dataset.id = r.id;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.style.animationDelay = `${Math.min(index, 10) * 24}ms`;

    const avatar = document.createElement('span');
    avatar.className = 'restaurant-avatar';
    avatar.textContent = (r.name || '?').trim().slice(0, 1).toLocaleUpperCase();

    const info = document.createElement('span');
    info.className = 'restaurant-info';
    const name = document.createElement('span');
    name.className = 'restaurant-name';
    name.textContent = r.name;
    const address = document.createElement('span');
    address.className = 'restaurant-address';
    address.textContent = displayAddress(r.address, r.city);
    const hours = restaurantHoursStatus(r);
    const schedule = document.createElement('span');
    schedule.className = 'restaurant-hours';
    schedule.textContent = hours.schedule;
    info.append(name, address, schedule);

    const right = document.createElement('span');
    right.className = 'restaurant-right';
    if (r.distance_km != null) {
      const dist = document.createElement('span');
      dist.className = 'distance';
      dist.textContent = formatDistance(r.distance_km);
      right.append(dist);
    }
    const fee = document.createElement('span');
    fee.className = 'fee';
    fee.textContent = formatMoney(r.additional_fee_eur);
    const openTag = document.createElement('span');
    openTag.className = `open-status ${hours.status}`;
    openTag.textContent = hoursLabels[state.language]?.[hours.status] || hoursLabels.en[hours.status];

    const isFav = isFavorite(r.id);
    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    favBtn.className = `card-fav-btn${isFav ? ' active' : ''}`;
    favBtn.dataset.id = r.id;
    favBtn.setAttribute('aria-label', isFav ? (featureCopy[state.language]?.favBtnActive || 'Guardado') : (featureCopy[state.language]?.favBtn || 'Favorito'));
    favBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>';
    favBtn.addEventListener('click', e => { e.stopPropagation(); toggleFavorite(r); });

    right.append(fee, openTag, favBtn);
    card.append(avatar, info, right);

    card.addEventListener('click', () => openRestaurant(r));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRestaurant(r); } });
    host.append(card);
  });

  $('load-more').hidden = records.length <= state.visible;
  void loadRestaurantHours(shown);
  emit('restaurants-rendered', { restaurants: shown });
}

function handleDishSearch() {
  updateSearchClear();
  const query = $('search-input').value.trim();
  if (!query) {
    state.dishResults = [];
    state.isSearchingDishes = false;
    renderDishesSearch();
    return;
  }
  clearTimeout(dishSearchTimer);
  dishSearchTimer = setTimeout(async () => {
    state.isSearchingDishes = true;
    renderDishesSearch();
    try {
      const currentCity = state.restaurants.find(r => r.city)?.city || 'Ljubljana';
      const response = await fetch(`/api/dishes?query=${encodeURIComponent(query)}&city=${encodeURIComponent(currentCity)}`);
      if (!response.ok) throw new Error('dishes');
      const data = await response.json();
      state.dishResults = data.results || [];
    } catch {
      state.dishResults = [];
    } finally {
      state.isSearchingDishes = false;
      renderDishesSearch();
    }
  }, 300);
}

function renderDishesSearch() {
  const t = tr();
  const host = $('restaurant-list');
  const query = $('search-input').value.trim();
  $('load-more').hidden = true;
  host.replaceChildren();

  if (!query) {
    const hint = document.createElement('div');
    hint.className = 'loading-card';
    hint.textContent = t.searchDishPrompt;
    host.append(hint);
    return;
  }
  if (state.isSearchingDishes) {
    const loading = document.createElement('div');
    loading.className = 'loading-card';
    loading.innerHTML = `${BONBON_SPINNER_HTML}<span>${t.loadingDishes}</span>`;
    host.append(loading);
    return;
  }
  if (!state.dishResults.length) {
    const empty = document.createElement('div');
    empty.className = 'loading-card';
    empty.textContent = t.noDishResults;
    host.append(empty);
    return;
  }

  const restaurantsToLoadHours = [];
  state.dishResults.forEach((item, index) => {
    const r = item.restaurant;
    const dish = item.dish;
    restaurantsToLoadHours.push(r);

    const card = document.createElement('div');
    card.className = `restaurant-card${state.selected?.id === r.id ? ' active' : ''}`;
    card.dataset.id = r.id;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.style.animationDelay = `${Math.min(index, 10) * 24}ms`;

    const avatar = document.createElement('span');
    avatar.className = 'restaurant-avatar';
    avatar.textContent = (r.name || '?').trim().slice(0, 1).toLocaleUpperCase();

    const info = document.createElement('span');
    info.className = 'restaurant-info';
    const name = document.createElement('span');
    name.className = 'restaurant-name';
    name.textContent = r.name;
    const address = document.createElement('span');
    address.className = 'restaurant-address';
    address.textContent = displayAddress(r.address, r.city);
    const dishTag = document.createElement('span');
    dishTag.className = 'dish-match-badge';
    dishTag.textContent = dish.name;
    const hours = restaurantHoursStatus(r);
    const schedule = document.createElement('span');
    schedule.className = 'restaurant-hours';
    schedule.textContent = hours.schedule;
    info.append(name, address, dishTag, schedule);

    const right = document.createElement('span');
    right.className = 'restaurant-right';
    if (r.distance_km != null) {
      const dist = document.createElement('span');
      dist.className = 'distance';
      dist.textContent = formatDistance(r.distance_km);
      right.append(dist);
    }
    const fee = document.createElement('span');
    fee.className = 'fee';
    fee.textContent = formatMoney(r.additional_fee_eur);
    const openTag = document.createElement('span');
    openTag.className = `open-status ${hours.status}`;
    openTag.textContent = hoursLabels[state.language]?.[hours.status] || hoursLabels.en[hours.status];

    const isFav = isFavorite(r.id);
    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    favBtn.className = `card-fav-btn${isFav ? ' active' : ''}`;
    favBtn.dataset.id = r.id;
    favBtn.setAttribute('aria-label', isFav ? (featureCopy[state.language]?.favBtnActive || 'Guardado') : (featureCopy[state.language]?.favBtn || 'Favorito'));
    favBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>';
    favBtn.addEventListener('click', e => { e.stopPropagation(); toggleFavorite(r); });

    right.append(fee, openTag, favBtn);
    card.append(avatar, info, right);

    card.addEventListener('click', () => openRestaurant(r));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openRestaurant(r); } });
    host.append(card);
  });
  void loadRestaurantHours(restaurantsToLoadHours);
}

/* -------------------------------------------------------------
   Load Restaurants (Default Proximity Sorted)
   ------------------------------------------------------------- */
async function loadRestaurants() {
  $('restaurant-list').innerHTML = `<div class="loading-card">${BONBON_SPINNER_HTML}<span>${tr().loading}</span></div>`;
  const params = new URLSearchParams({ limit: '500' });
  if (state.location) {
    params.set('lat', state.location.latitude);
    params.set('lon', state.location.longitude);
  }
  try {
    const response = await fetch(`/api/restaurants?${params}`);
    if (!response.ok) throw new Error('restaurants');
    const data = await response.json();
    state.restaurants = data.results || [];
    state.visible = 15;
    renderDrawCities();
    if (state.location) {
      const nearest = state.restaurants.find(r => r.city);
      state.locationLabel = nearest?.distance_km != null && nearest.distance_km < 20 ? nearest.city : nearbyLabels[state.language];
    }
    if (state.searchMode === 'dishes') renderDishesSearch(); else renderRestaurants();
  } catch {
    showToast(tr().error);
    $('restaurant-list').innerHTML = `<div class="loading-card">${tr().error}</div>`;
  }
}

/* -------------------------------------------------------------
   Draw Feature
   ------------------------------------------------------------- */
function renderDrawCities() {
  const select = $('draw-city');
  const selected = select.value;
  const feature = featureCopy[state.language] || featureCopy.en;
  select.replaceChildren(new Option(feature.anyCity, ''));
  [...new Set(state.restaurants.map(restaurant => restaurant.city).filter(Boolean))].sort((a, b) => a.localeCompare(b)).forEach(city => select.add(new Option(city, city)));
  select.value = selected;
}

async function submitDraw(event) {
  event.preventDefault();
  const feature = featureCopy[state.language] || featureCopy.en;
  const button = $('draw-submit');
  const label = $('draw-submit-label');
  const resultHost = $('draw-result');
  const params = new URLSearchParams({ mode: new FormData($('draw-form')).get('draw-mode') || 'restaurant' });
  const city = $('draw-city').value;
  const category = $('draw-category').value;
  const price = $('draw-price').value.trim();
  if (city) params.set('city', city);
  if (category) params.set('category', category);
  if (price) params.set('max_price_eur', price.replace(',', '.'));

  button.disabled = true;
  label.textContent = feature.searching;
  resultHost.hidden = false;
  resultHost.className = 'draw-result is-loading';
  resultHost.innerHTML = `<div class="loading-card" style="justify-content:center;background:transparent;border:0;padding:24px 0;">${BONBON_SPINNER_HTML}<span>${feature.searching}</span></div>`;

  try {
    const response = await fetch(`/api/draw?${params}`);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'draw');
    if (!payload.result) {
      resultHost.className = 'draw-result is-empty';
      resultHost.textContent = payload.sampled ? drawNoSampleLabel[state.language](payload.candidates_scanned) : feature.noResult;
      return;
    }
    const restaurant = payload.result.restaurant;
    const dish = payload.result.dish;
    const card = document.createElement('article');
    card.className = 'draw-card';
    const kicker = document.createElement('span');
    kicker.className = 'page-eyebrow';
    kicker.textContent = dish ? feature.resultDish : feature.resultRestaurant;
    const title = document.createElement('h2');
    title.textContent = dish ? dish.name : restaurant.name;

    if (dish) {
      const translations = await translatedText([dish.name]);
      const translated = translations.results?.find(item => item.original === dish.name)?.translated;
      if (translated && translated !== dish.name) title.textContent = translated;
    }

    const detail = document.createElement('p');
    detail.textContent = dish ? `${restaurant.name} · ${displayAddress(restaurant.address, restaurant.city)}` : displayAddress(restaurant.address, restaurant.city);
    if (payload.sampled) {
      const note = document.createElement('p');
      note.className = 'draw-sample-note';
      note.textContent = drawSampleLabel[state.language](payload.candidates_scanned, payload.candidate_total);
      card.append(kicker, title, detail, note);
    } else {
      card.append(kicker, title, detail);
    }
    const meta = document.createElement('span');
    meta.className = 'draw-card-fee';
    meta.textContent = formatMoney(restaurant.additional_fee_eur);
    const open = document.createElement('button');
    open.type = 'button';
    open.className = 'draw-open';
    open.textContent = feature.openMenu;
    open.addEventListener('click', () => {
      switchTab('explore');
      openRestaurant(restaurant);
    });
    card.append(meta, open);
    resultHost.replaceChildren(card);
    resultHost.className = 'draw-result';
    emit('draw-result', { restaurant, dish, card });
  } catch {
    resultHost.className = 'draw-result is-empty';
    resultHost.textContent = feature.drawError;
  } finally {
    button.disabled = false;
    label.textContent = feature.draw;
  }
}

/* -------------------------------------------------------------
   Translation Service
   ------------------------------------------------------------- */
function categoryClass(category) {
  const c = (category || '').toLocaleLowerCase();
  if (c.includes('fish')) return 'fish';
  if (c.includes('meatless')) return 'none';
  if (c.includes('meat')) return 'meat';
  return '';
}

const detailLabels = {
  pt: { useBoni:'Usar boni', site:'Site oficial', back:'Restaurantes', openApp:'Abrir na app', officialSite:'Ver no site oficial', copyMenu:'Copiar menu', menuCopied:'Menu copiado!', copyFailed:'Não foi possível copiar.' },
  en: { useBoni:'Use boni', site:'Official site', back:'Restaurants', openApp:'Open in app', officialSite:'View on the official website', copyMenu:'Copy menu', menuCopied:'Menu copied!', copyFailed:'Could not copy.' },
  es: { useBoni:'Usar boni', site:'Web oficial', back:'Restaurantes', openApp:'Abrir en la app', officialSite:'Ver en la web oficial', copyMenu:'Copiar menú', menuCopied:'¡Menú copiado!', copyFailed:'No se pudo copiar.' },
  de: { useBoni:'Boni nutzen', site:'Offizielle Website', back:'Restaurants', openApp:'In der App öffnen', officialSite:'Auf der offiziellen Website ansehen', copyMenu:'Menü kopieren', menuCopied:'Menü kopiert!', copyFailed:'Kopieren nicht möglich.' },
  it: { useBoni:'Usa boni', site:'Sito ufficiale', back:'Ristoranti', openApp:'Apri nell’app', officialSite:'Vedi sul sito ufficiale', copyMenu:'Copia menu', menuCopied:'Menu copiato!', copyFailed:'Impossibile copiare.' },
  fr: { useBoni:'Utiliser les boni', site:'Site officiel', back:'Restaurants', openApp:'Ouvrir dans l’app', officialSite:'Voir sur le site officiel', copyMenu:'Copier le menu', menuCopied:'Menu copié !', copyFailed:'Copie impossible.' },
  ca: { useBoni:'Usa boni', site:'Web oficial', back:'Restaurants', openApp:'Obre a l’app', officialSite:'Veure al web oficial', copyMenu:'Copia el menú', menuCopied:'Menú copiat!', copyFailed:'No s’ha pogut copiar.' },
};
const dl = () => detailLabels[state.language] || detailLabels.en;

// Official Študentska prehrana apps register the `studentska://` scheme but ignore the
// path, so a restaurant page cannot be opened directly. `studentska://widget` (iOS) and
// the WIDGET=1 extra (Android, SplashActivity) open the identification screen used to
// pay with boni at the till, which is the useful action while at a restaurant.
const OFFICIAL_APP = {
  android: 'com.margento.studentskaprehrana',
  ios: 'https://apps.apple.com/app/id1398305066',
  iosUseBoni: 'studentska://widget',
};
function appPlatform() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
  return null;
}
function officialAppLink(restaurant) {
  const platform = appPlatform();
  if (platform === 'android') {
    const fallback = encodeURIComponent(`https://play.google.com/store/apps/details?id=${OFFICIAL_APP.android}`);
    return `intent://widget#Intent;scheme=studentska;package=${OFFICIAL_APP.android};i.WIDGET=1;S.browser_fallback_url=${fallback};end`;
  }
  if (platform === 'ios') return OFFICIAL_APP.iosUseBoni;
  return restaurant.source_url;
}

// iOS has no fallback for custom schemes: if the app did not take over, open the App Store.
function openOfficialAppOnIos(event) {
  if (appPlatform() !== 'ios') return;
  event.preventDefault();
  let left = false;
  const onHide = () => { if (document.hidden) left = true; };
  document.addEventListener('visibilitychange', onHide);
  window.location.href = OFFICIAL_APP.iosUseBoni;
  setTimeout(() => {
    document.removeEventListener('visibilitychange', onHide);
    if (!left && !document.hidden) window.location.href = OFFICIAL_APP.ios;
  }, 1600);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.append(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch {}
    area.remove();
    return ok;
  }
}

async function copyMenu() {
  const restaurant = state.selected;
  const dishes = state.currentMenuDishes || [];
  if (!restaurant) return;
  if (!dishes.length) { showToast(tr().noMenu); return; }
  const result = await translatedText(dishes.flatMap(d => [d.name, ...(d.sides || [])]));
  const names = new Map((result.results || []).map(item => [item.original, item.translated || item.original]));
  const name = text => names.get(text) || text;
  const lines = [
    `${restaurant.name} · ${formatDate(state.date || state.today)}`,
    [displayAddress(restaurant.address, restaurant.city), `${tr().fee}: ${formatMoney(restaurant.additional_fee_eur)}`].filter(Boolean).join(' · '),
    '',
  ];
  dishes.forEach((dish, index) => {
    const tags = (dish.categories || []).map(c => tr().categories[c] || c).join(', ');
    lines.push(`${index + 1}. ${name(dish.name)}${tags ? ` (${tags})` : ''}`);
    const sides = (dish.sides || []).filter(Boolean).map(name);
    if (sides.length) lines.push(`   + ${sides.join(', ')}`);
  });
  lines.push('', 'bomboni.');
  showToast(await copyText(lines.join('\n')) ? dl().menuCopied : dl().copyFailed);
}

const translatingLabels = { pt:'A traduzir…', en:'Translating…', es:'Traduciendo…', de:'Wird übersetzt…', it:'Traduzione…', fr:'Traduction…', ca:'Traduint…' };

async function translatedText(texts) {
  const unique = [...new Set(texts)];
  const keyFor = text => `${state.language}::${text}`;
  const cached = unique.filter(text => state.translationCache[keyFor(text)]).map(original => ({ original, translated: state.translationCache[keyFor(original)], is_translated: true }));
  const missing = unique.filter(text => !state.translationCache[keyFor(text)]);
  if (!missing.length) return { results: cached };
  try {
    const r = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: state.language, texts: missing.slice(0, 120) })
    });
    if (!r.ok) throw new Error('translation');
    const data = await r.json();
    for (const item of data.results || []) {
      if (item.is_translated) state.translationCache[keyFor(item.original)] = item.translated;
    }
    const cacheKeys = Object.keys(state.translationCache);
    if (cacheKeys.length > 1000) cacheKeys.slice(0, cacheKeys.length - 1000).forEach(key => delete state.translationCache[key]);
    localStorage.setItem('bomboni-translations', JSON.stringify(state.translationCache));
    return { results: [...cached, ...(data.results || []), ...missing.slice(120).map(original => ({ original, translated: original, is_translated: false }))] };
  } catch {
    return { results: [...cached, ...missing.map(original => ({ original, translated: original, is_translated: false }))] };
  }
}

/* -------------------------------------------------------------
   Menu Display & Dish Actions
   ------------------------------------------------------------- */
async function openRestaurant(restaurant) {
  state.selected = restaurant;
  state.date = state.today;
  state.currentMenuDishes = [];
  const reviewBox = $('venue-review-box');
  if (reviewBox) reviewBox.hidden = true;
  const mealPicker = $('venue-meal-picker');
  if (mealPicker) mealPicker.hidden = true;

  updateFavoriteButtons(restaurant.id);
  updateVenueReviewUI();
  updateVenueMealLogUI();
  if (state.searchMode === 'dishes') renderDishesSearch(); else renderRestaurants();

  $('menu-panel').hidden = false;
  $('menu-panel').classList.add('mobile-open');
  $('menu-content').hidden = false;
  $('layout').classList.add('menu-open');
  $('dish-list').innerHTML = `<div class="loading-card" style="justify-content:center;">${BONBON_SPINNER_HTML}<span>${tr().loading}</span></div>`;

  if (window.innerWidth <= 1000 && window.innerWidth > 760) {
    requestAnimationFrame(() => $('menu-panel').scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  $('venue-name').textContent = restaurant.name;
  $('venue-address').textContent = displayAddress(restaurant.address, restaurant.city);
  $('venue-avatar').textContent = (restaurant.name || '?').trim().slice(0, 1).toLocaleUpperCase();
  $('venue-fee').textContent = `${tr().fee}: ${formatMoney(restaurant.additional_fee_eur)}`;
  $('source-link').href = officialAppLink(restaurant);
  // The app scheme replaces the page; only the website opens in a new tab.
  if (appPlatform()) $('source-link').removeAttribute('target'); else $('source-link').target = '_blank';
  $('official-site-link').href = restaurant.source_url;
  // On desktop the top button already opens the website.
  $('official-site-link').hidden = !restaurant.source_url || !appPlatform();
  $('source-link').hidden = !appPlatform() && !restaurant.source_url;
  // A history entry lets the system back button / gesture close the restaurant.
  if (history.state?.bomboniRestaurant) history.replaceState({ bomboniRestaurant: restaurant.id }, '');
  else history.pushState({ bomboniRestaurant: restaurant.id }, '');
  emit('restaurant-opened', { restaurant });

  await loadMenu(restaurant.id, state.date, restaurant.name);
}

function renderMenuDishes(menu, requestId, id) {
  state.currentMenuDishes = menu.dishes || [];
  $('menu-title').textContent = formatDate(menu.date);
  state.date = menu.date;
  const host = $('dish-list');
  host.replaceChildren();

  if (!menu.dishes?.length) {
    const no = document.createElement('div');
    no.className = 'loading-card';
    no.textContent = tr().noMenu;
    host.append(no);
    return;
  }

  const feature = featureCopy[state.language] || featureCopy.en;
  const dishNodes = [];
  menu.dishes.forEach((dish, index) => {
    const card = document.createElement('article');
    card.className = 'dish-card';
    card.dataset.dish = dish.name;

    const number = document.createElement('span');
    number.className = 'dish-number';
    number.textContent = dish.number ?? String(index + 1).padStart(2, '0');

    const body = document.createElement('div');
    const titleRow = document.createElement('div');
    titleRow.className = 'dish-title-row';

    const title = document.createElement('div');
    title.className = 'dish-name';
    const keyFor = text => `${state.language}::${text}`;
    const syncTranslated = state.translationCache[keyFor(dish.name)];
    title.textContent = syncTranslated || dish.name;

    // Action buttons inside dish card
    const dishActions = document.createElement('div');
    dishActions.className = 'dish-actions';

    // 1. Dish favorite button
    const isDishFav = isFavoriteDish(id, dish.name);
    const dishFavBtn = document.createElement('button');
    dishFavBtn.type = 'button';
    dishFavBtn.className = `dish-action-btn dish-fav-btn${isDishFav ? ' active' : ''}`;
    dishFavBtn.dataset.dishKey = dishKey(id, dish.name);
    dishFavBtn.title = isDishFav ? (feature.dishFavRemoveTitle || 'Remover dos favoritos') : (feature.dishFavAddTitle || 'Guardar prato nos favoritos');
    dishFavBtn.setAttribute('aria-label', dishFavBtn.title);
    dishFavBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>';
    dishFavBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavoriteDish(dish, state.selected || { id, name: $('venue-name').textContent });
    });

    // 2. Direct dish meal logging button with toggle
    const isLogged = isDishLoggedToday(id, dish.name);
    const dishLogBtn = document.createElement('button');
    dishLogBtn.type = 'button';
    dishLogBtn.className = `dish-action-btn dish-log-btn${isLogged ? ' active' : ''}`;
    dishLogBtn.title = isLogged ? (feature.dishLogUnmarkTitle || 'Desmarcar refeição de hoje') : (feature.dishLogMarkTitle || 'Registar que comi este prato hoje');
    dishLogBtn.setAttribute('aria-label', dishLogBtn.title);
    dishLogBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
    dishLogBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentlyLogged = isDishLoggedToday(id, dish.name);
      if (currentlyLogged) {
        let meals = getMeals();
        const targetDate = state.date || state.today;
        meals = meals.filter(m => !(m.restaurantId === id && m.dishName === dish.name && m.date === targetDate));
        saveMeals(meals);
        dishLogBtn.classList.remove('active');
        dishLogBtn.title = feature.dishLogMarkTitle || 'Registar que comi este prato hoje';
        dishLogBtn.setAttribute('aria-label', dishLogBtn.title);
        showToast(feature.mealUnlogged || 'Refeição desmarcada do teu histórico.');
      } else {
        logMeal(state.selected || { id, name: $('venue-name').textContent }, dish.name, dish.categories?.[0] || 'Mixed', state.date);
        dishLogBtn.classList.add('active');
        dishLogBtn.title = feature.dishLogUnmarkTitle || 'Desmarcar refeição de hoje';
        dishLogBtn.setAttribute('aria-label', dishLogBtn.title);
        showToast(feature.mealLogged || 'Refeição registada no teu histórico!');
      }
      updateVenueMealLogUI();
      if (state.tab === 'profile') {
        renderProfilePage();
        renderMiniCalendar();
      }
    });

    // 3. Image search link
    const imageSearch = document.createElement('a');
    imageSearch.className = 'dish-action-btn image-search-button';
    imageSearch.href = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(dish.name)}`;
    imageSearch.target = '_blank';
    imageSearch.rel = 'noopener noreferrer';
    imageSearch.setAttribute('aria-label', `${imageSearchLabels[state.language]} ${dish.name}`);
    imageSearch.title = `${imageSearchLabels[state.language]} ${dish.name}`;
    imageSearch.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"/><circle cx="9" cy="10" r="1.5"/><path d="m5 17 4.5-4.5 3 3L15 13l5 5"/><circle cx="18" cy="6" r="3.2" class="search-lens"/><path d="m20.4 8.4 2 2" class="search-lens"/></svg>';

    dishActions.append(dishFavBtn, dishLogBtn, imageSearch);
    titleRow.append(title);
    body.append(titleRow);

    const originalNode = document.createElement('div');
    if (syncTranslated && syncTranslated.toLocaleLowerCase() !== dish.name.toLocaleLowerCase()) {
      originalNode.className = 'dish-original';
      originalNode.textContent = dish.name;
      body.append(originalNode);
    } else if (state.language !== 'sl') {
      originalNode.className = 'dish-status is-pending';
      originalNode.textContent = translatingLabels[state.language] || translatingLabels.en;
      body.append(originalNode);
    }

    const sides = (dish.sides || []).filter(Boolean);
    const sideNode = document.createElement('div');
    if (sides.length) {
      const sideNames = sides.map(s => state.translationCache[keyFor(s)] || s);
      sideNode.className = 'dish-sides';
      sideNode.textContent = `${sideNames.join(' · ')}${sideNames.some((n, i) => n !== sides[i]) ? `  /  ${sides.join(' · ')}` : ''}`;
      body.append(sideNode);
    }

    if (dish.categories?.length) {
      const tags = document.createElement('div');
      tags.className = 'dish-tags';
      dish.categories.forEach(category => {
        const tag = document.createElement('span');
        tag.className = `dish-tag ${categoryClass(category)}`;
        tag.textContent = tr().categories[category] || category;
        tags.append(tag);
      });
      body.append(tags);
    }

    const footer = document.createElement('div');
    footer.className = 'dish-footer';
    footer.append(dishActions);
    body.append(footer);
    card.append(number, body);
    host.append(card);
    dishNodes.push({ dish, title, originalNode, sideNode, sides });
  });
  emit('menu-rendered', { restaurantId: id, dishes: menu.dishes });

  // Background progressive machine translation
  const dishTexts = menu.dishes.flatMap(d => [d.name, ...(d.sides || [])]);
  translatedText(dishTexts).then(result => {
    if (requestId !== activeMenuRequest || state.selected?.id !== id) return;
    const map = new Map((result.results || []).map(item => [item.original, item]));
    dishNodes.forEach(({ dish, title, originalNode, sideNode, sides }) => {
      const translated = map.get(dish.name);
      if (translated?.is_translated && translated.translated) {
        title.textContent = translated.translated;
        if (translated.translated.toLocaleLowerCase() !== dish.name.toLocaleLowerCase()) {
          originalNode.className = 'dish-original';
          originalNode.textContent = dish.name;
        } else if (originalNode.classList.contains('is-pending')) {
          originalNode.remove();
        }
      } else if (originalNode.classList.contains('is-pending')) {
        originalNode.className = 'dish-status';
        originalNode.textContent = tr().translationMissing;
      }
      if (sides.length) {
        const sideNames = sides.map(s => map.get(s)?.translated || s);
        sideNode.textContent = `${sideNames.join(' · ')}${sideNames.some((n, i) => n !== sides[i]) ? `  /  ${sides.join(' · ')}` : ''}`;
      }
    });
  }).catch(() => {});
}

async function loadMenu(id, menuDate, restaurantName) {
  const requestId = ++activeMenuRequest;
  state.date = menuDate;
  const cacheKey = `${id}::${menuDate}`;
  const cached = menuCache.get(cacheKey);
  if (cached) {
    renderMenuDishes(cached, requestId, id);
    return;
  }
  $('dish-list').innerHTML = `<div class="loading-card" style="justify-content:center;">${BONBON_SPINNER_HTML}<span>${tr().loading}</span></div>`;
  try {
    const nameParam = encodeURIComponent(restaurantName || state.selected?.name || '');
    const response = await fetch(`/api/restaurants/${encodeURIComponent(id)}/menu?date=${encodeURIComponent(menuDate)}&name=${nameParam}`);
    if (!response.ok) throw new Error('menu');
    const menu = await response.json();
    if (requestId !== activeMenuRequest || state.selected?.id !== id) return;
    menuCache.set(cacheKey, menu);
    renderMenuDishes(menu, requestId, id);
  } catch {
    if (requestId === activeMenuRequest) $('dish-list').innerHTML = `<div class="loading-card">${tr().error}</div>`;
  }
}

function changeMenuDate(offset) {
  if (!state.selected || !state.date) return;
  const next = new Date(`${state.date}T12:00:00`);
  next.setDate(next.getDate() + offset);
  loadMenu(state.selected.id, next.toISOString().slice(0, 10), state.selected.name);
}

/* -------------------------------------------------------------
   Meal Picker in Venue Menu (With Rating & Skip Step)
   ------------------------------------------------------------- */
function openVenueMealPicker() {
  if (!state.selected) return;
  const picker = $('venue-meal-picker');
  picker.hidden = !picker.hidden;
  if (picker.hidden) return;

  const feature = featureCopy[state.language] || featureCopy.en;

  // Reset to Step 1
  $('meal-picker-step-dish').hidden = false;
  $('meal-picker-step-rating').hidden = true;
  setPickerStars(5);

  const optionsHost = $('meal-picker-options');
  optionsHost.replaceChildren();
  const dishes = state.currentMenuDishes || [];

  if (!dishes.length) {
    const opt = document.createElement('label');
    opt.className = 'meal-picker-option selected';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'picked-meal';
    input.value = 'Menu do dia';
    input.checked = true;
    const span = document.createElement('span');
    span.textContent = feature.mealPickerDailyMenu || 'Menu do dia / Refeição';
    opt.append(input, span);
    optionsHost.append(opt);
    return;
  }

  dishes.forEach((d, idx) => {
    const opt = document.createElement('label');
    opt.className = `meal-picker-option${idx === 0 ? ' selected' : ''}`;
    const translated = state.translationCache[`${state.language}::${d.name}`] || d.name;
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'picked-meal';
    input.value = d.name;
    input.dataset.category = d.categories?.[0] || 'Mixed';
    input.checked = idx === 0;
    const span = document.createElement('span');
    span.textContent = translated;
    opt.append(input, span);
    opt.addEventListener('click', () => {
      document.querySelectorAll('.meal-picker-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
    optionsHost.append(opt);
  });

  const otherOpt = document.createElement('label');
  otherOpt.className = 'meal-picker-option';
  const otherInput = document.createElement('input');
  otherInput.type = 'radio';
  otherInput.name = 'picked-meal';
  otherInput.value = '__other__';
  const otherSpan = document.createElement('span');
  otherSpan.textContent = feature.mealPickerOtherDish || 'Outro prato / Opção livre';
  otherOpt.append(otherInput, otherSpan);
  otherOpt.addEventListener('click', () => {
    document.querySelectorAll('.meal-picker-option').forEach(o => o.classList.remove('selected'));
    otherOpt.classList.add('selected');
  });
  optionsHost.append(otherOpt);
}

$('venue-log-meal-btn')?.addEventListener('click', () => {
  if (!state.selected) return;
  openVenueMealPicker();
});
$('meal-picker-cancel')?.addEventListener('click', () => {
  $('venue-meal-picker').hidden = true;
});

// Proceed to rating prompt after picking dish
$('meal-picker-next')?.addEventListener('click', () => {
  if (!state.selected) return;
  const feature = featureCopy[state.language] || featureCopy.en;
  const selectedRadio = document.querySelector('input[name="picked-meal"]:checked');
  let dishName = selectedRadio?.value || '';
  let category = selectedRadio?.dataset?.category || 'Mixed';
  if (dishName === '__other__') {
    dishName = window.prompt(feature.mealPickerCustomPrompt || 'Qual prato comeste?') || (feature.mealPickerDailyMenu || 'Prato do dia');
  }
  state.pendingPickedDish = { dishName, category };

  // Step 2: Show rating prompt with skip option
  $('meal-picker-step-dish').hidden = true;
  $('meal-picker-step-rating').hidden = false;
});

// Star clicks in meal picker
document.querySelectorAll('#meal-picker-stars .star-btn').forEach(btn => {
  btn.addEventListener('click', () => setPickerStars(Number(btn.dataset.value)));
});

// Skip rating: logs meal only
$('meal-picker-skip')?.addEventListener('click', () => {
  if (!state.selected || !state.pendingPickedDish) return;
  logMeal(state.selected, state.pendingPickedDish.dishName, state.pendingPickedDish.category);
  $('venue-meal-picker').hidden = true;
  state.pendingPickedDish = null;
  showToast(featureCopy[state.language]?.mealLogged || 'Refeição registada no teu histórico!');
});

// Confirm rating: logs meal AND saves review
$('meal-picker-confirm-rate')?.addEventListener('click', () => {
  if (!state.selected || !state.pendingPickedDish) return;
  const feature = featureCopy[state.language] || featureCopy.en;
  logMeal(state.selected, state.pendingPickedDish.dishName, state.pendingPickedDish.category);
  saveReview(state.selected.id, state.pickerRating || 5, '', state.selected);
  $('venue-meal-picker').hidden = true;
  state.pendingPickedDish = null;
  showToast(feature.mealLoggedAndRated || 'Refeição registada e avaliação guardada!');
});

/* -------------------------------------------------------------
   Favorites Page (Sub-tabs: Strictly Venues vs Dishes)
   ------------------------------------------------------------- */
$('fav-tab-venues-btn')?.addEventListener('click', () => {
  state.favTab = 'venues';
  $('fav-tab-venues-btn').classList.add('active');
  $('fav-tab-venues-btn').setAttribute('aria-selected', 'true');
  $('fav-tab-dishes-btn').classList.remove('active');
  $('fav-tab-dishes-btn').setAttribute('aria-selected', 'false');
  renderFavoritesPage();
});

$('fav-tab-dishes-btn')?.addEventListener('click', () => {
  state.favTab = 'dishes';
  $('fav-tab-dishes-btn').classList.add('active');
  $('fav-tab-dishes-btn').setAttribute('aria-selected', 'true');
  $('fav-tab-venues-btn').classList.remove('active');
  $('fav-tab-venues-btn').setAttribute('aria-selected', 'false');
  renderFavoritesPage();
});

function renderFavoritesPage() {
  const feature = featureCopy[state.language] || featureCopy.en;
  const favObj = getFavorites();
  const favList = Object.values(favObj);
  const favDishesObj = getFavoriteDishes();
  const favDishesList = Object.values(favDishesObj).sort((a, b) => b.timestamp - a.timestamp);

  $('fav-count-venues').textContent = String(favList.length);
  $('fav-count-dishes').textContent = String(favDishesList.length);

  const venuesHost = $('favorites-list');
  const dishesHost = $('favorites-dishes-list');
  const empty = $('favorites-empty');

  if (state.favTab === 'venues') {
    dishesHost.hidden = true;
    dishesHost.replaceChildren();
    if (!favList.length) {
      empty.hidden = false;
      $('favorites-empty-title').textContent = feature.favoritesEmptyVenuesTitle || 'Sem restaurantes guardados';
      $('favorites-empty-copy').textContent = feature.favoritesEmptyVenuesCopy || 'Toca no coração de qualquer restaurante para guardá-lo aqui.';
      venuesHost.hidden = true;
      venuesHost.replaceChildren();
      return;
    }
    empty.hidden = true;
    venuesHost.hidden = false;
    venuesHost.replaceChildren();

    favList.forEach((r, index) => {
      const fullRestaurant = state.restaurants.find(item => item.id === r.id) || r;
      const card = document.createElement('div');
      card.className = `restaurant-card${state.selected?.id === r.id ? ' active' : ''}`;
      card.dataset.id = r.id;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.style.animationDelay = `${Math.min(index, 10) * 24}ms`;

      const avatar = document.createElement('span');
      avatar.className = 'restaurant-avatar';
      avatar.textContent = (r.name || '?').trim().slice(0, 1).toLocaleUpperCase();

      const info = document.createElement('span');
      info.className = 'restaurant-info';
      const name = document.createElement('span');
      name.className = 'restaurant-name';
      name.textContent = r.name;
      const address = document.createElement('span');
      address.className = 'restaurant-address';
      address.textContent = displayAddress(r.address, r.city);
      const hours = restaurantHoursStatus(fullRestaurant);
      const schedule = document.createElement('span');
      schedule.className = 'restaurant-hours';
      schedule.textContent = hours.schedule;
      info.append(name, address, schedule);

      const right = document.createElement('span');
      right.className = 'restaurant-right';
      if (fullRestaurant.distance_km != null) {
        const dist = document.createElement('span');
        dist.className = 'distance';
        dist.textContent = formatDistance(fullRestaurant.distance_km);
        right.append(dist);
      }
      const fee = document.createElement('span');
      fee.className = 'fee';
      fee.textContent = formatMoney(r.additional_fee_eur);
      const openTag = document.createElement('span');
      openTag.className = `open-status ${hours.status}`;
      openTag.textContent = hoursLabels[state.language]?.[hours.status] || hoursLabels.en[hours.status];

      const favBtn = document.createElement('button');
      favBtn.type = 'button';
      favBtn.className = 'card-fav-btn active';
      favBtn.dataset.id = r.id;
      favBtn.setAttribute('aria-label', feature.favBtnActive || 'Guardado');
      favBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>';
      favBtn.addEventListener('click', e => { e.stopPropagation(); toggleFavorite(fullRestaurant); });

      right.append(fee, openTag, favBtn);
      card.append(avatar, info, right);
      card.addEventListener('click', () => { switchTab('explore'); openRestaurant(fullRestaurant); });
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchTab('explore'); openRestaurant(fullRestaurant); } });
      venuesHost.append(card);
    });
    void loadRestaurantHours(favList);
  } else {
    // Strictly dishes only
    venuesHost.hidden = true;
    venuesHost.replaceChildren();
    if (!favDishesList.length) {
      empty.hidden = false;
      $('favorites-empty-title').textContent = feature.favoritesEmptyDishesTitle || 'Sem pratos guardados';
      $('favorites-empty-copy').textContent = feature.favoritesEmptyDishesCopy || 'Toca no coração de qualquer prato no menu para guardá-lo aqui.';
      dishesHost.hidden = true;
      dishesHost.replaceChildren();
      return;
    }
    empty.hidden = true;
    dishesHost.hidden = false;
    dishesHost.replaceChildren();

    favDishesList.forEach(dishItem => {
      const card = document.createElement('article');
      card.className = 'dish-card';
      const number = document.createElement('span');
      number.className = 'dish-number';
      number.textContent = '★';

      const body = document.createElement('div');
      const titleRow = document.createElement('div');
      titleRow.className = 'dish-title-row';

      const title = document.createElement('div');
      title.className = 'dish-name';
      const keyFor = text => `${state.language}::${text}`;
      const syncTranslated = state.translationCache[keyFor(dishItem.dishName)];
      title.textContent = syncTranslated || dishItem.dishName;

      const actions = document.createElement('div');
      actions.className = 'dish-actions';

      const favBtn = document.createElement('button');
      favBtn.type = 'button';
      favBtn.className = 'dish-action-btn dish-fav-btn active';
      favBtn.title = feature.dishFavRemoveTitle || 'Remover dos favoritos';
      favBtn.setAttribute('aria-label', feature.dishFavRemoveTitle || 'Remover dos favoritos');
      favBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>';
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavoriteDish({ name: dishItem.dishName }, { id: dishItem.restaurantId });
      });

      const imageSearch = document.createElement('a');
      imageSearch.className = 'dish-action-btn image-search-button';
      imageSearch.href = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(dishItem.dishName)}`;
      imageSearch.target = '_blank';
      imageSearch.rel = 'noopener noreferrer';
      imageSearch.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"/><circle cx="9" cy="10" r="1.5"/><path d="m5 17 4.5-4.5 3 3L15 13l5 5"/><circle cx="18" cy="6" r="3.2" class="search-lens"/><path d="m20.4 8.4 2 2" class="search-lens"/></svg>';

      actions.append(favBtn, imageSearch);
      titleRow.append(title, actions);
      body.append(titleRow);

      const venueLine = document.createElement('div');
      venueLine.className = 'dish-original';
      venueLine.textContent = `${dishItem.restaurantName} · ${displayAddress(dishItem.restaurantAddress, dishItem.restaurantCity)}`;
      body.append(venueLine);

      card.append(number, body);
      card.addEventListener('click', () => {
        const fullRestaurant = state.restaurants.find(item => item.id === dishItem.restaurantId) || {
          id: dishItem.restaurantId,
          name: dishItem.restaurantName,
          address: dishItem.restaurantAddress,
          city: dishItem.restaurantCity,
          additional_fee_eur: dishItem.fee
        };
        switchTab('explore');
        openRestaurant(fullRestaurant);
      });
      dishesHost.append(card);
    });
  }
}

/* -------------------------------------------------------------
   User Authentication & Profile Account
   ------------------------------------------------------------- */
let authMode = 'login';
let pendingRegistration = null;

function setAuthMode(mode) {
  authMode = mode;
  pendingRegistration = null;
  const toggleEl = $('auth-toggle');
  if (toggleEl) toggleEl.hidden = false;
  const formEl = $('auth-form');
  if (formEl) formEl.hidden = false;
  const verifyFormEl = $('auth-verify-form');
  if (verifyFormEl) verifyFormEl.hidden = true;
  $('auth-tab-login')?.classList.toggle('active', mode === 'login');
  $('auth-tab-register')?.classList.toggle('active', mode === 'register');
  const usernameWrap = $('auth-username-wrap');
  if (usernameWrap) usernameWrap.hidden = mode !== 'register';
  const feature = featureCopy[state.language] || featureCopy.en;
  const submitBtn = $('auth-submit-btn');
  if (submitBtn) submitBtn.textContent = mode === 'register' ? (feature.registerTab || 'Criar conta') : (feature.loginTab || 'Entrar');
  const errorEl = $('auth-error');
  if (errorEl) { errorEl.hidden = true; errorEl.textContent = ''; }
  const verifyErrorEl = $('auth-verify-error');
  if (verifyErrorEl) { verifyErrorEl.hidden = true; verifyErrorEl.textContent = ''; }
}

$('auth-tab-login')?.addEventListener('click', () => setAuthMode('login'));
$('auth-tab-register')?.addEventListener('click', () => setAuthMode('register'));

$('auth-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errorEl = $('auth-error');
  if (errorEl) errorEl.hidden = true;
  const email = $('auth-email').value.trim().toLowerCase();
  const password = $('auth-password').value;
  const users = getUsers();
  const feature = featureCopy[state.language] || featureCopy.en;

  if (authMode === 'register') {
    const username = $('auth-username').value.trim().replace(/^@/, '');
    if (username.length < 3) {
      if (errorEl) { errorEl.textContent = feature.authUsernameMin || 'Nome de utilizador deve ter pelo menos 3 caracteres.'; errorEl.hidden = false; }
      return;
    }
    if (password.length < 6) {
      if (errorEl) { errorEl.textContent = feature.authPasswordMin || 'A palavra-passe deve ter pelo menos 6 caracteres.'; errorEl.hidden = false; }
      return;
    }
    if (users[email]) {
      if (errorEl) { errorEl.textContent = feature.authEmailExists || 'Este email já está registado.'; errorEl.hidden = false; }
      return;
    }
    const userWithSameName = getUserByUsername(username);
    if (userWithSameName) {
      if (errorEl) { errorEl.textContent = feature.authUsernameExists || 'Este nome de utilizador já existe.'; errorEl.hidden = false; }
      return;
    }

    let code = String(Math.floor(1000 + Math.random() * 9000));
    try {
      const res = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.code) code = data.code;
      }
    } catch {}

    pendingRegistration = { username, email, password, code, timestamp: Date.now() };

    const formEl = $('auth-form');
    if (formEl) formEl.hidden = true;
    const toggleEl = $('auth-toggle');
    if (toggleEl) toggleEl.hidden = true;
    const verifyFormEl = $('auth-verify-form');
    if (verifyFormEl) verifyFormEl.hidden = false;
    const displayEl = $('auth-verify-email-display');
    if (displayEl) displayEl.textContent = email;
    const codeInput = $('auth-verify-code');
    if (codeInput) { codeInput.value = ''; codeInput.focus(); }
    const verifyErr = $('auth-verify-error');
    if (verifyErr) verifyErr.hidden = true;

    showToast(`${feature.authCodeSentToast || 'Código de verificação enviado para'} ${email}`);
  } else {
    const user = users[email] || getUserByUsername(email);
    if (!user || user.password !== password) {
      if (errorEl) { errorEl.textContent = feature.authInvalidCreds || 'Email ou palavra-passe incorretos.'; errorEl.hidden = false; }
      return;
    }
    setCurrentUser({ username: user.username, email: user.email });
    showToast(feature.loginSuccess || 'Sessão iniciada com sucesso!');
    updateProfileAuthUI();
    renderProfilePage();
  }
});

$('auth-verify-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const errorEl = $('auth-verify-error');
  if (errorEl) errorEl.hidden = true;
  const typedCode = $('auth-verify-code')?.value.trim();
  const feature = featureCopy[state.language] || featureCopy.en;

  if (!pendingRegistration || typedCode !== pendingRegistration.code) {
    if (errorEl) { errorEl.textContent = feature.authInvalidCodeError || 'Código de verificação incorreto.'; errorEl.hidden = false; }
    return;
  }

  const users = getUsers();
  const newUser = {
    username: pendingRegistration.username,
    email: pendingRegistration.email,
    password: pendingRegistration.password,
    emailVerified: true,
    createdAt: Date.now()
  };
  users[pendingRegistration.email] = newUser;
  saveUsers(users);
  setCurrentUser({ username: pendingRegistration.username, email: pendingRegistration.email });
  pendingRegistration = null;

  showToast(feature.registerSuccess || 'Conta criada com sucesso!');
  updateProfileAuthUI();
  renderProfilePage();
});

$('auth-verify-resend-btn')?.addEventListener('click', async () => {
  if (!pendingRegistration) return;
  const feature = featureCopy[state.language] || featureCopy.en;
  let newCode = String(Math.floor(1000 + Math.random() * 9000));
  try {
    const res = await fetch('/api/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: pendingRegistration.email })
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.code) newCode = data.code;
    }
  } catch {}

  pendingRegistration.code = newCode;
  const codeInput = $('auth-verify-code');
  if (codeInput) { codeInput.value = ''; codeInput.focus(); }
  const verifyErr = $('auth-verify-error');
  if (verifyErr) verifyErr.hidden = true;
  showToast(`${feature.authCodeResentToast || 'Novo código de verificação enviado para'} ${pendingRegistration.email}`);
});

$('auth-verify-back-btn')?.addEventListener('click', () => {
  setAuthMode('register');
});

$('profile-logout-btn')?.addEventListener('click', () => {
  setCurrentUser(null);
  showToast(featureCopy[state.language]?.logoutSuccess || 'Sessão terminada.');
  updateProfileAuthUI();
  renderProfilePage();
});

function updateProfileAuthUI() {
  const user = getCurrentUser();
  const authCard = $('profile-auth-card');
  const userCard = $('profile-user-card');
  if (!authCard || !userCard) return;
  if (user) {
    authCard.hidden = true;
    userCard.hidden = false;
    $('profile-user-title').textContent = `@${user.username}`;
    $('profile-user-email').textContent = user.email;
  } else {
    authCard.hidden = false;
    userCard.hidden = true;
  }
}

/* -------------------------------------------------------------
   Mini Calendar & Day Logging
   ------------------------------------------------------------- */
function renderMiniCalendar() {
  const grid = $('calendar-grid');
  if (!grid) return;
  grid.replaceChildren();

  const year = state.calendarYear;
  const month = state.calendarMonth; // 0-indexed

  const monthDate = new Date(year, month, 1);
  const monthTitle = new Intl.DateTimeFormat(locale(), { month: 'long', year: 'numeric' }).format(monthDate);
  $('cal-month-title').textContent = monthTitle.charAt(0).toUpperCase() + monthTitle.slice(1);

  // Weekday index (Monday as first day)
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const meals = getMeals();
  const datesWithMeals = new Set(meals.map(m => m.date));

  // Empty leading cells
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'cal-day empty';
    grid.append(emptyCell);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayBtn = document.createElement('button');
    dayBtn.type = 'button';
    dayBtn.className = 'cal-day';
    dayBtn.textContent = String(d);

    if (dateStr === state.today) dayBtn.classList.add('today');
    if (dateStr === state.calendarSelectedDate) dayBtn.classList.add('selected');
    if (datesWithMeals.has(dateStr)) {
      dayBtn.classList.add('has-meals');
      const dot = document.createElement('span');
      dot.className = 'cal-day-dot';
      dayBtn.append(dot);
    }

    dayBtn.addEventListener('click', () => {
      selectCalendarDate(dateStr);
    });
    grid.append(dayBtn);
  }

  renderCalendarDayDetails();
}

function selectCalendarDate(dateStr) {
  state.calendarSelectedDate = dateStr;
  // Keep form compressed when switching days
  const form = $('cal-log-form');
  if (form) form.hidden = true;
  const btn = $('cal-add-meal-btn');
  const feature = featureCopy[state.language] || featureCopy.en;
  if (btn) btn.textContent = feature.calAddMeal || '+ Registar refeição neste dia';
  renderMiniCalendar();
}

function renderCalendarDayDetails() {
  const host = $('calendar-day-meals');
  if (!host) return;
  host.replaceChildren();

  const selDate = state.calendarSelectedDate || state.today;
  const [y, m, d] = selDate.split('-').map(Number);
  const formattedDate = new Intl.DateTimeFormat(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(y, m - 1, d, 12, 0, 0));
  $('calendar-day-title').textContent = formattedDate;

  const meals = getMeals().filter(item => item.date === selDate);
  const feature = featureCopy[state.language] || featureCopy.en;

  if (!meals.length) {
    const hint = document.createElement('div');
    hint.className = 'profile-empty-hint';
    hint.textContent = feature.calEmptyDay || 'Nenhuma refeição registada neste dia.';
    host.append(hint);
    return;
  }

  meals.forEach(m => {
    const card = document.createElement('div');
    card.className = 'profile-item-card';

    const info = document.createElement('div');
    info.className = 'profile-item-info';
    const name = document.createElement('span');
    name.className = 'profile-item-name';
    name.textContent = m.dishName ? m.dishName : m.name;
    const sub = document.createElement('p');
    sub.className = 'profile-item-sub';
    sub.textContent = m.dishName ? `${m.name} · ${displayAddress(m.address, m.city)}` : displayAddress(m.address, m.city);
    info.append(name, sub);

    const right = document.createElement('div');
    right.className = 'profile-item-right';
    const fee = document.createElement('span');
    fee.className = 'fee';
    fee.textContent = formatMoney(m.fee);

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'profile-del-btn';
    delBtn.setAttribute('aria-label', feature.mealDeleted || 'Eliminar registo');
    delBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteMeal(m.id);
    });

    right.append(fee, delBtn);
    card.append(info, right);
    host.append(card);
  });
}

function populateCalLogRestaurants() {
  const sel = $('cal-log-restaurant');
  if (!sel) return;
  const feature = featureCopy[state.language] || featureCopy.en;
  sel.replaceChildren(new Option(feature.calLogChooseRest || 'Escolhe um restaurante…', ''));
  state.restaurants.forEach(r => {
    const opt = new Option(r.name, r.id);
    opt.dataset.fee = r.additional_fee_eur || '0';
    opt.dataset.address = r.address || '';
    opt.dataset.city = r.city || '';
    sel.add(opt);
  });
}

// Toggle collapsed/expanded state of calendar log form
$('cal-add-meal-btn')?.addEventListener('click', () => {
  const form = $('cal-log-form');
  const btn = $('cal-add-meal-btn');
  const feature = featureCopy[state.language] || featureCopy.en;
  form.hidden = !form.hidden;
  if (!form.hidden) {
    populateCalLogRestaurants();
    btn.textContent = feature.calCloseForm || '− Fechar formulário';
  } else {
    btn.textContent = feature.calAddMeal || '+ Registar refeição neste dia';
  }
});

$('cal-log-cancel')?.addEventListener('click', () => {
  $('cal-log-form').hidden = true;
  const feature = featureCopy[state.language] || featureCopy.en;
  $('cal-add-meal-btn').textContent = feature.calAddMeal || '+ Registar refeição neste dia';
});

// Load dishes dynamically into dropdown when restaurant is chosen
$('cal-log-restaurant')?.addEventListener('change', () => {
  const selRest = $('cal-log-restaurant');
  const restId = Number(selRest.value);
  const dishSelect = $('cal-log-dish');
  const customDishInput = $('cal-log-dish-custom');
  const feature = featureCopy[state.language] || featureCopy.en;
  customDishInput.hidden = true;
  customDishInput.value = '';

  if (!restId) {
    dishSelect.replaceChildren(new Option(feature.calLogChooseRestFirst || 'Escolhe primeiro o restaurante…', ''));
    dishSelect.disabled = true;
    $('cal-log-fee').value = '';
    return;
  }

  const rest = state.restaurants.find(r => r.id === restId);
  if (rest && rest.additional_fee_eur != null) {
    $('cal-log-fee').value = rest.additional_fee_eur;
  }

  dishSelect.replaceChildren(new Option(feature.calLogLoadingDishes || 'A carregar pratos do menu…', ''));
  dishSelect.disabled = true;

  const targetDate = state.calendarSelectedDate || state.today;
  const cacheKey = `${restId}::${targetDate}`;
  const cachedMenu = menuCache.get(cacheKey);

  function populateDishes(dishes) {
    dishSelect.replaceChildren();
    dishSelect.disabled = false;
    dishSelect.add(new Option(feature.calLogChooseDish || 'Escolhe um prato…', ''));
    if (dishes && dishes.length) {
      dishes.forEach(d => {
        const translated = state.translationCache[`${state.language}::${d.name}`] || d.name;
        const opt = new Option(translated, d.name);
        opt.dataset.category = d.categories?.[0] || 'Mixed';
        dishSelect.add(opt);
      });
    } else {
      dishSelect.add(new Option(feature.mealPickerDailyMenu || 'Menu do dia / Refeição', 'Menu do dia'));
    }
    dishSelect.add(new Option(feature.mealPickerOtherDish || 'Outro prato / Opção livre…', '__other__'));
  }

  if (cachedMenu) {
    populateDishes(cachedMenu.dishes);
  } else {
    fetch(`/api/restaurants/${encodeURIComponent(restId)}/menu?date=${encodeURIComponent(targetDate)}&name=${encodeURIComponent(rest?.name || '')}`)
      .then(r => r.json())
      .then(menu => {
        menuCache.set(cacheKey, menu);
        populateDishes(menu.dishes);
      })
      .catch(() => {
        populateDishes([]);
      });
  }
});

$('cal-log-dish')?.addEventListener('change', () => {
  const dishSelect = $('cal-log-dish');
  const customDishInput = $('cal-log-dish-custom');
  if (dishSelect.value === '__other__') {
    customDishInput.hidden = false;
    customDishInput.focus();
  } else {
    customDishInput.hidden = true;
  }
});

$('cal-log-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const sel = $('cal-log-restaurant');
  const opt = sel.selectedOptions[0];
  const restId = Number(sel.value);
  if (!restId) return;

  const rest = state.restaurants.find(r => r.id === restId) || {
    id: restId,
    name: opt.text,
    address: opt.dataset.address || '',
    city: opt.dataset.city || '',
    additional_fee_eur: Number($('cal-log-fee').value) || 0
  };

  const dishSelect = $('cal-log-dish');
  let dishName = dishSelect.value;
  const feature = featureCopy[state.language] || featureCopy.en;
  if (dishName === '__other__') {
    dishName = $('cal-log-dish-custom').value.trim() || (feature.mealPickerDailyMenu || 'Prato personalizado');
  }
  const category = dishSelect.selectedOptions[0]?.dataset?.category || 'Mixed';
  const fee = Number($('cal-log-fee').value) || 0;
  const customDate = state.calendarSelectedDate || state.today;

  logMeal(rest, dishName, category, customDate);
  $('cal-log-form').reset();
  $('cal-log-form').hidden = true;
  $('cal-add-meal-btn').textContent = feature.calAddMeal || '+ Registar refeição neste dia';
  showToast(feature.calSavedMeal || 'Refeição guardada no histórico!');
  renderProfilePage();
  renderMiniCalendar();
});

$('cal-prev')?.addEventListener('click', () => {
  if (state.calendarMonth === 0) {
    state.calendarMonth = 11;
    state.calendarYear--;
  } else {
    state.calendarMonth--;
  }
  renderMiniCalendar();
});
$('cal-next')?.addEventListener('click', () => {
  if (state.calendarMonth === 11) {
    state.calendarMonth = 0;
    state.calendarYear++;
  } else {
    state.calendarMonth++;
  }
  renderMiniCalendar();
});

/* -------------------------------------------------------------
   Profile Page Rendering & Meal History Pagination
   ------------------------------------------------------------- */
const HISTORY_PAGE_SIZE = 7;

$('history-prev-btn')?.addEventListener('click', () => {
  if (state.historyPage > 1) {
    state.historyPage--;
    renderProfilePage();
  }
});

$('history-next-btn')?.addEventListener('click', () => {
  const meals = getMeals();
  const totalPages = Math.ceil(meals.length / HISTORY_PAGE_SIZE) || 1;
  if (state.historyPage < totalPages) {
    state.historyPage++;
    renderProfilePage();
  }
});

function renderProfilePage() {
  updateProfileAuthUI();
  emit('profile-rendered');
  const feature = featureCopy[state.language] || featureCopy.en;
  const meals = getMeals();
  const reviews = getReviews();

  // Spending stat
  const totalSpend = meals.reduce((sum, m) => sum + (Number(m.fee) || 0), 0);
  $('profile-spend-val').textContent = formatMoney(totalSpend);

  // Top food category stat
  const catCounts = {};
  let totalWithCat = 0;
  meals.forEach(m => {
    if (m.category && m.category !== 'Mixed') {
      catCounts[m.category] = (catCounts[m.category] || 0) + 1;
      totalWithCat++;
    }
  });
  const topCatEntry = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0];
  if (topCatEntry && totalWithCat > 0) {
    const catName = tr().categories[topCatEntry[0]] || topCatEntry[0];
    const pct = Math.round((topCatEntry[1] / totalWithCat) * 100);
    $('profile-food-val').textContent = `${catName} (${pct}%)`;
  } else if (meals.length > 0) {
    $('profile-food-val').textContent = tr().categories['Mixed'] || 'Misto';
  } else {
    $('profile-food-val').textContent = '—';
  }

  // Count stats and badges
  $('profile-history-val').textContent = String(meals.length);
  $('profile-reviews-val').textContent = String(Object.keys(reviews).length);

  // Render Mini Calendar
  renderMiniCalendar();

  // 1. Reviews Section
  const revHost = $('profile-reviews-list');
  revHost.replaceChildren();
  const revList = Object.values(reviews).sort((a, b) => b.timestamp - a.timestamp);
  if (!revList.length) {
    const hint = document.createElement('div');
    hint.className = 'profile-empty-hint';
    hint.textContent = feature.emptyReviews || 'Ainda não avaliaste nenhum restaurante.';
    revHost.append(hint);
  } else {
    revList.forEach(rev => {
      const card = document.createElement('div');
      card.className = 'profile-item-card';
      const info = document.createElement('div');
      info.className = 'profile-item-info';
      const name = document.createElement('span');
      name.className = 'profile-item-name';
      name.textContent = rev.name;
      const sub = document.createElement('p');
      sub.className = 'profile-item-sub';
      sub.textContent = rev.date ? formatDate(rev.date) : '';
      info.append(name, sub);
      if (rev.comment) {
        const comment = document.createElement('div');
        comment.className = 'profile-item-review-text';
        comment.textContent = `“${rev.comment}”`;
        info.append(comment);
      }
      const right = document.createElement('div');
      right.className = 'profile-item-right';
      const stars = document.createElement('span');
      stars.className = 'profile-stars';
      stars.textContent = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'profile-del-btn';
      delBtn.setAttribute('aria-label', feature.reviewDeleted || 'Eliminar avaliação');
      delBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
      delBtn.addEventListener('click', e => { e.stopPropagation(); deleteReview(rev.restaurantId); });
      right.append(stars, delBtn);
      card.append(info, right);
      card.addEventListener('click', () => {
        const fullRestaurant = state.restaurants.find(item => item.id === rev.restaurantId) || { id: rev.restaurantId, name: rev.name, address: rev.address, city: rev.city, additional_fee_eur: rev.additional_fee_eur };
        switchTab('explore');
        openRestaurant(fullRestaurant);
      });
      revHost.append(card);
    });
  }

  // 2. Meal History Section with Pagination (Max 7 per page)
  const histHost = $('profile-history-list');
  histHost.replaceChildren();

  const totalPages = Math.ceil(meals.length / HISTORY_PAGE_SIZE) || 1;
  if (state.historyPage > totalPages) state.historyPage = totalPages;
  if (state.historyPage < 1) state.historyPage = 1;

  const paginationContainer = $('profile-history-pagination');
  if (paginationContainer) {
    if (meals.length > HISTORY_PAGE_SIZE) {
      paginationContainer.hidden = false;
      $('history-page-indicator').textContent = `${state.historyPage} / ${totalPages}`;
      $('history-prev-btn').disabled = state.historyPage <= 1;
      $('history-next-btn').disabled = state.historyPage >= totalPages;
    } else {
      paginationContainer.hidden = true;
    }
  }

  if (!meals.length) {
    const hint = document.createElement('div');
    hint.className = 'profile-empty-hint';
    hint.textContent = feature.emptyHistory || 'Ainda não registaste refeições.';
    histHost.append(hint);
  } else {
    const pageMeals = meals.slice((state.historyPage - 1) * HISTORY_PAGE_SIZE, state.historyPage * HISTORY_PAGE_SIZE);
    pageMeals.forEach(m => {
      const card = document.createElement('div');
      card.className = 'profile-item-card';
      const info = document.createElement('div');
      info.className = 'profile-item-info';
      const name = document.createElement('span');
      name.className = 'profile-item-name';
      name.textContent = m.dishName ? `${m.dishName} (${m.name})` : m.name;
      const sub = document.createElement('p');
      sub.className = 'profile-item-sub';
      sub.textContent = `${displayAddress(m.address, m.city)} · ${formatDate(m.date)}`;
      info.append(name, sub);
      const right = document.createElement('div');
      right.className = 'profile-item-right';
      const fee = document.createElement('span');
      fee.className = 'fee';
      fee.textContent = formatMoney(m.fee);
      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'profile-del-btn';
      delBtn.setAttribute('aria-label', feature.mealDeleted || 'Eliminar registo');
      delBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
      delBtn.addEventListener('click', e => { e.stopPropagation(); deleteMeal(m.id); });
      right.append(fee, delBtn);
      card.append(info, right);
      card.addEventListener('click', () => {
        const fullRestaurant = state.restaurants.find(item => item.id === m.restaurantId) || { id: m.restaurantId, name: m.name, address: m.address, city: m.city, additional_fee_eur: m.fee };
        switchTab('explore');
        openRestaurant(fullRestaurant);
      });
      histHost.append(card);
    });
  }
}

/* -------------------------------------------------------------
   Action Listeners & Setup
   ------------------------------------------------------------- */
$('venue-fav-btn')?.addEventListener('click', () => { if (state.selected) toggleFavorite(state.selected); });
$('venue-rate-btn')?.addEventListener('click', () => {
  if (!state.selected) return;
  const user = getCurrentUser();
  if (!user) {
    showToast(featureCopy[state.language]?.authRequiredReview || 'Inicia sessão no teu perfil para avaliar restaurantes.');
    switchTab('profile');
    return;
  }
  const box = $('venue-review-box');
  box.hidden = !box.hidden;
  if (!box.hidden) {
    const existing = getReview(state.selected.id);
    if (existing) {
      setReviewStars(existing.rating);
      $('review-comment').value = existing.comment || '';
    } else {
      setReviewStars(5);
      $('review-comment').value = '';
    }
    $('review-comment').focus();
  }
});
document.querySelectorAll('#review-stars .star-btn').forEach(btn => {
  btn.addEventListener('click', () => setReviewStars(Number(btn.dataset.value)));
});
$('review-cancel-btn')?.addEventListener('click', () => { $('venue-review-box').hidden = true; });
$('venue-review-box')?.addEventListener('submit', e => {
  e.preventDefault();
  if (!state.selected) return;
  saveReview(state.selected.id, currentReviewRating, $('review-comment').value, state.selected);
  showToast(featureCopy[state.language]?.reviewSaved || 'Avaliação guardada!');
  $('venue-review-box').hidden = true;
});
$('profile-reset-btn')?.addEventListener('click', clearAllLocalData);

/* Global Event Listeners */
languageSelect.addEventListener('change', () => {
  state.language = languageSelect.value;
  localStorage.setItem('bomboni-language', state.language);
  applyLanguage();
  if (state.selected) loadMenu(state.selected.id, state.date, state.selected.name);
});
$('search-input').addEventListener('input', () => {
  $('restaurant-scroll-area')?.scrollTo({ top: 0, behavior: 'instant' });
  if (state.searchMode === 'dishes') handleDishSearch(); else renderRestaurants();
});
$('load-more').addEventListener('click', () => { state.visible += 15; renderRestaurants(); });
function closeRestaurant() {
  if (!state.selected) return;
  state.selected = null;
  const panel = $('menu-panel');
  panel.style.transform = '';
  panel.style.transition = '';
  panel.hidden = true;
  panel.classList.remove('mobile-open');
  $('layout').classList.remove('menu-open');
  if (state.searchMode === 'dishes') renderDishesSearch(); else renderRestaurants();
}
function leaveRestaurant() {
  // Going back through history keeps the browser back button in sync.
  if (history.state?.bomboniRestaurant) history.back();
  else closeRestaurant();
}
window.addEventListener('popstate', () => { if (!history.state?.bomboniRestaurant) closeRestaurant(); });
$('back-button').addEventListener('click', leaveRestaurant);
$('copy-menu-btn').addEventListener('click', copyMenu);
$('source-link').addEventListener('click', openOfficialAppOnIos);

// Swipe from the left edge to go back, following the finger like a native screen.
let edgeSwipe = null;
$('menu-panel').addEventListener('touchstart', event => {
  if (window.innerWidth > 760 || !state.selected) return;
  const touch = event.touches[0];
  if (touch.clientX > 32) return;
  edgeSwipe = { x: touch.clientX, y: touch.clientY, t: Date.now(), dx: 0, active: false };
}, { passive: true });
$('menu-panel').addEventListener('touchmove', event => {
  if (!edgeSwipe) return;
  const touch = event.touches[0];
  const dx = touch.clientX - edgeSwipe.x;
  const dy = touch.clientY - edgeSwipe.y;
  if (!edgeSwipe.active) {
    if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) { edgeSwipe = null; return; }
    if (dx < 8) return;
    edgeSwipe.active = true;
  }
  edgeSwipe.dx = Math.max(0, dx);
  const panel = $('menu-panel');
  panel.style.transition = 'none';
  panel.style.transform = `translateX(${edgeSwipe.dx}px)`;
}, { passive: true });
$('menu-panel').addEventListener('touchend', () => {
  if (!edgeSwipe) return;
  const { dx, t, active } = edgeSwipe;
  edgeSwipe = null;
  if (!active) return;
  const panel = $('menu-panel');
  const fast = dx > 40 && Date.now() - t < 250;
  panel.style.transition = 'transform .22s cubic-bezier(.2,.8,.2,1)';
  if (dx > window.innerWidth * 0.33 || fast) {
    panel.style.transform = 'translateX(100%)';
    setTimeout(leaveRestaurant, 200);
  } else {
    panel.style.transform = '';
    setTimeout(() => { panel.style.transition = ''; }, 240);
  }
});
$('date-prev').addEventListener('click', () => changeMenuDate(-1));
$('date-next').addEventListener('click', () => changeMenuDate(1));
$('mobile-tab-bar').addEventListener('click', event => {
  const button = event.target.closest('[data-tab]');
  if (button) switchTab(button.dataset.tab);
});
$('draw-form').addEventListener('submit', submitDraw);
$('dish-list').addEventListener('touchstart', event => {
  const touch = event.touches[0];
  $('dish-list').dataset.touchX = touch.clientX;
  $('dish-list').dataset.touchY = touch.clientY;
}, { passive: true });
$('dish-list').addEventListener('touchend', event => {
  if (Number($('dish-list').dataset.touchX) <= 32 && window.innerWidth <= 760) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - Number($('dish-list').dataset.touchX || touch.clientX);
  const dy = touch.clientY - Number($('dish-list').dataset.touchY || touch.clientY);
  if (Math.abs(dx) > 75 && Math.abs(dy) < 55) changeMenuDate(dx < 0 ? 1 : -1);
}, { passive: true });
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); $('search-input').focus(); }
  if (event.key === 'Escape' && state.selected) leaveRestaurant();
});

/* PWA Installation */
async function installApp() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    return;
  }
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (standalone) { showToast(installCopy[state.language]?.label || installCopy.en.label); return; }
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  showToast(isIOS ? (installCopy[state.language]?.ios || installCopy.en.ios) : (installCopy[state.language]?.browser || installCopy.en.browser));
}
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
});
window.addEventListener('appinstalled', () => {
  showToast(installCopy[state.language]?.label || installCopy.en.label);
});
$('footer-install').addEventListener('click', installApp);

/* MCP Page Integration & Helpers */
let currentMcpSnippetTarget = 'gemini';
const CANONICAL_CLOUD_MCP_URL = 'https://bomboni-enzogrigorios-projects.vercel.app/api/mcp';

const mcpClientGuidesByLang = {
  pt: {
    gemini: {
      file: 'Gemini (Web e CLI)',
      steps: [
        { num: '1', title: 'Acesse os Apps Conectados', text: 'No <a href="https://gemini.google.com" target="_blank" rel="noreferrer">Google Gemini</a>, acesse <strong>Personalizar</strong> no menu lateral e selecione <strong>Apps conectados</strong>.' },
        { num: '2', title: 'Crie um Conector na Nuvem', text: 'Clique em <strong>Criar app personalizado</strong> e selecione o método <strong>MCP na nuvem</strong>.' },
        { num: '3', title: 'Cole a URL do Bomboni', text: 'Cole a URL do servidor acima no campo do Gemini e clique em <strong>Avançar</strong> para concluir.' }
      ],
      comment: '# Configuração para Gemini CLI / Projetos:\n'
    },
    claude: {
      file: 'claude_desktop_config.json',
      steps: [
        { num: '1', title: 'Abra a Configuração do Claude', text: 'No Claude Desktop, acesse <strong>Settings > Developer > Edit Config</strong> para abrir o arquivo <code>claude_desktop_config.json</code>.' },
        { num: '2', title: 'Adicione o Bomboni', text: 'Insira o servidor Bomboni dentro de <code>mcpServers</code> (usando o comando Python ou a URL remota).' },
        { num: '3', title: 'Reinicie o Claude', text: 'Reinicie a aplicação. As 4 ferramentas de consulta e cardápios estarão ativas nas conversas.' }
      ]
    },
    cursor: {
      file: '.cursor/mcp.json',
      steps: [
        { num: '1', title: 'Abra as Configurações de MCP', text: 'No Cursor, vá em <strong>Settings > Features > MCP</strong> ou crie <code>.cursor/mcp.json</code> no seu repositório.' },
        { num: '2', title: 'Adicione o Bomboni', text: 'Cadastre o Bomboni como servidor remoto apontando para a URL pública acima.' },
        { num: '3', title: 'Use no Chat e Composer', text: 'O Cursor consultará restaurantes e cardápios de boni diretamente no chat.' }
      ]
    },
    universal: {
      file: 'mcp-config.json',
      steps: [
        { num: '1', title: 'Adicione um Servidor MCP', text: 'No seu cliente (LibreChat, Cline, Zed, etc.), escolha adicionar um servidor MCP remoto.' },
        { num: '2', title: 'Selecione o Transporte', text: 'Configure o tipo <strong>Streamable HTTP</strong> ou <strong>SSE</strong> e insira a URL pública do Bomboni.' },
        { num: '3', title: 'Pronto para Consultar', text: 'O cliente identificará automaticamente as ferramentas e parâmetros disponíveis.' }
      ]
    }
  },
  en: {
    gemini: {
      file: 'Gemini (Web & CLI)',
      steps: [
        { num: '1', title: 'Open Connected Apps', text: 'In <a href="https://gemini.google.com" target="_blank" rel="noreferrer">Google Gemini</a>, go to <strong>Customize</strong> in the sidebar and select <strong>Connected apps</strong>.' },
        { num: '2', title: 'Create a Cloud Connector', text: 'Click <strong>Create custom app</strong> and select <strong>Cloud MCP</strong>.' },
        { num: '3', title: 'Paste Bomboni URL', text: 'Paste the server URL above into Gemini and click <strong>Next</strong> to finish.' }
      ],
      comment: '# Configuration for Gemini CLI / Projects:\n'
    },
    claude: {
      file: 'claude_desktop_config.json',
      steps: [
        { num: '1', title: 'Open Claude Settings', text: 'In Claude Desktop, go to <strong>Settings > Developer > Edit Config</strong> to open <code>claude_desktop_config.json</code>.' },
        { num: '2', title: 'Add Bomboni', text: 'Add the Bomboni server entry inside <code>mcpServers</code> (using Python or remote URL).' },
        { num: '3', title: 'Restart Claude', text: 'Restart the app. The 4 menu and restaurant search tools are now active in your chats.' }
      ]
    },
    cursor: {
      file: '.cursor/mcp.json',
      steps: [
        { num: '1', title: 'Open MCP Settings', text: 'In Cursor, go to <strong>Settings > Features > MCP</strong> or create <code>.cursor/mcp.json</code> in your project repository.' },
        { num: '2', title: 'Add Bomboni', text: 'Register Bomboni as a remote server pointing to the public URL above.' },
        { num: '3', title: 'Use in Chat & Composer', text: 'Cursor can now query boni restaurants and daily menus directly in chat.' }
      ]
    },
    universal: {
      file: 'mcp-config.json',
      steps: [
        { num: '1', title: 'Add an MCP Server', text: 'In your client (LibreChat, Cline, Zed, etc.), choose to add a remote MCP server.' },
        { num: '2', title: 'Select Transport', text: 'Choose <strong>Streamable HTTP</strong> or <strong>SSE</strong> and paste Bomboni’s public URL.' },
        { num: '3', title: 'Ready to Query', text: 'The client will automatically discover all available tools and parameters.' }
      ]
    }
  },
  es: {
    gemini: {
      file: 'Gemini (Web y CLI)',
      steps: [
        { num: '1', title: 'Accede a Apps Conectadas', text: 'En <a href="https://gemini.google.com" target="_blank" rel="noreferrer">Google Gemini</a>, entra a <strong>Personalizar</strong> en el menú lateral y selecciona <strong>Apps conectadas</strong>.' },
        { num: '2', title: 'Crea un Conector en la Nube', text: 'Haz clic en <strong>Crear app personalizada</strong> y elige <strong>MCP en la nube</strong>.' },
        { num: '3', title: 'Pega la URL de Bomboni', text: 'Pega la URL del servidor anterior en Gemini y haz clic en <strong>Siguiente</strong> para completar.' }
      ],
      comment: '# Configuración para Gemini CLI / Proyectos:\n'
    },
    claude: {
      file: 'claude_desktop_config.json',
      steps: [
        { num: '1', title: 'Abre la Configuración de Claude', text: 'En Claude Desktop, ve a <strong>Settings > Developer > Edit Config</strong> para abrir <code>claude_desktop_config.json</code>.' },
        { num: '2', title: 'Añade Bomboni', text: 'Agrega el servidor Bomboni dentro de <code>mcpServers</code> (con Python o URL remota).' },
        { num: '3', title: 'Reinicia Claude', text: 'Reinicia la aplicación. Las 4 herramientas de consulta y menús estarán activas en tus chats.' }
      ]
    },
    cursor: {
      file: '.cursor/mcp.json',
      steps: [
        { num: '1', title: 'Abre Ajustes de MCP', text: 'En Cursor, ve a <strong>Settings > Features > MCP</strong> o crea <code>.cursor/mcp.json</code> en tu proyecto.' },
        { num: '2', title: 'Añade Bomboni', text: 'Registra Bomboni como servidor remoto apuntando a la URL pública arriba indicada.' },
        { num: '3', title: 'Usa en Chat y Composer', text: 'Cursor consultará restaurantes y menús de boni directamente en el chat.' }
      ]
    },
    universal: {
      file: 'mcp-config.json',
      steps: [
        { num: '1', title: 'Añade un Servidor MCP', text: 'En tu cliente (LibreChat, Cline, Zed, etc.), elige añadir un servidor MCP remoto.' },
        { num: '2', title: 'Selecciona el Transporte', text: 'Configura el tipo <strong>Streamable HTTP</strong> o <strong>SSE</strong> e introduce la URL pública de Bomboni.' },
        { num: '3', title: 'Listo para Consultar', text: 'El cliente descubrirá automáticamente las herramientas y parámetros disponibles.' }
      ]
    }
  },
  de: {
    gemini: {
      file: 'Gemini (Web & CLI)',
      steps: [
        { num: '1', title: 'Verbundene Apps öffnen', text: 'Gehe in <a href="https://gemini.google.com" target="_blank" rel="noreferrer">Google Gemini</a> auf <strong>Anpassen</strong> im Seitenmenü und wähle <strong>Verbundene Apps</strong>.' },
        { num: '2', title: 'Cloud-Connector erstellen', text: 'Klicke auf <strong>Benutzerdefinierte App erstellen</strong> und wähle <strong>Cloud-MCP</strong>.' },
        { num: '3', title: 'Bomboni-URL einfügen', text: 'Füge die obige Server-URL in Gemini ein und klicke auf <strong>Weiter</strong>.' }
      ],
      comment: '# Konfiguration für Gemini CLI / Projekte:\n'
    },
    claude: {
      file: 'claude_desktop_config.json',
      steps: [
        { num: '1', title: 'Claude-Einstellungen öffnen', text: 'Gehe in Claude Desktop auf <strong>Settings > Developer > Edit Config</strong>, um <code>claude_desktop_config.json</code> zu öffnen.' },
        { num: '2', title: 'Bomboni hinzufügen', text: 'Füge Bomboni unter <code>mcpServers</code> ein (über Python-Befehl oder Remote-URL).' },
        { num: '3', title: 'Claude neu starten', text: 'Starte die App neu. Die 4 Such- und Menü-Tools stehen in Chats bereit.' }
      ]
    },
    cursor: {
      file: '.cursor/mcp.json',
      steps: [
        { num: '1', title: 'MCP-Einstellungen öffnen', text: 'Gehe im Cursor auf <strong>Settings > Features > MCP</strong> oder erstelle <code>.cursor/mcp.json</code> im Projekt.' },
        { num: '2', title: 'Bomboni hinzufügen', text: 'Trage Bomboni als Remote-Server mit der obigen öffentlichen URL ein.' },
        { num: '3', title: 'Im Chat & Composer nutzen', text: 'Cursor kann Boni-Restaurants und Tagesmenüs direkt im Chat abfragen.' }
      ]
    },
    universal: {
      file: 'mcp-config.json',
      steps: [
        { num: '1', title: 'MCP-Server hinzufügen', text: 'Wähle in deinem Client (LibreChat, Cline, Zed usw.) das Hinzufügen eines Remote-MCP-Servers.' },
        { num: '2', title: 'Transport auswählen', text: 'Wähle <strong>Streamable HTTP</strong> oder <strong>SSE</strong> und gib die öffentliche Bomboni-URL ein.' },
        { num: '3', title: 'Bereit zum Abfragen', text: 'Der Client erkennt die verfügbaren Werkzeuge und Parameter automatisch.' }
      ]
    }
  },
  it: {
    gemini: {
      file: 'Gemini (Web e CLI)',
      steps: [
        { num: '1', title: 'Apri le App Connesse', text: 'Su <a href="https://gemini.google.com" target="_blank" rel="noreferrer">Google Gemini</a>, vai su <strong>Personalizza</strong> nel menu laterale e scegli <strong>App connesse</strong>.' },
        { num: '2', title: 'Crea un Connettore Cloud', text: 'Clicca su <strong>Crea app personalizzata</strong> e seleziona <strong>MCP su cloud</strong>.' },
        { num: '3', title: 'Incolla l’URL di Bomboni', text: 'Incolla l’URL del server in Gemini e fai clic su <strong>Avanti</strong> per completare.' }
      ],
      comment: '# Configurazione per Gemini CLI / Progetti:\n'
    },
    claude: {
      file: 'claude_desktop_config.json',
      steps: [
        { num: '1', title: 'Apri le Impostazioni di Claude', text: 'In Claude Desktop, vai su <strong>Settings > Developer > Edit Config</strong> per aprire <code>claude_desktop_config.json</code>.' },
        { num: '2', title: 'Aggiungi Bomboni', text: 'Inserisci il server Bomboni all’interno di <code>mcpServers</code> (usando Python o URL remota).' },
        { num: '3', title: 'Riavvia Claude', text: 'Riavvia l’applicazione. I 4 strumenti di ricerca e menu saranno attivi nelle conversazioni.' }
      ]
    },
    cursor: {
      file: '.cursor/mcp.json',
      steps: [
        { num: '1', title: 'Apri le Impostazioni MCP', text: 'In Cursor, vai su <strong>Settings > Features > MCP</strong> oppure crea <code>.cursor/mcp.json</code> nel repository.' },
        { num: '2', title: 'Aggiungi Bomboni', text: 'Registra Bomboni come server remoto puntando all’URL pubblica sopra indicata.' },
        { num: '3', title: 'Usa in Chat e Composer', text: 'Cursor consulterà ristoranti e menu del giorno con boni direttamente nella chat.' }
      ]
    },
    universal: {
      file: 'mcp-config.json',
      steps: [
        { num: '1', title: 'Aggiungi un Server MCP', text: 'Nel tuo client (LibreChat, Cline, Zed, ecc.), scegli di aggiungere un server MCP remoto.' },
        { num: '2', title: 'Seleziona il Trasporto', text: 'Configura il tipo <strong>Streamable HTTP</strong> o <strong>SSE</strong> e inserisci l’URL pubblico di Bomboni.' },
        { num: '3', title: 'Pronto a Consultare', text: 'Il client rileverà automaticamente gli strumenti e i parametri disponibili.' }
      ]
    }
  },
  fr: {
    gemini: {
      file: 'Gemini (Web & CLI)',
      steps: [
        { num: '1', title: 'Ouvrir les Applications Connectées', text: 'Dans <a href="https://gemini.google.com" target="_blank" rel="noreferrer">Google Gemini</a>, allez dans <strong>Personnaliser</strong> puis sélectionnez <strong>Applications connectées</strong>.' },
        { num: '2', title: 'Créer un Connecteur Cloud', text: 'Cliquez sur <strong>Créer une application personnalisée</strong> et choisissez <strong>MCP Cloud</strong>.' },
        { num: '3', title: 'Coller l’URL de Bomboni', text: 'Collez l’URL du serveur ci-dessus dans Gemini et cliquez sur <strong>Suivant</strong> pour terminer.' }
      ],
      comment: '# Configuration pour Gemini CLI / Projets :\n'
    },
    claude: {
      file: 'claude_desktop_config.json',
      steps: [
        { num: '1', title: 'Ouvrir la Configuration de Claude', text: 'Dans Claude Desktop, allez dans <strong>Settings > Developer > Edit Config</strong> pour ouvrir <code>claude_desktop_config.json</code>.' },
        { num: '2', title: 'Ajouter Bomboni', text: 'Ajoutez le serveur Bomboni sous <code>mcpServers</code> (avec Python ou l’URL distante).' },
        { num: '3', title: 'Redémarrer Claude', text: 'Redémarrez l’application. Les 4 outils de recherche et de menus seront disponibles dans vos discussions.' }
      ]
    },
    cursor: {
      file: '.cursor/mcp.json',
      steps: [
        { num: '1', title: 'Ouvrir les Paramètres MCP', text: 'Dans Cursor, allez dans <strong>Settings > Features > MCP</strong> ou créez <code>.cursor/mcp.json</code> dans votre projet.' },
        { num: '2', title: 'Ajouter Bomboni', text: 'Enregistrez Bomboni comme serveur distant pointant vers l’URL publique ci-dessus.' },
        { num: '3', title: 'Utiliser dans Chat & Composer', text: 'Cursor pourra consulter les restaurants et menus boni directamente dans vos discussions.' }
      ]
    },
    universal: {
      file: 'mcp-config.json',
      steps: [
        { num: '1', title: 'Ajouter un Serveur MCP', text: 'Dans votre client (LibreChat, Cline, Zed, etc.), choisissez d’ajouter un serveur MCP distant.' },
        { num: '2', title: 'Sélectionner le Transport', text: 'Configurez le type <strong>Streamable HTTP</strong> ou <strong>SSE</strong> et saisissez l’URL publique de Bomboni.' },
        { num: '3', title: 'Prêt à Interroger', text: 'Le client découvrira automatiquement les outils et paramètres disponibles.' }
      ]
    }
  },
  ca: {
    gemini: {
      file: 'Gemini (Web i CLI)',
      steps: [
        { num: '1', title: 'Accedeix a les Apps Connectades', text: 'A <a href="https://gemini.google.com" target="_blank" rel="noreferrer">Google Gemini</a>, ves a <strong>Personalitzar</strong> al menú lateral i tria <strong>Apps connectades</strong>.' },
        { num: '2', title: 'Crea un Connector al Núvol', text: 'Fes clic a <strong>Crear app personalitzada</strong> i selecciona <strong>MCP al núvol</strong>.' },
        { num: '3', title: 'Enganxa l’URL de Bomboni', text: 'Enganxa l’URL del servidor anterior a Gemini i fes clic a <strong>Següent</strong>.' }
      ],
      comment: '# Configuració per a Gemini CLI / Projectes:\n'
    },
    claude: {
      file: 'claude_desktop_config.json',
      steps: [
        { num: '1', title: 'Obre la Configuració de Claude', text: 'A Claude Desktop, ves a <strong>Settings > Developer > Edit Config</strong> per obrir <code>claude_desktop_config.json</code>.' },
        { num: '2', title: 'Afegeix Bomboni', text: 'Afegeix el servidor Bomboni dins de <code>mcpServers</code> (amb Python o URL remota).' },
        { num: '3', title: 'Reinicia Claude', text: 'Reinicia l’aplicació. Les 4 eines de cerca i menús estaran actives a les teves converses.' }
      ]
    },
    cursor: {
      file: '.cursor/mcp.json',
      steps: [
        { num: '1', title: 'Obre la Configuració de MCP', text: 'A Cursor, ves a <strong>Settings > Features > MCP</strong> o crea <code>.cursor/mcp.json</code> al teu projecte.' },
        { num: '2', title: 'Afegeix Bomboni', text: 'Registra Bomboni com a servidor remot apuntant a l’URL pública anterior.' },
        { num: '3', title: 'Fes servir al Xat i Composer', text: 'Cursor consultarà restaurants i menús de boni directament al xat.' }
      ]
    },
    universal: {
      file: 'mcp-config.json',
      steps: [
        { num: '1', title: 'Afegeix un Servidor MCP', text: 'Al teu client (LibreChat, Cline, Zed, etc.), tria afegir un servidor MCP remot.' },
        { num: '2', title: 'Selecciona el Transport', text: 'Configura el tipus <strong>Streamable HTTP</strong> o <strong>SSE</strong> i introdueix l’URL pública de Bomboni.' },
        { num: '3', title: 'A punt per Consultar', text: 'El client descobrirà automàticament les eines i paràmetres disponibles.' }
      ]
    }
  }
};

const mcpCodeGenerators = {
  gemini: (url, lang) => {
    const comment = mcpClientGuidesByLang[lang]?.gemini?.comment || mcpClientGuidesByLang.en.gemini.comment;
    return comment + JSON.stringify({
      mcpServers: {
        bomboni: {
          url: url
        }
      }
    }, null, 2);
  },
  claude: () => JSON.stringify({
    mcpServers: {
      bomboni: {
        command: 'python',
        args: ['-m', 'bomboni.adapters.mcp.server']
      }
    }
  }, null, 2),
  cursor: (url) => JSON.stringify({
    mcpServers: {
      bomboni: {
        url: url
      }
    }
  }, null, 2),
  universal: (url) => JSON.stringify({
    mcpServers: {
      bomboni: {
        url: url
      }
    }
  }, null, 2)
};

function renderMcpPage() {
  const isHttps = typeof window !== 'undefined' && window.location && window.location.protocol === 'https:';
  const origin = isHttps ? window.location.origin : 'https://bomboni-enzogrigorios-projects.vercel.app';
  const cloudUrl = `${origin}/api/mcp`;
  const urlInput = $('mcp-cloud-url');
  if (urlInput) urlInput.value = cloudUrl;

  const langGuides = mcpClientGuidesByLang[state.language] || mcpClientGuidesByLang.en || mcpClientGuidesByLang.pt;
  const guide = langGuides[currentMcpSnippetTarget] || langGuides.gemini;
  const container = $('mcp-steps-container');
  if (container && guide.steps) {
    container.innerHTML = guide.steps.map(s => `
      <div class="mcp-step-item">
        <span class="mcp-step-num">${s.num}.</span>
        <div class="mcp-step-content">
          <strong>${s.title}</strong>
          <p>${s.text}</p>
        </div>
      </div>
    `).join('');
  }

  const filenameEl = $('mcp-snippet-filename');
  if (filenameEl) filenameEl.textContent = guide.file;
  const codeEl = $('mcp-code-display');
  const codeFn = mcpCodeGenerators[currentMcpSnippetTarget] || mcpCodeGenerators.gemini;
  if (codeEl) codeEl.textContent = codeFn(cloudUrl, state.language);
}

$('desktop-nav')?.addEventListener('click', event => {
  const button = event.target.closest('[data-tab]');
  if (button) switchTab(button.dataset.tab);
});

$('footer-mcp-link')?.addEventListener('click', event => {
  event.preventDefault();
  switchTab('mcp');
});

$('mcp-copy-cloud-btn')?.addEventListener('click', async () => {
  const url = $('mcp-cloud-url')?.value;
  if (!url) return;
  const feature = featureCopy[state.language] || featureCopy.en;
  try {
    await navigator.clipboard.writeText(url);
    const textEl = $('mcp-copy-cloud-text');
    if (textEl) {
      const orig = textEl.textContent;
      textEl.textContent = feature.mcpCopied || 'Copiado!';
      setTimeout(() => { textEl.textContent = feature.mcpCopyLink || orig; }, 2000);
    }
    showToast(feature.mcpLinkCopiedToast || 'Link do servidor MCP copiado!');
  } catch {
    showToast(url);
  }
});

$('mcp-ping-btn')?.addEventListener('click', async () => {
  const feedback = $('mcp-ping-feedback');
  if (!feedback) return;
  const feature = featureCopy[state.language] || featureCopy.en;
  feedback.hidden = false;
  feedback.classList.remove('is-error');
  feedback.textContent = feature.mcpPingChecking || 'A verificar conexão ao servidor MCP…';
  const start = performance.now();
  try {
    const res = await fetch('/api/mcp');
    const elapsed = Math.round(performance.now() - start);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    feedback.textContent = typeof feature.mcpPingSuccess === 'function'
      ? feature.mcpPingSuccess(elapsed, data.name, data.tools?.length || 4)
      : `✓ Conexão verificada (${elapsed}ms)! Servidor "${data.name}" ativo com ${data.tools?.length || 4} ferramentas prontas.`;
  } catch (err) {
    feedback.classList.add('is-error');
    feedback.textContent = typeof feature.mcpPingError === 'function'
      ? feature.mcpPingError(err.message)
      : `Falha na verificação: ${err.message}.`;
  }
});

document.querySelectorAll('.mcp-client-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    currentMcpSnippetTarget = btn.dataset.mcpTarget;
    document.querySelectorAll('.mcp-client-tab').forEach(b => {
      const active = b === btn;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', String(active));
    });
    renderMcpPage();
  });
});

$('mcp-copy-snippet-btn')?.addEventListener('click', async () => {
  const code = $('mcp-code-display')?.textContent;
  if (!code) return;
  const feature = featureCopy[state.language] || featureCopy.en;
  try {
    await navigator.clipboard.writeText(code);
    const btn = $('mcp-copy-snippet-btn');
    const orig = btn.textContent;
    btn.textContent = feature.mcpCopied || 'Copiado!';
    setTimeout(() => { btn.textContent = feature.mcpCopyConfig || orig; }, 2000);
    showToast(feature.mcpConfigCopiedToast || 'Configuração copiada!');
  } catch {
    showToast(feature.mcpCopyFail || 'Não foi possível copiar.');
  }
});

window.addEventListener('popstate', () => {
  if (window.location.pathname === '/mcp') {
    switchTab('mcp');
  } else if (state.tab === 'mcp') {
    switchTab('explore');
  }
});

/* Boot application */
applyLanguage();
renderMcpPage();
loadRestaurants();

if (window.location.pathname === '/mcp' || window.location.hash === '#mcp') {
  switchTab('mcp');
}

// Request real GPS coordinates on startup, update cache and resort by proximity
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    p => {
      const loc = { latitude: p.coords.latitude, longitude: p.coords.longitude };
      state.location = loc;
      try { localStorage.setItem('bomboni-location', JSON.stringify(loc)); } catch {}
      loadRestaurants();
    },
    () => {
      state.locationLabel = nearbyLabels[state.language] || nearbyLabels.en;
      if (!state.restaurants || !state.restaurants.length) {
        loadRestaurants();
      } else {
        if (state.searchMode === 'dishes') renderDishesSearch(); else renderRestaurants();
      }
    },
    { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
  );
}
