const apiUrl = 'https://gimnasio-iron-haven.onrender.com/api';

export const environment = {
  production: true,
  activeMembershipsUrl: apiUrl + '/memberships/active',
  apiUrl: apiUrl,
  authUrl: apiUrl + '/auth',
  clientsUrl: apiUrl + '/clients',
  classTypesUrl: apiUrl + '/classes/types',
  classesUrl: apiUrl + '/classes',
  createRoutineUrl: apiUrl + '/routines/routines',
  exerciseRoutinesUrl: apiUrl + '/routines/exerciseroutines',
  exercisesUrl: apiUrl + '/routines/exercises',
  goalsUrl: apiUrl + '/clients/goals',
  membershipsUrl: apiUrl + '/memberships',
  membershipTypesUrl: apiUrl + '/memberships/types',
  messagesUrl: apiUrl + '/messages',
  outstandingMembershipsUrl: apiUrl + '/memberships/outstanding',
  paymentsUrl: apiUrl + '/memberships/payments',
  progressesUrl: apiUrl + '/clients/progresses',
  registrationUrl: apiUrl + '/classes/registration',
  routinesUrl: apiUrl + '/routines',
  socketUrl: 'https://gimnasio-iron-haven.onrender.com/',
  trainersUrl: apiUrl + '/trainers',
  userPaymentUrl: apiUrl + '/user-payment/',
};
