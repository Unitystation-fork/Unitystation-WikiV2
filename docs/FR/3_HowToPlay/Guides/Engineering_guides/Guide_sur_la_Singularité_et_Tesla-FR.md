# Guide des moteurs à singularité et tesla
Remarque : bien que le moteur à singularité et le moteur tesla soient plus simples que le [réacteur nucléaire](Guide-pour-le-reacteur_nucleaire-FR.md), le coût d'un échec est beaucoup plus élevé. C'est pourquoi vous devez vous familiariser avec l'[ingénierie](Engineer.md)
AVANT d'y toucher, à moins, bien sûr, que vous n'ayez l'intention de faire échouer le moteur dès le départ.
 
## Aperçu
La singularité et le tesla sont très similaires, à tel point qu'un seul guide peut couvrir les deux. Bien qu'ils diffèrent dans certains aspects, tels que la production d'énergie,
ils peuvent généralement être traités de la même manière. Ce guide couvrira les spécificités des deux, comment les démarrer et comment les faire fonctionner.

## Contexte
Il est important de savoir comment fonctionnent les réacteurs de singularité et tesla avant de les configurer.

### L'accélérateur de particules
L'accélérateur de particules, communément appelé "PA", est une machine en plusieurs parties qui consomme une grande quantité d'énergie afin de créer des flux de particules à haute énergie (nuisibles).
Un accélérateur de particules forme un T, dont la partie supérieure est constituée des trois sections de l'émetteur. Une console est fixée sur un côté de l'accélérateur de particules, à partir de laquelle il est contrôlé.

Dans la console, l'accélérateur de particules peut être allumé ou éteint, et son niveau de puissance peut être modifié. Des niveaux de puissance plus élevés entraîneront une plus grande croissance de la singularité et du tesla, peut-être jusqu'à un point dangereux. Chaque niveau de puissance nécessite une quantité croissante d'énergie alimentant le PA pour être maintenu ou activé.

Les particules émises par le PA sont capables de traverser les boucliers (mais pas les émetteurs de bouclier !), et en frappant de manière répétée les générateurs de singularité et de tesla, ils formeront une singularité ou une boule de tesla.
Ils "alimenteront" également la singularité et le tesla une fois qu'ils seront générés.

Bien que certaines stations commencent avec un seul, un PA peut être acheté par cargo si nécessaire.

### Les générateurs de bouclier (et les émetteurs)
Les générateurs de bouclier servent à contenir les objets très dangereux qu'ils contiennent. Pour ce faire, ils doivent d'abord être arrachés. Les générateurs de bouclier ne sont pas alimentés par des câbles,
et doivent à la place être alimentés en étant tirés par un émetteur. Les émetteurs tirent périodiquement un rayon vert en ligne droite, qui inflige des dégâts importants s'il touche un joueur. Gardez à l'esprit que toute machine (par exemple, un collecteur de radiations) située entre un émetteur et un générateur sera touchée par le rayon et éventuellement détruite. Une fois qu'un générateur de bouclier est chargé, il peut être allumé manuellement, ce qui lui permet de répartir ses boucliers et (dans une certaine mesure) sa puissance entre les autres émetteurs de boucliers. La configuration générale du générateur de bouclier, qui fonctionne pour La configuration générale des générateurs de bouclier, qui fonctionne à la fois pour la singularité et le tesla, est un carré de 5x5, avec les générateurs dans les coins, un espace de trois tuiles vides entre eux.

Gardez à l'esprit qu'avoir trop de boucliers et pas assez d'émetteurs peut signifier que les boucliers consomment de l'énergie plus vite que les émetteurs ne peuvent en fournir, et que les boucliers finiront par tomber en panne.

### Singularité et machines spécifiques à la singularité
La singularité détruira les objets et les joueurs/mobs qui y tomberont, et aspirera vers elle les objets, personnes et créatures qui s'y trouvent. Toucher la singularité est une sentence de mort garantie, et une singularité perdue est souvent une raison suffisante pour appeler la navette. La singularité se déplace, même lorsqu'elle est contenue, mais ne peut pas détruire ou passer les boucliers générés par les générateurs de boucliers à moins d'être suffisamment grande.

La singularité peut croître en absorbant de la masse (c'est-à-dire vous et le reste de la station), ce qui peut être assuré par l'accélérateur de particules. La masse de la singularité va lentement diminuer en la convertissant en radiations, mais le taux de conversion de masse est suffisamment faible pour qu'une singularité lâche ne soit généralement pas "affamée". 

Les collecteurs de radiations sont le moyen d'obtenir de l'énergie à partir de la singularité. Ils convertissent le rayonnement produit par la singularité en électricité, qui peut être utilisée à son tour pour alimenter la station.
Vous devrez les placer aussi près que possible du champ de protection, mais pas entre les générateurs de bouclier ou dans la zone de confinement de la singularité. Ensuite, connectez-les à la station.
Après avoir été placés et sécurisés, les collecteurs de radiations peuvent être déployés en cliquant dessus. Ils ne fonctionneront que dans leur état déployé.
Curieusement, il n'y a pas de différence entre le rayonnement produit par une singularité et un réacteur nucléaire, donc ils peuvent aussi être utilisés à bord de stations sans singularité pour améliorer la puissance de sortie et la production d'énergie.


Pour créer la singularité elle-même, vous aurez besoin d'un générateur de singularité. Le générateur de singularités doit être placé au centre du carré du bouclier, où il peut être touché par un PA.
Il n'a pas besoin d'être relié à quoi que ce soit. Lorsqu'il est touché par un PA de manière répétée (de préférence après que les générateurs de bouclier soient activés), il crée une singularité de niveau 1, qui occupe une seule tuile.
En raison de la nature de la singularité, le générateur est détruit dans le processus.

La singularité peut ensuite croître de plus en plus à mesure qu'elle est alimentée. Une singularité de stade deux produira plus d'énergie et occupera 4 tuiles, mais nécessitera plus de masse pour se maintenir (la tendance des stades ultérieurs à convertir la masse plus rapidement se poursuit).
Il peut fournir de l'énergie à la plupart des stations sans trop de difficultés.

Les plus grandes stations peuvent nécessiter une singularité de stade 3. Bien qu'elle puisse être contenue de la même manière que les stades précédents, elle occupe 9 tuiles. Il a besoin d'une grande quantité de masse entrante pour se maintenir, mais faites attention
à ne pas la suralimenter, car il devient beaucoup plus difficile de la contenir dans les stades ultérieurs.

Les singularités de stade 4 et 5 détruisent les murs et les machines ordinaires, même les générateurs de boucliers. Alors qu'une singularité de stade 4 peut théoriquement être contenue (elle n'arrache pas les générateurs de boucliers), une singularité de stade 5
consumera tout ce qui la contient, et il est certain qu'elle se libérera. En général, vous ne verrez une singularité de stade 4 et 5 que lorsqu'une singularité s'est déjà détachée et a mangé suffisamment de la station pour atteindre un tel niveau et une telle taille.

Il existe un cinquième type de singularité, une singularité de super-matière, qui ne peut se produire que si une singularité mange un cristal de super-matière. Elle occupe une surface énorme, exerce une attraction massive, et vous êtes généralement fichu s'il en existe une.
et vous êtes généralement foutu si l'une d'entre elles existe. Ne vous donnez pas la peine d'essayer de la contenir, elle vous enflammera et vous transformera en une fine nouille atomique. 

### Tesla et les machines spécifiques Tesla

Par rapport à la singularité, la Tesla présente à la fois de nombreux avantages et inconvénients. Comme la singularité, le noyau du Tesla va errer sans but. Il émettra périodiquement des décharges d'arc électrique.
La puissance (et la production d'énergie) de ces explosions est proportionnelle au nombre d'orbes en orbite autour du tesla lui-même. Lorsqu'ils atteignent une machine ou un joueur, les arcs électriques causent d'énormes dégâts ou font exploser la machine (souvent avec une puissance suffisante pour provoquer des brèches). Les dommages causés par un arc sont souvent suffisants pour tuer instantanément un joueur, et les gants isolants ne vous sauveront pas. Ces arcs rendent le tesla beaucoup plus dangereux quand il est en liberté qu'une singularité.

Contrairement à la singularité cependant, une fois que le tesla a été mis en place, il ne nécessite pas de surveillance et est facile à contenir. Le tesla ne peut pas briser les machines qui l'entourent de l'intérieur si la machinerie est correctement configurée, même si le tesla est à sa taille maximale.

Les arcs teslas frapperont en priorité les tiges de mise à la terre et les bobines tesla avant tout le reste. Les tiges de mise à la terre servent à empêcher les arcs d'endommager les bobines ou les générateurs de bouclier, et les bobines convertissent les arcs en énergie. Une bobine tesla ou un générateur de bouclier touché par un arc sans mise à la terre SERA endommagé, ce qui peut entraîner la défaillance du confinement s'il est mal configuré.

Le tesla et la singularité sont générés par des moyens presque identiques, bien que le tesla utilise plutôt le "générateur tesla". Frappe le générateur de tesla et le tesla qu'il crée avec
PA pour créer le noyau tesla et faire grandir les orbes autour de lui. Contrairement à la singularité cependant, le tesla ne se détache pas lorsqu'il est trop grand, alors n'hésitez pas à frapper le PA au maximum et à le laisser allumé.

## Mise en place des générateurs

0 : Dans les deux cas, vous devrez trouver une région vide de 5x5 (ou plus), ainsi que de l'espace pour les émetteurs, le câblage et le PA. Rassemblez le matériel approprié, c'est-à-dire les pièces du PA, les câbles, les machines spécifiques au générateur que vous voulez créer, les générateurs de bouclier, et le matériel pour le générateur.
générateur que vous voulez créer, les générateurs de bouclier et les émetteurs. La région doit également avoir un bon accès au réseau électrique de la station.

1 : Placez les générateurs de bouclier dans les coins du carré 5x5 (ou plus grand). Il devrait y avoir un espace de 3 tuiles entre eux si vous utilisez une région 5x5. Déposez les générateurs. Les générateurs n'ont pas besoin d'être reliés à quoi que ce soit.

2 : Placez les émetteurs en face des générateurs. Généralement, un espace d'une tuile est laissé, mais c'est facultatif. Les émetteurs doivent être reliés au réseau électrique de la station ou être alimentés d'une autre manière.
Comme les émetteurs sont dangereux et consomment beaucoup d'énergie, ne les allumez pas encore. N'oubliez pas de les arracher pour qu'ils soient orientés dans la bonne direction, puis de les souder au sol.
   
3 : Déplacez le type de générateur que vous avez choisi (singularité ou tesla) au centre de la construction. Il devrait être équidistant de tous les générateurs de bouclier où il peut être facilement touché par le PA.
touché par le PA. Démolissez le ou soudez le si possible.

4 : Construisez le PA. Les régions rectangulaires d'apparence similaire, surmontées de ce qui ressemble à des bobines rouges, doivent former le haut d'un T (si vous dirigez votre PA vers le haut). Elles sont étiquetées pour indiquer de quel côté où elles doivent être placées. Ces pièces, ainsi que toutes les autres, doivent être abaissées lorsqu'elles sont placées.

Directement derrière eux, placez la partie qui ressemble à une bobine exposée ou à un tube magnétique. La partie rouge doit faire face aux régions que vous venez de placer.

Derrière, placez la partie de l'interface de la console. Elle est assez clairement asymétrique. Si le PA est tourné vers le haut, la région plate doit être tournée vers la droite.
Dans la région adjacente à la partie plate, vous devez placer la console elle-même.

Et, pour couronner le tout, utilisez la partie qui ressemble à une balle.

Connectez la console ou toute autre partie du PA à une source d'alimentation. Le PA demande de très grandes quantités d'énergie, donc un générateur de plasma, le réseau de la station, ou un réacteur existant est recommandé. Testez le PA (pour un seul tir !)
sur la construction pour voir s'il fonctionne.

Il ne doit rien y avoir sur le chemin du PA. Les sols et les vitres ne posent pas de problème, ni les tables, mais les grilles, les émetteurs, les générateurs de bouclier et les murs bloqueront les particules. Notamment, la barrière d'énergie mise en place par les générateurs de bouclier ne bloquera pas les particules.

4.5 A : Si vous créez une singularité : placez des collecteurs de radiations le long de l'extérieur de l'endroit où le champ de protection sera généré. démolissez les. ils ne devraient pas bloquer les trajectoires des particules PA. Déployez les en les cliquant. Reliez les à un transformateur et autres convertisseurs électriques

4.5 B : Si vous réalisez un tesla : Placez une bobine tesla de chaque côté de la construction, à l'exception de celle qui fait face au PA. En même temps, placez une ou deux tiges de mise à la terre de chaque côté. Connectez les bobines de tesla à un transformateur ou à d'autres dispositifs électriques et assurez-vous qu'elles sont bien fixées en place.

5 : Allumez les émetteurs. S'ils ont été configurés correctement, cela devrait être aussi simple que de cliquer dessus. Sinon, vérifiez qu'ils sont bien fixés et alimentés.

6 : Attendez que les émetteurs alimentent les générateurs de bouclier. Ceci est représenté par une barre sur le générateur de bouclier qui se remplit lentement d'une couleur bleu clair au fur et à mesure que le générateur devient plus puissant.

7 : Lorsque les générateurs sont pleins, allumez-les. Cela créera le champ de protection.

8 : Retournez au PA et allumez-le. Cela créera une singularité contenue ou tesla qui commencera à créer de l'énergie. Veillez à ce qu'elle soit alimentée, mais pas trop. Si vos bobines de tesla ou les collecteurs de rayonnement ont été correctement câblés à la station (voir [guide de l'électricité](Guide-To-Electricity.md)), vous fournirez de l'énergie.

