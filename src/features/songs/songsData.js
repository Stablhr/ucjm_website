const songsData = [
  {
    title: 'Maglilingkod Ako Sa Yo',
    artist: 'Himig Heswita',
    key: 'G',
    category: 'Worship',
    language: 'Filipino',
    lyrics_with_chords: `[G]Maglilingkod [C]ako sa 'Yo
[G]Sa buo kong [D]puso at [G]kaluluwa
[Em]Pag-ibig [Bm]Mo'y sapat [C]na
[G]Upang [D]akay [G]lumigaya

[G]Panginoon [C]ko't Diyos
[G]Ikaw ang [D]siyang aking [G]ligaya
[Em]Pag-ibig [Bm]Mo'y walang [C]katulad
[G]Kaya't [D]ako ay [G]sasamba`,
  },
  {
    title: 'What a Beautiful Name',
    artist: 'Hillsong Worship',
    key: 'D',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[D]You were the [A]Word at the be[Bm]ginning
[G]One with God the Lord Most [D]High
[A]Your hidden [D]glory in cre[A]ation
[Bm]Now revealed in [G]Jesus [A]Christ

[D]Death could not [A]hold You, the [Bm]veil tore before [G]You
You [D]silenced the [A]boast of sin and [G]grave
The [D]heavens are [A]roaring the [Bm]beauty of Your [G]majesty
The [D]universe [A]echoes with the [G]sound

What a beauti[Bm]ful [G]Name it [D]is
What a beauti[Bm]ful [G]Name it [D]is
The Name of [A]Jesus Christ my [Bm]King
What a beauti[Bm]ful [G]Name it [D]is
Nothing com[Bm]pares to [G]what You've [D]done`,
  },
  {
    title: 'Great Is Thy Faithfulness',
    artist: 'Thomas O. Chisholm',
    key: 'C',
    category: 'Hymn',
    language: 'English',
    lyrics_with_chords: `[C]Great is Thy [F]faithful[C]ness, O [G7]God my [C]Father
[F]There is no [C]shadow of [Dm]turning with [G7]Thee
[C]Thou changest [F]not, Thy com[C]passions they [Am]fail [Dm]not
[F]As Thou hast [C]been Thou for[G7]ever wilt [C]be

[C]Great is Thy [F]faithful[C]ness
[C]Great is Thy [F]faithful[G7]ness
[C]Morning by [F]morning new [C]mercies I [Am]see
[F]All I have [C]needed Thy [Dm]hand hath pro[G7]vided
[C]Great is Thy [F]faithful[C]ness
[G7]Lord, unto [C]me`,
  },
  {
    title: '10,000 Reasons (Bless the Lord)',
    artist: 'Matt Redman',
    key: 'G',
    category: 'Praise',
    language: 'English',
    lyrics_with_chords: `[G]Bless the Lord [D]O my [Em]soul
[C]O my [G]soul
[G]Worship His [D]holy [Em]name
[C]Sing like never [G]before
[Em]O my [D]soul
[C]I'll worship Your [G]holy [D]name`,
  },
  {
    title: 'Way Maker',
    artist: 'Sinach',
    key: 'C',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[C]Way Maker, [G]Miracle Worker
[Am]Promise Keeper, [F]Light in the darkness
[C]My God, [G]that is who You [F]are`,
  },
  {
    title: 'Panalangin sa Pagbubukas',
    artist: 'Bukas Palad',
    key: 'G',
    category: 'Worship',
    language: 'Filipino',
    lyrics_with_chords: `[G]Panginoong [C]Diyos
[G]Kami'y iyong [D]tipan[G]an
[Em]Pagpalain [Bm]Mo ang [C]aming [Am]pagsamba
[G]Sa iyong [D]piling [G]Diyos

[G]Tanggapin Mo [C]Panginoon
[G]Ang alay naming [D]puso't [G]buhay
[Em]Sambahin [Bm]Ka nami[C]ng [Am]tah[G]imik
[G]Sa 'Yong [D]banal na [G]tahanan`,
  },
  {
    title: 'How Great Is Our God',
    artist: 'Chris Tomlin',
    key: 'G',
    category: 'Praise',
    language: 'English',
    lyrics_with_chords: `[G]The splendor of the [D]King
Clothed in [Em]majesty
[C]Let all the earth re[G]joice
[G]All the earth re[D]joice

[G]He wraps Himself in [D]light
And dark[Em]ness tries to hide
[C]It trembles at His [G]voice
[C]Trembles at His [G]voice

[G]How great is [D]our God
[Em]Sing with [C]me
[G]How great is [D]our God
[Em]And all will [C]see
How [G]great, how [D]great
Is [C]our [G]God`,
  },
  {
    title: 'Walang Ibang Diyos',
    artist: 'HCC Worship',
    key: 'D',
    category: 'Praise',
    language: 'Filipino',
    lyrics_with_chords: `[D]Walang ibang [A]Diyos
[Bm]Maliban sa [G]'Yo
[D]Ikaw lamang [A]Panginoon
[G]Ang aking sasam[Bm]bahan

[D]Ang buhay ko'y [A]sa 'Yo
[Bm]Ang puso ko'y [G]sa 'Yo
[D]Walang ibang [A]Diyos
[G]Kundi Ikaw [D]lamang`,
  },
  {
    title: 'Mighty to Save',
    artist: 'Hillsong Worship',
    key: 'C',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[C]Everyone needs compas[G]sion
[A]Love that's never [F]failing
[C]Let mercy fall on [G]me
[F]Everyone needs for[C]giveness
[G]A kind of a King who [Am]offers
[F]His amazing grace`,
  },
  {
    title: 'Sa 'Yo Lamang',
    artist: 'Bukas Palad',
    key: 'G',
    category: 'Worship',
    language: 'Filipino',
    lyrics_with_chords: `[G]Sa 'Yo la[D]mang
[Em]Nakalaan ang [C]pagsambang [G]ito
[D]Tanging Ikaw
[Em]Diyos na [C]bukal ng pag-[G]ibig
[Am]Tinanggap [D]ko ang 'Yong [Bm]pagma[Em]hal
[A]At ngayo'y [D]nanan[sus4]git[G]o

[G]Panginoon [D]ko
[Em]Sa 'Yo la[C]mang
[G]Ang papuri [D]ko
[Em]Sa 'Yo la[C]mang`,
  },
  {
    title: 'Lord I Lift Your Name on High',
    artist: 'Rick Founds',
    key: 'C',
    category: 'Praise',
    language: 'English',
    lyrics_with_chords: `[C]Lord I lift Your name on [F]high
[C]Lord I love to sing Your [G]praises
[C]I'm so glad You're in my [F]life
[C]I'm so glad You came to [G]save us

[C]You came from [F]heaven to [C]earth
To [F]show the [C]way
From the [F]earth to the [C]cross
My [Dm]debt to [G]pay
From the [C]cross to the [F]grave
From the [C]grave to the [F]sky
[C]Lord I lift Your name on [G]high`,
  },
  {
    title: 'Dito sa Puso Ko',
    artist: 'Himig Heswita',
    key: 'G',
    category: 'Worship',
    language: 'Filipino',
    lyrics_with_chords: `[G]Dito sa [C]puso [G]ko
[D]Ikaw ang [G]hari
[Em]Dito sa [Bm]puso [C]ko
[Am]Ikaw ang [D]Pangino[G]on

[G]Puspos ng [C]pag-ibig [G]Mo
[D]Ako ay [G]sumasamba
[Em]Sa 'Yong [Bm]presensya
[C]Ligaya [D]ko'y [G]ganap`,
  },
  {
    title: 'Build My Life',
    artist: 'Housefires',
    key: 'D',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[D]Worthy of every [A]song we could [Bm]sing
[G]Worthy of all the [D]praise we could [A]bring
[G]Worthy of every [D]breath we could [Bm]breathe
[G]We live for [A]You

[D]Jesus, the Name a[A]bove every [Bm]name
[G]Beautiful Savior, [D]glorious [A]Lord
[G]Emmanuel, [D]God is with [Bm]us
[G]We live for [A]You`,
  },
  {
    title: 'Shout to the Lord',
    artist: 'Darlene Zschech',
    key: 'D',
    category: 'Praise',
    language: 'English',
    lyrics_with_chords: `[D]My Jesus, my [A]Savior
[G]Lord, there is none like [D]You
[D]All of my [A]days
[G]I want to [A]praise the [D]wonders of Your [A]mighty [D]love

[D]My comfort, my [A]shelter
[G]Tower of refuge and [D]strength
[D]Let every [A]breath, all that [G]I am
[A]Never cease to [D]worship [A]You`,
  },
]

export default songsData
