/* PlayHub — Mathematics Olympiad (Grade 1) content
   Chapters follow the SOF / IMO Class-1 syllabus:
   Numbers · Number Names · Sequence · Ordering · Addition · Subtraction ·
   Ordinal Numbers · Shapes · Patterns · Time · Money · Measurement · Reasoning
   Fields (pipe-separated, no pipes inside text):
      cards : 'Keyword|Explanation'
      quiz  : 'Question|opt1|opt2|opt3|opt4|correctIndex|why'
      tf    : 'Statement|T or F|why'
      pairs : 'Left|Right'
      odd   : 'A|B|C|D|oddIndex|why'                                              */
window.MATHS = {
  subject: 'Mathematics',
  grade: 'Grade 1',
  book: 'SOF IMO syllabus',
  chapters: [
    { id: 'numbers', n: 'Numbers up to 9', e: '🔢', c1: '#3b82f6', c2: '#60a5fa',
      cards: [
        'Counting|Saying numbers in order to find how many',
        'Numeral|A written sign for a number such as 5',
        'Digit|The number signs from 0 to 9',
        'Zero|Zero stands for none or nothing',
        'One more|One more than 6 is 7',
        'One less|One less than 6 is 5'
      ],
      quiz: [
        'How many dots are here: ⚫⚫⚫⚫⚫?|4|5|6|3|1|Count the dots one by one. There are 5.',
        'Which numeral comes after 6?|5|7|8|4|1|Counting on from 6 gives 7.',
        'Which numeral comes before 4?|5|3|6|2|1|Counting back from 4 gives 3.',
        'Which number means none?|2|0|9|1|1|Zero means none or nothing.',
        'One more than 8 is|7|9|10|6|1|8 and 1 more make 9.',
        'One less than 5 is|6|4|3|7|1|5 take away 1 leaves 4.',
        'Which is the smallest number?|7|3|9|6|1|3 is smaller than 6 7 and 9.',
        'How many digits are there from 0 to 9?|8|9|10|11|2|The digits are 0 to 9. That is 10 digits.'
      ],
      tf: [
        '7 comes after 6.|T|Counting on: 6 then 7.',
        'One less than 3 is 4.|F|One less than 3 is 2.',
        'Zero means none.|T|0 stands for nothing at all.',
        'The digit 9 comes before 6.|F|9 comes after 6.',
        '10 has two digits.|T|1 and 0 are two digits.',
        '8 is one more than 8.|F|8 is one more than 7.'
      ],
      pairs: [
        'One more than 6|7',
        'One less than 5|4',
        'Means none|Zero',
        'Digit|A sign from 0 to 9',
        'Count|Say numbers in order',
        'Between 7 and 9|8'
      ],
      odd: [
        'One|Two|Three|Ten|3|Ten is written as 10 with two digits. The others have one digit.',
        'Before|After|Between|Seven|3|Seven is a number. The others tell a position.',
        '4|6|8|11|3|11 has two digits. The others have one digit.',
        'Less|More|Few|5|3|5 is a number. The others compare how many.',
        'Seven|Four|Nine|Cow|3|Cow is not a number at all.'
      ]
    },

    { id: 'numnames', n: 'Number Names up to 99', e: '🔤', c1: '#8b5cf6', c2: '#c4b5fd',
      cards: [
        'Number name|The word for a number such as 4 is Four',
        'Tens|Ten ones make one ten',
        'Twenty|Two tens make 20',
        'Thirty|Three tens make 30',
        'Tens digit|The first digit shows how many tens',
        'Ones digit|The last digit shows how many extra ones'
      ],
      quiz: [
        'What is the number name of 7?|Five|Seven|Nine|Two|1|Seven is the word for 7.',
        'How do you write sixteen?|60|6|16|66|2|Sixteen is written as 16.',
        '20 is read as|Two|Twenty|Two hundred|Twelve|1|Two tens make twenty.',
        'The tens digit in 45 is|4|5|9|0|0|45 means 4 tens and 5 ones.',
        'How many tens are there in 30?|3|30|0|33|0|30 is 3 tens with no ones.',
        'Which number is written as Nine?|6|9|11|19|1|Nine is the word for 9.',
        'The ones digit in 62 is|6|2|0|8|1|62 has 6 tens and 2 ones.',
        'Fifty is written as|15|55|50|5|2|Five tens make fifty which is 50.'
      ],
      tf: [
        '42 is read as Forty two.|T|4 tens and 2 ones make forty two.',
        '100 is written as Ten.|F|100 is One hundred.',
        'Ten ones make one ten.|T|10 ones group into one ten.',
        'The word Twelve means 20.|F|Twelve means 12.',
        '68 has 6 tens and 8 ones.|T|The digits show tens and ones.',
        'Nine means 9.|T|Nine is the number name of 9.'
      ],
      pairs: [
        '3|Three',
        '11|Eleven',
        '25|Twenty five',
        '40|Forty',
        'Tens digit|The first digit of a number',
        'Ones digit|The last digit of a number'
      ],
      odd: [
        'Twenty|Thirty|Forty|Twelve|3|Twelve is 12. The others count by tens.',
        '5|15|25|55|0|5 has no tens. The others show some tens.',
        'Thirteen|Fourteen|Fifteen|Sixty|3|Sixty is a tens number. The others are teens.',
        '2|20|22|3|3|The number 3 does not use the digit 2.',
        'Cow|Nine|Four|Six|0|Cow is not a number name.'
      ]
    },

    { id: 'sequence', n: 'Before After and Between', e: '↔️', c1: '#06b6d4', c2: '#67e8f9',
      cards: [
        'Before|The number that comes just earlier',
        'After|The number that comes just next',
        'Between|A number that lies in the middle of two numbers',
        'Counting back|Saying numbers in reverse order',
        'Counting on|Saying numbers in forward order',
        'Number line|Numbers in a row from small to big'
      ],
      quiz: [
        'Which number comes just after 12?|11|13|14|10|1|After 12 comes 13.',
        'Which number comes just before 9?|8|10|11|7|0|Before 9 comes 8.',
        'Which number comes between 5 and 7?|6|8|4|9|0|6 lies between 5 and 7.',
        'Which number comes before 20?|19|21|25|30|0|19 is one less than 20.',
        'The number between 14 and 16 is|13|15|17|12|1|15 lies between 14 and 16.',
        'Which number comes after 33?|34|32|31|43|0|Counting on from 33 gives 34.',
        'Which of these comes FIRST when counting on?|2|4|6|8|0|We count 2 before 4 6 and 8.',
        'Counting back from 10 the next number is|9|11|12|13|0|Counting back from 10 gives 9.'
      ],
      tf: [
        'After 15 comes 16.|T|Counting on from 15 gives 16.',
        'Before 7 comes 6.|T|Counting back from 7 gives 6.',
        'The number between 8 and 10 is 9.|T|9 sits in the middle.',
        '21 comes after 20.|T|20 then 21.',
        'The number before 30 is 32.|F|The number before 30 is 29.',
        '19 comes between 20 and 22.|F|21 comes between 20 and 22.'
      ],
      pairs: [
        'Before|Comes earlier',
        'After|Comes next',
        'Between|In the middle of two numbers',
        'Just after 14|15',
        'Just before 16|15',
        'Counting back|10 9 8 7'
      ],
      odd: [
        'Before|After|Between|Apple|3|Apple is a fruit. The others tell a position.',
        '6|7|8|10|3|6 7 8 are in a row. 10 is not next to them.',
        'Second|First|Third|Banana|3|Banana is a fruit. The others are positions.',
        'Between|Before|Cow|After|2|Cow is not a position word.',
        'Next|Last|First|Blue|3|Blue is a colour. The others tell a place.'
      ]
    },

    { id: 'order', n: 'Ascending and Descending Order', e: '📊', c1: '#f59e0b', c2: '#fcd34d',
      cards: [
        'Ascending order|Putting numbers from small to big',
        'Descending order|Putting numbers from big to small',
        'Greatest|The biggest number in a group',
        'Smallest|The littlest number in a group',
        'Greater than >|The open side points to the bigger number',
        'Smaller than <|The pointy side points to the smaller number'
      ],
      quiz: [
        'Which number is the greatest?|9|4|7|2|0|9 is the biggest number here.',
        'Which number is the smallest?|3|8|6|5|0|3 is smaller than 5 6 and 8.',
        'Ascending order means putting numbers|from small to big|from big to small|all the same|in a circle|0|Ascending goes up from the smallest.',
        'Which arrangement is ascending?|1 2 3 4|4 3 2 1|2 1 4 3|3 3 3 3|0|Ascending means small to big.',
        'The number greater than 15 is|18|12|10|9|0|18 is bigger than 15.',
        'Which is in descending order?|7 6 5 4|1 2 3 4|2 4 6 8|5 5 5 5|0|Descending goes from big to small.',
        'The smallest of 6 2 9 is|2|6|9|4|0|2 is smaller than 6 and 9.',
        'Which symbol shows greater than?|<|>|=|+|1|> has its open side toward the bigger number.'
      ],
      tf: [
        '4 is greater than 7.|F|7 is greater than 4.',
        'Descending order starts from the biggest.|T|Big to small is descending.',
        '10 is smaller than 12.|T|10 comes before 12.',
        'The greatest number in 3 8 5 is 8.|T|8 is the biggest of them.',
        'Ascending order means big to small.|F|Ascending means small to big.',
        '5 is greater than 5.|F|5 is equal to 5.'
      ],
      pairs: [
        'Ascending|From small to big',
        'Descending|From big to small',
        'Greatest|The biggest number',
        'Smallest|The littlest number',
        'The narrow end of > points to|The smaller number',
        'The narrow end of < points to|The bigger number'
      ],
      odd: [
        'Small|Big|Large|Red|3|Red is a colour. The others talk about size.',
        '1 2 3|4 5 6|9 8 7|2 3 4|2|9 8 7 goes from big to small. The others go up.',
        'Greater|Less|More|Seven|3|Seven is a number. The others compare.',
        '>|<|=|9|3|9 is a number. The others are symbols.',
        'Biggest|Largest|Highest|Seven|3|Seven is a number word not a size word.'
      ]
    },

    { id: 'addition', n: 'Addition up to 20', e: '➕', c1: '#22c55e', c2: '#86efac',
      cards: [
        'Add|Putting two groups together to find the total',
        'Sum|The answer we get after adding',
        'Plus +|The sign that tells us to add',
        'Total|How many there are altogether',
        'Addends|The numbers we add together',
        'Number line|Jump forward on it to add quickly'
      ],
      quiz: [
        '2 + 3 = ?|4|5|6|1|1|2 and 3 together make 5.',
        '5 + 5 = ?|10|9|15|11|0|5 and 5 make 10.',
        '7 + 2 = ?|9|8|10|6|0|Count on two after 7: 8 then 9.',
        '10 + 6 = ?|16|14|60|17|0|10 and 6 make 16.',
        '4 + 4 = ?|6|10|8|4|2|4 and 4 together make 8.',
        'What must be added to 6 to make 9?|3|2|4|1|0|6 + 3 = 9.',
        '8 + 0 = ?|0|18|10|8|3|Adding zero keeps the number the same.',
        'The sum of 12 and 5 is|7|13|17|20|2|12 and 5 together make 17.'
      ],
      tf: [
        '3 + 4 = 7.|T|3 and 4 make 7.',
        '9 + 1 = 10.|T|9 and one more make 10.',
        '6 + 2 = 11.|F|6 + 2 = 8.',
        'Adding zero does not change a number.|T|7 + 0 is still 7.',
        'The answer of addition is called the sum.|T|The total is called the sum.',
        '5 + 5 = 11.|F|5 + 5 = 10.'
      ],
      pairs: [
        '3 + 4|7',
        '6 + 6|12',
        '9 + 2|11',
        'Plus +|Sign of addition',
        'Sum|Answer after adding',
        'Altogether|Total of both groups'
      ],
      odd: [
        '2 + 2|3 + 3|4 + 4|2 + 5|3|The first three add the same number twice. 2 + 5 does not.',
        'Add|Plus|Sum|Take away|3|Take away is subtraction. The others are about adding.',
        '5 + 1|6 + 1|7 + 1|5 + 5|3|The first three add one. 5 + 5 adds five.',
        'Plus|Add|Total|Seven|3|Seven is a number. The others are words for adding.',
        '10 + 1|10 + 2|10 + 3|10 + 10|3|The first three add a small number. The last adds ten.'
      ]
    },

    { id: 'addword', n: 'Addition Stories', e: '🍎', c1: '#ef4444', c2: '#fca5a5',
      cards: [
        'Word problem|A short story with numbers to solve',
        'Altogether|A word that tells us to add',
        'More|Getting more things means add',
        'Joined|Two groups joined together means add',
        'In all|A phrase that means add the numbers',
        'Story clue|Words like more and bought mean plus'
      ],
      quiz: [
        'Sam has 3 marbles and gets 2 more. How many now?|4|5|6|3|1|3 + 2 = 5 marbles.',
        'There are 4 birds and 4 more come. Altogether?|7|8|9|10|1|4 + 4 = 8 birds.',
        'Mia has 5 stickers. She buys 3 more. Total?|6|9|8|10|2|5 + 3 = 8 stickers.',
        'A box holds 6 apples. Anjali adds 1. Now?|7|6|8|5|0|6 + 1 = 7 apples.',
        '2 cats and 3 dogs play. How many pets?|6|4|5|8|2|2 + 3 = 5 pets.',
        'Ravi reads 4 pages then 5 more. How many pages?|8|9|7|6|1|4 + 5 = 9 pages.',
        'A jar has 7 sweets. Mum adds 2. How many in all?|9|8|10|6|0|7 + 2 = 9 sweets.',
        '5 boys and 5 girls are in the park. How many children?|9|11|10|12|2|5 + 5 = 10 children.'
      ],
      tf: [
        'Ravi has 2 balls and gets 1 more. He has 3 now.|T|2 + 1 = 3.',
        'Sam has 4 toy cars. He gets 2 more. He has 6.|T|4 + 2 = 6.',
        'There are 3 hens and 3 chicks. In all there are 5.|F|3 + 3 = 6.',
        'Altogether means we add the numbers.|T|Altogether tells us to find the total.',
        'A bag has 7 mangoes and 1 more makes 7 again.|F|7 + 1 = 8.',
        'If you get more candies you add.|T|Getting more things means adding.'
      ],
      pairs: [
        'Altogether|Add the numbers',
        'In all|Find the total',
        'Getting more|You get extra things',
        '3 + 2 marbles|5 marbles in all',
        'Two groups joined|Add them together',
        'How many in the jar|Count the total'
      ],
      odd: [
        'More|Total|Altogether|Less|3|Less means take away. The others mean add.',
        '2 + 1|4 + 2|5 + 3|9 - 2|3|9 - 2 is a subtraction. The others are additions.',
        'Add|Join|Put together|Take away|3|Take away is subtraction. The others mean add.',
        'Marbles you get|Candies you win|Balloons you are given|Sweets that are gone|3|Sweets gone means losing. The others mean getting more.',
        '5 + 0|5 + 1|5 + 2|5 - 1|3|5 - 1 takes away. The others add.'
      ]
    },

    { id: 'subtraction', n: 'Subtraction up to 20', e: '➖', c1: '#f97316', c2: '#fdba74',
      cards: [
        'Subtract|Taking away from a group to find what is left',
        'Difference|How much more or less there is between two numbers',
        'Minus -|The sign that tells us to subtract',
        'Left|The answer after taking away',
        'Take away|Remove some things from the group',
        'Zero|A number minus itself gives zero'
      ],
      quiz: [
        '7 - 3 = ?|5|3|4|10|2|7 take away 3 leaves 4.',
        '9 - 4 = ?|6|4|5|12|2|9 take away 4 leaves 5.',
        '10 - 10 = ?|10|1|0|20|2|A number minus itself is zero.',
        '6 - 0 = ?|0|6|12|5|1|Taking nothing leaves the number the same.',
        '8 - 5 = ?|4|3|12|6|1|8 take away 5 leaves 3.',
        'What must be taken from 9 to leave 4?|6|3|5|2|2|9 - 5 = 4.',
        'The difference between 10 and 6 is|16|6|2|4|3|10 is 4 more than 6.',
        '15 - 5 = ?|5|20|12|10|3|15 take away 5 leaves 10.'
      ],
      tf: [
        '5 - 2 = 3.|T|5 take away 2 leaves 3.',
        '8 - 8 = 8.|F|8 - 8 = 0.',
        '10 - 3 = 7.|T|10 take away 3 leaves 7.',
        'You add when you take away.|F|Taking away means subtracting.',
        '6 - 0 = 6.|T|Taking nothing leaves the number same.',
        '9 - 4 = 6.|F|9 - 4 = 5.'
      ],
      pairs: [
        '5 - 2|3',
        '9 - 5|4',
        '12 - 2|10',
        'Minus -|Sign of subtraction',
        'Left|Answer after taking away',
        'Difference|Gap between two numbers'
      ],
      odd: [
        'Take away|Subtract|Difference|Add|3|Add means join. The others are about taking away.',
        '8 - 4|9 - 3|10 - 2|10 + 2|3|10 + 2 is addition. The others are subtractions.',
        'Less|Fewer|Left|More|3|More means addition. The others mean taking away.',
        '2 + 3|4 + 1|6 - 2|7 + 2|2|6 - 2 is subtraction. The others are additions.',
        '10 - 1|9 - 1|8 - 1|8 - 8|3|8 - 8 gives zero. The others leave a number.'
      ]
    },

    { id: 'subword', n: 'Subtraction Stories', e: '🍪', c1: '#f43f5e', c2: '#fda4af',
      cards: [
        'Left over|A phrase that tells us to subtract',
        'Gave away|Giving things away means subtract',
        'Eaten up|Things eaten are taken away',
        'How many more|We subtract to compare two groups',
        'Difference story|Find how many extra one group has',
        'Story clue|Words like left and gone mean minus'
      ],
      quiz: [
        'Neha had 6 cookies and ate 2. How many left?|5|3|4|6|2|6 - 2 = 4 cookies.',
        'A tin had 9 biscuits. Tom ate 4. How many remain?|4|6|7|5|3|9 - 4 = 5 biscuits.',
        'Rita had 8 balloons. 3 flew away. Left with?|6|11|4|5|3|8 - 3 = 5 balloons.',
        'There were 10 ducks. 6 swam away. How many on the bank?|6|12|4|5|2|10 - 6 = 4 ducks.',
        'Sam gave 2 of his 5 toys to a friend. He has now?|7|2|3|1|2|5 - 2 = 3 toys.',
        'A jug had 7 cups of juice. We drank 1. Left?|6|8|7|5|0|7 - 1 = 6 cups.',
        'Of 12 birds 4 flew off. How many still sitting?|7|9|6|8|3|12 - 4 = 8 birds.',
        'A shelf had 14 books. We removed 4. How many now?|11|9|18|10|3|14 - 4 = 10 books.'
      ],
      tf: [
        'If 4 of 7 apples are eaten 3 are left.|T|7 - 4 = 3.',
        'Sara had 5 coins and lost 5. She still has 5.|F|5 - 5 = 0.',
        'Words like left and gone tell us to subtract.|T|These are clue words for taking away.',
        'A rabbit had 6 carrots and ate 2. It has 4.|T|6 - 2 = 4.',
        'Giving away means adding.|F|Giving away means taking away.',
        'From 10 bananas 3 are used. 7 remain.|T|10 - 3 = 7.'
      ],
      pairs: [
        'Cookies left after eating|Subtract the eaten ones',
        'Balloons that flew away|Take them away',
        'Toys given to a friend|Count what is left',
        'Left|Phrase for subtraction',
        'Gave away|Means take away',
        'More than|We subtract to compare'
      ],
      odd: [
        'Left|Gone|Eaten|Won|3|Won means you get more. The others mean take away.',
        '6 - 2|8 - 3|9 - 4|7 + 2|3|7 + 2 is addition. The others are subtractions.',
        'Marbles lost|Balloons flown away|Candies won|Pages left|2|Candies won means getting more. The others lose things.',
        'Take away|Used up|Given away|Received|3|Received means getting more. The others lose things.',
        '5 - 1|6 - 2|7 - 3|4 + 1|3|4 + 1 is addition. The others are subtractions.'
      ]
    },

    { id: 'ordinal', n: 'Ordinal Numbers', e: '🏅', c1: '#eab308', c2: '#fde047',
      cards: [
        'Ordinal number|Tells the position such as 1st 2nd and 3rd',
        'First 1st|The position at the very beginning',
        'Second 2nd|The position just after first',
        'Third 3rd|The position just after second',
        'Last|The position at the very end',
        'Position|Where something stands in a line'
      ],
      quiz: [
        'Which one comes first?|2nd|1st|3rd|4th|1|First is the beginning position.',
        'The word for 3rd is|Three|Third|Thirteen|Thirty|1|Third is the ordinal for position 3.',
        'Tom is 2nd in a race. Who is just before him?|1st|3rd|4th|5th|0|The 1st comes just before the 2nd.',
        'How do we write fourth?|4th|4|40|44|0|4th shows the fourth place.',
        'Which position comes just after 5th?|6th|4th|7th|3rd|0|After 5th comes 6th.',
        'Which position is at the end?|First position|Second position|Last position|Start|2|Last is the final position.',
        '5th means the position that is|Fifth|Fifteen|Fifty|Five|0|5th is the short form of Fifth.',
        'Who comes just before the 7th child?|5th|6th|8th|9th|1|The 6th comes right before the 7th.'
      ],
      tf: [
        'First is written as 1st.|T|1st shows the first position.',
        '2nd means second.|T|2nd is the short form of second.',
        'In a race the winner stands last.|F|The winner stands first.',
        'Ordinal numbers tell us a position.|T|They tell where something stands.',
        'Third is written as 3r.|F|Third is written as 3rd.',
        'Last comes after every other position.|T|Last is the final position.'
      ],
      pairs: [
        '1st|First',
        '2nd|Second',
        '3rd|Third',
        'Winner of a race|First position',
        'End of the queue|Last position',
        'Ordinal number|Shows a position'
      ],
      odd: [
        'First|Second|Third|Three|3|Three counts how many. The others tell a position.',
        '1st|2nd|3rd|3|3|3 counts things. The others show a place.',
        'Last|Final|End|Start|3|Start means first. The others mean the end.',
        'Fourth|Fifth|Sixth|Six|3|Six counts how many. The others tell a position.',
        'Position|Place|Order|Number|3|Number counts things. The others tell a place.'
      ]
    },

    { id: 'shapes', n: 'Shapes Around Us', e: '🔺', c1: '#14b8a6', c2: '#5eead4',
      cards: [
        'Circle|A round shape with no corners',
        'Square|Four equal sides and four corners',
        'Rectangle|Four sides with two long and two short',
        'Triangle|Three sides and three corners',
        'Corner|Where two sides of a shape meet',
        'Side|A straight line that makes a shape'
      ],
      quiz: [
        'How many corners does a square have?|3|4|5|2|1|A square has 4 corners.',
        'Which shape is round?|Square|Circle|Triangle|Rectangle|1|A circle has no corners and is round.',
        'A triangle has|3 sides|4 sides|5 sides|6 sides|0|Three sides make a triangle.',
        'Which of these is NOT a flat shape?|Circle|Square|Ball|Triangle|2|A ball is a solid shape. The others are flat.',
        'A clock face is usually shaped like a|Square|Circle|Triangle|Rectangle|1|Clocks are round like a circle.',
        'A slice of pizza looks like a|Circle|Triangle|Rectangle|Oval|1|A pizza slice is shaped like a triangle.',
        'Which shape has 4 equal sides?|Rectangle|Square|Triangle|Circle|1|All four sides of a square are equal.',
        'A coin looks like a|Square|Circle|Triangle|Rectangle|1|Coins are round.'
      ],
      tf: [
        'A square has 4 corners.|T|Four corners for a square.',
        'A circle has three corners.|F|A circle has no corners.',
        'A triangle has 3 sides.|T|Three sides for a triangle.',
        'A rectangle has 4 sides.|T|All rectangles have 4 sides.',
        'A ball is flat like a sheet of paper.|F|A ball is a solid shape.',
        'Two sides of a square meet at a corner.|T|A corner is where two sides meet.'
      ],
      pairs: [
        'Circle|Round with no corners',
        'Square|Four equal sides',
        'Triangle|Three sides',
        'Rectangle|Two long and two short sides',
        'Corner|Where two sides meet',
        'Side|A straight line of a shape'
      ],
      odd: [
        'Circle|Oval|Square|Sphere|3|A sphere is solid. The others are flat shapes.',
        'Triangle|Rectangle|Square|Circle|3|A circle has no corners. The others have corners.',
        'Sides of a square|Corners of a square|Sides of a triangle|Corners of a circle|3|A circle has no corners at all.',
        'Cube|Sphere|Cone|Circle|3|A circle is flat. The others are solid shapes.',
        'Sphere|Cube|Cylinder|Apple|3|An apple is a fruit. The others are shape names.'
      ]
    },

    { id: 'patterns', n: 'Patterns', e: '🔁', c1: '#a855f7', c2: '#d8b4fe',
      cards: [
        'Pattern|Things arranged in a rule that repeats',
        'Rule|The secret order a pattern follows',
        'Repeat|The pattern starts again after ending',
        'Next item|The thing that comes right after',
        'Growing pattern|A pattern that gets bigger each step',
        'Shape pattern|Shapes arranged in a fixed order'
      ],
      quiz: [
        'What comes next: 🔴🔵🔴🔵 ...?|🔴|🔵|🟢|🟡|0|Red and blue take turns so red comes next.',
        'What comes next: 1 2 3 1 2 3 ...?|1|3|4|5|0|The pattern starts again with 1.',
        'A B A B A B ... what comes next?|A|B|C|D|0|The pattern repeats A then B.',
        'What comes next: 🔺🔺🟦🔺🔺 ...?|🔺|🟦|🟨|🟩|1|Two triangles then a blue square repeats.',
        'What comes next: 2 4 6 8 ...?|9|10|11|12|1|The numbers grow by 2 so 10 comes next.',
        'A growing pattern|gets bigger each time|stays the same always|goes backward only|has no rule|0|A growing pattern increases every step.',
        'What is the rule: 🔴🟡🔴🟡 ...?|Red and yellow take turns|Only red appears|Only yellow appears|Shapes grow bigger|0|The two colours take turns again and again.',
        'What comes next: 🐶🐱🐶🐱 ...?|🐶|🐱|🐭|🐰|0|Dog and cat alternate so dog comes next.'
      ],
      tf: [
        'Red blue red blue is a pattern.|T|Two colours take turns.',
        'In a pattern the rule never repeats.|F|The rule repeats again and again.',
        '1 1 2 2 3 3 follows a rule.|T|Each number appears twice.',
        '🟢🔴🟢🔴 the next item is 🔴.|T|Green and red alternate so red is next.',
        'A pattern can be made with shapes.|T|Shapes can follow a repeating rule.',
        'Apple banana apple the next is banana.|T|They alternate.'
      ],
      pairs: [
        'Pattern|Things that follow a rule',
        'Rule|How the pattern moves',
        'Repeat|Start the pattern again',
        'Next item|What comes right after',
        '🔴🔵🔴🔵|Red and blue take turns',
        'Growing pattern|Gets bigger every step'
      ],
      odd: [
        '🔴🔵🔴🔵|🔺🟦🔺🟦|🟢🟡🟢🟡|🔴🔴🔴🔴|3|The first three take turns between two things.',
        'Rule|Repeat|Pattern|Table|3|A table is furniture. The others are about patterns.',
        'Next|After|Later|Seven|3|Seven is a number. The others talk about what comes.',
        'Growing|Repeating|Alternating|Blue|3|Blue is a colour. The others describe pattern types.',
        '1 2 1 2|A B A B|🔴🟡🔴🟡|Red|3|Red alone is not a pattern chunk.'
      ]
    },

    { id: 'time', n: 'Time and Calendar', e: '🕐', c1: '#0ea5e9', c2: '#7dd3fc',
      cards: [
        'Clock|A thing that shows the time',
        'Hour hand|The short hand that shows the hour',
        'Minute hand|The long hand that shows minutes',
        'O clock|When the long hand points to 12',
        'Days of the week|There are 7 days from Monday to Sunday',
        'Month|There are 12 months in one year'
      ],
      quiz: [
        'How many days are there in a week?|5|6|7|8|2|A week has 7 days.',
        'Which day comes after Monday?|Sunday|Tuesday|Wednesday|Friday|1|Monday is followed by Tuesday.',
        'When both hands point to 12 the time is|6:30|12:00|9:00|3:00|1|Both hands on 12 show twelve o clock.',
        'How many hours are there in a day?|10|12|24|8|2|A day has 24 hours.',
        'Which month comes after May?|April|June|July|March|1|The months go April May June.',
        'The short hand on a clock is the|Minute hand|Hour hand|Long hand|Both hands|1|The short hand shows the hour.',
        'How many months are there in a year?|10|11|12|13|2|A year has 12 months.',
        'Which day comes before Wednesday?|Tuesday|Thursday|Friday|Monday|0|Tuesday is just before Wednesday.'
      ],
      tf: [
        'A week has 7 days.|T|Monday to Sunday makes 7 days.',
        'There are 12 months in a year.|T|January to December makes 12.',
        'The long hand shows the hour.|F|The short hand shows the hour.',
        'Sunday comes after Saturday.|T|Saturday then Sunday.',
        'There are 24 hours in a day.|T|A full day has 24 hours.',
        'March comes after April.|F|March comes before April.'
      ],
      pairs: [
        'Days in a week|7',
        'Months in a year|12',
        'Hours in a day|24',
        'Short hand|Shows the hour',
        'Long hand|Shows the minutes',
        'Day after Friday|Saturday'
      ],
      odd: [
        'January|March|May|Sunday|3|Sunday is a day. The others are months.',
        'Morning|Afternoon|Night|Apple|3|An apple is a fruit. The others are times of day.',
        'Summer|Winter|Rainy|Blue|3|Blue is a colour. The others are seasons.',
        'Clock|Watch|Calendar|Table|3|A table does not tell time. The others help us with time.',
        'Sunday|Monday|Saturday|January|3|January is a month. The others are days.'
      ]
    },

    { id: 'money', n: 'Money', e: '💰', c1: '#84cc16', c2: '#d9f99d',
      cards: [
        'Coin|A round piece of money made of metal',
        'Note|A paper piece of money',
        'Rupee|The money we use in India written as ₹',
        'Count money|Add the value of all coins and notes',
        'Buy|We give money to get something',
        'Change|Money we get back after paying'
      ],
      quiz: [
        'How many paise are there in one rupee?|5|10|100|50|2|100 paise make one rupee.',
        'Which of these is a coin?|₹100 note|₹5 coin|₹20 note|₹50 note|1|A coin is round and made of metal.',
        'The value of a ₹5 coin is|5 paise|5 rupees|50 rupees|50 paise|1|A ₹5 coin stands for 5 rupees.',
        'If you pay ₹10 for a ₹6 toy your change is|₹16|₹6|₹4|₹14|2|10 - 6 = 4 rupees of change.',
        'Which note has the biggest value here?|₹10 note|₹20 note|₹50 note|₹100 note|3|₹100 is more than 10 20 and 50.',
        'Two ₹5 coins make|₹7|₹5|₹15|₹10|3|5 + 5 = 10 rupees.',
        'Money is kept safe inside a|Wallet|Window|Wristwatch|Wall|0|A wallet keeps money safe.',
        'We give money to|Buy things|Fly a kite|Sing a song|Run fast|1|We use money to buy things.'
      ],
      tf: [
        'Two ₹2 coins make ₹4.|T|2 + 2 = 4.',
        'We give money to buy things.|T|Money is used for buying.',
        'A note is made of metal.|F|Notes are paper. Coins are metal.',
        '₹100 is more than ₹50.|T|100 is greater than 50.',
        'We should keep money in a safe place.|T|A wallet or bank keeps money safe.',
        'One rupee equals 100 paise.|T|₹1 = 100 paise.'
      ],
      pairs: [
        '₹1|100 paise',
        'Two ₹5 coins|₹10',
        '₹20 note|Paper money',
        'Coin|Made of metal',
        'Change|Money given back',
        'Wallet|Keeps money safe'
      ],
      odd: [
        '₹10 note|₹20 note|₹50 note|₹5 coin|3|A coin is metal. The others are paper notes.',
        'Buy|Pay|Cost|Fly|3|Fly is not related to money. The others are about money.',
        'Wallet|Purse|Bank|Chair|3|A chair does not keep money safe.',
        'Rupee|Paise|Coins|Wednesday|3|Wednesday is a day. The others are money words.',
        'Pay|Spend|Save|Red|3|Red is a colour. The others are about money.'
      ]
    },

    { id: 'measure', n: 'Measurement', e: '📏', c1: '#6366f1', c2: '#a5b4fc',
      cards: [
        'Length|How long or short something is',
        'Weight|How heavy or light something is',
        'Capacity|How much a container can hold',
        'Ruler|We use a ruler to measure length',
        'Balance|We use a balance to compare weights',
        'Full and empty|A full container holds the most'
      ],
      quiz: [
        'Which tool measures the length of a pencil?|Balance|Ruler|Clock|Calendar|1|A ruler measures how long things are.',
        'Which one is heavier?|A feather|A brick|A leaf|A petal|1|A brick is much heavier than a feather.',
        'Which one can hold more water?|A spoon|A bucket|A plate|A saucer|1|A bucket has more capacity than a spoon.',
        'The length of your pencil box is measured in|Kilograms|Litres|Centimetres|Rupees|2|Length is measured in centimetres.',
        'How do we find out which bag is heavier?|Smell it|Weigh both on a balance|Count the bags|Read it|1|A balance compares weights.',
        'A millilitre measures|Length|Weight|Liquid|Money|2|Millilitres measure liquids like water.',
        'Which stick is longer?|A 10 cm stick|A 5 cm stick|A 2 cm clip|A 1 cm line|0|10 cm is more than 5 2 and 1 cm.',
        'Full means|It is empty|It holds the most|It is broken|It is round|1|A full container holds the most.'
      ],
      tf: [
        'A ruler measures length.|T|Rulers measure how long things are.',
        'A balance compares weights.|T|Put things on both sides to compare.',
        'A bucket holds less than a spoon.|F|A bucket holds much more.',
        'Weight shows how heavy something is.|T|Heavy things have more weight.',
        'We measure milk in centimetres.|F|We measure milk in millilitres.',
        'Length tells how long or short a thing is.|T|That is what length means.'
      ],
      pairs: [
        'Length|How long something is',
        'Weight|How heavy something is',
        'Capacity|How much a container holds',
        'Ruler|Tool for length',
        'Balance|Tool for weight',
        'Millilitre|Measures liquid'
      ],
      odd: [
        'Ruler|Thread|Stick|Balance|3|A balance compares weight. The others measure length.',
        'Length|Height|Width|Weight|3|Weight shows heaviness. The others are about how big a shape is.',
        'Heavier|Lighter|Longer|Bigger|3|Bigger talks about size not length or weight.',
        'Mug|Bucket|Bottle|Table|3|A table does not hold liquid. The others do.',
        'Ruler|Measuring tape|Thread|Eraser|3|An eraser is not a measuring tool.'
      ]
    },

    { id: 'reason', n: 'Logical Reasoning', e: '🧩', c1: '#d946ef', c2: '#f0abfc',
      cards: [
        'Logic|Thinking carefully to find the right answer',
        'Analogy|Finding things that work the same way',
        'Grouping|Putting things that go together',
        'Classification|Separating things that do not belong',
        'Coding|Changing letters or numbers by a rule',
        'Common feature|The quality many things share'
      ],
      quiz: [
        'All flowers are plants. A rose is a|Flower|Animal|Stone|Metal|0|A rose is a kind of flower.',
        'If 1 stands for A then 2 stands for|C|B|A|D|1|The letter after A is B.',
        'Which one does not belong: red blue green circle?|Red|Blue|Green|Circle|3|Circle is a shape. The others are colours.',
        'A monkey is most like a|Tree|Rock|Table|Cat|3|A monkey and a cat are both animals.',
        'If the rule is add 1 then 5 becomes|4|6|7|10|1|5 and 1 more make 6.',
        'You sleep at|Morning|School time|Night|Lunch|2|Night is the time to sleep.',
        'All apples are fruits. An apple is a|Vegetable|Fruit|Stone|Toy|1|An apple is a kind of fruit.',
        'Which number does not belong: 2 4 6 7?|2|4|6|7|3|2 4 6 count by twos. 7 does not.'
      ],
      tf: [
        'All cats are animals.|T|Cats belong to animals.',
        'A car can fly like a bird.|F|Cars cannot fly.',
        'If 1 = A then 2 = B.|T|The letter after A is B.',
        'A spoon is used for eating.|T|We eat food with a spoon.',
        'Fish live in water.|T|Fish need water to live.',
        'A stone is a living thing.|F|Stones are not alive.'
      ],
      pairs: [
        'Cat|Animal',
        'Rose|Flower',
        'Morning|Time to wake up',
        '1 = A|2 = B',
        'Odd one out|The thing that does not belong',
        'Grouping|Things that go together'
      ],
      odd: [
        'Cat|Dog|Cow|Table|3|A table is not an animal. The others are animals.',
        'Red|Blue|Green|Banana|3|A banana is a fruit. The others are colours.',
        'One|Two|Three|Sky|3|Sky is not a number. The others are numbers.',
        'Big|Small|Huge|Chocolate|3|Chocolate is not a size word.',
        'Group|Pair|Team|Elephant|3|An elephant is an animal. The others are groups.'
      ]
    }
  ],

  /* classification data for the Sort It game: 'BinA,BinB|Item:binIdx|...' */
  sorts: {
    numbers: '6 to 9,1 to 5|7:0|9:0|8:0|3:1|2:1|5:1',
    numnames: 'Two-digit number,One-digit number|42:0|17:0|39:0|6:1|9:1|4:1',
    sequence: 'Before 8,After 8|7:0|6:0|5:0|9:1|10:1|11:1',
    order: 'Greatest,Smallest|9:0|18:0|15:0|1:1|4:1|2:1',
    addition: 'Sum more than 5,Sum 5 or less|4+4:0|6+3:0|7+2:0|1+1:1|2+2:1|3+1:1',
    addword: 'Story needs adding,Story needs taking away|Gets 2 more toys:0|Buys 3 new pens:0|Wins 5 marbles:0|Eats 1 biscuit:1|Gives away 2 balloons:1|Loses 3 coins:1',
    subtraction: 'Answer less than 5,Answer 5 or more|9-5:0|8-7:0|6-4:0|10-2:1|12-3:1|15-5:1',
    subword: 'Things going away,Things coming to you|Eats 2 of 5 apples:0|Gives 3 to a friend:0|4 birds fly away:0|Gets 4 gifts:1|Finds 2 coins:1|Wins 5 prizes:1',
    ordinal: 'Position word,Counting number|1st:0|2nd:0|3rd:0|4:1|7:1|9:1',
    shapes: 'Flat shape,Solid shape|Circle:0|Square:0|Triangle:0|Ball:1|Box:1|Cone:1',
    patterns: 'Number,Shape|7:0|3:0|9:0|🔵:1|🔺:1|🟩:1',
    time: 'Morning activity,Night activity|Wake up:0|Eat breakfast:0|Go to school:0|Sleep:1|Have dinner:1|Say goodnight:1',
    money: 'Coin,Note|₹5 coin:0|₹2 coin:0|₹10 coin:0|₹20 note:1|₹50 note:1|₹100 note:1',
    measure: 'Measures length,Measures weight|Ruler:0|Thread:0|Measuring tape:0|Balance:1|Bag of rice:1|Sack of flour:1',
    reason: 'Shape,Number|🔷:0|🔶:0|🟩:0|4:1|9:1|6:1'
  }
};
