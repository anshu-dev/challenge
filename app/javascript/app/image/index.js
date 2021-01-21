import React, {Component} from 'react';
import {uploadImage, deleteImage, getImages} from './request'
import './style.css'

class Image extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      size: 0,
      mime_type: '',
      featured_image: null,
      message: '',
      image_list: []
    }
  }

  componentDidMount() {
    fetch('/images', { method: 'GET'})
    .then(res => res.json())
    .then(data => {
      this.setState({image_list: data})
    })
    .catch(error=>console.log(error));
  }

  handleChange = (event) =>  {
    this.setState({[event.target.name]: event.target.value})
  }

  onImageChange = (e) => {
    let metaData = event.target.files[0]

    this.setState({
      title: metaData['name'],
      description: '',
      size: metaData['size'],
      mime_type: metaData['type'],
      message: '',
      featured_image: event.target.files[0]
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await uploadImage({...this.state})
    let new_image_list = [...this.state.image_list]
    new_image_list.push(response['data'])

    if(response['success'] == true) {
      this.setState({image_list: new_image_list, message: response['msg']})
    }
  }

  handleDelete = async (image_id) => { 
    const response = await deleteImage(image_id)
    if(response['success'] == true) {
      this.removeImageFromList(response['data'])
    }
    this.setState({message: response['msg']})
  }

  removeImageFromList = (obj) => {
    let image_list = [...this.state.image_list]
    let index = image_list.findIndex(o => o.id == obj['id'])
    let new_image_list = [...image_list.splice(0, index), ...image_list.splice(index+1) ]
    this.setState({image_list: new_image_list})
  }
  
  render() {
    return(
      <div className="wrapper">
       <h1>Upload image</h1>

       <div className="image_upload_form">
         <form onSubmit={this.handleSubmit}>
           <input type="file" accept="image/*" multiple={false} onChange={this.onImageChange} />
           <input type="submit" value="upload"/>
         </form>
         <p><span className='success'>{this.state.message}</span></p>
       </div>

       <div className="image_list">
         <table>
           <thead>
             <tr>
               <th>id</th>
               <th>Name</th>
               <th>size</th>
               <th>Mime Type</th>
               <th>Action</th>
             </tr>
           </thead>

           <tbody>
             {
              this.state.image_list.map(image => {
                return(
                  <tr key={image.id}>
                    <td>{image.id}</td>
                    <td>{image.title}</td>
                    <td>{image.size}</td>
                    <td>{image.mime_type}</td>
                    <td><button onClick={() => {this.handleDelete(image.id)}}>X</button></td>
                  </tr>
                )
              })
             }
           </tbody>


         </table>
       </div>
      </div>
    );
  }
}

export default Image;