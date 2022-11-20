<script lang="ts">
    const url = "../assets/SpeedrunCollection_ERD.png"
</script>

<template>
    <div class="about">
      <h1>Speedrun Collection </h1>
      <el-divider />
  
      <div>
          <h2>Casus</h2>
          <p>Mensen willen graag zichzelf blijven testen. Ook gebeurt dit bij videogames, maar niet iedereen vindt het zo leuk om direct tegen andere mensen te spelen. Sommige willen liever zichzelf uitdagen. Hierdoor is speedrunnen ontstaan. Hierbij draait het voornamelijk om het gekozen spel zo snel mogelijk uit te spelen. Echter is het daar in de loop der tijd niet bij gebleven, maar zijn er extra categorieën bij gekomen die deze wedstrijd wat andere regels geven. Zo kan je ervoor kiezen om fouten in het spel te misbruiken om zo een snellere tijd weg te zetten of om zo snel mogelijk alles te verzamelen wat er verzameld kan worden. </p>
          <p>Door dit alles zijn gamers deze tijden die ze gehaald hebben, op willen gaan slaan en laten zien voor anderen die hetzelfde willen proberen. Daardoor zijn leaderboards ontstaan, die de verschillende runs bij elkaar zet. Degene met de snelste tijd staat natuurlijk bovenaan.</p>
      </div>
  
      <div class="erd">
        <el-image src="url"/>
          <img src="../assets/SpeedrunCollection_ERD.png" id="ERD">
          <p id="erdDescription">ERD</p>
      </div>

      <el-divider />
      <div class="entities">    
          <h2>Entiteiten</h2>
          <p>Zo’n collectie van speedruns heeft de volgende entiteiten:</p>
  
          <div>
              <h4>Run</h4>
              <p>Een run is de snelste poging van een speler om een game op een bepaalde manier uit te spelen. Deze bestaat uit een:</p>
              <ul>
                  <li>Game : Het desbetreffende spel;</li>    
                  <li>Category : De gekozen categorie;</li>
                  <li>Time : De tijd van de run;</li>
                  <li>Platform : Het platform waarop de run gedaan is.;</li>
                  <li>User : De username van de speler;</li>
                  <li>Placement : Plaats op het leaderboard;</li>
                  <li>VideoLink : Link naar de video-opname van de run. Deze wordt gebruikt om te verifiëren dat de tijd klopt en er niet vals is gespeeld.</li>
              </ul>
          </div>
  
          <el-divider />
          <h4>Game</h4>
          <p>Ook wordt een catalogus aan games bijgehouden waarvan speedruns gedaan zijn. Deze bestaan uit een:</p>
          <ul>
              <li>Name : Naam van het spel;</li>  
              <li>Platforms : Lijst van platforms waarop het spel uitgebracht of gespeedrund is;</li>
              <li>ReleaseDate : Datum van uitgave;</li>
              <li>Total Runs : Totale aantal speedruns gedaan van dit spel;</li>
              <li>PlayerCount : Aantal spelers wat dit spel speedrunnen;</li>
              <li>Categories : Lijst van categorieën die voor dit spel bestaan, met bijbehorende regel specifiek voor de categorie;</li>
              <li>Game Rule : Algemene regels voor een speedrun van deze game. Hieraan moet elke speedrun die gedaan wordt van deze game voldoen om geverifieerd te worden.</li>
          </ul>
          <!-- <h4>Category</h4>
          <p>Een categorie is een bepaalde scheiding van de manieren om een speedrun te voltooien. Een game heeft een of meer categorieën met elk zijn eigen regels bovenop de algemene regels van de game. Deze zijn gamespecifiek en worden dus niet overgedragen naar andere games. Een categorie bestaat uit een:
          </p>
          <ul>
              <li>Name : naam van de categorie;</li>  
              <li>Category Rule : Aanvullende regels voor deze categorie.</li>
          </ul> -->
          <el-divider />
          <h4>Platform</h4>
          <p>Een platform is de console waarop de game is uitgegeven. Hierop kan ook worden gefilterd welke games voor dat platform gespeedrund worden. Een platform bestaat uit een:</p>
          <ul>
              <li>Name : Naam van het platform;</li>  
              <li>Games : Lijst van games die voor dit platform gespeedrund worden.</li>
              <li>ReleaseDate: Datum van uitgave (Europa)</li>
              <li>Image : URL naar foto van het platform</li>
          </ul>            
          <el-divider />
          <h4>Stream</h4>
          <p>Naast het hoofddoel van het uploaden van tijden en speedruns, wordt er ook een overzicht getoond van streamers die momenteel een game speedrunnen. De streams worden van Twitch gehaald. Een stream bestaat uit een:</p>
          <ul>
              <li>User : Username van de streamer;</li>  
              <li>Game : Game die gespeedrund wordt;</li>
              <li>Category : Categorie van de speedrun;</li>
              <li>StartTime : Starttijd van de stream. Hiervan wordt laten zien hoelang de streamer aan het streamen is;</li>
              <li>Title: Titel van de stream;</li>
              <li>Link : Link naar de Twitch of Youtube stream;</li>
              <li>Thumbnail : Afbeelding van de streamer.</li>
            </ul>
            
            <el-divider />
          <h4>User</h4>
          <p>Gebruikersaccounts worden gebruikt om spelers te onderscheiden van elkaar. Je kunt registeren en inloggen via een gebruikersnaam en wachtwoord. Een gebruiker kan runs uploaden door naar een gamepagina te gaan en hier de benodigde informatie in te vullen.
              Zodra dit gedaan is, wordt de run geverifiëerd en op het leaderboard getoond met plaatsing. </p>
          <p>Daarnaast heeft een gebruiker de mogelijkheid om zijn accounts te koppelen. Als een Twitch of Youtube account wordt gekoppeld, wordt deze gebruikt om, als er gestreamd wordt, de stream op te halen en bij de streamspagina weer te geven. </p>
          <p>Een user bestaat uit een:</p>
          <ul>
              <li>Username : Gebruikersnaam van de user;</li>    
              <li>Password : Wachtwoord van de user;</li>
              <li>Total Runs : Totale aantal runs die de user geüpload heeft;</li>
              <li>Favorite Game : Favoriete spel van de user;</li>
              <li>CreationDate : Datum wanneer het account is aangemaakt;</li>
              <li>Discord : Discord naam (Optioneel);</li>
              <li>Steam : Link naar Steam profielpagina (Optioneel);</li>
          </ul>
  
      </div>
    </div>
  </template>
  
  <style>
  .about {
    text-align: left;
  }

  #ERD {
    width: 50%;
  }
  </style>
  