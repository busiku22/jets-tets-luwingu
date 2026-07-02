import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // ==========================================
  // DOMAIN 1: Sustainable Systems & Environment (SSE)
  // ==========================================
  {
    id: 'sse-q1',
    type: 'quiz',
    domain: 'Sustainable Systems & Environment (SSE)',
    focusArea: 'Climate adaptation',
    text: 'In Luwingu district, which farming practice helps soils retain water during dry seasons?',
    options: [
      'Burning crop residues after harvest',
      'Conservation farming (minimum tillage and mulching)',
      'Removing all trees around the fields',
      'Adding large amounts of chemical fertilizers only'
    ],
    correctAnswer: 'Conservation farming (minimum tillage and mulching)',
    points: 10,
    explanation: 'Conservation farming uses mulching (leaving leaves/stalks on soil) which acts as a blanket, protecting soil from direct sun and keeping it moist.',
    createdByTeacher: false
  },
  {
    id: 'sse-q2',
    type: 'quiz',
    domain: 'Sustainable Systems & Environment (SSE)',
    focusArea: 'Renewable energy',
    text: 'What is the most clean and abundant renewable energy source that schools in Luwingu can use for lighting?',
    options: [
      'Diesel generators',
      'Paraffin lamps',
      'Solar energy (using solar panels)',
      'Coal stoves'
    ],
    correctAnswer: 'Solar energy (using solar panels)',
    points: 10,
    explanation: 'Solar energy harnesses light from the sun, making it clean, infinite, and ideal for rural school lighting without requiring fuel.',
    createdByTeacher: false
  },
  {
    id: 'sse-q3',
    type: 'quiz',
    domain: 'Sustainable Systems & Environment (SSE)',
    focusArea: 'Waste management',
    text: 'Instead of burning dry leaves and organic waste at school, what is the best way to recycle them?',
    options: [
      'Throwing them into the local river',
      'Digging a pit and making compost manure',
      'Leaving them on the road',
      'Burying them under plastic bags'
    ],
    correctAnswer: 'Digging a pit and making compost manure',
    points: 10,
    explanation: 'Compost manure turns organic waste into natural food for crops, enriching the soil and reducing the need for chemical fertilizers.',
    createdByTeacher: false
  },
  {
    id: 'sse-q4',
    type: 'quiz',
    domain: 'Sustainable Systems & Environment (SSE)',
    focusArea: 'Water systems',
    text: 'Which water collection system collects clean water directly from rain for school garden irrigation?',
    options: [
      'Roof rainwater harvesting',
      'Digging shallow open mud pits',
      'Diverting dirty road run-off',
      'Pumping water from swamps without filtration'
    ],
    correctAnswer: 'Roof rainwater harvesting',
    points: 10,
    explanation: 'Roof rainwater harvesting gathers rain using gutters on school roofs, storing clean water in tanks for dry season gardening.',
    createdByTeacher: false
  },

  // ==========================================
  // DOMAIN 2: Health, Food & Human Wellbeing System (HFWS)
  // ==========================================
  {
    id: 'hfws-q1',
    type: 'quiz',
    domain: 'Health, Food & Human Wellbeing System (HFWS)',
    focusArea: 'Public health solutions',
    text: 'What is the most effective and low-cost way to prevent the spread of germs at school?',
    options: [
      'Washing hands with clean water and soap/ash',
      'Using perfume on hands',
      'Wiping hands on school uniforms',
      'Washing hands only with cold water without rubbing'
    ],
    correctAnswer: 'Washing hands with clean water and soap/ash',
    points: 10,
    explanation: 'Washing hands with soap or wood ash removes germs from hands and prevents common school illnesses like diarrhea and flu.',
    createdByTeacher: false
  },
  {
    id: 'hfws-q2',
    type: 'quiz',
    domain: 'Health, Food & Human Wellbeing System (HFWS)',
    focusArea: 'Nutrition systems',
    text: 'Which local Zambian food combination provides a highly balanced meal for growing children?',
    options: [
      'Nshima with sweet sugar only',
      'Nshima with rape (greens) and groundnut powder or fish',
      'Sweet potatoes with soda',
      'White bread with tea'
    ],
    correctAnswer: 'Nshima with rape (greens) and groundnut powder or fish',
    points: 10,
    explanation: 'This combines energy (Nshima), vitamins (rape greens), and proteins/healthy fats (groundnuts or fish) to feed the brain and body.',
    createdByTeacher: false
  },
  {
    id: 'hfws-q3',
    type: 'quiz',
    domain: 'Health, Food & Human Wellbeing System (HFWS)',
    focusArea: 'Food security',
    text: 'What is a traditional, safe method to preserve harvested sweet potatoes so they do not rot?',
    options: [
      'Leaving them under the rain',
      'Drying them in the sun to make "Fitanda/Kanyaminyami"',
      'Keeping them in plastic airtight bags when wet',
      'Spraying them with heavy pesticide liquids'
    ],
    correctAnswer: 'Drying them in the sun to make "Fitanda/Kanyaminyami"',
    points: 10,
    explanation: 'Sun-drying removes moisture from sweet potatoes, preventing mold and pests, allowing families to eat them during food-scarce periods.',
    createdByTeacher: false
  },
  {
    id: 'hfws-q4',
    type: 'quiz',
    domain: 'Health, Food & Human Wellbeing System (HFWS)',
    focusArea: 'Water safety',
    text: 'To make water from a local Luwingu borehole or stream perfectly safe to drink, you should:',
    options: [
      'Let it sit in the sun for 5 minutes',
      'Boil it completely or treat it with chlorine',
      'Filter it through a clean school sweater only',
      'Add salt and shake it'
    ],
    correctAnswer: 'Boil it completely or treat it with chlorine',
    points: 10,
    explanation: 'Boiling water kills all pathogens, and chlorine disinfects it, making it 100% safe to drink and preventing waterborne diseases.',
    createdByTeacher: false
  },

  // ==========================================
  // DOMAIN 3: Digital, Robotics & Intelligent Systems (DRIS)
  // ==========================================
  {
    id: 'dris-q1',
    type: 'quiz',
    domain: 'Digital, Robotics & Intelligent Systems (DRIS)',
    focusArea: 'Software solutions',
    text: 'A computer program is a set of step-by-step instructions. What is this set of instructions called?',
    options: [
      'A hardware piece',
      'An algorithm',
      'A mechanical gear',
      'A keyboard layout'
    ],
    correctAnswer: 'An algorithm',
    points: 10,
    explanation: 'An algorithm is a clear, step-by-step instruction set that computers follow to perform tasks or solve problems.',
    createdByTeacher: false
  },
  {
    id: 'dris-q2',
    type: 'quiz',
    domain: 'Digital, Robotics & Intelligent Systems (DRIS)',
    focusArea: 'Automation',
    text: 'What kind of sensor would a school use to automatically ring the school bell when it is exactly 08:00 hours?',
    options: [
      'A temperature sensor',
      'A real-time digital clock/timer',
      'A motion detector',
      'A sound sensor'
    ],
    correctAnswer: 'A real-time digital clock/timer',
    points: 10,
    explanation: 'A digital clock/timer checks the actual time and triggers the electric bell automatically at specified schedules.',
    createdByTeacher: false
  },
  {
    id: 'dris-q3',
    type: 'quiz',
    domain: 'Digital, Robotics & Intelligent Systems (DRIS)',
    focusArea: 'IoT systems',
    text: 'What does IoT (Internet of Things) mean?',
    options: [
      'Using the internet only to chat and watch videos',
      'Connecting physical objects (like water pumps or soil sensors) to the internet to share data',
      'A typewriter connected to a solar panel',
      'A collection of computer cables'
    ],
    correctAnswer: 'Connecting physical objects (like water pumps or soil sensors) to the internet to share data',
    points: 10,
    explanation: 'IoT allows physical equipment like sensors in a farm to send soil dampness levels directly to a farmer\'s mobile phone.',
    createdByTeacher: false
  },
  {
    id: 'dris-q4',
    type: 'quiz',
    domain: 'Digital, Robotics & Intelligent Systems (DRIS)',
    focusArea: 'AI applications',
    text: 'In smart farming, how can Artificial Intelligence (AI) help a small-scale Luwingu farmer?',
    options: [
      'By weeding the entire farm by hand automatically without any machinery',
      'By looking at photos of plant leaves and automatically naming the crop disease',
      'By making it rain whenever the farmer wants',
      'By multiplying the size of potatoes overnight'
    ],
    correctAnswer: 'By looking at photos of plant leaves and automatically naming the crop disease',
    points: 10,
    explanation: 'AI models can analyze visual patterns in leaf images to diagnose diseases instantly, helping farmers take corrective action.',
    createdByTeacher: false
  },

  // ==========================================
  // DOMAIN 4: Engineering, Design & Production Systems (EDPS)
  // ==========================================
  {
    id: 'edps-q1',
    type: 'quiz',
    domain: 'Engineering, Design & Production Systems (EDPS)',
    focusArea: 'Infrastructure design',
    text: 'When building a small footbridge across a local stream, which shape is structurally the strongest and most stable to use?',
    options: [
      'Squares',
      'Triangles (Truss design)',
      'Ovals',
      'Single vertical columns'
    ],
    correctAnswer: 'Triangles (Truss design)',
    points: 10,
    explanation: 'Triangles are structurally rigid. When weight is applied to a triangle, it is distributed evenly to all sides, making bridges very strong.',
    createdByTeacher: false
  },
  {
    id: 'edps-q2',
    type: 'quiz',
    domain: 'Engineering, Design & Production Systems (EDPS)',
    focusArea: 'Manufacturing systems',
    text: 'To make hand-pressed bricks stronger and more durable for building rural school classrooms, what should be added to the clay?',
    options: [
      'Dry grass and small amounts of cement/sand',
      'Plastics and sweet water',
      'Soap powder and leaves',
      'Powdered charcoal only'
    ],
    correctAnswer: 'Dry grass and small amounts of cement/sand',
    points: 10,
    explanation: 'Adding sand, binding clay, or a small cement ratio helps the brick bind strongly and withstand heavy rainfall without crumbling.',
    createdByTeacher: false
  },
  {
    id: 'edps-q3',
    type: 'quiz',
    domain: 'Engineering, Design & Production Systems (EDPS)',
    focusArea: 'Product design',
    text: 'What is a key benefit of a "Mbaula" (improved biomass cookstove) over a simple three-stone open wood fire?',
    options: [
      'It requires bigger tree trunks to burn',
      'It uses much less firewood and produces less harmful smoke',
      'It cooks food in 2 seconds',
      'It does not require any air to burn'
    ],
    correctAnswer: 'It uses much less firewood and produces less harmful smoke',
    points: 10,
    explanation: 'Improved cookstoves are insulated to focus heat directly on the pot, meaning families need to cut fewer trees for cooking.',
    createdByTeacher: false
  },

  // ==========================================
  // DOMAIN 5: Mathematical Modelling & Investigation (MMSI)
  // ==========================================
  {
    id: 'mmsi-q1',
    type: 'quiz',
    domain: 'Mathematical Modelling & Investigation (MMSI)',
    focusArea: 'Data analysis',
    text: 'If a school JETS garden harvests 10kg, 15kg, and 20kg of cabbage in three weeks, what is the average weekly cabbage harvest?',
    options: [
      '10 kg',
      '15 kg',
      '20 kg',
      '45 kg'
    ],
    correctAnswer: '15 kg',
    points: 10,
    explanation: 'Average = (10 + 15 + 20) / 3 = 45 / 3 = 15 kg.',
    createdByTeacher: false
  },
  {
    id: 'mmsi-q2',
    type: 'quiz',
    domain: 'Mathematical Modelling & Investigation (MMSI)',
    focusArea: 'Simulation models',
    text: 'What is a mathematical model used for in scientific research?',
    options: [
      'Drawing beautiful paintings of animals',
      'Using mathematical equations to predict real-world changes (like weather or crop growth)',
      'Constructing a wooden scale model of a house only',
      'A list of numbers without any meaning'
    ],
    correctAnswer: 'Using mathematical equations to predict real-world changes (like weather or crop growth)',
    points: 10,
    explanation: 'Mathematical models use formulas to simulate real situations, letting scientists test ideas before building them physically.',
    createdByTeacher: false
  },
  {
    id: 'mmsi-q3',
    type: 'quiz',
    domain: 'Mathematical Modelling & Investigation (MMSI)',
    focusArea: 'Scientific research',
    text: 'When performing an experiment to see how different soils affect bean growth, which variable must be kept exactly the same for all pots?',
    options: [
      'The type of soil',
      'The amount of water and sunlight received by each bean',
      'The height of the beans',
      'The size of the pot colors'
    ],
    correctAnswer: 'The amount of water and sunlight received by each bean',
    points: 10,
    explanation: 'Water and sunlight are "controlled variables." They must be kept constant so that any difference in bean growth is strictly caused by the soil type.',
    createdByTeacher: false
  },

  // ==========================================
  // OLYMPIAD ALIGNMENT: Primary Science
  // ==========================================
  {
    id: 'oly-sci-1',
    type: 'olympiad',
    domain: 'Sustainable Systems & Environment (SSE)',
    focusArea: 'Climate adaptation',
    subjectAlignment: 'Primary Science',
    section: 'Section A',
    text: 'The climate in Southern and Central Africa is changing, causing longer dry spells. Which adaptive action helps smallholder farmers protect their soils from baking dry?',
    options: [
      'Deforestation of surrounding woodlands to increase wind flow',
      'Planting native agroforestry trees like Gliricidia sepium to provide partial shade and fix nitrogen',
      'Flooding the soils with salt water to clean them',
      'Leaving the soil entirely bare and tilling it deeply every week'
    ],
    correctAnswer: 'Planting native agroforestry trees like Gliricidia sepium to provide partial shade and fix nitrogen',
    points: 20,
    explanation: 'Agroforestry trees create a favorable microclimate, shelter crops from dry winds, and drop leaves that decompose into natural organic compost.',
    createdByTeacher: false
  },
  {
    id: 'oly-sci-2',
    type: 'olympiad',
    domain: 'Health, Food & Human Wellbeing System (HFWS)',
    focusArea: 'Nutrition systems',
    subjectAlignment: 'Primary Science',
    section: 'Section B',
    text: 'Vitamin A deficiency can cause childhood blindness. What biofortified food has been successfully bred in Zambia to tackle this health challenge?',
    options: [
      'Purple cabbage',
      'Provitamin A Orange Maize',
      'Salty water sugarcane',
      'White dry cassava'
    ],
    correctAnswer: 'Provitamin A Orange Maize',
    points: 20,
    explanation: 'Orange maize is scientifically bred to contain high levels of beta-carotene, which the human body converts into Vitamin A, essential for healthy eyes.',
    createdByTeacher: false
  },

  // ==========================================
  // OLYMPIAD ALIGNMENT: Primary Creative & Technology Studies
  // ==========================================
  {
    id: 'oly-cts-1',
    type: 'olympiad',
    domain: 'Digital, Robotics & Intelligent Systems (DRIS)',
    focusArea: 'IoT systems',
    subjectAlignment: 'Primary Creative & Technology Studies',
    section: 'Section A',
    text: 'A smart JETS greenhouse in Luwingu uses a soil moisture sensor linked to a micro-controller. If the soil dryness level exceeds 70%, what command does the controller send?',
    options: [
      'Turn off the ventilation fan',
      'Open the solenoid water valve to initiate irrigation',
      'De-energize the entire solar battery backup bank',
      'Ring the high-voltage alarm bell'
    ],
    correctAnswer: 'Open the solenoid water valve to initiate irrigation',
    points: 20,
    explanation: 'The controller automates irrigation by reading the moisture deficit and opening the valve, saving water and keeping crops healthy.',
    createdByTeacher: false
  },
  {
    id: 'oly-cts-2',
    type: 'olympiad',
    domain: 'Engineering, Design & Production Systems (EDPS)',
    focusArea: 'Product design',
    subjectAlignment: 'Primary Creative & Technology Studies',
    section: 'Section B',
    text: 'In designing a solar crop dryer for cassava slices, why is the internal air chamber painted black?',
    options: [
      'To prevent dust from showing on the walls',
      'Because black surfaces absorb the maximum solar thermal radiation to heat the air',
      'To keep insects away who are afraid of the color black',
      'To make the dryer look beautiful from the street'
    ],
    correctAnswer: 'Because black surfaces absorb the maximum solar thermal radiation to heat the air',
    points: 20,
    explanation: 'Matte black paint absorbs sunlight and converts it to thermal energy, heating the incoming air to quickly dry cassava and prevent spoilage.',
    createdByTeacher: false
  },

  // ==========================================
  // OLYMPIAD ALIGNMENT: Primary Mathematics
  // ==========================================
  {
    id: 'oly-math-1',
    type: 'olympiad',
    domain: 'Mathematical Modelling & Investigation (MMSI)',
    focusArea: 'Data analysis',
    subjectAlignment: 'Primary Mathematics',
    section: 'Section A',
    text: 'A JETS student measures the height of a maize plant every week for 4 weeks. The heights are: 20cm, 40cm, 70cm, and 110cm. What is the rate of growth in the fourth week (from Week 3 to Week 4)?',
    options: [
      '20 cm per week',
      '30 cm per week',
      '40 cm per week',
      '110 cm per week'
    ],
    correctAnswer: '40 cm per week',
    points: 20,
    explanation: 'Growth in Week 4 = Height at Week 4 (110cm) minus Height at Week 3 (70cm) = 40cm.',
    createdByTeacher: false
  },
  {
    id: 'oly-math-2',
    type: 'olympiad',
    domain: 'Mathematical Modelling & Investigation (MMSI)',
    focusArea: 'Scientific research',
    subjectAlignment: 'Primary Mathematics',
    section: 'Section B',
    text: 'To test if organic compost yields more tomatoes than chemical fertilizer, a student grows 5 tomato plants with compost and 5 with fertilizer. What is the main parameter they should measure to conclude their investigation scientifically?',
    options: [
      'The leaf shape of the tomatoes',
      'The total weight (yield) of ripe tomatoes harvested from each group in kilograms',
      'The color of the planting pots',
      'The number of bees visiting the school garden'
    ],
    correctAnswer: 'The total weight (yield) of ripe tomatoes harvested from each group in kilograms',
    points: 20,
    explanation: 'Measuring the total harvest weight in kilograms provides quantitative evidence to directly compare the nutritional efficiency of both farming inputs.',
    createdByTeacher: false
  }
];
