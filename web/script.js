/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.addEventListener('DOMContentLoaded', function() {
  const doctorForm = document.getElementById('doctor-form');
  const patientForm = document.getElementById('patient-form');

  doctorForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const doctorData = collectFormData(doctorForm);
    if (validateDoctor(doctorData)) {
      saveDataToJson(doctorData, 'doctors.json');
      alert('¡Doctor guardado con éxito!');
      doctorForm.reset();
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  });

  patientForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const patientData = collectFormData(patientForm);
    if (validatePatient(patientData)) {
      saveDataToJson(patientData, 'patients.json');
      alert('¡Paciente guardado con éxito!');
      patientForm.reset();
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  });

  function collectFormData(form) {
    const formData = {};
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.type !== 'submit') {
        formData[element.id] = element.value;
      }
    }

    return formData;
  }

  function validateDoctor(doctorData) {
    // Implement your validation logic for doctor's form data using regular expressions
    // Here's a simple example:
    const regexCedula = /^[0-9]{9}$/;
    return regexCedula.test(doctorData['doctor-cedula']);
  }

  function validatePatient(patientData) {
    // Implement your validation logic for patient's form data using regular expressions
    // Here's a simple example:
    const regexCedula = /^[0-9]{9}$/;
    return regexCedula.test(patientData['patient-cedula']);
  }

  function saveDataToJson(data, filename) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
});
