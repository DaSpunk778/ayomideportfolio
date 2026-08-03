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
        { title: "Timi fever", artist: "Curated by Ayomide", image: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=400", url: "https://open.spotify.com/playlist/3Ey4Qy3Nc2wFrwx2hLezHT" },
        { title: "Afro Special WTF!!!", artist: "Afro Special WTF!!!", image: "/images/music/afrowt.png", url: "https://open.spotify.com/playlist/2Ef2swGnqfykV5vZAzkirm?si=y0PgOBaDSauwgjnQWV3tuQ" },
        { title: "Blended Peace", artist: "Blended Peace", image: "/images/music/blendedpeace.png", url: "https://open.spotify.com/album/2fz0Euo0JCmgJhNxiDuAeu?si=pfYl6sMYSW6tMQe46QwCIg" },
        { title: "Anew Dystopian", artist: "Anew Dystopian", image: "/images/music/anewdystopian.png", url: "https://open.spotify.com/playlist/57lZWJdgWtX93HcfkroRx9?si=iQcFHw9BS62sBcPGQJPQ6g" },
        { title: "Aesthetic LoFi -No AI", artist: "Aesthetic LoFi -No AI", image: "/images/music/aestheticLoFi.png", url: "https://open.spotify.com/playlist/3NOVvsnCq7CjhmB7WE0RNE?si=55NpfKqrTmWRFp-hEb-dRA" },
        { title: "Synthwave - beats to chill/game to", artist: "Synthwave - beats to chill/game to", image: "/images/music/synthwave.png", url: "https://open.spotify.com/playlist/1YIe34rcmLjCYpY9wJoM2p?si=HCQoRY5SReuH9qv4Naelsw" },
    ],
    songs: [
        { title: "Black water", artist: "Frankie Stew & Harvey Gunn", image: "/images/music/blackwater.png", url: "https://open.spotify.com/track/5qiOt87AxiBAGRaiKz7Yqb?si=88977b5bf98843f3" },
        { title: "My Healer", artist: "Seyi Vibez ft Omah Lay", image: "/images/music/myhealer.png", url: "https://open.spotify.com/track/3tENXWy5Yf1iJJV4EYqZh1?si=b8ba811381dc4dde" },
        { title: "almost gave up here", artist: "MKE", image: "/images/music/almostgaveuphere.png", url: "https://open.spotify.com/track/6kFDbInenX00vZhlKLiVfd?si=d38f313bf9b8433a" },
        { title: "Vale", artist: "Maribou State", image: "/images/music/vale.png", url: "https://open.spotify.com/track/58FsmlVRQxpjFmXF8vSKMT?si=90b1bd124a8946af" },
        { title: "How did i get here", artist: "ODESZA", image: "/images/music/howdidigethere.png", url: "https://open.spotify.com/track/6a8vuTNZubAqZ1LdTwuIud?si=5ad13fff2d8d4686" }
    ],
    artists: [
        {
            title: "Never Enough",
            artist: "Daniel Ceasar",
            image: "/image/never.jpg",
            url: "https://open.spotify.com/album/0qGQrHicD7qXuz5VMlDuCe?si=TW4aOCDdSVyNeIK_nowXzw"
        },
        {
            title: "Sons of Spergy",
            artist: "Aniel Cear",
            image: "/images/music/artists/seyivibez.png",
            url: "https://open.spotify.com/artist/4zmZ8lVLzGc84S4v2B1rLx"
        },
        {
            title: "Kygo",
            artist: "Electronic",
            image: "/images/music/artists/kygo.png",
            url: "https://open.spotify.com/artist/23fqKkggKUBHNkbKtXEls4?si=NIyXl5sSQC-OX-tpMGZYog"
        },
        {
            title: "Mike Posner",
            artist: "Pop",
            image: "/images/music/artists/mikeposner.png",
            url: "https://open.spotify.com/artist/2KsP6tYLJlTBvSUxnwlVWa"
        },
        {
            title: "Petit Biscuit",
            artist: "Electronic",
            image: "/images/music/artists/petitbiscuit.png",
            url: "https://open.spotify.com/artist/6gK1Uct5FEdaUWRWpU4Cl2"
        },
        {
            title: "Olamide",
            artist: "Afrobeats",
            image: "/images/music/artists/olamide.png",
            url: "https://open.spotify.com/artist/4ovtyvs7j1jSmwhkBGHqSr"
        }
    ]
};
