
async function fetchPhoto(busqueda) {

  console.log(busqueda)
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${busqueda}&client_id=3lddQ9AdBFfvjT_QGDX9BCPQ1Xz9Mg40bc7RpaZt06o`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const photo = data.results.map(element => element.urls.full);
      mostrarFotos(photo);
    } else {
      throw new Error("No se encontraron fotos para la búsqueda.");
    }
  } catch (error) {
    console.error("Problema con la petición", error);
    throw error;
  }
}

async function cargarImagenesAleatorias() {

  const terminosAleatorios = ["street", "country", "cats"]

  const terminoAleatorio = terminosAleatorios[Math.floor(Math.random() * terminosAleatorios.length)];

  const fotosAleatorias = await fetchPhoto(terminoAleatorio);





}

function mostrarFotos(fotos) {

  const photoSection = document.getElementById("photo");
  photoSection.innerHTML = "";
  fotos.forEach(url => {
    const imagen = document.createElement('img');
    imagen.src = url;

    imagen.classList.add('photos');
    photoSection.appendChild(imagen);
  });

}

async function guardarInput() {
  const busqueda = document.getElementById('miBuscador').value;

  try {
    if (busqueda === '') {
      cargarImagenesAleatorias()
    } else {
      const fotosBuscadas = await fetchPhoto(busqueda);
    }


  } catch (error) {
    const photoSection = document.getElementById('photo');
    photoSection.innerHTML = '';
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error.message;
    photoSection.appendChild(errorMessage);
  }


}


document.getElementById('miBuscador').addEventListener('input', guardarInput);

window.onload = cargarImagenesAleatorias;