const standardPageSizes = {
  "4A0": [4767.87, 6740.79],
  "2A0": [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  A7: [209.76, 297.64],
  A8: [147.4, 209.76],
  A9: [104.88, 147.4],
  A10: [73.7, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.9, 708.66],
  B6: [354.33, 498.9],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.8, 3458.27],
  RA1: [1729.13, 2437.8],
  RA2: [1218.9, 1729.13],
  RA3: [864.57, 1218.9],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.8, 907.09],
  EXECUTIVE: [521.86, 756.0],
  FOLIO: [612.0, 936.0],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
  TABLOID: [792.0, 1224.0],
};

function toDataURL(src, outputFormat) {
  return new Promise((res, rej) => {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      var canvas = document.createElement("CANVAS");
      var ctx = canvas.getContext("2d");
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      var dataURL = canvas.toDataURL(outputFormat);
      res(dataURL);
    };
    img.onerror = rej;
    img.src = src;
  });
}

function SubconsciousSelfNumberpdf(lowercaseCharacters) {
  const values = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 1,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    o: 6,
    p: 7,
    q: 8,
    r: 9,
    s: 1,
    t: 2,
    u: 3,
    v: 4,
    w: 5,
    x: 6,
    y: 7,
    z: 8,
  };

  const uniqueValues = Array.from(
    new Set(lowercaseCharacters.map((char) => values[char]))
  );
  
  const checklist = [];
  for (let i = 1; i <= 9; i++) {
    const checkValue = uniqueValues.includes(i) ? "Yes" : "No";
    checklist.push(`Number ${i}  - ${checkValue}`);
  }

  return checklist;
}

const buildPdfContent = async () => {
  const buildHeartDesireNumbersOfName = async (nameArr, makeImageUrlOfChar) => {
    const buildForCharacter = async (char) => {
      const imageUrl = makeImageUrlOfChar(char);

      return {
        alignment: "center",
        fit: [30, 50],
        image: await toDataURL(imageUrl),
      };
    };

    const TOTAL_CHARACTER_IN_1_LINE = 20;
    const totalChunks = Math.ceil(nameArr.length / TOTAL_CHARACTER_IN_1_LINE);
    const result = [];

    for (let i = 0; i < totalChunks; i++) {
      const start = i * TOTAL_CHARACTER_IN_1_LINE;
      const end = (i + 1) * TOTAL_CHARACTER_IN_1_LINE;
      const nameChunk = nameArr.slice(start, end);

      const names = await Promise.all(nameChunk.map(buildForCharacter));
      const transformNames =
        names.length === TOTAL_CHARACTER_IN_1_LINE
          ? names
          : names.concat(
              Array(TOTAL_CHARACTER_IN_1_LINE - names.length).fill(" ")
            );

      result.push(transformNames);
    }

    return {
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        paddingLeft: () => 0,
        paddingRight: () => 0,
        paddingTop: () => 0,
        paddingBottom: () => 0,
        fillColor: () => "#f7f2e6",
      },
      table: {
        headerRows: 0,
        widths: Array(TOTAL_CHARACTER_IN_1_LINE)
          .fill()
          .map(() => "*"),
        body: result,
      },
    };
  };

  return [
    {
      stack: [
        {
          image: await toDataURL("/img/NUMEROLOGY-REPORT-pdf-resized.png"),
          fit: standardPageSizes.A4,
          margin: [-40, -40, -40, -40],
        },

        {
          table: {
            widths: [standardPageSizes.A4[0]],
            body: [
              [
                {
                  text: "Your Name: " + fullname,
                  fontSize: 24,
                  alignment: "center",
                  color: "white",
                  bold: true,
                },
              ],
            ],
          },
          absolutePosition: {
            y: standardPageSizes.A4[1] / 2 - 225,
          },
          layout: "noBorders",
        },

        {
          table: {
            widths: [standardPageSizes.A4[0]],
            body: [
              [
                {
                  text: nummain,
                  fontSize: 108,
                  bold: true,
                  alignment: "center",
                  color: "black",
                },
              ],
            ],
          },
          absolutePosition: {
            y: standardPageSizes.A4[1] / 2 - 60,
          },
          layout: "noBorders",
        },
      ],
    },

    {
      text: "Birth Day Number",
      style: "header",
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: "What does the day you were born mean?",
      style: "subheader",
    },
    {
      text: " What is the difference between the Life Path Number and the Birth Day Number? As these two things are so closely related, it makes perfect sense to wonder what, if any, difference there may be between the two. Simply put, your birth day number, while still almost always reduced to a single digit (with the exceptions of 11 and 22) is often the sum of two digits. It does not take into account the month or year like the Life Path Number. Someone with a birth day number of 6, for example, could have been born on the 6th, 15th, or 24th of the month and each digit that goes into the number used to calculate your birth day number is significant. For this reason, we will examine all days from 1 to 31 broken down by birth day number and specific details regarding the actual day. ",
      style: "small",
    },
    {
      text: "Your Birth Day Number " + day,
      style: "subheader",
    },
    {
      text: BirthdayNumber["num" + day],
      style: "small",
    },
    {
      text: "Your Life Path",
      style: "header",
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: `Numerology is an ancient art system based on analyzing and deciphering the numbers related to a person's date of birth. In Numerology, the core number, also known as the Life Path Number, Birth Path Number, or Destiny Number, is one of the most important concepts and plays a central role in each individual's Numerology chart.

      The Life Path Number reflects a crucial and unchangeable aspect of your life. It conveys information about your life's journey, the opportunities and challenges you will encounter, as well as the physical and psychic environment you attract into your life.
      
      To calculate the Life Path Number, you need to take your date of birth and add up the digits of the day, month, and year. The result is a single-digit number ranging from 1 to 9 or Master Numbers (11, 22, 33, ...). Master Numbers are considered special and carry powerful energies and heightened potential.
      
      The Life Path Number provides an overview of your personality, qualities, and potentials. It shows the goals and direction in your life, as well as a deeper insight into your spiritual and intellectual aspects.
      
      In addition to the Life Path Number, Numerology includes various other elements and calculation methods, such as the Expression Number, Soul Urge Number, Personal Year Number, and more. Each element has its own significance and, together, they form a comprehensive picture of your life's path and potential.
      
      Numerology is not magic or fortune-telling but rather a tool to help you understand yourself better and discover hidden possibilities. It can also guide you towards a positive life direction and better development in essential areas of life.`,
      style: "small",
    },
    {
      text: "Your Life Path Number: " + nummain,
      style: `subheader`,
    },
    {
      text: mainNumber['num' + nummain],
      style: "small",
    },
    {
      text: "Challenge Numbers",
      style: "header",
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: `"The Challenge Numbers" in Numerology are an important aspect of analyzing and understanding an individual's life and personality. They refer to the challenges that a person may encounter in life and how they can overcome these challenges to achieve growth and progress.`,
      style: ["small", "quote", "smallBold"],
    },
    {
      text: ` `,
      style: "small",
    },
    {
      text: [
        "According to Numerology, Challenge Numbers are calculated based on a person's date of birth and other factors. There are a total of four Challenge Numbers, each representing a different aspect of a person's life. \n",

        {
          text: "First Challenge: ",
          style: "smallBold",
        },
        "Represents the difficulties and challenges in self-expression, exploration, and personal development. Individuals with the First Challenge often have to overcome self-doubt and fear to discover their potential.\n",
        {
          text: "Second Challenge: ",
          style: "smallBold",
        },
        "Represents the difficulties and challenges in building and maintaining relationships. Individuals with the Second Challenge often have to overcome self-doubt and communication difficulties to create balance and harmony in relationships.\n",
        {
          text: "Third Challenge: ",
          style: "smallBold",
        },
        "Represents the difficulties and challenges in expressing creativity and personal freedom. Individuals with the Third Challenge often have to overcome self-criticism and difficulties in expressing themselves and their ideas.\n",
        {
          text: "Fourth Challenge: ",
          style: "smallBold",
        },
        "Represents the difficulties and challenges in building a solid and stable foundation in life. Individuals with the Fourth Challenge often have to overcome difficulties in organizing and managing their lives, and they have to work hard to achieve success.\n",
      ],
      style: "small",
    },
    {
      text: `Your Challenge Numbers`,
      style: "subheader",
    },
    {
      text: `First Challenge: Number ` + numday,
      style: `smallBold`,
    },
    {
      text: FirstChallenge["num" + numday],
      style: "small",
    },
    {
      text: `Second Challenge: Number ` + nummonth,
      style: `smallBold`,
    },
    {
      text: SecondChallenge["num" + nummonth],
      style: "small",
    },
    {
      text: `Third Challenge: Number ` + numyear,
      style: `smallBold`,
    },
    {
      text: ThirdChallenge["num" + numyear],
      style: "small",
    },
    {
      text: `Fourt Challenge: Number ` + nummain,
      style: `smallBold`,
    },
    {
      text: FourthChallenge["num" + nummain],
      style: "small",
    },

    {
      text: `The Period Cycle Numbers`,
      style: "header",
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: `Your Period Cycle Transition Points`,
      style: "subheader",
    },
    {
      text: `The first period mimics the expositive and rising parts of the story and lasts anywhere from 25 to 34 years. The second marks significant turning points - “adult” conflicts and problems that need to be resolved and most often carry significant change in their wake. This period generally lasts about as long as the first. The third period has a settling effect wherein the results of the climactic chapter (or chapters) in our lives manifest. The length of this period varies depending on the total lifespan of the individual.
            
                  We can also look at it this way: the first period is a time of self-discovery that begins with all things being new. We spend years learning about ourselves, about the world, it's high points and its pitfalls. We lose our childhood innocence and discover some harsh realities about the world and what lies ahead. The second cycle is where we take everything that we've learned in the first and find useful application for it. We approach everything with a healthy dose of conventional wisdom and common sense mingled with a glimmer of intuition and these things culminate in the actualization of the Self. We learn who we are, often become set in our ways and journey onward into the final period. This is where our true nature takes root and clearly defines the men and women we were meant to become. At this point, the hard part is over, now it's just a matter of taking responsibility for those things we know about ourselves.`,
      style: "small",
    },
    {
      text: `Finding Your Period Cycle Numbers`,
      style: `subheader`,
    },
    {
      text: `Your first Period Cycle Number is found by reducing your month of birth to a single digit or master number, so if your birth month is November, your first period number is 11. If it's October, your number is 1, etc.
                    Your second Period Cycle Number is calculated using your day of birth, reduced to one digit or a master number. If you were born on the 29th, your number is 11. If you were born on the 16th, your number is 7, and so on.
                    
                    Your third Period Cycle Number is calculated using the four-digit year of your birth, again reduced to a single digit or master number. 2009 would be 11 (2+0+0+9 = 11), 1993 would be 22 (1+9+9+3 = 22), 1980 would be 9 (1+9+8+0 = 18; 1+8 = 9), and so on.`,
      style: `small`,
    },
    {
      text: `Your First Period Cycle ` + numday,
      style: `smallBold`,
    },
    {
      text: FirstPeriodCycle["num" + numday],
      style: "small",
    },
    {
      text: `Your Second Period Cycle ` + nummonth,
      style: `smallBold`,
    },
    {
      text: SecondPeriodCycle["num" + nummonth],
      style: "small",
    },

    {
      text: `Your Third Period Cycle ` + numyear,
      style: `smallBold`,
    },
    {
      text: ThirdPeriodCycle["num" + numday],
      style: "small",
    },
    {
      text: "Expression Number",
      style: "header",
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: `Why Your Name Matters`,
      style: `subheader`,
    },
    {
      text: `People often wonder how past lives weigh in with Numerology and the answer is simply that they don't. In my belief system, the soul takes many journeys and chronicles its experiences as it keeps reappearing over and over in different places, maybe even on different planets.
            
                    Whether you believe in things like reincarnation or not is up to you but don't get hung up on the idea that you have to know about your past life to understand this one. Numerology deals with the here and now. Whatever you believe about your past lives (or lack thereof) has no bearing on the way you read your numbers for THIS lifetime. If this isn't your soul's first trip through the cosmos, your numbers in a past life would be radically different than in this one.
                    
                    The Universe is nothing more than a huge expression of energy. There is nothing truly solid. If there was, physics tells us that it would have the capability of destroying the planet with its absolute adherence to gravity. So as we are part of the Universe, so we are also expressions of energy. The moment of our birth is significant. We receive our names from our parents whose energy also flows through us and things start to take shape.
                    
                    One of the first things that life confers upon is a name. The name we receive is a reflection of everything we are, everything we will do, everything that makes us “us” in the first place. These things exist in a place that transcends time and space and our names tell us things about ourselves that know no temporal boundaries. Yes, we have free will, therefore our futures are not set. Our numbers, however, can help us tremendously in terms of how we exercise our free will and they can assist us in making good choices. The first number we are going to examine in reference to our name is the Expression Number.
                    
                    Your Expression Number says quite a bit about your abilities and talents along with your imperfections and shortcomings. All of these were present at the time of your birth and your name reflects them. It is NOT an accident that you have the name that you do.
                    
                    The Expression number reveals the talents, abilities, and shortcomings that were with you when you entered your human body. Your name, and the numbers derived from it, reveal your development, as well as the talents and issues you will be working with during this life.
                    
                    Finding Your Expression Number
                    
                    Every letter in your name has a numeric value. Some will say that you need only calculate your first name but I say that's a fallacy. Your surname (“last” name) speaks much more of your individual history and, when computed along with your first name, can provide a much clearer picture of the expression of energy that currently exists as “you.” If you have a middle name, calculate that, too. Leave no stone unturned nor any piece of yourself unexamined. Calculate each letter in order. Do NOT reduce each part of your name separately. Come up with a single sum for the whole thing first.
                    
                    In order to find your Expression Number, refer to this chart:`,
      style: `small`,
    },

    {
      image: await toDataURL("/img/word-chart.png"),
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: `Your Expression Number`,
      style: `subheader`,
    },

    {
      text: "Your Name: " + fullname,
      style: [`smallBold`, "small"],
    },
    {
      text: "The total value of your name: " + ExpressionNumber(),
      style: "smallBold",
    },
    {
      text: "Expression Number Your Name: " + caculateSum(ExpressionNumber()),
      style: `smallBold`,
    },
    {
      text:
        "Expression Number Your Name: " +
        FourthChallenge["num" + caculateSum(ExpressionNumber())],
      style: "small",
    },
    {
      text: `Heart's Desire Number`,
      style: `header`,
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: `What Does Your Heart's Desire Number Mean?`,
      style: `subheader`,
    },
    {
      text: `The Heart's Desire Number (also known as the The Soul's Urge or, simply, The Soul Urge) represents precisely what it implies. It speaks of the thing or things you yearn for the most. These are the dreams of your heart, the ultimate ideals for which you long and meditate upon. It also tells of the thing or things that motivate you and reveals the true intentions behind numerous actions. This number has a strong influence on everything you do in your life. This includes, but is not limited to, your home and work environments, the company you keep, your lifestyle choices and your tastes. Your Heart's Desire number tells much about your soul's journey in its present incarnation.

        Your heart's desire is calculated using the vowels in your name and, in this instance, middle names count. What ever name you were given at birth is what you are going to use to find your Heart's Desire Number. The vowels in question are A, E, I, O, U, and (sometimes) Y. The “sometimes Y” rule is important in this calculation.
        
        Vowels vs. Consonants
        
        Without diverting too far into a lesson in English phonics, vowel sounds are those phonetic tones that complete syllables. Where there's a syllable, there's a vowel. In words like “my” or “cry” it is easy to tell that the Y functions as a vowel. What many people don't know is that it is also a vowel in any word where it supplies the vowel sound in the syllable. That also makes Y a vowel in words like “marry,” “carry” “very” and “sorry.” If your name is something like Karyn, Bryan, Gary or Yvonne, you want to count the Y as a vowel. It is not a vowel in words like “year,” “yes,” “yawn” or “yank” because there is at least one vowel present already and its sound completes a syllable.
        
        Another way to determine vowels from consonants is in the resonance of the letter. Vowels have a more drawn-out sound to them like “ayyy” or “ahhh.” They also mimic each-other in some instances. “Ahhh” for example can be represented by an A or an O. “Eee” can be represented by an E or an I. Consonants have more defined tones and are more sharp. This is true even of consonants like C that have both hard and soft pronunciations (“sss” like in “ice” and “kuh” as in “cream”).
        
        I thought it important to make that brief diversion since there are some people who have never had those concepts explained to them, and also because not everyone speaks English as a native language. Since this guide assumes use of the English language, understanding the basics is essential for doing accurate calculations.`,
      style: `small`,
    },
    {
      text: `Calculating Your Heart's Desire Number`,
      style: `subheader`,
    },
    {
      text: `The main numerology page contains a chart that shows the numerical values of each letter in the English alphabet. Since we are only dealing with six letters in this chapter, I have listed the numerical values of the vowels for you. They are as follows:`,
      style: `small`,
    },
    {
      ul: [`A = 1`, `E = 5`, `I = 9`, `O = 6`, `U = 3`, `Y = 7`],
    },
    {
      text: ` `,
      style: `small`,
    },
    {
      text:
        `Heart's Desire Number: ` +
        caculateSum(HeartsDesireNumber(lowercaseCharacters)),
      style: "smallBold",
    },
    {
      text:
        `What does an Soul Urge Number of ` +
        caculateSum(HeartsDesireNumber(lowercaseCharacters)) +
        ` mean?`,
      style: `small`,
    },

    await buildHeartDesireNumbersOfName(lowercaseCharacters, (character) => {
      const isVowel =
        character !== "u" &&
        character !== "a" &&
        character !== "o" &&
        character !== "i" &&
        character !== "y" &&
        character !== "e";

      return `/img/${character}${isVowel ? 0 : 2}.png`;
    }),
    {
      text: " ",
      style: "small",
    },

    {
      text: `You love learning and gaining knowledge in every area possible. You have a remarkable mind and an ability to understand things on a level that is far deeper than average. You are extremely analytical and you know how to find the information you need to deepen your understanding of things. You aren't much for baseless belief. You have trouble believing in anything that isn't observable or tangible. This makes it difficult for you to extend trust. You can be very rigid and impersonal with people which can be damaging in relationships. Sevens have a hard time letting their feelings show. Feelings are impractical, after all.

        All of these things have a tendency to make you somewhat withdrawn. Your task will be to consciously strive to form meaningful relationships with people, even if it comes down to only a few or even one. You must teach yourself to be vulnerable in a way that allows you to maintain your sense of self as well as your independent spirit. This will not be easy but learning how to do it will have immeasurable benefits.`,
      style: `small`,
    },

    {
      text: `Personality Number`,
      style: `header`,
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: `What Does Your Personlaity Number Mean?`,
      style: "subheader",
    },
    {
      text: `For numerological purposes, the Personality and Minor Personality Numbers share the same interpretations, but the two are rarely one and the same. The two are often referred to as the Outer Personality Number and the Minor Personality Number. The two differ in the letters that are used to calculate them.

        While the Heart's Desire Numbers deal with vowels, the Personality Numbers deal with consonants. The calculations are similar in that the Outer Personality Number is calculated using the consonants in your given name – the name you were given at birth, like the Heart's Desire Number. Your Minor Personality Number uses the consonants in your nickname, the name you use to introduce yourself in casual situations, just like the Minor Heart's Desire Number.
        
        Your Outer Personality number speaks to the qualities and attributes you possess that you are comfortable sharing with others. This is the public You. Your Minor Personality Number speaks of those things you keep to yourself or only share with those you love and trust. This is the private You
        
        Your Personality Numbers also speak of how others perceive you. The things you keep hidden may be more visible than you think they are so pay close attention to the Minor number and see if the private you might be sneaking into public view.`,
      style: `small`,
    },
    {
      text: `Personality Number: ` + PersonalityNumber(),
      style: `smallBold`,
    },
    {
      text:
        `What does a Personality Number of ` + PersonalityNumber() + ` mean?`,
      style: `smallBold`,
    },

    await buildHeartDesireNumbersOfName(lowercaseCharacters, (character) => {
      const isVowelExceptY =
        character !== "u" &&
        character !== "a" &&
        character !== "o" &&
        character !== "i" &&
        character !== "e";
      return `/img/${character}${isVowelExceptY ? 1 : 0}.png`;
    }),
    {
      text: `Your sense of inner strength is considerable but beware how that is perceived by others. You may not even know just how much influence your actions and personality can have but you hold within your grasp the ability to either build up or tear down with your words and actions. This is true in all your dealings with people from simple business transactions to serious relationships with a significant other, spouse, children or extended family. You have a tendency to be generous but you also have the tendency to size up a person's situation, attitude and trustworthiness before deciding to help them.

        Be mindful of your appearance. Dress to impress. The right wardrobe can have a distinct balancing effect on your ability to command various situations and parts of your life. Work on being more approachable and learn to accept other people's tendency to defer the difficult stuff to you. They do it because they know you can handle things that they cannot. Your sense of confidence can detract from that of others so be careful not to inadvertently chip away at other people's self-esteem. Commit to working within your own boundaries and recognize that yours are likely broader than those of the next person. Recognize also that this is okay and know when to step back and give others the opportunity to stretch and grow. You'll be more comfortable around them if they are allowed to do that in front of you.`,
      style: `small`,
    },
    {
      text: `Karmic Lesson Numbers`,
      stle: `header`,
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: `The Opposing Forces in Your Life`,
      style: `subheader`,
    },
    {
      text: `In previous chapters, we have looked at Numerology from the standpoint of concrete, determinable and observable areas of one's character. Going forward, things become a bit more governed by metaphysics and inner mysteries. Instead of calculating to find information based on simpler areas like your birth date, we are going to examine areas that may or may not be obvious to the individual.

        Think about it this way: have you ever received a gift that you didn't know you wanted until you were in possession of it but then realized how well it fit into your life? Have you ever tasted food and wondered, “Why did I never try this before? It's delicious!” The next set of calculations spring from the premise that there are things about ourselves that we don't know yet. Some people may be put off by the idea of eating sushi but once they try it they can't get enough. It stands to reason that they always liked it but never knew it until it became something they experienced.
        
        So it is with the next set of calculations: they are all about discovering things our minds and our souls already know but with which our experience has not yet caught up. Now just a word of caution: not everything has a pleasurable outcome. There are some things that we think we just don't want to know. The problem, however, is that those things are still part of us no matter how off-putting they may be. Anyone who finds him or herself on a spiritual journey must realize that it is neither healthy nor beneficial to run from or hide from the darker aspects of our nature. The more we know about them, the more complete we become as spiritual beings, so fear not! There is much to learn and doing so will make us better individuals in the long run.`,
      style: `small`,
    },
    {
      text: `The Karmic Lessons`,
      style: `subheader`,
    },
    {
      text: `We enter into our current incarnation with things that work in our favor and those that work against us. We all have strengths but we also have weaknesses. It is important not to forsake examining one to cultivate the other (or worse, to overshadow the other). Karmic Lessons deal primarily with our areas of weakness. The purpose of exploring them is finding the way to see them and interact with them in a productive manner.

        As has been previously explained, each letter in our names has its own corresponding number. Certain numbers repeat, some appear only once, some do not appear at all. Karmic Lessons are determined by the numbers that do NOT present in your name. Missing numbers = Karmic Lessons. If a number repeats at least once, that number is a Karmic Strength or “Hidden Passion.” There is an entire other area to examine when dealing with Hidden Passions so, for the time being, we will simply focus on the concept of Strength.
        
        The letters in your name and their corresponding numbers point to the various talents and abilities that each of us possesses. Think of these letters and numbers as tools in a box. Not every tool will be in your box; you are required to work with the ones at your disposal. Letters and numbers that are missing represent tools that are not available for you to use. They make their way into your box by way of experience and can take a lifetime (or longer) to fully master.
        
        Those people who have three or more numbers missing from their Karmic Lesson Chart would do well to heed this advice: your focus needs to be on what you CAN do, not what you cannot. The cannots will take care of themselves over time. You need to understand also that missing three or more numbers almost always denotes at least one period in your life where you will only find success or fulfillment through adversity. You will have to try harder than average to be happy but, in the end, you will have a greater appreciation for things many other people take for granted.`,
      style: `small`,
    },
    {
      text: `Your Karmic Lessons: ` + nummain,
      style: `subheader`,
    },
    {
      text: YourKarmicLessonsContent["num" + nummain],
      style: "small",
    },

    {
      text: `Subconscious Self Number`,
      style: `header`,
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: `Your confidence and competence!`,
      style: `subheader`,
    },
    {
      text: `The Subconscious Self reveals the level of confidence you hold in yourself: your level of competence, your knowledge of your own capabilities and your ability to think and act under pressure or in instances where things occur without warning. It shows how sharp an ability you have to think on your feet and how well you assess and manage a variety of situations.

    Your Subconscious self is directly related to your Karmic Lesson chart wherein the possibility exists of having all nine numbers represented in your name. Most people will have fewer and some much fewer (the number can be as low as three). Remember that the missing numbers are the ones that determine your Karmic Lessons and these are the areas in which you are likely to feel a certain degree of uncertainty and inadequacy.
    
    The Subconscious Self is determined by adding up the quantity of represented numbers in your name. In other words, if the numbers 1,3,6,7, and 9 are represented, your Subconscious Self number is 5. Remember that you are NOT calculating the represented numbers, just counting how many of them there are. In the above example, five numbers are represented so that is the answer. It is also interesting to note that the minimum number that can possibly be represented is three. It is impossible to have just two or one so don't go searching for the interpretations of 1 and 2. They simply do not exist.
    
    The more numbers you have represented, the more capable you ultimately are to deal with a variety of situations.`,
      style: `small`,
    },
    {
      text: `Subconscious Self Number: ` + SubconsciousSelfNumber(),
      style: `smallBold`,
    },

    { ul: SubconsciousSelfNumberpdf(lowercaseCharacters), style: `small` },
    {
      text: YourSelfNumberContent["num" + SubconsciousSelfNumber()],
      style: `small`,
    },
    {
      text: `Balance Number`,
      style: `header`,
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: `Life challenges elicit different responses from different people. Some tend to withdraw from situations so they can regroup inside their own heads and sort things out. Others bury their own emotions and ostensibly hide from their problems. Others still react quickly and emotionally but pull themselves together equally fast. Others let their emotions simmer for a long time, reliving the details, carrying the weight of the situation long after it should have been put down.

        As we mature, we learn better how to deal with these things and the way we deal with them (or how we let them affect us) changes and evolves. We become more effective at managing the feelings and emotions that extreme situations thrust upon us. Your Balance Number provides counsel on how we, as specific individuals, can best handle situations that are threatening, difficult or emotionally draining.
        
        The Balance number is a minor influence on your chart, but it can be afforded undue weight if we start relying too heavily on it to deal with our personal lives feeling out of balance. When we experience emotional upheaval, regardless of the reason, being familiar with our Balance number can make the difference between able to control situations and letting them control us.
        
        The Balance Number is not part of many Numerology Charts, but it is nonetheless useful in moments when a little wise counsel on a situation is warranted.
        
        Your Balance Number says quite a bit about your abilities and talents along with your imperfections and shortcomings. All of these were present at the time of your birth and your name reflects them. It is NOT an accident that you have the name that you do.`,
      style: `small`,
    },
    {
      text: `Balance Number: ` + BalanceNumbers().sumBalance,
      style: `subheader`,
    },
    {
      text:
        `What does an Balance Number of ` +
        BalanceNumbers().sumBalance +
        ` mean?`,
      style: `smallBold`,
    },
    {
      text: " ",
      style: "small",
    },

    await buildHeartDesireNumbersOfName(
      BalanceNumbers().arrresult,
      (character) => {
        return `/img/${character}.png`;
      }
    ),
    {
      text: " ",
      style: "small",
    },
    {
      text: BalanceNumberContent["num" + BalanceNumbers().sumBalance],
      style: `small`,
    },

    // await buildHeartDesireNumbersOfName("thisbuildheartdesirewwou".split("")),
  ];
};

const bootstrap = async () => {
  var dd = {
    pageSize: "A4",
    pageMargins: [40, 40, 40, 40],
    content: await buildPdfContent(),
    styles: {
      header: {
        fontSize: 25,
        bold: true,
        lineHeight: 1.5,
      },
      subheader: {
        fontSize: 20,
        bold: true,
        lineHeight: 1.5,
      },
      quote: {
        italics: true,
        lineHeight: 1.5,
      },
      small: {
        fontSize: 15,
        lineHeight: 1.5,
      },
      smallBold: {
        fontSize: 15,
        bold: true,
        lineHeight: 1.5,
      },
    },
  };

  var pdfDoc = pdfMake.createPdf(dd);

  // pdfDoc.open({}, window)

  pdfDoc.getDataUrl((dataUrl) => {
    var pdfContainer = document.getElementById("pdfContainer");
    pdfContainer.innerHTML = `<embed height="100%" width="100%" src="${dataUrl}" type="application/pdf">`;
    console.log("done");
  });
};

bootstrap();
