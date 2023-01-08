import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selelectMessageDialogState, setMessageDialogOpenState } from 'redux/slices/ui'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import 'components/message-dialog/message-dialog.styl'

export default () => {
  const dispatch = useAppDispatch()
  const dialogState = useAppSelector(selelectMessageDialogState)
  const handleClose = React.useCallback(() => {
    dispatch({ type: 'MODAL_CONFIRM' })
    dispatch(setMessageDialogOpenState({ open: false }))
  }, [])
  const handleCancel = React.useCallback(() => {
    dispatch(setMessageDialogOpenState({ open: false }))
  }, [])

  return (
    <Modal className="message-dialog" basic size="small" open={dialogState.open}>
      <Header>
        <Icon name={dialogState.confirm ? 'question' : 'info'} />
        {dialogState.title}
      </Header>
      <Modal.Content className="content">
        <p>{dialogState.message}</p>
      </Modal.Content>
      <Modal.Actions>
        {dialogState.confirm && (
          <Button basic color="red" inverted onClick={handleCancel}>
            <Icon name="x" /> Cancel{' '}
          </Button>
        )}
        <Button basic color="green" inverted onClick={handleClose}>
          <Icon name="checkmark" /> Okay
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
