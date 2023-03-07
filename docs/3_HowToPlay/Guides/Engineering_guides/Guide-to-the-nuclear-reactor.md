# Guide to the nuclear reactor
Note: The reactor is VERY complicated, and you shouldn't touch it unless you are experienced as an [engineer](\3_HowToPlay\Jobs\Engineering_roles\Engineer.md) or fully intend to fuck it up.

## Overview
This guide will cover the basic background info of the reactor, how to start it, how to run it, and how to blow it to hell. Many terms relating to the reactor will also be covered, under the assumption that you are almost certainly not a nuclear physicist. 

## Background
Before you even touch the reactor, its best you know how it works

### Pipes, steam, water, and a shit-ton of radiation
The reactor has several distinct parts, all of which must be properly connected to each-other for the reactor to work. Starting with the simplest, the water reservoir. It holds water. This water is cycled around the reactor through the use of a pump,it heads to the reactor core where it is heated to steam by the fission reactions within and used to drive a turbine, creating power. the water then returns to the reservoir where it is cooled, and the process begins again. This whole system has, as of now, only two weak links, the pipes and the reactor core. The other parts of the reactor can be built with cheap steel in the build menu, but the pipes and core are both difficult to replace and require leanghy repiping and large amounts of plasteel respectively.

### How the core works
The core itself is just as complex as the rest of the reactor combined. Inside the core, fuel rods are used in fission reactions to heat up water cycling through the core. These fuel rods cannot start up on their own, and require a starting rod to fire up initially. Control rods are used to reduce or increase the rate of fission reactions to control the core. The cores pressure and temperature are what you need to control to generate power and avoid getting your teeth kicked in by an admin, Though these are not directly controllable and make up a large chain of dependence.

### The chain of dependence
As previously mentioned, the temperature and pressure of a core are not directly controllable, only indirectly through a long series of dependencies. Starting from the beginning, you have the number of rods. More fuel rods means more heat and neutrons, while more control rods means more control over other values. The second thing you have control over is rod height. When the control rods are deep in the reactor, they lower the amount of fission reactions that occur, and when they are nearly outside it, the amount of reactions increases. This is measured by the K% value (or more accurately a 1+k%), which shows on a triplet of horizontal sliding gauges. This K% value changes the amount of neutron flux exponentially, meaning a K% value of 10 causes the flux to grow not ten times faster than a k value of 1, but a hundred times faster. The neutron flux can be seen as a way to measure how active the reactor is. The higher the flux, the more fission reactions occur. This causes the temperature to increase which in turn increases the pressure of the steam around the reactor. The higher the pressure, the faster the steam moves through the turbine, and the more power is generated. If all this has you confused, try reading the chain of dependency backwards.

### Reading the console 
With recent changes to the reactor control console, its become easier but more complicated to read than before. The K slider has been given two extra gauges for finer readings, these are more difficult to explain verbally than with examples, so well get right to those. If the value of K# was 0.71, the top slider would be ~2/3rds between 0 and 1, the second slider measuring increments of 1/10th would be at 7, and the finest display at the bottom would be off its right far end. Alternatively, if it was at 0.07, both the top and second slider would be close to zero, with the lower slider at 7. If you want a k value that is perfectly at zero, you should have all 3 gauges centred along the centerline.

The reactor rod controls are far easier than before. there is a display showing the % of the max depth the rods are inserted at any moment down to the hundredth of a percent. The left course slider controls this depth at increments of 1%, while the right one does so at increments of 0.01%. The latter is essential for achiving a perfect 0 k value.

Areas of gauges that are shaded in red mean that having a value in the range is either counterproductive or dangerous. A pressure incapable of powering the reactor and a pressure close to blowing it up would both be in a red shaded area.

## Starting up the reactor
Starting up the reactor is a rather long process, with multiple steps, and can result in you turning into a fine mist if done incorrectly.

### Rods
Before starting the reactor, you need to gather what you'll need to do so. these are the rods, typically found someplace near the console. There are three types, control rods, whose function is discussed in "The chain of dependence", Fuel rods, which drive the fission reactions and are slowly whittled down by them, and starter rods, which provide the initial neutrons for starting up the reactor. These must be placed into the reactor in an appropriate ratio to avoid it fizzling out or exploding horribly.

### "Simple" reactor setup
This is simply the method that I personally use when I'm just looking to generate power. Id recommend experimenting on private servers if you want to try different setups, as admins frown upon unscheduled reactor decommissioning.

1. Start the plasma generator so crew doesn't complain and your lights/consoles are powered.
2. Gather 4 to 5 control rods, one fuel rod, and one starter rod.
3. Head out the airlock and plug in the control rods. then the fuel rod, then the starter.
4. run back inside to man the reactor console
5. Raise control rods until the k% value is ~ 6 or 7
6. Keep it there until the neutron flux reaches a point between 10^5 and 10^6. Going higher will make the reactor MUCH more feisty, exponentially so. (going too high will result in a reactor meltdown that cant be stopped via the console)
7. Set K% to zero using the rods. (all 3 sliders should meet at the center point, see "Reading the console")
8. Lower and raise K% until a stable and relatively high temp and pressure is reached (being in the top-side red is safe-ish, going above it results in reactor failure)
9. Check that pressure is rising, and use the other console to see if power is being generated
10. go to the core, remove the starter rod, be sure your wearing rad-proof gear.
11. go back to the console, repeat steps 7-9 as needed


## Continued operation
Now that you've got the reactor running, you are expected to keep it nice, fueled, and stable.

### Refueling
The step by step setup should be good for most rounds, lasting over an hour, but if you need to refuel the reactor, head out the airlock, take out the old fuel rod, smack in a new one, and repeat the startup process. Its a good idea to startup the plasma generator beforehand so the crew doesn't complain about the lack of power. If your using a multi fuel rod setup, having someone trustworthy man the console while your replacing rods is generally a good idea.

### Safety hazards
Having a very slowly exploding nuke in your backyard comes with a lot of dangers, not the least of which is may blow you into tiny smithereens if you fuck up. Therefore, it is always a good idea to be aware of the various safety hazards it poses. The two largest dangers come down to the fact that the reactor is sometimes in exposed space, and that it emits a massive amount of radiation. The first is easily counter-able, just grab a hardsuit, Engineering hardsuit preferred, tack on an o2 tank, and wear a mask. The second is more difficult. Even a single fuel rod reactor emits a massive amount of radiation, and anyone near it not wearing radiation protective gear will slowly melt from the inside. The tile above the reactor core, as well as those directly next to it, are typically so radioactive that even this wont help you totally, and even in a full Engineering hardsuit you will rapidly begin turning into goo if you get too close.

### Meltdown prevention
Preventing a meltdown is very simple, and there are two ways to do it. Number one is to slam the control rods all the way in once the reactor tries to meltdown, which may not be fast enough if you get there too late. The second option is to go outside yourself and manually take out any fuel rods. If you fail at either, you will be <s>turned into a red unclonable mist</s> still alive and just floating in space because explosions dont damage people yet.

### Sabotage prevention
If you want to prevent someone from turning engineering into a crater on purpose, there are a few things you can try. There are two places you need to protect, but still have accessible, these being the reactor and its control console. If you want to prevent sabotage, walling up the reactor and leaving an engineering airlock is typically the best course of action. The console is typically decently protected, but if you feel the need you can replace the windows with reinforced walls or place the console in a more hidden location.

## 🎵 [I dont want to set the wooorld on fiiiire](https://www.youtube.com/watch?v=pLvsmho1lGA ) 🎵
So, lets say you're a traitor and need all of engineering gone. There are a few ways you can go about detonating the reactor, depending on if you approach the console or the core first.

### Chernobyl
The Chernobyl method is fucking with the console and moving the control rods as far out as you can and hoping nobody notices, before blitzing the fuck out of engineering so you don't end up dead yourself. This will take a longer time to come to fruition, and is easier to both stop and repair, but is far less difficult to set up than the other method

### Ghetto Tsar Bomba
If you've got a deathwish, and access to the rods themselves, this method guarantees the biggest boom. to do it, simply take out all the rods in the core, shove in only fuel rods, smack in a starter, and RUN LIKE HELL. This is more difficult to set up but cannot be stopped using the console and can guarantee that the reactor explosion is absolutely massive. This will guarantee a shuttle call and will most certainly get you sent to the void if you aren't an antagonist or have a VERY VERY good reason for doing so.
