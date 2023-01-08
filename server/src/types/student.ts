export default interface IStudent {
  _id: string
  firstName: string
  lastName: string
  familyId: string
  gradeLevel: number
  school: string
  areasOfConcern: Array<string>
  notes?: string
}
