---
title: "DailyHero"
summary: "Oma iOS-tuotteeni App Storessa: perhetehtävät, pisteet, palkinnot, MCP-serveri ja tuotteen verkkosivusto."
---

DailyHero on oma iOS-tuotteeni perheille, ja se on julkaistu App Storessa. Sovellus auttaa vanhempia muuttamaan lapsen päivittäiset tehtävät etenemisen, pisteiden ja perhepalkintojen järjestelmäksi.

Sovelluksen tarina ulottuu omaan lapsuuteeni. Kun olin pieni, äitini kirjoitti vihkoon päivän tehtävälistan. Illalla ennen nukkumaanmenoa istuimme alas ja tarkistimme, mitä olin tehnyt. Hän antoi minulle pisteitä, ne kertyivät, ja myöhemmin sain niistä pienen palkinnon.

Kun minusta tuli isä ja tyttäreni kasvoi, aloin etsiä samanlaisia palveluita sovelluskaupoista. Vaihtoehtoja on, mutta mikään niistä ei tuntunut aivan omalta. Kun minusta tuli kehittäjä, päätin rakentaa oman sovelluksen: sellaisen, jossa vanhempi luo tehtäviä, lapsi tekee niitä ja palkinnot toimivat selkeänä ja positiivisena motivaationa.

### iOS-sovellus

DailyHero on ensisijaisesti vanhemman työkalu: vanhempi luo tehtäviä, tarkistaa suorituksia, antaa pisteitä ja hallitsee palkintoja. Sovelluksessa on myös lapsen tila, jossa lapsi näkee itse, mitä hänen pitää tehdä.

Sovellusta voi käyttää myös pienten lasten kanssa, jotka eivät vielä lue kovin varmasti. Se voi auttaa esimerkiksi hampaiden pesussa, käsien pesussa ulkoilun jälkeen tai muissa pienissä arjen rutiineissa. Kun lapsella on selkeä tavoite ja pieni palkinto, rutiini muuttuu enemmän leikiksi.

Sovellusta kehitetään Codexissa AI-agenttien avulla, mutta minun selkeässä ohjauksessani: tehtävien, dokumentaation, tarkistusten ja iteraatioiden kautta. Ensin mietin visuaalisen suunnan, tein Figma-mallin, tutkin iOS-kehityksen parhaita käytäntöjä ja kirjoitin projektin dokumentaatiota.

Ennen toteutusta kuvasin PRD:n, arkkitehtuurin, tiedostorakenteen, nimeämissäännöt, lokalisoinnin, värit, uudelleenkäytettävät komponentit, skillit ja AI-agenttien säännöt. Se oli iso valmisteluvaihe sovellukselle, joka aluksi vaikutti pieneltä: palkintonäkymä, tehtävänäkymä ja valikkonäkymä.

Pidän Applen laitteista, Applen tyylistä ja natiivien sovellusten tuntumasta. Siksi valitsin SwiftUI:n ja pyrin käyttämään mahdollisimman paljon Applen natiiveja elementtejä, jotta käyttöliittymä tuntuisi tutulta ja helposti ymmärrettävältä.

Backend ja kirjautuminen on rakennettu Firebasen päälle, koska se tarjoaa selkeän, turvallisen ja käytännöllisen infrastruktuurin MVP:lle. Projektissa käytän Firebase Authia, Anonymous Authia lapsen laitteelle, Firestorea, Cloud Functionsia, App Checkiä, Security Rulesia, soft deleteä, tilin palautusta, lokalisointia ja privacy-first-ajattelua.

Tutkin myös GDPR-vaatimuksia ja datan säilyttämiseen liittyviä kysymyksiä, erityisesti koska sovelluksessa voi olla lapsiin liittyvää dataa. Datan poistaminen, suostumukset, yksityisyys ja käyttöoikeuksien rajat pitää suunnitella ajoissa, ennen kuin tuote kasvaa liian pitkälle.

DailyHero ratkaisee minulle kaksi asiaa. Ensinnäkin se on sovellus, jota käytän itse joka päivä. Siitä on tullut pieni iltarutiini tyttäreni kanssa: ennen nukkumaanmenoa tarkistamme hänen tehtävänsä ja lisäämme pisteitä. Toiseksi se on iso käytännön projekti, jossa yhdistyvät mobiilikehitys, backend, turvallisuus, dokumentaatio ja AI-assisted workflow.

### MCP-serveri

Halusin lisätä DailyHeroon AI-toimintoja, mutta niiden rakentaminen suoraan sovelluksen sisään nostaa nopeasti esiin yksityisyyteen, kustannuksiin ja hallintaan liittyviä kysymyksiä. Tämä korostuu erityisesti silloin, kun data liittyy lapsiin.

Sovelluksen sisäinen AI tarvitsisi tarkat rajat: system promptit, tokenien seurannan, kustannusten hallinnan ja todennäköisesti maksullisia ominaisuuksia. Siksi päätin viedä tämän suunnan MCP-serveriin.

MCP:n kautta käyttäjä voi yhdistää oman AI-agenttinsa tai AI-chatin: ChatGPT:n, Clauden, Cursorin tai muun MCP:tä tukevan clientin. Käyttäjä voi omassa tutussa ympäristössään keskustella rutiineista, etsiä ideoita, muotoilla suunnitelmia ja tallentaa lopputuloksen DailyHeroon tehtävinä tai palkintoina tietylle lapselle.

Näen MCP:n tulevana standardina, jolla AI-agentit yhdistetään erilaisiin palveluihin. Pidän itse tästä ajatuksesta: palvelu antaa agentille selkeät työkalut, ja käyttäjä pysyy siinä AI-käyttöliittymässä, jota hän jo osaa käyttää.

### Verkkosivusto {#dailyhero-website}

DailyHeron verkkosivusto syntyi aluksi käytännön tarpeesta. App Store -julkaisua varten tarvitsin paikan käyttöehdoille, turvallisuustiedoille ja tietosuojakäytännölle.

Aluksi se oli yksinkertainen kaksisivuinen sivusto dokumenteille. Pyysin Codexia rakentamaan sen sovelluksen väreillä ja fonteilla, ja ensimmäinen versio onnistui yllättävän hyvin. Sen jälkeen sivusto alkoi kasvaa.

Lisäsin uusia osioita, vaalean ja tumman teeman, lokalisoinnin ja muutin teknisen policy-sivun vähitellen kokonaiseksi tuotesivustoksi: DailyHeron landing pageksi, jossa on SEO-optimointia ja julkinen kuvaus tuotteesta.
