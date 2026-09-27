/* ============================================================
   ENROLMENT FORM
   Client-side validation and the application reference number.
   ============================================================ */
"use strict";

/* ============================================================
   ENROLMENT FORM
   ============================================================ */
function setFieldError(id, invalid) {
    const field = $(id);
    const msg = $(id + 'Err');
    if (field) { if (invalid) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid'); }
    if (msg) { if (invalid) msg.setAttribute('data-shown', ''); else msg.removeAttribute('data-shown'); }
}

function handleEnrollmentSubmit(e) {
    e.preventDefault();
    const name = $('fullName');
    const email = $('email');
    const programme = $('programme');
    const consent = $('consent');

    let firstBad = null;
    const nameBad = !name.value.trim();
    const emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
    const programmeBad = !programme.value;
    const consentBad = !consent.checked;

    [[name, nameBad], [email, emailBad], [programme, programmeBad], [consent, consentBad]].forEach((pair) => {
        setFieldError(pair[0].id, pair[1]);
        if (pair[1] && !firstBad) firstBad = pair[0];
    });

    if (firstBad) {
        showToast('Check the highlighted fields', 'Some required details are missing or invalid.', 'error');
        firstBad.focus();
        return;
    }

    const ref = 'ZHS-APP-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
    const course = courseById(programme.value);
    $('enrollSuccessText').textContent =
        'Thank you, ' + name.value.trim() + '. Your request for \u201c' + (course ? plain(course.title) : programme.value) + '\u201d is logged as reference ' + ref +
        '. An academic adviser and your proposed tutor will email demo class links and a 1:1 consultation slot within one working day.';
    $('enrollSuccess').hidden = false;
    persist('lastApplication', { ref: ref, at: new Date().toISOString() });
    $('enrollForm').reset();
    setFieldError('fullName', false);
    setFieldError('email', false);
    setFieldError('programme', false);
    setFieldError('consent', false);
    $('enrollSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Application received', 'Reference ' + ref);
}
