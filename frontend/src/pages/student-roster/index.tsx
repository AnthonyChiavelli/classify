import StudentAdd from 'components/student-add'
import StudentTable from 'components/student-roster-table'
import React from 'react'
import Papa from 'papaparse'
import { Button, Icon } from 'semantic-ui-react'
import { useAppDispatch } from 'redux/hooks'
import { importStudentsAction } from 'redux/sagas/students/actions'
import IStudent from 'types/student'
import { setMessageDialogOpenState } from 'redux/slices/ui'

export default () => {
  const dispatch = useAppDispatch()

  const fileInputRef = React.useRef<HTMLInputElement>()
  const handleFileChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    // const reader = new FileReader()
    // reader.readAsText(event.target.files[0], 'UTF-8')
    Papa.parse(event.target.files[0], {
      header: true,
      complete: (results: any) => {
        if (results.errors.length > 0) {
          dispatch(
            setMessageDialogOpenState({
              open: true,
              title: 'Invalid CSV',
              message: 'There is a problem with this file. Contact Support',
            })
          )
          // eslint-disable-next-line no-console
          console.error(results.errors)
        } else {
          dispatch(importStudentsAction(results.data as IStudent[]))
        }
      },
    })
    event.target.value = ''
  }, [])
  return (
    <div>
      <div>
        <StudentAdd />
        <Button color="orange" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          <Icon name="upload" />
          Import from CSV
        </Button>
        <input ref={fileInputRef} type="file" hidden onInput={handleFileChange} />
      </div>
      <div>
        <StudentTable />
      </div>
    </div>
  )
}
