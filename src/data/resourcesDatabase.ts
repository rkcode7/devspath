// Enhanced resources database with comprehensive learning materials
export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article' | 'documentation' | 'course' | 'tutorial' | 'book' | 'podcast' | 'interactive' | 'practice' | 'tool';
  platform: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  rating?: number;
  free?: boolean;
  author?: string;
  views?: string;
  tags: string[];
  topicId: string;
}

export const platformLogos: Record<string, string> = {
  'YouTube': '📺',
  'MDN Web Docs': '🌐',
  'freeCodeCamp': '🔥',
  'Coursera': '🎓',
  'Udemy': '📚',
  'Pluralsight': '🔷',
  'Khan Academy': '🏛️',
  'Codecademy': '💻',
  'edX': '🎯',
  'LinkedIn Learning': '💼',
  'Udacity': '🚀',
  'GeeksforGeeks': '⚡',
  'W3Schools': '🌍',
  'Stack Overflow': '📋',
  'GitHub': '🐙',
  'Medium': '📝',
  'Dev.to': '👨‍💻',
  'CSS-Tricks': '🎨',
  'JavaScript.info': '⚡',
  'React.dev': '⚛️',
  'Vue.js': '💚',
  'Angular': '🅰️',
  'Node.js': '🟢',
  'Python.org': '🐍',
  'TensorFlow': '🧠',
  'Kaggle': '📊',
  'AWS': '☁️',
  'Google Cloud': '🌤️',
  'Microsoft Azure': '🔷',
  'Docker': '🐳',
  'Kubernetes': '⚙️'
};

export const resourcesDatabase: Resource[] = [
  // React Basics Resources
  {
    id: 'react-1',
    title: 'React in 100 Seconds',
    description: 'Quick overview of React fundamentals and core concepts',
    url: 'https://youtu.be/Tn6-PIqc4UM',
    type: 'video',
    platform: 'YouTube',
    difficulty: 'Beginner',
    duration: '2 min',
    rating: 4.9,
    free: true,
    author: 'Fireship',
    views: '2.1M',
    tags: ['react', 'fundamentals', 'overview'],
    topicId: 'react-basics'
  },
  {
    id: 'react-2',
    title: 'Official React Documentation - Quick Start',
    description: 'The official React team\'s comprehensive getting started guide',
    url: 'https://react.dev/learn',
    type: 'documentation',
    platform: 'React.dev',
    difficulty: 'Beginner',
    duration: '45 min read',
    rating: 4.8,
    free: true,
    author: 'React Team',
    views: '5.2M',
    tags: ['react', 'documentation', 'official'],
    topicId: 'react-basics'
  },
  {
    id: 'react-3',
    title: 'React Tutorial for Beginners',
    description: 'Complete React course covering components, props, state, and hooks',
    url: 'https://youtu.be/SqcY0GlETPk',
    type: 'video',
    platform: 'YouTube',
    difficulty: 'Beginner',
    duration: '2.5 hours',
    rating: 4.7,
    free: true,
    author: 'Programming with Mosh',
    views: '1.8M',
    tags: ['react', 'tutorial', 'complete-course'],
    topicId: 'react-basics'
  },
  {
    id: 'react-4',
    title: 'React Hooks Explained',
    description: 'Deep dive into React Hooks including useState, useEffect, and custom hooks',
    url: 'https://youtu.be/O6P86uwfdR0',
    type: 'video',
    platform: 'YouTube',
    difficulty: 'Intermediate',
    duration: '45 min',
    rating: 4.8,
    free: true,
    author: 'Web Dev Simplified',
    views: '890K',
    tags: ['react', 'hooks', 'useState', 'useEffect'],
    topicId: 'react-basics'
  },
  {
    id: 'react-5',
    title: 'React Component Patterns',
    description: 'Advanced patterns and best practices for React components',
    url: 'https://kentcdodds.com/blog/react-component-patterns',
    type: 'article',
    platform: 'Kent C. Dodds Blog',
    difficulty: 'Advanced',
    duration: '25 min read',
    rating: 4.6,
    free: true,
    author: 'Kent C. Dodds',
    views: '450K',
    tags: ['react', 'patterns', 'best-practices', 'advanced'],
    topicId: 'react-basics'
  },

  // JavaScript Advanced Resources
  {
    id: 'js-1',
    title: 'JavaScript: The Complete Guide',
    description: 'Comprehensive course covering ES6+, async programming, and advanced concepts',
    url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
    type: 'course',
    platform: 'Udemy',
    difficulty: 'Intermediate',
    duration: '52 hours',
    rating: 4.6,
    free: false,
    author: 'Maximilian Schwarzmüller',
    views: '180K',
    tags: ['javascript', 'es6', 'async', 'complete'],
    topicId: 'javascript-advanced'
  },
  {
    id: 'js-2',
    title: 'You Don\'t Know JS (Book Series)',
    description: 'Deep dive into JavaScript mechanics and advanced concepts',
    url: 'https://github.com/getify/You-Dont-Know-JS',
    type: 'book',
    platform: 'GitHub',
    difficulty: 'Advanced',
    duration: '20+ hours',
    rating: 4.9,
    free: true,
    author: 'Kyle Simpson',
    views: '150K',
    tags: ['javascript', 'deep-dive', 'advanced', 'free'],
    topicId: 'javascript-advanced'
  },
  {
    id: 'js-3',
    title: 'Modern JavaScript Tutorial',
    description: 'Comprehensive tutorial covering modern JavaScript from basics to advanced',
    url: 'https://javascript.info/',
    type: 'tutorial',
    platform: 'JavaScript.info',
    difficulty: 'Beginner',
    duration: '30+ hours',
    rating: 4.8,
    free: true,
    author: 'Ilya Kantor',
    views: '2.5M',
    tags: ['javascript', 'tutorial', 'comprehensive', 'modern'],
    topicId: 'javascript-advanced'
  },

  // Python Fundamentals Resources
  {
    id: 'python-1',
    title: 'Python for Everybody Specialization',
    description: 'Complete Python course from basics to data structures and web scraping',
    url: 'https://www.coursera.org/specializations/python',
    type: 'course',
    platform: 'Coursera',
    difficulty: 'Beginner',
    duration: '8 months',
    rating: 4.8,
    free: true,
    author: 'University of Michigan',
    views: '500K',
    tags: ['python', 'fundamentals', 'university', 'complete'],
    topicId: 'python-fundamentals'
  },
  {
    id: 'python-2',
    title: 'Automate the Boring Stuff with Python',
    description: 'Practical Python programming for total beginners',
    url: 'https://automatetheboringstuff.com/',
    type: 'book',
    platform: 'Online Book',
    difficulty: 'Beginner',
    duration: '15 hours',
    rating: 4.7,
    free: true,
    author: 'Al Sweigart',
    views: '1.2M',
    tags: ['python', 'automation', 'beginner', 'practical'],
    topicId: 'python-fundamentals'
  },

  // Node.js Backend Resources
  {
    id: 'node-1',
    title: 'Node.js Complete Course',
    description: 'Build RESTful APIs and web applications with Node.js and Express',
    url: 'https://youtu.be/TlB_eWDSMt4',
    type: 'video',
    platform: 'YouTube',
    difficulty: 'Intermediate',
    duration: '8 hours',
    rating: 4.7,
    free: true,
    author: 'Programming with Mosh',
    views: '1.5M',
    tags: ['nodejs', 'express', 'api', 'backend'],
    topicId: 'nodejs-backend'
  },
  {
    id: 'node-2',
    title: 'Node.js Official Documentation',
    description: 'Official Node.js documentation with guides and API reference',
    url: 'https://nodejs.org/en/docs/',
    type: 'documentation',
    platform: 'Node.js',
    difficulty: 'All Levels',
    duration: 'Reference',
    rating: 4.8,
    free: true,
    author: 'Node.js Foundation',
    views: '10M+',
    tags: ['nodejs', 'documentation', 'official', 'reference'],
    topicId: 'nodejs-backend'
  },

  // Data Science Resources
  {
    id: 'ds-1',
    title: 'Python for Data Science Handbook',
    description: 'Essential tools for working with data in Python',
    url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
    type: 'book',
    platform: 'GitHub',
    difficulty: 'Intermediate',
    duration: '25+ hours',
    rating: 4.8,
    free: true,
    author: 'Jake VanderPlas',
    views: '800K',
    tags: ['python', 'data-science', 'pandas', 'numpy'],
    topicId: 'python-for-data-science'
  },
  {
    id: 'ds-2',
    title: 'Machine Learning Course by Andrew Ng',
    description: 'Stanford\'s famous machine learning course covering algorithms and applications',
    url: 'https://www.coursera.org/learn/machine-learning',
    type: 'course',
    platform: 'Coursera',
    difficulty: 'Intermediate',
    duration: '11 weeks',
    rating: 4.9,
    free: true,
    author: 'Andrew Ng',
    views: '4.5M',
    tags: ['machine-learning', 'algorithms', 'stanford', 'andrew-ng'],
    topicId: 'machine-learning'
  },
  {
    id: 'ds-3',
    title: 'Kaggle Learn',
    description: 'Free micro-courses on data science topics with hands-on exercises',
    url: 'https://www.kaggle.com/learn',
    type: 'interactive',
    platform: 'Kaggle',
    difficulty: 'All Levels',
    duration: 'Various',
    rating: 4.7,
    free: true,
    author: 'Kaggle',
    views: '2M+',
    tags: ['data-science', 'interactive', 'hands-on', 'kaggle'],
    topicId: 'data-analysis-python'
  },

  // Mobile Development Resources
  {
    id: 'mobile-1',
    title: 'React Native Complete Course',
    description: 'Build cross-platform mobile apps with React Native',
    url: 'https://youtu.be/0-S5a0eXPoc',
    type: 'video',
    platform: 'YouTube',
    difficulty: 'Intermediate',
    duration: '6 hours',
    rating: 4.6,
    free: true,
    author: 'Programming with Mosh',
    views: '1.2M',
    tags: ['react-native', 'mobile', 'cross-platform'],
    topicId: 'react-native'
  },
  {
    id: 'mobile-2',
    title: 'Flutter Documentation',
    description: 'Official Flutter documentation with tutorials and guides',
    url: 'https://docs.flutter.dev/',
    type: 'documentation',
    platform: 'Flutter',
    difficulty: 'All Levels',
    duration: 'Reference',
    rating: 4.8,
    free: true,
    author: 'Flutter Team',
    views: '5M+',
    tags: ['flutter', 'documentation', 'official'],
    topicId: 'flutter'
  },
  {
    id: 'mobile-3',
    title: 'iOS App Development with Swift',
    description: 'Complete iOS development course using Swift and Xcode',
    url: 'https://developer.apple.com/swift/',
    type: 'course',
    platform: 'Apple Developer',
    difficulty: 'Intermediate',
    duration: '40+ hours',
    rating: 4.7,
    free: true,
    author: 'Apple',
    views: '800K',
    tags: ['ios', 'swift', 'xcode', 'apple'],
    topicId: 'native-ios'
  },

  // DevOps Resources
  {
    id: 'devops-1',
    title: 'Docker Complete Course',
    description: 'Master Docker containerization from basics to advanced concepts',
    url: 'https://youtu.be/3c-iBn73dDE',
    type: 'video',
    platform: 'YouTube',
    difficulty: 'Intermediate',
    duration: '4 hours',
    rating: 4.8,
    free: true,
    author: 'TechWorld with Nana',
    views: '1.8M',
    tags: ['docker', 'containers', 'devops'],
    topicId: 'containerization'
  },
  {
    id: 'devops-2',
    title: 'Kubernetes Documentation',
    description: 'Official Kubernetes documentation and tutorials',
    url: 'https://kubernetes.io/docs/',
    type: 'documentation',
    platform: 'Kubernetes',
    difficulty: 'Advanced',
    duration: 'Reference',
    rating: 4.7,
    free: true,
    author: 'Kubernetes Community',
    views: '3M+',
    tags: ['kubernetes', 'orchestration', 'official'],
    topicId: 'orchestration'
  },
  {
    id: 'devops-3',
    title: 'AWS Cloud Practitioner',
    description: 'Introduction to Amazon Web Services and cloud computing',
    url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/',
    type: 'course',
    platform: 'AWS',
    difficulty: 'Beginner',
    duration: '6 hours',
    rating: 4.6,
    free: true,
    author: 'Amazon Web Services',
    views: '2M+',
    tags: ['aws', 'cloud', 'certification'],
    topicId: 'cloud-platforms'
  },

  // Additional comprehensive resources for various topics
  {
    id: 'html-css-1',
    title: 'HTML & CSS Complete Course',
    description: 'Learn HTML and CSS from scratch with modern techniques',
    url: 'https://youtu.be/mU6anWqZJcc',
    type: 'video',
    platform: 'YouTube',
    difficulty: 'Beginner',
    duration: '4 hours',
    rating: 4.8,
    free: true,
    author: 'freeCodeCamp',
    views: '3.2M',
    tags: ['html', 'css', 'web-development', 'beginner'],
    topicId: 'html-css'
  },
  {
    id: 'typescript-1',
    title: 'TypeScript Handbook',
    description: 'Official TypeScript documentation and learning guide',
    url: 'https://www.typescriptlang.org/docs/',
    type: 'documentation',
    platform: 'TypeScript',
    difficulty: 'Intermediate',
    duration: 'Reference',
    rating: 4.9,
    free: true,
    author: 'Microsoft',
    views: '2M+',
    tags: ['typescript', 'documentation', 'official'],
    topicId: 'typescript'
  },
  {
    id: 'algorithms-1',
    title: 'Algorithms Specialization',
    description: 'Stanford algorithms course covering fundamental algorithms and data structures',
    url: 'https://www.coursera.org/specializations/algorithms',
    type: 'course',
    platform: 'Coursera',
    difficulty: 'Advanced',
    duration: '6 months',
    rating: 4.8,
    free: true,
    author: 'Stanford University',
    views: '300K',
    tags: ['algorithms', 'data-structures', 'stanford', 'computer-science'],
    topicId: 'algorithms-data-structures'
  },
  {
    id: 'ml-1',
    title: 'Hands-On Machine Learning',
    description: 'Practical machine learning with Scikit-Learn and TensorFlow',
    url: 'https://github.com/ageron/handson-ml2',
    type: 'book',
    platform: 'GitHub',
    difficulty: 'Intermediate',
    duration: '30+ hours',
    rating: 4.9,
    free: true,
    author: 'Aurélien Géron',
    views: '35K',
    tags: ['machine-learning', 'scikit-learn', 'tensorflow', 'practical'],
    topicId: 'machine-learning'
  },
  {
    id: 'security-1',
    title: 'Cybersecurity Fundamentals',
    description: 'Introduction to cybersecurity concepts and practices',
    url: 'https://www.edx.org/course/introduction-to-cybersecurity',
    type: 'course',
    platform: 'edX',
    difficulty: 'Beginner',
    duration: '6 weeks',
    rating: 4.5,
    free: true,
    author: 'University of Washington',
    views: '120K',
    tags: ['cybersecurity', 'fundamentals', 'university'],
    topicId: 'ethical-hacking'
  },
  {
    id: 'design-1',
    title: 'Figma UI Design Tutorial',
    description: 'Complete guide to UI design using Figma',
    url: 'https://youtu.be/FTlczfEyHnk',
    type: 'video',
    platform: 'YouTube',
    difficulty: 'Beginner',
    duration: '2 hours',
    rating: 4.7,
    free: true,
    author: 'DesignCourse',
    views: '890K',
    tags: ['figma', 'ui-design', 'tutorial'],
    topicId: 'ui-ux-design'
  }
];

export const getResourcesByTopic = (topicId: string): Resource[] => {
  return resourcesDatabase.filter(resource => resource.topicId === topicId);
};

export const getResourcesByPlatform = (platform: string): Resource[] => {
  return resourcesDatabase.filter(resource => resource.platform === platform);
};

export const getResourcesByType = (type: string): Resource[] => {
  return resourcesDatabase.filter(resource => resource.type === type);
};

export const getFreeResources = (): Resource[] => {
  return resourcesDatabase.filter(resource => resource.free);
};

export const getResourcesByDifficulty = (difficulty: string): Resource[] => {
  return resourcesDatabase.filter(resource => resource.difficulty === difficulty);
};

export const searchResources = (query: string): Resource[] => {
  const lowercaseQuery = query.toLowerCase();
  return resourcesDatabase.filter(resource =>
    resource.title.toLowerCase().includes(lowercaseQuery) ||
    resource.description.toLowerCase().includes(lowercaseQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    resource.platform.toLowerCase().includes(lowercaseQuery) ||
    resource.author?.toLowerCase().includes(lowercaseQuery)
  );
};