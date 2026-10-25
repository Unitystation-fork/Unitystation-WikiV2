---
sidebar_position: 5
---

# The (Revised) Guide to Combat

## Introduction
Combat in Unitystation is both very complex and unique. While the base upon which it is built on is itself rather intricate, the myriad of interacting mechanics introduced by other systems
increases its complexity exponentially. This, aswell as the social element, lends itself well to making combat in unitystation more tactically unique.
Unfortunately (or fortunately?) this makes combat in unitystation very difficult to master. While this guide will by no means cover all the details (wed be here all week), it should
introduce and teach the core combat system, aswell as provide practical advice for combat and how to work towards a better understanding.

# Core systems
The very core of the combat system is a combination of parts of the [intent](\3_HowToPlay\Guides\General_guides\Intents.md) and health systems. [Intents](\3_HowToPlay\Guides\General_guides\Intents.md) are important to learn to interact with the combat system, and health is good
to know to reduce how often you die, and allow you to more effectively choose targets.

## Intents
There are 4 [intents](\3_HowToPlay\Guides\General_guides\Intents.md). Help, grab, disarm and harm

### Help (green)
Help intent, as implied by the name, is mainly used for non-combat interactions. It is still useful to know. If you on help intent, and not carrying a weapon in your hands,
you cannot injure others, and will swap places/pass those you run into rather than stopping (good for chasing someone or being on the run). Using help intent on someone (including yourself) with medecine
in hand will apply the medecine to a selected body part, healing it (assuming you apply the correct meds).

### Grab (yellow)
Grab intent will grab the person you use it on. By moving, they can break out of your grab. When someone is grabbed, and not resisting, you can pull them, much the same as ctrl + click.
If someone is handcuffed, they will be unable to break out of your grab, letting you pull them into a prison cell if your merciful, or into a discrete location if your not.

### Disarm (blue)
Dont let the name fool you, disarm plays a far bigger role than just wrenching a weapon out of someones hands. If used on another player, they have a very good chance to drop their weapon,
which you can then pick up, and possibly use (note, some guns are locked by id-based firing pins). If you absolutely must fight someone who is equipped, and are unarmed, DONT use the harm intent.
use the disarm intent and use their own weapons against them. This also works in reverse, dont get in melee range if you have a gun, as you will likely get disarmed and lit up with
your own gun. While you cant avoid getting in melee range if your using a melee weapon, you can minimize the risk of being disarmed by spending as little time in melee range as possible (in open combat)
and instead using Hit-and-Retreat methods, or by surprising/ambushing your foe to (hopefully) chop them up before they react.

Disarm doesnt stop there, though. Each individual disarm has a small chance to knock over the person being disarmed. While knocked down, people are stunned, and cannot shoot or melee back against attacks.
The time given by a disarm knockdown is NOT enough to handcuff people, dont make the mistake of coming close to an angry man with a gun with only one free hand of your own. When someone is knocked down, if
you are very quick, you can loot a few items from them. This can be anything on their person, from backpacks, to hidden guns, to their ID. If you plan on doing this to get your hands on a juicy ID or
traitor objective, be sure you know where they are probably located in the persons inventory.

### Harm (red)
Harm intent, as is obvious from the name, is used to injure others with raw brute force. If you are on harm intent, you will attempt to hit those you click on in melee range (even if holding a gun!)
with the weapon in hand. Weapons can all still be used in other intents, and harm is mostly an intent there to make sure you dont accidentally help someone. While in harm, you wont be able
to apply medicine, help others up, etc. clicking someone while in harm intent with an empty hand will punch them, dealing a moderate amount of damage, but not enough to fight off a person who
has a proper weapon.

## The health system
In unitystation, health is much more complex than in most games. health can be decreased directly by 4 types of damage, two of which are applied to individual limbs. The total health is the base health, minus damage dealt to limbs,
and minus damage dealt by other causes. This means that enough damage to a single limb can kill, even if it is the only limb damaged.

### Damage types
Brute damage is dealt by ballistic weapons, most melee weapons, and punches. It can be healed with bandages, and is applied to individual limbs. Burn damage is similarly applied to individual limbs. it can be
healed with ointment, and is dealt by lasers and fires. oxygen damage is caused by being in critical condition, or by a lack of air. It can be slowed with CPR (help intent on downed critical person) and is best healed
by getting somewhere one can breathe, or by healing to take a person out of a critical state. Toxin/poision damage is caused mainly by toxins, and is harder to heal than other damage types, requiring specific
chemicals to fix.

### Limb targetting
On your hud, there is a small doll. when bodyparts are clicked, they will be targeted. this allows you to heal or injure specific regions. different parts have different chances to be successfully
hit (head is harder to hit than the torso for example). If an attack misses, it will most likely instead connect with another bodypart, only rarely will you whiff an attack entirely. The more injured you are,
the more likely you are to miss. These body parts will also be targeted when firing a gun.

## Various maladies
Especilly worthile to note are the many situational effects and objects that play large roles in combat.

### Stuns
Players can be stunned in several ways. Disarms can disable them for a short period, as can tazers, while stun batons can knock someone to the ground for a long enough period to arrest them.
It should be noted, again, that tazers and disarms will not give you enough time to fill the handcuff progress bar before the person your arresting gets back up. Stunned players can
be looted by dragging their sprite onto your own, as can handcuffed people.

### Handcuffs
Handcuffs can be applied at any time, but require time to put on. This means you cant just approach a man with a knife and cuff him, not without disabling him first. one of the
few reliable methods to get this time is the stun baton, which can knock someone to the ground long enough to let you handcuff them. Those in cuffs cannot harm, punch, pick up objects,
or resist grabs, meaning they can be safely moved to a different location. Keep in mind they can still talk on the radio, unless you take that too.

### Blindness
While more rare, temporary blindness can be inflicted by flashbangs and portable flashes. While blind you can interact and run around, but cannot see. Frankly, blind people are incredibly
unpredictable, so blinding someone will probably make it harder, not easier, to land a stun on them.

# Weapons
There is a very large amount of weapons in unitystation, and learning which weapons are best for which jobs is good for maximizing effectiveness

## firearms
Most firearms shoot either lasers or bullets. Lasers can pass through windows and deal mainly burn damage, while guns deal brute damage.

### Lasers
Laser weapons only have a few set types of bolts, only two of which are very common. Tazer/electric bolts stun players on impact for a short period, disabler bolts stun them for
what is basically no time at all, "kill" lasers deal a moderate amount of burn damage, and disruptor bolts deal ridiculous amounts of damage capeable of melting walls. Laser and
energy based weapons like them must be charged at charging stations, with very few exceptions.

### bullets
There is a very large variety in ammunition in US, hell, almost every gun takes a different type of bullet. many of these bullets can also come in augmented forms, such as AP, hollow point,
incindiary, and more. Guns clips must be ejected when the gun is empty by clicking the gun in hand, and must be loaded by clicking on the gun while holding a magazine. Bullets are typically
more damaging than lasers, but the requirment of carrying around clips and lack of rapid adaptability means lasers still compete well.

### Fully automatic weapons
Full auto weapons, such as smgs and machine guns, will continue firing for as long as you hold down the mouse. While capeable of rapidly killing people, they burn through ammo equally
fast, and thus must be reloaded often. they are also rather inaccurate. Per-shot, they typically deal less damage than other weapons. They are great at mowing down single targets if you have plenty of down-time to reload
and prepare, and are great at killing those you are chasing, but struggle in more extended fights, when there is little opportunity to recover, and struggle at long range, forcing you close to danger..

### Semi automatic weapons
These fire once when you press the mouse button, are typically higher damage per shot, and are rather accurate. This means you can kill people without placing yourself in too much danger, and conserve
ammunition. semi-auto weapons that can fire with little cooldown are equally effective in ambushes as automatic weapons, but those with longer cooldowns (such as rifles and lasers) struggle to kill people before
they can flee. One exception to this is the sniper, which has a large cooldown but is great in ambushes, simply due to its massive damage per shot. Seni auto weapons cant mow people down
as fast as full auto weapons, but let you be safer and conserve ammunition.

## melee weapons
Melee weapons are inherantly far riskier than ranged ones, but can greatly reward the risk if utilized smartly. Unlike guns, most melee weapons (with few exceptions) follow
the same simple point and stab interface. How you use a melee weapon can however change depending on just how effective and rare it is.

### Low effectiveness/improvised/punches
Improvised weapons (chairs, fire extinguishers, etc) are far less effective than other melee weapons, but their accessability means they are often all you have. When using these,
you can rush down and take more chances to be disarmed than someone using a more potent weapon, as you can simply grab another if you lose yours. This means your best off moving side to side
facing a target, bashing on them repetedly, or trading disarms (especilly if you are unarmed). These weapons should not be used to try and assassinate someone, as theyll more than likely run off, but they
are great for self defence.

### High effectiveness melee weapons
Purpouse made melee weapons, such as eswords and sabers, are rarer, but a lot more devestating. their main weakness is less their own, and more because they can be disarmed and
used against you, and you cant easily get another one. Therefore, when you have one of these, you want to minimize how much time they can disarm you. This can be done either by
chopping them up before they can react in an ambush, or by only taking short periods to attack. Rather than berserk at your foe, you want to stay a tile or two seperate from them, and
pop into melee range unexpectedly to give them a quick stab before jumping back out.

## Thrown weapons
There are three main types of throwing weapons. improvised, dedicated, and grenades. objects can be thrown after using the "throw" button, or after using the (default) hotkey "r".

### Improvised throwing weapons
Melee weapons (like swords) thrown at attackers and other items, such as floor tiles, fall into this category. The rapidity with which items can be thrown, plus the decent damge per throw,
means that thrown weapons can be unexpectedly deadly, even if makeshift. Particularly adventagous for improvised weapons is the plentitude of ammunition. Floor tiles make good
throwing weapons, as do chairs and fire extinguishers, and they are absolutely goddamn everywhere. This means that you can engage in ranged combat, even without
a dedicated ranged weapon, giving you the advantage over those using melee weapons.

### dedicated throwing weapons
Few of these exist, and the fact that they can be thrown back makes them a hard sell. They do not do enough to justify their low quanitity. if you have them, use them, but i
would advise against actively looking for them.

### Grenades
Grenades, on the other hand, absolutely justify their rarity. even ignoring chemistry, grenades can one shot people, force them to run, and, atop all this, can be "cooked"
To use a grenade, you must first activate it by clicking it in hand. at which point you will throw it at the next location you click (pressing R or the throw button will make you keep holding it, so dont touch them.)
When the grenade timer finishes, it will explode, greatly damaging players and objects in the blast.

## Notably useful tools/weapons/items.

-Tazers: stun for a short period, useful for getting into baton range
-Batons: stun for a very long period (unless they are the collapsable baton!), enough for handcuffs.
-Fire extinguishers: cover a large area in slippery water
-Flashs: blindness and stun
-handcuffs: see handcuffs under "various maladies"
-magboots: prevent slipping, but slow you down.
-banna peels/clown pda/similar items: slip when stepped on
-crowbar: not a very good weapon, source for floor tiles
-floor tiles: effective and super cheap throwing weapons.
-Lit welders, hatchets, toolboxes: effective and easy to acquire melee weapons

# Armour
Unlike weaponry, armour is rather simple, cutting damage by a certain percentage from certain sources.

## Vests, helmets, coats
Within unitystation, there are three main types of armour generally available to crew members. Bulletproof, standard, and riot gear. These come with matching helmets, and each
are good at dealing with specific types of damage. Bulletproof gear will dampen the damage dealt by bullets, but is bad against lasers, and garbage against melee weaponry. The opposite
is true of the riot armour, which excells against melee, but suffers against bullets. Standard vest offer an intermediary between the two. Other, rarer, items can offer similar protection.
for instance, the captains vest, HoS' coat, wardens vest, and the many aesthetic variants of the other vests all offer protection.

## Hardsuits
Dont be fooled by their looks, most hardsuits are a FAR worse choice than other armour when it comes to combat. Ignoring that (on the station) only the sec and captain suits have armour values anywhere comperable to a vest,
hardsuits slow you down greatly, meaning you are less able to escape or chase down others and more predictable. Their main usage is simply to let you go into space or breached regions to catch anyone in them.
The one exception is the hardsuits used by nuclear operatives, which do not slow down the wearer and have great armour values.

# Acquiring gear
All the gear in the world cant help you if you dont actually possess it. To this end there are many things you can do to acquire it. Following are some ideas.
- Buy/Bribe for it (it is a social game, after all)
- Utilize a favor or friend
- Acquire it through legitimate means (taking a tazer as [sec](\3_HowToPlay\Jobs\Security_roles\Security-Officer.md), for instance)
- stealing it with or without a disguise
- killing or mugging the person who has it
- other strategies that can be found in the [guide to access](\3_HowToPlay\Guides\General_guides\Access.md)

# Fighting
Combat in unitystation is fundamentally based in knowledge, gear, and planning. Raw reflexive skill plays a part, but the victor in a fight is most often the one who strikes first and stacks
the most advantages while reducing those of the opponent, meaning it is almost always better to wait and prepare if you can, rather than rushing in.

## Planning
A good plan is a great way of ensuring that you win a fight. If you go in prepared, equipped, and ready, against someone who is unaware or still plotting, you will have an enormous
advantage. Likewise, if someone ambushes or otherwise springs a plot against you, your best choice is to flee and plan your own defense. There are many things that can be considered while planning,
or when figuring things out on the fly, such as equipment, access, enviornment, relation, behaviour and your own skill.

### Equipment
While equipment itself is covered above, planning how to use it is another thing entirely. When planning, you should consider what you have onhand formost, such as stunning tools
or ways to access more hidden areas if you need to escape. If your plan require a specific item, it is often better to consider an alternate route than acquire the item if it poses a risk.

You should also take into account what your opponent has, if at all possible. If they are wearing riot armour for instance, bring a gun, if they have their own, wear a bulletproof vest.
Opponents without dedicated weapons or armour are easy prey, meaning if you can ambush them without equipment or get someone to remove theirs, it is worthwhile to attack even if you do not
have a set plan in mind.

### Access
something that is difficult to determine but very helpful to know is the access level of the person you are fighting as well as your own, and how they stack up. If you dont take this into account, you may end up setting up
ambushes that cant be tripped and run into areas they can still hunt you down in. Having higher amounts of access opens up easier access to equipment aswell as escape routes, while having low access oftentimes
limits you to open and exposed areas with little gear.

If you are fighting someone with more access, it is best to stage an ambush, especilly in a region they feel safe, so that you can kill them before they can bring their equipment to bear
or escape.

On the flipside, when fighting someone with lower access, it is often more time-efficient to corral them into corners and chase them down, utilizing your superior access to use shortcuts and
close the gap. If they somehow manage to gain the upper hand, you can escape into a region they cannot enter.

### Enviornment
If you plan on fighitng in a particular location, it is helpful to know how it is layed out, and any maluses affecting the area. When fighting in space, for instance, you should
plan ahead by bringing neccesary supplies to spacewalk, aswell as account for the lack of gravity. Tight regions with many corners, like maint, are great for melee ambushes, while
more open areas such as hallways lend themselves well to gunfights.

Other things you should account for include visibility, ease of escape, possible reinforcements, and hazards.

It should be noted that you can always change the enviornment itself to suit you. Atmos techs can easily start fires, anyone can break windows to space, and anyone (but especilly engineers) can build new structures.

### Relations
Taking into account your targets relation is really useful for surprise attacks and ambushes, and is very simple. If your target trusts you, and is friendly with you, you can
very easily lure them into an isolated room where you can perform your evil deed (no, not that one, get your mind out of the gutter).

Knowing who the target considers his friends is also useful for predicting what possible reinforcements may arrive or tag along with them, for whom you can now plan.

### Behaviour
Knowing how someone behaves is similarly great for setting up surprise attacks, for obvious reasons, but also plays a large role in more open combat. If you know that someone is
aware they are less important, say, an assistant, they may be willing to take greater risks, or even suicide attacks, to try and off you. On the flipside captains and other heads tend
to run to security at the first sign of trouble, so you should prepare for a chase. You may even be ignored by some in favor of pursuing a more important objective, such as Nuke ops looting a disk
or someone attempting to call the shuttle. Understanding how someone will react is something that comes with time, though reading the pages for the roles themselves can lend you
an idea.

### Skill
Finally, you should gauge your own skill against your opponents. If you are equally prepared, but they have played for ages, its probably best not to touch them. On the flipside, if your
experienced, you can probably afford to get into fights with less thinking and preperation, even though its not reccomended. Skill is not an enormous factor, so dont be afraid to ambush the 1000 hour
greyshirt if you feel you are prepared.

## Movement
Something that plays a large factor into your survivability during a fight is your movement. skilled movement reduced the windows your opponent has to attack you, and lets you
engage in favourable situations, while also allowing for easier escapes and an easier time catching others. If you intend on getting into fights, you are probably best off avoiding
anything that can reduce your movement speed, such as hardsuits or magboots.

### Open combat
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









