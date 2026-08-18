// ==========================================================================
// EXTROSA BEAUTY - BOOKING WIZARD (CLEANED - WIDGET ONLY SERVICE)
// ==========================================================================

const TREATMENTS = [
  { id: "el1", name: "EPILAZIONE AREE PICCOLE", category: "Epilazione - Donna", duration: "15 min", price: "€ 45", description: "baffetti, basette, mento, orecchie, nuca, areola mammaria, dita mani/piedi" },
  { id: "el2", name: "EPILAZIONE AREE MEDIE", category: "Epilazione - Donna", duration: "25 min", price: "€ 70", description: "inguine, ascelle, viso intero, glutei, braccia superiori, avambracci, zona lombare" },
  { id: "el3", name: "INGUINE PARZIALE", category: "Epilazione - Donna", duration: "20 min", price: "€ 60", description: "Trattamento laser progressivo permanente." },
  { id: "el4", name: "EPILAZIONE AREE MEDIO-ESTESE", category: "Epilazione - Donna", duration: "35 min", price: "€ 90", description: "cosce, spalle, torace, addome, braccia intere, mezza gamba" },
  { id: "el5", name: "EPILAZIONE AREE ESTESE", category: "Epilazione - Donna", duration: "45 min", price: "€ 120", description: "gambe intere, schiena intera, petto e addome" },
  { id: "v1", name: "Pulizia Viso Profonda Filter Free 2.0", category: "Trattamenti Viso & Sguardo", duration: "60 min", price: "da € 80", description: "Pulizia viso professionale con tecnologia filter-free per una pelle luminosa e purificata." },
  { id: "v2", name: "Pulizia Viso con Macchinario", category: "Trattamenti Viso & Sguardo", duration: "50 min", price: "da € 50", description: "Trattamento viso con macchinario per nutrire, detossinare e levigare la pelle." },
  { id: "v3", name: "Pulizia Viso ad Ultrasuoni con Epilazione", category: "Trattamenti Viso & Sguardo", duration: "50 min", price: "da € 40", description: "Ultrasuoni delicati per una pulizia profonda con epilazione accurata del viso." },
  { id: "v4", name: "Trattamento Anti-Aging", category: "Trattamenti Viso & Sguardo", duration: "60 min", price: "€ 60", description: "Rituale anti-età per un viso compatto, rimpolpato e dall'aspetto più giovane." },
  { id: "v5", name: "Trattamento Acne Sebo Key", category: "Trattamenti Viso & Sguardo", duration: "50 min", price: "€ 59", description: "Protocollo specifico per pelli acneiche e grasse, con azione sebo-regolatrice." },
  { id: "v6", name: "Trattamento Botox", category: "Trattamenti Viso & Sguardo", duration: "45 min", price: "€ 59", description: "Trattamento anti-aging soft-touch per un effetto tensore naturale." },
  { id: "v7", name: "Massaggio Relax Viso", category: "Trattamenti Viso & Sguardo", duration: "45 min", price: "€ 49", description: "Massaggio drenante per il viso con effetto distensivo e illuminante." },
  { id: "v8", name: "Massaggio Drenante Viso", category: "Trattamenti Viso & Sguardo", duration: "45 min", price: "€ 49", description: "Drenaggio linfatico specifico per ridurre gonfiore e tensioni facciali." },
  { id: "v9", name: "Trucco Giorno / Sera", category: "Trattamenti Viso & Sguardo", duration: "45 min", price: "da € 50", description: "Makeup professionale personalizzato per day-look o serate speciali." },
  { id: "v10", name: "Tinta Ciglia / Sopracciglia (compresa epilazione)", category: "Trattamenti Viso & Sguardo", duration: "30 min", price: "€ 20", description: "Colorazione definita per ciglia e sopracciglia con epilazione inclusa." },
  { id: "v11", name: "Laminazione Ciglia", category: "Trattamenti Viso & Sguardo", duration: "60 min", price: "€ 50", description: "Curvatura e nutrimento per ciglia dallo sguardo intenso." },
  { id: "v12", name: "Laminazione Ciglia (Pacchetto 3 trattamenti)", category: "Trattamenti Viso & Sguardo", duration: "3 sessioni", price: "€ 135", description: "Pacchetto risparmio per un effetto ciglia perfette a lungo." },
  { id: "v13", name: "Laminazione Sopracciglia", category: "Trattamenti Viso & Sguardo", duration: "60 min", price: "€ 50", description: "Sopracciglia modellate e pettinate per un effetto armonico e naturale." },
  { id: "v14", name: "Laminazione Sopracciglia (Pacchetto 3 trattamenti)", category: "Trattamenti Viso & Sguardo", duration: "3 sessioni", price: "€ 135", description: "Percorso di bellezza per sopracciglia definite nel tempo." },
  { id: "v15", name: "Trattamento Viso Anti-Aging con Macchinario", category: "Trattamenti Viso & Sguardo", duration: "60 min", price: "€ 120", description: "Protocollo anti-aging avanzato con tecnologie professionali per ridurre rughe, migliorare tonicità e stimolare il collagene." },
  { id: "v16", name: "Trattamento Viso Acne con Macchinario", category: "Trattamenti Viso & Sguardo", duration: "60 min", price: "€ 120", description: "Trattamento specifico con macchinario per ridurre le lesioni acneiche, normalizzare il sebo e prevenire recidive." },
  { id: "v17", name: "Trattamento Viso Macchie con Macchinario", category: "Trattamenti Viso & Sguardo", duration: "60 min", price: "€ 120", description: "Protocollo schiarente professionale con dispositivi mirati per ridurre le discromie e uniformare l'incarnato." },
  { id: "v18", name: "Trattamento Cicatrici", category: "Trattamenti Viso & Sguardo", duration: "60 min", price: "€ 120", description: "Intervento rigenerativo per migliorare l'aspetto delle cicatrici mediante tecnologie e tecniche professionali." },
  { id: "d1", name: "Dermopigmentazione Sopracciglia", category: "Dermopigmentazione & Tatuaggio Viso", duration: "120 min", price: "€ 350", description: "Microblading e dermopigmentazione per sopracciglia impeccabili." },
  { id: "d2", name: "Dermopigmentazione Labbra", category: "Dermopigmentazione & Tatuaggio Viso", duration: "120 min", price: "€ 350", description: "Colorazione permanente per labbra morbide e definite." },
  { id: "d3", name: "Dermopigmentazione Eyeliner", category: "Dermopigmentazione & Tatuaggio Viso", duration: "90 min", price: "€ 350", description: "Eyeliner permanente per uno sguardo intensamente definito." },
  { id: "d4", name: "Eyeliner Infraciliare", category: "Dermopigmentazione & Tatuaggio Viso", duration: "90 min", price: "€ 300", description: "Effetto eye-liner sottile lungo la rima ciliare per uno sguardo naturale." },
  { id: "d5", name: "Correzione Colore Sopracciglia (viraggio al blu, rosso e grigio)", category: "Dermopigmentazione & Tatuaggio Viso", duration: "90 min", price: "€ 350", description: "Neutralizzazione dei colori indesiderati per un risultato armonico e naturale." },
  { id: "d6", name: "Ribattitura Annuale", category: "Dermopigmentazione & Tatuaggio Viso", duration: "90 min", price: "€ 150", description: "Ritocco annuale della dermopigmentazione per mantenere il colore vivido e definito." },
  { id: "d7", name: "Remover Singolo (Sopracciglia / Labbra)", category: "Dermopigmentazione & Tatuaggio Viso", duration: "60 min", price: "€ 80", description: "Rimozione delicata e mirata di pigmenti indesiderati." },
  { id: "d8", name: "Remover Sopracciglia / Labbra (Pacchetto 5 sedute)", category: "Dermopigmentazione & Tatuaggio Viso", duration: "5 sedute", price: "€ 320", description: "Pacchetto rimozione con più sedute per risultati progressivi e sicuri." },
  { id: "ef1", name: "Sopracciglia / Baffetti", category: "Epilazione - Donna", duration: "15 min", price: "€ 6", description: "Epilation delicata per viso perfetto." },
  { id: "ef2", name: "Viso Completo", category: "Epilazione - Donna", duration: "25 min", price: "€ 15", description: "Epilation completa del viso per contorni nitidi." },
  { id: "ef3", name: "Ascelle", category: "Epilazione - Donna", duration: "15 min", price: "€ 13", description: "Ascelle lisce e morbide con trattamento delicato." },
  { id: "ef4", name: "Braccia 1/2", category: "Epilazione - Donna", duration: "20 min", price: "€ 10", description: "Epilation della metà superiore del braccio." },
  { id: "ef5", name: "Braccia Complete", category: "Epilazione - Donna", duration: "25 min", price: "€ 14", description: "Braccia completamente lisce con cera di qualità." },
  { id: "ef6", name: "Linea Alba", category: "Epilazione - Donna", duration: "15 min", price: "€ 8", description: "Definizione delicata della linea addominale." },
  { id: "ef7", name: "Addome Completo", category: "Epilazione - Donna", duration: "20 min", price: "€ 15", description: "Addome libero da peli con finitura liscia." },
  { id: "ef8", name: "Inguine Sgambato", category: "Epilazione - Donna", duration: "20 min", price: "€ 10", description: "Inguine a sgambatura con linea pulita e precisa." },
  { id: "ef9", name: "Inguine Completo", category: "Epilazione - Donna", duration: "25 min", price: "€ 15", description: "Inguine completo con trattamento confortevole." },
  { id: "ef10", name: "Gamba 1/2", category: "Epilazione - Donna", duration: "30 min", price: "€ 16", description: "Mezza gamba liscia pronta per ogni outfit." },
  { id: "ef11", name: "Gamba Intera", category: "Epilazione - Donna", duration: "40 min", price: "€ 23", description: "Epilation completa per una pelle setosa." },
  { id: "ef12", name: "Gluteo", category: "Epilazione - Donna", duration: "15 min", price: "€ 13", description: "Epilation soft dei glutei per un comfort totale." },
  { id: "ef13", name: "Total Body Donna", category: "Epilazione - Donna", duration: "90 min", price: "€ 87", description: "Epilation globale per un risultato completo e uniforme." },
  { id: "el_u1", name: "EPILAZIONE AREE PICCOLE", category: "Epilazione - Uomo", duration: "15 min", price: "€ 45", description: "baffetti, basette, mento, orecchie, nuca, areola mammaria, dita mani/piedi" },
  { id: "el_u2", name: "EPILAZIONE AREE MEDIE", category: "Epilazione - Uomo", duration: "25 min", price: "€ 70", description: "inguine, ascelle, viso intero, glutei, braccia superiori, avambracci, zona lombare" },
  { id: "el_u3", name: "INGUINE PARZIALE", category: "Epilazione - Uomo", duration: "20 min", price: "€ 60", description: "Trattamento laser progressivo permanente." },
  { id: "el_u4", name: "EPILAZIONE AREE MEDIO-ESTESE", category: "Epilazione - Uomo", duration: "35 min", price: "€ 90", description: "cosce, spalle, torace, addome, braccia intere, mezza gamba" },
  { id: "el_u5", name: "EPILAZIONE AREE ESTESE", category: "Epilazione - Uomo", duration: "45 min", price: "€ 120", description: "gambe intere, schiena intera, petto e addome" },
  { id: "em1", name: "Sopracciglia", category: "Epilazione - Uomo", duration: "15 min", price: "€ 6", description: "Sopracciglia definite per un look curato." },
  { id: "em2", name: "Orecchie / Narici", category: "Epilazione - Uomo", duration: "15 min", price: "€ 5", description: "Rimozione dei peli più fastidiosi con delicatezza." },
  { id: "em3", name: "Ascelle", category: "Epilazione - Uomo", duration: "15 min", price: "€ 13", description: "Ascelle pulite e morbide per ogni stagione." },
  { id: "em4", name: "Braccio 1/2", category: "Epilazione - Uomo", duration: "20 min", price: "€ 10", description: "Mezza braccia senza peli, con risultato naturale." },
  { id: "em5", name: "Braccia", category: "Epilazione - Uomo", duration: "25 min", price: "€ 14 / € 17", description: "Epilation braccia normale o con rifinitura maschile." },
  { id: "em6", name: "Petto", category: "Epilazione - Uomo", duration: "20 min", price: "€ 15", description: "Epilation petto per una definizione pulita e confortevole." },
  { id: "em7", name: "Addome", category: "Epilazione - Uomo", duration: "20 min", price: "€ 15", description: "Addome perfettamente liscio con cera delicata." },
  { id: "em8", name: "Addome e Petto", category: "Epilazione - Uomo", duration: "35 min", price: "€ 25 / € 30", description: "Pacchetto completo per una silhouette pulita." },
  { id: "em9", name: "Spalle", category: "Epilazione - Uomo", duration: "20 min", price: "€ 15", description: "Epilation delle spalle per un look definito e ordinato." },
  { id: "em10", name: "Schiena Fascia Lombare", category: "Epilazione - Uomo", duration: "25 min", price: "€ 15", description: "Linea lombare liscia e morbida, ideale per ogni attività." },
  { id: "em11", name: "Schiena Intera", category: "Epilazione - Uomo", duration: "45 min", price: "€ 25 / € 30", description: "Epilation completa della schiena con finitura professionale." },
  { id: "em12", name: "Gluteo", category: "Epilazione - Uomo", duration: "15 min", price: "€ 15", description: "Epilation glutei per un risultato discreto e confortevole." },
  { id: "em13", name: "Gamba 1/2", category: "Epilazione - Uomo", duration: "30 min", price: "€ 16", description: "Metà gamba liscia con attenzione ai dettagli." },
  { id: "em14", name: "Gambe Intere", category: "Epilazione - Uomo", duration: "50 min", price: "€ 26 / € 30", description: "Epilation totale delle gambe per una finitura uniforme." },
  { id: "em15", name: "Total Body Uomo", category: "Epilazione - Uomo", duration: "100 min", price: "€ 99 / € 120", description: "Pacchetto completo per epilation totoale maschile." },
  { id: "c1", name: "Massaggio Legnoterapia", category: "Trattamenti Corpo & Benessere", duration: "120 min", price: "€ 120", description: "Massaggio profondo con strumenti in legno per modellare e distendere i tessuti." },
  { id: "c2", name: "Trattamento Carbossi / Calm Code", category: "Trattamenti Corpo & Benessere", duration: "60 min", price: "€ 79", description: "Trattamento carbossiterapico e calmante per drenaggio e rigenerazione." },
  { id: "c3", name: "Massaggio Decontratturante", category: "Trattamenti Corpo & Benessere", duration: "60 min", price: "€ 79", description: "Tecniche profonde per sciogliere tensioni muscolari e rigidità." },
  { id: "c4", name: "Massaggio Linfodrenante Total Body", category: "Trattamenti Corpo & Benessere", duration: "60 min", price: "€ 60", description: "Drenaggio totale per gambe leggere e circolazione attivata." },
  { id: "c5", name: "Massaggio Linfodrenante a Zone", category: "Trattamenti Corpo & Benessere", duration: "50 min", price: "€ 60", description: "Linfodrenaggio mirato su gambe, addome o braccia." },
  { id: "c6", name: "Massaggio Relax Corpo", category: "Trattamenti Corpo & Benessere", duration: "50 min", price: "€ 60", description: "Massaggio rilassante e rigenerante con oli nutrienti." },
  { id: "c7", name: "Pressoterapia", category: "Trattamenti Corpo & Benessere", duration: "30 min", price: "€ 35", description: "Trattamento di pressoterapia per gambe sgonfie e toniche." },
  { id: "c8", name: "Pressoterapia + Bendaggi", category: "Trattamenti Corpo & Benessere", duration: "45 min", price: "€ 50", description: "Pressoterapia con bendaggi rimodellanti per risultati visibili." },
  { id: "c9", name: "Trattamento Esfoliante Hammam", category: "Trattamenti Corpo & Benessere", duration: "30 min", price: "€ 45", description: "Scrub rigenerante in stile hammam per pelle radiosa e morbida." },
  { id: "c10", name: "Biomodulazione", category: "Trattamenti Corpo & Benessere", duration: "20 min", price: "da € 20", description: "Trattamento a luce per stimolare riparazione cellulare e tonicità." },
  { id: "c11", name: "Supplemento Biomodulazione", category: "Trattamenti Corpo & Benessere", duration: "10 min", price: "+ € 10", description: "Aggiunta biomodulazione per potenziare qualsiasi trattamento." },
  { id: "c12", name: "Lampada UV (10 / 12 / 15 / 20 minuti)", category: "Trattamenti Corpo & Benessere", duration: "10-20 min", price: "€ 10 / € 12 / € 15 / € 20", description: "Sessione UV modulabile per abbronzatura immediata e uniforme." },
  {
  id: "c13",
  name: "Trattamento Cellulite Radicata",
  category: "Trattamenti Corpo & Benessere",
  duration: "60 min",
  price: "€ 89",
  description: "Protocollo professionale specifico per cellulite radicata."
},
  { id: "p1", name: "Pacchetto 5 Sedute Massaggio Legnoterapia", category: "Pacchetti Speciali", duration: "5 sedute", price: "€ 510", description: "Percorso completo per un trattamento corpo professionale e costante." },
  { id: "p2", name: "Pacchetto 5 Sedute Carbossi / Calm Code", category: "Pacchetti Speciali", duration: "5 sedute", price: "€ 320", description: "Pacchetto benessere per risultati duraturi e rigeneranti." },
  { id: "p3", name: "Pacchetto 5 Sedute Massaggio Viso / Corpo", category: "Pacchetti Speciali", duration: "5 sedute", price: "€ 225", description: "Pacchetto viso e corpo per un percorso completo di bellezza." },
  { id: "p4", name: "Combo Sposa (Trucco, Manicure, Pedicure)", category: "Pacchetti Speciali", duration: "120 min", price: "€ 350", description: "Percorso beauty completo per il giorno più importante." },
  { id: "n1", name: "Manicure Classica", category: "Mani & Piedi (Nails)", duration: "30 min", price: "€ 15", description: "Cura base delle unghie per mani naturali e ordinate." },
  { id: "n2", name: "Manicure Completa (con rimozione pellicine, limatura e scrub)", category: "Mani & Piedi (Nails)", duration: "45 min", price: "€ 25", description: "Rituale completo per mani curate e impeccabili." },
  { id: "n3", name: "Manicure con Smalto", category: "Mani & Piedi (Nails)", duration: "40 min", price: "€ 29", description: "Manicure con applicazione smalto standard o gel leggero." },
  { id: "n4", name: "Semipermanente", category: "Mani & Piedi (Nails)", duration: "45 min", price: "da € 28", description: "Smalto semi-permanente per un finish lucido e duraturo." },
  { id: "n5", name: "Semipermanente Rinforzato", category: "Mani & Piedi (Nails)", duration: "50 min", price: "da € 30", description: "Semipermanente rinforzato per unghie più resistenti." },
  { id: "n6", name: "Gel su Unghia Naturale", category: "Mani & Piedi (Nails)", duration: "60 min", price: "€ 40", description: "Copertura in gel su unghia naturale per durata e lucentezza." },
  { id: "n7", name: "Ricostruzione da Salone", category: "Mani & Piedi (Nails)", duration: "70 min", price: "€ 60", description: "Ricostruzione professionale per unghie lunghe e resistenti." },
  { id: "n8", name: "Ricostruzione Extreme", category: "Mani & Piedi (Nails)", duration: "80 min", price: "€ 70", description: "Ricostruzione extreme per unghie forti e modellate." },
  { id: "n9", name: "Ricostruzione Unghia Onicofagica", category: "Mani & Piedi (Nails)", duration: "70 min", price: "€ 70", description: "Ricostruzione studiata per unghie fragili e rosicchiate." },
  { id: "n10", name: "Refil OX", category: "Mani & Piedi (Nails)", duration: "40 min", price: "€ 45", description: "Refill professionale per mantenere il gel perfetto." },
  { id: "n11", name: "Cambio Colore su Gel / Semi", category: "Mani & Piedi (Nails)", duration: "45 min", price: "€ 25", description: "Cambio colore rapido e preciso su manicure esistente." },
  { id: "n12", name: "Rimozione Gel + Manicure", category: "Mani & Piedi (Nails)", duration: "50 min", price: "€ 25", description: "Rimozione gel e manicure completa per unghie pulite." },
  { id: "n13", name: "French / Babyboomer", category: "Mani & Piedi (Nails)", duration: "50 min", price: "da € 30", description: "Finitura French o Babyboomer elegante e raffinata." },
  { id: "n14", name: "Supplemento Vitamine Unghie", category: "Mani & Piedi (Nails)", duration: "15 min", price: "€ 15", description: "Trattamento vitaminico per unghie più forti e sane." },
  { id: "n15", name: "Applicazione Swarovski", category: "Mani & Piedi (Nails)", duration: "10 min", price: "da € 0,50 / cad.", description: "Pietre Swarovski per un tocco glitterato e sofisticato." },
  { id: "n16", name: "Disegni / Nail Art", category: "Mani & Piedi (Nails)", duration: "su preventivo", price: "su preventivo", description: "Nail art personalizzata, realizzata su misura per te." },
  { id: "n17", name: "Pedicure Classica", category: "Mani & Piedi (Nails)", duration: "45 min", price: "€ 30", description: "Pedicure comfort con cura completa dei piedi." },
  { id: "n18", name: "Pedicure Classica + Smalto", category: "Mani & Piedi (Nails)", duration: "55 min", price: "€ 50", description: "Pedicure completa con applicazione smalto." },
  { id: "n19", name: "Pedicure Classica + Semipermanente", category: "Mani & Piedi (Nails)", duration: "60 min", price: "€ 55", description: "Pedicure con smalto semipermanente resistente." },
  { id: "n20", name: "Pedicure con Massaggio", category: "Mani & Piedi (Nails)", duration: "50 min", price: "€ 45", description: "Pedicure rilassante con massaggio plantare incluso." },
  { id: "n21", name: "Pedicure Kart", category: "Mani & Piedi (Nails)", duration: "60 min", price: "€ 55", description: "Pedicure professionale con finish extra comfort." },
  { id: "n22", name: "Semipermanente Piedi", category: "Mani & Piedi (Nails)", duration: "45 min", price: "€ 30", description: "Semipermanente resistente per unghie dei piedi perfette." },
  { id: "n23", name: "Rimozione Semi Piedi / Smalto", category: "Mani & Piedi (Nails)", duration: "20 min", price: "€ 15", description: "Rimozione professionale di smalto o semipermanente." },
  { id: "n24", name: "Ricostruzione Alluce", category: "Mani & Piedi (Nails)", duration: "20 min", price: "€ 15", description: "Ricostruzione mirata dell'alluce con trattamento rinforzante." },
  { id: "n25", name: "Rimozione Occhio di Pernice / Unghie Incarnite", category: "Mani & Piedi (Nails)", duration: "20 min", price: "€ 10", description: "Trattamento curativo e delicato per piedi più sani." }
];

const ONLY_LOCATION = "Extrosa Salon - Caramagna Piemonte (Piazza Castello)";
const TIME_SLOTS = ["09:00", "10:30", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

const GROUPED_TREATMENTS = TREATMENTS.reduce((acc, t) => {
  (acc[t.category] = acc[t.category] || []).push(t);
  return acc;
}, {});

const CATEGORY_DEFS = [
  { key: "Trattamenti Viso & Sguardo", label: "Trattamenti Viso & Sguardo", icon: "sparkles" },
  { key: "Dermopigmentazione & Tatuaggio Viso", label: "Dermopigmentazione & Tatuaggio Viso", icon: "pen-tool" },
  { key: { donna: "Epilazione - Donna", uomo: "Epilazione - Uomo" }, label: "Epilazione", icon: "flower-2" },
  { key: "Trattamenti Corpo & Benessere", label: "Trattamenti Corpo & Benessere", icon: "waves" },
  { key: "Pacchetti Speciali", label: "Pacchetti Speciali", icon: "gift" },
  { key: "Mani & Piedi (Nails)", label: "Mani & Piedi (Nails)", icon: "hand" }
];

function parsePriceMin(priceStr) {
  const matches = (String(priceStr).match(/\d+(?:[.,]\d+)?/g) || []).map(n => parseFloat(n.replace(',', '.')));
  if (!matches.length) return null;
  return Math.min(...matches);
}

function formatPriceMin(value) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(2).replace('.', ',');
}

function resolveCategories(gender) {
  const list = [];
  CATEGORY_DEFS.forEach(def => {
    if (typeof def.key === 'object') {
      if (gender === 'tutti') {
        ['donna', 'uomo'].forEach(g => {
          const key = def.key[g];
          const items = GROUPED_TREATMENTS[key] || [];
          if (items.length) list.push({ key, label: `${def.label} · ${g === 'donna' ? 'Donna' : 'Uomo'}`, icon: def.icon, items });
        });
      } else {
        const key = def.key[gender];
        const items = GROUPED_TREATMENTS[key] || [];
        if (items.length) list.push({ key, label: def.label, icon: def.icon, items });
      }
    } else {
      const items = GROUPED_TREATMENTS[def.key] || [];
      if (items.length) list.push({ key: def.key, label: def.label, icon: def.icon, items });
    }
  });
  return list;
}

// --- APP STATE ENGINE ---
// Booking removed.

// ==========================================================================
// CATALOGO ENGINE (STEPWISE)
// ==========================================================================

const catalogState = { gender: null, category: null };
const step1Container = document.getElementById("catalog-step-1");
const step2Container = document.getElementById("catalog-step-2");
const step3Container = document.getElementById("catalog-step-3");
const categoriesGrid = document.getElementById("catalog-categories-grid");
const servicesList = document.getElementById("catalog-services-list");

function showStep(stepNum) {
  const steps = [step1Container, step2Container, step3Container];

  // Nascondi subito (display:none) tutti gli step tranne quello richiesto,
  // così quelli inattivi non occupano più spazio nel flusso del contenitore
  // (in precedenza restavano "invisibili" ma presenti, spingendo il contenuto sotto su mobile).
  steps.forEach((el, idx) => {
    if (!el) return;
    if (idx + 1 !== stepNum) {
      el.classList.remove("opacity-100", "translate-x-0", "pointer-events-auto", "z-10");
      el.classList.add("opacity-0", "translate-x-12", "pointer-events-none", "z-0", "hidden");
    }
  });

  const activeStep = stepNum === 1 ? step1Container : (stepNum === 2 ? step2Container : step3Container);
  if (activeStep) {
    activeStep.classList.remove("hidden");
    // Rimuovo "hidden" prima, poi avvio la transizione al frame successivo
    // in modo che il browser registri display:block/flex e animi correttamente opacità/posizione.
    requestAnimationFrame(() => {
      activeStep.classList.remove("opacity-0", "translate-x-12", "pointer-events-none", "z-0");
      activeStep.classList.add("opacity-100", "translate-x-0", "pointer-events-auto", "z-10");
    });
  }
}

function renderCatalogStep1() {
  if (!step1Container) return;
  step1Container.innerHTML = `
    <div class="text-center mb-6 sm:mb-8">
      <h3 class="text-white font-serif text-2xl sm:text-3xl">Seleziona Genere</h3>
      <p class="text-neutral-500 text-sm mt-2 font-light">Per chi stai cercando il trattamento?</p>
    </div>
    <div class="gender-select-card w-full max-w-2xl mx-auto rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden border border-neutral-800/70">
      <div class="flex flex-col sm:flex-row w-full h-full">

        <button type="button" class="gender-card group relative flex-1 min-h-[190px] sm:min-h-[340px] flex items-center justify-center focus:outline-none" onclick="selectGender('donna')" aria-label="Seleziona Donna">
          <div class="gender-card-bg" style="background-image:url('assets/donna.png')"></div>
          <div class="gender-card-overlay"></div>
          <div class="relative z-10 flex flex-col items-center gap-3 sm:gap-4 px-4">
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:bg-[#cda250]/20 group-hover:border-[#cda250]/50 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#cda250" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15v7"></path><path d="M9 19h6"></path><circle cx="12" cy="9" r="6"></circle></svg>
            </div>
            <span class="text-white font-serif text-2xl sm:text-3xl tracking-wide">Donna</span>
            <span class="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-[#cda250] opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              Scopri i trattamenti
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </span>
          </div>
        </button>

        <div class="gender-divider hidden sm:block"></div>
        <div class="gender-divider-mobile block sm:hidden"></div>

        <button type="button" class="gender-card group relative flex-1 min-h-[190px] sm:min-h-[340px] flex items-center justify-center focus:outline-none" onclick="selectGender('uomo')" aria-label="Seleziona Uomo">
          <div class="gender-card-bg" style="background-image:url('assets/uomo.png')"></div>
          <div class="gender-card-overlay"></div>
          <div class="relative z-10 flex flex-col items-center gap-3 sm:gap-4 px-4">
            <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center transition-all duration-500 group-hover:bg-[#cda250]/20 group-hover:border-[#cda250]/50 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#cda250" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14L21 3"></path><path d="M16 3h5v5"></path><circle cx="10" cy="14" r="7"></circle></svg>
            </div>
            <span class="text-white font-serif text-2xl sm:text-3xl tracking-wide">Uomo</span>
            <span class="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-[#cda250] opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              Scopri i trattamenti
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
            </span>
          </div>
        </button>

      </div>
    </div>
  `;
}

window.selectGender = (gender) => {
  catalogState.gender = gender;
  renderCatalogStep2();
  showStep(2);
};

function renderCatalogStep2() {
  if (!categoriesGrid) return;
  categoriesGrid.innerHTML = "";
  document.getElementById("catalog-gender-title").textContent = catalogState.gender === 'donna' ? "Categorie Donna" : "Categorie Uomo";
  
  const genderCats = resolveCategories(catalogState.gender);
  
  genderCats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "flex flex-col items-start text-left p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:bg-neutral-900/80 hover:border-[#cda250]/40 transition-colors group";
    btn.innerHTML = `
      <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#cda250]/10 transition-colors">
        <i data-lucide="${cat.icon}" class="w-5 h-5 text-neutral-400 group-hover:text-[#cda250] transition-colors"></i>
      </div>
      <h4 class="text-white font-serif text-lg">${cat.label.split(' · ')[0]}</h4>
      <p class="text-neutral-500 text-xs mt-1 font-light">${cat.items.length} servizi</p>
    `;
    btn.onclick = () => {
      catalogState.category = cat;
      renderCatalogStep3();
      showStep(3);
    };
    categoriesGrid.appendChild(btn);
  });
  if (window.lucide) window.lucide.createIcons();
}

function renderCatalogStep3() {
  if (!servicesList) return;
  servicesList.innerHTML = "";
  document.getElementById("catalog-category-title").textContent = catalogState.category.label.split(' · ')[0];
  
  catalogState.category.items.forEach(t => {
    const card = document.createElement("div");
    card.className = "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 hover:bg-neutral-900/80 hover:border-[#cda250]/40 transition-colors";
    
    card.innerHTML = `
      <div class="flex-1 min-w-0">
        <h4 class="text-white font-serif text-lg md:text-xl leading-tight mb-2">${t.name}</h4>
        <p class="text-neutral-400 text-xs md:text-sm font-light leading-relaxed mb-3">${t.description || ''}</p>
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1.5 text-[10px] text-neutral-300 bg-black/50 px-2.5 py-1 rounded-md border border-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-neutral-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${t.duration}
          </span>
        </div>
      </div>
      
      <div class="flex flex-col sm:items-end flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-neutral-800 sm:border-0">
        <span class="font-serif text-[#cda250] text-xl mb-3 block text-center sm:text-right">${t.price}</span>
        <button onclick="openContactModal('${t.name.replace(/'/g, "\\'")}', '${t.price}')" class="w-full sm:w-auto text-center bg-[#cda250]/10 hover:bg-[#cda250] text-[#cda250] hover:text-white border border-[#cda250]/30 px-6 py-2.5 rounded-full text-[10px] uppercase tracking-wider font-medium transition-colors">
          Prenota
        </button>
      </div>
    `;
    servicesList.appendChild(card);
  });
}

function initCatalog() {
  renderCatalogStep1();
  showStep(1);
  
  const backTo1 = document.getElementById("catalog-back-to-step-1");
  const backTo2 = document.getElementById("catalog-back-to-step-2");
  
  if (backTo1) backTo1.onclick = () => showStep(1);
  if (backTo2) backTo2.onclick = () => showStep(2);
}

window.openContactModal = (serviceName, servicePrice) => {
  const modal = document.getElementById("contact-modal");
  if (!modal) return;
  document.getElementById("contact-modal-service-name").textContent = serviceName;
  document.getElementById("contact-modal-service-price").textContent = servicePrice;
  
  const whatsappText = encodeURIComponent(`Ciao, vorrei prenotare il trattamento: ${serviceName}`);
  document.getElementById("contact-modal-wa-btn").href = `https://wa.me/393500270726?text=${whatsappText}`;
  
  modal.classList.remove("hidden");
  void modal.offsetWidth;
  modal.classList.remove("opacity-0", "pointer-events-none");
};

function closeContactModal() {
  const modal = document.getElementById("contact-modal");
  if (!modal) return;
  modal.classList.add("opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("pointer-events-none");
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  const modalCloseBtn = document.getElementById("contact-modal-close");
  const modalBackdrop = document.getElementById("contact-modal-backdrop");
  if (modalCloseBtn) modalCloseBtn.onclick = closeContactModal;
  if (modalBackdrop) modalBackdrop.onclick = closeContactModal;
});

function safeQuerySelector(selector) {
  const element = document.querySelector(selector);
  return element;
}

// --- Mobile menu refs ---
const mobileMenuToggle = safeQuerySelector("#mobile-menu-toggle");
const mobileMenuPanel = safeQuerySelector("#mobile-menu-panel");
const mobileMenuClose = safeQuerySelector("#mobile-menu-close");
const mobileMenuBackdrop = safeQuerySelector("#mobile-menu-backdrop");

// --- Mobile menu ---
function toggleMobileMenu(forceOpen = null) {
  if (!mobileMenuPanel || !mobileMenuToggle) return;
  const shouldOpen = forceOpen !== null ? forceOpen : !mobileMenuPanel.classList.contains("is-open");
  mobileMenuPanel.classList.toggle("is-open", shouldOpen);
  document.body.classList.toggle("menu-open", shouldOpen);
  mobileMenuToggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
  mobileMenuToggle.setAttribute("aria-label", shouldOpen ? "Chiudi menu" : "Apri menu");
}

function closeMobileMenu() {
  toggleMobileMenu(false);
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMobileMenu();
  });
}

if (mobileMenuBackdrop) {
  mobileMenuBackdrop.addEventListener("click", closeMobileMenu);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileMenu();
});

document.querySelectorAll("[data-mobile-nav-link]").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// ==========================================================================
// BOOTSTRAP
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initCatalog();
  if (window.lucide) window.lucide.createIcons();
});


// --- LOGICA DI NAVIGAZIONE CON CAPSULE ARROTONDATE (SENZA PALLINI) ---
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => {
        item.classList.remove("bg-white/10", "bg-white/[0.05]");
        if (item.getAttribute("href") === "#contact-us-section") {
          item.classList.remove("text-white", "bg-[#cda250]/10");
          item.classList.add("text-[#cda250]");
        } else {
          item.classList.remove("text-white");
          item.classList.add("text-neutral-400");
        }
      });

      if (this.getAttribute("href") === "#contact-us-section") {
        this.classList.remove("text-[#cda250]");
        this.classList.add("text-white", "bg-[#cda250]/10");
      } else {
        this.classList.remove("text-neutral-400");
        this.classList.add("text-white", "bg-white/10");
      }
    });
  });

  const mainNavbar = document.getElementById("main-navbar");
  const navbarCapsule = document.getElementById("navbar-capsule");

  window.addEventListener("scroll", () => {
    if (mainNavbar && navbarCapsule) {
      if (window.scrollY > 50) {
        mainNavbar.classList.replace("pt-6", "pt-3");
        navbarCapsule.classList.remove("bg-white/[0.04]", "border-white/15", "py-3.5", "px-8");
        navbarCapsule.classList.add("bg-neutral-950/90", "border-white/10", "py-2.5", "px-6", "backdrop-blur-3xl");
      } else {
        mainNavbar.classList.replace("pt-3", "pt-6");
        navbarCapsule.classList.remove("bg-neutral-950/90", "border-white/10", "py-2.5", "px-6", "backdrop-blur-3xl");
        navbarCapsule.classList.add("bg-white/[0.04]", "border-white/15", "py-3.5", "px-8");
      }
    }
  });
});

function initPreloader() {
  const preloader = document.getElementById('beauty-preloader');
  const circle = document.getElementById('loading-circle');

  if (circle) {
    circle.classList.add('animate');
  }

  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('opacity-0', 'scale-110', 'blur-md');
      setTimeout(() => {
        preloader.remove();
      }, 1800);
    }
  }, 2200);
}

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initPreloader);
} else {
  initPreloader();
}

/* ==========================================================================
   INTERACTIVE MOBILE REELS CARD STACK ENGINE
   ========================================================================== */
function initMobileReelsStack() {
  const container = document.getElementById('reels-stack-container');
  if (!container) return;

  let cards = Array.from(container.querySelectorAll('.instagram-reel-card'));

  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  function arrangeStack() {
    if (window.innerWidth >= 768) {
      cards.forEach(card => {
        card.removeAttribute('style');
        card.removeAttribute('data-stack-index');
        const video = card.querySelector('video');
        if (video && !video.paused) video.pause();
      });
      return;
    }

    cards.forEach((card, index) => {
      card.setAttribute('data-stack-index', index);
      const video = card.querySelector('video');

      if (index === 0) {
        card.style.transform = `translateX(0px) scale(1) translateZ(0)`;
        card.style.opacity = '1';
        card.style.zIndex = '30';
        card.style.pointerEvents = 'auto';
        if (video && video.paused) {
          video.play().catch(() => { });
        }
      } else if (index === 1) {
        card.style.transform = `translateX(24px) scale(0.92) translateZ(-10px)`;
        card.style.opacity = '0.85';
        card.style.zIndex = '20';
        card.style.pointerEvents = 'none';
        if (video && !video.paused) video.pause();
      } else if (index === 2) {
        card.style.transform = `translateX(44px) scale(0.84) translateZ(-20px)`;
        card.style.opacity = '0.6';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'none';
        if (video && !video.paused) video.pause();
      } else {
        card.style.transform = `translateX(60px) scale(0.76) translateZ(-30px)`;
        card.style.opacity = '0';
        card.style.zIndex = '0';
        card.style.pointerEvents = 'none';
        if (video && !video.paused) video.pause();
      }
    });
  }

  function onStart(e) {
    if (window.innerWidth >= 768) return;
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentX = startX;
    if (cards[0]) cards[0].style.transition = 'none';
  }

  function onMove(e) {
    if (!isDragging || !cards[0]) return;
    currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX;

    if (deltaX < 0) {
      cards[0].style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.03}deg) scale(1)`;
      cards[0].style.opacity = 1 + (deltaX / 300);
    }
  }

  function onEnd() {
    if (!isDragging || !cards[0]) return;
    isDragging = false;
    cards[0].style.transition = 'transform 0.4s ease, opacity 0.4s ease';

    const deltaX = currentX - startX;

    if (deltaX < -100) {
      const activeCard = cards.shift();
      cards.push(activeCard);
    }

    arrangeStack();
  }

  container.addEventListener('touchstart', onStart, { passive: true });
  container.addEventListener('touchmove', onMove, { passive: true });
  container.addEventListener('touchend', onEnd);

  container.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  arrangeStack();
  window.addEventListener('resize', arrangeStack);
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileReelsStack();
});




// ==========================================================================
// CONFIGURAZIONE INVIO EMAIL A MRIGSERVIZIWEB@GMAIL.COM
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const DESTINATION_EMAIL = "mrigserviziweb@gmail.com";

  // --- 1. GESTIONE FORM CONTATTI DIRETTO ---
  const contactForm = document.getElementById("inline-contact-form");
  const contactSuccess = document.getElementById("inline-contact-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Recupero dei dati inseriti dall'utente
      const nome = document.getElementById("inline-contact-nome").value;
      const cognome = document.getElementById("inline-contact-cognome").value;
      const emailUtente = document.getElementById("inline-contact-email").value;
      const telefono = document.getElementById("inline-contact-telefono").value;
      const messaggio = document.getElementById("inline-contact-messaggio").value;

      // Composizione dell'oggetto e del corpo della mail
      const subject = encodeURIComponent(`Nuovo Messaggio Contatti: ${nome} ${cognome}`);
      const body = encodeURIComponent(
        `Hai ricevuto un nuovo messaggio dal modulo contatti di Extrosa Beauty:\n\n` +
        `Nome: ${nome} ${cognome}\n` +
        `Email: ${emailUtente}\n` +
        `Telefono: ${telefono}\n\n` +
        `Messaggio:\n${messaggio}`
      );

      // Apertura del client email nativo dell'utente indirizzato a mrigserviziweb@gmail.com
      window.location.href = `mailto:${DESTINATION_EMAIL}?subject=${subject}&body=${body}`;

      // Mostra la schermata di successo
      if (contactSuccess) {
        contactSuccess.classList.remove("hidden");
      }
    });
  }


});