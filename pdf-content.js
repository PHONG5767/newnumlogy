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
      toc: {
        title: { text: "Table of contents", style: "header" },
      },
    },

    {
      text: "About Numerology",
      style: "header",
      pageBreak: "before",
      tocItem: true,
    },

    {
      text: `From the time when human beings developed speech, we realized that words are symbols for things; actions, people, things, places, the passage of time and even more. Eventually, ways to compact these words so that they could be recorded became writing, a secondary set of symbols. As our need to pass information became more complex, we developed symbols for complete ideas and concepts centered on certain principles, and grouped similar concepts into categories, from which we find symbolic systems of codifying the universe such as Astrology, Yijing (I-Ching) and others. Numerology is even more useful than these other methods of codifying information about the world, because it uses everyday numbers in various combinations to explain these categories and the many subtleties of their interaction.`,
      style: "small",
    },

    {
      text: ` `,
      style: "small",
    },

    {
      text: `Systems of using symbols for information were also used for divination - just as a letter can describe important events far away or hidden from view, the Chinese Fate Calculators or Astrologers used their proprietary symbols to reveal things that could not be otherwise known. If they were wrong more than they were right, those crafts of divination would not exist today, they would have long since been exorcised from the collective toolbox of those who seek knowledge.`,
      style: "small",
    },

    {
      text: ` `,
      style: "small",
    },

    {
      text: `Actually, the use of numbers as symbols of ideas, things, events and words goes back to the time before numerals, as we know them today, were invented. Some people used letters of the alphabet to act as numbers; the Arabic Numerals, which actually originated in India, only came into widespread use in the west during the early years of the 13th century. They were used as counting devices by the common people, but knowledgeseekers struggled to be initiated into the mystery schools where secret teachings about numbers was taught, explored and codified. `,
      style: "small",
    },

    {
      text: ` `,
      style: "small",
    },
    {
      text: `The ancient Chaldeans, famous for their skills in astrology, are believed to have created an early system of Numerology. Their philosophy stated that all things are composed of energy at varying states of vibration, and modern science is finally beginning to agree with them. They, of course, found a way to group everything according to their common essential properties. These basic qualities are underlying principles that extend into mind, matter and action, and exist wherever consciousness exists. Eventually these qualities were codified by numbers, and from that time numbers became more than ciphers for counting - they became abstract principles through which one versed in the art could explore order in the universe and in daily affairs. `,
      style: "small",
    },
    {
      text: ` `,
      style: "small",
    },
    {
      text: `The term Numerology was coined by Dr. Julia Seton, and first seen in a book published around 1937. Before then, this type of divination was referred to as the Science of Numbers or Arithmancy. `,
      style: "small",
    },
    {
      text: ` `,
      style: "small",
    },
    {
      text: `There are schools of Numerology that have their origin in ancient Taoist cosmologies which follow the theory of Yin and Yang and the Five Elements. The more modern and very popular system of Chinese Astrology, known as the Four Pillars, is really a numerological method based on the calendar, rather than the movements of the stars. `,
      style: "small",
    },

    {
      text: ` `,
      style: "small",
    },
    {
      text: `In India, many methods of astrological divination are based on numerological techniques such as harmonics and magic squares. Some of them use orders and sequences of planets in the Zodiac signs, or cycles of time unrelated to astronomical positions. Systems like those rely on principles and ideas based on observation and experience, rather than measurement, and although they are based on the symbolic value of number, rather than the observation or the sky, their results can be stunningly accurate. `,
      style: "small",
    },

    {
      text: ` `,
      style: "small",
    },
    {
      text: `In most schools of Numerology, there are different aspects to working with the numbers. Arithmancy is the set of techniques used for manipulating the numbers and extracting the meaning from their various relationships. Arithmancy gives us the ability to find the definitions we need and the information we seek. `,
      style: "small",
    },

    {
      text: `Another way of working with Numbers is called Isopsephy in Greek, or Gematria in Aramaic and Hebrew. This is the technique of assigning the letters of an alphabet, or (sometimes) the phonemes of a language to numbers. These methods help a practitioner to convert names and words into numeric symbols `,
      style: "small",
    },
    {
      text: ` `,
      style: "small",
    },

    {
      text: `In short, there are many systems and methods of Numerology which, in the hands of a well-rounded and conscientious practitioner, can be almost miraculous in its insights. But what's important, especially in this information-saturated age, is what it can do for you. `,
      style: "small",
    },
    {
      text: ` `,
      style: "small",
    },

    {
      text: `Numerology is a profound and reliable way to study your experience in the world. From this study one can uncover secrets that lead to self-knowledge, and understand underlying cycles and patterns that may have been invisible before. These patterns never stop changing, but by knowing what these changes are likely to bring, it offers you the chance to align yourself with the currents in nature, so that you can sail with the wind, rather than against it. It can also give you a pretty good idea of what makes people tick, and provide an excellent road map with which you can navigate the currents of daily life. `,
      style: "small",
    },
    {
      text: ` `,
      style: "small",
    },

    {
      text: `Numerology offers you the opportunity to skillfully emphasize your strengths and overcome your weaknesses, and it can help you learn more every day about how to seize opportunities that you may never have noticed before. By doing so, you'll cultivate an inner and almost automatic sense of "doing the right thing" while acting in your best interests at the same time. By putting a little time and effort into the study of this fascinating subject, you're likely to find ways to make all aspects of your life run more smoothly, making it easier to create the life you want and the future you deserve.`,
      style: "small",
    },
    {
      text: ` `,
      style: "small",
    },

    {
      text: "Connecting The Dots",
      style: "header",
      pageBreak: "before",
      tocItem: true,
    },

    {
      text: `It’s important that you know how to get the best from your Deluxe Numerology Report. We have spent years compiling the best interpretations from the lore and research of Numerology throughout the world. But it’s important to know that a highly personalized report cannot tell you exactly the same thing that you might learn from a professional Numerologist sitting on the other side of the table. `,
      style: "small",
    },
    {
      text: ` `,
      style: "small",
    },
    {
      text: `Nevertheless, we guarantee that you will not be able to find a more thorough or revealing report anywhere. In fact, we don’t believe that personal readings with many Numerologists will match the scope and value of the report you are about to read. `,
      style: "small",
    },
    {
      text: ` `,
      style: "small",
    },

    {
      text: `From time to time, you may need to “connect the dots” in order to arrive at the exact meaning of statements in this report that are relevant to you at this time. Doing so will, however, sharpen your intuition, expand your self-knowledge, and reveal plenty of pertinent information that you won’t find anywhere else. `,
      style: "small",
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
      text: mainNumber["num" + nummain],
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


    {
      text: `Final Note`,
      style: `header`,
      pageBreak: "before",
      tocItem: true,
    },
    {
      text: "“What we observe is not nature herself, but nature exposed to our method of questioning.” Werner Heisenberg ",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "All systems such as Numerology, Astrology, Tarot, I-Ching and other alternative ways of looking at what’s going on in our world use a different method of questioning than those we are generally familiar with – a method that stretches beyond the measurements and chemical elements of objective phenomena that are considered “scientific” or “practical.” Hopefully, these methods, because they attempt to penetrate the possible meanings of emerging and existing patterns, can give us more individually meaningful answers to the questions we ask. ",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "Scientists and philosophers have been working on the same concepts for a very long time, and many of them spent their time seeking understanding of underlying structures of our individual and shared worlds. With this quest for understanding comes an increasing awareness of the importance of basic or archetypal patterns - this interest is spread across many disciplines",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "Rupert Sheldrake is famous for his theory of ‘Morphogenic Fields”, that lie behind behavioral patterns in all kingdoms, while the mathematician Mandelbrot discusses how fractal geometry “imitates” basic forms in the natural world. Gregory Bateson has explored the “pattern that connects” both in nature as it is and in evolutionary theory. Ilya Prigogine promotes a theory of “dissipative structures” to explain how order emerges from chaos. And of course, Carl Jung’s theories about Archetypes and the Collective Unconscious study how consciousness is organized around these all important patterns. Let’s not forget how Fibonacci’s golden mean has been seen over and over again to be a basic pattern around which nature is organized.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "Numbers, as we use them, are easy ways to help us organize and understand these patterns of emergence and activity that exist in ourselves and the world. Opening the mind to the possibilities Numerology offers can expand our consciousness and help us to look into the underlying patterns in our subjective and objective experience. It can also teach us how to work with these patterns to our advantage.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "What you have read in these pages is not an exposition of Numerological theory, however. It is a practical and personal method of reorganizing yourself around a few simple yet profound ideas. ",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "One of these ideas is that it is possible to change your circumstances (and your future) by letting go of self-sabotaging habits of thinking that cause you to interact with the world in limiting and unproductive ways.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "Another is that it’s possible to personally experience non-ordinary dimensions of a larger reality, and bring the gifts of this kind of experience into your daily life without having to separate yourself from everyday affairs.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "You may have also seen that meditation and living in a stress reduced, happier state of mind does not require a special place, supplies or teacher once you learn to pay attention to what you are feeling. ",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "A most important point that is made throughout is that it is not hard to activate your Energetic or Inner Guidance System, which automatically takes you in the direction you want to go, once you’ve decided what kind of destination you’d like to arrive at.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "These are but a few of the points that are made in the report, but many others will be discovered over time, which is the best way for you to learn what they mean for you. Numbers are simple and universal symbols, and should not be burdened by dogmas or belief systems that separate us from one another. There is enough “ideological imperialism” in the world, and it never ends up being helpful when it comes to freedom and love.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "We have spoken quite a bit about the Laws of Attraction in these pages, but that is not a doctrinal absolute either. They’ve been discussed to illustrate a basic fact about Numerology – the numbers along the Life Path represent what you attract to yourself, while those derived from your name are about the choices you can make. Rather than bore you with statistical proofs or metaphysical theories, we’ve managed to boil it down to one simple fact of life; you get what you give.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "The quality of the choices you make determines the quality of the results you get, not the amount of effort you put into getting those results.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "Numerology can be easy, and even fun, as long as you don’t start mistaking the numbers for judges, juries and executioners. They describe patterns, cycles and principles in nature that you can utilize as tools for improving your quality of life. How well Numerology works for you is entirely dependent on your willingness to divorce yourself from the cultural patterns and personal habits through which you are limiting your own potential and possibilities, as well as your willingness to understand that you are the product of your previous choices, and your future will be as well.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "One last note – it’s almost certain that there is a lot of Numerology that you’ve never seen before included in this report, but you need to know that it barely scratches the surface of the full spectrum of methods and techniques; we have only included those considered to be the most practical methods that you can USE so you can make Numerology work for you.",
      style: "small",
    },
    {
      text: " ",
      style: "small",
    },
    {
      text: "Your Numerology Report is not a complete view of this art, it is only an invitation to enjoy it on a personal level that cannot be gained from a book. Our goal is to show you, in a clear and precise way, how you can apply Numerology for your own benefit and for the benefit of others.",
      style: "small",
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
        color: 'blue'
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
