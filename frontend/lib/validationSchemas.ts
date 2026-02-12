import * as yup from 'yup';

export const profileValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  riskTolerance: yup
    .string()
    .oneOf(
      ['conservative', 'moderate', 'aggressive', ''],
      'Invalid risk tolerance'
    )
    .required('Risk tolerance is required'),
  goals: yup.string().optional(),
});
