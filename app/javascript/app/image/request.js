const APIURL = 'http://localhost:3000'

export const uploadImage = async (state) => {
  const formData = new FormData();

  formData.append('title', state.title);
  formData.append('description', state.description);
  formData.append('size', state.size);
  formData.append('mime_type', state.mime_type);
  formData.append('featured_image', state.featured_image);

  const response = await fetch(`${APIURL}/images`, {
  	method: 'POST',
  	body: formData
  });
  return response.json()
}

export const deleteImage = async (id) => {
  const response = await fetch(`${APIURL}/images/${id}`, {method: 'DELETE'})
  return response.json()
}