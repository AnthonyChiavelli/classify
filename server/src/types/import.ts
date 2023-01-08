import IStudent from 'types/student'

export default interface IImportResult {
  errors: Array<{
    row: number
    error: string
  }>
  created: IStudent[]
}
