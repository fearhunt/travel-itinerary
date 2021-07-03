import swal from 'sweetalert';

export const actions = {
  displaySuccess(context, res) {
    console.log(res);
    swal("Notification", res.message, "success");
  },

  displayError(context, err) {
    console.log(err);
    swal("Notification", err.message, "error");
  }
}