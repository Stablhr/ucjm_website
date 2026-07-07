const plans = [
  {
    id: 'gods-love',
    title: "God's Love",
    description:
      "Explore the depth of God's unconditional love through Scripture.",
    icon: 'Heart',
    color: 'rose',
    readingTime: 6,
    category: 'topical',
    tags: ['love', 'god', 'relationship'],
    intro: "God's love is the foundation of our faith. Over the next 7 days, you'll explore the depth, breadth, and height of His unconditional love for you.",
    outro: "You've journeyed through the depths of God's love. May you abide in this love and let it transform how you love others.",
    days: [
      {
        day: 1,
        title: 'God is Love',
        verseRef: '1JN.4.8',
        reflection:
          "Love is not just an attribute of God\u2014it is His very nature. He doesn't merely love; He is love.",
        prayer:
          'Father, help me to know You not just as a God who loves, but as the very essence of love itself. Teach my heart to rest in the truth that I am fully known and fully loved by You. Let this reality shape how I see myself and how I love those around me. In Jesus\u2019 name, Amen.',
      },
      {
        day: 2,
        title: 'Everlasting Love',
        verseRef: 'JER.31.3',
        reflection:
          "God's love for you is not temporary or conditional. It is everlasting, reaching back before time and forward into eternity.",
        prayer:
          'Lord, it amazes me that Your love for me has no beginning and no end. When I feel unworthy or forgotten, remind me that You have drawn me with lovingkindness from before time began. Anchor my identity in Your everlasting love today. Amen.',
      },
      {
        day: 3,
        title: 'Love That Sacrifices',
        verseRef: 'JHN.3.16',
        reflection:
          "The ultimate demonstration of love is sacrifice. God gave His Son so you could be reconciled to Him.",
        prayer:
          'Heavenly Father, thank You for the gift of Your Son. I cannot comprehend the depth of love that gave everything for me. Help me to live in grateful response to Your sacrifice, and to love others with the same selfless heart. In Jesus\u2019 name, Amen.',
      },
      {
        day: 4,
        title: 'Nothing Can Separate Us',
        verseRef: 'ROM.8.38',
        reflection:
          "No circumstance, no power, no fear can cut you off from God's love. It holds you secure.",
        prayer:
          'Lord, I confess that I sometimes let my circumstances make me question Your love. Today I declare that nothing in all creation can separate me from Your love. Let this truth silence my fears and give me unshakable peace. Amen.',
      },
      {
        day: 5,
        title: 'Love One Another',
        verseRef: '1JN.4.11',
        reflection:
          "Because we have received God's love, we are called to extend that same love to others.",
        prayer:
          'Father, since You have loved me so generously, help me to be a channel of that love to others. Remove the barriers in my heart\u2014pride, resentment, and selfishness\u2014and fill me with Your compassion. Let my love be a reflection of Yours. Amen.',
      },
      {
        day: 6,
        title: 'Love Covers All',
        verseRef: '1PE.4.8',
        reflection:
          "Love has the power to cover offenses, heal wounds, and unite hearts. Let love lead.",
        prayer:
          'Lord, teach me to love deeply enough to cover offenses rather than expose them. Give me the grace to forgive as I have been forgiven, and to be an instrument of healing in my relationships. Let love lead in every word I speak. Amen.',
      },
      {
        day: 7,
        title: 'Abiding in Love',
        verseRef: '1JN.4.16',
        reflection:
          "To abide in love is to abide in God. Make His love your home today.",
        prayer:
          'Father, I want to make my home in Your love. Draw me deeper into the place of abiding where I know You and am known by You. Let my life be rooted and grounded in love so that everything I do flows from my relationship with You. Amen.',
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
    readingTime: 7,
    category: 'topical',
    tags: ['faith', 'trust', 'courage'],
    intro: 'Faith is the foundation of our walk with God. This week, you will strengthen your trust in Him and learn to rely on His faithfulness in every circumstance.',
    outro: 'Your faith has been strengthened. Continue to walk by faith, not by sight, trusting the One who holds your future.',
    days: [
      {
        day: 1,
        title: 'Faith is Confidence',
        verseRef: 'HEB.11.1',
        reflection:
          'Faith is not wishful thinking\u2014it is confidence in what we hope for and assurance about what we do not see.',
        prayer:
          'Lord, increase my faith. Help me to move beyond wishful thinking to confident assurance in You. When my eyes cannot see the way forward, let my heart remain steadfast in trust. Give me the certainty that You are who You say You are. Amen.',
      },
      {
        day: 2,
        title: 'Trust in the Lord',
        verseRef: 'PRO.3.5',
        reflection:
          'Trusting God means leaning not on your own understanding but acknowledging Him in every step.',
        prayer:
          'Father, I confess my tendency to lean on my own understanding. Teach me to trust You with all my heart, especially when I cannot see the full picture. Help me to acknowledge You in every decision I make today. In Jesus\u2019 name, Amen.',
      },
      {
        day: 3,
        title: 'Faith Like a Mustard Seed',
        verseRef: 'MAT.17.20',
        reflection:
          'Even the smallest faith, placed in an all-powerful God, can move mountains.',
        prayer:
          'Lord, I bring You even my small, struggling faith. You said that faith the size of a mustard seed can move mountains. Take what little I have and multiply it. Move the mountains in my life that seem impossible. I trust in Your power, not my own. Amen.',
      },
      {
        day: 4,
        title: 'Walking by Faith',
        verseRef: '2CO.5.7',
        reflection:
          'We walk by faith, not by sight. Our spiritual vision sees beyond what our eyes can perceive.',
        prayer:
          'Heavenly Father, I choose to walk by faith and not by sight today. When my circumstances tell me to fear, help me to trust. When the path is unclear, let Your Spirit guide me. Open the eyes of my heart to see what is unseen but eternal. Amen.',
      },
      {
        day: 5,
        title: 'Do Not Be Anxious',
        verseRef: 'PHP.4.6',
        reflection:
          'Trust replaces anxiety with peace when we bring everything to God in prayer.',
        prayer:
          'Lord, I lay down my anxieties at Your feet. I choose to bring everything to You in prayer rather than carrying the weight of worry. Replace my anxiety with Your peace that surpasses all understanding. Help me to trust You with every concern. Amen.',
      },
      {
        day: 6,
        title: 'Faith Tested Produces Steadfastness',
        verseRef: 'JAS.1.3',
        reflection:
          'Trials are not punishments\u2014they are the forge where faith is strengthened and character is built.',
        prayer:
          'Father, when trials come, help me to see them as opportunities for growth rather than reasons to give up. Develop in me a steadfast faith that endures. Let the testing of my faith produce patience and maturity in my walk with You. Amen.',
      },
      {
        day: 7,
        title: 'Without Faith It Is Impossible',
        verseRef: 'HEB.11.6',
        reflection:
          'Faith is the foundation of our relationship with God. He rewards those who earnestly seek Him.',
        prayer:
          'Lord, I want to please You, and I know that begins with faith. Help me to earnestly seek You every day, trusting that You reward those who diligently pursue You. Deepen my faith so that my relationship with You grows stronger. Amen.',
      },
    ],
  },
  {
    id: 'prayer',
    title: 'Prayer',
    description: 'Deepen your prayer life and draw closer to God through conversation.',
    icon: 'Weight',
    color: 'blue',
    readingTime: 5,
    category: 'spiritual-disciplines',
    tags: ['prayer', 'communion', 'devotion'],
    intro: 'Prayer is the lifeblood of our relationship with God. This week, you will deepen your prayer life and discover the joy of constant communion with the Father.',
    outro: 'Prayer is now a lifestyle, not just an event. Continue to pray without ceasing and enjoy the presence of God every moment.',
    days: [
      {
        day: 1,
        title: "The Lord's Prayer",
        verseRef: 'MAT.6.9',
        reflection:
          "Jesus gave us a model for prayer\u2014not a formula, but a framework for approaching the Father.",
        prayer:
          'Father in heaven, hallowed be Your name. Teach me to pray as Jesus taught\u2014with reverence, surrender, and trust. Let Your kingdom come in my life today. Give me this day my daily bread, forgive me as I forgive others, and lead me away from temptation. Amen.',
      },
      {
        day: 2,
        title: 'Pray Continually',
        verseRef: '1TH.5.16',
        reflection:
          'Prayer is not an event but a lifestyle. Stay in constant communion with God throughout your day.',
        prayer:
          'Lord, I want to make prayer a lifestyle, not a ritual. Help me to stay connected to You throughout my day\u2014in the quiet moments, in the busy moments, in every moment. Let my heart be in constant communion with Yours. Amen.',
      },
      {
        day: 3,
        title: 'Ask, Seek, Knock',
        verseRef: 'MAT.7.7',
        reflection:
          'God invites persistence in prayer. Keep asking, seeking, knocking\u2014He hears and answers.',
        prayer:
          'Father, thank You for inviting me to ask, seek, and knock. Give me the persistence to keep coming to You in prayer, trusting that You hear me and will answer according to Your perfect will. I will not give up, for You are faithful. Amen.',
      },
      {
        day: 4,
        title: 'The Prayer of the Righteous',
        verseRef: 'JAS.5.16',
        reflection:
          'Your prayers have power. Confess, share, and pray for one another\u2014God moves through His people.',
        prayer:
          'Lord, I believe that my prayers have power because of Your faithfulness. Help me to confess my sins openly, pray for my brothers and sisters, and stand in the gap for those in need. Let Your power be released through the prayers of Your people. Amen.',
      },
      {
        day: 5,
        title: 'Pray in the Spirit',
        verseRef: 'EPH.6.18',
        reflection:
          'Prayer is spiritual warfare. Pray in the Spirit on all occasions with perseverance.',
        prayer:
          'Heavenly Father, equip me for spiritual battle through prayer. Help me to pray in the Spirit on all occasions, with alertness and perseverance. Strengthen me to stand firm, knowing that prayer is my greatest weapon against the enemy. In Jesus\u2019 name, Amen.',
      },
      {
        day: 6,
        title: 'Humble Prayer',
        verseRef: '2CH.7.14',
        reflection:
          "When God's people humble themselves and pray, He hears from heaven and heals their land.",
        prayer:
          'Lord, I humble myself before You today. I turn from my own ways and seek Your face. Hear my prayer from heaven, forgive my sins, and bring healing to my heart, my relationships, and my land. Let revival begin in me. Amen.',
      },
      {
        day: 7,
        title: 'God Hears You',
        verseRef: '1JN.5.14',
        reflection:
          'This is the confidence we have\u2014that God hears us when we pray according to His will.',
        prayer:
          'Father, thank You for the confidence that You hear me when I pray. Help me to align my prayers with Your will, trusting that You listen and respond. Remove my doubts and fill me with assurance that every prayer reaches Your heart. Amen.',
      },
    ],
  },
  {
    id: 'wisdom',
    title: 'Wisdom',
    description: 'Seek heavenly wisdom for righteous living.',
    icon: 'BookOpen',
    color: 'emerald',
    readingTime: 6,
    category: 'topical',
    tags: ['wisdom', 'discernment', 'knowledge'],
    intro: 'True wisdom begins with reverence for God. Across these 7 days, you will learn to seek heavenly wisdom for righteous living and godly decision-making.',
    outro: "You have gained wisdom from above. Now walk in it, making the most of every opportunity God places before you.",
    days: [
      {
        day: 1,
        title: 'The Beginning of Wisdom',
        verseRef: 'PRO.1.7',
        reflection:
          'True wisdom starts with reverence for God. Without Him, knowledge is empty.',
        prayer:
          'Lord, I begin my pursuit of wisdom with reverence for You. Help me to fear You\u2014not with terror, but with awe and wonder at who You are. Let the fear of the Lord be the foundation of everything I learn and everything I become. Amen.',
      },
      {
        day: 2,
        title: 'If Any Lacks Wisdom',
        verseRef: 'JAS.1.5',
        reflection:
          "God doesn't withhold wisdom from those who ask. He gives generously to all.",
        prayer:
          'Father, I confess that I lack wisdom in so many areas of my life. But I take comfort in Your promise that You give generously to all who ask. Today I ask for heavenly wisdom. Guide my decisions, my words, and my thoughts. Amen.',
      },
      {
        day: 3,
        title: 'Wisdom from Above',
        verseRef: 'JAS.3.17',
        reflection:
          'Heavenly wisdom is pure, peace-loving, considerate, and full of mercy.',
        prayer:
          'Lord, fill me with the wisdom that comes from above. Make me pure in heart, peace-loving, considerate, submissive, full of mercy and good fruit. Let my wisdom be marked by sincerity and a gentle spirit that reflects Your character. Amen.',
      },
      {
        day: 4,
        title: 'Get Wisdom',
        verseRef: 'PRO.4.7',
        reflection:
          'Wisdom is the principal thing. Though it costs everything, its value is beyond measure.',
        prayer:
          'Heavenly Father, help me to prioritize wisdom above all else. Teach me that wisdom is the principal thing, worth more than silver or gold. Give me a heart that values Your wisdom over the world\u2019s knowledge. Let me pursue it with all I have. Amen.',
      },
      {
        day: 5,
        title: 'The Wise Listen',
        verseRef: 'PRO.12.15',
        reflection:
          'A wise person listens to advice. Humility is the hallmark of true wisdom.',
        prayer:
          'Lord, give me the humility to listen. Help me to recognize that I do not have all the answers. Open my heart to receive godly counsel and correction. Make me quick to listen, slow to speak, and slow to become angry. Amen.',
      },
      {
        day: 6,
        title: 'Wisdom Cries Aloud',
        verseRef: 'PRO.8.1',
        reflection:
          'Wisdom is not hidden\u2014God has made it accessible to all who seek it.',
        prayer:
          'Father, thank You that wisdom is not hidden from me. You have made it accessible and call out to all who will listen. Help me to hear Your voice calling and to respond with an eager heart. Open my ears to receive Your instruction. Amen.',
      },
      {
        day: 7,
        title: 'Walk in Wisdom',
        verseRef: 'EPH.5.15',
        reflection:
          'Live not as the unwise but as the wise, making the most of every opportunity.',
        prayer:
          'Lord, help me to walk in wisdom today. Teach me to make the most of every opportunity You place before me. Let my life be a testimony of wise living that points others to You. Guard my steps and guide my path in Your truth. Amen.',
      },
    ],
  },
  {
    id: 'hope',
    title: 'Hope',
    description: 'Anchor your soul in the unshakable hope found in Christ.',
    icon: 'Sun',
    color: 'yellow',
    readingTime: 6,
    category: 'topical',
    tags: ['hope', 'encouragement', 'endurance'],
    intro: 'Hope in Christ is an anchor for the soul. This week, you will discover the unshakable hope that sustains you through every trial and points you toward eternity.',
    outro: 'Your hope is secure in Christ. Let this living hope purify your heart and shape how you live each day.',
    days: [
      {
        day: 1,
        title: 'A Living Hope',
        verseRef: '1PE.1.3',
        reflection:
          "Through Christ's resurrection, we have a living hope that cannot fade or perish.",
        prayer:
          'Father, thank You for the living hope I have through the resurrection of Jesus Christ. This hope is not fragile or temporary\u2014it is alive and eternal. When I feel discouraged, remind me that my hope is secure in the risen Savior. Amen.',
      },
      {
        day: 2,
        title: 'Hope Does Not Disappoint',
        verseRef: 'ROM.5.5',
        reflection:
          "Hope rooted in God's love will never let you down. It fills your heart through the Holy Spirit.",
        prayer:
          'Lord, my hope is in You, and I know it will not disappoint. Pour Your love into my heart through the Holy Spirit, so that I may be filled with confidence and peace. Help me to trust that You are working all things for my good. Amen.',
      },
      {
        day: 3,
        title: 'Anchor of the Soul',
        verseRef: 'HEB.6.19',
        reflection:
          'Hope in Christ is an anchor for your soul\u2014firm and secure in every storm.',
        prayer:
          'Heavenly Father, when the storms of life rage around me, let my hope in Christ be the anchor that holds my soul firm and secure. Keep me steady when circumstances shake me. Remind me that my hope is fastened to the One who cannot be moved. Amen.',
      },
      {
        day: 4,
        title: 'Hope in God',
        verseRef: 'PSA.42.11',
        reflection:
          'When your soul is downcast, put your hope in God. He is your help and your salvation.',
        prayer:
          'Lord, when my soul is downcast and my spirit is troubled, I choose to put my hope in You. You are my help and my salvation. Lift my head and restore my joy as I fix my eyes on You, the source of all hope. Amen.',
      },
      {
        day: 5,
        title: 'Rejoicing in Hope',
        verseRef: 'ROM.12.12',
        reflection:
          'Be joyful in hope, patient in affliction, and faithful in prayer.',
        prayer:
          'Father, help me to be joyful in hope, patient in affliction, and faithful in prayer. Teach me to rejoice not because my circumstances are perfect, but because my hope in You is secure. Give me patience to endure and faithfulness to keep praying. Amen.',
      },
      {
        day: 6,
        title: 'Plans for Hope',
        verseRef: 'JER.29.11',
        reflection:
          "God's plans for you are good\u2014plans to give you hope and a future.",
        prayer:
          'Lord, I trust that Your plans for me are good. Even when I cannot see the future, I know You hold it in Your hands. Thank You for plans that give me hope and a future. Help me to walk forward in faith, confident in Your goodness. Amen.',
      },
      {
        day: 7,
        title: 'Hope that Purifies',
        verseRef: '1JN.3.3',
        reflection:
          "Hope in Christ's return purifies our lives and shapes how we live today.",
        prayer:
          'Heavenly Father, as I hope in Christ\u2019s return, let that hope purify my heart and shape how I live today. Help me to live with eternity in view, holy and ready for Your coming. Let my hope in You transform every part of my life. Amen.',
      },
    ],
  },
  {
    id: 'grace',
    title: 'Grace',
    description: 'Understand and receive the unmerited favor of God.',
    icon: 'Feather',
    color: 'purple',
    readingTime: 5,
    category: 'character',
    tags: ['grace', 'salvation', 'mercy'],
    intro: "Grace is God's unmerited favor\u2014a gift we cannot earn. This week, you will explore the depths of His grace and learn to extend it to others.",
    outro: "You have received grace upon grace. Continue to grow in the grace and knowledge of our Lord Jesus Christ.",
    days: [
      {
        day: 1,
        title: 'Saved by Grace',
        verseRef: 'EPH.2.8',
        reflection:
          'Salvation is a gift of grace through faith. It is not earned, but freely given.',
        prayer:
          'Lord, thank You for saving me by grace through faith. I did not earn it, and I cannot deserve it\u2014it is Your free gift. Humble my heart to receive Your grace with gratitude and to extend that same grace to others who do not deserve it. Amen.',
      },
      {
        day: 2,
        title: 'Grace Abounds',
        verseRef: 'ROM.5.20',
        reflection:
          "Where sin increased, grace abounded all the more. God's grace is greater than any failure.",
        prayer:
          'Father, I am so grateful that where sin abounds, Your grace abounds even more. No failure is too great for Your grace. When shame tries to weigh me down, remind me that Your grace is greater than my worst mistake. Thank You for Your overwhelming grace. Amen.',
      },
      {
        day: 3,
        title: 'My Grace is Sufficient',
        verseRef: '2CO.12.9',
        reflection:
          "In your weakness, God's grace is enough. His power is perfected in your struggles.",
        prayer:
          'Lord, when I am weak, remind me that Your grace is sufficient. I do not need to be strong enough on my own\u2014Your power is made perfect in my weakness. Help me to boast in my struggles, knowing that Your grace carries me through. Amen.',
      },
      {
        day: 4,
        title: 'The God of All Grace',
        verseRef: '1PE.5.10',
        reflection:
          'After you have suffered a little while, the God of all grace will restore and strengthen you.',
        prayer:
          'Heavenly Father, You are the God of all grace. When I have suffered and struggled, I trust that You will restore, confirm, strengthen, and establish me. Thank You that my trials are temporary but Your grace is eternal. Renew my strength today. Amen.',
      },
      {
        day: 5,
        title: 'Grace to the Humble',
        verseRef: 'JAS.4.6',
        reflection:
          'God opposes the proud but gives grace to the humble. Humility opens the door to grace.',
        prayer:
          'Lord, I humble myself before You. Remove every trace of pride from my heart and give me the grace that comes only to the humble. Help me to walk in humility with You and with others, knowing that You draw near to the lowly. Amen.',
      },
      {
        day: 6,
        title: 'Grace Through Jesus',
        verseRef: 'JHN.1.16',
        reflection:
          "From Christ's fullness we have all received grace upon grace.",
        prayer:
          'Father, from the fullness of Christ I have received grace upon grace. Thank You for the endless supply of grace that flows from Jesus. Help me to live each day aware of Your grace, receiving it fresh every morning and sharing it freely. Amen.',
      },
      {
        day: 7,
        title: 'Growing in Grace',
        verseRef: '2PE.3.18',
        reflection:
          'Grace is not a one-time event but a journey. Grow in the grace and knowledge of Jesus.',
        prayer:
          'Lord, I want to grow in grace and in the knowledge of my Lord and Savior Jesus Christ. Keep me from becoming stagnant in my faith. Stretch me, teach me, and transform me more into Your image as I journey deeper in Your grace. Amen.',
      },
    ],
  },
  {
    id: 'strength',
    title: 'Strength',
    description: "Find your strength in the Lord to overcome life's challenges.",
    icon: 'Zap',
    color: 'orange',
    readingTime: 6,
    category: 'character',
    tags: ['strength', 'perseverance', 'courage'],
    intro: "Life's challenges require strength beyond our own. In this 7-day plan, you will discover how to find your strength in the Lord and overcome through His power.",
    outro: "You are strong in the Lord. Remember: when you are weak, then you are strong, for His power is made perfect in weakness.",
    days: [
      {
        day: 1,
        title: 'The Lord is My Strength',
        verseRef: 'EXO.15.2',
        reflection:
          'God is your strength and your song. He is the one who gives you victory.',
        prayer:
          'Lord, You are my strength and my song. When I feel weak and defeated, remind me that my victory comes from You. I do not need to fight in my own power\u2014You go before me and fight for me. Be my strength today. Amen.',
      },
      {
        day: 2,
        title: 'Strengthened by the Spirit',
        verseRef: 'EPH.3.16',
        reflection:
          'God strengthens you with power through His Spirit in your inner being.',
        prayer:
          'Father, strengthen me with power through Your Spirit in my inner being. I need more than physical strength\u2014I need the deep, inner strength that only You can provide. Fortify my heart, my mind, and my spirit to face whatever comes my way. Amen.',
      },
      {
        day: 3,
        title: 'I Can Do All Things',
        verseRef: 'PHP.4.13',
        reflection:
          'You can do all things through Christ who gives you strength\u2014not in your own power.',
        prayer:
          'Lord, I can do all things through Christ who strengthens me. Not because I am capable, but because You are powerful. Help me to stop relying on my own strength and to draw from Yours. With You, nothing is impossible. Amen.',
      },
      {
        day: 4,
        title: 'Renewed Strength',
        verseRef: 'ISA.40.31',
        reflection:
          'Those who wait on the Lord will renew their strength. They will soar like eagles.',
        prayer:
          'Heavenly Father, teach me to wait on You. When I am weary and exhausted, renew my strength. Help me to rise up on wings like eagles, to run without growing weary, and to walk without fainting. I put my hope in You alone. Amen.',
      },
      {
        day: 5,
        title: 'Be Strong in the Lord',
        verseRef: 'EPH.6.10',
        reflection:
          'Be strong in the Lord and in His mighty power. Put on the full armor of God.',
        prayer:
          'Lord, help me to be strong in You and in Your mighty power. Equip me with the full armor of God so that I can stand against the schemes of the enemy. Let Your truth, righteousness, and faith be my defense today. In Jesus\u2019 name, Amen.',
      },
      {
        day: 6,
        title: 'God is Our Refuge',
        verseRef: 'PSA.46.1',
        reflection:
          'God is our refuge and strength, an ever-present help in trouble.',
        prayer:
          'Father, You are my refuge and strength, an ever-present help in trouble. When fears surround me, I run to You. When trouble comes, I hide in You. Be my shelter and my fortress today. I will not fear, for You are with me. Amen.',
      },
      {
        day: 7,
        title: 'Power Made Perfect',
        verseRef: '2CO.12.10',
        reflection:
          "When you are weak, then you are strong\u2014for Christ's power rests on you.",
        prayer:
          'Lord, I boast in my weaknesses, for when I am weak, then I am strong in You. Let Your power rest upon me in my most difficult moments. Help me to embrace my limitations so that Your strength can shine through me. Amen.',
      },
    ],
  },
  {
    id: 'peace',
    title: 'Peace',
    description: 'Experience the peace of God that surpasses all understanding.',
    icon: 'Heart',
    color: 'teal',
    readingTime: 5,
    category: 'character',
    tags: ['peace', 'calm', 'trust'],
    intro: 'The peace of God surpasses all understanding. Over the next week, you will learn to experience His perfect peace that guards your heart and mind.',
    outro: 'Peace be with you. Carry the peace of Christ wherever you go and be an instrument of His reconciliation.',
    days: [
      {
        day: 1,
        title: 'Peace I Leave With You',
        verseRef: 'JHN.14.27',
        reflection:
          'Jesus gives you peace\u2014not as the world gives. Let your heart not be troubled.',
        prayer:
          'Lord Jesus, You said, "Peace I leave with you; My peace I give to you." I receive Your peace today\u2014not the fragile peace of the world, but the deep, lasting peace that only You can give. Calm my troubled heart and quiet my anxious thoughts. Amen.',
      },
      {
        day: 2,
        title: 'The Peace of God',
        verseRef: 'PHP.4.7',
        reflection:
          'The peace of God transcends all understanding and guards your heart and mind.',
        prayer:
          'Father, let Your peace, which transcends all understanding, guard my heart and mind in Christ Jesus today. When my thoughts spin out of control and my emotions run high, be the anchor that keeps me steady. I choose peace over panic. Amen.',
      },
      {
        day: 3,
        title: 'Peace with God',
        verseRef: 'ROM.5.1',
        reflection:
          'Through faith, we have peace with God through our Lord Jesus Christ.',
        prayer:
          'Heavenly Father, thank You that through faith in Jesus, I have peace with You. There is no longer enmity between us\u2014I am reconciled to You through Christ. Let this foundational peace give me confidence to approach You without fear. Amen.',
      },
      {
        day: 4,
        title: 'Blessed are the Peacemakers',
        verseRef: 'MAT.5.9',
        reflection:
          'God calls His children to be peacemakers, bringing reconciliation wherever they go.',
        prayer:
          'Lord, make me an instrument of Your peace. Help me to be a peacemaker in my home, my workplace, and my community. Give me wisdom to bring reconciliation where there is division and to sow harmony where there is conflict. Blessed are the peacemakers. Amen.',
      },
      {
        day: 5,
        title: 'Let the Peace of Christ Rule',
        verseRef: 'COL.3.15',
        reflection:
          'Let the peace of Christ rule in your heart. You are called to peace as one body.',
        prayer:
          'Father, let the peace of Christ rule in my heart. When I am tempted to be anxious or upset, remind me that I am called to peace. Let Your peace be the umpire in my heart, guiding my decisions and calming my spirit. Amen.',
      },
      {
        day: 6,
        title: 'Perfect Peace',
        verseRef: 'ISA.26.3',
        reflection:
          'You will keep in perfect peace those whose minds are steadfast, because they trust in You.',
        prayer:
          'Lord, I fix my mind on You, knowing that You will keep me in perfect peace. When my thoughts wander to worry and fear, gently bring them back to trust in You. Let my steadfast focus on You be the source of unshakable peace. Amen.',
      },
      {
        day: 7,
        title: 'Peace Be With You',
        verseRef: 'JHN.20.19',
        reflection:
          'Jesus came to His disciples with words of peace. Receive His peace today.',
        prayer:
          'Lord Jesus, just as You came to Your disciples with words of peace, I receive Your peace today. Let peace fill my heart, my home, and my relationships. I receive the peace that only You can give and carry it with me wherever I go. Amen.',
      },
    ],
  },

  {
    id: 'fruit-spirit',
    title: 'Fruit of the Spirit',
    description: 'Cultivate the character of Christ through the fruit of the Spirit.',
    icon: 'Feather',
    color: 'emerald',
    readingTime: 6,
    category: 'character',
    tags: ['fruit-spirit', 'character', 'transformation'],
    intro: 'The fruit of the Spirit is the evidence of God\u2019s work in our lives. This week, you will explore each aspect of Christlike character and learn to walk in the Spirit.',
    outro: 'The Spirit is producing beautiful fruit in your life. Continue to abide in Christ, and you will bear much fruit for His glory.',
    days: [
      {
        day: 1,
        title: 'Love',
        verseRef: '1JN.4.19',
        reflection: 'Our capacity to love originates in God. We love because He first loved us\u2014His love is the source, not our effort.',
        prayer: 'Father, I love because You first loved me. Let Your love fill my heart so completely that it overflows to everyone I encounter. Help me to love others the way You have loved me\u2014unconditionally and sacrificially. In Jesus\u2019 name, Amen.',
      },
      {
        day: 2,
        title: 'Joy',
        verseRef: 'NEH.8.10',
        reflection: 'The joy of the Lord is not dependent on circumstances. It is a deep, abiding gladness that springs from knowing God.',
        prayer: 'Lord, the joy of the Lord is my strength. When circumstances threaten to steal my joy, remind me that my true joy is found in You alone. Fill me with the deep, abiding gladness that only Your presence can bring. Amen.',
      },
      {
        day: 3,
        title: 'Peace',
        verseRef: 'JHN.14.27',
        reflection: 'The peace Jesus gives is not like the world\u2019s peace. It is a deep calm that remains steady even in the storm.',
        prayer: 'Lord Jesus, You said, \u201cPeace I leave with you; My peace I give to you.\u201d I receive Your peace today. Let it calm my anxious heart and quiet my restless mind. I choose to trust You and not be afraid. Amen.',
      },
      {
        day: 4,
        title: 'Patience',
        verseRef: 'JAS.5.7',
        reflection: 'Patience is not passive waiting\u2014it is active endurance rooted in trust that God is working.',
        prayer: 'Heavenly Father, develop patience in me. Help me to wait on Your timing with a trusting heart. When I am tempted to rush ahead or grow frustrated, remind me that Your timing is perfect and You are always working for my good. Amen.',
      },
      {
        day: 5,
        title: 'Kindness',
        verseRef: 'EPH.4.32',
        reflection: 'Kindness is love in action. It mirrors God\u2019s tender care for us and draws others to Him.',
        prayer: 'Lord, make me kind\u2014tenderhearted and compassionate as You are. Help me to see the needs of those around me and respond with genuine care. Let my words be gentle and my actions reflect Your goodness. In Jesus\u2019 name, Amen.',
      },
      {
        day: 6,
        title: 'Goodness',
        verseRef: 'GAL.6.9',
        reflection: 'Doing good requires perseverance, but the harvest is certain. God never forgets our labor of love.',
        prayer: 'Father, give me strength to not grow weary in doing good. Help me to seize every opportunity to bless others and honor You. Let my life be marked by goodness that points people to Your love. The harvest is coming\u2014help me to persevere. Amen.',
      },
      {
        day: 7,
        title: 'Faithfulness & Self-Control',
        verseRef: '2TI.1.7',
        reflection: 'God has given us a spirit of power, love, and sound mind. Faithfulness and self-control are His gifts to cultivate.',
        prayer: 'Lord, thank You for giving me a spirit of power, love, and self-control. Develop in me unwavering faithfulness and the discipline to follow You daily. Let my life be a testimony of Your transforming power. Amen.',
      },
    ],
  },

  {
    id: 'armor-god',
    title: 'Armor of God',
    description: 'Stand firm with the spiritual armor God has given you to overcome every battle.',
    icon: 'Cross',
    color: 'blue',
    readingTime: 7,
    category: 'spiritual-disciplines',
    tags: ['armor', 'spiritual-warfare', 'protection'],
    intro: 'We are in a spiritual battle, and God has provided everything we need to stand firm. This week, you will explore each piece of the armor of God and learn to put it on daily.',
    outro: 'You are fully equipped for every battle. Stand firm in the Lord and in His mighty power.',
    days: [
      {
        day: 1,
        title: 'Belt of Truth',
        verseRef: 'JHN.8.32',
        reflection: 'The belt of truth holds the rest of the armor together. Living in God\u2019s truth brings freedom and integrity.',
        prayer: 'Lord, I gird myself with Your truth. Let Your Word be the foundation of my life. Expose every lie I have believed and set me free by the power of Your truth. Help me to live with integrity before You and others. In Jesus\u2019 name, Amen.',
      },
      {
        day: 2,
        title: 'Breastplate of Righteousness',
        verseRef: 'ISA.61.10',
        reflection: 'The breastplate of righteousness protects your heart. It is not your own righteousness but Christ\u2019s that covers you.',
        prayer: 'Heavenly Father, I put on the breastplate of righteousness. Thank You that I am clothed in the righteousness of Christ. Protect my heart from the accusations of the enemy and help me to live in the freedom of being made right with You. Amen.',
      },
      {
        day: 3,
        title: 'Shoes of the Gospel of Peace',
        verseRef: 'ROM.10.15',
        reflection: 'The shoes of peace prepare you to stand firm and share the good news wherever you go.',
        prayer: 'Lord, fit my feet with the readiness that comes from the gospel of peace. Make me a messenger of Your good news wherever I go. Help me to stand firm on the foundation of Your peace and carry it to those who are hurting. Amen.',
      },
      {
        day: 4,
        title: 'Shield of Faith',
        verseRef: 'EPH.6.16',
        reflection: 'The shield of faith extinguishes every flaming arrow of the enemy. Faith in God\u2019s promises protects you.',
        prayer: 'Father, I take up the shield of faith. Quench every fiery dart that the enemy hurls at me\u2014doubts, fears, and accusations. I trust in Your promises and believe that You are who You say You are. Let my faith be unshakable. Amen.',
      },
      {
        day: 5,
        title: 'Helmet of Salvation',
        verseRef: '1TH.5.8',
        reflection: 'The helmet of salvation protects your mind. The assurance of your salvation guards your thoughts against despair.',
        prayer: 'Lord, I put on the helmet of salvation. Protect my mind with the assurance that I am Yours and nothing can snatch me from Your hand. When doubts assail my thoughts, remind me that my salvation is secure in Christ. Thank You for my eternal hope. Amen.',
      },
      {
        day: 6,
        title: 'Sword of the Spirit',
        verseRef: 'HEB.4.12',
        reflection: 'The Word of God is alive and powerful. It is your offensive weapon in spiritual battle\u2014sharper than any sword.',
        prayer: 'Heavenly Father, thank You for Your living and active Word. Help me to know Scripture so deeply that it flows naturally from my lips in times of battle. Train my hand to wield the sword of the Spirit with skill and boldness. In Jesus\u2019 name, Amen.',
      },
      {
        day: 7,
        title: 'Pray in the Spirit',
        verseRef: 'EPH.6.18',
        reflection: 'Prayer is the atmosphere in which all the armor is used. Stay alert and keep praying for all the Lord\u2019s people.',
        prayer: 'Lord, teach me to pray in the Spirit on all occasions. Keep me alert and persistent in prayer for myself and for my brothers and sisters in Christ. Let prayer be the breath that animates every piece of armor I wear. Amen.',
      },
    ],
  },

  {
    id: 'names-god',
    title: 'Names of God',
    description: 'Discover the character of God through His revealed names in Scripture.',
    icon: 'Sun',
    color: 'amber',
    readingTime: 6,
    category: 'topical',
    tags: ['names-of-god', 'worship', 'character'],
    intro: 'God has revealed His character through His names. Each name reflects a different aspect of who He is. This week, you will explore these names and deepen your understanding of God.',
    outro: 'You have encountered the many facets of God\u2019s character. May you know Him more intimately and call upon His names with confidence.',
    days: [
      {
        day: 1,
        title: 'Yahweh \u2014 I AM',
        verseRef: 'EXO.3.14',
        reflection: 'God revealed Himself to Moses as \u201cI AM WHO I AM.\u201d He is the self-existent, eternal, unchanging God who is always present with His people.',
        prayer: 'Lord, You are the great I AM. You are self-sufficient and unchanging\u2014the same yesterday, today, and forever. Help me to trust in Your eternal nature and rest in the fact that You are always present. I worship You as the God who simply IS. Amen.',
      },
      {
        day: 2,
        title: 'Elohim \u2014 The Creator',
        verseRef: 'GEN.1.1',
        reflection: 'Elohim is the powerful Creator who spoke the universe into existence. He is the Almighty God who is worthy of all praise.',
        prayer: 'Elohim, You spoke and the universe came into being. The heavens declare Your glory and the earth shows Your handiwork. When I feel small and insignificant, remind me that the Creator of the cosmos calls me His beloved child. I praise Your mighty name. Amen.',
      },
      {
        day: 3,
        title: 'El Shaddai \u2014 God Almighty',
        verseRef: 'GEN.17.1',
        reflection: 'El Shaddai means \u201cGod Almighty\u201d or \u201cAll-Sufficient One.\u201d He is both powerful enough to do anything and abundant enough to supply every need.',
        prayer: 'El Shaddai, You are God Almighty. Nothing is too difficult for You. You are all-sufficient, meeting every need from Your boundless resources. I trust in Your power and Your provision today. Be my strength and my supply. Amen.',
      },
      {
        day: 4,
        title: 'Adonai \u2014 The Lord',
        verseRef: 'PSA.8.1',
        reflection: 'Adonai means \u201cLord\u201d or \u201cMaster.\u201d It acknowledges God\u2019s sovereign authority over all creation and over our lives.',
        prayer: 'Adonai, You are my Lord and Master. I surrender my will to Yours and acknowledge Your authority over every area of my life. You are majestic, and Your name is exalted above all the earth. Rule in my heart today. Amen.',
      },
      {
        day: 5,
        title: 'Jehovah Jireh \u2014 The Provider',
        verseRef: 'GEN.22.14',
        reflection: 'Jehovah Jireh means \u201cThe Lord Will Provide.\u201d God sees our needs and provides for them in His perfect timing and way.',
        prayer: 'Jehovah Jireh, You are my Provider. You see my needs before I even ask and You supply according to Your riches. When worry creeps in, remind me that You have never failed to provide. I trust You with my every need today. In Jesus\u2019 name, Amen.',
      },
      {
        day: 6,
        title: 'Jehovah Shalom \u2014 The Lord is Peace',
        verseRef: 'JDG.6.24',
        reflection: 'Jehovah Shalom means \u201cThe Lord is Peace.\u201d God is the source of true peace that calms our fears and stills our storms.',
        prayer: 'Jehovah Shalom, You are my Peace. In the midst of chaos and fear, You speak peace to my heart. Calm the storms within me and give me the peace that transcends all understanding. Let Your peace rule in my heart today. Amen.',
      },
      {
        day: 7,
        title: 'Jehovah Rapha \u2014 The Healer',
        verseRef: 'EXO.15.26',
        reflection: 'Jehovah Rapha means \u201cThe Lord Who Heals.\u201d God heals our bodies, our hearts, and our relationships.',
        prayer: 'Jehovah Rapha, You are my Healer. Heal the wounds of my heart, restore my body, and mend my relationships. I trust in Your healing power and Your perfect timing. Thank You that You are the Lord who heals me. Amen.',
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
