-- Add is_builtin column to distinguish system songs from user-added songs
ALTER TABLE songs ADD COLUMN IF NOT EXISTS is_builtin BOOLEAN DEFAULT false;

-- Clean up any existing duplicate songs (keep only the oldest per title+artist)
-- This fixes the unique index creation error from previously running seed.sql
DELETE FROM songs a
USING songs b
WHERE a.id > b.id
  AND LOWER(a.title) = LOWER(b.title)
  AND LOWER(a.artist) = LOWER(b.artist);

-- Remove any stale soft-delete markers left over from the old system
DELETE FROM songs WHERE image_color = '__DELETED__';

-- Unique constraint for upsert support (case-insensitive title+artist)
CREATE UNIQUE INDEX IF NOT EXISTS idx_songs_title_artist_unique ON songs (LOWER(title), LOWER(artist));

-- Drop old overly-permissive policies
DROP POLICY IF EXISTS "Songs are public" ON songs;
DROP POLICY IF EXISTS "Songs are viewable by everyone" ON songs;
DROP POLICY IF EXISTS "Admins can insert songs" ON songs;
DROP POLICY IF EXISTS "Admins can update songs" ON songs;
DROP POLICY IF EXISTS "Admins can delete songs" ON songs;
DROP POLICY IF EXISTS "Playlists are public" ON playlists;
DROP POLICY IF EXISTS "Playlists are viewable by everyone" ON playlists;
DROP POLICY IF EXISTS "Authenticated users can create playlists" ON playlists;
DROP POLICY IF EXISTS "Authenticated users can update playlists" ON playlists;
DROP POLICY IF EXISTS "Authenticated users can delete playlists" ON playlists;
DROP POLICY IF EXISTS "Playlist songs are public" ON playlist_songs;
DROP POLICY IF EXISTS "Playlist songs are viewable by everyone" ON playlist_songs;
DROP POLICY IF EXISTS "Authenticated users can insert playlist songs" ON playlist_songs;
DROP POLICY IF EXISTS "Authenticated users can update playlist songs" ON playlist_songs;
DROP POLICY IF EXISTS "Authenticated users can delete playlist songs" ON playlist_songs;

-- Songs: public read, admin-only write
CREATE POLICY "Songs are viewable by everyone" ON songs FOR SELECT USING (true);
CREATE POLICY "Admins can insert songs" ON songs FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "Admins can update songs" ON songs FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can delete songs" ON songs FOR DELETE USING (is_admin());

-- Playlists: public read, authenticated write
CREATE POLICY "Playlists are viewable by everyone" ON playlists FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create playlists" ON playlists FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update playlists" ON playlists FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete playlists" ON playlists FOR DELETE USING (auth.role() = 'authenticated');

-- Playlist songs: public read, authenticated write
CREATE POLICY "Playlist songs are viewable by everyone" ON playlist_songs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert playlist songs" ON playlist_songs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update playlist songs" ON playlist_songs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete playlist songs" ON playlist_songs FOR DELETE USING (auth.role() = 'authenticated');

-- Seed all 30 built-in songs (runs as superuser, bypasses RLS)
INSERT INTO songs (title, artist, key, category, language, album, album_year, image_color, image_url, youtube_url, lyrics_with_chords, is_builtin) VALUES

('What a Beautiful Name', 'Hillsong Worship', 'D', 'Worship', 'English', 'Let There Be Light', 2016, 'from-sky-500 to-indigo-600', '/images/album-art/what-a-beautiful-name.jpg', 'https://www.youtube.com/watch?v=nQWFzMvCfLE',
$$[VERSE]
[D]You were the [A]Word at the be[Bm]ginning
[G]One with God the Lord Most [D]High
[A]Your hidden [D]glory in cre[A]ation
[Bm]Now revealed in [G]Jesus [A]Christ

[VERSE]
[D]Death could not [A]hold You, the [Bm]veil tore before [G]You
You [D]silenced the [A]boast of sin and [G]grave
The [D]heavens are [A]roaring the [Bm]beauty of Your [G]majesty
The [D]universe [A]echoes with the [G]sound

[VERSE]
[D]You didn't want [A]heaven without [Bm]us
[G]So Jesus, You [D]brought heaven [A]down
[G]My sin was great, Your [D]love was greater
[Bm]What could separate [G]us [A]now

[CHORUS]
What a beauti[Bm]ful [G]Name it [D]is
What a beauti[Bm]ful [G]Name it [D]is
The Name of [A]Jesus Christ my [Bm]King
What a beauti[Bm]ful [G]Name it [D]is
Nothing com[Bm]pares to [G]what You've [D]done$$, true),

('10,000 Reasons (Bless the Lord)', 'Matt Redman', 'G', 'Praise', 'English', '10,000 Reasons', 2011, 'from-amber-400 to-orange-600', '/images/album-art/10000-reasons.jpg', 'https://www.youtube.com/watch?v=DXDGE_lRI0E',
$$[CHORUS]
[G]Bless the Lord [D]O my [Em]soul
[C]O my [G]soul
[G]Worship His [D]holy [Em]name
[C]Sing like never [G]before
[Em]O my [D]soul
[C]I'll worship Your [G]holy [D]name

[VERSE]
[G]The sun comes [D]up, it's a [Em]new day dawning
[C]It's time to sing Your [G]song again
[G]Whatever may [D]pass, and what[Em]ever lies before me
[C]Let me be singing when the [G]evening comes

[VERSE]
[G]You're rich in [D]love, and You're [Em]slow to anger
[C]Your name is great and Your [G]heart is kind
[G]For all Your [D]goodness, I will [Em]keep on singing
[C]Ten thousand reasons for my [G]heart to find

[BRIDGE]
[C]And on that day when my [G]strength is failing
[C]The end draws near and my [G]time has come
[C]Still my soul will sing Your [G]praise unending
[C]Ten thousand [D]years and then for[G]evermore$$, true),

('Way Maker', 'Sinach', 'C', 'Worship', 'English', 'Way Maker', 2015, 'from-emerald-400 to-green-600', '/images/album-art/way-maker.jpg', 'https://www.youtube.com/watch?v=nq0lpQLSdBE',
$$[VERSE]
[C]You are here, [G]moving in our midst
[Am]You are here, [F]working in this place
[C]You are here, [G]moving in our midst
[Am]You are here, [F]working in this place

[CHORUS]
[C]Way Maker, [G]Miracle Worker
[Am]Promise Keeper, [F]Light in the darkness
[C]My God, [G]that is who You [F]are

[VERSE]
[C]You are here, [G]touching every heart
[Am]You are here, [F]healing every life
[C]You are here, [G]touching every heart
[Am]You are here, [F]healing every life

[CHORUS]
[C]Way Maker, [G]Way Maker
[Am]Way Maker, [F]Way Maker$$, true),

('How Great Is Our God', 'Chris Tomlin', 'G', 'Praise', 'English', 'Arriving', 2004, 'from-amber-500 to-rose-600', '/images/album-art/how-great-is-our-god.jpg', 'https://www.youtube.com/watch?v=2X_2IdybTV0',
$$[VERSE]
[G]The splendor of the [D]King
Clothed in [Em]majesty
[C]Let all the earth re[G]joice
[G]All the earth re[D]joice

[VERSE]
[G]He wraps Himself in [D]light
And dark[Em]ness tries to hide
[C]It trembles at His [G]voice
[C]Trembles at His [G]voice

[CHORUS]
[G]How great is [D]our God
[Em]Sing with [C]me
[G]How great is [D]our God
[Em]And all will [C]see
How [G]great, how [D]great
Is [C]our [G]God

[TAG]
[G]Name above all [D]names
[Em]Worthy of all [C]praise
[G]My heart will [D]sing
[C]How great is our [G]God$$, true),

('Mighty to Save', 'Hillsong Worship', 'C', 'Worship', 'English', 'Mighty to Save', 2006, 'from-blue-500 to-indigo-600', '/images/album-art/mighty-to-save.jpg', 'https://www.youtube.com/watch?v=9UGETrmP_LQ',
$$[VERSE]
[C]Everyone needs compas[G]sion
[A]Love that's never [F]failing
[C]Let mercy fall on [G]me
[F]Everyone needs for[C]giveness
[G]A kind of a King who [Am]offers
[F]His amazing grace

[CHORUS]
[C]Savior, He can [G]move the mountains
[A]My God is [F]mighty to save
[C]He is [G]mighty to save
[A]Forever, [F]author of salvation
[C]He rose and [G]conquered the grave
[A]Jesus con[F]quered the grave

[VERSE]
[C]So take me as You [G]find me
[A]All my fears and [F]failures
[C]Fill my life a[G]ain
[F]I give my life to [C]follow
[G]Everything I be[Am]lieve in
[F]Now I surrender

[TAG]
[C]Shine Your [G]light
[A]Let the whole world [F]see
We're [C]singing for the [G]glory
Of the [Am]risen [F]King$$, true),

('Lord I Lift Your Name on High', 'Rick Founds', 'C', 'Praise', 'English', 'Lord I Lift Your Name on High', 1989, 'from-amber-400 to-rose-500', '/images/album-art/lord-i-lift-your-name-on-high.jpg', '',
$$[VERSE]
[C]Lord I lift Your name on [F]high
[C]Lord I love to sing Your [G]praises
[C]I'm so glad You're in my [F]life
[C]I'm so glad You came to [G]save us

[VERSE]
[C]You came from [F]heaven to [C]earth
To [F]show the [C]way
From the [F]earth to the [C]cross
My [Dm]debt to [G]pay
From the [C]cross to the [F]grave
From the [C]grave to the [F]sky
[C]Lord I lift Your name on [G]high$$, true),

('Build My Life', 'Housefires', 'D', 'Worship', 'English', 'Housefires III', 2016, 'from-rose-500 to-purple-600', '/images/album-art/build-my-life.jpg', 'https://www.youtube.com/watch?v=C9g83-BnYnU',
$$[VERSE]
[D]Worthy of every [A]song we could [Bm]sing
[G]Worthy of all the [D]praise we could [A]bring
[G]Worthy of every [D]breath we could [Bm]breathe
[G]We live for [A]You

[CHORUS]
[D]And I will [A]build my life upon Your [Bm]love
[G]It is a firm foun[D]dation
[A]And I will [G]put my trust in [D]You alone
[Bm]And I will not be [G]shaken

[VERSE]
[D]There is [A]nothing better than [Bm]You
[G]There is [D]nothing better than [A]You
[G]Lord, there is [D]nothing
[Bm]There is [G]nothing better than [A]You

[TAG]
[D]Jesus, the Name a[A]bove every [Bm]name
[G]Beautiful Savior, [D]glorious [A]Lord
[G]Emmanuel, [D]God is with [Bm]us
[G]We live for [A]You$$, true),

('Shout to the Lord', 'Darlene Zschech', 'D', 'Praise', 'English', 'Shout to the Lord', 1994, 'from-amber-400 to-orange-500', '/images/album-art/shout-to-the-lord.jpg', 'https://www.youtube.com/watch?v=7pntLxmKVYI',
$$[VERSE]
[D]My Jesus, my [A]Savior
[G]Lord, there is none like [D]You
[D]All of my [A]days
[G]I want to [A]praise the [D]wonders of Your [A]mighty [D]love

[VERSE]
[D]My comfort, my [A]shelter
[G]Tower of refuge and [D]strength
[D]Let every [A]breath, all that [G]I am
[A]Never cease to [D]worship [A]You

[CHORUS]
[G]Shout to the [A]Lord, all the [D]earth
[Bm]Let us [F#m]sing
[G]Power and [A]majesty
[D]Praise to the [A/C#]King
[Bm]Mountains bow [A]down
[G]And the seas will [A]roar
At the [D]sound of Your [A]name

[BRIDGE]
[G]I sing for [A]joy at the [D]work of Your [Bm]hands
[F#m]Forever I'll [G]love You
[A]Forever I'll [D]stand
[G]Nothing com[A]pares to the [D]promise I [Bm]have
[G]In [A]You$$, true),

('Praise', 'Elevation Worship', 'A', 'Praise', 'English', 'Can You Imagine?', 2023, 'from-yellow-400 to-amber-600', '/images/album-art/praise.jpg', 'https://www.youtube.com/watch?v=f2oxGYpuLkw',
$$[INTRO]
[A]Let everything that has breath
Praise the Lord, Praise the Lord

[VERSE]
[A]I'll praise in the valley
[D]Praise on the [A]mountain
[E]I'll praise when I'm sure
[D]Praise when I'm [A]doubting
[A]I'll praise when outnumbered
[D]Praise when [A]surrounded
[E]'Cause praise is the [D]waters
My [A]enemies drown in

[E]As long as I'm breathing
[D]I've got a reason to

[CHORUS]
[F#m]Praise the [D]Lord, oh my [A]soul
[F#m]Praise the [D]Lord, oh my [A]soul
[F#m]I won't be [D]quiet, my [A]God is a[E]live
How could I keep it inside
Praise the Lord oh my soul

[VERSE]
[A]I'll praise when I feel it
[D]I'll praise when I [A]don't
[E]I'll praise 'cause I [D]know
You're still in con[A]trol
[A]'Cause my praise is a weapon
[D]It's more than a [A]sound
[E]My praise is the [D]shout
That brings [A]Jericho down

[BRIDGE]
[A]I'll praise 'cause You're sovereign
[Bm]Praise 'cause You reign
[C#m]Praise 'cause You rose
[D]And defeated the grave
[A]I'll praise 'cause You're faithful
[Bm]Praise 'cause You're true
[C#m]Praise 'cause there's [D]nobody
Greater than [A]You

[CHORUS]
[F#m]Praise the [D]Lord, oh my [A]soul
[F#m]Praise the [D]Lord, oh my [A]soul
[F#m]I won't be [D]quiet, my [A]God is a[E]live
How could I keep it inside
Praise the Lord oh my soul

[OUTRO]
[A]Let everything that has breath
Praise the Lord, Praise the Lord$$, true),

('I Thank God', 'Maverick City Music & UPPERROOM', 'Db', 'Praise', 'English', 'Move Your Heart', 2021, 'from-blue-500 to-purple-700', '/images/album-art/i-thank-god.jpg', 'https://www.youtube.com/watch?v=LM1qrx0Huds',
$$[VERSE]
[Db]Wandering into the night
[Db]Wanting a place to hide
[Gb]This weary soul, this [Db]bag of bones
[Db]I try with all my might
[Db]But I just can't win the fight
[Gb]I'm slowly drifting, a [Db]vagabond

[PRE-CHORUS]
[Ab]Just when I [Bbm]ran out of road
[Gb]I met a Man I [Db]didn't know
[Ab]And He told me [Db]I was not a[Gb]lone

[CHORUS]
[Db]He picked me up
[Ebm]Turned me around
[Db]Placed my [Gb]feet on solid ground
[Bbm]I thank the Master
[Gb]I thank the Savior
[Db]Because He healed my heart
[Ebm]He changed my name
[Db]Forever [Gb]free, I'm not the same
[Bbm]I thank the Master
[Gb]I thank the Savior
[Db]I thank God

[VERSE]
[Db]I cannot deny what I see
[Db]Got no choice but to believe
[Gb]My doubts are burning, like [Db]ashes in the wind
[Db]So long to my old friends
[Db]Burden and bitterness
[Gb]You can just keep moving, you [Db]ain't welcome here

[PRE-CHORUS]
[Ab]From now till I [Bbm]walk streets of gold
[Gb]I'll sing of how You [Db]saved my soul
[Ab]This wayward [Db]son has found his [Gb]way back home

[CHORUS]
[Db]He picked me up
[Ebm]Turned me around
[Db]Placed my [Gb]feet on solid ground
[Bbm]I thank the Master
[Gb]I thank the Savior
[Db]Because He healed my heart
[Ebm]He changed my name
[Db]Forever [Gb]free, I'm not the same
[Bbm]I thank the Master
[Gb]I thank the Savior
[Db]I thank God

[BRIDGE]
[Db]Hell lost another one
I am free, I am free, I am free
[Gb]Get up, get up, get up out of that grave
I am free, I am free, I am free
[Ab]Hell lost another one
[Bbm]I am free, I am free, I am free
[Gb]Get up, get up, get up out of that grave
I am free, I am free, I am free

[TAG]
Oh, I thank God
Oh, I thank God
Oh, I thank God
Oh, I thank God$$, true),

('Gratitude', 'Brandon Lake', 'B', 'Worship', 'English', 'House of Miracles', 2021, 'from-amber-500 to-orange-600', '/images/album-art/gratitude.jpg', 'https://www.youtube.com/watch?v=1em6MJp0zUc',
$$[VERSE]
[B]All my words fall short
[G]I got nothing new
[F#]How could I express
[E]All my gratitude

[VERSE]
[B]I could sing these songs
[G]As I often do
[F#]But every song must end
[E]And You never do

[CHORUS]
[B]So I throw up my hands
[F#]And praise You again and again
'Cause all that I have is a
[E]Hallelujah, [G]halle[F#]lujah
[B]And I know it's not much
[F#]But I've nothing else fit for a King
Except for a heart singing
[E]Hallelujah, [G]halle[F#]lu[B]jah

[BRIDGE]
[B]I've got one response
[G]I've got just one move
[F#]With my arms stretched wide
[E]I will worship You

[INTERLUDE]
[B]So come on my soul, don't you get shy on me
[B]Lift up your song, you've got a lion inside
[B]Get up and praise the Lord
[F#]Come on my soul, don't you get shy on me
[E]Lift up your song, you've got a lion inside
Get up and praise the [B]Lord$$, true),

('Jireh', 'Elevation Worship & Maverick City Music', 'Eb', 'Worship', 'English', 'Old Church Basement', 2021, 'from-teal-500 to-green-700', '/images/album-art/jireh.jpg', 'https://www.youtube.com/watch?v=mC-zw0zCCtg',
$$[VERSE]
[Cm]I'll never be more loved than I am right now
[Cm]Wasn't holding You up so there's nothing I
[Bb]Can do to let You [Ab]down
[Eb]Doesn't take a trophy to make You proud
[Cm]I'll never be [Bb]more loved than I am
[Fm]Right [Eb]now

[VERSE]
[Cm]Going through a storm but I won't go down
[Cm]I hear Your voice carried in the rhythm
[Bb]Of the wind to call me [Ab]out
[Eb]You would cross an ocean so I wouldn't drown
[Cm]You've never been [Bb]closer than You are
[Fm]Right [Eb]now

[CHORUS]
[Bb]Jireh, [Cm]You are e[Ab]nough
[Eb]Jireh, [Bb]You are e[Cm]nough
[Ab]I will be [Eb]content in every [Bb]circumstance
[Cm]Jireh, [Bb]You are e[Ab]nough

[BRIDGE]
[Cm]I'm already loved
[Bb]I'm already chosen
[Ab]I know who I am
[Eb]I know what You've spoken
[Cm]I'm already loved
[Bb]More than I could imagine
[Fm]And that is e[Eb]nough

[TAG]
[Eb]Forever e[Bb]nough
[Ab]Always e[Eb]nough
[Bb]More than e[Cm]nough$$, true),

('Goodness of God', 'Bethel Music', 'G', 'Worship', 'English', 'Victory', 2019, 'from-rose-400 to-red-600', '/images/album-art/goodness-of-god.jpg', 'https://www.youtube.com/watch?v=q4BK5BunLjQ',
$$[VERSE]
[G]I love You, Lord
[C]For Your mercy never [G]fails me
[D/F#]All my [Em]days, I've been [C]held in Your [D]hands
[Em]From the moment that I [C]wake up
[G]Until I [D/F#]lay my [Em]head
[C]I will sing of the [D]goodness of [G]God

[CHORUS]
[C]All my life You have been [G]faithful
[C]All my life You have been [G]so, so [D]good
[C]With every breath that I am [G]able
[D/F#]I will [Em]sing of the [C]goodness of [D]God

[VERSE]
[G]I love Your voice
[C]You have led me through the [G]fire
[D/F#]In [Em]darkest night You are [C]close like no [D]other
[Em]I've known You as a [C]Father
[G]I've known You as a [D/F#]friend
[Em]I have [C]lived in the [D]goodness of [G]God

[CHORUS]
[G/B]Your goodness is running [C]after
[D]It's running after [G]me
[G/B]Your goodness is running [C]after
[D]It's running after [G]me
[G/B]With my life laid down
[C]I'm surrendered now
[D]I give You every[Em]thing
[G/B]Your goodness is running [C]after
[D]It's running after [G]me$$, true),

('Battle Belongs', 'Phil Wickham', 'Db', 'Worship', 'English', 'Hymn of Heaven', 2021, 'from-blue-600 to-indigo-800', '/images/album-art/battle-belongs.jpg', 'https://www.youtube.com/watch?v=johgSkNj3-A',
$$[VERSE]
[Db]When all I see is the battle
[Gb]You see my victory
[Bbm]When all I see is the [Ab]mountain
[Gb]You see a mountain moved
[Db]And as I walk through the shadow
[Gb]Your love surrounds me
[Bbm]There's nothing to fear now
[Ab]For I am safe with [Db]You

[CHORUS]
[Gb]So when I fight, I'll [Db]fight on my knees
[Ab]With my hands lifted [Bbm]high
[Gb]Oh God, the battle be[Db]longs to [Ab]You
[Gb]And every fear I [Db]lay at Your feet
[Ab]I'll sing through the [Bbm]night
[Gb]Oh God, the battle be[Db]longs to [Ab]You

[VERSE]
[Db]And if You are for me
[Gb]Who can be against me?
[Bbm]For Jesus there's nothing [Ab]impossible for [Gb]You
[Db]When all I see are the ashes
[Gb]You see the beauty
[Bbm]When all I see is a cross
[Ab]You see the empty [Db]tomb

[BRIDGE]
[Gb]Almighty fortress
[Db]You go before us
[Ab]Nothing can stand against the [Bbm]power of our God
[Gb]You shine in the shadow
[Db]You win every battle
[Ab]Nothing can stand against the [Bbm]power of our God$$, true),

('Holy Forever', 'Chris Tomlin', 'Db', 'Worship', 'English', 'Always', 2022, 'from-violet-500 to-indigo-700', '/images/album-art/holy-forever.jpg', 'https://www.youtube.com/watch?v=IkHgxKemCRk',
$$[VERSE]
[Db]A thousand generations
[Gb]Falling down in [Db]worship
[Bbm]To sing the song of [Ab]ages to the [Gb]Lamb
[Db]And all who've gone before us
[Gb]And all who will be[Db]lieve
[Bbm]Will sing the song of [Ab]ages to the [Gb]Lamb

[PRE-CHORUS]
[Gb]Your name is the highest
[Bbm]Your name is the greatest
[Ab]Your name stands above them [Gb]all
[Gb]All thrones and dominions
[Bbm]All powers and positions
[Ab]Your name stands above them [Ebm]all

[CHORUS]
[Gb]And the angels cry: [Bbm]Holy
[Ab]All creation cries: [Db]Holy
[Bbm]You are lifted [Ebm]high
[Ab]Holy for[Db]ever

[CHORUS]
[Gb]Hear Your people [Bbm]sing: Holy
[Ab]To the King of [Db]kings: Holy
[Bbm]You will always [Ebm]be
[Ab]Holy for[Db]ever

[VERSE]
[Db]If you've been forgiven
[Gb]And if you've been re[Db]deemed
[Bbm]Sing the song for[Ab]ever to the [Gb]Lamb
[Db]If you walk in freedom
[Gb]And if you bear His [Db]name
[Bbm]Sing the song for[Ab]ever to the [Gb]Lamb$$, true),

('Firm Foundation (He Won''t)', 'Cody Carnes', 'Db', 'Worship', 'English', 'Firm Foundation (Live)', 2021, 'from-sky-400 to-blue-700', '/images/album-art/firm-foundation.jpg', 'https://www.youtube.com/watch?v=yX8IQCgaqFk',
$$[VERSE]
[Db]Christ is my firm foundation
[Bbm]The rock on which I [Ab]stand
[Db]When everything around me is shaken
[Bbm]I've never been more [Ab]glad
[Gb]That I put my faith in [Db]Jesus
[Bbm]'Cause He's never let me [Ab]down
[Gb]He's faithful through gener[Db]ations
[Bbm]So why would He fail [Ab]now?

[CHORUS]
[Db]He won't, He won't
[Gb]He won't [Db]fail
[Gb]He won't [Db]fail

[VERSE]
[Db]I've still got joy in chaos
[Bbm]I've got peace that makes no [Ab]sense
[Db]I won't be going under
[Bbm]I'm not held by my own [Ab]strength
[Gb]'Cause I build my life on [Db]Jesus
[Bbm]He's never let me [Ab]down
[Gb]He's faithful in every [Db]season
[Bbm]So why would He fail [Ab]now?

[BRIDGE]
[Gb]Rain came and [Ab]wind blew
[Db]But my house was built on [Bbm]You
[Gb]I'm safe with [Ab]You
[Db]I'm gonna make it through

[CHORUS]
[Gb]I'm gonna make it through
[Db]'Cause I'm standing strong on [Bbm]You
[Gb]I'm gonna make it through
[Db]'Cause my house is built on [Bbm]You$$, true),

('Trust in God', 'Elevation Worship', 'C', 'Worship', 'English', 'Can You Imagine?', 2023, 'from-emerald-500 to-teal-700', '/images/album-art/trust-in-god.jpg', 'https://www.youtube.com/watch?v=e2q6cFHNaFw',
$$[INTRO]
[C] [Am] [F]
[C] [Dm] [F]

[VERSE 1]
[C]Blessed assurance
[Am]Jesus is mine
[F]He's been my fourth man in the fire
[C/E] [Dm]Time after time
[C]Born of his spirit
[Am]Washed in his blood
[F]And what he did for me on Calvary
[C/E] [Dm]Is more than enough

[CHORUS]
[C]I trust in God
My Savior
[Am] [F]The One who will never fail
[Dm] [F]He will never fail

[BRIDGE]
[C]I sought the Lord and he heard and he answered
[Am]I sought the Lord and he heard and he answered
[F]I sought the Lord and he heard and he answered
[Dm]That's why I trust Him
[F]That's why I trust Him$$, true),

('We Fall Down', 'Chris Tomlin', 'D', 'Worship', 'English', 'The Noise We Make', 2001, 'from-blue-500 to-indigo-600', '', '',
$$[INTRO]
[D] [G] [Bm7] [A]

[VERSE 1]
[D]We fall down, we lay our crown
[A]At the feet of Jesus
[Bm7]The greatness of His mercy and love
[G] [A]At the feet of Jesus

[CHORUS]
[D] [A] [G] [D] [Em]We cry Holy, Holy, Holy
[D] [A] [G] [D] [Em]We cry Holy, Holy, Holy
[D] [A] [G] [D] [Em] [A] [D]We cry Holy, Holy, Holy is the Lamb

[VERSE 2]
[D]No more fears, You've dried our tears
[A]At the feet of Jesus
[Bm7]Grace abounds to all who've found
[G] [A]The feet of Jesus

[BRIDGE]
[D] [A]Holy, Holy
[G] [D] [Em]Holy is the Lamb
[D] [A]Holy, Holy
[G] [D] [Em] [A] [D]Holy is the Lamb$$, true),

('The Stand', 'Hillsong', 'D', 'Worship', 'English', 'United We Stand', 2006, 'from-purple-500 to-indigo-700', '', '',
$$[VERSE 1]
[A]You stood before creation
[D]Eternity in Your hand
[A/C#] [F#m]You spoke the earth into motion
[D]My soul now to stand

[VERSE 2]
[A]You stood before my failure
[D]And carried the cross for my shame
[A/C#] [F#m]My sin weighed upon Your shoulders
[D]My soul now to stand

[PRE-CHORUS]
[D]So what can I say
[Bm] [F#m]And what could I do
[A] [D] [E]But offer this heart O God
[F#m]Completely to You

[VERSE 3]
[A]So I'll walk upon salvation
[D]Your Spirit alive in me
[A/C#] [F#m]This life to declare Your promise
[D]My soul now to stand

[CHORUS]
[D] [A]So I'll stand
[E] [F#m] [D]With arms high and heart abandoned
[A] [E] [F#m] [D]In awe of the One who gave it all
[A]I'll stand
[E] [F#m]My soul Lord to You surrendered
[D] [A] [E] [F#m]All I am is Yours$$, true),

('Fighting for Us', 'Hillsong', 'B', 'Worship', 'English', 'Great I AM', 2025, 'from-red-500 to-rose-700', '', '',
$$[VERSE 1]
[E]When I walk through the valley
[C#m7]When I walk through the fire
[A]I will be still and know
[A]He is God alone

[VERSE 2]
[E]When my soul's tired and weary
[C#m7]When it feels like the end
[A]I will be confident
[A]He is not finished yet

[CHORUS]
[E]God is fighting for us
[C#m7]He has won the battle
[A]Have faith and watch Him move
[C#m7] [B]There's nothing that He cannot do
[C#m7] [A] [E]He is Lord of all

[VERSE 3]
[E]Where oh death is your triumph?
[C#m7]Where oh death is your sting?
[A]Praise to Christ the King
[F#m] [C#m] [B]Who holds the victory

[BRIDGE]
[A]All the shackles start to break
[A]All of hell begins to shake
[C#m7] [Esus] [E]At the mention of His Name Jesus
[A]It is finished, it is done
[A]Every battle has been won
[C#m7] [Esus] [E]Praise the One who's overcome Jesus

[TAG]
[Esus] [E] [A]Jesus, Jesus, Jesus$$, true),

('You Are Good', 'Planetshakers', 'G', 'Praise', 'English', 'Planetshakers', 2010, 'from-yellow-400 to-orange-600', '', '',
$$[INTRO]
[G] [F] [x6]

[VERSE]
[G] [F]You are God and I am not
[G] [F]So take Your place above my life
[G] [F]With everything and all I am
[G] [F]I'm holding on to Your plan

[PRE-CHORUS]
[G]My life is not my own
[F]So come and take control
[Bb] [C]Cause You alone are good

[CHORUS]
[G] [F]You are good all the time
[Em] [F]And Your love endures forever
[G] [F] [Bb] [C]You are good all the time You are good
[G]You are good

[BRIDGE]
[G]There's no other name
[F] [Em] [F] [Am] [Bb] [C]No other name like Jesus$$, true),

('Glory', 'Hillsong', 'E', 'Praise', 'English', 'Let There Be Light', 2016, 'from-amber-400 to-yellow-600', '', '',
$$[VERSE 1]
[E] [A2]Great is the Lord God Almighty
[E] [A2]Great is the Lord on high
[E] [A2]The train of His robe fills the temple
[Bsus4] [C#m7] [A2]And we cry out highest praise

[PRE-CHORUS]
[A2] [E/G#] [C#m7] [B]Glory to the risen King
[A2] [E/G#] [F#sus2] [F#] [A2]Glory to the Son, glorious Son

[CHORUS]
[B] [E]Lift up your heads, Open the doors
[C#m7]Let the King of glory come in
[A2] [C#m7] [Bsus4] [B]And forever be our God

[VERSE 2]
[E] [A2]Holy is the Lord God Almighty
[E] [A2]Holy is the Lord on high
[E] [A2]Let all the earth bow before You
[Bsus4] [C#m7] [A2]And crown You Lord of all$$, true),

('I Came for You', 'Planetshakers', 'C', 'Worship', 'English', 'Planetshakers', 2015, 'from-cyan-500 to-blue-700', '', '',
$$[VERSE 1]
[C] [Em] [F]All it takes is one moment
[Am] [G/Em] [F]And just one touch from You
[C] [Em] [F]I put aside all distractions
[Am]I came for You
[G] [F]I came for You

[PRE-CHORUS]
[Am]I came for You
[G] [F]I came for You

[CHORUS]
[C] [Dm]Holy Spirit, You are welcome
[Am] [F]Come and move upon this place
[C] [Dm] [C/Em] [F]We desire an encounter once again
[C] [Dm]Send Your fire, release Your power
[Am] [F]So we'll never be the same
[C] [Dm] [C/Em] [F]We desire, an encounter once again

[BRIDGE]
[G] [Am]We make way, we make room
[F] [C]Lord let Your spirit move
[G] [Am]Have Your way, in this place
[F] [G]Lord we have come for You$$, true),

('Fall Like Rain', 'Passion', 'Eb', 'Worship', 'English', 'Passion 2024', 2024, 'from-teal-500 to-cyan-700', '', '',
$$[VERSE 1]
[Eb]God, I live to worship You
[Bb/D]All my life I offer You
[Cm7] [Ab2]Simple melodies of sacrifice
[Eb]Open hands and open heart
[Bb/D]You're the only one I want
[Cm7] [Ab2]Your presence is my treasure, my delight

[CHORUS]
[Eb] [Bbsus/D]Fall like rain
[Cm7] [Eb2/G]Holy Spirit, fall like rain
[Eb] [Bbsus/D]Holy Spirit, have Your way
[Cm7]Let Your glory fall down
[Ab2]Let Your glory fall down

[VERSE 2]
[Eb]One thing I ask, one thing I seek
[Bb/D]So much more than anything
[Cm7] [Eb/G] [Ab2]To dwell within Your house for all my days
[Eb/G]Knowing You is everything
[Bb/D]So I let go of lesser things
[Cm7] [Bb] [Ab2] [Bbsus]You alone are worthy of my praise$$, true),

('Sinking Deep', 'Hillsong Young & Free', 'A', 'Worship', 'English', 'Hillsong Young & Free', 2016, 'from-sky-400 to-blue-600', '', '',
$$[INTRO]
[A] [A/C#] [D2] [E]

[VERSE 1]
[A] [A/C#]Standing here in Your presence
[A] [A/C#]In a grace so relentless
[D2] [E]I am won by perfect love
[A] [A/C#]Wrapped within the arms of heaven
[A] [A/C#]In a peace that lasts forever
[D] [E]Sinking deep in mercy's sea

[CHORUS]
[Bm7] [F#m]I'm wide awake
[A] [E]Drawing close, stirred by grace
[Bm7] [F#m] [E]And all my heart is Yours
[Bm7] [F#m]All fear removed
[A2] [E] [D]I breathe You in, I lean into Your love
[A]Oh Your love

[VERSE 2]
[A]When I'm lost You pursue me
[A]Lift my head to see Your glory
[D]Lord of all so beautiful
[A]Here in You I find shelter
[A]Captivated by the splendour of Your face
[D2]My secret place

[BRIDGE]
[A] [Bm7]Your love so deep is washing over me
[F#m7] [D]Your face is all I seek You are my everything
[A] [Bm7]Jesus Christ You are my one desire
[F#m7] [D]Lord hear my only cry to know You all my life$$, true),

('Worthy of It All', 'CeCe Winans', 'Em', 'Praise', 'English', 'More Than I Thought', 2021, 'from-rose-400 to-pink-600', '', '',
$$[VERSE 1]
[Em]All the saints and angels
[G]They bow before Your throne
[Em]All the elders cast their crowns
[G]Before the Lamb of God and sing

[CHORUS]
[D]You are worthy of it all
[Em]You are worthy of it all
[C]For from You are all things
[D]And to You are all things
[Em]You deserve the glory

[BRIDGE]
[D]Worthy is Your name, Jesus
[Em]You deserve the praise
[D]Worthy is Your name

[VERSE 2]
[Em]Day and night, night and day
[D]Let incense arise
[Em]Day and night, night and day
[D]Let incense arise

[BRIDGE]
[D]Day and night, night and day
[D]Let incense arise$$, true),

('Sa ''Yo Lamang', 'Victory Worship', 'D', 'Worship', 'Filipino', 'Victory Worship', 2020, 'from-red-500 to-rose-600', '', '',
$$[INTRO]
[G] [D/F#] [Bm] [A]

[VERSE 1]
[G] [A]PANGINOON, IKA'Y DAKILA
[G] [A]NATATANGI'T NAG-IISA
[G] [A]PANGINOON AT KAIBIGAN
[G] [A]IKAW AY TAPAT AT MAPAGKUMBABA

[VERSE 2]
[G] [A]BUHAY MO AY IYONG INALAY
[G] [A]WALANG HANGGAN AY BINIGAY
[G] [A]PANGINOON NG KALIGTASAN
[G] [A]IKAW ANG SANDIGAN NG PUSONG SUGATAN

[CHORUS]
[D] [A/C#] [Bm]HESUS, AKO AY IYONG NATAGPUAN
[A] [G]PAG-IBIG MO'Y DI MAPANTAYAN
[D/F#] [G] [A]AKO AY SA'YO LAMANG, SA'YO LAMANG

[D] [A/C#] [Bm]SA KRUS, NAHANAP ANG KAPATAWARAN
[A] [G]PAG-IBIG MONG DI MAPANTAYAN
[D/F#] [Em] [A]AKO AY SA'YO LAMANG, SA'YO LAMANG

[BRIDGE]
[Em] [D/F#]HINDI MAWAWALAY SA PAG-IBIG MO
[Em] [D/F#]TANGING IKAW ANG KALIGTASAN KO
[G] [A]LAGING IHAHAYAG ANG NGALAN MO
[Bm] [A/C#]SA'YO LAMANG, SA'YO LAMANG$$, true),

('Maglilingkod Ako Sa Yo', 'Himig Heswita', 'G', 'Worship', 'Filipino', 'Himig Heswita', NULL, 'from-emerald-500 to-teal-600', '', '',
$$[VERSE]
[G]Maglilingkod [C]ako sa 'Yo
[G]Sa buo kong [D]puso at [G]kaluluwa
[Em]Pag-ibig [Bm]Mo'y sapat [C]na
[G]Upang [D]ako ay [G]lumigaya

[CHORUS]
[G]Panginoon [C]ko't Diyos
[G]Ikaw ang [D]siyang aking [G]ligaya
[Em]Pag-ibig [Bm]Mo'y walang [C]katulad
[G]Kaya't [D]ako ay [G]sasamba$$, true),

('Great Is Thy Faithfulness', 'Thomas O. Chisholm', 'C', 'Hymn', 'English', 'Hymns of Faith', 1923, 'from-violet-500 to-purple-700', '', '',
$$[VERSE]
[C]Great is Thy [F]faithful[C]ness, O [G7]God my [C]Father
[F]There is no [C]shadow of [Dm]turning with [G7]Thee
[C]Thou changest [F]not, Thy com[C]passions they [Am]fail [Dm]not
[F]As Thou hast [C]been Thou for[G7]ever wilt [C]be

[CHORUS]
[C]Great is Thy [F]faithful[C]ness
[C]Great is Thy [F]faithful[G7]ness
[C]Morning by [F]morning new [C]mercies I [Am]see
[F]All I have [C]needed Thy [Dm]hand hath pro[G7]vided
[C]Great is Thy [F]faithful[C]ness
[G7]Lord, unto [C]me$$, true),

('Panalangin sa Pagbubukas', 'Bukas Palad', 'G', 'Worship', 'Filipino', 'Bukas Palad', NULL, 'from-emerald-400 to-green-600', '', '',
$$[VERSE]
[G]Panginoong [C]Diyos
[G]Kami'y iyong [D]tipan[G]an
[Em]Pagpalain [Bm]Mo ang [C]aming [Am]pagsamba
[G]Sa iyong [D]piling [G]Diyos

[CHORUS]
[G]Tanggapin Mo [C]Panginoon
[G]Ang alay naming [D]puso't [G]buhay
[Em]Sambahin [Bm]Ka nami[C]ng [Am]tah[G]imik
[G]Sa 'Yong [D]banal na [G]tahanan$$, true),

('Walang Ibang Diyos', 'HCC Worship', 'D', 'Praise', 'Filipino', 'HCC Worship', NULL, 'from-amber-400 to-orange-500', '', '',
$$[CHORUS]
[D]Walang ibang [A]Diyos
[Bm]Maliban sa [G]'Yo
[D]Ikaw lamang [A]Panginoon
[G]Ang aking sasam[Bm]bahan

[VERSE]
[D]Ang buhay ko'y [A]sa 'Yo
[Bm]Ang puso ko'y [G]sa 'Yo
[D]Walang ibang [A]Diyos
[G]Kundi Ikaw [D]lamang$$, true),

('Sa ''Yo Lamang', 'Bukas Palad', 'G', 'Worship', 'Filipino', 'Bukas Palad', NULL, 'from-sky-500 to-blue-700', '', '',
$$[CHORUS]
[G]Sa 'Yo la[D]mang
[Em]Nakalaan ang [C]pagsambang [G]ito
[D]Tanging Ikaw
[Em]Diyos na [C]bukal ng pag-[G]ibig
[Am]Tinanggap [D]ko ang 'Yong [Bm]pagma[Em]hal
[A]At ngayo'y [D]nanan[sus4]git[G]o

[VERSE]
[G]Panginoon [D]ko
[Em]Sa 'Yo la[C]mang
[G]Ang papuri [D]ko
[Em]Sa 'Yo la[C]mang$$, true)

ON CONFLICT (LOWER(title), LOWER(artist)) DO NOTHING;
