import { AbstractControl, ValidationErrors } from '@angular/forms';

export function endAfterStartValidator(
  form: AbstractControl
): ValidationErrors | null {
  const startTime = form.get('startTime');
  const endTime = form.get('endTime');

  if (!startTime || !endTime) return null;

  if (endTime.value <= startTime.value) {
    if (startTime.hasError('required') || endTime.hasError('required'))
      return null;

    startTime.setErrors({ endBeforeStart: true });
    endTime.setErrors({ endBeforeStart: true });
    return { endBeforeStart: true };
  }

  deleteEndBeforeStartError(startTime);
  deleteEndBeforeStartError(endTime);

  return null;
}

function deleteEndBeforeStartError(control: AbstractControl) {
  if (control.errors && control.errors['endBeforeStart']) {
    const errors = control.errors;
    delete errors['endBeforeStart'];
    control.setErrors(Object.keys(errors).length > 0 ? errors : null);
  }
}
