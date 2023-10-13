# Руководство по боёвке

## Введение
Боёвка в Unitystation очень комплексна и уникальна. Хотя основа, на которой она строится, сама довольно сложна, огромное количество взаимодействующих механик, привносимых другими системами, увеличивает ее сложность в геометрической прогрессии.
Это, а также социальный элемент, позволяет сделать бой в Unitystation более тактически уникальным.
К сожалению (или к счастью?), это делает бой в Unitystation очень сложным для освоения. Хотя это руководство ни в коем случае не будет охватывать все детали (иначе мы проведем здесь всю неделю), оно должно познакомить вас с основной боевой системой,
а также дать практические советы по ведению боя и работе над его усвоением.

# Основные системы
В основе боевой системы лежит сочетание частей [intent](\3_HowToPlay\Guides\General_guides\Intents.md) и системы здоровья. [Intents](\3_HowToPlay\Guides\General_guides\Intents.md) важны для взаимодействия с боевой системой, а знания о здоровье полезны для того, чтобы
уменьшить частоту смерти и позволить более эффективно выбирать цели.

## Интенты
Есть 4 [Интенты](\3_HowToPlay\Guides\General_guides\Intents.md). Помощь, захват, разоружить и удар

### Помощь (зелёный)
Помощь, как следует из названия, используется в основном для небоевых взаимодействий. Тем не менее, это полезно знать. Если вы идете с намерением помочь и не несете в руках оружие,
вы не можете ранить других, и будете меняться местами/проходить мимо тех, с кем столкнулись, а не останавливаться (хорошо подходит для погони или бегства). Используйте интент Помощи для помощи кому-либо (включая себя) с лекарством в руке применит лекарство к выбранной части тела,
исцелив ее (при условии, что вы применили правильные лекарства).

### Захват (Жёлтый)
Интент Захвата захватит человека, на которого вы его применили. Двигаясь, он может вырваться из захвата. Если человек схвачен и не сопротивляется, можно потянуть его за собой, что аналогично ctrl + click.
Если человек закован в наручники, он не сможет вырваться из вашего захвата, что позволит вам затащить его в тюремную камеру, если вы проявите милосердие, или в укромное место, если вы этого не сделаете.

### Разоружить (Синий)
Пусть вас не обманывает название: разоружение играет гораздо большую роль, чем простое вырывание оружия из рук. При использовании против другого игрока у него есть очень большой шанс выронить оружие,
которое затем можно подобрать и, возможно, использовать (обратите внимание некоторое оружие не будет стрелять без авторизации ID-Картой). Если вам абсолютно необходимо сражаться с кем-то, кто экипирован, но не обезоружен, НЕ используйте Интент Удара (Красный цвет).
Используйте интент разоружения (синий) что-бы использовать против них их собственное оружие. Это работает и в обратном направлении: не начинайте в ближний бой, если у вас есть оружие, так как вас, скорее всего, обезоружат и расстреляют из вашего же оружия.
своим же оружием. Если вы не можете избежать ближнего боя, если используете оружие ближнего боя, вы можете минимизировать риск быть обезоруженным, проводя как можно меньше времени в ближнем бое
и вместо этого использовать приём "удар и отступление" или неожиданно напасть на противника, чтобы (надеюсь) разрубить его до того, как он среагирует.

Однако на этом разоружение не заканчивается. Каждое отдельное обезоруживание имеет небольшой шанс сбить с ног обезоруживаемого человека. В таком состоянии человек оглушен и не может стрелять или отражать атаки ближнего боя.
Времени, которое дает нокдаун, НЕ достаточно для надевания наручников, не совершайте ошибку, приближаясь к разъяренному человеку с оружием, имея только одну свободную руку. Когда кто-то сбит с ног,
если вы очень быстры, вы можете забрать у него несколько предметов. Это может быть что угодно: рюкзак, спрятанное оружие, удостоверение личности. Если вы планируете сделать это, чтобы заполучить сочное удостоверение личности или
убедитесь, что вы знаете, где они могут находиться в инвентаре человека.

### Удар (Красный)
Интент Удара, как понятно из названия, используется для нанесения повреждений другим людям с помощью грубой силы. Если у вас есть намерение причинить вред, вы попытаетесь поразить тех, на кого вы нажимаете, в зоне ближнего боя. (даже если у него в руках оружие!)
с оружием в руках. Оружие может быть использовано и по другому назначению, а вред - это, в основном, для того, чтобы случайно кому-то навредить. Находясь в режиме удара, вы не сможете
применить медицину, помочь другим подняться и т.д. Если вы нажмете на кого-то с пустой рукой, то получится удар, который нанесет умеренный урон, но недостаточный для того, чтобы отбиться от человека.

## Система Лечения
IВ Unitystation система здоровья гораздо сложнее, чем в большинстве игр. Здоровье может быть уменьшено непосредственно 4 типами повреждений, два из которых наносятся отдельным конечностям. Общее здоровье - это базовое здоровье, за вычетом урона, наносимого конечностям,
и минус урон, нанесенный по другим причинам. Это означает, что достаточное повреждение одной конечности может привести к смерти, даже если это единственная поврежденная конечность.

### Типы Урона
Грубый урон наносится с помощью стрелкового оружия, большинства видов оружия ближнего боя и ударов. Онн может быть излечена с помощью повязок и накладывается на отдельные конечности. Ожоги аналогичным образом наносятся отдельным конечностям. лечится мазью, а поражается лазерами и огнем. Кислородный урон вызывается критическим состоянием или недостатком воздуха. Его можно замедлить с помощью СЛР (намерение оказать помощь человеку, находящемуся в критическом состоянии), а наиболее эффективно лечить
с помощью того, чтобы человек мог дышать, или с помощью лечения вывести человека из критического состояния. Повреждения от токсинов/отравления вызываются в основном токсинами, и их сложнее залечить, чем другие типы повреждений, для этого требуются
химические вещества для устранения.

### Нацеливание на конечность
На экране монитора находится маленькая кукла. при нажатии на части тела куклы они становятся мишенью это так-же позволяет лечить или травмировать определенные части тела. разные части имеют разные шансы быть успешно пораженными
(например, в голову попасть сложнее, чем в туловище). Если вы промахнулись скорее всего, попадёте в другую часть тела, и только в редких случаях урон не проходит совсем. Чем сильнее вы ранены,
тем больше вероятность промаха.

## Различные заболевания
Особо стоит отметить многочисленные ситуационные эффекты и предметы, играющие большую роль в бою.

### Оглушение (Стан)
Игроки могут быть оглушены несколькими способами. Разоуживание может на короткое время вывести их из строя, как и тазеры, а электрошоковые дубинки могут повалить человека на землю на достаточно длительное время, чтобы арестовать его.
Следует еще раз отметить, что тазеры и разоружение не дадут вам достаточно времени, чтобы заполнить шкалу прогресса наручников до того, как арестованный встанет на ноги.
Оглушенных игроков можно грабить, перетащив их спрайт на свой собственный, как и прикованных наручниками.

### Наручники
Наручники могут быть применены в любой момент, но для их надевания требуется время. Это означает, что вы не можете просто подойти к человеку с ножом и надеть на него наручники, не выведя его сначала из строя(но это не точно). Одним из немногих надежных методов на этот раз является электрошоковая дубинка, способная повалить человека на землю на достаточное время, чтобы вы могли надеть на него наручники.
Находящиеся в наручниках не могут причинять вред, наносить удары, поднимать предметы,
или сопротивляться захвату, то есть их можно безопасно переместить в другое место. Имейте в виду, что они все еще могут говорить по радио, если только вы не лишите их и этого.

### Слепота
Хотя и реже, но временная слепота может быть вызвана световыми гранатами и переносными вспышками. В ослепшем состоянии вы можете взаимодействовать и бегать, но не можете видеть.

# Оружие
В Unitystation существует очень большое количество оружия, и изучение того, какое оружие лучше всего подходит для выполнения тех или иных задач, позволяет добиться максимальной эффективности.

## Огнестрельное Оружие
Большинство видов огнестрельного оружия стреляет либо лазерами, либо пулями. Лазеры могут проходить сквозь окна и наносят в основном ожоги, а пули - физический урон.

### Лазеры
Лазерное оружие имеет только несколько установленных типов патронов, из которых очень распространены только два. Тазер/Электрический Болты оглушают игроков при ударе на короткий промежуток времени, болты-дезабилизаторы оглушают на практически полное бездействие, "убивающие" лазеры наносят умеренный урон от ожогов, а болты-разрушители наносят невероятный урон, способный расплавить стены.
Лазерное и энергетическое оружие, подобное ему, должно заряжаться на зарядных станциях.

### Патроны
В США существует очень большое разнообразие боеприпасов, практически для каждого пистолета используется свой тип пули. Многие из этих пуль также могут быть дополнены, например, AP, hollow point, incindiary и др.
Оружейные обоймы необходимо выбрасывать, когда оружие разряжено, щелчком по пистолету в руках, а заряжать - щелчком по пистолету, удерживая магазин. Пули, как правило, наносят больший урон, чем лазеры, но из-за необходимости носить с собой обоймы и отсутствия возможности быстрой стрельбы лазеры все же выигрывают конкуренцию.

### Полностью автоматическое оружие
Полностью автоматическое оружие, такое как пулеметы и автоматы, будет вести огонь до тех пор, пока вы удерживаете кнопку мыши. Несмотря на то что такое оружие способно быстро убивать людей, оно так же быстро расходует патроны, поэтому его необходимо часто перезаряжать.
Кроме того, они довольно неточны. За один выстрел они наносят меньше урона, чем другие виды оружия.
Они отлично подходят для уничтожения одиночных целей, если у вас есть время на перезарядку и подготовку, и отлично убивают тех, кого вы преследуете, но испытывают трудности в более длительных боях, когда мало возможностей для восстановления, и испытывают трудности на дальних дистанциях, заставляя вас приближаться к цели.

### Полуавтоматическое оружие
Оно стреляет один раз при нажатии кнопки мыши, обычно имеет более высокий урон за выстрел и достаточно точны.Полуавтоматическое оружие, стреляющее с малым временем ожидания, одинаково эффективно в засадах, как и автоматическое, но оружие с большим временем ожидания (например, винтовки и лазеры) с трудом позволяет убивать людей до того, как они успеют убежать.
Исключение составляет снайперка, которая имеет большой кулдаун, но отлично подходит для засад, просто благодаря своему огромному урону за выстрел.
Снайперское оружие не может убивать людей так же быстро, как автоматическое, но позволяет быть более внимательным и экономить боеприпасы.

## Оружие ближнего боя
Оружие ближнего боя по своей природе гораздо более опасно, чем дальнобойное, но при грамотном использовании оно может значительно компенсировать риск. В отличие от огнестрельного оружия, большинство видов оружия ближнего боя (за редким исключением) работают по одному и тому же простому принципу.
Однако способ применения оружия ближнего боя может меняться в зависимости от того, насколько эффективным и уникальным оно является.

### Низкая эффективность/импровизация/удары
Самодельное оружие (стулья, огнетушители и т.д.) гораздо менее эффективно, чем другое оружие ближнего боя, но его доступность означает, что зачастую это все, что у вас есть. Используя их,
вы можете броситься на землю и иметь больше шансов быть разоруженным, чем тот, кто использует более мощное оружие, так как в случае потери своего вы можете просто схватить другое. Это означает, что лучше всего двигаться из стороны в сторону
лицом к цели, нанося по ней многократные удары или обмениваясь обезоруживающими приемами (особенно если вы безоружны). Это оружие не следует использовать для покушения на человека, так как он, скорее всего, убежит,
но для самозащиты оно подходит как нельзя лучше.

### Высокоэффективное оружие ближнего боя
Оружие ближнего боя, такое как мечи и сабли, встречается реже, но гораздо более губительно. Их главная слабость не столько в них самих, сколько в том, что вы можете быть разоружены и оружие будет использовано против вас, а вы не можете так просто достать еще одно оружие. Поэтому, когда у вас есть такой противник, вы хотите свести к минимуму время, в течение которого он может вас обезвредить.
Этого можно добиться, либо разрубив его, прежде чем он успеет среагировать в засаде, либо атакуя лишь короткими промежутками времени.
Вместо того чтобы бросаться на противника, лучше оставаться на расстоянии одной-двух плиток от него и неожиданно появляться в зоне ближнего боя, чтобы нанести ему быстрый удар, а затем отпрыгнуть назад.

## Метательное оружие
Существует три основных типа метательного оружия: самодельное, специальное и гранаты. Бросать предметы можно как с помощью кнопки " throw ", так и с помощью горячей клавиши "r" (по умолчанию).

### Самодельное метательное оружие
В эту категорию попадают оружие ближнего боя (например, мечи), бросаемое в нападающих, и другие предметы, например, напольные плитки. Быстрота метания предметов, а также приличный урон за бросок означают, что метательное оружие может быть неожиданно смертоносным, даже если оно самодельное.
Особую опасность самодельное оружие представляет благодаря обилию боеприпасов. Напольная плитка, как и стулья, и огнетушители, являются хорошим метательным оружием, и они есть абсолютно везде. Это означает, что вы можете участвовать в дистанционном бою даже без специального оружия.
Это дает вам преимущество перед теми, кто использует оружие ближнего боя.

### Специализированное метательное оружие
Существует мало таких изделий, и тот факт, что их можно просто выкидывать при возврате, делает их труднопродаваемыми. Они недостаточно много делают, чтобы оправдать свое низкое качество.
Если они у вас есть, используйте их, но я бы не советовал активно искать их.

### Гранаты
Гранаты, напротив, абсолютно оправдывают свою редкость, даже если не принимать во внимание химию. Гранаты могут нанести один удар по человеку, заставить его бежать, и, кроме того, их можно скрафтить.
Чтобы использовать гранату, необходимо сначала активировать ее, нажав на нее в руке. В этот момент вы бросите его в следующее место, на которое вы нажмете (нажатие R или кнопки броска заставит вас продолжать держать его, поэтому не трогайте их).
По истечении таймера граната взрывается, нанося значительные повреждения игрокам и объектам, попавшим под взрыв.

## Особо полезные инструменты/оружие/предметы.

-Тазеры: оглушают на короткое время, полезны для приближения к цели.
-Дубинки: оглушают на очень длительное время (если это не складная дубинка!), достаточно для надевания наручников.
-Огнетушители: покрывают большую площадь скользящей жидкостью
-Световые гранаты: слепота и оглушение
-Наручники: наручники, наручники
-Магбуты: предотвращают скольжение, но замедляют движение
-банановая кожура/клоунские КПК/подобные предметы: проскальзывают, когда на них наступают
-Лом: не очень хорошее оружие, инструмент для изготовления напольной плитки
-напольные плитки: эффективное и очень дешевое метательное оружие.
-Лит-сварки, топоры, ящики с инструментами: эффективное и простое в приобретении оружие ближнего боя

# Броня
Броня довольно проста: она снижает урон от определенных источников на определенный процент.

## Жилеты, шлемы, плащи
В Unitystation существует три основных типа брони, которые обычно доступны членам экипажа. Пуленепробиваемое, стандартное и омоновское снаряжение. К ним прилагаются соответствующие шлемы, и каждый из них
хорошо справляется с определенными видами повреждений. Пуленепробиваемое снаряжение снижает урон, наносимый пулями, но плохо противостоит лазерам и не годится для оружия ближнего боя. Иначе обстоит дело с омоновской броней, которая превосходно защищает от ближнего боя, но страдает от пуль.
Стандартный защитный жилет является промежуточным звеном между ними. Другие, более редкие предметы могут обеспечивать аналогичную защиту.
Например, жилет капитана, мундир Главы Службы Безопасности, жилет вардена и множество эстетических вариантов других жилетов - все они обеспечивают защиту.

## Скафандры
Не обманывайтесь их внешним видом, большинство скафандров гораздо хуже других видов брони, когда дело доходит до боя. Не обращая внимания на то, что (на станции) только скафандры охраны и капитана имеют показатели брони, сравнимые с бронежилетами, скафандры сильно замедляют вас, что означает, что вы менее способны убежать или преследовать других и более предсказуемы.
Основное их использование - это выход в космос или прорвавшиеся регионы, чтобы поймать в них кого-либо.
Единственное исключение - бронекостюмы, используемые ядерщиками, которые не замедляют работу пользователя и обладают высокой бронестойкостью.

# Приобретение оборудования
Все оборудование в мире не поможет вам, если вы им реально не владеете. Для этого существует множество способов его приобретения. Ниже приведены некоторые идеи.
- Купить/подкупить за это (это же социальная игра, в конце концов)
- Используйте своих друзей (зачем же они вам ещё?)
- Приобрести его законным путем (taking a tazer as [sec](\3_HowToPlay\Jobs\Security_roles\Security-Officer.md), for instance)
- Кража с маскировкой или без нее
- Убийство или ограбление человека, у которого она есть
- Иные способы которые можно найти в [руководстве по доступам](\3_HowToPlay\Guides\General_guides\Access.md)

# Бой
Бой в unitystation в основе своей базируется на знаниях, снаряжении и планировании. Безусловно, рефлекторное мастерство играет свою роль, но в бою чаще всего побеждает тот, кто первым наносит удар и накапливает наибольшее количество преимуществ, уменьшая их у противника, а значит, почти всегда лучше подождать и подготовиться, если есть такая возможность, а не бросаться в бой.

## Планирование
Хороший план - это отличный способ обеспечить себе победу в борьбе. Если вы придете подготовленным, оснащенным и готовым к встрече с тем, кто не знает об этом или ещё не догадывается, у вас будет огромное
преимущество. Аналогичным образом, если кто-то устраивает засаду или иным образом готовит против вас заговор, лучший выбор - бежать и планировать свою защиту. Tесть много вещей, которые можно учитывать при планировании,
например, оборудование, доступ, окружающая среда, отношения, поведение и собственное мастерство.

### Экипировка
Если о самом оборудовании уже говорилось выше, то планирование его использования - это совсем другое дело. При планировании следует учитывать прежде всего то, что у вас есть под рукой, например, подручные средства
или способы доступа к более скрытым местам, если вам нужно будет бежать. Если по вашему плану требуется определенный предмет, то часто лучше рассмотреть альтернативный маршрут, чем приобретать этот предмет, если он представляет опасность.

При этом следует учитывать, что есть у оппонента, если это возможно. Если они, например, одеты в броню возьмите с собой оружие, если у них есть свое, наденьте бронежилет.
Противники, не имеющие специального оружия или брони, являются легкой добычей, поэтому, если вы можете устроить засаду без снаряжения или заставить кого-то снять его, стоит напасть,
даже если у вас нет определенного плана.

### Доступ
То, что трудно определить, но очень полезно знать, - это уровень доступа врага а также ваш собственный, и как они соотносятся. Если этого не учитывать, то в итоге можно устроить
засады, в которые невозможно заманить, и забегать в места, где все равно смогут вас выследить. Наличие большого доступа открывает более легкий доступ к снаряжению и путям эвакуации, в то время как низкий доступ часто
ограничивает вас открытыми и незащищенными участками с небольшим количеством снаряжения.

Если вы сражаетесь с человеком, имеющим более широкий доступ, лучше всего устроить засаду, особенно в районе, где он чувствует себя в безопасности, чтобы уничтожить его до того, как он сможет пустить в ход свое оборудование или сбежать.

С другой стороны, при борьбе с противником, имеющим более низкий уровень доступа, зачастую эффективнее загнать его в угол и преследовать, используя свой более высокий уровень доступа для использования коротких путей и
сократить разрыв. Если им удастся одержать верх, вы сможете скрыться в области, куда они не смогут попасть.

### Окружение
Если вы планируете проводить бои в определенном месте, полезно знать, как оно расположено, и какие вредоносные факторы влияют на это место. Например, при ведении боевых действий в космосе необходимо
заранее спланировать выход в космос, взяв с собой необходимые припасы, а также учесть отсутствие гравитации. Тесные помещения с большим количеством углов, такие как основные помещения, отлично подходят для засад с применением ближнего боя, в то время как
Более открытые участки, такие как коридоры, хорошо подходят для перестрелок.

Кроме того, необходимо учитывать такие факторы, как видимость, удобство эвакуации, возможное подкрепление и опасности.

Следует отметить, что вы всегда можете изменить окружение под себя. Атмосферные техники могут легко устроить пожар, любой может разбить окно в космос, и любой (но особенно инженеры) может построить новые сооружения.

### Отношения
Учет отношения целей очень полезен для внезапных атак и засад и очень прост.Если ваш объект доверяет вам и дружит с вами, вы можете
очень легко заманить его в изолированную комнату, где вы сможете совершить свое злодеяние (нет, не это, выкиньте мысли из головы).

Знание того, кого цель считает своими друзьями, также полезно для прогнозирования возможной помощи, которое теперь можно планировать.

### Поведение
Знание того, как кто-либо ведет себя, по понятным причинам, отлично подходит для организации внезапных атак, но также играет большую роль в более открытом бою. Если вы знаете, что кто-то
знает, что он менее важен, скажем, помощник, то он может быть готов пойти на больший риск или даже на самоубийство, чтобы попытаться отстраниться от вас. С другой стороны, капитаны и другие руководители обычно
при первых признаках неприятностей бегут к службе безопасности, поэтому следует приготовиться к погоне. Некоторые могут даже проигнорировать вас как возможную угрозу в пользу более важной цели, например, если Ядерные Оперативники украдут диск.
или кто-то пытается вызвать шаттл.Понимание того, как будет реагировать человек, приходит со временем, хотя чтение страниц, посвященных самим ролям, может дать вам представление о том.

### Скилл
Наконец, следует оценивать свое мастерство в сравнении с противниками. Если вы подготовлены одинаково, но они играют уже давно, то лучше их не трогать. С другой стороны, если вы
опытный, то, вероятно, вы можете позволить себе вступать в бой с меньшими раздумьями и подготовкой, хотя это и не рекомендуется. Скилл не является решающим фактором, поэтому не бойтесь устроить засаду на 1000-часового ассистента,
если вы чувствуете себя подготовленным.

## Движение
Умелое передвижение сокращает количество возможностей для атаки противника и позволяет действовать в благоприятных ситуациях.
А также позволяет легче убегать и легче ловить других. Если вы намерены ввязываться в драки, то, вероятно, лучше избегать
всего, что может снизить скорость передвижения, например, защитные костюмы или магбутсы.

### Открытый бой
How you approach open combat movement wise differs depending on what weapons you are equipped with. In all cases, it is best to remain further away, but in range, until you
intend to attack.

Melee vs Melee: Stay a tile or two away, when ready, charge at your opponent, rapidly clicking infront of you on their predicted position. when you get a hit in, retreat back. To trade blows (if you are better equipped)
shuffle left and right close to your opponent, attacking constantly.

Melee vs firearms: Not reccomended, for very obvious reasons. The person with a gun can damage you from a distance, so staying further away wont work. Attempt to close the gap by dodging rounds,
and dont attempt to chase them if they begin to kite you. DO chase them if you are following them from a single tile behind. If you can bait them into following you, use a corner to force them into close range. Break off and retreat
often, and attack unpredictably. Preferably fight in an enclosed area.

Firearms vs Melee: stay far from the other opponent, when chasing them across a corner, curve wide. try to bait them into following you, so that you can kite them. A quick burst from
most guns is typically enough to end any would-be jack the ripper.

Firearms vs Firearms: Depends on the weapon in question. Weapons like the shotgun or uzi, which dont do well at long range, should be treated almost like melee weapons, while if you are weilding one
more akin to a rifle, you should keep as much distance between you and your opponent as possible. Try to have your opponent chase you, and not the other way around. Attack unpredictably, and use lockers/corners
for surprise attacks. Never fight someone who is much better equipped if you intend to live.

### Chasing
People dont like becoming corpses, and for this reason many of them will choose to flee instead of fighting you. In these situations, it is helpful to know how to disable your opponent.

When you are chasing someone you are entirely on the back foot. They can slip or mislead you while you have no recourse save firearms. There are however a few things you can do to raise your odds
of success.

Knowing when to slow down or dodge to avoid slips is critical to hunting someone down, as a single slip can mean game over. If you are equipped with magboots, you can disregard this,
though you will be slower overall.

If someone escapes out of sight, follow their trail of open doors. If the trail stops be sure to stop and look around for lockers where they could have hidden and search them.

High ROF weapons such as smgs are great when taking down someone on the run, as you can simply out-spray their ability to dodge bullets. Disabler bolts are similarly good, as they can
bring someone close enough to be shot with a tazer round.

### being chased
Oftentimes you will be caught on the backfoot and forced to flee, or perhaps do so intentionally to bait an opponent into a trap, in both situations it is helpful to know a few tricks to gain the advantage.

If you are looking to lose or disable your opponent quickly, slipping them is a good way to do so. Drop a bannana peel when they are directly behind, or use an extinguisher, and watch as they collapse on the floor,
either letting you run off until you are hoplessly far away to be caught or allowing you to turn them into swiss cheese with your own weapons (or theirs! Remember, you can loot them).

But this is not always possible, or feasable. the person chasing you may simply be equipped with magboots or be skilled enough to avoid your techniques. In these situations, you should try and run on the inner side of the hall
towards and doors you plan to enter. Corners are useful for breaking up lines of sight, while intersections will make your pursuer choose between routes. If you are far enough ahead, be sure to open doors to fool your pursuers
into going down incorrect paths.

Should this fail, you can choose to hide, typically in a locker, or escape into an area your pursuer cannot access or doesnt want to enter (such as space).

## Groups
Fighting as a cohesive group is very difficult in unitystation, but is also very rewarding, and practically necessary for antagonists such as nuke ops. If your opponent is a group, cohesive or not, there are ways to fight them, though they may be risky.

### Fighting as a tight group
Fighting in a cohesive group gives the group a MASSIVE advantage over any Rambo, with very few disadvantages. People in the group are less likely to end up dead, as any injuries can be dealt with while others lay down covering fire. The added firepower is also a great bonus, a man with a taser and e-sword may be an extremely deadly threat, but not to 3 guys with their own weapons. If you wish to fight in a cohesive group, good luck, they are very difficult to form from ordinary crew. If you are a security officer or nuke op however, you can be shoved into one by your superiors or start in a group. One thing typically needed for a cohesive group is an involved leader. In secs case, this is typically the HoS, due to his rank. in nuke op squads or militias however, it may be difficult to find a leader, and the group will start to rapidly lose cohesiveness without one. I have personally seen many nuke ops lose simply because their team split apart and drifted from a lack of leadership.

### Fighting as a spread out group
Fighting while spread out is the typical course for non-emergency period security as well as rebels. In this non-cohesive form, the group your in is more prone to take losses, but [assuming everyone is competent](\4_Univers\Other\Jokes\So-close-to-impossible-that-it-might-as-well-not-even-exist.md), is also capable of inflicting far more damage and covering more ground. The fact that each individual in a spread out group needs combat competence is the reason security so often falls to the all consuming entropic force that is the grey tide, because if one link in security doesn't work, thats an unstopped crime, which leads other to more crime, which piles up and piles up until the station is slagged. Spread out groups can form sporadically and with varying degrees of focus. Assistants, as an example can vary widely from the usual random shenanigans, to the razor focused [tunguska revolt](Tunguska.md).

### Fighting groups
Fighting groups can take two routes, depending on the form of the group. a rarer third route is available if you have a group yourself, however.

Fighting a clumped up together group as a lone person is HARD, simply due to the fact that there are more people. One of the best things you can do to give yourself an advantage is to simply spread the group out. a grenade or other explosive will force a group to split up somewhat, allowing you to pick off a member or two. If they are in a tight space with limited exits, a grenade can spell death for the entire group, making them incredibly powerful. In tight groups, people may split off momentarily to deal with injured or other small tasks. if you've only got single target weapons, this is a great time to strike. If the person you find is a doctor of the team tending to an injured person, shoot the injured person. this will often lend you a free kill, and make the doctor either have to leave them dead or drag them to cloning, the latter giving you the opportunity to take them down as well. Fighting melee against tight groups is typically suicide, and not recommended.

Fighting spread out groups is far, far easier than fighting a tight group. if youre fighting a spread out group, treat every person you fight as someone peeled off from a tight group, and use the same tactics discussed above for dealing with them. in this case, a quick melee attack can be viable, unlike with tight groups.

Fighting groups with your own groups can go a few ways. Spread out vs Spread out is a toss up, and typically decided by a few robust players. Tight vs Tight typically turns into a bloodbath where nobody wins. Tight vs spread out will nearly always result in the tight group winning.

## Aftermath
Well, you killed someone, or a lot of people. Turns out, killing people can have repercussions.  There are typically three routes you can go down, with varying degrees of legality and possibility for revenge.

### Taking responsibility
You see that fella you killed? time to unkill him. This is the best way to avoid the wrath of [sec](\3_HowToPlay\Jobs\Security_roles\Security-Officer.md), the guy you killed and any admins, though it isnt a good option for when you [need them dead](\3_HowToPlay\Jobs\Antagonist_roles\Antagonist_roles.md) for your employers and may be impossible to do depending on how wanted you are already. The best case scenario is dragging them to cloning yourself, second best is leaving them outside medbay, and third best is just dragging them out into the hall and leaving them there for someone else to clone.

### The null outcome
Simply dont touch the body after your done. This can be taken as a sign of mercy, incompetence, or mocking, depending on the whims of the person you killed. It wont let you avoid the wrath of [sec](\3_HowToPlay\Jobs\Security_roles\Security-Officer.md), and can leave the guy you killed mad, but it can be enough to make admins brush it aside, so long as you had reason to kill them in the first place. Definitely not the best option, but sometimes necessary, especially if your on the run already.

### FINISH HIM
The least legal option, by far, the one most likely to leave both the guy you killed and any watching admins mad, but one that can leave the least consequences if pulled off correctly. This option, for obvious reasons, is not a good choice for most interactions for non antags (other than say, gibbing a nuke op), but is excellent for anyone looking to cover their tracks and make sure the person they killed doesn't come back to bite them later down the line. Simply take a knife and cut them up, or toss their body into the void of space. Shoving them in an obscure locker may work, but runs the risk of them being found later.

## Getting Better
Even if you read this page a thousand times, without practice your still going to get your ass beat. the best way to learn to fight in game is to simply fight. stage ragecage matches, play [sec](\3_HowToPlay\Jobs\Security_roles\Security-Officer.md), be an [antag](\3_HowToPlay\Jobs\Antagonist_roles\Antagonist_roles.md), just don't get mad when your tossed in a cell to rot or turned into swiss cheese by gunfire.

  <br/>
<br/>
<br/>

import Jobs from '/docs/3_HowToPlay/Jobs/Jobs.md'

<Jobs />









