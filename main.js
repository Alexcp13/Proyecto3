
// https://api.unsplash.com/search/photos?query=dog&client_id=3lddQ9AdBFfvjT_QGDX9BCPQ1Xz9Mg40bc7RpaZt06o
// "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzI0NDl8MHwxfHNlYXJjaHwxfHxkb2d8ZW58MHx8fHwxNzA5MDYwOTE5fDA&ixlib=rb-4.0.3&q=85"
async function fetchPhoto(busqueda) {

  return await fetch(`https://api.unsplash.com/search/photos?query=${busqueda}&client_id=3lddQ9AdBFfvjT_QGDX9BCPQ1Xz9Mg40bc7RpaZt06o`)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      return result.results.map(Element => Element.urls.full)
    })
    .catch(error => {
      console.error("Problema con la petición", error);
    });

}


async function guardarInput() {
  const busqueda = document.getElementById('miBuscador').value;
  console.log(busqueda)

  const photos = await fetchPhoto(busqueda);
  const photoSection = document.getElementById('photo');
  photoSection.innerHTML = '';
  console.log(photos)
  photos.forEach(element => {
    const imagen = document.createElement('img');
    imagen.src = element
    imagen.width = 300;
    imagen.height = 200;

    imagen.classList.add('photos');

    photoSection.appendChild(imagen)
  });
}


document.getElementById('miBuscador').addEventListener('input', guardarInput);