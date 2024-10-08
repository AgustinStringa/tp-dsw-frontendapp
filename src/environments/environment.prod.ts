const apiUrl = 'https://api.gimnasio.com';

export const environment = {
  production: true,
  apiUrl: apiUrl,
  authUrl: apiUrl + '/auth',
  clientsUrl: apiUrl + '/clients',
  clientsWithMembershipUrl: apiUrl + '/clients/membership-active',
  classTypesUrl: apiUrl + '/classes/types',
  classesUrl: apiUrl + '/classes',
  createRoutineUrl: apiUrl + '/routines/routines',
  exerciseRoutinesUrl: apiUrl + '/routines/exerciseroutines',
  exercisesUrl: apiUrl + '/routines/exercises',
  goalsUrl: apiUrl + '/clients/goals',
  membershipsUrl: apiUrl + '/memberships',
  membershipTypesUrl: apiUrl + '/memberships/types',
  paymentsUrl: apiUrl + '/memberships/payments',
  progressesUrl: apiUrl + '/clients/progresses',
  routinesUrl: apiUrl + '/routines',
  trainersUrl: apiUrl + '/trainers',
  registrationUrl: apiUrl + '/classes/registration',
};
