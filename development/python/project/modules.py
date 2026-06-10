def character_creation():
    #! Settings
    import random

    ##! Character Settings
    character_name = ("")
    character_family_name = ("")
    character_gender = ("")
    character_age = ()
    character_age_title = ("")
    character_race = ("")
    character_class = ("")

    ##! Character Skills
    character_skills = {
        "strength": random.randint(1, 5),
        "agility": random.randint(1, 5),
        "luck": random.randint(1, 5),
        "charisma": random.randint(1, 5),
        "health": random.randint(1, 5)
    }

    #! Introduction
    print("Welcome, brave adventurer!")
    character_name = input("What is thy name, traveler?\n")
    character_family_name = input(f"Ah, the mighty {character_name}! A name worthy of song and legend.\nTell me, from which family do you hail?\n")
    character_gender = input(f"So, {character_name} {character_family_name}... you are clearly a... (male/female)\n").lower()

    if character_gender == "male":
        character_gender = "Sir"
        character_skills["strength"] += random.randint(0, 3)
        character_skills["health"] += random.randint(0, 3)
    elif character_gender == "female":
        character_gender = "Lady"
        character_skills["charisma"] += random.randint(0, 3)
        character_skills["agility"] += random.randint(0, 3)

    character_age = int(input(f"Ah yes, of course! So you are {character_gender} {character_name} {character_family_name}.\nTell me, how many winters have you survived?\n"))
    if character_age <= 20:
        character_age_title = "Young"
        character_skills["agility"] += random.randint(0, 4)
        character_skills["health"] += random.randint(0, 4)
        print("You are a young one! Shouldn’t you have a squire by your side?")

    elif 20 < character_age <= 50:
        character_age_title = "Vibrant"
        character_skills["strength"] += random.randint(0, 4)
        character_skills["health"] += random.randint(0, 4)
        print("You are in your prime! Surely there are grander quests awaiting you?")

    elif character_age > 50:
        character_age_title = "Elder"
        character_skills["luck"] += random.randint(0, 4)
        character_skills["charisma"] += random.randint(0, 4)
        print(f"My, my! You are one fortunate {character_gender.lower()} to have lived through so many battles!")

    print("You find yourself in the lands of King Atlest, ruler of the Kingdom of Rurin — surrounded by rival realms and deceitful allies.")

    while character_race not in ["orc", "dwarf", "human", "elf", "gnome"]:
        character_race = input("The Kingdom of Rurin is home to many races. Tell me, what are you?\nAre you a mighty Orc, a stout Dwarf, a noble Human, an agile Elf... or perhaps a curious little Gnome?\n").lower()
        
        if character_race == "orc":
            character_skills["strength"] += random.randint(0, 4)
            character_skills["health"] += random.randint(0, 4)
            print("You are a mighty Orc — descendant of the god of strength and vigor.")
            character_class = input("Your childhood was spent battling for scraps among your tribe.\nIn your later years, you joined the army as a (warrior, mage, ranger)\n").lower()

        elif character_race == "dwarf":
            character_skills["luck"] += random.randint(0, 4)
            character_skills["strength"] += random.randint(0, 4)
            print("You are a hardworking Dwarf, carved from stone by the Dragon God himself.")
            character_class = input("You spent your youth mining for gems and precious metals deep underground.\nIn your later years, you joined the army as a (warrior, mage, ranger)\n").lower()

        elif character_race == "human":
            character_skills["health"] += random.randint(0, 4)
            character_skills["charisma"] += random.randint(0, 4)
            print("You are a Human — the youngest child of the gods of wealth and justice.")
            character_class = input("You grew up in siege camps, surviving on scraps and ambition.\nIn your later years, you joined the army as a (warrior, mage, ranger)\n").lower()

        elif character_race == "elf":
            character_skills["luck"] += random.randint(0, 4)
            character_skills["agility"] += random.randint(0, 4)
            print("You are an Elf, born from Life itself and forgotten by Death.")
            character_class = input("You spent your youth guarding the Elder Trees and hunting shadow beasts.\nIn your later years, you joined the army as a (warrior, mage, ranger)\n").lower()
        
        elif character_race == "gnome":
            character_skills["health"] += random.randint(0, 4)
            character_skills["agility"] += random.randint(0, 4)
            print("Your origins are curious indeed — shaped by nature itself, you worship the world as your god.")
            character_class = input("You spent your youth in the green hills, feasting and dreaming, until your village was burned to the ground.\nIn your later years, you joined the army as a (warrior, mage, ranger)\n").lower()

        else:
            print("...Never heard of that one. Are you sure about your lineage?")

    if character_class == "warrior":
        character_skills["health"] += random.randint(0, 4)
        character_skills["strength"] += random.randint(0, 4)
        print("You are a fearless warrior, raised alongside your greatsword.")

    elif character_class == "mage":
        character_skills["strength"] += random.randint(0, 4)
        character_skills["charisma"] += random.randint(0, 4)
        print("You are a powerful mage — a master of the elements and arcane forces.")

    elif character_class == "ranger":
        character_skills["luck"] += random.randint(0, 4)
        character_skills["agility"] += random.randint(0, 4)
        print("You are an agile ranger — friend of beasts and bane of your distant foes.")

    character_complete_title = f"{character_age_title} {character_gender} {character_name} {character_family_name}, the {character_class} of the {character_race} race."
    print(f"\nYour adventure begins, {character_complete_title}!")
    print(f"Your starting stats are as follows: {character_skills}")
