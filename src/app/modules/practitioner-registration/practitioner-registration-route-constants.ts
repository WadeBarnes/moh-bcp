import { BCP_ROUTES } from '../core-bcp/models/bcp-route-constanst';

export const PRACTITIONER_REGISTRATION_PAGES = {
    HOME: {
        path: 'home',
        fullpath: `${BCP_ROUTES.PRACTITIONER_REGISTRATION}/home`,
        title: 'Application for Medical Services Plan Facility Number'
    },
    PRACTITIONER_INFO: {
        path: 'practitioner-info',
        fullpath: `${BCP_ROUTES.PRACTITIONER_REGISTRATION}/practitioner-info`,
        title: 'Practitioner Information'
    },
    FACILITY_INFO: {
        path: 'facility-info',
        fullpath: `${BCP_ROUTES.PRACTITIONER_REGISTRATION}/facility-info`,
        title: 'Facility Information'
    },
    PRACTITIONER_ASSIGN: {
      path: 'practitioner-assign',
      fullpath: `${BCP_ROUTES.PRACTITIONER_REGISTRATION}/practitioner-assignnpm`,
      title: 'Practitioner Assignment'
  },
    REVIEW: {
        path: 'review',
        fullpath: `${BCP_ROUTES.PRACTITIONER_REGISTRATION}/review`,
        title: 'Review Pracitioner Assignment'
    },
    SUBMISSION: {
        path: 'submission',
        fullpath: `${BCP_ROUTES.PRACTITIONER_REGISTRATION}/submission`,
        title: 'Confirmation of Submission'
    },
};
