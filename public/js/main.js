const btnMes = document.getElementById("btn-mes");
const btnAnio = document.getElementById("btn-anio");
const planes = document.querySelectorAll(".plan");



function togglePlanes(tipo, event){
    const buttons = document.querySelectorAll('.toggle-btns button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const planes = document.querySelectorAll('.plan');
    planes.forEach(plan => {
        if(tipo === 'mes'){
            plan.querySelector('.precio').textContent = plan.dataset.planMes;
        } else {
            plan.querySelector('.precio').textContent = plan.dataset.planAnio;
        }
    });
}

function enviarFormulario(e){
    e.preventDefault();
    const form = e.target;
    const nombre = form.nombre.value;
    const email = form.email.value;
    const mensaje = form.mensaje.value;
    console.log('Formulario enviado:', {nombre,email,mensaje});
    document.getElementById('resultado').textContent = '¡Mensaje enviado correctamente!';
    form.reset();
    return false;
}


btnMes.addEventListener("click", () => {
  planes.forEach(plan => {
    if(plan.dataset.planMes) {
      plan.querySelector(".precio").textContent = plan.dataset.planMes;
    }
  });
  btnMes.classList.add("active");
  btnAnio.classList.remove("active");
});

btnAnio.addEventListener("click", () => {
  planes.forEach(plan => {
    if(plan.dataset.planAnio) {
      plan.querySelector(".precio").textContent = plan.dataset.planAnio;
    }
  });
  btnAnio.classList.add("active");
  btnMes.classList.remove("active");
});
