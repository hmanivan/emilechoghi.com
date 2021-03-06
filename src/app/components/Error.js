import React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

class FormError extends React.Component {
    render() {
        return (
            <Dialog open={true} onRequestClose={this.props.close}>
                <DialogTitle className="error__title">Oops, your message wasn't sent <i className="icon-tongue" /></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        An error occurred, please try again
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="accent">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default FormError;