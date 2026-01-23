import Swal from "sweetalert2";

export const useAlert = (options: {
  title: string;
  type: "success" | "error" | "warning" | "info" | "question";
  text?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  callBack?: () => void;
}) => {
  return Swal.fire({
    ...options,
    icon: options.type,
    customClass: "my-swal",
  }).then((result) => {
    if (result.isConfirmed) {
      if (options.callBack) {
        options.callBack();
      } else {
        Swal.close();
      }
    } else if (result.isDenied) {
      Swal.close();
    }
  });
};
