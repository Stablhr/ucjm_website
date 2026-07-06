const plans = [
  {
    id: 'gods-love',
    title: "God's Love",
    description:
      "Explore the depth of God's unconditional love through Scripture.",
    icon: 'Heart',
    color: 'rose',
    days: [
      {
        day: 1,
        title: 'God is Love',
        verseRef: '1JN.4.8',
        reflection:
          "Love is not just an attribute of God\u2014it is His very nature. He doesn't merely love; He is love.",
      },
      {
        day: 2,
        title: 'Everlasting Love',
        verseRef: 'JER.31.3',
        reflection:
          "God's love for you is not temporary or conditional. It is everlasting, reaching back before time and forward into eternity.",
      },
      {
        day: 3,
        title: 'Love That Sacrifices',
        verseRef: 'JHN.3.16',
        reflection:
          "The ultimate demonstration of love is sacrifice. God gave His Son so you could be reconciled to Him.",
      },
      {
        day: 4,
        title: 'Nothing Can Separate Us',
        verseRef: 'ROM.8.38',
        reflection:
          "No circumstance, no power, no fear can cut you off from God's love. It holds you secure.",
      },
      {
        day: 5,
        title: 'Love One Another',
        verseRef: '1JN.4.11',
        reflection:
          "Because we have received God's love, we are called to extend that same love to others.",
      },
      {
        day: 6,
        title: 'Love Covers All',
        verseRef: '1PE.4.8',
        reflection:
          "Love has the power to cover offenses, heal wounds, and unite hearts. Let love lead.",
      },
      {
        day: 7,
        title: 'Abiding in Love',
        verseRef: '1JN.4.16',
        reflection:
          "To abide in love is to abide in God. Make His love your home today.",
      },
    ],
  },
  {
    id: 'faith-trust',
    title: 'Faith & Trust',
    description:
      'Strengthen your faith and learn to trust God in every season.',
    icon: 'Cross',
    color: 'amber',
    days: [
      {
        day: 1,
        title: 'Faith is Confidence',
        verseRef: 'HEB.11.1',
        reflection:
          'Faith is not wishful thinking\u2014it is confidence in what we hope for and assurance about what we do not see.',
      },
      {
        day: 2,
        title: 'Trust in the Lord',
        verseRef: 'PRO.3.5',
        reflection:
          'Trusting God means leaning not on your own understanding but acknowledging Him in every step.',
      },
      {
        day: 3,
        title: 'Faith Like a Mustard Seed',
        verseRef: 'MAT.17.20',
        reflection:
          'Even the smallest faith, placed in an all-powerful God, can move mountains.',
      },
      {
        day: 4,
        title: 'Walking by Faith',
        verseRef: '2CO.5.7',
        reflection:
          'We walk by faith, not by sight. Our spiritual vision sees beyond what our eyes can perceive.',
      },
      {
        day: 5,
        title: 'Do Not Be Anxious',
        verseRef: 'PHP.4.6',
        reflection:
          'Trust replaces anxiety with peace when we bring everything to God in prayer.',
      },
      {
        day: 6,
        title: 'Faith Tested Produces Steadfastness',
        verseRef: 'JAS.1.3',
        reflection:
          'Trials are not punishments\u2014they are the forge where faith is strengthened and character is built.',
      },
      {
        day: 7,
        title: 'Without Faith It Is Impossible',
        verseRef: 'HEB.11.6',
        reflection:
          'Faith is the foundation of our relationship with God. He rewards those who earnestly seek Him.',
      },
    ],
  },
  {
    id: 'prayer',
    title: 'Prayer',
    description: 'Deepen your prayer life and draw closer to God through conversation.',
    icon: 'Weight',
    color: 'blue',
    days: [
      {
        day: 1,
        title: "The Lord's Prayer",
        verseRef: 'MAT.6.9',
        reflection:
          "Jesus gave us a model for prayer\u2014not a formula, but a framework for approaching the Father.",
      },
      {
        day: 2,
        title: 'Pray Continually',
        verseRef: '1TH.5.16',
        reflection:
          'Prayer is not an event but a lifestyle. Stay in constant communion with God throughout your day.',
      },
      {
        day: 3,
        title: 'Ask, Seek, Knock',
        verseRef: 'MAT.7.7',
        reflection:
          'God invites persistence in prayer. Keep asking, seeking, knocking\u2014He hears and answers.',
      },
      {
        day: 4,
        title: 'The Prayer of the Righteous',
        verseRef: 'JAS.5.16',
        reflection:
          'Your prayers have power. Confess, share, and pray for one another\u2014God moves through His people.',
      },
      {
        day: 5,
        title: 'Pray in the Spirit',
        verseRef: 'EPH.6.18',
        reflection:
          'Prayer is spiritual warfare. Pray in the Spirit on all occasions with perseverance.',
      },
      {
        day: 6,
        title: 'Humble Prayer',
        verseRef: '2CH.7.14',
        reflection:
          "When God's people humble themselves and pray, He hears from heaven and heals their land.",
      },
      {
        day: 7,
        title: 'God Hears You',
        verseRef: '1JN.5.14',
        reflection:
          'This is the confidence we have\u2014that God hears us when we pray according to His will.',
      },
    ],
  },
  {
    id: 'wisdom',
    title: 'Wisdom',
    description: 'Seek heavenly wisdom for righteous living.',
    icon: 'BookOpen',
    color: 'emerald',
    days: [
      {
        day: 1,
        title: 'The Beginning of Wisdom',
        verseRef: 'PRO.1.7',
        reflection:
          'True wisdom starts with reverence for God. Without Him, knowledge is empty.',
      },
      {
        day: 2,
        title: 'If Any Lacks Wisdom',
        verseRef: 'JAS.1.5',
        reflection:
          "God doesn't withhold wisdom from those who ask. He gives generously to all.",
      },
      {
        day: 3,
        title: 'Wisdom from Above',
        verseRef: 'JAS.3.17',
        reflection:
          'Heavenly wisdom is pure, peace-loving, considerate, and full of mercy.',
      },
      {
        day: 4,
        title: 'Get Wisdom',
        verseRef: 'PRO.4.7',
        reflection:
          'Wisdom is the principal thing. Though it costs everything, its value is beyond measure.',
      },
      {
        day: 5,
        title: 'The Wise Listen',
        verseRef: 'PRO.12.15',
        reflection:
          'A wise person listens to advice. Humility is the hallmark of true wisdom.',
      },
      {
        day: 6,
        title: 'Wisdom Cries Aloud',
        verseRef: 'PRO.8.1',
        reflection:
          'Wisdom is not hidden\u2014God has made it accessible to all who seek it.',
      },
      {
        day: 7,
        title: 'Walk in Wisdom',
        verseRef: 'EPH.5.15',
        reflection:
          'Live not as the unwise but as the wise, making the most of every opportunity.',
      },
    ],
  },
  {
    id: 'hope',
    title: 'Hope',
    description: 'Anchor your soul in the unshakable hope found in Christ.',
    icon: 'Sun',
    color: 'yellow',
    days: [
      {
        day: 1,
        title: 'A Living Hope',
        verseRef: '1PE.1.3',
        reflection:
          "Through Christ's resurrection, we have a living hope that cannot fade or perish.",
      },
      {
        day: 2,
        title: 'Hope Does Not Disappoint',
        verseRef: 'ROM.5.5',
        reflection:
          "Hope rooted in God's love will never let you down. It fills your heart through the Holy Spirit.",
      },
      {
        day: 3,
        title: 'Anchor of the Soul',
        verseRef: 'HEB.6.19',
        reflection:
          'Hope in Christ is an anchor for your soul\u2014firm and secure in every storm.',
      },
      {
        day: 4,
        title: 'Hope in God',
        verseRef: 'PSA.42.11',
        reflection:
          'When your soul is downcast, put your hope in God. He is your help and your salvation.',
      },
      {
        day: 5,
        title: 'Rejoicing in Hope',
        verseRef: 'ROM.12.12',
        reflection:
          'Be joyful in hope, patient in affliction, and faithful in prayer.',
      },
      {
        day: 6,
        title: 'Plans for Hope',
        verseRef: 'JER.29.11',
        reflection:
          "God's plans for you are good\u2014plans to give you hope and a future.",
      },
      {
        day: 7,
        title: 'Hope that Purifies',
        verseRef: '1JN.3.3',
        reflection:
          "Hope in Christ's return purifies our lives and shapes how we live today.",
      },
    ],
  },
  {
    id: 'grace',
    title: 'Grace',
    description: 'Understand and receive the unmerited favor of God.',
    icon: 'Feather',
    color: 'purple',
    days: [
      {
        day: 1,
        title: 'Saved by Grace',
        verseRef: 'EPH.2.8',
        reflection:
          'Salvation is a gift of grace through faith. It is not earned, but freely given.',
      },
      {
        day: 2,
        title: 'Grace Abounds',
        verseRef: 'ROM.5.20',
        reflection:
          "Where sin increased, grace abounded all the more. God's grace is greater than any failure.",
      },
      {
        day: 3,
        title: 'My Grace is Sufficient',
        verseRef: '2CO.12.9',
        reflection:
          "In your weakness, God's grace is enough. His power is perfected in your struggles.",
      },
      {
        day: 4,
        title: 'The God of All Grace',
        verseRef: '1PE.5.10',
        reflection:
          'After you have suffered a little while, the God of all grace will restore and strengthen you.',
      },
      {
        day: 5,
        title: 'Grace to the Humble',
        verseRef: 'JAS.4.6',
        reflection:
          'God opposes the proud but gives grace to the humble. Humility opens the door to grace.',
      },
      {
        day: 6,
        title: 'Grace Through Jesus',
        verseRef: 'JHN.1.16',
        reflection:
          "From Christ's fullness we have all received grace upon grace.",
      },
      {
        day: 7,
        title: 'Growing in Grace',
        verseRef: '2PE.3.18',
        reflection:
          'Grace is not a one-time event but a journey. Grow in the grace and knowledge of Jesus.',
      },
    ],
  },
  {
    id: 'strength',
    title: 'Strength',
    description: "Find your strength in the Lord to overcome life's challenges.",
    icon: 'Zap',
    color: 'orange',
    days: [
      {
        day: 1,
        title: 'The Lord is My Strength',
        verseRef: 'EXO.15.2',
        reflection:
          'God is your strength and your song. He is the one who gives you victory.',
      },
      {
        day: 2,
        title: 'Strengthened by the Spirit',
        verseRef: 'EPH.3.16',
        reflection:
          'God strengthens you with power through His Spirit in your inner being.',
      },
      {
        day: 3,
        title: 'I Can Do All Things',
        verseRef: 'PHP.4.13',
        reflection:
          'You can do all things through Christ who gives you strength\u2014not in your own power.',
      },
      {
        day: 4,
        title: 'Renewed Strength',
        verseRef: 'ISA.40.31',
        reflection:
          'Those who wait on the Lord will renew their strength. They will soar like eagles.',
      },
      {
        day: 5,
        title: 'Be Strong in the Lord',
        verseRef: 'EPH.6.10',
        reflection:
          'Be strong in the Lord and in His mighty power. Put on the full armor of God.',
      },
      {
        day: 6,
        title: 'God is Our Refuge',
        verseRef: 'PSA.46.1',
        reflection:
          'God is our refuge and strength, an ever-present help in trouble.',
      },
      {
        day: 7,
        title: 'Power Made Perfect',
        verseRef: '2CO.12.10',
        reflection:
          "When you are weak, then you are strong\u2014for Christ's power rests on you.",
      },
    ],
  },
  {
    id: 'peace',
    title: 'Peace',
    description: 'Experience the peace of God that surpasses all understanding.',
    icon: 'Heart',
    color: 'teal',
    days: [
      {
        day: 1,
        title: 'Peace I Leave With You',
        verseRef: 'JHN.14.27',
        reflection:
          'Jesus gives you peace\u2014not as the world gives. Let your heart not be troubled.',
      },
      {
        day: 2,
        title: 'The Peace of God',
        verseRef: 'PHP.4.7',
        reflection:
          'The peace of God transcends all understanding and guards your heart and mind.',
      },
      {
        day: 3,
        title: 'Peace with God',
        verseRef: 'ROM.5.1',
        reflection:
          'Through faith, we have peace with God through our Lord Jesus Christ.',
      },
      {
        day: 4,
        title: 'Blessed are the Peacemakers',
        verseRef: 'MAT.5.9',
        reflection:
          'God calls His children to be peacemakers, bringing reconciliation wherever they go.',
      },
      {
        day: 5,
        title: 'Let the Peace of Christ Rule',
        verseRef: 'COL.3.15',
        reflection:
          'Let the peace of Christ rule in your heart. You are called to peace as one body.',
      },
      {
        day: 6,
        title: 'Perfect Peace',
        verseRef: 'ISA.26.3',
        reflection:
          'You will keep in perfect peace those whose minds are steadfast, because they trust in You.',
      },
      {
        day: 7,
        title: 'Peace Be With You',
        verseRef: 'JHN.20.19',
        reflection:
          'Jesus came to His disciples with words of peace. Receive His peace today.',
      },
    ],
  },
]

export default plans

export const planIcons = {
  Heart: 'Heart',
  Cross: 'Cross',
  Weight: 'Weight',
  BookOpen: 'BookOpen',
  Sun: 'Sun',
  Feather: 'Feather',
  Zap: 'Zap',
}

export const planColors = {
  rose: 'rose',
  amber: 'amber',
  blue: 'blue',
  emerald: 'emerald',
  yellow: 'yellow',
  purple: 'purple',
  orange: 'orange',
  teal: 'teal',
}

const bookNames = {
  GEN: 'Genesis', EXO: 'Exodus', LEV: 'Leviticus', NUM: 'Numbers',
  DEU: 'Deuteronomy', JOS: 'Joshua', JDG: 'Judges', RUT: 'Ruth',
  '1SA': '1 Samuel', '2SA': '2 Samuel', '1KI': '1 Kings', '2KI': '2 Kings',
  '1CH': '1 Chronicles', '2CH': '2 Chronicles', EZR: 'Ezra', NEH: 'Nehemiah',
  EST: 'Esther', JOB: 'Job', PSA: 'Psalms', PRO: 'Proverbs',
  ECC: 'Ecclesiastes', SNG: 'Song of Solomon', ISA: 'Isaiah', JER: 'Jeremiah',
  LAM: 'Lamentations', EZK: 'Ezekiel', DAN: 'Daniel', HOS: 'Hosea',
  JOL: 'Joel', AMO: 'Amos', OBA: 'Obadiah', JON: 'Jonah', MIC: 'Micah',
  NAM: 'Nahum', HAB: 'Habakkuk', ZEP: 'Zephaniah', HAG: 'Haggai',
  ZEC: 'Zechariah', MAL: 'Malachi',
  MAT: 'Matthew', MRK: 'Mark', LUK: 'Luke', JHN: 'John', ACT: 'Acts',
  ROM: 'Romans', '1CO': '1 Corinthians', '2CO': '2 Corinthians',
  GAL: 'Galatians', EPH: 'Ephesians', PHP: 'Philippians', COL: 'Colossians',
  '1TH': '1 Thessalonians', '2TH': '2 Thessalonians',
  '1TI': '1 Timothy', '2TI': '2 Timothy', TIT: 'Titus', PHM: 'Philemon',
  HEB: 'Hebrews', JAS: 'James',
  '1PE': '1 Peter', '2PE': '2 Peter',
  '1JN': '1 John', '2JN': '2 John', '3JN': '3 John',
  JUD: 'Jude', REV: 'Revelation',
}

export function formatVerseRef(ref) {
  const parts = ref.split('.')
  if (parts.length < 3) return ref.replace(/\./g, ' ')
  const book = bookNames[parts[0]] || parts[0]
  return `${book} ${parts[1]}:${parts[2]}`
}
