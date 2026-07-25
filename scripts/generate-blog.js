const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const siteUrl = "https://auraclinicge.com";
const phoneDisplay = "+995 557 16 88 76";
const phoneE164 = "995557168876";
const today = "2026-07-08";

const posts = [
  {
    slug: "hair-transplant-batumi-cost-guide-2026",
    title: "Hair Transplant in Batumi: 2026 Cost Guide",
    description:
      "Learn what affects hair transplant pricing in Batumi, what is usually included, and how to compare quotes safely before booking a consultation.",
    date: "2026-05-01",
    readTime: "7 min read",
    category: "Cost Guide",
    keywords:
      "hair transplant batumi cost, hair transplant georgia price, fue dhi cost guide batumi",
    intro:
      "People comparing clinics often start with one question: how much does a hair transplant in Batumi cost? The honest answer depends on graft count, technique, donor quality, clinic standards, and whether aftercare is part of the quote. A low headline price can look attractive, but it does not always reflect the real total.",
    sections: [
      {
        heading: "What usually changes the price",
        paragraphs: [
          "The biggest factor is usually graft count. A small hairline correction and a large crown-plus-front case do not require the same planning, extraction time, or implantation work.",
          "Technique also matters. Standard FUE and DHI may be positioned differently depending on the clinic's workflow, team size, and instrumentation.",
        ],
        bullets: [
          "Number of grafts needed",
          "Hair loss pattern and target area",
          "FUE vs DHI planning",
          "Donor area management complexity",
          "Included aftercare and follow-up",
        ],
      },
      {
        heading: "What should be included in a quote",
        paragraphs: [
          "Patients should ask for an itemised quote rather than a vague package promise. This makes it easier to compare clinics on quality instead of only price.",
        ],
        bullets: [
          "Consultation and case review",
          "Procedure day staffing and supervision",
          "Medication and washing instructions",
          "Follow-up support after you return home",
          "Airport or hotel logistics if relevant",
        ],
      },
      {
        heading: "How to compare quotes safely",
        paragraphs: [
          "Focus on value, transparency, and realistic planning. A good clinic will explain graft estimates, expected density, and recovery without promising perfect results for every case.",
          "If a quote seems much lower than the rest, ask what is excluded and who actually performs each step on the day of surgery.",
        ],
      },
    ],
    cta:
      "If you want a personalised estimate, request a free hair analysis from Aura Clinic and we will review your hairline, crown, donor area, and likely graft range.",
  },
  {
    slug: "fue-vs-dhi-hair-transplant",
    title: "FUE vs DHI Hair Transplant: Which Technique Fits Your Case?",
    description:
      "Compare FUE and DHI in simple language: how they work, who may benefit, and what to ask during your hair transplant consultation.",
    date: "2026-05-03",
    readTime: "8 min read",
    category: "Technique",
    keywords: "fue vs dhi, dhi hair transplant, fue hair transplant difference",
    intro:
      "FUE and DHI are two of the most searched hair transplant terms online, yet many patients still do not know what the practical difference is. In reality, both can produce natural results when the case selection, hairline design, and graft handling are correct.",
    sections: [
      {
        heading: "What FUE means",
        paragraphs: [
          "FUE stands for Follicular Unit Extraction. Grafts are collected individually from the donor area and then implanted into recipient sites prepared for the treatment plan.",
          "It is widely used because it is flexible, efficient, and suitable for many frontal, crown, and larger coverage cases.",
        ],
      },
      {
        heading: "What DHI means",
        paragraphs: [
          "DHI usually refers to implantation with a specialised pen-style implanter. It is often chosen for refined placement and dense work in selected areas, especially when careful angle control matters.",
          "That does not automatically make it better for every patient. Suitability depends on the hair loss pattern, hair characteristics, and planning goals.",
        ],
      },
      {
        heading: "Questions patients should ask",
        bullets: [
          "Why are you recommending this technique for my case?",
          "How many grafts do you estimate?",
          "What density is realistic in one session?",
          "How will you protect the donor area?",
          "What should I expect in recovery and final growth?",
        ],
        paragraphs: [
          "The best technique is the one that suits your anatomy and goals, not the one with the loudest marketing claim.",
        ],
      },
    ],
    cta:
      "Aura Clinic offers personalised planning for both FUE and DHI so you can understand the trade-offs before booking treatment.",
  },
  {
    slug: "hair-transplant-recovery-timeline",
    title: "Hair Transplant Recovery Timeline: What to Expect Week by Week",
    description:
      "A practical recovery timeline after a hair transplant, including scabs, shedding, early regrowth, and when patients usually see final density.",
    date: "2026-05-05",
    readTime: "7 min read",
    category: "Recovery",
    keywords: "hair transplant recovery timeline, hair transplant healing stages",
    intro:
      "Recovery is one of the most important parts of hair transplant planning. Patients often focus on the day of surgery, but the visible result depends heavily on healing, aftercare, and patience over the following months.",
    sections: [
      {
        heading: "The first two weeks",
        paragraphs: [
          "During the first days, mild redness, swelling, and small scabs are common. The main goal is to protect the grafts, follow washing guidance, and avoid friction.",
          "Most patients start looking socially more comfortable after the initial crusting improves, but the scalp may still feel sensitive.",
        ],
      },
      {
        heading: "The shedding phase",
        paragraphs: [
          "Many transplanted hairs shed after the first weeks. This can be surprising, but it is usually a normal stage rather than a sign of failure.",
          "The follicle remains under the skin while the visible hair shaft drops out before new growth starts later.",
        ],
      },
      {
        heading: "Months three to twelve",
        bullets: [
          "Month 3: early new hairs may begin to appear",
          "Months 4 to 6: density starts improving",
          "Months 7 to 9: stronger visible change for many patients",
          "Months 10 to 12: more mature texture and fuller look",
        ],
        paragraphs: [
          "Every patient heals at a different pace, so results should be judged over time rather than week to week.",
        ],
      },
    ],
    cta:
      "If you want a realistic treatment and recovery plan, contact Aura Clinic for a free consultation and personalised aftercare guidance.",
  },
  {
    slug: "how-many-grafts-do-i-need",
    title: "How Many Grafts Do I Need for a Hair Transplant?",
    description:
      "Understand how clinics estimate graft counts for the hairline, crown, and full scalp, and why not every patient needs the same density.",
    date: "2026-05-07",
    readTime: "6 min read",
    category: "Planning",
    keywords: "how many grafts do i need, hair transplant graft calculator",
    intro:
      "Graft count is one of the most searched hair transplant questions because it affects both planning and cost. However, graft needs should never be guessed from a number alone. The right estimate depends on the area to cover, hair characteristics, and long-term donor strategy.",
    sections: [
      {
        heading: "Why graft counts vary so much",
        paragraphs: [
          "A patient with fine hair and wide bald areas may need a different strategy from someone with thick hair and limited frontal loss.",
          "Clinics also need to think about future hair loss. Using too many grafts in one area can create problems later if the pattern continues.",
        ],
      },
      {
        heading: "Common treatment zones",
        bullets: [
          "Hairline refinement",
          "Frontal third coverage",
          "Crown restoration",
          "Combined front and crown cases",
          "Beard, eyebrow, or scar correction",
        ],
        paragraphs: [
          "Each zone has different visual priorities. The front often needs careful natural framing, while the crown usually requires strategic distribution.",
        ],
      },
      {
        heading: "Why a photo review matters",
        paragraphs: [
          "Online estimates are only a starting point. Good clinic planning requires photos from the front, top, sides, and donor area, plus discussion of your main goal.",
        ],
      },
    ],
    cta:
      "Send your photos to Aura Clinic for a free analysis and we will explain your likely graft range in simple terms.",
  },
  {
    slug: "female-hair-transplant-guide",
    title: "Female Hair Transplant: When Can It Help?",
    description:
      "A simple guide to female hair transplant suitability, diffuse thinning, and why medical evaluation matters before surgery.",
    date: "2026-05-09",
    readTime: "7 min read",
    category: "Women",
    keywords: "female hair transplant, hair transplant for women, women hair thinning treatment",
    intro:
      "Women searching for hair transplant information often find content written only for classic male pattern baldness. In reality, female hair loss can look very different, which is why assessment is especially important before discussing surgery.",
    sections: [
      {
        heading: "When a transplant may be considered",
        paragraphs: [
          "A female hair transplant may be suitable when there is stable localised thinning, a high hairline, or traction-related loss in selected areas.",
          "The donor area must also be strong enough to support harvesting without making overall density look worse.",
        ],
      },
      {
        heading: "Why diagnosis matters first",
        paragraphs: [
          "Diffuse thinning can have hormonal, nutritional, inflammatory, or medical causes. Surgery may not be the first answer if the underlying reason has not been clarified.",
          "A responsible clinic should discuss suitability honestly rather than treating every female case as a transplant case.",
        ],
      },
      {
        heading: "Good questions to bring to consultation",
        bullets: [
          "Is my hair loss stable enough for surgery?",
          "Is my donor area strong enough?",
          "Would a transplant or another treatment be better first?",
          "What density is realistic in my case?",
        ],
      },
    ],
    cta:
      "Aura Clinic reviews female cases individually and explains when a transplant is appropriate and when a different treatment path may be wiser.",
  },
  {
    slug: "beard-transplant-guide",
    title: "Beard Transplant Guide: Density, Design, and Recovery",
    description:
      "Thinking about a beard transplant? Learn how planning, donor hair selection, and healing affect beard transplant results.",
    date: "2026-05-11",
    readTime: "6 min read",
    category: "Beard",
    keywords: "beard transplant, beard transplant cost, beard transplant recovery",
    intro:
      "Beard transplant interest continues to grow among patients with patchy growth, asymmetry, or visible facial scars. Although the procedure is smaller than many scalp cases, design and direction are extremely important because beard hair is highly visible at close range.",
    sections: [
      {
        heading: "What makes beard planning different",
        paragraphs: [
          "Facial hair angles change from the sideburns to the cheeks, moustache, and chin. Natural direction matters as much as density.",
          "The donor hair chosen should blend with your beard characteristics as closely as possible.",
        ],
      },
      {
        heading: "Who may be a candidate",
        bullets: [
          "Patchy beard growth",
          "Scar camouflage in selected cases",
          "Need for stronger cheek or jawline framing",
          "Moustache or goatee reinforcement",
        ],
      },
      {
        heading: "Recovery basics",
        paragraphs: [
          "Early redness and tiny crusts are common. Patients should avoid shaving too early and follow clinic washing instructions carefully.",
          "As with scalp transplants, some shedding can occur before longer-term growth becomes visible.",
        ],
      },
    ],
    cta:
      "If you are considering beard restoration in Batumi, Aura Clinic can review your donor area and beard goals during a free consultation.",
  },
  {
    slug: "eyebrow-transplant-guide",
    title: "Eyebrow Transplant Guide: What Patients Should Know",
    description:
      "A practical guide to eyebrow transplant planning, natural direction, healing, and who may benefit from the procedure.",
    date: "2026-05-13",
    readTime: "6 min read",
    category: "Eyebrow",
    keywords: "eyebrow transplant, eyebrow hair transplant, eyebrow restoration",
    intro:
      "Eyebrow transplantation is a detail-focused procedure. Even small errors in angle or direction can look obvious, which is why natural planning is more important than chasing extreme density in a single session.",
    sections: [
      {
        heading: "When eyebrow transplant may help",
        paragraphs: [
          "Patients may seek eyebrow restoration after overplucking, scarring, naturally sparse brows, or uneven shape.",
          "The goal is usually soft definition and a believable frame for the face, not heavy painted-on density.",
        ],
      },
      {
        heading: "Why direction matters",
        paragraphs: [
          "Eyebrow hairs lie very flat to the skin and change direction across the brow. That is why precise placement matters so much.",
          "A conservative design often looks better than an overly sharp or artificial shape.",
        ],
      },
      {
        heading: "Healing and maintenance",
        bullets: [
          "Expect temporary crusting and redness",
          "Growth takes time and patience",
          "Transplanted brow hairs may need trimming",
          "Follow-up review helps refine expectations",
        ],
      },
    ],
    cta:
      "Aura Clinic can assess your eyebrow goals and explain whether a transplant is a realistic option for your case.",
  },
  {
    slug: "when-hair-transplant-results-appear",
    title: "When Do Hair Transplant Results Start to Show?",
    description:
      "A clear explanation of when new hair growth usually starts after a transplant and when fuller density becomes visible.",
    date: "2026-05-15",
    readTime: "5 min read",
    category: "Results",
    keywords: "when do hair transplant results show, hair transplant growth timeline",
    intro:
      "One of the most common patient questions is when the result will become visible. The answer is rarely immediate. Hair transplants are a long-view procedure, and understanding the timeline helps reduce unnecessary stress in the early months.",
    sections: [
      {
        heading: "Why patience matters",
        paragraphs: [
          "The initial healing period is only the beginning. After shedding, follicles need time to cycle into new visible growth.",
          "Patients who expect a dramatic full result in a few weeks often misread normal recovery as a problem.",
        ],
      },
      {
        heading: "Typical growth stages",
        bullets: [
          "Weeks 1 to 2: healing and scab removal",
          "Weeks 2 to 8: shedding may happen",
          "Months 3 to 4: early visible regrowth",
          "Months 6 to 9: stronger cosmetic improvement",
          "Months 10 to 12: more mature density and texture",
        ],
      },
      {
        heading: "What affects timing",
        paragraphs: [
          "Your biology, hair calibre, treatment area, and aftercare all influence how quickly the change becomes obvious. Crown cases can sometimes feel slower than frontal cases because of lighting and hair swirl patterns.",
        ],
      },
    ],
    cta:
      "Aura Clinic explains realistic growth milestones before treatment so you know what to expect after surgery.",
  },
  {
    slug: "natural-hairline-design-guide",
    title: "Natural Hairline Design: Why It Matters More Than Maximum Density",
    description:
      "Learn why hairline design is one of the most important decisions in a natural-looking hair transplant.",
    date: "2026-05-17",
    readTime: "7 min read",
    category: "Hairline",
    keywords: "natural hairline design, hair transplant hairline",
    intro:
      "A good transplant is not only about how many grafts are placed. The front hairline frames the whole face, so design mistakes can remain visible for years. That is why thoughtful planning often matters more than simply pushing for the lowest or densest possible line.",
    sections: [
      {
        heading: "What makes a hairline look natural",
        paragraphs: [
          "Natural hairlines usually have soft irregularity, appropriate height, and age-matched shape. They do not look ruler-straight or artificially low.",
          "The best design respects facial proportions and donor limits while keeping room for future hair loss planning.",
        ],
      },
      {
        heading: "Common planning mistakes",
        bullets: [
          "Placing the line too low for the patient's age",
          "Using too much density at the front edge",
          "Ignoring temple transition and facial balance",
          "Spending donor grafts too aggressively in one session",
        ],
      },
      {
        heading: "Why long-term thinking matters",
        paragraphs: [
          "Hair loss can continue over time, so a good plan should still look reasonable years later. A conservative, well-designed result often ages better than an aggressive one.",
        ],
      },
    ],
    cta:
      "At Aura Clinic, hairline planning is discussed individually so the final look stays natural, balanced, and sustainable.",
  },
  {
    slug: "is-hair-transplant-permanent",
    title: "Is a Hair Transplant Permanent?",
    description:
      "Understand what permanent means in hair transplantation and why long-term planning still matters even with stable donor grafts.",
    date: "2026-05-19",
    readTime: "5 min read",
    category: "Basics",
    keywords: "is hair transplant permanent, permanent hair transplant results",
    intro:
      "Patients often hear that transplanted hair is permanent. In many cases, donor follicles are more resistant to pattern hair loss, but permanence should still be discussed realistically. A transplant does not freeze the rest of your scalp in time.",
    sections: [
      {
        heading: "What permanence usually refers to",
        paragraphs: [
          "The idea comes from using follicles from the donor zone that are typically less affected by pattern hair loss. When grafts survive and heal well, they can provide long-lasting growth.",
        ],
      },
      {
        heading: "Why planning still matters",
        paragraphs: [
          "Your native non-transplanted hair may continue thinning. That is why clinics should plan for progression instead of designing only for today's photo.",
          "This affects hairline position, density strategy, and donor conservation.",
        ],
      },
      {
        heading: "How to think about results",
        bullets: [
          "Long-lasting does not mean unchanging forever",
          "Native hair can still thin over time",
          "Medical follow-up may still matter",
          "A good plan protects future options",
        ],
      },
    ],
    cta:
      "Aura Clinic focuses on natural long-term planning so results stay believable as your hair changes over time.",
  },
  {
    slug: "hair-transplant-aftercare-guide",
    title: "Hair Transplant Aftercare Guide: The First 14 Days",
    description:
      "Simple aftercare advice for the first 14 days after a hair transplant, including washing, sleeping, and protecting new grafts.",
    date: "2026-05-21",
    readTime: "7 min read",
    category: "Aftercare",
    keywords: "hair transplant aftercare, first 14 days after hair transplant",
    intro:
      "The first two weeks after a hair transplant are critical because the grafts are settling and the scalp is still healing. Clear aftercare instructions help reduce stress and lower the chance of avoidable problems.",
    sections: [
      {
        heading: "The main goal in early recovery",
        paragraphs: [
          "The first priority is to protect the implanted area from rubbing, sweating, accidental bumps, and harsh washing.",
          "Patients should follow the exact washing and medication plan given by their clinic rather than mixing advice from random internet sources.",
        ],
      },
      {
        heading: "Common aftercare points",
        bullets: [
          "Sleep in the position recommended by the clinic",
          "Avoid touching or scratching the grafts",
          "Wash only as instructed",
          "Avoid heavy exercise in the early period",
          "Protect the scalp from sun and friction",
        ],
      },
      {
        heading: "When to contact the clinic",
        paragraphs: [
          "If you have unusual pain, significant swelling beyond the expected period, discharge, or anything that feels wrong, contact your clinic directly.",
          "Good aftercare support matters almost as much as the procedure itself.",
        ],
      },
    ],
    cta:
      "Aura Clinic provides structured aftercare guidance so patients know exactly what to do in the first days after treatment.",
  },
  {
    slug: "shock-loss-after-hair-transplant",
    title: "Shock Loss After Hair Transplant: What It Is and When to Worry",
    description:
      "Learn what shock loss means after a hair transplant, why it can happen, and when patients should contact the clinic.",
    date: "2026-05-23",
    readTime: "6 min read",
    category: "Recovery",
    keywords: "shock loss after hair transplant, hair transplant shedding",
    intro:
      "Shock loss can sound alarming, especially when patients see shedding after a procedure they hoped would add hair. In many cases, temporary shedding is part of the healing process, but it is still helpful to understand what is normal and what is not.",
    sections: [
      {
        heading: "What shock loss means",
        paragraphs: [
          "Shock loss usually refers to temporary shedding of transplanted hairs or nearby existing hairs after the procedure. It does not automatically mean graft failure.",
        ],
      },
      {
        heading: "Why it can happen",
        bullets: [
          "Surgical stress to the scalp",
          "Natural hair cycle changes after treatment",
          "Sensitivity in thinning native hair nearby",
          "Normal post-operative shedding phases",
        ],
      },
      {
        heading: "When to stay calm and when to check in",
        paragraphs: [
          "Temporary shedding can be normal, but if you are unsure, contact your clinic instead of guessing online.",
          "Follow-up photos often help clinics distinguish normal shedding from other issues.",
        ],
      },
    ],
    cta:
      "Aura Clinic offers follow-up support after treatment so patients can ask questions about shedding, healing, and regrowth with confidence.",
  },
  {
    slug: "prp-after-hair-transplant",
    title: "PRP After Hair Transplant: Is It Worth Considering?",
    description:
      "Find out what PRP is, why some clinics use it after hair transplant surgery, and what realistic expectations look like.",
    date: "2026-05-25",
    readTime: "5 min read",
    category: "Supportive Care",
    keywords: "prp after hair transplant, platelet rich plasma hair transplant",
    intro:
      "PRP is often mentioned in hair restoration conversations, but patients do not always know when it is used or what it can realistically do. It should be viewed as a supportive option rather than a miracle shortcut.",
    sections: [
      {
        heading: "What PRP is",
        paragraphs: [
          "PRP stands for platelet-rich plasma. It uses a concentration of your own blood components that is processed and then applied according to the clinic's protocol.",
        ],
      },
      {
        heading: "Why some clinics recommend it",
        paragraphs: [
          "Some clinics use PRP as part of a broader healing or maintenance plan. The goal is usually to support scalp condition and recovery rather than to replace proper surgical planning.",
        ],
      },
      {
        heading: "How patients should think about it",
        bullets: [
          "Ask why it is being recommended",
          "Understand the expected benefit",
          "Do not treat it as a substitute for good surgery",
          "Ask how it fits into your overall treatment plan",
        ],
      },
    ],
    cta:
      "If you want to understand whether PRP belongs in your recovery plan, Aura Clinic can explain the pros and limits during consultation.",
  },
  {
    slug: "smoking-and-hair-transplant-recovery",
    title: "Smoking and Hair Transplant Recovery: Why Clinics Warn Patients",
    description:
      "A practical explanation of why smoking can affect healing after a hair transplant and why clinics ask patients to be careful.",
    date: "2026-05-27",
    readTime: "5 min read",
    category: "Recovery",
    keywords: "smoking after hair transplant, can smokers have hair transplant",
    intro:
      "Many clinics warn patients about smoking before and after hair transplant surgery. That advice is not arbitrary. Healing depends on circulation, tissue support, and aftercare discipline, so anything that interferes with those factors deserves attention.",
    sections: [
      {
        heading: "Why clinics raise the issue",
        paragraphs: [
          "Smoking can affect circulation and wound healing, which is why clinics often advise patients to reduce or avoid it around the procedure period.",
        ],
      },
      {
        heading: "Practical patient mindset",
        paragraphs: [
          "Think of the recovery window as a period where every good habit helps. If you are investing in hair restoration, it makes sense to support the best possible healing conditions.",
        ],
      },
      {
        heading: "Questions to ask your clinic",
        bullets: [
          "How long should I avoid smoking before the procedure?",
          "How long after surgery should I wait?",
          "Are there extra precautions for my case?",
        ],
      },
    ],
    cta:
      "Aura Clinic provides clear recovery instructions tailored to your case so you know how to protect your grafts after treatment.",
  },
  {
    slug: "best-age-for-hair-transplant",
    title: "What Is the Best Age for a Hair Transplant?",
    description:
      "A realistic guide to hair transplant timing, age, pattern stability, and why early surgery is not always the best option.",
    date: "2026-05-29",
    readTime: "6 min read",
    category: "Planning",
    keywords: "best age for hair transplant, when should i get hair transplant",
    intro:
      "Patients often ask if they are too young or too old for a hair transplant. Age alone is not the only factor. Pattern stability, donor quality, expectations, and long-term planning usually matter more than the number on your passport.",
    sections: [
      {
        heading: "Why younger patients need careful planning",
        paragraphs: [
          "If hair loss is still evolving quickly, aggressive early surgery can create design problems later. A responsible clinic should consider what your scalp may look like in the coming years, not just right now.",
        ],
      },
      {
        heading: "Why older patients can still be candidates",
        paragraphs: [
          "Older patients may still benefit if their donor area is suitable and goals are realistic. Natural framing and strategic density can make a meaningful difference without chasing teenage density.",
        ],
      },
      {
        heading: "Better question than age alone",
        bullets: [
          "Is my pattern stable enough?",
          "Is my donor area strong enough?",
          "Are my goals realistic?",
          "Is this the right time in my hair loss journey?",
        ],
      },
    ],
    cta:
      "Aura Clinic evaluates age together with hair loss pattern and donor quality to build a safer long-term plan.",
  },
  {
    slug: "receding-hairline-hair-transplant",
    title: "Hair Transplant for a Receding Hairline: What to Expect",
    description:
      "Learn how hair transplants address a receding hairline, what makes a result look natural, and what patients should ask first.",
    date: "2026-05-31",
    readTime: "6 min read",
    category: "Hairline",
    keywords: "receding hairline hair transplant, hairline transplant",
    intro:
      "A receding hairline is one of the most common reasons patients search for hair transplant treatment. Because the frontal frame is so visible, careful design and realistic expectations are essential from the beginning.",
    sections: [
      {
        heading: "What matters most in hairline cases",
        paragraphs: [
          "The shape, softness, and placement of the hairline often matter more than maximum density. A good result should match your face and still look natural as you age.",
        ],
      },
      {
        heading: "Why not every hairline should be lowered",
        paragraphs: [
          "Some patients ask for a very low line because it looks impressive in edited photos. In real life, that can be risky if donor reserves are limited or hair loss continues.",
        ],
      },
      {
        heading: "Smart consultation questions",
        bullets: [
          "What line is realistic for my age and pattern?",
          "How many grafts are likely needed?",
          "How will you keep it natural?",
          "What if my hair loss progresses later?",
        ],
      },
    ],
    cta:
      "Aura Clinic plans frontal restorations conservatively so the result looks natural now and still makes sense later.",
  },
  {
    slug: "crown-hair-transplant-guide",
    title: "Crown Hair Transplant Guide: Why the Crown Needs Its Own Strategy",
    description:
      "A clear guide to crown hair transplant planning, density expectations, and why the crown often needs a different approach from the front.",
    date: "2026-06-02",
    readTime: "6 min read",
    category: "Crown",
    keywords: "crown hair transplant, vertex hair transplant",
    intro:
      "The crown can be one of the most challenging areas in hair transplantation. It is larger than many patients expect, has a swirl pattern that affects visual density, and may continue thinning over time. That is why crown planning often needs a different strategy from the frontal zone.",
    sections: [
      {
        heading: "Why the crown is tricky",
        paragraphs: [
          "Light hits the crown directly from above, so even decent coverage can look less dense than patients expect in photos.",
          "The natural swirl pattern also changes the way grafts need to be distributed.",
        ],
      },
      {
        heading: "How clinics usually plan crown work",
        paragraphs: [
          "Good clinics think in terms of strategic coverage rather than unrealistic full closure in every case. The plan depends on bald area size, donor reserves, and the condition of the front.",
        ],
      },
      {
        heading: "Good questions to ask",
        bullets: [
          "How much crown coverage is realistic in one session?",
          "Will the front or crown be prioritised first?",
          "How will this affect donor planning for the future?",
        ],
      },
    ],
    cta:
      "Aura Clinic explains crown cases carefully so patients understand the density strategy before making a decision.",
  },
  {
    slug: "diffuse-thinning-vs-bald-areas",
    title: "Diffuse Thinning vs Bald Areas: Why Treatment Planning Changes",
    description:
      "Understand the difference between diffuse thinning and defined bald areas and why hair transplant planning is not the same for both.",
    date: "2026-06-04",
    readTime: "6 min read",
    category: "Diagnosis",
    keywords: "diffuse thinning hair transplant, bald areas vs thinning hair",
    intro:
      "Not all hair loss patterns look the same, and that changes the treatment strategy. Diffuse thinning and clearly bald areas may both lead patients to consider a transplant, but the planning logic can be very different.",
    sections: [
      {
        heading: "What diffuse thinning means",
        paragraphs: [
          "Diffuse thinning usually means hair is still present across the area, but overall density has dropped. Existing native hair may be weak, miniaturised, or inconsistent.",
        ],
      },
      {
        heading: "Why planning changes",
        paragraphs: [
          "When native hair is still present, clinics must think carefully about placement and long-term stability. Some cases may benefit from staged planning or additional medical evaluation.",
        ],
      },
      {
        heading: "Questions worth discussing",
        bullets: [
          "Is my thinning stable enough for surgery?",
          "How strong is my donor area?",
          "Will the clinic protect existing hair?",
          "Would another treatment help before surgery?",
        ],
      },
    ],
    cta:
      "Aura Clinic reviews thinning patterns individually so patients understand whether a transplant, supportive treatment, or staged planning makes more sense.",
  },
  {
    slug: "how-to-choose-a-hair-transplant-clinic",
    title: "How to Choose a Hair Transplant Clinic Without Falling for Hype",
    description:
      "A practical checklist for comparing hair transplant clinics, from transparency and planning to aftercare and realistic promises.",
    date: "2026-06-06",
    readTime: "8 min read",
    category: "Research",
    keywords: "how to choose hair transplant clinic, best hair transplant clinic checklist",
    intro:
      "Patients comparing clinics online often see dramatic before-and-after images, aggressive discounts, and bold promises. The challenge is separating useful signals from marketing noise. A safer decision comes from asking better questions, not from chasing the loudest ad.",
    sections: [
      {
        heading: "Look for transparent planning",
        paragraphs: [
          "A good clinic should explain why a technique is recommended, how many grafts may be needed, and what results are realistic for your case.",
        ],
      },
      {
        heading: "Check for trust signals",
        bullets: [
          "Clear clinic identity and contact details",
          "Realistic medical language, not guaranteed miracles",
          "Visible aftercare structure",
          "Honest discussion of limitations and suitability",
          "Consistent communication before booking",
        ],
      },
      {
        heading: "Be careful with red flags",
        paragraphs: [
          "Be cautious if the conversation focuses only on price, if no one discusses donor limitations, or if you are promised perfect density with no trade-offs.",
        ],
      },
    ],
    cta:
      "Aura Clinic aims to keep consultations clear, realistic, and pressure-free so patients can make an informed decision.",
  },
  {
    slug: "hair-transplant-turkey-vs-georgia",
    title: "Hair Transplant in Turkey vs Georgia: What Patients Compare",
    description:
      "A balanced look at how patients compare hair transplant clinics in Turkey and Georgia, including pricing, access, and consultation quality.",
    date: "2026-06-08",
    readTime: "7 min read",
    category: "Travel",
    keywords: "hair transplant turkey vs georgia, hair transplant batumi vs turkey",
    intro:
      "Many international patients compare Turkey and Georgia when looking for hair transplant treatment. The right choice is not only about price. Patients should also think about access, communication, aftercare, and the overall quality of planning.",
    sections: [
      {
        heading: "Why patients compare these destinations",
        paragraphs: [
          "Turkey has long been a well-known destination in this sector, while Georgia appeals to patients looking for a smaller setting, easier regional access, or a more personalised experience.",
        ],
      },
      {
        heading: "What matters beyond headline cost",
        bullets: [
          "Transparency of the treatment plan",
          "Comfort with communication",
          "Travel convenience and follow-up",
          "Clinic scale and patient attention",
          "Realistic expectations and aftercare",
        ],
      },
      {
        heading: "A better way to compare",
        paragraphs: [
          "Instead of asking only which country is cheaper, ask which clinic can explain your case more clearly and manage your treatment more responsibly.",
        ],
      },
    ],
    cta:
      "If you are comparing options in the region, Aura Clinic in Batumi can provide a free online assessment before you travel.",
  },
  {
    slug: "hair-transplant-consultation-checklist",
    title: "Hair Transplant Consultation Checklist: 12 Smart Questions to Ask",
    description:
      "Use this consultation checklist to ask better questions before choosing a hair transplant clinic or treatment plan.",
    date: "2026-06-10",
    readTime: "7 min read",
    category: "Checklist",
    keywords: "hair transplant consultation checklist, questions to ask hair transplant clinic",
    intro:
      "A consultation should help you make a better decision, not just move you toward a deposit. The more informed your questions are, the easier it becomes to recognise whether a clinic is planning responsibly or simply selling quickly.",
    sections: [
      {
        heading: "Core questions to ask",
        bullets: [
          "Am I a good candidate for surgery right now?",
          "Which technique do you recommend and why?",
          "How many grafts do you estimate?",
          "What result is realistic for my case?",
          "How will you protect my donor area?",
          "What aftercare support do you provide?",
        ],
        paragraphs: [
          "These questions shift the conversation from price alone to treatment quality and long-term planning.",
        ],
      },
      {
        heading: "Questions about results and recovery",
        bullets: [
          "When should I expect visible growth?",
          "What does the first month usually look like?",
          "What should I avoid after surgery?",
          "What happens if I still lose native hair later?",
          "Will I need a second session in the future?",
          "How can I contact the clinic after I go home?",
        ],
      },
    ],
    cta:
      "Aura Clinic welcomes detailed questions because good decisions start with clear information, not pressure.",
  },
  {
    slug: "hair-transplant-healing-month-by-month",
    title: "Hair Transplant Healing Month by Month",
    description:
      "A month-by-month guide to healing and visible change after a hair transplant, from early recovery to maturing density.",
    date: "2026-06-12",
    readTime: "6 min read",
    category: "Recovery",
    keywords: "hair transplant healing month by month, month by month hair transplant",
    intro:
      "Patients often search for a month-by-month recovery guide because progress feels slow when you are checking the mirror every day. Looking at the journey in phases makes it easier to stay calm and realistic.",
    sections: [
      {
        heading: "Month 1",
        paragraphs: [
          "Healing, scab removal, and the settling period dominate the first month. Some shedding is expected and should not immediately cause panic.",
        ],
      },
      {
        heading: "Months 2 to 4",
        paragraphs: [
          "This is often the awkward stage. Visible density may still be limited, and early regrowth can be uneven. Patience is essential here.",
        ],
      },
      {
        heading: "Months 5 to 12",
        bullets: [
          "Month 5 to 6: more obvious new growth",
          "Month 7 to 9: stronger cosmetic improvement",
          "Month 10 to 12: thicker, more mature appearance",
        ],
        paragraphs: [
          "Final maturation takes time, especially in areas like the crown where changes can feel slower.",
        ],
      },
    ],
    cta:
      "Aura Clinic helps patients understand each stage of healing so expectations stay realistic from day one.",
  },
  {
    slug: "wearing-a-hat-after-hair-transplant",
    title: "Can You Wear a Hat After a Hair Transplant?",
    description:
      "Learn why patients ask about hats after hair transplant surgery and why timing and pressure on the grafts matter.",
    date: "2026-06-14",
    readTime: "4 min read",
    category: "Aftercare",
    keywords: "wear hat after hair transplant, cap after hair transplant",
    intro:
      "Many patients want to know when they can wear a hat again for comfort, privacy, or travel. The answer depends on healing stage and the type of pressure the hat may place on the grafted area.",
    sections: [
      {
        heading: "Why clinics are careful about hats",
        paragraphs: [
          "Fresh grafts should be protected from friction and unnecessary pressure. That is why clinics usually give specific timing and instructions for headwear.",
        ],
      },
      {
        heading: "The safest approach",
        paragraphs: [
          "Follow your clinic's exact guidance rather than general internet advice. Timing may differ depending on your healing and the procedure details.",
        ],
      },
      {
        heading: "Useful mindset",
        bullets: [
          "Protect the grafts first",
          "Avoid tight pressure early on",
          "Ask before travel or public events",
          "Use the clinic's instructions, not assumptions",
        ],
      },
    ],
    cta:
      "Aura Clinic gives patients practical aftercare instructions for travel, washing, sleeping, and protective headwear.",
  },
  {
    slug: "exercise-after-hair-transplant",
    title: "When Can You Exercise After a Hair Transplant?",
    description:
      "A simple guide to why clinics restrict exercise after a hair transplant and how patients can return safely.",
    date: "2026-06-16",
    readTime: "5 min read",
    category: "Aftercare",
    keywords: "exercise after hair transplant, gym after hair transplant",
    intro:
      "Patients who train regularly often ask when they can go back to the gym. Exercise timing matters because sweat, blood pressure changes, and accidental friction can affect early healing if patients return too quickly.",
    sections: [
      {
        heading: "Why clinics set limits",
        paragraphs: [
          "The early recovery period is about stability. Heavy activity may increase sweating and irritation when the scalp is still healing.",
        ],
      },
      {
        heading: "How to return safely",
        paragraphs: [
          "Most clinics recommend a staged return rather than jumping straight into intense training. Always follow the protocol given for your own case.",
        ],
      },
      {
        heading: "Before you restart",
        bullets: [
          "Ask about walking, cardio, and weights separately",
          "Protect the scalp from contact",
          "Avoid rushing because you feel better after a few days",
        ],
      },
    ],
    cta:
      "Aura Clinic provides clear guidance on sport and recovery so patients know how to return without risking the early healing phase.",
  },
  {
    slug: "hair-transplant-risks-and-side-effects",
    title: "Hair Transplant Risks and Side Effects: A Realistic Overview",
    description:
      "A balanced overview of common hair transplant side effects, recovery issues, and why honest consultation matters.",
    date: "2026-06-18",
    readTime: "7 min read",
    category: "Safety",
    keywords: "hair transplant risks, hair transplant side effects",
    intro:
      "Every medical procedure should be discussed with realistic expectations, and hair transplantation is no exception. Patients deserve honest explanations about common side effects, the limits of surgery, and why proper aftercare matters.",
    sections: [
      {
        heading: "Common short-term effects",
        bullets: [
          "Redness",
          "Mild swelling",
          "Scabbing",
          "Temporary tenderness",
          "Shedding in the early phase",
        ],
        paragraphs: [
          "These are often part of normal healing, but they should still be explained clearly before treatment.",
        ],
      },
      {
        heading: "Why communication matters",
        paragraphs: [
          "Patients feel more confident when they know what is expected and when to contact the clinic. Good communication can prevent unnecessary panic in the recovery period.",
        ],
      },
      {
        heading: "What responsible consultation looks like",
        paragraphs: [
          "A responsible clinic will discuss not only benefits, but also limits, realistic density, donor restrictions, and the timeline required to judge results fairly.",
        ],
      },
    ],
    cta:
      "Aura Clinic believes realistic education is part of good patient care, which is why consultations include both goals and limitations.",
  },
  {
    slug: "donor-area-management-guide",
    title: "Donor Area Management: The Part Patients Should Not Ignore",
    description:
      "Why donor area management matters in hair transplantation and how it affects both current results and future options.",
    date: "2026-06-20",
    readTime: "6 min read",
    category: "Donor Area",
    keywords: "donor area management, hair transplant donor area",
    intro:
      "Patients understandably focus on the front result, but donor area management is one of the most important parts of a responsible hair transplant plan. A clinic that ignores donor preservation may create problems that are hard to correct later.",
    sections: [
      {
        heading: "Why the donor area matters so much",
        paragraphs: [
          "The donor zone is a limited resource. Once grafts are harvested, planning choices cannot simply be reversed.",
          "That is why extraction density, distribution, and long-term strategy matter from the start.",
        ],
      },
      {
        heading: "What clinics should think about",
        bullets: [
          "Avoiding overharvesting",
          "Matching extraction to current and future needs",
          "Balancing front and crown priorities",
          "Preserving options for later sessions if needed",
        ],
      },
      {
        heading: "What patients should ask",
        paragraphs: [
          "Ask how your donor area will be evaluated and protected. This simple question often reveals whether the clinic is planning beyond the first sales conversation.",
        ],
      },
    ],
    cta:
      "Aura Clinic treats donor preservation as a key part of natural long-term planning, not an afterthought.",
  },
  {
    slug: "why-natural-results-matter-in-hair-transplant",
    title: "Why Natural Results Matter More Than Dramatic Marketing Photos",
    description:
      "A guide to natural-looking hair transplants, realistic density, and why conservative planning often ages better.",
    date: "2026-06-22",
    readTime: "6 min read",
    category: "Results",
    keywords: "natural hair transplant results, realistic hair transplant",
    intro:
      "Dramatic marketing photos can create unrealistic expectations. In real life, the best transplant is usually the one that looks believable, suits your age, and blends naturally with the rest of your hair rather than screaming that work was done.",
    sections: [
      {
        heading: "What natural results usually mean",
        paragraphs: [
          "Natural results depend on hairline shape, density distribution, angle, direction, and restraint. The goal is to improve the frame without making the result look artificial.",
        ],
      },
      {
        heading: "Why 'more' is not always better",
        paragraphs: [
          "Maximum density, the lowest possible hairline, and aggressive graft use may sound attractive in an ad, but they are not always the wisest long-term choices.",
        ],
      },
      {
        heading: "How to evaluate examples",
        bullets: [
          "Does the hairline match the patient's age?",
          "Does the density look believable?",
          "Does the result blend with the face naturally?",
          "Would it still look reasonable years later?",
        ],
      },
    ],
    cta:
      "Aura Clinic focuses on realistic, natural-looking outcomes because believable results create the strongest patient satisfaction over time.",
  },
  {
    slug: "dhi-hair-transplant-guide-2026",
    title: "DHI Hair Transplant Guide 2026: Procedure, Recovery, and Suitability",
    description:
      "A clear 2026 guide to DHI hair transplant, including how it works, who it may suit, and what recovery expectations look like.",
    date: "2026-06-24",
    readTime: "8 min read",
    category: "Technique",
    keywords: "dhi hair transplant guide 2026, dhi procedure recovery",
    intro:
      "DHI remains one of the most searched hair transplant terms because patients associate it with precision and premium planning. The technique can be very useful in selected cases, but suitability still depends on anatomy, hair loss pattern, and realistic density goals.",
    sections: [
      {
        heading: "What DHI aims to do",
        paragraphs: [
          "DHI is commonly described as a direct implantation approach using a pen-style implanter. Patients often choose it when refined placement and controlled frontal work are priorities.",
        ],
      },
      {
        heading: "Who may consider it",
        paragraphs: [
          "DHI may be discussed for hairline-focused cases, smaller or medium coverage plans, and patients seeking careful angle control. The best use case depends on the clinic's method and your own scalp characteristics.",
        ],
      },
      {
        heading: "What patients should keep in mind",
        bullets: [
          "Technique is only one part of the result",
          "Design and graft handling matter just as much",
          "Recovery still takes months",
          "Realistic expectations are essential",
        ],
      },
    ],
    cta:
      "Aura Clinic offers personalised DHI planning for patients who want a realistic explanation of whether the technique suits their case.",
  },
  {
    slug: "fue-hair-transplant-guide-2026",
    title: "FUE Hair Transplant Guide 2026: How the Procedure Works",
    description:
      "A 2026 guide to FUE hair transplant, including extraction, implantation, recovery, and the questions patients should ask.",
    date: "2026-06-26",
    readTime: "8 min read",
    category: "Technique",
    keywords: "fue hair transplant guide 2026, fue procedure recovery",
    intro:
      "FUE is one of the most widely used hair transplant techniques because it offers flexibility across many case types. Patients researching the procedure should understand not only how grafts are extracted, but also how planning and aftercare shape the final result.",
    sections: [
      {
        heading: "How FUE works in simple terms",
        paragraphs: [
          "Follicular units are extracted individually from the donor area and then implanted into the recipient region according to the treatment plan.",
        ],
      },
      {
        heading: "Why planning still matters more than buzzwords",
        paragraphs: [
          "Even with a strong technique, outcomes depend on graft survival, natural design, density strategy, and donor management. The name of the technique alone cannot guarantee a good result.",
        ],
      },
      {
        heading: "What to ask in consultation",
        bullets: [
          "How many grafts do I need?",
          "Is my donor area suitable?",
          "What density can I realistically expect?",
          "What will the first months of recovery look like?",
        ],
      },
    ],
    cta:
      "Aura Clinic uses consultation-based planning so patients understand whether FUE is the right fit before moving forward.",
  },
  {
    slug: "travel-to-batumi-for-hair-transplant",
    title: "Travel to Batumi for a Hair Transplant: What International Patients Should Plan",
    description:
      "A practical travel guide for international patients considering hair transplant treatment in Batumi, Georgia.",
    date: "2026-06-28",
    readTime: "6 min read",
    category: "Travel",
    keywords: "travel to batumi for hair transplant, hair transplant georgia travel guide",
    intro:
      "International patients do not only plan a procedure. They also plan flights, arrival timing, accommodation, and recovery comfort. That is why travel information matters when comparing clinics in Batumi and other regional destinations.",
    sections: [
      {
        heading: "What to plan before travel",
        bullets: [
          "Photo-based online consultation",
          "Estimated number of days to stay",
          "Airport and transfer planning",
          "Hotel comfort during the first recovery days",
          "How follow-up will work after you return home",
        ],
      },
      {
        heading: "Why timing matters",
        paragraphs: [
          "Patients should avoid rushing in and out without enough time for early review and basic aftercare guidance. Feeling organised before arrival reduces stress on procedure day.",
        ],
      },
      {
        heading: "A better travel question",
        paragraphs: [
          "Instead of only asking where you can travel cheapest, ask where you can receive clear planning, comfortable logistics, and reliable aftercare support.",
        ],
      },
    ],
    cta:
      "Aura Clinic in Batumi can help international patients start with an online consultation before arranging travel.",
  },
  {
    slug: "does-hair-transplant-hurt",
    title: "Does a Hair Transplant Hurt? What Patients Usually Feel",
    description:
      "A simple explanation of discomfort, local anaesthesia, and what patients usually feel during and after a hair transplant.",
    date: "2026-06-30",
    readTime: "5 min read",
    category: "Patient Questions",
    keywords: "does hair transplant hurt, painful hair transplant",
    intro:
      "Fear of pain is one of the biggest reasons some patients delay consultation. The good news is that most clinics plan the procedure with patient comfort in mind, and discomfort is usually discussed in stages rather than as one dramatic event.",
    sections: [
      {
        heading: "During the procedure",
        paragraphs: [
          "Patients often feel most concerned about the start of local anaesthesia. After that, the procedure is usually experienced more as a long treatment day than as constant pain.",
        ],
      },
      {
        heading: "After the procedure",
        paragraphs: [
          "Tightness, tenderness, or mild discomfort can happen in the donor or recipient area, especially in the first days, but clinics typically provide aftercare instructions to help manage this period.",
        ],
      },
      {
        heading: "Why asking matters",
        bullets: [
          "Ask what to expect during anaesthesia",
          "Ask what the first night may feel like",
          "Ask what medications or care are provided",
        ],
      },
    ],
    cta:
      "Aura Clinic explains comfort, recovery, and aftercare clearly so patients know what to expect before treatment day.",
  },
  {
    slug: "how-long-does-hair-transplant-take",
    title: "How Long Does a Hair Transplant Take?",
    description:
      "A practical guide to procedure day timing, why larger sessions take longer, and how patients should prepare.",
    date: "2026-07-01",
    readTime: "5 min read",
    category: "Patient Questions",
    keywords: "how long does a hair transplant take, hair transplant procedure day",
    intro:
      "Patients often ask how long they will be in the clinic on procedure day. The answer depends on graft count, technique, case complexity, and the clinic's workflow. Hair transplantation is precision work, so time should be seen as part of quality rather than an inconvenience.",
    sections: [
      {
        heading: "What affects procedure length",
        bullets: [
          "Graft count",
          "Technique and implantation method",
          "Need for refined hairline design",
          "Donor area complexity",
          "Breaks and comfort planning during the day",
        ],
      },
      {
        heading: "Why patients should not chase speed alone",
        paragraphs: [
          "A very fast promise may sound attractive, but careful graft handling and natural placement take time. Patients should focus on quality and planning, not only speed.",
        ],
      },
      {
        heading: "How to prepare",
        paragraphs: [
          "Wear comfortable clothing, follow the clinic's pre-procedure instructions, and keep your schedule clear enough for a full treatment day and immediate aftercare discussion.",
        ],
      },
    ],
    cta:
      "Aura Clinic explains the expected treatment-day schedule in advance so patients can arrive feeling prepared and comfortable.",
  },
  {
    slug: "hair-transplant-before-and-after-photos-guide",
    title: "How to Read Hair Transplant Before and After Photos Critically",
    description:
      "Not all before and after photos tell the full story. Learn what to look for when comparing hair transplant examples online.",
    date: "2026-07-02",
    readTime: "6 min read",
    category: "Research",
    keywords: "hair transplant before and after photos, how to evaluate hair transplant results",
    intro:
      "Before and after galleries are useful, but they can also be misleading when lighting, styling, angles, and timeframes are unclear. Learning how to read these images critically can save patients from unrealistic expectations.",
    sections: [
      {
        heading: "What good example photos should show",
        bullets: [
          "Clear before state",
          "Consistent angle and lighting",
          "Visible hairline and crown detail where relevant",
          "A realistic timeframe after treatment",
        ],
      },
      {
        heading: "What can distort perception",
        paragraphs: [
          "Different hairstyles, hair fibres, strategic lighting, wet versus dry hair, and camera angle changes can all make results look better or worse than they really are.",
        ],
      },
      {
        heading: "A better patient mindset",
        paragraphs: [
          "Use photos as conversation starters, not guarantees. The best question is how your own pattern, donor area, and goals compare to the examples you are seeing.",
        ],
      },
    ],
    cta:
      "Aura Clinic discusses examples in context so patients can understand what is truly relevant to their own case.",
  },
  {
    slug: "is-batumi-good-for-hair-transplant",
    title: "Is Batumi a Good Place for a Hair Transplant?",
    description:
      "What international and regional patients look for when choosing Batumi for a hair transplant consultation or procedure.",
    date: "2026-07-03",
    readTime: "5 min read",
    category: "Travel",
    keywords: "is batumi good for hair transplant, hair transplant batumi georgia",
    intro:
      "Batumi is increasingly considered by patients looking for regional treatment options in Georgia. The right question is not only whether Batumi is popular, but whether the clinic you choose offers transparent planning, clear communication, and structured aftercare.",
    sections: [
      {
        heading: "Why some patients consider Batumi",
        paragraphs: [
          "Patients may value accessibility, a calmer environment, or the chance to combine treatment planning with straightforward regional travel.",
        ],
      },
      {
        heading: "What still matters most",
        bullets: [
          "Case suitability assessment",
          "Natural treatment planning",
          "Reliable communication",
          "Aftercare support",
          "Realistic discussion of density and limits",
        ],
      },
      {
        heading: "How to decide well",
        paragraphs: [
          "Choose the clinic that explains your case clearly and realistically. Destination appeal should support your decision, not replace proper medical planning.",
        ],
      },
    ],
    cta:
      "Aura Clinic in Batumi offers free online hair analysis so patients can understand their options before travelling.",
  },
  {
    slug: "hair-transplant-for-thin-hair",
    title: "Hair Transplant for Thin Hair: Can It Still Work?",
    description:
      "Patients with thin hair often wonder whether a transplant can still make a visible difference. Here is what matters most.",
    date: "2026-07-04",
    readTime: "6 min read",
    category: "Suitability",
    keywords: "hair transplant for thin hair, can thin hair be transplanted",
    intro:
      "Thin hair does not automatically rule out a transplant, but it does affect planning. Hair calibre, donor strength, scalp contrast, and density goals all become especially important when each graft has less natural visual bulk.",
    sections: [
      {
        heading: "Why hair calibre matters",
        paragraphs: [
          "Thicker hair often creates more visual coverage per graft. Finer hair can still be treated, but clinics need to plan expectations carefully and focus on strategic placement.",
        ],
      },
      {
        heading: "What clinics should evaluate",
        bullets: [
          "Donor density and stability",
          "Scalp-to-hair colour contrast",
          "Target area size",
          "Realistic density goals",
        ],
      },
      {
        heading: "What patients should keep in mind",
        paragraphs: [
          "A meaningful improvement is still possible in many thin-hair cases, but the best results come from honest planning rather than exaggerated promises.",
        ],
      },
    ],
    cta:
      "Aura Clinic evaluates thin-hair cases carefully so patients understand what kind of visual improvement is realistic for them.",
  },
  {
    slug: "hair-transplant-donor-area-healing",
    title: "Donor Area Healing After Hair Transplant: What Is Normal?",
    description:
      "A guide to donor area healing, tenderness, appearance changes, and when patients should contact the clinic.",
    date: "2026-07-05",
    readTime: "5 min read",
    category: "Recovery",
    keywords: "donor area healing after hair transplant, donor area recovery",
    intro:
      "Patients often focus on the implanted area, but donor area healing also matters for comfort and overall appearance. Understanding what the back and sides of the scalp may feel and look like after extraction can make recovery less stressful.",
    sections: [
      {
        heading: "What patients often notice",
        bullets: [
          "Tenderness or tightness",
          "Redness in the early days",
          "Small healing points after extraction",
          "Temporary sensitivity while washing",
        ],
      },
      {
        heading: "Why aftercare matters here too",
        paragraphs: [
          "The donor zone also needs gentle care and proper washing guidance. Good recovery is not only about the front result.",
        ],
      },
      {
        heading: "When to contact the clinic",
        paragraphs: [
          "If pain seems unusual, healing appears inconsistent, or something simply feels off, patients should contact the clinic directly rather than wait and worry.",
        ],
      },
    ],
    cta:
      "Aura Clinic provides aftercare support for both recipient and donor area healing so patients feel supported throughout recovery.",
  },
  {
    slug: "free-online-hair-analysis-guide",
    title: "Free Online Hair Analysis: What a Good Remote Consultation Should Cover",
    description:
      "A guide to what patients should expect from a free online hair analysis before deciding on a hair transplant clinic.",
    date: "2026-07-06",
    readTime: "6 min read",
    category: "Consultation",
    keywords: "free online hair analysis, online hair transplant consultation",
    intro:
      "A free online hair analysis is often the first step for patients comparing clinics from another city or country. The best remote consultations do more than quote a price. They help you understand your pattern, goals, suitability, and next steps.",
    sections: [
      {
        heading: "What the clinic should review",
        bullets: [
          "Front, top, side, and donor photos",
          "Your main concern and target area",
          "Hair loss severity",
          "Likely technique options",
          "Estimated graft range",
        ],
      },
      {
        heading: "What makes a remote analysis useful",
        paragraphs: [
          "It should feel educational, not rushed. A useful analysis explains what is realistic, what is uncertain from photos alone, and what questions still need an in-person review.",
        ],
      },
      {
        heading: "How patients can prepare",
        paragraphs: [
          "Send clear well-lit photos, avoid heavy styling products, and describe your main goal honestly. Better input leads to a more useful initial plan.",
        ],
      },
    ],
    cta:
      "Aura Clinic offers free online hair analysis so patients can get a realistic first assessment before travelling to Batumi.",
  },
  {
    slug: "hair-transplant-and-whatsapp-consultation",
    title: "Why WhatsApp Consultation Works Well for Hair Transplant Planning",
    description:
      "WhatsApp has become a popular first contact channel for hair transplant patients. Here is why it can be useful when used well.",
    date: "2026-07-07",
    readTime: "4 min read",
    category: "Consultation",
    keywords: "hair transplant whatsapp consultation, whatsapp clinic consultation",
    intro:
      "For international and regional patients, WhatsApp is often the easiest way to start a conversation with a clinic. It supports quick photo sharing, direct follow-up questions, and practical travel planning without forcing patients into a formal booking too early.",
    sections: [
      {
        heading: "Why patients like it",
        bullets: [
          "Fast photo sharing",
          "Easy follow-up questions",
          "Simple travel coordination",
          "Familiar app for international patients",
        ],
      },
      {
        heading: "What good use looks like",
        paragraphs: [
          "A good WhatsApp consultation should still be structured. Patients should receive clear next steps, realistic expectations, and a proper explanation of what can and cannot be judged remotely.",
        ],
      },
      {
        heading: "What to send first",
        paragraphs: [
          "Start with clear photos, your age range, target area, and main goal. This gives the clinic enough context to provide a meaningful first response.",
        ],
      },
    ],
    cta:
      "Aura Clinic welcomes WhatsApp consultation requests for patients who want a quick and practical first step before booking.",
  },
];

const activePosts = posts.slice(0, 30);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSection(section) {
  const paragraphs = (section.paragraphs || [])
    .map((text) => `<p>${escapeHtml(text)}</p>`)
    .join("\n");
  const bullets = (section.bullets || []).length
    ? `<ul>\n${section.bullets
        .map((item) => `  <li>${escapeHtml(item)}</li>`)
        .join("\n")}\n</ul>`
    : "";
  return `
    <section class="article-section">
      <h2>${escapeHtml(section.heading)}</h2>
      ${paragraphs}
      ${bullets}
    </section>
  `;
}

function renderHead(title, description, canonical, schemaType, schemaData) {
  return `  <meta charset="UTF-8" />
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500
    });
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18301236806"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} | Aura Clinic Batumi</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonical}" />
  <meta property="og:type" content="${schemaType}" />
  <meta property="og:site_name" content="Aura Clinic" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${escapeHtml(title)} | Aura Clinic Batumi" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${siteUrl}/media/media-hero.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)} | Aura Clinic Batumi" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${siteUrl}/media/media-hero.png" />
  <link rel="icon" type="image/svg+xml" href="aura-fav.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800&family=Noto+Sans+Georgian:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
  <style>
    .blog-shell {
      padding: clamp(2.5rem, 6vw, 4rem) 0;
    }
    .blog-hero {
      padding: clamp(3rem, 7vw, 5rem) 0 2rem;
      border-bottom: 1px solid var(--color-border);
      background:
        radial-gradient(circle at top, rgba(196, 204, 214, 0.10), transparent 36%),
        linear-gradient(180deg, rgba(30, 34, 40, 0.92), rgba(14, 16, 18, 1));
    }
    .blog-breadcrumbs,
    .article-meta {
      color: var(--color-text-muted);
      font-size: 0.92rem;
    }
    .blog-breadcrumbs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .blog-hero h1 {
      margin: 0 0 1rem;
      max-width: 16ch;
      font-size: clamp(2rem, 5vw, 3.5rem);
      line-height: 1.08;
    }
    .blog-hero p {
      max-width: 46rem;
      margin: 0;
      color: #d7dde7;
    }
    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.25rem;
      margin-top: 2rem;
    }
    .blog-card,
    .article-card,
    .cta-panel {
      background: rgba(30, 34, 40, 0.78);
      border: 1px solid var(--color-border);
      border-radius: 18px;
      box-shadow: var(--shadow);
    }
    .blog-card {
      padding: 1.35rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .blog-card:hover {
      text-decoration: none;
      border-color: rgba(196, 204, 214, 0.45);
      transform: translateY(-1px);
    }
    .blog-card__meta {
      color: var(--color-text-muted);
      font-size: 0.84rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .blog-card h2,
    .blog-card h3 {
      margin: 0;
      color: #fff;
      font-size: 1.18rem;
      line-height: 1.35;
    }
    .blog-card p {
      margin: 0;
      color: #d9dfe7;
    }
    .blog-card__link {
      margin-top: auto;
      font-weight: 700;
    }
    .article-wrap {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 1.5rem;
      max-width: 52rem;
      margin: 0 auto;
    }
    .article-card {
      padding: clamp(1.4rem, 3vw, 2.2rem);
    }
    .article-card p,
    .article-card li {
      color: #d8dee7;
    }
    .article-card h2 {
      margin-top: 0;
      font-size: clamp(1.3rem, 3vw, 1.7rem);
    }
    .article-card ul {
      padding-left: 1.2rem;
    }
    .article-card li + li {
      margin-top: 0.5rem;
    }
    .article-intro {
      font-size: 1.05rem;
    }
    .cta-panel {
      padding: 1.4rem;
    }
    .cta-panel h2 {
      margin-top: 0;
    }
    .article-nav {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      margin-top: 1rem;
    }
    .article-nav a {
      flex: 1 1 0;
    }
    @media (max-width: 720px) {
      .article-nav {
        flex-direction: column;
      }
    }
  </style>
  <script type="application/ld+json">
${JSON.stringify(schemaData, null, 2)}
  </script>`;
}

function renderHeader() {
  return `<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a href="index.html" class="brand">
      <img src="aura-logo.svg" alt="Aura Clinic" width="180" height="48" class="brand-logo" />
    </a>
    <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="main-nav">
      <span class="nav-toggle-bar" aria-hidden="true"></span>
      <span class="nav-toggle-bar" aria-hidden="true"></span>
      <span class="nav-toggle-bar" aria-hidden="true"></span>
    </button>
    <nav class="nav-main" id="main-nav" aria-label="Main navigation">
      <a href="index.html" data-i18n="nav.home">Home</a>
      <a href="index.html#services" data-i18n="nav.services">Services</a>
      <a href="index.html#about" data-i18n="nav.about">About</a>
      <a href="index.html#analysis" class="nav-link--highlight" data-i18n="nav.analysis">Analysis</a>
      <a href="preview.html" data-i18n="nav.preview">AI Hair Preview</a>
      <a href="index.html#contact" data-i18n="nav.contact">Contact</a>
    </nav>
    <div class="lang-switcher" role="group" aria-label="Language">
      <button type="button" class="lang-btn is-active" data-lang="en" aria-pressed="true">EN</button>
      <button type="button" class="lang-btn" data-lang="ka" aria-pressed="false">KA</button>
      <button type="button" class="lang-btn" data-lang="tr" aria-pressed="false">TR</button>
    </div>
  </div>
  <div class="nav-backdrop" id="nav-backdrop" aria-hidden="true"></div>
</header>`;
}

function renderFooter() {
  return `<div id="cookie-banner" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie notice" hidden>
  <div class="cookie-banner-inner container">
    <p class="cookie-banner-text">
      <span data-i18n="cookie.bannerPart1">We only use technically necessary features and — with your consent — optional analytics. More in our </span>
      <a href="cookies.html" data-i18n="cookie.bannerLink">cookie policy</a><span data-i18n="cookie.bannerPart2">.</span>
    </p>
    <button type="button" class="btn btn-primary cookie-banner-btn" id="cookie-accept" data-i18n="cookie.accept">OK</button>
  </div>
</div>

<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <img src="aura-logo.svg" alt="" width="160" height="44" class="footer-logo brand-logo" />
      <p class="footer-tagline" data-i18n="footer.tagline">Premium aesthetics &amp; hair restoration — Batumi.</p>
    </div>
    <div class="footer-col">
      <p class="footer-heading" data-i18n="footer.colNav">Navigation</p>
      <ul class="footer-links">
        <li><a href="index.html#services" data-i18n="nav.services">Services</a></li>
        <li><a href="index.html#about" data-i18n="nav.about">About</a></li>
        <li><a href="preview.html" data-i18n="nav.preview">AI Hair Preview</a></li>
        <li><a href="blog.html" data-i18n="nav.blog">Blog</a></li>
        <li><a href="index.html#analysis" data-i18n="nav.analysis">Analysis</a></li>
        <li><a href="index.html#contact" data-i18n="nav.contact">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-heading" data-i18n="footer.colLegal">Legal</p>
      <ul class="footer-links">
        <li><a href="impressum.html" data-i18n="footer.linkLegal">Legal notice</a></li>
        <li><a href="datenschutz.html" data-i18n="footer.linkPrivacy">Privacy policy</a></li>
        <li><a href="agb.html" data-i18n="footer.linkTerms">Terms of service</a></li>
        <li><a href="cookies.html" data-i18n="footer.linkCookies">Cookies</a></li>
      </ul>
      <p class="footer-mail"><a href="mailto:info@auraclinicge.com">info@auraclinicge.com</a></p>
    </div>
  </div>
  <div class="container footer-bottom">
    <p class="footer-copy"><span data-i18n="footer.rights">© Aura Clinic. All rights reserved.</span></p>
  </div>
</footer>

<a class="fab-whatsapp" id="fab-whatsapp" href="https://wa.me/${phoneE164}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
  <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<script src="js/site-config.js"></script>
<script src="js/google-ads.js"></script>
<script src="js/whatsapp-links.js"></script>
<script src="js/meta-pixel.js"></script>
<script src="js/i18n-data.js"></script>
<script src="js/site-chrome.js"></script>
<script>
  window.AURA_CHROME.init({ metaPageName: "Blog" });
</script>`;
}

function renderArticle(post, previousPost, nextPost) {
  const canonical = `${siteUrl}/${post.slug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${siteUrl}/media/media-hero.png`,
    datePublished: post.date,
    dateModified: today,
    author: {
      "@type": "Organization",
      name: "Aura Clinic Team",
    },
    publisher: {
      "@type": "MedicalClinic",
      name: "Aura Clinic",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/aura-logo.svg`,
      },
    },
    mainEntityOfPage: canonical,
    keywords: post.keywords,
    articleSection: post.category,
    about: ["Hair transplant", "Hair restoration", "Batumi", "Georgia"],
  };

  const sectionHtml = post.sections.map(renderSection).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
${renderHead(post.title, post.description, canonical, "article", schema)}
</head>
<body>
${renderHeader()}
<main>
  <section class="blog-hero">
    <div class="container">
      <div class="blog-breadcrumbs">
        <a href="index.html" data-i18n="nav.home">Home</a>
        <span>/</span>
        <a href="blog.html" data-i18n="nav.blog">Blog</a>
        <span>/</span>
        <span>${escapeHtml(post.category)}</span>
      </div>
      <h1>${escapeHtml(post.title)}</h1>
      <p>${escapeHtml(post.description)}</p>
      <p class="article-meta">${escapeHtml(post.date)} · ${escapeHtml(post.readTime)} · Aura Clinic Batumi · <span data-i18n="blog.articleNote">Article content is currently available in English.</span></p>
    </div>
  </section>

  <section class="blog-shell">
    <div class="container">
      <div class="article-wrap">
        <article class="article-card">
          <p class="article-intro">${escapeHtml(post.intro)}</p>
          ${sectionHtml}
        </article>
        <section class="cta-panel">
          <h2 data-i18n="blog.ctaTitle">Need a personalised answer?</h2>
          <p>${escapeHtml(post.cta)}</p>
          <p data-i18n="blog.ctaLead">Message Aura Clinic on WhatsApp or request your free online hair analysis before planning treatment in Batumi.</p>
          <p class="contact-actions">
            <a href="https://wa.me/${phoneE164}" class="btn btn-primary btn--touch" data-i18n="blog.chatWhatsApp">Chat on WhatsApp</a>
            <a href="preview.html" class="btn btn-ghost btn--touch" data-i18n="blog.tryPreview">Try AI preview</a>
          </p>
          <p class="article-meta">Aura Clinic · Batumi, Georgia · ${phoneDisplay}</p>
        </section>
        <nav class="article-nav" aria-label="Article navigation">
          ${
            previousPost
              ? `<a href="${previousPost.slug}.html" class="btn btn-ghost btn--touch">Previous: ${escapeHtml(previousPost.title)}</a>`
              : `<a href="blog.html" class="btn btn-ghost btn--touch" data-i18n="blog.backToBlog">Back to blog</a>`
          }
          ${
            nextPost
              ? `<a href="${nextPost.slug}.html" class="btn btn-primary btn--touch">Next: ${escapeHtml(nextPost.title)}</a>`
              : `<a href="blog.html" class="btn btn-primary btn--touch" data-i18n="blog.seeAllArticles">See all articles</a>`
          }
        </nav>
      </div>
    </div>
  </section>
</main>
${renderFooter()}
</body>
</html>`;
}

function renderBlogIndex() {
  const canonical = `${siteUrl}/blog.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Aura Clinic Blog",
    description:
      "SEO-focused hair transplant guides from Aura Clinic in Batumi covering FUE, DHI, costs, recovery, graft planning, and consultation tips.",
    url: canonical,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: activePosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/${post.slug}.html`,
        name: post.title,
      })),
    },
  };

  const cards = activePosts
    .map(
      (post) => `        <a class="blog-card" href="${post.slug}.html">
          <div class="blog-card__meta">${escapeHtml(post.category)} · ${escapeHtml(post.readTime)}</div>
          <h2>${escapeHtml(post.title)}</h2>
          <p>${escapeHtml(post.description)}</p>
          <span class="blog-card__link" data-i18n="blog.readArticle">Read article</span>
        </a>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
${renderHead(
  "Hair Transplant Blog",
  "Explore Aura Clinic's English blog about hair transplant costs, FUE vs DHI, recovery, graft planning, beard transplant, and Batumi treatment guides.",
  canonical,
  "website",
  schema
)}
</head>
<body>
${renderHeader()}
<main>
  <section class="blog-hero">
    <div class="container">
      <div class="blog-breadcrumbs">
        <a href="index.html" data-i18n="nav.home">Home</a>
        <span>/</span>
        <span data-i18n="nav.blog">Blog</span>
      </div>
      <h1 data-i18n="blog.heroTitle">Hair transplant blog for real patient questions</h1>
      <p data-i18n="blog.heroLead">
        Explore guides about FUE vs DHI, Batumi hair transplant cost, graft counts, recovery stages, donor area management, and how to choose a clinic without falling for hype.
      </p>
    </div>
  </section>

  <section class="blog-shell">
    <div class="container">
      <header class="section-head">
        <h2 data-i18n="blog.latestTitle">Latest articles</h2>
        <p class="section-sub" data-i18n="blog.latestSub">
          SEO-focused content for patients who want useful answers before booking a consultation.
        </p>
      </header>
      <div class="blog-grid">
${cards}
      </div>
    </div>
  </section>
</main>
${renderFooter()}
</body>
</html>`;
}

function renderSitemap() {
  const urls = [
    { loc: `${siteUrl}/`, freq: "weekly", priority: "1.0" },
    { loc: `${siteUrl}/blog.html`, freq: "weekly", priority: "0.95" },
    { loc: `${siteUrl}/preview.html`, freq: "weekly", priority: "0.9" },
    ...activePosts.map((post) => ({
      loc: `${siteUrl}/${post.slug}.html`,
      freq: "monthly",
      priority: "0.8",
    })),
    { loc: `${siteUrl}/impressum.html`, freq: "yearly", priority: "0.3" },
    { loc: `${siteUrl}/datenschutz.html`, freq: "yearly", priority: "0.3" },
    { loc: `${siteUrl}/agb.html`, freq: "yearly", priority: "0.3" },
    { loc: `${siteUrl}/cookies.html`, freq: "yearly", priority: "0.2" },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.freq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

function writeFile(relativePath, content) {
  fs.writeFileSync(path.join(rootDir, relativePath), content, "utf8");
}

writeFile("blog.html", renderBlogIndex());

posts.slice(30).forEach((post) => {
  const filePath = path.join(rootDir, `${post.slug}.html`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
});

activePosts.forEach((post, index) => {
  writeFile(
    `${post.slug}.html`,
    renderArticle(post, activePosts[index - 1], activePosts[index + 1])
  );
});

writeFile("sitemap.xml", renderSitemap());

console.log(`Generated blog.html and ${activePosts.length} article pages.`);
