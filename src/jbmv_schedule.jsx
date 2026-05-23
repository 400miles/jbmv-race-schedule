import { useState, useMemo } from "react";

const EVENTS = [
  { id:"pre-0501", date:"2026-05-01", dayType:"PreSeason", label:"May 1", fullLabel:"PreSeason — May 1", specialTags:[], noRacing:false,
    races:[{c:"Cat 4 Men",l:"10",t:"JB Tempo"},{c:"Cat 3 Men",l:"10",t:"JB Tempo"},{c:"Open/Women",l:"10",t:"JB Tempo"},{c:"Cat 1/2 Men",l:"12",t:"JB Tempo"},{c:"Cat 4 Men",l:"10",t:"Short Scratch"},{c:"Cat 3 Men",l:"15",t:"Short Scratch"},{c:"Open/Women",l:"15",t:"Short Scratch"},{c:"Cat 1/2 Men",l:"20",t:"Short Scratch"},{c:"Cat 4 Men",l:"16",t:"4x4 Points Race"},{c:"Cat 3 Men",l:"20",t:"4x5 Points Race"},{c:"Open/Women",l:"20",t:"4x5 Points Race"},{c:"Cat 1/2 Men",l:"25",t:"5x5 Points Race"}]},
  { id:"pre-0508", date:"2026-05-08", dayType:"PreSeason", label:"May 8", fullLabel:"PreSeason — May 8", specialTags:[], noRacing:false,
    races:[{c:"Cat 4 Men",l:"10",t:"Split Scratch"},{c:"Cat 3 Men",l:"12",t:"Split Scratch"},{c:"Cat 1/2 Men",l:"14",t:"Split Scratch"},{c:"Open/Women",l:"12",t:"Split Scratch"},{c:"Cat 4 Men",l:"12",t:"JB Keirin Heats/Finals"},{c:"Cat 3 Men",l:"12",t:"JB Keirin Heats/Finals"},{c:"Cat 1/2 Men",l:"16",t:"JB Keirin Heats/Finals"},{c:"Open/Women",l:"16",t:"JB Keirin Heats/Finals"},{c:"Cat 4 Men",l:"25",t:"Scratch"},{c:"Cat 3 Men",l:"30",t:"Scratch"},{c:"Cat 1/2 Men",l:"40",t:"Scratch"},{c:"Open/Women",l:"25",t:"Scratch"}]},
  { id:"mnr-0511", date:"2026-05-11", dayType:"Monday", label:"May 11", fullLabel:"Monday — May 11", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"2",t:"Scratch Race"},{c:"Junior C",l:"4",t:"Scratch Race"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Junior D",l:"?",t:"Unknown Distance"},{c:"Junior C",l:"?",t:"Unknown Distance"},{c:"Novice 1",l:"?",t:"Unknown Distance"},{c:"Novice 2",l:"?",t:"Unknown Distance"},{c:"Junior D",l:"8",t:"Points Race"},{c:"Junior C",l:"9",t:"Points Race"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"pre-0515", date:"2026-05-15", dayType:"PreSeason", label:"May 15", fullLabel:"PreSeason — May 15 (Tour de Bloom)", specialTags:["Tour de Bloom"], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Sprinter Clinic"},{c:"All",l:"—",t:"Flying 200m Clinic"},{c:"All",l:"—",t:"Timed 200m w/ feedback"},{c:"All",l:"—",t:"Sprint Tournament"}]},
  { id:"mnr-0518", date:"2026-05-18", dayType:"Monday", label:"May 18", fullLabel:"Monday — May 18", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"3",t:"Tempo"},{c:"Junior C",l:"5",t:"Tempo"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Keirin",l:"4",t:"JB Keirin"},{c:"Junior D",l:"3",t:"Mini Keirin"},{c:"Junior C",l:"3",t:"Mini Keirin"},{c:"Keirin",l:"3",t:"Speed Keirin"},{c:"Junior D",l:"6",t:"Split Scratch"},{c:"Junior C",l:"8",t:"Split Scratch"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"pre-0522", date:"2026-05-22", dayType:"PreSeason", label:"May 22", fullLabel:"PreSeason — May 22", specialTags:[], noRacing:false,
    races:[{c:"Cat 1/2 Men",l:"12",t:"Win and Out"},{c:"Open/Women",l:"12",t:"Win and Out"},{c:"Cat 4 Men",l:"12",t:"Win and Out"},{c:"Cat 3 Men",l:"12",t:"Win and Out"},{c:"Marymoor Crawl",l:"—",t:"Marymoor Crawl"},{c:"Cat 1/2 Men",l:"?",t:"Elimination"},{c:"Open/Women",l:"?",t:"Elimination"},{c:"Cat 4 Men",l:"?",t:"Elimination"},{c:"Cat 3 Men",l:"?",t:"Elimination"},{c:"Cat 1/2 Men",l:"30",t:"6x5 Points Race"},{c:"Open/Women",l:"20",t:"4x5 Points Race"},{c:"Cat 4 Men",l:"16",t:"4x4 Points Race"},{c:"Cat 3 Men",l:"25",t:"4x5 Points Race"}]},
  { id:"mnr-0525", date:"2026-05-25", dayType:"Monday", label:"May 25", fullLabel:"Monday — May 25", specialTags:["Memorial Day"], noRacing:true, races:[]},
  { id:"wnr-0527", date:"2026-05-27", dayType:"Wednesday", label:"May 27", fullLabel:"Wednesday — May 27", specialTags:[], noRacing:false,
    races:[{c:"Master B",l:"12",t:"Short Points (4x3)"},{c:"Open 1/2/3",l:"15",t:"Short Points (5x3)"},{c:"Cat 4 Men",l:"12",t:"Short Points (4x3)"},{c:"Open/Women 4",l:"12",t:"Short Points (4x3)"},{c:"Master B",l:"20",t:"French Exit (5x4)"},{c:"Open 1/2/3",l:"25",t:"French Exit (5x5)"},{c:"Cat 4 Men",l:"16",t:"French Exit (4x4)"},{c:"Open/Women 4",l:"16",t:"French Exit (4x4)"},{c:"Master B",l:"20",t:"Long Scratch"},{c:"Open 1/2/3",l:"25",t:"Long Scratch"},{c:"Cat 4 Men",l:"16",t:"Long Scratch"},{c:"Open/Women 4",l:"16",t:"Long Scratch"}]},
  { id:"fnr-0529", date:"2026-05-29", dayType:"Friday", label:"May 29", fullLabel:"Friday — May 29 🎉 Kickoff", specialTags:["Kickoff"], noRacing:false,
    races:[{c:"Open",l:"4",t:"Marymoor Mile"},{c:"Cat 4 Men",l:"10",t:"Scratch Race"},{c:"Open/Women",l:"12",t:"Scratch Race"},{c:"Cat 3 Men",l:"15",t:"Scratch Race"},{c:"Cat 1/2 Men",l:"20",t:"Scratch Race"},{c:"Marymoor Crawl",l:"—",t:"Marymoor Crawl"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Cat 4 Men",l:"12",t:"Short Points (4x3)"},{c:"Open/Women",l:"15",t:"Short Points (5x3)"},{c:"Cat 3 Men",l:"15",t:"Short Points (5x3)"},{c:"Cat 1/2 Men",l:"18",t:"Short Points (6x3)"},{c:"Cat 4 Men",l:"4",t:"JB Keirin Heats"},{c:"Open/Women",l:"4",t:"JB Keirin Heats"},{c:"Cat 3 Men",l:"4",t:"JB Keirin Heats"},{c:"Cat 1/2 Men",l:"4",t:"JB Keirin Heats"},{c:"Cat 4 Men",l:"4",t:"JB Keirin Semi"},{c:"Open/Women",l:"4",t:"JB Keirin Semi"},{c:"Cat 3 Men",l:"4",t:"JB Keirin Semi"},{c:"Cat 1/2 Men",l:"4",t:"JB Keirin Semi"},{c:"Cat 4 Men",l:"4",t:"JB Keirin Final"},{c:"Open/Women",l:"4",t:"JB Keirin Minor/Major Finals"},{c:"Cat 3 Men",l:"4",t:"JB Keirin Final"},{c:"Cat 1/2 Men",l:"4",t:"JB Keirin Minor/Major Finals"}]},
  { id:"mnr-0601", date:"2026-06-01", dayType:"Monday", label:"Jun 1", fullLabel:"Monday — June 1", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"?",t:"Avalanche"},{c:"Junior C",l:"?",t:"Avalanche"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Junior D",l:"1",t:"Chariot Heats/Finals"},{c:"Junior C",l:"1",t:"Chariot Heats/Finals"},{c:"Junior D",l:"6",t:"Split Scratch"},{c:"Junior C",l:"8",t:"Split Scratch"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0603", date:"2026-06-03", dayType:"Wednesday", label:"Jun 3", fullLabel:"Wednesday — June 3", specialTags:[], noRacing:false,
    races:[{c:"Open 1/2/3",l:"12",t:"Win and Out"},{c:"Cat 4 Men",l:"12",t:"Win and Out"},{c:"Open/Women 4",l:"12",t:"Win and Out"},{c:"Master B",l:"12",t:"Win and Out"},{c:"Open 1/2/3",l:"?+5",t:"Super Sprint"},{c:"Cat 4 Men",l:"?+5",t:"Super Sprint"},{c:"Open/Women 4",l:"?+5",t:"Super Sprint"},{c:"Master B",l:"?+5",t:"Super Sprint"},{c:"Open 1/2/3",l:"25",t:"5x5 Points Race"},{c:"Cat 4 Men",l:"16",t:"4x4 Points Race"},{c:"Open/Women 4",l:"16",t:"4x4 Points Race"},{c:"Master B",l:"20",t:"4x5 Points Race"}]},
  { id:"fnr-0605", date:"2026-06-05", dayType:"Friday", label:"Jun 5", fullLabel:"Friday — June 5 (BYORN 1)", specialTags:["BYORN"], noRacing:false,
    races:[{c:"Cat 3 Men",l:"10",t:"JB Tempo"},{c:"Open/Women",l:"10",t:"JB Tempo"},{c:"Cat 1/2 Men",l:"12",t:"JB Tempo"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Cat 3 Men",l:"25",t:"French Exit (5x5)"},{c:"Open/Women",l:"25",t:"French Exit (5x5)"},{c:"Cat 1/2 Men",l:"30",t:"French Exit (6x5)"},{c:"Cat 3 Men",l:"20",t:"Scratch"},{c:"Open/Women",l:"20",t:"Scratch"},{c:"Cat 1/2 Men",l:"30",t:"Scratch"}]},
  { id:"mnr-0608", date:"2026-06-08", dayType:"Monday", label:"Jun 8", fullLabel:"Monday — June 8", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"3",t:"Scratch Race"},{c:"Junior C",l:"5",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Junior D",l:"5",t:"Win-n-Out"},{c:"Junior C",l:"8",t:"Win-n-Out"},{c:"Junior D",l:"6",t:"Points Race"},{c:"Junior C",l:"8",t:"Points Race"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0610", date:"2026-06-10", dayType:"Wednesday", label:"Jun 10", fullLabel:"Wednesday — June 10", specialTags:[], noRacing:false,
    races:[{c:"Cat 4 Men",l:"12",t:"Short Points (4x3)"},{c:"Open/Women 3/4",l:"12",t:"Short Points (4x3)"},{c:"Master B",l:"12",t:"Short Points (4x3)"},{c:"Open 1/2/3",l:"15",t:"Short Points (5x3)"},{c:"Cat 4 Men",l:"4",t:"JB Keirin Heats/Finals"},{c:"Open/Women 3/4",l:"4",t:"JB Keirin Heats/Finals"},{c:"Master B",l:"4",t:"JB Keirin Heats/Finals"},{c:"Open 1/2/3",l:"4",t:"JB Keirin Heats/Finals"},{c:"Cat 4 Men",l:"15",t:"Scratch Race"},{c:"Open/Women 3/4",l:"15",t:"Scratch Race"},{c:"Master B",l:"20",t:"Scratch Race"},{c:"Open 1/2/3",l:"25",t:"Scratch Race"}]},
  { id:"fnr-0612", date:"2026-06-12", dayType:"Friday", label:"Jun 12", fullLabel:"Friday — June 12 (BYORN 2)", specialTags:["BYORN"], noRacing:false,
    races:[{c:"Cat 1/2 Men",l:"16",t:"Split Scratch"},{c:"Cat 3 Men",l:"14",t:"Split Scratch"},{c:"Open/Women",l:"12",t:"Split Scratch"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Cat 1/2 Men",l:"?",t:"Elimination"},{c:"Cat 3 Men",l:"?",t:"Elimination"},{c:"Open/Women",l:"?",t:"Elimination"},{c:"Cat 1/2 Men",l:"40",t:"Scratch"},{c:"Cat 3 Men",l:"25",t:"Scratch"},{c:"Open/Women",l:"20",t:"Scratch"}]},
  { id:"mnr-0615", date:"2026-06-15", dayType:"Monday", label:"Jun 15", fullLabel:"Monday — June 15", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"3",t:"Scratch Race"},{c:"Junior C",l:"5",t:"Scratch Race"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Sprinters",l:"3",t:"Speed Keirin"},{c:"Junior D",l:"3",t:"Mini Keirin"},{c:"Junior C",l:"3",t:"Mini Keirin"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0617", date:"2026-06-17", dayType:"Wednesday", label:"Jun 17", fullLabel:"Wednesday — June 17 (Madison Night)", specialTags:["Madison"], noRacing:false,
    races:[{c:"Mixed Madison",l:"25",t:"Paceline Drill"},{c:"Open/Women 4",l:"16",t:"Scratch"},{c:"Cat 4 Men",l:"16",t:"Scratch"},{c:"Mixed Madison",l:"20",t:"Madison Scratch"},{c:"Open/Women 4",l:"12",t:"Win and Out"},{c:"Cat 4 Men",l:"12",t:"Win and Out"},{c:"Mixed Madison",l:"30",t:"Madison Points"},{c:"Open/Women 4",l:"16",t:"4x4 Points Race"},{c:"Cat 4 Men",l:"16",t:"4x4 Points Race"},{c:"Mixed Madison",l:"20",t:"Madison Scratch"}]},
  { id:"fnr-0619", date:"2026-06-19", dayType:"Friday", label:"Jun 19", fullLabel:"Friday — June 19", specialTags:[], noRacing:false,
    races:[{c:"Open/Women",l:"15",t:"Scratch Race"},{c:"Cat 1/2 Men",l:"20",t:"Scratch Race"},{c:"Cat 3 Men",l:"15",t:"Scratch Race"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Open/Women",l:"?",t:"Miss-n-Out to 5"},{c:"Cat 1/2 Men",l:"?",t:"Miss-n-Out to 5"},{c:"Cat 3 Men",l:"?",t:"Miss-n-Out to 5"},{c:"Open/Women",l:"25",t:"5x5 Points Race"},{c:"Cat 1/2 Men",l:"40",t:"8x5 Points Race"},{c:"Cat 3 Men",l:"30",t:"6x5 Points Race"}]},
  { id:"mnr-0622", date:"2026-06-22", dayType:"Monday", label:"Jun 22", fullLabel:"Monday — June 22", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"4",t:"Marymoor Mile"},{c:"Junior C",l:"4",t:"Marymoor Mile"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Junior D",l:"1",t:"Chariot Heats/Finals"},{c:"Junior C",l:"1",t:"Chariot Heats/Finals"},{c:"Junior D",l:"8",t:"Points Race"},{c:"Junior C",l:"9",t:"Points Race"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0624", date:"2026-06-24", dayType:"Wednesday", label:"Jun 24", fullLabel:"Wednesday — June 24", specialTags:[], noRacing:false,
    races:[{c:"Master B",l:"10",t:"Point-a-lap"},{c:"Open 1/2/3",l:"12",t:"Point-a-lap"},{c:"Cat 4 Men",l:"10",t:"Point-a-lap"},{c:"Open/Women 4",l:"10",t:"Point-a-lap"},{c:"Master B",l:"14",t:"Split Scratch"},{c:"Open 1/2/3",l:"18",t:"Split Scratch"},{c:"Cat 4 Men",l:"14",t:"Split Scratch"},{c:"Open/Women 4",l:"14",t:"Split Scratch"},{c:"Master B",l:"?",t:"Elimination"},{c:"Open 1/2/3",l:"?",t:"Elimination"},{c:"Cat 4 Men",l:"?",t:"Elimination"},{c:"Open/Women 4",l:"?",t:"Elimination"}]},
  { id:"fnr-0626", date:"2026-06-26", dayType:"Friday", label:"Jun 26", fullLabel:"Friday — June 26 (Elite Regionals)", specialTags:["Elite Regionals"], noRacing:false,
    races:[{c:"All",l:"—",t:"Elite Regional Championships — see special event tab"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"All",l:"—",t:"Keirin"},{c:"All",l:"—",t:"Scratch"},{c:"All",l:"—",t:"Elimination"},{c:"All",l:"—",t:"Points Race"}]},
  { id:"mnr-0629", date:"2026-06-29", dayType:"Monday", label:"Jun 29", fullLabel:"Monday — June 29", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"3",t:"Tempo"},{c:"Junior C",l:"5",t:"Tempo"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Junior D",l:"2",t:"Wheel Race"},{c:"Junior C",l:"3",t:"Wheel Race"},{c:"Junior D",l:"4",t:"Scratch w/ primes"},{c:"Junior C",l:"6",t:"Scratch w/ primes"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0701", date:"2026-07-01", dayType:"Wednesday", label:"Jul 1", fullLabel:"Wednesday — July 1", specialTags:[], noRacing:false,
    races:[{c:"Open 1/2/3",l:"12",t:"Belgian Win-N-Out"},{c:"Cat 4 Men",l:"12",t:"Belgian Win-N-Out"},{c:"Open/Women 4",l:"12",t:"Belgian Win-N-Out"},{c:"Master B",l:"12",t:"Belgian Win-N-Out"},{c:"Open 1/2/3",l:"4",t:"JB Keirin Heats/Finals"},{c:"Cat 4 Men",l:"4",t:"JB Keirin Heats/Finals"},{c:"Open/Women 4",l:"4",t:"JB Keirin Heats/Finals"},{c:"Master B",l:"4",t:"JB Keirin Heats/Finals"},{c:"Open 1/2/3",l:"15",t:"Scratch Race"},{c:"Cat 4 Men",l:"12",t:"Scratch Race"},{c:"Open/Women 4",l:"12",t:"Scratch Race"},{c:"Master B",l:"15",t:"Scratch Race"}]},
  { id:"fnr-0703", date:"2026-07-03", dayType:"Friday", label:"Jul 3", fullLabel:"Friday — July 3 (Junior Takeover)", specialTags:["Junior Takeover"], noRacing:false,
    races:[{c:"Junior D",l:"1",t:"Chariot Heats"},{c:"Junior C",l:"1",t:"Chariot Heats"},{c:"Junior D",l:"4",t:"Scratch"},{c:"Junior C",l:"8",t:"Scratch"},{c:"Junior D",l:"1",t:"Chariot Finals"},{c:"Junior C",l:"1",t:"Chariot Finals"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Cat 4 Men",l:"20",t:"5 Mile Scratch w/ Primes"},{c:"Cat 3 Men",l:"20",t:"5 Mile Scratch w/ Primes"},{c:"Open/Women",l:"20",t:"5 Mile Scratch w/ Primes"},{c:"Cat 1/2 Men",l:"40",t:"10 Mile Scratch w/ Primes"},{c:"Cat 4 Men",l:"16",t:"4x4 Points Race"},{c:"Cat 3 Men",l:"20",t:"4x5 Points Race"},{c:"Open/Women",l:"20",t:"4x5 Points Race"},{c:"Cat 1/2 Men",l:"30",t:"6x5 Points Race"}]},
  { id:"mnr-0706", date:"2026-07-06", dayType:"Monday", label:"Jul 6", fullLabel:"Monday — July 6 (No Juniors)", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"},{c:"All",l:"—",t:"Madison Clinic"}]},
  { id:"wnr-0708", date:"2026-07-08", dayType:"Wednesday", label:"Jul 8", fullLabel:"Wednesday — July 8 (Madison)", specialTags:["Madison"], noRacing:false,
    races:[{c:"Mixed Madison A",l:"10",t:"Paceline Drill"},{c:"Mixed Madison B",l:"10",t:"Paceline Drill"},{c:"Open/Women 4",l:"?",t:"Scratch"},{c:"Cat 4 Men A",l:"?",t:"Scratch"},{c:"Mixed Madison A",l:"16",t:"Madison Scratch"},{c:"Mixed Madison B",l:"12",t:"Madison Scratch"},{c:"Open/Women 4",l:"10",t:"JB Tempo"},{c:"Cat 4 Men",l:"10",t:"JB Tempo"},{c:"Mixed Madison A",l:"30",t:"Madison Split Scratch"},{c:"Mixed Madison B",l:"20",t:"Madison Split Scratch"},{c:"Open/Women 4",l:"16",t:"4x4 Points Race"},{c:"Cat 4 Men",l:"16",t:"4x4 Points Race"}]},
  { id:"fnr-0710", date:"2026-07-10", dayType:"Friday", label:"Jul 10", fullLabel:"Friday — July 10", specialTags:[], noRacing:false,
    races:[{c:"Open",l:"40",t:"Madison"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Cat 1/2 Men",l:"20",t:"Scratch Race"},{c:"Cat 3 Men",l:"15",t:"Scratch Race"},{c:"Open/Women",l:"12",t:"Scratch Race"},{c:"Cat 1/2 Men",l:"12",t:"Belgian Win-n-Out"},{c:"Cat 3 Men",l:"12",t:"Belgian Win-n-Out"},{c:"Open/Women",l:"12",t:"Belgian Win-n-Out"},{c:"Cat 1/2 Men",l:"?",t:"Elimination"},{c:"Cat 3 Men",l:"?",t:"Elimination"},{c:"Open/Women",l:"?",t:"Elimination"}]},
  { id:"mnr-0713", date:"2026-07-13", dayType:"Monday", label:"Jul 13", fullLabel:"Monday — July 13", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"4",t:"Snowball"},{c:"Junior C",l:"5",t:"Point-a-Lap"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Sprinters",l:"4",t:"JB Keirin"},{c:"Junior D",l:"3",t:"Mini Keirin"},{c:"Junior C",l:"3",t:"Mini Keirin"},{c:"Sprinters",l:"3",t:"Speed Keirin"},{c:"Junior D",l:"6",t:"Scratch Race"},{c:"Junior C",l:"8",t:"Scratch Race"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0715", date:"2026-07-15", dayType:"Wednesday", label:"Jul 15", fullLabel:"Wednesday — July 15", specialTags:[], noRacing:false,
    races:[{c:"Open/Women 3/4",l:"12",t:"Snowball"},{c:"Master B",l:"12",t:"Snowball"},{c:"Open 1/2/3",l:"15",t:"Snowball"},{c:"Cat 4 Men",l:"12",t:"Snowball"},{c:"Open/Women 3/4",l:"?",t:"Elimination"},{c:"Master B",l:"?",t:"Elimination"},{c:"Open 1/2/3",l:"?",t:"Elimination"},{c:"Cat 4 Men",l:"?",t:"Elimination"},{c:"Open/Women 3/4",l:"16",t:"4x4 Points Race"},{c:"Master B",l:"16",t:"4x4 Points Race"},{c:"Open 1/2/3",l:"20",t:"5x4 Points Race"},{c:"Cat 4 Men",l:"16",t:"4x4 Points Race"}]},
  { id:"fnr-0717", date:"2026-07-17", dayType:"Friday", label:"Jul 17", fullLabel:"Friday — July 17 (Regional Madison Champs)", specialTags:["Championship"], noRacing:false,
    races:[{c:"Open",l:"50",t:"Regional Madison Championships"},{c:"Open/Women",l:"12",t:"Win and Out"},{c:"Cat 1/2 Men",l:"12",t:"Win and Out"},{c:"Cat 3 Men",l:"12",t:"Win and Out"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Open/Women",l:"20",t:"Scratch"},{c:"Cat 1/2 Men",l:"30",t:"Scratch"},{c:"Cat 3 Men",l:"20",t:"Scratch"},{c:"Open/Women",l:"25",t:"5x5 Points Race"},{c:"Cat 1/2 Men",l:"35",t:"7x5 Points Race"},{c:"Cat 3 Men",l:"25",t:"5x5 Points Race"}]},
  { id:"mnr-0720", date:"2026-07-20", dayType:"Monday", label:"Jul 20", fullLabel:"Monday — July 20", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"?",t:"Texas Snowball"},{c:"Junior C",l:"?",t:"Texas Snowball"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Junior D",l:"5",t:"Scratch Race"},{c:"Junior C",l:"8",t:"Scratch Race"},{c:"Junior D",l:"6",t:"Points Race"},{c:"Junior C",l:"8",t:"Points Race"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0722", date:"2026-07-22", dayType:"Wednesday", label:"Jul 22", fullLabel:"Wednesday — July 22", specialTags:[], noRacing:false,
    races:[{c:"Open 1/2/3",l:"1",t:"Chariot Heats/Finals"},{c:"Cat 4 Men",l:"1",t:"Chariot Heats/Finals"},{c:"Open/Women 4",l:"1",t:"Chariot Heats/Finals"},{c:"Master B",l:"1",t:"Chariot Heats/Finals"},{c:"Open 1/2/3",l:"?+5",t:"Super Sprint"},{c:"Cat 4 Men",l:"?+5",t:"Super Sprint"},{c:"Open/Women 4",l:"?+5",t:"Super Sprint"},{c:"Master B",l:"?+5",t:"Super Sprint"},{c:"Open 1/2/3",l:"20",t:"Scratch"},{c:"Cat 4 Men",l:"12",t:"Scratch"},{c:"Open/Women 4",l:"12",t:"Scratch"},{c:"Master B",l:"15",t:"Scratch"}]},
  { id:"fnr-0724", date:"2026-07-24", dayType:"Friday", label:"Jul 24", fullLabel:"Friday — July 24 (Grand Prix)", specialTags:["Grand Prix"], noRacing:false,
    races:[{c:"All",l:"—",t:"Grand Prix — see special event tab"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"All",l:"—",t:"Sprint, Keirin, Scratch, Points ROY"},{c:"All",l:"—",t:"Keirin"}]},
  { id:"mnr-0727", date:"2026-07-27", dayType:"Monday", label:"Jul 27", fullLabel:"Monday — July 27 (Sprinter Clinic?)", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Sprinters",l:"—",t:"Sprint Round 1"},{c:"Sprinters",l:"—",t:"Sprint Round 2"},{c:"Sprinters",l:"—",t:"Sprint Round 3"}]},
  { id:"wnr-0729", date:"2026-07-29", dayType:"Wednesday", label:"Jul 29", fullLabel:"Wednesday — July 29", specialTags:[], noRacing:false,
    races:[{c:"Open/Women 4",l:"12",t:"Scratch"},{c:"Master B",l:"15",t:"Scratch"},{c:"Open 1/2/3",l:"20",t:"Scratch"},{c:"Cat 4 Men",l:"12",t:"Scratch"},{c:"Open/Women 4",l:"?",t:"Miss-n-Out"},{c:"Master B",l:"?",t:"Miss-n-Out"},{c:"Open 1/2/3",l:"?",t:"Miss-n-Out"},{c:"Cat 4 Men",l:"?",t:"Miss-n-Out"},{c:"Open/Women 4",l:"16",t:"4x4 Points Race"},{c:"Master B",l:"20",t:"4x5 Points Race"},{c:"Open 1/2/3",l:"25",t:"5x5 Points Race"},{c:"Cat 4 Men",l:"16",t:"4x4 Points Race"}]},
  { id:"fnr-0731", date:"2026-07-31", dayType:"Friday", label:"Jul 31", fullLabel:"Friday — July 31", specialTags:[], noRacing:false,
    races:[{c:"Cat 3/4 Men",l:"10",t:"JB Tempo"},{c:"Open/Women",l:"10",t:"JB Tempo"},{c:"Cat 1/2 Men",l:"12",t:"JB Tempo"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Cat 3/4 Men",l:"25",t:"French Exit (5x5)"},{c:"Open/Women",l:"25",t:"French Exit (5x5)"},{c:"Cat 1/2 Men",l:"30",t:"French Exit (6x5)"},{c:"Cat 3/4 Men",l:"30",t:"Long Scratch"},{c:"Open/Women",l:"20",t:"Long Scratch"},{c:"Cat 1/2 Men",l:"40",t:"Long Scratch"}]},
  { id:"mnr-0803", date:"2026-08-03", dayType:"Monday", label:"Aug 3", fullLabel:"Monday — August 3", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"?",t:"Scratch"},{c:"Junior C",l:"?",t:"Scratch"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Junior D",l:"1",t:"Chariot Heats/Finals"},{c:"Junior C",l:"1",t:"Chariot Heats/Finals"},{c:"Junior D",l:"6",t:"Points Race"},{c:"Junior C",l:"8",t:"Points Race"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0805", date:"2026-08-05", dayType:"Wednesday", label:"Aug 5", fullLabel:"Wednesday — August 5", specialTags:[], noRacing:false,
    races:[{c:"Cat 4 Men",l:"10",t:"Short Scratch"},{c:"Open/Women 4",l:"10",t:"Short Scratch"},{c:"Master B",l:"10",t:"Short Scratch"},{c:"Open 1/2/3",l:"10",t:"Short Scratch"},{c:"Cat 4 Men",l:"4",t:"JB Keirin Heats/Finals"},{c:"Open/Women 4",l:"4",t:"JB Keirin Heats/Finals"},{c:"Master B",l:"4",t:"JB Keirin Heats/Finals"},{c:"Open 1/2/3",l:"4",t:"JB Keirin Heats/Finals"},{c:"Cat 4 Men",l:"?",t:"Unknown Distance"},{c:"Open/Women 4",l:"?",t:"Unknown Distance"},{c:"Master B",l:"?",t:"Unknown Distance"},{c:"Open 1/2/3",l:"?",t:"Unknown Distance"}]},
  { id:"fnr-0807", date:"2026-08-07", dayType:"Friday", label:"Aug 7", fullLabel:"Friday — August 7 (BYORN 3)", specialTags:["BYORN"], noRacing:false,
    races:[{c:"Cat 1/2 Men",l:"15",t:"Short Scratch"},{c:"Cat 3 Men",l:"12",t:"Short Scratch"},{c:"Open/Women",l:"10",t:"Short Scratch"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Cat 1/2 Men",l:"?+5",t:"Super Sprint"},{c:"Cat 3 Men",l:"?+5",t:"Super Sprint"},{c:"Open/Women",l:"?+5",t:"Super Sprint"},{c:"Cat 1/2 Men",l:"45",t:"9x5 Long Points"},{c:"Cat 3 Men",l:"30",t:"6x5 Long Points"},{c:"Open/Women",l:"25",t:"5x5 Long Points"}]},
  { id:"mnr-0810", date:"2026-08-10", dayType:"Monday", label:"Aug 10", fullLabel:"Monday — August 10", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"?",t:"Avalanche"},{c:"Junior C",l:"?",t:"Avalanche"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Junior D",l:"5",t:"Win-n-Out"},{c:"Junior C",l:"8",t:"Win-n-Out"},{c:"Junior D",l:"6",t:"Scratch Race"},{c:"Junior C",l:"8",t:"Scratch Race"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0812", date:"2026-08-12", dayType:"Wednesday", label:"Aug 12", fullLabel:"Wednesday — August 12 (Madison)", specialTags:["Madison"], noRacing:false,
    races:[{c:"Mixed Madison",l:"30",t:"Paceline Drill"},{c:"Open/Women 4",l:"10",t:"Split Scratch"},{c:"Cat 4 Men",l:"10",t:"Split Scratch"},{c:"Mixed Madison",l:"20",t:"Madison Scratch"},{c:"Open/Women 4",l:"12",t:"Belgian Win and Out"},{c:"Cat 4 Men",l:"12",t:"Belgian Win and Out"},{c:"Mixed Madison",l:"30",t:"Madison Points"},{c:"Open/Women 4",l:"16",t:"4x4 Points Race"},{c:"Cat 4 Men",l:"16",t:"4x4 Points Race"},{c:"Mixed Madison",l:"20",t:"Madison Scratch"}]},
  { id:"fnr-0814", date:"2026-08-14", dayType:"Friday", label:"Aug 14", fullLabel:"Friday — August 14", specialTags:[], noRacing:false,
    races:[{c:"Open/Women",l:"12",t:"Short Points (6x3)"},{c:"Cat 1/2 Men",l:"18",t:"Short Points (4x3)"},{c:"Cat 3 Men",l:"12",t:"Short Points (4x3)"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Open/Women",l:"4",t:"JB Keirin Heats"},{c:"Cat 1/2 Men",l:"4",t:"JB Keirin Heats"},{c:"Cat 3 Men",l:"4",t:"JB Keirin Heats"},{c:"Open/Women",l:"4",t:"JB Keirin Minor/Major Finals"},{c:"Cat 1/2 Men",l:"4",t:"JB Keirin Minor/Major Finals"},{c:"Cat 3 Men",l:"4",t:"JB Keirin Final"},{c:"Open/Women",l:"?",t:"Elimination"},{c:"Cat 1/2 Men",l:"?",t:"Elimination"},{c:"Cat 3 Men",l:"?",t:"Elimination"},{c:"Mini Fast Madison",l:"20",t:"Madison"}]},
  { id:"mnr-0817", date:"2026-08-17", dayType:"Monday", label:"Aug 17", fullLabel:"Monday — August 17", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"?",t:"Scratch"},{c:"Junior C",l:"?",t:"Scratch"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Keirin",l:"3",t:"Speed Keirin"},{c:"Junior D",l:"—",t:"Mini Keirin"},{c:"Junior C",l:"—",t:"Mini Keirin"},{c:"Junior D",l:"6",t:"Split Scratch"},{c:"Junior C",l:"8",t:"Split Scratch"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0819", date:"2026-08-19", dayType:"Wednesday", label:"Aug 19", fullLabel:"Wednesday — August 19 (Finale)", specialTags:["Finale"], noRacing:false,
    races:[{c:"Open 1/2/3",l:"12",t:"Short Scratch"},{c:"Cat 4 Men",l:"10",t:"Short Scratch"},{c:"Open/Women 3/4",l:"10",t:"Short Scratch"},{c:"Master B",l:"10",t:"Short Scratch"},{c:"Open 1/2/3",l:"?+5",t:"Super Sprint"},{c:"Cat 4 Men",l:"?+5",t:"Super Sprint"},{c:"Open/Women 3/4",l:"?+5",t:"Super Sprint"},{c:"Master B",l:"?+5",t:"Super Sprint"},{c:"Open 1/2/3",l:"25",t:"Points Race"},{c:"Cat 4 Men",l:"16",t:"Points Race"},{c:"Open/Women 3/4",l:"16",t:"Points Race"},{c:"Master B",l:"16",t:"Points Race"}]},
  { id:"fnr-0821", date:"2026-08-21", dayType:"Friday", label:"Aug 21", fullLabel:"Friday — August 21 (Masters Regionals)", specialTags:["Masters Regionals"], noRacing:false,
    races:[{c:"All",l:"—",t:"Masters Regional Championships — see special event tab"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"All",l:"—",t:"Masters Madison Championships"}]},
  { id:"mnr-0824", date:"2026-08-24", dayType:"Monday", label:"Aug 24", fullLabel:"Monday — August 24", specialTags:[], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"?",t:"Texas Snowball"},{c:"Junior C",l:"?",t:"Texas Snowball"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Novice 2",l:"6",t:"Scratch Race"},{c:"Junior D",l:"5",t:"Scratch Race"},{c:"Junior C",l:"8",t:"Scratch Race"},{c:"Junior D",l:"6",t:"Points Race"},{c:"Junior C",l:"8",t:"Points Race"},{c:"Novice 1",l:"16",t:"Points Race"},{c:"Novice 2",l:"12",t:"Points Race"}]},
  { id:"wnr-0826", date:"2026-08-26", dayType:"Wednesday", label:"Aug 26", fullLabel:"Wednesday — August 26 (Finale)", specialTags:["Finale"], noRacing:false,
    races:[{c:"Master B",l:"1",t:"Chariot Race"},{c:"Open/Women 4",l:"1",t:"Chariot Race"},{c:"Open 1/2/3",l:"1",t:"Chariot Race"},{c:"Cat 4 Men",l:"1",t:"Chariot Race"},{c:"Master B",l:"10",t:"Short Scratch"},{c:"Open/Women 4",l:"10",t:"Short Scratch"},{c:"Open 1/2/3",l:"10",t:"Short Scratch"},{c:"Cat 4 Men",l:"10",t:"Short Scratch"},{c:"Master B",l:"4",t:"JB Keirin Heats/Finals"},{c:"Open/Women 4",l:"4",t:"JB Keirin Heats/Finals"},{c:"Open 1/2/3",l:"4",t:"JB Keirin Heats/Finals"},{c:"Cat 4 Men",l:"4",t:"JB Keirin Heats/Finals"}]},
  { id:"fnr-0828", date:"2026-08-28", dayType:"Friday", label:"Aug 28", fullLabel:"Friday — August 28 (Dog Days Finale)", specialTags:["Finale"], noRacing:false,
    races:[{c:"Cat 3 Men",l:"12",t:"Moneyball"},{c:"Open/Women",l:"12",t:"Moneyball"},{c:"Cat 1/2 Men",l:"15",t:"Moneyball"},{c:"Marymoor Crawl",l:"—",t:"Marymoor Crawl"},{c:"Kiddie Kilo",l:"—",t:"Kiddie Kilo"},{c:"Corgi Race",l:"—",t:"Corgi Race"},{c:"Cat 3 Men",l:"?",t:"Elimination"},{c:"Open/Women",l:"?",t:"Elimination"},{c:"Cat 1/2 Men",l:"?",t:"Elimination"},{c:"Cat 3 Men",l:"30",t:"Long Scratch w/ primes"},{c:"Open/Women",l:"25",t:"Long Scratch w/ primes"},{c:"Cat 1/2 Men",l:"40",t:"Long Scratch w/ primes"}]},
  { id:"mnr-0831", date:"2026-08-31", dayType:"Monday", label:"Aug 31", fullLabel:"Monday — August 31 (Finale)", specialTags:["Finale"], noRacing:false,
    races:[{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Junior D",l:"—",t:"Rider's Choice"},{c:"Junior C",l:"—",t:"Rider's Choice"},{c:"Novice 1",l:"8",t:"Scratch Race"},{c:"Sprinters",l:"—",t:"Sprint 1/4 Final"},{c:"Sprinters",l:"—",t:"Sprint 1/2 Final"},{c:"Sprinters",l:"—",t:"Sprint Finals"},{c:"Novice 1",l:"16",t:"Points Race"}]},
  { id:"ps-0907", date:"2026-09-07", dayType:"PostSeason", label:"Sep 7", fullLabel:"PostSeason — September 7", specialTags:["Labor Day"], noRacing:true, races:[]},
  { id:"ps-0914", date:"2026-09-14", dayType:"PostSeason", label:"Sep 14", fullLabel:"PostSeason — September 14", specialTags:[], noRacing:false,
    races:[{c:"All",l:"—",t:"Time Trials"},{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Cat 1-3",l:"—",t:"Motopaced Points Races"}]},
  { id:"ps-0921", date:"2026-09-21", dayType:"PostSeason", label:"Sep 21", fullLabel:"PostSeason — September 21", specialTags:[], noRacing:false,
    races:[{c:"All",l:"—",t:"Time Trials"},{c:"Sprinters",l:"—",t:"Flying 200m"},{c:"Cat 1-3",l:"—",t:"Motopaced Points Races"}]},
];

const DAY_TYPES = ["All","Monday","Wednesday","Friday","PreSeason","PostSeason"];
const MONTHS = ["All","May","June","July","August","September"];

const RACE_TYPE_OPTIONS = [
  {label:"— Any —", value:""},
  {label:"Scratch (all variants)", value:"Scratch"},
  {label:"Points Race (all variants)", value:"Points"},
  {label:"Keirin (all variants)", value:"Keirin"},
  {label:"Elimination", value:"Elimination"},
  {label:"Win and Out", value:"Win and Out"},
  {label:"Belgian Win-N-Out", value:"Belgian Win"},
  {label:"Miss-n-Out", value:"Miss-n-Out"},
  {label:"Tempo (JB / Intl)", value:"Tempo"},
  {label:"Super Sprint", value:"Super Sprint"},
  {label:"Flying 200m", value:"Flying 200m"},
  {label:"Madison", value:"Madison"},
  {label:"French Exit", value:"French Exit"},
  {label:"Chariot", value:"Chariot"},
  {label:"Snowball", value:"Snowball"},
  {label:"Point-a-lap", value:"Point-a-lap"},
  {label:"Avalanche", value:"Avalanche"},
  {label:"Marymoor Crawl", value:"Marymoor Crawl"},
  {label:"Moneyball", value:"Moneyball"},
];

const CATEGORY_OPTIONS = [
  {label:"— All —", value:""},
  {label:"Cat 1/2 Men", value:"Cat 1/2 Men"},
  {label:"Cat 3 Men", value:"Cat 3 Men"},
  {label:"Cat 4 Men", value:"Cat 4 Men"},
  {label:"Open / Women", value:"Open/Women"},
  {label:"Master B", value:"Master B"},
  {label:"Open 1/2/3", value:"Open 1/2/3"},
  {label:"Junior (all)", value:"Junior"},
  {label:"Novice", value:"Novice"},
  {label:"Sprinters", value:"Sprinters"},
  {label:"Mixed Madison", value:"Mixed Madison"},
];

const monthFromDate = d => new Date(d + "T12:00:00").toLocaleString("default",{month:"long"});
const _d = new Date();
const TODAY_STR = `${_d.getFullYear()}-${String(_d.getMonth()+1).padStart(2,'0')}-${String(_d.getDate()).padStart(2,'0')}`;
const isPast = d => d < TODAY_STR;
const isToday = d => d === TODAY_STR;

const DAY_STYLE = {
  Monday:    {bg:"#dbeafe", text:"#1e40af", border:"#93c5fd"},
  Wednesday: {bg:"#dcfce7", text:"#15803d", border:"#86efac"},
  Friday:    {bg:"#fef9c3", text:"#92400e", border:"#fde047"},
  PreSeason: {bg:"#e0e7ff", text:"#3730a3", border:"#a5b4fc"},
  PostSeason:{bg:"#f3f4f6", text:"#374151", border:"#d1d5db"},
};

const TAG_COLORS = {
  Kickoff:          {bg:"#fef3c7", text:"#92400e"},
  "Junior Takeover":{bg:"#dbeafe", text:"#1d4ed8"},
  "Grand Prix":     {bg:"#fae8ff", text:"#7e22ce"},
  "Elite Regionals":{bg:"#ffedd5", text:"#c2410c"},
  "Masters Regionals":{bg:"#ecfdf5", text:"#065f46"},
  Championship:     {bg:"#fff7ed", text:"#c2410c"},
  BYORN:            {bg:"#f0fdf4", text:"#166534"},
  Finale:           {bg:"#fce7f3", text:"#9d174d"},
  Madison:          {bg:"#f0f9ff", text:"#0369a1"},
  "Tour de Bloom":  {bg:"#ecfdf5", text:"#065f46"},
  "Memorial Day":   {bg:"#fee2e2", text:"#991b1b"},
  "Labor Day":      {bg:"#fee2e2", text:"#991b1b"},
};

function pill(label, active, onClick, style={}) {
  return (
    <button key={label} onClick={onClick} style={{
      padding:"4px 12px", borderRadius:20, border:"0.5px solid",
      borderColor: active ? "var(--color-border-secondary)" : "var(--color-border-tertiary)",
      background: active ? "var(--color-background-secondary)" : "transparent",
      color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
      fontWeight: active ? 500 : 400, fontSize:13, cursor:"pointer",
      transition:"all .15s", ...style
    }}>{label}</button>
  );
}

function Badge({label, style}) {
  const s = style || {bg:"#f3f4f6", text:"#374151"};
  return (
    <span style={{padding:"2px 8px", borderRadius:12, fontSize:11, fontWeight:500,
      background:s.bg, color:s.text, whiteSpace:"nowrap"}}>{label}</span>
  );
}

function EventCard({event, raceFilter, catFilter, expanded, onToggle, isNext, isPastCard}) {
  const ds = DAY_STYLE[event.dayType] || DAY_STYLE.PostSeason;
  const [month, day] = [monthFromDate(event.date).slice(0,3), event.date.slice(8)];

  const matchedRaces = useMemo(() => {
    if (!raceFilter && !catFilter) return event.races;
    const rf = raceFilter.toLowerCase();
    const cf = catFilter.toLowerCase();
    return event.races.filter(r =>
      (!rf || r.t?.toLowerCase().includes(rf) || r.c?.toLowerCase().includes(rf)) &&
      (!cf || r.c?.toLowerCase().includes(cf))
    );
  }, [event.races, raceFilter, catFilter]);

  const displayRaces = (raceFilter || catFilter) ? matchedRaces : event.races;
  const hasFilter = raceFilter || catFilter;

  return (
    <div style={{
      border: isNext ? "1.5px solid #1D9E75" : "0.5px solid var(--color-border-tertiary)",
      borderRadius:12, marginBottom:8, overflow:"hidden",
      opacity: isPastCard ? 0.45 : event.noRacing ? 0.55 : 1,
      transition:"opacity .2s"
    }}>
      <div onClick={onToggle} style={{
        display:"flex", alignItems:"center", gap:12, padding:"10px 16px",
        cursor:"pointer", background: isNext ? "rgba(29,158,117,0.06)" : "var(--color-background-primary)",
        userSelect:"none"
      }}>
        <div style={{
          minWidth:48, textAlign:"center", padding:"4px 8px", borderRadius:8,
          background:ds.bg, color:ds.text, border:`0.5px solid ${ds.border}`,
          fontSize:12, fontWeight:500, lineHeight:1.2
        }}>
          <div style={{fontSize:10, opacity:.7}}>{month}</div>
          <div style={{fontSize:16}}>{day}</div>
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:14, fontWeight:500, color:"var(--color-text-primary)", display:"flex", alignItems:"center", gap:8, flexWrap:"wrap"}}>
            {isNext && (
              <span style={{padding:"1px 8px", borderRadius:10, fontSize:11, fontWeight:600,
                background:"#e8fff7", color:"#0a6b4a", border:"0.5px solid #86efac"}}>
                Next up
              </span>
            )}
            {isPastCard && (
              <span style={{padding:"1px 8px", borderRadius:10, fontSize:11,
                background:"var(--color-background-secondary)", color:"var(--color-text-tertiary)"}}>
                Past
              </span>
            )}
            <span style={{
              padding:"1px 8px", borderRadius:10, fontSize:11,
              background:ds.bg, color:ds.text, border:`0.5px solid ${ds.border}`
            }}>{event.dayType}</span>
            {event.specialTags.map(t => (
              <Badge key={t} label={t} style={TAG_COLORS[t] || {bg:"#f3f4f6", text:"#374151"}} />
            ))}
          </div>
          <div style={{fontSize:12, color:"var(--color-text-secondary)", marginTop:2}}>
            {event.noRacing
              ? (event.specialTags.length ? `No racing — ${event.specialTags[0]}` : "No racing")
              : hasFilter
                ? `${matchedRaces.length} matching race${matchedRaces.length !== 1 ? "s" : ""} of ${event.races.length}`
                : `${event.races.length} race${event.races.length !== 1 ? "s" : ""}`
            }
          </div>
        </div>
        <i className={`ti ti-chevron-${expanded ? "up" : "down"}`}
          style={{fontSize:16, color:"var(--color-text-tertiary)"}} aria-hidden="true" />
      </div>

      {expanded && !event.noRacing && (
        <div style={{borderTop:"0.5px solid var(--color-border-tertiary)", padding:"0 16px 12px"}}>
          <table style={{width:"100%", borderCollapse:"collapse", fontSize:13, marginTop:8}}>
            <thead>
              <tr>
                {["Category","Laps","Race Type"].map(h => (
                  <th key={h} style={{textAlign:"left", fontWeight:500, fontSize:11,
                    color:"var(--color-text-tertiary)", padding:"4px 8px 4px 0",
                    borderBottom:"0.5px solid var(--color-border-tertiary)"}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayRaces.map((r, i) => {
                const isMatch = hasFilter && (
                  (raceFilter && (r.t?.toLowerCase().includes(raceFilter.toLowerCase()) || r.c?.toLowerCase().includes(raceFilter.toLowerCase()))) ||
                  (catFilter && r.c?.toLowerCase().includes(catFilter.toLowerCase()))
                );
                return (
                  <tr key={i} style={{background: isMatch ? "var(--color-background-secondary)" : "transparent"}}>
                    <td style={{padding:"5px 8px 5px 0", color:"var(--color-text-secondary)", verticalAlign:"top"}}>{r.c}</td>
                    <td style={{padding:"5px 8px 5px 0", color:"var(--color-text-tertiary)", fontFamily:"var(--font-mono)", fontSize:12, whiteSpace:"nowrap", verticalAlign:"top"}}>{r.l}</td>
                    <td style={{padding:"5px 0 5px 0", color: isMatch ? "var(--color-text-primary)" : "var(--color-text-primary)", fontWeight: isMatch ? 500 : 400, verticalAlign:"top"}}>{r.t}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function JBMVSchedule() {
  const [dayType, setDayType] = useState("All");
  const [month, setMonth] = useState("All");
  const [raceFilter, setRaceFilter] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [expandAll, setExpandAll] = useState(false);
  const [showPast, setShowPast] = useState(false);

  const nextEventId = useMemo(() => {
    return EVENTS.find(e => !e.noRacing && e.date >= TODAY_STR)?.id || null;
  }, []);

  const filtered = useMemo(() => {
    return EVENTS.filter(e => {
      if (!showPast && isPast(e.date)) return false;
      if (dayType !== "All" && e.dayType !== dayType) return false;
      if (month !== "All" && monthFromDate(e.date) !== month) return false;
      if (raceFilter || catFilter) {
        if (e.noRacing) return false;
        const rf = raceFilter.toLowerCase();
        const cf = catFilter.toLowerCase();
        return e.races.some(r =>
          (!rf || r.t?.toLowerCase().includes(rf) || r.c?.toLowerCase().includes(rf)) &&
          (!cf || r.c?.toLowerCase().includes(cf))
        );
      }
      return true;
    });
  }, [dayType, month, raceFilter, catFilter, showPast]);

  const totalMatchingRaces = useMemo(() => {
    if (!raceFilter && !catFilter) return null;
    let count = 0;
    filtered.forEach(e => {
      const rf = raceFilter.toLowerCase();
      const cf = catFilter.toLowerCase();
      e.races.forEach(r => {
        if ((!rf || r.t?.toLowerCase().includes(rf) || r.c?.toLowerCase().includes(rf)) &&
            (!cf || r.c?.toLowerCase().includes(cf))) count++;
      });
    });
    return count;
  }, [filtered, raceFilter, catFilter]);

  const hasFilters = dayType !== "All" || month !== "All" || raceFilter || catFilter;

  const pastCount = useMemo(() => EVENTS.filter(e => isPast(e.date)).length, []);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
    setExpandAll(false);
  };

  return (
    <>
      <header className="page-header">
        <h1>JBMV 2026 Race Schedule</h1>
        <span>Jerry Baker Memorial Velodrome · Marymoor Park, Redmond WA</span>
      </header>

      <div className="app-shell">
      <h2 className="sr-only">JBMV 2026 Race Schedule</h2>

      {/* Sidebar */}
      <div className="sidebar">
        <div>
          <div style={{fontSize:11, fontWeight:500, textTransform:"uppercase", letterSpacing:".08em",
            color:"var(--color-text-tertiary)", marginBottom:8}}>Night</div>
          <div style={{display:"flex", flexWrap:"wrap", gap:4}}>
            {DAY_TYPES.map(d => pill(d, dayType===d, () => setDayType(d)))}
          </div>
        </div>

        <div>
          <div style={{fontSize:11, fontWeight:500, textTransform:"uppercase", letterSpacing:".08em",
            color:"var(--color-text-tertiary)", marginBottom:8}}>Month</div>
          <div style={{display:"flex", flexWrap:"wrap", gap:4}}>
            {MONTHS.map(m => pill(m==="All"?m:m.slice(0,3), month===m, () => setMonth(m)))}
          </div>
        </div>

        <div>
          <div style={{fontSize:11, fontWeight:500, textTransform:"uppercase", letterSpacing:".08em",
            color:"var(--color-text-tertiary)", marginBottom:6}}>Race type</div>
          <select value={raceFilter} onChange={e => { setRaceFilter(e.target.value); setExpandAll(true); }}
            style={{width:"100%", boxSizing:"border-box"}}>
            {RACE_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div>
          <div style={{fontSize:11, fontWeight:500, textTransform:"uppercase", letterSpacing:".08em",
            color:"var(--color-text-tertiary)", marginBottom:6}}>Category</div>
          <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setExpandAll(true); }}
            style={{width:"100%", boxSizing:"border-box"}}>
            {CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {hasFilters && (
          <button onClick={() => {setDayType("All");setMonth("All");setRaceFilter("");setCatFilter("");setExpandAll(false);}}
            style={{alignSelf:"flex-start", fontSize:12, color:"var(--color-text-secondary)",
              background:"none", border:"none", cursor:"pointer", padding:0, textDecoration:"underline"}}>
            Clear all filters
          </button>
        )}
      </div>

      {/* Main */}
      <div className="main-content">
        {/* Stats bar */}
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:8}}>
          <div style={{display:"flex", alignItems:"center", gap:16, flexWrap:"wrap"}}>
            <div style={{fontSize:13, color:"var(--color-text-secondary)"}}>
              <strong style={{color:"var(--color-text-primary)"}}>{filtered.length}</strong>
              {" "}event{filtered.length !== 1 ? "s" : ""}
              {totalMatchingRaces !== null && <> · <strong style={{color:"var(--color-text-primary)"}}>{totalMatchingRaces}</strong> matching races</>}
            </div>
            <button onClick={() => setShowPast(p => !p)} style={{
              fontSize:12, padding:"3px 10px", borderRadius:20, cursor:"pointer",
              border:"0.5px solid var(--color-border-tertiary)",
              background: showPast ? "var(--color-background-secondary)" : "transparent",
              color:"var(--color-text-secondary)"
            }}>
              <i className="ti ti-history" style={{fontSize:12, marginRight:4, verticalAlign:"-1px"}} aria-hidden="true" />
              {showPast ? `Hide past (${pastCount})` : `Show past (${pastCount})`}
            </button>
          </div>
          <button onClick={() => { setExpandAll(p => !p); setExpandedId(null); }}
            style={{fontSize:12, color:"var(--color-text-secondary)", background:"none",
              border:"none", cursor:"pointer", padding:0, textDecoration:"underline"}}>
            {expandAll ? "Collapse all" : "Expand all"}
          </button>
        </div>

        {filtered.length === 0 && (
          <div style={{textAlign:"center", padding:"48px 0", color:"var(--color-text-tertiary)"}}>
            <i className="ti ti-calendar-off" style={{fontSize:32, display:"block", marginBottom:8}} aria-hidden="true" />
            No events match your filters.
          </div>
        )}

        {filtered.map(event => (
          <EventCard
            key={event.id}
            event={event}
            raceFilter={raceFilter}
            catFilter={catFilter}
            isNext={event.id === nextEventId}
            isPastCard={isPast(event.date)}
            expanded={expandAll || expandedId === event.id || (event.id === nextEventId && expandedId === null && !expandAll)}
            onToggle={() => toggleExpand(event.id)}
          />
        ))}
      </div>
    </div>
    </>
  );
}
