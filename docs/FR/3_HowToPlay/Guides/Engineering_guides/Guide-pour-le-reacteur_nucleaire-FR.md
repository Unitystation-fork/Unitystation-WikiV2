# Guide du réacteur nucléaire
Note : Le réacteur est TRÈS compliqué, et vous ne devriez pas y toucher à moins d'être expérimenté en tant qu'[ingénieur](Engineer.md) ou d'avoir l'intention de tout faire foirer.

## Vue d'ensemble
Ce guide couvre les informations de base sur le réacteur, comment le démarrer, comment le faire fonctionner et comment le faire exploser. De nombreux termes relatifs au réacteur seront également abordés, en partant du principe que vous n'êtes certainement pas un physicien nucléaire. 

## Contexte
Avant même de toucher au réacteur, il est préférable de savoir comment il fonctionne.

### Tuyaux, vapeur, eau, et une putain de tonne de radiation.
Le réacteur comporte plusieurs parties distinctes, qui doivent toutes être correctement connectées les unes aux autres pour que le réacteur fonctionne. En commençant par la plus simple, le réservoir d'eau. Il contient de l'eau. Cette eau circule dans le réacteur à l'aide d'une pompe et se dirige vers le cœur du réacteur où elle est chauffée en vapeur par les réactions de fission à l'intérieur et utilisée pour faire tourner une turbine, créant ainsi de l'énergie. Tout ce système n'a, pour l'instant, que deux maillons faibles, les tuyaux et le cœur du réacteur. Les autres parties du réacteur peuvent être construites avec de l'acier bon marché dans le menu de construction, mais les tuyaux et le cœur sont tous deux difficiles à remplacer et nécessitent respectivement un repiquage coûteux et de grandes quantités de plasteel.

### Comment fonctionne le cœur
Le cœur lui-même est tout aussi complexe que le reste du réacteur. À l'intérieur du cœur, des barres de combustible sont utilisées dans des réactions de fission pour chauffer l'eau qui circule dans le cœur. Ces barres de combustible ne peuvent pas démarrer seules et ont besoin d'une barre de démarrage pour s'allumer initialement. Les barres de contrôle sont utilisées pour réduire ou augmenter le taux des réactions de fission afin de contrôler le cœur. La pression et la température du cœur sont les éléments que vous devez contrôler pour produire de l'énergie et éviter de vous faire casser les dents par un administrateur, bien que ces éléments ne soient pas directement contrôlables et constituent une grande chaîne de dépendance.

### La chaîne de dépendance
Comme mentionné précédemment, la température et la pression d'un noyau ne sont pas directement contrôlables, mais seulement indirectement par le biais d'une longue série de dépendances. En commençant par le début, vous avez le nombre de barres. Plus de barres de combustible signifie plus de chaleur et de neutrons, tandis que plus de barres de contrôle signifie plus de contrôle sur d'autres valeurs. La deuxième chose sur laquelle vous avez un contrôle est la hauteur des barres. Lorsque les barres de contrôle sont enfoncées profondément dans le réacteur, elles réduisent la quantité de réactions de fission qui se produisent, et lorsqu'elles sont presque à l'extérieur, la quantité de réactions augmente. Ceci est mesuré par la valeur K% (ou plus précisément 1+k%), qui apparaît sur un triplet de jauges coulissantes horizontales. Cette valeur K% modifie la quantité de flux neutronique de manière exponentielle, ce qui signifie qu'une valeur K% de 10 entraîne une croissance du flux non pas dix fois plus rapide qu'une valeur k de 1, mais cent fois plus rapide. Le flux neutronique peut être considéré comme un moyen de mesurer le degré d'activité du réacteur. Plus le flux est élevé, plus les réactions de fission sont nombreuses. Cela entraîne une augmentation de la température qui, à son tour, augmente la pression de la vapeur autour du réacteur. Plus la pression est élevée, plus la vapeur passe rapidement dans la turbine et plus la production d'énergie est importante. Si tout cela vous laisse perplexe, essayez de lire la chaîne de dépendance à l'envers.

### Lire la console 
Avec les récents changements apportés à la console de commande du réacteur, elle est devenue plus facile mais aussi plus compliquée à lire qu'auparavant. Le curseur K a reçu deux jauges supplémentaires pour des lectures plus fines, celles-ci sont plus difficiles à expliquer verbalement qu'avec des exemples, donc allons-y directement. Si la valeur de K# était de 0,71, le curseur supérieur serait à ~2/3èmes entre 0 et 1, le second curseur mesurant des incréments de 1/10ème serait à 7, et l'affichage le plus fin en bas serait à l'extrême droite. Alternativement, s'il était à 0,07, les deux curseurs supérieurs et le deuxième curseur seraient proches de zéro, avec le curseur inférieur à 7. Si vous voulez une valeur de k qui est parfaitement à zéro, vous devriez avoir les 3 jauges centrées le long de la ligne centrale.

Les contrôles des barres du réacteur sont beaucoup plus faciles qu'avant. Il y a un affichage montrant le % de la profondeur maximale à laquelle les barres sont insérées à tout moment, au centième de pourcentage près. Le curseur de gauche contrôle cette profondeur par incréments de 1%, tandis que le curseur de droite le fait par incréments de 0,01%. Ce dernier est essentiel pour obtenir une valeur 0 k parfaite.

Les zones des jauges qui sont ombragées en rouge signifient qu'avoir une valeur dans cette plage est soit contre-productif, soit dangereux. Une pression incapable d'alimenter le réacteur et une pression proche de le faire exploser se trouveraient toutes deux dans une zone ombrée en rouge.

## Démarrage du réacteur
Le démarrage du réacteur est un processus assez long, avec de multiples étapes, et peut vous transformer en une fine brume si vous ne le faites pas correctement.

### Tiges
Avant de démarrer le réacteur, vous devez rassembler ce dont vous aurez besoin pour le faire. Il s'agit des barres, que l'on trouve généralement près de la console. Il en existe trois types : les barres de contrôle, dont la fonction est abordée dans "La chaîne de dépendance", les barres de combustible, qui entraînent les réactions de fission et sont lentement réduites par celles-ci, et les barres de démarrage, qui fournissent les neutrons initiaux pour le démarrage du réacteur. Ces derniers doivent être placés dans le réacteur dans un rapport approprié pour éviter qu'il ne s'éteigne ou n'explose de manière horrible.

### Configuration "simple" du réacteur
C'est simplement la méthode que j'utilise personnellement lorsque je cherche simplement à générer de l'énergie. Je vous recommande d'expérimenter sur des serveurs privés si vous voulez essayer différentes configurations, car les administrateurs désapprouvent la mise hors service non programmée des réacteurs.

1. Démarrez le générateur de plasma pour que l'équipage ne se plaigne pas et que vos lumières/consoles soient alimentées.
2. Rassemblez 4 à 5 barres de contrôle, une barre de combustible et une barre de démarrage.
3. Sortez du sas et branchez les barres de contrôle, puis la barre de combustible, puis le démarreur.
4. Retournez à l'intérieur pour vous occuper de la console du réacteur.
5. Remonter les barres de contrôle jusqu'à ce que la valeur k% soit de ~ 6 ou 7
6. Maintenez-le jusqu'à ce que le flux de neutrons atteigne un point entre 10^5 et 10^6. Plus haut, le réacteur sera BEAUCOUP plus fougueux, de manière exponentielle. (aller trop haut résultera en une fusion du réacteur qui ne pourra pas être arrêtée par la console).
7. Réglez K% à zéro en utilisant les barres. (les 3 curseurs doivent se rejoindre au point central, voir "Lecture de la console")
8. Baisser et augmenter le K% jusqu'à ce qu'une température et une pression stables et relativement élevées soient atteintes (se trouver dans la partie supérieure rouge est plus ou moins sûr, aller au-delà entraîne une défaillance du réacteur).
9. Vérifier que la pression augmente, et utiliser l'autre console pour voir si de l'énergie est générée.
10. allez au coeur du réacteur, retirez la tige de démarrage, assurez-vous de porter un équipement antiradiation.
11. retournez à la console, répétez les étapes 7-9 si nécessaire.


## Poursuite des opérations
Maintenant que vous avez fait fonctionner le réacteur, vous devez le maintenir en bon état, alimenté en combustible et stable.

### Ravitaillement
La configuration étape par étape devrait suffire pour la plupart des missions, qui durent plus d'une heure, mais si vous devez ravitailler le réacteur, sortez par le sas, retirez l'ancienne barre de combustible, insérez-en une nouvelle et répétez le processus de démarrage. C'est une bonne idée de démarrer le générateur de plasma au préalable pour que l'équipage ne se plaigne pas du manque de puissance. Si vous utilisez une installation à plusieurs barres de combustible, il est généralement bon d'avoir une personne de confiance à la console pendant que vous remplacez les barres.

### Risques de sécurité
Avoir une bombe nucléaire à explosion lente dans son jardin comporte de nombreux dangers, dont le moindre n'est pas de vous faire exploser en petits morceaux si vous faites une erreur. Par conséquent, il est toujours bon d'être conscient des divers risques de sécurité qu'elle présente. Les deux principaux dangers sont liés au fait que le réacteur se trouve parfois dans un espace exposé et qu'il émet une quantité massive de radiations. Le premier est facile à contrer, il suffit de prendre une combinaison de protection, de préférence une combinaison d'ingénierie, d'y ajouter un réservoir d'oxygène et de porter un masque. La seconde est plus difficile. Même un réacteur à une seule barre de combustible émet une quantité massive de radiations, et quiconque s'en approche sans porter d'équipement de protection contre les radiations va lentement fondre de l'intérieur. Les tuiles au-dessus du cœur du réacteur, ainsi que celles qui se trouvent directement à côté, sont généralement si radioactives que même cet équipement ne vous aidera pas totalement, et même avec une combinaison de protection complète, vous commencerez rapidement à vous transformer en gelée si vous vous approchez trop près.

### Prévention du meltdown
La prévention d'une fusion est très simple, et il y a deux façons de le faire. La première consiste à enfoncer complètement les barres de contrôle lorsque le réacteur tente de fondre, ce qui peut ne pas être assez rapide si vous arrivez trop tard. La deuxième option consiste à sortir vous-même et à retirer manuellement les barres de combustible. Si vous échouez à l'une ou l'autre de ces options, vous serez <s>transformé en un brouillard rouge inclinable</s> toujours vivant et flottant dans l'espace parce que les explosions n'endommagent pas encore les gens.

### Prévention du sabotage
Si vous voulez empêcher quelqu'un de transformer volontairement l'ingénierie en un cratère, il y a quelques choses que vous pouvez essayer. Il y a deux endroits que vous devez protéger, tout en restant accessibles, à savoir le réacteur et sa console de commande. Si vous voulez empêcher le sabotage, cloisonner le réacteur et laisser un sas d'ingénierie est généralement le meilleur plan d'action. La console est généralement décemment protégée, mais si vous en ressentez le besoin, vous pouvez remplacer les fenêtres par des murs renforcés ou placer la console dans un endroit plus caché.

## 🎵 [I don't want to set the wooorld on fiiiire] (https://www.youtube.com/watch?v=pLvsmho1lGA ) 🎵
Disons que vous êtes un traître et que vous voulez faire disparaître l'ingénierie. Il y a plusieurs façons de faire exploser le réacteur, selon que vous vous approchez de la console ou du noyau en premier.

### Chernobyl
La méthode Tchernobyl consiste à s'attaquer à la console et à déplacer les barres de contrôle aussi loin que possible en espérant que personne ne s'en aperçoive, avant de faire exploser l'ingénierie pour ne pas mourir. Cette méthode prend plus de temps à se réaliser, et est plus facile à arrêter et à réparer, mais elle est beaucoup moins difficile à mettre en place que l'autre méthode.

### Bomba du Tsar du Ghetto
Si vous avez un désir de mort et que vous avez accès aux tiges elles-mêmes, cette méthode vous garantit le plus gros boom. Pour ce faire, il suffit de retirer toutes les tiges du noyau, de ne mettre que des tiges de combustible, de placer un démarreur et de courir comme un fou. Cette méthode est plus difficile à mettre en place mais ne peut pas être arrêtée à l'aide de la console et peut garantir que l'explosion du réacteur est absolument massive. Cela garantira un appel de navette et vous enverra très certainement dans le vide si vous n'êtes pas un antagoniste ou si vous avez une TRÈS TRÈS bonne raison de le faire