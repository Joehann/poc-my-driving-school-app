export type AddStudentRequest = {
    id: string;
    name: string;
    qualification: 'licenseA' | 'licenseB';
    phoneNumber: string;
    recordNumber: string;
    postalAddress: string;
  };
  
  export type UpdateStudentProgressRequest = {
    studentId: string;
    skillAcquired: string;
  };

  export type FindStudentsByFiltersRequest = {
    name?: string;
    phoneNumber?: string;
    recordNumber?: string;
  }