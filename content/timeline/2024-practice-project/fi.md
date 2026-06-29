---
title: "Työharjoittelu: Espoon Biljardikerho ry"
summary: "Ensimmäinen oikea projektini: biljarditurnauksen hallintajärjestelmä, tablettikäyttöliittymä ja automaattinen pelaajien jako."
---

Työharjoittelun tehtävänä oli kehittää biljarditurnauksen hallintajärjestelmä Espoon Biljardikerho ry:lle.

Projektin ideana oli luoda tablettiversio, jota voisi käyttää pelipöytien luona. Pelaajat merkitsevät pussitetut pallot ottelun aikana, ja järjestelmä laskee tulokset automaattisesti.

Ylläpitäjille suunniteltiin erillinen osa pelaajien rekisteröintiin, turnauksen hallintaan ja osallistujien automaattiseen jakamiseen kokemustason perusteella.

Vaikein osa ei ollut yksittäisten näkymien toteutus. Vaikeinta oli turnauslogiikka: pelaajat piti jakaa niin, että vahvemmat osallistujat jakautuvat tasaisesti kaavioon eivätkä kohtaa toisiaan liian aikaisin.

Turnauksen edetessä pelaajat liikkuvat kaaviossa tietyn logiikan mukaan: hävinneet jatkavat pelaamista, heikommat pelaajat kilpailevat keskenään, vahvemmat pelaajat etenevät omalla puolellaan ja lopussa heikomman divisioonan parhaat kohtaavat vahvemman divisioonan parhaat.

Jälkikäteen näen projektissa selvästi arkkitehtuurisia ongelmia. Frontend ja backend sekoittuivat toisiinsa, autentikointi oli melko nimellistä ja rakenne kasvoi orgaanisesti. Ensimmäiseksi oikeaksi projektiksi tärkein saavutus oli kuitenkin yritys automatisoida monimutkainen turnauslogiikka ja pelaajien jako.

Projektia ei lopulta otettu käyttöön. Työskentelin sen parissa yksin, ja asiakas valitsi myöhemmin valmiin ratkaisun. Kokemus oli silti tärkeä, koska se näytti ensimmäistä kertaa eron opiskelutehtävän ja oikean järjestelmän välillä: vaikeus ei ole aina itse koodissa, vaan sääntöjen ja toimialan mallintamisessa.
