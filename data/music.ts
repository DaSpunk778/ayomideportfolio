export const MUSIC_TABS = [
    { id: "playlists", label: "Playlist" },
    { id: "songs", label: "Fav songs" },
    { id: "artists", label: "Fav artists" }
] as const;

export type TabId = typeof MUSIC_TABS[number]["id"];

export interface MusicItem {
    title: string;
    artist: string;
    image: string;
    url?: string;
}

export const MUSIC_DATA: Record<TabId, MusicItem[]> = {
    playlists: [
        { title: "son of spergy", artist: "Daniel ceasar", image: "/image/music/spergy.jpg", url: "https://open.spotify.com/album/2LKW0m9cC63QzEI9tJH3ql?si=P83BtT1QRiClvARrmSb8Tg" }, // son of spergy
        { title: "Syntax POdcast", artist: "syntax web", image: "/image/music/syntax.jpg", url: "https://open.spotify.com/show/4kYCRYJ3yK5DQbP5tbfZby?si=5c2e651944bf46fe" }, //web syntax
        { title: "Thriller", artist: "Micheal Jackson", image: "/image/music/micheal.jpg", url: "https://open.spotify.com/album/2ANVost0y2y52ema1E9xAZ?si=I4_eaI2kRwqdqXBI1uZ5nA" }, // second 
        { title: "Self Control", artist: "Frank Ocean", image: "/image/music/frank.jpg", url: "https://open.spotify.com/track/5GUYJTQap5F3RDQiCOJhrS?si=ff177ea98ea8438a" }, //frank
        { title: "Kiss of life", artist: "Sade", image: "/image/music/sade.jpg", url: "https://open.spotify.com/track/65krtHkaYLPr0mEbjL61UP?si=01cc3a025cf1458a" }, // sade-kiss of life 
        { title: "No-love for lagos ", artist: "Showdem camp ft cavemen", image: "/image/music/show.jpg", url: "https://open.spotify.com/track/6YB48wZqqCZNa4b0dfEvIB?si=fb0e1862979c4e93" }, // no love for lagos 
    ],
    songs: [
        { title: "Who Knows", artist: "Daniel Cesar", image: "/image/music/ceasar-1.jpg", url: "https://open.spotify.com/track/6DH13QYXK7lKkYHSU88N48?si=0930e942eac5483e" }, // big first 
        { title: "Love and high life ", artist: "cavemenn", image: "/image/music/cavemen.jpg", url: "https://open.spotify.com/artist/1cnBVQulaNSvbind6A0dVD?si=05804b1dfb4045dc" }, //cavemen
        { title: "Fever", artist: "Wizkid", image: "/image/music/wizkid.jpg", url: "https://open.spotify.com/track/6kFDbInenX00vZhlKLiVfd?si=d38f313bf9b8433a" },
        { title: "No one noticed", artist: "THe Marias", image: "/image/music/marias.jpg", url: "https://open.spotify.com/track/3siwsiaEoU4Kuuc9WKMUy5?si=dbce2b8980964694" }, // the marias
        { title: "Best of Marvin sapp", artist: "Marvin Sapp", image: "/image/music/marvin.jpg", url: "https://open.spotify.com/playlist/54RTpM0S5JhMwSexJodcaN?si=p4viUypORBeFxGT-qWTVDw" }
    ],
    artists: [
        {
            title: "Never Enough",
            artist: "Daniel Ceasar",
            image: "/image/never.jpg",
            url: "https://open.spotify.com/album/0qGQrHicD7qXuz5VMlDuCe?si=TW4aOCDdSVyNeIK_nowXzw" //daniel
        },
        {
            title: "Here we go",
            artist: "Bex ikudala",
            image: "/image/music/Bez.jpg",
            url: "https://open.spotify.com/track/7ikNIVWj7uyDUbQiWqgT2y?si=49ce0ebf8adc4216"
        },
        {
            title: "Iceman",
            artist: "Drake",
            image: "/image/music/iceman.jpg",
            url: "https://open.spotify.com/album/0OAv7DCME2AV4q1KPO95HY?si=152b91cc5e02421f"
        },
        {
            title: "Higher",
            artist: "Tems",
            image: "/image/music/Tems.jpg",
            url: "https://open.spotify.com/track/2QdSb68BzZGMgCbsrFmSLc?si=6d5bfbfa203b4753" // tems - higher
        },
        {
            title: "Theophilus SUnday",
            artist: "father of spirits",
            image: "/image/music/Theophilus.jpg",
            url: "https://open.spotify.com/album/0qSaJmEcEt0eozJqLbolDt?si=3dd3c0dbd269407d"
        },
        {
            title: "hymns",
            artist: "choir of kings college",
            image: "/image/music/choir.jpg",
            url: "https://open.spotify.com/artist/0f3PsS9IQ6whvNMFFKnpjl?si=3fb18fc8330e40fb"
        }
    ]
};
