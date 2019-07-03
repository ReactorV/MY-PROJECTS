
const getResponse = async (url) => {
  const res = await fetch(url);

  if(!res.ok) {
    throw new Error(`Could not fetch ${url}` +
    `, received ${res.status}`)
  }

  const body = res.json();
  return body;
}

getResponse('https://swapi.co/api/people/1657657/')
  .then((body) => {
    console.log(body);
  })
  .catch((er) => {
    console.error(er);
  })

