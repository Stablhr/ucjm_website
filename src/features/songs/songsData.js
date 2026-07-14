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
    title: "Sa 'Yo Lamang",
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
[A]Never cease to [D]worship [A]You

[Chorus]
[D]Shout to the [A]Lord, all the [G]earth, let us [D]sing
[D]Power and [A]majesty, praise to the [G]King
[D]Mountains [A]bow down and the [G]seas will [D]roar
[A]At the [D]sound of Your [G]name

[D]I sing for [A]joy at the [G]work of Your [D]hands
[D]Forever I'll [A]love You, forever I'll [G]stand
[D]Nothing com[A]pares to the [G]promise I [D]have
[A]In [D]You`,
  },
  {
    title: 'Trust in God',
    artist: 'Elevation Worship',
    key: 'C',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[Verse 1]
[C]I sought the Lord and He [G]answered me
He [Am]delivered me from every [F]fear
[C]Those who look on Him are [G]radiant
Their [Am]faces shall never be a[F]shamed

[Chorus]
This [C]poor man cried and the [G]Lord heard me
And [Am]saved me from my [F]enemies
The [C]Son of God surrounds the [G]one who serves
He [F]will deliver [C]them

[Verse 2]
[C]Taste and see that the [G]Lord is good
He [Am]blessed assurance for [F]those who hide in Him
[C]The one who fears shall [G]lack no thing
The [Am]Lion of Judah will [F]provide

[Chorus]
[C]Trust in God, my [G]helper through the [F]storm
[C]He's my refuge, my [G]fortress, my [F]refuge
[C]Trust in God, my [G]provider and my [F]shield
[C]He's my deliverer, my [G]Savior
He will [F]never fail`,
  },
  {
    title: 'We Fall Down',
    artist: 'Chris Tomlin',
    key: 'D',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[D]We fall down, we lay our [A]crowns
At the feet of [G]Jesus
The greatnes [D]of His mercy and [A]love
At the feet of [G]Jesus
And we cry holy, [A]holy, holy
[D]Holy, [A]holy

[D]We fall down, we lay our [A]crowns
At the feet of [G]Jesus
The greatnes [D]of His mercy and [A]love
At the feet of [G]Jesus
And we cry holy, [A]holy, holy
[D]Holy, [A]holy`,
  },
  {
    title: 'The Stand',
    artist: 'Hillsong',
    key: 'D',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[Verse 1]
[D]You stood before creation
[Bm]Eternity within Your [A]hand
[D]You spoke the earth into mo[G]tion
My soul now to stand

[D]You stood before my fail[Bm]ure
Carried the cross for my [A]shame
[D]My sin weighed upon Your [G]shoulders
My soul now to stand

[Chorus]
[D]So I'll stand with arms [Bm]high and heart a[G]bandoned
In awe of the One who gave [A]it all
[D]So I'll stand, my soul [Bm]Lord to You sur[G]rendered
All I am is [A]Yours`,
  },
  {
    title: 'Fighting for Us',
    artist: 'Hillsong',
    key: 'B',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[Verse 1]
[B]When the world has fallen [F#]out from under me
I'll be found in [E]You, still standing
[B]When the world has fallen [F#]out from under me
I'll be found in [E]You, still standing

[Chorus]
[F#]Every fear I face [E]You overcome
[F#]You're still fighting for [B]us
[F#]Your love will not give [E]up on me
[F#]You're still fighting for [B]us

[Verse 2]
[B]You have overcome the [F#]world, my Savior
You're the hope for [E]all mankind
[B]You have overcome the [F#]world, my Savior
You're the hope for [E]all mankind

[Chorus]
[F#]Every fear I face [E]You overcome
[F#]You're still fighting for [B]us
[F#]Your love will not give [E]up on me
[F#]You're still fighting for [B]us`,
  },
  {
    title: 'You Are Good',
    artist: 'Planetshakers',
    key: 'G',
    category: 'Praise',
    language: 'English',
    lyrics_with_chords: `[Verse 1]
[G]You are good, and nothing can [C]take that away
You are good, and nothing can [G]take that away
You are good, and nothing can [C]take that away
You are good, nothing can [G]take that away

[Chorus]
[G]Hallelujah, [C]hallelujah
[G]Hallelujah, [C]hallelujah
[G]You are good, You are [C]good
[G]You are good, You are [C]good
[G]To [D]me

[G]Hallelujah, [C]hallelujah
[G]Hallelujah, [C]hallelujah
[G]You are good, You are [C]good
[G]You are good, You are [C]good
[G]To [D]me

[Bridge]
[G]Your love will never let me [C]go
[G]Your grace is all I'll ever [C]know
[G]Your joy is all that fills my [C]soul
[G]You are [D]good`,
  },
  {
    title: 'Glory',
    artist: 'Hillsong',
    key: 'E',
    category: 'Praise',
    language: 'English',
    lyrics_with_chords: `[Verse 1]
[E]Singing out Your [B]glory
[C#m]Worshipping Your [A]name
[E]Lifting up Your [B]name
[C#m]Heaven and earth [A]proclaim
[E]Jesus, we [B]adore You
[C#m]You have set us [A]free
[E]Risen King of [B]glory
[C#m]We will worship [A]Thee

[Chorus]
[E]Glory, [B]glory to our [A]King
[E]Glory, [B]glory to our [A]King
[E]Glory, [B]glory to our [A]King
[E]You are [B]everything

[E]Glory, [B]glory to our [A]King
[E]Glory, [B]glory to our [A]King
[E]Glory, [B]glory to our [A]King
[E]You are [B]everything`,
  },
  {
    title: 'I Came for You',
    artist: 'Planetshakers',
    key: 'C',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[Verse 1]
[C]I came for You, Jesus
[F]I came for You
[C]I came for You, Jesus
[F]I came for You
[G]There is no one like You
[F]There is no one like You
[C]There is no one like You
[F]I came for You

[Chorus]
[C]So here I am, [F]here I am
[C]I give my heart to [F]You
[C]Here I am, [F]here I am
[C]I surrender all to [F]You
[G]All to You, [F]all to You
[C]All to You, [F]all to You
[G]I came for [C]You`,
  },
  {
    title: 'Fall Like Rain',
    artist: 'Passion',
    key: 'Eb',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[Verse 1]
[Eb]I'm ready for a [Bb]flood
I'm standing in a [Ab]sea
Of everything I've [Eb]held so dear
Has now become debris

[Eb]I'm ready for a [Bb]change
I'm stepping in a [Ab]river
Of everything You [Eb]have in store
For me to receive and [Bb]give

[Chorus]
[Eb]Let Your Spirit [Bb]fall like rain
[Ab]Falling on my [Bb]heart again
[Eb]Let Your presence [Bb]wash away
[Ab]All I am, I [Bb]surrender

[Eb]Let Your Spirit [Bb]fall like rain
[Ab]Falling on my [Bb]heart again
[Eb]Let Your presence [Bb]wash away
[Ab]All I am, I [Bb]surrender`,
  },
  {
    title: 'Sinking Deep',
    artist: 'Hillsong Young & Free',
    key: 'A',
    category: 'Worship',
    language: 'English',
    lyrics_with_chords: `[Verse 1]
[A]Waking up to a new [E]sunrise
Looking back from the other [F#m]side
I can see now with [D]open eyes
Darkest water and deepest [A]pain
I wouldn't trade it for [E]anything
'Cause my brokenness brought me to [F#m]You
And these wounds are a story You'll [D]use

[Chorus]
So I'm not [A]afraid to say
[E]I am sinking deep
[F#m]In Your love, [D]in Your love
I'm not [A]afraid to say
[E]I am sinking deep
[F#m]In Your love, [D]in Your love

[Verse 2]
[A]Now I'm resting in the arms of [E]Jesus
Safe and sound, my heart is [F#m]home
He has brought me to a [D]promised land
From the ashes I am [A]reborn
I'm not [E]afraid anymore

[Bridge]
[F#m]There's no one like You, [D]Jesus
[F#m]There's no one like You, [D]Jesus
[F#m]There's no one like You, [D]Jesus
To [A]me`,
  },
  {
    title: 'Worthy of It All',
    artist: 'CeCe Winans',
    key: 'Em',
    category: 'Praise',
    language: 'English',
    lyrics_with_chords: `[Verse 1]
[Em]Day and night, night and day
[C]Let incense arise
[Em]Day and night, night and day
[C]Let incense arise

[Chorus]
[D]All the saints and [G]angels
They bow before Your [Em]throne
[D]All the elders [G]cast their crowns
Before the Lamb of [C]God and sing

[D]You are worthy of it [G]all
[Em]You are worthy of it [C]all
[D]For from You are all [G]things
[Em]And to You are all [C]things
You deserve the [D]glory`,
  },
  {
    title: "Sa 'Yo Lamang",
    artist: 'Victory Worship',
    key: 'D',
    category: 'Worship',
    language: 'Filipino',
    lyrics_with_chords: `[Verse 1]
[D]Sa 'Yo lamang, [A]Panginoon
[Bm]Buong puso kong [G]naghahandog ng [D]buhay
[D]Sa 'Yo lamang, [A]Panginoon
[Bm]Itinataas ang [G]alan Mo

[Chorus]
[A]Ikaw ang aking [G]kaligtasan
[D]Ikaw ang aking [A]kaginhawaan
[A]Sa 'Yo lamang, [G]Panginoon
[D]Ako'y [A]sumasamba

[Verse 2]
[D]Sa 'Yo lamang, [A]Panginoon
[Bm]Buong puso kong [G]naghahandog ng [D]buhay
[D]Sa 'Yo lamang, [A]Panginoon
[Bm]Itinataas ang [G]alan Mo

[Chorus]
[A]Ikaw ang aking [G]kaligtasan
[D]Ikaw ang aking [A]kaginhawaan
[A]Sa 'Yo lamang, [G]Panginoon
[D]Ako'y [A]sumasamba

[Bridge]
[D]Hindi na ako [A]maghahanap ng [G]iba
[D]Ikaw lamang ang [A]king ninanais
[D]Hindi na ako [A]maghahanap ng [G]iba
[D]Ikaw lamang, [A]Panginoon`,
  },
]

export default songsData
